import './CustomModel.scss'

interface ICustomModelProps {
    showModal: boolean
    children: React.ReactNode
}

const CustomModel: React.FC<ICustomModelProps> = ({ showModal, children }) => {

    return <div className='customModel' style={{ display: showModal ? 'block' : 'none' }}>
        {children}
    </div>;
};

export default CustomModel;