// import moment from "moment";
import PropTypes from "prop-types";
import {Avatar, Flex, Text} from "@chakra-ui/react";
import moment from "moment";

const ChatItem = ({userId, chat, onClick}) => {
    let senderName = '';
    let senderAvatar = '';
    let lastMessageContent = 'Currently no messages';
    let lastMessageCreatedAt = '';

    if (chat.members && chat.members.length > 0) {
        for (let i = 0; i < chat.members.length; i++) {
            if (chat.members[i].userId !== userId) {
                senderName = chat.members[i].name;
                senderAvatar = chat.members[i].avatar;
                break;
            }
        }
    }

    if (chat.lastMessage) {
        lastMessageContent = chat.lastMessage.content;
        lastMessageCreatedAt = moment(chat.lastMessage.createdAt).fromNow();
    } else {
        if (chat.createdAt) {
            lastMessageCreatedAt = moment(chat.createdAt).fromNow();
        }
    }

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
            <Avatar name={senderName} src={senderAvatar} size='sm'/>
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
                    <Text fontSize='md' fontWeight='600'>{senderName}</Text>
                    <Text fontSize='xs' fontWeight='400'>{lastMessageCreatedAt}</Text>
                </Flex>
                <Text fontSize='sm' fontWeight='400'>{lastMessageContent}</Text>
            </Flex>
        </Flex>
    )
}

ChatItem.propTypes = {
    userId: PropTypes.string.isRequired,
    chat: PropTypes.shape({
        url: PropTypes.string.isRequired,
        members: PropTypes.arrayOf(PropTypes.shape({
            userId: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            isOnline: PropTypes.bool.isRequired,
        })),
        lastMessage: PropTypes.shape({
            content: PropTypes.string.isRequired,
            createdAt: PropTypes.number.isRequired,
        }),
        createdAt: PropTypes.number.isRequired,
    }).isRequired,
    onClick: PropTypes.func,
}

export default ChatItem;
