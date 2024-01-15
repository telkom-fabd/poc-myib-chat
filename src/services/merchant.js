import axios from 'axios';
import * as cookie from '../utils/cookie';

const API_URL = import.meta.env.VITE_API_URL;

const getList = async () => {
    try {
        const url = `${API_URL}/api/v1/merchants`;
        const headers = {
            Authorization: `Bearer ${cookie.getToken()}`,
        }

        const response = await axios.get(url, { headers });
        if (response.data.data) {
            return {
                isSuccess: true,
                data: response.data.data,
            };
        } else {
            return {
                isSuccess: false,
                message: 'Failed to get list of merchants',
            };
        }
    } catch (err) {
        return {
            isSuccess: false,
            message: err.response.data.message,
        };
    }
};

const createSendBirdUser = async (id) => {
    try {
        const url = `${API_URL}/api/v1/merchants/${id}/sendbird-user`;
        const headers = {
            Authorization: `Bearer ${cookie.getToken()}`,
        }

        const response = await axios.post(url, {}, { headers });
        if (response.data.data) {
            return {
                isSuccess: true,
                data: response.data.data,
            };
        } else {
            return {
                isSuccess: false,
                message: 'Failed to create sendbird user',
            };
        }
    } catch (err) {
        return {
            isSuccess: false,
            message: err.response.data.message,
        };
    }
}

export {
    getList,
    createSendBirdUser,
};
