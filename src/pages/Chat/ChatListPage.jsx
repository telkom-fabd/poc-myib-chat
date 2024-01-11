import {useState} from 'react';
import {Box, IconButton, useToast} from "@chakra-ui/react";
import {ChatIcon} from "@chakra-ui/icons";
import MerchantListModal from "../../components/merchant/MerchantListModal.jsx";
import * as merchantService from "../../services/merchant";

const ChatListPage = () => {
    const toast = useToast();
    const [isLoadMerchants, setIsLoadMerchants] = useState(false);
    const [merchants, setMerchants] = useState([]);
    const [modalMerchant, setModalMerchant] = useState({
        isOpen: false,
    });

    const getMerchants = async () => {
        setIsLoadMerchants(true);

        const result = await merchantService.getList();
        if (result.isSuccess) {
            setMerchants(result.data);
        } else {
            toast({
                title: 'Error',
                description: result.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom',
            });
        }

        setTimeout(() => {
            setIsLoadMerchants(false);
        }, 800);
    }

    const toggleModalMerchant = () => {
        setModalMerchant({
            isOpen: !modalMerchant.isOpen,
        });
    }

    const openMerchantList = async () => {
        await getMerchants();
        toggleModalMerchant();
    }

    const startChat = async (merchant) => {
        console.log(merchant);
    }

    return (
        <>
            <Box
                position='absolute'
                bottom='20px'
                right='24px'
            >
                <IconButton
                    isRound={true}
                    variant='solid'
                    colorScheme='primary'
                    aria-label='new_chat'
                    size='lg'
                    icon={<ChatIcon/>}
                    onClick={openMerchantList}
                />
            </Box>

            <MerchantListModal
                isOpen={modalMerchant.isOpen}
                onClose={toggleModalMerchant}
                merchants={merchants}
                isLoading={isLoadMerchants}
                onMerchantClick={(merchant) => {
                    toggleModalMerchant();
                    startChat(merchant);
                }}
            />
        </>
    );
};

export default ChatListPage;
