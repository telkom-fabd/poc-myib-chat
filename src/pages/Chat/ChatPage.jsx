import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Flex} from "@chakra-ui/react";
import SendbirdChat from '@sendbird/chat'
import {GroupChannelModule} from "@sendbird/chat/groupChannel";
import ChatMessage from "../../components/chat/ChatMessage.jsx";

import * as cookie from "../../utils/cookie";
import ChatHeader from "../../components/chat/ChatHeader.jsx";

const ChatPage = () => {
    const {channelUrl} = useParams()
    const [sendBirdUserId, setSendBirdUserId] = useState(null);
    const [sender, setSender] = useState({
        avatar: '',
        name: '',
    });
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        initSendbird(channelUrl);
    }, []);

    const addSendbirdMessages = (msgs = []) => {
        for (let i = 0; i < msgs.length; i++) {
            const newMsg = {
                id: msgs[i].messageId,
                content: msgs[i].message,
                sender: {
                    id: msgs[i].sender.userId,
                    avatar: msgs[i].sender.plainProfileUrl,
                    name: msgs[i].sender.nickname,
                },
                sendingStatus: msgs[i].sendingStatus,
                createdAt: msgs[i].createdAt,
            };
            setChatMessages((prevChats) => {
                return [...prevChats, newMsg];
            });
        }
    }

    const initSendbird = async (url) => {
        try {
            // get sendbird from cookie
            const sendbird = cookie.getSendbird();
            setSendBirdUserId(sendbird.user_id);

            // connect sendbird
            const sb = SendbirdChat.init({
                appId: 'CFEC9256-8DDF-4D86-BD78-8106455347BC',
                modules: [
                    new GroupChannelModule(),
                ],
            });
            await sb.connect(sendbird.user_id);

            // get channel
            const channel = await sb.groupChannel.getChannel(url);
            setSender({
                id: channel._iid,
                avatar: channel.coverUrl,
                name: channel.lastMessage.sender.nickname,
            })

            // get messages
            const collection = channel.createMessageCollection();
            if (collection.hasPrevious) addSendbirdMessages(await collection.loadPrevious());
            if (collection.hasNext) addSendbirdMessages(await collection.loadNext());

            // add event handler
            const eventHandler = {
                // onChannelUpdated: (context, channel) => {
                //     console.log("channel updated :", channel);
                // },
                // onChannelDeleted: (context, channelUrl) => {
                //     console.log("channelUrl :", channelUrl);
                // },
                onMessagesAdded: (context, channel, messages) => {
                    addSendbirdMessages(messages);
                },
                // onMessagesUpdated: (context, channel, messages) => {
                //     console.log("updated messages :", messages);
                // },
                // As messageIds was deprecated since v4.3.1., use messages instead.
                // onMessagesDeleted: (context, channel, messageIds, messages) => {
                //     console.log("deleted messages :", messages);
                // },
                // onHugeGapDetected: () => {
                //     console.log("huge gap detected");
                // },
            };
            collection.setMessageCollectionHandler(eventHandler);
        } catch (err) {
            // Handle error.
            console.log("err :", err);
        }
    }

    return (
        <>
            <Flex
                flexDir='column'
                justifyContent='start'
                alignItems='start'
                h='calc(100vh - 60px)'
            >
                <ChatHeader sender={sender}/>
                <Flex
                    flexDir='column'
                    justifyContent='start'
                    alignItems='start'
                    w='100%'
                    h='calc(100vh - 200px)'
                    overflow='auto'
                >
                    {
                        chatMessages.map((msg, index) => (
                            <ChatMessage
                                key={index}
                                sendbirdUserId={sendBirdUserId}
                                message={msg}
                            />
                        ))
                    }
                </Flex>
                <Flex
                    flexDir='row'
                    w='100%'
                    h='80px'
                    justifyContent='start'
                    alignItems='center'
                    bgColor='gray.100'
                >
                </Flex>
            </Flex>
        </>
    )
}

export default ChatPage;
