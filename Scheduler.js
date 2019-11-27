import React, { Component } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    Dimensions,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Modal
} from "react-native";

const WIDTH = Dimensions.get("window").width;
const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri"];
export default class Scheduler extends Component {
    static navigationOptions = {
        title: "Awesome Scheduler"
    };

    constructor(props) {
        super(props);
        this.state = {
            activities: {
                Mon: [],
                Tue: [
                    { id: 102, title: "Table Tennis" },
                    { id: 104, title: "Swimming" }
                ],
                Wed: [{ id: 103, title: "Cycling" }],
                Thu: [{ id: 108, title: "Rest" }],
                Fri: [
                    { id: 103, title: "Badminton" },
                    { id: 109, title: "KickBoxing" }
                ]
            },
            selectedActivity: null,
            selectedActivityDay: null,
            defaultSelectedDay: null,
            displayModal: false
        };
    }

    componentWillMount() {}

    onLongPressed = (id, day) => {
        this.setState({ selectedActivityDay: day, defaultSelectedDay: day, selectedActivity: id, displayModal: true });
    };

    get initialModalValues() {
        return {
            displayModal: false,
            selectedActivity: null,
            selectedActivityDay: null,
            defaultSelectedDay: null
        }
    };

    onModalClose = () => {
        this.setState(this.initialModalValues);
    };

    onChangeSelectedDay = (newDay) => {
        this.setState({selectedActivityDay: newDay});
    };

    onMoveActivity = () => {
        const {activities, defaultSelectedDay, selectedActivityDay, selectedActivity} = Object.assign({}, this.state);
        let prevDayActivities = Object.assign([], activities[defaultSelectedDay]);
        let nextDayActivities = Object.assign([], activities[selectedActivityDay]);
        let activity = (prevDayActivities.find(e => e.id == selectedActivity));
        activity = JSON.parse(JSON.stringify(activity));
        let activityIndex = prevDayActivities.indexOf(activity);
        prevDayActivities.splice(activityIndex, 1);
        nextDayActivities.push(activity);
        //activities[defaultSelectedDay] = prevDayActivities;
        //activities[selectedActivityDay] = nextDayActivities;
        // activities[defaultSelectedDay.toString()] = prevDayActivities.filter(e => e.id !== activityIndex);
        // activities[selectedActivityDay.toString()] = nextDayActivities.concat(activity);
        // const newState = {...this.initialModalValues, activities: updatedActivities};
        console.warn(prevDayActivities);
        console.warn(nextDayActivities);
        this.setState({
            ...this.initialModalValues,
            activities : {
                ...activities,
                [defaultSelectedDay]: prevDayActivities,
                [selectedActivityDay]: nextDayActivities
            }
        });
    };

    render() {
        const renderDayButton = (day, isSelected) => {
            return (
                <TouchableHighlight key={day} style={[styles.modalDaysButton, isSelected ? styles.modalDaysButtonSelected : null]}
            onPress={() => this.onChangeSelectedDay(day)}>
        <Text style={{ textAlign: "center" }}>{day}</Text>
            </TouchableHighlight>
        );
        };
        const renderDayButtonsContainer = days => {
            const {selectedActivityDay} = this.state;
            if(selectedActivityDay) {
                return days.map(day => {
                    const isSelected = selectedActivityDay === day;
                    return (renderDayButton(day, isSelected));
                });
            } else {
                return null;
            }
        };
        const renderActivities = () => {
            return WEEK.map(day => {
                return (
                    <View key={day} style={styles.dayView}>
            <View style={styles.dayTextView}>
            <Text>{day}</Text>
                </View>
                <DaySchedule
                day={day}
                data={this.state.activities[day]}
                onLongPressed={this.onLongPressed}
                />
                </View>
            );
            });
        };
        return (
            <View style={styles.container}>
    <View style={styles.headerView}>
    <Text style={styles.bannerText}> Toruk Macto Schedule week 1 </Text>
        </View>
        <View style={styles.content}>
        {renderActivities()}
    </View>
        <Modal
        animationType="slide"
        visible={this.state.displayModal}
        onRequestClose={this.onModalClose}
        transparent
        >
        <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
    <View>
        <Text style={{ textAlign: "center" }}>
        Select a date to move the activity
        </Text>
        </View>

        <View style={styles.modalDaysContainer}>
        {renderDayButtonsContainer(WEEK)}
    </View>

        <View style={styles.modalButtonContainer}>
    <TouchableOpacity
        style={styles.buttonView}
        onPress={this.onModalClose}
    >
    <Text style={styles.buttonText}> Cancel </Text>
        </TouchableOpacity>

        <TouchableOpacity
        disabled={this.state.selectedActivityDay === this.state.defaultSelectedDay}
        style={[
                styles.buttonView,
        {
            opacity:
                this.state.selectedActivityDay === this.state.defaultSelectedDay
                    ? 0.2
                    : 1
        }
    ]}
        onPress={this.onMoveActivity}
    >
    <Text style={styles.buttonText}> Move </Text>
        </TouchableOpacity>
        </View>
        </View>
        </View>
        </Modal>
        </View>
    );
    }
}

class DaySchedule extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {};

    componentWillReceiveProps = () => {};

    render() {
        const { data } = this.props;

        return (
            <View style={styles.dayScheduleScrollView}>
        {data.map(({ title, id }) => (
            <TouchableOpacity
            style={styles.activityItemView}
            key={id}
            delayLongPress={800}
            onLongPress={() => {
            this.props.onLongPressed(id, this.props.day);
        }}
        >
        <Text style={styles.activityText}>{title}</Text>
        </TouchableOpacity>
        ))}
    </View>
    );
    }
}

//////////// STYLES ////////////////////////
const styles = StyleSheet.create({
    container: { flex: 1 },
    headerView: { flex: 0.1, borderBottomWidth: 1 },
    contentView: { flex: 0.9 },
    bannerText: {
        fontWeight: "700",
        fontSize: 16,
        textAlign: "center",
        padding: 10
    },
    activityText: { color: "white" },
    activityItemView: {
        backgroundColor: "grey",
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 6,
        justifyContent: "center",
        marginHorizontal: 8,
        minHeight: 32
    },
    dayView: {
        flexDirection: "row",
        borderBottomWidth: 1,
        justifyContent: "space-between",
        height: 50,
        alignItems: "center"
    },
    dayTextView: { alignItems: "center", justifyContent: "center" },
    dayScheduleScrollView: { flex: 1, marginVertical: 10, flexDirection: "row" },
    buttonText: { textAlign: "center" },
    buttonView: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5,
    },
    modalContainer: {
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    modalContent: {
        backgroundColor: "white",
        justifyContent: "space-around",
        alignItems: "center",
        height: 250,
        position: "absolute",
        bottom: 0
    },
    modalDaysContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: WIDTH
    },
    modalDaysButton: {
        minHeight: 48,
        maxHeight: 48,
        minWidth: 48,
        paddingVertical: 4,
        paddingHorizontal: 8,
        justifyContent: "space-around",
        borderRadius: 5,
        backgroundColor: "#aaa",
        flex: -1
    },
    modalDaysButtonSelected: {
        backgroundColor: '#80ff00'
    },
    modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: WIDTH,
        marginVertical: 15
    },
    dayButton: {
        padding: 10,
        justifyContent: "center",
        borderRadius: 5,
        alignItems: "center"
    },
    daySelectorView: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: WIDTH,
        paddingHorizontal: 10
    }
});

