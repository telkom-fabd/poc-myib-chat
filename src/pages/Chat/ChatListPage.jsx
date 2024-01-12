import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Box, Flex, IconButton, useToast} from "@chakra-ui/react";
import {ChatIcon} from "@chakra-ui/icons";
import SendbirdChat from '@sendbird/chat'
import {GroupChannelFilter, GroupChannelListOrder, GroupChannelModule} from "@sendbird/chat/groupChannel";
import MerchantListModal from "../../components/merchant/MerchantListModal.jsx";
import ChatItem from "../../components/chat/ChatItem.jsx";

import * as customerService from "../../services/customer";
import * as merchantService from "../../services/merchant";
import * as cookie from "../../utils/cookie";

const ChatListPage = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const sb = SendbirdChat.init({
        appId: 'CFEC9256-8DDF-4D86-BD78-8106455347BC',
        modules: [
            new GroupChannelModule(),
        ],
    });

    const [chats, setChats] = useState([]);
    const [isLoadMerchants, setIsLoadMerchants] = useState(false);
    const [merchants, setMerchants] = useState([]);
    const [modalMerchant, setModalMerchant] = useState({
        isOpen: false,
    });

    useEffect(() => {
        const sendbird = cookie.getSendbird();
        if (sendbird) {
            connectSendbird(sendbird.user_id);
        } else {
            getSendbirdFromCustomer();
        }
    }, []);

    const getSendbirdFromCustomer = async () => {
        const resultCustomer = await customerService.getCustomer();
        if (resultCustomer.isSuccess && resultCustomer.data.sendbird) {
            cookie.saveSendbird(resultCustomer.data.sendbird);
            connectSendbird(resultCustomer.data.sendbird.user_id);
        }
    }

    const connectSendbird = async (userId) => {
        try {
            const user = await sb.connect(userId);
            console.log("sendbird user :", user);

            const groupChannelFilter = new GroupChannelFilter();
            groupChannelFilter.includeEmpty = true;
            const params = {
                filter: groupChannelFilter,
                order: GroupChannelListOrder.LATEST_LAST_MESSAGE,
            };
            const channelCollection = sb.groupChannel.createGroupChannelCollection(params);
            const channels = await channelCollection.loadMore();
            console.log("channels :", channels);

            const chats = channels.map((channel) => {
                const chat = {
                    id: channel._iid,
                    url: channel._url,
                    avatar: channel.coverUrl,
                    name: channel.lastMessage.sender.nickname,
                    message: channel.lastMessage.message,
                    createdAt: channel.lastMessage.createdAt,
                };
                return chat;
            })
            setChats(chats);
        } catch (err) {
            // Handle error.
        }
    }

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
        }, 500);
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
        const resCustomerSendBird = await customerService.createSendBirdUser();
        if (!resCustomerSendBird.isSuccess) {
            toast({
                title: 'Error',
                description: resCustomerSendBird.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom',
            });
        }

        const resMerchantSendBird = await merchantService.createSendBirdUser(merchant._id);
        if (!resMerchantSendBird.isSuccess) {
            toast({
                title: 'Error',
                description: resMerchantSendBird.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom',
            });
        }
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

            <Flex
                flexDir='column'
                justifyContent='start'
                alignItems='start'
                h='500px'
                overflow='auto'
            >
                {
                    chats.map((chat, index) => (
                        <ChatItem
                            key={`chat-${index}`}
                            chat={chat}
                            onClick={() => {
                                navigate(`/chat/${chat.url}`);
                            }}
                        />
                    ))
                }
            </Flex>
        </>
    );
};

export default ChatListPage;
