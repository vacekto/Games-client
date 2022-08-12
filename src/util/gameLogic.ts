import { TTicTacToeBoard } from "shared/types"

export const checkForWinnerTicTacToe = (state: TTicTacToeBoard, move: [number, number], winCondition: number) => {
    const [x, y] = move
    const player = state[x][y]
    const size = state.length
    let isWinner = false

    if (player === null) return false

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


    directions.forEach((direction) => {
        let count = 1
        for (let i = 1; i < winCondition; i++) {
            const [a, b] = direction[0](move, i)
            const [c, d] = direction[1](move, i)
            if (0 <= a && a < size && 0 <= b && b < size) {
                if (player === state[a][b]) count++
            }
            if (0 <= c && c < size && 0 <= d && d < size) {
                if (player === state[c][d]) count++
            }
        }
        if (count >= winCondition) isWinner = true
    })

    return isWinner
}

