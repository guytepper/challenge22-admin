import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Autopost from './Autopost';
import assets from './assets.json';

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

/**
 * Uploads a photo to a group album.
 * @param {string} albumId - The album id to upload the photo to.
 * @param {string} description - The photo description.
 */
function uploadPhoto(albumId, description) {
  window.FB.api(
    `/${albumId}/photos`,
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
  async uploadAlbums(groupId) {
    const albums = assets.albums;
    const promises = albums.map(album => {
      return uploadAlbum('351760581933597', album.name).then(id => {
        album.id = id;
        return album;
      });
    });
    const uploadedAlbums = await Promise.all(promises);
    uploadedAlbums;
  }

  render() {
    const { groups } = this.props.RootStore.userStore.user;
    return <Autopost groups={groups.data} uploadAlbums={this.uploadAlbums} />;
  }
}

export default AutopostContainer;
