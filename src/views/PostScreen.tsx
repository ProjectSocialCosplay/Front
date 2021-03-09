import React, {useCallback, useEffect, useState} from 'react'
import {
    Text,
    SafeAreaView,
    View,
    Pressable,
    TextInput,
    Image,
    RefreshControl,
    ScrollView,
    ActivityIndicator, TouchableOpacity
} from 'react-native'
import {styles, stylesUser} from "../assets/Styles"
import {Post} from "../components/Post"
import {Avatar, IconButton, Subheading} from 'react-native-paper'
import {TimeAgo} from "../components/TimeAgo"
import {useNavigationState} from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import {Errors} from "../components/Errors"
import {BackButton} from "../components/BackButton"
import {fetchApi} from "../utils/fetchApi"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {Success} from "../components/Success"

const PostScreen = ({route, navigation}: { route: any, navigation: any }) => {
    const [post, setPost] = useState(route.params.post)
    const [comment, setComment] = useState<string>()
    const [isWait, setIsWait] = useState<boolean>(true)
    const [errors, setErrors] = useState<string[]>([])
    const [success, setSuccess] = useState<string | null>(null)
    const [refreshing, setRefreshing] = React.useState(false)
    const [onlineUserId, setOnlineUserId] = useState<string>()
    const screenName = useNavigationState((state) => state.routes[state.index].name)

    AsyncStorage.getItem('onlineUserId').then(value => {
        setOnlineUserId(value ? value : '')
    })

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        setRefreshing(false)
    }, [])

    useEffect(() => {
        return navigation.addListener('focus', () =>
            setIsWait(false)
        )
    }, [navigation])

    const handleSubmit = async () => {
        setErrors([])
        let query = JSON.stringify({
            query: `mutation{
                createComment(comment: "${comment}", postId: "${post._id}"){
                    _id
                }
            }`
        })

        try {
            let response = await fetchApi(query)
        } catch (e) {
            if (e.errors) {
                setErrors([e.errors])
            } else {
                setErrors(['An error has been encountered, please try again '])
            }
        }
    }

    const deleteComment = async (id: string) => {
        setErrors([])
        setSuccess(null)
        let query = JSON.stringify({
            query: `mutation{
                deleteComment(commentId: "${id}"){
                    message
                }
            }`
        })

        try {
            let response = await fetchApi(query)
            setSuccess('Comment successfully deleted')
        } catch (e) {
            if (e.errors) {
                setErrors([e.errors])
            } else {
                setErrors(['An error has been encountered, please try again '])
            }
        }
    }

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{flex: 1}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='handled'
            scrollEventThrottle={0}
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
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                        >
                            <BackButton title={post.author.pseudo + '\'s post'}/>

                            <View style={{...styles.content, marginTop: 60}}>
                                <View
                                    style={{...styles.bgWhite, borderBottomRightRadius: 0, borderBottomLeftRadius: 0}}>
                                    <Post data={post}/>
                                    <View style={styles.commentInputRow}>
                                        <TextInput
                                            style={{...styles.input, ...styles.inputArea, ...styles.commentInput}}
                                            placeholder={'Write a comment...'}
                                            multiline={true}
                                            placeholderTextColor="#8d8d8d"
                                            autoCapitalize="sentences"
                                            autoCorrect={true}
                                            returnKeyType="default"
                                            onChangeText={(comment) => setComment(comment)}
                                        />
                                        <IconButton
                                            icon="send"
                                            color="white"
                                            size={20}
                                            style={styles.commentBtn}
                                            onPress={() => handleSubmit()}
                                        />
                                    </View>
                                </View>

                                <View style={{...styles.comments}}>
                                    {
                                        post.comment.length === 0 ?
                                            <Subheading style={{marginBottom: 20}}>No comments yet</Subheading>
                                            :
                                            post.comment.map((comment: any, key: any) => (
                                                <View key={key} style={{position: 'relative'}}>
                                                    {
                                                        onlineUserId === comment.author._id &&
                                                        <TouchableOpacity style={styles.commentBtnDelete}
                                                                          onPress={() => deleteComment(comment._id)}>
                                                            <MaterialCommunityIcons name='close' size={15}
                                                                                    color='white'/>
                                                        </TouchableOpacity>
                                                    }
                                                    <Pressable
                                                        onPress={() => screenName !== 'Profile' || onlineUserId === comment.author._id ?
                                                            onlineUserId === comment.author._id ? navigation.navigate('Profile') : navigation.push('Profile') :
                                                            navigation.push('Profile', {userId: comment.author._id})}
                                                        style={styles.postAuthorData}
                                                    >
                                                        {
                                                            comment.author.profile_image !== null ?
                                                                <Image
                                                                    source={{uri: comment.author.profile_image.url}}
                                                                    style={{...stylesUser.avatar, ...styles.postAvatar}}/>
                                                                :
                                                                <Avatar.Text
                                                                    size={35}
                                                                    label={comment.author.pseudo.substr(0, 1).toUpperCase()}
                                                                    style={{...stylesUser.avatar, ...styles.postAvatar}}
                                                                    color={'#fff'}
                                                                />
                                                        }
                                                        <View>
                                                            <Text
                                                                style={styles.postAuthorName}>{comment.author.pseudo}</Text>
                                                            <Text style={styles.postDate}><TimeAgo
                                                                time={'2020-12-12T21:00:12.990Z'}/></Text>
                                                        </View>
                                                    </Pressable>
                                                    <View style={styles.postContent}>
                                                        <Text>{comment.comment}</Text>
                                                    </View>
                                                </View>
                                            ))
                                    }
                                </View>
                            </View>
                        </ScrollView>
                }
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

export default PostScreen
