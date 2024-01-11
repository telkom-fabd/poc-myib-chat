import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Box, Button, Card, CardBody, Flex, FormControl, FormLabel, Input} from "@chakra-ui/react";
import ModalError from "../../components/modal/ModalError.jsx";

import * as authService from "../../services/auth";
import * as cookie from "../../utils/cookie";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [modalError, setModalError] = useState({
        isOpen: false,
        title: undefined,
        message: undefined,
    });

    const closeModalError = () => {
        setModalError({
            ...modalError,
            isOpen: false,
        });
    }

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    }

    const handleLogin = async () => {
        setIsLoading(true);

        const body = {
            name: form.name,
            email: form.email,
            password: form.password,
        }
        const result = await authService.register(body);
        if (result.isSuccess) {
            cookie.saveToken(result.token);
            cookie.saveUser(result.user);

            setTimeout(() => {
                navigate('/chat');
            }, 1200);
        } else {
            setTimeout(() => {
                setModalError({
                    ...modalError,
                    isOpen: true,
                    title: 'ALERT',
                    message: result.message,
                });

                setIsLoading(false);
            }, 1200);
        }
    }

    return (
        <>
            <ModalError
                isOpen={modalError.isOpen}
                title={modalError.title}
                message={modalError.message}
                onClose={closeModalError}
            />

            <Box w='100%' p={8}>
                <Card>
                    <CardBody>
                        <Flex flexDirection='column' w='100%'>
                            <FormControl mb={4}>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    name='name'
                                    colorScheme='primary'
                                    type='text'
                                    value={form.name}
                                    onChange={handleOnChange}
                                    disabled={isLoading}
                                />
                            </FormControl>

                            <FormControl mb={4}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    name='email'
                                    colorScheme='primary'
                                    type='email'
                                    value={form.email}
                                    onChange={handleOnChange}
                                    disabled={isLoading}
                                />
                            </FormControl>

                            <FormControl mb={4}>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    name='password'
                                    type='password'
                                    value={form.password}
                                    onChange={handleOnChange}
                                    disabled={isLoading}
                                />
                            </FormControl>

                            <Button
                                variant='link'
                                size='sm'
                                color='red.600'
                                onClick={() => navigate('/')}
                            >
                                Already have an account?
                            </Button>

                            <Button
                                variant='solid'
                                size='md'
                                mt={8}
                                isLoading={isLoading}
                                onClick={handleLogin}
                            >
                                REGISTER
                            </Button>
                        </Flex>
                    </CardBody>
                </Card>
            </Box>
        </>
    );
};

export default RegisterPage;
