Lần trước mình có nói qua về các ví dụ sử dụng Computed property trong VueJS. Hôm nay mình chuyển hướng sang nói về Mixins nhé.

![Mixin](https://images.viblo.asia/7249469b-48d2-4d54-8990-8a04487eb1ad.jpg)


Khi dự án VueJS của bạn ngày càng lớn, thì việc lặp lại code ở data, methods, watchers, ... trong các components xảy ra rất thường xuyên. Và chắc hẳn bạn đã có lần tìm cách biến hoá component để nó có thể dùng được trong nhiều tình huống nhất có thể bằng cách truyền vào props và custom nó. Nhưng nếu càng ngày càng có nhiều yêu cầu, thì component đó sẽ phình to ra, và sử dụng rất nhiều các props mới đáp ứng được như cầu => các này không còn hiệu quả nữa.
# Mixins
Và những bất cập này, chắc chắn đội ngũ phát triển VueJS đương nhiên sẽ biết, và họ đưa ra khái niệm Mixins để giải quyết nó. Mixin objects có thể được sử dụng cho bất cứ thứ gì trong component, từ data, methods, watches, computed properties cho đến các hook methods như mounted, destroyed, ... và khi một component sử dụng mixin, thì tất cả thông tin của mixin object sẽ được mix vào với component. Component sẽ được truy cập vô tất cả những gì mà mixin đã khai báo, và sử dụng nó như là được khai báo trong chính component đó.

Thử xem ví dụ sau để rõ hơn:
```
// mixin.js file
export default {
   data () {
      msg: ‘Hello World’
   },
   created: function () {
      console.log(‘Printing from the Mixin’)
   },
   methods: {
      displayMessage: function () {
         console.log(‘Now printing from a mixin function’)
      }
   }
}

// -----------------------------------------------------------

// main.js file
import mixin from ‘./mixin.js’
new Vue({
   mixins: [mixin],
   created: function () {
      console.log(this.$data)
      this.displayMessage()
   }
})
// => "Printing from the Mixin"
// => {msg: ‘Hello World’}
// => "Now printing from a mixin function"
```

Như bạn thấy đấy, sau khi dùng mixin, component có hết tất cả data từ mixin, nó nó có thể truy cập tới những data đó giống như là được khai báo trong chính nó. Bạn cũng có thể định nghĩa mixin bằng cách sử dụng biến thay vì chia ra những file riêng lẻ.
Và thật ra tất cả những gì cần biết về mixin chỉ có vậy. Mình có thể kết thúc tại đây =)) Nhưng mà thôi, bài vẫn chưa đủ dài, nên mình sẽ đưa ra thêm một ví dụ khác để các bạn nắm rõ hơn nhé.

## Điều gì sẽ xảy ra nếu trong component đã khai báo cái mà trong mixin cũng có?
Khi đọc những điều trên, chắc hẳn bạn cũng sẽ nghĩ đến việc này, có thể nghĩ nó sẽ bị conflit khi mà trong mixin đã có data, methods tên vậy rồi, mà trong component mình cũng có cái cùng tên như vậy. Nhưng nếu có xảy ra điều này, thì nó sẽ tự động merge 2 cái lại với nhau, và những cái mình khai báo trong component sẽ được ưu tiên hơn. Ví dụ, nếu có `title` nằm trong data của cả component và mixin thì this.title nó sẽ trả về giá trị được định nghĩa trong component:

```
// mixin.js file
export default {
   data () {
      title: ‘Mixin’
   }
}

// -----------------------------------------------------------

// main.js file
import mixin from ‘./mixin.js’
export default {
   mixins: [mixin],
   data () {
      title: ‘Component’
   },
   created: function () {
      console.log(this.title)
   }
}
// => "Component"
```

Và ví dụ khác

```
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

Nếu là hook funtions mà cùng tên, thì nó sẽ được merge lại 1 array, vì vậy nên tất cả sẽ được gọi. Và mixins hooks sẽ được gọi trước component hooks

```
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

Còn các options khác, được khai báo như là 1 object (vd: methods, components, directives) thì nó sẽ được merge chung lại thành 1 object. Và options của component luôn được ưu tiên hơn nếu cùng keys

```
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

## Global mixin
Bạn cũng có thể sử dụng global. Có nhiều trường hợp bạn cần đến nó nếu như có options nào đó mà cần dùng ở hầu hết các components. Nhưng nếu bạn sử dụng global mixin, nó sẽ có tác động đến tất cả các Vue instance. Vì vậy nên cẩn thận khi sử dụng: 
```
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

# Kết luận
Khi ứng dụng phình to lên, hoặc có nhiều component có điểm chung, các bạn nên dùng mixin kết hợp với slot trong Vue để viết code được rõ ràng hơn và tránh lặp lại nhiều. Nếu các bạn áp dụng đúng, thì code sẽ sạch đẹp hơn rất nhiều đấy.

Cám ơn đã theo dõi nhé :D