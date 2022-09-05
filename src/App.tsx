import './App.scss';
import './util/CSS/classes.scss'
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Main from './components/Main';
import TicTacToeOptions from './components/TicTacToe/TicTacToeOptions'
import TicTacToeBoard from './components/TicTacToe/TicTacToeBoard';
import UltimateTicTacToeOptions from './components/ultimateTicTacToe/UltimateTicTacToeOptions';
import UltimateTicTacToeBoard from './components/ultimateTicTacToe/UltimateTicTacToeBoard';
import UsernameModal from './components/UsernameModal';
import CustomSwitch from './components/CustomSwitch';
import socket from 'src/util/socketInstance'


function App() {
  const [username, setUsername] = useState<string | null>(null)
  const [displayModal, setDisplayModal] = useState<boolean>(false)
  const navigate = useNavigate();

  const test = () => {
    socket.emit('test')
  }

  const toggleModal = () => {
    setDisplayModal(prevState => prevState ? false : true)
  }

  const handleSubmitUsername = (username: string, remember: boolean) => {
    setUsername(username)
    if (remember) localStorage.setItem('username', username)
    else localStorage.removeItem('username')
  }

  useEffect(() => {
    const username = localStorage.getItem('username')
    if (username) setUsername(username)
    else setDisplayModal(true)
    if (!socket.hasListeners('STAR_GAME')) {
      socket.on('STAR_GAME', (gameId, gameName, side, opponentUsername) => {
        socket.gameId = gameId
        navigate(`${gameName}/multiplayer/${side}/${gameId}/${opponentUsername}`)
      })
    }

    socket.on('test', () => {
      console.log('testing')
    })

    return () => {
      socket.removeAllListeners()
    }
  }, [])

  useEffect(() => {
    if (!username) {
      setDisplayModal(true)
    }
  })

  return (
    <div className="App">
      <div className='appHeader'>
        <div className='menu' onClick={() => navigate("/")}>Menu</div>
        <button onClick={test}>click</button>
        <div
          className="username"
          onClick={toggleModal}
        >
          Username:{username}
        </div>
      </div>
      <Routes>
        <Route path='/TicTacToe' element={<TicTacToeOptions />} >
          <Route path='hotseat' element={<TicTacToeBoard mode={'hotseat'} username={username!} />} />
          <Route path='multiplayer/:side/:gameId/:opponentSide' element={<TicTacToeBoard mode={'multiplayer'} username={username!} />} />
        </Route>
        <Route path="/UltimateTicTacToe/" element={<UltimateTicTacToeOptions />} >
          <Route path="hotseat" element={<UltimateTicTacToeBoard mode={'hotseat'} username={username!} />} />
          <Route path="multiplayer/:side/:gameId/:opponentSide" element={<UltimateTicTacToeBoard mode={'multiplayer'} username={username!} />} />
        </Route>
        <Route path="/Chess" element={<CustomSwitch moving='X' />} >
          <Route path='Board' element={<CustomSwitch moving='O' />} />
        </Route>
        <Route path='*' element={<Main />} />
      </Routes>
      <UsernameModal showModal={displayModal} exitModal={toggleModal} submit={handleSubmitUsername} />
    </div >
  );
}

export default App;