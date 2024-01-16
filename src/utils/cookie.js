import Cookies from 'js-cookie'

const saveToken = (token) => {
    Cookies.set('token', token, {expires: 1});
}

const getToken = () => {
    return Cookies.get('token');
}

const saveUser = (user) => {
    Cookies.set('user', JSON.stringify(user), {expires: 1});
}

const getUser = () => {
    const user = Cookies.get('user');
    if (!user) return null;
    return JSON.parse(user);
}

const saveSendbird = (sendbird) => {
    Cookies.set('sendbird', JSON.stringify(sendbird), {expires: 1});
}

const getSendbird = () => {
    const sendbird = Cookies.get('sendbird');
    if (!sendbird) return null;
    return JSON.parse(sendbird);
}

const destroyCookies = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    Cookies.remove('sendbird');
}

export {
    saveToken,
    getToken,
    saveUser,
    getUser,
    saveSendbird,
    getSendbird,
    destroyCookies
}
