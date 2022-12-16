Mình đã làm nhiều dự án về VueJS rồi , và mình nhận thấy là có rất nhiều thủ thuật triển khai trong VueJS mà nếu như mình bắt tay ngay từ lúc giai đoạn đầu của dự án thì mọi thứ sẽ tốt hơn về sau này. Nếu không càng về sau mình sẽ càng phải tốn khá nhiều thời gian ngồi refactor lại đấy. Và tới nội dung chính các phần mình muốn chia sẻ thôi :D , lưu ý là bài viết này dành cho những bạn đã có những kiến thức nền tảng của Vue rồi nhé những bạn mới học Vue thì mình nghĩ nên bookmark lại chưa cần thiết phải đọc bài này.

## Sử dụng Vuex trước khi quá muộn

Nếu bạn đang xây dựng một dự án trung bình tới lớn thì mình nghĩ sẽ có rất rất nhiều resource để quản lý chưa kể là mình sẽ phải làm việc với nhiều dữ liệu khác nhau giữa các components khác nhau , mình nghĩ việc đó sẽ khá là khó khăn và rắc rối và kiểu gì đó những đoạn code của bạn sẽ bị lặp lại nếu bạn quản lý không tốt. Đôi khi nó còn khiến gây ra bugs vì sự phụ thuộc giữa các components quá nhiều.

Bởi vậy Evan You đã tạo ra Vuex để đồng hành cùng Vue.
Vuex không cần thiết cho một dự án nhỏ hoặc là làm việc liên quan tới dữ liệu ít. Nhưng đối với các dự án tầm trung trở lên nó thật sự cần thiết. Từ ngày dùng Vuex các dự án mình là mình thấy bớt đau đầu hơn :D

## Hiểu về component 1 chút

### Static Components

Từ Vue 2 chúng ta có thể sử dụng cái gọi là thành phần tĩnh ưu điểm của nó là nhanh và nhẹ. Các thành phần đó thường không có trạng thái hoặc dữ liệu bên trong và thường được hiển thị 1 lần . Điều này cho phép các thành phần chức năng như vậy cực kỳ nhanh. Để sử dụng tính năng này bạn có thể sử dụng [v-once](https://vuejs.org/v2/api/#v-once) trong các thẻ mà bạn muốn hiển thị 1 lần.

```html
// Example
<span v-once>This will never change</span>
```

### Potential Confusion

Lúc mới học vue mình được biết trong 1 component mình sẽ định nghĩa các thuộc tính ở trong `data`, các thuộc tính tính toán ở trong `computed` và các phương thức ở trong `methods` và lúc gọi mấy thứ đó chúng ta chỉ cần duy nhất `this` . Đôi lúc mình tự hỏi liệu như thế này liệu thi thoảng có bị nhầm lẫn hay không kiểu như thay vì `this.methods` hay `this.property` thì không phải là `this.type.thing` ( `this.methods.methodName` )

Thực ra mọi thứ mình định nghĩa ở trong thành phần đó nó chỉ đơn giản là ở mức `Định nghĩa` thôi còn thực sự những thứ mà chạy ở các phương thức thuộc tính đó thì Vue đã lắp ráp lại các `data` , `methods`, `computed`, v.....v ở một thành phần khác rồi . Và để thuận tiện nó đều ánh xạ tới root của component 

## Rerender Component

Thi thoảng một vài trường hợp chúng ta sẽ cần render lại component của mình :-? Và hãy thử nghĩ xem 1 chút bạn sẽ làm cái đó theo cách nào ?
Mình sẽ liệt kê các cách để bạn làm điều đó 

- Tải lại trang =)))))) ( Cách tệ nhất )
- Sử dụng Hack v-if ( Cách tệ gần nhất )
- Sử dụng ForceUpdate ( Cách tốt )
- Thay đổi giá trị của khóa ( Cách tốt nhất )

