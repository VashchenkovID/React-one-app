import React, { useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';
import PostHistoryItem from './../Components/PostHistoryItem';
import PostHistoryList from './../Components/PostHistoryList';



const About = () => {
    let hisPosts = [];
    let history;
    const historyStore = sessionStorage.getItem("historyPosts");
    history = JSON.parse(historyStore);
    hisPosts = history;
    console.log(hisPosts);
   
   
 return(
     <div>
         <h1>История</h1>
         <PostHistoryList posts={hisPosts}></PostHistoryList>
     </div>

     
 );


};



export default About;
