Javascript thật tuyệt vời, tuy nhiên vẫn nhiều người thích [TypeScript](https://www.typescriptlang.org/), tôi cũng tò mò muốn xem cách sử dụng TypeScript trong React Native Apps như thế nào. 

Chúng ta sẽ làm theo hướng dẫn của Microsoft tại repo này: [TypeScript React Native Starter](https://github.com/Microsoft/TypeScript-React-Native-Starter). 

## Điều kiện
Có lẽ bạn đang phát triển trên một trong các nền tảng khác nhau, nhắm mục tiêu một số loại thiết bị khác nhau, nên việc thiết lập cơ bản có thể cần thiết. Trước tiên, bạn phải đảm bảo rằng bạn có thể chạy một ứng dụng React Native mà không có TypeScript. Làm theo [hướng dẫn trên trang web React Native](https://facebook.github.io/react-native/docs/getting-started.html) để bắt đầu. Khi bạn đã có thể chạy được ứng dụng trên một thiết bị hoặc simulator hay emulator, bạn sẽ sẵn sàng để bắt đầu một ứng dụng TypeScript React Native.

Bạn cũng sẽ cần [Node.js](https://nodejs.org/en/), [NPM](https://www.npmjs.com/) và [Yarn](https://yarnpkg.com/lang/en).

## Khởi tạo

Tạo một ứng dụng ReactNative để bắt đầu với TypeScript:

```sh
react-native init MyAwesomeProject
cd MyAwesomeProject
```

# Thêm TypeScript

Bước tiếp theo là thêm TypeScript vào dự án. Bao gồm các commands như sau:

* Thêm TypeScript vào dự án
* Thêm [React Native TypeScript Transformer](https://github.com/ds300/react-native-typescript-transformer) vào dự án
* Khởi tạo một file cấu hình TypeScript trống, chúng ta sẽ cấu hình sau đó
* Thêm một file cấu hình Transformt Native TypeScript Transformer trống, mà chúng ta sẽ cấu hình sau đó
* Thêm [typings](https://github.com/DefinitelyTyped/DefinitelyTyped) cho React và React Native

Chạy các commands này:

```sh
yarn add --dev typescript
yarn add --dev react-native-typescript-transformer
yarn tsc --init --pretty --jsx react
touch rn-cli.config.js
yarn add --dev @types/react @types/react-native
```

File `tsconfig.json` chứa tất cả các thiết lập cho trình biên dịch TypeScript.
Mặc định được tạo bởi command trên hầu hết đều OK, nhưng mở file và bỏ comment dòng sau:

```js
{
  ...
  // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
  ...
}
```

`rn-cli.config.js` chứa các thiết lập cho React Native TypeScript Transformer.
Mở nó và thêm các dòng sau:

```js
module.exports = {
  getTransformModulePath() {
    return require.resolve("react-native-typescript-transformer");
  },
  getSourceExts() {
    return ["ts", "tsx"];
  }
};
```

## Migrate sang TypeScript

Đổi tên file `App.js` và `__tests__/App.js` thành `App.tsx`. `index.js` cần sử dụng `.js` extension.
Tất cả các file mới sử dụng `.tsx` extension (hoặc `.ts` nếu file không chứa JSX).

Nếu bạn thử chạy ứng dụng bây giờ, bạn sẽ nhận được lỗi giống như `object prototype may only be an object or null`.
Điều này xảy do lỗi React (default) và Component (được export) từ react trên cùng một dòng.
Mở `App.tsx` và tách thành 2 dòng như sau:

```diff
-import React, { Component } from 'react';
+import React from 'react'
+import { Component } from 'react';
```

Một số điều này liên quan đến sự khác biệt về cách Babel và TypeScript tương tác với các CommonJS modules.
Trong tương lai, cả 2 sẽ không có sự khác biệt.

Bây giờ, bạn sẽ có thể chạy ứng dụng React Native.

## Thêm TypeScript Test

Chúng ta sẽ sử dụng [Jest](https://github.com/facebook/jest), vì vậy hãy thêm [ts-jest](https://www.npmjs.com/package/ts-jest) vào devDependencies.

```sh
yarn add --dev ts-jest
```

Sau đó, chúng ta sẽ mở `package.json` và thay thế thiết lập của `jest` như sau:

```json
"jest": {
  "preset": "react-native",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  "transform": {
    "^.+\\.(js)$": "<rootDir>/node_modules/babel-jest",
    "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  "testPathIgnorePatterns": [
    "\\.snap$",
    "<rootDir>/node_modules/"
  ],
  "cacheDirectory": ".jest/cache"
}

Thiết lập jest này giúp cho các files `.ts` và `.tsx` có thể chạy với `ts-jest`.

## Cài đặt các Type Declaration Dependencies

Để có được trải nghiệm tốt nhất trong TypeScript, chúng ta muốn type-checker hiểu hình dạng và API của các dependencies.
Một số thư viện sẽ publish các packages của họ với các file `.d.ts` (còn được gọi là các file "typed declaration" hoặc "type definition") có thể mô tả hình dạng của JavaScript cơ bản.
Đối với các thư viện khác, chúng ta cần cài đặt các packages thích hợp `@types/`.

Ví dụ, ở đây chúng ta sẽ cần các types cho Jest, React, React Native và React Test Renderer.

```ts
yarn add --dev @types/jest @types/react @types/react-native @types/react-test-renderer
```

Chúng ta đã saved những declaration file packages vào _dev_ dependencies bởi vì chúng ta sẽ không publish package như một library tới npm.
Nếu có nhu cầu, chúng ta có thể phải thêm một số chúng vào dependencies như thường lệ.

Bạn có thể đọc thêm [ở đây về việc lấy `.d.ts` files](https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html).

## Ignore thêm các files

Đối với các source control, bạn sẽ muốn ignore `.jest` folder.
Nếu bạn đang sử dụng git, chúng ta sẽ thêm những dòng sau vào `.gitignore` file.

```config
# Jest
#
.jest/
```

Như một checkpoint, đừng quên commit những thay đổi:

```sh
git init
git add .gitignore # import to do this first, to ignore our files
git add .
git commit -am "Initial commit."
```

## Thêm một Component

Bây giờ chúng ta có thể thêm một component vào app.
Chúng ta sẽ bắt đầu với một `Hello.tsx` component.
Tạo một `components` directory và thêm file `Hello.tsx` như sau đây.

```ts
// components/Hello.tsx
import React from "react"
import { Button, StyleSheet, Text, View } from "react-native"

export interface Props {
  name: string
  enthusiasmLevel?: number
  onIncrement?: () => void
  onDecrement?: () => void
}

interface State {
  enthusiasmLevel: number
}

export class Hello extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    if ((props.enthusiasmLevel || 0) <= 0) {
      throw new Error("You could be a little more enthusiastic. :D")
    }

    this.state = {
      enthusiasmLevel: props.enthusiasmLevel || 1
    }
  }

  onIncrement = () => this.setState({ enthusiasmLevel: this.state.enthusiasmLevel + 1 });
  onDecrement = () => this.setState({ enthusiasmLevel: this.state.enthusiasmLevel - 1 });
  getExclamationMarks = (numChars: number) => Array(numChars + 1).join("!")

  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.greeting}>
          Hello {this.props.name + this.getExclamationMarks(this.state.enthusiasmLevel)}
        </Text>

        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button
              title="-"
              onPress={this.onDecrement}
              accessibilityLabel="decrement"
              color="red"
            />
          </View>

          <View style={styles.button}>
            <Button
              title="+"
              onPress={this.onIncrement}
              accessibilityLabel="increment"
              color="blue"
            />
          </View>
        </View>
      </View>
    )
  }
}

// styles

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    alignSelf: "center"
  },
  buttons: {
    flexDirection: "row",
    minHeight: 70,
    alignItems: "stretch",
    alignSelf: "center",
    borderWidth: 5
  },
  button: {
    flex: 1,
    paddingVertical: 0
  },
  greeting: {
    color: "#999",
    fontWeight: "bold"
  }
})
```

Whoa! Có vẻ hơi nhiều nhỉ, nhưng hãy break down một chút:

* Thay vì render các HTML elements như `div`, `span`, `h1`, etc., chúng ta render components như `View` và `Button`.
  Đây là các native components làm việc trên các nền tàng khác nhau.
* Style được xác định bằng cách sử dụng `StyleSheet.create` function có sẵn trong React Native.
  React's StyleSheets cho phép control layout sử Flexbox, và style sử dụng cấu trúc gần giống với CSS stylesheets.
  
## Thêm một Component Test

Bây giờ chúng ta có một component, hãy thử viết test cho nó.

Chúng ta đã có Jest được cái đặt như một test runner.
Chúng ta sẽ viết snapshot tests cho component của chúng ta, hãy require add-on cho snapshot tests:

```sh
yarn add --dev react-addons-test-utils
```

Bây giờ hãy tạo một `__tests__` folder trong `components` directory và thêm một test cho `Hello.tsx`:

```ts
// components/__tests__/Hello.tsx
import React from 'react'
import renderer from 'react-test-renderer'

