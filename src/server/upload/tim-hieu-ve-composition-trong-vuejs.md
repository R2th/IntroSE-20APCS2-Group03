Ở bài trước tớ có giới thiệu về lifecycle Vue 3, trong thời gian tìm hiểu kết hợp với google dịch :))) thì tớ mới phát hiện Vue 3 có cho ra mắt phần mới cũng được coi là phần core của nó, Nó được gọi là Vue Compostion API và hiện tại nó đã được ra mắt. Vô tình thì tớ thấy lifecycle hook chỉ là một phần nhỏ trong một cái to to. chúng ta cùng tìm hiểu nhé  :3.
 
 À quên để đọc hiểu phần này chúng ta cũng nên có chút gì đó để hiểu cơ bản của Vue và cách hoạt động chúng ra làm sao . chúng ta cùng tìm hiểu lần 2 nhé :v.
 # Why Composition API ?
 Compostion API sinh ra để nhằm giải quyết những bất cập và hạn chế lớn nhất thường gặp của Vue2, cụ thể sẽ là một số hạn chế thường gặp sau :
 
 * Một component được phát triển sẽ phình to ra, lớn hơn thì khả năng đọc hiểu code hoặc sửa chữa lại code sẽ cực kì khó khăn.
 *  Code khó sử dụng lại được.
 *  Có hạn chế hỗ trợ typescript

[Xem chi tiết tại đây nhé](https://www.vuemastery.com/courses/vue-3-essentials/why-the-composition-api/ )

# Composition API
## Basics of Compostion API
Để bắt đầu làm việc với Composition API chúng ta cũng nên biết chỗ mà chúng ta cần làm việc khai báo và sử dụng nó. Ở trong vue component nơi chúng ta sử dụng là `setup`
### setup component option 
Setup component option được thực thi trước khi component được tạo.

`Bởi vì setup thực thi trước component được tạo, trong setup sẽ không có this, ngoại trừ props thì không thể truy cập các thuộc tính đã khai báo trong compoent ví dụ: computed, local state, methods ... `

setup sẽ nhận hai tham số đầu vào là `props` và `context` , khi trả về từ setup chúng ta sẽ có thể sử dụng nó với thành phần còn lại.
ví dụ :
```
<script>
    import {ref} from 'vue'

    export default {
      props: {
        post : {
          type: Object,
          required: true
        }
      },
      setup(props, context) {
        console.log(props); // {post : ''}
        console.log(context);
        const stt = ref(123);
        return { // khi bạn return chúng ta có thể sử dụng nó như là một thành phần component
          stt, // trả về mộtvailable
        }
      },
    }
</script>
```
### Ref - reactive variables
`reactive variables` được hiểu như là một vùng chứa các variables mà khi thay đổi variable thì tất cả những gì sử dụng variable đấy sẽ lập tức thay đổi.

Chúng ta có thể tạo được nhiều variables khi sử dụng `ref function`. ví dụ :
```
import { ref } from 'vue'
const value = ref(0);
```
`ref` nhận tham số đầu vào và trả về một đối tượng có key là `value`, sao đó chúng ta có thể sử dụng và thay đổi chúng.

Việc bao bọc bởi một đối tượng có thể bạn sẽ nghĩ là không cần thiết, nhưng khi có yêu cầu thống nhất giữa các loại dữ liệu trong javascript thì chúng ta cần sử dụng đối tượng, Có nghĩa là nếu value là một kiểu `number` và `String` thì bạn thay đổi giá trị chứ không phải là tham chiếu.
### Lifecycle hook Registration inside setup
Để sử dụng được lifecycle hook trong setup function thì chúng ta sẽ thêm tiền tố on:X

ví dụ:

| hook function  | on:X |
| -------- | -------- | 
| beforeCreated     | setup()     |
|created     | setup()     |
| beforeMount     | onBeforeMount     |
| mouted     | onMouted     |
| beforeUpdate     | onBeforeUpdate()     |
|updated| onUpdated()|
|beforeUnmount|onBeforeUnmount()|
|unmouted|onUnmounted|

### Reacting to Changes with Watch
Watch được định nghĩa để giám sát thay đổi của một thuộc tính trong Component và dưới đây là cách mà Compostion sử dụng trong setup.
```
<script>
<template>
  <div class="composition">
    <button @click="stt = Math.random(1, 199)">click</button>
  </div>
</template>

<script>
import {ref, watch} from 'vue'
export default {
  setup() {
    const stt = ref(123);
    watch(stt, (newValue, oldValue) => {
        console.log(newValue);
        console.log(oldValue);
    });
    return {
      stt,
    }
  },
}
</script>
```
Ở `watch function`  chấp nhận ba tham số truyền vào
* `Reactive Reference` hoặc một `get function` mà chúng ta muốn theo dỗi
*  a callback
*  xử lý
### Computed
Tương tự với `ref` và `watch`, computed properties có thể được tạo bên trong setup cùng xem ví dụ nhé .
```
<template>
  <div class="composition">
    <p>{{ sttComputed }}</p>
  </div>
</template>

<script>
import {ref, computed} from 'vue'
export default {
  setup() {
    const stt = ref(123);
    const sttComputed = computed(() => stt.value + 10)
    return {
      stt,sttComputed
    }
  },
}
</script>
```
chúng ta cần return computed thì mới có thể sử dụng được và tớ nghĩ khá dễ hiểu để làm ví dụ.
Cùng tớ tìm hiểu tiếp về `setup function` nhé.
## Setup
Khi sử dụng `setup function`  chúng ta nên setup function sẽ có 2 tham số truyền vào
* Props
* context

### Props
`props` là tham số truyền vào đầu tiên của `setup funtion`, bên trong setup chúng ta có thể sử dụng  và mỗi khi props thay đổi chúng vẫn sẽ cập nhập như bình thường.
```
<script>
  export default {
    props: {
      post: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      console.log(props.post);
    },
  }
</script>
```
### Context
Context là tham số thứ hai truyền vào setup funtion, Context là một đối tượng gồm có các thành phần:
* attrs : hiển thị các thông tin thuộc tính mà component cha truyền vào ví dụ,class
* slots: quản lý slot truyền vào từ thằng cha
* props: quá quen thuộc rồi :))
* emit: truyền ngược lại lên thằng cha

