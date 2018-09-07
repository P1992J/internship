import React from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View, Button, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import firebase from 'react-native-firebase'

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInAndRetrieveDataWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Menu'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  _saveCancle = () => {
    this.setState({
        showAddNew: false,
        showDocLst: true,
    });
  }

  FunctionToGoBack = () => {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <ScrollView>
      <KeyboardAvoidingView behavior = "padding" style={styles.container} enabled>
        <View style = {{ flex:1, flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Image
              style = {{ width: 390, height: 140, borderWidth: 2, borderColor: '#17202A', borderRadius: 10, overflow: 'hidden'}}
              source = {{ uri: 'https://firebasestorage.googleapis.com/v0/b/wordmatch-b0b75.appspot.com/o/Word.png?alt=media&token=4bddb22f-70a2-4827-8781-3b94a5436a3a'}}
          />
        </View>
        <View style = {{ flex:1,flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', paddingTop: 20}}>
          <TouchableOpacity onPress = { this.FunctionToGoBack}>
            <Image 
                style = {{width: 70, height: 60}}
                source = {{ uri: 'https://firebasestorage.googleapis.com/v0/b/wordmatch-b0b75.appspot.com/o/back_arrow.png?alt=media&token=06f9f660-fc7f-4c0f-b9d5-d51f0cfbcde3'}}
            />
          </TouchableOpacity>
        </View>
        <View style = {{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingBottom: 80 }}>
          <Text style = {{ fontSize:20, fontWeight: '600', color: '#F53004'}}>Login</Text>
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Email"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <View style = {{  flexDirection: 'row',justifyContent: 'flex-start', alignItems:'stretch', padding:20}} >
            <View style = {{ paddingRight: 30}}>
              <Button title="Login" onPress={this.handleLogin} />
            </View>
            <View style = {{paddingLeft: 30}}>
              <Button title = "Cancel" onPress = {() => this.saveCancle()}/>
            </View>
            </View>
            <View style = {{justifyContent: 'flex-start', alignItems:'flex-start', padding:20}}>
             <Button
                title="Don't have an account? Sign Up"
              onPress={() => this.props.navigation.navigate('SignUp')}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  
 
  textInput: {
    fontSize:15,
    color: '#F53004',
    height: 43,
    width: '90%',
    borderColor: '#353836',
    borderWidth: 2,
    borderRadius: 8,
    marginTop: 8,
    
  }
})
