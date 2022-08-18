import { TUltimateTicTacToeBoard, TTicTacToeBoard } from "shared/types"

export const initializeUltimateTicTacToeBoard = () => {
    const initQuadrants = Array(3).fill(Array(3).fill(null))
    const initUltimateTicTacToeBoard: TUltimateTicTacToeBoard = initQuadrants.map(quadrantRow => {
        return quadrantRow.map(() => {
            return Array(3).fill(Array(3).fill(null))
        })
    })
    return initUltimateTicTacToeBoard
}

export const initializeTicTacToeBoard = (size: number) => {
    const initTicTacToeBoard: TTicTacToeBoard = Array(size).fill(Array(size).fill(null))
    return initTicTacToeBoard
}