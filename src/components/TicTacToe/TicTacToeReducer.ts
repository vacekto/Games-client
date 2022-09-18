import { checkForWinnerTicTacToe, checkForDrawTicTacToe } from 'src/util/ticTacToeLogic'
import { initializeTicTacToeBoard } from 'src/util/ticTacToeLogic'
import { TTicTacToeBoard, TTicTacToeSide, TGameMode } from 'shared/types'

interface TTicTacToeState {
    board: TTicTacToeBoard
    side: TTicTacToeSide
    opponentUsername: string
    currentlyPlaying: TTicTacToeSide
    winner: 'X' | 'O' | null | 'draw'
    mode: TGameMode
    score: {
        X: number
        O: number
        draw: number
    }
}

export type TTicTacToeAction =
    { type: 'HOTSEAT_MOVE'; payload: { COORD: [number, number] } }
    | { type: 'MULTIPLAYER_MOVE', payload: TTicTacToeBoard }
    | { type: 'PLAYER_WON_GAME', payload: TTicTacToeSide | 'draw' }
    | { type: 'NEW_GAME' }


const reducer = (prevState: TTicTacToeState, action: TTicTacToeAction) => {
    let update = { ...prevState }
    switch (action.type) {
        case 'HOTSEAT_MOVE':
            console.log('test')
            const [x, y] = action.payload.COORD
            update.board[x][y] = prevState.currentlyPlaying
            if (checkForDrawTicTacToe(update.board)) {
                update.winner = 'draw'
                update.score.draw += 1
            }
            if (checkForWinnerTicTacToe(update.board, [x, y], 5)) {
                update.winner = prevState.currentlyPlaying
                update.score[prevState.currentlyPlaying] += 1
            }
            update.side = prevState.side === "X" ? 'O' : 'X'
            update.currentlyPlaying = prevState.side === "X" ? 'O' : 'X'
            return update

        case 'MULTIPLAYER_MOVE':
            update.board = action.payload
            update.currentlyPlaying = (prevState.currentlyPlaying === "X" ? 'O' : 'X')
            return update

        case 'PLAYER_WON_GAME':
            update.winner = action.payload
            update.score[action.payload] += 1
            return update

        case 'NEW_GAME':
            update.board = initializeTicTacToeBoard(prevState.board.length)
            update.winner = null
            return update

        default:
            return prevState
    }
}

export default reducer