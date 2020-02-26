import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getCustomer} from '../ducks/auth_reducer'
import '../Styling/ProfileForm.css'
import axios from 'axios';



class ProfileForm extends Component{
    constructor(){
        super()

        this.state = {
            input: '',
            profileImg: '',
            currentPassword: '',
            newPassword: '',
            passwordToggle: false
        }
    }
    
    
    handleInput = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleImgSubmit = () => {
        const {profileImg} = this.state
        axios.put('/auth/editImg',{profileImg}).then(res => {
           this.props.getCustomer(res.data)
           this.setState({
               profileImg: ''
           })
           this.props.history.push('/')
        })
    }
    checkPassword = () => {
        const {currentPassword, passwordToggle} = this.state
         axios.post('/auth/checkPassword', {currentPassword}).then(res => {
            this.setState({
                input: '',
                currentPassword: '',
                passwordToggle: !passwordToggle
            })
        })
    }
    changePassword = () => {
        const {newPassword} = this.state
        axios.post('/auth/changePassword', {newPassword}).then(res => {
            this.setState({
                input: '',
                newPassword: ''
            })
            this.props.history.push('/settings')
            alert('password successfully changed')
        })
    }
    getSignedRequest = ([file]) => {
         this.setState({isUploading: true})
     
        const fileName = `${file.name.replace(/\s/g, '-')}`

        axios.get(`/sign-s3?file-name=${fileName}&file-type=${file.type}`)

     
        axios.get('/sign-s3', {
          params: {
            'file-name': fileName,
            'file-type': file.type
          }
        }).then( (response) => {
          const { signedRequest, url } = response.data 
          this.setState({
              profileImg: url
          })
          this.uploadFile(file, signedRequest, url)
        }).catch( err => {
         })
     }
     uploadFile = (file, signedRequest, url) => {
        const options = {
          headers: {
            'Content-Type': file.type,
          },
        };
    
        axios
          .put(signedRequest, file, options)
          .then(response => {
            this.setState({ isUploading: false, url });
            // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
          })
          .catch(err => {
            this.setState({
              isUploading: false,
            });
            if (err.response.status === 403) {
              alert(
                `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
                  err.stack
                }`
              );
            } else {
              alert(`ERROR: ${err.status}\n ${err.stack}`);
            }
          });
      };
    render(){
        return(
            <div className='profile_form'>
                <div className='settings_form'>
                    <div className='profile_pic'>
                        <img className='profile_img' src={this.props.customer.authreducer.customer.image_url || 'https://www.ibts.org/wp-content/uploads/2017/08/iStock-476085198.jpg'}/>        
                    </div> 
                    <div className='profile_change_container'>
                      <div id='profile_img_text'> Profile Image </div>
                        {/* <input onChange={(e) => this.handleInput(e)} name='profileImg' value={this.state.profileImg} placeholder='Profile Image Url' className= 'profile_change_inputs'/> */}
                        <input type='file' onChange={(e) => this.getSignedRequest(e.target.files, this.props.customer.authreducer.customer.customer_id)}/>
                        <button onClick={() => this.handleImgSubmit(this.state.profileImg)}>Submit</button>
                         {!this.state.passwordToggle ? (
                        <div className='password_change_container'>
                            <div>ChangePassword</div>
                            <input onChange={(e) => this.handleInput(e)} placeholder='Current Password'className= 'profile_change_inputs' name='currentPassword' value={this.state.currentPassword}/>
                            <button onClick={() => this.checkPassword()}>Check</button>
                        </div>
                         ) : (
                        <div>
                            <input onChange={(e) => this.handleInput(e)} name='newPassword' value={this.state.newPassword}/>
                            <button onClick={() => this.changePassword()}>Submit</button>
                        </div>
                         )}
                    </div>                
                </div>
            </div>
        )
    }
}

function mapStatetoProps(state){
    return({
        customer: state
    })
}

export default withRouter(connect(mapStatetoProps, {getCustomer})(ProfileForm))
 
