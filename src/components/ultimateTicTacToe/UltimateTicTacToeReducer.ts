import { TUltimateTicTacToeBoard, TTicTacToeSide, TGameSide } from 'shared/types'
import { checkForWinnerTicTacToe } from '../../util/gameLogic'

export type TUltimateTicTacToeState = {
    activeQuadrant: null | [number, number]
    finishedQuadrants: [number, number][]
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
    { type: 'HOT_SEAT_MOVE', payload: { squareCOORD: [number, number], quadrantCOORD: [number, number] } }
    | { type: 'TEST', payload: { squareCOORD: [number, number], quadrantCOORD: [number, number] } }


const reducer = (prevState: TUltimateTicTacToeState, action: TUltimateTicTacToeAction) => {
    switch (action.type) {
        case 'HOT_SEAT_MOVE':
            const [x, y] = action.payload.squareCOORD
            const [z, w] = action.payload.quadrantCOORD
            const update: TUltimateTicTacToeState = JSON.parse(JSON.stringify(prevState))
            update.board[z][w][x][y] = prevState.currentlyPlaying
            update.side = prevState.side === 'X' ? 'O' : 'X'
            update.currentlyPlaying = prevState.currentlyPlaying === 'X' ? 'O' : 'X'
            const wonQuadrant = checkForWinnerTicTacToe(update.board[z][w], [x, y], 3)
            const isWinner = wonQuadrant && prevState.finishedQuadrants.length === 8 ? true : false
            if (wonQuadrant) {
                update.finishedQuadrants.push([z, w])
                update.activeQuadrant = null
            }
            else {
                const isFinished = prevState.finishedQuadrants.find(quadrant => quadrant[0] === (2 - z) && quadrant[1] === (2 - w))
                update.activeQuadrant = isFinished ? null : [2 - z, 2 - w]
            }
            if (isWinner) {
                update.winner = prevState.currentlyPlaying
                update.score[prevState.currentlyPlaying] += 1
            }
            return update

        case 'TEST':
            console.log('quadrant' + action.payload.quadrantCOORD)
            console.log('square' + action.payload.squareCOORD)
            return prevState

        default:
            throw new Error()
    }
}

export default reducer