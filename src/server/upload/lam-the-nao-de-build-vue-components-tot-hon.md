Hầu như rất ít người ban đầu dự định viết Vue components dạng open-sourced. Chúng ta thường bắt đầu viết các components cho chính mình - đến khi gặp vấn đề, ta mới quyết định giải quyết nó bằng cách building một component.  Nhưng ta lại muốn giải quyết những vấn đề tương tự ở nhiều vị trí trong code, vì vậy ta sử dụng component của mình rồi cấu trúc lại một xíu để có thể tái sử dụng ở nhiều nơi trong project. Vẫn chưa hài lòng, ta muốn dùng nó trong một dự án khác và bắt đầu chuyển nó thành một package độc lập. Ơ ! Sao ta lại không chia sẻ điều này với mọi người nhỉ? Thế là chúng ta viết component dạng open-source.

Một mặt, thật hữu ích khi có các components open-source có sẵn ngày càng nhiều cho bất kỳ ai code với Vue (có thể search "Vue" tại [npmjs.com](https://www.npmjs.com/search?q=vue) với hơn 12000 packages).

Mặc khác, vì hầu hết các components này phát triển từ những trường hợp cụ thể và không phải tất cả chúng ta, ai cũng đều có kinh nghiệm designing components để tái sử dụng trên nhiều môi trường, nhiều component này không "hoạt động tốt" với Vue.

"Hoạt động tốt" ở đây nghĩa là gì? Tức là dễ dàng mở rộng và tích hợp vào bất kỳ loại ứng dụng nào.

Để tạo một Vue component hoạt động tốt, cần:
1. Thực hiện tương thích v-model
2. Minh bạch trong events
3. Gán attributes vào đúng element
4. Định mức trình duyệt để điều hướng keyboard
5. Sử dụng các event ưu tiên hơn callbacks
6. Giới hạn trong component styles

## Thực hiện tương thích v-model

Đối với các components, về cơ bản là các form-cho dù nó autocompleting trường search, calendar date, hoặc bất kỳ trường gì khác cho phép người dùng nhập liệu-một trong những cách quan trọng nhất support v-model.

Theo [Vue Guide on components](https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components) , v-model trong component hoạt động bằng cách pass value vào một prop và sử dụng input event handler.

![](https://images.viblo.asia/5ec59acb-6702-410d-ad78-6bdbce0e852e.png)

Ví dụ, nếu implementing một date picker bọc một input, ta sẽ khởi tạo datepicker sử dụng value của prop và khi select sẽ emit một event input, cụ thể như sau:

```
import datepicker from 'my-magic-datepicker';

export default {
  props: ['value'],
  mounted() {
    datepicker(this.$el, {
      date: this.value,
      onDateSelected: (date) => {
        this.$emit('input', date);
      },
    });
  }
}
```

## Minh bạch trong events

Để implement v-model, các components cần implement các input event. Nhưng đối với các event khác thì sao? Những event như click, keyboard handling, ...? Trong khi event gốc là HTML, nhưng xử lý event của Vue không theo mặc định.

Ví dụ, đoạn code sau sẽ không hoạt động nếu ta không làm gì đặc biệt

```
<my-textarea-wrapper @focus="showFocus">
```

Nếu chúng ta code trong component bao bọc nó sẽ emit event focus, trình xử lý event showFocus sẽ không bao giờ được gọi. Tuy nhiên, Vue cung cấp cho ta một cách để truy cập trình "listeners" được lập trình để áp dụng cho một component, vì vậy chúng ta có thể gán $listeners vào đúng nơi.

Thứ hai, lý do rõ ràng: điều này cho phép khi thông qua listeners đến đúng nơi trong component. Ví dụ, với component bọc vùng textarea:
```
<div class="my-textarea-wrapper">
  <textarea v-on="$listeners" ></textarea>
</div>
```

Bây giờ events xảy ra trên textarea đã được thông qua.

## Gán attributes vào đúng elements

Các attributes như rows của texteares hoặc thẻ title để add vào element bất kỳ thì như thế nào?

Mặc đinh, Vue lấy các thuộc tính được dùng cho component và đặt chúng vào element gốc của component đó. Tuy nhiên, nếu chúng ta nhìn lại thẻ div bọc textarea, trong trường hợp này, sẽ hợp lý hơn khi dùng atrribute ở chính textarea hơn là thẻ div.

Để làm điều này, ta không đặt các attribute trong component theo mặc định mà thay vào đó sử dụng attribute trực tiếp trong textarea bằng cách dùng $attrs. Trong JavaScript:

```
export default {
  inheritAttrs: false,
}
```

Và trong template:

```
<div class="my-textarea-wrapper">
  <textarea v-bind="$attrs"></textarea>
</div>
```

## Định mức trình duyệt để điều hướng keyboard

Khả năng truy cập và điều hướng keyboard là một trong những phần thường bị lãng quên nhất của việc phát triển web, và là một trong những điều quan trọng nhất để có được nếu bạn đang viết một component để hoạt động tốt trong hệ thống.

Tại gốc của nó, bạn phải đảm bảo component tuân thủ quy tắc của trình duyệt: phím Tab sẽ cho phép chọn các form, Enter dùng để kích hoạt button hoặc link.

Danh sách đầy đủ các gợi ý điều hướng keyboard cho component  trên trang [W3C](https://www.w3.org/TR/wai-aria-practices/#aria_ex). Thực hiện theo các hướng dẫn này sẽ cho phép component được sử dụng trong nhiều ứng dụng, không chỉ những người chỉ quan tâm đến khả năng truy cập.

## Sử dụng các event ưu tiên hơn callbacks

Khi nói về giao tiếp dữ liệu và tương tác của người dùng từ component đến parents của nó, có hai lựa chọn phổ biến: callback funtions trong props và events. Vì các custom event của Vue không hiện lên như các event trình duyệt gốc, hai event này tương đương về mặt chức năng, nhưng đối với một component có thể tái sử dụng, ta nên sử dụng các event thông qua callbacks. Vì sao?

Trong [episode of Fullstack Radio](http://www.fullstackradio.com/87), thành viên của team Vue, Chris Fritz đã đưa ra những lý do sau:
1. Sử dụng các events làm cho nó rõ ràng mà component parents có thể hiểu được. Nó tạo ra một sự tách biệt rõ ràng giữa "những thứ ta nhận được từ component parent" và "những thứ ta gởi lại cho component parent".
2. Bạn có thể sử dụng trực tiếp biểu thức trong event handlers, cho phép xử lý event cực kì nhỏ gọn trong các trường hợp đơn giản.
3. Nói chính xác hơn là - các ví dụ và tài liệu Vue có xu hướng sử dụng các event để tương tác từ một component đến parent của nó.

May mắn thay, nếu bây giờ bạn đang dùng phương pháp callbacks trong props, việc thay đổi component để emit event khá dễ dàng. Một component sử dụng callbacks trông giống như sau:

```
// my-custom-component.vue
export default {
  props: ['onActionHappened', ...]
  methods() {
    handleAction() {
      ... // your custom code
      if (typeof this.onActionHappened === 'function') {
        this.onActionHappened(data);
      }
    }
  }
}
```

Và nó được gọi lại:

```
<my-custom-component :onActionHappened="actionHandler" />
```

Thay đổi dựa trên event-based sẽ trông như thế này:

```
// my-custom-component.vue
export default {
  methods() {
    handleAction() {
      ... // your custom code
      this.$emit('action-happened', data);
    }
  }
}
```

Và tại parent sẽ thay đổi thành:

```
<my-custom-component @action-happened="actionHandler" />
```

## Giới hạn trong component styles

Cấu trúc single-file của Vue cho phép nhúng trực tiếp các styles vào các component và đặc biệt khi kết hợp với scoping cho ta một cách tuyệt vời để gửi đến các packaged, styled components theo cách này không ảnh hưởng đến các phần khác của ứng dụng.

Do khả năng của hệ thống, việc đưa tất cả các component styles đến component và di chuyển hoàn toàn một component styles thật sự rất dễ dàng. Vấn đề ở đây là: không có styles của ứng
dụng nào giống nhau và chính những thứ làm cho component của ứng dụng trông bắt mắt sẽ khiến nó nổi bật hơn cho người dùng. Và bởi vì component styles thường được includes sau các global stylesheet, nên rất dễ gây ra việc ghi đè.

Để ngăn chặn vấn đề này, các CSS không cần thiết cho cấu trúc component như (colors, borders, shadows,...) nên được loại bỏ khỏi file component hoặc bị vô hiệu hóa. Thay vào đó, hãy xem xét việc di chuyển một phần SCSS có thể tùy chỉnh nội dụng chính của content.

Nhược điểm của việc di chuyển SCSS là nó yêu cầu component kéo SCSS đó vào stylesheet tổng hợp hoặc thấy một unstyled component. Để tận dụng tốt nhất, bạn có thể scope các styles trong file với một class bị vô hiệu hóa thông qua prop mà bạn có thể tùy chỉnh styles. Nếu bạn cấu trúc SCSS của mình dưới dạng mixin, bạn có thể dùng cùng một SCSS mà người dùng có thể custom styles.

```
<template>
  <div :class="isStyledClass">
    <!-- my component -->
  </div>
</template>
```

Và trong JavaScript:
```
export default {
  props: {
    disableStyles: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isStyledClass() {
    if (!this.disableStyles) {
      return 'is-styled';
    }
  },
}
```

Khi đó bạn có thể 

```
@import 'my-component-styles';
.is-styled {
  @include my-component-styles();
}
```

Điều này cho phép tạo styles bên ngoài theo cách bạn muốn, nhưng khi người dùng muốn custom sẽ không cần phải tạo các file ghi đè, họ chỉ cần vô hiệu hóa style bằng cách 
setting thuộc tính disableStyles trong prop thành true và có thể dùng mixin với các setting hay restyle lại hoàn toàn mọi thứ từ đầu.

Trên đây là cách để build Vue component chạy tốt hơn được mình tham khảo từ bài [này](https://vuejsdevelopers.com/2018/06/18/vue-components-play-nicely/). Hy vọng sẽ giúp ích cho các bạn đang và sẽ xài Vue js. :D