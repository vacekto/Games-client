import './App.scss';
import './util/CSS/classes.scss'
import { Route, Routes, Link } from "react-router-dom";
import { useState } from 'react';
import Main from './components/Main';
import TicTacToeOptions from './components/TicTacToe/TicTacToeOptions'
import TicTacToeBoard from './components/TicTacToe/TicTacToeBoard';
import UltimateTicTacToeOptions from './components/ultimateTicTacToe/UltimateTicTacToeOptions';
import UltimateTicTacToeBoard from './components/ultimateTicTacToe/UltimateTicTacToeBoard';
import UsernameModal from './components/UsernameModal';
import { Circle, Times } from './util/SVG'

function App() {
  const [username, setUsername] = useState<string | null>('Tom')
  const [displayModal, setDisplayModal] = useState<'flex' | 'none'>('none')

  const toggleModal = () => {
    setDisplayModal(prevState => prevState === 'none' ? 'flex' : 'none')
  }

  const handleSubmitUsername = (username: string) => {
    setUsername(username)
    setDisplayModal('none')
  }


  return (
    <div className="App">
      <div className='appHeader'>
        <Link to='/'>Menu</Link>
        <div
          className="username"
          onClick={() => { setDisplayModal(prevState => prevState === 'flex' ? 'none' : 'flex') }}
        >
          {username}
        </div>
      </div>
      <Routes>
        <Route path='/TicTacToe' element={<TicTacToeOptions />} >
          <Route path='Board' element={<TicTacToeBoard />} />
        </Route>
        <Route path="/UltimateTicTacToe" element={<UltimateTicTacToeOptions />} >
          <Route path="Board" element={<UltimateTicTacToeBoard />} />
        </Route>
        <Route path="/Chess" element={<TicTacToeOptions />} >
          <Route path='Board' element={<TicTacToeBoard />} />
        </Route>

        <Route path='*' element={<Main />} />
      </Routes>
      <UsernameModal style={displayModal} exitModal={toggleModal} submit={handleSubmitUsername} />
    </div >
  );
}

export default App;