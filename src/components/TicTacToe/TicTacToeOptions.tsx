import './TicTacToeOptions.scss'
import { Link, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import socketInstance from '../../util/socketSingleton'
import Lobby from '../Lobby'

interface ITicTacToeOptionsProps {

}

const TicTacToeOptions: React.FC<ITicTacToeOptionsProps> = () => {
    const [searching, setSearching] = useState<boolean>(false) //search for oponent
    let navigate = useNavigate();
    const socket = socketInstance

    const handleClick = {
        hotseat: () => { navigate("Board") },
        vsPC: () => { },
        back: () => { navigate("../") }
    }

    const handleSearchClick = () => {
        if (searching) socket.emit('CANCEL_SEARCH_FOR_OPPONENT', 'ticTacToe')
        else socket.emit('SEARCH_FOR_OPPONENT', 'ticTacToe')
        setSearching(state => !state)
    }

    useEffect(() => {
        if (!socket.hasListeners('SERVER_GAME_UPDATE')) {
            socket.on('SERVER_GAME_UPDATE', () => {

            })
        }
        return () => {
            socket.removeAllListeners('SERVER_GAME_UPDATE')
        }
    }, [socket])

    return <div className='ticTacToeOptions'>
        <div className='genericOptionsContainer'>
            <div className='genericOptions'>
                <div className="gName">Tic Tac Toe</div>
                <button className="genericButton optionsButton" onClick={handleClick.hotseat}>Hotseat</button>
                <button className="genericButton optionsButton">VS PC</button>
                <button className="genericButton optionsButton" onClick={handleSearchClick}>Quick search</button>
                {searching ? 'searching ...' : null}
                <button className="genericButton optionsButton" >invite friend</button>
                <button className="genericButton optionsButton" onClick={handleClick.back}>Back</button>
            </div>
        </div>
        <Lobby />
        <Outlet />
    </div>;
};

export default TicTacToeOptions;