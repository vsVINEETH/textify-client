'use client'
import { useState, useEffect } from "react";
import { userServices } from "@/services/useService";

const Home = () => {
    
    const { isLoading, hasError, getUser, postUser } = userServices();

    useEffect(() => {
        handleRequest();
        
    },[]);

    const handleRequest = async () => {
        const res = await postUser();
        console.log(res);
    };

    return(<>
     <h1>This is home</h1>
    </>)

};

export default Home;