### Tải lại trang ??
Ok điều này đồng nghĩa với việc bạn cần khởi động lại máy tính của bạn mỗi khi bạn muốn đóng một ứng dụng . Cá nhân mình nghĩ nó sẽ hoạt động thôi =)))) Tuy nhiên đó là một giải pháp khá tệ 
Thật sự không có nhiều điều để nói về cái này.
Đừng làm như thế.
No 
No 


### HACK V-IF

Vue đi kèm với `v-if` sẽ hiển thị thành phần khi nó `true` . Nếu nó `false` , thành phần sẽ hoàn toàn không tồn tại trên DOM
Ví dụ dưới đây là cách sử dụng `v-if` để rerender

```html
<template>
  <my-component v-if="isRender" />
</template>
```
Và trong script chúng ta sẽ có nextTick =))

```javascript
<script>
  export default {
    data() {
      return {
        isRender: true,
      };
    },
    methods: {
      forceRerender() {
        // Xóa my-component khỏi DOM
        this.isRender = false;
        
        this.$nextTick(() => {
          // Add my-component lại
          this.isRender = true;
        });
      }
    }
  };
</script>
```

Và những gì xảy ra ở đoạn code trên nhỉ 
- Đầu tiên isRender được đặt thành `true` , do đó `my-component` được hiển thị 
- Khi mình gọi forceRerender mình lập tức đặt `isRender` thành false
- `my-component` lúc này được gỡ bỏ trên DOM vì `v-if` bây giờ là `false`
- Khi chạy tới nextTick ( bạn nào chưa biết về nextTick có thể tham khảo bài này [Vue Nextick](https://viblo.asia/p/vuenexttick-la-cai-gi-1Je5EvLjKnL) ) thì mình sẽ đặt lại thành `true`
- Lúc này `v-if` có giá trị là true vì vậy nó sẽ render lại `my-component`

Có 2 thứ quan trọng mình muốn các bạn biết về cách trên 
- Thứ nhất , đó là chúng ta phải đợi nextTick
- Thứ hai đó là Vue sẽ tạo ra một thành phần hoàn toàn mới khi chúng ta render lại lần thứ 2. Vue sẽ destroy cái thành phần đầu tiên và tạo cái mới ???? Điều đó có nghĩa là gì nhỉ . À đúng rồi =))) điều đó đồng nghĩa với việc `my-component` sẽ trải qua tất cả các vòng đời của nó lại . Thực ra thì theo mình đây không phải là một giải pháp hay mình gọi nó là `HACK V-IF` tại vì cách này là chúng ta đang hack xung quanh những gì mà Vue muốn chúng ta làm. Vì vậy thay vào đó `hãy làm những gì vue muốn chúng ta làm`

### Force Update
Đây là một trong 2 cách tốt nhất để giải quyết vấn đề này, và cả hai đều được Vue khuyên là nên dùng =))))) 
Thông thường Vue sẽ tự động cập nhật lại trên Vue nếu có thay đổi  nào đó , và khi chúng ta gọi `forceUpdate` chúng ta có thể làm cho nó update lại
Khoan đã

...

Vue đã tự động cập nhật khi mọi thứ thay đổi rồi thì tại sao chúng ta force Update lại ????
Lý do là vì đôi khi hệ thống reactivity của vue  nó không hoạt động được nhé =)))) Hiểu rõ hơn các bạn có thể đọc bài [Này](https://vuejs.org/v2/guide/list.html#Caveats)
Vì vậy nếu cần cập nhật lại component dùng cách này sẽ tốt hơn 2 cách trên =))))
Lưu ý là : forceUpdate nó chỉ cập nhật lại view thôi nhé :-? [Tham khảo thêm về nó](https://github.com/vuejs/vue/issues/7395#issuecomment-355721554)

### KEY - Best solution

Đây là cách tốt nhất trong tất cả các cách 
Mình sẽ gán 1 thuộc tính `key` vào component để Vue biết rằng một component được gắn với một phần dữ liệu cụ thể. Nếu `key` giữ nguyên nó không thay đổi component, nhưng nếu `key` thay đổi, Vue biết rằng nó sẽ xóa đi component cũ và tạo một component mới.
=))) Chính xác những gì chúng ta cần rồi nhỉ
Nhưng trước tiên mình sẽ cần đề cập một chút về Key và tại sao chúng ta lại dùng nó

