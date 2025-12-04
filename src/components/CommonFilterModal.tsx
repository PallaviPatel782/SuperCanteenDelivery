import React, { useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    BackHandler,
    Pressable,
    TouchableWithoutFeedback,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { X } from "lucide-react-native";
import { SH, SW } from "../utils/Responsiveness/Dimensions";
import Colors from "../utils/Colors/Colors";
import Fonts from "../utils/Fonts/Fonts";

interface Props {
    visible: boolean;
    onClose: () => void;
    options: {
        title: string;
        data: string[];
    }[];
    onSelect: (value: string, dateRange?: string) => void;
}

const CommonFilterModal: React.FC<Props> = ({
    visible,
    onClose,
    options,
    onSelect,
}) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [dateRange, setDateRange] = useState<{ start: string | null; end: string | null }>({
        start: null,
        end: null,
    });

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            if (visible) {
                onClose();
                setShowCalendar(false);
                return true;
            }
            return false;
        });

        return () => backHandler.remove();
    }, [visible]);

    const onDayPress = (day: { dateString: string }) => {
        const selected = day.dateString;

        // First date
        if (!dateRange.start) {
            setDateRange({ start: selected, end: null });
            return;
        }

        // Second date
        if (!dateRange.end) {
            let start = dateRange.start;
            let end = selected;

            if (new Date(selected) < new Date(start)) {
                [start, end] = [end, start];
            }

            // Pass date range to parent
            onSelect("Custom Date", `${start}|${end}`);

            // Reset calendar state
            setDateRange({ start: null, end: null });
            setShowCalendar(false);
            onClose();
        }
    };

    const getMarkedDates = () => {
        const marks: Record<string, any> = {};

        if (dateRange.start) {
            marks[dateRange.start] = {
                startingDay: true,
                color: Colors.primary,
                textColor: "#fff",
            };
        }

        if (dateRange.end) {
            marks[dateRange.end] = {
                endingDay: true,
                color: Colors.primary,
                textColor: "#fff",
            };
        }

        if (dateRange.start && dateRange.end) {
            const start = new Date(dateRange.start);
            const end = new Date(dateRange.end);

            let temp = new Date(start);
            temp.setDate(temp.getDate() + 1);

            while (temp < end) {
                const dateStr = temp.toISOString().split("T")[0];
                marks[dateStr] = {
                    color: "#D1E8FF",
                    textColor: "#000",
                };
                temp.setDate(temp.getDate() + 1);
            }
        }

        return marks;
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <TouchableWithoutFeedback
                onPress={() => {
                    onClose();
                    setShowCalendar(false);
                }}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(0,0,0,0.4)",
                        justifyContent: "flex-end",
                    }}
                >
                    <Pressable
                        onPress={() => { }}
                        style={{
                            backgroundColor: "#fff",
                            borderTopLeftRadius: 18,
                            borderTopRightRadius: 18,
                            paddingVertical: SH(20),
                            paddingHorizontal: SW(20),
                        }}
                    >
                        {/* CLOSE BUTTON */}
                        <View
                            style={{
                                position: "absolute",
                                top: SH(-18),
                                left: 0,
                                right: 0,
                                alignItems: "center",
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    onClose();
                                    setShowCalendar(false);
                                }}
                                style={{
                                    width: SH(40),
                                    height: SH(40),
                                    borderRadius: SH(40),
                                    backgroundColor: "rgba(0,0,0,0.6)",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <X size={22} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        {/* TITLE */}
                        <Text
                            style={{
                                fontSize: SH(16),
                                fontFamily: Fonts.Inter_Bold,
                                marginBottom: SH(20),
                                color: Colors.primary,
                            }}
                        >
                            Filter Records
                        </Text>
                        {!showCalendar ? (
                            options.map((section: any) => (
                                <View key={section.title} style={{ marginBottom: SH(12) }}>
                                    <Text
                                        style={{
                                            fontSize: SH(14),
                                            fontFamily: Fonts.Inter_SemiBold,
                                            color: Colors.primary,
                                            marginBottom: SH(6),
                                        }}
                                    >
                                        {section.title}
                                    </Text>
                                    <View style={{
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                        gap: SW(10),
                                        marginBottom: SH(10)
                                    }}>
                                        {section.data.map((opt: string) => (
                                            <TouchableOpacity
                                                key={opt}
                                                onPress={() => {
                                                    if (opt === "Custom Date") {
                                                        setShowCalendar(true);
                                                    } else {
                                                        onSelect(opt);
                                                        onClose();
                                                    }
                                                }}
                                                style={{
                                                    paddingVertical: SH(6),
                                                    paddingHorizontal: SW(14),
                                                    borderRadius: SH(20),
                                                    backgroundColor: "#F4F4F4",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: SH(14),
                                                        fontFamily: Fonts.Inter_Regular,
                                                        color: Colors.black,
                                                    }}
                                                >
                                                    {opt}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>

                                </View>
                            ))
                        ) : (
                            <Calendar
                                onDayPress={onDayPress}
                                markingType="period"
                                markedDates={getMarkedDates()}
                                theme={{
                                    todayTextColor: Colors.primary,
                                    selectedDayBackgroundColor: Colors.primary,
                                }}
                                style={{
                                    borderRadius: 10,
                                    marginBottom: SH(10),
                                }}
                            />
                        )}

                    </Pressable>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default CommonFilterModal;
