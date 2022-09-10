import './App.scss';
import './util/CSS/classes.scss'
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { IUser } from 'shared/types';
import Main from './components/Main';
import TicTacToeOptions from './components/TicTacToe/TicTacToeOptions'
import TicTacToeBoard from './components/TicTacToe/TicTacToeBoard';
import UltimateTicTacToeOptions from './components/ultimateTicTacToe/UltimateTicTacToeOptions';
import UltimateTicTacToeBoard from './components/ultimateTicTacToe/UltimateTicTacToeBoard';
import UsernameModal from './components/UsernameModal';
import CustomSwitch from './components/CustomSwitch';
import Invitations from './components/Invitations'
import socket from 'src/util/socketInstance'


function App() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(localStorage.getItem('username'))
  const [displayUsernameModal, setDisplayUsernameModal] = useState<boolean>(!Boolean(localStorage.getItem('username')))
  const [displayInvitations, setDisplayInvitations] = useState<boolean>(false)
  const [lobby, setLobby] = useState<IUser[]>([])

  const toggleInvitations = () => setDisplayInvitations(!displayInvitations)
  const toggleUsernameModal = () => setDisplayUsernameModal(!displayUsernameModal)
  const handleSubmitUsername = (newUsername: string, remember: boolean) => {
    setUsername(newUsername)
    if (remember) localStorage.setItem('username', newUsername)
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

        console.log('lobby update ' + lobby)
        setLobby(lobby)
      })
    }

    socket.on('test', () => {
      console.log('testing')
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
          <div className='menu' onClick={toggleInvitations}>Game invitations</div>
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
        <Route path='/TicTacToe' element={<TicTacToeOptions lobbyUsers={lobby} username={username!} />} >
          <Route path='hotseat' element={<TicTacToeBoard mode={'hotseat'} username={username!} />} />
          <Route path='multiplayer/:gameId/:side/:opponentUsername' element={<TicTacToeBoard mode={'multiplayer'} username={username!} />} />
        </Route>
        <Route path="/UltimateTicTacToe/" element={<UltimateTicTacToeOptions lobbyUsers={lobby} username={username!} />} >
          <Route path="hotseat" element={<UltimateTicTacToeBoard mode={'hotseat'} username={username!} />} />
          <Route path="multiplayer/:gameId/:side/:opponentUsername" element={<UltimateTicTacToeBoard mode={'multiplayer'} username={username!} />} />
        </Route>
        <Route path="/Chess" element={<CustomSwitch moving='X' />} >
          <Route path='Board' element={<CustomSwitch moving='O' />} />
        </Route>
        <Route path='*' element={<Main />} />
      </Routes>

      <UsernameModal show={displayUsernameModal} exitModal={toggleUsernameModal} submit={handleSubmitUsername} />

    </div >
  </div>
  );
}

export default App;