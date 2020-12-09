import React from 'react'
import {Text, SafeAreaView, Button} from 'react-native'
import {styles} from "../assets/Styles"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Homepage = ({navigation}: { navigation: any }) => {
    const logOut = async () => {
        await AsyncStorage.removeItem('token')
        navigation.replace('AuthRoutes')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>Homepage</Text>
            <Button title="Log out" onPress={() => logOut()}/>
        </SafeAreaView>
    )
}

export default Homepage
