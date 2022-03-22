import './search-component.styles.scss';
import bgimg from './bg-image.jpg';

const SearchComponent = () => {
    return (
        <div className="search-container">
            <img alt='' className="background-image" src={bgimg} />
            <form className='search-content'>
                <div className="search-from">
                    <h2>From</h2>
                    <input className='form-input' type="text" />
                </div>
                <div className="search-to">
                    <h2>To</h2>
                    <input className='form-input' type="text" />
                </div>
                <div className="search-date">
                    <h2>Date</h2>
                    <input className='form-input' type="date" />
                </div>
                <div className="search-button">
                    <button className='button-button'>Search</button>
                </div>
            </form>
        </div>
    )
}

export default SearchComponent;