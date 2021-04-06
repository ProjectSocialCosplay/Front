import {View, Text, Modal, TextInput, Pressable, Image} from "react-native"
import React, {useState} from "react"
import {styles, stylesUser} from "../assets/Styles"
import {Avatar, Button, Caption, Headline} from 'react-native-paper'
import {fetchApi} from "../utils/fetchApi";
import {Errors} from "./Errors";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CreatePost = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    const [errors, setErrors] = useState<string[]>([])
    const [user, setUser] = useState({
        profile_image: {url: ''},
        pseudo: ''
    })

    AsyncStorage.getItem('onlineUser').then((value => {
        if (value) {
            setUser(JSON.parse(value))
        }
    }))

    const handleSubmit = async () => {
        setErrors([])
        let query = JSON.stringify({
            query: `mutation{
                createPost(content: "${text}"){
                    _id
                }
            }`
        })

        try {
            let response = await fetchApi(query)
            setVisible(false)
        } catch (e) {
            if (e.errors) {
                setErrors([e.errors])
            } else {
                setErrors(['An error has been encountered, please try again '])
            }
        }
    }

    return (
        <>
            <Pressable style={{...styles.onePost, ...stylesUser.friends, paddingHorizontal: 20, marginTop: 0}}
                       onPress={() => setVisible(true)}>
                <View style={styles.flex}>
                    {
                        user.profile_image !== null ?
                            <Image source={{uri: user.profile_image.url}}
                                   style={{...stylesUser.avatar, ...styles.postAvatar}}/>
                            :
                            <Avatar.Text
                                size={35}
                                label={user.pseudo.substr(0, 1).toUpperCase()}
                                style={{...stylesUser.avatar, ...styles.postAvatar}}
                                color={'#fff'}
                            />
                    }
                </View>
                <View style={{flex: 5}}>
                    <Caption style={{marginTop: 8}}>What do you want to say?</Caption>
                </View>
            </Pressable>
            <Modal
                animationType={"slide"}
                visible={visible}
                onRequestClose={() => setVisible(false)}
                presentationStyle={'formSheet'}
            >
                <KeyboardAwareScrollView contentContainerStyle={{flex: 1}} showsVerticalScrollIndicator={false}
                                         keyboardShouldPersistTaps='always'
                                         scrollEventThrottle={10}
                                         extraHeight={80}
                                         scrollEnabled={false}
                                         enableOnAndroid={true}
                >
                    <View style={{...styles.postModal}}>
                        <Headline>What do you want to say?</Headline>
                        <TextInput
                            style={{...styles.input, ...styles.postModalInput}}
                            placeholder={'Write what do you want here...'}
                            multiline={true}
                            placeholderTextColor="#8d8d8d"
                            autoCapitalize="sentences"
                            autoCorrect={true}
                            returnKeyType="default"
                            onChangeText={(text) => setText(text)}
                        />
                        <View style={{...styles.postModalError}}>
                            <Errors errors={errors}/>
                        </View>

                        <View style={{...styles.postModalBtn}}>
                            <Button
                                mode="contained"
                                color={'#273c75'}
                                style={{...styles.button, marginBottom: 10}}
                                contentStyle={styles.buttonContent}
                                onPress={() => {
                                    handleSubmit()
                                }}
                            >
                                Publish
                            </Button>
                            <Button
                                mode="contained"
                                color={'#e71d36'}
                                style={{...styles.button}}
                                contentStyle={styles.buttonContent}
                                onPress={() => {
                                    setVisible(false)
                                }}
                            >
                                Cancel
                            </Button>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </Modal>
        </>
    )
}
