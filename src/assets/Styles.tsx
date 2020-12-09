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
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginBottom: '5%',
        width: '80%',
        marginHorizontal: '10%'
    },
})

export const stylesUser = StyleSheet.create({
    /*    profileBanner: {
            height: 300,
            borderBottomRightRadius: 100,
            marginRight: -10,
            backgroundColor: '#d5d7d5',
        },

        profilePicture: {
            resizeMode: 'cover',
            height: 130,
            width: 100,
            borderRadius: 20,
            backgroundColor: '#c4c6c4',
            position: 'absolute',
            bottom: -30,
            left: 50,
            borderWidth: 4,
            borderColor: '#F2F2F2',
        },

        profileInfos: {
            marginTop: 45,
            marginHorizontal: 30,
        },

        username: {
            marginLeft: 5,
            fontSize: 25,
            fontWeight: 'bold',
        },

        bio: {
            marginTop: 10,
            backgroundColor: '#e3e3e3',
            padding: 15,
            fontSize: 15,
            borderRadius: 15,
            overflow: 'hidden',
        },*/

    profilePicture: {
        resizeMode: 'cover',
        height: 220,
        width: 175,
        borderRadius: 70,
        backgroundColor: '#c4c6c4',
        borderWidth: 8,
        borderColor: '#dedede',
        alignSelf: 'center',
        marginTop: 15,
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
