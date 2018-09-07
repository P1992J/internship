import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';


export default class Home extends Component {
    FunctionToOpenSignUp = () => {
        this.props.navigation.navigate('SignUp');
    }

    FunctionToOpenSetting = () => {
        this.props.navigation.navigate('Setting');
    }
   
    FunctionToOpenHelp = () => {
        this.props.navigation.navigate('Help');
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

                <View style = {{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingBottom: 100}}>
                    <TouchableOpacity  onPress = { this.FunctionToOpenSignUp}>
                        <Image 
                            style = {{width: 150, height: 150}}
                            source = {{ uri: 'https://firebasestorage.googleapis.com/v0/b/wordmatch-b0b75.appspot.com/o/play.png?alt=media&token=5bf625a3-01cb-462c-b03e-5c93e74ac560'}}
                            
                        />
                    </TouchableOpacity>
                </View>

                <View  style = {{ flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', padding:20}}>
                    <View style = {{ paddingRight: 80, paddingBottom: 30}}>
                        <TouchableOpacity  onPress = { this.FunctionToOpenSetting}>
                            <Image 
                                style = {{width: 100, height: 100}}
                                source = {{ uri: 'https://firebasestorage.googleapis.com/v0/b/wordmatch-b0b75.appspot.com/o/Setting%20(1).png?alt=media&token=0f01e861-6aa6-4872-a69c-6c784e7a072d'}}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style = {{ paddingLeft: 80, paddingBottom: 30}}>
                        <TouchableOpacity  onPress = { this.FunctionToOpenHelp}>
                            <Image
                                style = {{ width: 100, height: 100}}
                                source = {{ uri: 'https://firebasestorage.googleapis.com/v0/b/wordmatch-b0b75.appspot.com/o/help1.png?alt=media&token=492fcace-2fa1-4be2-98ce-dd75eac3e3ba'}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
    onPressLogin = () => {
        this.props.navigator.push({
            id:'Login'
        })
    }
}


const styles = StyleSheet.create ({
    containerStyle: {
        
    }
})