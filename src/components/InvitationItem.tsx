import './InvitationItem.scss'
import { IInvitationItem } from 'shared/types'
import { useState } from 'react'
import socket from 'src/util/socketInstance'

interface IInvitationItemProps {
    item: IInvitationItem
    deleteItem: (senderId: string) => void
}

const InvitationItem: React.FC<IInvitationItemProps> = ({ item, deleteItem }) => {
    const [extendItem, setExtendItem] = useState<boolean>(false)
    const [message, setMessage] = useState<'error' | 'default'>('default')

    const gameName = {
        ticTacToe: 'Tic Tac Toe',
        ultimateTicTacToe: 'Ultimate Tic Tac Toe'
    }

    let messageOptions = {
        default: `User ${item.senderUsername} invited you to the game of ${gameName[item.gameName]} !`,
        error: 'Opponent is no longer online'
    }

    const handleAccept = () => {
        socket.emit('ACCEPT_GAME_INVITE', item.gameName, item.senderId, () => {
            setMessage('error')
        })
        setTimeout(() => {
            deleteItem(item.senderId)
        }, 5000)
    }

    const handleRefuse = () => {
        deleteItem(item.senderId)
    }

    return <div className='notificationItem'>
        <div className="message" onClick={() => setExtendItem(!extendItem)} >
            {messageOptions[message]}
        </div>
        <div className="responces" style={{ top: extendItem ? '70px' : '0px' }} >
            <div className="accept responceOption" onClick={handleAccept}>Accept</div>
            <div className="refuse responceOption" onClick={handleRefuse}>Refuse</div>
        </div>
    </div >;
};

export default InvitationItem;