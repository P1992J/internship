import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

import firebase from 'react-native-firebase'

export default class Menu extends Component {
    _userSignout = () => {
        this.setState({ currentUser: null });
        firebase.auth().signOut();
        this.props.navigation.navigate('Login');
      }
    render() {
        return (
            <View style = {styles.containerStyle}>
                <View style = {{ flex:1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Image
                        style = {{ width: 390, height: 140, borderWidth: 2, borderColor: '#17202A', borderRadius: 10}}
                        source = {{ uri: 'https://firebasestorage.googleapis.com/v0/b/wordmatch-b0b75.appspot.com/o/Word.png?alt=media&token=4bddb22f-70a2-4827-8781-3b94a5436a3a'}}
                    />
                </View>

                
                <View style = {{ flexDirection: 'column', justifyContent:'center', alignItems:'center', paddingBottom:50}}>
                    <View style = {{ paddingBottom:30 }}>
                        <TouchableOpacity style = {styles.submitButtonStyle}
                           onPress={() => this.props.navigation.navigate('Wordwork8')}>
                            <Text style = {{ color:'#800080',fontSize: 22, fontStyle: 'italic', fontWeight:'bold'}}> New Game </Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {{  paddingTop: 5, paddingBottom:30 }}>
                    <TouchableOpacity style = {styles.submitButtonStyle}
                           onPress={() => this.props.navigation.navigate('Wordwork9')}>
                            <Text style = {{color:'#800080', fontSize: 22, fontStyle: 'italic', fontWeight:'bold'}}> Resume Game </Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {{ paddingTop:5, paddingBottom:30}}>
                    <TouchableOpacity style = {styles.submitButtonStyle}
                           onPress={() => this.props.navigation.navigate('Score')}>
                            <Text style = {{ color:'#800080',fontSize: 22, fontStyle: 'italic', fontWeight:'bold' }}> Score </Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {{ paddingTop:5, paddingBottom: 40 }}>
                        <TouchableOpacity style={styles.submitButtonStyle}
                            onPress={() => this._userSignout()}>
                            <Text style={{color:'#800080',fontSize: 22, fontStyle: 'italic', fontWeight:'bold'}}> Signout </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create ({
    containerStyle: {
        backgroundColor: '#01646D'
    },
    submitButtonStyle: {
        width: 200,
        height: 50, 
        borderWidth: 2,
        alignItems:'center',
        paddingTop:10,
        borderTopLeftRadius:40,
        borderBottomLeftRadius:40,
        backgroundColor:'#6495ED'
    }
})