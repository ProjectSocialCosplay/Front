import React, {useState} from 'react'
import {Text, View} from 'react-native'
import {styles, stylesUser} from "../assets/Styles"
import {Avatar, Button, Caption, Divider} from "react-native-paper"

export const Post = ({data}: { data: any }) => {
    const [post, setPost] = useState(data)

    const pushToComment = () => {
        let comment = post.comment
        comment.push('')
        setPost({...post, comment: comment})
    }

    return (
        <View style={styles.onePost}>
            <View style={styles.postAuthorData}>
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
                <View>
                    <Text style={styles.postAuthorName}>{post.author.pseudo}</Text>
                    <Text style={styles.postDate}>{post.updatedAt}</Text>
                </View>
            </View>
            <View style={styles.postContent}>
                <Text>{post.content}</Text>
                {
                    (post.comment.length > 0 || post.comment.length > 0) &&
                    <View style={styles.postInfos}>
                        <Caption>{post.comment.length + ' likes'}</Caption>
                        <Caption>{post.comment.length + ' comments'}</Caption>
                    </View>
                }
                <Divider style={{marginTop: 10}}/>
                <View style={stylesUser.buttonActions}>
                    <Button
                        color={post.comment.length > 0 ? '#5eaade' : '#000'}
                        icon={post.comment.length > 0 ? 'thumb-up' : ''}
                        onPress={() => pushToComment()}
                    >
                        Like
                    </Button>
                    <Button color={'#000'}>Comment</Button>
                    <Button color={'#000'}>Share</Button>
                </View>
            </View>
        </View>
    )
}
