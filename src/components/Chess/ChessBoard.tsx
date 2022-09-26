import './ChessBoard.scss'
import { TChessBoard, TChessSide, TGameMode } from 'shared/types'
import { useReducer, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import BoardHeader from '../BoardHeader';
import BoardFooter from '../BoardFooter';
import { chessPiecesSVG } from 'src/util/SVG/Components';
import { ChessPiece } from 'src/util/chessPieces';
import { createChessBoard, isMovePossible } from 'src/util/chessLogic';
import reducer from './chessReducer'
import socket from 'src/util/socketInstance';

interface IChessBoardProps {
  mode: TGameMode
  username: string
}

const ChessBoard: React.FC<IChessBoardProps> = ({ mode, username }) => {
  const params = useParams();
  const navigate = useNavigate()
  const [oponentWantsRematch, setOpponentWantsRematch] = useState<boolean>(false)
  const [state, dispatch] = useReducer(reducer, {
    board: createChessBoard(),
    selected: null,
    potentialMoves: [],
    enPassant: [],
    check: null,
    side: mode === 'multiplayer' ? params.side === 'white' ? 'white' : 'black' : 'white',
    history: [],
    opponentUsername: params.opponentUsername ? params.opponentUsername : '',
    currentlyPlaying: 'white',
    winner: null,
    mode: mode,
    score: {
      white: 0,
      black: 0,
      draw: 0
    }
  })


  const handleSquareClick = (COORD: [number, number]) => {
    if (state.winner) return
    if (!(state.currentlyPlaying === state.side)) return
    const [x, y] = COORD
    if (state.selected) {
      const potentialMove = state.potentialMoves!.find(m => (m[0] === x && m[1] === y))
      if (potentialMove) {
        if (mode === 'hotseat') { dispatch({ type: 'HOTSEAT_MOVE', payload: COORD }); return }
        if (!isMovePossible(state.board, state.selected!.boardCOORD, COORD, state.currentlyPlaying)) return
        socket.emit('CLIENT_GAME_UPDATE', COORD, state.side, state.selected)
      }
    }
    if (state.board[x][y] === null || state.currentlyPlaying === state.board[x][y]!.side) dispatch({ type: 'SELECT', payload: COORD })
  }

  const handlePlayAgain = () => {
    dispatch({ type: 'NEW_GAME' })
  }

  const handleQuit = () => {
    navigate('/')
  }

  const highLightSquare = (x: number, y: number) => {
    if (state.selected?.boardCOORD[0] === x && state.selected.boardCOORD[1] === y) return 'highlightNoAttack'
    for (let Pmove of state.potentialMoves) {
      if (Pmove[0] === x && Pmove[1] === y) {
        if (state.board[x][y] === null) {
          for (let EPMove of state.enPassant) if (EPMove[0] === x && EPMove[1] === y) return 'highlightAttack'
          return 'highlightNoAttack'
        }
        return 'highlightAttack'
      }
    }
    return ''
  }

  useEffect(() => {
    if (mode === 'multiplayer') {
      if (!params.side || !['white', 'black'].includes(params.side)) navigate('/')
      if (!socket.gameId || socket.gameId !== params.gameId) navigate('/')
      if (!username || !params.opponentUsername) navigate('/')

      if (!socket.hasListeners('SERVER_GAME_UPDATE')) {
        socket.on('SERVER_GAME_UPDATE', (board, _, __, check) => {
          dispatch({ type: 'MULTIPLAYER_MOVE', payload: { board: board as TChessBoard, check: check! } })
        })
      }
      if (!socket.hasListeners('PLAYER_WON_GAME')) {
        socket.on('PLAYER_WON_GAME', (side) => {
          dispatch({ type: 'PLAYER_WON_GAME', payload: side as (TChessSide | 'draw') })
        })
      }
      if (!socket.hasListeners('NEW_GAME')) {
        socket.on('NEW_GAME', () => {
          dispatch({ type: 'NEW_GAME' })
          setOpponentWantsRematch(false)
        })
      }
      if (!socket.hasListeners('QUIT_GAME')) {
        socket.on('QUIT_GAME', (msg) => {
          console.error(msg)
          navigate('/')
        })
      }

      if (!socket.hasListeners('OPONENT_WANTS_TO_PLAY_AGAIN')) {
        socket.on('OPONENT_WANTS_TO_PLAY_AGAIN', () => {
          setOpponentWantsRematch(true)
        })
      }
    }

    socket.emit('LEAVE_LOBBY')

    return () => {
      socket.emit('LEAVE_GAME')
      socket.removeAllListeners('SERVER_GAME_UPDATE')
      socket.removeAllListeners('PLAYER_WON_GAME')
      socket.removeAllListeners('NEW_GAME')
      socket.removeAllListeners('QUIT_GAME')
      socket.removeAllListeners('OPONENT_WANTS_TO_PLAY_AGAIN')
      socket.gameId = null
      socket.emit('JOIN_LOBBY')
    }

  }, [])


  const getSquareValue = (value: ChessPiece | null) => {
    if (value === null) return null
    //@ts-ignore
    return chessPiecesSVG[value.iconName]
  }

  return <div className='chessBoard genericWholeScreen'>
    <div className="genericGameContainer">
      <div className="header">
        <BoardHeader
          clientSide={state.side}
          score={{ ...state.score }}
          opponentUsername={''}
          clientUsername={username}
          mode={mode}
        />
      </div>
      <div className="board">
        {state.board.map((row, x) => {
          return <div className="row" key={x}>
            {row.map((value, y) => {
              const darkStyle = (x + y) % 2 === 1 ? 'dark' : ''
              const highlightedStyle = highLightSquare(x, y)
              return <div
                key={y}
                className={`square ${darkStyle} ${highlightedStyle}`}
                onClick={() => handleSquareClick([x, y])}
              >
                {getSquareValue(value)}
              </div>
            })}
          </div>
        })}
      </div>
      <div className='footer'>
        <BoardFooter
          currentlyPlaying={state.currentlyPlaying}
          winner={state.winner}
          playAgainCallback={handlePlayAgain}
          quitCallback={handleQuit}
          oponentsWantsRematch={oponentWantsRematch}
          gameName='chess'
        />
      </div>
    </div>
  </div >;
};

export default ChessBoard;