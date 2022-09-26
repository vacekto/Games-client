import { useState, useEffect, useRef } from 'react';
import './UsernameModal.scss'
import socket from 'src/util/socketInstance'
import { exit } from 'process';

interface IUsernameModalProps {
  show: boolean
  exitModal: () => void
  submit: (username: string, remember: boolean) => void
}

const UsernameModal: React.FC<IUsernameModalProps> = ({ submit, exitModal, show }) => {
  const [usernameValue, setUsernameValue] = useState<string>('')
  const [displayMessage, setDisplayMessage] = useState<boolean>(false)
  const [outcomeMessage, setOutcomeMessage] = useState<string>('')
  const [rememberUsername, setRememberUsername] = useState<boolean>(false);
  const [outcome, setOutcome] = useState<'error' | 'success'>('error')
  const inputRef = useRef<HTMLInputElement>(null)
  const outcomeStyles = {
    error: {
      display: displayMessage ? 'block' : 'none',
      border: '3px solid #ff3a3a',
      backgroundColor: '#ffeeee'
    },
    success: {
      display: displayMessage ? 'block' : 'none',
      border: '3px solid #2aff35',
      backgroundColor: '#e3ffe7'
    }
  }


  const handleSubmit = () => {
    socket.emit('SET_USERNAME', usernameValue.trim(), (response) => {
      setDisplayMessage(true)
      setOutcomeMessage(response.message)
      if (response.error) setOutcome('error')
      else {
        setOutcome('success')
        submit(response.username!, rememberUsername)
      }
    })
  }

  const handleExit = () => {
    exitModal()
  }

  useEffect(() => {
    inputRef.current!.focus();
  }, [])

  return (
    <div className='usernameModal genericWholeScreen' style={{ display: show ? 'flex' : 'none' }} onClick={exitModal}>
      <div className="formContainer" onClick={(e) => { e.stopPropagation() }}>
        <div className='enterUsername'>
          Enter username:
        </div>
        <div className='usernameInput'>
          <input
            ref={inputRef}
            type="text"
            value={usernameValue}
            onChange={(e) => setUsernameValue(e.target.value)}
          />
          <button
            className="genericButton"
            onClick={handleSubmit}
          >
            submit
          </button>
        </div>
        <div className="rememberUsername">
          <label className="container">Remember username:
            <input
              type="checkBox"
              checked={rememberUsername}
              onChange={() => { setRememberUsername(!rememberUsername) }} />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="outcome" style={outcome === 'error' ? outcomeStyles.error : outcomeStyles.success} >
          {outcomeMessage}
        </div>
        <div className="exit">
          <button className="genericButton" onClick={handleExit}>Back</button>
        </div>
      </div>
    </div >
  );
};

export default UsernameModal;