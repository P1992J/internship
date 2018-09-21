import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { SwitchNavigator } from 'react-navigation'

//import the different screens
import Home from './Home'
import Setting from './Setting'
import Help from './Help'
import Loading from './Loading'
import SignUp from './SignUp'
import Login from './Login'
import Menu from './Menu'
//import Main from './Main'
//import Resume from './Resume'
import Score from './Score'
//import Wordwork5 from './Wordwork5'
import Wordwork6 from './Wordwork6'
import Wordwork7 from './Wordwork7'
import StarRating from './StarRating'


// create our app's navigation stack
const MyApp = SwitchNavigator(
  {
    Home,
    Setting,
    Help,
    Menu,
    Loading,
    SignUp,
    Login,
    //Main,
    //Resume,
    //Wordwork5,
    Wordwork6,
    Score,
    Wordwork7,
    StarRating
    
  },
  {
    initialRouteName: 'Home'
  }
)

export default MyApp
