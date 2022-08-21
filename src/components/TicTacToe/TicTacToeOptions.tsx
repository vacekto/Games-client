import './TicTacToeOptions.scss'
import { Link, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react';
import socketInstance from '../../util/socketSingleton'
import Lobby from '../Lobby'

interface ITicTacToeOptionsProps {

}

const TicTacToeOptions: React.FC<ITicTacToeOptionsProps> = () => {
    const [searching, setSearching] = useState<boolean>(false) //search for oponent
    const socket = socketInstance

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
        <div className='optionsContainer'>
            <div className='options'>
                <button><Link to={'/TicTacToe/board'}>Hotseat</Link></button>
                <button>VS PC</button>
                <button onClick={handleSearchClick}>Quick search</button>
                {searching ? 'searching ...' : null}
                <button >invite friend</button>
                <button><Link to={'/'}>back</Link></button>
            </div>
        </div>
        <Lobby />
        <Outlet />
    </div>;
};

export default TicTacToeOptions;