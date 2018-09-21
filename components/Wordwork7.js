import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, TextInput, Button, Dimensions, Keyboard, ScrollView, Alert, ActivityIndicator, } from "react-native";

import firebase from 'react-native-firebase';
import Swiper from 'react-native-swiper';

import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

import ToggleSwitch from 'toggle-switch-react-native';
import Emoji from 'react-native-emoji';

var screenwidth = Dimensions.get('window').width;

var tblCol = 8;
var tblRow = 10;
var tblData = [];

export default class Wordwork7 extends Component {
    constructor(props) {
        super(props);

        this.ref = firebase.firestore().collection('wordmatch');
        this.unsubscribe = null;

        this.state = {
            aletter: 'A',
            bletter: 'B',
            cletter: 'C',
            isLoading: false,
            dataItems: [],
            hintItems: [],
            relatedItems: [],
            partword: '',
            spellCorrect: false,
            nowscore: 0,
            email: '',
            scores: [],
            currentUser: null,
            userExist: false,
            docid: '',
            tableHead: [],
            tableData: [],
            wCol: 0,
            wRow: 0,
            isRight: true,
        };

    }

    componentDidMount() {
        // Connect to firebase
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)

        const { currentUser } = firebase.auth();
        this.setState({ currentUser });
        // find user existing score
        var uemail = currentUser.email;
        this._findemailscore(uemail);

        this._initTableCellData();
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

    _initTableCellData = () => {
        var myHead = Array(tblCol);
        for (var i = 0; i < tblCol; i++)
            myHead[i] = 'H' + i.toString();

        tblData = Array(tblRow);
        for (var j = 0; j < tblRow; j++) {
            tblData[j] = Array(tblCol);
            var newLetter = this._randomString();
            var rnum = Math.floor(Math.random() * tblCol);
            for (var i = 0; i < tblCol; i++) {
                if (i == rnum) {
                    tblData[j][i] = newLetter;
                } else {
                    tblData[j][i] = '_';
                }
            }
        }

        this.setState({
            tableHead: myHead,
            tableData: tblData,
        });
    }

    _placeLetter2Cell = (xletter) => {
        var myCellRow = this.state.wRow;
        var myCellCol = this.state.wCol;
        tblData[myCellRow][myCellCol] = xletter;
        myCellCol = myCellCol + 1;
        if (myCellCol >= tblCol) {
            myCellCol = 0;
            myCellRow = myCellRow + 1;
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

    _placeLetter1Cell = (xletter) => {
        var myCellRow = 0;
        var myCellCol = this.state.wCol;
        var nowword = '';
        var LorR = this.state.isRight;

        if (LorR) {
            for (var i = (tblCol - 1); i >= 0; i--) {
                var nowletter = tblData[myCellRow][i];
                var isEmt = nowletter.localeCompare('_');
                if (isEmt != 0) {
                    i = i + 1;
                    if (i >= tblCol) { i = tblCol - 1; }
                    tblData[myCellRow][i] = xletter;
                    break;
                }
            }
        } else {
            for (var i = 0; i < tblCol; i++) {
                var nowletter = tblData[myCellRow][i];
                var isEmt = nowletter.localeCompare('_');
                if (isEmt != 0) {
                    i = i - 1;
                    if (i < 0) { i = 0; }
                    tblData[myCellRow][i] = xletter;
                    break;
                }
            }
        }

        for (var i = 0; i < tblCol; i++) {
            var nowletter = tblData[myCellRow][i];
            var isEmt = nowletter.localeCompare('_');
            if (isEmt != 0) {
                nowword = nowword + tblData[myCellRow][i];
            }
        }

        this.setState({
            //wCol: myCellCol,
            //wRow: myCellRow,
            partword: nowword,
            tableData: tblData,
        });
    }


    _findemailscore = (xemail) => {
        var xscore = 0;
        var userexisting = false;
        var nowdocid = '';
        this.ref.get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                const { email, score } = doc.data();
                if (email.localeCompare(xemail) == 0) {
                    userexisting = true;
                    nowdocid = doc.id;

                    if (score >= xscore) {
                        xscore = score;
                    }
                }
            });

            this.setState({
                userExist: userexisting,
                nowscore: xscore,
                docid: nowdocid,
                isLoading: false,
            });
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
        var newLetter = this.state.aletter;
        this._placeLetter1Cell(newLetter);
    };

    _bLetterPress = () => {
        var newLetter = this._randomString();
        this.setState({ bletter: newLetter });
    };

    _add1bLetterPress = () => {
        var newLetter = this.state.bletter;
        this._placeLetter1Cell(newLetter);
    };

    _cLetterPress = () => {
        var newLetter = this._randomString();
        this.setState({ cletter: newLetter });
    };

    _add1cLetterPress = () => {
        var newLetter = this.state.cletter;
        this._placeLetter1Cell(newLetter);
    };

    _newLetters = () => {
        this._aLetterPress();
        this._bLetterPress();
        this._cLetterPress();
    }

