import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };

// import { horizontalScale, moderateScale, verticalScale } from '../themes/Metrics';

// const styles = StyleSheet.create({
//     container: {
//         height: verticalScale(70),
//         width: horizontalScale(150),
//         marginTop: verticalScale(100),
//     },
//     containerText: {
//         fontSize: moderateScale(18)
//     }
// });

// import {Dimensions} from 'react-native';

// const {width, height} = Dimensions.get('window');

// const guidelineBaseWidth = 375;
// const guidelineBaseHeight = 812;

// const horizontalScale = (size) =>
//   parseInt(Math.round((width / guidelineBaseWidth) * size), 10);
// const verticalScale = (size) =>
//   parseInt(Math.round((height / guidelineBaseHeight) * size), 10);
// const moderateScale = (size, factor = 0.5) =>
//   parseInt(Math.round(size + (horizontalScale(size) - size) * factor), 10);

// export {horizontalScale, verticalScale, moderateScale};
