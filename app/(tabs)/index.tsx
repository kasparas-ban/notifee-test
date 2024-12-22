import { StyleSheet, View, Button, Text } from "react-native";

import useTimerStore from "@/notifications/useTimer";

export default function HomeScreen() {
  const timerState = useTimerStore.use.timerState();
  const startTimer = useTimerStore.use.startTimer();
  const pauseTimer = useTimerStore.use.pauseTimer();
  const resetTimer = useTimerStore.use.resetTimer();

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text>Notifee Test</Text>
      </View>
      <View style={{ paddingTop: 100 }}>
        <Button title="Show notification" onPress={startTimer} />
        <Button title="Show notification" onPress={pauseTimer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
