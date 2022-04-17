import {useContext} from 'react';
import { UserContext } from "./UserContext";

function WithLogOut(Component){
    return function WithLogOutComponent(props){

        const authContext = useContext(UserContext);

        const logoutHandler = () => {
            authContext.logout();
        }
        return <Component logoutHandler={logoutHandler} {...props}/>
    }
}

export default WithLogOut;