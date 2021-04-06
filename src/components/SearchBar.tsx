import {TextInput, View} from "react-native";
import React, {useState} from "react";
import {styles} from "../assets/Styles";

export const SearchBar = () => {
    const [search, setSearch] = useState<string>('')
    const [errors, setErrors] = useState<string[]>([])

    const handleSubmit = () => {

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
            />
        </View>
    )
}