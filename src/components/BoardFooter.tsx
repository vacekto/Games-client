import './BoardFooter.scss'
import { TGameSide } from 'shared/types'
import { TUltimateTicTacToeAction } from './ultimateTicTacToe/UltimateTicTacToeReducer'
import { TTicTacToeAction } from './TicTacToe/TicTacToeReducer'
import { Link } from 'react-router-dom'
import CustomSwitch from './CustomSwitch'

interface IBoardFooterProps {
  currentlyPlaying: TGameSide
  winner: 'X' | 'O' | null | 'draw',
  playAgainCallback: () => void
}

const BoardFooter: React.FC<IBoardFooterProps> = ({ currentlyPlaying, winner, playAgainCallback }) => {

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
      <Link className="genericRouterLink genericButton" to='/'>Quit</Link>
      <div
        className={`genericRouterLink genericButton ${winner ? '' : 'disabled-link'}`}
        onClick={playAgainCallback}
      >
        Play again
      </div>
    </div>
  </div >
}

export default BoardFooter;