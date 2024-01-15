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
import * as cookie from "../../utils/cookie.js";

const ChatListPage = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const sb = SendbirdChat.init({
        appId: 'CFEC9256-8DDF-4D86-BD78-8106455347BC',
        modules: [
            new GroupChannelModule(),
        ],
    });

    const [userId, setUserId] = useState('');
    const [sendBirdUser, setSendBirdUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [isLoadMerchants, setIsLoadMerchants] = useState(false);
    const [merchants, setMerchants] = useState([]);
    const [modalMerchant, setModalMerchant] = useState({
        isOpen: false,
    });

    useEffect(() => {
        const user = cookie.getUser();
        setUserId(user._id);
        getSendBirdUser();
    }, []);

    const getSendBirdUser = async () => {
        const result = await customerService.getSendBirdUser();
        if (result.isSuccess && result.data && result.data.user) {
            console.log("getSendBirdUser :", result.data.user);
            setSendBirdUser(result.data.user);
        }
    }

    useEffect(() => {
        if (sendBirdUser && sendBirdUser.user_id) {
            console.log("sendBirdUser :", sendBirdUser);
            connectSendbird(sendBirdUser.user_id);
        }
    }, [sendBirdUser]);

    const connectSendbird = async (userId) => {
        try {
            await sb.connect(userId);

            const groupChannelFilter = new GroupChannelFilter();
            groupChannelFilter.includeEmpty = true;
            const params = {
                filter: groupChannelFilter,
                order: GroupChannelListOrder.LATEST_LAST_MESSAGE,
            };
            const channelCollection = sb.groupChannel.createGroupChannelCollection(params);
            const channels = await channelCollection.loadMore();
            console.log("channels :", channels);

            const chatList = channels.map((channel) => {
                let members = [];
                if (channel.members && channel.members.length > 0) {
                    members = channel.members.map((member) => {
                        return {
                            userId: member.userId,
                            avatar: member.plainProfileUrl,
                            name: member.nickname,
                            isOnline: member.connectionStatus === 'online',
                        };
                    });
                }

                let lastMessage = null;
                if (channel.lastMessage) {
                    lastMessage = {
                        content: channel.lastMessage.message,
                        createdAt: channel.lastMessage.createdAt,
                        sender: {
                            userId: channel.lastMessage.sender.userId,
                            avatar: channel.lastMessage.sender.plainProfileUrl,
                            name: channel.lastMessage.sender.nickname,
                        },
                    };
                }

                return {
                    url: channel._url,
                    members: members,
                    lastMessage: lastMessage,
                    createdAt: channel.createdAt,
                };
            })

            console.log("chatList :", chatList);
            setChats(chatList);
        } catch (err) {
            console.log("connectSendbird error :", err);
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

        const customerSendBirdUser = resCustomerSendBird.data.sendbird_user;
        console.log("resCustomerSendBird :", resCustomerSendBird);
        const merchantSendBirdUser = resMerchantSendBird.data.sendbird_user;
        const newChannelParams = {
            invitedUserIds: [customerSendBirdUser.user_id, merchantSendBirdUser.user_id],
        };
        const channel = await sb.groupChannel.createChannel(newChannelParams);
        console.log(channel);
        navigate(`/chat/${channel.url}`);
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
                            userId={userId}
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
