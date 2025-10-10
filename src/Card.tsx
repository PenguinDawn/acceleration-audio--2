

interface CardProps {
    name: string,
    onButtonClick: any;
}

const Card = ({name, onButtonClick}: CardProps) => {
    return (
        <div className='border-blue-400'>
            <h2>{name}</h2>
            <button onClick={onButtonClick}>Click Me to Add!</button>
        </div>
    )

}

export default Card