Mình giả sử chúng ta dùng `v-for` để load ra dữ liệu 1 array objects
Nếu chúng ta sort cái array đó hoặc sửa nó theo bất kỳ cách nào thì chúng ta cần rerender lại cái list đó nhỉ . Nhưng bạn sẽ không muốn render lại mọi thứ liên quan tới list đó mà chỉ là những thứ thay đổi thôi

Để Vue biết được những gì đã thay đổi và những gì chưa có , mình sẽ nhét thuộc tính `key` sử dụng `index`

```javascript
const people =  [ 
  { name :  'Nguyen Van A' , age :  22  } , 
  { name :  'Van B' , age :  44  } , 
  { name :  'Van C' , age :  33  } , 
] ;
```

Và chúng ta dùng v-for kết hợp với key index
```html
<ul>
  <li v-for="(person, index) in people" :key="index">
    {{ person.name }} - {{ index }}
  </li>
</ul>
```

```
// Outputs
Nguyen Van A - 0
Van B - 1
Van C - 2
```

Giờ mình ví dụ mình sẽ xóa `Van B` đi output lúc này sẽ là
```
// Outputs
Nguyen Van A - 0
Van C - 1
```

Chỉ số liên quan tới `Van C` đã được thay đổi mặc dù `Van C` vẫn là object đó thôi nhưng vấn đề là index của `Van C` đã thay đổi và sẽ được render lại.
Vì vậy ở đây chúng ta cần một `unique id` nó kiểu kiểu như sau 
```javascript
const people =  [ 
  { id: 'unique-1', name :  'Nguyen Van A' , age :  22  } , 
  { id: 'unique-2', name :  'Van B' , age :  44  } , 
  { id: 'unique-3', name :  'Van C' , age :  33  } , 
] ;
```

Ở ví dụ dùng index trên khi ta xóa `Van B`
Vue sẽ xóa `Van B`, `Van C` và render lại 1 `Van C` khác. Khi chúng ta dùng unique id bây giờ Vue nó biết rằng nó có thể giữa lại `Nguyen Van A` và `Van C` chỉ cần xóa `Van B` thôi.

Rất là optimize phải không
Cuối cùng đó là sử dụng `key` để rerender component

```html
<template>
  <my-component :key="idCom" />
</template>
```

```javascript
export default {
  data() {
    return {
      idCom: 0,
    };
  },
  methods: {
    forceRerender() {
      this.idCom += 1;  
    }
  }
}
```

OK Done =)))) Trên là cách tốt nhất ròi nhỉ

## Multiple Root Node

Mình đoán các bạn đôi khi sẽ gặp cái lỗi gọi là `Đéo tìm thấy node cha` =))) khi compile
Kiểu thế này 
```html
<template>
  <div>Node 1</div>
  <div>Node 2</div>
</template>
```

Và chúng ta sẽ fix bằng cách cho 1 thẻ `div` vào

```html
<template>
  <div>
    <div>Node 1</div>
    <div>Node 2</div>
  </div>
</template>
```

Nếu nó không ảnh hưởng gì thì không sao nhưng nhiều trường hợp mình không nên có 1 cái root node hay nôm na là mình cần nhiều root node =)) ( như liên quan tới css, table ) v....v
Thì cần có giải pháp :-?  ( Mấy cái này thì Vue 3 hình như là ok rồi nhé chả qua là Vue 2 đổ xuống thì dính thôi huhu )
Như React sẽ có `React Fragment`

