import './GameHeader.scss'

interface IGameHeaderProps {
    player1: number
    player2: number
    draw: number
}

const GameHeader: React.FC<IGameHeaderProps> = ({ player1, player2, draw }) => {

    return <div className='gameHeaderContainer'>
        <div className='gameHeader'>
            <div>
                <div>X</div>
                <div>{player1}</div>
            </div>
            <div>
                <div>O</div>
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