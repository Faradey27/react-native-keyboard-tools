import React, {
  ForwardedRef,
  forwardRef,
  memo,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useMemo,
} from "react";
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
  automaticallyAdjustContentInsets?: boolean;
  restoreScrollOnKeyboardHide?: boolean;
} & ScrollViewProps;

export type KeyboardAwareScrollViewRef = {
  scrollTo: ({
    x,
    y,
    animated,
  }: {
    x?: number;
    y?: number;
    animated?: boolean;
  }) => void;
};

const KeyboardAwareScrollViewRaw = forwardRef(
  (
    {
      automaticallyAdjustContentInsets,
      restoreScrollOnKeyboardHide = true,
      onScroll,
      ...props
    }: KeyboardAwareScrollViewProps,
    ref?: ForwardedRef<KeyboardAwareScrollViewRef>
  ) => {
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

    useImperativeHandle(
      ref,
      () => ({
        scrollTo: ({ x = 0, y = 0, animated = true }) => {
          keyboardAwareViewRef?.current?.scrollTo({ x, y, animated });
        },
      }),
      [keyboardAwareViewRef]
    );

    return (
      <ScrollView
        {...props}
        automaticallyAdjustContentInsets={automaticallyAdjustContentInsets}
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

export const KeyboardAwareScrollView = memo(KeyboardAwareScrollViewRaw);
