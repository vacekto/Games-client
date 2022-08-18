import './UltimateTicTacToeOptions.css'
import socketInstance from '../../util/socketSingleton'
import { Link, Outlet } from 'react-router-dom'

interface IUltimateTicTacToeOptionsProps {

}

const UltimateTicTacToeOptions: React.FC<IUltimateTicTacToeOptionsProps> = (props) => {
    const socket = socketInstance

    return <div className='options'>
        <Link to={'/UltimateTicTacToe/Board'}>Hotseat</Link>
        <button>VS PC</button>
        <Link to={'/'}>back</Link>
        <Outlet />
    </div>;
};

export default UltimateTicTacToeOptions;