import { StyleSheet } from 'react-native';
import { SH, SW, SF } from '../../../utils/Responsiveness/Dimensions';
import Colors from '../../../utils/Colors/Colors';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#E8F5FF',
    },

    topSection: {
        backgroundColor: Colors.dark_green || '#2E7D32',
        height: '25%',
    },

    bottomSection: {
        marginTop: SH(170)
    },

    successCard: {
        position: 'absolute',
        top: '18%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: SW(16),
        width: '75%',
        alignItems: 'center',
        paddingTop: SH(65),
        paddingBottom: SH(25),
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
    },

    imageWrapper: {
        position: 'absolute',
        top: -SH(55),
        alignSelf: 'center',
        width: SW(110),
        height: SW(110),
        borderRadius: SW(55),
        backgroundColor: Colors.White,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },

    successImage: {
        width: SW(80),
        height: SW(80),
    },

    confirmationText: {
        fontSize: SF(16),
        fontFamily: 'Inter-Medium',
        color: Colors.black,
        marginBottom: SH(6),
        textAlign: 'center',
    },

    earningsLabel: {
        fontSize: SF(14),
        color: Colors.black,
        opacity: 0.7,
        textAlign: 'center',
    },

    earningsValue: {
        fontSize: SF(26),
        fontFamily: 'Inter-Bold',
        color: Colors.black,
        marginTop: SH(3),
        textAlign: 'center',
    },
    deliverButton: {
        backgroundColor: Colors.dark_green || '#2E7D32',
        marginHorizontal: SW(20),
        borderRadius: SW(10),
        paddingVertical: SH(14),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: SH(30),
        left: 0,
        right: 0,
    },

    deliverButtonText: {
        fontSize: SF(16),
        fontFamily: 'Inter-Regular',
        color: Colors.White,
    },
});
