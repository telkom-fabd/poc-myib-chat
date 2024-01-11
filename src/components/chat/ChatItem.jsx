import moment from "moment";
import PropTypes from "prop-types";
import {Avatar, Flex, Text} from "@chakra-ui/react";

const ChatItem = ({chat, onClick}) => {
    const createdAt = moment(chat.createdAt).fromNow();

    return (
        <Flex
            flexDir='row'
            justifyContent='start'
            alignItems='center'
            bgColor='white'
            w='100%'
            h='80px'
            p={4}
            borderBottom='1px solid #E2E8F0'
            gap={3}
            onClick={onClick}
            cursor='pointer'
        >
            <Avatar src={chat.avatar} size='sm' />
            <Flex
                flexDir='column'
                justifyContent='start'
                alignItems='start'
                w='100%'
                h='100%'
            >
                <Flex
                    flexDir='row'
                    justifyContent='space-between'
                    alignItems='start'
                    w='100%'
                >
                    <Text fontSize='md' fontWeight='600'>{chat.name}</Text>
                    <Text fontSize='xs' fontWeight='400'>{createdAt}</Text>
                </Flex>
                <Text fontSize='sm' fontWeight='400'>{chat.message}</Text>
            </Flex>
        </Flex>
    )
}

ChatItem.propTypes = {
    chat: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        createdAt: PropTypes.number.isRequired,
    }),
    onClick: PropTypes.func,
}

export default ChatItem;
