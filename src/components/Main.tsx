import { Link } from 'react-router-dom';
import { TicTacToePicture } from 'src/util/SVG/Components';
import { useNavigate } from "react-router-dom";
import './Main.scss'

interface IMainProps {

}

const Main: React.FC<IMainProps> = (props) => {
  const navigate = useNavigate();

  const handleClick = {
    TicTacToe: () => { navigate('/TicTacToe') },
    UltimateTicTacToe: () => { navigate('/UltimateTicTacToe') },
    Chess: () => { navigate('/chess') }

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
      <div className='svgOptionContainer' onClick={handleClick.UltimateTicTacToe}>
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
    <div className="relative">
      <div className='svgOptionContainer' onClick={handleClick.Chess}>
        <div className="svgOption">
          <TicTacToePicture />
        </div>
        <div className='gameName'>
          <div>
            Chess
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Main;