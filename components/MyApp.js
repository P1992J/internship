import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { SwitchNavigator } from 'react-navigation'

//import the different screens
//import Home from './Home'
//import Setting from './Setting'
//import Help from './Help'
//import Loading from './Loading'
//import SignUp from './SignUp'
//import Login from './Login'
//import Menu from './Menu'
import Main from './Main'

// create our app's navigation stack
const MyApp = SwitchNavigator(
  {
    //Home,
    //Setting,
    //Help,
    //Menu,
    //Loading,
    //SignUp,
    //Login,
    Main
    
  },
  {
    initialRouteName: 'Main'
  }
)

export default MyApp
