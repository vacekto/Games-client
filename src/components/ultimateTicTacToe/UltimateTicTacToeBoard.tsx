import './UltimateTicTacToeBoard.scss'
import { TTicTacToeBoard } from 'shared/types'
import { initializeUltimateTicTacToeBoard, initializeTicTacToeBoard } from '../../util/functions'
import { useReducer, useEffect } from 'react'
import reducer from './UltimateTicTacToeReducer'
import BoardHeader from '../BoardHeader'
import BoardFooter from '../BoardFooter'
import { Times, Circle } from '../../util/SVG'

interface IUltimateTicTacToeBoardProps { }

const UltimateTicTacToeBoard: React.FC<IUltimateTicTacToeBoardProps> = (props) => {
    const [state, dispatch] = useReducer(reducer, {
        activeSegment: null,
        segmentBoard: initializeTicTacToeBoard(3),
        ultimateBoard: initializeUltimateTicTacToeBoard(),
        side: 'X',
        currentlyPlaying: 'X',
        winner: null,
        score: {
            X: 0,
            O: 0,
            draw: 0
        }
    })

    const handlePlayAgain = () => {
        dispatch({ type: 'PLAY_AGAIN' })
    }

    const handleSquareClick = (squareCOORD: [number, number], segmentCOORD: [number, number]) => {
        const [x, y] = squareCOORD
        const [z, w] = segmentCOORD
        if (state.segmentBoard[z][w]) return
        if (state.ultimateBoard[z][w][x][y]) return
        if (state.winner) return
        if (state.activeSegment &&
            (state.activeSegment[0] !== z ||
                state.activeSegment[1] !== w)
        ) return
        dispatch({
            type: 'HOT_SEAT_MOVE',
            payload: { squareCOORD, segmentCOORD }
        })
    }

    useEffect(() => {
        console.log(state.segmentBoard)
    }, [state])


    const markActive = (z: number, w: number) => {
        if (!state.activeSegment) return ""
        const [x, y] = state.activeSegment
        return z === x && w === y ? "active" : ""
    }

    const renderIcon = (value: 'X' | 'O' | null | 'draw') => {
        if (value === 'X') return <Times />
        if (value === 'O') return <Circle />
        return null
    }

    const renderTicTacToeBoard = (board: TTicTacToeBoard, z: number, w: number) => {
        return board.map((row, x) => {
            return <div className={"flex"} key={x}>
                {row.map((value, y) => {
                    return <div
                        key={y}
                        className={`genericTicTacToeSquare`}
                        onClick={() => { handleSquareClick([x, y], [z, w]) }}
                    >
                        {renderIcon(value)}
                    </div>
                })}
            </div>
        })

    }

    const renderSegmentBoard = () => {
        return state.ultimateBoard.map((segmentRow, z) => {
            return <div className='flex' key={z}>
                {segmentRow.map((segment, w) => {
                    return <div
                        className={`segment genericFlexColumn genericNoBorder 
                        ${markActive(z, w)}`}
                        key={w}
                    >
                        <div className={state.segmentBoard[z][w] ? 'finished' : 'notFinished'}>
                            {renderIcon(state.segmentBoard[z][w])}
                        </div>
                        {renderTicTacToeBoard(segment, z, w)}
                    </div>
                })}
            </div>
        })
    }


    return <div className='ultimateTicTacToeBoard genericWholeScrean'>
        <div className='genericGameContainer'>
            <div className="header">
                <BoardHeader player1={state.score.X} player2={state.score.O} draw={state.score.draw} />
            </div>
            <div className="board genericFlexColumn">
                {renderSegmentBoard()}
            </div>
            <div className="footer">
                <BoardFooter
                    currentlyPlaying={state.currentlyPlaying}
                    winner={state.winner}
                    playAgainCallback={handlePlayAgain}
                />
            </div>
        </div>
    </div >
};

export default UltimateTicTacToeBoard;