```javascript
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```
Ok vậy VUE Chúng ta có gì nào 
[vue-fragment](https://github.com/y-nk/vue-fragment) =)))

```javascript
// Use
import { Plugin } from "vue-fragments";
Vue.use(Plugin);
```

```html
<template>
  <v-fragment>
    <div>Fragment 1</div>
    <div>Fragment 2</div>
  </v-fragment>
</template>
```

## Validate dữ liệu dễ dàng với Vuelidate

Đã có những dự án mình làm việc là chỉ làm với form thôi rất nhiều form, và việc validate dữ liệu là vô cùng cần thiết ( Cả server và client ) 
Và có 1 thư viện khá là hay mình rất là thích đó là [Vuelidate](https://vuelidate.js.org/)
Cái này mình thấy rất là nên dùng vì nếu mình validate bằng tay lúc chưa làm thì thấy form & logic nó đơn giản lắm
Nhưng khi mình validate cho form bằng tay thì bắt đầu sẽ thấy nó lằng nhằng dần dần lại thành ác mộng cũng nên =))))
Các bạn có thể tham khảo sample validate tại [đây](https://vuejsdevelopers.com/2018/08/27/vue-js-form-handling-vuelidate/)

## Sử dụng events hơn là callbacks

Khi chúng ta làm việc với components cha con , hẳn sẽ có những chỗ cần tương tác dữ liệu giữa cha với con và ngược lại. 
Có hai cách phổ biến để chúng ta làm 
- Sử dụng callback functions in props
- Sử dụng events
Ở đây mình không so sánh khác biệt giữa 2 thằng nhưng cá nhân mình thì thích sử dụng events hơn ở 2 lý do 
- Nó là sự tách biệt rõ ràng giữa "những thứ component con nhận được" và "những thứ component con gửi cho component cha"
- Mình thấy theo chuẩn ở các ví dụ và Vue document thì hầu hết đều sử dụng events để tương tác từ component con tới cha

Minh họa về việc sử dụng Callbacks và Events như mẫu dưới đây
```javascript
// child-component.vue
// Callbacks
export default {
  props: ['onActionSubmit', ...]
  methods() {
    handleAction() {
      if (typeof this.onActionSubmit === 'function') {
        this.onActionSubmit(data);
      }
    }
  }
}
```

```javascript
// parent-component.vue
<child-component :onActionSubmit="actionSubmit" />
```

Ở trên là hướng sử dụng callbacks còn dưới là sử dụng events

```javascript
// child-component.vue
export default {
  methods() {
    handleAction() {
      this.$emit('action-submit', data);
    }
  }
}
```

```javascript
<child-component @action-submit="actionSubmit" />
```

## Tái sử dụng transitions

Transitions trong vue là thứ mình thấy khá là thích vì cách dùng đơn giản và hiệu ứng đẹp
Cách đơn giản nhất để sử dụng có thể kể tới ví dụ sau

```html
<template>
  <div id="app">
    <button v-on:click="show = !show">
      Toggle
    </button>
    <transition name="fade">
      <p v-if="show">hello</p>
    </transition>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      show: true
    };
  }
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
```

Tuy nhiên nếu viết thế này thì mình khó tái sử dụng được có thể mình sẽ phải viết ở mọi chỗ như thế thì mệt lắm 
Ở đây mình sẽ encapsulated cái transition này thành 1 components kiểu như này 

```html
<template>
  <transition name="fade">
    <slot></slot>
  </transition>
</template>
<script>
export default {
  
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
```

Và bên app mình chỉ cần gọi như này 

```html
 <div id="app">
    <button v-on:click="show = !show">
      Toggle transition
    </button>
    <fade-transition>
      <div v-if="show" class="box"></div>
    </fade-transition>
  </div>
```

Rồi trông có vẻ ổn hơn rồi đấy, nhưng nếu như mình muốn dùng mode khác thì sao hoặc mình muốn bind property vào thì sao tất cả các thằng khác đều ảnh hưởng à ???
Câu trả lời là không =)) mấy cái đó chúng ta sẽ truyền bên nơi gọi tới components thôi 
Còn trong transition component chúng ta chỉ cần bỏ `$attrs` hoặc `$listeners` vào để resolve vấn đề

