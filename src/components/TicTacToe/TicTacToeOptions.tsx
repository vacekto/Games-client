import './TicTacToeOptions.scss'
import { Outlet } from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { IUser } from 'shared/types'
import Lobby from '../Lobby'
import socket from 'src/util/socketInstance'

interface ITicTacToeOptionsProps {
    lobbyUsers: IUser[]
    username: string
    displaySmallerLobby: boolean
}

const TicTacToeOptions: React.FC<ITicTacToeOptionsProps> = ({ lobbyUsers, username, displaySmallerLobby }) => {
    const [searching, setSearching] = useState<boolean>(false)
    let navigate = useNavigate();

    const handleClick = {
        hotseat: () => { navigate("hotseat") },
        vsPC: () => { },
        back: () => { navigate("../") },
        search: () => {
            if (searching) socket.emit('CANCEL_SEARCH_FOR_OPPONENT', 'ticTacToe')
            else socket.emit('SEARCH_FOR_OPPONENT', 'ticTacToe')
            setSearching(prevState => !prevState)
        }
    }

    return <div className='ticTacToeOptions'>
        <div className='genericOptionsContainer'>
            <div className='genericOptions'>
                <div className="gameName">Tic Tac Toe</div>
                <button className="genericButton optionsButton" onClick={handleClick.hotseat}>Hotseat</button>
                <button className="genericButton optionsButton">VS PC</button>
                <button className="genericButton optionsButton" onClick={handleClick.search}>{searching ? 'Searching..' : 'Find opponent'}</button>
                <button className="genericButton optionsButton" onClick={handleClick.back}>Back</button>
            </div>
        </div>
        <Lobby lobbyUsers={lobbyUsers} username={username} gameName='ticTacToe' displaySmallerLobby={displaySmallerLobby} />
        <Outlet />
    </div>;
};

export default TicTacToeOptions;