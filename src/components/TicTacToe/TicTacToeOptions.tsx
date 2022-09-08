import './TicTacToeOptions.scss'
import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { IUser } from 'shared/types'
import Lobby from '../Lobby'
import socket from 'src/util/socketInstance'

interface ITicTacToeOptionsProps {
    lobbyUsers: IUser[]
    username: string
}

const TicTacToeOptions: React.FC<ITicTacToeOptionsProps> = ({ lobbyUsers, username }) => {
    const [searching, setSearching] = useState<boolean>(false)
    let navigate = useNavigate();

    const handleClick = {
        hotseat: () => { navigate("hotseat") },
        vsPC: () => { },
        back: () => { navigate("../") }
    }

    const handleSearchClick = () => {
        if (searching) socket.emit('CANCEL_SEARCH_FOR_OPPONENT', 'ticTacToe')
        else socket.emit('SEARCH_FOR_OPPONENT', 'ticTacToe')
        setSearching(prevState => !prevState)
    }

    useEffect(() => {
        socket.emit('JOIN_LOBBY')
        return () => {
            socket.emit('LEAVE_LOBBY')
        }
    }, [])

    return <div className='ticTacToeOptions'>
        <div className='genericOptionsContainer'>
            <div className='genericOptions'>
                <div className="gName">Tic Tac Toe</div>
                <button className="genericButton optionsButton" onClick={handleClick.hotseat}>Hotseat</button>
                <button className="genericButton optionsButton">VS PC</button>
                <button className="genericButton optionsButton" onClick={handleSearchClick}>{searching ? 'Searching..' : 'Find opponent'}</button>
                <button className="genericButton optionsButton" >invite friend</button>
                <button className="genericButton optionsButton" onClick={handleClick.back}>Back</button>
            </div>
        </div>
        <Lobby lobbyUsers={lobbyUsers} username={username} gameName='ticTacToe' />
        <Outlet />
    </div>;
};

export default TicTacToeOptions;