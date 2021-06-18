import {Image, Pressable, SafeAreaView, ScrollView, View} from "react-native";
import {styles, stylesUser} from "../../assets/Styles";
import React, {useEffect, useState} from "react";
import {BackButton} from "../../components/BackButton";
import {Avatar, Caption, IconButton, Subheading, Title} from "react-native-paper";
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
            setSuccess('Unfollow successfully')
            const copyFollow = follow.filter(obj => {
                return obj._id !== id
            })
            setFollow(copyFollow)
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
                                                <Pressable
                                                    onPress={() => onlineUser._id === item.user._id ? navigation.push('Profile') : navigation.push('Profile', {'userId': item.user._id})}
                                                    style={{flex: 5}}>
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
                                                        (
                                                            onlineUser.following.find((f: { follower: { _id: string }, user: { _id: string } }) => {
                                                                return f.user._id === onlineUser._id && f.follower._id === item.follower._id
                                                            }) === undefined &&
                                                            <IconButton
                                                                icon="account-remove"
                                                                color="white"
                                                                size={20}
                                                                style={{
                                                                    ...stylesUser.followBtn,
                                                                    backgroundColor: '#f65a5a'
                                                                }}
                                                                onPress={async () => {
                                                                    if (route.params.name === 'following') {
                                                                        await handleRemoveFriend(item._id)
                                                                    } else {
                                                                        const removeFollow = onlineUser.following.find((f: { follower: { _id: string } }) => {
                                                                            return f.follower._id === item.user._id
                                                                        })

                                                                        if (removeFollow) {
                                                                            const {_id} = removeFollow;
                                                                            await handleRemoveFriend(_id)
                                                                        }
                                                                    }
                                                                }}
                                                            />)
                                                    }
                                                </View>
                                            </View> :
                                            <View key={key} style={stylesUser.friends}>
                                                <Pressable
                                                    onPress={() => onlineUser._id === item.follower._id ? navigation.push('Profile') : navigation.push('Profile', {'userId': item.follower._id})}
                                                    style={{flex: 5}}>
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
                                                        (
                                                            onlineUser.following.find((f: { user: { _id: string }, follower: { _id: string } }) => {
                                                                return f.user._id === onlineUser._id && f.follower._id === item.follower._id
                                                            }) !== undefined &&
                                                            <>
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
                                                            </>
                                                        )
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