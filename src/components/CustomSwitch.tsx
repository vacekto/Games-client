import './CustomSwitch.scss'
import { Circle, Times, chessPiecesSVG } from 'src/util/SVG/Components'
import { TGameName, TGameSide } from 'shared/types'
interface ICustomSwitchProps {
    moving: TGameSide
    gameName: TGameName
}

const CustomSwitch: React.FC<ICustomSwitchProps> = ({ moving, gameName }) => {
    let player1: 'O' | 'white'
    let player2: 'X' | 'black'

    if (gameName === 'chess') {
        player1 = 'white'
        player2 = 'black'
    } else {
        player1 = 'O'
        player2 = 'X'
    }


    const icon = {
        O: Circle,
        X: Times,
        'white': chessPiecesSVG.RookWhite,
        'black': chessPiecesSVG.RookBlack
    }

    return <div className='customSwitch'>
        <div className={`iconList ${gameName}`}>
            <div className={`icon ${moving === player1 ? 'active' : ''}`}>{icon[player1]}</div>
            <div className={`icon ${moving === player1 ? '' : 'active'}`}>{icon[player2]}</div>
            <div className={`indicator icon ${moving === player1 ? 'left' : 'right'}`}>
                <div></div>
            </div>
        </div>
    </div >
};

export default CustomSwitch;