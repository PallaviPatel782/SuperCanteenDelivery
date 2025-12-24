import React, { useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Pressable,
    TouchableWithoutFeedback,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { SH, SW } from "../utils/Responsiveness/Dimensions";
import Colors from "../utils/Colors/Colors";
import Fonts from "../utils/Fonts/Fonts";

interface Props {
    visible: boolean;
    onClose: () => void;
    options: { title: string; data: string[] }[];
    onApply: (selectedFilters: string[], dateRange?: string) => void;
    selectedFilters?: string[];
    startDate?: string;
    endDate?: string;
}

const CommonFilterModal: React.FC<Props> = ({
    visible,
    onClose,
    options,
    onApply,
    selectedFilters: initialFilters = [],
    startDate: initialStart,
    endDate: initialEnd,
}) => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>(initialFilters);
    const [dateRange, setDateRange] = useState<{ start: string | null; end: string | null }>({
        start: initialStart || null,
        end: initialEnd || null,
    });
    const [showCalendar, setShowCalendar] = useState(false);


    useEffect(() => {
        setSelectedFilters(initialFilters);
        setDateRange({ start: initialStart || null, end: initialEnd || null });
        setShowCalendar(initialFilters.includes("Custom Date"));
    }, [visible]);


    const toggleFilter = (opt: string) => {
        if (opt === "Custom Date") {
            setShowCalendar(true);
            if (!selectedFilters.includes(opt)) {
                setSelectedFilters(prev => [...prev, opt]);
            }
            return;
        }
        setSelectedFilters(prev =>
            prev.includes(opt) ? prev.filter(f => f !== opt) : [...prev, opt]
        );
    };


    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}  >
            {/* Modal content */}
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" }}>
                    <Pressable style={{ backgroundColor: "#fff", borderTopLeftRadius: 18, borderTopRightRadius: 18, paddingVertical: SH(20), paddingHorizontal: SW(20) }}>
                        <Text style={{ fontSize: SH(16), fontFamily: Fonts.Inter_Bold, marginBottom: SH(20), color: Colors.primary }}>Filter Records</Text>

                        {!showCalendar &&
                            options.map(section => (
                                <View key={section.title} style={{ marginBottom: SH(12) }}>
                                    <Text style={{ fontSize: SH(14), fontFamily: Fonts.Inter_SemiBold, color: Colors.primary, marginBottom: SH(6) }}>{section.title}</Text>
                                    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: SW(10) }}>
                                        {section.data.map(opt => (
                                            <TouchableOpacity
                                                key={opt}
                                                onPress={() => toggleFilter(opt)}
                                                style={{
                                                    paddingVertical: SH(6),
                                                    paddingHorizontal: SW(14),
                                                    borderRadius: SH(20),
                                                    backgroundColor: selectedFilters.includes(opt) ? Colors.primary : "#F4F4F4",
                                                }}
                                            >
                                                <Text style={{ color: selectedFilters.includes(opt) ? "#fff" : Colors.black }}>{opt}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            ))}

                        {showCalendar && (
                            <Calendar
                                onDayPress={(day) => {
                                    if (!dateRange.start || (dateRange.start && dateRange.end)) {
                                        setDateRange({ start: day.dateString, end: null });
                                    } else {
                                        let start = dateRange.start;
                                        let end = day.dateString;
                                        if (new Date(day.dateString) < new Date(start)) [start, end] = [end, start];
                                        setDateRange({ start, end });
                                        setShowCalendar(false);
                                    }
                                }}
                                markingType="period"
                                markedDates={
                                    dateRange.start && dateRange.end
                                        ? {
                                            [dateRange.start]: { startingDay: true, color: Colors.primary, textColor: "#fff" },
                                            [dateRange.end]: { endingDay: true, color: Colors.primary, textColor: "#fff" },
                                        }
                                        : dateRange.start
                                            ? { [dateRange.start]: { startingDay: true, endingDay: true, color: Colors.primary, textColor: "#fff" } }
                                            : {}
                                }
                            />
                        )}



                        {!showCalendar && (
                            <TouchableOpacity
                                onPress={() => onApply(
                                    selectedFilters,
                                    dateRange.start && dateRange.end ? `${dateRange.start}|${dateRange.end}` : undefined
                                )}
                                style={{ marginTop: SH(10), backgroundColor: Colors.primary, paddingVertical: SH(12), borderRadius: SH(12), alignItems: "center" }}
                            >
                                <Text style={{ color: "#fff", fontSize: SH(14), fontFamily: Fonts.Inter_SemiBold }}>Apply Filters</Text>
                            </TouchableOpacity>

                        )}
                    </Pressable>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default CommonFilterModal;
