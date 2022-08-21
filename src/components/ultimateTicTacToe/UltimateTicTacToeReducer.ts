import { TUltimateTicTacToeBoard, TTicTacToeSide, TTicTacToeBoard } from 'shared/types'
import { checkForWinnerTicTacToe } from '../../util/gameLogic'

export interface TUltimateTicTacToeState {
    activeSegment: null | [number, number]
    segmentBoard: TTicTacToeBoard
    board: TUltimateTicTacToeBoard
    side: TTicTacToeSide
    currentlyPlaying: TTicTacToeSide
    winner: 'X' | 'O' | null
    score: {
        X: number
        O: number
        draw: number
    }
}

type TUltimateTicTacToeAction =
    { type: 'HOT_SEAT_MOVE', payload: { squareCOORD: [number, number], segmentCOORD: [number, number] } }
    | { type: 'TEST', payload: { squareCOORD: [number, number], segmentCOORD: [number, number] } }


const reducer = (prevState: TUltimateTicTacToeState, action: TUltimateTicTacToeAction) => {
    switch (action.type) {
        case 'HOT_SEAT_MOVE':
            const [x, y] = action.payload.squareCOORD
            const [z, w] = action.payload.segmentCOORD
            const update: TUltimateTicTacToeState = JSON.parse(JSON.stringify(prevState))
            update.board[z][w][x][y] = prevState.currentlyPlaying
            const wonSegment = checkForWinnerTicTacToe(update.board[z][w], [x, y], 3)
            if (wonSegment) {
                update.segmentBoard[z][w] = prevState.currentlyPlaying
                const isWinner = checkForWinnerTicTacToe(update.segmentBoard, [z, w], 3)
                if (isWinner) {
                    update.winner = prevState.currentlyPlaying
                    update.score[prevState.currentlyPlaying] += 1
                    return update
                }
            }
            if (update.segmentBoard[x][y]) update.activeSegment = null
            else update.activeSegment = [x, y]
            update.side = prevState.side === 'X' ? 'O' : 'X'
            update.currentlyPlaying = prevState.currentlyPlaying === 'X' ? 'O' : 'X'
            return update

        case 'TEST':
            console.log('quadrant' + action.payload.segmentCOORD)
            console.log('square' + action.payload.squareCOORD)
            return prevState

        default:
            throw new Error()
    }
}

export default reducer