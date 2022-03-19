import { useDisclosure, IconButton, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Modal, Image, Text } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import React from 'react';

const ProfileModal = ({ user, children }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
        {
            children ? (<span onClick={onOpen}>{ children }</span>) : 
            (
                <IconButton
                    d={{ base: 'flex'}}
                    icon={<ViewIcon />}
                    onClick={onOpen}
                    />
            )
        }
        <Modal size='lg' isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h='410px'>
          <ModalHeader
            fontSize='40px'
            fontFamily='Maven Pro'
            d='flex'
            justifyContent='center'
          >{ user.name }</ModalHeader>
          <ModalBody 
            d='flex'
            flexDir='column'
            alignItems='center'
            justifyContent='space-between'
          >
            <Image
            borderRadius='full'
            boxSize='150px'
            src={ user.pic }
            alt={ user.name }
            />
             <Text
                fontSize={{ base:'28px', md:'30px' }}
                fontFamily='Maven Pro'
             >
                 { user.email }
             </Text>
          </ModalBody>
          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal;