import { Outlet } from 'react-router-dom';

import SearchContainer from '../../components/home-page-components/main-components/search-container/search-container.component';

/** Homepage component */
const Home = () => {
    return (
        <div>
            <Outlet />
            <SearchContainer />
        </div>
    );
}

export default Home;