Để bắt đầu với React Native, bạn lên trang chủ của React Native và làm theo các hướng dẫn của họ, sau đó sẽ có một project React Native chạy được ngon lành. Vậy thì bài viết này sinh ra để làm gì?

-----

À thì việc viết code nó cũng chỉ đơn thuần là viết code thôi, nhưng liệu bạn sẽ thích viết code trên một IDE xịn hay viết trên một trình editor cơ bản? Và ở đây tôi sẽ hướng dẫn các bạn cách gắn các công cụ cần thiết nhất để viết code React Native đẹp, chuyên nghiệp và ít bugs vớ vẩn hơn so với sử dụng những gì mặc định.

-----

# VSCode
Đầu tiên là trình editor, tôi sẽ sử dụng VSCode. Có thể bạn đã quen với Sublime Text, Atom, Jet Brain,... hay một vài trình editor khác (đây là sở thích thôi), thì skip phần này cũng được, hoặc có thể đọc để tìm các cách cấu hình tương tự trên editor của mình. Và nếu bạn sử dụng VSCode thì có thể cấu hình như tôi dưới đây:

`/.vscode/settings.json`
```go
{
  "eslint.autoFixOnSave": true,      // Save cái tự động format theo eslint
  "eslint.packageManager": "yarn",   // Xác định cho eslint biết đâu là
                                     // package manager ta sử dụng.   
  "editor.tabSize": 2,               // Xài 1 tab 2 space.
  "editor.detectIndentation": false, // Phải tắt cái này không là cái
                                     // tabSize sẽ không có tác dụng
  "editor.rulers": [120],            // Tạo ra cái vách ngăn 120 ký tự
                                     // để biết đường mà xuống dòng     
  "files.insertFinalNewline": true,  // Tự thêm newline mới vào cuối file
  "files.autoSave": "onFocusChange", // Khi nào đổi focus thì tự save
}
```
Bạn cần cài thêm plugin eslint cho VSCode để có được thông báo các lỗi syntax một cách real-time như kiểu IDE xịn luôn.

