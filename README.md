# react-native-keyboard-tools
> A list of components, tools and hooks that help to work with the keyboard in react-native

## Demo and playground

![](demo.gif)

[Expo Playground](https://snack.expo.io/@andriitiertyshnyi/blessed-donuts)

## Features

### KeyboardAwareScrollView
> A ScrollView component that handles keyboard appearance and automatically scrolls to focused `TextInput`.

### useMaskedTextInput
> A React hook to mask an input using.


## Installation

Installation can be done through `npm` or `yarn`:

```shell
npm i react-native-keyboard-tools --save
```

```shell
yarn add react-native-keyboard-tools
```

## Usage

### KeyboardAwareScrollView example

```js
import { KeyboardAwareScrollView } from 'react-native-keyboard-tools'
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

### useMaskedTextInput example

```js
import { TextInput } from 'react-native'
import { useMaskedTextInput } from 'react-native-keyboard-tools'
```

```jsx
const MyComponent = () => {
  const [value, setValue] = useState("");
  const { onChangeMaskedText } = useMaskedTextInput({ mask: "+3(99) 9999 9999", onChangeText: setValue });

  return <TextInput onChangeText={onChangeMaskedText} />
}
```

### useMaskedTextInput params

mask: `defined by pattern`

* `9` - accept digit.
* `A` - accept alpha.
* `S` - accept alphanumeric.
* `*` - accept all, EXCEPT white space.

Ex: `AAA-9999` 

onChangeText: `(value: string) => void`

### useMaskedTextInput result 

onChangeMaskedText: (value: string, rawValue: string) => void;

## License

MIT.

## Author

Andrii Tiertyshnyi

## Inspired
By https://github.com/wix/react-native-keyboard-aware-scrollview

By https://github.com/benhurott/react-native-masked-text
