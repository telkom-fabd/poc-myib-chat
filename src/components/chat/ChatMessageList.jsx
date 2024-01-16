import PropTypes from "prop-types";
import {Flex} from "@chakra-ui/react";
import ChatMessage from "./ChatMessage.jsx";

const ChatMessageList = ({userId, messages}) => {
    return (
        <Flex
            flexDir='column'
            justifyContent='start'
            alignItems='start'
            w='100%'
            h='calc(100vh - 200px)'
            overflow='auto'
            pb={2}
        >
            {
                messages.map((msg, index) => (
                    <ChatMessage
                        key={index}
                        userId={userId}
                        message={msg}
                    />
                ))
            }
        </Flex>
    )
}

ChatMessageList.propTypes = {
    userId: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        sender: PropTypes.shape({
            id: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }).isRequired,
        sendingStatus: PropTypes.string.isRequired,
        createdAt: PropTypes.number.isRequired,
    }))
};

ChatMessageList.defaultProps = {
    userId: null,
    messages: [],
}

export default ChatMessageList;
