import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default class Help extends Component {
    FunctionToGoBack = () => {
        this.props.navigation.navigate('Home');
    }
    render() {
        return (
            <ScrollView>
            <View style = {styles.containerStyle}>
                <View style = {{ flex:1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Image
                        style = {{ width: 390, height: 140, borderWidth: 2, borderColor: '#17202A', borderRadius: 10}}
                        source = {{ uri: 'https://firebasestorage.googleapis.com/v0/b/wordmatch-b0b75.appspot.com/o/Word.png?alt=media&token=4bddb22f-70a2-4827-8781-3b94a5436a3a'}}
                    />
                </View>

                <View style = {{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingTop: 10}}>
                    <TouchableOpacity onPress = { this.FunctionToGoBack}>
                        <Image 
                            style = {{width: 40, height: 40}}
                            source = {{ uri: 'https://firebasestorage.googleapis.com/v0/b/wordmatch-b0b75.appspot.com/o/back_arrow.png?alt=media&token=06f9f660-fc7f-4c0f-b9d5-d51f0cfbcde3'}}
                        />
                    </TouchableOpacity>
                </View>

                <View  style = {{ flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding:20}}>
                    <Text style = {{ fontSize: 30, fontStyle: 'italic', fontWeight: 'bold', borderBottomWidth: 3, borderColor: '#17202A', paddingTop: 10}}>
                        Terms of Use
                    </Text>
                </View>
                <View  style = {{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', padding:30}}>
                    <Text style = {{ fontSize:20, fontStyle: 'italic', fontWeight: 'normal', paddingTop: 20}}>
                        Click on <Text style = {{fontWeight:'bold'}}>"Play" </Text> button to start the game.
                    </Text>
                    <Text style = {{ fontSize:20, fontStyle: 'italic', fontWeight: 'normal', paddingTop: 20}}>
                        If do have already email account then go with <Text style = {{fontWeight:'bold'}}> "Already have an account" </Text>option for login. Select a <Text style = {{fontWeight:'bold'}}> "New Game" </Text> 
                         or <Text style = {{fontWeight:'bold'}}>"Resume Game"</Text> to play a game.
                        
                    </Text>
                    <Text style = {{ fontSize:20, fontStyle: 'italic', fontWeight: 'normal', paddingTop: 20}}>
                        If do not have email account then please <Text style = {{fontWeight: 'bold'}}>Sign Up</Text> to play a game.
                    </Text>
                    <Text style = {{ fontSize:20, fontStyle: 'italic', fontWeight: 'normal', paddingTop: 20}}>
                        Here, <Text style = {{fontWeight:'bold'}}> Menu </Text> options after Login or Sign Up.
                    </Text>
                    <Text style = {{ fontSize:20, fontStyle: 'italic', fontWeight: 'normal', paddingTop: 20}}>
                        <Text style = {{fontWeight:'bold'}}>New Game: </Text> 
                    </Text>
                    <Text style = {{ fontSize:20, fontStyle: 'italic', fontWeight: 'normal', paddingTop: 20}}>
                        <Text style = {{fontWeight:'bold'}}>Resume Game: </Text> 
                    </Text>
                    <Text style = {{ fontSize:20, fontStyle: 'italic', fontWeight: 'normal', paddingTop: 20}}>
                        <Text style = {{fontWeight:'bold'}}>Score: </Text> 
                    </Text>
                    <Text style = {{ fontSize:20, fontStyle: 'italic', fontWeight: 'normal', paddingTop: 20}}>
                        For <Text style = {{fontWeight:'bold'}}>Setting </Text> option, can give <Text style = {{fontWeight:'bold'}}> Rate the Application </Text> using stars.
                    </Text>
                    
                </View>
                <View style = {{justifyContent:'center', alignItems:'center', marginBottom:10}}>
                    <Text style = {{fontSize:15, fontWeight:'bold'}}>
                         @KiwiCube Limited
                    </Text>
                </View>
            </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create ({
    containerStyle: {
        backgroundColor: '#01646D'
    }
})