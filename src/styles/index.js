import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    content: {
        flex: 1,
        paddingTop: 20,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 20,
        backgroundColor:'#381466',
    },
    beforePlayer: {
        flex: 1,
        paddingBottom: 73,
    },
    input: {
        fontSize: 14,
        color: '#ffffff',
        height: 60,
        borderRadius: 100,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#6A429D',
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom: 20
    },
    link: {
        color: '#FAB042',
    },
    btn: {
        display: 'flex',
        overflow: 'hidden',
        height: 60,
        padding: 20,
        fontSize: 16,
        textAlign: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
        // background: 'linear-gradient(124.35deg, #F7D378 20.25%, #FAB042 82.84%)',
        borderRadius: 30,
        fontWeight: 'bold',
        marginBottom: 20
    },
    btnSuccess: {
        backgroundColor: '#FAB042',
        color: '#ffffff',
    },
    btnPrimary: {
        backgroundColor: '#58318C',
        color: '#ffffff',
    },
    btnBorder: {
        borderWidth: 2,
        borderColor: '#FAB042',
        color: '#FAB042',
    },
    btnSmall: {
        fontSize: 12
    },
    tabBarStyle: {
        paddingTop: 12,
        paddingBottom: 21,
        height: 83,
        backgroundColor: '#50238A',
    },
    loading: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userBtn: {
        marginRight: 20,
        marginLeft: 20,
    }
});
