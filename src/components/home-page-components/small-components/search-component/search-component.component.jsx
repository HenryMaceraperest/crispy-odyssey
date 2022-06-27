import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './search-component.styles.scss';
import bgimg from './bg-image.jpg';

/** Search component that includes all the logic as to what planets you could fly to from which planets, including connecting flights */
const SearchComponent = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [selected, setSelected] = useState('');

    const changeHandler = (e) => {
        setSelected(e.target.value);
        setFrom(e.target.value)
    };

    const Earth = ['Jupiter', 'Mars', 'Mercury', 'Neptune', 'Saturn', 'Uranus', 'Venus'];
    const Jupiter = ['Earth', 'Mars', 'Mercury', 'Neptune', 'Saturn', 'Uranus', 'Venus'];
    const Mars = ['Earth', 'Jupiter', 'Mercury', 'Neptune', 'Saturn', 'Uranus', 'Venus'];
    const Mercury = ['Earth', 'Jupiter', 'Mars', 'Neptune', 'Saturn', 'Uranus', 'Venus'];
    const Neptune = ['Earth', 'Jupiter', 'Mercury', 'Saturn', 'Uranus', 'Venus'];
    const Saturn = ['Earth', 'Jupiter', 'Mars', 'Mercury', 'Neptune', 'Uranus', 'Venus'];
    const Uranus = ['Earth', 'Jupiter', 'Mars', 'Mercury', 'Neptune', 'Saturn', 'Venus'];
    const Venus = ['Earth', 'Jupiter', 'Mars', 'Mercury', 'Neptune', 'Saturn', 'Uranus'];

    let type = null;
    let options = null;

    if (selected === "Mars") {
        type = Mars;
    } else if (selected === "Earth") {
        type = Earth
    } else if (selected === "Jupiter") {
        type = Jupiter
    } else if (selected === "Mercury") {
        type = Mercury
    } else if (selected === "Neptune") {
        type = Neptune
    } else if (selected === "Saturn") {
        type = Saturn
    } else if (selected === "Uranus") {
        type = Uranus
    } else if (selected === "Venus") {
        type = Venus
    };

    if (type) {
        options = type.map((el) => <option key={el}>{el}</option>);
    }

    return (
        <div className="search-container">
            <img alt='' className="background-image" src={bgimg} />
            <form className='search-content'>
                <div className="search-from">
                    <h2>FROM</h2>
                    <select className='form-input' onChange={changeHandler}>
                        <option value>-- Select --</option>
                        <option>Mars</option>
                        <option>Earth</option>
                        <option>Jupiter</option>
                        <option>Mercury</option>
                        <option>Neptune</option>
                        <option>Saturn</option>
                        <option>Uranus</option>
                        <option>Venus</option>
                    </select>
                </div>
                <div className="search-to">
                    <h2>TO</h2>
                    <select className='form-input' onChange={(e) => { setTo(e.target.value) }}>
                        <option value>-- Select --</option>
                        {options}
                    </select>
                </div>
                <div className="search-date">
                    <h2>DATE</h2>
                    <input className='form-input' type="date" value={date} onChange={(e) => { setDate(e.target.value) }} />
                </div>
                <Link className='button-button' to={!date ? '#' : `/search?from=${from}&to=${to}&date=${date}`}>Search</Link>
            </form>
        </div>
    )
}

export default SearchComponent;