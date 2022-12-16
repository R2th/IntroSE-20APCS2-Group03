Ở bài lần trước thì chúng ta đã tìm hiểu được một vài khái niệm đơn giản khi mới bắt tay vào tìm hiểu về Vuejs như là 
* Cấu trúc thư mục
* Single File Components
* Binding data
* Directive
* Methods

Nếu ai chưa đọc bài viết trước của mình thì có thể tìm xem lại ở [đây](https://viblo.asia/p/vuejs-va-nhung-kien-thuc-cho-nguoi-moi-bat-daup1-RQqKL03pK7z#_methods-5) nhé.  Ở bài viết lần này thì mình xin tiếp tục giới thiệu cho các bạn một vài các tính năng cơ bản khác trong Vuejs mà chúng ta cần phải biết.

> Chú ý là ở bài viết này mình sử dụng `src/components/HelloWorld.vue` để thay đổi code.

### Computed
Trước tiên thì chúng ta cần phải biết `computed` này là gì mà tại sao lại sinh ra thuộc tính này. Các bạn có thể hiểu nôm na `computed` là nó giống với các dữ liệu ở trong `data` nhưng khác ở điểm là `computed` được thể hiện dưới dạng phương thức hoặc một object chứa các phương thức getter và setter. Và cách gọi đến một `computed` thì cũng giống như là chúng ta gọi đến các thuộc tính bình thường khác.  
Đọc qua chút khái niệm trên thì ắt hẳn chúng ta sẽ có những suy nghĩ  là tại sao mà không dùng các thuộc tính như bình thường đi lại còn sinh ra `computed` làm gì thì chúng ta cần xem qua ví dụ sau
```html
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```
 Chúng ta có thể thấy là trong đoạn code trên để xử lí đảo ngược lại dữ liệu sau khi in ra. Trông khá là rắc rối nhỉ, hay tệ hơn nữa là chúng ta sẽ cần in ra đoạn code này nhiều lần hơn nữa. Thì code chúng ta sẽ bị lặp lại mà lại khó có thể kiểm soát mà bảo trì. Giả sử chúng ta in ra 10 chỗ câu lệnh như trên, yêu cầu khách hàng thay đổi, họ không muốn đảo ngược dữ liệu nữa mà họ muốn in ra theo kiểu in hoa thì chúng ta phải sửa lại nhiều chỗ rất dễ chúng ta bỏ qua một số trường hợp, khó bảo trì. Vì vậy `computed` sinh ra như một vị cứu tinh trong chuyện này.  Chúng ta vào `src/components/HelloWorld.vue` và sửa lai như sau
 ```html
<template>
  <div id="computed">
    <p>Original message: {{ message }}</p>
    <p>Computed message: {{ reverseMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      message: 'Hello everyone'
    }
  },
  computed: {
    reverseMessage: function() {
      return this.message.split('').reverse().join('')
    }
  }
}
</script>

<style scoped>
</style>
```
Kết quả 
```
Original message: Hello everyone

Computed message: enoyreve olleH
```
Ở đây thay vì chúng ta viết logic trong `template` thì chúng ta sẽ viết logic trong thuộc tính `computed`, trông cũng khá giống với `methods` các bạn nhỉ. Mình sẽ có phần so sánh giữa `computed` và `methods` ở phía dưới.

#### Computed Setter
Mặc định thì `computed` chỉ có getter, chúng ta cũng có thể setter khi cần thiết. Ví dụ chúng ta tạo ra một `computed` là `fullName` để in ra tên đầy đủ.
```html
<template>
  <div id="computed">
    <p>Fullname: {{ fullName }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      firstName: 'Quang',
      lastName: 'Phu'
    }
  },
  computed: {
    fullName () {
      return `${this.firstName} ${this.lastName}`
    }
  }
}
</script>

<style scoped>
</style>
```
Kết quả in ra đơn giản chỉ là `Fullname: Quang Phu`. Nhưng giờ chúng ta không muốn in ra như vậy chúng ta muốn in ra dữ liệu khác thì sao, đây là lúc cần sử dụng đến `setter`. Ví dụ  bạn thay đổi code trong đoạn `script`
```javascript
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      firstName: 'Quang',
      lastName: 'Phu'
    }
  },
  computed: {
    fullName: {
      get () {
        return `${this.firstName} ${this.lastName}`
      },
      set (fullname) {
        this.firstName = fullName.split(' ')[0]
        this.lastName = fullName.split(' ')[1]
      }
    }
  }
}
</script>
```
Ở phương thức `set` ở trên thì các bạn có thể thấy mình đang truyền một tham số vào, các bạn có thể đặt tên khác tùy thích. Cái biến này được truyền vào với ý nghĩa là khi chúng ta thay đổi cho `computed` thì nó sẽ lưu cái giá trị mới đó vào tham số, trong trường hợp này là `fullName`. Và nếu giá trị `fullName` thay đổi thì `firstName` và `lastName` sẽ cập nhật theo
<br>
Để hiểu hơn về luồng hoạt động, chúng ta thêm 1 chút alert như sau
```html
<template>
  <div id="computed">
    <p>Fullname: {{ fullName }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      firstName: 'Quang',
      lastName: 'Phu'
    }
  },
  computed: {
    fullName: {
      get () {
        alert("Assembling full name...");
        return `${this.firstName} ${this.lastName}`
      },
      set (fullname) {
        alert("Setting new name: " + fullname);
        this.firstName = fullname.split(' ')[0]
        this.lastName = fullname.split(' ')[1]
      }
    }
  }
}
</script>

<style scoped>
</style>

```
Rồi bạn chạy lệnh `npm run dev` lên để chạy ứng dụng Vuejs nhé. 
<br>
Mắc định khi chạy chương trình lên thì nó sẽ gọi đến cái `alert` ở hàm `get`, mặc định khi chạy `computed` nó sẽ gọi đến hàm `get`. Vậy làm sao để gọi đến `set` đơn giản trong ví dụ này mình sẽ gọi đến 1 sự kiện khi click vào button.
```html
<template>
  <div id="computed">
    <p>Fullname: {{ fullName }}</p>
    <button v-on:click="changeNameSetter">Change Name (setter)</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      firstName: 'Quang',
      lastName: 'Phu'
    }
  },
  methods: {
    changeNameSetter () {
      this.fullName = 'Thu Thuy';
    }
  },
  computed: {
    fullName: {
      get () {
        alert("Assembling full name...");
        return `${this.firstName} ${this.lastName}`
      },
      set (fullname) {
        alert("Setting new name: " + fullname);
        this.firstName = fullname.split(' ')[0]
        this.lastName = fullname.split(' ')[1]
      }
    }
  }
}
</script>

<style scoped>
</style>
```
Đây là ví dụ minh họa đơn giản và dễ hiểu với các bạn newbie để tìm hiểu phương thức `set` trong `computed`.
<br>
Tiếp theo chúng ta sẽ đi phân việt sự khác nhau giữa `methods` và `computed`
### Sự khác nhau giữa methods và computed
Trước tiên như có thể thấy, chúng ta thấy được các `method` và các `computed properties` được khai báo rất giống nhau. Nhưng khi được gọi đến vào sử dụng thì với `method` sẽ có thêm ký tự `()` đằng sau tên phương thức còn `computed` thì không. Chúng chỉ được gọi như các `data` bình thường. Nếu chúng ta cố tình gọi đến `()` trong `computed` ngay lập tức trình duyệt sẽ báo lỗi. Từ điều này chúng ta có thể suy ra các điểm khác nhau mà `computed` được dùng khác với `method`.
* Computed không thể truyền `()` lúc gọi tới, tức có nghĩa là không thể truyền tham số vào.
* Vì không thể truyền tham số vào dẫn tới việc `computed` chỉ dùng để xử lí các biến dữ liệu có sẵn được khai báo trong `data`. 
* `Computed` được cache lại còn `methods` thì không, mỗi lần chúng ta gọi tới `methods` thì các xử lí bên trong của `method` sẽ được chạy lại tính toán lại từ đầu, còn đối với `computed` sẽ sử dụng lại giá trị mà nó được gọi tới lần trước trừ khi dữ liệu bên trong của `computed` thay đổi thì nó mới được chạy lại.

Mình sẽ có ví dụ minh họa về việc `computed` và `methods` khác nhau,
```html
<template>
  <div id="computed">
    <button @click='counterComputed++'>computed button</button>
    <p>{{ counterComputed }}</p> <br/>
    <button @click='counterMethod++'>method button</button>
    <p>{{ counterMethod }}</p> <br/>
    {{ printTextMethod() }}
    {{ printTextComputed }}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      counterComputed: 0,
      counterMethod: 0
    }
  },
  methods: {
    printTextMethod () {
      console.log('counter printed from method:', this.counterMethod)
    }
  },
  computed: {
    printTextComputed () {
      console.log('counter printed from computed:', this.counterComputed)
    }
  }
}
</script>

<style scoped>
</style>
```
Các bạn chạy trình duyệt lên và sẽ thấy sự khác biệt giữa `methods` và `properties`. Các bạn có thể thấy `methods` được gọi bất cứ khi nào chúng ta click vào 2 button kia. Tại sao lại vậy, vì là
* `Methods` không biết là khi nào mà giá trị được sử dụng trong function của nó bị thay đổi nên nó sẽ bị gọi tới bất cứ khi nào khi được click.
* `Computed` biết khi nào mà giá trị chúng sử dụng bị thay đổi nên khi giá trị trong nó bị thay đổi thì nó mới được gọi tới.

#### Khi nào cần dùng methods, computed
**Methods**
* Được dùng khi xử lý một sự kiện nào đó trong DOM
* Khi bạn cần gọi tới các function trong `computed` hay `watchers` khi có điều gì xảy trong `components`
* Khi bạn cần truyền thêm tham số

**Computed**
* Khi bạn cần xử lý dữ liệu có sẵn trong `data`
* Khi bạn cần gọi tới một chức năng nào đó nhiều hơn một lần
* Khi bạn cần tham chiếu đến một giá trị chính xác trong `template`

### Watchers
Bạn có thể hiểu `watchers` sẽ theo dõi sự thay đổi của một đối tượng, khi đối tượng thay đổi `watchers` sẽ xử lý hàm tương ứng. Tác dụng của nó sẽ bao gồm như
* Xử lý bất đồng bộ khi dữ liệu thay đổi,
* Hạn chế số lần thực hiện phương thức khi dữ liệu thay đổi.
* Các thiết lập giá trị ngay lập tức

Trước tiên để tìm hiểu về `watchers` chúng ta tạo trước một ví dụ.
```html
<template>
  <div id="watchers">
    <div>{{ message }}</div>
      <div><button @click="changeMessage">Click me</button></div>
    </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        message: 'Trứng rán cần mỡ'
      }
    },
    methods: {
        changeMessage () {
            this.message = 'Bắp cần bơ'
        }
    }
  }
</script>

<style scoped>
</style>
```
Ở ví dụ trên mình có 1 components hiển thị đoạn message và cho phép bạn thay đổi toạn text đó bằng cách click vào button. Bây giờ bạn muốn xử lí một hành động nào đó khi mà `message` bị thay đổi, giả sử mình `console.log()` ra một đoạn text nào đó. Vì `watchers` theo dõi sự thay đổi của dữ liệu từ đó mà có thể giải quyết một hành động nào đó.
```html
<template>
  <div id="watchers">
    <div>{{ message }}</div>
      <div><button @click="changeMessage">Click me</button></div>
    </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        message: 'Trứng rán cần mỡ'
      }
    },
    methods: {
        changeMessage () {
            this.message = 'Bắp cần bơ'
        }
    },
    watch: {
      message: function (){
        console.log('Yêu không cần cớ, cần cậu cơ')
      }
    }
  }
</script>

<style scoped>
</style>
```
Bạn bật trình duyệt lên rồi click vào button. Kết quả là khi bạn bấm vào button đó, `message` bị thay đổi lập tức gọi đến `watch` và in ra đoạn text.
<br>
Ngoài ra, `watcher` có thể nhận 2 tham số đầu vào với tham số thứ nhất là giá trị mới của dữ liệu còn tham số thứ 2 là giá trị cũ. Cùng thay đổi chút code trong đoạn `script` trên thành
```javascript
<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        message: 'Trứng rán cần mỡ'
      }
    },
    methods: {
        changeMessage () {
            this.message = 'Bắp cần bơ'
        }
    },
    watch: {
      message: function (newValue, oldValue) {
        console.log('Giá trị mới là ' + newValue)
        console.log('Giá trị cũ là ' + oldValue)
      }
    }
  }
</script>
```
Rồi bạn chạy lại chương trình sẽ thấy console in ra giá trị mới và giá trị cũ của `message`.
> Chú ý : Tên của `watcher` phải trùng với tên data đang theo dõi. Ở trong trường hợp này mình đang theo dõi data `message`.

Chúng ta cũng có thể theo dõi sự thay đổi của 1 object.
```html
<template>
  <div id="watchers">
    <div>{{ address.city }}</div>
      <div><button @click="changeMessage">Click me</button></div>
    </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        message: 'Trứng rán cần mỡ',
        address: {
          city: 'Hà Nội',
          village: "Minh Khai"
        }
      }
    },
    methods: {
        changeMessage () {
            this.address.city = 'Hải dương'
        }
    },
    watch: {
      'address.city': function () {
        console.log('City changed')
      }
    }
  }
</script>

<style scoped>
</style>
```
Ở ví dụ trên là mình muốn theo dõi sự thay đổi của biến `city` trong `address`. Bây giờ mình muốn theo dõi toàn bộ các dữ liệu ở trong `address` thì làm như thế nào, cũng rất đơn giản.
```javascript
watch: {
	address: {
		handle(newVal, oldVal) {
			// code của bạn
		},
		deep: true,
	}
}
```
Chúng ta cũng có thể tương tác `watcher` với `computed` như sau 
```html
<template>
  <div id="watchers">
    <div>{{ reverseMessage }}</div>
      <div><button @click="changeMessage">Click me</button></div>
    </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        message: 'Trứng rán cần mỡ'
      }
    },
    methods: {
        changeMessage () {
            this.message = 'Cần cậu cơ'
        }
    },
    computed: {
      reverseMessage () {
        return this.message.split('').reverse().join('')
      }
    },
    watch: {
      reverseMessage () {
        console.log('Computed changed')
      }
    }
  }
</script>

<style scoped>
</style>
```

**Kết luận**
Bài viết lần này cũng khá dài rồi nhỉ, đây là những gì mà mình muốn nói trong bài viết lần này. Ở bài viết tiếp theo mình sẽ tiếp tục tìm hiểu các khái niệm mới hơn về Vuejs nhé.