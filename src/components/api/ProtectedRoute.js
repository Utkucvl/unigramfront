import React from "react";
import { Navigate } from "react-router";


const ProtectedRoute = ({children}) =>{
    const token =localStorage.getItem("accessToken")
    if(!token){
        return <Navigate to ="/signin" replace/>
    }
    return children
}

export default ProtectedRoute