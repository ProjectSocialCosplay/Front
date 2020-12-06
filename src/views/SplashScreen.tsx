import React, {useState, useEffect} from 'react'
import {ActivityIndicator, Image, SafeAreaView, View} from 'react-native'
import styles from "../assets/Styles"
import AsyncStorage from "@react-native-async-storage/async-storage"

const SplashScreen = ({navigation}: { navigation: any }) => {
    const [animating, setAnimating] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setAnimating(false)
            AsyncStorage.getItem('token').then((value) =>
                navigation.replace(
                    value === null ? 'AuthRoutes' : 'AppRoutes'
                ),
            )
        }, 2000)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.splashView}>
                <Image
                    style={styles.splashLogo}
                    source={require('../assets/logo.png')}
                />
                <ActivityIndicator
                    animating={animating}
                    color="#8d8d8d"
                    size="large"
                    style={styles.activityIndicator}
                />
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen
