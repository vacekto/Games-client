import { io } from 'socket.io-client'
import { IGameSocet } from 'src/util/types'

const socket: IGameSocet = io('http://localhost:3001')

export default socket
