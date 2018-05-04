import React, { Component } from 'react';
import Button from 'material-ui/Button';
import PreviewPicture from './PreviewPicture';

class FileField extends Component {
 constructor(props) {
   super(props);
   this.state = {
     pictureUrl: this.props.photoUrl
   };
 }

 displayPicture = event => {
   const reader = new FileReader();
   const file = event.target.files[0];
   reader.onloadend = () => {
     this.setState({
       pictureUrl: reader.result
     });
   };
   reader.readAsDataURL(file);
 };

 handleChangePicture = (event) => {
    this.displayPicture(event);
 }

 render() {
  const {input} = this.props;
  delete input.value;
  return (
    <div>
      <div className="">
        <input
          {...input}
          id="file"
          type="file"
          accept="image/*"
          onChange={this.handleChangePicture}
          style={{
            width: 0,
            height: 0,
            opacity: 0,
            overflow: 'hidden',
            position: 'absolute',
            zIndex: 1
          }}
        />
        <Button variant="raised" color="primary" component="label" htmlFor="file">
          Choose an image
        </Button>
      </div>
      <PreviewPicture pictureUrl={this.state.pictureUrl} />
    </div>
  );
  }
}


export default FileField
