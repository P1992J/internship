import React from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View, Button, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import firebase from 'react-native-firebase'

export default class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  handleSignUp = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then(user => this.props.navigation.navigate('Menu'))
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
              style = {{ width: 390, height: 140, borderWidth: 2, borderColor: '#17202A', borderRadius: 10}}
              source = {{ uri: 'https://firebasestorage.googleapis.com/v0/b/wordmatch-b0b75.appspot.com/o/Word.png?alt=media&token=4bddb22f-70a2-4827-8781-3b94a5436a3a'}}
          />
        </View>
        <View style = {{ flex:1,flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',paddingTop:20}}>
          <TouchableOpacity onPress = { this.FunctionToGoBack}>
            <Image 
                style = {{width: 70, height: 60}}
                source = {{ uri: 'https://firebasestorage.googleapis.com/v0/b/wordmatch-b0b75.appspot.com/o/back_arrow.png?alt=media&token=06f9f660-fc7f-4c0f-b9d5-d51f0cfbcde3'}}
            />
          </TouchableOpacity>
        </View>
        <View style = {{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingBottom: 80}}>
          <Text style = {{ fontSize:20, fontWeight: '600', color: '#F53004'}}>Sign Up</Text>
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
          <TextInput 
            placeholder="Email"
            placeholderTextSize="20"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <View style = {{  flexDirection: 'row',justifyContent: 'flex-start', alignItems:'stretch', padding:20}} >
            <View style = {{ paddingRight: 30}}>
              <Button  title="Sign Up" onPress={this.handleSignUp} />
            </View>
            <View style = {{paddingLeft: 30}}>
              <Button title = "Cancel" onPress = {() => this.saveCancle()}/>
            </View>
          </View>
          <View style = {{justifyContent: 'flex-start', alignItems:'flex-start', padding:20}}>
            <Button
              title="Already have an account? Login"
              onPress={() => this.props.navigation.navigate('Login')}
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
  },
  
})
