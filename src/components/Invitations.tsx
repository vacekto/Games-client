import './Invitations.scss'
import socket from 'src/util/socketInstance'
import { useEffect, useState } from 'react'
import { IInvitationItem } from 'shared/types'
import InvitationItem from './InvitationItem'
import uuid from 'react-uuid';
interface IInvitationsProps {
  show: boolean
  toggleShow: () => void
}

const Invitations: React.FC<IInvitationsProps> = ({ show, toggleShow }) => {
  const [gameIntivations, setGameInvitations] = useState<IInvitationItem[]>([])
  const [extendedIndex, setExtendedIndex] = useState<number | null>(null)

  const clearInvitations = () => {
    setGameInvitations([])
  }

  const test = () => {
    console.log(gameIntivations)
  }

  const deleteItem = (senderId: string) => () => {
    setGameInvitations((prevState) => {
      const invitations = prevState.filter(item => item.senderId !== senderId)
      return JSON.parse(JSON.stringify(invitations))
    })
    setExtendedIndex(null)
  }

  const extendItem = (index: number) => () => {
    if (index === extendedIndex) setExtendedIndex(null)
    else setExtendedIndex(index)
  }

  useEffect(() => {
    setGameInvitations(prevState => {
      let update = JSON.parse(JSON.stringify(prevState)) as IInvitationItem[]
      if (extendedIndex !== null) {
        if (gameIntivations.at(-1)?.senderId === 'mockInvitation') return prevState
        update.push({ senderUsername: '', senderId: 'mockInvitation', gameName: 'ticTacToe' })
        return update
      }
      update = update.filter(item => item.senderId !== 'mockInvitation')
      return update
    })
  }, [extendedIndex])

  useEffect(() => {
    console.log(gameIntivations)
  }, [gameIntivations])

  useEffect(() => {
    if (socket.hasListeners('GAME_INVITE')) {
      socket.removeAllListeners('GAME_INVITE')
    }
    socket.on('GAME_INVITE', (gameName, senderUsername, senderId) => {
      setGameInvitations(prevState => {
        const check = prevState.find(inv => inv.senderUsername === senderUsername)
        if (check) return prevState
        const update = JSON.parse(JSON.stringify(prevState)) as IInvitationItem[]
        let addIndex = gameIntivations.length
        if (gameIntivations.at(-1)?.senderId === 'mockInvitation') addIndex = gameIntivations.length - 1
        update.splice(addIndex, 0, { gameName, senderId, senderUsername })
        return update
      })
    })

  }, [])

  return <div className={`invitations ${show ? 'show' : ''}`}>
    <div className="header">
      <button onClick={test}>test</button>
      <div className='clearAll' onClick={clearInvitations}>Clear all</div>
      <div className="exitCross" onClick={toggleShow}>
        <div className="line1"></div>
        <div className="line2"></div>
      </div>
    </div>
    <div className="list">
      {gameIntivations.map((inv, index) => {
        if (inv.senderId === 'mockInvitation') return <div className="mockInvitation"></div>
        if (index === 0) console.log(index === extendedIndex)
        let indented = false
        let extended = false
        if (extendedIndex === index) extended = true
        if (typeof extendedIndex === 'number' && index > extendedIndex) indented = true
        return <InvitationItem
          item={inv}
          key={uuid()}
          deleteItem={deleteItem(inv.senderId)}
          indented={indented}
          extended={extended}
          extendItem={extendItem(index)} />
      })}
    </div>
  </div >;
};

export default Invitations;