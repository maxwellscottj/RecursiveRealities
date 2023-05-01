import React from 'react';
import Banner from './posts/banner'
import ListPosts from './posts/listPosts'

const Home = (props) => {
  return (
    <div>
      <Banner/>
	  <ListPosts loggedIn={props.loggedIn}/>
    </div>
  );
};
  
export default Home;