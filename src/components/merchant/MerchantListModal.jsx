import PropTypes from "prop-types";
import {Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay,} from '@chakra-ui/react'
import MerchantList from "./MerchantList.jsx";

const MerchantListModal = ({isOpen, onClose, merchants, isLoading, onMerchantClick}) => {
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
            <ModalContent borderRadius={8}>
                <ModalHeader
                    backgroundColor='red.600'
                    fontSize='md'
                    fontWeight='bold'
                    textAlign='center'
                    color='white'
                    borderTopStartRadius={6}
                    borderTopEndRadius={6}
                >
                    Choose Merchant to Chat
                </ModalHeader>
                <ModalBody p={0}>
                    <MerchantList
                        isLoading={isLoading}
                        merchants={merchants}
                        onMerchantClick={onMerchantClick}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

MerchantListModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    merchants: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
    })),
    onMerchantClick: PropTypes.func,
}

MerchantListModal.defaultProps = {
    isOpen: false,
    isLoading: false,
    merchants: [],
}

export default MerchantListModal;
