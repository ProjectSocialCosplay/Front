import {MaterialCommunityIcons} from "@expo/vector-icons"
import {TouchableOpacity} from "react-native"
import React from "react"
import {styles} from "../assets/Styles"
import {useNavigation} from "@react-navigation/native"

export const BackButton = () => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="chevron-left" size={35} color="white"/>
        </TouchableOpacity>
    )
}
