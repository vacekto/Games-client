import { io, Socket } from 'socket.io-client'
import { ClientToServerEvents, ServerToClientEvents } from 'shared/socketTypes'
import { IGameSocet } from './types'

const socket: IGameSocet = io('http://localhost:3001')

export default socket