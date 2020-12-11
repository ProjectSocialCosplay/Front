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

    btnGray: {
        paddingHorizontal: '8%',
        paddingVertical: '5%',
        backgroundColor: '#3D4959',
        borderRadius: 15,
        marginTop: 10,
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
        backgroundColor: '#eaeaea',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 15,
    },

    postAuthorData: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    postAuthorName: {
        marginLeft: 10,
        fontSize: 20,
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
})
