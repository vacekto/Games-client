import './UltimateTicTacToeBoard.css'
import { TTicTacToeBoard } from 'shared/types'
import { initializeUltimateTicTacToeBoard, initializeTicTacToeBoard } from '../../util/functions'
import { useReducer, useEffect } from 'react'
import { Link } from 'react-router-dom'
import reducer from './UltimateTicTacToeReducer'
import GameHeader from '../GameHeader'

interface IUltimateTicTacToeBoardProps {

}


const UltimateTicTacToeBoard: React.FC<IUltimateTicTacToeBoardProps> = (props) => {
    const [state, dispatch] = useReducer(reducer, {
        activeSegment: null,
        segmentBoard: initializeTicTacToeBoard(3),
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

    const handleSquareClick = (squareCOORD: [number, number], segmentCOORD: [number, number]) => {
        const [x, y] = squareCOORD
        const [z, w] = segmentCOORD
        if (state.board[z][w][x][y]) return
        if (state.activeSegment &&
            (state?.activeSegment[0] !== z || state.activeSegment[1] !== w)
        ) return
        dispatch({
            type: 'HOT_SEAT_MOVE',
            payload: { squareCOORD, segmentCOORD }
        })
    }

    useEffect(() => {
        console.log(state.activeSegment)
    }, [state])


    const renderTicTacToeBoard = (board: TTicTacToeBoard, z: number, w: number) => {
        return board.map((row, x) => {
            return <div className="displayFlex" key={x}>
                {row.map((value, y) => {
                    return <div
                        key={y}
                        className='down square'
                        onClick={() => { handleSquareClick([x, y], [z, w]) }}
                    >
                        {value}
                    </div>
                })}
            </div>
        })
    }

    return <div className='ultimateTicTacToeBoard wholeScrean'>
        <div className='boardContainer'>
            <GameHeader player1={state.score.X} player2={state.score.O} draw={state.score.draw} />
            {state.board.map((segmentRow, z) => {
                return <div className='displayFlex' key={z}>
                    {segmentRow.map((segment, w) => {
                        return <div className='down quadrant' style={{ backgroundColor: state.activeSegment && state.activeSegment[0] === z && state.activeSegment[1] === w ? "yellow" : "" }} key={w}>
                            {renderTicTacToeBoard(segment, z, w)}
                        </div>
                    })}
                </div>
            })}
            <div> Mooving: {state.currentlyPlaying}</div>
            <div className='TicTacToeFooter'>
                <Link to='/'>Quit</Link>
            </div>
        </div>
    </div >;
};

export default UltimateTicTacToeBoard;