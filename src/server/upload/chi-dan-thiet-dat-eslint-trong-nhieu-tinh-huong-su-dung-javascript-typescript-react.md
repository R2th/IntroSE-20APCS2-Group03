Chúng ta bắt đầu với Javascript trước, sau đó sẽ là TypeScript, và React. Mục tiêu là làm đúng, tránh trường hợp cài package không cần thiết hoặc copy/paste các config tới khi nó chạy được thì thôi.
# _Tại sao dùng ESLint
Hiện tại không có bất cứ một đối thủ nào xứng tầm với ESLint, nó là dự án đã và đang được bảo trì bởi cộng động rất rộng lớn. Hầu hết các chương trình viết code đều hỗ trợ thông qua plugin, chúng ta sẽ không gặp khó khăn trong việc sử dụng nó với VSCode, Vim, Emac, WebStorm, Sublime, Atom,...

Túm lại, **ESLint** là nền tảng xịn sò nhất để bạn dựa trên đó đưa ra thiết đặt chung.

# _Cài đặt ESLint
Giống như bất kỳ package nào khác, ESLint có thể được cài đặt ở 2 mức

* global, cài luôn vào máy npm -g
* đi theo từng project
* 
Việc cài đặt ESLint ở mức global khá là hợp lý vì chúng ta muốn dùng nó ở mọi project. Tuy nhiên cũng hợp lý nếu cài riêng trên từng project, nếu bạn đang cần
* Các phiên bản ESLint khác nhau trên từng dự án
* Không ẩn việc phụ thuộc vào ESLint
* Đồng nghiệp và các công cụ tự động ( như mấy thằng CI) sẽ cài ESlint có thể cài đặt nó như những package khác. Không cần thêm bất kỳ cài đặt và tài liệu nào khác.

Cài đặt ESLint trong thư mục project

`npm i eslint --save-dev`

Chạy ESLint trong project

`npx eslint`

Để tạo một shortcut cho câu lệnh chạy eslint. Bên trong file package.json thêm dòng sau

```
"scripts": {
    "lint": "eslint ."
}
```

Tham số . cho phép chạy ESLint bên trong thư mục hiện tại, chúng ta chạy lệnh thông qua shortcut

`npm run lint`

# _File cài đặt của ESLint
Có thể đặt file cài đặt ESLint ở nhiều vị trí. Nếu không có nhu cầu quá đặt biệt, 1 file duy nhất ở thư mục ngoài cùng ( root ) là đủ.

ESLint cho phép sử dụng nhiều kiểu file

Javascript
JSON
YAML
Kiểu YAML xài là vui nhất. Tạo file tên `.eslintrc.yaml`

`touch .eslintrc.yaml`

* *Nếu muốn thêm logic bằng code, bạn cần dùng kiểu javascript*

Điều cần quan tâm trước hết là thông báo cho ESLint chúng ta đang viết ngôn ngữ gì, phiên bản nào, môi trường mà code sẽ chạy. Nếu không có các thông tin, ESLint sẽ không chạy được.

```
parserOptions:
  ecmaVersion: 6
env:
  node: true
```

# _Javascript thuần
Với project là javascript thuần, toàn bộ file là .js, có thể tự định nghĩa từ đầu hết, nhưng như vậy khá mất thời gian, khó bảo trì, chưa chắc chuẩn vì nó phụ thuộc vào sự hiểu biết của bạn về javascript

Rất nhiều các công ty lớn như Google, Airbnb, Facebook bỏ ra cả tỉ tỉ thời gian để bảo trì và cập nhập mấy cài đặt này

Sử dụng cài được vạn người yêu thích, Airbnb

`npx install-peerdeps --dev eslint-config-airbnb-base`

Các bài viết trên mạng sẽ kêu bạn cài eslint-config-airbnb, nó có bao gồm luôn phần cài đặt cho React, React Hooks, ... . Không cần thiết trong trường hợp project chỉ là javascript thông thường.

Để ý chúng ta **KHÔNG** dùng npm để cài đặt, mà dùng npx install-peerdeps. Nó sẽ cài luôn mấy package nào mà eslint-config-airbnb-base phụ thuộc. Trường hợp sử dụng ESLint chúng ta sẽ gặp hoài, vì hầu như nó đều phụ thuộc một vài package khác.

Cài xong, khai báo sẽ kế thừa bộ cài đặt của Airbnb
```
extends:
  - airbnb-base
```

Những thiết đặt của airbnb có thể nói là rất phổ biến và được tin dùng bởi nhiều dự án lớn nhỏ khác nhau. Chúng ta có thể yên tâm sử dụng nó mà không cần thay đổi gì nhiều.

Tổng kết

```
"devDependencies": {
  "eslint": "^6.1.0",
  "eslint-config-airbnb-base": "^14.0.0",
  "eslint-plugin-import": "^2.20.0" (peer dependency)
}
```
```
parserOptions:
  ecmaVersion: 6

env:
  node: true

extends:
  - eslint:recommended
  - airbnb-base
```

