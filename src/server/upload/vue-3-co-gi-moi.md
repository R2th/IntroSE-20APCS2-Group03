## Lời mở đầu.
   Dù vue 3 chưa được phát hành chính thức nhưng cũng đưa bản thử nhiệm và được rất nhiều deverloper quan tâm.
   
   Ai cũng đều có sự tò mò là vue 3 có gì khác với Vue 2 không.

   Vậy nên nay mình viết bài này để cùng mọi người tìm hiểu xem có gì thú vị không nhé.
   
##    Setup version beta Vue 3

Chúng ta clone setup tương tự như vue 2 thôi.

```
git clone https://github.com/vuejs/vue-next-webpack-preview.git vue3-pvt
cd vue3-pvt

```

xong chạy cài đặt packages:


`npm install`<br>
`npm run dev`

Vậy là có thể truy cập http://localhost:8080 để có thể nhìn được simple application của vue 3.

![](https://images.viblo.asia/7bccdc91-8dcd-4f39-81cc-190bdbdd18d2.png)

Còn đây là các packages được vue cài sẵn:

```
{
  "private": true,
  "scripts": {
    "dev": "webpack-dev-server",
    "build": "webpack --env.prod"
  },
  "dependencies": {
    "vue": "^3.0.0-beta.2"
  },
  "devDependencies": {
    "@vue/compiler-sfc": "^3.0.0-beta.2",
    "css-loader": "^3.4.2",
    "file-loader": "^6.0.0",
    "mini-css-extract-plugin": "^0.9.0",
    "url-loader": "^4.0.0",
    "vue-loader": "^16.0.0-alpha.3",
    "webpack": "^4.42.1",
    "webpack-cli": "^3.3.11",
    "webpack-dev-server": "^3.10.3"
  }
}

```

## Các tính năng mới trên Vue 3.
Vue 3 nhanh hơn, kích thước tệp nhỏ hơn và được trang bị hỗ trợ TypeScript tốt hơn. Một số tính năng mới mà chúng ta có thể thảo luận và tìm hiểu để thực hiện trong bài viết này bao gồm:

1. Composition API (Now built-in)
1. Multiple root elements (Template syntax )
1. Suspense
1. Multiple V-models
1. Better Reactivity


### Composition API

Ở Vue 3 ta được xem mặt 1 hook mới với cái tên Composition API” 

Toàn bộ những thứ về composition API được gói gọn trong **setup()** hoặc code như Vue 2 cũng được.

Mình thấy có 2 ưu điểm sau:
* 
* Better organization - tổ chức code tốt hơn
* Sharing/reusing the code - có thể chia sẻ dung lại được ở nhiều nơi



cách sử dụng chúng như sau:

```html
<template>
  <div class="counter">
    <p>count: {{ count }}</p>
    <p>NewVal (count + 2): {{ countDouble }}</p>
    <button @click="inc">Increment</button>
    <button @click="dec">Decrement</button>
    <p> Message: {{ msg }} </p>
    <button @click="changeMessage()">Change Message</button>
  </div>
</template>
<script>
import { ref, computed, watch } from 'vue'
export default {
  setup() {
/* ---------------------------------------------------- */
    let count = ref(0)
    const countDouble = computed(() => count.value * 2)
    watch(count, newVal => {
      console.log('count changed', newVal)
    })
    const inc = () => {
      count.value += 1
    }
    const dec = () => {
      if (count.value !== 0) {
        count.value -= 1
      }
    }
/* ---------------------------------------------------- */
    let msg= ref('some text')
    watch(msg, newVal => {
      console.log('msg changed', newVal)
    })
    const changeMessage = () => {
      msg.value = "new Message"
    }
/* ---------------------------------------------------- */
    return {
      count,
      inc,
      dec,
      countDouble,
      msg,
      changeMessage
    }
  }
}
</script>
```

Hoặc các bạn cũng có thể dùng cách như vue 2 chúng ta hay làm.

```html
<template>
  <div class="counter">
    <p>count: {{ count }}</p>
    <p>NewVal (count + 2): {{ countDouble }}</p>
    <button @click="inc">Increment</button>
    <button @click="dec">Decrement</button>
    <p> Message: {{ msg }} </p>
    <button @click="changeMessage()">Change Message</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0,
      msg: 'some message'
    }
  },
  computed: {
    countDouble() {
      return this.count*2
    }
  },
  watch: {
    count(newVal) {
      console.log('count changed', newVal)
    },
    msg(newVal) {
      console.log('msg changed', newVal)
    }
  },
  methods: {
     inc() {
      this.count += 1
    },
    dec() {
      if (this.count !== 0) {
        this.count -= 1
      }
    },
    changeMessage() {
      msg = "new Message"
    }
  }
 
}
</script>
```

**Chú ý quan trọng:** Tất cả những gì về composition API thì chỉ được dùng ở trong setup thôi nhé các bạn. Tức là watch hay computed ở bên trên ta dùng là dành cho setup. Còn mặc định Vue vẫn có computed như Vue 2 nhé. 


### Multiple root elements

Trong Vue 2, thẻ mẫu chỉ có thể lấy một phần tử gốc. Ngay cả khi chúng tôi chỉ có hai `<p>`thẻ, chúng tôi vẫn phải đặt chúng trong một `<div>`thẻ để nó hoạt động. Vì điều này, chúng tôi đã phải thay đổi mã CSS cũng như trong thành phần chính để nó trông như mong đợi.
    
   Trong Vue 3, hạn chế này được dỡ bỏ. Không cần cho một yếu tố gốc nữa.

Chúng tôi có thể sử dụng bất kỳ số lượng thẻ trực tiếp trong <template></template>phần:

```html
<template>
  <p> Count: {{ count }} </p>
  <button @click="increment"> Increment </button>
  <button @click="decrement"> Decrement</button>
</template>
```


Vue 2: 

```html
<template>
  <div class="counter">
    <p> Count: {{ count }} </p>
    <button @click="increment"> Increment </button>
    <button @click="decrement"> Decrement</button>
  </div>
</template>
```

### Suspense

Suspense là một tính năng mới kết xuất thành phần default/fallback cho đến khi thành phần chính tìm nạp dữ liệu.

Suspense là tạm dừng render component chính của chúng ta, thay vào đó hiển thị 1 nội dung khác, và cho tới khi nào component chính của chúng ta được download về nếu đó là async component (lazy load) hoặc cho tới khi nào hoàn thành một công việc async nào đó ở trong setup

Chúng ta tạo mới component với nội dung như sau:

```html
<template>
  <Suspense>
    <template #default>
      <div v-for="item in articleList" :key="item.id">
        <article>
          <h2>{{ item.title }}</h2>
          <p>{{ item.body }}</p>
        </article>
      </div>
    </template>
    <template #fallback>
      Articles loading...
    </template>
  </Suspense>
</template>
<script>
import axios from 'axios'
export default {
  async setup() {
    let articleList = await axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        console.log(response)
        return response.data
      })
    return {
      articleList
    }
  }
}
</script>
```



Giải thích:
Khi đang nạp dự liệu thì sẽ hiển thị #fallback cho đến khi quá trình nạp dữ liệu xong thì #default bắt đầu chạy.



Vue 3 cũng cung cấp cho ta 1 hook đó là `onErrorCaptured` để bắt lỗi nếu trong quá trình xử lý các tác vụ trong setup() khi xảy ra lỗi

```html
<template>
 <div v-if="error">
   {{ error }}
  </div>
  <Suspense  v-else>
    <template #default>
      <div v-for="item in articleList" :key="item.id">
        <article>
          <h2>{{ item.title }}</h2>
          <p>{{ item.body }}</p>
        </article>
      </div>
    </template>
    <template #fallback>
      Articles loading...
    </template>
  </Suspense>
</template>
<script>
import axios from 'axios'
import { onErrorCaptured, ref } from 'vue'
export default {
    setup () {
      const error = ref(null)
      onErrorCaptured(e => {
        error.value = e
        return true
      })
    
     let articleList = await axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        console.log(response
        throw new Error('This is error')
        return response.data
      })
    }
  return { error }
</script>
```

### Multiple v-models
Chúng ta đều biết rằng v-model được sử dụng cho ràng buộc hai chiều. Chúng tôi chủ yếu sử dụng nó với các yếu tố hình thức. Đôi khi, chúng tôi thậm chí sử dụng nó với các thành phần tùy chỉnh.

Vue-2 cho phép sử dụng chỉ một v-model trên một thành phần. Trong Vue-3, chúng tôi có thể liên kết bất kỳ số lượng v-model nào với các thành phần tùy chỉnh của mình:

```html
<template>
      <survey-form v-model:name="name" v-model:age="age"> </survey-form>
    </template>



    //SurveyForm.vue
    <template>
      <div>
        <label>Name: </label>
        <input :value="name" @input="updateName($event.target.value)" />
        <label>Age: </label>
        <input :value="age" @input="updateAge($event.target.value)" />
      </div>
    </template>
    <script>
    export default {
      props: {
        name: String,
        age: Number
      },
      setup(props, { emit }) {
        const updateName = value => {
          emit('update:name', value)
        }
        const updateAge = value => {
          emit('update:age', +value)
        }
        return { updateName, updateAge }
      }
    }
    </script>
```


### Better reactivity


Vue 2 đã có khả năng phản ứng tuyệt vời và bạn có thể không gặp phải bất kỳ trường hợp nào mà bạn thấy rằng phản ứng là thiếu. Tuy nhiên, đã có một vài trường hợp Vue 2 bị hụt.

Hãy xem lại Vue 2 và xem những hạn chế đó là gì.

Để chứng minh khả năng phản ứng, chúng tôi sẽ sử dụng các trình theo dõi để lắng nghe một trong các biến trạng thái và sau đó sửa đổi nó để xem liệu `watchers` có được kích hoạt không:

```html
<template>
  <div class="hello" @click="test">test {{list }} {{ myObj }}</div>
</template>
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      list: [1, 2],
      myObj: { name: "Preetish" }
    };
  },
  watch: {
    list: {
      handler: () => {
        console.log("watcher triggered");
      },
      deep: true
    }
  },
  methods: {
    test() {
      this.list[2] = 4;
      this.myObj.last = "HS";
      delete this.myObj.name;
    }
  }
};
</script>
```

Không có một trong ba sửa đổi nào ở trên - chẳng hạn như thêm một mục mới vào một mảng dựa trên chỉ mục, thêm một mục mới vào một đối tượng hoặc xóa một mục khỏi đối tượng - là phản ứng trong Vue-2. Do đó watchers sẽ không được kích hoạt, hoặc DOM sẽ được cập nhật. Chúng tôi đã phải sử dụng hoặc phương pháp . `vue.set() vue.delete()`

Trong Vue-3, chúng hoạt động trực tiếp mà không cần bất kỳ chức năng trợ giúp nào:

```
export default {
  setup() {
    let list = ref([1, 2])
    let a = ref(0)
    let myObj = ref({ name: 'Preetish' })
    function myFun() {
      list.value[3] = 3
      myObj.value.last = 'HS'
      delete myObj.value.name
    }
    return { myFun, list, myObj }
  }
}
```

Chúng ta có thể thấy rằng watcher đã được kích hoạt cả bốn lần trong thiết lập Vue 3.

## Tổng kết:
Do chưa có nhiều thời gian và bản chính thứ từ Vue 3 nên mình cũng tìm hiểu được sâu hơn về vue 3.

Nhưng mình nhận thấy Vue  3 đang có nhiều điểm + giống React. Nên theo mình sau bản cập nhật này vue sẽ mạnh hơn, code dễ đọc hiệu năng lại cao thì tại sao lại không dùng đúng không anh em dev.

có gì hay ho anh em cùng chia sẻ nhé nhé !!!