import { Socket } from 'socket.io-client'
import { ClientToServerEvents, ServerToClientEvents } from 'shared/socketTypes'
export interface IGameSocet extends Socket<ServerToClientEvents, ClientToServerEvents> {
    gameId?: string | null
}