import { Box, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import ChatBox from '../components/ChatBox';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChats from '../components/MyChats';
import { ChatState } from '../Context/ChatProvider';

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  const [visibility, setVisibility] = useState(true);

  const toggle = () => {
    setVisibility(prevVisibility => !prevVisibility);
    console.log(visibility);
  }
  return (
    <div style={{ width:'100%' }}>
      {/* <Button colorScheme={'purple'} onClick={toggle}>click me!</Button> */}
      {/* include wavedash logo here when vaporwave mode is toggled on  */}
      {user && visibility && <SideDrawer />}
      <Box
        d='flex'
        justifyContent='space-between'
        width='100%'
        height='91.5vh'
        p='10px'
      >
        {user && visibility && <MyChats className='visible' fetchAgain={ fetchAgain } />}
        {user && visibility && <ChatBox className='visible' fetchAgain={ fetchAgain } setFetchAgain={ setFetchAgain } />}
      </Box>
    </div>
  );
};

export default ChatPage;