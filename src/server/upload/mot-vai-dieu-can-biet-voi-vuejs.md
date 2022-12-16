## Components Can Be Loaded Globally or Locally.
Vuejs cung cấp hai cách load components - một cách globally ở instance Vue và một cách khác ở component level (tại component muốn sử dụng) . Cả hai cách đều mang lại những lợi ích riêng.

Việc load một compenent globally giúp nó có thể truy cập được từ bất kỳ template nào trong app của bạn bao gồm cả các subcomponents 
. Nó giới hạn số lần import global component  của bạn vào subcomponenets. Ngoài ra, nếu bạn load components global, bạn sẽ không gặp phải lỗi đăng ký component  “*did you register the component correctly?*”. Chú ý, load component global một cách hạn chế, nó sẽ làm phồng app của bạn, và ngay cả khi nó không được sử dụng nó vẫn sẽ được build bởi Weppack.

```
import Vue from 'vue';
import Editor from './componetns/Editor.vue'

//Where 'editor' is the name of the component <editor></editor>
Vue.component('editor', Editor);
```

Loading components local cúng cấp cho bạn các component độc lập và chỉ load chúng khi cần thiết. Khi được kết hợp với Webpack, bạn chỉ có thể lazy-load componenets khi chúng được sử dụng. Điều này làm cho kích thước tệp ứng dụng ban đầu nhỏ hơn nhiều và giảm thời gian tải.

```
<template>
  <section>
    <editor></editor>
  </section>
</template>

<script>
import Editor from './Editor'
export default {
  name: 'dashboard',
  components: {
    Editor
  }
}
</script>
```


## Lazy Loading / Async Components
Lazy load components sử dụng Webpack’s dynamic imports (import động). Vue hỗ trợ lazy loading các component của bạn tại thời điểm render và [code splitting](https://webpack.js.org/guides/code-splitting/). Những tối ưu hóa này cho phép code trong component chỉ được tải khi cần thiết, giảm HTTP request, kích thước tệp. Phần tuyệt vời của tính năng này là nó hoạt động với cả global loaded và local loaded.

Globally loading async components:
```
import Vue from 'vue';

//Where 'editor' is the name of the component <editor></editor>
//Returns a promise that only gets called when the compoent is rendered and then cached.
Vue.component('editor', () => import('./componetns/Editor.vue'));
```

Locally loading async components:
```
<template>
  <section>
    <editor></editor>
  </section>
</template>

<script>
export default {
  name: 'dashboard',
  components: {
    'Editor': () => import('./Editor')
  }
}
</script>
```

## Required Props


Có một số cách để tạo prop cho một component. Bạn có thể đăt một mảng các chuỗi đại diện cho tên prop hoặc bạn có thể truyền vào một object có các key là tên prop và configuration của object.

*Required* key mong đợi một giá trị *true* hoặc *false*. *True* sẽ tạo ra lỗi nếu prop không được set khi component được sử dụng và *false* (giá trị mặc định) sẽ không yêu cầu hoặc ném lỗi nếu prop không được set.

```
<template>
  <section>
    <editor v-if="isAdmin"></editor>
  </section>
</template>

<script>
export default {
  name: 'Editor',
  props: {
    enabled: {},
    isAdmin: {
      required: true
    }
  }
}
</script>
```

## Trigger Custom Events with *$emit*

Giao tiếp giữa child and parent component có thể được thực hiện bằng việc sủ dụng `$emit` để custom events. Hàm `$emit` chấp nhận một chuỗi cho tên sự kiện và một giá trị tùy chọn được emitted. Để lắng nghe sự kiện, chỉ cần thêm `@eventName` vào component tạo ra sự kiện và chuyển vào trình xử lý sự kiện của bạn. 


Child component:

```
<template>
  <section>
    <button @click="onClick">Save</button>
  </section>
</template>

<script>
export default {
  name: 'triggerEvent',
  methods: {
    onClick() { 
      this.$emit(save);
    }
  }
}
</script>
```

Parent component:

```
<template>
  <section>
  <p v-show="showSaveMsg">Thanks for Listening for the saved event</p>
  <trigger-event @save="onSave"></trigger-event>
  </section>
</template>

<script>
export default {
  name: 'TriggerEvent',
  components:{
    TriggerEvent,
  },
  data(){
    return {
      showSaveMsg: false
    }
  },
  methods: {
    onSave() { 
        this.showSaveMsg = true;
    }
  }
}
</script>
```