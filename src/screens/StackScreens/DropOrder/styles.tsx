import { StyleSheet } from 'react-native';
import Colors from '../../../utils/Colors/Colors';
import { SF, SW, SH } from '../../../utils/Responsiveness/Dimensions';

export default StyleSheet.create({
  dropTag: {
    backgroundColor: Colors.dark_green,
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: SW(10),
    paddingVertical: SH(4),
    marginTop: SH(10),
  },
  dropTagText: {
    color: Colors.White,
    fontFamily: 'Inter-Medium',
    fontSize: SF(11),
  },
  customerInfo: {
    marginTop: SH(10),
  },
  customerName: {
    fontFamily: 'Inter-Bold',
    fontSize: SF(14),
    color: Colors.black,
  },
  address: {
    fontFamily: 'Inter-Regular',
    fontSize: SF(12),
    color: '#555',
    marginVertical: SH(6),
    lineHeight: SH(18),
  },
 orderId: {
    fontFamily: 'Inter-Medium',
    fontSize: SF(15),
    color: Colors.black,
  },
  orderId1: {
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    fontSize: SF(15),
    color: Colors.black,
  },
  callMapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SH(20),
  },
  callButton: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: SH(12),
    borderRadius: SW(20),
    justifyContent: 'center',
    elevation: 2,
  },
  callButtonText: {
    color: Colors.primary,
    fontFamily: 'Inter-Medium',
    fontSize: SF(13),
    marginLeft: SW(6),
  },
  mapButton: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: SH(12),
    borderRadius: SW(20),
    justifyContent: 'center',
  },
  mapButtonText: {
    color: Colors.White,
    fontFamily: 'Inter-Medium',
    fontSize: SF(13),
    marginLeft: SW(6),
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: SH(14),
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#F5F5F6",
    paddingVertical: SH(10),
    paddingHorizontal: SW(10),
    borderRadius: 20,
    marginVertical: SH(10),
    borderColor: "#5B66AB",
    borderWidth: 0.5
  },
  chatButtonText: {
    color: "#5B66AB",
    fontSize: SF(14),
    fontFamily: 'Inter-Medium',
    marginLeft: 5,
  },

  reachedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark_green,
    borderRadius: SW(8),
    paddingVertical: SH(12),
    marginVertical: SH(10)
  },
  reachedButtonText: {
    color: Colors.White,
    fontFamily: 'Inter-Medium',
    fontSize: SF(14),
    marginLeft: SW(4),
  },
  rejectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffecec',
    borderRadius: SW(16),
    paddingHorizontal: SW(10),
    paddingVertical: SH(4),
    alignSelf: 'flex-end',
  },
  rejectText: {
    color: "red",
    fontFamily: 'Inter-Medium',
    fontSize: SF(13),
  },
  image: {
    width: SW(200),
    height: SH(200),
    position: "absolute",
    bottom: SH(10),
    alignSelf: "center",
    resizeMode: "contain",
  },
  orderBox: {
    backgroundColor: '#E9F8EF',
    borderRadius: SW(8),
    paddingVertical: SH(10),
    paddingHorizontal: SW(12),
    marginTop: SH(16),
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderTitle: {
    fontSize: SF(14),
    fontFamily: 'Inter-Regular',
    marginLeft: SW(6),
    color: Colors.black,
  },
  restaurantName: {
    fontFamily: 'Inter-Regular',
    fontSize: SF(13),
    color: Colors.darkGray,
    marginLeft: SW(6),
  },
   overlayTouchable: {
    flex: 1,
    width: '100%',
  },

  modalContent: {
    backgroundColor: Colors.White,
    borderTopLeftRadius: SW(20),
    borderTopRightRadius: SW(20),
    paddingBottom: SH(40),
    paddingHorizontal: SW(15),
    maxHeight: '75%',
  },

  flatListContainer: {
    paddingBottom: SH(20),
  },

  closeIcon: {
    padding: SW(5),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  bottomSheet: {
    backgroundColor: Colors.White,
    borderTopLeftRadius: SW(22),
    borderTopRightRadius: SW(22),
    paddingTop: SH(15),
    paddingBottom: SH(25),
    maxHeight: '75%',
    elevation: 20,
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SW(18),
    marginBottom: SH(10),
  },

  modalTitle: {
    fontSize: SF(16),
    fontFamily: 'Inter-Bold',
    color: Colors.dark_green,
  },
  orderCard: {
    paddingHorizontal: SW(18),
  },
  orderIcon: {
    marginBottom: SH(8),
    alignSelf: "center"
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SH(6),
  },
  itemName: {
    flex: 1,
    color: Colors.black,
    fontSize: SF(13),
  },
  itemPrice: {
    color: Colors.black,
    fontSize: SF(13),
    fontFamily: 'Inter-Regular',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SH(6),
  },
  totalText: {
    fontSize: SF(14),
    color: Colors.black,
    fontFamily: 'Inter-Regular',
    marginRight: SW(10),
  },
  paidTagBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SW(8),
    paddingVertical: SH(3),
    borderRadius: SW(6),
    borderWidth: 1,
  },
  paidTagText: {
    fontSize: SF(11),
    fontFamily: 'Inter-Regular',
  },
  totalAmount: {
    fontSize: SF(14),
    fontFamily: 'Inter-Regular',
    color: Colors.black,
  },
});
