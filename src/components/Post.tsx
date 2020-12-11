import React from 'react'
import {Text, View} from 'react-native'
import {styles, stylesUser} from "../assets/Styles"
import {Avatar} from "react-native-paper"

export const Post = ({post}: { post: any }) => {
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
                    <Text style={styles.postDate}>10 Dec 2020 at 12:09am</Text>
                </View>
            </View>
            <View style={styles.postContent}>
                <Text>{post.content}</Text>
            </View>
        </View>
    )
}
