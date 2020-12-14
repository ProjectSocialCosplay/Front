import React, {useEffect} from 'react'
import {Keyboard, Text, View} from 'react-native'
import {styles} from "../assets/Styles"

export const Errors = ({errors}: { errors: string[] | null }) => {

    const [visible, setVisible] = React.useState(false)

    useEffect(() => {
        if (Array.isArray(errors) && errors.length > 0) {
            setVisible(true)
            Keyboard.dismiss()
            hideWithTimer()
        }
    }, [errors])

    const hideWithTimer = () => {
        setTimeout(() => {
            setVisible(false)
        }, 3000)
    }

    return (
        <>
            {
                visible &&
                <View style={{...styles.snackBar, ...styles.error}}>
                    {
                        Array.isArray(errors) &&
                        errors.map((el, index) =>
                            <Text key={index}
                                  style={styles.textWhite}>{el + (index !== (errors.length - 1) ? '\n' : '')}</Text>
                        )
                    }
                </View>
            }
        </>
    )
}
