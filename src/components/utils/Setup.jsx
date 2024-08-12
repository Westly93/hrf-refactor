
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useVerifyQuery } from '../../redux/features/authApiSlice';
import {setUser, finishInitialLoad, setAuth} from '../../redux/features/authSlice';

export default function Setup() {
	const dispatch = useDispatch();
	const token= localStorage.getItem('token')
	
	const {data: user}= useVerifyQuery(token);
	if (user){
		dispatch(setAuth())
		dispatch(setUser(user));
	}
	dispatch(finishInitialLoad())
	
	return <ToastContainer />;
}
