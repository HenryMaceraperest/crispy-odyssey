import './wrong-route.styles.scss';

const WrongRoute404 = ({ from, to }) => {
    return (
        <div>
            <p className='text-background'>SORRY, WE DON'T OFFER THESE ROUTES</p>
            <br />
            <p className='text-background-small'>{`${from} => ${to}`}</p>
        </div>
    )
};

export default WrongRoute404;