# _Thiết đặt TypeScript
Vấn đề chính của TypeScript là ESLint không thể tự động mà parse được, chúng ta phải thêm một parser @typescript-eslint/parser.

Cài đặt

`npm install @typescript-eslint/parser --save-dev`

* Parse làm nhiệm vụ đọc cài file input và tạo ra một phiên bản mà ESLint hiểu được.**

KHai báo dùng parser này

`parser: "@typescript-eslint/parser"`

Đồng thời cập nhập luôn package.json và báo với ESLint đừng kiểm tra file .js mà kiểm tra file .ts

```
"scripts": {
  "lint": "eslint . --ext .ts"
}
```

Tương tự như javascript, chúng ta cài đặt bộ thiết đặt sẵn của Airbnb

`npx install-peerdeps --dev eslint-config-airbnb-typescript`
`npm i eslint-plugin-import --save-dev`

eslint-plugin-import phải được cài đặt riêng, thủ công, không rõ lý do tại sao luôn.

Cập nhập lại file config ESLint

```
extends:
  - airbnb-typescript/base
  - plugin:@typescript-eslint/recommended
```

Bạn có thể thắc mắc, tại sao chưa cài @typescript-eslint mà có thể sử dụng, thật ra lúc cài eslint-config-airbnb-typescript chúng ta đã cài luôn nó bằng npx install-peerdeps

Có thể rule khác nữa có thể tham khảo trực tiếp từ tài liệu trên github

Cuối cùng, bạn sẽ thấy có rất nhiều bài viết trên mạng, chỉ bạn thiết đặt

```
plugins:
  - "@typescript-eslint"
```

Nếu không sử dụng các thiết ESLint được đề nghị, cái này không cần thiết. Lý do là Airbnb đã bật luôn các rule như vậy.

Tổng kết

```
package.json

"devDependencies": {
  "@typescript-eslint/eslint-plugin": "^2.17.0", (peer dependency)
  "@typescript-eslint/parser": "^2.17.0",
  "eslint": "^6.8.0",
  "eslint-config-airbnb-typescript": "^6.3.1",
  "eslint-plugin-import": "^2.20.0"
}
```

```
eslintrc.yaml

parserOptions:
  ecmaVersion: 6

env:
  node: true

extends:
  - airbnb-typescript/base
  - plugin:@typescript-eslint/recommended
```

# _Thiết đặt cho React
Thêm các thiết đặt ESLint cho React vô cùng đơn giản, mọi thứ đã có Airbnb lo.

Một trong những sai lầm phổ biến là cho rằng viết như bên dưới sẽ bật hỗ trợ React

```
.eslintrc.yaml

parserOptions:
  ecmaFeatures:
    jsx: true
```

React sử dụng JSX, nhưng theo cách mà ESLint không thể hiểu nổi. Để React và ESLint nói chuyện được với nhau, chúng ta phải sử dụng eslint-plugin-react

React Javascript
Cài đặt package

`npx install-peerdeps --dev eslint-config-airbnb`

```
.eslintrc.yaml

extends:
  - airbnb
env:
  browser: true
```

```
package.json

"scripts": {
  "lint": "eslint . --ext .js,.jsx"
}
```

Nếu có sử dụng React Hook, bạn nên thêm phần cài đặt sau (có bỏ qua việc kiểm tra accessibility)

```
.eslintrc.yaml

extends:
  - airbnb-base
  - airbnb/rules/react
  - airbnb/hooks
```

Tổng kết

```
package.json

"devDependencies": {
  "eslint": "^6.1.0",
  "eslint-config-airbnb": "^18.0.1",
  "eslint-plugin-import": "^2.20.0", (peer dependency)
  "eslint-plugin-jsx-a11y": "^6.2.3", (peer dependency)
  "eslint-plugin-react": "^7.18.0", (peer dependency)
  "eslint-plugin-react-hooks": "^1.7.0" (peer dependency)
}
```
```
.eslintrc.yaml

parserOptions:
  ecmaVersion: 6

env:
  browser: true

extends:
  - airbnb
  - airbnb/hooks
```

```
rules:
  react/react-in-jsx-scope: off
```

# _Cài đặt cho VSCode
VSCode đã có plugin khá thần thánh để hỗ trợ ESLint. Các thiết đặt yêu thích của mình

Tự động chạy lint khi save

`"eslint.run": "onSave"`
VSCode sẽ kiểm tra trên JS, JSX, TS, TSX

```
"eslint.validate": [
  "javascript",
  "javascriptreact",
  "typescript",
  "typescriptreact"
]
```
Chọn kiểu nháy đơn

```
"javascript.preferences.quoteStyle": "single",
"typescript.preferences.quoteStyle": "single",
```

Tự động cập nhập vị trí file

```
"javascript.updateImportsOnFileMove.enabled": "always",
"typescript.updateImportsOnFileMove.enabled": "always",
```

Vậy là chúng ta đã setup xong Eslint, giờ thì khỏi lo mỗi người viết một kiểu rồi nhé!