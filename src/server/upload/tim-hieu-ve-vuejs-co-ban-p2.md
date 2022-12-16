## 1. Mở đầu 
<hr>

Chào mừng các bạn quay trở lại với part 2 của loạt bài viết `Tìm hiểu về VueJS cơ bản`. Nếu bạn chưa đọc part 1 thì có thể đọc lại tại [đây](https://viblo.asia/p/tim-hieu-ve-vuejs-co-ban-part-1-Do754bpWZM6). Còn nếu các bạn đã đọc trước đó rồi thì chúng ta hãy cùng nhau đến với part 2.

## 2. VueJS


### 2.11. Props

- Ứng dụng VueJS được xây dựng dựa trên các components khác nhau và hơn nữa các components còn có thể truyền **data** của nó xuống component con bằng **props**. Giả sử ta có component A và component B được import vào component A. Ở trong component A ta sẽ truyền **data** của nó xuống cho B thì sẽ như sau:
```html
// Component A
<template>
    <ComponentB :number="number"></ComponentB>
</template>

<script>
    import ComponentB from 'path-to-component=b';

    export default {
        components: {
            ComponentB
        },
        data() {
            return {
                number: 10
            }
        }
    }
</script>
```

```html
// Component B
<template>
    <div id="app">{{ number }}</div>
</template>

<script>
    export default {
        props: ['number'],
    }
</script>
```
- Khi truyền **Props** từ component cha xuống component con thì ta có thể sử dụng props đó trực tiếp như trên hoặc cũng có thể sử dụng nó trong **computed property**, **method** với từ khóa **this.number**.
- Măc định khi props chúng ta truyền  xuống có dạng:
```html
<DemoComponent some-prop="hello"></DemoComponent>
```
- Thì ở trong `DemoComponent` sẽ tự động convert từ `some-prop` về  `  someProp` và ta có thể dùng với từ khóa **this.someProp**. Lưu ý ở đây component con không thể tự thay đổi props nhận vào mà thay vào đó nó phải đợi component cha thay đổi props đó và truyền lại xuống cho nó.
- Thêm một điều nữa cần biết là khi **Props** thay đổi thì giao diện cũng sẽ được thay đổi theo.

### 2.12. Ref

Khi làm việc với `JS` thông thường mỗi khi bạn muốn thao tác với một phần tử trên trang web thì đầu tiên điều chúng ta cần làm là lấy được phần tử đó ra với đoạn code:
```js
const input = document.getElementById('js-input');
console.log(input.classList); // Lấy các class của thẻ input có id là js-input
```
Đối với `VueJS` thì chúng ta không làm như vậy mà đơn giản hơn chúng ta sẽ sử dụng `ref - reference` như sau:
```html
<template>
    <input ref="myInput" />
</template>
```
Bạn có thể hiểu đơn giản ở đây chúng ta đang gán 1 thẻ input với một biến có tên là `myInput`. Sau này khi muốn thao tác với biến này ta có thể dùng trức tiếp như sau thay cho việc dùng `document.getElementId()` để lấy thẻ input như sau:
```html
<template>
    <input ref="myInput" />
    <button @click="logRef">Get Ref</button>
</template>

<script>
export default {
    methods: {
             logRef() {
                 console.log(this.$refs.myInput);
             }
    }
}
</script>
```
Khi bấm vào nút `Get Ref` nói trên thi nó sẽ thực hiện log ra màn hình thẻ `<input />` của chúng ta. Cú pháp sẽ có dạng `this.$refs[variable-name]`. Bằng cách này ta có thể truy cập vào bất cứ phương thức hoặc thuộc tính mà thẻ input chúng ta có như `classList`, `value` hay cả các function như `focus()`. Một điểm khá hay nữa khi sử dụng `ref` mà bạn có thể làm như sau, giả sử chúng ta có một component:
```html
// Form.vue
<template>
    <div>
        <label>Email</label>
        <input type="text" name="email" v-model="email" />
         <label>Password</label>
        <input type="passowrd" name="password" v-model="password" />
         <label>Re-enter password</label>
        <input type="passowrd" name="password" v-model="rePassword" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            rePassword: '',
        }
    }
    methods: {
             validateEmail() {
                 // Logic for validate email
             },
             validatePassword() {
                // Logic for validate password
            }
    }
}
</script>
```
Component này sẽ bao gồm phần `data` cho form chứa thông tin đăng nhập của chúng ta và cả các hàm liên quan đến việc validate form đó. Tuy nhiên do yêu cầu vô lý nào đó :D mà chúng ta lại muốn lấy được data của component này cũng như gọi đến các hàm validate ở component cha của nó khi bấm nút login như sau:
```html
// LoginModal
<template>
    <form>
       <Form />
       <button>Login</button>
    </form>
</template>

<script>
export default {
    methods: {
       handleLogin() {
           // Validate form
           // Login logic
       }
    }
}
</script>
```
Thông thường trong các trường hợp như này thì bạn sẽ cần phải di chuyển hết `data` ở component `<Form />` lên component `<LoginModal />` rồi truyền nó xuống component `<Form />` đồng thời cả các function liên quan đến việc validate nữa. Tuy nhiên ở đây chúng ta có một cách **"hack"** để tránh phải làm điều này đó là sử dụng ref như sau:
```html
// LoginModal
<template>
    <form>
       <Form ref="formRef"/>
       <button>Login</button>
    </form>
</template>

<script>
export default {
    methods: {
       handleLogin() {
           this.$refs.formRef.validateEmail();
           this.$refs.formRef.validatePassword();
            const data = this.$refs.formRef.data;
           // Login logic
       }
    }
}
</script>
```
Như mình đã nói ở trên bằng cách sử dụng `ref` như trên ta có thể truy cập vào mọi function cũng như các thuộc tính khác của đối tượng mà ta gắn ref vào, ở đây chính là component `<Form />` của chúng ta.

### 2.13. Events

- Để có thể thực hiện các thao tác như click trong ứng dụng ta sẽ sử dụng thêm một `directives` khác đó là **v-on**. Cú pháp sẽ là **v-on:[event]="[hander]"**. Cụ thể:
```html
<template>
    <div id="app">
        <button v-on:click="counter++">Click to increase counter</button>
        <button v-on:click="increase">Click to increase counter</button>
        <p>You've clicked the button {{ counter }}</p> times.
    </div>
</template>

<script>
    export default {
        data() {
            return {
                counter: 0,
            }
        },
        methods: {
            increase(e) {
                this.counter++;
            }
        }
    }
</script>
```
- Trong ví dụ trên ta gán sự kiện `click` cho 2 button của chúng ta. Chúng ta có thể gán trức tiếp với `counter++` hoặc cũng có thể sử dụng thông qua method `increase()` (nên dùng) như ở dưới. Với cách sử dụng method nhử ở dưới thì method `increase()` của chúng ta sẽ mặc định nhận thêm một tham số mặc định là `event` giống như dùng `addEventListener`.
- Ngoài ra **v-on** cũng có cách viết ngắn gọn hơn giống như **v-bind** là **@[event]="[handler]"**:
```html
    <button @click="increase">Click to increase counter</button>
```
- Đọc thêm: [Event modifiers](https://vuejs.org/v2/guide/events.html#Event-Modifiers), [Key modifiers](https://vuejs.org/v2/guide/events.html#Key-Modifiers).

### 2.14. Custom event

- Như đã nói ở trên, trong trường hợp ta muốn thay đổi giá trị của **Props** nhận được từ component cha thì ở component con sẽ phải phát ra tín hiểu để component cha thay đổi **Props** đó và truyền lại xuống. Điều này có thể đạt được thông qua việc sử dụng **Custom Event**. Giả sử  ta muốn khi click vào button trong component con sẽ +1 vào `number` ta có thể làm như sau:
```html
// Component A
<template>
    <div>
        <ComponentB :number="number" @updateNumber="handleUpdateNumber"/>
    </div>
</template>

<script>
    import ComponentB from 'path-to-component-b';

    export default {
        components: {
            ComponentB
        },
        data() {
            return {
                number: 0
            }
        },
        methods: {
            handleUpdateNumber(newValue, msg) {
                this.number = newValue;
                console.log(msg);
            }
        }
    }
</script>
```

```html
// Component B
<template>
    <div>
        <p>{{ number }}</p>
        <button @click="handleIncrease">Increase</button>
    </div>
</template>

<script>
    export default {
        props: ['number'],
        methods: {
            handleIncrease() {
                const newValue = this.number + 1;
                this.$emit('updateNumber', newValue, 'updated');
            }
        }
    }
</script>
```
- Đầu tiên ta sẽ tạo một method và gán vào sự kiện `click` ở `componentB` tên là `handleIncrease()`. Method này sẽ +1 vào giá trị hiện tại sau đó phát ra một event tên là `updateNumber` với 2 tham số là `newValue` và một string là `updated`.
- Tiếp đến ở bên component cha (ComponentA) ta sẽ lắng nghe event này bằng cách gán nó vào template giống như event thông thường là `@updateNumber` đồng thời cũng truyền cho nó một method là `handleUpdateNumber()`. Hàm này sẽ nhận vào 2 tham số là giá trị mới đi kèm với một message sau đó thực hiện việc update **data** `number`.
- Sau khi chạy ứng dụng lên, mỗi khi ta click vào button increase nó sẽ phát ra 1 event là `updateNumber`, `ComponentA` sẽ lắng nghe event này và thực hiện method nó được gắn với event này là `updateNumber` để +1 vào number.
- Ngoài cách làm truyền thống nói trên, ta có thể làm cách tương tự như React là truyền hàm xuống `ComponentB` dưới dạng props:

```html
// Component A
<template>
    <div>
        <ComponentB :number="number" :handleUpdateNumber="handleUpdateNumber"/>
    </div>
</template>

<script>
    import ComponentB from './ComponentB.vue';

    export default {
        components: {
            ComponentB
        },
        data() {
            return {
                number: 0
            }
        },
        methods: {
            handleUpdateNumber(newValue, msg) {
                this.number = newValue;
                console.log(msg);
            }
        }
    }
</script>
```

```html
// Component B
<template>
    <div>
        <p>{{ number }}</p>
        <button @click="handleUpdateNumber(number + 1, 'updated')">Increase</button>
        <button @click="handleIncrease">Increase</button>
    </div>
</template>

<script>
    export default {
        props: ['number', 'handleUpdateNumber'],
        methods: {
            handleIncrease() {
                const newValue = this.number + 1;
                this.handleUpdateNumber(newValue, 'updated');
            }
        }
    }
</script>
```
- Cả 2 cách đều đem lại kết quả như nhau.

### 2.15. Slot

Slot là cách mà bạn có thể sử dụng để tạo ra các component khung với nội dung có thể thay đổi tùy theo vị trí mà bạn sử dụng nó. Giả sử chúng ta có một component dạng modal như sau:
```html
// LoginModal.vue
<div class="modal">
    <div class="modal__header">Login form</div>
    <div class="modal__content">
        <label>Email</label>
        <input type="text" name="email" v-model="email" />
         <label>Password</label>
        <input type="passowrd" name="password" v-model="password" />
    </div>
    <div class="modal__footer">
        <button>Login</button>
        <button>Cancel</button>
    </div>
</div>
```
Component này đang được chúng ta thêm style đẹp đẽ với các hiệu ứng ẩn hiện cùng hàng loạt animation khác nhau. Chính vì thết tất nhiên chúng ta sẽ muốn tái sử dụng cái khung modal này ở các chỗ khác nữa chứ không phải cho modal login. Để làm được điều này chúng ta cần để ý với mỗi chỗ mà chúng ta sử dụng đến component `<Modal />` này thì thường cái khung của nó sẽ không hề thay đổi mà chỉ thay đổi phần nội dung ở  bên trong bao gồm:
- Tên modal
- Phần thên modal
- Phân footer của modal

Chính vì vậy chúng ta sẽ tạo một component modal mới có nội dung như sau:
```html
// Modal.vue
<div class="modal">
    <div class="modal__header">{{ modalHeader }}</div>
    <div class="modal__content">
        <slot></slot>
    </div>
    <div class="modal__footer">
        <slot name="footer"></slot>
    </div>
</div>
```
Bạn để ý thấy ở đây mình dùng đến từ khóa `slot` đây là dạng phần tử đặc biệt trong `VueJS` cho phép bạn chèn phần html khác vào các phần `slot` mà bạn đặt trong component nói trên. Với component `LoginForm.vue` của chúng ta cũng sẽ sử lại như sau:
```html
// LoginForm
<Modal title="Login Form">
    <label>Email</label>
    <input type="text" name="email" v-model="email" />
    <label>Password</label>
    <input type="passowrd" name="password" v-model="password" />
    <template v-slot:footer>
         <button>Login</button>
         <button>Cancel</button>
    </template>
</Modal>
```
Ở đây phần nội dung html bao gồm 2 phần input là `email` và `password` ta sẽ viết bên trong component `<Modal />` như trên. Phần nội dung này khi render ra sẽ được chèn vào vị trí `<slot></slot>` mà chúng ta khai báo ở component `<Modal />` ngoài ra ta cũng chèn thêm một slot khác có tên là `footer` với thành phần là 2 button Login và Cancel vào slot có tên tương ứng trong component `<Modal />`. Kết quả khi ta chạy lên sẽ y hệt như đoạn code ban đầu của chúng ta. Ngoài ra bằng cách này ta có thể đem cái khung modal đi sử dụng ở gặp mọi nơi với các nội dung khác nhau như sau:
```html
<Modal title="Signup Form">
    <label>Email</label>
    <input type="text" name="email" v-model="email" />
    <label>Password</label>
    <input type="passowrd" name="password" v-model="password" />
    <label>Re-enter password</label>
    <input type="passowrd" name="password" v-model="rePassword" />
    <template v-slot:footer>
         <button>Signup</button>
         <button>Cancel</button>
    </template>
</Modal>
```

## 3. Kết bài 
<hr>

Vậy là loạt bài viết về tìm hiểu `VueJS` cơ bản của mình đến đây là kết thúc. Trên thực tế đây cũng là toàn bộ những nội dung mà mình đã tự tìm hiểu trước khi tham ra vào project liên quan đến `VueJS` hay học rộng ra các kiến thức liên quan khác như `VueX`, ... . Rất mong những chia sẻ nói trên của mình có thể giúp đỡ bạn phần nào khi tìm hiểu về `VueJS`. Cuối cùng, cảm ơn các bạn đã đọc bài và đừng quên để lại một upvote nhé :D.