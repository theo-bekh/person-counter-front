import Home from '../pages/home/Home';
import Admin from '../pages/admin/Admin';
import Statistics from '../pages/statistics/Statistics';
import Settings from '../pages/settings/Settings';
import App from '../App';
import { RequireAuth, AuthProvider } from '../auth/auth';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Login from '../components/Login/Login';
import EntranceScreen from '../pages/entrance-screen/EntranceScreen';

function Router(){

    return (
    <AuthProvider>
        <BrowserRouter>
            <App></App>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route exact path="login" element={<Login/>}/>
                <Route exact path="entrance-screen" element={ <RequireAuth><EntranceScreen/></RequireAuth> }/>
                <Route exact path="admin" element={ <RequireAuth><Admin /></RequireAuth> }/>
                <Route exact path="statistics" element={<RequireAuth><Statistics /></RequireAuth>}/>
                <Route exact path="settings" element={<RequireAuth><Settings /></RequireAuth>}/>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
    
    );
}

export default Router;