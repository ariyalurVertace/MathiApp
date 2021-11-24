import {Dimensions} from "react-native";

const {width, height} = Dimensions.get("window");

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 720;
const guidelineBaseHeight = 1280;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;
const percentageHeight = percentage => (percentage / 100) * height;
const percentageWidth = percentage => (percentage / 100) * width;

export {scale, verticalScale, moderateScale, percentageHeight, percentageWidth};
