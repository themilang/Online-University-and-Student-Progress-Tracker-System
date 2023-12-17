import axios from 'axios';
import { errorToast } from './toastify.service';


const serverURL = import.meta.env.VITE_SERVER_URL;


export const getData = async (url: string, jwt: string) => {
    try {
        const response = await axios.get(`${serverURL}/${url}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        return response.data; 
    } catch (error: any) {
        errorToast(error.response.data.message)
    }
}

export const deleteData = async (url: string, jwt: string) => {
    try {
        const response = await axios.delete(`${serverURL}/${url}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error: any) {
        errorToast(error.response.data.message)
    }
}


export const postData = async (url: string, data: any) => {
    try {
        const response = await axios.post(`${serverURL}/${url}`, data);
        return response.data;
    } catch (error: any) {
        console.log("error")
        errorToast(error.response.data.message)
    }
}

export const postDataWithJWT = async (url: string, data: any, jwt: string) => {
    try {
        const response = await axios.post(`${serverURL}/${url}`, data, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error: any) {
        errorToast(error.response.data.message)
    }
}

export const updateData = async (url: string, data: any, jwt: string) => {
    try {
        const response = await axios.patch(`${serverURL}/${url}`, data, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        return response.data;
    } catch (error: any) {
        errorToast(error.response.data.message)
    }
}