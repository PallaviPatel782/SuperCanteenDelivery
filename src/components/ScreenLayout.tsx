import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SH, SW } from '../utils/Responsiveness/Dimensions';

interface Props {
    children: React.ReactNode;
    bottomComponent?: React.ReactNode;
    scrollable?: boolean;   // <-- ADD THIS
}

const ScreenLayout: React.FC<Props> = ({ children, bottomComponent, scrollable }) => {
    const Container = scrollable ? ScrollView : View;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <Container
                {...(scrollable ? {
                    contentContainerStyle: { paddingBottom: bottomComponent ? SH(80) : SH(10) }
                } : {})}
                style={{
                    flex: 1,
                    // paddingVertical: SH(5),
                    // paddingHorizontal: SW(5)
                }}
            >
                {children}
            </Container>

            {bottomComponent && (
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        paddingHorizontal: SW(16),
                        backgroundColor: '#fff',
                        borderTopWidth: 1,
                        borderColor: '#eee',
                        paddingVertical: SH(10)
                    }}
                >
                    {bottomComponent}
                </View>
            )}
        </SafeAreaView>
    );
};

export default ScreenLayout;
