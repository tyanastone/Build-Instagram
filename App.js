import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native';
import { f, auth, database, storage } from './config/config';
// import console = require('console');

//hides timer alert message
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default class App extends React.Component {
  
  constructor(props)
  {
    super(props);
    this.state = {
      loggedin: false
    };
    this.registerUser('testemailaddress@gmail.com', 'fakepassword');
    var that = this;
   

    f.auth().onAuthStateChanged(function(user) {
        if(user){
          that.setState({
            loggedin: true
          });
          console.log('Logged In', user);
        }else{
          that.setState({
            loggedin: false
          });
          console.log('Logged out');
        }
    }); 
  }


  loginUser = async(email, pass) => {
    if(email != '' && pass != ''){
      try{
        let user = await auth.signInWithEmailAndPassword(email, pass);
        console.log(user);
      } catch(error){
        console.log(error);
      }
    }else{
      alert('Missing email or password');
    }
  }
async loginWithFacebook(){
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    '293465231577736',
    { permissions: ['email','public_profile']}
  );
  if(type === 'success'){
    const credentials = f.auth.FacebookAuthProvider.credential(token);
    f.auth().signInWithCredential(credentials).catch((error) => {
      console.log('Error...', error);
    })
  }
}
  registerUser = (email, password) => {
 
    console.log(email, password);
    auth.createUserWithEmailAndPassword(email, password)
    .then((userObj) => console.log(email,password, userObj))
    .catch((error) => console.log('error logging in', error));
 
} 
signUserOut = () => {
  auth.signOut()
  .then(() => {
    console.log('Logged out...');
  }).catch((error) => {
    console.log('Error:', error);
  });
}
 

  render() {
    return (
      <View style={styles.container}>
      <Text>Hey</Text>
        <Text>------</Text>
        { this.state.loggedin == true ? (
          <View>
            <TouchableHighlight
              onPress={ () => this.signUserOut() }
              style={{backgroundColor: 'red'}}>
            <Text>Log Out..</Text>
            </TouchableHighlight>
            <Text>Logged in..</Text>
          </View>
        ) : (
       <View>

{ this.state.emailloginView == true ? (
  <View>
    <Text>Email:</Text>
    <TextInput
    onChangeText={(text) => this.setState({email: text})}
    value={this.state.email}
    />

<Text>Password:</Text>
    <TextInput
    onChangeText={(text) => this.setState({pass: text})}
    secureTextEntry={true}
    value={this.state.pass}
    />
     <TouchableHighlight
              onPress={ () => this.loginUser(this.state.email, this.state.pass) }
              style={{backgroundColor: 'red'}}>
            <Text>Login</Text>
            </TouchableHighlight>
  </View>
) : (
  <View></View>
)}
        <TouchableHighlight 
        onPress={() => this.setState({emailloginView: true})}
        style={{backgroundColor: 'green'}}>
          <Text style={{color:'white'}}>Login With Email</Text>
        </TouchableHighlight>

        <TouchableHighlight 
        onPress={() => this.loginWithFacebook()}
        style={{backgroundColor: 'green'}}>
          <Text style={{color:'white'}}>Login With Facebook</Text>
        </TouchableHighlight>

        </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//adding database 

// database.ref('/refName/childRef').set("value!");

//update database

// var updates = {};
// updates['/refName/childRef'] = 'Database';
// updates['/anotherRefName'] = 'another value';
// updates['/numbers'] = 5;
// database.ref().update(updates);

//delete database
//database.ref('/numbers').remove();

//Fetch Data

database.ref('refName').child('childRef').once('value').then(function(snapshot) {
  const exists = (snapshot.val() !== null);
    //if the user exist in the DB, replace the user variable with the reurned snapshot
  if(exists) data = snapshot.val();
  console.log('Single Value: ', data);
}).catch(error => console.log(error));

//Fetch Data
database.ref('refName').child('childRef').on('value', function(snapshot) {
  const exists = (snapshot.val() !== null);
  //if the user exist in the DB, replace the user variable with the reurned snapshot
  if (exists) data = snapshot.val();
  console.log('On Value: ', data);
});

//Fetch Data
database.ref('refName').on('child_added', function(snapshot) {
  const exists = (snapshot.val() !== null);
    //if the user exist in the DB, replace the user variable with the reurned snapshot
    if(exists) data = snapshot.val();
    console.log('On child Added: ', data);
});

//Fetch Data
database.ref('refName').on('child_removed', function(snapshot) {
  const exists = (snapshot.val() !== null);
    //if the user exist in the DB, replace the user variable with the reurned snapshot
    if(exists) data = snapshot.val();
    console.log('On Value Added: ', data);
});