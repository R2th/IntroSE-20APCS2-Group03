### Giới thiệu

Chào tất cả các bạn, hôm nay mình đã trở lại và sẽ giới thiệu cho các bạn cách để tạo một library với VueJS như thế nào. À trong bài này mình chỉ hướng dẫn tạo và sử dụng ở local thôi nhé còn nếu các bạn muốn public và đưa lên npm thì mình sẽ hướng dẫn ở các bài viết sau. Nào bây giờ mình bắt đầu luôn nhé.

### Các bước thực hiện

#### 1. Cài vue cli

Đầu tiên các bạn cần có vue-cli. Nếu chưa có thì các bạn cài bằng lệnh
```
npm install -g @vue/cli
```
hoặc nếu các bạn không dùng npm thì có thể dùng yarn với câu lệnh tương tự.

#### 2. Tạo mới project

```
vue create ui-components
```

#### 3. Xóa các file không cần thiết

Xóa các file không cần thiết sau khi khởi tạo project: HelloWold.vue, logo.png, ... Và bạn nên xóa cả file App.vue vì một project library không cần file này.

#### 4. Tạo các component cần thiết

Tạo các component cần thiết cho library của bạn. Ví dụ ở đây mình tạo một component với 1 button.

src/components/Button.vue
```js:Vue
<template>
    <button class="button button--3d" type="button">{{ text }}</button>
</template>
<script>
export default {
    name: 'Button',
    props: {
        text: {
            type: String,
            default: '',
        },
    },
}
</script>
<style scoped>
.button {
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  font-size: inherit;
  font-family: inherit;
}
.button.button--3d {
  font-weight: 600;
  color: #382b22;
  text-transform: uppercase;
  padding: 1.25em 2em;
  background: #fff0f0;
  border: 2px solid #b18597;
  border-radius: 0.75em;
  transform-style: preserve-3d;
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1);
}
.button.button--3d::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f9c4d2;
  border-radius: inherit;
  box-shadow: 0 0 0 2px #b18597, 0 0.625em 0 0 #ffe3e2;
  transform: translate3d(0, 0.75em, -1em);
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
}
.button.button--3d:hover {
  background: #ffe9e9;
  transform: translate(0, 0.25em);
}
.button.button--3d:hover::before {
  box-shadow: 0 0 0 2px #b18597, 0 0.5em 0 0 #ffe3e2;
  transform: translate3d(0, 0.5em, -1em);
}
.button.button--3d:active {
  background: #ffe9e9;
  transform: translate(0em, 0.75em);
}
.button.button--3d:active::before {
  box-shadow: 0 0 0 2px #b18597, 0 0 #ffe3e2;
  transform: translate3d(0, 0, -1em);
}
</style>
```

#### 5. Export các component

Tạo file index.js để export component vừa viết.

src/components/index.js
```Javascript
import Button from './Button';

export { Button };
```

Và sửa trong file file main.js thành.

```
export * from './components';
```

#### 6. Build source

Sau đó vào file package.json để sửa script build project lại vì mặc định khi tạo nó sẽ build thành project vue bình thường chứ không phải là 1 project library.

```js
"build": "vue-cli-service build --target lib --name ui-components src/main.js"
```

Và sau khi chúng ta chạy lệnh `npm run build` thì trong project sẽ xuất hiện thêm thư mục dist.
Trong thư mục dist sẽ có 1 vài file như sau:

![](https://images.viblo.asia/f25c83f3-2982-4479-b9d5-264bea67ed22.png)


Nếu chúng ta muốn sử dụng library như 1 dependency package thì trong file package.json

```js
"main": "./dist/ui-components.common.js"
```

#### 7. Cách sử dụng

Và bây giờ chúng ta sẽ sử dụng library trong project chính như sau.

```
npm add [Đường dẫn tới library trên máy của bạn]
```

Sau đó dùng như thường.

```js:Vue
<template>
    <Button :text="'3D Button'" />
</template>
<script>
import { Button } from 'ui-components';
import 'ui-components/dist/ui-component.css';

export default {
    name: 'HelloWord',
    components: { Button },
}
</script>
```

Và đây là kết quả

![](https://images.viblo.asia/125e47e9-d017-41bc-89d8-3e3d6a2a06dc.png)

### Kết luận

Trên đây là bài hướng dẫn của mình về cách tạo một library Vue như thế nào. Hy vọng bài viết này giúp ích được cho các bạn. Chúc các bạn một ngày làm việc và học tập hiệu quả :)))