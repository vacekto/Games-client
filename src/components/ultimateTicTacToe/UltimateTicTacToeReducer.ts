import { checkForWinnerTicTacToe, checkForDrawTicTacToe } from 'src/util/ticTacToeLogic'
import { initializeUltimateTicTacToeBoard, initializeTicTacToeBoard } from 'src/util/ticTacToeLogic'
import { TTicTacToeBoard, TGameMode, TUltimateTiTacTocBoard, TTicTacToeSide } from 'shared/types'

export interface TUltimateTicTacToeState {
    activeSegment: null | [number, number]
    segmentBoard: TTicTacToeBoard
    ultimateBoard: TTicTacToeBoard[][]
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

export type TUltimateTicTacToeAction =
    {
        type: 'HOTSEAT_MOVE', payload: {
            squareCOORD: [number, number],
            segmentCOORD: [number, number]
        }
    }
    | {
        type: 'MULTIPLAYER_MOVE', payload: {
            ultimateBoard: TUltimateTiTacTocBoard,
            segmentBoard: TTicTacToeBoard
            lastMoveCOORD: [number, number]
        }
    }
    | { type: 'PLAYER_WON_GAME', payload: TTicTacToeSide | 'draw' }
    | { type: 'NEW_GAME' }

const reducer = (prevState: TUltimateTicTacToeState, action: TUltimateTicTacToeAction) => {
    let update = { ...prevState }
    switch (action.type) {
        case 'HOTSEAT_MOVE':
            const [x, y] = action.payload.squareCOORD
            const [z, w] = action.payload.segmentCOORD
            update.ultimateBoard[z][w][x][y] = prevState.currentlyPlaying
            const segmentWin = checkForWinnerTicTacToe(update.ultimateBoard[z][w], [x, y], 3)
            const segmentDraw = checkForDrawTicTacToe(update.ultimateBoard[z][w])
            if (segmentDraw) update.segmentBoard[z][w] = 'draw'
            else if (segmentWin) {
                update.segmentBoard[z][w] = prevState.currentlyPlaying
                const isWinner = checkForWinnerTicTacToe(update.segmentBoard, [z, w], 3)
                if (isWinner) {
                    update.winner = prevState.currentlyPlaying
                    update.score[prevState.currentlyPlaying] += 1
                    return update
                }
            }
            if (checkForDrawTicTacToe(update.segmentBoard)) {
                update.winner = 'draw'
                update.score.draw += 1
            }
            update.side = prevState.side === 'X' ? 'O' : 'X'
            if (update.segmentBoard[x][y] || checkForDrawTicTacToe(update.ultimateBoard[x][y])) update.activeSegment = null
            else update.activeSegment = [x, y]
            update.currentlyPlaying = prevState.currentlyPlaying === 'X' ? 'O' : 'X'
            return update

        case 'MULTIPLAYER_MOVE':
            update.ultimateBoard = action.payload.ultimateBoard
            update.segmentBoard = action.payload.segmentBoard
            const [u, v] = action.payload.lastMoveCOORD
            if (update.segmentBoard[u][v]) update.activeSegment = null
            else update.activeSegment = [u, v]
            update.currentlyPlaying = (prevState.currentlyPlaying === "X" ? 'O' : 'X')
            return update

        case 'NEW_GAME':
            update = { ...prevState }
            update.ultimateBoard = initializeUltimateTicTacToeBoard()
            update.segmentBoard = initializeTicTacToeBoard(3)
            update.winner = null
            update.activeSegment = null
            return update


        case 'PLAYER_WON_GAME':
            update.winner = action.payload
            update.score[action.payload] += 1
            return update

        default:
            return { ...prevState }
    }
}

export default reducer