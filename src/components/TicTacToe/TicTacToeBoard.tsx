import './TicTacToeBoard.scss'
import { useReducer, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { TMode, TGameSide } from 'shared/types'
import { initializeTicTacToeBoard } from '../../util/functions'
import reducer from './TicTacToeReducer'
import BoardHeader from '../BoardHeader'
import BoardFooter from '../BoardFooter'
import { Circle, Times } from './../../util/SVG'

interface ITicTacToeBoardProps {
  size?: number
  side?: TGameSide
  mode?: TMode
}

const TicTacToeBoard: React.FC<ITicTacToeBoardProps> = ({ size = 3, side = 'X', mode = 'hotseat' }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    board: initializeTicTacToeBoard(size),
    side: side,
    currentlyPlaying: 'X',
    winner: null,
    score: {
      X: 0,
      O: 0,
      draw: 0
    }
  })


  const handleSquareClick = (x: number, y: number) => {
    if (state.board[x][y] !== null) return
    if (state.side !== state.currentlyPlaying) return
    if (state.winner) return
    if (mode === 'multiplayer') {
      //socket.emit('clientGameUpdate', state.board, [x, y])
    } else {
      dispatch({ type: 'HOT_SEAT_MOVE', payload: { COORD: [x, y] } })
    }
  }

  const handlePlayAgain = () => {
    dispatch({ type: 'PLAY_AGAIN' })
  }

  const renderBoardValue = (value: 'X' | 'O' | null | 'draw') => {
    if (value === 'X') return <Times />
    if (value === 'O') return <Circle />
    return null
  }

  useEffect(() => {
    if (mode === 'multiplayer') {
      /*if (!socket.hasListeners('serverGameUpdate')) {
        socket.on('serverGameUpdate', () => {

        })
      }*/
    }

    return () => {
      //socket.removeAllListeners('serverGameUpdate')
    }

  }, [/*socket*/ mode])

  return <div className='ticTacToeBoard genericWholeScrean'>
    <div className="genericGameContainer">

      <div className="header">
        <BoardHeader player1={state.score.X} player2={state.score.O} draw={state.score.draw} />
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
        <BoardFooter
          currentlyPlaying={state.currentlyPlaying}
          winner={state.winner}
          playAgainCallback={handlePlayAgain}
        />
      </div>
    </div>
  </div>
};

export default TicTacToeBoard;