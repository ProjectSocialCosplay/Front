import React, {useEffect, useState} from 'react'
import {
    Alert,
    Image,
    SafeAreaView,
    TextInput,
    View,
    Text,
    Linking,
    TouchableOpacity
} from 'react-native'
import {styles} from '../../assets/Styles'
import {Errors} from "../../components/Errors"
import {fetchApi} from "../../utils/fetchApi"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import {Button} from "react-native-paper"

const RegisterScreen = ({navigation}: { navigation: any }) => {
    const inputs: any = {}
    const [userPseudo, setUserPseudo] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userRepeatPassword, setUserRepeatPassword] = useState('')
    const [userBirthdate, setUserBirthdate] = useState(new Date())
    const [user, setUser] = useState({pseudo: '', email: '', birthdate: '', password: ''})
    const [errors, setErrors] = useState<string[]>([])

    const handleSubmit = () => {
        let oops = []

        if (!userPseudo || !userEmail || !userBirthdate || !userPassword || !userRepeatPassword) {
            oops.push('Please fill empty field(s)')
        }

        if (userEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
            oops.push('Invalid email address')
        }

        if (userPassword && userRepeatPassword && userPassword !== userRepeatPassword) {
            oops.push('Passwords do not match')
        }

        if (oops.length > 0) {
            setErrors(oops)
        } else {
            const date = new Date(userBirthdate)

            setUser({
                pseudo: userPseudo,
                email: userEmail,
                password: userPassword,
                birthdate: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
            })
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setErrors([])
            const query = JSON.stringify({
                query: `mutation {
                createUser( pseudo: "${user.pseudo}", password: "${user.password}", email: "${user.email}", birthdate: "${user.birthdate}" ) {
                        pseudo
                        email
                        _id
                    }
                }`
            })

            try {
                await fetchApi(query)
                navigation.navigate('Sign in')
                Alert.alert('Registration success', 'You must verify your email to complete the registration')
            } catch (e) {
                if (e.errors) {
                    setErrors([e.errors])
                } else {
                    setErrors(['An error has been encountered, please try again '])
                }
            }
        }

        user.pseudo && user.email && user.password && user.birthdate && fetchData()
    }, [user])

    const focusTheField = (id: string) => {
        inputs[id].focus()
    }

    return (
        <KeyboardAwareScrollView contentContainerStyle={{flex: 1}} showsVerticalScrollIndicator={false}
                                 keyboardShouldPersistTaps='handled'
                                 scrollEventThrottle={16}
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
                        onChangeText={(UserPseudo) => setUserPseudo(UserPseudo)}
                        placeholder="Pseudo"
                        placeholderTextColor="#8d8d8d"
                        textContentType="none"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            focusTheField('email')
                        }}
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                        placeholder="Email address"
                        placeholderTextColor="#8d8d8d"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        ref={input => {
                            inputs['email'] = input
                        }}
                        onSubmitEditing={() => {
                            focusTheField('password')
                        }}
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                        placeholder="Password"
                        placeholderTextColor="#8d8d8d"
                        textContentType="newPassword"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        returnKeyType="next"
                        ref={input => {
                            inputs['password'] = input
                        }}
                        onSubmitEditing={() => {
                            focusTheField('repeatPassword')
                        }}
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={(UserRepeatPassword) => setUserRepeatPassword(UserRepeatPassword)}
                        placeholder="Repeat your password"
                        placeholderTextColor="#8d8d8d"
                        textContentType="newPassword"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        returnKeyType="done"
                        ref={input => {
                            inputs['repeatPassword'] = input
                        }}
                        onSubmitEditing={() => handleSubmit()}
                    />
                    <View style={styles.rgpd}>
                        <Text>By clicking Sign Up, you agree to our </Text>
                        <TouchableOpacity>
                            <Text style={{ color: 'blue' }} onPress={() => navigation.navigate('Terms')} >
                                Terms
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Button
                        mode="contained"
                        color={'#3D4959'}
                        uppercase={false}
                        style={{...styles.button, marginTop: 10}}
                        contentStyle={styles.buttonContent}
                        onPress={() => handleSubmit()}
                    >
                        Sign up
                    </Button>
                </View>
                <View style={styles.loginBottomContainer}>
                    <Button
                        mode="contained"
                        color={'#3D4959'}
                        uppercase={false}
                        style={{...styles.button}}
                        contentStyle={styles.buttonContent}
                        onPress={() => navigation.navigate('Sign in')}
                    >
                        I already have an account
                    </Button>
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

export default RegisterScreen
