import { ViewIcon } from '@chakra-ui/icons';
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ModalFooter, useDisclosure, useToast, Box, FormControl, Input, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import UserListItem from '../UserAvatar/UserListItem';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user, selectedChat, setSelectedChat } = ChatState();
    const [renameLoading, setRenameLoading] = useState(false);

    const toast = useToast();

    const handleRemove = async(user1) => {
        if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id){
            toast({
                title: 'Only admins can remove users from a group',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization:`Bearer ${user.token}`
                }
            };

            const { data } = await axios.put('api/chat/groupremove', {
                chatId:selectedChat._id,
                userId:user1._id
            }, config);

            user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            fetchMessages();
            setLoading(false);
        } catch (error) {
            toast({
                title: 'Error occurred',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false);
        }
    };

    const handleAddUser = async(user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)){
            toast({
                title: 'User already in group',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            return;
        }

        if (selectedChat.groupAdmin._id !== user._id){
            toast({
                title: 'Only admins can add users to a group',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization:`Bearer ${user.token}`
                }
            };

            const { data } = await axios.put('api/chat/groupadd', {
                chatId:selectedChat._id,
                userId:user1._id
            }, config);

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            toast({
                title: 'Error occurred',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false);
        }
    };

    const handleRename = async() => {
        if(!groupChatName) return;

        try {
            setRenameLoading(true);
            const config = {
                headers: {
                    Authorization:`Bearer ${user.token}`
                }
            };

            const { data } = await axios.put('api/chat/rename', {
                chatId: selectedChat._id,
                chatName: groupChatName,
            }, config);

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);
        } catch (error) {
            toast({
                title: 'Error occurred',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setRenameLoading(false);
        }
        setGroupChatName('');
    };

    const handleSearch  = async(query) => {
        setSearch(query);
        if(!query){
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization:`Bearer ${user.token}`
                }
            };
            const { data } = await axios.get(`/api/user?search=${search}`, config);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: 'Error occurred',
                description: 'Failed to load search results',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left'
            });
        }
    };

  return (
    <>
      <IconButton 
        d={{ base:'flex' }}
        icon={ <ViewIcon /> }
        onClick={onOpen}
     />

        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
        >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize='35px'
            fontFamily='Maven Pro'
            d='flex'
            justifyContent='center'
          >{selectedChat.chatName}</ModalHeader>
          <ModalBody>
                <Box
                    w='100%'
                    d='flex'
                    flexWrap='wrap'
                    pb={3}
                >
                    {selectedChat.users.map(u=>(
                        <UserBadgeItem 
                        key={u._id}
                        user={u}
                        handleFunction={()=>handleRemove(u)}
                    />
                    ))}
                </Box>
                <FormControl d='flex'>
                    <Input 
                        placeholder='Chat name'
                        mb={3}
                        value={groupChatName}
                        onChange={(e)=>setGroupChatName(e.target.value)}
                    />
                    <Button
                        variant='solid'
                        colorScheme='purple'
                        ml={1}
                        isLoading={renameLoading}
                        onClick={handleRename}
                    >
                        Update
                    </Button>
                </FormControl>
                <FormControl d='flex'>
                    <Input 
                        placeholder='Add user to group'
                        mb={1}
                        onChange={(e)=>handleSearch(e.target.value)}
                    />
                </FormControl>
                {loading ? (
                    <Spinner 
                        size='xl'
                        w={10}
                        h={10}
                        alignSelf='center'
                        margin='auto'
                    />
                ) : (
                    searchResult?.slice(0, 4).map((user) => (
                        <UserListItem
                            key={user._id}
                            user={user}
                            handleFunction={()=>handleAddUser(user)}
                        />
                    ))
                )}
          </ModalBody>
          <ModalFooter>
            <Button
                colorScheme='red'
                onClick={() => handleRemove(user)}
            >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChatModal;