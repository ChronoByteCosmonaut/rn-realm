import { Skottie } from "react-native-skottie";
// DotLottie files are supported as well!
import LottieAnimationFile from "../assets/loader.json";

export default function App() {
  return (
    <Skottie
      style={{ flex: 1 }}
      source={LottieAnimationFile}
      onAnimationFinish={(isCancelled) => {
        console.log("Finished!");
        console.log("Is cancelled : ", isCancelled);
      }}
      autoPlay={true}
    />
  );
}
