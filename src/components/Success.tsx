import React, {useEffect, useState} from 'react'
import {Text, View} from 'react-native'
import {styles} from "../assets/Styles"

export const Success = ({success}: { success: string | null }) => {

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (success !== null) {
            setVisible(true)
            hideWithTimer()
        }
    }, [success])

    const hideWithTimer = () => {
        setTimeout(() => {
            setVisible(false)
        }, 3000)
    }

    return (
        <>
            {
                visible &&
                <View style={{...styles.snackBar, ...styles.success}}>
                    <Text style={styles.textWhite}>{success}</Text>
                </View>
            }
        </>
    )
}
