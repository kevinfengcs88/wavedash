import { ViewIcon } from '@chakra-ui/icons';
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ModalFooter, useDisclosure, useToast, Box, FormControl, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user, selectedChat, setSelectedChat } = ChatState();
    const [renameLoading, setRenameLoading] = useState(false);

    const toast = useToast();

    const handleRemove = () => {

    }

    const handleRename = () => {

    }

    const handleSearch = () => {

    }

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
          <ModalCloseButton />
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