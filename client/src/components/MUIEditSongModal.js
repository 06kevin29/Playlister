import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    p: 4,
};

export default function MUIEditSongModal() {
    const { store } = useContext(GlobalStoreContext);

    let newTitle = '';
    let newArtist = '';
    let newYouTubeId = '';

    if (store.currentList != null && store.currentSong != null) {
        newTitle = store.currentSong.title;
        newArtist = store.currentSong.artist;
        newYouTubeId = store.currentSong.youTubeId
    }

    function handleConfirmEditSong() {
        let newSongData = {
            title: newTitle,
            artist: newArtist,
            youTubeId: newYouTubeId
        };
        console.log(newSongData);
        store.addUpdateSongTransaction(store.currentSongIndex, newSongData);        
    }
    function handleCancelEditSong() {
        store.hideModals();
    }

    function handleUpdateTitle(event) {
        newTitle = event.target.value;
    }
    function handleUpdateArtist(event) {
        newArtist = event.target.value;
    }
    function handleUpdateYouTubeId(event) {
        newYouTubeId = event.target.value;
    }

    return (
        <Modal
            open={store.currentSong !== null && store.isEditSongModalOpen}
        >
            <Box sx={style}>
            <div
            id="edit-song-modal"
            className="modal is-visible"
            data-animation="slideInOutLeft">
            <div
                id='edit-song-root'
                className="modal-dialog">
                <div
                    id="edit-song-modal-header"
                    className="modal-header">Edit Song</div>
                <div
                    id="edit-song-modal-content"
                    className="modal-center">
                        <form>
                                <div className="col-left">
                                    <label htmlFor="edit-song-modal-title">Title:</label>
                                </div> 
                                <div className="col-right">
                                <input 
                                    id="edit-song-modal-title-textfield" 
                                    className='modal-textfield' 
                                    type="text"
                                    defaultValue={newTitle}
                                    onChange={handleUpdateTitle} 
                                    /><br/>
                                </div>
                                <div className="col-left">
                                    <label htmlFor="edit-song-modal-artist">Artist:</label>
                                </div> 
                                <div className="col-right">
                                <input 
                                    id="edit-song-modal-artist-textfield" 
                                    className='modal-textfield' 
                                    type="text" 
                                    defaultValue={newArtist}
                                    onChange={handleUpdateArtist}
                                    /><br/>
                                </div>
                                <div className="col-left">
                                    <label htmlFor="edit-song-modal-youtube-id">Youtube Id:</label>
                                </div> 
                                <div className="col-right">
                                <input 
                                    id="edit-song-modal-youTubeId-textfield" 
                                    className='modal-textfield' 
                                    type="text" 
                                    defaultValue={newYouTubeId}
                                    onChange={handleUpdateYouTubeId}
                                    /><br/>
                                </div>
                            </form>
                </div>
                <div className="modal-south">
                    <input 
                        type="button" 
                        id="edit-song-confirm-button" 
                        className="modal-button" 
                        value='Confirm' 
                        onClick={handleConfirmEditSong} />
                    <input 
                        type="button" 
                        id="edit-song-cancel-button" 
                        className="modal-button" 
                        value='Cancel' 
                        onClick={handleCancelEditSong} />
                </div>
            </div>
        </div>
            </Box>
        </Modal>
    );
}