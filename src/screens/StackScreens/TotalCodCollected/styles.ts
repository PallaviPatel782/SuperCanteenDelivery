import { StyleSheet } from 'react-native';
import Colors from '../../../utils/Colors/Colors';
import { SH, SW, SF } from '../../../utils/Responsiveness/Dimensions';
import Fonts from '../../../utils/Fonts/Fonts';

export default StyleSheet.create({

  cardWrapper: {
    marginBottom: SH(5),
  },

  ribbon: {
    backgroundColor: Colors.primary,
    paddingVertical: SH(3),
    paddingHorizontal: SW(8),
    alignSelf: 'flex-start',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SH(5)
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
    borderTopLeftRadius: 0,
    borderColor: '#EAEAEA',
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
    fontSize: SF(11),
    fontFamily: Fonts.Inter_Medium,
    color: Colors.black,
  },

  paymentBadge: {
    paddingVertical: SH(4),
    paddingHorizontal: SW(10),
    borderRadius: 16,
  },

  paymentText: {
    fontFamily: Fonts.Inter_Medium,
    fontSize: SF(11),
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
  loadMoreBtn: {
    marginTop: SH(15),
    alignSelf: 'center',

    paddingHorizontal: SW(20),
    paddingVertical: SH(8),
    borderRadius: 8,
  },
  loadMoreText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  }



});
