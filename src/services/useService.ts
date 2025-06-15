'use client'
import axiosInstance from "@/app/utils/axiosConfig";
import { useState } from "react";

export const useServices  = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [hasError, setError] = useState<boolean>(false);

    const extractText = async (forData: FormData) => {
        try {
           setLoading(true);
           const response = await axiosInstance.post('/user/extract',forData,{
            headers: { "Content-Type": "multipart/form-data" },
           });
           setLoading(false);
           return response;
        } catch (error) {
           setError(true);
           setLoading(false);
           console.log(error)
        };
    };

    const getUser = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/user/user');
            setLoading(false);
            return response;  
        } catch (error) {
           setError(true);
           setLoading(false);
           console.log(error)
        };
    };

    const postUser = async () => {
        try {
           setLoading(true);
           const response = await axiosInstance.post('/user/user',{
             name:'vineeth',
             password:'vineth'
           });
           setLoading(false);
           return response;
        } catch (error) {
           setError(true);
           setLoading(false)
           console.log(error)
        };
    };


    return {
        isLoading,
        hasError,
        extractText,
        getUser,
        postUser,
    };

};

