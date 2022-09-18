import './Lobby.scss'
import { IUser, TGameName } from 'shared/types'
import socket from 'src/util/socketInstance'


interface ILobbyProps {
  lobbyUsers: IUser[]
  username: string
  gameName: TGameName
  displaySmallerLobby: boolean
}

const Lobby: React.FC<ILobbyProps> = ({ lobbyUsers, username, gameName, displaySmallerLobby }) => {
  const handleInviteClick = (inviteeId: string) => {
    socket.emit('INVITE_USER_TO_GAME', gameName, inviteeId)
  }

  const renderUsers = () => {
    return lobbyUsers.filter(user => user.username !== username).map(user => {
      return <div key={user.id} className='item'>
        <div className="username">
          {user.username}
        </div>
        <button className='genericButton' onClick={() => { handleInviteClick(user.id) }}>invite</button>
      </div>
    })
  }

  return <div className={`lobby ${displaySmallerLobby ? 'lobby-resize' : ''}`}>
    <div className="header item">Users online</div>
    <div className="list">
      {renderUsers()}

    </div>
  </div>
}

export default Lobby