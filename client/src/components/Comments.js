import { useContext } from 'react'
import { GlobalStoreContext } from '../store/index.js'
import CommentCard from './CommentCard';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { TextField } from '@mui/material';
import AuthContext from '../auth'

function Comments() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    console.log(store.playerList);
    let commentList = '';
    if (store.playerList) {
        console.log(store.playerList.comment)
        commentList = <List 
        id="comments"
        sx={{ width: '100%', height: '73%', bgcolor: '#404040'}}
    >
        {
            store.playerList.comments.map((comment, index) => (
                <CommentCard
                    id={'comment-' + (index)}
                    key={'comment-' + (index)}
                    comment={comment}
                    index={index}
                />
            ))  
            
        }
     </List>; 
    }
    let commentTextField = '';
    if (store.playerList) {
      commentTextField = (
        <TextField
          InputProps={{ sx: { width: 550, color: "whitesmoke" } }}
          id="comment-text-field"
          className="text"
          label="Comment"
          variant="standard"
          placeholder=""
          size="small"
          disabled={auth.user.userName === store.playerList.ownerUserName}
          style={{ paddingTop: 20 }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              store.comment();
            }
          }}
        />
      );
    }
    return (
      <div
        style={{
          width: "97%",
          height: "100%",
          backgroundColor: "transparent",
          paddingLeft: 10,
        }}
      >
        {commentList}
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {commentTextField}
        </form>
      </div>
    );
}
export default Comments;