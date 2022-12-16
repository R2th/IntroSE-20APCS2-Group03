# Tổng quan
Vuejs là một trong những Javascript Framework hot nhất hiện nay. Có lẽ vì sự đơn giản, linh hoạt, .... vân vân những ưu điểm mà nó mang lại. Hiện tại phiên bản Vue 3 đã stable. Mình đã mò vào docs trên trang chủ để xem những sự thay đổi. Bùm :bomb: :point_right: **Composition API**

# Nội dung
## 1. Giới thiệu
Theo phần giới thiệu trên trang chủ của Vue3, **Composition API** được đề cập bắt đầu từ nhược điểm khó tái sử dụng, maintain code khi ứng dụng ngày càng trở nên lớn. 

Mình xin được lấy ví dụ từ trang chủ giới thiệu **Composition API** của Vue3
```js
export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      repositories: [], // 1
      filters: { ... }, // 3
      searchQuery: '' // 2
    }
  },
  computed: {
    filteredRepositories () { ... }, // 3
    repositoriesMatchingSearchQuery () { ... }, // 2
  },
  watch: {
    user: 'getUserRepositories' // 1
  },
  methods: {
    getUserRepositories () {
      // using `this.user` to fetch user repositories
    }, // 1
    updateFilters () { ... }, // 3
  },
  mounted () {
    this.getUserRepositories() // 1
  }
}
```

Khi dự án lớn dần lên, khi muốn thêm một chức năng chúng ta sẽ thấy khó để có thể chọn một chỗ phù hợp viết code. (data, methods, mounted,...) Quá nhiều vấn đề cần quan tâm.

Để giải quyết khó khăn này, Composition API đã được sinh ra.
Để bắt đầu làm việc với Composition API, chúng ta cần khai báo một option component mới là **setup**. 

``` js
export default {
  setup() {
      // Composition API work.
  }
}
```

Và bắt đầu từ đây, bạn có thể tạm quên đi các option component khác hay dùng như **data**, **methods**, **computed**, **watch**, các **lifecycle** của Vue. Mọi thứ đều có thể xử lý được trong **Composition API**. <br/>
À mà khoan, các bạn đừng vội quên vội, mình cần các bạn nhớ để so sánh nó cách code trước và sau khi Composition API ra đời.

## 2. Ref, reactive
**ref**, **reactive** là các hook được sử dụng trong Composition API để định nghĩa các data, giống như việc chúng ta định nghĩa các data ở trong option **data** <br/>
Ok giờ hãy cùng so sánh hai cách code
![image.png](https://images.viblo.asia/d2030718-c3c9-41e0-8271-f7cdb61e6988.png)
Trong Composition API, chúng ta dùng hook ref hoặc reactive để định nghĩa một biến reactive.
``` js
import { ref } from "vue";

const hello = ref("Hello World");
```

Khi cần sử dụng hoặc thay đổi giá trị biến này trong Composition API:
``` js
import { ref } from "vue";

const hello = ref("Hello World");

console.log(hello.value); // kết quả sẽ là: Hello World
```

Quá đơn giản phải không nào. Ta chỉ cần `hello.value` là lấy được giá trị của biến đó rồi. <br/>
Đối với reactive:
``` js
import { reactive } from "vue";

const hello = reactive({
    name: "Nguyễn Văn A",
    age: 
});

console.log(hello);
```
Đối với reactive, sẽ không cần `.value`

khi cần dùng biến đó trên template vue, ta chỉ cần câu lệnh return về một object có biến đó.<br/>
VD:
``` js
import { ref } from "vue";

const hello = ref("Hello World");

return { hello };
```

## 3. Methods
Trong Vue2, khi cần khai báo một hàm hoặc một phương thức, chúng ta sẽ định nghĩa nó trong option component **methods** thì trong Composition API bạn có thể định nghĩa nó như một hàm thông thường và return nó như **ref** và **reactive** mình đã nói ở phần 2
``` js

const sayHello = () => {
    console.log("Hello World");
}

return { sayHello };
```

## 4. Computed
Trong Composition API, computed được định nghĩa thông qua hook computed.
``` js
import { ref, computed } from "vue";

const count = ref(0);

const countComputed = computed(() => count.value + 1); // định nghĩa một computed phụ thuộc vào data count.
```

## 5. Watch
Trong Composition API, quan sát một biến được thực hiện thông qua hook **watch**. Đặc biệt Vue3 hỗ trợ watch nhiều biến
``` js
import { ref, watch } from "vue";

const count = ref(0);

// quan sát sự thay đổi của một biến
watch(count, () => {
    console.log("Data count vừa thay đổi");
});

const var1 = ref("Biến 1");
const var2 = ref("Biến 2");

// quan sát 2 biến
watch([var1, var2], () => {
    console.log("Vừa có sự thay đổi biến var1 hoặc var2");
});
```

## 6 Lifecycle
Trong Composition API, hầu hết các lifecycle đều tồn tại
``` js
import { onMounted} from "vue";

onMounted(() => {
    console.log("component đã được mount");
});
```

Cụ thể về các lifecycle có thể sử dụng được trong Composition API, tham khảo: https://v3.vuejs.org/guide/composition-api-lifecycle-hooks.html#lifecycle-hooks

# Tổng kết
Bài này mình đã giới thiệu tổng thể về Composition API trong Vue3. Có thể bạn đang quen với cách code trong Vue2, nhưng tin mình đi nếu bạn thử tiếp xúc với Composition API bạn sẽ thấy nó thật tuyệt. :heart_eyes: