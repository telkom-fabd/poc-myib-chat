import PropTypes from "prop-types";
import {Avatar, Flex, Text} from "@chakra-ui/react";

const ChatHeader = ({sender}) => {
    return (
        <Flex
            flexDir='row'
            w='100%'
            h='60px'
            p={4}
            gap={4}
            justifyContent='start'
            alignItems='center'
            bgColor='rgb(255, 255, 255, 0.9)'
            borderBottom='1px solid rgb(232, 232, 232)'
            boxShadow='0 0 10px 0 rgba(155, 155, 155, 0.1)'
        >
            <Avatar name={sender.name} src={sender.avatar} size='sm'/>
            <Text fontSize='md' fontWeight='600'>{sender.name}</Text>
        </Flex>
    )
}

ChatHeader.propTypes = {
    sender: PropTypes.shape({
        avatar: PropTypes.string,
        name: PropTypes.string,
    })
};

export default ChatHeader;
