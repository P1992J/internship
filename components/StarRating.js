import React, { Component } from 'react';

import { StyleSheet, View, Platform, Text, Image, TouchableOpacity } from 'react-native';

export default class StarRating extends Component<{}>
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
            <View style={styles.MainContainer}>
                <View style={styles.childView}>{React_Native_Rating_Bar}</View>

                <Text style={styles.textStyle}>
                    {this.state.Default_Rating} / {this.state.Max_Rating}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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