import React, {useEffect, useState} from 'react'
import {ActivityIndicator, SafeAreaView, ScrollView, View, TextInput, Pressable} from 'react-native'
import {styles, stylesUser} from "../../assets/Styles"
import {fetchApi} from "../../utils/fetchApi"
import {Avatar, Button, Caption} from 'react-native-paper'
import {Errors} from "../../components/Errors"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import {MaterialIcons} from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import {BackButton} from "../../components/BackButton"
import {Success} from "../../components/Success";

const ProfileUpdateScreen = ({navigation}: { navigation: any }) => {
    const inputs: any = {}
    const [user, setUser] = useState({
        pseudo: '',
        email: '',
        bio: '',
        profile_image: {
            url: '',
        },
    })
    const [errors, setErrors] = useState<string[]>([])
    const [success, setSuccess] = useState<string | null>(null)
    const [isWait, setIsWait] = useState<boolean>(true)
    const [image, setImage] = useState<string>('')

    const focusTheField = (id: string) => {
        inputs[id].focus()
    }

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync()

        if (!permissionResult.granted) {
            setErrors(['Permission to access camera roll is required'])
            return
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        })

        if (pickerResult.cancelled) {
            return
        }

        if (pickerResult.base64) {
            setImage(pickerResult.base64)
        }

        setUser({...user, profile_image: {url: pickerResult.uri}})
    }

    const handleSubmit = async () => {
        if (!user.pseudo) {
            setErrors(['Please enter a pseudo'])
        }

        if (image) {
            const query = JSON.stringify({
                query: `mutation{
                            uploadProfileImage(base64str: "${image}"){
                                key
                            }
                        }`
            })

            try {
                await fetchApi(query)
                setSuccess('Picture upload')
            } catch (e) {
                if (e.errors) {
                    setErrors([e.errors])
                } else {
                    setErrors(['An error has been encountered, please try again'])
                }
            }
        }

        /* TODO: Add bio to update (lineBreaking à faire) */

        const query_2 = JSON.stringify({
            query: `mutation{
                        updateUser(pseudo: "${user.pseudo}", email: "${user.email}"){
                            _id
                        }
                    }`
        })

        try {
            await fetchApi(query_2)
            setSuccess('Profile updated successfully')
        } catch (e) {
            if (e.errors) {
                setErrors([e.errors])
            } else {
                setErrors(['An error has been encountered, please try again'])
            }
        }
    }

    const fetchData = async () => {
        setErrors([])

        const query = JSON.stringify({
            query: `query {
                    getAuthUser{
                        pseudo
                        email
                        bio
                        profile_image{
                            url
                        }
                    }
                }`
        })

        try {
            const response = await fetchApi(query)
            setUser(response.getAuthUser)
            setIsWait(false)
        } catch (e) {
            if (e.errors) {
                setErrors([e.errors])
            } else {
                setErrors(['An error has been encountered, please try again'])
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, [navigation])

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{flex: 1}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='handled'
            scrollEventThrottle={16}
            extraHeight={75}
            scrollEnabled={false}
            enableOnAndroid={true}
        >
            <SafeAreaView style={styles.container}>
                <Errors errors={errors}/>
                <Success success={success}/>
                {
                    isWait ?
                        <ActivityIndicator
                            color="#8d8d8d"
                            size="large"
                            style={styles.splashView}
                        />
                        :
                        <>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <BackButton/>
                                <Pressable style={stylesUser.avatarBorder} onPress={async () => {
                                    await openImagePickerAsync()
                                }}>
                                    {
                                        user.profile_image !== null ?
                                            <Avatar.Image
                                                size={175}
                                                source={{uri: user.profile_image.url}}
                                                style={stylesUser.avatar}
                                            />
                                            :
                                            <Avatar.Text
                                                size={175}
                                                label={user.pseudo.substr(0, 1).toUpperCase()}
                                                style={stylesUser.avatar}
                                                color={'#fff'}
                                            />
                                    }
                                    <View>
                                        <MaterialIcons
                                            name="edit" size={30}
                                            color="white"
                                            style={stylesUser.avatarImageEdit}
                                        />
                                    </View>
                                </Pressable>

                                <View style={{...styles.container, marginTop: 40, alignItems: 'center'}}>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(pseudo) => setUser({...user, pseudo: pseudo})}
                                        value={user.pseudo}
                                        placeholder="Pseudo"
                                        placeholderTextColor="#8d8d8d"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        returnKeyType="next"
                                        onSubmitEditing={() => {
                                            focusTheField('email')
                                        }}
                                    />

                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(email) => setUser({...user, email: email})}
                                        value={user.email}
                                        placeholder="E-mail"
                                        placeholderTextColor="#8d8d8d"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        returnKeyType="next"
                                        ref={input => {
                                            inputs['email'] = input
                                        }}
                                        onSubmitEditing={() => {
                                            focusTheField('bio')
                                        }}
                                    />

                                    <TextInput
                                        style={{...styles.input, ...styles.inputArea}}
                                        onChangeText={(bio) => setUser({...user, bio: bio})}
                                        value={user.bio}
                                        placeholder="Describe yourself in a few words..."
                                        multiline={true}
                                        numberOfLines={4}
                                        scrollEnabled={false}
                                        placeholderTextColor="#8d8d8d"
                                        autoCapitalize="sentences"
                                        maxLength={150}
                                        autoCorrect={true}
                                        returnKeyType="default"
                                        ref={input => {
                                            inputs['bio'] = input
                                        }}
                                    />

                                    <Caption style={styles.inputAreaSizeInfos}>
                                        {user.bio ? user.bio.length : '0'}/150
                                    </Caption>

                                    <Button
                                        mode="contained"
                                        color={'#3D4959'}
                                        uppercase={false}
                                        style={{...styles.button, marginTop: 10}}
                                        contentStyle={styles.buttonContent}
                                        onPress={() => handleSubmit()}
                                    >
                                        Save
                                    </Button>
                                </View>
                            </ScrollView>
                        </>
                }
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

export default ProfileUpdateScreen
