# 1. Đặt vấn đề
 Trong quá trình phát triển ứng dụng, có rất nhiều những functions hay datas bạn muốn sử dụng lại nhiều lần. Hãy tưởng tượng nếu bạn cứ vứt những đoạn code có chức năng tương tự nhau ở khắp mọi nơi, rồi đến 1 ngày đẹp trời bạn phải update lại logic cái function đó hay thay đổi 1 đoạn text nào đó và phải đảm bảo logic sẽ k bị miss ở bất cứ chỗ nào thì sẽ mệt mỏi ntn :stuck_out_tongue_winking_eye: . Chưa kể sau này lại vài lần thay đổi nt nữa :thinking: . Vì vậy cần 1 nơi để chứa những thứ nt ngay lúc này, nếu các bạn code PHP sẽ k khỏi xa lạ vs những Helper or  Config file thì với Vuejs, Mixins kì diệu tương tự. Let start!
 # 2. Sử dụng
 ## 2.1 Khởi tạo
Mixin là 1 Obj có thể chứa toàn bộ các options của 1 component (**data,methods,hooks**...)
```javascript
// define a mixin object
var myMixin = {
   data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  },  
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}
```
## 2.2 Khai báo
Có 2 cách để sử dụng `myMixin` đã định nghĩa ở trên kia đó là Local & Global .
### Local Mixin
Inject trực tiếp Mixin vào component mà bạn muốn sử dụng Mixin đó. Cách này khuyến khích nên sử dụng còn lí do vì sao mình sẽ giải thích ở dưới.

```javascript
// define a mixin object
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// define a component that uses this mixin
new Vue({
  mixins: [myMixin]
})  
```
### Global Mixin
Inject cho toàn bộ ứng dụng, cách này k khuyến khích lắm vì nó sẽ affect đến toàn bộ các thực thể VUE đc tạo ra, kể cả 3-party component => nên sử dụng **Local Mixin**.  Chỉ nên sử dụng global Mixin để xử lí các thay đổi tùy chọn của từng component như trong vd dưới. 

```javascript
// inject a handler for `myOption` custom option
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})
new Vue({
  myOption: 'hello!'
})
// => "hello!"
```
# 3 Option Merging
Như các bạn đã thấy 1 Mixin có thể chứa toàn bộ các options của 1 component nên sau khi đc inject vào component nó sẽ tự động merge các options vào component đó. Trường hợp trùng key thì component giành chiến thắng tức nó sẽ ghi đè lại giá trị ở **Mixin**. Đặc biệt vs **hook functions** thì thứ tự run sẽ là Mixin-> Component. Cùng nhìn vd dưới đây để hiểu rõ hơn nhé.

##### Merge Data Option Demo: 
```javascript
var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    console.log(this.$data)
    // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})
```

##### Merge Hook Functions Demo:
```javascript
var mixin = {
  created: function () {
    console.log('mixin hook called')
  }
}

new Vue({
  mixins: [mixin],
  created: function () {
    console.log('component hook called')
  }
})

// => "mixin hook called"
// => "component hook called"
```

##### Merge Methods Demo:
```javascript
var mixin = {
  methods: {
    foo: function () {
      console.log('foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log('bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  }
})

vm.foo() // => "foo"
vm.bar() // => "bar"
vm.conflicting() // => "from self"
```
# Kết luận
Mình hay viết các function xử lí thường dùng hay các option config text  trong Mixin sau đó inject vào component khi cần thiết. K phải viết đi viết lại 1 function để dùng ở nhiều chỗ nữa. Khá là tiện phải k nhỉ. Nếu bạn có góp í gì vui lòng để lại bình luận phía dưới giúp mình. Cảm ơn nhé :wink::wink::wink::wink:.