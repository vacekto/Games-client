import { Link } from 'react-router-dom';
import './Main.scss'

interface IMainProps {

}

const Main: React.FC<IMainProps> = (props) => {

  return <div className='main'>
    <div>
      <Link className="genericRouterLink" to='/TicTacToe'>TicTacToe</Link>
    </div>
    <div>
      <Link className="genericRouterLink" to='/UltimateTicTacToe'>UltimateTicTacToe</Link>
    </div>
    <div>
      <Link className="genericRouterLink" to='/Chess/Board'>Chess</Link>
    </div>
  </div>;
};

export default Main;