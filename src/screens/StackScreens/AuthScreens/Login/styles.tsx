import { StyleSheet } from 'react-native';
import { SH, SW, SF } from '../../../../utils/Responsiveness/Dimensions';
import Colors from '../../../../utils/Colors/Colors';
import Fonts from '../../../../utils/Fonts/Fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },

  topImage: {
    width: '100%',
    height: SH(240),
    alignSelf: 'center',
  },

  card: {
    backgroundColor: Colors.White,
    paddingHorizontal: SW(22),
    paddingVertical: SH(30),
    borderTopLeftRadius: SH(30),
    borderTopRightRadius: SH(30),
    marginTop: SH(-35),
  },

  title: {
    fontSize: SF(18),
    fontFamily: Fonts.Inter_Bold,
    color: Colors.black,
    marginBottom: SH(5),
    textAlign: 'center',
  },

  subtitle: {
    fontSize: SF(12),
    fontFamily: Fonts.Inter_Regular,
    color: Colors.darkGray,
    marginBottom: SH(22),
    textAlign: 'center',
    lineHeight: SH(18),
  },

  forgotContainer: {
    marginTop: SH(20),
    alignSelf: 'flex-end',
    flexDirection:"row"
  },
  forgotLink: {
    fontSize: SF(12),
    color: '#007AFF',
    fontFamily: Fonts.Inter_SemiBold,
  },
});

export default styles;
