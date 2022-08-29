import { Socket } from 'socket.io-client'

export interface IGameSocket<T1, T2> extends Socket<T1, T2> {
    data?: {
        gameName?: string | null
        gameId?: string | null
    }
}