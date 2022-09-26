import './ChessOptions.scss'
import { IUser } from 'shared/types';
import { useState } from 'react';
import { useNavigate, Outlet } from "react-router-dom";
import Lobby from '../Lobby'
import socket from 'src/util/socketInstance'


interface IChessOptionsProps {
    lobbyUsers: IUser[]
    username: string
    displaySmallerLobby: boolean
}

const ChessOptions: React.FC<IChessOptionsProps> = ({ lobbyUsers, username, displaySmallerLobby }) => {
    const [searching, setSearching] = useState<boolean>(false)
    let navigate = useNavigate();

    const handleClick = {
        hotseat: () => { navigate("hotseat") },
        vsPC: () => { },
        back: () => { navigate("../") },
        search: () => {
            if (searching) socket.emit('CANCEL_SEARCH_FOR_OPPONENT', 'chess')
            else socket.emit('SEARCH_FOR_OPPONENT', 'chess')
            setSearching(prevState => !prevState)
        }
    }

    return <div className='chessOptions'>
        <div className="genericOptionsContainer">
            <div className="genericOptions">
                <div className="gameName">Chess</div>
                <button className="genericButton optionsButton" onClick={handleClick.hotseat}> Hotseat </button>
                <button className="genericButton optionsButton">VS PC</button>
                <button className="genericButton optionsButton" onClick={handleClick.search}>{searching ? 'Searching..' : 'Find opponent'}</button>
                <button className="genericButton optionsButton" onClick={handleClick.back}>Back</button>
            </div>
        </div>
        <Lobby lobbyUsers={lobbyUsers} username={username} gameName='ultimateTicTacToe' displaySmallerLobby={displaySmallerLobby} />
        <Outlet />
    </div>;
};

export default ChessOptions;