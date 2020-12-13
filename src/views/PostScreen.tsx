import React, {useCallback, useEffect, useState} from 'react'
import {
    Text,
    SafeAreaView,
    View,
    Pressable,
    TextInput,
    Image,
    Keyboard,
    RefreshControl,
    ScrollView,
    ActivityIndicator
} from 'react-native'
import {styles, stylesUser} from "../assets/Styles"
import {Post} from "../components/Post"
import {Avatar, IconButton} from 'react-native-paper'
import {TimeAgo} from "../components/TimeAgo"
import {useNavigationState} from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import {Errors} from "../components/Errors";

const PostScreen = ({route, navigation}: { route: any, navigation: any }) => {
    const [post, setPost] = useState(route.params.post)
    const [isWait, setIsWait] = useState<boolean>(true)
    const [errors, setErrors] = useState<string[] | null>(null)
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
        return navigation.addListener('focus', () => setTimeout(() => {
            setIsWait(false)
        }, 500))
    }, [navigation])

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
                            <View style={{...styles.content, marginTop: 20}}>
                                <View
                                    style={{...styles.bgWhite, borderBottomRightRadius: 0, borderBottomLeftRadius: 0}}>
                                    <Post data={post}/>
                                    <View style={styles.commentInputRow}>
                                        <TextInput
                                            style={{...styles.input, ...styles.inputArea, ...styles.commentInput}}
                                            placeholder={'Write a comment...'}
                                            multiline={true}
                                            placeholderTextColor="#8d8d8d"
                                            autoCapitalize="none"
                                            autoCorrect={true}
                                            returnKeyType="done"
                                            onSubmitEditing={() => Keyboard.dismiss()}
                                        />
                                        <IconButton
                                            icon="send"
                                            color="white"
                                            size={20}
                                            style={styles.commentBtn}
                                            onPress={() => console.log('Pressed')}
                                        />
                                    </View>
                                </View>

                                <View style={{...styles.comments}}>
                                    <View>
                                        <View style={styles.postAuthorData}>
                                            <Pressable
                                                onPress={() => navigation.push('Profile', {userId: post.author._id})}>
                                                {
                                                    post.author.profile_image_url.Url !== null ?
                                                        <Image source={{uri: post.author.profile_image_url.Url}}
                                                               style={{...stylesUser.avatar, ...styles.postAvatar}}/>
                                                        :
                                                        <Avatar.Text
                                                            size={35}
                                                            label={post.author.pseudo.substr(0, 1).toUpperCase()}
                                                            style={{...stylesUser.avatar, ...styles.postAvatar}}
                                                            color={'#fff'}
                                                        />
                                                }
                                            </Pressable>
                                            <View>
                                                <Pressable
                                                    onPress={() => navigation.push('Profile', {userId: post.author._id})}>
                                                    <Text style={styles.postAuthorName}>{post.author.pseudo}</Text>
                                                </Pressable>
                                                <Text style={styles.postDate}><TimeAgo
                                                    time={'2020-12-12T21:00:12.990Z'}/></Text>
                                            </View>
                                        </View>
                                        <View style={styles.postContent}>
                                            <Text>First comment on your post !</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={styles.postAuthorData}>
                                            <Pressable
                                                onPress={() =>
                                                    screenName !== 'Profile' || onlineUserId === post.author._id ?
                                                        navigation.push('Profile') :
                                                        navigation.push('Profile', {userId: post.author._id})
                                                }
                                            >
                                                {
                                                    post.author.profile_image_url.Url !== null ?
                                                        <Image source={{uri: post.author.profile_image_url.Url}}
                                                               style={{...stylesUser.avatar, ...styles.postAvatar}}/>
                                                        :
                                                        <Avatar.Text
                                                            size={35}
                                                            label={post.author.pseudo.substr(0, 1).toUpperCase()}
                                                            style={{...stylesUser.avatar, ...styles.postAvatar}}
                                                            color={'#fff'}
                                                        />
                                                }
                                            </Pressable>
                                            <View>
                                                <Pressable
                                                    onPress={() =>
                                                        screenName !== 'Profile' || onlineUserId === post.author._id ?
                                                            navigation.push('Profile') :
                                                            navigation.push('Profile', {userId: post.author._id})
                                                    }
                                                >
                                                    <Text style={styles.postAuthorName}>{post.author.pseudo}</Text>
                                                </Pressable>
                                                <Text style={styles.postDate}><TimeAgo
                                                    time={'2020-12-12T21:05:12.990Z'}/></Text>
                                            </View>
                                        </View>
                                        <View style={styles.postContent}>
                                            <Text>Oh no ! I'm the second comment... It's so bad :(</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={styles.postAuthorData}>
                                            <Pressable
                                                onPress={() =>
                                                    screenName !== 'Profile' || onlineUserId === post.author._id ?
                                                        navigation.push('Profile') :
                                                        navigation.push('Profile', {userId: post.author._id})
                                                }
                                            >
                                                {
                                                    post.author.profile_image_url.Url !== null ?
                                                        <Image source={{uri: post.author.profile_image_url.Url}}
                                                               style={{...stylesUser.avatar, ...styles.postAvatar}}/>
                                                        :
                                                        <Avatar.Text
                                                            size={35}
                                                            label={post.author.pseudo.substr(0, 1).toUpperCase()}
                                                            style={{...stylesUser.avatar, ...styles.postAvatar}}
                                                            color={'#fff'}
                                                        />
                                                }
                                            </Pressable>
                                            <View>
                                                <Pressable
                                                    onPress={() =>
                                                        screenName !== 'Profile' || onlineUserId === post.author._id ?
                                                            navigation.push('Profile') :
                                                            navigation.push('Profile', {userId: post.author._id})
                                                    }
                                                >
                                                    <Text style={styles.postAuthorName}>{post.author.pseudo}</Text>
                                                </Pressable>
                                                <Text style={styles.postDate}><TimeAgo
                                                    time={'2020-12-12T21:05:12.990Z'}/></Text>
                                            </View>
                                        </View>
                                        <View style={styles.postContent}>
                                            <Text>Oh no ! I'm the second comment... It's so bad :(</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={styles.postAuthorData}>
                                            <Pressable
                                                onPress={() =>
                                                    screenName !== 'Profile' || onlineUserId === post.author._id ?
                                                        navigation.push('Profile') :
                                                        navigation.push('Profile', {userId: post.author._id})
                                                }
                                            >
                                                {
                                                    post.author.profile_image_url.Url !== null ?
                                                        <Image source={{uri: post.author.profile_image_url.Url}}
                                                               style={{...stylesUser.avatar, ...styles.postAvatar}}/>
                                                        :
                                                        <Avatar.Text
                                                            size={35}
                                                            label={post.author.pseudo.substr(0, 1).toUpperCase()}
                                                            style={{...stylesUser.avatar, ...styles.postAvatar}}
                                                            color={'#fff'}
                                                        />
                                                }
                                            </Pressable>
                                            <View>
                                                <Pressable
                                                    onPress={() =>
                                                        screenName !== 'Profile' || onlineUserId === post.author._id ?
                                                            navigation.push('Profile') :
                                                            navigation.push('Profile', {userId: post.author._id})
                                                    }
                                                >
                                                    <Text style={styles.postAuthorName}>{post.author.pseudo}</Text>
                                                </Pressable>
                                                <Text style={styles.postDate}><TimeAgo
                                                    time={'2020-12-12T21:05:12.990Z'}/></Text>
                                            </View>
                                        </View>
                                        <View style={styles.postContent}>
                                            <Text>Oh no ! I'm the second comment... It's so bad :(</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={styles.postAuthorData}>
                                            <Pressable
                                                onPress={() =>
                                                    screenName !== 'Profile' || onlineUserId === post.author._id ?
                                                        navigation.push('Profile') :
                                                        navigation.push('Profile', {userId: post.author._id})
                                                }
                                            >
                                                {
                                                    post.author.profile_image_url.Url !== null ?
                                                        <Image source={{uri: post.author.profile_image_url.Url}}
                                                               style={{...stylesUser.avatar, ...styles.postAvatar}}/>
                                                        :
                                                        <Avatar.Text
                                                            size={35}
                                                            label={post.author.pseudo.substr(0, 1).toUpperCase()}
                                                            style={{...stylesUser.avatar, ...styles.postAvatar}}
                                                            color={'#fff'}
                                                        />
                                                }
                                            </Pressable>
                                            <View>
                                                <Pressable
                                                    onPress={() =>
                                                        screenName !== 'Profile' || onlineUserId === post.author._id ?
                                                            navigation.push('Profile') :
                                                            navigation.push('Profile', {userId: post.author._id})
                                                    }
                                                >
                                                    <Text style={styles.postAuthorName}>{post.author.pseudo}</Text>
                                                </Pressable>
                                                <Text style={styles.postDate}><TimeAgo
                                                    time={'2020-12-12T21:05:12.990Z'}/></Text>
                                            </View>
                                        </View>
                                        <View style={styles.postContent}>
                                            <Text>Oh no ! I'm the second comment... It's so bad :(</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={styles.postAuthorData}>
                                            <Pressable
                                                onPress={() =>
                                                    screenName !== 'Profile' || onlineUserId === post.author._id ?
                                                        navigation.push('Profile') :
                                                        navigation.push('Profile', {userId: post.author._id})
                                                }
                                            >
                                                {
                                                    post.author.profile_image_url.Url !== null ?
                                                        <Image source={{uri: post.author.profile_image_url.Url}}
                                                               style={{...stylesUser.avatar, ...styles.postAvatar}}/>
                                                        :
                                                        <Avatar.Text
                                                            size={35}
                                                            label={post.author.pseudo.substr(0, 1).toUpperCase()}
                                                            style={{...stylesUser.avatar, ...styles.postAvatar}}
                                                            color={'#fff'}
                                                        />
                                                }
                                            </Pressable>
                                            <View>
                                                <Pressable
                                                    onPress={() =>
                                                        screenName !== 'Profile' || onlineUserId === post.author._id ?
                                                            navigation.push('Profile') :
                                                            navigation.push('Profile', {userId: post.author._id})
                                                    }
                                                >
                                                    <Text style={styles.postAuthorName}>{post.author.pseudo}</Text>
                                                </Pressable>
                                                <Text style={styles.postDate}><TimeAgo
                                                    time={'2020-12-12T21:05:12.990Z'}/></Text>
                                            </View>
                                        </View>
                                        <View style={styles.postContent}>
                                            <Text>Oh no ! I'm the second comment... It's so bad :(</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={styles.postAuthorData}>
                                            <Pressable
                                                onPress={() =>
                                                    screenName !== 'Profile' || onlineUserId === post.author._id ?
                                                        navigation.push('Profile') :
                                                        navigation.push('Profile', {userId: post.author._id})
                                                }
                                            >
                                                {
                                                    post.author.profile_image_url.Url !== null ?
                                                        <Image source={{uri: post.author.profile_image_url.Url}}
                                                               style={{...stylesUser.avatar, ...styles.postAvatar}}/>
                                                        :
                                                        <Avatar.Text
                                                            size={35}
                                                            label={post.author.pseudo.substr(0, 1).toUpperCase()}
                                                            style={{...stylesUser.avatar, ...styles.postAvatar}}
                                                            color={'#fff'}
                                                        />
                                                }
                                            </Pressable>
                                            <View>
                                                <Pressable
                                                    onPress={() =>
                                                        screenName !== 'Profile' || onlineUserId === post.author._id ?
                                                            navigation.push('Profile') :
                                                            navigation.push('Profile', {userId: post.author._id})
                                                    }
                                                >
                                                    <Text style={styles.postAuthorName}>{post.author.pseudo}</Text>
                                                </Pressable>
                                                <Text style={styles.postDate}><TimeAgo
                                                    time={'2020-12-12T21:05:12.990Z'}/></Text>
                                            </View>
                                        </View>
                                        <View style={styles.postContent}>
                                            <Text>Oh no ! I'm the second comment... It's so bad :(</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={styles.postAuthorData}>
                                            <Pressable
                                                onPress={() =>
                                                    screenName !== 'Profile' || onlineUserId === post.author._id ?
                                                        navigation.push('Profile') :
                                                        navigation.push('Profile', {userId: post.author._id})
                                                }
                                            >
                                                {
                                                    post.author.profile_image_url.Url !== null ?
                                                        <Image source={{uri: post.author.profile_image_url.Url}}
                                                               style={{...stylesUser.avatar, ...styles.postAvatar}}/>
                                                        :
                                                        <Avatar.Text
                                                            size={35}
                                                            label={post.author.pseudo.substr(0, 1).toUpperCase()}
                                                            style={{...stylesUser.avatar, ...styles.postAvatar}}
                                                            color={'#fff'}
                                                        />
                                                }
                                            </Pressable>
                                            <View>
                                                <Pressable
                                                    onPress={() =>
                                                        screenName !== 'Profile' || onlineUserId === post.author._id ?
                                                            navigation.push('Profile') :
                                                            navigation.push('Profile', {userId: post.author._id})
                                                    }
                                                >
                                                    <Text style={styles.postAuthorName}>{post.author.pseudo}</Text>
                                                </Pressable>
                                                <Text style={styles.postDate}><TimeAgo
                                                    time={'2020-12-12T21:05:12.990Z'}/></Text>
                                            </View>
                                        </View>
                                        <View style={styles.postContent}>
                                            <Text>Oh no ! I'm the second comment... It's so bad :(</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={styles.postAuthorData}>
                                            <Pressable
                                                onPress={() =>
                                                    screenName !== 'Profile' || onlineUserId === post.author._id ?
                                                        navigation.push('Profile') :
                                                        navigation.push('Profile', {userId: post.author._id})
                                                }
                                            >
                                                {
                                                    post.author.profile_image_url.Url !== null ?
                                                        <Image source={{uri: post.author.profile_image_url.Url}}
                                                               style={{...stylesUser.avatar, ...styles.postAvatar}}/>
                                                        :
                                                        <Avatar.Text
                                                            size={35}
                                                            label={post.author.pseudo.substr(0, 1).toUpperCase()}
                                                            style={{...stylesUser.avatar, ...styles.postAvatar}}
                                                            color={'#fff'}
                                                        />
                                                }
                                            </Pressable>
                                            <View>
                                                <Pressable
                                                    onPress={() =>
                                                        screenName !== 'Profile' || onlineUserId === post.author._id ?
                                                            navigation.push('Profile') :
                                                            navigation.push('Profile', {userId: post.author._id})
                                                    }
                                                >
                                                    <Text style={styles.postAuthorName}>{post.author.pseudo}</Text>
                                                </Pressable>
                                                <Text style={styles.postDate}><TimeAgo
                                                    time={'2020-12-12T21:05:12.990Z'}/></Text>
                                            </View>
                                        </View>
                                        <View style={styles.postContent}>
                                            <Text>Oh no ! I'm the second comment... It's so bad :(</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                }
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

export default PostScreen
