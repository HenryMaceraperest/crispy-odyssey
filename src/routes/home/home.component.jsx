import { Outlet } from 'react-router-dom';

import SearchContainer from '../../components/home-page-components/main-components/search-component/search-component.component';

const Home = () => {
    return (
        <div>
            <Outlet />
            <SearchContainer />
        </div>
    );
}

export default Home;