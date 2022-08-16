import './App.css';
import { Route, Routes } from "react-router-dom";
import UltimateTicTacToe from './components/UltimateTicTacToe';
import Menu from './components/Menu';
import NavigationBar from './components/NavigationBar';
import TicTacToeOptions from './components/TicTacToe/TicTacToeOptions'
import TicTacToeBoard from './components/TicTacToe/TicTacToeBoard';


function App() {
  return (
    <div className="App">
      <NavigationBar />
      <div className='app-body'>
        <Routes>
          <Route path='*' element={<Menu />} />
          <Route path='/TicTacToe' element={<TicTacToeOptions />} />
          <Route path='TicTacToe/board' element={<TicTacToeBoard />} />
          <Route path="/UltimateTicTacToe" element={<UltimateTicTacToe />} />
          <Route path="/options" element={<TicTacToeOptions />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;