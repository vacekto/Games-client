import './UltimateTicTacToeOptions.scss'
import { Outlet } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Lobby from '../Lobby'
import { IUser } from 'shared/types'
import socket from 'src/util/socketInstance'

interface IUltimateTicTacToeOptionsProps {
    lobbyUsers: IUser[]
    username: string
}

const UltimateTicTacToeOptions: React.FC<IUltimateTicTacToeOptionsProps> = ({ lobbyUsers, username }) => {
    let navigate = useNavigate();

    const handleClick = {
        hotseat: () => { navigate("hotseat") },
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
        <Lobby lobbyUsers={lobbyUsers} username={username} gameName='ultimateTicTacToe' />
        <Outlet />
    </div >;
};

export default UltimateTicTacToeOptions;