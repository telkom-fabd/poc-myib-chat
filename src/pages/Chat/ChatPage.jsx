import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Flex} from "@chakra-ui/react";
import SendbirdChat from '@sendbird/chat'
import {GroupChannelModule} from "@sendbird/chat/groupChannel";
import ChatHeader from "../../components/chat/ChatHeader.jsx";
import ChatMessageList from "../../components/chat/ChatMessageList.jsx";
import ChatForm from "../../components/chat/ChatForm.jsx";
import * as cookie from "../../utils/cookie";

const ChatPage = () => {
    const {channelUrl} = useParams()

    const sb = SendbirdChat.init({
        appId: 'CFEC9256-8DDF-4D86-BD78-8106455347BC',
        modules: [
            new GroupChannelModule(),
        ],
    });

    const [userId, setUserId] = useState('');
    const [sendBirdChannel, setSendBirdChannel] = useState(null);
    const [sender, setSender] = useState({
        avatar: '',
        name: '',
    });
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        console.log("init:");
        initSendbird(channelUrl);
    }, []);

    const initSendbird = async (url) => {
        try {
            const user = cookie.getUser();
            setUserId(user._id);

            // connect sendbird
            await sb.connect(user._id);

            // get channel
            const channel = await sb.groupChannel.getChannel(url);
            console.log("channel :", channel);
            setSendBirdChannel(channel);

            // set sender
            let senderName = '';
            let senderAvatar = '';
            let senderIsOnline = false;
            if (channel.members && channel.members.length > 0) {
                for (let i = 0; i < channel.members.length; i++) {
                    if (channel.members[i].userId !== user._id) {
                        senderName = channel.members[i].nickname;
                        senderAvatar = channel.members[i].plainProfileUrl;
                        senderIsOnline = channel.members[i].connectionStatus === 'online';
                        break;
                    }
                }
            }
            setSender({
                isOnline: senderIsOnline,
                avatar: senderAvatar,
                name: senderName,
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

    const addSendbirdMessages = (msgs = []) => {
        if (msgs.length === 0) return;

        // sort by createdAt
        msgs.sort((a, b) => {
            return a.createdAt - b.createdAt;
        })

        // transform
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

    const sendMessage = async (messageContent) => {
        try {
            // send message
            const params = {
                message: messageContent,
            };
            sendBirdChannel.sendUserMessage(params);
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
                <ChatMessageList userId={userId} messages={chatMessages}/>
                <ChatForm onSendMessage={sendMessage}/>
            </Flex>
        </>
    )
}

export default ChatPage;
