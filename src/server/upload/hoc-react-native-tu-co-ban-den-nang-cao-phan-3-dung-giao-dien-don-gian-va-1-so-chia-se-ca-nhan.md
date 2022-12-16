![](https://i.imgur.com/skoRJ9P.png)


# I) 1 số chia sẻ cá nhân nhận thấy
## 1. Phải mua máy Mac để code :D

![](https://i.imgur.com/aPwSN3X.jpg)

Vâng các bạn đọc chính xác rồi đấy !  Sau đây tôi xin chia sẻ câu chuyện của tôi:

Đầu tiên, thấy React Native hay hay nên thử code code React Native trên Windows thì phải nói thật 1 điều rằng "như sh*t" luôn

![](https://i.imgur.com/zi9ieSq.png)

Tôi đã dành khá nhiều thời gian vào fix lỗi vớ vẩn không đâu, sau đó config các kiểu theo hướng dẫn trên mạng; mà có làm được đi chăng nữa thì cũng là fix theo version cũ của React Native.

Ok tiếp tục kiên trì với React Native tôi chuyển sang dùng Ubuntu thì tình hình cũng khả quan hơn đôi chút nhưng khi test thử app lại gặp 1 vấn đề là: "Không thể build ứng dụng iOS bằng Ubuntu mà chỉ build được mỗi Android"

![](https://i.imgur.com/UmirK0Z.png)

Như các bạn đã biết thì React Native để build ứng dụng ra 2 nền tảng Android và iOS. Vậy nếu bạn chỉ có thể build được 1 môi trường Android thì bạn đã bỏ đi 1 nửa thế giới của React Native. Và thế thì thà code native Android cho nhanh.

Vậy từ đây tôi đã bắt đầu có suy nghĩ phải có máy chạy macOS để build được cả Android và iOS.  Và nghe thiên hạ đồn rằng mua máy Macbook Pro code mới ngon được.

OK ! Vậy thì đi mua 1 máy về thôi.

Ra đến cửa hàng thì gặp phải 1 cản trở là

> ### *Giá MacBook Pro thấp nhất cũng từ 40.000.000 đồng*

Và lúc đấy cảm giác thật là

![](https://i.imgur.com/i3ZLp9N.png)

Nhưng nhờ có anh em đồng nghiệp động viên, suốt ngày bài ca "MUA MAC ĐÊ" nên mình cũng cố cắn răng vì đam mê nên sắm 1 em về với giá like new để học hành. 

Và như mong đợi các lỗi config vớ vấn đã được giải quyết. Chạy cũng êm ả và mượt mà hơn. 

Vậy tôi có một lời khuyên với những ai có ý định học React Native thì hãy sắm cho mình 1 con MacBook Pro để tiện cho việc học hành sau này và hãy nhớ là:  **"Mua MAC Đê"**

## 2. Đối thủ cạnh tranh với React Native

Trong thời gian này tôi cũng đã tìm hiểu và được nghe khá nhiều Cross Platform khác nhưng nổi bật nhất trong thời gian gần đây phải kể tới cái tên 
> **Flutter (Google)**

![](https://i.imgur.com/HQcILkL.jpg)

Đây sẽ là cảm giác chính khi nghe tới Flutter; được công bố có tốc độ mượn mà hơn lên tới 60 Hz. Nhưng trong bài viết này tôi sẽ không so sánh kỹ giữa 2 nền tảng; mà chỉ đưa cho các bạn cái nhìn tổng quan nhất để các bạn lựa chọn phù hợp nhất cho mình

![](https://i.imgur.com/IXqkGP2.jpg)
![](https://i.imgur.com/lN6JQiG.png)




## 3. Tại sao lại chọn React Native chứ không phải là Flutter ?

Sẽ có nhiều bạn chọn Flutter nhưng tôi xin trình bày những lý do dưới góc nhìn của tôi:

* Thứ 1, Về cộng đồng React Native hiện nay là rất lớn cho nên số lượng người support là nhiều hơn
* Thứ 2,  Số lượng câu hỏi trên StackOverFlow của React Native là 28K còn Flutter chỉ có 1.2 K câu hỏi
* Thứ 3, Số lượng thư viện của  React Native nhiều hơn Flutter.
Để rõ hơn bạn có thể xem tại đây:

React Native: https://github.com/jondot/awesome-react-native

Flutter: https://github.com/Solido/awesome-flutter

* Thứ 4, Thị trường jobs hiện tại của React Native (3.972 jobs) cao hơn Flutter (210 jobs):

Dưới đây là khảo sát qua **LinkedIn Jobs**
![](https://i.imgur.com/uP1tV1O.png)
![](https://i.imgur.com/CUEMYX4.png)


Từ những lý do trên nên tôi đã chọn React Native cho thời gian tới để phục vụ cho con đường sự nghiệp của mình
# II) Dựng giao diện đơn giản [WeatherProject](https://github.com/oTranThanhNghia/WeatherProject/tree/master) (Github)

![](https://i.imgur.com/sAWmITP.gif)

[https://github.com/oTranThanhNghia/WeatherProject/tree/master](https://github.com/oTranThanhNghia/WeatherProject/tree/master)

Đầu tiên ta hãy cùng nhau thử dựng giao diện về thời tiết với data fake cứng để làm quen với UI trong React Native

#### Những kiến thức cần có

Sau đây tôi xin nêu những đầu mục mà bạn phải tìm hiểu để hiểu rõ hơn về project:

1. Flow là gì ? (https://flow.org/). Cách cài đặt Flow https://flow.org/en/docs/install/
2. Eslint là gì ? (https://eslint.org/docs/user-guide/getting-started)
3. Babel là gì ? (https://babeljs.io/)

#### Kéo project demo

Các bạn mở terminal gõ:

```
git clone https://github.com/oTranThanhNghia/WeatherProject.git
```

##### Các bạn vào project chú ý những file sau:

##### 1. `package.json` đã phù hợp chưa

```json
{
  "name": "WeatherProject",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node node_modules/react-native/local-cli/cli.js start",
    "test": "jest"
  },
  "dependencies": {
    "native-base": "~2.8.1",
    "react": "~16.6.3",
    "react-native": "^0.57.5",
    "react-native-swiper": "^1.5.13",
    "react-native-vector-icons": "~6.0.2",
    "react-redux": "~5.1.0",
    "redux": "~4.0.1",
    "redux-saga": "0.16.2"
  },
  "devDependencies": {
    "@babel/plugin-proposal-decorators": "~7.1.2",
    "babel-cli": "~6.26.0",
    "babel-eslint": "~10.0.0",
    "babel-jest": "~23.6.0",
    "babel-plugin-root-import": "~6.1.0",
    "babel-preset-flow": "~6.23.0",
    "babel-preset-react-native": "~4.0.1",
    "eslint": "~5.8.0",
    "eslint-config-airbnb-base": "~13.1.0",
    "eslint-import-resolver-babel-plugin-root-import": "~1.1.1",
    "eslint-plugin-import": "~2.14.0",
    "eslint-plugin-react": "~7.11.1",
    "eslint-plugin-react-native": "~3.5.0",
    "flow-bin": "~0.85.0",
    "jest": "~23.6.0",
    "metro-react-native-babel-preset": "~0.49.0",
    "prettier-eslint": "~8.8.2",
    "react-test-renderer": "16.6.0",
    "redux-devtools": "~3.4.1"
  },
  "jest": {
    "preset": "react-native"
  }
}

```

##### 2. `.babelrc` (https://babeljs.io/docs/en/configuration)
```json
{
  "presets": ["module:metro-react-native-babel-preset"],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    [
      "babel-plugin-root-import",
      {
        "rootPathPrefix": "~",
        "rootPathSuffix": "app"
      }
    ]
  ],
  "retainLines": true,
  "env": {
    "production": {
      "plugins": []
    }
  }
}
```
##### 3. `.eslintrc`
```json
{
  "parser": "babel-eslint",
  "plugins": ["react", "react-native"],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },
  "extends": ["eslint:recommended", "plugin:react/recommended", "airbnb-base"],
  "rules": {
    "arrow-body-style": "warn",
    "global-require": "off",
    "no-useless-concat": "off",
    "class-methods-use-this": "off",
    "no-use-before-define": "off",
    "import/prefer-default-export": "off",
    "no-console": "warn",
    "react/prop-types": "off"
  },
  "settings": {
    "import/resolver": {
      "babel-plugin-root-import": {
        "rootPathPrefix": "~",
        "rootPathSuffix": "app"
      }
    }
  },
  "env": {
    "jest": true
  }
}

```

##### 5. `jsconfig.json` cấu hình cho VScode (https://code.visualstudio.com/docs/languages/jsconfig)
```json
{
  "allowJs": true,
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "baseUrl": ".",
    "paths": {
      "~/*": ["app/*"]
    },
    "noUnusedLocals": true
  },
  "exclude": ["node_modules", "**/node_modules/*", "**/generator.js"]
}
```

##### Chạy demo

1. Gõ lệnh để cài đặt thư viện và chạy demo
```
npm install

react-native run-ios
```

Vậy là đã xong. Để hiểu rõ hơn dựng giao diện bạn hãy vào `app/App.js` để xem source code nhé.
Trong bài tiếp theo, tôi sẽ demo ví dụ đơn giản về [Redux-saga](https://redux-saga.js.org/) để kéo dự liệu từ server về app. Mong các bạn chú ý trong số tới của mình nhé.