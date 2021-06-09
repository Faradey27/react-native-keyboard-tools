import { useCallback, useRef } from "react";
import {
  findNodeHandle,
  LayoutChangeEvent,
  LayoutRectangle,
  NativeModules,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";

export type ScrollViewWithExtras = ScrollView & {
  layout?: LayoutRectangle;
  contentOffset?: { x: number; y: number };
  contentSize?: number;
};

const { ScrollViewManager } = NativeModules;

export const useKeyboardScrollView = () => {
  const keyboardAwareViewRef = useRef<ScrollViewWithExtras>(null);

  const onContentSizeChange = useCallback(() => {
    if (ScrollViewManager && ScrollViewManager.getContentSize) {
      ScrollViewManager.getContentSize(
        findNodeHandle(keyboardAwareViewRef.current),
        (contentSize: number) => {
          if (keyboardAwareViewRef.current) {
            keyboardAwareViewRef.current.contentSize = contentSize;
          }
        }
      );
    }
  }, [keyboardAwareViewRef]);

  const onScrollViewLayout = useCallback(
    (layoutEvent: LayoutChangeEvent) => {
      const layout = layoutEvent?.nativeEvent?.layout;
      if (layout && keyboardAwareViewRef?.current) {
        keyboardAwareViewRef.current.layout = layout;
        keyboardAwareViewRef.current.contentOffset = { x: 0, y: 0 };
      }
      onContentSizeChange();
    },
    [onContentSizeChange]
  );

  const onScrollViewScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (keyboardAwareViewRef.current) {
        const contentOffset = event?.nativeEvent?.contentOffset;
        keyboardAwareViewRef.current.contentOffset = contentOffset;
      }
      onContentSizeChange();
    },
    [onContentSizeChange]
  );

  return {
    keyboardAwareViewRef,
    onScrollViewScroll,
    onScrollViewLayout,
    onContentSizeChange,
  };
};
