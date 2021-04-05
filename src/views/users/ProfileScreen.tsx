import React, {useCallback, useEffect, useState} from 'react'
import {ActivityIndicator, Image, Pressable, RefreshControl, SafeAreaView, ScrollView, Text, View} from 'react-native'
import {styles, stylesUser} from "../../assets/Styles"
import {fetchApi} from "../../utils/fetchApi"
import {FontAwesome5} from '@expo/vector-icons'
import {Avatar, Title, Caption, Button, Subheading} from 'react-native-paper'
import {Post} from "../../components/Post"
import {Errors} from "../../components/Errors"
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {BackButton} from "../../components/BackButton"
import AsyncStorage from "@react-native-async-storage/async-storage"
import NetInfo from '@react-native-community/netinfo'
import {useIsFocused} from '@react-navigation/native'
import {CreatePost} from "../../components/createPost";
import {Success} from "../../components/Success";

const ProfileScreen = ({route, navigation}: { route: any, navigation: any }) => {
    const [user, setUser] = useState({
        pseudo: ' ',
        bio: ' ',
        profile_image: {url: ' '},
        posts: [],
        followers: [],
        following: []
    })
    const [errors, setErrors] = useState<string[]>([])
    const [success, setSuccess] = useState<string | null>(null)
    const [isWait, setIsWait] = useState<boolean>(true)
    const [refreshing, setRefreshing] = React.useState(false)
    const isFocused = useIsFocused()
    const [isFollow, setIsFollow] = useState<boolean>(false)

    AsyncStorage.getItem('onlineUser').then(value => {
        if(value){
            const onlineUser = JSON.parse(value)
            setIsFollow(user.following.some((l: { follower: { _id: string } }) => l.follower._id === onlineUser._id))
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
                            follower{
                                _id
                                pseudo
                                bio
                                profile_image{
                                    url
                                }
                            }
                        }
                    }
                }`
        })

        try {
            const response = await fetchApi(query)
            if (route.params?.userId) {
                setUser(response.user)
                setIsWait(false)
            } else {
                await AsyncStorage.setItem('user', JSON.stringify(response.getAuthUser))
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

        await AsyncStorage.getItem('user').then((value => {
            if (value !== null && !route.params?.userId) {
                setUser({...user, posts: []})
                setUser(JSON.parse(value))
                setIsWait(false)
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
            const response = await fetchApi(query)
            console.log(route.params?.userId)
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

    const handleRemoveFriend = async () => {

    }

    return (
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
                                                        onPress={() => {
                                                            handleAddFriend()
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
                                                        onPress={() => {
                                                            handleRemoveFriend()
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
                                <View style={{...styles.flex, marginRight: 15}}>
                                    <Title>Followers <Caption>({user.followers !== null ? user.followers.length : '0'})</Caption></Title>
                                    {
                                        user.followers.length > 0 ?
                                            <View style={stylesUser.friends}>
                                                {
                                                    user.followers.slice(0, 3).map((item: { follower: { _id: string, pseudo: string, profile_image: { url: string } | null } }, key) => (
                                                        <Pressable key={key} onPress={() => navigation.push('Profile', {userId: item.follower._id})}>
                                                            {
                                                                item.follower.profile_image !== null ?
                                                                    <View style={stylesUser.oneFriend}>
                                                                        <Image
                                                                            source={{uri: item.follower.profile_image.url}}
                                                                            style={{...stylesUser.avatar, ...stylesUser.friendAvatar}}/>
                                                                    </View>
                                                                    :
                                                                    <View style={stylesUser.oneFriend}>
                                                                        <Avatar.Text
                                                                            size={55}
                                                                            label={item.follower.pseudo.charAt(0).toUpperCase()}
                                                                            style={{...stylesUser.avatar, ...stylesUser.friendAvatar}}
                                                                            color={'#fff'}
                                                                        />
                                                                    </View>
                                                            }
                                                        </Pressable>
                                                    ))
                                                }
                                            </View>
                                            :
                                            <Subheading>No followers</Subheading>
                                    }
                                    <Button
                                        mode="outlined"
                                        style={{...styles.button, ...stylesUser.btnSubscribers}}
                                        contentStyle={styles.buttonContent}
                                        color={'#5d6d80'}
                                        onPress={() => navigation.push('Follow', {username: user.pseudo, follow: user.followers, name: 'followers'})}
                                    >
                                        Show all
                                    </Button>
                                </View>
                                <View style={{...styles.flex, marginLeft: 15}}>
                                    <Title
                                        style={{textAlign: 'right'}}>Followings <Caption>({user.following !== null ? user.following.length : '0'})</Caption></Title>
                                    {
                                        user.following.length > 0 ?
                                            <View style={{...stylesUser.friends, alignSelf: 'flex-end'}}>
                                                {
                                                    user.following.slice(0, 3).map((item: { follower: { _id: string, pseudo: string, profile_image: { url: string } | null } }, key) => (
                                                        <Pressable key={key} onPress={() => navigation.push('Profile', {userId: item.follower._id})}>
                                                            {
                                                                item.follower.profile_image !== null ?
                                                                    <View style={stylesUser.oneFriend}>
                                                                        <Image
                                                                            source={{uri: item.follower.profile_image.url}}
                                                                            style={{...stylesUser.avatar, ...stylesUser.friendAvatar}}/>
                                                                    </View>
                                                                    :
                                                                    <View style={stylesUser.oneFriend}>
                                                                        <Avatar.Text
                                                                            size={55}
                                                                            label={item.follower.pseudo.charAt(0).toUpperCase()}
                                                                            style={{...stylesUser.avatar, ...stylesUser.friendAvatar}}
                                                                            color={'#fff'}
                                                                        />
                                                                    </View>
                                                            }
                                                        </Pressable>
                                                    ))
                                                }
                                            </View>
                                            :
                                            <Subheading style={{textAlign: 'right'}}>No followings</Subheading>
                                    }
                                    <Button
                                        mode="outlined"
                                        style={{...styles.button, ...stylesUser.btnSubscribers}}
                                        contentStyle={styles.buttonContent}
                                        color={'#5d6d80'}
                                        onPress={() => navigation.push('Follow', {username: user.pseudo, follow: user.following, name: 'followings'})}
                                    >
                                        Show all
                                    </Button>
                                </View>
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
    )
}

export default ProfileScreen
