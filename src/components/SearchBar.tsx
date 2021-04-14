import {Alert, Keyboard, Pressable, TextInput, View} from "react-native"
import React, {useState} from "react"
import {styles} from "../assets/Styles"
import {Subheading, Title} from "react-native-paper"
import {fetchApi} from "../utils/fetchApi";

export const SearchBar = () => {
    const [search, setSearch] = useState<string>('')
    const [searching, setSearching] = useState<boolean>(false)
    const [result, setResult] = useState([])

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
            console.log(response)
            setResult(response.searchUsers)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View>
            <TextInput
                style={styles.searchBar}
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

            {
                searching &&
                <Pressable
                    style={styles.searchResult}
                    onTouchEnd={() => {
                        Keyboard.dismiss
                        setSearching(false)
                    }}>
                    <Title>Research</Title>
                    {
                        result.length > 0 ?
                            <View/>
                            :
                            <Subheading>No result, please renew your research</Subheading>
                    }
                </Pressable>
            }
        </View>
    )
}