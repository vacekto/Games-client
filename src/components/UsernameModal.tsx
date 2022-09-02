import { useState } from 'react';
import './UsernameModal.scss'

interface IUsernameModalProps {
  showModal: boolean
  exitModal: () => void
  submit: (username: string, remember: boolean) => void
}

const UsernameModal: React.FC<IUsernameModalProps> = ({ submit, exitModal, showModal }) => {
  const [usernameValue, setUsernameValue] = useState<string>('')
  const [displayError, setDisplayError] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false);

  const toggleError = () => {
    setDisplayError(prevstate => prevstate ? false : true)
  }

  return (
    <div className='usernameModal genericWholeScrean' style={{ display: showModal ? 'flex' : 'none' }}>

      <div className="formContainer">
        <div className='enterUsername'>
          Enter username:
        </div>
        <div className='usernameInput'>
          <input
            type="text"
            value={usernameValue}
            onChange={(e) => setUsernameValue(e.target.value)}
          />
          <button
            className="genericButton"
            onClick={() => submit(usernameValue, checked)}
          >
            submit
          </button>
        </div>
        <div className="rememberUsername">
          <label className="container">Remember username:
            <input
              type="checkBox"
              checked={checked}
              onChange={() => { setChecked(!checked) }} />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="error" style={{ display: displayError ? 'block' : 'none}' }} >
          This username is already taken, please try again
        </div>
        <div className="exit">
          <button className="genericButton" onClick={exitModal}>Menu</button>
        </div>
      </div>
    </div >);
};

export default UsernameModal;