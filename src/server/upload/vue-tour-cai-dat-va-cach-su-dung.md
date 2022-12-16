# Mở Đầu
Xin chào các bạn hôm nay mình sẽ cùng các bạn tìm hiểu cài đặt và cách dùng `vue-tour`. Một library giúp người dùng có thể biết được cách sử dụng cũng như các chức năng chính của trang web. Bắt đầu luôn nhé :D 
# Cài Đặt
Các bạn có thể cài thông qua npm hoặc yarn như sau 
```
    npm install vue-tour
    or with Yarn:
    yarn add vue-tour
```

  À các vì nó là  library của vue nên các bạn cần tạo một project vue trước nhé  :D.
  # Set Up
  ## Vue-cli
  Nếu các bạn đang dùn vuecli thì mở file main.js các bạn thêm plugin và load css như sau 
  ```js
  import Vue from 'vue'
import App from './App.vue'
import VueTour from 'vue-tour'

require('vue-tour/dist/vue-tour.css')

Vue.use(VueTour)

new Vue({
  render: h => h(App)
}).$mount('#app')
  ```
  ## Nuxtjs
   Còn nếu dùng Nuxt thì chúng ta sẽ tạo ra 1 file `vue-tour.js` trong folder `plugins`  và thêm nó vào phần plugins của `nuxt.config.js` như sau:
  
  File `vue-tour.js`
  ```js
 import VueTour from 'vue-tour'
import Vue from 'vue'

require('vue-tour/dist/vue-tour.css')

Vue.use(VueTour)
  ```
  Rồi bên file `nuxt.config.js` phần `plugins` thêm file ở trên vào là được
  ```
  '~/plugins/vue-tour.js',
  ```
  Ok thế là đã xong phần cài đặt, bây giờ chỉ cần thêm compnent `vue-tour` vào cùng với js của nó là được. Bạn có thể thêm nó ở bất kì file nào như sao 
  ```js
  <template>
  <div>
    <div id="v-step-0">A DOM element on your page. The first step will pop on this element because its ID is 'v-step-0'.</div>
    <div class="v-step-1">A DOM element on your page. The second step will pop on this element because its ID is 'v-step-1'.</div>
    <div data-v-step="2">A DOM element on your page. The third and final step will pop on this element because its ID is 'v-step-2'.</div>

    <v-tour name="myTour" :steps="steps"></v-tour>
  </div>
</template>

<script>
  export default {
    name: 'my-tour',
    data () {
      return {
        steps: [
          {
            target: '#v-step-0',
            header: {
              title: 'Get Started',
            },
            content: `Discover <strong>Vue Tour</strong>!`
          },
          {
            target: '.v-step-1',
            content: 'An awesome plugin made with Vue.js!'
          },
          {
            target: '[data-v-step="2"]',
            content: 'Try it, you\'ll love it!<br>You can put HTML in the steps and completely customize the DOM to suit your needs.',
            params: {
              placement: 'top'
            }
          }
        ]
      }
    },
    mounted: function () {
      this.$tours['myTour'].start()
    }
  }
</script>
  ```
 Giải thích một chút thì trong phần Data có các step được sắp xếp từ trên xuống dưới tương ứng với thứ tự hiển thị mỗi step sẽ dựa vào thuộc tính `target` để xác định `vue-tour` sẽ được hiển thị ở vị trí nào. Các bạn muốn hiển thị ở đâu thì chỉ cần thêm id hoặc class hoăc data attributes. Tiếp theo là `Content` để hiển thị nội dung cho step đó. tương tự là `title` để hiển thị tiêu đề. Ngoài ra còn có params để khai cáo một số config khác như: `placement: 'vị trí'` (top, bot, left, right) là vị trí ưu tiển hiển thị vue-tour so với element đó. Cuối cùng là lệnh để bắt đầu tour.