    _shiftLettersUp = () => {
        for (var j = 0; j < (tblRow - 1); j++) {
            for (var i = 0; i < tblCol; i++) {
                tblData[j][i] = tblData[j + 1][i];
            }
        }
        var newLetter = this._randomString();
        var rnum = Math.floor(Math.random() * tblCol);
        for (var i = 0; i < tblCol; i++) {
            if (i == rnum) {
                tblData[tblRow - 1][i] = newLetter;
            } else {
                tblData[tblRow - 1][i] = '_';
            }
        }
    }


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
        this._newLetters();
    };

    //_alertIndex(index) {
    //    Alert.alert(`This is row ${index + 1}`);
    //}

    _alertIndex(data) {
        Alert.alert(`${data}`);
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
                    //var xxx = JSON.parse(jstr);

                    this._shiftLettersUp();

                    //Check if 'defs' key: spelling correct
                    if (jstr.indexOf("defs") > 0) {
                        var xscore = this.state.nowscore + 10;
                        // Add or update score to firebase
                        const { currentUser } = this.state;
                        var nowid = this.state.docid;
                        if (nowid.length < 1) {
                            nowid = this.state.currentUser.email;
                        }

                        if (this.state.userExist) {
                            this.ref.doc(nowid).set({
                                email: this.state.currentUser.email,
                                score: xscore,
                            });
                        } else {
                            this.ref.add({
                                email: this.state.currentUser.email,
                                score: xscore,
                            });

                            this.setState({
                                userExist: true,
                                docid: nowid,
                            });
                        }

                        this.setState({
                            spellCorrect: true,
                            nowscore: xscore,
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
            <TouchableOpacity onPress={() => this._alertIndex(data)}>
                <View style={styles.btn}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>{data}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );


        return (
            <View style={styles.containerStyle}>
                <View style = {{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', paddingTop: 10, paddingLeft: 10}}>
                    <TouchableOpacity onPress = { this.FunctionToGoBack}>
                        <Image 
                            style = {{width: 40, height: 40}}
                            source = {{ uri: 'https://firebasestorage.googleapis.com/v0/b/wordmatch-b0b75.appspot.com/o/back_arrow.png?alt=media&token=06f9f660-fc7f-4c0f-b9d5-d51f0cfbcde3'}}
                        />
                    </TouchableOpacity>
                </View>

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

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',marginBottom: 5, marginTop:120  }}>
                    <View style={{ paddingRight: 5 }}>
                        <TouchableOpacity onLongPress={this._aLetterPress} onPress={this._add1aLetterPress} activeOpacity={0.8} style={styles.buttonStyle} >
                            <Text style={styles.buttontextStyle}>{this.state.aletter}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <TouchableOpacity onLongPress={this._bLetterPress} onPress={this._add1bLetterPress} activeOpacity={0.8} style={styles.buttonStyle} >
                            <Text style={styles.buttontextStyle}>{this.state.bletter}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <TouchableOpacity onLongPress={this._cLetterPress} onPress={this._add1cLetterPress} activeOpacity={0.8} style={styles.buttonStyle} >
                            <Text style={styles.buttontextStyle}>{this.state.cletter}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <Button title='New' backgroundColor="#3b5998" onPress={this._newLetters} />
                    </View>

                    <View style={{ paddingLeft: 10, paddingRight: 2 }}>
                        <ToggleSwitch
                            label="L"
                            isOn={this.state.isRight}
                            onColor='red'
                            offColor='blue'
                            labelStyle={{ fontSize: 24, color: '#0040ff', fontWeight: 'bold' }}
                            onToggle={(isR) => { this.setState({ isRight: isR }); }}
                        />
                    </View>
                    <View style={{ paddingLeft: 3 }}>
                        <Text style={{ fontSize: 24, color: 'red', fontWeight: 'bold' }}>R</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 10 }}>
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={{ fontSize: 20 }}>Score: {this.state.nowscore} </Text>
                    </View >
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={{ fontSize: 24 }}>{this.state.spellCorrect ? <Emoji name="+1" /> : <Emoji name="relaxed" />}</Text>
                    </View >
                    <View style={{ paddingLeft: 20, paddingRight: 15 }}>
                        <Button title='Check' backgroundColor="#3b5998" onPress={this._checkSpelling4Word.bind(this)} />
                    </View>
                    <View style={{ paddingLeft: 15 }}>
                        <Button title='Reset' backgroundColor="#3b5998" onPress={this._resetInput.bind(this)} />
                    </View >
                </View>

                <Swiper style={styles.wrapper} height={380} showsButtons={true}>

                    <View >
                        <Text style={{ fontSize: 20, color: 'red', fontWeight: 'bold' }}>{this.state.partword} </Text>
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
        );
    }
}


const styles = StyleSheet.create({
    containerStyle: {
        /* justifyContent: 'flex-start', */
        margin: 0,
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
        width: screenwidth * 0.9,
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
