import {ApiError} from "./apiError"

export const fetchApi = async (query: string) => {
    let response = await fetch('http://192.168.1.13:7000/graphql', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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
