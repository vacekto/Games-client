import { TTicTacToeSide, TTicTacToeBoard } from 'shared/types'
import { checkForWinnerTicTacToe, checkForDrawTicTacToe } from '../../util/gameLogic'
import { initializeUltimateTicTacToeBoard, initializeTicTacToeBoard } from '../../util/functions'

export interface TUltimateTicTacToeState {
    activeSegment: null | [number, number]
    segmentBoard: TTicTacToeBoard
    ultimateBoard: TTicTacToeBoard[][]
    side: TTicTacToeSide
    currentlyPlaying: TTicTacToeSide
    winner: 'X' | 'O' | null | 'draw'
    score: {
        X: number
        O: number
        draw: number
    }
}

export type TUltimateTicTacToeAction =
    { type: 'HOT_SEAT_MOVE', payload: { squareCOORD: [number, number], segmentCOORD: [number, number] } }
    | { type: 'PLAY_AGAIN' }

const reducer = (prevState: TUltimateTicTacToeState, action: TUltimateTicTacToeAction) => {
    let update;
    switch (action.type) {
        case 'HOT_SEAT_MOVE':
            update = { ...prevState }
            const [x, y] = action.payload.squareCOORD
            const [z, w] = action.payload.segmentCOORD
            update.ultimateBoard = JSON.parse(JSON.stringify(prevState.ultimateBoard))
            update.ultimateBoard[z][w][x][y] = prevState.currentlyPlaying
            const wonSegment = checkForWinnerTicTacToe(update.ultimateBoard[z][w], [x, y], 3)
            if (wonSegment) {
                update.segmentBoard = JSON.parse(JSON.stringify(prevState.segmentBoard))
                update.segmentBoard[z][w] = prevState.currentlyPlaying
                if (checkForDrawTicTacToe(update.segmentBoard)) {
                    update.winner = 'draw'
                    update.score.draw += 1
                }
                const isWinner = checkForWinnerTicTacToe(update.segmentBoard, [z, w], 3)
                if (isWinner) {
                    update.winner = prevState.currentlyPlaying
                    update.score[prevState.currentlyPlaying] += 1
                    return JSON.parse(JSON.stringify(update))
                }
            }
            if (update.segmentBoard[x][y] || checkForDrawTicTacToe(update.ultimateBoard[x][y])) update.activeSegment = null
            else update.activeSegment = [x, y]
            update.side = prevState.side === 'X' ? 'O' : 'X'
            update.currentlyPlaying = prevState.currentlyPlaying === 'X' ? 'O' : 'X'
            return update


        case 'PLAY_AGAIN':
            update = { ...prevState }
            update.ultimateBoard = initializeUltimateTicTacToeBoard()
            update.segmentBoard = initializeTicTacToeBoard(3)
            update.winner = null
            update.activeSegment = null
            update.side = prevState.side === 'X' ? 'O' : 'X'
            update.currentlyPlaying = prevState.currentlyPlaying === 'X' ? 'O' : 'X'
            return JSON.parse(JSON.stringify(update))

        default:
            return { ...prevState }
    }
}

export default reducer