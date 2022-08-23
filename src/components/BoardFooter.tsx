import './BoardFooter.scss'
import { TGameSide } from 'shared/types'
import { Link } from 'react-router-dom'
interface IBoardFooterProps {
  currentlyPlaying: TGameSide
}

const BoardFooter: React.FC<IBoardFooterProps> = ({ currentlyPlaying }) => {

  return <div className='boardFooterContainer'>
    <div className='boardFooter'>
      <div> Mooving: {currentlyPlaying}</div>
      <div className='TicTacToeFooter'>
        <Link to='/'>Quit</Link>
      </div>
    </div>
  </div>
}

export default BoardFooter;