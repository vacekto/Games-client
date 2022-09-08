import './Invitations.scss'
import socket from 'src/util/socketInstance'
import { useEffect, useState } from 'react'
import { TGameName } from 'shared/types'
import { IInvitationItem } from 'shared/types'
import InvitationItem from './InvitationItem'
import uuid from 'react-uuid';



interface IInvitationsProps {
  show: boolean
  toggleShow: () => void
}

const Invitations: React.FC<IInvitationsProps> = ({ show, toggleShow }) => {
  const [gameIntivations, setGameInvitations] = useState<IInvitationItem[]>([])

  const deleteItem = (senderId: string) => {
    const invitations = gameIntivations.filter(item => item.senderId !== senderId)
    setGameInvitations(invitations)
  }

  useEffect(() => {
    if (!socket.hasListeners('GAME_INVITE')) {
      socket.on('GAME_INVITE', (gameName, senderUsername, senderId) => {
        console.log('game invite ' + senderUsername)
        const update = JSON.parse(JSON.stringify(gameIntivations)) as IInvitationItem[]
        update.push({ gameName, senderUsername, senderId })
        setGameInvitations(update)
      })
    }
  }, [])

  return <div className={`invitations ${show ? 'show' : ''}`}>

    <div className="header">
      <div className="exitCross" onClick={toggleShow}>
        <div className="line1"></div>
        <div className="line2"></div>
      </div>
    </div>
    <div className="list">

      {gameIntivations.map(inv => {
        return <InvitationItem item={inv} key={uuid()} deleteItem={deleteItem} />
      })}
    </div>
  </div >;
};

export default Invitations;