```html
<template>
  <transition name="fade" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </transition>
</template>
<script>
export default {};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
```

Bên ngoài app sẽ gọi 

```html
 <div id="app">
    <button v-on:click="show = !show">
      Toggle transition
    </button>
    <fade-transition mode="out-in">
      <div v-if="show" class="box"></div>
    </fade-transition>
  </div>
```

## Load route động

Với những bạn thường xuyên làm việc với Vue thì chắc không lạ gì thằng [vue-router](https://router.vuejs.org/) Thằng này giúp mình định tuyến các đường dẫn để dẫn tới từng component. Đối với những bạn sử dụng VUE CLI để tạo project thì thường nó hay hỏi là mày có muốn cài vue-router vào không

### Vấn đề của routes.js ???

Mình cũng làm vài dự án liên quan tới vue và sử dụng vue-router, mình gặp cái vấn đề đó là trong file routes mình định nghĩa từng route 1, route này trỏ vào component này , .... Dần dần cái file routes đó nó bắt đầu phình to các bạn cũng có thể hiểu là 1 dự án bình quân có 5 6 resources Tính mỗi resources thôi là chúng ta cứ phải mất 1 CRUD Routes cho nó. Đấy là mình còn chưa nói các route không phải là crud. Và vấn đề này làm mình thực sự ức chế và mất khá nhiều thời gian =))) để tìm 1 route nào đó và rất là rối mắt

### Giải pháp

Từ cái vấn đề trên mình mới tham khao được giải pháp khá là hay và mình sẽ chia sẻ với các bạn . Đầu tiên chúng ta đang muốn việc load routes nó phải tự động đồng nghĩa là cái cấu trúc thư mục của mình nó phải theo 1 chuẩn nhất định. Vì 1 route bao gồm path , component , rồi dynamic params do vậy thư mục của mình cũng nên đặt theo chuẩn để logic load routes nó đơn giản hơn và cũng là giúp cho dự án trông gọn gàng hơn

Thường mình biết sẽ có 2 kiểu chia thư mục

#### Kiểu chức năng - Functionality
- Kiểu này thì struct sẽ bao gồm 1 thư mục chức năng components ( chứa tất cả file components ) , 1 thư mục chức năng của router ( chứa tất cả các router file theo resources ) , 1 thư mục chứa vuex ( chứa các store api của resources )
#### Kiểu tính năng - Feature
- Kiểu này thì chúng ta coi mỗi resources sẽ là 1 tính năng và mình sẽ để trong 1 thư mục resource đó, thư mục này sẽ bao gồm từ Components, Route, Store Vuex

Ở bài viết này mình sẽ demo load routes theo cấu trúc tính năng cấu trúc thư mục sẽ trông giống như sau
```
/src
  |
  ---/modules
         |
         ---/user
              |
               ---User.vue
               ---routes.js
               ---store.js
            /event
              |
               ---Event.vue
               ---routes.js
               ---store.js
            /job
              |
               ---Job.vue
               ---routes.js
               ---store.js
```
Và đây là cách mình triển khai trong tệp routes.js

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Auth from '@/components/Auth';

Vue.use(Router);

// Other routes
let routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'auth',
    component: Auth
  },
];

// Import toàn bộ file routes
function loadRoutes() {
  const context = require.context('@/modules', true, /routes.js$/i)
  return context.keys()
    .map(context) // import module
    .map(m => m.default)
}

// hàm load Routes trên sẽ trả về cho chúng ta 1 mảng resources routes và mình sẽ lặp mảng này và push vào mảng routes 
const resourceRoutes = loadRoutes();
resourceRoutes.forEach((route) => {
  routes.push(route[0]);
});

export default new Router({
  mode: 'history',
  routes,
})
```

Viết tới đây cũng dài dài rồi hẹn gặp lại vào P2 nhé các bạn :)