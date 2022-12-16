Xin chào các bạn đã quay trở lại với blog của mình, lại là mình đây (dù chắc vẫn chả ai biết mình là ai :D).

Sau một thời gian không được viết blog tay chân cồn cào ngứa ngáy, một phần do công việc bận còn phần nhiều chắc do bên Sing này Covid vẫn còn và phải làm việc ở nhà 6 tháng nay chưa chính thức đi làm lại tiếp xúc với thế giới loài người nên đầu óc mụ mị, tâm hồn thiếu sức sống không nghĩ ra được gì hay ho để chia sẻ với mọi người :joy::joy:

Sáng nay vừa mở mắt dậy thấy có thông báo Vue 3 đã bước vào RC-stage (Release Candidate - đối tượng có thể phát hành). RC-stage là giai đoạn cuối cùng trong quá trình phát triển phần mềm trước khi release chính thức. Vậy là lại có ý tưởng cho thú vui tao nhã là viết lách của mình rồi. :D

Là 1 người mê mẩn say đắm VueJS nên cũng muốn viết bài share với mọi người (những ai chưa biết) về Vue 3 lâu rồi nhưng lại muốn để tới RC-stage để mọi thứ ổn định và giống với bản release cuối cùng nhất.

Ở bài này chúng ta cùng điểm mặt một số cập nhật lớn sẽ có ở Vue thông qua việc chạy thử trực tiếp Vue 3 nhé.

# Điều kiện tiên quyết
*(nghe như học sinh cấp 2 :laughing::laughing:)*

