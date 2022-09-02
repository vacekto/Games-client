import './Lobby.scss'
import { useState } from 'react'

interface ILobbyProps {

}

const Lobby: React.FC<ILobbyProps> = (props) => {
  const [users, setUsers] = useState([{ id: '1', username: 'user1' }, { id: '2', username: 'user2' }])

  return <div className='lobby'>
    <div className="header item">Users online</div>
    {users.map(user => {
      return <div key={user.id} className='item'>
        <div className="username">
          {user.username}
        </div>
        <button className='genericButton'>invite</button>

      </div>
    })}
  </div>
}

export default Lobby