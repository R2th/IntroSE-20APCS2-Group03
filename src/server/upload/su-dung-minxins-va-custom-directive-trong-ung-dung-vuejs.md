Nếu bạn là một người yêu Vue và đang tìm một cách nào đó để mở rộng ứng dụng Vue của mình, thì bạn đang đọc đúng bài rồi đó :D

Vue [mixins](https://vuejs.org/v2/guide/mixins.html) và [directives](https://vuejs.org/v2/guide/custom-directive.html) là một sự kết hợp hoàn hảo và là một cách tuyệt vời để thêm  những functions có thể tái sử dụng được xuyên suốt ứng dụng của bạn.

Nếu bạn xuất phát là một Object-Oriented Programming (OOP) hoặc có kiến thức căn bản về OOP, bạn sẽ thấy *Vue mixins* giống như các class cha vậy. Bạn cũng sẽ thấy *directives* giống như các helper functions.
Nếu bạn không có kiến thức về OOP, bạn hãy nghĩ *mixins* như là một công cụ hữu ích mà bạn có thể chia sẻ với nhiều những người khác. Thì trong ứng dụng Vue, *mixins* là những phần được chia sẻ để sử dụng trong project của bạn.

![](https://images.viblo.asia/ee1c56a7-0163-44b2-ac23-cb2a72a0ea75.png)

## Mixins

[Tài liệu của Vue](https://vuejs.org/v2/guide/mixins.html) đã giải thích khá đơn giản và dễ hiểu về khái niệm của *Mixins* và chúng hoạt động như thế nào. Theo như tài liệu thì *mixins* là một cách linh hoạt để tách những phần có thể tái sử dụng cho các Vue components. Một *mixin object* có thể được gom vào bất kì phần nào trong component, nó có thể là phần *data*, *methods*, hay *created*,... Khi một component sử dụng một *mixin*, tất cả các phần trong mixin object đó sẽ được "mixed" vào các mục tương ứng trong Vue component. *Methods* của mixin sẽ được mixed vào *methods* của component, *data* của mixin sẽ được gộp chung vào *data* của component,...

Để nói đơn giản hơn, nó có nghĩa là mình tạo một component với *data*, *methods*, *life-cycle* và sau đó có một component khác extends nó.  Nó khác hoàn toàn với việc bạn sử dụng component bên trong component khác, chỗ mà bạn có thể có một custom component với tên kiểu như dưới đây bên trong template của bạn.
```
<vue-custom></vue-custom>
```

Hãy nhìn vào ví dụ cụ thể để dễ hình dung nhé:

Minxin bên dưới đây sẽ là một mixin chứa các config cơ bản của một ứng dụng như là:
- tên ứng dụng
- method để chào mừng
- tên công ty bản quyền phía dưới footer

Mixin của chúng ta sẽ như sau:

```javascript
export const myMixin = {
  data() {
    return {
      title: 'Mixins are cool',
      copyright: 'All rights reserved. Product of super awesome people'
    };
  },
  created: function() {
    this.greetings();
  },
  methods: {
    greetings: function() {
      console.log('Howdy my good fellow!');
    }
  }
};
```

Ok. Đó là một mixin đơn giản và dễ hình dung nhất rồi đúng không? Bây giờ thì chúng ta chỉ việc sử dụng nó trong các component mà chúng ta muốn. Để sử dụng mixin, chúng ta khai báo qua từ khóa "mixins" khi khởi tạo một Vue instance:

```javascript
new Vue({
  mixins: [myMixin],
  el: '#app'
});
```

## Directives
Directives, nói một cách dễ hình dung với Vue-er chúng ta, nó là những methods kiểu như *v-for*, giúp chúng ta có thể tùy chỉnh các element trong template, hay như *v-if* giúp ẩn các element nếu điều kiện không thỏa mãn. Vậy thì nếu chúng ta muốn highlight một message mà sử dụng directive thì chúng ta sẽ dùng method nào? Vuejs tạo ra các directive để chúng ta có thể sử dụng nó một cách thuận tiện, đơn giản, và hoàn toàn chúng ta cũng có thể làm điều này.

Chúng ta có thể đăng ký các global directives để có thể sử dụng chúng ở bất cứ đâu trong ứng dụng Vue của mình. Hoặc ta cũng có thể muốn tạo ra các local directives để sử dụng ở nội tại component. Thật tuyệt vời, đúng không?

Dưới đây là một global directive đơn giản:

```javascript
// Register a global custom directive called `v-highlight`
Vue.directive('highlight', {
  // When the bound element is inserted into the DOM...
  inserted: function(el, binding) {
    // set the colour we added to the bind
    el.style.backgroundColor = binding.value ? binding.value : 'blue';
    el.style.fontStyle = 'italic';
    el.style.fontSize = '24px';
  }
});
```

Và giờ thì nếu bạn muốn sử dụng directive *v-highlight* này để làm nổi bật những câu chữ mà bạn muốn, chỉ cần dùng đơn giản như sau:

```javascript
<template>
  <div>
    <p v-highlight>Hello There!</p>
    <p v-highlight="red">This is a red guy</p>
  </div>
</template>
```

## Summary
Trên đây là 2 phương pháp mình thường dùng và khuyên các bạn nên dùng để tối ưu hóa, cũng như nâng cao cho ứng dụng Vue của mình. Hãy cùng tạo ra những dòng code thật awesome để tạo nên một ứng dụng awesome nhé :D

## References
https://vuejs.org/v2/guide/custom-directive.html
https://vuejs.org/v2/guide/mixins.html
https://blog.logrocket.com/mixins-and-custom-functions-to-enhance-your-vue-applications-693caa7ae76a