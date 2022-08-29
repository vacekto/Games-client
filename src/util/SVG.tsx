
const styles = {
    svg: {
        height: '100%',
        width: '100%',
    }

}

interface ICircleProps { }
interface ITimesProps { }
interface IScalesProps { }

export const Circle: React.FC<ICircleProps> = () => {
    return <svg viewBox="0 0 100 100" width='100' height='100' style={styles.svg} className='genericSvgCircle'>
        <circle cx={50} cy={50} r="35" stroke="currentcolor" fillOpacity="0" strokeWidth="15" />
    </svg>

};

export const Times: React.FC<ITimesProps> = () => {
    return <svg viewBox="0 0 100 100" height="100" width="100" style={styles.svg} className='genericSvgTimes'>
        <line x1="20" y1="20" x2="80" y2="80" stroke="currentcolor" strokeWidth="15" strokeLinecap="round" />
        <line x1="80" y1="20" x2="20" y2="80" stroke="currentcolor" strokeWidth="15" strokeLinecap="round" />
    </svg>

};

export const Scales: React.FC<IScalesProps> = () => {
    return <svg x="0px" y="0px"
        viewBox="0 0 324.977 324.977" height="324.977" width="324.977" style={styles.svg} >
        <g>
            <g>
                <path d="M324.536,207.708l-48.138-148.22h12.103c4.971,0,9-4.029,9-9s-4.029-9-9-9H171.488v-19c0-4.971-4.029-9-9-9
			c-4.971,0-9,4.029-9,9v19H36.475c-4.971,0-9,4.029-9,9s4.029,9,9,9h12.103L0.44,207.708c-1.008,3.104-0.257,6.51,1.963,8.902
			l16.065,17.313c10.934,11.783,26.423,18.541,42.497,18.541c16.074,0,31.563-6.758,42.496-18.541l16.065-17.313
			c2.22-2.392,2.971-5.798,1.963-8.902L73.351,59.488h80.137v208h-36.5c-19.299,0-35,15.701-35,35c0,4.971,4.029,9,9,9h143
			c4.971,0,9-4.029,9-9c0-19.299-15.701-35-35-35h-36.5v-208h80.137l-48.138,148.22c-1.008,3.104-0.257,6.51,1.963,8.902
			l16.065,17.313c10.933,11.783,26.422,18.541,42.496,18.541c16.073,0,31.563-6.758,42.497-18.541l16.065-17.313
			C324.793,214.218,325.544,210.812,324.536,207.708z M90.267,221.679c-7.65,8.244-18.056,12.784-29.302,12.784
			c-11.246,0-21.653-4.54-29.303-12.784l-2.497-2.691h63.599L90.267,221.679z M100.381,200.988H21.548L60.965,79.624
			L100.381,200.988z M207.988,285.488c6.071,0,11.409,3.199,14.417,8H102.571c3.008-4.801,8.346-8,14.417-8H207.988z
			 M293.313,221.679c-7.649,8.244-18.056,12.784-29.302,12.784c-11.246,0-21.652-4.54-29.302-12.784l-2.497-2.691h63.598
			L293.313,221.679z M224.595,200.988l39.416-121.364l39.416,121.364H224.595z"/>
            </g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
    </svg>
};