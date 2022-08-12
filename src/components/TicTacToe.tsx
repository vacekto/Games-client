import './TicTacToe.css'
import { useEffect, useReducer } from 'react'
import { TMode, TGameSide } from 'shared/types'
import reducer from './TicTacToeReducer'


interface ITicTacToeProps {
  size?: number
  side?: TGameSide
  mode?: TMode
}

const TicTacToe: React.FC<ITicTacToeProps> = ({ size = 9, side = 'X', mode = 'hotseat' }) => {

  const initBoard = Array(size).fill(Array(size).fill(null))

  const [state, dispatch] = useReducer(reducer, {
    board: initBoard,
    side: side,
    currentlyPlaying: 'X',
    winner: null
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
  console.log(state.board)
  return <div className='app-body ticTacToe'>
      <div>{`winner: ${state.winner}`}</div>
      <div>{`currently playing: ${state.currentlyPlaying}`}</div>
    <div className='board'>
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
  </div>
};

export default TicTacToe;