import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

export default class Setting extends Component <{}>
{
    constructor() {
        super();

        this.state = {
            Default_Rating: 1,
            Max_Rating: 5,
        }

        // Use these pictures, or change here to place the Star picture files on Firebase
        this.Star = 'https://reactnativecode.com/wp-content/uploads/2018/01/full_star.png';
        this.Star_With_Border = 'https://reactnativecode.com/wp-content/uploads/2018/01/border_star.png';
    }


    UpdateRating(key) {
        this.setState({ Default_Rating: key });
    }

    FunctionToGoBack = () => {
        this.props.navigation.navigate('Home');
    }
    render() {
        let React_Native_Rating_Bar = [];

        for (var i = 1; i <= this.state.Max_Rating; i++) {
            React_Native_Rating_Bar.push(
                <TouchableOpacity activeOpacity={0.7} key={i} onPress={this.UpdateRating.bind(this, i)}>
                    <Image
                        style={styles.StarImage}
                        source={(i <= this.state.Default_Rating) ? { uri: this.Star } : { uri: this.Star_With_Border }} />
                </TouchableOpacity>
            );
        }

        return (
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
                        Options
                    </Text>
                </View>
                <View  style = {{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', padding:30}}>
                    
                    <Text style = {{ fontSize: 25, fontStyle: 'italic', fontWeight: 'normal', paddingTop: 25}}>
                        Rate App
                    </Text>
                    <View style={styles.MainContainer}>
                        <View style={styles.childView}>{React_Native_Rating_Bar}</View>
                            
                    </View>

                </View>
                <View style = {{justifyContent:'center', alignItems:'center', marginBottom:10}}>
                    <Text style = {{fontSize:15, fontWeight:'bold'}}>
                         @KiwiCube Limited
                    </Text>
                </View>
                
            </View>
        );
    }
}


const styles = StyleSheet.create ({
    containerStyle: {
        backgroundColor: '#01646D'
    },
    MainContainer:
    {
        flex: 1,
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },

    childView:
    {
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 20
    },

    StarImage:
    {
        width: 40,
        height: 40,
        resizeMode: 'cover'
    },

    textStyle:
    {
        textAlign: 'center',
        fontSize: 23,
        color: '#000',
        marginTop: 15
    }
});