Tớ cũng không biết giải thích như thế nào cho phù hợp ý :3. thôi đành quăng ví dụ lên cho mọi người hiểu rõ @@
```
// composition.vue
<template>
  <div class="composition">
    <demo class="demo demo2" v-bind:user="1232" v-on:send="getEmit">
          123123123
    </demo>
  </div>
</template>

<script>
  import Demo from "../components/demo";
  export default {
    components: {Demo},
    setup() {
      function getEmit(emit){
        console.log(emit);
      }

      return {
        getEmit,
      }
    },
    data() {
      return {
        message: 123,
      }
    },
  }
</script>
```
`file demo.vue`
```
<template>
  <div class="container">
    <p>{{ post }}</p>
    <p>{{xx}}</p>
    <slot></slot>
    <button @click="xx = Math.random(1, 100)"> click</button>
    <button @click="sendEmit">Emit</button>
  </div>
</template>

<script>
import {ref} from 'vue';
export default {
  name: "demo",
    props: {
      user: {
        type: Number,
        default: 213
      },
      post: {
        type: Number,
        default: 1233
      }
    },
  setup(props, context) {
    let xx = ref(123);
    console.log(context.attrs);
    console.log(context.slots);
    console.log(context.props);
    function sendEmit() {
      context.emit('send', 'send Emit');
    }
    return {
      xx, sendEmit
    }
  },
}
</script>
```
bạn có thể tham khảo ở [link](https://www.youtube.com/watch?v=5m7arq7A9VA)

### Accessing Component properties
Khi setup đang thực thực thì component vẫn chưa được tạo chúng ta chỉ có thể truy cập một số thuộc tính mà tớ đã làm ở trên. Cũng có nghĩa chúng ta không thể truy cập vào các thuộc tính của component instance như:
* data
* computed
* methods

## Provide/Inject
Provide/Inject được sử dụng nhằm giải quyết vấn đề truyền dữ liệu thông qua nhiều compoent lồng nhau.

ví dụ:
Trong trường hợp ông nội cho tiền cháu nội của mình sẽ có 2 cách:

cách 1: đưa tiền cho con trai và nhờ con trai đưa tiền cho cháu nội ( sử dụng props)

cách 2: đưa tiền thằng cho cháu nội ( thì đây sẽ là provide/inject)

cùng xem mẫu nhé :

**Component ông nội**
```
    <script>
import { provide } from 'vue'
export default {
  components: {
    MyMarker
  },
  setup() {
    provide('location', 'North Pole')
    provide('geolocation', {
      longitude: 90,
      latitude: 135
    })
  }
}
</script>
```
**Component cháu nội *
```
<script>
import { inject } from 'vue'

export default {
  setup() {
    const userLocation = inject('location', 'The Universe')
    const userGeolocation = inject('geolocation')

    return {
      userLocation,
      userGeolocation
    }
  }
}
</script>
```
* Provide cho phép chúng ta xác định 2 tham số truyền vào
    - Tên thuộc tính : thứ mà thằng cháu sẽ bắt
    - Giá trị : thứ mà thằng cháu nhận được
* Inject cũng cho phép chúng ta xác định 2 tham số truyền vào
    - Tên thuộc tính mà provide đã khai báo
    - Giá trị mặc định : ông nội không cho thì bằng  0.
  
Chúng ta có thể nắm bắt được khi hành đồng provide và inject thực hiện thông qua sử dụng `ref` và `reactive` để cập nhật tự động một cách mới nhất.
# Kết bài
* Nhìn chung thì tớ cùng mọi người có một cái nhìn thông quan về composition API Vue 3, hy vọng sau bài này tớ cùng mọi người có thể làm được nhiều demo nghịch ngợm để có cái nhìn rõ nhất về hiệu suất làm việc của nó.
* Sau bài viết này mọi người cũng có một thắc mắc giống tớ đúng không ? đó là cái gì cũng viết ở setup funtion hả :))) đừng lo lắng Vue nó cũng cho ra một cái function Compostion mà ở đầu tớ đã để link trong video rồi đó.

Cảm ơn mọi người đã dành thời gian theo dõi và đọc bài viết sơ sài của mình !!! cảm ơn mọi người rất nhiều