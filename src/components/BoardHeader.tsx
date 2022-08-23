import './BoardHeader.scss'
import { Circle, Times } from '../util/SVG'

interface IGameHeaderProps {
    player1: number
    player2: number
    draw: number
}

const GameHeader: React.FC<IGameHeaderProps> = ({ player1, player2, draw }) => {
    return <div className='gameHeaderContainer'>
        <div className='gameHeader'>
            <div>
                <Times />
                <div>{player1}</div>
            </div>
            <div>
                <Circle />
                <div>{player2}</div>
            </div>
            <div>
                <div>weight</div>
                <div>{draw}</div>
            </div>
        </div>
    </div>
};

export default GameHeader;