import { StyleSheet } from 'react-native';
import Colors from '../Colors/Colors';
import { SF, SH, SW } from '../Responsiveness/Dimensions';
import Fonts from '../Fonts/Fonts';

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    // paddingHorizontal: SW(15),
  },
  textInputContainer: {
    width: '100%',
    marginVertical: SH(7),
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.lightGray || '#ccc',
    borderRadius: SW(10),
    paddingVertical: SH(8),
    paddingHorizontal: SW(15),
    fontSize: SF(14),
    color: Colors.black,
    backgroundColor: Colors.White,
    fontFamily: 'Ubuntu-Regular',
  },
  inputLabel: {
    fontSize: SF(13),
    fontFamily: Fonts.Inter_Medium,
    color: Colors.black,
    marginBottom: SH(5),
  },
});

export default GlobalStyles;
