# I. Giới thiệu
JavaScript giờ trở thành ngôn ngữ lập trình phổ biến nhất thế giới. Trước đây JavaScript không được thiết kế để viết ứng dụng doanh nghiệp lớn. Nếu ứng dụng chỉ vỏn vẹn vài chục dòng code, JavaScript không gây khó khăn gì. Nhưng khi số dòng code lên đến hàng ngàn, rắc rối bắt đầu nảy sinh. Kiểm tra lỗi trở nên khó khăn, sửa chữa code cũng không phải dễ.

Trong những năm qua, cộng đồng lập trình viên đã đưa ra khá nhiều giải pháp nhằm hoàn thiện JavaScript với hi vọng biến nó thành một ngôn ngữ lập trình thực thụ. Nổi bật nhất là TypeScript, một ngôn ngữ mới được Microsoft phát triển trong nhiều năm nhằm khắc phục các khuyết điểm lớn của JavaScript.

# II. Sử dụng TypeScript như thế nào ?
## 1. Môi trường cơ bản.
 Trước tiên, bạn phải đảm bảo rằng bạn có thể chạy một ứng dụng React Native mà không có TypeScript.
 Sử dụng `create-react-native-app ` là cách tốt nhất để tạo ra một dự án ReactNative mới. 
 Nếu bạn đả cài đặt [Note](https://nodejs.org/en/download/) bạn có thể dùng npm để thiết lập môi trường ban đầu cho react native bằng dòng lệnh .
```
npm install -g create-react-native-app
```
 
Sau đó chạy các lệnh sau để tạo một dự án React Native mới có tên là "AwesomeProject":
```
create-react-native-app AwesomeProject

cd AwesomeProject
npm start
react-native run-ios --simulator="iPhone X" 
```

Cấu trúc thư mục ban đầu và máy ảo khi run dự án . 
![](https://images.viblo.asia/7b17d240-b7d7-4f0d-9163-e963074131a2.png)

Điều này sẽ bắt đầu một máy chủ phát triển cho bạn.Đến đây bạn đả chắc chắn là mình đã chạy được một dự án react native mà không dùng TypeScript rồi đúng không ?

## 2. Thêm TypeScrip .
Bước tiếp theo là thêm TypeScript vào dự án của bạn. Các lệnh sau sẽ:
* Thêm TypeScript vào dự án của bạn.

        npm install --save typescript
    
    Sau đó gỏ trên terminal là `tsc` .Nếu báo lỗi tương tự `zsh: command not found: tsc`
    Bạn hãy chạy ngay dòng lệnh bên dưới nhé: 
    
        npm install -g typescript
        
          
        

* Thêm [React Native TypeScript Transformer](https://github.com/ds300/react-native-typescript-transformer) vào dự án của bạn

        npm install --save react-native-typescript-transformer
   

* Khởi tạo một tệp cấu hình TypeScript trống, chúng ta sẽ cấu hình sau đó .

        tsc --init --pretty --jsx react
  
  Sau khi chạy lệnh này nó sẽ tạo ra một file với status như sau : 
  `Successfully created a tsconfig.json file.`
  
* Thêm một tệp cấu hình Transformt Native TypeScript Transformer trống, mà chúng ta sẽ cấu hình tiếp theo


        touch rn-cli.config.js
   
   
* Thêm [typings](https://github.com/DefinitelyTyped/DefinitelyTyped) cho React và React Native

        npm install --save @types/react @types/react-native
  
 
 
File `tsconfig.json` chứa tất cả các thiết lập cho trình biên dịch TypeScript. Mặc định được tạo bởi command trên hầu hết đều OK, nhưng mở file và bỏ comment dòng sau:

```
{
  ...
  // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
  ...
}
```

`rn-cli.config.js` chứa các thiết lập cho React Native TypeScript Transformer. Mở nó và thêm các dòng sau:

```
module.exports = {
  getTransformModulePath() {
    return require.resolve("react-native-typescript-transformer");
  },
  getSourceExts() {
    return ["ts", "tsx"];
  }
};
```

## 3. Migrate sang TypeScript


Đổi tên file App.js thành App.tsx. File index.js cần sử dụng .js extension. Tất cả các file mới sử dụng .tsx extension (hoặc .ts nếu file không chứa JSX).
Bây giờ chúng ta có thể chạy lại server và kết quả tương tự như dùng đuôi .js nhé .

## 4. Sử dụng Jest để test TypeScript . 

Chúng ta sẽ sử dụng [Jest](https://github.com/facebook/jest), vì vậy hãy thêm [ts-jest](https://www.npmjs.com/package/ts-jest) vào devDependencies.

Chạy dòng lệnh sau :

```
npm install --save ts-jest
```

Sau đó, chúng tôi sẽ mở ra `package.json` và thay thế `jest` trường bằng các thông tin sau:
```
{
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
}
```




Điều này sẽ cấu hình Jest để chạy `.ts` và `.tsx` các tập tin với `ts-jest`.

Có một vài bước bổ sung nếu bạn muốn sử dụng nó với React Native.

Cài `babel-jest` và `babel-preset-react-native` modules.

```
npm install -D babel-jest babel-preset-react-native
```
Đảm bảo `.babelrc` chứa:

```
{
  "presets": ["react-native"],
  "sourceMaps": "inline"
}
```
Trong package.json, bên trong phần jest, biến đổi phải như thế này:

```
"transform": {
  "^.+\\.jsx?$": "<rootDir>/node_modules/babel-jest",
  "^.+\\.tsx?$": "ts-jest"
}
```

Hoàn thành phần jest hoàn thành nên trông như thế này:


Tiếp theo ta có cú pháp để chạy test là :

```
npm test
```
Sau khi chạy xong lệnh trên thì bạn cần ignore `.jest` folder .
Thêm dòng này vào cuối file `.gitignore`
```
# Jest
#
.jest/
```

### a. Cài đặt một số gói

Để có được trải nghiệm tốt nhất trong TypeScript, chúng tôi muốn trình kiểm tra loại hiểu hình dạng và API của các phụ thuộc của chúng tôi. Một số thư viện sẽ xuất bản các gói của chúng với `.d.ts` các tệp (các tệp định nghĩa kiểu / khai báo kiểu), có thể mô tả hình dạng của JavaScript cơ bản. Đối với các thư viện khác, chúng tôi sẽ cần cài đặt rõ ràng gói thích hợp trong @types/phạm vi npm.

Ví dụ, ở đây chúng ta sẽ cần các kiểu cho Jest, React, React Native và React Test Renderer.

```
npm install --save @types/jest @types/react @types/react-native @types/react-test-renderer
```
Chúng tôi đã lưu các gói tệp kê khai này vào các phụ thuộc dev của chúng tôi vì đây là ứng dụng React Native chỉ sử dụng các phụ thuộc này trong quá trình phát triển chứ không phải trong thời gian chạy. Nếu chúng tôi đã xuất bản một thư viện cho NPM, chúng tôi có thể phải thêm một số phụ thuộc loại này làm phụ thuộc thường xuyên.


[Bạn có thể đọc thêm ở đây](https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html)

### b. Thêm một Component
Bây giờ chúng ta có thể thêm một component vào app. Chúng ta sẽ bắt đầu với một index.tsx component. Di chuyển file `App.js` đến `src/App` directory và thêm file `index.tsx` như sau đây.

```
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Sake Loger!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

```


* Thay vì render các HTML elements như div, span, h1, etc., chúng ta render components như View và Button. Đây là các native components làm việc trên các nền tàng khác nhau.
* Style được xác định bằng cách sử dụng StyleSheet.create function có sẵn trong React Native. React's StyleSheets cho phép control layout sử Flexbox, và style sử dụng cấu trúc gần giống với CSS stylesheets.

Bây giờ chúng ta hãy tạo một `__tests__` thư mục trong thư mục `src/App/__tests__` thêm một thử nghiệm cho index.tsx:

```
import React from 'react';
import App from '../App';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

```

Khi bạn chạy `npm test` hoặc `jest`, điều này sẽ tạo ra một tập tin đầu ra như thế này:

```
exports[`Intro renders correctly 1`] = `
<View
  style={
    Object {
      "alignItems": "center",
      "backgroundColor": "#F5FCFF",
      "flex": 1,
      "justifyContent": "center",
    }
  }>
  <Text
    style={
      Object {
        "fontSize": 20,
        "margin": 10,
        "textAlign": "center",
      }
    }>
    Welcome to React Native!
  </Text>
  <Text
    style={
      Object {
        "color": "#333333",
        "marginBottom": 5,
        "textAlign": "center",
      }
    }>
    This is a React Native snapshot test.
  </Text>
</View>
`;

```



### c. Mở rộng.

Check out [React TypeScript tutorial](https://github.com/Microsoft/TypeScript-React-Starter) bao gồm những chủ đề như là quản lý state với `Redux`. Những chủ đề tương tự có thể được áp dụng khi viết React Native apps.

Ngoài ra có thể bạn cũng muốn xem `ReactXP` nếu bạn muốn tìm một component được viết hoàn toàn bằng TypeScript hỗ trợ cả React JS và React Native.
# III. Tài liệu tham khảo.

https://jestjs.io/docs/en/tutorial-react-native