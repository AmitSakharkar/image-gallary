import './App.css';
import React, { useEffect, useState } from 'react';
import Users from './components/users';
import Photos from './components/photos';
import APIS from './api';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

function App() {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [level, setlevel] = useState(1);
  const [updatedPhotots, setUpdatedPhotos] = useState([]);

  useEffect(() => {
    getDataFromApi('users');
    getDataFromApi('albums')
  },[]);
  
  const getDataFromApi = (fetchFrom) => {
    setIsLoading(true);
    fetch(APIS[fetchFrom])
    .then((response) => {
      response.json().then(body => {
        if(fetchFrom === 'users'){
          setUsers(body);
          setIsLoading(false);
        } else if(fetchFrom === 'albums') {
          setAlbums(body);
          setIsLoading(false);
        } else if(fetchFrom === 'photos'){
          setPhotos(body);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
    })
    .catch(error => {
      setIsLoading(false);
    });
  };

  const handleClick = (level) => {
    setlevel(level);
  }

  const handlePhotosFetch = async (id) => {
    setIsLoading(true);
    getDataFromApi('photos');
    if(photos.length > 0) {
      let updatedData = photos.filter((data) => data.albumId === id);
      const newArrayOfObj = updatedData.map(({
        url: original,
        thumbnailUrl: thumbnail,
        ...rest
      }) => ({
        original,
        thumbnail,
        ...rest
      }));
      setUpdatedPhotos(newArrayOfObj);        
      setIsLoading(false);
      setlevel(2);
    } else {
      setIsLoading(false);
    }
  }
  return (
    <div className="App">
      <div className='navigation-breadcrumb'>
        <Typography color="inherit" onClick={(e) => {e.preventDefault(); handleClick(1)}}>
          Users
        </Typography>
        {level === 1 ? '' : <NavigateNextIcon fontSize="small" /> }   
        {level === 1 ? '' : <Typography color="inherit" onClick={(e) => {e.preventDefault(); handleClick(2)}}>
          Photo
        </Typography>}
      </div>
      {level === 1 ? <Users users={users} albums={albums} handlePhotosFetch={handlePhotosFetch} /> : <Photos photos={updatedPhotots} />}
    </div>
  );
}

export default App;
