import React from 'react';
import PostItem from "./PostItem";
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';
import PostHistoryItem from './PostHistoryItem';

const PostHistoryList = ({posts}) => {
    if (!posts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Посты не найдены!
            </h1>
        )
    }
    

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                История
            </h1>
            <TransitionGroup>
                {posts.map((post) =>
                    <CSSTransition
                        key={post.date}
                        timeout={500}
                        classNames="post"
                    >
                        <PostHistoryItem  post={post} />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default PostHistoryList;
