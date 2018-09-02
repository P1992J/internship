import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default class Setting extends Component {
    render() {
        return (
            <View style = {styles.containerStyle}>
                <View style = {{ flex:1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Image
                        style = {{ width: 390, height: 140, borderWidth: 2, borderColor: '#17202A', borderRadius: 10}}
                        source = {{ uri: 'https://firebasestorage.googleapis.com/v0/b/wordmatch-b0b75.appspot.com/o/Word.png?alt=media&token=4bddb22f-70a2-4827-8781-3b94a5436a3a'}}
                    />
                </View>

                <View style = {{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingTop: 10}}>
                    <Image 
                        style = {{width: 80, height: 70}}
                        source = {{ uri: 'https://firebasestorage.googleapis.com/v0/b/wordmatch-b0b75.appspot.com/o/back_arrow.png?alt=media&token=06f9f660-fc7f-4c0f-b9d5-d51f0cfbcde3'}}
                    />
                </View>

                <View  style = {{ flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding:20}}>
                    <Text style = {{ fontSize: 40, fontStyle: 'italic', fontWeight: 'bold', borderBottomWidth: 3, borderColor: '#17202A', paddingTop: 10}}>
                        Options
                    </Text>
                </View>
                <View  style = {{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', padding:30}}>
                    <Text style = {{ fontSize: 30, fontStyle: 'italic', fontWeight: 'normal', paddingTop: 20}}>
                        Sound
                    </Text>
                    
                    <Text style = {{ fontSize: 30, fontStyle: 'italic', fontWeight: 'normal', paddingTop: 20}}>
                        Rate App
                    </Text>
                </View>
                
            </View>
        );
    }
}


const styles = StyleSheet.create ({
    containerStyle: {
        backgroundColor: '#01646D'
    }
})