import './UltimateTicTacToeOptions.scss'
import { Outlet } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Lobby from '../Lobby'

interface IUltimateTicTacToeOptionsProps { }

const UltimateTicTacToeOptions: React.FC<IUltimateTicTacToeOptionsProps> = (props) => {
    let navigate = useNavigate();

    const handleClick = {
        hotseat: () => { navigate("Board") },
        vsPC: () => { },
        back: () => { navigate("../") }
    }

    return <div className='ultimateTicTacToeOptions'>
        <div className="genericOptionsContainer">
            <div className="genericOptions">
                <div className="gName">Ultimate Tic Tac Toe</div>
                <button className="genericButton optionsButton" onClick={handleClick.hotseat}>
                    Hotseat
                </button>
                <button className="genericButton optionsButton">
                    VS PC
                </button>
                <button className="genericButton optionsButton" onClick={handleClick.back}>
                    Back
                </button>
            </div>
        </div>
        <Lobby />
        <Outlet />
    </div >;
};

export default UltimateTicTacToeOptions;