import { TTicTacToeBoard, TTicTacToeSide, TGameSide } from 'shared/types'
import { checkForWinnerTicTacToe } from '../../util/gameLogic'

export type TTicTacToeState = {
    board: TTicTacToeBoard
    side: TTicTacToeSide
    currentlyPlaying: TTicTacToeSide
    winner: 'X' | 'O' | null
    score: {
        X: number
        O: number
        draw: number
    }
}

type TTicTacToeAction =
    | { type: 'HOT_SEAT_MOVE'; payload: { coordinates: [number, number] } }
//| { type: 'SET_SIDE' };


const reducer = (prevState: TTicTacToeState, action: TTicTacToeAction) => {
    switch (action.type) {
        case 'HOT_SEAT_MOVE':
            const [x, y] = action.payload.coordinates
            const board = JSON.parse(JSON.stringify(prevState.board))
            board[x][y] = prevState.currentlyPlaying
            const isWinner = checkForWinnerTicTacToe(board, [x, y], 5)
            const scoreUpdate = { ...prevState.score }
            if (isWinner) scoreUpdate[prevState.currentlyPlaying] += 1
            return {
                board,
                side: prevState.side === "X" ? 'O' : 'X' as TGameSide,
                currentlyPlaying: prevState.side === "X" ? 'O' : 'X' as TGameSide,
                winner: isWinner ? prevState.currentlyPlaying : null,
                score: { ...scoreUpdate }
            }

        default:
            throw new Error()
    }
}

export default reducer