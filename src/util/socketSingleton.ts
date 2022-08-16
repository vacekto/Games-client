import { io } from 'socket.io-client'
import { ClientToServerEvents, ServerToClientEvents } from 'shared/eventTypes'
import { IGameSocket } from '../util/types'

console.log('socket initialized')
const socket: IGameSocket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:3001')
export default socket
