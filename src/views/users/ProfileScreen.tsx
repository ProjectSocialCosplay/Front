import React, {useCallback, useEffect, useState} from 'react'
import {ActivityIndicator, Image, RefreshControl, SafeAreaView, ScrollView, Text, View} from 'react-native'
import {styles, stylesUser} from "../../assets/Styles"
import {fetchApi} from "../../utils/fetchApi"
import {FontAwesome5} from '@expo/vector-icons'
import {Avatar, Title, Caption, Button} from 'react-native-paper'
import {Post} from "../../components/Post"
import {Errors} from "../../components/Errors"
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {BackButton} from "../../components/BackButton"
import AsyncStorage from "@react-native-async-storage/async-storage"
import NetInfo from '@react-native-community/netinfo'
import {useIsFocused} from '@react-navigation/native'

const ProfileScreen = ({route, navigation}: { route: any, navigation: any }) => {
    const [user, setUser] = useState({pseudo: ' ', bio: ' ', profile_image: {url: ' '}, posts: []})
    const [errors, setErrors] = useState<string[]>([])
    const [isWait, setIsWait] = useState<boolean>(true)
    const [refreshing, setRefreshing] = React.useState(false)
    const isFocused = useIsFocused()

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

    return (
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
                                    <View style={stylesUser.buttonActions}>
                                        <Button
                                            mode="contained"
                                            color={'#43ab89'}
                                            dark={true}
                                            icon={"account-plus"}
                                            style={{...styles.button, marginTop: 10, marginBottom: 20}}
                                            contentStyle={styles.buttonContent}
                                            onPress={() => {
                                                alert('TODO: Add friend')
                                            }}
                                        >
                                            Invite
                                        </Button>
                                        <Button
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
                                        </Button>
                                    </View>
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

                            <Title>Friends <Caption>(39)</Caption></Title>
                            <View style={stylesUser.friends}>
                                <View style={stylesUser.oneFriend}>
                                    <Avatar.Text
                                        size={55}
                                        label={'B'}
                                        style={{...stylesUser.avatar, ...stylesUser.friendAvatar}}
                                        color={'#fff'}
                                    />
                                </View>
                                <View style={stylesUser.oneFriend}>
                                    <Image
                                        source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Wikipe-tan_%28Cosplay%29.jpg'}}
                                        style={{...stylesUser.avatar, ...stylesUser.friendAvatar}}/>
                                    {/*<Avatar.Image
                                        size={55}
                                        source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Wikipe-tan_%28Cosplay%29.jpg'}}
                                        style={stylesUser.avatarImage}
                                    />*/}
                                </View>
                                <View style={stylesUser.oneFriend}>
                                    <Image
                                        source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Sailor_Moon_cosplayer_at_FanimeCon_2010-05-30_3.JPG/1200px-Sailor_Moon_cosplayer_at_FanimeCon_2010-05-30_3.JPG'}}
                                        style={{...stylesUser.avatar, ...stylesUser.friendAvatar}}/>
                                    {/*<Avatar.Image
                                        size={55}
                                        source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Sailor_Moon_cosplayer_at_FanimeCon_2010-05-30_3.JPG/1200px-Sailor_Moon_cosplayer_at_FanimeCon_2010-05-30_3.JPG'}}
                                        style={stylesUser.avatarImage}
                                    />*/}
                                </View>
                                <View style={stylesUser.oneFriend}>
                                    <Avatar.Text
                                        size={55}
                                        label={'J'}
                                        style={{...stylesUser.avatar, ...stylesUser.friendAvatar}}
                                        color={'#fff'}
                                    />
                                </View>
                                <View style={stylesUser.oneFriend}>
                                    <Avatar.Text
                                        size={55}
                                        label={'K'}
                                        style={{...stylesUser.avatar, ...stylesUser.friendAvatar}}
                                        color={'#fff'}
                                    />
                                </View>
                                <View style={stylesUser.oneFriend}>
                                    <Image
                                        source={{uri: 'https://miro.medium.com/max/1800/1*vPOdflWxL49SryDJivPdSg.jpeg'}}
                                        style={{...stylesUser.avatar, ...stylesUser.friendAvatar}}/>
                                    {/*<Avatar.Image
                                        size={55}
                                        source={{uri: 'https://miro.medium.com/max/1800/1*vPOdflWxL49SryDJivPdSg.jpeg'}}
                                        style={stylesUser.avatarImage}
                                    />*/}
                                </View>
                                <View style={stylesUser.oneFriend}>
                                    <Avatar.Text
                                        size={55}
                                        label={'A'}
                                        style={{...stylesUser.avatar, ...stylesUser.friendAvatar}}
                                        color={'#fff'}
                                    />
                                </View>
                                <View style={stylesUser.oneFriend}>
                                    <Image
                                        source={{uri: 'https://images.pexels.com/photos/65767/pexels-photo-65767.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'}}
                                        style={{...stylesUser.avatar, ...stylesUser.friendAvatar}}/>
                                    {/*<Avatar.Image
                                        size={55}
                                        source={{uri: 'https://images.pexels.com/photos/65767/pexels-photo-65767.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'}}
                                        style={stylesUser.avatarImage}
                                    />*/}
                                </View>
                                <View style={stylesUser.oneFriend}>
                                    <Avatar.Text
                                        size={55}
                                        label={'S'}
                                        style={{...stylesUser.avatar, ...stylesUser.friendAvatar}}
                                        color={'#fff'}
                                    />
                                </View>
                                <View style={stylesUser.oneFriend}>
                                    <Image
                                        source={{uri: 'https://d2txbs86cmgocx.cloudfront.net/posts/70663508dfd5b9520434dab6e261e1d0c20781bd_large.jpg?1517932005'}}
                                        style={{...stylesUser.avatar, ...stylesUser.friendAvatar}}/>
                                    {/* <Avatar.Image
                                        size={55}
                                        source={{uri: 'https://d2txbs86cmgocx.cloudfront.net/posts/70663508dfd5b9520434dab6e261e1d0c20781bd_large.jpg?1517932005'}}
                                        style={stylesUser.avatarImage}
                                    />*/}
                                </View>
                            </View>

                            <Button
                                mode="outlined"
                                style={{...styles.button, marginTop: 10, marginBottom: 20}}
                                contentStyle={styles.buttonContent}
                                color={'#5d6d80'}
                                onPress={() => {
                                    alert('TODO: Show all friends')
                                }}
                            >
                                Show all
                            </Button>

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
