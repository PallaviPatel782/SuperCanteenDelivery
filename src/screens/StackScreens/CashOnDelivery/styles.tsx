import { StyleSheet } from 'react-native';
import Colors from '../../../utils/Colors/Colors';
import { SF, SH, SW } from '../../../utils/Responsiveness/Dimensions';

export default StyleSheet.create({
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentTitle: {
    color: Colors.black,
    fontSize: SF(15),
    fontFamily: 'Inter-Regular',
  },
  paymentOrderId: {
    color: Colors.darkGray,
    fontSize: SF(12),
    marginTop: SH(2),
  },
  customerBox: {
    backgroundColor: Colors.White,
    borderRadius: SW(8),
    marginHorizontal: SW(15),
    padding: SH(12),
    marginTop: SH(15),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  customerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    fontSize: SF(12),
    color: Colors.darkGray,
    marginTop: SH(4),
    lineHeight: SH(16),
  },
  orderDetailsBox: {
    marginTop: SH(20),
    backgroundColor: '#F3F5F6',
    marginHorizontal: SW(15),
    borderRadius: SW(8),
    padding: SH(12),
  },
  orderDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderDetailsTitle: {
    fontSize: SF(14),
    fontFamily: 'Inter-Regular',
    marginLeft: SW(6),
    color: Colors.black,
  },
  restaurantName: {
    fontSize: SF(13),
    color: Colors.darkGray,
    marginLeft: SW(6),
  },
  deliveredButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark_green,
    borderRadius: SW(25),
    paddingVertical: SH(12),
    marginTop: SH(25),
    marginHorizontal: SW(15),
  },
  deliveredText: {
    color: Colors.White,
    fontSize: SF(14),
    fontFamily: 'Inter-Regular',
    marginLeft: SW(5),
  },
  customerName: {
    fontSize: SF(15),
    fontFamily: 'Inter-Medium',
    color: Colors.black,
    marginLeft: SW(8),
  },
  callIconCircle: {
    width: SW(35),
    height: SW(35),
    borderRadius: SW(20),
    backgroundColor: '#CEEBFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerAddress: {
    fontSize: SF(12),
    color: Colors.darkGray,
    marginTop: SH(6),
    lineHeight: SH(18),
  },
  orderId1: {
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    fontSize: SF(15),
    color: Colors.black,
  },
  customerOrderId: {
    fontSize: SF(12),
    color: Colors.darkGray,
    marginTop: SH(4),
    fontFamily: 'Inter-Regular',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: SH(12),
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
  deliverButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark_green,
    borderRadius: SW(30),
    paddingVertical: SH(14),
    marginTop: SH(25),
  },
  deliverButtonText: {
    color: Colors.White,
    fontSize: SF(15),
    fontFamily: 'Inter-Regular',
    marginLeft: SW(8),
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
  otpOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    marginTop: SH(55)
  },

  otpCard: {
    width: SW(300),
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: SH(25),
    alignItems: "center",
  },

  otpTitle: {
    fontSize: SF(18),
    fontFamily: "Inter-Bold",
    color: Colors.dark_green,
    marginTop: SH(10),
  },

  otpSubtitle: {
    fontSize: SF(12),
    fontFamily: "Inter-Medium",
    color: "#555",
    marginTop: SH(4),
    marginBottom: SH(10),
  },

  otpInput: {
    width: SW(200),
    height: SH(45),
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 10,
    textAlign: "center",
    fontSize: SF(16),
    fontFamily: "Inter-Bold",
    letterSpacing: 6,
    color: Colors.black,
    marginTop: SH(10),
  },

  verifyBtn: {
    backgroundColor: Colors.dark_green,
    marginTop: SH(15),
    paddingVertical: SH(10),
    paddingHorizontal: SW(20),
    borderRadius: 8,
    height: SH(45),
    justifyContent: 'center',
    alignItems: 'center',
  },

  verifyBtnText: {
    color: "#fff",
    fontFamily: "Inter-Medium",
    fontSize: SF(14),
  },

  cancelText: {
    color: "red",
    marginTop: SH(10),
    fontFamily: "Inter-Medium",
  },

  errorText: {
    color: "red",
    marginTop: SH(5),
    fontFamily: "Inter-Medium",
  },
  image: {
    width: SW(200),
    height: SH(200),
    position: "absolute",
    bottom: SH(10),
    alignSelf: "center",
    resizeMode: "contain",
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
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  }
});
