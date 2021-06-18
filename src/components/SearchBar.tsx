import {Image, Keyboard, Pressable, TextInput, TouchableOpacity, View} from "react-native"
import React, {useEffect, useState} from "react"
import {styles, stylesUser} from "../assets/Styles"
import {Avatar, Subheading, Title} from "react-native-paper"
import {fetchApi} from "../utils/fetchApi";
import AsyncStorage from "@react-native-async-storage/async-storage"
import {useIsFocused, useNavigation} from "@react-navigation/native"
import {MaterialCommunityIcons} from "@expo/vector-icons";

export const SearchBar = () => {
    const [search, setSearch] = useState<string>('')
    const [searching, setSearching] = useState<boolean>(false)
    const [result, setResult] = useState([])
    const isFocused = useIsFocused()
    const [onlineUser, setOnlineUser] = useState({
        _id: '',
        following: [],
    })
    const navigation = useNavigation()

    useEffect(() => {
        AsyncStorage.getItem('onlineUser').then(value => {
            if (value) {
                setOnlineUser(JSON.parse(value))
            }
        })
    }, [isFocused])

    useEffect(() => {
        handleSubmit()
    }, [search])

    const handleSubmit = async () => {
        const query = JSON.stringify({
            query: `query{
                        searchUsers(searchQuery: "${search}"){
                            _id
                            pseudo
                            profile_image{
                                url
                            }
                        }
                    }`
        })

        try {
            const response = await fetchApi(query)
            setResult(response.searchUsers)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
                {
                    searching &&
                    <TouchableOpacity style={{...styles.backBtn, marginRight: 5, marginTop: 17}}
                                      onPress={() => {
                                          Keyboard.dismiss()
                                          setSearching(false)
                                      }}>
                        <MaterialCommunityIcons name="chevron-left" size={35} color="white"/>
                    </TouchableOpacity>
                }
                <TextInput
                    style={{...styles.searchBar, flex: 1}}
                    onChangeText={(search) => setSearch(search)}
                    value={search}
                    placeholder="Search..."
                    placeholderTextColor="#8d8d8d"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="search"
                    onSubmitEditing={() => {
                        handleSubmit()
                    }}
                    onTouchStart={() => setSearching(true)}
                />
            </View>

            {
                searching &&
                <View style={styles.searchResult}>
                    {
                        result.length > 0 ?
                            result.map((item: any, key: any) => (
                                <Pressable
                                    onPress={() => onlineUser._id === item._id ? navigation.navigate('Profile') : navigation.navigate('Profile', {'userId': item._id})}
                                    key={key}
                                >
                                    <View style={stylesUser.friends}>
                                        <View style={styles.flex}>
                                            {
                                                item.profile_image !== null ?
                                                    <View style={stylesUser.oneFriend}>
                                                        <Image
                                                            source={{uri: item.profile_image.url}}
                                                            style={{...stylesUser.avatar, ...stylesUser.searchAvatar}}/>
                                                    </View>
                                                    :
                                                    <View style={stylesUser.oneFriend}>
                                                        <Avatar.Text
                                                            size={30}
                                                            label={item.pseudo.charAt(0).toUpperCase()}
                                                            style={{...stylesUser.avatar, ...stylesUser.searchAvatar}}
                                                            color={'#fff'}
                                                        />
                                                    </View>
                                            }
                                        </View>
                                        <View style={{flex: 4, position: 'relative'}}>
                                            <View style={{top: 10}}>
                                                <Title>{item.pseudo}</Title>
                                            </View>
                                        </View>
                                    </View>
                                </Pressable>
                            ))
                            :
                            <Subheading>No result, please renew your research</Subheading>
                    }
                </View>
            }
        </View>
    )
}