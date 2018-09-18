import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, Image, TouchableOpacity } from "react-native";

import firebase from 'react-native-firebase';

var screenwidth = Dimensions.get('window').width;

export default class Score extends Component {
    constructor(props) {
        super(props);

        this.ref = firebase.firestore().collection('wordmatch');
        this.unsubscribe = null;

        this.state = {
            isLoading: false,
            nowscore: 0,
            email: '',
            scores: [],
            currentUser: null,
            highScore: 0,
            lowScore: 0,
        };

    }

    componentDidMount() {
        // Connect to firebase
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)

        const { currentUser } = firebase.auth();
        this.setState({ currentUser });
        // find user existing score        
        this._findHighLowScore();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {
        const scores = [];
        querySnapshot.forEach((doc) => {
            const { email, score } = doc.data();
            scores.push({
                key: doc.id, // Document ID
                doc, // DocumentSnapshot
                email,
                score,
            });
        });
        this.setState({
            scores,
        });
    }

    FunctionToGoBack = () => {
        this.props.navigation.navigate('Menu');
      }
    

    _findHighLowScore = () => {
        var xhighScore = 0;
        var xlowScore = 10;
        this.ref.get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                const { email, score } = doc.data();
                if (score > xhighScore) {
                    xhighScore = score;
                }

                if (score < xlowScore) {
                    xlowScore = score
                }
            });

            this.setState({
                highScore: xhighScore,
                lowScore: xlowScore,
                isLoading: false,
            });
        });
    }

    render() {

        if (this.state.isLoading) {
            return <ActivityIndicator size="large" />;
        }

        return (
            <View style={styles.containerStyle}>
                <View style = {{ flex:1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Image
                        style = {{ width: 390, height: 140, borderWidth: 2, borderColor: '#17202A', borderRadius: 10}}
                        source = {{ uri: 'https://firebasestorage.googleapis.com/v0/b/wordmatch-b0b75.appspot.com/o/Word.png?alt=media&token=4bddb22f-70a2-4827-8781-3b94a5436a3a'}}
                    />
                </View>
                <View style = {{ flex:1,flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                    <TouchableOpacity onPress = { this.FunctionToGoBack}>
                        <Image 
                            style = {{width: 40, height: 40}}
                            source = {{ uri: 'https://firebasestorage.googleapis.com/v0/b/wordmatch-b0b75.appspot.com/o/back_arrow.png?alt=media&token=06f9f660-fc7f-4c0f-b9d5-d51f0cfbcde3'}}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom:30 }}>
                    <View style={{ paddingRight: 10, borderBottomWidth:2 }}>
                        <Text style={{ fontSize: 35, color: '#0000cc' }}>Score:</Text>
                    </View>
                </View>
                <View style={{ flex:1,flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom:70 }}>
                
                    <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <Text style={{ fontSize: 27, color: '#ff0000' }}>Highest: {this.state.highScore}</Text>
                    </View >
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={{ fontSize: 27, color: '#00cc00' }}>Lowest: {this.state.lowScore} </Text>
                    </View >
                </View>

            </View >
        );
    }
}


const styles = StyleSheet.create({
    
    buttonStyle: {
        padding: 10,
        backgroundColor: '#00BCD4',
        borderRadius: 3,
    },
    buttontextStyle: {
        color: '#fff',
        width: 30,
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    itemStyle: {
        padding: 7,
        fontSize: 24,
        height: 100,
    },
    inputFieldStyle: {
        width: screenwidth * .7,
        fontSize: 20,
        margin: 2,
        height: 44,
        borderColor: '#7a42f4',
        borderWidth: 2,
    },
    wrapper: {
        width: screenwidth * 0.7,
    },
});