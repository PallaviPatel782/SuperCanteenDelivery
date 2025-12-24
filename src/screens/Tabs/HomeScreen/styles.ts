import { StyleSheet } from 'react-native';
import Colors from '../../../utils/Colors/Colors';
import { SH, SW, SF } from '../../../utils/Responsiveness/Dimensions';
import Fonts from '../../../utils/Fonts/Fonts';

export default StyleSheet.create({
    overviewContainer: {
        marginBottom: SH(20),
        backgroundColor: Colors.White,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 1,
        paddingBottom: SH(8),
        paddingTop: SH(3),
    },

    overviewTitle: {
        fontSize: SF(14),
        fontFamily: Fonts.Inter_Bold,
        color: "#fc9c01ff",
        marginBottom: SH(12),
        backgroundColor: "#f8f1e6ff",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },

    overviewCardIcon: {
        marginBottom: SH(8),
        width: SH(42),
        height: SH(42),
        backgroundColor: '#FFFFFF',
        borderRadius: SH(50),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3
    },

    overviewCardRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: SW(8),
    },
    overviewCard: {
        width: '49%',
        borderRadius: 16,
        padding: SH(5),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
        marginTop:SH(6)
    },
    overviewCardTitle: {
        fontSize: SF(10),
        fontFamily: Fonts.Inter_Medium,
        textAlign: 'center',
    },
    overviewCardValue: {
        fontSize: SF(11),
        fontFamily: Fonts.Inter_SemiBold,
        marginTop: SH(4),
        textAlign: 'center',
    },


    cardWrapper: {
        marginBottom: SH(5),
    },

    ribbon: {
        paddingVertical: SH(3),
        paddingHorizontal: SW(8),
        alignSelf: 'flex-start',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SH(5),
    },

    ribbonText: {
        color: Colors.White,
        fontFamily: Fonts.Inter_Medium,
        fontSize: SF(10),
    },

    historyCard: {
        marginTop: SH(-8),
        backgroundColor: "#f6f7f9ff",
        paddingHorizontal: SH(14),
        paddingVertical: SH(8),
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#EAEAEA',
         borderTopLeftRadius:0,
        elevation: 4,
        shadowColor: '#00000040',
    },

    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    orderId: {
        fontSize: SF(12),
        fontFamily: Fonts.Inter_Medium,
        color: Colors.black,
    },

    paymentBadge: {
        paddingVertical: SH(4),
        paddingHorizontal: SW(10),
        borderRadius: 16,
    },

    paymentText: {
        fontSize: SF(11),
        fontFamily: Fonts.Inter_Medium,
    },

    customerName: {
        fontSize: SF(11),
        color: Colors.primary,
        fontFamily: Fonts.Inter_Bold,
    },

    date: {
        fontSize: SF(11),
        color: Colors.darkGray,
        fontFamily: Fonts.Inter_Regular,
    },

    priceTag: {
        backgroundColor: '#FFF4D7',
        paddingHorizontal: SW(15),
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FFD37A',
    },

    priceText: {
        fontFamily: Fonts.Inter_Regular,
        color: '#C27A00',
        fontSize: SF(11),
    },
    address: {
        fontSize: SF(11),
        fontFamily: Fonts.Inter_Regular,
        color: '#555',
        width: '85%',
    },


    // Section Header
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SH(6),
    },
    sectionTitle: {
        fontSize: SF(16),
        fontFamily: Fonts.Inter_SemiBold,
        color: Colors.primary,
    },
    sectionLink: {
        fontSize: SF(12),
        color: Colors.primary,
        fontFamily: Fonts.Inter_SemiBold,
    },
});
