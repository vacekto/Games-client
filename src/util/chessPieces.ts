import { TChessBoard, TChessSide } from 'shared/types'
import { isPositionEndangered } from './chessLogic'
type direction = ((COORD: [number, number], i?: number) => [number, number])

const up = ((COORD: [number, number], i: number) => [COORD[0] - i, COORD[1]]) as direction
const upRight = ((COORD: [number, number], i: number) => [COORD[0] - i, COORD[1] + i]) as direction
const right = ((COORD: [number, number], i: number) => [COORD[0], COORD[1] + i]) as direction
const downRight = ((COORD: [number, number], i: number) => [COORD[0] + i, COORD[1] + i]) as direction
const down = ((COORD: [number, number], i: number) => [COORD[0] + i, COORD[1]]) as direction
const downLeft = ((COORD: [number, number], i: number) => [COORD[0] + i, COORD[1] - i]) as direction
const left = ((COORD: [number, number], i: number) => [COORD[0], COORD[1] - i]) as direction
const upLeft = ((COORD: [number, number], i: number) => [COORD[0] - i, COORD[1] - i]) as direction

const outOfBounds = (x: number, y: number) => (x < 0 || y < 0 || 7 < x || 7 < y)

const knightDirections = [
    ((COORD: [number, number]) => { return [COORD[0] - 2, COORD[1] + 1] }),
    ((COORD: [number, number]) => { return [COORD[0] - 2, COORD[1] - 1] }),
    ((COORD: [number, number]) => { return [COORD[0] + 1, COORD[1] + 2] }),
    ((COORD: [number, number]) => { return [COORD[0] - 1, COORD[1] + 2] }),
    ((COORD: [number, number]) => { return [COORD[0] + 2, COORD[1] + 1] }),
    ((COORD: [number, number]) => { return [COORD[0] + 2, COORD[1] - 1] }),
    ((COORD: [number, number]) => { return [COORD[0] + 1, COORD[1] - 2] }),
    ((COORD: [number, number]) => { return [COORD[0] - 1, COORD[1] - 2] })
] as direction[]

export class ChessPiece {
    className: string
    side: TChessSide
    movementLimit: number
    iconName: string
    boardCOORD: [number, number]

    getPotencialMoves(board: TChessBoard) {
        const potentialMoves: [number, number][] = []
        //@ts-ignore
        const directions = this.constructor.directions as direction[]
        directions.forEach(dir => {
            for (let i = 1; i <= this.movementLimit; i++) {
                const [x, y] = dir(this.boardCOORD, i)
                if (outOfBounds(x, y)) break
                if (board[x][y] === null) { potentialMoves.push([x, y]); continue }
                if (board[x][y]!.side !== this.side) { potentialMoves.push([x, y]); break }
                break
            }
        })

        return potentialMoves
    }

    constructor(
        movementLimit: number,
        side: TChessSide,
        iconName: string,
        boardCOORD: [number, number],
        className: string) {

        this.movementLimit = movementLimit
        this.side = side
        this.iconName = iconName
        this.boardCOORD = boardCOORD
        this.className = className
    }
}


export class Pawn extends ChessPiece {
    static directions = []
    moved: boolean

    checkForEnPassant(
        board: TChessBoard,
        lastMove: { piece: string, from: [number, number], to: [number, number] },
    ) {
        const enPassantMoves = []
        if (!lastMove) return []
        const { piece, from, to } = lastMove
        const distnace = from[0] - to[0]
        const [x, y] = this.boardCOORD
        if (piece === 'Pawn' && Math.abs(distnace) === 2) {
            if (to[1] === y - 1) {
                if (distnace > 0 && board[x + 1][y - 1] === null) enPassantMoves.push([x + 1, y - 1])
                else if (distnace < 0 && board[x - 1][y - 1] === null) enPassantMoves.push([x - 1, y - 1])
            } else if (to[1] === y + 1) {
                if (distnace > 0 && board[x + 1][y + 1] === null) enPassantMoves.push([x + 1, y + 1])
                else if (distnace < 0 && board[x - 1][y + 1] === null) enPassantMoves.push([x - 1, y + 1])
            }
        }
        return enPassantMoves as [number, number][]
    }

