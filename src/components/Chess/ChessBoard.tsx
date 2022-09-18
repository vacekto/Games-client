import './ChessBoard.scss'
import { TChessBoard, TGameMode } from 'shared/types'
import { useReducer, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import BoardHeader from '../BoardHeader';
import BoardFooter from '../BoardFooter';
import { chessPiecesSVG } from 'src/util/SVG/Components';
import { ChessPiece } from 'src/util/chessPieces';
import { createChessBoard } from 'src/util/chessLogic';
import reducer from './chessReducer'

interface IChessBoardProps {
  mode: TGameMode
  username: string
}

const ChessBoard: React.FC<IChessBoardProps> = ({ mode, username }) => {
  const navigate = useNavigate()
  const [oponentWantsRematch, setOpponentWantsRematch] = useState<boolean>(false)
  const [state, dispatch] = useReducer(reducer, {
    board: createChessBoard(),
    selected: null,
    potentialMoves: [],
    enPassant: [],
    check: null,
    side: 'white',
    history: [],
    opponentUsername: '',
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
      if (potentialMove) { dispatch({ type: 'HOTSEAT_MOVE', payload: COORD }); return }
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
    dispatch({ type: 'TEST' })

  }, [])

  useEffect(() => {
    console.log(state.check)
  }, [state.check])


  const getSquareValue = (value: ChessPiece | null) => {
    if (value === null) return null
    //@ts-ignore
    return chessPiecesSVG[value.iconName]
  }

  return <div className='chessBoard genericWholeScrean'>
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