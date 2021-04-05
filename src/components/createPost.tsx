import {View, Text, Modal, TextInput} from "react-native"
import React, {useState} from "react"
import {styles} from "../assets/Styles"
import {Button, Headline} from 'react-native-paper'
import {fetchApi} from "../utils/fetchApi";
import {Errors} from "./Errors";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export const CreatePost = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    const [errors, setErrors] = useState<string[]>([])

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
            <Button mode="contained"
                    style={{...styles.button, marginBottom: 10}}
                    contentStyle={styles.buttonContent}
                    color={'#e9e9e9'}
                    onPress={() => setVisible(true)}
            >
                <Text>Create a new post</Text>
            </Button>
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