import { Hello } from "../Hello"

it("renders correctly with defaults", () => {
  const button = renderer.create(<Hello name="World" enthusiasmLevel={1} />).toJSON()
  expect(button).toMatchSnapshot()
})
```

Lần điều tiên chạy test, nó sẽ tạo một snapshot của rendered component và lưu nó trong `components/__tests__/__snapshots__/Hello.tsx.snap` file. Khi bạn sửa component, bạn sẽ cần cập nhật snapshots và xem lại bản cập nhật cho các thay đổi vô ý.
Bạn có thể đọc thêm về test React Native components [tại đây](https://facebook.github.io/jest/docs/en/tutorial-react-native.html).

## Tiếp theo

Check out [React TypeScript tutorial](https://github.com/Microsoft/TypeScript-React-Starter) bao gồm những chủ đề như là quản lý state với [Redux](http://redux.js.org).
Những chủ đề tương tự có thể được áp dụng khi viết React Native apps.

Ngoài ra có thể bạn cũng muốn xem [ReactXP](https://microsoft.github.io/reactxp/) nếu bạn muốn tìm một component được viết hoàn toàn bằng TypeScript hỗ trợ cả React JS và React Native.

## Helpful Resources

* [Create React Native TypeScript](https://github.com/mathieudutour/create-react-native-app-typescript) port của [Create React Native App](https://github.com/react-community/create-react-native-app) sử dụng TypeScript.
* [React Native Template TypeScript](https://github.com/emin93/react-native-template-typescript) là một template clean và nhỏ gọn để bắt đầu nhanh với TypeScript.