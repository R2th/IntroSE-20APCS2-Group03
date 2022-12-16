## Giới thiệu
### Firebase là gì ?
Firebase là một dịch vụ lưu trữ cơ sở dữ liệu thời gian thực hoạt động trên nền tảng đám mây được cung cấp bởi Google 
nhằm giúp các lập trình phát triển nhanh các ứng dụng bằng cách đơn giản hóa các thao tác với cơ sở dữ liệu.
## Đăng ký 
- Bây giờ chúng ta cần đăng ký một tài khoản ở  https://console.firebase.google.com/
- Tạo một project
![](https://images.viblo.asia/ee6e52e5-f1a2-4755-959c-63c38c92d4f6.png)
- Authentication chọn SIGN-IN METHOD rồi Enabled Email/password
![](https://images.viblo.asia/e2798211-6b81-4ef5-960f-7d5925a4ca27.png)
- Project Overview -> Project setting click Add Firebase to your web app  rồi copy file config
![](https://images.viblo.asia/a7dc3c0a-2d93-465e-9e12-475393572af2.png)
## Build app
### Cài đăt react native mình đã hướng dẫn ở https://viblo.asia/p/react-native-LzD5d6kdZjY
### Run app

```
create-react-native-app MyProject

cd MyProject
npm start
```
Cài thêm thư viện firebase-tools tham khảo https://firebase.google.com/docs/cli/?hl=es-419
```
npm install -g firebase-tools
firebase login
firebase init
```
Mình làm cái demo login with firebase nhé, sau khi cài đặt và chạy thành công thì tạo một số component chính như Login, Register, Welcome, ...

Cài thêm thư viện react-navigation
```
npm install --save react-navigation
```
Để kết nối đến firebase thì vào đọc tài liệu ở https://firebase.google.com/docs/auth/web/password-auth?authuser=0 nó viết cho mình sẵn method
```
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
```
+ Login.js
```
# components/Login.js
import React from 'react';
import {AppRegistry, StyleSheet, Text, View, TouchableOpacity, Button, TextInput, Alert} from 'react-native';
import {StackNavigator,} from 'react-navigation';
import {firebaseApp} from './FirebaseConfig';
import {EMAIL, PASSWORD} from './Regexs';
import styles from './Styles';

class Login extends React.Component {
  static navigationOptions = {header: null}

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      emailValid: true,
      passwordValid: true
    }
  }

  validate(type, value){
    if(type == "email"){
      this.setState({email: value})
      if(value == '' || EMAIL.test(value)){
        this.setState({emailValid: true})
      } else {
        this.setState({emailValid: false})
      }
    } else if(type == "password"){
      this.setState({password: value})
      if(value == '' || PASSWORD.test(value)){
        this.setState({passwordValid: true})
      } else {
        this.setState({passwordValid: false})
      }
    }
  }

  _login(){
    if(this.state.emailValid && this.state.passwordValid && this.state.email != '' && this.state.password != ''){
      firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(()=>{
          const {navigate} = this.props.navigation;
          navigate('welcome');
        })
        .catch(function(error){
          Alert.alert(
            'Login fail',
            'email or password invalid',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false}
          )
        });
    } else {
      if(this.state.email == '' && this.state.password == ''){
        Alert.alert(
          'Login',
          'Please enter email and password',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false}
        )
      }
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return(
      <View style={styles.container}>
        <TextInput
          style={[styles.inputStyle, !this.state.emailValid? styles.error:null]}
          placeholder='Email'
          onChangeText={(email) => {this.validate("email", email)}}
          value={this.state.email}
         />
         <TextInput
           style={[styles.inputStyle, !this.state.passwordValid? styles.error:null]}
           placeholder='Password'
           onChangeText={(password) => {this.validate("password", password)}}
           value={this.state.password}
          />
        <TouchableOpacity onPress={() => {this._login()}}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('register')}>
          <Text style={styles.btnTextSignUp}>Register</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Login
```
+ Register.js
```
# components/Register.js
import React from 'react';
import {AppRegistry, StyleSheet, Text, View, TouchableOpacity, Button, TextInput, Alert} from 'react-native';
import {StackNavigator,} from 'react-navigation';
import {firebaseApp} from './FirebaseConfig';
import {EMAIL, PASSWORD} from './Regexs';
import styles from './Styles';

class Register extends React.Component {
  static navigationOptions = {header: null}

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      emailValid: true,
      passwordValid: true
    }
  }

  validate(type, value){
    if(type == "email"){
      this.setState({email: value})
      if(value == '' || EMAIL.test(value)){
        this.setState({emailValid: true})
      } else {
        this.setState({emailValid: false})
      }
    } else if(type == "password"){
      this.setState({password: value})
      if(value == '' || PASSWORD.test(value)){
        this.setState({passwordValid: true})
      } else {
        this.setState({passwordValid: false})
      }
    }
  }

  goLogin(){
    const {navigate} = this.props.navigation;
    navigate('login');
  }

  _register(){
    if(this.state.emailValid && this.state.passwordValid && this.state.email != '' && this.state.password != ''){
      firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(()=>{
          Alert.alert(
            'Register success',
            'Click OK to get to the login page',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => this.goLogin()},
            ],
            { cancelable: false }
          )
          this.setState({
            email: '',
            password: ''
          })
        })
        .catch(function(error){
          Alert.alert(
            'Register fail',
            '...',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false}
          )
        });
    } else {
      if(this.state.email == '' && this.state.password == ''){
        Alert.alert(
          'Register account',
          'Please enter email and password',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false}
        )
      }
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return(
      <View style={styles.container}>
        <TextInput
          style={[styles.inputStyle, !this.state.emailValid? styles.error:null]}
          placeholder='Email'
          onChangeText={(email) => {this.validate("email", email)}}
          value={this.state.email}
         />
         <TextInput
           style={[styles.inputStyle, !this.state.passwordValid? styles.error:null]}
           placeholder='Password'
           onChangeText={(password) => {this.validate("password", password)}}
           value={this.state.password}
          />
        <TouchableOpacity onPress={() => {this._register()}}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('login')}>
          <Text style={styles.btnTextSignUp}>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Register
```
+ Welcome.js
```
# components/Welcome.js
import React from 'react';
import {Text, View} from 'react-native';
import {StackNavigator,} from 'react-navigation';

class Welcome extends React.Component {
  static navigationOptions = {header: null}

  render() {
    const {navigate} = this.props.navigation;
    return(
      <View style={{backgroundColor:'yellow', flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color:'red', marginTop: 50}}>Welcome !!!</Text>
      </View>
    )
  }
}

export default Welcome
```
+ Styles.js
```
# components/Styles.js
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#26AE90',
    flex: 1,
    justifyContent: 'center',
    paddingRight: 20,
    paddingLeft: 20
  },
  inputStyle: {
    backgroundColor: '#fff',
    marginBottom: 15,
    fontSize: 18,
    paddingLeft: 15,
    height: 40
  },
  btnText: {
    backgroundColor: '#fff',
    paddingBottom: 10,
    paddingTop: 10,
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center'
  },
  btnTextSignUp: {
    fontSize: 16,
    color: '#fff',
    marginTop: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  error: {
    borderWidth: 2,
    borderColor: 'red'
  }
});
```
+ Regexs.js
```
# components/Regexs.js
export const PASSWORD = /^[a-zA-Z0-9]+$/;
export const EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
```
+ FirebaseConfig.js
 Project Overview -> Project setting click Add Firebase to your web app rồi copy file config 
```
# components/FirebaseConfig.js
import * as firebase from 'firebase';

var config = {
  apiKey: "XXXXXXXXXXXXXXXXXXX",
  authDomain: "XXXXXXXXXXXXXXXXXXX",
  databaseURL: "XXXXXXXXXXXXXXXXXXX",
  projectId: "XXXXXXXXXXXXXXXXXXX",
  storageBucket: "XXXXXXXXXXXXXXXXXXX",
  messagingSenderId: "XXXXXXXXXXXXXXXXXXX"
};

export const firebaseApp = firebase.initializeApp(config);
```
## Kết quả
###  Page login, Register
![](https://images.viblo.asia/d3eca873-a0c0-42cc-9b88-6c6a006e48fa.png) ![](https://images.viblo.asia/a4c1ed7c-add3-4268-9913-386d96a60271.png) 
###  Register account and Login
![](https://images.viblo.asia/55a6ef7d-b7bc-4016-b950-6149700c0fc8.png) ![](https://images.viblo.asia/df97d90e-f5fe-4492-adef-32a7e5424fef.png)![](https://images.viblo.asia/c76619ef-cab9-4e07-8384-79c0311ef08d.png) ![](https://images.viblo.asia/75d16e2d-ae7e-43b6-a51d-fc06f640a521.png)
### + Xem các tài khoản đã đăng ký https://console.firebase.google.com/project/..... 
 ![](https://images.viblo.asia/8a45471c-fe07-4f95-a647-8bb40d4951b3.png)
 Thật đơn giản, vậy là chúng ta đã làm xong phần login, :D
## Tài liệu tham khảo
React Native Firebase https://rnfirebase.io/docs/v4.1.x/getting-started
https://firebase.google.com/docs/web/setup?authuser=0