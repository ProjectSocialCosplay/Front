import React, {useState} from 'react'
import {Pressable, Text, View} from 'react-native'
import {styles, stylesUser} from "../assets/Styles"
import {Avatar, Button, Caption, Divider} from "react-native-paper"
import {useNavigation, useNavigationState} from '@react-navigation/native'
import {TimeAgo} from "./TimeAgo"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const Post = ({data}: { data: any }) => {
    const [post, setPost] = useState(data)
    const [onlineUserId, setOnlineUserId] = useState('')
    const navigation = useNavigation<any>()
    const screenName = useNavigationState((state) => state.routes[state.index].name)

    AsyncStorage.getItem('onlineUserId').then(value => {
        setOnlineUserId(value ? value : '')
    })

    const isLiked = post.like.some((l: { _id: string }) => l._id === onlineUserId)

    const pushLike = () => {
        setPost({...post, like: [{_id: onlineUserId}]})
    }

    return (
        <View style={styles.onePost}>
            <Pressable onPress={() => alert('TODO: Redirect to post view')}>
                <View style={styles.postAuthorData}>
                    <Pressable
                        onPress={() =>
                            screenName !== 'Profile' || onlineUserId === post.author._id ?
                                navigation.navigate('Profile') :
                                navigation.push('Profile', {userId: post.author._id})
                        }
                    >
                        {
                            post.author.profile_image_url.Url !== null ?
                                <Avatar.Image
                                    size={35}
                                    source={{uri: post.author.profile_image_url.Url}}
                                    style={stylesUser.avatarImage}
                                />
                                :
                                <Avatar.Text
                                    size={35}
                                    label={post.author.pseudo.substr(0, 1).toUpperCase()}
                                    style={stylesUser.avatarImage}
                                    color={'#fff'}
                                />
                        }
                    </Pressable>
                    <View>
                        <Pressable
                            onPress={() =>
                                screenName !== 'Profile' || onlineUserId === post.author._id ?
                                    navigation.navigate('Profile') :
                                    navigation.push('Profile', {userId: post.author._id})
                            }
                        >
                            <Text style={styles.postAuthorName}>{post.author.pseudo}</Text>
                        </Pressable>
                        <Text style={styles.postDate}><TimeAgo time={post.updatedAt}/></Text>
                    </View>
                </View>
                <View style={styles.postContent}>
                    <Text>{post.content}</Text>
                    {
                        (post.like.length > 0 || post.comment.length > 0) &&
                        <View style={styles.postInfos}>
                            <Caption>{post.like.length + ' likes'}</Caption>
                            <Caption>{post.comment.length + ' comments'}</Caption>
                        </View>
                    }
                    <Divider style={{marginTop: 10}}/>
                </View>
            </Pressable>
            <View style={stylesUser.buttonActions}>
                <Button
                    color={isLiked ? '#5eaade' : '#000'}
                    icon={isLiked ? 'thumb-up' : ''}
                    onPress={() => pushLike()}
                >
                    Like
                </Button>
                <Button color={'#000'}>Comment</Button>
                <Button color={'#000'}>Share</Button>
            </View>
        </View>
    )
}
