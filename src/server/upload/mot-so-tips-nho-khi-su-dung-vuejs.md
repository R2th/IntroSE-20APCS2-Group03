### Lời nói đầu
Vuejs ngày càng trở nên phổ biến trong giới lập trình front-end. Vue được tạo bởi Evan You sau khi làm việc ở Google, khi đó Evan đang dùng AngularJS cho một số dự án, và Evan nói rằng: "Tôi tưởng tượng, điều gì sẽ xảy ra nếu tôi trích một phần mà tôi thực sự thích về Angular và xây dựng một cái gì đó nhẹ nhàng mà không cần thêm các khái niệm bổ sung?".

Vue ban đầu được phát hành lần đầu vào tháng 2 năm 2014. Dự án này đã được đăng lên HackerNew, Echo Js trong ngày đầu ra mắt.
Hiện tại, số lượng "thích" (star) trên Github cho dự án của Vue đang ngày càng tăng nhanh. Vuejs là một trong những project phổ biến nhất trên Github (theo wikipedia)

![](https://images.viblo.asia/109a41b4-a600-4c25-87dc-4957b34ce16c.png)

Hiện tại chúng ta có thể thấy trên github. Vuejs đã có 3642 star và 2474 lượt Fork về. So với reactjs thì start có nhỉnh hơn đáng kể dù trước đây reactjs được đánh giá cao hơn cả.
![](https://images.viblo.asia/7bb63e05-37a4-4e07-b5d1-878c6b8ff49c.png)

Trên github thì reactjs chỉ có 3481 star nhìn hơn vuejs một chút về lượt fork là 2639. Tuy nhiên, chúng ta cũng có thể lựa chọn một trong hai hoặc cả 2 framework để sử dụng cho dự án của mình.

![](https://images.viblo.asia/0da0bf60-6dd3-4013-9982-97b0df6100df.jpg)
### Nội dung chính
Để tạo một SPA app bằng Vuejs cũng khá là đơn giản. Chúng ta chỉ cần sử dụng thuần thạo các công cụ hỗ trợ viết front-end cũng như nắm rõ có thành phần trong documents của vuejs như vậy ta đã có thể viết vô vàn các ứng dụng với các yêu cầu khác nhau rồi.
Tuy nhiên khi ứng dụng phát triển lớn lên, các màn có thêm nhiều yêu cầu phức tạp hơn, dẫn đến tình trạng javascript sẽ chạy chậm hơn lúc đó liệu bạn có đặt câu hỏi. Làm thế nào để cải thiện hiệu năng?
Dưới đây là một vài típ nhỏ giúp bạn giải quyết điều đó.
### Load content beforehand
Nếu page của bạn cần hiển thị nhiều nội dung dựa trên 1 số dự liệu lớn. Bạn có thể thử sử dụng hook `beforeRouteEnter` để lấy dữ liệu. Cụ thể như sau:
```javascript
function getData() {
  return butter.post.list({ page: 1, page_size: 10 });
}

export default {
 data() {
  return { 
   blogPosts: []
  }
 }
 async mounted() {
   let res = await getData();
   this.blogPosts = res.data;
 }
}
```
Fetch data bằng ```beforeRouteEnter``` hook:
```javascript
function getData() {
  return butter.post.list({ page: 1, page_size: 10 });
}

export default {
 data() {
  return { 
   blogPosts: []
  }
 }
 async beforeRouteEnter(to, from, next) {
   let res = await getData();
   next(vm => {
    vm.blogPosts = res.data;
   });
 }
}
```
Sự khác biệt của 2 cách code không phải là lớn tuy nhiên với lựa chọn code thứ 2 có thể dài dòng hơn một chút nhưng việc hiển thị ra data mà ta nhìn thấy cảm thấy dễ chịu hơn.
### Lazy load images
Nếu page của bạn chứ nhiều hình ảnh mà bạn lại "lười" tải và hiển thị chúng. Bạn có thể sử dụng sự giúp đỡ của các apis ví dụ như IntersectionObserve.
```bash
npm install vue-lazyload
```
```bash
import Vue from "vue";
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload);
```
Một lời khuyên là bạn đừng quá lạm dụng transitions và animations.

### Smarter Watcher
Chắc hẳn trong đây có rất nhiều bạn đã từng làm 1 số task kiểu như: khi mới load trang gọi hàm lấy ra item từ server, khi ng dùng gõ từ khóa tìm kiếm item, gọi lại hàm lấy item, trước đấy khi mới học vue mình thường làm thế này:
```javascript
created() {
  this.fetchPostList();
},
watch: {
  searchItem() {
    this.fetchPostList();
  }
}
```
Tuy nhiên chúng ta có thể viết gọn hơn như sau:
```javascript
watch: {
  searchItem: {
    handler: 'fetchPostList',
    immediate: true
  }
}
```
### Autoload Component
Trong 1 số trường hợp, khi có nhiều component cần sử dụng ở nhiều nơi nhưng bạn lại ko muốn khai báo component đó thành global, khi đó các bạn sẽ làm thế nào?
Ví dụ chúng ta có 3 component là: Header, Content, Footer. Bình thường khi muốn sử dụng chúng ta phải làm thế này:
```javascript
import Header from './Header.vue';
import Content from './Content.vue';
import Footer from './Footer.vue';

export default {
    components: {
        Header,
        Content,
        Footer
    }
};
```
Việc lặp đi lặp lại công việc này sẽ rất gây mất thời gian và nhàm chán, cho nên bạn có thể sử dụng kỹ thuật sau để Vue tự động import component cần dùng đến.
Ở trong file main.js khai báo như sau:
```javascript
import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

const requireComponent = require.context(
    '.', false, /base-[\w-]+\.vue$/ // load những file bắt đầu = base- và kết thúc là .vue
);

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName);

    // lấy pascal name của component
    const componentName = upperFirst(
        camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
    )

    Vue.component(componentName, componentConfig.default || componentConfig)
});
```
### Cleaner Views

```javascript
data() {
    return {
        loading: false,
        error: null,
        post: null
    };
},
watch: {
    '$route': {
        handler: 'resetData',
        immediate: true
    }
},
methods: {
    resetData() {
        this.loading = false;
        this.error = null;
        this.post = null;
        this.getPost(this.$route.params.id);
    },
    getPost(postId) {
        // code get post here
    }
}
```
Mục đích của đoạn code trên là để lấy post mới và reset lại data về trạng thái ban đầu mỗi khi id trên route thay đổi. Vd bạn khai báo 1 route là: http://viblo.asia/post/:id có component là Post.vue. Vì id là 1 url query params và việc thay đổi url query params ko làm thay đổi hay load lại component trong vue, nên component post sẽ được giữ nguyên và cả trạng thái của nó cũng vậy. Để có thể thay đổi trạng thái của nó về ban đầu bạn phải theo dõi biến $route thay đổi và gọi hàm resetData mỗi lần route hay id thay đổi. Chúng ta có thể rút gọn đoạn code trên lại như sau:

```javascript
data() {
    return {
        loading: false,
        error: null,
        post: null
    };
},
created() {
    this.getPost(this.$route.params.id);
}
methods: {
    getPost(postId) {
        // code get post here
    }
}

// và thêm đoạn sau trong file App.vue hoặc file layout cha của component post
<router-view :key="$route.fullPath"></router-view>
```
### Lời kết
Hy vọng nhưng chia sẻ trên của mình thực sự hữu ích khi các bạn sử dụng vuejs vào các project.
![](https://images.viblo.asia/de712910-d0ef-4e55-aaf8-d7cffca1e892.jpg)