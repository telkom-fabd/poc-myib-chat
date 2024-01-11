import PropTypes from 'prop-types';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    Avatar,
    Flex,
    HStack,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList,
    Text
} from "@chakra-ui/react";
import * as cookie from '../utils/cookie';

const PrivateLayout = ({children}) => {
    const navigate = useNavigate();

    const [isGetToken, setIsGetToken] = useState(true);
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (cookie.getToken()) {
            setIsGetToken(false);

            const user = cookie.getUser();
            if (user) {
                setUsername(user.name);
            }
        } else {
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        cookie.destroyCookies();
        navigate('/');
    }

    if (isGetToken) {
        return <></>;
    }

    return (
        <>
            <div className="private-backdrop">
                <div className="private-container">
                    <div className="private-navbar-container">
                        <div className="private-navbar">
                            <Flex
                                w='100%'
                                h='100%'
                                px={4}
                                py={8}
                                flexDir='row'
                                justifyContent='space-between'
                                alignItems='center'
                            >
                                <Text
                                    color='primary.500'
                                    fontWeight='bold'
                                    fontSize='md'
                                >
                                    MyIndibiz
                                </Text>
                                <Menu>
                                    <MenuButton>
                                        <HStack>
                                            <Avatar name={username} size='sm'/>
                                            <Text fontSize='sm'>{username}</Text>
                                        </HStack>
                                    </MenuButton>
                                    <MenuList>
                                        <MenuGroup>
                                            <MenuItem>
                                                My Account
                                            </MenuItem>
                                        </MenuGroup>
                                        <MenuDivider/>
                                        <MenuGroup>
                                            <MenuItem as='button' onClick={handleLogout}>
                                                Logout
                                            </MenuItem>
                                        </MenuGroup>
                                    </MenuList>
                                </Menu>
                            </Flex>
                        </div>
                    </div>
                    <div className="private-content">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

PrivateLayout.propTypes = {
    children: PropTypes.element.isRequired,
}

PrivateLayout.defaultProps = {
    children: <></>,
}

export default PrivateLayout;
