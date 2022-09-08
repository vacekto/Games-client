import './BoardHeader.scss'
import { Circle, Times, Scales } from '../util/SVG'
import { TGameName, TGameSide, TMode } from 'shared/types'
import { useRef } from 'react'

interface IBoardHeaderProps {
    clientSide: TGameSide
    clientUsername: string
    opponentUsername?: string
    score: {
        X: number
        O: number
        draw: number
    }
    mode: TMode
}

const BoardHeader: React.FC<IBoardHeaderProps> = ({ clientSide, clientUsername, opponentUsername, score, mode }) => {

    const renderOpponentIcon = () => {
        switch (clientSide) {
            case 'O':
                return <Times />
            case 'X':
                return <Circle />
        }

    }

    const clientIcon = {
        X: <Times />,
        O: <Circle />,
    }

    return <div className='boardHeader'>
        {mode === 'hotseat' ? null : <div className="sides">
            <div className="side">
                <div>{clientUsername}:</div>
                <div className='sideIcon'>{clientIcon[clientSide]}</div>
            </div>
            <div className="side">
                <div>{opponentUsername ? opponentUsername : null}</div>
                <div className='sideIcon'>{opponentUsername ? renderOpponentIcon() : null}</div>
            </div>
        </div>
        }
        <div className="score">
            <div className="scoreInfo player1Wins">
                <div className='svgContainer'>
                    <Times />
                </div>
                <div>
                    {score.X} wins
                </div>
            </div>
            <div className="scoreInfo player2Wins">
                <div className='svgContainer'>
                    <Circle />
                </div>
                <div>{score.O} wins</div>
            </div>
            <div className="scoreInfo draws">
                <div className='svgContainer'>
                    <Scales />
                </div>
                <div>{score.draw} draws</div>
            </div>
        </div>
    </div>
};

export default BoardHeader;