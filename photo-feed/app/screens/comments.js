import React from 'react';
import { FlatList, StyleSheet, Text, View, Image} from 'react-native';
import { f, auth, database, storage} from '../../config/config';

class upload extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loggedin: false
        }
    }
    componentDidMount = () =>{
        var that = this;
        var user = f.auth().currentUser;

        
            if(user){
                that.setState({
                    loggedin: true
                });
            }else{
                that.setState({
                    loggedin: false
                });
            }

    }
    render()
    {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    { this.state.loggedin == true ? (
                   
                   <Text>Comments</Text>
                   
               ) : ( 
                       <View>
                           <Text>You are not logged in</Text>
                           <Text>Please log in to post a comment</Text>
                       </View>
                   )}
            </View>
        )
    }
}


export default upload;