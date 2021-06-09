# react-native-keyboard-tools
> A list of components and tools that help to work with the keyboard in react-native

## KeyboardAwareScrollView

A ScrollView component that handles keyboard appearance and automatically scrolls to focused `TextInput`.

## Installation

Installation can be done through `npm` or `yarn`:

```shell
npm i react-native-keyboard-tools --save
```

```shell
yarn add react-native-keyboard-tools
```

## Usage

```js
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
```

```jsx
<KeyboardAwareScrollView>
  <View>
    <TextInput />
  </View>
  <View>
    <TextInput />
  </View>
  <View>
    <TextInput />
  </View>
</KeyboardAwareScrollView>
```

## License

MIT.

## Author

Andrii Tiertyshnyi

## Inspired
By https://github.com/wix/react-native-keyboard-aware-scrollview
