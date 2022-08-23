import './UltimateTicTacToeBoard.scss'
import { TTicTacToeBoard } from 'shared/types'
import { initializeUltimateTicTacToeBoard, initializeTicTacToeBoard } from '../../util/functions'
import { useReducer, useEffect } from 'react'
import { Link } from 'react-router-dom'
import reducer, { TUltimateTicTacToeState } from './UltimateTicTacToeReducer'
import BoardHeader from '../BoardHeader'
import BoardFooter from '../BoardFooter'


interface IUltimateTicTacToeBoardProps { }

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


    const getSegmentColor = (p: number, q: number) => {
        if (!state.activeSegment) return ""
        const [x, y] = state.activeSegment
        const isActive = p === x && q === y
        return isActive ? "yellow" : ""
    }

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

    const renderSegmentBoard = () => {
        return state.board.map((row, rowCOORD) => {
            return <div className='displayFlex' key={rowCOORD}>
                {row.map((segment, columnCOORD) => {
                    return <div
                        className='down quadrant'
                        style={{ backgroundColor: getSegmentColor(rowCOORD, columnCOORD) }}
                        key={columnCOORD}
                    >
                        {renderTicTacToeBoard(segment, rowCOORD, columnCOORD)}
                    </div>
                })}
            </div>
        })
    }


    return <div className='ultimateTicTacToeBoard wholeScrean'>
        <div className='gameContainer'>
            <BoardHeader player1={state.score.X} player2={state.score.O} draw={state.score.draw} />
            <div className="boardConatiner">
                {renderSegmentBoard()}
            </div>
            <BoardFooter currentlyPlaying={state.currentlyPlaying} />
        </div>
    </div >;
};

export default UltimateTicTacToeBoard;