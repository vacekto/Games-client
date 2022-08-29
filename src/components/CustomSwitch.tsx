import './CustomSwitch.scss'
import { Circle, Times } from '../util/SVG'

interface ICustomSwitchProps {
    moving: 'X' | 'O'
}

const CustomSwitch: React.FC<ICustomSwitchProps> = ({ moving = 'X' }) => {

    return <div className='customSwitch'>
        <div className='iconList'>
            <div className={`icon ${moving === 'O' ? 'active' : ''}`}><Circle /></div>
            <div className={`icon ${moving === 'O' ? '' : 'active'}`}><Times /></div>
            <div className={`indicator icon ${moving === "O" ? 'left' : 'right'}`}>
                <div></div>
            </div>
        </div>
    </div >
};

export default CustomSwitch;