import './App.scss';
import './util/CSS/classes.scss'
import { Route, Routes } from "react-router-dom";
import { useState } from 'react'
import Menu from './components/Menu';
import NavigationBar from './components/NavigationBar';
import TicTacToeOptions from './components/TicTacToe/TicTacToeOptions'
import TicTacToeBoard from './components/TicTacToe/TicTacToeBoard';
import UltimateTicTacToeOptions from './components/ultimateTicTacToe/UltimateTicTacToeOptions';
import UltimateTicTacToeBoard from './components/ultimateTicTacToe/UltimateTicTacToeBoard';


function App() {

  return (
    <div className="App">
      <NavigationBar />
      <div className='app-body'>
        <Routes>
          <Route path='*' element={<Menu />} />
          <Route path='/TicTacToe' element={<TicTacToeOptions />} >
            <Route path='Board' element={<TicTacToeBoard />} />
          </Route>
          <Route path="/UltimateTicTacToe" element={<UltimateTicTacToeOptions />} >
            <Route path="Board" element={<UltimateTicTacToeBoard />} />
          </Route>
          <Route path="/Options" element={<TicTacToeOptions />} />
        </Routes>
      </div>
    </div >
  );
}

export default App;