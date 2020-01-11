import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
  Modal
} from "react-native";

const WIDTH = Dimensions.get("window").width;
const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const lightGrey = "#D3D3D3";

export default class Scheduler extends Component {
  static navigationOptions = {
    title: "Awesome Scheduler"
  };

  constructor(props) {
    super(props);
    this.state = {
      days: {
        Mon: [],
        Tue: [
          { id: 102, title: "Table Tennis" },
          { id: 104, title: "Swimming" }
        ],
        Wed: [{ id: 101, title: "Cycling" }],
        Thu: [{ id: 108, title: "Rest" }],
        Fri: [
          { id: 103, title: "Badminton" },
          { id: 109, title: "KickBoxing" }
        ]
      },
      selectedActivity: null,
      daySelected: null,
      displayModal: false
    };
  }

  onLongPressed = (id, day) => {
    this.setState({
      selectedActivity: id,
      displayModal: true,
      daySelected: day
    });
  };

  onModalClose = () => {
    this.selectedActivityDay = null;
    this.setState({
      displayModal: false,
      selectedActivity: null,
      daySelected: null
    });
  };

  onMoveActivity = () => {
    const { days, selectedActivity, daySelected } = this.state;

    const activityDay = Object.keys(days).find(day => {
      const activities = days[day];
      return activities.some(activity => activity.id === selectedActivity);
    });

    const activitySelectedObject = days[activityDay].find(
      activity => activity.id === selectedActivity
    );

    const newDays = Object.keys(days).reduce((acc, day) => {
      const activities = days[day];

      const activityRemoved = activities.filter(
        activity => activity !== activitySelectedObject
      );

      return {
        ...acc,
        [day]:
          day === daySelected
            ? [...days[day], activitySelectedObject]
            : activityRemoved
      };
    }, {});

    this.setState({ days: newDays, displayModal: false });
  };

  onModalDayPress = day => {
    this.selectedActivityDay = day;
    this.setState({ daySelected: day });
  };

  render() {
    const { daySelected } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {WEEK.map(day => {
            return (
              <View key={day} style={styles.dayView}>
                <View style={styles.dayTextView}>
                  <Text>{day}</Text>
                </View>
                <DaySchedule
                  day={day}
                  data={this.state.days[day]}
                  onLongPressed={this.onLongPressed}
                />
              </View>
            );
          })}
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
                  Select a day to move the activity
                </Text>
              </View>

              <View style={styles.daySelectorView}>
                {WEEK.map(day => {
                  return (
                    <TouchableWithoutFeedback
                      key={day}
                      onPress={() => this.onModalDayPress(day)}
                    >
                      <View
                        style={[
                          styles.dayButton,
                          {
                            backgroundColor:
                              daySelected === day ? "green" : lightGrey
                          }
                        ]}
                      >
                        <Text>{day}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>

              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.buttonView}
                  onPress={this.onModalClose}
                >
                  <Text style={styles.buttonText}> Cancel </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={
                    !this.state.daySelected || !this.selectedActivityDay
                  }
                  style={[
                    styles.buttonView,
                    {
                      opacity:
                        !this.state.daySelected || !this.selectedActivityDay
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
  render() {
    const { data } = this.props;
    if (!data) {
      return;
    }

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
    paddingVertical: 5,
    justifyContent: "center",
    marginHorizontal: 8
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
    borderWidth: 1
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
