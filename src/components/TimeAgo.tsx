import React from 'react'
import {Text} from 'react-native'

export const TimeAgo = ({time}: { time: string }) => {
    const dateTimestamp = new Date(time).getTime() / 1000 | 0
    const now = new Date().getTime() / 1000 | 0
    const diff = now - dateTimestamp

    const stringify = () => {
        if (diff < 60) {
            return 'A few seconds ago'
        } else if (diff < 3600) {
            const minute = diff / 60 | 0
            return minute + minute === 1 ? ' minute ago' : ' minutes ago'
        } else if (diff < 3600 * 24) {
            const minute = diff / 3600 | 0
            return minute + (minute === 1 ? ' hour ago' : ' hours ago')
        } else if (diff < 86400 * 2) {
            return 'Yesterday'
        } else if (diff < 86400 * 7) {
            return (diff / 86400 | 0) + ' days ago'
        } else {
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(new Date(time))
        }
    }

    return (
        <Text>{stringify()}</Text>
    )
}
