import {Dimensions, StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },

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
        backgroundColor: '#F8F8F8',
        position: 'relative',
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

    inputArea: {
        paddingTop: 20,
        height: 120,
    },

    inputAreaSizeInfos: {
        position: 'absolute',
        right: 60,
        bottom: 75,
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

    snackBar: {
        position: 'absolute',
        bottom: 10,
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 15,
        width: '80%',
        alignSelf: 'center',
        zIndex: 1,
    },

    error: {
        backgroundColor: '#e71d36',
    },

    success: {
        backgroundColor: '#2da243',
    },

    backBtnPosition: {
        position: "absolute",
        top: 5,
        left: 30,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    backBtn: {
        backgroundColor: '#3D4958',
        height: 40,
        width: 40,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

    backBtnTitle: {
        marginLeft: 20,
        fontWeight: '600'
    },

    bgWhite: {
        backgroundColor: '#fff',
        borderRadius: 15,
    },

    onePost: {
        marginVertical: 10,
        backgroundColor: '#fff',
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
        fontSize: 18,
        fontWeight: '500',
    },

    postAvatar: {
        width: 35,
        height: 35,
        borderRadius: 13,
    },

    postDate: {
        marginLeft: 10,
        fontSize: 10,
        fontWeight: '400',
    },

    postContent: {
        marginTop: 15,
        marginBottom: 15,
    },

    postInfos: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    postInfosText: {
        fontSize: 18,
        marginHorizontal: 5,
    },

    postImage: {
        height: 200,
        width: 200,
        borderRadius: 25,
        marginRight: 10,
        marginTop: 20,
    },

    postImageScroll: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 20,
    },

    commentInputRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: -15,
    },

    commentInput: {
        marginTop: -10,
        marginBottom: 20,
        height: 'auto',
        width: '70%',
        marginHorizontal: 20,
    },

    commentBtn: {
        backgroundColor: '#3D4958',
        height: 40,
        width: 40,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -10,
        marginBottom: 20,
        marginLeft: -10,
    },

    commentBtnDelete: {
        backgroundColor: '#f65a5a',
        height: 25,
        width: 25,
        borderRadius: 8,
        position: 'absolute',
        right: 0,
        top: 10,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },

    comments: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#ececf3',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        paddingBottom: -5,
        marginBottom: 10,
    },

    button: {
        borderRadius: 15,
    },

    buttonContent: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    },

    postModal: {
        padding: 30,
        position: 'relative',
        height: '100%',
    },

    postModalInput: {
        marginTop: 20,
        paddingHorizontal: 0,
        marginHorizontal: 0,
        backgroundColor: '#fff',
        maxHeight: 430,
        minHeight: 200,
        width: 'auto'
    },

    postModalError: {
        position: 'absolute',
        bottom: 150,
        width: '100%'
    },

    postModalBtn: {
        position: 'absolute',
        bottom: 40,
        left: 60,
        transform: [
            {translateX: -32},
        ],
        width: '100%'
    }
})

export const stylesUser = StyleSheet.create({
    avatar: {
        backgroundColor: '#648ba5',
    },

    avatarBorder: {
        marginTop: 15,
        width: 185,
        height: 185,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dedede',
        borderRadius: 92,
        position: 'relative',
    },

    avatarImageEdit: {
        position: 'absolute',
        bottom: -20,
        right: -75,
        backgroundColor: '#3D4958',
        padding: 10,
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 4,
        borderColor: '#dedede',
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
        backgroundColor: '#ececec',
        padding: 20,
        fontSize: 15,
        borderRadius: 15,
        overflow: 'hidden',
        textAlign: 'center',
    },

    buttonActions: {
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'stretch',
    },

    subscribers: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 150,
        marginBottom: 20,
    },

    btnSubscribers: {
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },

    friends: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },

    friendAvatar: {
        height: 50,
        width: 50,
        borderRadius: 20,
    },

    oneFriend: {
        paddingVertical: 5,
        flexGrow: 1,
        marginHorizontal: 2
    },
})
