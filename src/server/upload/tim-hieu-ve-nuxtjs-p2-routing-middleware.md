## 1. Mở đầu
<hr>

Chào mừng các bạn đến với part 2 của series bài viết tìm hiểu về `NuxtJS`, trong bài viết [trước](https://viblo.asia/p/tim-hieu-ve-nuxtjs-p1-vyDZOMrO5wj) mình đã giới thiệu qua về NuxtJS, cách cài đặt, cấu trúc thư mục và config cơ bản có trong file `nuxt.config.js`. Trong bài viết ngày hôm này, chúng ta sẽ cùng tìm hiểu về một tính năng mà Nuxt đem lại đó là `Routing`. Trước khi bắt đầu bài viết này thì mình mặc định các bạn đã biết trước các kiến thức cơ bản cũng như đã từng code VueJS. Nếu chưa thì mình nghĩ các bạn nên tìm hiểu về VueJS và việc phát triển SPA với VueJS trước khi bắt đầu bài viết này vì có thể nó sẽ làm bạn khó hiểu, còn nếu bạn đã nắm được rồi thì chúng ta cùng bắt đầu thôi.

## 2. Routing
<hr>

### a. Vue-Router

Nếu bạn đã từng phát triển SPA với VueJS thì `Vue Router` chắc hẳn không còn xa lạ với bạn nữa, đây chính là thư viện hỗ trợ các bạn trong việc định nghĩa việc truy cập url này sẽ hiện ra page nào hay đúng hơn là hiện ra component nào. Về cơ bản khi sử dụng Vue-Router trong project của bạn thì ngoài việc tạo các component đại diện cho một page thì ta cũng đồng thời cần tạo cả một file cho việc routing như sau:

```router.js
const router = new VueRouter({
    routes: [
        { path: '/', component: HomePage },
        { path: '/users', component: UserListPage },
        { path: '/users/:id', component: UserDetailPage },
        ...
    ]
});
```

Sau đó sử dụng nó trong app của bạn như sau:

```js
const app = new Vue({
  router
}).$mount('#app')
```
Với SPA thông thường thì chúng ta sẽ phải làm 2 việc:
- Định nghĩa component đại diện cho một page
- Khai báo url (path) tương ứng với component mà bạn muốn sử dụng trong file `router.js`

Tuy nhiên khi bạn đến với NuxtJS thì công việc của chúng ta sẽ được giảm đi một nửa nhờ vào hệ thống `File System Routing`

### b. File System Routing

Với NuxtJS thì việc duy nhất ta cần làm là tạo ra component đại diện cho page mà bạn mong muốn còn lại việc tạo config giống như file `router.js` nói trên sẽ tự động được nó xử lý cho chúng ta luôn. Cụ thể như cái tên nói trên, các url (path) trong project của bạn sẽ được tự động tạo ra dựa trên cấu trúc thư mục trong folder `pages/` mà mình đã nhắc đến ở bài trước. Giả sử chúng ta có một số URL như sau:
```js
const router = new VueRouter({
    routes: [
        { path: '/', component: HomePage },
        { path: '/about', component: AboutPage },
    ]
})
```
Thì trong thư mục `pages/` ta chỉ cần tạo như sau:
```js
pages/
--| index.vue
--| about.vue
```
 Vậy là mọi thứ đã xong. 2 file mà bạn tạo ra ở trên hoạt động giống như component của Vue và đồng thời nó còn đại diện luôn cho url tương ứng. Nội dung bên trong các file này bạn code giống hệt component của VueJS thông thường, tuy nhiên nó còn được cung cấp một số tính năng đặc biệt khác mà mình sẽ đề cập đến sau. Với việc tạo cấu trúc folder file như nói trên thì sau này tự hệ Nuxt sẽ sinh ra file config `router.js` cho chúng ta khi ta build ra. Ví dụ trong project mẫu của mình tạo như nói trên:

![](https://images.viblo.asia/80c7c4cd-5d32-4ff5-9c91-f8f1c4367e15.png)

Trong 2 file nói trên thì nội dung file sẽ lần lượt là:

```html
// index.vue
<template>
    <div class="container">
        Home page
    </div>
</template>

<style>
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
</style>
```

```html
// about.vue
<template>
    <div class="container">
        About page
    </div>
</template>

<style>
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
</style>
```

Thì đây là kết quả mình thu được trên trình duyệt:

![](https://images.viblo.asia/b046a9ac-4878-4f8b-8461-b6b5dfe48d3c.gif)

Tất nhiên việc tạo router dựa hệ thống file và folder của Nuxt không chỉ đơn giản như vậy và ta còn có thể tạo theo các cấu trúc bao gồm cả folder lồng vào nhau. Ví dụ để tạo ra các url dạng như sau:

```js
/about/author
/about/team
```
Với cấu trúc router dạng như trên thì ta đơn giản sẽ tạo ra thêm một thư mục tên là `about/` và trong đó ta lần lượt tạo ra hai file là `author.vue` và `team.vue`:

![](https://images.viblo.asia/f1e1c95d-c891-4148-b63f-ce30a5d3e887.png)

Lưu ý nếu trong các folder như `about/` nói trên mà bạn vẫn muốn có thể truy cập vào url mặc định của folder chỉ là `/about` thì ta chỉ cần tạo thêm 1 file `index.vue` trong folder `about/`. Bạn có thể hiểu các file có tên là `index` sẽ đóng vai trò như file mặc định cho các path dạng `[folder-name]/` hoặc thậm chí như url default của chúng ta là `/` ta cũng có file `index.vue` đặt ngay trong thư mục gốc là `pages/`:

![](https://images.viblo.asia/4f156595-c5d9-403f-b45c-72568e4e0695.png)


Ngoài ra ta có thể tạo router dạng lồng nhau bao nhiêu cấp cũng được
```js
pages/
-- | about/
----- | index.vue // Path: '/about'
----- | team/
-------- | index.vue // Path: '/about/team'
------------ | team_one/
---------------- | index.vue // Path: '/about/team/team_one'
---------------- | member.vue // Path: '/about/team/team_one/member'
```

### c. Dynamic routing

Trong project thực tế của chúng ta thì không phải url lúc nào cũng dạng static như các ví dụ nói trên của mình mà sẽ còn có các các tham số trên url nữa. Lấy luôn ví dụ của trang viblo mà các bạn đang sử dụng. Với trang chủ ta có url dạng `viblo.asia` tuy nhiên khi bạn đọc truy cập vào đọc các bài viết cụ thể sẽ thế url có dạng `viblo.asia/p/[slug-hashId]`. Như bạn biết thì với mỗi bài viết thì phần `slug-hashId` sẽ khác nhau và chúng ta không thể nào ngồi tạo ra một đống file có dạng `[slug-hashId].vue` được. Chính vì thế với cấu trúc như nói trên thì ta sẽ cần tạo cấu trúc thư mục như sau:

```js
pages/
-- | p/
----- | _id.vue
```
Bằng cách đặt tên file có bắt đầu bằng `_` như nói trên, ta đã tạo ra một dynamic router khi ta truy cập vào các url dạng `viblo.asia/p/xxx` thì toàn bộ phần `xxx` sẽ tự được nhận là `id` và ta có thể sử dụng giá trị này trong file `_id.vue`.

*Lưu ý: khi sử dung giá trị dynamic này trong file _id.vue thì ta sẽ gọi là id thôi chứ không cần gọi là _id*

Thực tế cấu trúc thư mục của bạn sẽ như sau:
![](https://images.viblo.asia/291fa31a-3c16-4812-bdbe-a953001f3b9c.png)

Phần này có thể mình giải thích hơi khó hiểu một chút nhưng nếu bạn tự sử dụng thử thì sẽ thấy nó vô cùng đơn giản và dễ hiểu. Không những ta có thể tạo ra các file dạng dynamic như `_id.vue` nói trên mà ta còn có thể tạo ra các folder dynamic bằng cách đặt tên với quy tắc như nói trên. Ta xét ví dụ thực tế đó là một repository bất kì của bạn trên Github của mình sẽ truy cập vào repository có là [https://github.com/dqhuy78/to-do-list](https://github.com/dqhuy78/to-do-list), ở đây `dqhuy78` là user name của mình và `to-do-list` chính là tên repository của mình.

![](https://images.viblo.asia/f73ccef9-b059-4247-be05-4f979a3a2e29.png)

Nếu bạn thử bấm vào các mục như `Issues`, `Pull requests`, `Actions`, `Projects`, `Security`, `Insights` thì sẽ thấy url của chúng ta sẽ lần lượt thay đổi thành:
- `/dqhuy78/to-do-list/issues`
- `/dqhuy78/to-do-list/pulls`
- `/dqhuy78/to-do-list/actions`
- ...

![](https://images.viblo.asia/7204c632-d798-4a03-97f9-c27ea4c60c76.gif)

Tương tự nếu bạn truy cập vào một repository khác như `https://github.com/dqhuy78/countdown` và bấm lại các mục như trên thì cũng sẽ thu được các url tương tự chỉ khác nhau ở phần tên repo:
- `/dqhuy78/countdown/issues`
- `/dqhuy78/countdown/pulls`
- `/dqhuy78/countdown/actions`
- ...

Để tạo được các  dạng url như nói trên thì ta sẽ cần tạo cấu trúc thư mực như sau trong folder `pages/` như sau:

![](https://images.viblo.asia/6e8bde5d-24ad-4f27-9409-db14b9239b9b.png)

Trong các file này ta đều có thể truy cập đến giá trị `owner-name` và `repo-name` để sử dụng cho việc lấy đúng dữ liệu cho chính xác repository của owner tương ứng. Cụ thể `owner-name` ở đây là `dqhuy78` còn `repo-name` sẽ lần lượt là `to-do-list` và `countdown`.

## 3. Middleware
<hr>

Nếu bạn từng làm việc với phần backend thì không còn lạ lẫm gì với khái niệm middleware còn nếu không thì bạn có thể hiểu đơn giản đây là tính năng cho phép bạn định nghĩa logic xem liệu user có quyền truy cập vào một trang (url) nào đó không. Cụ thể ta xét ví dụ đơn giản là ta có trang là `login.vue` và ta sẽ chỉ cho phép user truy cập vào đây nếu họ chưa đăng nhập mà thôi. Trường hợp mà user đăng nhập rồi thì ta sẽ tự redirect họ về trang home của chúng ta thì middleware chính là nơi cho phép chúng ta thực hiện điều này. Để định nghĩa một middleware ta chỉ cần tạo một file trong folder `middleware/`. Với ví dụ nói trên mình sẽ tạo một file `guest.js` có nội dung như sau:
```js
import _get from 'lodash/get';

export default ({ store, redirect }) => {
    const authenticateUser = _get(store, 'state.authenticate', null);
    if (authenticateUser) {
        redirect('/');
    }
};
```

Logic ở đây rất đơn gian là mình check trong store (VueX) xem có tồn tại thông tin đăng nhập hay chưa nếu rồi thì sẽ tự động redirect về trang home còn không thì không cần làm gì cả. Tiếp đến để áp dụng cái middlware vào trang của bạn thì ta sẽ vào trong file `login.vue` và khai báo như sau:

```html
// login.vue
<template>
    // You UI here
</template>

<script>
    export default {
        middleware: ['guest'],
    };
</script>
```
`guest` ở đây cũng chính là tên file middleware mà bạn tạo ra ở trên. Ở đây ta có thể áp dụng nhiều middleware cho cùng một page và thứ tự chạy sẽ lần lượt theo bạn thêm vào. Đối với mình đây là một tính năng khác là tiện và cần thiết mà trước đây khi làm bên NextJS mình không thấy có sẵn phần middleware này luôn mặc dù đã trải qua nhiều phiên bản hơn NuxtJS :confused:

## 4. Kết bài
<hr>

Part 2 trong loạt bài viết về NuxtJS của mình đến đây là kết thúc, cám ơn các bạn đã đọc. Như thương lệ nếu bạn thấy phần nào mình viết chưa chính xác hoặc chưa hiểu phàn nào có thể comment ngay ở phía dưới cho mình. Cuối cùng bạn đừng quên để lại một upvote để ủng hộ mình nhé.