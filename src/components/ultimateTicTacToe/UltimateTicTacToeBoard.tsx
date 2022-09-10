import './UltimateTicTacToeBoard.scss'
import { TMode, TTicTacToeBoard, TUltimateTiTacTocBoard } from 'shared/types'
import { initializeUltimateTicTacToeBoard, initializeTicTacToeBoard } from '../../util/functions'
import { useReducer, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import reducer from './UltimateTicTacToeReducer'
import BoardHeader from '../BoardHeader'
import BoardFooter from '../BoardFooter'
import { Times, Circle } from '../../util/SVG'
import socket from 'src/util/socketInstance'

interface IUltimateTicTacToeBoardProps {
    mode: TMode
    username: string
}

const UltimateTicTacToeBoard: React.FC<IUltimateTicTacToeBoardProps> = ({ mode, username }) => {
    const params = useParams();
    const navigate = useNavigate();
    const [oponentsWantsRematch, setOpponentWantsRematch] = useState<boolean>(false)
    const [state, dispatch] = useReducer(reducer, {
        activeSegment: null,
        segmentBoard: initializeTicTacToeBoard(3),
        ultimateBoard: initializeUltimateTicTacToeBoard(),
        side: mode === 'multiplayer' ? params.side === 'X' ? 'X' : 'O' : 'X',
        opponentUsername: params.opponentUsername ? params.opponentUsername : '',
        currentlyPlaying: 'X',
        winner: null,
        mode: mode,
        score: {
            X: 0,
            O: 0,
            draw: 0
        }
    })

    const handlePlayAgain = () => {
        if (mode === 'multiplayer') {
            socket.emit('PLAY_AGAIN')
        }
    }

    const handleQuit = () => {
        if (mode === 'multiplayer') {
            socket.emit('LEAVE_GAME')
            socket.gameId = null
        }
        navigate("/")
    }

    const handleSquareClick = (squareCOORD: [number, number], segmentCOORD: [number, number]) => {
        if (state.side !== state.currentlyPlaying) return
        const [x, y] = squareCOORD
        const [z, w] = segmentCOORD
        if (state.segmentBoard[z][w]) return
        if (state.ultimateBoard[z][w][x][y]) return
        if (state.winner) return
        if (state.activeSegment &&
            (state.activeSegment[0] !== z || state.activeSegment[1] !== w)
        ) return
        if (mode === 'multiplayer') {
            socket.emit('CLIENT_GAME_UPDATE', squareCOORD, state.side, segmentCOORD)
        } else if (mode === 'hotseat') {
            dispatch({ type: 'HOTSEAT_MOVE', payload: { squareCOORD, segmentCOORD } })
        }

    }


    useEffect(() => {
        if (mode === 'multiplayer') {
            if (!params.side || !['X', 'O'].includes(params.side)) navigate('/')
            if (!socket.gameId || socket.gameId !== params.gameId) navigate('/')
            if (!username || !params.opponentUsername) navigate('/')
        }


        if (!socket.hasListeners('SERVER_GAME_UPDATE')) {
            socket.on('SERVER_GAME_UPDATE', (ultimateBoard, segmentBoard, lastMoveCOORD) => {
                dispatch({
                    type: 'MULTIPLAYER_MOVE',
                    payload: {
                        ultimateBoard: ultimateBoard as TUltimateTiTacTocBoard,
                        segmentBoard: segmentBoard as TTicTacToeBoard,
                        lastMoveCOORD: lastMoveCOORD as [number, number]
                    }
                })
            })
        }
        if (!socket.hasListeners('PLAYER_WON_GAME')) {
            socket.on('PLAYER_WON_GAME', (side) => {
                dispatch({ type: 'PLAYER_WON_GAME', payload: { side } })
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

        socket.emit('LEAVE_LOBBY')

        return () => {
            socket.emit('LEAVE_GAME')
            socket.removeAllListeners('SERVER_GAME_UPDATE')
            socket.removeAllListeners('PLAYER_WON_GAME')
            socket.removeAllListeners('NEW_GAME')
            socket.removeAllListeners('QUIT_GAME')
            socket.removeAllListeners('OPONENT_WANTS_TO_PLAY_AGAIN')
            socket.gameId = null
            socket.emit('JOIN_LOBBY')
        }

    }, [])

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
                <BoardHeader clientSide={state.side} clientUsername={username} opponentUsername={params.opponentUsername!} score={{ ...state.score }} mode={mode} />
            </div>
            <div className="board genericFlexColumn">
                {renderSegmentBoard()}
            </div>
            <div className="footer">
                <BoardFooter
                    currentlyPlaying={state.currentlyPlaying}
                    winner={state.winner}
                    playAgainCallback={handlePlayAgain}
                    quitCallback={handleQuit}
                    oponentsWantsRematch={oponentsWantsRematch}
                />
            </div>
        </div>
    </div >
};

export default UltimateTicTacToeBoard;