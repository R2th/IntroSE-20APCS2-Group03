## 1. Mở đầu
<hr>

Ở bài viết trước, mình đã giới thiệu cho các bạn về cách sử dụng `Composition API` trong VueJS 3x cũng như nhưng ưu điểm của nó so với `mixin` trước kia. Nếu bạn chưa đọc thì có thể xem lại tại [đây](https://viblo.asia/p/composition-api-trong-vuejs-p1-3Q75wE8eZWb). Còn ở phần này ta sẽ cùng nhau tìm hiểu chi tiết hơn về các tính năng mà `Composition API` cung cấp cho chúng ta. Nào chúng ta cùng bắt đầu.

## 2. Composition API
<hr>

### a. Lifecycle

Đối với các bạn đã làm việc với VueJS thì chắc hẳn chúng ta không còn lạ lẫm gì nữa đối với các Lifecycle hook mà VueJS cung cấp:

![](https://v3.vuejs.org/images/lifecycle.svg)

Trước kia khi dùng mixin ta hoàn toàn có  thể sử dụng các lifecycle hook này trong đó luôn, còn với `Composition API`, mọi thứ có một chút thay đối là các lifecycle hook dùng trong đó sẽ thường bắn đầu bằng từ khóa **on**, cụ thể:

| Normal lifcycle hook | Lifecycle hook in Composition API 2 |
| -------- | -------- |
| beforeCreate | ---  |
| created | ---  |
| beforeMount | onBeforeMount  |
| mounted | onMounted  |
| beforeUpdate | onBeforeUpdate  |
| updated | onUpdated  |
| beforeUnmount | onBeforeUnmount  |
| unmounted | onUnmounted  |

Đầu tiên bạn có thể thấy ngay so với các lifcycle hook gốc thì bền `Composition API` đang không hỗ trợ hai hàm là `beforeCreate()` và `created()` vì hàm `setup()` của `Composition API` thực chất sẽ được gọi ngay sau `beforeCreate()` còn `created()` được gọi ngay sau `setup()`:

![](https://images.viblo.asia/17f2b81d-80eb-4c80-8780-470fea2fbd47.PNG)

Khi ta sử dụng các lifecycle hook trong một hàm `setup()` thì ta sẽ cần import nó và sử dụng như sau:
```js
import { onBeforeMount, onMounted } from "vue";

export default {
    setup() {
        onBeforeMount(() => {
            console.log('Before mounte');
        });
        onMounted(() => {
            console.log('Mounted');
        });
    }
}
```

Ngoài các lifecycle hook chính mà mình kể đến ở trên ra thì `Composition API` cũng hỗ trợ các hook còn lại là:

| Normal lifcycle hook | Lifecycle hook in Composition API 2 |
| -------- | -------- |
| activated | onActivated  |
| deactivated | onDeactivated  |
| errorCaptured | onErrorCaptured  |
| renderTracked | onRenderTracked  |
| renderTriggered | onRenderTriggerd  |



### b. Computed property

Chắc hẳn các bạn còn nhớ đến tính năng `computed property` mà VueJS cung cấp cho chúng ta, về cơ bản thì nó sẽ là một giá trị được tạo ra dựa trên một số dữ liệu khác trong component của chúng ta, ví dụ:
```html
<template>
    <div id="app">
        <p>Sum of numbers: {{ total }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                numbers: [5, 8, 3]
            }
        },
        computed: {
            total() {
                return this.numbers.reduce((sum, val) => sum + val);
            }
        }
    }
</script>
```

Mỗi khi giá trị `numbrs` trong phần data của component của chúng ta thay đổi thì giá trị của `numberTotal` sẽ được tính toán lại và cụ thể ở đây nó sẽ là tổng của các số có trong `numbers`. Ví dụ trên là cú pháp cơ bản cho việc dùng computed property trong VueJS, còn đối với Composition API thì ta sẽ có cú pháp như sau:
```html
<template>
    <div id="app">
        <p>Sum of numbers: {{ numberTotal }}</p>
    </div>
</template>

<script>
    import { ref, computed } from 'vue';

    export default {
        const numbers = ref([5, 8, 3]);
        
        const total = computed(() => {
            return numbers.value.reduce((sum, val) => sum + val);
        })

        return { total }
    }
</script>
```
Đầu tiên bạn sẽ cần import hàm `computed` từ vue, tiếp sau đó để tạo ra một computed property như trước kia thì ta sẽ sử dụng hàm `computed()` với cú pháp như bạn thấy ở trên. Như bạn thấy đây cũng chỉ là một function và trả về một giá trị cho biến `total` của chúng ta đem đi sử dụng. Tất nhiên nếu nội dung của `numbers` thay đổi thì `total` sẽ lập tức được thay đổi ngay sau đó tương tự như computed property mà bạn đã biết trước đây.

*Lưu ý: Ở đây bên trong hàm computed() để truy cập đến dữ liệu trong `numbers` thì ta vẫn phải dùng `numbers.value` như ở bài trước mìn hđã nhắc đến.*

### c. watch và watchEffect

Ngay từ các phiên bản từ trước đó, VueJS cung cấp cho chúng ta một tính năng rất hữu ích đó là `watchers`. Tính năng này cho phép bạn tạo ra một chức năng theo dõi sự thay đổi props hoặc state và thực hiện các tác vụ cần thiết với các thay đổi đó. Đơn giản nhất đó là trường hợp bạn làm tính năng filter, khi nội dung query string trên url của bạn thay đổi thì tất nhiên bạn sẽ cần gọi API để phản hội là thao tác đó của người dùng:

```js
export default {
    watch: {
        '$route.query': function(value) {
            // Call API
        }
    }
}
```

Còn đối với Composition API thì sẽ cung cấp cho bạn hai hàm mới đó là `watch` và `watchEffect`. Ta xét ví dụ sau:
```html
<template>
    <div>
        Search: <input v-model="keyword" />
        Result: <p>{{ result }}</p>
    </div>
</template>

<script>
    import { ref } from "vue";
    import { returnSomeValue } from "@/api/function";
    
    export default {
        setup() {
            const keyword = ref("")
            const result = ref("')

            return { keyword, result }
        }
    }
</script>
```
Bất cứ khi nào nội dung ô input bị thay đổi, ta mong muốn sẽ tự động gọi hàm `returnSomeValue()` với input là giá trị của thẻ input lúc đấy và sẽ trả về dữ liệu là một string nào đó cho biến `result` của chúng ta. Để làm được điều này, ta có thể dùng hàm `watchEffect` như sau:
```js
<script>
    import { ref, watchEffect } from "vue";
    import { returnSomeValue } from "@/api/function";
    
    export default {
        setup() {
            const keyword = ref("")
            const result = ref("')

            watchEffect(() => {
                result.value = returnSomeValue(keyword.value);
            });

            return { keyword, result }
        }
    }
</script>
```

Hàm `watchEffect` nói trên sẽ được tự động chạy nếu có bất cứ `ref` object nào được sử dụng bên trong nó thay đổi, ở đây nếu `keyword` bị thay đổi khi chúng ta nhập nội dung và ô input thì nó sẽ đồng thời gọi lại nội dung bên trong `watchEffect` mà chúng ta đã định nghĩa. Tuy nhiên nếu bạn muốn định nghĩa rõ ràng theo biến cụ thể nào đó thay đổi thì mới chạy lại hàm thì bạn có thể dùng `watch`:

```js
<script>
    import { watch } from "vue";
    
    export default {
        setup() {
        ...
            watch(valueToWatch, () => {
                ...
            });
            ...
        }
    }
</script>
```
Với cách viết như trên thì dù bên trong nội dung `watch()` của bạn có bao nhiêu `ref` object đi nữa thì hàm đó cũng sẽ không bị chạy lại chỉ trừ khi giá trị của `valueToWatch` thay đổi. Ngoài ra bạn cũng có thể truy cập vào giá trị cũ và giá trị mới của biến `valueToWatch` với cú pháp:
```js
watch(valueToWatch, (newValue, oldeValue) => {
    ...
});
```

Thậm chí, bạn cũng có thể tracking nhiều giá trị một lúc và sử dụng giả trị cũ, mới của nhiều giá trị tracking đó luôn:
```js
watch([valueToWatch1, valueToWatch2], ([newValue1, oldeValue1], [newValue2, oldeValue2]) => {
    ...
});
```
Có một điểm nữa bạn cần biết đó là nếu bạn sử dụng `watchEffect` thì nội dung bên trong hàm của bạn sẽ được chạy ngay làn đầu tiên component của bạn được load lên, tuy nhiên mắc định thì `watch` sẽ không chạy ngay lần đầu mà nó chỉ chạy khi có thay đổi. Nếu bạn muốn hàm `watch` của bạn cũng chạy ngay lần đầu khi component được load thì bạn  có thể thêm vào option như sau:
```js
watch(valueToWatch, (newValue, oldeValue) => {
    ...
}, { immediate: true });
```

## 3. Kết bài
<hr>

Vậy là phần 2 và cũng là phần cuối của bài viết giới thiệu về `Composition API` đến đây là kết thúc, cám ơn các bạn đã ủng hộ. Và như mọi khi nếu có bất cứ thắc mắc gì thì bạn có thể comment ngay ở bên dưới và cũng đừng quên để lại một upvote và một share để ủng hộ cho bài viết của mình nhé. Hẹn gặp lại các bạn ở những bài viết sau.