```
this.$tours['myTour'].start()
```
Đấy thế thôi thế là nó đã chạy được như này rồi (đây là demo mình lấy từ demo của vue-tour :D)
![](https://images.viblo.asia/0f7f6adf-3cd2-43aa-9b96-28cf5a905628.gif)
Đây mới chỉ là cơ bản thôi :v . Còn một số thứ hay ho mình sẽ nói luôn sau đây.
### Không Scroll 
Ví dụ giữa các bước mà bạn không muốn thưc hiện `scroll` thì các bạn chỉ cần thêm thuộc tính 
```
enableScrolling: false,
```
Vào trong phần `params` là được, lúc này khi bạn bấm next step thì nó sẽ vẫn chuyển đến bước tiếp nhưng sẽ không scroll đến bước đó.
### Thực hiện công việc trước khi chuyển bước tiếp theo
Có một cái nữa mình thấy cũng khá là hay đó là thực hiện một công việc trước khi chuyển sang bước tiếp. Ví dụ như như bước 2 đang đang ở trang home nhưng bước 3 bạn lại muốn giới thiệu cho người dùng ở trang `about`. Thì ở đây `vue-tour` cung cấp cho chúng ta một hàm để thay đổi giao diện hay thực hiện một công việc nào đó trước khi bắt đầu sang step tiếp theo. Đó là hàm `before`. :
```js
 before: type => new Promise((resolve, reject) => {
      this.$router.push('/about')
      resolve('foo')
    })
```
Như ở đây mình sẽ thực hiện chuyển sang trang `about` trước khi hiển thị step tiếp theo. Ở đây thì mình không thấy có nói đến thực hiện công việc trước khi lùi lại bước trước :D, Nhưng tìm hiểu doc trên github thì thấy có `callbacks` tương tự như trên nó được dùng để thực hiện 1 công việc trước khi chuyển đến hoặc vùi về một bước. Trên component vue-tour khai báo như sau: 
```html
<v-tour name="myTour" :steps="steps" :callbacks="myCallbacks">
```
Ở phần data khai báo `myCallbacks` như sau 
```js
data: () => ({
  myCallbacks: {
    onPreviousStep: this.PreviousStepCallback,
    onNextStep: this.NextStepCallback
  }
})
```
cuối cùng là viết hàm xử lý ở method :
```js
methods: {
  PreviousStepCallback (currentStep) {
    if (currentStep === 1) {
       // Thực hiện công  việc gì đó
    },
 NextStepCallback (currentStep) {
    if (currentStep === 1) {
      // Thực hiện công  việc gì đó
    }
  }
}
```
### Tùy chỉnh lại các button
Bạn đang dùng trang web tiếng việt mà các button của vue-tour  lại toàn là Next, Previous... 
![](https://images.viblo.asia/67eacd77-b934-4df4-b676-ea86dc7e8b9c.png)
Không sao chúng ta có thể customize  lại các nút như sau 
chỉ cần thêm lables vào trong data như sau: 
```js
data () {
      return {
        myOptions: {
          labels: {
            buttonSkip: 'Bỏ qua',
            buttonPrevious: 'Bước trước',
            buttonNext: 'Bước tiếp',
            buttonStop: 'Hoàn thành'
          }
        },
        steps: [
           // các bước
        ]
      }
    },
```
Còn một cách nữa tùy chỉnh cực mạnh chúng ta có thể ghi đè DOM của các bước, cái này mình làm theo kiểu sẽ tạo ra 1 component để custom lại và muốn dùng ở đâu thì gọi vào thôi.
Mình có 1 component `Vue-tour.vue` như sau
```js
<template>
    <v-tour
        name="myTour"
        class="vue-tour-style"
        :steps="steps"
        :callbacks="callbacks"
    >
        <template slot-scope="tour">
            <transition name="fade">
                <v-step
                    v-if="tour.steps[tour.currentStep]"
                    :key="tour.currentStep"
                    :step="tour.steps[tour.currentStep]"
                    :previous-step="tour.previousStep"
                    :next-step="tour.nextStep"
                    :stop="tour.stop"
                    :skip="tour.skip"
                    :is-first="tour.isFirst"
                    :is-last="tour.isLast"
                    :labels="tour.labels"
                >
                    <template>
                        <div slot="actions">
                            <button v-if="!tour.isLast" class="btn btn-primary" @click="tour.skip">
                                Bỏ qua
                            </button>
                            <button v-if="!tour.isFirst" class="btn btn-primary" @click="tour.previousStep">
                                Bước trước
                            </button>
                            <button v-if="!tour.isLast" class="btn btn-primary" @click="tour.nextStep">
                                Bước tiếp
                            </button>
                            <button v-if="tour.isLast" class="btn btn-primary" @click="tour.stop">
                                Hoàn thành
                            </button>
                        </div>
                    </template>
                </v-step>
            </transition>
        </template>
    </v-tour>
</template>
<script>
    export default {
        props: {
            steps: {
                type: Array,
                default: () => [],
            },
            callbacks: {
                type: Object,
                default: () => {},
            },
        },
    }
</script>
```
Ở đây mình thêm điểu kiện để hiện thị nút ví dụ như nút `bước trước` chỉ được hiển thị từ bước thứ 2 trở đi... và mình thực hiện props `steps` và `callbacks`. Ở component cha gọi đến nó chỉ đơn giản thế này thôi.
```html
                <VueTour
                    v-if="user"
                    :steps="steps"
                    :callbacks="MyCallbacks"
                />
```
các bạn có thể thêm diều kiển để hiển thị vue-tour như mình ở đây là vue-tour chỉ hiển thị khi có user đăng nhâp. phần data() vẫn viết như bình thường. Đây là thay đổi cách hiển thị của toàn bộ các bước còn bạn chỉ muốn thay đổi ở một bước nào đó thì cần thêm điều kiên vào phần `template` là được. Ví dụ như thay đổi cách hiển thị ở bước 3 .
```
<template v-if="tour.currentStep === 3">
```
# Kết luận
Trên đây là bài giới thiệu cách cài đặt cũng như sử dụng vue-tour của mình. Hy vọng nó sẽ giúp ích được cho các bạn, bài viết còn phần nào thiếu sót rất mong nhận được sự góp ý của các bạn. Nếu thấy bài viết hữu ích thì hãy cho mình một up vote nhé. Một lầ nữa cảm ơn các bạn.

Tham khảo: 

[https://github.com/pulsardev/vue-tour/wiki](https://github.com/pulsardev/vue-tour/wiki)

[https://www.npmjs.com/package/vue-tour](https://www.npmjs.com/package/vue-tour)