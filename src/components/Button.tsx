import React from 'react'
import {Text, TouchableOpacity} from 'react-native'
import styles from "../assets/Styles"

export const ButtonGray = ({buttonTitle, ...rest}) => {
    return (
        <TouchableOpacity style={styles.btnGray} {...rest}>
            <Text style={styles.textWhite}>{buttonTitle}</Text>
        </TouchableOpacity>
    )
}
