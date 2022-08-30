import './BoardFooter.scss'
import { TGameSide } from 'shared/types'
import CustomSwitch from './CustomSwitch'
import { useNavigate } from "react-router-dom";

interface IBoardFooterProps {
  currentlyPlaying: TGameSide
  winner: 'X' | 'O' | null | 'draw',
  playAgainCallback: () => void
}

const BoardFooter: React.FC<IBoardFooterProps> = ({ currentlyPlaying, winner, playAgainCallback }) => {
  let navigate = useNavigate();

  const renderWinner = () => {
    if (winner === 'draw') return <div>
      Its a draw!
    </div>
    return <div>
      {winner} wins!
    </div>
  }

  return <div className='boardFooter'>
    <div className="switch">
      <CustomSwitch moving={currentlyPlaying} />
    </div >
    <div className={`resultNotice ${winner ? 'show' : 'hide'}`}>
      {renderWinner()}
    </div>
    <div className="buttons">
      <div className="genericButton"
        onClick={() => { navigate("/") }}
      >
        Quit
      </div>
      <div
        className={`genericButton ${winner ? '' : 'disabled-link'}`}
        onClick={playAgainCallback}
      >
        Play again
      </div>
    </div>
  </div >
}

export default BoardFooter;