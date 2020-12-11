import React, {useEffect, useState} from 'react'
import {ActivityIndicator, SafeAreaView, ScrollView, Text, View} from 'react-native'
import {styles, stylesUser} from "../../assets/Styles"
import {fetchApi} from "../../utils/fetchApi"
import {FontAwesome5} from '@expo/vector-icons'
import {Avatar} from 'react-native-paper'
import {Post} from "../../components/Post"

const Profile = ({navigation}: { navigation: any }) => {
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
            const query = JSON.stringify({
                query: `query {
                    getAuthUser{
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
                setUser(response.getAuthUser)
                setIsWait(false)
            } catch (e) {
                if (e.errors) {
                    setErrors([e.errors])
                } else {
                    setErrors(['An error has been encountered, please try again '])
                }
            }
        })
    }, [navigation])

    return (
        <SafeAreaView style={styles.container}>
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

                        <View style={{...styles.content, marginTop: 10}}>
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
