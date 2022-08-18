import './UltimateTicTacToeBoard.css'
import { TTicTacToeBoard } from 'shared/types'
import { initializeUltimateTicTacToeBoard } from '../../util/functions'
import { useReducer, useEffect } from 'react'
import { Link } from 'react-router-dom'
import reducer from './UltimateTicTacToeReducer'

interface IUltimateTicTacToeBoardProps {

}


const UltimateTicTacToeBoard: React.FC<IUltimateTicTacToeBoardProps> = (props) => {
    const [state, dispatch] = useReducer(reducer, {
        activeQuadrant: null,
        finishedQuadrants: [],
        board: initializeUltimateTicTacToeBoard(),
        side: 'X',
        currentlyPlaying: 'X',
        winner: null,
        score: {
            X: 0,
            O: 0,
            draw: 0
        }
    })

    const handleSquareClick = (x: number, y: number, z: number, w: number) => {
        dispatch({
            type: 'HOT_SEAT_MOVE', payload: {
                squareCOORD: [x, y],
                quadrantCOORD: [z, w]
            }
        })
    }

    useEffect(() => {
        console.log(state.activeQuadrant)
    }, [state])


    const renderTicTacToeBoard = (board: TTicTacToeBoard, z: number, w: number) => {
        return board.map((row, x) => {
            return <div className="displayFlex" key={x}>
                {row.map((value, y) => {
                    return <div
                        key={y}
                        className='down square'
                        onClick={() => { handleSquareClick(x, y, z, w) }}
                    >
                        {value}
                    </div>
                })}
            </div>
        })
    }

    return <div className='ultimateTicTacToeBoard whole-screan'>
        <div>
            {state.board.map((quadrantRow, x) => {
                return <div className='displayFlex' key={x}>
                    {quadrantRow.map((quadrant, y) => {
                        return <div className='down quadrant' key={y}>
                            {renderTicTacToeBoard(quadrant, x, y)}
                        </div>
                    })}
                </div>
            })}
            <Link to='/'>Quit</Link>
        </div>
    </div>;
};

export default UltimateTicTacToeBoard;