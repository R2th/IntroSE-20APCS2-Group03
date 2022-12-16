VueJS, ReactJS, Angular đang là bộ ba framework javascript làm mưa làm gió những năm gần đây. Nên nếu các bạn đang đọc bài viết này thì mình nghĩ các bạn đều đã quen thuộc với Vue và biết Vue là gì, nên mình sẽ không mất thời gian giới thiệu nữa mà sẽ đi thẳng vào vấn đề chính luôn :smile:, đó là các thủ thật làm việc với Vue mà mình nghĩ khá hữu ích và giải quyết được nhiều trường hợp rất hay gặp
# Smarter Watcher
Chắc hẳn trong đây có rất nhiều bạn đã từng làm 1 số task kiểu như: khi mới load trang gọi hàm lấy ra item từ server, khi ng dùng gõ từ khóa tìm kiếm item, gọi lại hàm lấy item, trước đấy khi mới học vue mình thường làm thế này:
```
created() {
  this.fetchItemList();
},
watch: {
  searchItem() {
    this.fetchItemList();
  }
}
```
Nhưng thực ra có thể viết gọn lại thế này:
```
watch: {
  searchItem: {
    handler: 'fetchItemList',
    immediate: true
  }
}
```
Vậy là ngoài cách khai báo watcher như 1 hàm, chúng ta cũng có thể khai báo watcher là 1 object gồm có 2 thuộc tính là handler: tên hàm cần gọi khi searchItem thay đổi, và immediate: true để thực hiện gọi hàm ngay lập tức khi vừa mới load trang.

# Autoload Component
Trong 1 số trường hợp, khi có nhiều component cần sử dụng ở nhiều nơi nhưng bạn lại ko muốn khai báo component đó thành global, khi đó các bạn sẽ làm thế nào? Ví dụ chúng ta có 3 component là: BaseButton, BaseIcon, BaseInput. Bình thường khi muốn sử dụng chúng ta phải làm thế này:
```
import BaseButton from './base-button';
import BaseIcon from './base-icon';
import BaseInput from './base-input';

export default {
    components: {
        BaseButton,
        BaseIcon,
        BaseInput
    }
};
```
Việc lặp đi lặp lại công việc này sẽ rất gây mất thời gian và nhàm chán, cho nên bạn có thể sử dụng kỹ thuật sau để Vue tự động import component cần dùng đến. Ở trong file main.js khai báo như sau:
```
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
Với đoạn code trên chúng ta có thể sử dụng ngay 3 component là BaseButton, BaseIcon, BaseInput trong ví dụ mà ko cần import trong các component.

# Cleaner Views
```
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
Chắc hẳn đây cũng là đoạn code quen thuộc với rất nhiều bạn. Mục đích của đoạn code trên là để lấy post mới và reset lại data về trạng thái ban đầu mỗi khi id trên route thay đổi. Vd bạn khai báo 1 route là: http://example.com/post/:id có component là post.vue. Vì id là 1 url query params và việc thay đổi url query params ko làm thay đổi hay load lại component trong vue, nên component post sẽ được giữ nguyên và cả trạng thái của nó cũng vậy. Để có thể thay đổi trạng thái của nó về ban đầu bạn phải theo dõi biến $route thay đổi và gọi hàm resetData mỗi lần route hay id thay đổi. Chúng ta có thể rút gọn đoạn code trên lại như sau:
```
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
Gọn hơn rất nhiều đúng ko nào