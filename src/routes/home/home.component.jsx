import { Outlet } from 'react-router-dom';

import SearchContainer from '../../components/search-component/search-component.component';

const Home = () => {
    return (
        <div>
            <Outlet />
            <SearchContainer />
        </div>
    );
}

export default Home;