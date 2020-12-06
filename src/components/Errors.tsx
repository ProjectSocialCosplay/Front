import React from 'react'
import {Text, View} from 'react-native'
import styles from "../assets/Styles"

export const Errors = ({errors}: { errors: string[] | null }) => {
    return (
        <>
            {
                errors && errors.length > 0 &&
                <View style={styles.errors}>
                    {errors.map((el, index) =>
                        <Text key={index} style={styles.textWhite}>{el}</Text>
                    )}
                </View>
            }
        </>
    )
}
