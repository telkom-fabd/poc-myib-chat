import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import PropTypes from 'prop-types';
import * as cookie from '../utils/cookie';

const AuthLayout = ({children}) => {
    const navigate = useNavigate();
    const [isGetToken, setIsGetToken] = useState(true);

    useEffect(() => {
        if (cookie.getToken()) {
            navigate('/chat');
        } else {
            setIsGetToken(false);
        }
    }, [navigate]);

    if (isGetToken) {
        return <></>;
    }

    return (
        <>
            <div className="auth-backdrop">
                <div className="auth-container">
                    {children}
                </div>
            </div>
        </>
    );
};

AuthLayout.propTypes = {
    children: PropTypes.element.isRequired,
}

AuthLayout.defaultProps = {
    children: <></>,
}

export default AuthLayout;
