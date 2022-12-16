Xin chào các bạn mình quay lại rồi đây tiếp nối bài [Một số tip tricks về VueJS (P1)](https://viblo.asia/p/mot-so-tip-tricks-ve-vuejs-p1-gAm5ybWDKdb) thì bài này sẽ là phần 2. Vào thẳng bài viết luôn nhé :D 

## Passing Multiple Props
Mình không biết là phần frontend các bạn code tay hay dùng thư viện gì . Nhưng cá nhân mình là thằng chuyên backend thì rất lười code "css" =))) Và tiện nhất là mình hay sử dụng các Vue UI Library để giải quyết. Mình dùng cũng được mấy thằng rồi như kiểu Vuetify , Vue Framework7 , Vuesax, mình để ý là mấy thằng đó nó có kiểu dùng components đi kèm với nhiều props ( mục đích chắc là để tái sử dụng lại component đó 1 cách thoải mái thôi ) 
Giống kiểu vuetify về 1 cái button

```html
<v-btn
  color='primary'
  small
  outline
  block
>
  Something
</v-btn>
```

Ok ở trên các bạn có thể để ý đến là nó có 4 props [color, small, outline, block]
Mình nhìn tưởng như tiện gọn và custom thoải mái lắm rồi, nhưng =))) sẽ thế nào bạn sử dụng cái nút đó nhiều nơi trên hệ thống bạn, có phải là các props sẽ lặp đi lặp lại như thế không :-? chưa kể là nếu mình sửa 1 props thì mấy thằng còn lại cũng phải sửa nếu muốn chúng đồng bộ. Và đây chỉ là cái nút thôi nhé nếu các bạn dùng mấy thằng UI library thì nó còn nhiều components khác với nhiều options khác.
Đây là cách mình hay làm đó là
mình sẽ tạo lấy 1 file js kiểu
buttonProps.js

```javascript
export const props = {
     color: 'primary'
     small: true
     outline: true
     block: true
}
```

Rồi ở bên Vue Component file dùng kiểu
```html
<template>
  <v-btn v-bind='props'>
    someThing
  </v-btn>
</template>

<script>
  import { props } from './buttonProps.js';

  export default {
    data: () => ({ props })
  }
</script>
```

Như các bạn thấy là mình dùng v-bind nó sẽ hỗ trợ bind nhiều props lên :-? giờ mình muốn thay đổi thuộc tính của cái nút nào đó chỉ cần sửa lại ở đúng 1 nơi duy nhất thôi.
Đối với `Render` 

```javascript
// Render
import { props } from './buttonProps.js';

export default {
  render: h => h(
    'v-btn',
    { props },
    'someThing'
  )
};

```

## Do something on page load
Thường thì đôi khi mình sẽ gặp những cái case kiểu như 
làm 1 cái gì đó khi tải trang ví dụ như fetch dữ liệu về là 1 cái điển hình 
Và thường thì chúng ta sử dụng `mounted hook` của Vue đúng không. Phần này mình sẽ nói rõ hơn về cái lifecycle của nó nhé.
Ở Vue thì cái lifecycle của nó gồm 4 phần chính như sau trong 1 component
- Created
- Mounted
- Updated
- Destroyed

Theo mình hiểu thì đầu tiên thằng `created` được tạo ra lúc này thì trên page mình đã có mọi thứ như data , computed, watcher, có tất cả nhưng thiếu DOM =)))))) <br/>
Tới thằng `mounted` thì nó bắt đầu gán component của mình vào DOM đơn giản vậy thôi . Còn thằng `updated` thì support cho phần reactive data changes  với `destroyed` thì hủy mọi thứ khi không cần nữa =)) 
Vậy để sử dụng các hook này giải quyết bài toán đầu thì đơn giản thôi mình có thể chọn created hoặc mounted . Cách sử dụng thì chỉ cần thêm tên hook vào kiểu như

```javascript
export default {
  created() {
    console.log('Component created!');
  },
   mounted() {
    console.log('Component mounted!');
  }
};
```

