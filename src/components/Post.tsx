import React, {useEffect, useState} from 'react'
import {
    Image,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native'
import {styles, stylesUser} from "../assets/Styles"
import {Avatar, Caption, Subheading, Title} from "react-native-paper"
import {useNavigation, useNavigationState} from '@react-navigation/native'
import {TimeAgo} from "./TimeAgo"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {fetchApi} from "../utils/fetchApi"
import {Errors} from "./Errors"
import ImageViewer from "react-native-image-zoom-viewer";

export const Post = ({data}: { data: any }) => {
    const [post, setPost] = useState(data)
    const [onlineUserId, setOnlineUserId] = useState<string>()
    const [errors, setErrors] = useState<string[]>([])
    const navigation = useNavigation<any>()
    const screenName = useNavigationState((state) => state.routes[state.index].name)
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [nbLike, setNbLike] = useState(data.likes.length);
    const [nbComment, setNbComment] = useState(data.comment.length)
    const [visible, setVisible] = useState<boolean>(false)
    const [visibleLike, setVisibleLike] = useState<boolean>(false)
    const [waitingLike, setWaitingLike] = useState<boolean>(false)
    // @ts-ignore
    const images = [
        {
            url: 'https://img.maxisciences.com/s3/frgsd/photographie/default_2020-01-02_41f960d5-236c-4a94-9222-a339e0ddd365.jpeg',
        },
        {
            url: 'https://visiter-voyager.info/wp-content/uploads/2019/05/paysage-nature-900x600.jpg',
        },
        {
            url: 'https://www.apple.com/newsroom/images/product/iphone/lifestyle/Apple_Shot-on-iPhone-Challenge-2020_Austin-Mann_01072020_big.jpg.large.jpg',
        },
    ]

    AsyncStorage.getItem('onlineUser').then(value => {
        setOnlineUserId(value ? JSON.parse(value)._id : '')
        setIsLiked(post.likes.some((l: { author: { _id: string } }) => l.author._id === onlineUserId))
    })

    useEffect(() => {
        setNbLike(data.likes.length)
        setNbComment(data.comment.length)
    }, [data])

    const handleLike = async () => {
        if(!waitingLike){
            setWaitingLike(true)
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
                                pseudo
                                profile_image{
                                    url
                                }
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

            setWaitingLike(false)
        }
    }

    return (
        <>
            <Pressable onPress={() => screenName !== 'Post' && navigation.push('Post', {post: post._id})}
                       style={styles.onePost}>
                <Errors errors={errors}/>
                <Pressable
                    onPress={() => onlineUserId !== post.author._id && navigation.push('Profile', {'userId': post.author._id})}
                    style={{...styles.postAuthorData, paddingHorizontal: 20}}
                >
                    {
                        post.author.profile_image !== null && post.author.profile_image.url !== null ?
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
                        onPress={() => setVisible(true)}
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
                <View style={{...styles.postInfos}}>
                    <View style={styles.postInfosView}>
                        <MaterialCommunityIcons
                            name={isLiked ? 'heart' : 'heart-outline'} size={20}
                            color={isLiked ? '#ef5151' : '#000'}
                            style={styles.flex}
                            onPress={() => handleLike()}
                        />
                        <Pressable style={styles.flex} onPress={() => setVisibleLike(true)}>
                            <Text style={styles.postInfosText}>{nbLike}</Text>
                        </Pressable>
                    </View>
                    <View style={styles.postInfosView}>
                        <MaterialCommunityIcons
                            name="comment-outline"
                            size={20}
                            color="black"
                            style={styles.flex}
                        />
                        <Text style={styles.postInfosText}>
                            {nbComment}
                        </Text>
                    </View>
                </View>
            </Pressable>
            <Modal visible={visible} transparent={true}>
                <ImageViewer
                    imageUrls={images}
                    enableSwipeDown={true}
                    onSwipeDown={() => setVisible(false)}
                    flipThreshold={100}
                    swipeDownThreshold={100}
                />
            </Modal>
            <Modal visible={visibleLike}
                   transparent={true}
                   animationType="slide"
                   onRequestClose={() => setVisibleLike(false)}>
                <TouchableOpacity
                    style={styles.flex}
                    onPressOut={() => {
                        setVisibleLike(false)
                    }}
                >
                    <TouchableWithoutFeedback onPressIn={() => setVisibleLike(false)}>
                        <View style={styles.likeModalBack}>
                            <View style={styles.likeModal}>
                                <Title>Likes <Caption>({post.likes.length})</Caption></Title>
                                {
                                    post.likes.length === 0 ?
                                        <Subheading>There are no likes yet</Subheading> :
                                        <ScrollView showsVerticalScrollIndicator={false}>
                                            {
                                                post.likes.map((item: { author: { _id: '', pseudo: '', profile_image: { url: '' } } }, key:
                                                    number) => (
                                                    <Pressable
                                                        onPress={() => {
                                                            onlineUserId === item.author._id ? navigation.navigate('Profile') : navigation.push('Profile', {'userId': item.author._id})
                                                            setVisibleLike(false)
                                                        }}
                                                        style={{display: 'flex', flexDirection: 'row'}} key={key}>
                                                        <View style={styles.flex}>
                                                            {
                                                                item.author.profile_image && item.author.profile_image.url !== null ?
                                                                    <View style={stylesUser.oneFriend}>
                                                                        <Image
                                                                            source={{uri: item.author.profile_image.url}}
                                                                            style={{...stylesUser.avatar, ...styles.postAvatar}}/>
                                                                    </View>
                                                                    :
                                                                    <View style={stylesUser.oneFriend}>
                                                                        <Avatar.Text
                                                                            size={35}
                                                                            label={item.author.pseudo && item.author.pseudo.charAt(0).toUpperCase()}
                                                                            style={{...stylesUser.avatar, ...styles.postAvatar}}
                                                                            color={'#fff'}
                                                                        />
                                                                    </View>
                                                            }
                                                        </View>
                                                        <View style={{flex: 6}}>
                                                            <Subheading
                                                                style={{marginTop: 10}}>{item.author.pseudo}</Subheading>
                                                        </View>
                                                    </Pressable>
                                                ))
                                            }
                                        </ScrollView>
                                }
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        </>
    )
}
