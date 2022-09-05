import './TicTacToeBoard.scss'
import { useReducer, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TMode, TTicTacToeBoard } from 'shared/types'
import { initializeTicTacToeBoard } from 'src/util/functions'
import reducer from './TicTacToeReducer'
import BoardHeader from '../BoardHeader'
import BoardFooter from '../BoardFooter'
import { Circle, Times } from 'src/util/SVG'
import socket from 'src/util/socketInstance'
interface ITicTacToeBoardProps {
  size?: number
  username: string
  mode: TMode
}

const TicTacToeBoard: React.FC<ITicTacToeBoardProps> = ({ size = 9, mode, username }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [oponentsWantsRematch, setOpponentWantsRematch] = useState<boolean>(false)
  const [state, dispatch] = useReducer(reducer, {
    board: initializeTicTacToeBoard(size),
    side: mode === 'multiplayer' ? params.side === 'X' ? 'X' : 'O' : 'X',
    opponent: mode === 'multiplayer' ? params.side === 'X' ? 'O' : 'X' : 'O',
    currentlyPlaying: 'X',
    winner: null,
    mode: mode,
    score: {
      X: 0,
      O: 0,
      draw: 0
    }
  })


  const handleSquareClick = (x: number, y: number) => {
    if (state.side !== state.currentlyPlaying) return
    if (state.board[x][y] !== null) return
    if (state.winner) return
    if (state.mode === 'multiplayer') {
      socket.emit('CLIENT_GAME_UPDATE', [x, y], state.side)
    } else if (state.mode === 'hotseat') {
      dispatch({ type: 'HOTSEAT_MOVE', payload: { COORD: [x, y] } })
    }
  }

  const handlePlayAgain = () => {
    if (mode === 'hotseat') dispatch({ type: 'NEW_GAME' })
    if (mode === 'multiplayer') {
      socket.emit('PLAY_AGAIN')
    }
  }

  const handleQuit = () => {
    if (state.mode === 'multiplayer') {
      socket.emit('LEAVE_GAME')
      socket.gameId = null
    }
    navigate("/")
  }

  const renderBoardValue = (value: 'X' | 'O' | null | 'draw') => {
    if (value === 'X') return <Times />
    if (value === 'O') return <Circle />
    return null
  }

  useEffect(() => {
    if (mode === 'multiplayer') {

      if (!params.side || !['X', 'O'].includes(params.side)) navigate('/')
      if (!socket.gameId || socket.gameId !== params.gameId) navigate('/')
      if (!username || !params.opponentUsername) navigate('/')

      if (!socket.hasListeners('SERVER_GAME_UPDATE')) {
        socket.on('SERVER_GAME_UPDATE', (board) => {
          console.log('game update', board)
          dispatch({ type: 'MULTIPLAYER_MOVE', payload: board as TTicTacToeBoard })
        })
      }
      if (!socket.hasListeners('PLAYER_WON_GAME')) {
        socket.on('PLAYER_WON_GAME', (side) => {
          dispatch({ type: 'PLAYER_WON_GAME', payload: side })
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

    return () => {
      socket.emit('LEAVE_GAME')
      socket.removeAllListeners('SERVER_GAME_UPDATE')
      socket.removeAllListeners('PLAYER_WON_GAME')
      socket.removeAllListeners('NEW_GAME')
      socket.gameId = null
    }

  }, [])


  return <div className='ticTacToeBoard genericWholeScrean'>
    <div className="genericGameContainer">

      <div className="header">
        <BoardHeader
          clientSide={state.side}
          opponentSide={state.opponent}
          score={{ ...state.score }}
          opponentUsername={params.opponent!}
          clientUsername={username}
        />
      </div>

      <div className="board genericFlexColumn genericNoBorder">
        {state.board.map((row: Array<"X" | "O" | null | 'draw'>, x: number) => {
          return <div className="flex" key={x}>
            {row.map((value: "X" | "O" | null | 'draw', y: number) => {
              return <div
                key={y}
                className='genericTicTacToeSquare'
                onClick={() => { handleSquareClick(x, y) }}
              >
                {renderBoardValue(value)}
              </div>
            })}
          </div>
        })}
      </div>

      <div className='footer'>
        <button onClick={() => { socket.emit('test') }}>click</button>
        <BoardFooter
          currentlyPlaying={state.currentlyPlaying}
          winner={state.winner}
          playAgainCallback={handlePlayAgain}
          quitCallback={handleQuit}
          oponentsWantsRematch={oponentsWantsRematch}
        />
      </div>
    </div>
  </div>
};

export default TicTacToeBoard;