import StarBorderOutlinedIcon  from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon  from '@material-ui/icons/InfoOutlined';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Message from './Message';

function Chat() {

    const roomId = useSelector(selectRoomId);
    const [roomDetails] = useDocument(
        roomId && db.collection("rooms").doc(roomId)
    );
    const [roomMessages, loading] = useCollection(
        roomId && db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp', 'asc')
    );

    const chatRef = useRef(null);

    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [roomId, loading]);

    return (
        <ChatContainer>
            { roomDetails && roomMessages &&
                <>
                    <Header>
                        <HeaderLeft>
                            <h4><strong>#{roomDetails?.data().name}</strong></h4>
                            <StarBorderOutlinedIcon></StarBorderOutlinedIcon>
                        </HeaderLeft>
                        <HeaderRight>
                            <p>
                                <InfoOutlinedIcon />Details
                            </p>
                        </HeaderRight>
                    </Header>

                    <ChatMessages>

                        {roomMessages?.docs.map(doc => {
                            const { message, timestamp, user, userImage } = doc.data();
                            return(
                                <Message 
                                    key={doc.id}
                                    message={message}
                                    timestamp={timestamp}
                                    user={user}
                                    userImage={userImage}
                                />
                            );
                        })}
                    </ChatMessages>

                    <ChatBottom ref={chatRef} />

                    <ChatInput 
                        chatRef={chatRef}
                        channelName={roomDetails?.data().name}
                        channelId ={roomId}
                    />
                </>
            }
        </ChatContainer>
    )
}

export default Chat

const ChatContainer = styled.div `
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;
`;

const Header = styled.div `
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div `
    display: flex;
    align-items: center;
    
    >h4 {
        display: flex;
        text-transform: lowercase;
    }

    > .MuiSvgIcon-root {
        margin-left: 15px;
        font-size: 30px;
    }
`;

const HeaderRight = styled.div `
    > p {
        display: flex;
        align-items: center;
        font-size: 14px;
    }

    > p > .MuiSvgIcon-root {
        margin-right: 5px;
        font-size: 16px;
    }
`;

const ChatMessages = styled.div `

`;

const ChatBottom = styled.div `
    padding-bottom: 200px;
`;