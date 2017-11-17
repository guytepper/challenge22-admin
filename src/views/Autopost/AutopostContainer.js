import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Autopost from './Autopost';
import assets from './assets.json';

/**
 * Creates a new albums and returns it's id.
 * @param {string} name - The album name.
 * @param {string} groupId - The group to create the album in.
 * @returns {Promise} A promise to be fulfilled with the album id.
 */
function uploadAlbum(name, groupId) {
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

/**
 * Uploads a photo to a group album.
 * @param {string} description - The photo description.
 * @param {string} albumId - The album id to upload the photo to.
 */
function uploadPhoto(description, groupId, albumId) {
  window.FB.api(
    `/${groupId}/${albumId}/photos`,
    'POST',
    {
      source: '{image-data}'
    },
    function(response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
  );
}

@observer
@inject('RootStore')
class AutopostContainer extends Component {
  state = {};

  /**
   * Upload all albums to a facebook group.
   * @param {string} groupId - The group Id to upload the album to.
   */
  async uploadAlbums(groupId = '351760581933597') {
    const albums = assets.albums;
    const promises = albums.map(album => {
      return uploadAlbum(album.name, '351760581933597').then(id => {
        album.id = id;
        return album;
      });
    });
    const uploadedAlbums = await Promise.all(promises);
    uploadedAlbums.m;
  }

  render() {
    const { groups } = this.props.RootStore.userStore.user;
    return <Autopost groups={groups.data} uploadAlbums={this.uploadAlbums} />;
  }
}

export default AutopostContainer;
