import React, { useEffect, useRef, useState } from "react";
import { Text, StyleSheet, Animated, View } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { WifiOff, Wifi } from "lucide-react-native";

const InternetStatus = ({ onReconnect }: { onReconnect?: () => void }) => {
    const [isConnected, setIsConnected] = useState(true);
    const slideAnim = useRef(new Animated.Value(-80)).current;
    const prevConnected = useRef<boolean | null>(null);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            const connected = !!state.isConnected;
            Animated.timing(slideAnim, {
                toValue: connected ? -80 : 0,
                duration: 100,
                useNativeDriver: true,
            }).start();
            if (prevConnected.current === false && connected) {
                onReconnect?.();
            }

            prevConnected.current = connected;
            setIsConnected(connected);
        });

        return unsubscribe;
    }, [onReconnect, slideAnim]);

    return (
        <>
            {!isConnected && (
                <View style={styles.offlineOverlay}>
                    <WifiOff size={64} color="#DC2626" />
                    <Text style={styles.offlineTitle}>No Internet Connection</Text>
                    <Text style={styles.offlineSubtitle}>
                        Please check your network and try again
                    </Text>
                </View>
            )}
            <Animated.View
                style={[
                    styles.container,
                    { transform: [{ translateY: slideAnim }] },
                ]}
            >
                {isConnected ? (
                    <>
                        <Wifi size={18} color="#22C55E" />
                        <Text style={styles.textOnline}>Back Online • Syncing…</Text>
                    </>
                ) : (
                    <>
                        <WifiOff size={18} color="#fff" />
                        <Text style={styles.text}>No Internet Connection</Text>
                    </>
                )}
            </Animated.View>
        </>
    );
};

export default InternetStatus;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: "#DC2626",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
        gap: 8,
    },
    text: {
        color: "#fff",
        fontSize: 14,
        fontFamily: "Inter-Regular",
    },
    textOnline: {
        color: "#22C55E",
        fontSize: 14,
        fontFamily: "Inter-Regular",
    },
    offlineOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        paddingHorizontal: 20,
    },
    offlineTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 16,
        color: "#111827",
    },
    offlineSubtitle: {
        fontSize: 14,
        color: "#6B7280",
        marginTop: 8,
        textAlign: "center",
    },
});
