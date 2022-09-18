import { TTicTacToeBoard } from "shared/types"

export const checkForWinnerTicTacToe = (state: TTicTacToeBoard, move: [number, number] | null, winCondition: number) => {
    if (!move) {
        for (let i = 0; i < state.length; i++) {
            for (let j = 0; j < state[i].length; j++) {
                if (checkForWinnerTicTacToe(state, [i, j], winCondition)) return true
            }
        }
        return false
    }
    else {
        const [x, y] = move
        if (state[x][y] === null) return false

        const directions = [
            [
                (move: [number, number], i: number) => [move[0] + i, move[1]],
                (move: [number, number], i: number) => [move[0] - i, move[1]],
            ],
            [
                (move: [number, number], i: number) => [move[0] + i, move[1] + i],
                (move: [number, number], i: number) => [move[0] - i, move[1] - i],
            ],
            [
                (move: [number, number], i: number) => [move[0], move[1] + i],
                (move: [number, number], i: number) => [move[0], move[1] - i],
            ],
            [
                (move: [number, number], i: number) => [move[0] - i, move[1] + i],
                (move: [number, number], i: number) => [move[0] + i, move[1] - i],
            ]
        ]

        const player = state[x][y]
        const size = state.length
        let isWinner = false

        const checkDirection = (count: { current: number }, direction: (move: [number, number], i: number) => number[]) => {
            for (let i = 1; i < winCondition; i++) {
                const [a, b] = direction(move, i)
                if (0 <= a && a < size && 0 <= b && b < size) {
                    if (state[a][b] === null) break
                    if (player === state[a][b]) count.current++
                }
            }
        }

        directions.forEach((direction) => {
            let count = { current: 1 }
            checkDirection(count, direction[0])
            checkDirection(count, direction[1])
            if (count.current >= winCondition) isWinner = true
        })

        return isWinner
    }
}

export const checkForDrawTicTacToe = (state: TTicTacToeBoard) => {
    for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[i].length; j++) {
            if (state[i][j] === null) return false
        }
    }

    return true
}

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