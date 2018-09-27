import React, { Component } from 'react';
import { StyleSheet, FlatList, Image, Text, View, TouchableOpacity, TextInput, Button, Dimensions, Keyboard, ScrollView, Alert, ActivityIndicator, } from "react-native";

import firebase from 'react-native-firebase';
import Swiper from 'react-native-swiper';

import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

var screenwidth = Dimensions.get('window').width;

var tblCol = 8;
var tblRow = 10;
var tblData = [];

export default class Wordwork5 extends Component {
    state = { currentUser: null };
    constructor(props) {
        super(props);

        this.ref = firebase.firestore().collection('wordmatch');
        this.unsubscribe = null;

        this.state = {
            aletter: 'A',
            isLoading: false,
            dataItems: [],
            hintItems: [],
            relatedItems: [],
            partword: '',
            spellCorrect: false,
            //nowscore: 0,
            uemail: '',
            score: 0,
            //currentUser: null,
            //userExist: false,
            //docid: '',
            tableHead: [],
            tableData: [],
            wCol: 0,
            wRow: 0,
        };

    }

    componentDidMount() {
        // Connect to firebase
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)

        const { currentUser } = firebase.auth();
        this.setState({ currentUser });
        this.setState({ uemail: this.state.currentUser });

        this._initTableCellData();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {
        const wordmatch = [];
        querySnapshot.forEach((doc) => {
            const { email, score } = doc.data();
            wordmatch.push({
                key: doc.id,
                doc,
                email,
                score
            });
        });
        
    }

    FunctionToGoBack = () => {
        this.props.navigation.navigate('Menu');
    }

    _initTableCellData = () => {
        var myHead = Array(tblCol);
        for (var i = 0; i < tblCol; i++)
            myHead[i] = 'H' + i.toString();

        tblData = Array(tblRow);
        for (var j = 0; j < tblRow; j++) {
            tblData[j] = Array(tblCol);
            for (var i = 0; i < tblCol; i++)
                //tblData[j][i] = '' + j.toString() + '' + i.toString();
                tblData[j][i] = '_';
        }

        this.setState({
            tableHead: myHead,
            tableData: tblData,
        });
    }

    _placeLetter2Cell = (xletter) => {
        var myCellRow = this.state.wRow;
        var myCellCol = this.state.wCol;
        tblData[myCellRow][myCellCol] = xletter; //fill cell
        // find next cell
        myCellCol = myCellCol + 1;
        if (myCellCol >= tblCol) {
            //col in row full, change to next row
            myCellCol = 0; //reset to 0 column
            myCellRow = myCellRow + 1; // to next row
            // all row full filled, back to row 0
            if (myCellRow >= tblRow) {
                myCellRow = 0;
                myCellCol = 0;
            }
        }

        this.setState({
            wCol: myCellCol,
            wRow: myCellRow,
            tableData: tblData,
        });
    }


   

