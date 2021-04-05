import {MaterialCommunityIcons} from "@expo/vector-icons"
import {TouchableOpacity, View} from "react-native"
import React from "react"
import {styles} from "../assets/Styles"
import {useNavigation} from "@react-navigation/native"
import {Title} from 'react-native-paper'

interface BackButton {
    title?: string
}
export const BackButton = ({title}: BackButton) => {
    const navigation = useNavigation()
    return (
        <View style={styles.backBtnPosition}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons name="chevron-left" size={35} color="white"/>
            </TouchableOpacity>
            <Title style={styles.backBtnTitle}>{title}</Title>
        </View>
    )
}
