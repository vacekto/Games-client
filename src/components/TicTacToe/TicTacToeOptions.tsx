import './TicTacToeOptions.scss'
import { Outlet } from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Lobby from '../Lobby'
import socket from 'src/util/socketInstance'

interface ITicTacToeOptionsProps {
}

const TicTacToeOptions: React.FC<ITicTacToeOptionsProps> = (props) => {
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
        <Lobby />
        <Outlet />
    </div>;
};

export default TicTacToeOptions;