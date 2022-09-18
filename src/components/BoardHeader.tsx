import './BoardHeader.scss'
import { Circle, Times, Scales } from 'src/util/SVG/Components'
import { useRef } from 'react'
import { TGameSide, TGameMode } from 'shared/types'
import { chessPiecesSVG } from 'src/util/SVG/Components'
interface IBoardHeaderProps {
    clientSide: TGameSide
    clientUsername: string
    opponentUsername?: string
    score: {
        white?: number
        black?: number
        X?: number
        O?: number
        draw: number
    }
    mode: TGameMode
}

const BoardHeader: React.FC<IBoardHeaderProps> = ({ clientSide, clientUsername, opponentUsername, score, mode }) => {
    const clientSideRef = useRef(clientSide)
    let opponentSide: TGameSide
    if (clientSideRef.current === 'O') opponentSide = 'X'
    else if (clientSideRef.current === 'X') opponentSide = 'O'
    else if (clientSideRef.current === 'white') opponentSide = 'black'
    else opponentSide = 'white'

    const icons = {
        X: Times,
        O: Circle,
        white: chessPiecesSVG.KnightWhite,
        black: chessPiecesSVG.KnightBlack
    }

    return <div className='boardHeader'>
        {mode === 'hotseat' ? null : <div className="sides">
            <div className="side">
                <div>{clientUsername}:</div>
                <div className='sideIcon'>{icons[clientSide]}</div>
            </div>
            <div className="side">
                <div>{opponentUsername ? `${opponentUsername}: ` : null}</div>
                <div className='sideIcon'>{opponentUsername ? icons[opponentSide] : null}</div>
            </div>
        </div>
        }
        <div className="score">
            <div className="scoreInfo player1Wins">
                {icons[clientSideRef.current]}
                <div>
                    {score[clientSideRef.current]} wins
                </div>
            </div>
            <div className="scoreInfo player2Wins">
                {icons[opponentSide]}
                <div>{score[opponentSide]} wins</div>
            </div>
            <div className="scoreInfo scales">
                {Scales}
                <div>{score.draw} draws</div>
            </div>
        </div>
    </div>
};

export default BoardHeader;