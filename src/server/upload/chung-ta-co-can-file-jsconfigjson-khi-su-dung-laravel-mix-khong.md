Bình thường một dự án Laravel sẽ đi kèm Laravel Mix. Laravel Mix giúp chúng ta compile các file JS, CSS. Chúng ta định nghĩa việc compile file JS, CSS nào trong file `webpack.mix.js` ở thư mục gốc. Trong file này chúng ta cũng có thể định nghĩa alias, ví dụ như:

```javascript
const mix = require('laravel-mix');
const path = require('path');

mix.webpackConfig({
    resolve: {
        alias: {
            '~': path.join(__dirname, './frontend/js')
        }
    }
});
```

Đặt alias giúp cho việc chỉ định đường dẫn import được dễ hơn, không phải lên xuống nhiều cấp thư mục. Giả sử dự án của bạn có cấu trúc các file như sau:

```
frontend
    js
        Components
            Input.vue
        Pages
            Dashboard
                Index.vue
```

Import file `Input.vue` vào file `Index.vue` với đường dẫn tương đối như sau:

```javascript
import Input from '../../Components/Input.vue';
```

Chúng ta có thể viết lại với alias `~` như sau:

```javascript
import Input from '~/Components/Input.vue';
```

Cách viết sau rõ ràng, dễ bảo trì hơn. Nó cũng tương tự cách chúng ta import các class trong Java hay PHP.

## Chúng ta có cần file `jsconfig.json` nữa không?

File `jsconfig.json` là một file cấu hình được VSCode sử dụng để hỗ trợ các dự án JavaScript. Chúng ta vẫn cần file `jsconfig.json` để hỗ trợ auto-complete khi bạn gõ các đường dẫn.

Cấu hình đường dẫn (`paths`) trong file `jsconfig.json` như sau:

```json
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "~/*": ["frontend/js/*"]
        }
    },
    "include": ["frontend/js/**/*"],
    "exclude": ["node_modules"]
}
```

Khi bạn gõ *import Input from '~*, bạn sẽ thấy cấu trúc thư mục và các file trong từng thư mục.

![](https://images.viblo.asia/b3eee5de-4da9-47ad-804b-ab6b2e701f86.gif)

## Tham khảo:

[Why you need a jsconfig.js when using VSCode | Laravel News](https://laravel-news.com/jsconfigjs-vscode)

[jsconfig.json Reference](https://code.visualstudio.com/docs/languages/jsconfig)