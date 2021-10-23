import React from 'react'
import { useFonts } from 'expo-font'
import Router from './router'

const App = () => {
    const [fontsLoaded] = useFonts({
        medium: require('./assets/fonts/medium.ttf'),
        semi: require('./assets/fonts/semi.ttf'),
        bold: require('./assets/fonts/bold.ttf'),
    })

    if (!fontsLoaded) {
        return null
    }

    return <Router />
}

export default App
