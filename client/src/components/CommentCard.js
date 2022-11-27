import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function CommentCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { comment, index } = props;

    return (
        <div style={{
            color: 'whitesmoke',
            fontSize: '18pt',
            margin: '10px',
            padding: '20px',
            borderRadius: '25px',
            backgroundColor: '#353535'}}
            >
            <div style={{fontStyle: 'italic', fontSize: 16, padding: '0px 5px 5px 0px'}}> {comment.user} <br/></div>
            {comment.comment}
        </div>
    );
}

export default CommentCard