    getPotencialMoves(board: TChessBoard) {
        const potentialMoves: [number, number][] = []
        const [x, y] = this.boardCOORD
        let move = 1
        if (this.side === 'black') move = -1
        if (board[x - move][y] === null) {
            potentialMoves.push([x - move, y])
            if (!this.moved && board[x - 2 * move][y] === null) potentialMoves.push([x - 2 * move, y])
        }
        if (!outOfBounds(x - move, y + 1) && board[x - move][y + 1] !== null && board[x - move][y + 1]!.side !== this.side) potentialMoves.push([x - move, y + 1])
        if (!outOfBounds(x - move, y - 1) && board[x - move][y - 1] !== null && board[x - move][y - 1]!.side !== this.side) potentialMoves.push([x - move, y - 1])
        return potentialMoves
    }

    constructor(side: TChessSide, boardCOORD: [number, number]) {
        const iconName = `Pawn${side.charAt(0).toUpperCase() + side.slice(1)}`
        super(0, side, iconName, boardCOORD, 'Pawn')
        this.moved = false
    }
}

export class Bishop extends ChessPiece {
    static directions = [upLeft, downLeft, downRight, upRight]
    constructor(side: TChessSide, boardCOORD: [number, number]) {
        const iconName = `Bishop${side.charAt(0).toUpperCase() + side.slice(1)}`
        super(7, side, iconName, boardCOORD, 'Bishop')
    }
}

export class Rook extends ChessPiece {
    static directions = [up, left, down, right]
    moved: boolean
    constructor(side: TChessSide, boardCOORD: [number, number]) {
        const iconName = `Rook${side.charAt(0).toUpperCase() + side.slice(1)}`
        super(7, side, iconName, boardCOORD, 'Rook')
        this.moved = false
    }
}

export class Queen extends ChessPiece {
    static directions = [up, upLeft, left, downLeft, down, downRight, right, upRight]
    constructor(side: TChessSide, boardCOORD: [number, number]) {
        const iconName = `Queen${side.charAt(0).toUpperCase() + side.slice(1)}`
        super(7, side, iconName, boardCOORD, 'Queen')
    }
}

export class Knight extends ChessPiece {
    static directions = knightDirections

    getPotencialMoves(board: TChessBoard) {
        const potentialMoves: [number, number][] = []
        //@ts-ignore
        const directions = this.constructor.directions as direction[]
        directions.forEach(dir => {
            const [x, y] = dir(this.boardCOORD)
            if (!outOfBounds(x, y)) {
                if (board[x][y] === null) potentialMoves.push([x, y])
                else if (board[x][y]!.side !== this.side) potentialMoves.push([x, y])
            }
        })



        return potentialMoves
    }

    constructor(side: TChessSide, boardCOORD: [number, number]) {
        const iconName = `Knight${side.charAt(0).toUpperCase() + side.slice(1)}`
        super(0, side, iconName, boardCOORD, 'Knight')
    }
}

export class King extends ChessPiece {
    static directions = [up, upLeft, left, downLeft, down, downRight, right, upRight]
    moved: boolean

    checkForCastling(board: TChessBoard) {
        if (this.constructor.name !== 'King' || this.moved) return []
        const [x, y] = this.boardCOORD
        const counters = [1, -1]
        const castlingMoves: [number, number][] = []
        counters.forEach(counter => {
            const piece = board[x][counter === 1 ? 7 : 0]
            if (!piece || piece.constructor.name !== 'Rook') return
            if (this.side !== piece.side) return
            for (let i = y + counter; 0 < i && i < 7; i += counter) {
                console.log(x, i)
                if (board[x][i] !== null) return
                if (Math.abs(i - y) < 3) {
                    if (isPositionEndangered(board, this.side, [x, i])) return
                }
            }
            castlingMoves.push([x, y + 2 * counter])
        })
        return castlingMoves
    }


    getPotencialMoves(board: TChessBoard) {
        return super.getPotencialMoves(board)
    }

    constructor(side: TChessSide, boardCOORD: [number, number]) {
        const iconName = `King${side.charAt(0).toUpperCase() + side.slice(1)}`
        super(1, side, iconName, boardCOORD, 'King')
        this.moved = false
    }
}
