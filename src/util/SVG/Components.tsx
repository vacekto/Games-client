import './Components.scss'
import knightBlack from './chessSVG/knightBlack.svg'
import knightWhite from './chessSVG/knightWhite.svg'
import bishopBlack from './chessSVG/bishopBlack.svg'
import bishopWhite from './chessSVG/bishopWhite.svg'
import kingBlack from './chessSVG/kingBlack.svg'
import kingWhite from './chessSVG/kingWhite.svg'
import pawnBlack from './chessSVG/pawnBlack.svg'
import pawnWhite from './chessSVG/pawnWhite.svg'
import queenBlack from './chessSVG/queenBlack.svg'
import queenWhite from './chessSVG/queenWhite.svg'
import rookBlack from './chessSVG/rookBlack.svg'
import rookWhite from './chessSVG/rookWhite.svg'
import scales from './otherSVG/scales.svg'
import ticTacToeMainOption from "./otherSVG/ticTacToeMainOption.svg"

export const chessPiecesSVG = {
    RookWhite: <div className='average svgContainer'><img src={rookWhite} className='svgIcon chessPiece' alt='' /></div>,
    RookBlack: <div className='average svgContainer'><img src={rookBlack} className='svgIcon chessPiece' alt='' /></div>,
    QueenWhite: <div className='large svgContainer'><img src={queenWhite} className='svgIcon chessPiece' alt='' /></div>,
    QueenBlack: <div className='large svgContainer'><img src={queenBlack} className='svgIcon chessPiece' alt='' /></div>,
    PawnWhite: <div className='small svgContainer'><img src={pawnWhite} className='svgIcon chessPiece' alt='' /></div>,
    PawnBlack: <div className='small svgContainer'><img src={pawnBlack} className='svgIcon chessPiece' alt='' /></div>,
    KingWhite: <div className='large svgContainer'><img src={kingWhite} className='svgIcon chessPiece' alt='' /></div>,
    KingBlack: <div className='large svgContainer'><img src={kingBlack} className='svgIcon chessPiece' alt='' /></div>,
    BishopWhite: <div className='average svgContainer'><img src={bishopWhite} className='svgIcon chessPiece' alt='' /></div>,
    BishopBlack: <div className='average svgContainer'><img src={bishopBlack} className='svgIcon chessPiece' alt='' /></div>,
    KnightBlack: <div className='average svgContainer'><img src={knightBlack} className='svgIcon chessPiece' alt='' /></div>,
    KnightWhite: <div className='average svgContainer'><img src={knightWhite} className='svgIcon chessPiece' alt='' /></div>
}

export const Circle = <div className='svgContainer'>
    <svg viewBox="0 0 100 100" width='100' height='100' className='svgIcon genericSvgCircle'>
        <circle cx={50} cy={50} r="35" stroke="currentcolor" fillOpacity="0" strokeWidth="15" />
    </svg>
</div>

    ;

export const Times = <div className='svgContainer'>
    <svg viewBox="0 0 100 100" height="100" width="100" className='svgIcon genericSvgTimes'>
        <line x1="20" y1="20" x2="80" y2="80" stroke="currentcolor" strokeWidth="15" strokeLinecap="round" />
        <line x1="80" y1="20" x2="20" y2="80" stroke="currentcolor" strokeWidth="15" strokeLinecap="round" />
    </svg>
</div>



export const Scales = <div className='svgContainer'>
    <img src={scales} className='svgIcon scales' alt='' />
</div>


export const TicTacToePicture: React.FC = () => {
    return <img src={ticTacToeMainOption} alt='' />
}