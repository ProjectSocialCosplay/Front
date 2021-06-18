import React, {useCallback, useEffect, useState} from 'react'
import {SafeAreaView, Button, ActivityIndicator, RefreshControl, ScrollView, View} from 'react-native'
import {styles, stylesUser} from "../assets/Styles"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {fetchApi} from "../utils/fetchApi";
import NetInfo from "@react-native-community/netinfo";
import {useIsFocused} from "@react-navigation/native";
import {Errors} from "../components/Errors";
import {Post} from "../components/Post";
import {CreatePost} from "../components/createPost";
import {IconButton} from "react-native-paper";
import {SearchBar} from "../components/SearchBar";

const HomeScreen = ({navigation}: { navigation: any }) => {
    const [user, setUser] = useState({
        feed: []
    })
    const [errors, setErrors] = useState<string[]>([])
    const [isWait, setIsWait] = useState<boolean>(true)
    const [refreshing, setRefreshing] = React.useState(false)
    const isFocused = useIsFocused()

    const fetchData = async () => {
        setErrors([])
        const query = JSON.stringify({
            query: `query {
                    getAuthUser{
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
                    }
                }`
        })

        try {
            const response = await fetchApi(query)
            await AsyncStorage.setItem('onlineUser', JSON.stringify(response.getAuthUser))
            setUser(response.getAuthUser)
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

        await AsyncStorage.getItem('onlineUser').then((value => {
            if (value) {
                setUser({...user, feed: []})
                setUser(JSON.parse(value))
                setIsWait(false)
            }
        }))
    }

    useEffect(() => {
        fetchData()
    }, [isFocused])

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        setTimeout(() => {
            fetchData() && setRefreshing(false)
        }, 2000)
    }, [refreshing])

    const logOut = async () => {
        await AsyncStorage.removeItem('token')
        navigation.replace('AuthRoutes')
    }

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
                        <View style={{...styles.content}}>
                            <View style={{...stylesUser.friends, marginBottom: 0, zIndex: 1}}>
                                <View style={{flex: 6}}>
                                    <SearchBar/>
                                </View>
                                <View style={styles.flex}>
                                    <IconButton icon="logout-variant" style={styles.btnLogout} color="white"
                                                onPress={() => logOut()}/>
                                </View>
                            </View>
                            <CreatePost/>
                            {
                                user.feed.map((item, key) => (
                                    <Post data={item} key={key}/>
                                ))
                            }
                        </View>
                    </ScrollView>
            }
        </SafeAreaView>
    )
}

export default HomeScreen
