import { Link } from 'react-router-dom';
import './Main.scss'

interface IMainProps {

}

const Main: React.FC<IMainProps> = (props) => {

  return <div className='main'>
    <div>
      <Link to='/TicTacToe'>TicTacToe</Link>
    </div>
    <div>
      <Link to='/UltimateTicTacToe'>UltimateTicTacToe</Link>
    </div>
    <div>
      <Link to='/Options'>Chess</Link>
    </div>
  </div>;
};

export default Main;