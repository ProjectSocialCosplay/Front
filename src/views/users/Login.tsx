import React, {useEffect, useState} from 'react'
import {
    Image,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../../assets/Styles'
import {ButtonGray} from "../../components/Button"
import {Errors} from "../../components/Errors"
import {fetchApi} from "../../utils/fetchApi"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const Login = ({navigation}: { navigation: any }) => {
    const inputs: any = {}
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [user, setUser] = useState({email: '', password: ''})
    const [errors, setErrors] = useState<string[] | null>(null)

    const handleSubmit = () => {
        let oops = []

        if (!userEmail || !userPassword) {
            oops.push('Please fill empty field(s)')
        }

        if (userEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
            oops.push('Invalid email address')
        }

        oops.length > 0 ? setErrors(oops) : setUser({email: userEmail, password: userPassword})
    }

    useEffect(() => {
        const fetchData = async () => {
            setErrors([])
            const query = JSON.stringify({
                query: `query {
                login( email: "${user.email}", password: "${user.password}" ) {
                        token
                    }
                }`
            })

            try {
                const response = await fetchApi(query)
                await AsyncStorage.setItem('token', response.login.token)
                navigation.reset({
                        index: 0,
                        routes: [{name: 'AppRoutes'}],
                    }
                )
            } catch (e) {
                if (e.errors) {
                    setErrors([e.errors])
                } else {
                    setErrors(['An error has been encountered, please try again '])
                }
            }
        }

        user.email && user.password && fetchData()
    }, [user])

    const focusTheField = (id: string) => {
        inputs[id].focus()
    }

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
                            focusTheField('password')
                        }}
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                        placeholder="Password"
                        placeholderTextColor="#8d8d8d"
                        autoCompleteType="password"
                        textContentType="password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        returnKeyType="done"
                        ref={input => {
                            inputs['password'] = input
                        }}
                        onSubmitEditing={() => handleSubmit()}
                    />

                    <ButtonGray buttonTitle="Sign in" onPress={() => handleSubmit()}/>
                    <TouchableOpacity onPress={() => navigation.reset({
                            index: 0,
                            routes: [{name: 'Sign in'}, {name: 'Forgot your password'}],
                        }
                    )}>
                        <Text style={styles.forgotPassword}>Forgot your password</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.loginBottomContainer}>
                    <ButtonGray
                        buttonTitle="Create an account"
                        onPress={() => navigation.reset({
                                index: 0,
                                routes: [{name: 'Sign in'}, {name: 'Sign up'}],
                            }
                        )}
                    />
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

export default Login
