import './UltimateTicTacToeOptions.scss'
import { Outlet } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Lobby from '../Lobby'
import { IUser } from 'shared/types'
import socket from 'src/util/socketInstance'

interface IUltimateTicTacToeOptionsProps {
    lobbyUsers: IUser[]
    username: string
}

const UltimateTicTacToeOptions: React.FC<IUltimateTicTacToeOptionsProps> = ({ lobbyUsers, username }) => {
    const [searching, setSearching] = useState<boolean>(false)
    let navigate = useNavigate();

    const handleClick = {
        hotseat: () => { navigate("hotseat") },
        vsPC: () => { },
        back: () => { navigate("../") }
    }

    const handleSearchClick = () => {
        if (searching) socket.emit('CANCEL_SEARCH_FOR_OPPONENT', 'ultimateTicTacToe')
        else socket.emit('SEARCH_FOR_OPPONENT', 'ultimateTicTacToe')
        setSearching(prevState => !prevState)
    }

    return <div className='ultimateTicTacToeOptions'>
        <div className="genericOptionsContainer">
            <div className="genericOptions">
                <div className="gameName">Ultimate Tic Tac Toe</div>
                <button className="genericButton optionsButton" onClick={handleClick.hotseat}> Hotseat </button>
                <button className="genericButton optionsButton">VS PC</button>
                <button className="genericButton optionsButton" onClick={handleSearchClick}>{searching ? 'Searching..' : 'Find opponent'}</button>
                <button className="genericButton optionsButton" onClick={handleClick.back}>Back</button>
            </div>
        </div>
        <Lobby lobbyUsers={lobbyUsers} username={username} gameName='ultimateTicTacToe' />
        <Outlet />
    </div >;
};

export default UltimateTicTacToeOptions;