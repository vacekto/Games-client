import { io, Socket } from 'socket.io-client'
import { ClientToServerEvents, ServerToClientEvents } from 'shared/socketTypes'
export interface IGameSocet extends Socket<ServerToClientEvents, ClientToServerEvents> {
    gameId?: string | null
}

const socket: IGameSocet = io('http://localhost:3001')

export default socket