Đầu tiên các bạn clone demo Vue 3 [ở đây](https://github.com/vuejs/vue-next-webpack-preview) nhé. 

Clone xong các bạn chạy `npm install` hoặc `yarn install` để cài `node_modules` nhé.

> Cho bạn nào chưa biết yarn: Yarn là hàng của Facebook, và khi cài các thư viện thì chạy cũng khá là nhanh so với npm nên bây giờ mình thấy người ta dùng yarn rất nhiều.

Sau khi cài xong ta chạy `npm run dev` hoặc `yarn dev` để chạy project, mở trình duyệt ở `localhost:8080` thấy như sau là cuộc đời tươi sáng rồi nhé các bạn:

![](https://images.viblo.asia/4f0c6683-4a0b-4f8d-9177-5a80e3f409a8.png)

> Note: hiện tại nếu ta mở Chrome Devtool thì sẽ không thấy có tab Vue ở đó, vì Vue Devtool vẫn đang trong quá trình update để tích hợp với Vue3 nhé :)

# Tree shaking
Mở project lên ta thấy tổng quan như sau:

![](https://images.viblo.asia/9cf6d125-5741-4658-88d9-640febfcbcc5.png)

Đầu tiên ta thử mở `main.js` xem có gì đặc biệt không nhé:

![](https://images.viblo.asia/0f320b15-2f8c-41fe-a4f1-a0cc9fe9eebd.png)

Ở đây ta thấy cũng không có gì đặc sắc lắm, đơn giản là import component `App`  là component khởi đầu (entrypoint) cho toàn bộ app Vue của chúng ta và mount (gắn kết) nó vào thẻ `<div id="app" />` ở file `index.html`

Thử quay lại Vue 2 xem file `main.js` có gì khác không nhé:

![](https://images.viblo.asia/778d97f8-4c84-4e71-bbe6-728fecd423f1.png)

Như ở trên các bạn thấy là sự khác biệt là ở Vue 3 thay vì import cả thư viện Vue thì giờ ta chỉ import duy nhất module `createApp` để phục vụ mục đích hiện tại là tạo app Vue.

**Đây là 1 trong những thay đổi lớn ở Vue 3. Kĩ thuật này gọi là `tree shaking` - loại bỏ những phần code thừa không dùng tới khi build và tối ưu code**. Điều này dẫn tới app của chúng ta sẽ nhỏ đi đáng kể vì có nhiều api như `keep-alive` hay `slot`,... mà nhiều khi ta không dùng tới:

![](https://images.viblo.asia/1d39e5d4-7b76-411a-b583-f5e06f6ed221.png)

Trên đây là 1 so sánh giữa Vue 2 và Vue 3 do Evan You (creator VueJS) thực hiện, ta có thể thấy là build size đã nhỏ đi còn ngót 1 nửa, thời gian thực hiện code JS cũng giảm đi quá nửa.

Ở Vue 3 hầu hết tất cả các module đều được thiết kế để có thể tree-shake (v-model, nextTick, watch,...), dùng tới module nào ta chỉ cần import module đó (hoặc Vue tự detect và import lúc build thay ta). Nhờ đó ứng dụng của chúng ta sẽ có size giảm đi đáng kể đó ;)

# Fragment
Tiếp theo ta mở file `App.vue` lên xem có gì nhé:

![](https://images.viblo.asia/327f84d8-3142-4282-9aa0-ae7ff93b72e2.png)

Ố ồ, vừa mở lên phát VSCode báo lỗi đỏ lòm, lí do vì sao đây?? :scream::scream:

![](https://images.viblo.asia/3c0f0770-4fbb-404c-b36d-fcb28f462c1a.png)

"Template yêu cầu phải có 1 thẻ bao trọn nội dung component" ???!!!

Nhìn lại thì ô đúng luôn, bên trong có tận 3 thẻ, mà 3 thẻ này không được bao bởi thẻ cha nào, bình thường đáng ra phải thế này chứ nhỉ:
```html
<template>
    <div>
        <img src="./logo.png">
        <h1>Hello Vue 3!</h1>
        <button @click="inc">Clicked {{ count }} times.</button>
    </div>
</template>
```
Ô thế tại sao code vẫn chạy mà không báo lỗi nhỉ?? :sweat_smile::sweat_smile:

Vấn đề là ở Vue 3 đã không còn yêu cầu ta phải bao toàn bộ nội dung component trong 1 thẻ duy nhất nữa, nhờ vào việc Vue 3 đã mặc định support `Fragment`. Code ta vẫn chạy dù thấy lỗi đỏ lòm là do extension Vetur trên VSCode không support syntax (cú pháp) này (hiện tại Vetur cũng đang được update để tích hợp với Vue 3 rồi nhé).

> Vue 3 Fragment giống như bên React có React.Fragment. Chỉ có điều template trong Vue 3 mặc định support và developer không cần care về điều này.

> Ban đầu khi dùng Vue và React mình nghĩ là "buồn cười thật, bắt người ta phải bao tất cả nội dung component trong 1 thẻ nữa, chẳng phải chúng đã được bao trong thẻ <template> duy nhất đó rồi hay sao". Dù sau này đã quen và chấp nhận việc này nhưng mình thấy về "developer experience" (trải nghiệm nhà phát triển-người sử dụng thư viện) thì vấn đề này nên được support một cách "tự nhiên" mà ta không cần care về nó. Và cuối cùng Vue 3 đã làm điều đó <3

Tiếp theo vẫn ở file `App.vue` nhìn xuống dưới phần code logic trong thẻ `script`. Ta thấy sự xuất hiện của 1 hook nữa đó là **setup()** - một trong những cập nhật được mong chờ nhất ở Vue 3. Pằng pằng chíu chíu :boom::boom::fireworks::fireworks:

# Composition API
Ở Vue 3 ta được xem mặt 1 hook mới, hook này được giới thiệu dưới cái tên Composition API - nghe nôm na "chắc là kiểu api được tổng hợp bởi các api thành phần" :laughing:

Toàn bộ những thứ về composition API được gói gọn trong `setup` hook, composition API giống như 1 dạng `opt-in` tuỳ chọn, bạn có thể dùng nó hoặc code như Vue 2 cũng được.

## Cách sử dụng
Đầu tiên chúng ta sửa lại file `App.vue` như sau:
```html
<template>
  <button @click="increment">
    Count is: {{ state.count }}, double is: {{ state.double }}
  </button>
</template>

<script>
import { reactive, computed } from 'vue'

export default {
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    })

    function increment() {
      state.count++
    }

    return {
      state,
      increment
    }
  }
}
</script>
```
Giải thích:
- `setup` được khai báo như các hooks bình thường (created, mounted,....)
- Ở bên trong ta tạo ra object `state`, object này có 2 thuộc tính là `count` và `double`. Ta muốn giá trị của `state` là reactive - khi giá trị thay đổi thì ta có thể thấy thay đổi trực tiếp trên màn hình (DOM re-render), do đó ta truyền giá trị của object `state` vào hàm `reactive` được import từ `vue`
- Ở thuộc tính `double` ta muốn nó có giá trị gấp đôi của count, và gần như phản xạ tự nhiên ta nghĩ ngay tới `computed` - thứ mà  ta đã quen từ Vue 2 khi muốn có 1 biến với giá trị phụ thuộc vào biến khác. Và để sử dụng `computed` trong composition API thì ta đơn giản là import vào từ thư viện `vue`
- Cùng với đó ta có function `increment` để tăng giá trị của `state.count` lên 1 đơn vị
- Cuối cùng là ta trả về `state` và `increment`. Sau khi trả về thì các thành phần này sẽ được sáp nhập vào với các thành phần của component đó là `data` và `methods` như ta vẫn thường dùng ở Vue 2
- Cuối cùng ở trên `template` ta sử dụng các thành phần trả về từ `setup` như những gì ta vẫn làm từ xưa xửa xừa xưa :-D

Sau đó thử load lại trình duyệt và xem kết quả nhé

![](https://images.viblo.asia/79ed2722-a6ce-40b0-baee-1130613c5513.gif)

**Chú ý quan trọng**: Tất cả những gì về composition API thì chỉ được dùng ở trong `setup` thôi nhé các bạn. Tức là `reactive` hay `computed` ở bên trên ta dùng là dành cho `setup`. Còn mặc định Vue vẫn có `computed` như Vue của ngày hôm qua nhé :-D. Ví dụ, ta sửa lại code 1 chút như sau:
```html
<template>
  <button @click="increment">
    Count is: {{ state.count }}, double is: {{ state.double }}, triple is: {{ triple }}
  </button>
</template>

<script>
import { reactive, computed } from 'vue'

export default {
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    })

    function increment() {
      state.count++
    }

    return {
      state,
      increment
    }
  },
  computed: {
    triple() {
      return this.state.count * 3
    }
  }
}
</script>
```

Thử load lại trình duyệt và ta cùng xem nhé:

![](https://images.viblo.asia/d1b5ff11-6c0a-49a7-be70-5be470b14d12.gif)

> Các bạn có thể xem những thứ bên trong `setup` là tồn tại ở 1 thế giới riêng, và chỉ khi nào return thì những thành phần return mới được sáp nhập về với thế giới thật là component của chúng ta với những `data`, `methods`, `props`,.... :joy:

Ô nom cứ na na nhau ấy nhỉ? Trông chưa thấy gì đột phá ở đây, Vue 2 cũng làm được đó thôi :-D. Tiếp tục đọc tiếp bài này và ta sẽ cùng giải thích nhé lợi ích toẹt vời của `setup` nhé các bạn.

Tiếp theo ta thử watch giá trị của count và in ra console mỗi khi count thay đổi xem nhé.

Vue composition API cung cấp cho chúng ta `watchEffect` để theo dõi sự thay đổi của 1 biến ngay lập tức. Ta sửa lại code 1 chút như sau:
```html
<template>
  <button @click="increment">
    Count is: {{ state.count }}, double is: {{ state.double }}
  </button>
</template>

<script>
import { reactive, computed, watchEffect } from 'vue'

export default {
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    })

    function increment() {
      state.count++
    }

    watchEffect(() => { // chú ý vào đây
      console.log(state.count)
    })

    return {
      state,
      increment
    }
  }
}
</script>
```
`watchEffect` tự code đã nói lên là nó làm gì rồi đúng không các bạn :). Nó sẽ watch bất kì thứ gì ta định nghĩa ở bên trong. 

Thử load lại trình duyệt và xem kết quả nhé:

![](https://images.viblo.asia/586c2cd4-6a0f-44e7-bca4-091f5f431f1d.gif)

> Ta có thể thấy ngay từ thời điểm ban đầu `count` đã được watch và ta thấy in ra giá trị 0

Ta cũng có thể có nhiều `watchEffect`, mỗi cái sẽ watch 1 số biến cụ thể:
```js
watchEffect(() => {
  console.log(state.count)
})

watchEffect(() => {
  console.log(state.double)
})
```

Note: bên cạnh `watchEffect` composition API cũng có api tên là `watch`, cách hoạt động thì giống hệt với watch ở thế giới bên ngoài mà ta vẫn dùng ở Vue 2.
```js
watch(
      () => state.count,
      (count, prevCount) => {
        console.log(count, prevCount)
      }
 )
```

Các bạn thử thêm đoạn code bên trên và load lại trình duyệt xem nhé. (nhớ import `watch` vào đã nha)

Ố dồi ôi vi diệu quá cơ, Vue 2 cũng có watch rồi đấy thôi, nom vẫn chả có gì đặc sắc. :rofl::rofl:. Tiếp tục đọc bài để tìm xem cái hay ở đâu nhen

Composition API cũng cung cấp cho chúng ta 1 loạt hooks giống như thế giới bên ngoài như: `onBeforeMount`, `onMounted`,  `onBeforeUnmount`, `onUnmounted`,...
```js
import { onMounted, onUpdated, onUnmounted } from 'vue'

const MyComponent = {
  setup() {
    onMounted(() => {
      console.log('mounted!')
    })
    onUpdated(() => {
      console.log('updated!')
    })
    onUnmounted(() => {
      console.log('unmounted!')
    })
  }
}
```

Càng giới thiệu lại càng thấy composition API trông chả khác gì Vue 2 bình thường. `onMounted` thì Vue 2 vẫn có `mounted` rồi đó hây, `onUnmounted` thì ta vẫn có `destroyed` ở Vue 2 rồi mà nhỉ. Có chăng là khác cái tên :rofl::rofl:

## Vấn đề nào với Vue 2 hiện tại?
Những năm gần đây thì Vue đã khá là có số má trong cộng đồng frontend, người sử dụng ngày càng nhiều. Và có rất nhiều project lớn dùng Vue. Lúc này là lúc nảy sinh nhiều vấn đề:
- Các component phức tạp, dài ngoằng rất khó đọc, tính năng thì ốp vào liên tục, mà lắm lúc code có phải của mình viết đâu tìm rất khó. Thứ nữa là kiến trúc của 1 component được tổ chức theo kiểu `options`, giống giống như 1 object. Nào ta có `props`, `data`, `methods`, `computed`,... 1 trường hợp mình gặp thường xuyên và mình tin là các bạn cũng gặp rất nhiều đó là ta có 1 component khá dài và ta muốn tìm hiểu cách hoạt động của 1 chức năng trong component đó: thì nào là đọc `data` xem biến tên là gì, kéo kéo xuống dưới đọc method tính toán dùng biến này, rồi lại kéo kéo kéo xuống đọc `computed` nhận kết quả tính toán tử method kia, xong lại kéooooooooooooooo tiếp xuống `watch` để xem mỗi khi cái `computed` kia thay đổi thì in ra cái gì trên màn hình. Vậy nên nếu code của ta được tổ chức theo `logic` chứ không phải `option` thì sẽ dễ bảo trì hơn nhiều
-  Việc chia nhỏ logic và đem tái sử dụng cho các component không được tốt và sạch sẽ khi số lượng tăng lên nhiều, ví dụ:
    1. Khi ta import nhiều mixin vào 1 component, sẽ có nhiều lúc ta không biết được giá trị của 1 biến là đến từ mixin nào
    2. Nếu mixin mà ta import vào lại có `data` và `method` trùng với những gì đang có trong `component` của chúng ta và hiển nhiên sẽ dẫn tới lỗi. Còn với HOC (high order component) có thể dẫn tới việc trùng lặp về tên các biến trong `props`
    3. Nếu ta dùng HOC thì HOC đó phải có đầy đủ cả `template` và tất cả các thành phần khác như 1 component Vue bình thường, dẫn tới việc thừa thãi trong khi ta chỉ muốn tái sử dụng mỗi 1 method chẳng hạn

Ta cùng xét 1 ví dụ cụ thể nhé. Các bạn cùng xem [component này](https://github.com/vuejs/vue-cli/blob/a09407dd5b9f18ace7501ddb603b95e31d6d93c0/packages/@vue/cli-ui/src/components/folder/FolderExplorer.vue#L198-L404). Phần code logic là toàn bộ những gì nằm trong thẻ `<script>`. Toàn bộ code logic này được chia thành 1 số chức năng, mỗi thành phần liên quan tới chức năng sẽ được tô cùng màu, như ảnh sau:

![](https://images.viblo.asia/08dfd6e5-76b3-4bb0-b12c-4f64d3dccce6.png)

Ở hình trên, ta có thể thấy, với mỗi chức năng, phần logic của chúng được rải rác khắp component. Gặp phải chức năng nào dài + phức tạp, xong lại do ông khác code mà ông ý đã chuyển công ty thì chỉ có kêu trời :joy::joy: 
## Composition API mang tới cho chúng ta điều gì?
Từ những điểm bên trên, Composition API xuất hiện và giải cứu chúng ta:
- Những thuộc tính trả về từ `setup` ta có thể biết rõ ràng chúng đến từ đâu, import từ file nào, kiểu là gì,...
- Các thuộc tính đó có thể có tên tuỳ ý do đó ta không phải lo về việc trùng lặp tên như đã nói ở trên
- Ta cũng không cần tạo hẳn 1 component Vue chỉ cho việc tái sử dụng phần logic (như đã nói ở trên với HOC)
- Ta có thể tổ chức code theo logic rành mạch, nhóm các thành phần của từng chức năng thành từng cụm cụ thể, hoặc tách chúng ra thành 1 file riêng.
- Composition API support rất tốt cho Typescript

Quay trở lại với ví dụ ở phần trước, với composition API ta có thể tổ chức lại code rất quy củ [như sau](https://gist.github.com/yyx990803/8854f8f6a97631576c14b63c8acd8f2e):
![](https://images.viblo.asia/83d97e1e-c004-450a-8f4a-38685e6852f5.png)

Giờ đây các thành phần của 1 chức năng đã được gom nhóm lại, dễ dàng hơn rất nhiều trong việc bảo trì code.

Composition API sẽ được sử dụng cùng với những gì đã có ở Vue 2 hiện tại:
- `setup` sẽ được chạy và trả về giá trị trước hết tất cả các các hooks khác như `beforeCreate`, `created`,....

![](https://images.viblo.asia/a3b7d327-81b9-4193-86fc-a4aeef2fa9bb.png)

- Mọi thứ trong `setup` tồn tại ở 1 thế giới riêng :D, và chỉ những thứ trả về của `setup` mới được truy cập từ thế giới bên ngoài

Bạn hoàn toàn có thể không dùng tới composition API vì đây chỉ là tuỳ chọn nếu ta cần nó. Nhưng mình tin chắc là khi Vue 3 chính thức release mọi người sẽ chuyển qua composition API rất nhiều vì những lợi ích của nó

Nội dung về composition API thì rất là nhiều và mình thấy khá hay, giải quyết được nhiều vấn đề ở Vue 2. Khuyến khích các bạn đọc thêm chi tiết về Composition API [ở đây](https://composition-api.vuejs.org/)

Ở bài này mình sẽ dừng lại ở cách sử dụng một số thành phần cơ bản của Composition API thôi nhé :-D
# Cơ chế xử lý reactive mới
## Vue 2 và một số vấn đề
Ở Vue 2, core cho việc xử lý reactive là thông qua `getter` và `setter` của `Object.defineProperty`. Cơ bản ý tưởng là như sau:
```js
Object.defineProperty(obj, key, {    
    get:function(){
       return value;
    },
    set:function(newValue){
        if(value !== newValue){
           value = newValue;
          notifyThatValueHasChanged()
        }
    }
});
```
Với cách setup này, mỗi khi ta thay đổi một thuộc tính nào đó của `obj` thì ngay lập tức sẽ có thông báo tới các thành phần liên quan tới biến này để chúng update. Việc này sẽ xảy ra với những ta khai báo ở `data` tại thời điểm component được khởi tạo, và cũng chính là cách `Vue.set` hoạt động.

Với việc sử dụng `Object.defineProperty` dẫn tới một số vấn đề như sau:

1. Cập nhật giá trị trong mảng:
```js
<div v-for=""name in names>
Hello World
</div>

data(){
  return {
    names:[]
  }
}

this.names[0] = 'John Elway'
console.log(this.names) // đã có giá trị
```

Ở đoạn code trên mặc dù `this.names` đã có giá trị nhưng ta sẽ không thấy thay đổi trên màn hình, hay nói cách khác là DOM không re-render

Để khắc phục tình trạng này ta phải gọi `this.$forceUpdate()` hoặc dùng `Vue.set`:
```js
Vue.set(this.names, 0, 'John Elway')
```
Thật tuyệt vời nếu như trong lúc đầu óc đang quay cuồng thì ta quên mất điều này, sau đó 1 tuần sau mới thấy lỗi. Giời cứu :rofl::rofl:

2. Thêm một thuộc tính vào object
```js
<div>
My name is {{ user.name }}, I'm {{ user.age }}
</div>

data(){
  return {
    user: {
        name: 'James'
    }
  }
}

this.user.age = 24
console.log(this.user) // đã có giá trị
```
Đây chắc là trường hợp rất hay gặp phải khi ta thêm mới 1 thuộc tính và object, và sau khi thuộc tính này thay đổi thì không thấy có gì thay đổi theo trên màn hình, vì thuộc tính kia được thêm vào bên ngoài `data`. Các giải quyết lại là gọi `this.$forceUpdate()` hoặc dùng `Vue.set`
```js
Vue.set(this.user, 'age', 24)
```
Và lại thật tuyệt vời nếu vừa cãi nhau với người yêu đầu óc đang rối bời làm sao cuối tuần rủ em đi chơi mà lại vẫn phải nhớ tới gọi `Vue.set` :rofl::rofl:
## Proxy
Ở Vue 3 cơ chế xử lý reactive đã được thay thế hoàn  toàn bằng [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

Việc dùng Proxy cho xử lý reactive sẽ khắc phục được tất cả các vấn đề trên (có vấn đề mới nào xuất hiện hay không thì chưa biết :-D ). 

Nãy giờ nghe quảng cáo nhiều quá rồi, show hàng cái coi :stuck_out_tongue_winking_eye:. Chúng ta mở lại file `App.vue` và sửa lại code như sau nhé:
```html
<template>
  <div>My name is {{ user.name }}</div>
  <div v-if="user.age">I'm {{ user.age }}</div>
  <button @click="user.age = 24">
    Set age
  </button>
  <button @click="user.age++">
    Increase age
  </button>
</template>

<script>
export default {
  data () {
    return {
      user: {
        name: 'James'
      }
    }
  },
}
</script>
```
Sau đó mở lại trình duyệt và xem thử kết quả như mình là ok rồi nhé ;):

![](https://images.viblo.asia/e2a59b57-b68b-46fb-9978-7e0da07ecc30.gif)

Nếu ở Vue 2 mà ta làm như trên, thì ta có click mòn chuột cũng không thấy có gì thay đổi trên màn hình, mặc dù nếu `console.log` ra thì đã thấy có user `age`. Và ta lại phải nhớ để dùng `$forceUpdate` hoặc `Vue.set`

Nhưng như các bạn thấy, ở Vue 3 chúng ta đã không cần quan tâm tới điều đó, thích thêm thuộc tính nào cứ cho vào tẹt bô, và chúng sẽ tự động reactive. Mở ra một tương lai tươi sáng với không `$forceUpdate` và `Vue.set`. Chíu chíu pằng pằng :boom::boom::heart_eyes::heart_eyes:

# Typescript support
Vài năm trở lại đây mình thấy mọi người dần nhận ra Javascript thuần có nhiều điểm hạn chế đó là Javascript thuần không có cơ chế kiểm tra kiểu dữ liệu khi ta code, và điều này dẫn tới nhiều vấn đề như sau:
- Lỗi về dữ liệu chỉ được phát hiện khi project đã lên sóng
- Dev phải dùng `console.log` e-vờ-ri-where để check xem biến này trả về gì, kiểu là gì,... Đặc biệt với những phần code không phải do ta viết.
- 1 năm sau xem lại project thì lại tiếp tục console.log everywhere tiếp :joy::joy:.
- Khi project có nhiều người, to hơn thì vấn đề này lại càng nhức nhối và mình để ý thì thật sự điều này tưởng nhỏ nhưng tổng lại chiếm khá nhiều thời gian trong toàn bộ qua trình phát triển phần mềm. 
- Cùng với đó là dẫn tới nhiều ức chế vì không hiểu sao dữ liệu không đúng :joy:

Và Typescript xuất hiện để giải quyết tất cả các vấn đề trên. Typescript (TS) hiểu đơn giản là Javascript nhưng có check kiểu dữ liệu khi sử dụng. Và mình thấy bằng việc sử dụng Typescript thì cảm giác lúc code như kiểu có 1 người hướng dẫn mình nữa vậy, vì IDE như VSCode support cực mạnh cho TS (vì TS và VSCode đều là hàng của Microsoft cả). 

Nếu bạn nào đã từng code React hoặc React Native sẽ thấy bên đó họ có hệ thống types cực mạnh và chặt chẽ, code Typescript rất sướng :D

*Lại bắt đầu lân la quảng cáo đấy :stuck_out_tongue_closed_eyes::stuck_out_tongue_closed_eyes:*

Quay trở lại với chủ đề chính, Vue 3 đã được thiết kế lại 100% từ đầu và viết bằng Typescript toàn bộ. Do đó nếu các anh em nào sử dụng Typescript cho project VueJS của mình thì sẽ hưởng lợi rất lớn, giờ đây code Vue ta sẽ có người thầy chỉ đường cho từng dòng code trước, kiểm tra kiểu, check lỗi cú pháp,...Chắc chắn sẽ giảm đi được nhiều thời gian debug và tăng năng suất làm việc.

Những ai không dùng Typescript thì vẫn được support tận tình nhé vì VSCode giờ thông minh lắm, bạn viết JS thuần vẫn có gợi ý đầy đủ (tất nhiên không bằng TS được :))

> Dùng Vue 2 cũng có support typescript nhưng mình cảm giác kiểu support hơi "nửa mùa" :rofl::rofl:

Hiện tại theo mình thấy thì hầu như toàn bộ hệ sinh thái của Vue đang được update để tích hợp với Vue 3 và toàn bộ đều được viết bằng Typescript hết: vue-router, vuex, vue cli, ...

Một thứ tuyệt vời và tiến bộ như vậy, lại còn tăng hiệu quả công việc tại sao lại không thử nhỉ hỡi những người anh em thiện lành :raised_hands:
# Suspense
Một ý tưởng tuyệt vời từ bên React nay ta cũng sắp sửa được trải nghiệm ở Vue 3 đó là component `Suspense`.

`Suspense` là tạm dừng render component chính của chúng ta, thay vào đó hiển thị 1 nội dung khác, và cho tới khi nào component chính  của chúng ta được download về nếu đó là async component (lazy load) hoặc cho tới khi nào hoàn thành một công việc async nào đó ở trong `setup` 

Ví dụ ta muốn lấy toàn bộ danh sách users về và hiển thị trên màn hình, nhưng thường thì ta không muốn hiển thị màn hình trắng vì việc load danh sách users có thể lâu, mà ta thường muốn hiển thị  một cái gì đó thể hiện là dữ liệu đang được tải về (icon loading chẳng hạn). 

Cùng xem qua một ví dụ nhé, quay trở lại với code thôi nào :-D.

Chúng ta tạo mới component tên là `UserList.vue` với nội dung như sau:
```html
<template>
  <table>
    <tr>
      <th>No.</th>
      <th>Name</th>
    </tr>
    <tr v-for="(user, index) in users" :key="index">
      <td>{{ index + 1 }}</td>
      <td>{{ `${user.name.title}. ${user.name.first} ${user.name.last}` }}</td>
    </tr>
  </table>
</template>

<script>
  async function getUsers() {
    let response = await fetch('https://randomuser.me/api/?results=5000')
    let data = await response.json()
    return data.results
  }

  export default {
    async setup() {
      const users = await getUsers()
      return { users }
    }
  }
</script>
```
Ở đây các bạn thấy nội dung ta khá đơn giản: lấy về thông tin 5000 users, công việc này được thực hiện trong `setup()`, và cuối cùng là hiển thị nội dung bằng 1 `table`

Sau đó ta quay lại `App.vue` và sửa lại nội dung như sau:
```html
<template>
  <div>List Users</div>
  <Suspense>
    <template #default>
      <UserList />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script>
import UserList from './UserList.vue'

export default {
  components: {
    UserList
  }
}
</script>
```
Giải thích:
- Ở đây các bạn có thẻ thấy ta dùng 1 component tên là `Suspense` bao lấy phần nội dung mà ta muốn "chờ", thẻ này được mặc định support ở Vue 3 giống như các thẻ dạng `transition` vậy, ta không cần import nó.
- Bên trong thì ta có 2 phần `template` được đánh dấu `#default` và `#fallback` tương ứng cho component chính ta muốn hiển thị và nội dung hiển thị trong lúc chờ component load.

Cuối cùng quay lại trình duyệt và xem kết quả nhé:

![](https://images.viblo.asia/cecdef46-5bb4-4274-bd56-c5226ecdbdf1.gif)

Vue 3 cũng cung cấp cho ta 1 hook đó là `onErrorCaptured` để bắt lỗi nếu trong quá trình xử lý các tác vụ async trong `setup()` xảy ra lỗi, các bạn sửa lại code 1 chút như sau nhé:
```html
// App.vue
<template>
  <div v-if="error">
   {{ error }}
  </div>
  <Suspense v-else>
    <template #default>
      <UserProfile />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script>
import { onErrorCaptured, ref } from 'vue'

setup () {
  const error = ref(null)
  onErrorCaptured(e => {
    error.value = e
    return true
  })}
  return { error }
</script>

// UserList.vue
...
async function getUsers() {
    let response = await fetch('https://randomuser.me/api/?results=50')
    let data = await response.json()
    throw new Error('This is error') // thêm vào duy nhất dòng này
    return data.results
}
...
```
Sau đó thử load lại trình duyệt và ta sẽ thấy như sau:
![](https://images.viblo.asia/5c1632bb-e35f-4926-ab43-00ac1cf5ef20.png)

> Ở trên mình có dùng `ref`, `ref` ở đây gần giống `reactive`. Đọc thêm về `ref` [ở đây](https://composition-api.vuejs.org/#api-introduction) nhé 

Tổng hợp lại, thì mình thấy đây là một component "khá ổn", biết tận dụng sẽ giúp ta có UI tốt hơn, bắt được lỗi/ ngoại lệ, tránh trường hợp lúc chạy dính lỗi và hiển thị màn hình trắng xoá. Lắm lúc dùng `v-if` để làm điều này mà ngay cả cái điều kiện trong `v-if` cũng dính lỗi luôn :joy::joy:

# Teleport
Vue 3 cũng support sẵn cho chúng ta component `Teleport` hay thường được biết đến với tên gọi `Portal` (bạn nào dùng React chắc rõ :-D). Mục đích là để render nội dung ra bên ngoài ứng dụng Vue.

Khi ta code Vue, tất tần tật mọi thứ để sẽ được render ở trong thẻ `<div id="app">` Vậy nếu có khi nào ta muốn render nội dung ra bên ngoài phạm vi thẻ `<div id="app"` thì sao? Lúc đó ta lại phải viết code Javascript `createElement...` rồi `document.body.appendChild...`, việc này khá là dài dòng, không trực quan đặc biệt là khi nội dung ta  muốn render nhiều nội dung ra bên ngoài.

Ở Vue 3 ta sẽ có `Teleport` để "dịch" chuyển nội dung ta viết bên trong Vue ra bên ngoài phạm vi của nó.

Quay trở lại với code, ta sửa lại file `App.vue` như sau:
```html
<template>
  Vue component
  <Teleport to="#target">
    <div>
        Hello from Teleport
    </div>
  </Teleport>
</template>

<script>
export default {

}
</script>
```
Ở trên ta dùng thẻ `Teleport` để bao ngoài nội dung ta muốn "dịch chuyển" ra bên ngoài, dùng thuộc tính `to` để chỉ đích danh muốn dịch chuyển nội dung của ta đi đâu.

Sau đó ta mở file `index.html` và sửa lại như sau:
```html
<link rel="stylesheet" href="/dist/main.css">
<div id="app"></div>
 <div id="target"></div> <!-- Đây là nơi ta Teleport vào -->
<script src="/dist/main.js"></script>
```
Cuối cùng load lại trình duyệt và ta sẽ thấy như sau:

![](https://images.viblo.asia/b96dd083-b083-4068-9b7b-f8b141c579b7.png)

Mở Devtool các bạn có thể thấy nội dung của ta đã được render bên ngoài thẻ `<div id="app">` là ứng dụng Vue của chúng ta.

Một trong những ví dụ cụ thể mà mình thấy `Teleport` hữu ích đó là việc tạo `tooltip`:

![](https://images.viblo.asia/b8dbfeb3-9f8c-4b46-980e-0eecaaa209da.png)

Khi component của ta có kích cỡ bị giới hạn, nên việc render tooltip trong phạm vi của component sẽ dẫn tới việc tooltip bị che khuất:

![](https://images.viblo.asia/e4355371-e7f4-45fd-a8e3-9e161fd3076f.gif)

Do đó ta sẽ muốn hiển thị nó ở hẳn bên ngoài ứng dụng Vue và ta sẽ có thể tuỳ ý căn chỉnh vị trí hiển thị hợp lý nhất 

# Global Mounting
Ở Vue 2 khi muốn cài các thư viện thì ta thường dùng `Vue.use`:
```js
import Vue from 'vue'
import Library from 'somelibrary'

Vue.use(Library)

new Vue({
  render: h => h(App),
}).$mount('#app')
```


Nhưng ở Vue 3 ta sẽ cài như sau:
```js
import { createApp } from 'vue'
import App from './App.vue'
const myApp = createApp(App)
myApp.use(/* plugin name */)
myApp.use(/* plugin name */)
myApp.use(/* plugin name */)
myApp.mount('#app')
```
Ở trên ta cài các thư viện vào đối tượng `myApp`, chỉ đích danh là "tôi muốn cài các thư viện này cho `myApp` thôi". Không như ở Vue 2 ta cài vào đối tượng `Vue` global. Điều này giúp bảo vệ ứng dụng Vue của chúng ta khỏi các thư viện/plugin bên thứ ba, tránh việc chúng có thể làm thay đổi đối tượng Vue global - đặc biết hay dính phải khi dùng `mixins` :-D
#  Hiệu năng
Vue 3 được thiết kế lại từ đầu và có lẽ vì thế Evan có nhiều cơ hội để cải thiện những điều chưa hợp lý từ phiên bản 2.,  những điều đó gồm:
-  Bỏ qua các tính toán trong quá trình update DOM nếu như 1 node không có "con" nào (hay đơn giản là 1 thẻ không có thẻ con nào)
- Tối ưu render slot và update các nội dung liên quan tới slot đó
- Detect những node nào chứa toàn nội dung không bao giờ thay đổi thì để làm hằng số, không thực hiện tính toán trên đó và re-render lại nữa.
- ...
Cùng một số điểm cải thiện khác các bạn có thể xem [ở đây](https://docs.google.com/presentation/d/1yhPGyhQrJcpJI2ZFvBme3pGKaGNiLi709c37svivv0o/edit#slide=id.g42acc26207_0_148)

Và với những cải tiến trên Vue 3 có tốc độ nhanh **gấp 2** Vue 2 hiện tại, và **gấp  3** với server side rendering. Thời gian khởi tạo component, thời gian compile code đều được giảm xuống đáng kể. Cùng với đó là cũng giảm đáng kể size của build file (như mình đã nói ở đầu bài)

# Vue-router, vuex,...

Các thư viện khác trong hệ sinh thái của Vue cũng đang được update để tích hợp với Vue 3, cùng với đó là thêm vào 1 số cải tiến, các bạn có thể tìm [ở đây](https://github.com/vuejs/rfcs)
# Hàng nóng
Evan You (creator of VueJS) mới post một thông báo sáng nay chi tiết phiên bản đầu tiên khi bước vào RC-stage, các bạn đọc [ở đây](https://github.com/vuejs/rfcs/issues/189) nhé, nhiều cái hay lắm luôn. ;)

Thời gian gần đây Evan cũng phát triển 1 tool mới tên là `Vite` link [ở đây](https://github.com/vitejs/vite). Tool này cũng na ná giống `vue-cli` để tạo và chạy project VueJS, nhưng có một đặc điểm là load cực kì nhanh mỗi khi ta cập nhật code.  :rocket::rocket:

Và................. pằng pằng chíu chíu :boom::boom::fireworks::fireworks:

Ta đã có thể xem document cho Vue 3, các bạn có thể truy cập ở đây:

https://v3.vuejs.org/

(hiện tại đang ở giai đoạn Beta nên chắc vẫn còn cập nhật nhiều nhé)
# Tổng kết
Lại một bài nữa viết về Vue với tâm trạng háo hức, vì lâu rồi không viết gì cả, và háo hức để chờ ngày được chính thức dùng Vue 3 mục sở thị xem đầy đủ còn những điều gì hay ho.

Mong rằng qua bài này các bạn có thể thấy được những gì đang đón chờ để được chúng ta sử dụng trong phiên bản tiếp theo của Vue.

Về lần cập nhật này mình thấy có khá nhiều điểm giống React: `watchEffect`, `Teleport`, `Suspense`, `onErrorCaptured` (na ná componentDidCatch). Evan you cũng chia sẻ là nhiều cập nhật trên Vue 3 được lấy ý tưởng từ React, nhưng cá nhân mình thấy chúng toàn là những điểm hay, cộng thêm bản chất cute sẵn có của Vue thì Vue 3 sẽ là 1 điều rất đáng mong chờ <3

Mình tin là với phiên bản mới này thì cộng đồng VueJS sẽ còn tăng mạnh hơn nữa bởi những gì mà Vue mang lại: tính dễ học, code dễ đọc và hiệu năng cao.

Nếu có gì thắc mắc cứ comment bên dưới cho mình được biết nhé. Chúc mọi người ngủ ngon :first_quarter_moon_with_face: