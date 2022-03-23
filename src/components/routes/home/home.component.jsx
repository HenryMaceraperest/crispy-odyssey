import { Outlet } from 'react-router-dom';

import SearchContainer from '../../search-container/search-container.component';

const Home = () => {
    return (
        <div>
            <Outlet />
            <SearchContainer />
        </div>
    );
}

export default Home;