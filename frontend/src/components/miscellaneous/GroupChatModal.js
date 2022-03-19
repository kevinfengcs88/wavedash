import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Button, useToast, FormControl, Input, Box, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import { ChatState } from '../../Context/ChatProvider';
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const GroupChatModal = ({ children }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const{ user, chats, setChats } = ChatState();

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

    const handleSubmit = async() => {
        if(!groupChatName || !selectedUsers){
            toast({
                title: 'Please fill out all fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization:`Bearer ${user.token}`
                }
            };

            const { data } = await axios.post('/api/chat/group', {
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map((u) => u._id))
            }, config);

            setChats([data, ...chats]);
            onClose();

            toast({
                title: 'Group chat created',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });

        } catch (error) {
            toast({
                title: 'Failed to create group chat',
                description: error.response.data,
                status: 'erorr',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
        }
    };

    const handleDelete = (userToBeDeleted) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== userToBeDeleted._id));
    }; 

    const handleGroup = (userToAdd) => {
        if(selectedUsers.includes(userToAdd)){
            toast({
                title: 'User already in group',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
            return;
        }

        setSelectedUsers([...selectedUsers, userToAdd]);
    };

    return (
        <>
          <span onClick={onOpen}>{children}</span>
    
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay
                bg='none'
                backdropFilter='auto'
                backdropInvert='80%'
                backdropBlur='2px'
            />
            <ModalContent>
              <ModalHeader
                fontSize='35px'
                fontFamily='Maven Pro'
                d='flex'
                justifyContent='center'
              >
                  Create Group Chat
              </ModalHeader>
              <ModalBody
                d='flex'
                flexDir='column'
                alignItems='center'
              >
                <FormControl>
                    <Input
                    placeholder='Group Name'
                    mb={3}
                    onChange={(e) => setGroupChatName(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <Input
                    placeholder='Add users'
                    mb={1}
                    onChange={(e) => handleSearch(e.target.value)}
                    />
                </FormControl>

                <Box
                    w='100%'
                    d='flex'
                    flexWrap='wrap'
                >
                    {selectedUsers.map((u)=>(
                        <UserBadgeItem 
                            key={u._id}
                            user={u}
                            handleFunction={()=>handleDelete(u)}
                        />
                    ))}
                </Box>
                {loading ? <Spinner 
                                size='xl'
                                w={10}
                                h={10}
                                alignSelf='center'
                                margin='auto'
                            /> : (
                    searchResult?.slice(0, 4).map((user)=>(
                        <UserListItem
                            key={user._id}
                            user={user}
                            handleFunction={()=>handleGroup(user)}
                        />
                    ))
                )}
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='green' onClick={handleSubmit}>
                  Create Chat
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      );
}

export default GroupChatModal;