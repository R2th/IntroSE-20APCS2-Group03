Hi All.

Bắt đầu từ hôm nay thì mình sẽ chuyển qua chuyên mục mới đó là React Native. Và trong series này thì mình hướng tới dựng 1 base app đủ cho 1 app sử dụng.

Vì là base nên mình sẽ ko chú trọng quá nhiều vào phần UI mà sẽ hướng tới dựng một base với các mục sau:

 - Sử dụng TypeScript
 - Áp dụng React Navigation
 - Áp dụng Mobx cho quản lý state
 - Áp dụng Mobx cho validation
 - Quản lý App State change
 - Linking

# Init Project với TypeScript
Trước khi bắt đầu thì chúng ta sẽ trả lời câu hỏi vì sao lại sử dụng TypeScript, chỉ cần search Google là các bạn có thể ra được rất nhiều lý do, và mình xin được liệt kê một số lợi ích khi chúng ta sử dụng TypeScript trong việc phát triển các ứng dụng sử dụng Javascript:
 - TypeScript đơn giản hóa mã JavaScript, giúp đọc và gỡ lỗi dễ dàng hơn.
 - TypeScript là mã nguồn mở.
- TypeScript cung cấp các công cụ phát triển năng suất cao cho các IDE và thực tiễn JavaScript, như kiểm tra tĩnh.
- TypeScript làm cho mã dễ đọc và dễ hiểu hơn.
- Với TypeScript, chúng tôi có thể cải thiện rất nhiều so với JavaScript đơn giản.
- TypeScript cung cấp cho chúng ta tất cả các lợi ích của ES6 (ECMAScript 6), cộng với năng suất cao hơn.
- TypeScript có thể giúp chúng tôi tránh các lỗi đau đớn mà các nhà phát triển thường gặp phải khi viết JavaScript bằng cách kiểm tra mã.
- Hệ thống loại mạnh mẽ, bao gồm cả thuốc generic.
- TypeScript không có gì ngoài JavaScript với một số tính năng bổ sung.
- Cấu trúc, hơn là danh nghĩa.
- Mã TypeScript có thể được biên dịch theo tiêu chuẩn ES5 và ES6 để hỗ trợ trình duyệt mới nhất.
- Căn chỉnh với ECMAScript để tương thích.
- Bắt đầu và kết thúc bằng JavaScript.
- Hỗ trợ gõ tĩnh.
- TypeScript sẽ tiết kiệm thời gian cho các nhà phát triển.
- TypeScript là siêu bộ của ES3, ES5 và ES6.

Và với các tính năng hàng đầu tuyệt vời của TypeScript sẽ khiến bạn nên thử sử dụng nó một lần:
 - Lập trình hướng đối tượng
 - Giao diện, Generics, kế thừa và sửa đổi truy cập phương thức
 - Không cho phép xen kẽ các giá trị với các kiểu dữ liệu khác nhau. 
 - Complice runtime chp phép chúng ta biết được kiểu data đang sử dụng có đúng hay là ko
 - ......

Nào chúng ta cùng quay trở lại với series của chúng ta, sẽ có 2 cách để các bạn có thể áp dụng TypeScript vào dự án:

### Với project mới
Dự án mới thì sẽ khá là đơn giản, chỉ việc init project với Type Script là xong
```
npx react-native init MyApp --template react-native-template-typescript
```

Với Expo

```
npm install -g expo-cli
expo init MyTSProject
```

### Với các project đã code rồi
1. Add TypeScript and the types for React Native and Jest 
```
yarn add --dev typescript @types/jest @types/react @types/react-native @types/react-test-renderer
# or for npm
npm install --save-dev typescript @types/jest @types/react @types/react-native @types/react-test-renderer
```

2. Add a TypeScript config file.  Add file `tsconfig.json`, nhớ là file này nằm cùng hàng với node_modules luôn nha:

```
{
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "jsx": "react",
    "lib": ["es6"],
    "moduleResolution": "node",
    "noEmit": true,
    "strict": true,
    "target": "esnext"
  },
  "exclude": [
    "node_modules",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js"
  ]
}
```

3. Add ` jest.config.js` để config jest sử dụng TypeScript
```
module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
```

4. Bắt đầu sử dụng bằng cách add mới các file `.tsx` hoặc đổi tên các file có đuôi là `.js` sang đuôi `.tsx`

> You should leave the ./index.js entrypoint file as it is otherwise you may run into an issue when it comes to bundling a production build.

Trang chủ của React native khuyến cáo là nên giữ nguyên file `index.js` để đề phòng lỗi khi build production

5. chạy lệnh `yarn tsc` để kiểm tra các file Typescript 


# Using Custom Path Aliases with TypeScript
Để thuận tiện hơn trong việc import các module là không cần phải sử dụng tới đường dẫn tuyệt đối thì chúng ta có thể config như sau
1. Edit file `tsconfig.json` và cập nhật các key sau:
```
"target": "esnext",
+     "baseUrl": ".",
+     "paths": {
+       "*": ["src/*"],
+       "tests": ["tests/*"],
+       "@components/*": ["src/components/*"],
+     },
    }
```

2. Add thêm thư viện `babel-plugin-module-resolver`

```
yarn add --dev babel-plugin-module-resolver
# or
npm install --save-dev babel-plugin-module-resolver
```

3. Cuối cùng là config `babel.config.js`

```
{
  plugins: [
+    [
+       'module-resolver',
+       {
+         root: ['./src'],
+         extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
+         alias: {
+           "tests": ["./tests/"],
+           "@components": "./src/components",
+         }
+       }
+     ]
  ]
}
```

Như vậy là chúng ta đã setup đầy đủ một project Reat Native rồi.
Các bạn hãy thử  `yarn run-android` hoặc `yarn run-ios` để check xem còn lỗi gì nữa ko nha.

Buổi sau chúng ta sẽ tiến tới việc setup và sử dụng `React Navigation`