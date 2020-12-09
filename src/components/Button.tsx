import React from 'react'
import {Text, TouchableOpacity} from 'react-native'
import {styles} from "../assets/Styles"

interface ButtonProps {
    buttonTitle?: string
    buttonStyle?: object
    onPress?: any
}

export const ButtonGray = ({buttonTitle, buttonStyle, onPress}: ButtonProps) => {
    return (
        <TouchableOpacity style={{...styles.btnGray, ...buttonStyle}} onPress={onPress}>
            <Text style={styles.textWhite}>{buttonTitle}</Text>
        </TouchableOpacity>
    )
}
