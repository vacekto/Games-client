import { createContext, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { ClientToServerEvents, ServerToClientEvents } from 'shared/socketTypes'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:3001')

interface IAppContext {
  username: string | null
  socket: Socket
  setUsername: React.Dispatch<React.SetStateAction<string>>
}

export const appContext = createContext({ username: '', socket, setUsername: () => { console.log('initial context') } } as IAppContext)

interface IAppContextProviderProps {
  children: React.ReactNode
}

const AppContextProvider: React.FC<IAppContextProviderProps> = ({ children }) => {
  const [username, setUsername] = useState('')

  return <appContext.Provider value={{ username, setUsername, socket }}>
    {children}
  </ appContext.Provider>;

};
export default AppContextProvider; 