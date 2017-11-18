import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import Autopost from './Autopost';
import assets from './assets.json';

function getDataUri(path) {
  return new Promise((resolve, reject) => {
    var image = new Image();
    image.onload = function() {
      var canvas = document.createElement('canvas');
      canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
      canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size
      canvas.getContext('2d').drawImage(this, 0, 0);
      canvas.toBlob(blob => resolve(blob));
    };
    image.src = path;
  });
}

/**
 * Uploads a photo to a group album.
 * We need to post directly to the API since Facebook SDK doesn't make the request in the right format.
 * @param {string} albumId - The album id to upload the photo to.
 * @param {object} blob - The photo to upload as a blob file.
 * @param {string} description - The photo description.
 * @param {string} token - Facebook access token to use for the API request.
 */
function uploadPhoto(albumId, blob, description, token) {
  console.log(arguments);
  var formData = new FormData();
  formData.append('access_token', token);
  formData.append('source', blob);
  formData.append('message', description);
  console.log('ahoy!');
  axios
    .post(`https://graph.facebook.com/${albumId}/photos`, formData)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));
}

/**
 * Creates a new albums and returns it's id.
 * @param {string} groupId - The group to create the album in.
 * @param {string} name - The album name.
 * @returns {Promise} A promise to be fulfilled with the album id.
 */
function uploadAlbum(groupId, name) {
  return new Promise((resolve, reject) => {
    window.FB.api(
      `/351760581933597/albums`,
      'POST',
      {
        name,
        message: 'Album description! It works!'
      },
      response => {
        if (response && !response.error && response.id) {
          console.log('Album Uploaded: ', response);
          resolve(response.id);
        }
        reject(response.error);
      }
    );
  });
}

@observer
@inject('RootStore')
class AutopostContainer extends Component {
  state = {};

  /**
   * Upload all albums to a facebook group.
   * @param {string} groupId - The group Id to upload the album to.
   */
  uploadAlbums = async groupId => {
    const albums = assets.albums;
    const token = this.props.RootStore.userStore.token;

    const promises = albums.map(album => {
      return uploadAlbum('351760581933597', album.name).then(id => {
        album.id = id;
        return album;
      });
    });

    const uploadedAlbums = await Promise.all(promises);

    uploadedAlbums.forEach(album => {
      console.log(album);
      album.files.forEach(file => {
        console.log(file);
        getDataUri(require('../../assets/GroupsAssets/albums/Getting_Ready/01.png')).then(data => {
          uploadPhoto(album.id, data, file.description, token);
        });
      });
    });
  };

  render() {
    const { groups } = this.props.RootStore.userStore.user;
    return <Autopost groups={groups.data} uploadAlbums={this.uploadAlbums} />;
  }
}

export default AutopostContainer;
