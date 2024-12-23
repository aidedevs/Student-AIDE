import Animated, {
  interpolate,
  runOnJS,
  scrollTo,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const pullUpAnimation = (pullUpTranslate, setToggleLottie, fetchData) => {
  pullUpTranslate.value = withDelay(
    0,
    withTiming(
      pullUpTranslate.value === 0 ? -100 : 0,
      { duration: 200 },
      (finished) => {
        if (finished) {
          runOnJS(setToggleLottie)(true);
          runOnJS(fetchData)();
        }
      }
    )
  );
};

const gestureHandler = useAnimatedGestureHandler({
  onStart: (_, ctx) => {
    ctx.startY = translationY.value;
    runOnJS(setGestureActive)(true);
  },
  onActive: (event, ctx) => {
    const total = ctx.startY + event.translationY;

    if (total < REFRESH_AREA_HEIGHT) {
      translationY.value = total;
    } else {
      translationY.value = REFRESH_AREA_HEIGHT;
    }

    if (total < 0) {
      translationY.value = 0;
      scrollTo(flatlistRef, 0, total * -1, false);
    }
  },
  onEnd: () => {
    runOnJS(setGestureActive)(false);
    if (translationY.value <= REFRESH_AREA_HEIGHT - 1) {
      translationY.value = withTiming(0, { duration: 200 });
    } else {
      runOnJS(pullUpAnimation)();
    }
    if (!(translationY.value > 0)) {
      runOnJS(setToggleGesture)(false);
    }
  },
});

const handleOnScroll = (event) => {
  const position = event.nativeEvent.contentOffset.y;
  if (position === 0) {
    setToggleGesture(true);
  } else if (position > 0 && toggleGesture && !gestureActive) {
    setToggleGesture(false);
  }
};

const animatedSpace = useAnimatedStyle(() => {
  return {
    height: translationY.value,
  };
});

const pullDownIconSection = useAnimatedStyle(() => {
  const rotate = interpolate(
    translationY.value,
    [0, REFRESH_AREA_HEIGHT],
    [0, 180]
  );
  return {
    transform: [{ rotate: `${rotate}deg` }],
  };
});

const pullUpTranslateStyle = useAnimatedStyle(() => {
  const opacity = interpolate(
    translationY.value,
    [58, REFRESH_AREA_HEIGHT],
    [0, 1]
  );

  return {
    opacity,
    transform: [
      {
        translateY: pullUpTranslate.value,
      },
    ],
  };
});
