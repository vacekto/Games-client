import './App.css';
import { Route, Routes } from "react-router-dom";
import TicTacToe from './components/TicTacToe';
import UltimateTicTacToe from './components/UltimateTicTacToe';
import Menu from './components/Menu';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <div className='app-body'>
        <Routes>
          <Route path='/' element={<Menu />} />
          <Route path="/:TicTacToe" element={<TicTacToe />} />
          <Route path="/UltimateTicTacToe" element={<UltimateTicTacToe />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;