Tuy nhiên thì mình sẽ nói thêm là 2 thằng thằng nào nên dùng trong trường hợp nào và thằng nào tốt hơn :-? 
Trong hầu hết các trường hợp thì mình thấy thường sử dụng mounted () vì lúc này component được gắn lên dom rồi bạn tùy ý thao tác gì đó trước khi nó render ra kể cả là thao tác lên DOM ( chứ không chỉ fetch dữ liệu nhé ) . Giống như bạn muốn thao tác DOM nhưng lại viết trong created thì lỗi là đúng rồi =)) OK thế nói như thế khác gì bảo thằng `created` bị phế à ?? <br/>?
### NO 
trong trường hợp bạn không thao tác DOM gì cả bạn chỉ muốn fetch dữ liệu về cập nhật vào data thôi thì mình khuyên nên dùng created tại vì nó là thằng chạy trước mounted vì thế việc fetch dữ liệu về nó xong trước đấy :-? có nghĩa là bạn sẽ nhận dữ liệu trả về sớm hơn 1 chút. Đấy là mình khuyên thế thôi còn không ai bảo là dùng mounted cho fetch dữ liệu là sai :v

## Dynamic directive arguments
Mình nhớ không nhầm thì Vue 2.6 nó hỗ trợ mình directive arguments . Nôm na là chúng ta có thể sử dụng động các event như click dblclick hover v.....v mọi event mà được áp dụng trong 1 thành phần.
ví dụ nhé mình có 1 cái nút này
```html
<button @click="show">Test</button>
```
Ở đây các bạn có thể thấy mình có 1 cái nút 1 event click và bấm vào nó sẽ chạy function show 
Tuy nhiên có ví dụ là giả sử như mình muốn có 1 event khác kiểu dblclick trên cái nút đó cũng chạy function show . Và tùy vào 1 điều kiện nào đó thì cái nút sẽ enable hoặc là `@click` hoặc là `@dblclick` . Thì giải quyết thế nào nhỉ :-? <br/>
Thì như mình nói ở trên Vue 2.6 nó support mình directive arguments
tức là chúng ta có thể viết theo kiểu sau

```javascript
data: () => ({
    something: "click",
}),
methods: {
    show() {
      console.log(1);
    }
}
  ```
  Ở button thì nó sẽ kiểu như sau
  
  ```html
<button @[something]="show">Test</button>
```

Đó chỉ vậy thôi =)) Bạn có thể sử dụng something làm 1 computed để validate theo điều kiện nào đó hoặc giờ chỉ cần thay đổi 
```javascript
this.something = 'dblclick'
```
Thì sự kiện ở cái nút nhận vào chỉ có `dblclick` thôi

## Functional Component
Có những lúc mình làm việc sẽ có 1 vài component chỉ để mục đích là hiển thị dữ liệu thôi, trường hợp này để cải thiện về tốc độ render cũng như hiệu suất bộ nhớ thì mình khuyên nên sử dụng functional component về cơ bản đây là component stateless nó sẽ không có thẻ script nó chỉ nhận `props` để thực hiện hiển thị dữ liệu mà thôi. 
```html
// User.vue
<template functional>
  <h1>{{ props.name }}</h1>
  <p>{{ props.email }}</p>
</template>
```

```html
// index.vue
<template>
  <user v-bind="{ name: 'Duong Trung Hieu', email: 'example@gmail.com' }" />
</template>

<script>
import User from './user';

export default {
  components: {
    User
  }
}
</script>
```

## Provider / Consumer
Như mình nói ở trên phần Functional Component nó sẽ chỉ hiển thị dữ liệu dựa vào cái này mình có thể sử dụng kết hợp với 1 component khác chạy js ( điều đó có nghĩa là mình sẽ tách biệt logic ra không viết chung cả markup lẫn logic vào 1 component, việc này mình gặp khá nhiều đôi khi cũng dễ ngáo vì có thể 1 file component thôi cũng hơn nghìn dòng ). Những trường hợp muốn tách ra thì sử dụng `Provider / Consumer pattern`. Consumer sẽ là functional component , mình sẽ ném logic vào Provider.
ví dụ để triển khai

```html
// Provider.vue

<template>
  <div>
    <slot v-bind="{ state, actions }" />
  </div>
</template>

<script>
export default {
  computed: {
    state() {
      return {
        label: 'button',
      };
    },
    actions() {
      return {
        click: this.click,
      };
    },
  },
  methods: {
    click() {
      console.log('Clicked');
    },
  },
}
</script>
```

```html
// Consumer.vue

<template functional>
  <div>
    <p>{{ props.state.label }}</p>
    <button @click="props.actions.click">CLICK</button>
  </div>
</template>
```

```html
// App.vue
<template>
  <provider v-slot="{ state, actions }">
    <consumer v-bind="{ state, actions }" />
  </provider>
</template>

<script>
import Provider from './Provider.vue';
import Consumer from './Consumer.vue';

export default {
  components: {
    Provider,
    Consumer,
  },
};
</script>
```