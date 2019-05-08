import React from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { f, auth, database, storage } from '../../config/config';

class profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false
        }
    }

    componentDidMount = () =>{
        var that = this;
        f.auth().onAuthStateChanged(function(user){
            if(user){
                that.setState({
                    loggedin: true
                })
            }else{
                that.setState({
                    loggedin: false
                });
            }
        });
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {this.state.loggedin == true ? (
                    <Text>Profile</Text>
                ) : ( 
                        <View>
                            <Text>You are not logged in</Text>
                            <Text>Please log in to view your profile</Text>
                        </View>
                    )}

            </View>
        )
    }
}


export default profile;