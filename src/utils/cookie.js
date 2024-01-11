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
    return JSON.parse(user);
}

const destroyCookies = () => {
    Cookies.remove('token');
    Cookies.remove('user');
}

export {
    saveToken,
    getToken,
    saveUser,
    getUser,
    destroyCookies
}
