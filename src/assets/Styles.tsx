import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
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

    headerBar: {
        backgroundColor: '#262626',
        shadowOffset: {
            height: 0,
            width: 0,
        }
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
    },
})

export default styles
