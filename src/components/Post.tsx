import React, {useState} from 'react'
import {Image, Pressable, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {styles, stylesUser} from "../assets/Styles"
import {Avatar} from "react-native-paper"
import {useNavigation, useNavigationState} from '@react-navigation/native'
import {TimeAgo} from "./TimeAgo"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {fetchApi} from "../utils/fetchApi"
import {Errors} from "../components/Errors"

export const Post = ({data}: { data: any }) => {
    const [post, setPost] = useState(data)
    const [onlineUserId, setOnlineUserId] = useState<string>()
    const [errors, setErrors] = useState<string[] | null>(null)
    const navigation = useNavigation<any>()
    const screenName = useNavigationState((state) => state.routes[state.index].name)
    // @ts-ignore
    const userId = useNavigationState((state) => state.routes[state.index].params?.userId)

    AsyncStorage.getItem('onlineUserId').then(value => {
        setOnlineUserId(value ? value : '')
    })

    const isLiked = post.like.some((l: { user: { _id: string } }) => l.user._id === onlineUserId)

    const handleLike = async () => {
        setErrors([])
        let value

        if (isLiked) {
            value = 'like(postId'
        } else {
            value = 'unLike(id'
        }

        let query = JSON.stringify({
            query: `mutation{
                ${value}: "${post._id}"){
                    _id
                }
            }`
        })

        try {
            let response = await fetchApi(query)
        } catch (e) {
            if (e.errors) {
                setErrors([e.errors])
            } else {
                setErrors(['An error has been encountered, please try again '])
            }
        }
    }

    return (
        <Pressable onPress={() => screenName !== 'Post' && navigation.push('Post', {post: post})}
                   style={styles.onePost}>
            <Errors errors={errors}/>
            <Pressable
                onPress={() =>
                    screenName !== 'Profile' || onlineUserId === post.author._id ?
                        navigation.navigate('Profile') :
                        userId !== post.author._id && navigation.push('Profile', {userId: post.author._id})
                }
                style={{...styles.postAuthorData, paddingHorizontal: 20}}
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
                    onPress={() => screenName !== 'Post' && navigation.push('Post', {post: post})}
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
                    <Text style={styles.postInfosText}>{post.like.length}</Text>
                </TouchableOpacity>

                <View style={styles.postInfos}>
                    <MaterialCommunityIcons name="comment-outline" size={20} color="black"/>
                    <Text style={styles.postInfosText}>{post.comment.length}</Text>
                </View>
            </View>
        </Pressable>
    )
}
