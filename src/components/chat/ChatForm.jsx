import PropTypes from "prop-types";
import {Flex, Input} from "@chakra-ui/react";
import {useState} from "react";

const ChatForm = ({onSendMessage}) => {
    const [message, setMessage] = useState('');

    const handleOnChange = (e) => {
        e.preventDefault();
        setMessage(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key.toString().toLowerCase() === 'enter') {
            e.preventDefault();
            onSendMessage(message.trim());
            setMessage('');
        }
    };

    return (
        <Flex
            flexDir='row'
            w='100%'
            h='80px'
            p={4}
            justifyContent='center'
            alignItems='center'
            bgColor='rgb(255, 255, 255, 0.9)'
            borderBottom='1px solid rgb(232, 232, 232)'
            boxShadow='0 0 10px 0 rgba(155, 155, 155, 0.1)'
        >
            <Input
                placeholder='Enter message ...'
                size='lg'
                fontSize='sm'
                value={message}
                onChange={handleOnChange}
                onKeyDown={handleKeyDown}
            />
        </Flex>
    )
}

ChatForm.propTypes = {
    onSendMessage: PropTypes.func.isRequired,
};

export default ChatForm;
