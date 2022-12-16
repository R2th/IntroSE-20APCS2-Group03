![](https://images.viblo.asia/fbc25a8d-00a3-44a3-800a-faf2bd155194.png)
# I. Giới thiệu
Chào các bạn ! Trong bài viết ngày hôm nay tôi sẽ giới thiệu 1 React Native Boilerplate để các bạn dễ dàng áp dụng vào 1 dự án thực tế. 

Thực tế thì React Native Boilerplate này của tôi của chưa đầy đủ tất cả trường hợp nhưng trong thời gian tới tôi sẽ làm 1 ứng dụng dựa trên Boilerplate này để dần dần hoàn thiện nó.

Với Boilerpate này bạn sẽ giải quyết được những vấn đề cơ bản sau:

1. Thống nhất bộ công cụ hỗ trợ cho VSCode và chuẩn format code chung giữa các thành viên trong team => Điều này sẽ giúp review code trên Github dễ dàng hơn.
2. Bố cục và phân bố các file code có tổ chức

![](https://images.viblo.asia/834d3939-076f-4a46-a64e-54834b18669f.jpg)

Vâng anh em chúng ta đều làm dân coder nên nói gì thì nói cũng phải show code ví dụ trước khi nói tiếp:

> https://github.com/oTranThanhNghia/SimpleAppReactNative1 **(đang tiếp tục hoàn thiện)**


Trước tiên tôi muốn thống nhất môi trường của tôi với bạn để dễ làm việc 
```
+ CocoaPods: 1.7.5 (hơn cũng được nhé)
+ Node: 10.15.0
+ React Native: 0.60.5
+ Android Studio: 3.4.1
+ Xcode: 10.2.1
+ Tôi đang dùng: react-native-cli
```
# II. Cài đặt hỗ trợ cho VSCode
Như các bạn đã biết VSCode chỉ là 1 editor nên sẽ không bao giờ hỗ trợ tốt như một IDE. Vậy nên tôi gợi ý 1 vài Extensions sau giúp việc coding của bạn dễ thở hơn 

1. `React Native Tools` https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native
Cái này thì chắc chắn phải cài khi code React Native rồi :)

2. `vscode-icons` https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons

![](https://images.viblo.asia/27bc3191-1497-4f1d-8950-666986acfaa4.gif)

3. `ESLint` https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
4. `Prettier - Code formatter` https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
5. `Babel JavaScript` https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel
6. `Flow Language Support` (nếu sau này bạn dùng Flow) https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode

![](https://images.viblo.asia/38a4a5e8-6214-49f1-9d3f-f91013ed6486.gif)

### Ngoài  ra các extensions hỗ trợ thêm

7. `Auto Close Tag` https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag
8. `Auto Rename Tag` https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag
9. `Color Highlight` https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight
10. `GitLens — Git supercharged` https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens
11. `TODO Highlight` https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight
12. `Code Spell Checker` https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker
13. `npm` https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script
14. `npm Intellisense` https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense
15. `Import Cost` https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost

![](https://images.viblo.asia/4e770ada-576e-431b-876e-3ab9fe0f248d.gif)

16. `Bracket Pair Colorizer` https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer

![](https://images.viblo.asia/f15cf781-d79a-4e12-97e0-6b4dfb6027ef.png)

## Config ESLint và Prettier trong project

Các bạn phải cài những thành phần sau trong file `package.json`
```json
"devDependencies": {
    ...
    "eslint": "^6.4.0",
    "eslint-config-prettier": "^6.3.0",
    "eslint-config-standard": "^14.1.0",
    "eslint-plugin-import": "^2.18.2",
    "eslint-plugin-node": "^10.0.0",
    "eslint-plugin-prettier": "^3.1.1",
    "eslint-plugin-promise": "^4.2.1",
    "eslint-plugin-react": "^7.14.3",
    "eslint-plugin-react-native": "^3.7.0",
    "eslint-plugin-standard": "^4.0.1",
    "prettier": "^1.18.2",
   ...
  }
```

Bằng lệnh sau:
```
$ yarn add --dev eslint eslint-config-prettier eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-prettier eslint-plugin-promise eslint-plugin-react eslint-plugin-react-native eslint-plugin-standard prettier
```

Sau đó các bạn tạo file `.eslintrc` (chi tiết https://eslint.org/docs/user-guide/configuring) với nội dung như dưới đây
```json
{
  "plugins": ["react", "react-native", "prettier"],
  "parserOptions": {
    "ecmaVersion": 2018,
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    },
    "sourceType": "module",
    "useJSXTextNode": false
  },
  "env": {
    "react-native/react-native": true
  },
  "extends": [
    "standard",
    "plugin:react/recommended",
    "plugin:react-native/all",
    "plugin:prettier/recommended"
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    "react-native/no-raw-text": 0 // Avoid false positive, wait for fix
  }
}
```

Okay còn 1 file nữa là `.prettierrc` (chi tiết https://prettier.io/docs/en/options.html)

```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "always",
  "rangeStart": 0,
  "parser": "babel",
  "requirePragma": false,
  "insertPragma": false,
  "proseWrap": "preserve"
}
```

Vậy là đến đây là bạn đã chuẩn bị xong project cho để các đồng nghiệp có thể làm chung mà không bị conflict với nhau rồi đấy.

#### Để đảm bảo bạn không bao giờ quên format code
Các bạn vào **Setting** của VSCode rồi chọn `Format on Save` nhé 

![](https://images.viblo.asia/ca16b891-7118-4312-a15f-b9b7ec375f97.png)

Trước khi sang phần tiếp theo. Mời các nghe 1 chút nhạc cho thư thái đầu óc nhé 

{@embed: https://www.youtube.com/watch?v=JAhdeizXpaQ}
# III. Mô tả bố cục Project
Trước khi đi tiếp tôi muốn chắc chắn rằng bạn đã có kiến thức sau:

1. Redux là gì ? (bạn có thể tìm hiểu trong https://viblo.asia/p/redux-cho-nguoi-moi-bat-dau-part-1-introduction-ZjleaBBZkqJ)
2. Redux-saga là gì ? (tài liệu https://viblo.asia/p/redux-middleware-redux-saga-gGJ59X7jlX2)

Bạn phải có kiến thức trên thì mới có thể đọc code được. Vậy nên nếu bạn nào chưa biết redux và redux-saga là gì thì hãy tìm hiểu ngay đi nhé.

Tóm tắt lại redux-saga bạn xem hình mô phỏng dưới đây nhé:
![](https://images.viblo.asia/400df32f-f240-45ca-a835-f1a99b895e85.gif)

### Giải thích cách bố cục

![](https://images.viblo.asia/aca81152-4c31-40d3-85cf-a7c35a04c8c8.png)

1. `assets` chứa các resourses cho dự án

![](https://images.viblo.asia/61189d2c-571e-457b-a46d-ec7080f8b02a.png)

2. `components` để chứa các custom về UI

![](https://images.viblo.asia/33dee8c2-69a1-49c8-a33b-06b4ffc406b6.png)

3. `config` để cấu hình các môi trường trong dự án 

![](https://images.viblo.asia/60f0480d-dc63-495b-a9dc-612e6f08955a.png)

4. `features` để chứa các chức năng chính dự án 

![](https://images.viblo.asia/bff8ca95-4271-4c09-9c0f-76604fa10140.png)

5. `lib` chứa file thư viện js
6. `navigation` chứa code điều hướng app
7. `stores` nơi chứa store của app
8. `theme` chứa các styles hay gọi cách khác là CSS chung của app
9. `utils` chứa các code công cụ cần thiết cho app

![](https://images.viblo.asia/5ccddf80-ac58-4105-ba0d-83777587292e.jpg)
Đọc code là cách nhanh nhất để hiểu những logic bên trong. Vậy nên bạn hãy clone về máy để chạy thử nhé.
```
$ git clone https://github.com/oTranThanhNghia/SimpleAppReactNative1.git
$ cd SimpleAppReactNative1
$ yarn 
// đợi 1 lúc để tải node_modules
$ cd ios
$ pod install // cài thư viện cho ios
```

#### Lưu ý đối với Android Studio
Do tôi dùng React Native >= 0.60 nên các thư viện sẽ được tự động import vào project Android như sau:

![](https://images.viblo.asia/b7a32e2d-426a-45ba-a436-5ae14d0cf622.png)

Nhưng nếu không được thì bạn làm theo https://stackoverflow.com/a/56580438/4509964 nhé, để Android Studio đồng bộ lại project
# IV. Demo
Trong bài viết này tôi sẽ không chụp ảnh demo vì tôi muốn các bạn chạy thử ví dụ của tôi và nhìn thấy kết quả ngay trên thiết bị của bạn.

Tôi biết chắc chắn **BẠN CÓ THỂ LÀM ĐƯỢC** ! :+1: 

![](https://images.viblo.asia/262f7a12-7002-43f6-9c93-5f22a84fbed4.jpg)

Cảm ơn các bạn đã theo dõi :D. 

Trong các bài viết tới mình sẽ tập trung chủ yếu vào xây dựng app vào bài toán thực tế. Mong các bạn đón đọc nhé 
# V. Tài liệu tham khảo
1. https://medium.com/react-native-training/vscode-for-react-native-526ec4a368ce
2. https://github.com/thecodingmachine/react-native-boilerplate
3. https://github.com/victorkvarghese/react-native-boilerplate
4. Sample redux-saga: https://medium.com/@lavitr01051977/make-your-first-call-to-api-using-redux-saga-15aa995df5b6
5. Docs redux-saga: https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html
6. https://medium.com/@aksudupa11/redux-sagas-714370b61692
7. Bind Component Methods
https://medium.com/@User3141592/react-gotchas-and-best-practices-2d47fd67dd22
https://reactjsnews.com/es6-gotchas
8. https://stackoverflow.com/questions/12008120/console-log-timestamps-in-chrome
9. iOS- Build Fails when Scheme is set to Release
https://github.com/facebook/react-native/issues/4210#issuecomment-171944483