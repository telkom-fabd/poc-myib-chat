import PropTypes from "prop-types";
import {Avatar, Flex, Text} from "@chakra-ui/react";

const MerchantItem = ({ name, onClick }) => {
    return (
        <Flex
            flexDir='row'
            justifyContent='start'
            alignItems='center'
            bgColor='white'
            w='100%'
            h='60px'
            p={4}
            borderBottom='1px solid #E2E8F0'
            gap={3}
            onClick={onClick}
            cursor='pointer'
        >
            <Avatar name={name} size='sm' />
            <Text fontSize='md'>{name}</Text>
        </Flex>
    );
}

MerchantItem.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}

export default MerchantItem;
