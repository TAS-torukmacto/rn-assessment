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
export default class Scheduler extends Component {
  static navigationOptions = {
    title: "Awesome Scheduler"
  };

  constructor(props) {
    super(props);
    this.state = {
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
      ],
      selectedActivity: null,
      daySelected: null,
      displayModal: false
    };
  }

  componentWillMount() {}

  onLongPressed = (id, day) => {
    this.selectedActivityDay = day;
    this.setState({ selectedActivity: id, displayModal: true });
  };

  onModalClose = () => {
    this.setState({
      displayModal: false,
      selectedActivity: null,
      daySelected: null
    });
  };

  onMoveActivity = () => {};

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.bannerText}> Toruk Macto Schedule week 1 </Text>
        </View>
        <View style={styles.content}>
          {WEEK.map(day => {
            return (
              <View key={day} style={styles.dayView}>
                <View style={styles.dayTextView}>
                  <Text>{day}</Text>
                </View>
                <DaySchedule
                  day={day}
                  data={this.state[day]}
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
                  Select a date to move the activity
                </Text>
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
  constructor(props) {
    super(props);
    this.state = {
        data : this.props.data
    };
  }

  componentDidMount = () => {};

  componentWillReceiveProps = () => {};

  render() {
    const { data } = this.props;
    if (!data) {
      return;
    }

    return (
      <View style={styles.dayScheduleScrollView}>
        {this.state.data.map(({ title, id }) => (
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
