import { useSelector} from 'react-redux'
import LoadingSpinner from '../LoadingSpinner'
import { useEffect } from 'react'
export default function RequireAuth({children}){
    const {isAuthenticated, isLoading} = useSelector(state=>state.auth)
    useEffect(()=>{

    }, [isAuthenticated])
    if (isLoading){
        return (
            <LoadingSpinner />
        )
    }
    if(!isAuthenticated){
        //redirect to login 
    }
    return (
        <>{children}</>
    )
}