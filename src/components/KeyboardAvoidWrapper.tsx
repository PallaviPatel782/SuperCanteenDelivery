// KeyboardAvoidWrapper.tsx
import React, { ReactNode } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../utils/Colors/Colors';
import { SH } from '../utils/Responsiveness/Dimensions';

type Props = {
  children: ReactNode;
  bottomComponent?: ReactNode;
  scrollEnabled?: boolean;
  contentStyle?: object;
};

const KeyboardAvoidWrapper: React.FC<Props> = ({
  children,
  bottomComponent,
  scrollEnabled = true,
  contentStyle = {},
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root]}>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scrollContent, contentStyle]}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={Platform.OS === 'ios' ? 20 : 50}
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}
      >
        {children}
        {bottomComponent && (
          <View style={[styles.bottomContainer, { marginBottom: insets.bottom }]}>
            {bottomComponent}
          </View>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.White },
  scrollContent: { flexGrow: 1, backgroundColor: Colors.White, justifyContent: 'flex-start' },
  bottomContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop:SH(50),
  },
});

export default KeyboardAvoidWrapper;
