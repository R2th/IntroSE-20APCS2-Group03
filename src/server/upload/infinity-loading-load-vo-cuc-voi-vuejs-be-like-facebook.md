# Lời nói đầu
Chào các bạn. Nếu mọi người đã đọc qua series Vue.js của mình thì chắc có lẽ đã nắm khá đủ những thứ cơ bản khi tiếp xúc với framework này. Thôi không phải dài dòng lòng vòng gì thêm nữa. Ngày hôm nay mình tiếp tục chia sẻ một bộ UI sử dụng với Vue.js cùng với một chức năng rất đơn giản và thực hiện với Vue.js đấy là Loading Infinity :))) Cái mà mọi nguời gặp thường ngày  khi dùng facebook hay trên những trang mạng xã hội. Lúc đầu mình  thầy kiểu loading này cũng nghĩ nó rất vi diệu nhưng khi thử làm mới thất rất là dễ à !@!

Vào bài thôi 

![](https://images.viblo.asia/9172e0c5-467c-4501-a38c-40412bbc54d0.gif)

# 1. Những thứ cần

- **Element:** Bài này mình sẽ sử dụng và giới thiệu với các bạn một bộ ui rất nổi tiếng và hay được sử dụng với Vue.js đấy là Element UI. Tuy mình cũng chưa sử dụng hết những công cụ trong bộ UI này nhưng nhìn qua mình thấy bộ UI này khá đẹp cũng như rất chuyên nghiệp. 

![](https://images.viblo.asia/5b86ef05-6f78-4882-a3bd-8a194e340d0f.png) 

![](https://images.viblo.asia/d7bedcd9-237a-47c5-b937-cbbb74d2b6d1.png)

Bộ giao diện này gần như đầy đủ những thứ mà chúng ta cần để làm việc với rất nhiều Component hỗ trợ tận răng :)). Tất nhiên nếu có nhu cầu để làm một thứ gì đó đặc biệt thì chúng ta cũng phải code tay rồi. 

![](https://images.viblo.asia/5ef12023-78f8-40eb-9a06-1d7ae4532aa2.png)
Bản mới nhất hiện tại đang là 2.13.2. Các bạn nhìn bên trái sidebar của tab Component sẽ thấy rất nhiều Components có sẵn như DatePicker, các Icon, Button, Link , ... 
Với tinh thần tự giác học tập của chúng ta thì mình nghĩ mọi thứ trong này nên lên trang chủ để khám phá tìm tòi là hay nhất !! https://element.eleme.io/

- và **VueJS:** Như topic thì VueJS sẽ là một phần không thể thiếu trong series này . Ở đây nếu bạn nào chưa từng sử dụng VueJS có thể quay tới các bài trước trong series để đọc những thứ cơ bản và quay lại để thực hành tiếp nhé (many thanks!) 

# 2. Và những thử đủ
Bắt tay vào cài đặt và làm thôi :D .

Nếu bạn nào đang làm project và chỉ muốn thêm chức năng thì bỏ qua bước cài đặt này nhé :D 

### Cài đặt : 
Bước 1: Mình sẽ sử dụng VueCLI để tạo mới một project với Vue. Mọi thứ về cài đặt qua CLI thì một lần nữa mời các bạn xem các bài trước của mình nhé!!

Bước 2: Tiếp theo đó, chúng ta sẽ cài đặt Element vào Vue bằng command: 

   ```
   npm i element-ui -S
   ```
  import vào file main.js để sử dụng với Vue
  
  ![](https://images.viblo.asia/65959fb4-408f-4518-bf4d-9b84e92813ea.png)

 ```js
 import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

 ```
Bước 3: CODE 

Trong components/List.vue mình sẽ thực hiện code component 
```html
<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
    <ul
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled">
      <li v-for="i in dataToShow" :key="i.id" class="list-item">{{ `Bài ${i.id}:   ${i.body}` }}</li>
    </ul>
    <p v-if="loading">Loading...</p>
    <p v-if="noMore">No more</p>
  </div>
</template>

```

Phần template chủ yếu mình dùng Element chỉ để dùng directive  v-infinite-scroll và infinite-scroll-disabled . Ngoài ra các bạn có thể cài đặt v-infinite-scroll riêng mà không cần dùng Element qua npm nhé (dùng Element ở đây chỉ muốn giới thiệu các bạn bộ công cụ khá hữu ích này thôi :v )   

Phần script: 
```js
<script>
  export default {
    data () {
      return {
        data: [],
        dataToShow: {},
        loading: false,
        index: 0,
        limit: 3,
        noMore: false,
      }
    },
    computed: {

      disabled () {
        return this.loading || this.noMore
      }
    },
    methods: {
      load () {
        this.loading = true
        setTimeout(() => {
          if (this.data.length > 0) {
            this.dataToShow = this.dataToShow.concat(this.data.splice(this.index, this.limit)) 
            this.loading = false
          } else {
            this.loading = false
            this.noMore = true;
          }
      
        }, 500)
      }
    },
    mounted() {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.data = data;
          this.dataToShow = data.splice(this.index, this.limit); //init
        })
    }
  }
</script>
```

Đoạn code trên cũng chỉ là những thứ cơ bản nhất mà chúng ta đã được đọc ở các bài trước :D cộng thêm một method ```fetch``` để mình nhận dữ liệu từ api. Theo mình thấy thì thường việc load dữ liệu sẽ không load tất  cả ra để thực hiện chức năng loading infinity này mà thay vào đó chúng ta sẽ ứng dụng vào để tải dữ liệu đã phân trang và load từng trang đấy (Lazy Loading). Cái này nếu các bạn hứng thú và chưa biết cách làm có thể để lại comment dưới . Có thể nếu rảnh mình sẽ một bài về lazy loading  :))))

Ở đây thuật toán cũng khá đơn giản, đầu tiên mình load tất cả dữ liệu từ api về,  chúng ta sẽ khởi tạo lần đầu tiên khi chưa scroll chuột với dữ liệu ban đầu (init) là 3 bản ghi (sử dụng splice và lưu vào state dataToShow. Tiếp theo mỗi lần scroll chuột chúng ta sẽ tiếp tục tách data ban đầu đã load và lấy ra tiếp 3 bản ghi nữa để nối vào state dataToShow này. Và chúng ta cứ tách dần data cho đến khi state data không còn dữ liệu nữa thì chúng ta sẽ dừng lại và đổi state loading = false cũng như thay đổi state noMore thành true. Như vậy chúng ta đã có một chức năng loading infinity hoàn chỉnh. 

Thành quả:
    ![](https://images.viblo.asia/5031327e-1186-45ae-979d-71a1ecd0813f.gif)
# 3. Kết bài 
Với bài viết này, mục đích chính của mình là giới thiệu tới các bạn một bộ công cụ ngon bổ rẻ đấy là Element cũng như ứng dụng vào làm một chức năng đơn giản này. Hy vọng sẽ giúp ích cho các bạn mới học có thể nắm rõ hơn kiến thức để bắt tay vào làm việc với framework Vue.js. Hẹn gặp lại mọi người vào những bài sau. Cảm ơn các bạn đã theo dõi series và đến hết bài viết này!!!