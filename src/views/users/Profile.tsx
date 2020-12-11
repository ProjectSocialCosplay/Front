import React, {useEffect, useState} from 'react'
import {ActivityIndicator, SafeAreaView, ScrollView, Text, View} from 'react-native'
import {styles, stylesUser} from "../../assets/Styles"
import {fetchApi} from "../../utils/fetchApi"
import {FontAwesome5} from '@expo/vector-icons'
import {Avatar, Title, Caption, Button} from 'react-native-paper'
import {Post} from "../../components/Post"
import {Errors} from "../../components/Errors";

const Profile = ({route, navigation}: { route: any, navigation: any }) => {
    const [user, setUser] = useState({
        pseudo: '',
        bio: '',
        profile_image_url: {
            Url: '',
        },
        posts: [],
    })
    const [errors, setErrors] = useState<string[] | null>(null)
    const [isWait, setIsWait] = useState<boolean>(true)

    useEffect(() => {
        return navigation.addListener('focus', async () => {
            setErrors([])
            setIsWait(true)
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
                        profile_image_url{
                            Url
                        }
                        posts{
                            _id
                            content
                            comment{
                                _id
                            }
                            author{
                                pseudo
                                profile_image_url{
                                    Url
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
                } else {
                    setUser(response.getAuthUser)
                }
                setIsWait(false)
            } catch (e) {
                if (e.errors) {
                    setErrors([e.errors])
                } else {
                    setErrors(['An error has been encountered, please try again'])
                }
            }
        })
    }, [navigation])

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
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={stylesUser.avatarBorder}>
                            {
                                user.profile_image_url.Url ?
                                    <Avatar.Image
                                        size={175}
                                        source={{uri: user.profile_image_url.Url}}
                                        style={stylesUser.avatarImage}
                                    />
                                    :
                                    <Avatar.Text
                                        size={175}
                                        label={user.pseudo.substr(0, 1).toUpperCase()}
                                        style={stylesUser.avatarImage}
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
                                            icon="account-plus"
                                            style={{...styles.button, marginBottom: 20}}
                                            onPress={() => {
                                                alert('TODO: Add friend')
                                            }}
                                        >
                                            Add friend
                                        </Button>
                                        <Button
                                            mode="contained"
                                            color={'#5977c6'}
                                            icon="message-draw"
                                            style={{...styles.button, marginBottom: 20}}
                                            onPress={() => {
                                                alert('TODO: Send message')
                                            }}
                                        >
                                            Message
                                        </Button>
                                    </View>
                                    :
                                    <Button
                                        mode="contained"
                                        color={'#273c75'}
                                        icon="account-edit"
                                        style={{...styles.button, marginBottom: 20}}
                                        onPress={() => {
                                            alert('TODO: Edit profile')
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
                                        style={stylesUser.avatarImage}
                                        color={'#fff'}
                                    />
                                </View>
                                <View style={stylesUser.oneFriend}>
                                    <Avatar.Image
                                        size={55}
                                        source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Wikipe-tan_%28Cosplay%29.jpg'}}
                                        style={stylesUser.avatarImage}
                                    />
                                </View>
                                <View style={stylesUser.oneFriend}>
                                    <Avatar.Image
                                        size={55}
                                        source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Sailor_Moon_cosplayer_at_FanimeCon_2010-05-30_3.JPG/1200px-Sailor_Moon_cosplayer_at_FanimeCon_2010-05-30_3.JPG'}}
                                        style={stylesUser.avatarImage}
                                    />
                                </View>
                                <View style={stylesUser.oneFriend}>
                                    <Avatar.Text
                                        size={55}
                                        label={'J'}
                                        style={stylesUser.avatarImage}
                                        color={'#fff'}
                                    />
                                </View>
                                <View style={stylesUser.oneFriend}>
                                    <Avatar.Text
                                        size={55}
                                        label={'K'}
                                        style={stylesUser.avatarImage}
                                        color={'#fff'}
                                    />
                                </View>
                                <View style={stylesUser.oneFriend}>
                                    <Avatar.Image
                                        size={55}
                                        source={{uri: 'https://miro.medium.com/max/1800/1*vPOdflWxL49SryDJivPdSg.jpeg'}}
                                        style={stylesUser.avatarImage}
                                    />
                                </View>
                                <View style={stylesUser.oneFriend}>
                                    <Avatar.Text
                                        size={55}
                                        label={'A'}
                                        style={stylesUser.avatarImage}
                                        color={'#fff'}
                                    />
                                </View>
                                <View style={stylesUser.oneFriend}>
                                    <Avatar.Image
                                        size={55}
                                        source={{uri: 'https://images.pexels.com/photos/65767/pexels-photo-65767.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'}}
                                        style={stylesUser.avatarImage}
                                    />
                                </View>
                                <View style={stylesUser.oneFriend}>
                                    <Avatar.Text
                                        size={55}
                                        label={'S'}
                                        style={stylesUser.avatarImage}
                                        color={'#fff'}
                                    />
                                </View>
                                <View style={stylesUser.oneFriend}>
                                    <Avatar.Image
                                        size={55}
                                        source={{uri: 'https://d2txbs86cmgocx.cloudfront.net/posts/70663508dfd5b9520434dab6e261e1d0c20781bd_large.jpg?1517932005'}}
                                        style={stylesUser.avatarImage}
                                    />
                                </View>
                            </View>

                            <Button
                                mode="outlined"
                                style={{...styles.button, marginBottom: 20}}
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
                                        <Post post={el} key={index}/>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
            }
        </SafeAreaView>
    )
}

export default Profile
