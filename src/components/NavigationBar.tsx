import './NavigationBar.css'
import { Link } from 'react-router-dom'

interface INavigationBarProps {

}

const NavigationBar: React.FC<INavigationBarProps> = (props) => {

    return <div className='navigationBar'>
        <Link to='/' className='routerLink'>Menu</Link>
    </div>;
};

export default NavigationBar;