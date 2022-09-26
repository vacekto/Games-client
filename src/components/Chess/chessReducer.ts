import { TTicTacToeBoard, TTicTacToeSide, TGameMode, TChessBoard, TChessSide } from 'shared/types'
import * as chessPieces from 'src/util/chessPieces'
import { isInCheck, isCheckMate, movePiece, isMovePossible, checkForDrawChess, restoreChessPrototypes, createChessBoard } from 'src/util/chessLogic'

interface TChessState {
    board: TChessBoard
    selected: chessPieces.ChessPiece | null
    potentialMoves: [number, number][]
    enPassant: [number, number][]
    check: TChessSide | null
    history: {
        piece: string,
        from: [number, number],
        to: [number, number]
    }[]
    side: TChessSide
    opponentUsername: string
    currentlyPlaying: TChessSide
    winner: 'white' | 'black' | null | 'draw'
    mode: TGameMode
    score: {
        white: number
        black: number
        draw: number
    }
}

export type TChessAction =
    { type: 'HOTSEAT_MOVE'; payload: [number, number] }
    | { type: 'MULTIPLAYER_MOVE', payload: { board: TChessBoard, check: TChessSide | null } }
    | { type: 'PLAYER_WON_GAME', payload: TChessSide | 'draw' }
    | { type: 'NEW_GAME' }
    | { type: 'SELECT', payload: [number, number] }
    | { type: 'TEST' }



const reducer = (prevState: TChessState, action: TChessAction) => {
    let update = { ...prevState }

    switch (action.type) {
        case 'SELECT':
            const [x, y] = action.payload
            if (update.selected === update.board[x][y] || update.board[x][y] === null) {
                update.selected = null
                update.potentialMoves = []
                update.enPassant = []
            }
            else {
                update.selected = update.board[x][y]
                update.potentialMoves = update.selected!.getPotencialMoves(update.board)
                if (update.selected!.constructor.name === 'King') {
                    const castlingMoves = (update.selected as chessPieces.King).checkForCastling(update.board)
                    castlingMoves.forEach(m => update.potentialMoves.push(m))

                } else if (update.selected!.constructor.name === 'Pawn') {
                    const enPassantMoves = (update.selected as chessPieces.Pawn).checkForEnPassant(update.board, update.history.at(-1)!)
                    enPassantMoves.forEach(m => update.potentialMoves.push(m))
                    update.enPassant = enPassantMoves
                }
            }
            return update
        case 'TEST':
            const test: any[] = ['jhah']
            console.log(test.at(-1))
            return update
        case 'HOTSEAT_MOVE':
            if (!isMovePossible(update.board, update.selected!.boardCOORD, action.payload, update.currentlyPlaying)) return update
            update.history.push({ piece: update.selected!.className, from: update.selected!.boardCOORD, to: action.payload })
            movePiece(update.board, update.selected!.boardCOORD, action.payload)
            update.selected = null
            update.potentialMoves = []
            const opponentSide: TChessSide = prevState.currentlyPlaying === 'black' ? 'white' : 'black'
            let winner = null as ('white' | 'black' | null | 'draw')
            if (isInCheck(update.board, opponentSide)) {
                update.check = opponentSide
                if (isCheckMate(update.board, opponentSide)) {
                    console.log('checkMate')
                    winner = update.side
                }
            }
            else if (checkForDrawChess(update.board, opponentSide)) {
                winner = 'draw'
            }
            if (winner) {
                update.winner = winner
                update.score[winner] += 1
            }
            update.currentlyPlaying = opponentSide
            update.side = opponentSide
            return update

        case 'MULTIPLAYER_MOVE':
            const { board, check } = action.payload
            update.board = board
            restoreChessPrototypes(update.board)
            update.check = check
            update.selected = null
            update.potentialMoves = []
            update.currentlyPlaying = update.currentlyPlaying === 'black' ? 'white' : 'black'
            return update

        case 'PLAYER_WON_GAME':
            update.winner = action.payload
            update.score[action.payload] += 1
            return update

        case 'NEW_GAME':
            update.board = createChessBoard()
            update.winner = null
            update.potentialMoves = []
            update.history = []
            update.selected = null
            update.check = null
            update.currentlyPlaying = 'white'
            if (update.mode === 'hotseat') update.side = 'white'
            return update

        default:
            return update
    }
}

export default reducer