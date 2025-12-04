import { StyleSheet } from 'react-native';
import Colors from '../../../../utils/Colors/Colors';
import { SH, SF, SW } from '../../../../utils/Responsiveness/Dimensions';
import Fonts from '../../../../utils/Fonts/Fonts';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.White },
  content: {
    alignItems: 'center',
    marginTop: SH(40),
  },
  title: {
    fontSize: SF(20),
    fontFamily:Fonts.Inter_Bold,
    color: Colors.black,
    marginBottom: SH(10),
  },
  subtitle: {
    fontSize: SF(14),
    color: Colors.darkGray,
    textAlign: 'center',
    marginBottom: SH(30),
    lineHeight: SH(20),
    fontFamily:Fonts.Inter_Regular,
    textTransform: "capitalize",
    marginHorizontal: SW(25)
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  otpBox: {
    width: SW(50),
    height: SH(50),
    borderWidth: 1,
    borderColor: Colors.darkGray,
    borderRadius: 8,
    fontSize: SF(20),
    color: Colors.black,
    marginHorizontal: SW(5),
  },
});

export default styles;
