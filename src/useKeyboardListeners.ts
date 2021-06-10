import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { DeviceEventEmitter, Keyboard, KeyboardEvent } from "react-native";

import { ScrollViewWithExtras } from "./useScrollView";

type UseKeyboardListeners = {
  keyboardAwareViewRef: RefObject<ScrollViewWithExtras>;
  restoreScrollOnKeyboardHide: boolean;
};

const DELAY_AFTER_KEYBOARD_HIDDEN = 120;

export const useKeyboardListeners = ({
  keyboardAwareViewRef,
  restoreScrollOnKeyboardHide,
}: UseKeyboardListeners) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const keyboardHideTimer = useRef<{
    timerId: ReturnType<typeof setTimeout>;
  }>({
    timerId: -1 as any,
  });

  const onKeyboardWillShow = useCallback(
    (event: KeyboardEvent) => {
      clearTimeout(keyboardHideTimer?.current?.timerId);

      const nextKeyboardHeight = event.endCoordinates.height;

      if (keyboardHeight === nextKeyboardHeight) {
        return;
      }

      setKeyboardHeight(nextKeyboardHeight);
    },
    [keyboardHeight, setKeyboardHeight]
  );

  const onKeyboardWillHide = useCallback(() => {
    if (!keyboardHideTimer?.current || !restoreScrollOnKeyboardHide) {
      return;
    }
    // we set a timer to cover a case, when after one type of TextInput we instantly focus on another
    keyboardHideTimer.current.timerId = setTimeout(() => {
      setKeyboardHeight(0);

      if (
        keyboardAwareViewRef &&
        keyboardAwareViewRef.current &&
        keyboardAwareViewRef.current.contentOffset &&
        keyboardAwareViewRef.current.contentOffset.y !== undefined
      ) {
        const yOffset = Math.max(
          keyboardAwareViewRef.current.contentOffset.y - keyboardHeight,
          0
        );
        keyboardAwareViewRef.current.scrollTo({
          x: 0,
          y: yOffset,
          animated: true,
        });
      }
    }, DELAY_AFTER_KEYBOARD_HIDDEN);
  }, [keyboardAwareViewRef, keyboardHeight, restoreScrollOnKeyboardHide]);

  useEffect(() => {
    const KeyboardEventsObj = Keyboard || DeviceEventEmitter;

    const keyboardWillShowSubscribtion = KeyboardEventsObj.addListener(
      "keyboardWillShow",
      onKeyboardWillShow
    );
    const keyboardWillHideSubscribtion = KeyboardEventsObj.addListener(
      "keyboardWillHide",
      onKeyboardWillHide
    );

    return () => {
      keyboardWillShowSubscribtion.remove();
      keyboardWillHideSubscribtion.remove();
    };
  }, [onKeyboardWillShow, onKeyboardWillHide]);

  return { keyboardHeight, keyboardAwareViewRef };
};
