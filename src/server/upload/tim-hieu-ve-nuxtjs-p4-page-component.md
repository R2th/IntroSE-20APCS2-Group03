## 1. Mở đầu
<hr>

Chào mừng các bạn đến với phần thứ tư của loạt bài viết liên quan đến `NuxtJS`. Trong bài viết ngày hôm nay, chúng ta sẽ cùng tìm hiểu nhiều hơn về hai thư mục trong project NuxtJS là `components/` và `pages/`. Nào chúng ta cùng bắt đầu.

## 2. Component
<hr>

Chắc hẳn nếu đã tìm hiểu về NuxtJS rồi thì bạn cũng không còn lạ lẫm gì nữa với việc tạo các component trong VueJS nữa. Về cơ bản ở NuxtJS thì các component bạn tạo ra cũng có đầy đủ các tính năng giống như code VueJS thông thường mà thôi, tuy nhiên với NuxtJS thì các component nằm trong thư mục `components/` sẽ có thêm một số tính năng khác.

### a. Component Discovery

Giả sử bạn có một cấu trúc thư mục như sau:
```js
pages/
--- index.vue
components/
--- Shared/
------ Header/index.vue
------ Footer/index.vue
--- List/
------ index.vue
```
Ở đây ta có một trang `index` với URL sẽ là `/` và 2 components con lần lượt sẽ là Header và Footer. Thông thường trong VueJS để sử dụng 2 component này thì ta sẽ cần import vào và dùng như sau:
```html
<template>
    <div>
        <Header />
        <List />
        <Footer />
    </div>
</template>

<script>
import Header from '~/components/Shared/Header/index.vue';
import Footer from '~/components/Shared/Footer/index.vue';
import List from '~/components/List/index.vue';

export default {
    components: {
        Header,
        Footer,
        List
    }
}
</script>
```
Với mỗi component mới bạn sẽ cần thêm một lệnh `import` và khai báo trong `components`. Tuy nhiên với NuxtJS từ phiên bản 2.13+ đã cung cấp cho chúng ta một tính năng gọi là `Component Discovery`, hiểu nôm na tính năng này sẽ tự động thực hiện cho bạn việc `import` và khai báo trong `components` như trên. Để sử dụng tính năng này, ta chỉ cần vào file `nuxt.config.js` và khai báo như thêm:
```nuxt.config.js
export default {
    components: true,
    ...
}
```
Sau đó trong trang `index` ban đầu của bạn có thể sử dụng luôn như sau mà không cần khai báo thêm phần `import` hay `component` nữa:
```html
<template>
    <div>
        <SharedHeader />
        <List />
        <SharedFooter />
    </div>
</template>
```
Tuy nhiên khi dùng tính năng mới này thì tên component mà bạn sử dụng sẽ hiển thị giống với đường dẫn đến component đó. Như ví dụ ở trên, ta có đường dẫn đến component là `components/Shared/Header/index.vue` thì khi sử dụng component này bạn sẽ phải đặt tên nó là `<SharedHeader />` để trùng với tên đường dẫn. Với mỗi cấp folder mà bạn tạo ra thì component của bạn khi dùng tương ứng cũng phải dùng cho trùng với các cấp thư mục đó. Một ví dụ nữa đến từ documents của NuxtJS;
```js
components/
--- Base/
------ Foo/
--------- Button/index.vue
```
Khi sử dụng component nói trên thì cái tên bạn cần dùng sẽ là `<BaseFooButton />`. Với các trường hợp bạn lồng nhiều cấp thư mục như nói trên thì việc dùng tính năng mới này có thể làm tên component của bạn quá dài khi dùng. Nhưng đừng lo, NuxtJS cũng cung cấp cho bạn khả năng tự cài đặt lại đường dẫn như sau, bạn vào file `nuxt.config.js` và sửa lại thành như sau:
```nuxt.config.js
export default {
    components: {
        dirs: [
           '~/components',
           '~/components/Base'
        ]
    },
    ...
}
```
Với config cho đường dẫn mới là `~/components/Base` nói trên thì lúc này tên component của chúng ta sẽ chỉ còn là `<FooButton />` mà thôi. Lưu ý  ở đây bạn cũng cần nhớ khai báo đường dẫn gốc là `~/components` để có thể sử dụng tính năng này cho các component khác ngoài folder `components/Base/`.

### b. Dynamic import

Trước đây với VueJS, để thực hiện việc lazy import một component , ta sẽ thường làm như sau:
```html
<template>
    <div>
        <SharedHeader />
        <List />
        <EditItemModal v-if="showEdit" />
        <SharedFooter />
    </div>
</template>

<script>
import Header from '~/components/Shared/Header/index.vue';
import Footer from '~/components/Shared/Footer/index.vue';
import List from '~/components/List/index.vue';

export default {
    components: {
        Header,
        Footer,
        List,
        EditItemModal: () => import('~/components/EditItemModal/index.vue')
    }
}
</script>
```
Việc lazy import như nói trên sẽ giúp chúng ta giảm kích thước file js vì component Modal của chúng ta sẽ chỉ được máy người dùng tải về khi điều kiện `showEdit` là true chứ nó  sẽ không bị gộp chung vào kích  thước file chính. Đối với NuxtJS, để làm được việc nói trên, ta chỉ cần thêm từ khóa `Lazy` vào đầu một component như sau:
```html
<template>
    <div>
        <SharedHeader />
        <List />
        <LazyEditItemModal v-if="showEdit" />
        <SharedFooter />
    </div>
</template>
```
Như bạn có thể thấy tên component củ achusng ta lúc này đã được đổi từ `<EditItemModal />` sang `<LazyEditItemModal />`.

