import { Image, StyleSheet, View, Button } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useTimerStore from "@/notifications/useTimer";

export default function HomeScreen() {
  const timerState = useTimerStore.use.timerState();
  const startTimer = useTimerStore.use.startTimer();
  const pauseTimer = useTimerStore.use.pauseTimer();
  const resetTimer = useTimerStore.use.resetTimer();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Notifee Test</ThemedText>
      </ThemedView>
      <View>
        <Button title="Show notification" onPress={startTimer} />
        <Button title="Show notification" onPress={pauseTimer} />
      </View>
    </ParallaxScrollView>
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
