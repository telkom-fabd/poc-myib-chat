import PropTypes from "prop-types";
import {Avatar, Box, Flex, HStack, Text} from "@chakra-ui/react";

const ChatHeader = ({sender}) => {
    return (
        <Flex
            flexDir='row'
            w='100%'
            h='60px'
            p={4}
            gap={4}
            justifyContent='space-between'
            alignItems='center'
            bgColor='rgb(255, 255, 255, 0.9)'
            borderBottom='1px solid rgb(232, 232, 232)'
            boxShadow='0 0 10px 0 rgba(155, 155, 155, 0.1)'
        >
            <HStack gap={4}>
                <Avatar name={sender.name} src={sender.avatar} size='sm'/>
                <Text fontSize='md' fontWeight='600'>{sender.name}</Text>
            </HStack>

            <HStack gap={1}>
                <Box
                    w='8px'
                    h='8px'
                    borderRadius='50%'
                    bgColor={sender.isOnline ? 'green.400' : 'gray.400'}
                />
                <Text fontSize='xs' fontWeight='400'>
                    {sender.isOnline ? 'online' : 'offline'}
                </Text>
            </HStack>
        </Flex>
    )
}

ChatHeader.propTypes = {
    sender: PropTypes.shape({
        isOnline: PropTypes.bool,
        avatar: PropTypes.string,
        name: PropTypes.string,
    })
};

export default ChatHeader;
