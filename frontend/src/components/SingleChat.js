import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { getSender, getSenderFull } from '../config/ChatLogics';
import { ChatState } from '../Context/ChatProvider';
import ProfileModal from './miscellaneous/ProfileModal';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  
    const { user, selectedChat, setSelectedChat } = ChatState();
    
    return (
    <>
        {
            selectedChat ? (
                <>
                    <Text
                        fontSize={{ base:'28px', md:'30px' }}
                        pb={3}
                        px={2}
                        w='100%'
                        fontFamily='Maven Pro'
                        d='flex'
                        justifyContent={{ base:'space-between' }}
                        alignItems='center'
                    >
                        <IconButton
                            d={{ base:'flex', md:'none' }}
                            icon={ <ArrowBackIcon /> }
                            onClick={()=>setSelectedChat('')}
                        />
                        {!selectedChat.isGroupChat ? (
                            <>
                                {getSender(user, selectedChat.users)}
                                <ProfileModal user={getSenderFull(user, selectedChat.users)}/>
                            </>
                        ) : (
                            <>
                                {selectedChat.chatName.toUpperCase()}
                                {/* <UpdateGroupChatModel
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain}
                                /> */}
                            </>
                        )}
                    </Text>
                </>
            ) : (
                <Box
                    d='flex'
                    alignItems='center'
                    justifyContent='center'
                    h='100%'
                >
                    <Text
                        fontSize='3xl'
                        pb={3}
                        fontFamily='Maven Pro'
                    >
                        Click on a user to start chatting!
                    </Text>
                </Box>
            )
        }
    </>
  )
}

export default SingleChat;