import { TChessBoard, TChessSide } from "shared/types"
import * as chessPieces from "./chessPieces";

const { Rook, Pawn, King, Queen, Bishop, Knight } = chessPieces

export const createChessBoard = () => {
    let board: TChessBoard = [];
    for (let i = 0; i < 8; i++) {
        board[i] = []
        for (let j = 0; j < 8; j++) {
            board[i][j] = null
        }
    }

    board[7][0] = new Rook('white', [7, 0])
    board[7][7] = new Rook('white', [7, 7])
    board[7][1] = new Knight('white', [7, 1])
    board[7][6] = new Knight('white', [7, 6])
    board[7][2] = new Bishop('white', [7, 2])
    board[7][5] = new Bishop('white', [7, 5])
    board[7][4] = new Queen('white', [7, 4])
    board[7][3] = new King('white', [7, 3])
    for (let i = 0; i < 8; i++) board[6][i] = new Pawn('white', [6, i])

    board[0][0] = new Rook('black', [0, 0])
    board[0][7] = new Rook('black', [0, 7])
    board[0][1] = new Knight('black', [0, 1])
    board[0][6] = new Knight('black', [0, 6])
    board[0][2] = new Bishop('black', [0, 2])
    board[0][5] = new Bishop('black', [0, 5])
    board[0][4] = new Queen('black', [0, 4])
    board[0][3] = new King('black', [0, 3])
    for (let i = 0; i < 8; i++) board[1][i] = new Pawn('black', [1, i])

    return board
}

export const restoreChessPrototypes = (board: TChessBoard) => {
    board.forEach(row => row.forEach(piece => {
        if (piece !== null) {
            //@ts-ignore
            let instance = Object.create(chessPieces[piece.className].prototype)
            for (const [key, value] of Object.entries(piece!)) {
                instance[key] = value
            }
            const [x, y] = instance.boardCOORD
            board[x][y] = instance
        }
    }))
}


const getKingCOORD = ((board, side) => {
    const pieceIconName = `King${side.at(0)!.toUpperCase() + side.slice(1)}`
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j]?.iconName === pieceIconName) return board[i][j]!.boardCOORD
        }
    }
}) as (board: TChessBoard, side: TChessSide) => [number, number]


export const isInCheck = (board: TChessBoard, side: TChessSide) => {
    const kingCOORD = getKingCOORD(board, side)
    return isPositionEndangered(board, side, kingCOORD)
}

export const isPositionEndangered = (board: TChessBoard, side: TChessSide, COORD: [number, number]) => {
    const [x, y] = COORD
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] !== null && board[i][j]!.side !== side) {
                const potentialMoves = board[i][j]!.getPotencialMoves(board)
                for (let move of potentialMoves) {
                    if (move[0] === x && move[1] === y) return true
                }
            }
        }
    }
    return false
}

export const movePiece = (board: TChessBoard, from: [number, number], to: [number, number]) => {
    const [x, y] = from
    const [u, v] = to
    const distance = from[1] - to[1]
    if (board[x][y]!.className === 'King' && Math.abs(distance) === 2) {
        (board[x][y]! as chessPieces.King).moved = true
        if (distance === 2) {
            board[x][1] = board[x][3]
            board[x][1]!.boardCOORD = [x, 1]
            board[x][3] = null
            board[x][2] = board[x][0]
            board[x][2]!.boardCOORD = [x, 2]
            board[x][0] = null
        }
        else {
            board[x][5] = board[x][3]
            board[x][5]!.boardCOORD = [x, 5]
            board[x][3] = null
            board[x][4] = board[x][7]
            board[x][4]!.boardCOORD = [x, 4]
            board[x][7] = null
        }
        return board
    }

    if (board[x][y]!.className === 'Pawn') {
        (board[x][y]! as chessPieces.Pawn).moved = true
        if (to[0] === 0 || to[0] === 7) {
            const { side } = board[x][y]!
            board[to[0]][to[1]] = new Queen(side, to)
            board[from[0]][from[1]] = null
            return board
        }

        if (from[1] !== to[1] && board[to[0]][to[1]] === null) {
            if (from[0] - to[0] > 0) board[to[0] + 1][to[1]] = null
            else board[to[0] - 1][to[1]] = null
        }

    }

    board[u][v] = board[x][y]
    board[u][v]!.boardCOORD = [u, v]
    board[x][y] = null

    return board

}

export const checkForDrawChess = (board: TChessBoard, side: TChessSide) => {
    if (isInCheck(board, side)) return false
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] !== null && board[i][j]!.side === side) {
                const potentialMoves = board[i][j]!.getPotencialMoves(board)
                for (let move of potentialMoves) {
                    if (isMovePossible(board, board[i][j]!.boardCOORD, move, side)) return false
                }
            }
        }
    }
    return true
}

export const isMovePossible = (board: TChessBoard, from: [number, number], to: [number, number], side: TChessSide) => {
    const mockBoard = structuredClone(board)
    restoreChessPrototypes(mockBoard)
    movePiece(mockBoard, from, to)
    if (isInCheck(mockBoard, side)) return false
    return true
}

export const isCheckMate = (board: TChessBoard, side: TChessSide) => {
    if (!isInCheck(board, side)) return false
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] !== null) {
                const piece = board[i][j]
                if (piece!.side === side) {
                    const potentialMoves = board[i][j]!.getPotencialMoves(board)
                    for (let move of potentialMoves) {
                        const mockBoard = structuredClone(board)
                        restoreChessPrototypes(mockBoard)
                        movePiece(mockBoard, piece!.boardCOORD, move)
                        if (!isInCheck(mockBoard, side)) return false
                    }
                }
            }
        }
    }
    return true
}

