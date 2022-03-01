import React from 'react';



const PostHistoryItem = (props) => {


    return (
        <div className='post'>
        <div ><strong>Идентификатор: </strong>{props.post.post.id}</div>
        <div className="name"><strong>Имя: </strong>{ props.post.post.title}</div>
        <div className="state"><strong>Статус:</strong>{props.post.state}</div>
        <div className="time"><strong>Время операции: </strong>{ props.post.date }</div>
      </div>
    );
};

export default PostHistoryItem;
