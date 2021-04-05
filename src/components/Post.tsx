import React, {useEffect, useState} from 'react'
import {Image, Pressable, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {styles, stylesUser} from "../assets/Styles"
import {Avatar} from "react-native-paper"
import {useNavigation, useNavigationState} from '@react-navigation/native'
import {TimeAgo} from "./TimeAgo"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {fetchApi} from "../utils/fetchApi"
import {Errors} from "./Errors"

export const Post = ({data}: { data: any }) => {
    const [post, setPost] = useState(data)
    const [onlineUserId, setOnlineUserId] = useState<string>()
    const [errors, setErrors] = useState<string[]>([])
    const navigation = useNavigation<any>()
    const screenName = useNavigationState((state) => state.routes[state.index].name)
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [nbLike, setNbLike] = useState(data.likes.length);
    const [nbComment, setNbComment] = useState(data.comment.length);
    // @ts-ignore

    AsyncStorage.getItem('onlineUser').then(value => {
        setOnlineUserId(value ? JSON.parse(value)._id : '')
        setIsLiked(post.likes.some((l: { author: { _id: string } }) => l.author._id === onlineUserId))
    })

    useEffect(() => {
        setNbLike(data.likes.length)
        setNbComment(data.comment.length)
    }, [data])

    const handleLike = async () => {
        setErrors([])
        let value

        if (!isLiked) {
            value = 'createLike'
        } else {
            value = 'deleteLike'
        }

        let query = JSON.stringify({
            query: `mutation{
                ${value}(postId: "${post._id}"){
                    post{
                        comment{
                            _id
                        }
                        likes{
                            author{
                                _id
                            }
                        }
                    }
                }
            }`
        })

        try {
            let response = await fetchApi(query)
            if (!isLiked) {
                setPost({...post, comment: response.createLike.post.comment, likes: response.createLike.post.likes})
                setNbLike(response.createLike.post.likes.length)
                setNbComment(response.createLike.post.comment.length)
            } else {
                setPost({...post, comment: response.deleteLike.post.comment, likes: response.deleteLike.post.likes})
                setNbLike(response.deleteLike.post.likes.length)
                setNbComment(response.deleteLike.post.comment.length)
            }
            setIsLiked(post.likes.some((l: { author: { _id: string } }) => l.author._id === onlineUserId))
        } catch (e) {
            if (e.errors) {
                setErrors([e.errors])
            } else {
                setErrors(['An error has been encountered, please try again '])
            }
        }
    }

    return (
        <Pressable onPress={() => screenName !== 'Post' && navigation.push('Post', {post: post._id})}
                   style={styles.onePost}>
            <Errors errors={errors}/>
            <Pressable
                onPress={() => screenName !== 'Post' && navigation.push('Post', {post: post._id})}
                style={{...styles.postAuthorData, paddingHorizontal: 20}}
            >
                {
                    post.author.profile_image !== null ?
                        <Image source={{uri: post.author.profile_image.url}}
                               style={{...stylesUser.avatar, ...styles.postAvatar}}/>
                        :
                        <Avatar.Text
                            size={35}
                            label={post.author.pseudo.substr(0, 1).toUpperCase()}
                            style={{...stylesUser.avatar, ...styles.postAvatar}}
                            color={'#fff'}
                        />
                }
                <View>

                    <Text style={styles.postAuthorName}>{post.author.pseudo}</Text>
                    <Text style={styles.postDate}><TimeAgo time={post.updatedAt}/></Text>
                </View>
            </Pressable>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <Pressable
                    onPress={() => screenName !== 'Post' && navigation.push('Post', {post: post._id})}
                    style={styles.postImageScroll}
                >
                    <Image
                        source={{uri: 'https://img.maxisciences.com/s3/frgsd/photographie/default_2020-01-02_41f960d5-236c-4a94-9222-a339e0ddd365.jpeg'}}
                        style={styles.postImage}/>
                    <Image
                        source={{uri: 'https://visiter-voyager.info/wp-content/uploads/2019/05/paysage-nature-900x600.jpg'}}
                        style={styles.postImage}/>
                    <Image
                        source={{uri: 'https://www.apple.com/newsroom/images/product/iphone/lifestyle/Apple_Shot-on-iPhone-Challenge-2020_Austin-Mann_01072020_big.jpg.large.jpg'}}
                        style={styles.postImage}/>
                </Pressable>
            </ScrollView>
            <View style={{...styles.postContent, paddingHorizontal: 20}}>
                <Text>{post.content}</Text>
            </View>
            <View style={{...styles.postInfos, paddingHorizontal: 20}}>
                <TouchableOpacity style={{...styles.postInfos, marginRight: 20}} onPress={() => handleLike()}>
                    <MaterialCommunityIcons
                        name={isLiked ? 'heart' : 'heart-outline'} size={20}
                        color={isLiked ? '#ef5151' : '#000'}/>
                    <Text style={styles.postInfosText}>{nbLike}</Text>
                </TouchableOpacity>

                <View style={styles.postInfos}>
                    <MaterialCommunityIcons name="comment-outline" size={20} color="black"/>
                    <Text style={styles.postInfosText}>{nbComment}</Text>
                </View>
            </View>
        </Pressable>
    )
}
