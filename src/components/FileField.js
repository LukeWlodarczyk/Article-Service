import React, { Component } from 'react';
import PreviewPicture from './PreviewPicture';

class FileField extends Component {
 constructor(props) {
   super(props);
   this.state = {
     picture: "Please attach a picture",
     pictureUrl: this.props.photoUrl
   };
 }

 displayPicture = event => {
   let reader = new FileReader();
   let file = event.target.files[0];
   reader.onloadend = () => {
     this.setState({
       picture: file,
       pictureUrl: reader.result
     });
   };
   reader.readAsDataURL(file);
 };

 render() {
   const { input } = this.props;
   delete input.value;
   return (
     <div>
       <div className="form-group">
         <div className='mb-4'>
           <input
             type="file"
             accept="image/*"
             className="form-control"
             {...input}

             onChange={event => {
               this.displayPicture(event);
             }}
           />
         </div>
       </div>
       <PreviewPicture
         pictureUrl={this.state.pictureUrl}
         picture={this.state.picture}
       />
     </div>
   );
 }
}


export default FileField
