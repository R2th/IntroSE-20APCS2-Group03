## Vấn đề gặp phải
Hiện tại nếu chúng ta code với dự án trên nền tảng Nuxt.js thì việc sử dụng những hàm global cực kì tiện lợi, tránh được lặp lại code và rút gọn được cú pháp import plugins, utils, ... bên trong component. Vậy cách xử lý ra sao, chúng ta sẽ đi đến phần ví dụ sau đây.

## Ví dụ đơn giản
Hiện tại chúng ta có 2 file là 1 plugins `handle-error.js` và file config của Nuxt.js. Plugins này có tác dụng log là message và log lại status code, chúng ta có thể xử lý chung cho những code kiểu 404 cho phép redirect trang nào đó hoặc code 500 xử lý kiểu khác. 

Rất nhiều tính linh hoạt để custom lại handle Error, cấu hình chung cho tất cả component sau khi call API để xử lý.

```
--plugins/handle-error.js
--nuxt.config.js
```

```handle-error.js
export default (context, inject) => {
    const handleError = (error) => {
        console.log(error.response.data.message); // log lại message
        console.log(error.response.status); // log lại status code
    };
    // Inject $handleError(error) in Vue, context and store.
    inject('handleError', handleError); // phần này để inject handleError có thể import bên trong store vuex sử dụng được, bên trong vuex chúng ta ko sài được this.${globalsomething}
    context.$handleError = handleError; // context gán vào global this context
};
```

Setup config
```nuxt.config.js
plugins: [
        '@/plugins/handle-error', // setup plugins
    ],
```

Từ bây giờ bên trong component chúng ta có thể sử dụng `this.$handleError(error)`, ko cần import trước đó vì đã đăng kí thành global.

ví dụ:
```js
async onSearch(keyword) {
                try {
                    await someApi.searchSomeThing(id, { keyword });
                } catch (error) {
                    this.$handleError(error); // dùng ở đây khá là tiện lợi
                } finally {
                    this.isSearching = false;
                }
            },
```

## Extend callback function
Để flexible hơn chúng ta có thể sử dụng callback function bên trong plugins custom lại `handleError`
```handle-error.js
export default (context, inject) => {
    const handleError = (error, callback = null) => {
        console.log(error.response.data.message);
        console.log(error.response.status);
        // custom callback function để flexible hơn với handle error.
        if (typeof callback === 'function') {
            callback(error);
        }
    };
    // Inject $handleError(error) in Vue, context and store.
    inject('handleError', handleError);
    context.$handleError = handleError;
};
```

Lúc đó hàm onSearch của chúng ta có thể viết thêm
```js
async onSearch(keyword) {
                try {
                    await someApi.searchSomeThing(id, { keyword });
                } catch (error) {
                    this.$handleError(error, () => {
                       console.log(error);
                    });
                } finally {
                    this.isSearching = false;
                }
            },
```

## Kết luận
Hi vọng đối với ví dụ nho nhỏ này mọi người có thể tích hợp vào dự án liên quan đến Nuxt.js, cũng như thống nhất quy định chung nhiều kiểu biến global khác nhau tùy vào mục đích sử dụng.