    _randomString = () => {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
        var string_length = 1;
        var randomstr = '';
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstr += chars.substring(rnum, rnum + 1);
        }
        return randomstr;
    }

    _aLetterPress = () => {
        var newLetter = this._randomString();
        this.setState({ aletter: newLetter });
    };

    _add1aLetterPress = () => {
        var partwd = this.state.partword + this.state.aletter;
        this.setState({ partword: partwd });
        //Place new letter to cell
        var newLetter = this.state.aletter;
        this._placeLetter2Cell(newLetter);
    };

    _checkSpelling4Word() {
        this.setState({ isLoading: false });
        this._fetchMeaningData(this.state.partword);
        this._fetchHintData(this.state.partword);
        this._fetchRelatedData(this.state.partword);
    }

    _resetInput = () => {
        this.setState({
            wCol: 0,
            wRow: 0,
            tableData: [],
            partword: '',
            dataItems: [],
            hintItems: [],
            relatedItems: [],
            spellCorrect: false,
        });

        this._initTableCellData();
    };

    _alertIndex(index) {
        Alert.alert(`This is row ${index + 1}`);
    }

    _fetchMeaningData(myword) {
        //Retrieve remote JSON data
        var jUrl = 'https://api.datamuse.com/words?sp=';
        if (myword) {
            jUrl = jUrl + myword + '&md=d';

            return fetch(jUrl, { cache: "no-cache" })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        //isLoading: false,
                        dataItems: responseJson,
                    }, function () {
                        // In this block you can do something with new state.
                    });

                    var jstr = JSON.stringify(responseJson);
                    var xxx = JSON.parse(jstr);

                    //Check if 'defs' key: spelling correct
                    if (jstr.indexOf("defs") > 0) {
                        var xscore = this.state.score + 10;
                        const { currentUser } = this.state;
                        this.setState({
                            spellCorrect: true,
                            score: xscore,

                        });
                        this.ref.add({
                            score: xscore,
                            email: this.state.currentUser.email,
                        });
                    } else {
                        this.setState({
                            spellCorrect: false,
                            //score: 99,
                        });
                    }

                })
                .catch((error) => {
                    console.error(error);
                });

        }
    }

    _fetchHintData(myword) {
        //Retrieve remote JSON data
        var jUrl = 'https://api.datamuse.com/words?sp=';
        if (myword) {
            jUrl = jUrl + myword + '*&md=d&max=10';
            var respJ = [];

            return fetch(jUrl)
                .then((response) => response.json())
                .then((responseJson) => {
                    for (xx in responseJson) {
                        var qq = "";
                        if (responseJson[xx].hasOwnProperty('defs')) {
                            var pp = responseJson[xx].defs;
                            qq = responseJson[xx].word + '\n' + pp[0].replace("\t", ". ");
                        } else {
                            qq = responseJson[xx].word
                        };
                        respJ.push(qq);
                    };

                    this.setState({
                        isLoading: false,
                        hintItems: respJ
                    }, function () {
                        // In this block you can do something with new state.
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    _fetchRelatedData(myword) {
        //Retrieve remote JSON data
        var jUrl = 'https://api.datamuse.com/words?ml=';
        if (myword) {
            jUrl = jUrl + myword + '&md=d&max=10';
            var respJ = [];

            return fetch(jUrl)
                .then((response) => response.json())
                .then((responseJson) => {
                    for (xx in responseJson) {
                        var qq = "";
                        if (responseJson[xx].hasOwnProperty('defs')) {
                            var pp = responseJson[xx].defs;
                            qq = responseJson[xx].word + '\n' + pp[0].replace("\t", ". ");
                        } else {
                            qq = responseJson[xx].word
                        };
                        respJ.push(qq);
                    };

                    this.setState({
                        isLoading: false,
                        relatedItems: respJ
                    }, function () {
                        // In this block you can do something with new state.
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    _flItemSeparator = () => {
        return (
            <View style={{ height: 2, width: "100%", backgroundColor: "skyblue" }} />
        );
    }

    _keyExtractor = (item, index) => String(index);

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity activeOpacity={0.5} >
                <Text style={styles.itemStyle}>{item}</Text>
            </TouchableOpacity>
        );
    }

    _renderMeaningItem = ({ item, index }) => {
        // has key: 'defs', means spelling corrrect
        if (item.hasOwnProperty('defs')) {
            return (
                <ScrollView style={{ padding: 10 }}>
                    {
                        item.defs.map((itemx, index) => (
                            <View key={index}>
                                <Text style={{ fontSize: 24, padding: 3 }}>{itemx.replace("\t", ". ")}</Text>
                            </View>
                        ))
                    }
                </ScrollView>
            );
        } else {
            return (
                <TouchableOpacity activeOpacity={0.5}>
                    <Text style={styles.itemStyle}>Try again...</Text>
                </TouchableOpacity>
            );
        }
    }


    render() {

        if (this.state.isLoading) {
            return <ActivityIndicator size="large" />;
        }

        const tblstate = this.state;
        const element = (data, index) => (
            <TouchableOpacity onPress={() => this._alertIndex(index)}>
                <View style={styles.btn}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>{data}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );


        return (
            <ScrollView>
            <View style={styles.containerStyle}>
                <View style = {{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', paddingTop: 10, paddingLeft: 10}}>
                    <TouchableOpacity onPress = { this.FunctionToGoBack}>
                        <Image 
                            style = {{width: 40, height: 40}}
                            source = {{ uri: 'https://firebasestorage.googleapis.com/v0/b/wordmatch-b0b75.appspot.com/o/back_arrow.png?alt=media&token=06f9f660-fc7f-4c0f-b9d5-d51f0cfbcde3'}}
                        />
                    </TouchableOpacity>
                </View>
                <View style = {{ height:300, width: 390, marginTop:30}}>
                    <Table borderStyle={{ borderColor: '#ff3333' }}>
                        <Row data={tblstate.tableHead} style={styles.head} textStyle={styles.text} />
                        {
                            tblstate.tableData.map((rowData, index) => (
                                <TableWrapper key={index} style={styles.row} borderStyle={{ borderWidth: 2, borderColor: 'blue', }}>
                                    {
                                        rowData.map((cellData, cellIndex) => (
                                            <Cell key={cellIndex} data={element(cellData, index)} textStyle={styles.text} />
                                        ))
                                    }
                                </TableWrapper>
                            ))
                        }
                    </Table>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',marginBottom: 5, marginTop:120 }}>
                    <View style={{ paddingRight: 5 }}>
                        <TouchableOpacity onLongPress={this._aLetterPress} onPress={this._add1aLetterPress} activeOpacity={0.8} style={styles.buttonStyle} >
                            <Text style={styles.buttontextStyle}>{this.state.aletter}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <Button title='New' backgroundColor="#3b5998" onPress={this._aLetterPress} />
                    </View>

                    <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <Button title='Up' backgroundColor="#3b5998" onPress={this._add1aLetterPress} />
                    </View>

                    <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                        <Button title='Check' backgroundColor="#3b5998" onPress={this._checkSpelling4Word.bind(this)} />
                    </View>
                    <View style={{ paddingLeft: 20 }}>
                        <Button title='Reset' backgroundColor="#3b5998" onPress={this._resetInput.bind(this)} />
                    </View >
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ paddingRight: 10 }}>
                        <Text style={{ fontSize: 20, color: '#0000cc' }}>{this.state.partword}</Text>
                    </View>
                    <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                        <Text style={{ fontSize: 24, color: '#00cc00', fontWeight: 'bold' }}>{this.state.spellCorrect ? 'Correct!' : ''}</Text>
                    </View >
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={{ fontSize: 20 }}>Score: {this.state.score} </Text>
                    </View >
                </View>

                <Swiper style={styles.wrapper} height={380} width={400} showsButtons={true}>

                    <View >
                        <FlatList
                            data={this.state.dataItems}
                            ItemSeparatorComponent={this._flItemSeparator}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderMeaningItem}
                        />
                    </View>

                    <View >
                        <FlatList
                            data={this.state.hintItems}
                            ItemSeparatorComponent={this._flItemSeparator}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        />
                    </View>

                    <View >
                        <FlatList
                            data={this.state.relatedItems}
                            ItemSeparatorComponent={this._flItemSeparator}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        />
                    </View>
                </Swiper>

            </View >
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    containerStyle: {
        /* justifyContent: 'flex-start', */
        backgroundColor: '#E5E7E9',
    },
    buttonStyle: {
        padding: 10,
        backgroundColor: '#00BCD4',
        borderRadius: 3,
    },
    buttontextStyle: {
        color: '#ff0000',
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
    head: { height: 0, backgroundColor: '#808B97' },
    text: { margin: 2, textAlign: 'center' },
    row: {
        flexDirection: 'row', backgroundColor: '#FFF1C1', alignContent: 'center', justifyContent: 'center',
        alignItems: 'center'
    },
    btn: { width: 35, height: 30, borderRadius: 2, margin: 4 },
    btnText: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#000099' }
});
