import React, { memo, ReactNode, useCallback, useMemo } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  ScrollViewProps,
} from "react-native";

import { useKeyboardListeners } from "./useKeyboardListeners";
import { useKeyboardScrollView } from "./useScrollView";

// as we work with keyboard, we can skip majority of events, 200 sounds like good enough magic number
const SCROLL_EVENT_THROTTLE = 200;

type KeyboardAwareScrollViewProps = {
  children: ReactNode;
  restoreScrollOnKeyboardHide?: boolean;
} & ScrollViewProps;

export const KeyboardAwareScrollView = memo(
  ({
    restoreScrollOnKeyboardHide = true,
    onScroll,
    ...props
  }: KeyboardAwareScrollViewProps) => {
    const {
      keyboardAwareViewRef,
      onScrollViewLayout,
      onScrollViewScroll,
      onContentSizeChange,
    } = useKeyboardScrollView();
    const { keyboardHeight } = useKeyboardListeners({
      keyboardAwareViewRef,
      restoreScrollOnKeyboardHide,
    });

    const contentInset = useMemo(
      () => ({ bottom: keyboardHeight }),
      [keyboardHeight]
    );

    const handleScroll = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        onScrollViewScroll(event);
        if (onScroll) {
          onScroll(event);
        }
      },
      [onScroll, onScrollViewScroll]
    );

    return (
      <ScrollView
        {...props}
        contentInset={contentInset}
        ref={keyboardAwareViewRef}
        onLayout={onScrollViewLayout}
        onScroll={handleScroll}
        onContentSizeChange={onContentSizeChange}
        scrollEventThrottle={SCROLL_EVENT_THROTTLE}
      />
    );
  }
);
