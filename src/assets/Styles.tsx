import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },

    splashView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    splashLogo: {
        width: 315,
        height: 115,
    },

    container: {
        flex: 1,
        backgroundColor: '#FDFFFC',
    },

    content: {
        marginHorizontal: 30,
    },

    logo: {
        width: 135,
        height: 50,
        marginBottom: '5%'
    },

    loginTopContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '5%',
    },

    loginBottomContainer: {
        alignItems: 'center',
        padding: '5%',
    },

    forgotPassword: {
        color: '#8d8d8d',
        fontSize: 13,
        marginTop: '10%'
    },

    input: {
        backgroundColor: '#eaeaea',
        borderRadius: 15,
        paddingHorizontal: '8%',
        paddingVertical: '5%',
        color: '#000',
        width: '80%',
        margin: '2%',
    },

    inputDate: {
        backgroundColor: '#eaeaea',
        borderRadius: 15,
        width: '80%',
        margin: '2%',
        padding: '5%',
    },
    textWhite: {
        color: '#fff',
    },

    errors: {
        backgroundColor: '#e71d36',
        borderRadius: 15,
        paddingHorizontal: 5,
        width: '80%',
        alignSelf: 'center',
    },

    onePost: {
        marginVertical: 10,
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 5,
        borderRadius: 15,
    },

    postAuthorData: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    postAuthorName: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: '500',
    },

    postDate: {
        marginLeft: 10,
        fontSize: 10,
        fontWeight: '400',
    },

    postContent: {
        marginTop: 15,
    },

    postInfos: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginTop: 5,
    },

    button: {
        borderRadius: 15,
    },

    buttonContent: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    }
})

export const stylesUser = StyleSheet.create({
    avatarBorder: {
        marginTop: 15,
        width: 185,
        height: 185,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dedede',
        borderRadius: 92,
    },

    avatarImage: {
        backgroundColor: '#648ba5',
    },

    username: {
        fontSize: 25,
        fontWeight: '700',
        alignSelf: 'center',
        marginTop: 15,
        color: '#5d6d80',
    },

    locate: {
        fontSize: 18,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        alignSelf: 'center',
    },

    locatePin: {
        marginRight: 5,
    },

    bio: {
        marginTop: 25,
        marginHorizontal: 30,
        backgroundColor: '#e3e3e3',
        padding: 20,
        fontSize: 15,
        borderRadius: 15,
        overflow: 'hidden',
    },

    buttonActions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'stretch'
    },

    friends: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },

    oneFriend: {
        flexBasis: '20%',
        paddingVertical: 5,
    },
})
