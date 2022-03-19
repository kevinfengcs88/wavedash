import { Box, Button, Tooltip, Text, Menu, MenuButton, MenuList, Avatar, MenuItem, MenuDivider, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Input, useToast, Spinner } from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import { getSender } from '../../config/ChatLogics';
import { Effect } from 'react-notification-badge';
import NotificationBadge from 'react-notification-badge';

const SideDrawer = () => {

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();
    const history = useHistory();

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        history.push('/');
    };

    const toast = useToast();

    const handleSearch = async() => {
        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization:`Bearer ${user.token}`
                }
            };

            const { data } = await axios.get(`/api/user?search=${search}`, config);
            setLoading(false);
            setSearchResults(data);

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

    const accessChat = async(userId) => {
        try {
            setLoadingChat(true);

            const config = {
                headers: {
                    'Content-type':'application/json',
                    Authorization:`Bearer ${user.token}`
                }
            };

            const {data} = await axios.post('/api/chat', {userId}, config);

            if (!chats.find((c)=>c._id === data._id)){
                setChats([data, ...chats]);
            }

            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: 'Error retrieving chat',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left'
            });
        }
    };

  return (
    <>
        <Box
        d='flex'
        justifyContent='space-between'
        alignItems='center'
        bg='white'
        w='100%'
        p='5px 10px 5px 10px'
        borderWidth='5px'
        >
            <Tooltip label='Search users to chat' hasArrow placement='bottom-end'>
                <Button variant='ghost' onClick={onOpen}>
                    <i className="fas fa-search"></i>
                    <Text d={{ base:'none', md:'flex' }} px='4'>
                        Search users
                    </Text>
                </Button>
            </Tooltip>

            <Text fontSize='4xl' fontFamily='Magneto Bold'>
                wavedash
            </Text>

            <div>
                <Menu>
                    <MenuButton p={1}>
                        <NotificationBadge
                            count={notification.length}
                            effect={Effect.SCALE}
                        />
                        <BellIcon fontSize='2xl' m={1}/>
                    </MenuButton>
                    <MenuList pl={3} pr={3}>
                        {!notification.length && 'No new messages'}
                        {notification.map(notif => (
                            <MenuItem key={notif._id} onClick={() => {
                                console.log(notif.chat);
                                console.log(notification);
                                setSelectedChat(notif.chat);
                                // setNotification(notification.filter(n => n.chat !== notification.chat))
                                setNotification(notification.filter(n => n !== notif));
                            }}>
                                {notif.chat.isGroupChat ? `New message in ${notif.chat.chatName}`
                                : `New message from ${getSender(user, notif.chat.users)}`}
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        <Avatar
                        size='sm'
                        cursor='pointer'
                        name={user.name}
                        src={user.pic}
                        />
                    </MenuButton>
                    <MenuList>
                        <ProfileModal user={user}>
                            <MenuItem
                                _hover={{
                                    background:'purple.500',
                                    color:'white'
                                }}
                            >My Profile</MenuItem>
                        </ProfileModal>
                        <MenuDivider></MenuDivider>
                        <MenuItem
                            _hover={{
                                background:'red.500',
                                color:'white' 
                            }}
                            onClick={logoutHandler}
                        >Logout</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </Box>

        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay 
                bg='none'
                backdropFilter='auto'
                backdropInvert='80%'
                backdropBlur='2px'
            />
            <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'>
                    Search users
                </DrawerHeader>
                <DrawerBody>
                    <Box d='flex' pb={2}>
                        <Input 
                            placeholder='Search by name or email'
                            mr={2}
                            value={search}
                            onChange={(e) => {setSearch(e.target.value); handleSearch()}}
                        />
                    </Box>
                    {loading ? (
                        <ChatLoading />
                    ) : (
                        searchResults?.map(user => (
                            <UserListItem 
                                key={user._id}
                                user={user}
                                handleFunction={()=>accessChat(user._id)}
                            />
                        ))
                    )}
                    {loadingChat && <Spinner m1='auto' d='flex' />}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>
  )
}

export default SideDrawer;