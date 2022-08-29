import './BoardHeader.scss'
import { Circle, Times, Scales } from '../util/SVG'

interface IBoardHeaderProps {
    player1: number
    player2: number
    draw: number
}

const BoardHeader: React.FC<IBoardHeaderProps> = ({ player1, player2, draw }) => {
    return <div className='boardHeader'>
        <div className="scoreInfo player1Wins">
            <div className='svgContainer'>
                <Times />
            </div>
            <div>
                {player1} wins
            </div>
        </div>
        <div className="scoreInfo player2Wins">
            <div className='svgContainer'>
                <Circle />
            </div>
            <div>{player2} wins</div>
        </div>
        <div className="scoreInfo draws">
            <div className='svgContainer'>
                <Scales />
            </div>
            <div>{draw} draws</div>
        </div>
    </div>
};

export default BoardHeader;