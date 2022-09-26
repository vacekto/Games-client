import './App.scss';
import './util/CSS/classes.scss'
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { IUser } from 'shared/types';
import Main from './components/Main';
import TicTacToeOptions from './components/TicTacToe/TicTacToeOptions'
import TicTacToeBoard from './components/TicTacToe/TicTacToeBoard';
import UltimateTicTacToeOptions from './components/UltimateTicTacToe/UltimateTicTacToeOptions';
import UltimateTicTacToeBoard from './components/UltimateTicTacToe/UltimateTicTacToeBoard';
import UsernameModal from './components/UsernameModal';
import ChessOptions from './components/Chess/ChessOptions';
import Invitations from './components/Invitations'
import ChessBoard from './components/Chess/ChessBoard';
import socket from 'src/util/socketInstance'



function App() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(localStorage.getItem('username'))
  const [displayUsernameModal, setDisplayUsernameModal] = useState<boolean>(!Boolean(localStorage.getItem('username')))
  const [displayInvitations, setDisplayInvitations] = useState<boolean>(false)
  const [lobby, setLobby] = useState<IUser[]>([])
  const [displaySmallerLobby, setDisplaySmallerLobby] = useState<boolean>(false)
  const location = useLocation();

  const toggleLobby = () => setDisplaySmallerLobby(!displaySmallerLobby)
  const toggleInvitations = () => setDisplayInvitations(!displayInvitations)
  const toggleUsernameModal = () => setDisplayUsernameModal(!displayUsernameModal)
  const handleSubmitUsername = (newUsername: string, remember: boolean) => {
    setUsername(newUsername)
    if (remember) localStorage.setItem('username', newUsername)
  }

  const test = () => {

    socket.emit('test', Infinity)
  }

  useEffect(() => {
    if (username) {
      socket.emit('SET_USERNAME', username.trim(), (response => {
        if (response.error) {
          setUsername(null)
          setDisplayUsernameModal(true)
        }
        else {
          setUsername(username)
          setDisplayUsernameModal(false)
        }
      }))
    }

    if (!socket.hasListeners('START_GAME')) {
      socket.on('START_GAME', (gameId, gameName, side, opponentUsername) => {
        console.log('game started')
        socket.gameId = gameId
        navigate(`${gameName}/multiplayer/${gameId}/${side}/${opponentUsername}`)
      })
    }


    if (!socket.hasListeners('LOBBY_UPDATE')) {
      socket.on('LOBBY_UPDATE', (lobby) => {
        setLobby(lobby)
      })
    }

    socket.on('test', (arg) => {

    })
    socket.emit('JOIN_LOBBY')

  }, [])

  useEffect(() => {
    if (!username) {
      setDisplayUsernameModal(true)
    }
  })

  return (<div className="appContainer">
    <div className="App">

      <Invitations show={displayInvitations} toggleShow={toggleInvitations} />

      <div className='appHeader'>
        <div className="left">
          <button onClick={test}>test</button>
          <div className='inv' onClick={toggleInvitations}>Game invitations</div>
        </div>
        <div className='middle' style={{ display: location.pathname === '/' ? 'none' : 'inline-block' }}>
          <button></button>
          <div onClick={toggleLobby}>
            Lobby
          </div>
        </div>
        <div className="right">
          <div
            className="username"
            onClick={toggleUsernameModal}
          >
            <div className='placeholder' >username:</div>
            <div className='value'>{username}</div>

          </div>
        </div>
      </div>

      <Routes>
        <Route path='/TicTacToe' element={<TicTacToeOptions lobbyUsers={lobby} username={username!} displaySmallerLobby={displaySmallerLobby} />} >
          <Route path='hotseat' element={<TicTacToeBoard mode={'hotseat'} username={username!} />} />
          <Route path='multiplayer/:gameId/:side/:opponentUsername' element={<TicTacToeBoard mode={'multiplayer'} username={username!} />} />
        </Route>
        <Route path="/UltimateTicTacToe/" element={<UltimateTicTacToeOptions lobbyUsers={lobby} username={username!} displaySmallerLobby={displaySmallerLobby} />} >
          <Route path="hotseat" element={<UltimateTicTacToeBoard mode={'hotseat'} username={username!} />} />
          <Route path="multiplayer/:gameId/:side/:opponentUsername" element={<UltimateTicTacToeBoard mode={'multiplayer'} username={username!} />} />
        </Route>
        <Route path="/Chess" element={<ChessOptions lobbyUsers={lobby} username={username!} displaySmallerLobby={displaySmallerLobby} />} >
          <Route path="hotseat" element={<ChessBoard mode={'hotseat'} username={username!} />} />
          <Route path="multiplayer/:gameId/:side/:opponentUsername" element={<ChessBoard mode={'multiplayer'} username={username!} />} />
        </Route>
        <Route path='*' element={<Main />} />
      </Routes>
      <UsernameModal show={displayUsernameModal} exitModal={toggleUsernameModal} submit={handleSubmitUsername} />

    </div >
  </div>
  );
}

export default App;