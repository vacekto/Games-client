import { Link } from 'react-router-dom';
import './Menu.css'

interface IMenuProps {

}

const Menu: React.FC<IMenuProps> = (props) => {

  return <div className='menu app-body'>
    <div>
      <Link className='routerLink' to='/TicTacToe'>TicTacToe</Link>
    </div>
    <div>
      <Link className='routerLink' to='/UltimateTicTacToe'>UltimateTicTacToe</Link>
    </div>
  </div>;
};

export default Menu;