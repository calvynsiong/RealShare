import React from 'react';
import styled from 'styled-components';
// components
import {
  RssFeed,
  PlayCircleFilledOutlined,
  Bookmark,
} from '@material-ui/icons';

const SidebarContainer = styled.div``;
const SidebarLinks = styled.ul``;
const Divider = styled.hr``;
const FriendsList = styled.ul`
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(179, 179, 179);
  }
`;
const Friend = styled.li``;
const ListItems = [
  { icon: <RssFeed />, text: ' Feed' },
  { icon: <PlayCircleFilledOutlined />, text: ' Video' },
  { icon: <Bookmark />, text: ' Bookmarks' },
];
const Sidebar = () => {
  return (
    <section className='flex-[2] hidden md:flex h-[calc(100vh-5em)] sticky  top-[5em] w-[25rem] bg-[#e4e9e44f]'>
      <SidebarContainer className='p-4 flex flex-col w-full sticky'>
        <SidebarLinks>
          {ListItems.map((item, index) => (
            <li key={index} className='my-4 flex gap-2'>
              {item.icon}
              <span>{item.text}</span>
            </li>
          ))}
        </SidebarLinks>
        <Divider className='my-[20px]'></Divider>
        <FriendsList className='flex flex-col overflow-y-scroll'>
          {Array.from({ length: 100 }).map((_, index) => (
            <Friend
              key={index}
              className='flex bg-white gap-3 w-[calc(100%-2rem)] m-4 mt-0 rounded-md p-3'
            >
              <img
                src='https://avatars.dicebear.com/api/gridy/:seed.svg'
                alt='friend image'
                className='object-cover w-[2em] h-[2em] rounded-full mr-4'
              ></img>
              <span>Calvyn</span>
            </Friend>
          ))}
        </FriendsList>
      </SidebarContainer>
    </section>
  );
};

export default Sidebar;
