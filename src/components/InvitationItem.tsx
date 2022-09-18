import './InvitationItem.scss'
import { IInvitationItem } from 'shared/types'
import { useState } from 'react'
import socket from 'src/util/socketInstance'

interface IInvitationItemProps {
    item: IInvitationItem
    deleteItem: () => void
    extendItem: () => void
    indented: boolean
    extended: boolean
}

const InvitationItem: React.FC<IInvitationItemProps> = ({ item, deleteItem, indented, extended, extendItem }) => {
    const [message, setMessage] = useState<'error' | 'default'>('default')

    const gameName = {
        ticTacToe: 'Tic Tac Toe',
        ultimateTicTacToe: 'Ultimate Tic Tac Toe',
        chess: 'Chess'
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
            deleteItem()
        }, 500)
    }

    return <div className={`notificationItem ${indented ? 'move' : ''}`} >
        <div className="message" onClick={extendItem} >
            {messageOptions[message]}
        </div>
        <div className={`responces  ${extended ? 'move' : ''}`} >
            <div className="accept responceOption" onClick={handleAccept}>Accept</div>
            <div className="refuse responceOption" onClick={deleteItem}>Refuse</div>
        </div>
    </div >;
};

export default InvitationItem;