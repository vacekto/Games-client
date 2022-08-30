import { Link } from 'react-router-dom';
import { TicTacToePicture } from 'src/util/SVG';
import { useNavigate } from "react-router-dom";
import './Main.scss'

interface IMainProps {

}

const Main: React.FC<IMainProps> = (props) => {
  const navigate = useNavigate();

  const handleClick = {
    TicTacToe: () => { navigate('/TicTacToe') },
    ultimateTicTacToe: () => { navigate('/UltimateTicTacToe') }
  }
  return <div className='main'>
    <div className="relative">
      <div className='svgOptionContainer' onClick={handleClick.TicTacToe}>
        <div className="svgOption">
          <TicTacToePicture />
        </div>
        <div className='gameName'>
          <div>
            Tic Tac Toe
          </div>
        </div>
      </div>
    </div>
    <div className="relative">
      <div className='svgOptionContainer' onClick={handleClick.ultimateTicTacToe}>
        <div className="svgOption">
          <TicTacToePicture />
        </div>
        <div className='gameName'>
          <div>
            Ultimate Tic Tac Toe
          </div>
        </div>
      </div>
    </div>
    <div>
      <Link className="genericRouterLink" to='/Chess/Board'>Chess</Link>
    </div>
  </div>;
};

export default Main;