import { useState } from 'react';
import './UsernameModal.scss'

interface IUsernameModalProps {
  style: string
  exitModal: () => void
  submit: (username: string) => void
}

const UsernameModal: React.FC<IUsernameModalProps> = (props) => {
  const [usernameValue, setUsernameValue] = useState<string>('')



  return (
    <div className='usernameModal' style={{ display: props.style }}>
      <div>
        <div>

          <input
            placeholder='Set username'
            value={usernameValue}
            type="text"
            onChange={(e) => setUsernameValue(e.target.value)}
          />
          <button onClick={() => props.submit(usernameValue)}>submit</button>
        </div>
        <div>
          <button onClick={props.exitModal}>
            to menu
          </button>
        </div>
      </div>
    </div>);
};

export default UsernameModal;