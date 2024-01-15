import moment from "moment";
import PropTypes from "prop-types";
import {Flex, Text} from "@chakra-ui/react";

const ChatMessage = ({userId, message}) => {
    if (!userId || userId === '') return null;

    const createdAt = moment(message.createdAt).fromNow();
    const isMyMessage = userId === message.sender.id;
    if (isMyMessage) {
        return (
            <Flex
                w='100%'
                flexDir='row'
                justifyContent='end'
                alignItems='end'
                my={2}
                px={4}
            >
                <Flex
                    flexDir='column'
                    minW='120px'
                    px={4}
                    py={2}
                    borderRadius={12}
                    bgColor='rgba(245,101,101,0.1)'
                >
                    <Text
                        fontSize='14px'
                        fontWeight='400'
                        textAlign='left'
                        color='rgba(0,0,0,1)'
                    >
                        {message.content}
                    </Text>

                    <Text
                        fontSize='9px'
                        fontWeight='400'
                        textAlign='right'
                        color='rgba(0,0,0,0.6)'
                    >
                        {createdAt}
                    </Text>
                </Flex>
            </Flex>
        )
    }

    return (
        <Flex
            w='100%'
            flexDir='row'
            justifyContent='start'
            alignItems='start'
            my={2}
            px={4}
        >
            <Flex
                flexDir='column'
                minW='120px'
                px={4}
                py={2}
                borderRadius={12}
                bgColor='rgba(0,0,0,0.1)'
            >
                <Text
                    fontSize='14px'
                    fontWeight='400'
                    textAlign='left'
                    color='rgba(0,0,0,1)'
                >
                    {message.content}
                </Text>

                <Text
                    fontSize='9px'
                    fontWeight='400'
                    textAlign='right'
                    color='rgba(0,0,0,0.6)'
                >
                    {createdAt}
                </Text>
            </Flex>
        </Flex>
    )
}

ChatMessage.propTypes = {
    userId: PropTypes.string,
    message: PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        sender: PropTypes.shape({
            id: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }).isRequired,
        sendingStatus: PropTypes.string.isRequired,
        createdAt: PropTypes.number.isRequired,
    }),
}

export default ChatMessage;
