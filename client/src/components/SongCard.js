import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import EditSongModal from './MUIEditSongModal';


function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index } = props;

    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }
    function handleRemoveSong(event) {
        store.showRemoveSongModal(index, song);
    }
    /*function handleClick(event) {
        // DOUBLE CLICK IS FOR SONG EDITING
        if (event.detail === 2) {
            store.showEditSongModal(index, song);
        }
    }*/
    function handleEditSong(event) {
        store.showEditSongModal(index, song);
    }

    let cardClass = "list-card unselected-list-card";
    return (
      <div
        key={index}
        id={"song-" + index + "-card"}
        className={cardClass}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        draggable="true"
        //onClick={handleClick}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          {index + 1}.
          <a
            id={"song-" + index + "-link"}
            className="song-link"
            target="_blank"
            href={"https://www.youtube.com/watch?v=" + song.youTubeId}
          >
            {song.title} by {song.artist}
          </a>
        </div>
        <div style={{display: 'flex', width: '11%', justifyContent: 'space-between'}}>
          <Fab
            color="primary"
            aria-label="edit"
            id={"edit-song-" + index}
            onClick={handleEditSong}
            style={{ height: "10px", width: "35px" }}
          >
            <EditIcon />
          </Fab>
          <Fab
            color="primary"
            aria-label="remove"
            id={"remove-song-" + index}
            onClick={handleRemoveSong}
            style={{ height: "10px", width: "35px" }}
          >
            <CloseIcon />
          </Fab>
        </div>
      </div>
    );
}

export default SongCard;