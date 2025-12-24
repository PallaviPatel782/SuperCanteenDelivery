import React from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SF, SH, SW } from "../utils/Responsiveness/Dimensions";

interface EmptyStateProps {
    message: string;
    icon?: string;
    iconSize?: number;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    message,
    icon = "file-tray-outline",
    iconSize = 30,
}) => {
    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: SH(40),
            }}
        >
            <Ionicons name={icon} size={iconSize} color="#999" />
            <Text
                style={{
                    marginTop: SH(10),
                    fontSize: SF(11),
                    color: "#777",
                    fontFamily: "Inter-Medium",
                }}
            >
                {message}
            </Text>
        </View>
    );
};

export default EmptyState;
