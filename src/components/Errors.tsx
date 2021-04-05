import React, {useEffect} from 'react'
import {Animated, Keyboard, Text, View} from 'react-native'
import {styles} from "../assets/Styles"

export const Errors = ({errors}: { errors: string[] }) => {

    const [show, setShow] = React.useState(false)
    const [hidden, setHidden] = React.useState(true)
    const [text, setText] = React.useState('')
    const [animated, setAnimated] = React.useState(new Animated.Value(0))

    useEffect(() => {
        if (errors.length > 0) {

            if (!show) {
                let mapText = ''
                errors.map((el, index) =>
                    mapText += el + (index !== (errors.length - 1) ? '\n' : '')
                )
                setText(mapText)
                setShow(true)
                Keyboard.dismiss()

                Animated.timing
                (
                    animated,
                    {
                        toValue: 1,
                        duration: 350,
                        useNativeDriver: false
                    }
                ).start(hide)
            }
        }
    }, [errors])

    const hide = () => {
        let timerID = setTimeout(() => {
            if (hidden) {
                setHidden(false)

                Animated.timing
                (
                    animated,
                    {
                        toValue: 0,
                        duration: 350,
                        useNativeDriver: false
                    }
                ).start(() => {
                    setHidden(true)
                    setShow(false)
                    setText('')
                    clearTimeout(timerID)
                })
            }
        }, 3500)
    }

    return (
        <>
            {
                show &&
                (
                    <Animated.View style={{...styles.snackBar, ...styles.error, opacity: animated}}>
                        <Text style={styles.textWhite}>{text}</Text>
                    </Animated.View>
                )
            }
        </>
    )
}
