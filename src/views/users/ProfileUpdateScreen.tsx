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

const ProfileUpdateScreen = ({navigation}: { navigation: any }) => {
    const inputs: any = {}
    const [user, setUser] = useState({
        pseudo: '',
        bio: '',
        profile_image_url: {
            Url: '',
        },
    })
    const [errors, setErrors] = useState<string[] | null>(null)
    const [isWait, setIsWait] = useState<boolean>(true)

    const focusTheField = (id: string) => {
        inputs[id].focus()
    }

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync()

        if (!permissionResult.granted) {
            setErrors(['Permission to access camera roll is required'])
            return
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync()

        if (pickerResult.cancelled) {
            return
        }

        setUser({...user, profile_image_url: {Url: pickerResult.uri}})
    }

    const handleSubmit = () => {
        setErrors(['An error has been encountered, please try again'])
    }

    useEffect(() => {
        return navigation.addListener('focus',
            async () => {
                setErrors([])

                const query = JSON.stringify({
                    query: `query {
                    getAuthUser{
                        pseudo
                        bio
                        profile_image_url{
                            Url
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
            })
    }, [navigation])

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{flex: 1}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='handled'
            scrollEventThrottle={16}
            extraHeight={175}
            scrollEnabled={false}
            enableOnAndroid={true}
        >
            <SafeAreaView style={styles.container}>
                <Errors errors={errors}/>
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
                                <Pressable style={stylesUser.avatarBorder} onPress={() => {
                                    openImagePickerAsync()
                                }}>
                                    {
                                        user.profile_image_url.Url ?
                                            <Avatar.Image
                                                size={175}
                                                source={{uri: user.profile_image_url.Url}}
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