[ESLint trên Visual Studio Market](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
![](https://images.viblo.asia/39919fc6-2de1-4522-9333-fece5db5da36.png)
Và để cho VSCode có thể hiểu được project của chúng ta là một JavaScript Project, ta cần một file jsconfig.json nằm ở thư mục gốc, các bạn config như sau:

`/jsconfig.json`
```go
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "baseUrl": ".",        // Đặt base url là thư mục gốc
    "paths": {
      "~/*": ["src/*"]     // Đặt "~" là alias cho thư mục src
    },
  },
  "exclude": [
    "node_modules",        // Đừng bắt VSCode nó phải chọc vào
  ]                        // cái đống trong này.
}
```

# Yarn
Chúng ta sẽ sử dụng `yarn` thay cho `npm`, phải nói thật sự với các bạn là cài lib từ `yarn` rất nhanh, nhanh hơn hẳn so với `npm`, câu lệnh cũng gọn gàng hơn và tập trung vào những gì cần thiết, đó là những gì mình đã trải nghiệm thực tế.

Cách cài yarn thì tốt nhất là nên lên trang chủ để luôn được update mới nhất: [Install Yarn](https://yarnpkg.com/lang/en/docs/install)

# Babel
React Native sử dụng babel để chuyển đổi cấu trúc từ ES6 trở lên và JSX về các phiên bản JS tương thích với môi trường hiện tại.
Babel đã được tích hợp mặc định, việc của ta là cấu hình và cài cắm thêm một số plugin.

## Babel Root Import

Đây là một plugin rất ngon để biến cái việc import vô cùng mệt mỏi của bạn trở nên cực kì đơn giản, đặc biệt là khi cấu trúc project của bạn bắt đầu trở nên phức tạp và rối rắm.

Cách cắt nghĩa đơn giản nhất là tôi sẽ cho bạn xem mục đích của nó:
```javascript
// Bình thường bạn phải làm thế này
import SomeExample from '../../../some/example.js';
const OtherExample = require('../../../other/example.js');

// Nếu có Babel Root Import
import SomeExample from '~/some/example.js';
const OtherExample = require('~/other/example.js');
```
Đầu tiên là chúng ta cần cài đặt:
```css
yarn add babel-plugin-root-import --dev
```
Và sau đây sẽ là cách cấu hình cho `babel` và `babel-plugin-root-import`

`/.babelrc`
```go
{
  "presets": ["module:metro-react-native-babel-preset"],
  "plugins": [
    [
      "babel-plugin-root-import", 
      {
        "rootPathPrefix": "~",    // Chúng ta cần cho babel biết "~"
        "rootPathSuffix": "src"   // sẽ được convert thành "src"
      }
    ]
  ],
  "retainLines": true,
  "env": {
    "production": {
      "plugins": [
        [
          "babel-plugin-root-import",
          {
            "rootPathPrefix": "~",
            "rootPathSuffix": "src"
          }
        ]
      ]
    }
  }
}
```
Và ta cần thêm một dòng vào flowconfig
`/.flowconfig`
```rust
[options]
// ...
module.name_mapper='^~/\(.*\)$' -> '<PROJECT_ROOT>/src/\1'
// ...
```
# ESLint
Đây phải nói là cái thứ không thể thiếu khi code JavaScript nói chung và React Native nói riêng. Cài đặt thì đơn giản thôi:
```sql
yarn add eslint --dev
```

## Babel ESLint
Để phòng ngừa cho việc sau này ta sẽ sử dụng đến các feature của Babel mà ESLint không support, ta cần sử dụng một parser khác với parser mặc định đó là `babel-eslint`,

`babel-eslint` sẽ giúp ta valid các cú pháp của Babel mà ESLint không support nhờ vào việc chuyển đổi code đó về cú pháp tương thích.

```sql
yarn add babel-eslint --dev
```
Tuy nhiên khi cài đặt bạn nhớ chú ý đến vấn đề tương thích phiên bản giữa `babel-eslint` và `eslint`.

Ngoài ra, ta cần một số plugin cần thiết cho ESLint như sau:

### Import plugin
Đây là một plugin của eslint giúp phân tích cú pháp import để xem xét sự đúng sai trong đó.
```css
yarn add eslint-plugin-import --dev
```
#### Resolver cho Babel Root Import
Khi ta sử dụng `eslint-plugin-import` nhưng lại đặt sử dụng `babel-plugin-root-import` để convert `~` thành `src`, khi đó eslint cũng sẽ không thể hiểu được và ta sẽ gặp lỗi.

Do đó, ta cần có một resolver để giải quyết vấn đề này
```css
yarn add eslint-import-resolver-babel-plugin-root-import --dev
```

### React Native plugin
ESLint cơ bản sẽ không hỗ trơ một số cú pháp của React Native, do đó ta cần cài thêm plugin này để eslint phân tích code chuẩn xác hơn. Tuy nhiên để sử dụng plugin này ta còn cần thêm `eslint-plugin-react`, thực chất các rule của `eslint-plugin-react-native` cũng là sự kế thừa và mở rộng từ `eslint-plugin-react`
```css
yarn add eslint-plugin-react --dev
yarn add eslint-plugin-react-native --dev
```

### Airbnb Base Config
Đây là một cấu hình cho eslint được đưa ra bởi Airbnb, mình thấy các rule tương đối phù hợp với bản thân nên xài luôn.
```sql
yarn add eslint-config-airbnb-base --dev
```

Và cuối cùng là tập hợp các config lại cho eslint, ta sẽ có như sau:

`/.eslintrc`
```go
{
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": ["react", "react-native", "import"],
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:react/recommended",
    "plugin:react-native/all",
    "airbnb-base"
  ],
  "rules": {
    "class-methods-use-this": "off",
    "no-use-before-define": "off"
  },
  "settings": {
    "import/resolver": {
      "babel-plugin-root-import": {
        "rootPathPrefix": "~",
        "rootPathSuffix": "src"
      }
    }
  },
  "env": {
    "jest": true
  }
}
```

------
# Kết
Hy vọng các bạn sẽ tìm thấy những cuộc cụ hữu ích cho bản thân qua bài viết này, trên đây là các cách config phù hợp cho project React Native của bản thân người viết. Mọi thứ đều đặt trên quan điểm cá nhân và kinh nghiệm vẫn còn non trẻ.