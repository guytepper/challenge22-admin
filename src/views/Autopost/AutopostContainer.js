import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Autopost from './Autopost';
import assets from './assets.json';

@observer
@inject('RootStore')
class AutopostContainer extends Component {
  state = {};

  /**
   * Upload all albums to a facebook group.
   * @param {string} groupId - The group Id to upload the album to.
   */
  uploadAlbums(groupId = '351760581933597') {
    const albums = assets.albums;
    albums.forEach(album => {
      console.log(`/351760581933597/albums`);
      window.FB.api(
        `/351760581933597/albums`,
        'POST',
        {
          name: album.name,
          message: 'Album description! It works!'
        },
        function(response) {
          console.log(response);
          if (response && !response.error) {
            console.log(response);
          }
        }
      );
    });
  }

  render() {
    const { groups } = this.props.RootStore.userStore.user;
    return <Autopost groups={groups.data} uploadAlbums={this.uploadAlbums} />;
  }
}

export default AutopostContainer;
