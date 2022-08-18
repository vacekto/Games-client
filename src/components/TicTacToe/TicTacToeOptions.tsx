import './TicTacToeOptions.css'
import { Link, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react';
import socketInstance from '../../util/socketSingleton'

interface ITicTacToeOptionsProps {

}

const TicTacToeOptions: React.FC<ITicTacToeOptionsProps> = () => {
    const [searching, setSearching] = useState<boolean>(false) //search for oponent
    const socket = socketInstance

    const handleInvite = () => {

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

    return <div className='options'>
        <Link to={'/TicTacToe/board'}>Hotseat</Link>
        <button>VS PC</button>
        <button onClick={handleSearchClick}>Quick search</button>
        {searching ? 'searching ...' : null}
        <button onClick={handleInvite}>invite friend</button>
        <Link to={'/'}>back</Link>
        <Outlet />
    </div>;
};

export default TicTacToeOptions;