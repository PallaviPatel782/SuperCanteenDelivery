import { StyleSheet } from 'react-native';
import Colors from '../../../utils/Colors/Colors';
import { SF, SH, SW } from '../../../utils/Responsiveness/Dimensions';

export default StyleSheet.create({
    innerContainer: {
        paddingHorizontal: SW(10),
        paddingTop: SH(15),
    },

    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SH(15),
    },

    redLine: {
        width: SW(3),
        height: SH(18),
        backgroundColor: Colors.primary,
        marginRight: SW(8),
        borderRadius: SW(2),
    },

    titleText: {
        fontSize: SF(16),
        fontFamily: 'Inter-Medium',
        color: Colors.black,
    },

    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SH(12),
    },

    listText: {
        fontSize: SF(14),
        fontFamily: 'Inter-Regular',
        color: Colors.black,
    },

    divider: {
        height: 1,
        backgroundColor: Colors.darkGray,
        opacity: 0.3,
        marginHorizontal: -SW(20)
    },
    waitOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },

    waitCard: {
        backgroundColor: '#fff',
        padding: SH(25),
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: -2 },
        elevation: 15,
    },

    waitTitle: {
        fontSize: SF(17),
        marginTop: SH(15),
        fontFamily: 'Inter-Bold',
        color: '#222',
    },

    waitSubtitle: {
        fontSize: SF(14),
        marginTop: SH(8),
        color: '#555',
        textAlign: 'center',
        fontFamily: 'Inter-Regular',
        paddingHorizontal: SW(20),
        marginBottom: SH(10),
    },
    deliveredOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },

    deliveredCard: {
        backgroundColor: "#fff",
        padding: SW(30),
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: "center",
        width: "100%",
        paddingBottom: SH(50),
    },

    deliveredTitle: {
        fontSize: SF(15),
        marginTop: SH(10),
        fontFamily: 'Inter-Bold',
        color: Colors.dark_green,
    },

    deliveredSubtitle: {
        fontSize: SF(12),
        marginTop: SH(10),
        fontFamily: 'Inter-Regular',
        color: '#333',
    },
    okButton: {
        marginTop: SH(20),
        backgroundColor: Colors.dark_green,
        paddingHorizontal: SW(30),
        paddingVertical: SH(10),
        borderRadius: 8,
        width: "90%"
    },
    okButtonText: {
        color: '#fff',
        fontSize: SF(15),
        fontFamily: 'Inter-Medium',
        textAlign: "center"
    },
});
