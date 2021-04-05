import {Image, Pressable, SafeAreaView, ScrollView, View} from "react-native";
import {styles, stylesUser} from "../../assets/Styles";
import React, {useEffect, useState} from "react";
import {BackButton} from "../../components/BackButton";
import {Subheading, Title, Avatar, Caption, IconButton} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {fetchApi} from "../../utils/fetchApi";
import NetInfo from "@react-native-community/netinfo";
import {Errors} from "../../components/Errors";
import {Success} from "../../components/Success";
import {useIsFocused} from "@react-navigation/native";

const FollowScreen = ({route, navigation}: { route: any, navigation: any }) => {
    const [onlineUser, setOnlineUser] = useState({
        _id: '',
        following: [],
    })
    const [errors, setErrors] = useState<string[]>([])
    const [success, setSuccess] = useState<string | null>(null)
    const [follow, setFollow] = useState<object[]>([])
    const isFocused = useIsFocused()

    useEffect(() => {
        AsyncStorage.getItem('onlineUser').then(value => {
            if (value) {
                setOnlineUser(JSON.parse(value))
            }
        })
        setFollow(route.params.follow)
    }, [isFocused])

    const updateList = async () => {
        let request = route.params.name === 'followers' ? 'followers' : 'following'
        const query = JSON.stringify({
            query: `query {
                    getAuthUser{
                        ${request}{
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
                    }
                }`
        })

        try {
            const response = await fetchApi(query)
            route.params.name === 'followers' ? setFollow(response.getAuthUser.followers) : setFollow(response.getAuthUser.following)
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

    const handleAddFriend = async (id: string) => {
        const query = JSON.stringify(
            {
                query: `mutation{
                            createFollow(followerId: "${id}"){
                                _id
                            }
                        }`
            })

        try {
            await fetchApi(query)
            await updateList()
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
            await updateList()
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
        <SafeAreaView style={styles.container}>
            <Errors errors={errors}/>
            <Success success={success}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <BackButton title={route.params.username + '\'s ' + route.params.name}/>
                <View style={{...styles.content, marginTop: 60}}>
                    {
                        follow.length === 0 ?
                            <>
                                <Title>This user has no {route.params.name} yet</Title>
                                <Subheading>When he has them you will see them here</Subheading>
                            </>
                            :
                            <>
                                {
                                    follow.map((item: any, key: any) => (
                                        route.params.name === 'followers' ?
                                            <View key={key} style={stylesUser.friends}>
                                                <Pressable onPress={() => navigation.push('Profile', {'userId': item.user._id})} style={{flex: 5}}>
                                                    <View style={stylesUser.friends}>
                                                        <View style={styles.flex}>
                                                            {
                                                                item.user.profile_image !== null ?
                                                                    <View style={stylesUser.oneFriend}>
                                                                        <Image
                                                                            source={{uri: item.user.profile_image.url}}
                                                                            style={{...stylesUser.avatar, ...stylesUser.followAvatar}}/>
                                                                    </View>
                                                                    :
                                                                    <View style={stylesUser.oneFriend}>
                                                                        <Avatar.Text
                                                                            size={55}
                                                                            label={item.user.pseudo.charAt(0).toUpperCase()}
                                                                            style={{...stylesUser.avatar, ...stylesUser.followAvatar}}
                                                                            color={'#fff'}
                                                                        />
                                                                    </View>
                                                            }
                                                        </View>
                                                        <View style={{flex: 2, position: 'relative'}}>
                                                            <View style={stylesUser.followInfo}>
                                                                <Title>{item.user.pseudo}</Title>
                                                                <Caption
                                                                    style={{marginTop: -5}}>{item.user.bio && item.user.bio && item.user.bio.substring(0, 50) + (item.user.bio.length > 50 && '...')}</Caption>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </Pressable>
                                                <View style={{...styles.flex}}>
                                                    {
                                                        onlineUser.following.some((l: { follower: { _id: string } }) => l.follower._id === item.user._id) ?
                                                            <IconButton
                                                                icon="account-plus"
                                                                color="white"
                                                                size={20}
                                                                style={{
                                                                    ...stylesUser.followBtn,
                                                                    backgroundColor: '#43ab89'
                                                                }}
                                                                onPress={() => handleAddFriend(item.user._id)}
                                                            /> :
                                                            <IconButton
                                                                icon="account-remove"
                                                                color="white"
                                                                size={20}
                                                                style={{
                                                                    ...stylesUser.followBtn,
                                                                    backgroundColor: '#f65a5a'
                                                                }}
                                                                onPress={async () => {
                                                                    await handleRemoveFriend(item._id)
                                                                }}
                                                            />
                                                    }
                                                </View>
                                            </View> :
                                            <View key={key} style={stylesUser.friends}>
                                                <Pressable onPress={() => navigation.push('Profile', {'userId': item.follower._id})} style={{flex: 5}}>
                                                    <View style={stylesUser.friends}>
                                                        <View style={styles.flex}>
                                                            {
                                                                item.follower.profile_image !== null ?
                                                                    <View style={stylesUser.oneFriend}>
                                                                        <Image
                                                                            source={{uri: item.follower.profile_image.url}}
                                                                            style={{...stylesUser.avatar, ...stylesUser.followAvatar}}/>
                                                                    </View>
                                                                    :
                                                                    <View style={stylesUser.oneFriend}>
                                                                        <Avatar.Text
                                                                            size={55}
                                                                            label={item.follower.pseudo.charAt(0).toUpperCase()}
                                                                            style={{...stylesUser.avatar, ...stylesUser.followAvatar}}
                                                                            color={'#fff'}
                                                                        />
                                                                    </View>
                                                            }
                                                        </View>
                                                        <View style={{flex: 2, position: 'relative'}}>
                                                            <View style={stylesUser.followInfo}>
                                                                <Title>{item.follower.pseudo}</Title>
                                                                <Caption
                                                                    style={{marginTop: -5}}>{item.follower.bio && item.follower.bio.substring(0, 50) + (item.follower.bio.length > 50 && '...')}</Caption>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </Pressable>
                                                <View style={{...styles.flex}}>
                                                    {
                                                        onlineUser.following.some((l: { follower: { _id: string } }) => l.follower._id === item.follower._id) ?
                                                            <IconButton
                                                                icon="account-plus"
                                                                color="white"
                                                                size={20}
                                                                style={{
                                                                    ...stylesUser.followBtn,
                                                                    backgroundColor: '#43ab89'
                                                                }}
                                                                onPress={() => handleAddFriend(item.follower._id)}
                                                            /> :
                                                            <IconButton
                                                                icon="account-remove"
                                                                color="white"
                                                                size={20}
                                                                style={{
                                                                    ...stylesUser.followBtn,
                                                                    backgroundColor: '#f65a5a'
                                                                }}
                                                                onPress={async () => {
                                                                    await handleRemoveFriend(item._id)
                                                                }}
                                                            />
                                                    }
                                                </View>
                                            </View>
                                    ))
                                }
                            </>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default FollowScreen