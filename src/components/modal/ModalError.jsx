import PropTypes from "prop-types";
import {
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react'

const ModalError = ({isOpen, title, message, onClose}) => {
    return (
        <Modal
            size='sm'
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={true}
            closeOnEsc={true}
            isCentered
        >
            <ModalOverlay/>
            <ModalContent borderRadius={10}>
                <ModalHeader
                    backgroundColor='red.600'
                    fontSize='md'
                    fontWeight='bold'
                    color='white'
                    borderTopStartRadius={10}
                    borderTopEndRadius={10}
                >
                    {title}
                </ModalHeader>
                <ModalCloseButton color='white'/>
                <ModalBody p={0}>
                    <Flex
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='center'
                        minH={200}
                        p={4}
                    >
                        <Text
                            color='red.500'
                            fontWeight='bold'
                            fontSize='lg'
                            textAlign='center'
                        >
                            {message}
                        </Text>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

ModalError.propTypes = {
    isOpen: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func.isRequired,
}

ModalError.defaultProps = {
    isOpen: false,
    title: 'ALERT',
    message: 'Something went wrong.',
}

export default ModalError;
