import React, {useEffect} from 'react'
import {Keyboard, Text} from 'react-native'
import {styles} from "../assets/Styles"
import {Snackbar} from "react-native-paper";

export const Errors = ({errors}: { errors: string[] | null }) => {

    const [visible, setVisible] = React.useState(false)

    useEffect(() => {
        if (Array.isArray(errors) && errors.length > 0) {
            setVisible(true)
            Keyboard.dismiss()
        }
    }, [errors])


    return (
        <Snackbar
            visible={visible}
            onDismiss={() => {
                setVisible(false)
            }}
            duration={2000}
            style={styles.errors}
        >
            {
                Array.isArray(errors) &&
                errors.map((el, index) =>
                    <Text key={index} style={styles.textWhite}>{el + (index !== (errors.length - 1) ? '\n' : '')}</Text>
                )
            }
        </Snackbar>
    )
}
