const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    svg: {
        left: '0',
        top: '0',
        width: '100%',
        height: 'auto',
    }

}

interface ICircleProps { }
interface ITimesProps { }

export const Circle: React.FC<ICircleProps> = () => {
    return <div style={styles.container} className="svgCircle">
        <svg viewBox="0 0 100 100" width='100' height='100' style={styles.svg}>
            <circle cx={50} cy={50} r="35" stroke="currentcolor" strokeWidth="15" />
            Sorry, your browser does not support inline SVG.
        </svg>
    </div>
};

export const Times: React.FC<ITimesProps> = () => {
    return <div style={styles.container} className='svgTimes'>
        <svg viewBox="0 0 100 100" height="100" width="100" style={styles.svg}>
            <line x1="20" y1="20" x2="80" y2="80" stroke="currentcolor" strokeWidth="15" strokeLinecap="round" />
            <line x1="80" y1="20" x2="20" y2="80" stroke="currentcolor" strokeWidth="15" strokeLinecap="round" />
        </svg>
    </div>
};