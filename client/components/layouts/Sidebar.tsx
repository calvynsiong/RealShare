import React from 'react';
import styled from 'styled-components';
// components
import {
  RssFeed,
  PlayCircleFilledOutlined,
  Bookmark,
} from '@material-ui/icons';

const SidebarSection = styled.section`
  flex: 2;
  height: calc(100vh - 80px);
  top: 5em;
  width: 25rem;
  background-color: #e4e9e44f;
`;
const SidebarContainer = styled.div``;
const SidebarLinks = styled.ul``;
const Divider = styled.hr`
  margin: 0 20px;
`;
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
const Friend = styled.li`
  width: calc(100%-2rem);
`;
const ListItems = [
  { icon: <RssFeed />, text: ' Feed' },
  { icon: <PlayCircleFilledOutlined />, text: ' Video' },
  { icon: <Bookmark />, text: ' Bookmarks' },
];
const Sidebar = () => {
  return (
    <SidebarSection className='hidden md:flex sticky'>
      <SidebarContainer className='p-4 flex flex-col w-full sticky'>
        <SidebarLinks>
          {ListItems.map((item, index) => (
            <li key={index} className='my-4 flex gap-2'>
              {item.icon}
              <span>{item.text}</span>
            </li>
          ))}
        </SidebarLinks>
        <Divider></Divider>
        <FriendsList className='flex flex-col overflow-y-scroll'>
          <span className='text-xl font-semibold  mb-8 ml-4 '>
            Friends List (0)
          </span>
          {false ? (
            Array.from({ length: 100 }).map((_, index) => (
              <Friend
                key={index}
                className='flex bg-white gap-3 m-4 mt-0 rounded-md p-3'
              >
                <img
                  src='https://avatars.dicebear.com/api/gridy/:seed.svg'
                  alt='friend image'
                  className='object-cover w-8 h-8 rounded-full mr-4'
                ></img>
                <span>Calvyn</span>
              </Friend>
            ))
          ) : (
            <Friend className='flex bg-white gap-3 m-4 mt-0 rounded-md p-3'>
              <img
                src='https://avatars.dicebear.com/api/gridy/:seed.svg?mood[]=sad'
                alt='friend image'
                className='object-cover w-8 h-8 rounded-full mr-4'
              ></img>
              <span>No friends yet</span>
            </Friend>
          )}
        </FriendsList>
      </SidebarContainer>
    </SidebarSection>
  );
};

export default Sidebar;
