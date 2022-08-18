import './TicTacToeBoard.css'
import { useReducer, useEffect } from 'react'
import { TMode, TGameSide } from 'shared/types'
import { Link } from 'react-router-dom'
import reducer from './TicTacToeReducer'
import { initializeTicTacToeBoard } from '../../util/functions'


interface ITicTacToeBoardProps {
  size?: number
  side?: TGameSide
  mode?: TMode
}

const TicTacToeBoard: React.FC<ITicTacToeBoardProps> = ({ size = 7, side = 'X', mode = 'hotseat' }) => {

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
        dispatch({ type: 'HOT_SEAT_MOVE', payload: { coordinates: [x, y] } })
      }
    }
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

  return <div className='ticTacToeBoard whole-screan'>

    <div className='ticTacToe-Info'>
      <div>
        <div>X</div>
        <div>{state.score.X} wins</div>
      </div>
      <div>
        <div>O</div>
        <div>{state.score.O} wins</div>
      </div>
      <div>
        <div>weight</div>
        <div>{state.score.draw} draws</div>
      </div>
    </div>

    <div>
      {state.board.map((row: Array<"X" | "O" | null>, x: number) => {
        return <div className="row" key={x}>
          {row.map((value: "X" | "O" | null, y: number) => {
            return <div
              key={y}
              className='square'
              onClick={() => { handleSquareClick(x, y) }}
            >
              {value}
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
};

export default TicTacToeBoard;