## 3. Page
<hr>

Như ở trong [bài viết về nói về Routing trong NuxtJS](https://viblo.asia/p/tim-hieu-ve-nuxtjs-p2-routing-middleware-924lJ2omlPM#_2-routing-1) mình đã nhắc đến nhờ tính năng này mà NuxtJS cung cấp cho chúng ta một thư mục đặc biệt là `pages/` sẽ để chứa các component vue với nhiều tính năng đặc biệt khác mà mình đã nhắc đến như `middleware`, `asyncData`, `watchQuery`, ... . Ngoài các tính năng đó ra thì ở đây bạn còn có thể dùng thêm một số tính năng khác mà bản thân mình cũng hay dùng là `layout` và `head`.

### a. Layout

Đối với hầu hết các trang web mà bạn tham gia phát triển hoặc sử dụng bạn sẽ thấy nó sẽ thường có các layout chung cho rất nhiều các trang nhỏ trong cùng một website chính, ví dụ như này:

![](https://images.viblo.asia/dfe48c72-792d-4187-b3df-6edb88770c7b.PNG)

Thông thường phần `Header, Sidebar, Footer` sẽ thường được giữ nguyên giữa các trang con mà chỉ có phần nội dung `Content` là thay đổi. Các phần `Header, Sidebar, Footer` sẽ được coi là layout dùng chung của website. Tùy vào nghiệp vụ mà các trang web có thể có layout khác nhau và cũng có thể có nhiều hơn một layout. Chính vì vậy mà NuxtJS cung cấp cho chúng ta hẳn một folder riêng là `layouts/` để bạn có thể tái sử dụng nó ở nhiều trang khác nhau thay vì mỗi trang bạn đều phải viết như này:
```html
// pages/index.vue
<template>
    <div>
        <SharedHeader />
        <List />
        <SharedFooter />
    </div>
</template>
```
Để tạo một layout bạn chỉ cần tạo một file `.vue` trong folder `layouts/` như sau:
```html
<template>
  <div>
    <SharedHeader />
    <Nuxt />
    <SharedFooter />
  </div>
</template>
```
Với `<ShareHeader />` và `<SharedFooter />` lần lượt là các component thông thường của bạn còn component `<Nuxt />` mà bạn thấy nó sẽ đóng vai trò như một slot cho phần content trên mỗi trang của bạn. Về sau mỗi khi bạn dùng cái layout này thì cho một file trong folder `pages/` thì toàn bộ phần template có trong file ở thư mục `pages/` đó sẽ được thay thế cho component `<Nuxt />` mà ta khai bảo ở trên. Ở đây file layout này là một file `.vue` nên tất nhiên nó cũng có đầy đủ các tính năng như một component vuejs thông thường như `computed property`, `data`, `methods`, ... . Mặc định thì trong folder `layouts/` sẽ có sẵn một file `default.vue` và nó đóng vai trò layout mặc định cho toàn bộ các trang trên trang web của bạn nếu bạn không khai báo gì thêm. Tuy nhiên trường hợp trang web của bạn có thêm một layout dành riêng cho admin thì bạn hoàn toàn có thể tạo thêm layout mới `layouts/admin.vue`. Cuối cùng để sử dụng layout khác ngoài layout default cho các trang admin thì bên trong các file ở folder `pages/` bạn chỉ cần khai báo thêm thuộc tính này:
```js
<script>
export default {
  layout: 'admin',
}
</script>
```
Chỉ đơn giản như nói trên thôi là bạn có thể đổi layout cho trang của bạn.

### b. Page header

Trên thực tế đối với mỗi trang trên website của bạn có thể sẽ phần mô tả khác nhau cho trang đó như tiêu đề trang, mô tả trang hay ảnh thumbnail khác nhau. Để làm được điều này, ta sẽ cần thay thế nội dung các thẻ meta trong phần head của trang. Để khai báo thông tin này cho mỗi trang ta có thể làm như sau:
```js
<script>
  export default {
    head() {
      return {
        title: 'Home page',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Home page description'
          }
        ]
      }
    }
  }
</script>
```
hoặc
```js
<script>
export default {
  head: {
    title: 'Home page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Home page description'
      }
    ],
  }
}
</script>
```
Bằng việc khai báo như trên thì trang cụ thể đó của bạn khi chạy lên thực tế sẽ có thêm nội dung sau trong thẻ tag `<head>`
```html
<head>
    <titlte>Home title</title>
    <meta data-n-head="ssr" data-hid="description" name="description" content="Home page description">
</head>
```
Khác nhau giữa việc bạn sử dụng function `head()` và thuộc tính `head` như nói trên đó là bằng việc sử dụng function `head()` bạn mới có thể truy cập vào `data`, `computed property` bên trong component đó, còn vói thuộc tính `head` thì không.