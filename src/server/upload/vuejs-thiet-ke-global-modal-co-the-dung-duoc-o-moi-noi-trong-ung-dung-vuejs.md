![](https://images.viblo.asia/7fc5afea-77ac-4aa1-8947-e20f90ae1582.png)
## Vấn đề:
Giả sử người dùng của chúng ta muốn xóa nội dung nào đó. Sẽ tốt hơn nếu bạn hỏi người dùng trước, liệu anh ta thực sự muốn tiếp tục tác vụ đó, vì việc xóa nội dung nào đó thường là vĩnh viễn và không thể đảo ngược.
Giả sử chúng ta tạo thành phần modal/dialog để phục vụ mục đích này. Bây giờ chúng ta có thể gọi nó như thế này:
```javascript
confirmThatYouWantToDeleteThisThing() {

  const paramas = {

    title: "Modal title", // passed string for modal title

    text: "Modal text", // passed string for modal text

    onConfirm: () => {

      // passed function that will get executed after clicking 'confirm' button

      return this.someFunctionForDeletingStuff();

    }

  }

  this.$modal.show(params);

}



someFunctionForDeletingStuff() {

  // delete your stuff here

};
```
## Giải quyết:
Với mục đích của hướng dẫn này, giả sử modal/dialog AppModal.vue của chúng ta sẽ trông như sau:
```html
<template>

  <div class="modal-wrapper" v-if="visible">

    <h2>{{ title }}</h2>

    <p>{{ text }}</p>

    <div class="modal-buttons">

      <button class="modal-button" @click="hide">Close</button>

      <button class="modal-button" @click="confirm">Confirm</button>

    </div>

  </div>

</template>





<script>

export default {

  data() {

    return {

      // variable that shows/hides modal

      visible: false, 

      title: '',

      text: ''

    }

  },

  methods: {

    hide() {

      // method for closing modal

      this.visible = false;

    },

    confirm() {

      // confirm code will be here soon(TM)

    }

  }

}

</script>



<style scoped>



.modal-wrapper {

  position: fixed;

  top: 50%;

  left: 50%;

  transform: translate(-50%, -50%);

  width: 300px;

  height: 200px;

  z-index: 1000;



  border-radius: 2px;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

}



.modal-buttons {

  position: absolute;

  bottom: 0;

  left: 0;

  right: 0; 

  display: flex;

}



.modal-button {

  flex-grow: 1;

}

</style>
```
Tất nhiên chúng ta có thể thêm một số animations/dark-clickable-background, v.v. nhưng những thứ đó không quan trọng cho mục đích của bài viết này.
![](https://images.viblo.asia/f5818410-d23d-449b-b17f-e882dd1c1954.png)
Bây giờ chúng ta cần làm cho nó xuất hiện.
## Tạo plugin
Chúng ta sẽ sử dụng các plugin Vue.js để tạo ra các modal tooàn cục. Bạn có thể tìm tài liệu cho chủ đề này [tại đây](https://vuejs.org/v2/guide/plugins.html#ad). Hai plugin được sử dụng và nổi tiếng nhất cho Vue.js là vue-router và VueX.
```javascript
// we need our modal component

import AppModal from 'AppModal.vue'



const Modal = {

  // every plugin for Vue.js needs install method

  // this method will run after Vue.use(<your-plugin-here>) is executed

  install(Vue, options) {

    // We must create new Eventbus

    // which is just another Vue instance that will be listening for and emiting events from our main instance 

    // this EventBus will be available as Modal.EventBus

    this.EventBus = new Vue()

    

    // making our modal component global

    Vue.component('app-modal', AppModal)



    // exposing global $modal object with method show()

    // method show() takes object params as argument

    // inside this object we can have modal title, text, styles... and also our callback confirm function

    Vue.prototype.$modal = {

      show(params) {

        // if we use this.$modal.show(params) inside our original Vue instance

        // we will emit 'show' event with parameters 'params'

        Modal.EventBus.$emit('show', params)

      }

    }

  }

}



export default Modal
```
Bên trong main.js chúng ta phải cài đặt plugin mới:
```javascript
// import our plugin

import Modal from 'plugin.js'



// use it

Vue.use(Modal)
```
Và chúng ta cần thêm thành phần phương thức vào template của chúng ta bên trong app.vue:
```html
<template>

  <div id="app" class="app">

    // ... other stuff

    // we don't have to import our component - it will get added during plugin installation

    <app-modal/>

  </div>

</template>



// ...
```
Chúng tôi cũng cần thêm trình xử lý sự kiện vào AppModal.vue.
```html
<template>

  // unchanged

</template>





<script>

// we must import our Modal plugin instance

// because it contains reference to our Eventbus

import Modal from 'plugin.js';



export default {

  data() {

    return {

      visible: false, 

      title: '',

      text: '',

      // adding callback function variable

      onConfirm: {}

    }

  },

  methods: {

    hide() {

      // this method is unchanged

    },

    confirm() {

      // we must check if this.onConfirm is function

      if(typeof this.onConfirm === 'function') {

        // run passed function and then close the modal

        this.onConfirm();

        this.hide();

      } else {

        // we only close the modal

        this.hide();

      }

    },

    show(params) {

      // making modal visible

      this.visible = true;

      // setting title and text

      this.title = params.title;

      this.text = params.text;

      // setting callback function

      this.onConfirm = params.onConfirm;

    }

  },

  beforeMount() {

    // here we need to listen for emited events

    // we declared those events inside our plugin

    Modal.EventBus.$on('show', (params) => {

      this.show(params)

    })

  }

}

</script>



<style scoped>

/* styles are unchanged */

</style>
```
Bây giờ, chúng tôi có thể gọi modal từ bất kỳ đâu trong dự án của chúng tôi. Chúng ta sẽ kiểm tra nó từ App.vue:
```html
<template>

  <div id="app" class="app">

    <button @click="showModal">modal!</button>

    <app-modal/>

  </div>

</template>



<script>

export default {

  methods: {

    showModal() {

      // we must pass object params with all the information

      const params = {

        title: "Test!",

        text: "test test test",

        // we are passing callback method for our confirm button

        onConfirm: () => {

          return this.alertFunc();

        }

      };

      // now we can call function that will reveal our modal

      this.$modal.show(params)

    },

    // we pass this method as example

    alertFunc() {

      alert('Hello!')

    }

  }

}

</script>
```
![](https://images.viblo.asia/ae99c521-0878-4bc6-9319-65c52b4ccb83.gif)
## Kết luận:
Trên đây là một cách tạo một global modal có thể gọi ở mọi nơi ở ứng dụng Vuejs của bạn. Thật tiện lợi và dễ hiểu phải không nào.
## Reference:
https://medium.com/@panzelva/writing-modals-for-vue-js-callable-from-anywhere-6994d180451