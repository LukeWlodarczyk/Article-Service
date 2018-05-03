import React, { Component } from 'react';

class PreviewPicture extends Component {
  render() {
    const { pictureUrl, picture } = this.props;

    if (!pictureUrl) {
      return (
        <div
          style={{
            height: "300px",
            borderStyle: "solid",
            borderColor: "grey",
            width: "300px"
          }}
          className="text-center mt-3 ml-3 mb-3"
        >
          {picture}
        </div>
      );
    } else {
      return (
        <img
          className="img-fluid"
          style={{ height: "300px"}}
          src={pictureUrl}
          alt={picture}
        />
      );
    }
  }
}

export default PreviewPicture
