import './BoardFooter.scss'
import { TGameName, TGameSide } from 'shared/types'
import CustomSwitch from './CustomSwitch'

interface IBoardFooterProps {
  currentlyPlaying: TGameSide
  winner: 'X' | 'O' | 'black' | 'white' | null | 'draw'
  playAgainCallback: () => void
  quitCallback: () => void
  oponentsWantsRematch: boolean
  gameName: TGameName
}

const BoardFooter: React.FC<IBoardFooterProps> = ({
  currentlyPlaying,
  winner,
  playAgainCallback,
  quitCallback,
  oponentsWantsRematch,
  gameName
}) => {
  const renderWinner = () => {
    if (oponentsWantsRematch) return <div>
      Your opponent wants to play again!
    </div>
    if (winner === 'draw') return <div>
      Its a draw!
    </div>
    return <div>
      {winner} wins!
    </div>
  }

  return <div className='boardFooter'>
    <div className="switch">
      <CustomSwitch moving={currentlyPlaying} gameName={gameName} />
    </div >
    <div className={`resultNotice ${winner ? 'show' : 'hide'}`}>
      {renderWinner()}
    </div>
    <div className="buttons">
      <div className="genericButton"
        onClick={quitCallback}
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