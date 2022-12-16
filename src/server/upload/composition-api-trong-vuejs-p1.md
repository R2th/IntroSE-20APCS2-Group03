## 1. Mở đầu
<hr>

Trong hai bài viết gần đây, chúng ta đã cùng nhau tìm hiểu về `mixin` trong VueJS cũng như những hạn chế của tính năng này. Ở bài viết này, chúng ta sẽ cùng nhau tìm hiểu một tính năng mới trong VueJS phiên bản 3 và cách mà nó có thể khắc phục những hạn chế trước đó của `mixin`. Nào chúng ta cùng bắt đầu.

## 2. Mixin và hạn chế của nó
<hr>

Trước khi bước vào tìm hiểu về `Composition API` ta hãy cùng nhắc lại một số hạn chế ở phiên bản VueJS 2. Như bạn đã với việc sử dụng mixin sẽ mang lại cho chúng ta một số lợi ích như sau:
- Gom nhóm logic vào trong cùng một mixin: Như bạn đã biết với mỗi tính năng trong code của bạn có thể cần sử dụng đến hiều thành phần khác nhau như data, computed property, function, watch, ... và nó được trải khắp component của ta như sau:

![](https://images.viblo.asia/9455a569-7e6d-4317-b7e1-7b7ae76f3c92.png)

Khi bạn đọc code bạn sẽ thấy tuy cùng một tính năng nhưng code của nó lại bị rải rác theo từng khối khác nhau rất khó để theo dõi. Đây cũng chính là một phần lý do mà mixin bước vào cuộc chơi vi nó cho phép bạn gom nhóm logic lại chung lại thành từng mixin và chỉ cần sử dụng nó lại trong component của bạn như sau:

![](https://images.viblo.asia/cd6c5a46-26b6-4c32-a645-9f0f57903767.png)

- Thêm nữa bằng việc gom hết logic vào chung một mixin như nói trên cũng giúp bạn nhiều hơn trong việc tái sử dụng code vì bất cứ khi nào bạn cật một phần logic nào đó có thể sử dụng chung như các thao tác ẩn hiện của modal như sau:

```modal-mixin.js
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

Thì ta cũng chỉ cần đơn giản đem cái mixin đó vào và sử dụng lại luôn chứ không cần viết lại code nữa.

Tất nhiên đi kèm với những lợi ích mà mình vừa nói trên sẽ là cả những nhược điểm như:
- Trùng lặp giá trị giữa các mixin
- Không nắm được giá trị xuất hiện từ đâu khi dùng nhiều mixin
- Khó khẳn trong việc tái sử dụng component

Chi tiết về từng hạn chế này mình đã đề cập đến ở bài viết trước, nếu bạn chưa đọc có thể xem lại tại [đây](https://viblo.asia/p/tim-hieu-ve-mixin-trong-vuejs-p2-924lJGzm5PM#_3-han-che-2) .

## 3. Composition API
<hr>

### a. Giới thiệu

Về cơ bản bạn có thể hiểu việc sử dụng `Composition API` cũng khá giống với việc sử dụng mixin, logic cho feature của bạn cũng sẽ được gom nhóm thành một file riêng và sau đó khi cần sử dụng bạn cũng phải import nó vào component và sử dụng. Tuy nhiên nó lại giải quyết được cả ba vấn đề mà mình vừa đề cập ở trên. Đầu tiên chúng ta hãy đến với cú pháp cơ bản để sử dụng `Composition API` với ví dụ về việc đóng mở modal như sau:
```html
<template>
    <div>
        <Modal :visible="modalVisible">
            <p>Content of modal</p>
            <button @click="closeModal">Close</button>
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
Để sử dụng Composition API để sử dụng nó trong component của bạn thì đầu tiên bạn sẽ phải tạo ra một function có tên là `setup()`:
```js
<script>
    export default {
        setup() {

        }
    }
<script>
```
Function `setup()` đặc biệt này sẽ được chạy trước khi các phần như `props`, `data`, `methods`, `computed properties`, `lifecycle methods` và ở trong đây chúng ta cũng sẽ không truy cập vào được từ khóa `this`.  Quya trở lại với function setup() của chúng ta, nếu như ở ví dụ ban đầu ta sử dụng hàm data() để tạo ra state `modalVisible` thì với Composition API ta sẽ làm như sau:
```js
<script>
    import { ref } from "vue"

    export default {
        setup() {
            const modalVisible = ref(false);

            return { modalVisible }
        }
    }
<script>
```
Hàm `ref()` ở trên sẽ giúp chúng ta tạo ra một  `reactive references` chứa giá trị khởi tạo là kiểu dữ liệu  primivite trong JS của bạn - bạn có thể hiểu đây tạo ra một object có khả năng thay đổi/ cập nhật lại giao diện của bảo nếu giá trị bên trong nó bị  thay đổi. Hoặc bạn có thể hiểu tương tự nó cũng khá giống với việc tạo ra nó bằng `data()`. Cuối cùng để phần giao diện trong `<template></template>` của chúng ta có thể truy cập giá trị `modalVisible` ta vừa tạo ở trên thì ta sẽ cần return nó như trong ví dụ trên. Tiếp theo ta cũng cần thêm hai hàm lần lượt là `openModal` và `closeModal` sau đó tất nhiên để dùng được trong phần template thì ta cũng cần return giống `modalVisible` như sau:
```js
<script>
    import { ref } from "vue"

    export default {
        setup() {
            const modalVisible = ref(false);
            const openModal = () => {

            }

            const closeModal = () => {

            }

            return { modalVisible, openModal, closeModal }
        }
    }
<script>
```
Nội dung bên trong hai hàm chúng ta mới tạo có thể bạn nghĩ sẽ lần lượt như này:
```js
const modalVisible = ref(false);

const openModal = () => {
    modalVisible = true;
}

const closeModal = () => {
    modalVisible = false;
}
```
Tuy nhiên điều này là không đúng vì như mình nói ban đầu, hàm `ref()` sẽ tạo ra một một **object** chưa giá trị khởi tạo là giá trị mà bạn cung cấp nên bạn không thể thay đổi các cái object đó như cách viết nói trên được mà thực tế bạn sẽ phải viết là:
```js
const openModal = () => {
    modalVisible.value = true;
}

const closeModal = () => {
    modalVisible.value = false;
}
```
Giá trị mà bạn truyền vào ban đầu có thể được truy cập và thay đổi thông qua việc sử dụng `.value`  như nói trên. Nhưng bên trong nội dung của phần `<template>` thì chúng ta chỉ cần viết như sau mà không cần đến sử dụng `.value`:
```html
<template>
    <div>
        <Modal :visible="modalVisible">
            <p>Content of modal</p>
            <button @click="closeModal">Close</button>
        </Modal>

        <button @click="openModal">Open modal</button>
    </div>
</template>
```
Ta có thể làm được điều nói trên vì mặc định bên trong phần `<template>` nếu phát hiện giá trị của bạn sử dụng là một `reactive reference` thì nó sẽ tự động sử dụng giá trị `.value` luôn mà không bắt bạn phải viết kiểu:
```html
<template>
    <div>
        <Modal :visible="modalVisible.value">
    </div>
</template>
```
Điều này khiến code của chúng ta ngắn gọn và đơn giản hơn rất nhiều so với việc vẫn phải viết `modalVisible.value`. Tiếp theo chúng ta sẽ thử đem phần logic này tách thành một file riêng biệt để có thể tái sử dụng ở nhiều nơi. Để làm điều đó thì đầu tiên chúng ta cần tạo một file `js` riêng. Mặc dù document của VueJS không có rule gì cho việc đặt tên file hay tên của hàm sẽ chứa phần logic này của bạn tuy nhiên theo mình đọc và xem các tutorial, bài viết trên mạng thì hầu hết mọi người sẽ dùng đặt theo tên dạng `use[FeatureName]`. Nếu bạn biết ReactJS thì sẽ thấy nó giống hệt naming convetion của hook bên ReactJS tuy nhiên cách đặt tên với VueJS thì bạn có thể tùy chọn còn với ReactJS thì không. Vì thế ở đây mình sẽ tạo ra một file mới như sau:
```useChangeVisible.js
import { ref } from "vue";

export default function useChangeVisible() {
    const modalVisible = ref(false);
    
    const openModal = () => {
        modalVisible.value = true;
    }

    const closeModal = () => {
        modalVisible.value = false;
    }
    
    return { modalVisible, openModal, closeModal }
}
```
Lưu ý ở đây bạn không cần bọc trong hàm `setup()` mà ta sẽ khai báo hàm đó bên component. Tiếp đến trong component chúng ta sử dụng như sau:
```js
<template>
    <div>
        <Modal :visible="modalVisible">
            <p>Content of modal</p>
            <button @click="closeModal">Close</button>
        </Modal>

        <button @click="openModal">Open modal</button>
    </div>
</template>

<script>
    import useChangeVisible from "useChangeVisible";

    export default {
        setup() {
            const { modalVisible, openModal, closeModal } = useChangeVisible();

            return { modalVisible, openModal, closeModal }
        }
    }
<script>
```
Khi sử dụng bạn chỉ cần gọi hàm `useChangeVisible()` và dùng array destruture để lấy ra các giá trị mà bạn return trong hàm đó ra và sử dụng trong component của mình, thật đơn giản phải không nào.

### b.  So sánh với Mixin

Như bạn đã thấy nhưng gì mà mixin làm được như việc cho phép bạn phân tách logic thành một file riêng và dễ dàng hơn trong việc tái sử dụng logic thì ở đây Composition API đều làm được hết, vậy đối với các khuyết điểm của Mixin thì sao?
- Trùng lặp giá trị giữa các mixin: vì Composition API của chúng ta ở đây được viết hoàn toàn động lập và riêng rẽ với nhau nên bên trong mỗi API bạn có thể thoải mái đặt tên hàm, tên biến mà không lo đến việc bị ghi đè gì cả. Trường hợp các hàm hay giá trị mà bạn return bạn trả về giữa các API bị trùng nhau thì đợt giản bạn chỉ cần re-name nó lại một chút ở trong component như sau:
```js
<script>
    import { useChangeVisible } from "useChangeVisible";

    export default {
        setup() {
            const {
                modalVisible: isVisible,
                openModal: onOpenModal,
                closeModal: onCloseModal 
            } = useChangeVisible();

            return { isVisible, onOpenModal, onCloseModal }
        }
    }
<script>
```

- Không nắm được giá trị xuất hiện từ đâu khi dùng nhiều mixin: bằng việc sử dụng Composition API thì các hàm, các giá trị mà bạn sử dụng đến từ API nào bạn có thẻ dễ dàng nhìn thấy trong hàm `setup()`. Trái ngược với mixin thì bạn khó mà có thể biết giá trị, hàm mà bạn đang dùng đến từ đầu ngoài việc phải thêm một cái `namespace` cho nó, code trở nên rất dài, với Composition API ta chỉ cần:
```js
const { modalVisible: isVisible, openModal: onOpenModal, closeModal: onCloseModal } = useChangeVisible();
```

- Khó tái sử dụng trong một số trường hợp cần tham số truyền vào từ component: với mixin nếu nó muốn sử dụng một tham số nào đó từ component của bạn  thì bên trong file mixin ta cứ thế gọi ra dùng thôi, điều này dẫn đến khi đem sang dùng cho một component khác mà thiếu tham số đó thì sẽ bị lỗi và ta lại phải đi dò lại xem thiếu giá trị nào. Tuy nhiên Composition API sẽ cho phép bạn truyền tham số mà bạn mong muốn vào trong như sau:
```useChangeVisible.js
import { ref } from "vue";

export default function useChangeVisible(initValue = false) {
    const modalVisible = ref(initValue);
    
    const openModal = () => {
        modalVisible.value = true;
    }

    const closeModal = () => {
        modalVisible.value = false;
    }
    
    return { modalVisible, openModal, closeModal }
}
```

Khi dùng bên component bạn có thể truyền tham số vào:
```js
<script>
    import { useChangeVisible } from "useChangeVisible";

    export default {
        setup() {
            const { modalVisible, openModal, closeModal } = useChangeVisible(true);

            return { isVisible, onOpenModal, onCloseModal }
        }
    }
<script>
```

Bằng việc có thể chỉ ra hàm của bạn có thể truyền hay cần truyền tham số nào vào sẽ hỗ trợ tốt hơn trong việc tái sử dụng logic. Do với cách việc tự sử dụng được giá trị của các mixin khác hay của chính component khi bạn sử dụng mixin.

## 4. Kết bài
<hr>

Phần đầu tiên của bài viết của mình đến đây là kết thúc, hẹn gặp các bạn ở bài viết tiếp theo với những nội dung chi tiết hơn về cách dùng Composition API. Nếu các bạn có câu hỏi gì có thể comment ngay ở bên dưới bài viết và đồng thời đừng quên để lại một upvote và share để ủng hộ mình nhé.