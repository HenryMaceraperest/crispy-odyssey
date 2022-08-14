import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setRoutes } from '../../../../store/route/route.action';
import { selectRoutes } from '../../../../store/route/route.selector';

import './search-component.styles.scss';
import bgimg from './bg-image.jpg';
import removeFromArray from '../../../../utils/removeFromArray';


const SearchComponent = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [selected, setSelected] = useState('');
    const locations = [];
    const array = [];

    const changeHandler = (e) => {
        setSelected(e.target.value);
        setFrom(e.target.value);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            await fetch('https://teal-valkyrie-8d414e.netlify.app/routes')
                .then((response) => response.json())
                .then((result) => dispatch(setRoutes(result)))
                .catch((error) => console.log("An error occured!" + error))

        };

        getData();

    }, [dispatch]);

    const products = useSelector(selectRoutes);

    for (let location of products) {
        if (!locations.includes(location.from.name)) {
            locations.push(location.from.name)
        }
        if (!locations.includes(location.to.name)) {
            locations.push(location.to.name)
        }
    }

    let type = null;
    let options = null;

    locations.forEach(location => array[location] = removeFromArray(locations, location));

    for (let location of array) {
        if (selected === location) {
            type = location
        }
    }
    if (selected) {
        type = array[selected];
    }

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
                        {locations.map(location => <option key={location}>{location}</option>)}
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
                <Link className='button-button' to={!to ? '#' : (!date ? `/search?from=${from}&to=${to}` : `/search?from=${from}&to=${to}&date=${date}`)}>Search</Link>
            </form>
        </div>
    )
}

export default SearchComponent;