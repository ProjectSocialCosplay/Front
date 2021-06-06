import {ApiError} from "./apiError"
import AsyncStorage from '@react-native-async-storage/async-storage'

export const fetchApi = async (query: string) => {
    const token = await AsyncStorage.getItem('token').then(value => {
        return value ? value : ''
    })

    let response = await fetch('https://back-social-cosplay.herokuapp.com/graphql', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Token': token,
        },
        method: 'POST',
        body: query
    })

    const responseData = await response.json()

    if (responseData.errors) {
        throw new ApiError(responseData.errors[0].message)
    } else if (responseData.data !== null) {
        return responseData.data
    }
}
