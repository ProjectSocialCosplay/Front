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
import {useIsFocused} from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import {Errors} from "../components/Errors"
import {BackButton} from "../components/BackButton"
import {fetchApi} from "../utils/fetchApi"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {Success} from "../components/Success"
import NetInfo from "@react-native-community/netinfo";

const PostScreen = ({route, navigation}: { route: any, navigation: any }) => {
    const [post, setPost] = useState({
        _id: '',
        author: {_id: '', pseudo: '', profile_image: {url: ''}},
        comment: [],
        likes: [],
        updatedAt: Date.now()
    })
    const [comment, setComment] = useState<string>()
    const [isWait, setIsWait] = useState<boolean>(true)
    const [errors, setErrors] = useState<string[]>([])
    const [success, setSuccess] = useState<string | null>(null)
    const [refreshing, setRefreshing] = React.useState(false)
    const [onlineUserId, setOnlineUserId] = useState<string>()
    const isFocused = useIsFocused()

    const onRefresh = useCallback(async () => {
        setRefreshing(true)

        setTimeout(() => {
            fetchData() && setRefreshing(false)
        }, 2000)
    }, [])

    const fetchData = async () => {
        setErrors([])
        const query = JSON.stringify({
            query: `query{
                        getPost(id: "${route.params.post}"){
                            _id
                            content
                            comment{
                                _id
                                createdAt
                                comment
                                author{
                                    _id
                                    pseudo
                                    profile_image{
                                        url
                                    }
                                }
                            }
                            likes{
                                author{
                                    _id
                                    pseudo
                                    profile_image{
                                        url
                                    }
                                }
                            }
                            author{
                                _id
                                pseudo
                                profile_image{
                                    url
                                }
                            }
                            updatedAt 
                        }
                    }`
        })

        try {
            const response = await fetchApi(query)
            setPost(response.getPost[0])
            setIsWait(false)
        } catch (e) {
            if (e.errors) {
                setErrors([e.errors])
            } else {
                NetInfo.fetch().then(state => {
                    if (!state.isConnected) {
                        setErrors(['No internet connection, please check your settings'])
                    } else {
                        setErrors(['An error has been encountered, please try again'])
                    }
                })
            }
        }
    }

    useEffect(() => {
        AsyncStorage.getItem('onlineUser').then(value => {
            setOnlineUserId(value ? JSON.parse(value)._id : '')
        })
        fetchData()
    }, [isFocused])

    const handleSubmit = async () => {
        if (comment) {
            setErrors([])
            let lineBreaking = comment.replace(/[\n\r]/g, '\\n')
            let query = JSON.stringify({
                query: `mutation{
                createComment(comment: "${lineBreaking}", postId: "${post._id}"){
                    _id
                }
            }`
            })

            try {
                await fetchApi(query)
                setComment('')
                await fetchData()
            } catch (e) {
                if (e.errors) {
                    setErrors([e.errors])
                } else {
                    setErrors(['An error has been encountered, please try again '])
                }
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
            await fetchApi(query)
            setSuccess('Comment successfully deleted')
            await fetchData()
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
            scrollEventThrottle={16}
            extraHeight={80}
            scrollEnabled={false}
            enableOnAndroid={true}
        >
            <SafeAreaView style={styles.container}>
                <Errors errors={errors}/>
                <Success success={success}/>
                {
                    /*TODO: Suppression du post */
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
                                <Post data={post}/>
                                <View
                                    style={{...styles.commentBox}}>
                                    <View style={styles.commentInputRow}>
                                        <TextInput
                                            style={{...styles.input, ...styles.inputArea, ...styles.commentInput}}
                                            placeholder={'Write a comment...'}
                                            value={comment}
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
                                                        onPress={() => {
                                                            comment.author._id !== onlineUserId && navigation.push('Profile', {userId: comment.author._id})
                                                        }}
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
                                                                time={comment.createdAt}/></Text>
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
