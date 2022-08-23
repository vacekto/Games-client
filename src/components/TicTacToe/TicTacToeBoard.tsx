import './TicTacToeBoard.scss'
import { useReducer, useEffect } from 'react'
import { TMode, TGameSide } from 'shared/types'
import { Link } from 'react-router-dom'
import { initializeTicTacToeBoard } from '../../util/functions'
import reducer from './TicTacToeReducer'
import BoardHeader from '../BoardHeader'
import { Circle, Times } from './../../util/SVG'

interface ITicTacToeBoardProps {
  size?: number
  side?: TGameSide
  mode?: TMode
}

const TicTacToeBoard: React.FC<ITicTacToeBoardProps> = ({ size = 9, side = 'X', mode = 'hotseat' }) => {
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
    if (state.board[x][y] === null && state.side === state.currentlyPlaying) {
      if (mode === 'multiplayer') {
        //socket.emit('clientGameUpdate', state.board, [x, y])
      } else {
        dispatch({ type: 'HOT_SEAT_MOVE', payload: { COORD: [x, y] } })
      }
    }
  }

  const renderBoardValue = (value: 'X' | 'O' | null) => {
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

  return <div className='ticTacToeBoard wholeScrean'>
    <div className="gameContainer">

      <BoardHeader player1={state.score.X} player2={state.score.O} draw={state.score.draw} />

      <div>
        {state.board.map((row: Array<"X" | "O" | null>, x: number) => {
          return <div className="ticTacToeRow" key={x}>
            {row.map((value: "X" | "O" | null, y: number) => {
              return <div
                key={y}
                className='square'
                onClick={() => { handleSquareClick(x, y) }}
              >
                {renderBoardValue(value)}
              </div>
            })}
          </div>
        })}
      </div>

      <div> Mooving: {state.currentlyPlaying}</div>
      <div className='TicTacToeFooter'>
        <Link to='/'>Quit</Link>
      </div>
    </div>
  </div>
};

export default TicTacToeBoard;