import React, {useEffect, useState} from 'react'
import {
    Image,
    SafeAreaView,
    TextInput,
    View,
    Text,
} from 'react-native'
import {styles} from '../../assets/Styles'
import {Errors} from "../../components/Errors"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import {Button} from "react-native-paper"

const ForgotPasswordScreen = ({navigation}: { navigation: any }) => {
    const [userEmail, setUserEmail] = useState('')
    const [user, setUser] = useState({email: ''})
    const [errors, setErrors] = useState<string[] | null>(null)

    const handleSubmit = () => {
        let oops = []

        if (!userEmail) {
            oops.push('Please fill an email')
        }

        if (userEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
            oops.push('Invalid email address')
        }

        oops.length > 0 ? setErrors(oops) : setUser({email: userEmail})
    }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setErrors([])
    //         const query = JSON.stringify({
    //             query: `query {
    //             login( email: "${user.email}" ) {
    //                     token
    //                 }
    //             }`
    //         })
    //
    //         try {
    //             const response = await fetchApi(query)
    //             await AsyncStorage.setItem('token', response.login.token)
    //             navigation.navigate('AppRoutes')
    //         } catch (e) {
    //             setErrors([e.errors])
    //         }
    //     }
    //
    //     user.email && user.password && fetchData()
    // }, [user])

    return (
        <KeyboardAwareScrollView contentContainerStyle={{flex: 1}} showsVerticalScrollIndicator={false}
                                 keyboardShouldPersistTaps='handled'
                                 scrollEventThrottle={0}
                                 extraHeight={100}
                                 scrollEnabled={false}
                                 enableOnAndroid={true}>
            <SafeAreaView style={styles.container}>
                <View style={styles.loginTopContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/logo.png')}
                    />

                    <Errors errors={errors}/>

                    <TextInput
                        style={styles.input}
                        onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                        placeholder="Email address"
                        placeholderTextColor="#8d8d8d"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            handleSubmit()
                        }}
                    />

                    <Button
                        mode="contained"
                        color={'#3D4959'}
                        uppercase={false}
                        style={{...styles.button, marginTop: 10}}
                        contentStyle={styles.buttonContent}
                        onPress={() => handleSubmit()}
                    >
                        Reset
                    </Button>

                    <Text style={{...styles.forgotPassword, width: '80%', textAlign: 'center'}}>
                        To reset your password, please enter the email address associated with your account</Text>
                </View>

                <View style={styles.loginBottomContainer}>
                    <Button
                        mode="contained"
                        color={'#3D4959'}
                        uppercase={false}
                        style={{...styles.button, marginTop: 10}}
                        contentStyle={styles.buttonContent}
                        onPress={() => navigation.navigate('Sign in')}
                    >
                        Cancel
                    </Button>
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

export default ForgotPasswordScreen
