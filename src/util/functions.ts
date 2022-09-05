import { TTicTacToeBoard } from "shared/types"

export const initializeTicTacToeBoard = (size: number) => {
    let state: any = [];
    for (let i = 0; i < size; i++) {
        state[i] = []
        for (let j = 0; j < size; j++) {
            state[i][j] = null
        }
    }
    return state as TTicTacToeBoard
}

export const initializeUltimateTicTacToeBoard = () => {
    const initQuadrants = initializeTicTacToeBoard(3)
    const initUltimateTicTacToeBoard = initQuadrants.map(quadrantRow => {
        return quadrantRow.map(() => {
            return initializeTicTacToeBoard(3)
        })
    })
    return initUltimateTicTacToeBoard
}