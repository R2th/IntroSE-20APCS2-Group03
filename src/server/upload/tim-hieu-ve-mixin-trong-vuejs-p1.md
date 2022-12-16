## 1. Mở đầu
<hr>

Trong các bài viết trước, chúng ta đã cùng nhau tìm hiểu về Props và Slot là gì cũng như cách sử dụng nó trong project VueJS. Để nối tiếp cho series tìm hiểu về VueJS thì hôm nay mình sẽ giới thiệu với các bạn về khai niệm Mixin.

## 2. Mixin
<hr>

### a. Giới thiệu

Như các bạn đã biết, ứng dụng VueJS của chúng ta được cấu tạo từ rất nhiều các component khác nhau và việc chia thành các component như vậy giúp chúng ta trong việc có thể tái sử dụng các phần UI giống nhau trong ứng dụng của mình. Bằng việc sử dụng [Slots](https://viblo.asia/p/tim-hieu-ve-slot-trong-vuejs-yMnKM8gQ57P) ta còn có thể tải sử dụng lại một phần logic bên trong component con và mang ra dùng bên component cha với tính năng [slot-scope](https://viblo.asia/p/tim-hieu-ve-slot-trong-vuejs-yMnKM8gQ57P#_c-scoped-slots-4). Tuy nhiên kể cả với slot-scope thì logic bên trong component chúng ta cũng chỉ có thể tái sử dụng được một phần và đồng thời nó cũng giới hạn trong phần template của scope đó mà thôi. Nếu nói các component giúp chúng ta có thể tái sử dụng UI thì với Mixin nó chính là thứ giúp ta có thể tái sử dụng lại bất cứ phần logic nào mà chúng ta mong muốn cho component của mình.

### b. Sử dụng mixin

Giả sử, chúng ta có một component `<Modal />` gốc như sau:

![](https://images.viblo.asia/c00079ce-3f47-4e69-b3fe-6ffd81a05fb8.PNG)

Sau đó bằng việc sử dụng slots thì ta có thể tạo ra rất nhiều các biến thể khác nhau của modal đó như này:

![](https://images.viblo.asia/7f8ce8d9-e1b5-4d82-aa41-6a4d374d9236.PNG)

Tuy nhiên dù giao diện của nó có thay đổi như nào đi nữa hay được dùng ở những chỗ nào khác thì thao tác đơn gian nhất mà chúng ta luôn luôn cần có ở mọi nơi đó là đóng mở modal và tất nhiên việc kiểm soát trạng thái đóng mở hay các methods phục vụ cho việc đóng mở của chúng ta cũng sẽ cần nằm ở component cha để có thể sử dụng được chứ không nên đặt trong component con. Từ đó ta sẽ có đoạn code như sau:

```html
<template>
    <div>
        <Modal :visible="modalVisible">
            <template v-slot:header>
                <p>Info</p>
            </template>
            <template>
                <i class="success-icon" />
                <p>Purchase success!</p>
            </template>
            <template>
                <button @click="closeModal">Close</button>
            </template>
        </Modal>

        <button @click="openModal">Open modal</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modalVisible: false,
            }
        },
        methods: {
            openModal() {
                this.modalVisible = true;
            },
            closeModal() {
                this.modalVisible = false;
            },
        }
    }
</script>
```

Giải thích qua một chút là ở đây việc modal của chúng ta ẩn hay hiện sẽ phụ thuộc vào `props visible` mà chúng ta khai báo cho nó và props đó nhận giá trị từ `modalVisible` của chúng ta. Tiếp đó ta có 2 methods đó là `openModal()` và `closeModal()` để lần lượt thực hiện hai thao tác mở và đóng modal. Trong trường hợp chúng ta sử dụng modal ở nhiều chỗ khác nhau thì việc ta copy  đi copy lại phần logic liên quan đến việc mở hoặc đóng modal có vẻ không được hay cho lắm. Thay vào đó ta có thể tạo một file mới và copy toàn bộ phần logic nói trên ra như sau:

```modal-visible.js
export default {
    data() {
        return {
            modalVisible: false,
        }
   },
   methods: {
       openModal() {
           this.modalVisible = true;
       },
       closeModal() {
           this.modalVisible = false;
       },
   }
}
```

Sau đó trong component ban đầu ta chỉ cần làm tiếp như sau:

```html
<template>
    <div>
        <Modal :visible="modalVisible">
            <template v-slot:header>
                <p>Info</p>
            </template>
            <template>
                <i class="success-icon" />
                <p>Purchase success!</p>
            </template>
            <template>
                <button @click="closeModal">Close</button>
            </template>
        </Modal>

        <button @click="openModal">Open modal</button>
    </div>
</template>

<script>
    import modalVisibleMixin from './modal-visible.js';
    export default {
       mixins: [modalVisibleMixin]
    }
</script>
```

Như bạn có thể thấy, toàn bộ phần logic mà ta viết trước đó đã được chuyển qua một file js bên ngoài khác cụ thể là file `modal-visible.js` và sau đó ta import nó trở lại component ban đầu của chúng ta và sử dụng nó bằng cách khai báo là:

```js
export default {
   mixins: [modalVisibleMixin]
}
```

Bạn có thể hiểu đơn giản ở đây ta mang phần logic cần tái sử dụng viết vào một file riêng, bên trong nó thực chất vẫn là code js thông thường thôi không có gì khác cả và sau này bất cứ chỗ nào chúng ta cần sử dụng thì ta có thể đem nó import vào và sử dụng bằng cách khai báo như nói trên. Đồng thời bạn có thể thấy ở đây mình đang khai báo mixins là một mảng đồng nghĩa với việc ta có thể sử dụng nhiều hơn một mixin cho component của chúng ta. Đây chính là cách mà chúng ta dùng để có thể sử dụng  tính năng mixin trong VueJS.

### c. Có thể viết những gì trong file mixin?

File chứa logic chúng ta vừa tạo ở trên `modal-visible.js` mình sẽ tạm gọi là file mixin, mặc dù nó là một file js thông thường thôi tuy nhiên khi bạn sử dụng nó đi kèm với từ khóa `mixin: []` trong một component làm nó trở thành file js đặc biệt ở chỗ bên trong đây bạn có thể thoải mái viết các logic như bạn đang viết trong file `.vue` của component thông thường và tất cả các tính năng đó sẽ hoạt động bình thường như việc bạn gán method, data vào các element. Về cơ bản thì bạn hoàn toàn có thể làm những điều như sau trong file mixin:

- Sử dụng đầy đủ các lifecycle của component thông thường:

```mixin.js
export default {
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    activated() {},
    deactivated() {},
    beforeUnmount() {},
    unmounted() {},
    errorCaptured() {},
    renderTracked() {},
    renderTriggered() {},
}
```

- Khai báo đầy đủ các thông tin như compoentns, props, data, computed, filter, watcher, methods:

```mixin.js
import ComponentA from './ComponentA.vue';
import ComponentB from './ComponentB.vue';

export default {
    components: {
        ComponentA,
        ComponentB,
    },
    props: {},
    data() {
        return {}
    },
    computed: {},
    filters: {},
    watch: {},
    methods: {},
}
```

Nói chung bất cứ thứ gì bạn có thể viết trong phần script của component thì bạn có thể viết luôn tại đây trừ việc bạn khai báo tên component như:

```mixin.js
export default {
    name: 'My component'
}
```

Thì việc này bạn bắt buộc phải khai bảo trong file component thực tế. Thêm nữa ở trong file mixin này bạn còn có thể sử dụng các mixin khác luôn:

```mixin.js
import mixin1 from './mixin1.js';
import mixin2 from './mixin2.js';

export default {
    mixins: [mixin1, mixin2],
}
```

### d. Dùng khi nào và như nào?

Ngay từ đâu bài viết chúng ta đều biết rằng việc dùng mixins là để tái sử dụng lại logic mà chúng ta mong muốn. Từ ví dụ đơn giản như việc ẩn hiện một modal như  ban đầu mình có nhắc đến hay đến sau này bạn có các mixin chuyên phụ trách việc validate các field trong form, xử lý lỗi từ server, thực hiện việc gửi form đi hay thậm chí các các mixin hỗ trợ cả việc xử lý UI nữa. Tuy nhiên trong dự án thực tế thì ngoài việc sử dụng mixin để tái sử dụng lại các logic đã có thì mình còn sử dụng mixin để tách phần logic có trong component ra thành các `logic-module` nhỏ hoặc để phân tách phần logic và phần UI.

**Tách thành các logic-module: Giả sử bạn có một màn hình dạng như sau**:

![](https://images.viblo.asia/8c1aba31-74ed-4385-982e-eec9b0c5a28d.png)

Bên trong đó gồm 3 nhóm tính năng chính là:
- Hiển thị danh sách các item, bao gồm các tính năng như phân trang, tìm kiếm, lọc
- Thêm mới item: việc này sẽ thực hiện qua việc hiển thị lên một modal để điền các field và gửi thông tin lên server
- Hiển thị real-time danh sách những người khác cũng đang xem danh sách này

Ở đây mình đã tô rõ 3 màu ra cho các bạn hình dung và với các case như nói trên thì thay vì việc ta viết hết các logic vào trong phần script của component luôn hoặc viết chung vào một file mixin sẽ làm file chúng ta vừa dài, vừa rối khi các logic của các phần khác nhau đều năm chung ở một chỗ. Thay vì thế, ta có thể viết tách nó ra thành 3 cái mixin là:
- `display-data.js`: chứa logic phục vụ nhóm tính năng màu xanh da trời
- `add-item.js`: chứa logic phục vụ nhóm tính năng màu xanh lá cây
- `viewer.js`: chứa logic phục vụ nhóm tính năng màu cam

Bằng cách viết tách ra như nói trên, logic của chúng ta ở đây sẽ trở nên gọn gàng hơn khi nó sẽ nằm ở 3 file thay vì một file, thêm nữa sau này khi chúng ta cần sửa chữa nhóm tính năng nào thì chúng ta chỉ cần tập chung vào file chứa logic của nhóm tính năng đó thay vì phải đọc một đống code lẫn lộn vào với nhau.

**Phân tách UI và logic**:

Trong trường hợp component của bạn chỉ có duy nhất một nhóm tính năng thì bạn cũng hoàn toàn có thể mang đống logic đó viết riêng thành một file mixin và lúc này trong folder chứa component của bạn sẽ gồm 2 file là:
```
---- MyComponent/
-------- index.vue
-------- mixin.js
```

File `index.vue` lúc này sẽ hầu như chỉ chứa phần UI của bạn còn ngược lại file `mixin.js` sẽ chỉ chứa phần code logic của bạn mà thôi.

## 3. Kết bài
<hr>

Part 1 củ bài viết tìm hiểu về mixin trong VueJS của mình đến đây là kết thúc, với các kiến thức mà mình đã nói ở trên, bạn có thể tự thử và trải nghiệm qua về việc sử dụng mixin. Trong bài viết tiếp theo, mình sẽ đề cập đến một số kiến thức khác liên quan đến việc sử dụng nhiều mixin cũng như những lưu ý và hạn chế của mixin mà bạn nên biết. Hẹn gặp lại cá bạn ở bài viết tiếp theo. Và như thường lệ, các bạn đừng quên để lại 1 upvote để ủng hộ mình nhé.