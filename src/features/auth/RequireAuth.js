import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from '../../components/Spinner';
import { useRefreshQuery } from "./authApiSlice";
import { selectCurrentToken } from "./authSlice";

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()

const{isError,isLoading,isSuccess,data} =useRefreshQuery(undefined,{skip:token});


    return (
        isLoading ? <Spinner /> :   ( token || data?.accessToken)
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}
export default RequireAuth