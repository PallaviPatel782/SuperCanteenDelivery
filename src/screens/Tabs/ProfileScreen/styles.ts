import { StyleSheet } from 'react-native';
import Colors from '../../../utils/Colors/Colors';
import { SH, SW, SF } from '../../../utils/Responsiveness/Dimensions';
import Fonts from '../../../utils/Fonts/Fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },

  topImage: {
    width: '100%',
    height: SH(220),
  },

  card: {
    marginTop: SH(-40),
    backgroundColor: Colors.White,
    borderTopLeftRadius: SH(40),
    borderTopRightRadius: SH(40),
    paddingVertical: SH(30),
    paddingHorizontal: SW(20),
  },

  avatar: {
    width: SW(120),
    height: SW(120),
    borderRadius: SW(60),
    alignSelf: 'center',
    marginTop: SH(-70),
    backgroundColor: Colors.lightGray,
  },

  infoCard: {
    marginTop: SH(10),
    backgroundColor: Colors.White,
    borderRadius: SH(15),
    padding: SH(15),
    elevation: 3,
    shadowColor: '#00000025',
  },

  row: {
    paddingVertical: SH(12),
    borderBottomWidth: 1,
    borderColor: "#e3edf1ff",
  },

  label: {
    fontSize: SF(13),
    color: Colors.darkGray,
    fontFamily: Fonts.Inter_Regular,
  },

  value: {
    fontSize: SF(14),
    fontFamily: Fonts.Inter_Medium,
    color: Colors.black,
    marginTop: SH(2),
  },
  contactSupport:{
    fontSize:SF(13),
    fontFamily:Fonts.Inter_Medium
  }
});

export default styles;
