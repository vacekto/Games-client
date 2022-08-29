import './UltimateTicTacToeOptions.css'
//import socketInstance from '../../util/socketSingleton'
import { Link, Outlet } from 'react-router-dom'
import Lobby from '../Lobby'

interface IUltimateTicTacToeOptionsProps {

}

const UltimateTicTacToeOptions: React.FC<IUltimateTicTacToeOptionsProps> = (props) => {
    //const socket = socketInstance

    return <div className='ultimateTicTacToeOptions'>
        <div className="genericOptionsContainer">
            <div className="genericOptions">
                <Link className="genericRouterLink" to={'/UltimateTicTacToe/Board'}>Hotseat</Link>
                <button>VS PC</button>
                <Link className="genericRouterLink" to={'/'}>back</Link>
            </div>
        </div>
        <Lobby />
        <Outlet />
    </div>;
};

export default UltimateTicTacToeOptions;