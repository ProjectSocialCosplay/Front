import React, {useCallback, useEffect, useState} from 'react'
import {ActivityIndicator, Modal, Pressable, RefreshControl, SafeAreaView, ScrollView, Text, View} from 'react-native'
import {styles, stylesUser} from "../../assets/Styles"
import {fetchApi} from "../../utils/fetchApi"
import {FontAwesome5} from '@expo/vector-icons'
import {Avatar, Button, Subheading, Title} from 'react-native-paper'
import {Post} from "../../components/Post"
import {Errors} from "../../components/Errors"
import {BackButton} from "../../components/BackButton"
import AsyncStorage from "@react-native-async-storage/async-storage"
import NetInfo from '@react-native-community/netinfo'
import {useIsFocused} from '@react-navigation/native'
import {CreatePost} from "../../components/createPost";
import {Success} from "../../components/Success";
import ImageViewer from "react-native-image-zoom-viewer";

const ProfileScreen = ({route, navigation}: { route: any, navigation: any }) => {
    const [user, setUser] = useState({
        pseudo: ' ',
        bio: ' ',
        profile_image: {url: ' '},
        posts: [],
        followers: [],
        following: [],
    })
    const [errors, setErrors] = useState<string[]>([])
    const [success, setSuccess] = useState<string | null>(null)
    const [isWait, setIsWait] = useState<boolean>(true)
    const [refreshing, setRefreshing] = React.useState(false)
    const isFocused = useIsFocused()
    const [isFollow, setIsFollow] = useState<boolean>(false)
    const [followId, setFollowId] = useState<string>('')
    const [visible, setVisible] = useState<boolean>(false)
    const [image, setImage] = useState([{url: ''}])

    AsyncStorage.getItem('onlineUser').then(value => {
        if (value) {
            const onlineUser = JSON.parse(value)
            setIsFollow(user.followers.some((l: { user: { _id: string } }) => l.user._id === onlineUser._id))
            const followUser = user.followers.find((l: { user: { _id: string } }) => l.user._id === onlineUser._id);
            if (followUser) {
                const {_id} = followUser;
                setFollowId(_id)
            }
        }
    })

    const fetchData = async () => {
        setErrors([])
        let request

        if (route.params?.userId) {
            request = `user(id: "${route.params?.userId}"){`
        } else {
            request = 'getAuthUser{'
        }

        const query = JSON.stringify({
            query: `query {
                    ${request}
                        _id
                        pseudo
                        bio
                        profile_image{
                            url
                        }
                        posts{
                            _id
                            content
                            comment{
                                _id
                            }
                            likes{
                                author{
                                    _id
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
                        followers{
                            _id
                            user{
                                _id
                                pseudo
                                bio
                                profile_image{
                                    url
                                }
                            }
                            follower{
                                _id
                                pseudo
                                bio
                                profile_image{
                                    url
                                }
                            }
                        }
                        following{
                            _id
                            user{
                                _id
                                pseudo
                                bio
                                profile_image{
                                    url
                                }
                            }
                            follower{
                                _id
                                pseudo
                                bio
                                profile_image{
                                    url
                                }
                            }
                        }
                        feed{
                            _id
                            content
                            comment{
                                _id
                            }
                            likes{
                                author{
                                    _id
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
                    }
                }`
        })

        try {
            const response = await fetchApi(query)
            if (route.params?.userId) {
                setUser(response.user)
                setIsWait(false)
                user.profile_image !== null && setImage([{
                    url: user.profile_image.url,
                }])
            } else {
                await AsyncStorage.setItem('onlineUser', JSON.stringify(response.getAuthUser))
            }
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

        await AsyncStorage.getItem('onlineUser').then((value => {
            if (value !== null && !route.params?.userId) {
                let online = JSON.parse(value)
                setUser({...user, posts: []})
                setUser(online)
                setIsWait(false)
                online.profile_image !== null && setImage([{
                    url: online.profile_image.url,
                }])
            }
        }))
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true)

        setTimeout(() => {
            fetchData() && setRefreshing(false)
        }, 2000)
    }, [refreshing])

    useEffect(() => {
        fetchData()
    }, [isFocused])

    const handleAddFriend = async () => {
        const query = JSON.stringify(
            {
                query: `mutation{
                            createFollow(followerId: "${route.params?.userId}"){
                                _id
                            }
                        }`
            })

        try {
            await fetchApi(query)
            await fetchData()
            setSuccess('Follow successfully')
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

    const handleRemoveFriend = async (id: string) => {
        const query = JSON.stringify(
            {
                query: `mutation{
                            deleteFollow(id: "${id}"){
                                _id
                            }
                        }`
            })

        try {
            await fetchApi(query)
            await fetchData()
            setSuccess('Unfollow successfully')
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

    return (
        <>
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
                            {
                                route.params?.userId && <BackButton/>
                            }

                            <View style={stylesUser.avatarBorder}>
                                {
                                    user.profile_image !== null ?
                                        <Pressable onPress={() => setVisible(true)}>
                                            <Avatar.Image
                                                size={175}
                                                source={{uri: user.profile_image.url}}
                                                style={stylesUser.avatar}
                                            />
                                        </Pressable>
                                        :
                                        <Avatar.Text
                                            size={175}
                                            label={user.pseudo.substr(0, 1).toUpperCase()}
                                            style={stylesUser.avatar}
                                            color={'#fff'}
                                        />
                                }
                            </View>

                            <Text style={stylesUser.username}>{user.pseudo}</Text>
                            <View style={stylesUser.locate}>
                                <Text style={stylesUser.locatePin}>
                                    <FontAwesome5 name="map-marker-alt" size={15} color="black"/>
                                </Text>
                                <Text>Val-de-Marne (94)</Text>
                            </View>
                            {
                                user.bio &&
                                <Text style={stylesUser.bio}>
                                    {user.bio}
                                </Text>
                            }

                            <View style={{...styles.content, marginTop: 20}}>
                                {
                                    route.params?.userId ?
                                        (
                                            <View style={stylesUser.buttonActions}>
                                                {
                                                    !isFollow ?
                                                        <Button
                                                            mode="contained"
                                                            color={'#43ab89'}
                                                            dark={true}
                                                            icon={"account-plus"}
                                                            style={{
                                                                ...styles.button,
                                                                marginBottom: 20,
                                                                width: '60%',
                                                                marginHorizontal: '20%'
                                                            }}
                                                            contentStyle={styles.buttonContent}
                                                            onPress={async () => {
                                                                await handleAddFriend()
                                                            }}
                                                        >
                                                            Follow
                                                        </Button>
                                                        :
                                                        <Button
                                                            mode="contained"
                                                            color={'#f65a5a'}
                                                            dark={true}
                                                            icon={"account-remove"}
                                                            style={{
                                                                ...styles.button,
                                                                marginBottom: 20,
                                                                width: '60%',
                                                                marginHorizontal: '20%'
                                                            }}
                                                            contentStyle={styles.buttonContent}
                                                            onPress={async () => {
                                                                await handleRemoveFriend(followId)
                                                            }}
                                                        >
                                                            Unfollow
                                                        </Button>
                                                }
                                                {/*<Button
                                            mode="contained"
                                            color={'#3962d0'}
                                            style={{...styles.button, marginTop: 10, marginBottom: 20}}
                                            contentStyle={styles.buttonContent}
                                            onPress={() => {
                                                alert('TODO: Send message')
                                            }}
                                        >
                                            <MaterialCommunityIcons name="message-draw" size={20} color="white"/>

                                        </Button>
                                        <Button
                                            mode="contained"
                                            color={'#ee7f5e'}
                                            dark={true}
                                            style={{...styles.button, marginTop: 10, marginBottom: 20}}
                                            contentStyle={styles.buttonContent}
                                            onPress={() => {
                                                alert('TODO: Marketplace')
                                            }}
                                        >
                                            <MaterialCommunityIcons name="shopping" size={20} color="white"/>
                                        </Button>*/}
                                            </View>
                                        )
                                        :
                                        <Button
                                            mode="contained"
                                            color={'#273c75'}
                                            icon="account-edit"
                                            style={{...styles.button, marginTop: 10, marginBottom: 20}}
                                            contentStyle={styles.buttonContent}
                                            onPress={() => {
                                                navigation.navigate('Update profile')
                                            }}
                                        >
                                            Edit profile
                                        </Button>
                                }

                                <View style={stylesUser.subscribers}>
                                    <Pressable onPress={() => navigation.push('Follow', {
                                        username: user.pseudo,
                                        follow: user.followers,
                                        name: 'followers'
                                    })} style={{...styles.flex, alignItems: 'center'}}>
                                        <Subheading>Followers</Subheading>
                                        <Title>{user.followers !== null ? user.followers.length : '0'}</Title>
                                    </Pressable>
                                    <Pressable onPress={() => navigation.push('Follow', {
                                        username: user.pseudo,
                                        follow: user.following,
                                        name: 'following'
                                    })} style={{...styles.flex, alignItems: 'center'}}>
                                        <Subheading>Followings</Subheading>
                                        <Title>{user.following !== null ? user.following.length : '0'}</Title>
                                    </Pressable>
                                </View>

                                {
                                    !route.params?.userId && <CreatePost/>
                                }

                                {
                                    user.posts.map((el, index) => {
                                        return (
                                            <Post data={el} key={index}/>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                }
            </SafeAreaView>
            <Modal visible={visible} transparent={true}>
                <ImageViewer
                    imageUrls={image}
                    enableSwipeDown={true}
                    onSwipeDown={() => setVisible(false)}
                    renderIndicator={() => null}
                />
            </Modal>
        </>
    )
}

export default ProfileScreen
