import { TTicTacToeBoard, TTicTacToeSide } from 'shared/types'
import { checkForWinnerTicTacToe, checkForDrawTicTacToe } from '../../util/gameLogic'
import { initializeTicTacToeBoard } from '../../util/functions'

export interface TTicTacToeState {
    board: TTicTacToeBoard
    side: TTicTacToeSide
    currentlyPlaying: TTicTacToeSide
    winner: 'X' | 'O' | null | 'draw'
    score: {
        X: number
        O: number
        draw: number
    }
}

export type TTicTacToeAction =
    { type: 'HOT_SEAT_MOVE'; payload: { COORD: [number, number] } }
    | { type: 'PLAY_AGAIN' };


const reducer = (prevState: TTicTacToeState, action: TTicTacToeAction) => {
    let update;
    switch (action.type) {
        case 'HOT_SEAT_MOVE':
            update = { ...prevState }
            const [x, y] = action.payload.COORD
            update.board = JSON.parse(JSON.stringify(prevState.board))
            update.board[x][y] = prevState.currentlyPlaying
            if (checkForDrawTicTacToe(update.board)) {
                update.winner = 'draw'
                update.score.draw += 1
            }
            if (checkForWinnerTicTacToe(update.board, [x, y], 3)) {
                update.winner = prevState.currentlyPlaying
                update.score[prevState.currentlyPlaying] += 1
            }
            update.currentlyPlaying = prevState.side === "X" ? 'O' : 'X'
            update.side = prevState.side === "X" ? 'O' : 'X'
            return update

        case 'PLAY_AGAIN':
            update = { ...prevState }
            update.board = initializeTicTacToeBoard(prevState.board.length)
            update.winner = null
            return update

        default:
            return { ...prevState }
    }
}

export default reducer