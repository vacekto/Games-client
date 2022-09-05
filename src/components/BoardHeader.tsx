import './BoardHeader.scss'
import { Circle, Times, Scales } from '../util/SVG'
import { TGameSide } from 'shared/types'
import { useRef } from 'react'

interface IBoardHeaderProps {
    clientSide: TGameSide
    opponentSide: TGameSide
    clientUsername: string
    opponentUsername: string
    score: {
        X: number,
        O: number,
        draw: number
    }

}

const BoardHeader: React.FC<IBoardHeaderProps> = (props) => {
    const clientSide = useRef(props.clientSide)
    const opponentSide = useRef(props.opponentSide)
    const clientUsername = useRef(props.clientUsername)
    const opponentUsername = useRef(props.opponentUsername)

    return <div className='boardHeader'>
        <div className="sides">
            <div className="client">
                You: {clientSide.current}
            </div>
            <div className="opponent">
                Opponent: {opponentSide.current}
            </div>
        </div>
        <div className="score">
            <div className="scoreInfo player1Wins">
                <div className='svgContainer'>
                    <Times />
                </div>
                <div>
                    {props.score.X} wins
                </div>
            </div>
            <div className="scoreInfo player2Wins">
                <div className='svgContainer'>
                    <Circle />
                </div>
                <div>{props.score.O} wins</div>
            </div>
            <div className="scoreInfo draws">
                <div className='svgContainer'>
                    <Scales />
                </div>
                <div>{props.score.draw} draws</div>
            </div>
        </div>
    </div>
};

export default BoardHeader;