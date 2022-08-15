import './TicTacToeOptions.css'
import { Link, Route, Routes } from 'react-router-dom'
import TicTacToeBoard from './TicTacToeBoard'
interface IOptionsProps {

}

const Options: React.FC<IOptionsProps> = (props) => {

    return <div className='options'>
        <Link to={'/TicTacToe/board'}>Hotseat</Link>
        <button>VS PC</button>
        <button>Quick search</button>
        <Link to={'/TicTacToe'}>back</Link>
        
    </div >;
};

export default Options;