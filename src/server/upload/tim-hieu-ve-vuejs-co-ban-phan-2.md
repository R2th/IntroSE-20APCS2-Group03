## Mở đầu:
Ở phần trước, mình đã giới thiệu cho các bạn về cách cài đặt **Vuejs** và vòng đời của một đối tượng trong **Vuejs**. Nay chúng ta cùng đi tìm hiểu tiếp về **Computed property** và **watcher**, **Binding** cho **class** và **style**, **Render** theo điều kiện và theo danh sách.
## Computed property và watcher:
### 1. Computed property:
**Computed property** có thể hiểu là một “thuộc tính được tính toán”. Nó được thể hiện dưới dạng một phương thức hoặc một *object* chứa các phương thức *setter* và *getter*. Thông thường khi chúng ta tính toán các phép toán xử lý đơn giản trong template thì sẽ viết trực tiếp hàm đó trong template bằng cách đặt hàm bên trong cú pháp {{ }}. Nhưng điều này với các phép toán xử lý phức tạp đưa vào template thì nó sẽ trông rất rối và khó bảo trì hơn, khi đó chúng ta cần sử dụng đến **Computed property**.

Cách khai báo sử dụng **Computed property**:
```
<template>
    <div id="my-id">
        Hello world
    </div>
</template>

<script>
export default {
    data () {
        return {
            msg: 'Hello world'
        }
    },
    computed: {

    }
}
</script>
```

Sau đây mình sẽ ví dụ đơn giản về việc xử lý trực tiếp trên template và xử lý qua **Computed property** sẽ như thế nào nhé:
```
<template>
  <div id="my-id">
    <p>Message ban đầu: "{{ msg }}"</p>
    <p>Message in hoa trong template: "{{ msg.toUpperCase() }}"</p>
    <p>Message in hoa trong computed: "{{ convertMessageByComputed }}"</p>
    <p>Message in hoa trong method: "{{ convertMessageByMethod() }}"</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Demo Vuejs'
    }
  },
  computed: {
    convertMessageByComputed: function () {
      return this.msg.toUpperCase()
    }
  },
  methods: {
    convertMessageByMethod: function () {
      return this.msg.toUpperCase()
    }
  }
}
</script>
```
Và đây là kết quả: 
![](https://images.viblo.asia/7e4e3f1e-0c17-4000-b731-d2aa8843a7b4.JPG)
Theo ví dụ của mình, chắc hẳn các bạn cũng có thắc mắc là tại sao chúng ta không sử dụng luôn **methods** mà lại phải sử dụng đến **computed**? Vì những hàm không cần truyền tham số như vậy khi dùng **computed** sẽ được tối đa hiệu năng hơn do có cơ chế **cache** mà khi **render** lại mà không có sự thay đổi thì nó sẽ lấy luôn giá trị trong **cache**.
###  2. Watcher:
**Watcher** trong **Vuejs** được dùng để theo dõi, giám sát  sự thay đổi của dữ liệu và thực thi hành động xử lý tương ứng. Để khai báo **watcher** trong **Vuejs** thì các bạn cần phải tuân thủ 2 nguyên tắc sau:
* Tên của **watcher** phải trùng với tên của *data* cần giám sát.
* Các **watcher** phải được đặt trong *watch scope*.

Ví dụ cú pháp:
```
<script>
export default {
    data: {
        name: 'Nguyen Van Huy'
    },
    watch: {
        name : function () {
            console.log(this.name);
        }
    }
}
</script>
```
### 3.  Thực hiện so sánh computed, watch và methods:

|  | Computed | watch | methods
| -------- | -------- | -------- | --------- |
| Thực hiện khi nào?     | Thuộc tính phụ thuộc thay đổi     | Thuộc tính giám sát thay đổi     | re-render lại trang || -------- | -------- | -------- | --------- |
| Tham số     | Không     | Có     | Có |
| Sử dụng khi nào? | Khi thao tác với dữ liệu mà không muốn tính toán lại | Khi dữ liệu nhiều và thay đổi liên tục | Khi cần 1 hàm thông thường hoặc hàm có quyền tham số |

## Binding cho class và style:
Trong quá trình phát triển *project* của các bạn thì có thể sẽ có lúc các bạn muốn thêm một *class* hay một thuộc tính style vào trong một thẻ *HTML* với một điều kiện nào đó xảy ra. Vì cả *class* và *style* đều là thuộc tính nên chúng ta có thể dùng v-bind để xử lí. **Vue** cung cấp một số tính năng hỗ trợ khi `v-bind` được dùng với class và *style*. Không chỉ có chuỗi, các biểu đạt này có thể xử lí cả *mảng* và *object*.
### 1. Binding class trong HTML:

1. Sử dụng object:

   Ta có thể xét ví dụ sau về **bind** 1 **class** và nhiều **class** sẽ như thế nào nhé:
    ```
    //bind 1 class
   <div v-bind:class="{ active: isActive }">
       Hello world
   </div>
   //bind nhiều class
   <div v-bind:class="{ active: isActive, bold: isBold }">
       Hello world
   </div>
   //Bật tắt active
   <div>
            <button @click="isActive = !isActive">Active text</button>
   </div>
    //Bật tắt bold
   <div>
            <button @click="isBold = !isBold">Active text</button>
    </div>
   ```
   
   Truyền dữ liệu vào như sau:
    ```
   <script>
    export default {
        data() {
            return {
                isActive: true,
                isBold: false
            }
        }
    }
   </script>
   ```
   Bậy giờ chúng ta hãy **style** cho các **class** vừa tạo:
   ```
   <style lang="scss" scoped>
      .active {
          display: none;
      }
      .bold {
          font-weight: bold;
      }
   </style>
   ```
   Như vậy, ở đây ta khai báo giá trị mặc định cho biến `isActive` và `isBold`. Khi click vào các nút **button** khai báo bên trên thì sẽ thay đổi giá trị cho các biến tương ứng.

   Và **Vue** cũng cho phép các bạn truyền 1 **Object** vào bind class như sau:
   ```
   //Bind 1 classObject
   <div v-bind:class="classObjectBind">Hello world</div>
   ```
   Truyền dữ liệu:
    ```
   <script>
    export default {
        data() {
            return {
                classObject: {
                    active: true,
                    bold: false
                  }
            }
        }
    }
   </script>
   ```
2. Sử dụng theo mảng:

   Tương tự với sử dụng Object, sử dụng theo mảng sẽ được khai báo như sau:

   `<div v-bind:class="[activeClass, boldClass]"></div>`
   
   Truyền dữ liệu:
    ```
   <script>
    export default {
        data() {
            return {
                activeClass: 'active',
                boldClass: 'bold'
            }
        }
    }
   </script>
   ```
###   2. Binding cho inline style:
**Binding cho inline style** về cách sử dụng khá giống với **Binding** **class** trong **HTML**, cú pháp rất đơn giản - trông giống như **CSS** thông thường, chỉ khác ở chỗ nó là một **object JavaScript**.

Ví dụ cơ bản như sau:

`<div v-bind:style="{ color: Color, fontSize: fontSize + 'px' }">Hello world</div>`

Truyền dữ liệu:
    
 ```
   <script>
    export default {
        data() {
            return {
                Color: 'green',
                fontSize: 18
            }
        }
    }
   </script>
   ```
   Thông thường ta nên bind vào một Object dành riêng cho style để code của bạn trông gọn gàng hơn. Ví dụ như sau:
   
  ` <div v-bind:style="styleObject"></div>`
  
   Truyền dữ liệu:
    
 ```
   <script>
    export default {
        data() {
            return {
                styleObject: {
                    color: 'green',
                    fontSize: '18px'
                }
            }
        }
    }
   </script>
   ```
   
   Nếu các bạn sử dụng thuộc tính *css* nhiều giá trị thì **Vue** cũng đã hỗ trợ các bạn bằng cách:
   
   `<div v-bind:style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>`

Với trường hợp này, **Vue** sẽ tự động chọn thuộc tính phù hợp với **trình duyệt** bạn đang sử dụng nhé.
## Render theo điều kiện:
Trong 1 dự án lớn nhỏ, chắc chắn các bạn cũng đã từng phải làm đến các câu lệnh điều kiện. Tương tự như vậy, Vue cung cấp cho chúng ta các directive để xét điều kiện và cách thức sử dụng khá giống với các ngôn ngữ lập trình khác mà các bạn đã từng học. Chúng ta cùng đi qua 1 lượt nhé.
### 1. v-if:
   `v-if` là 1 *directive* phải được dùng trên 1 phần tử đơn lẻ ví dụ như  `<div>` ..... giúp chúng ta quản lý việc *render*.
   ```
<template>
    <div>
        <div class="class1" v-if="isActive == True">
            Hello world
        </div>
        <div>
            <button @click="isActive = !isActive">Button</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isActive: true
            }
        }
    }
</script>
```
  
  Theo vú dụ bên trên, chúng ta có thế kiểm tra điều kiện hiển thị của 1 phần tử mà các bạn muốn và các bạn cũng có thể thấy rằng cách thức sử dụng không hề khác so với các ngôn ngữ khác bạn học.
  
###  2. v-else:
Tương tự như `v-if`, *directive*` v-else` này đóng vai trò là một khối **“else”** cho `v-if` và `v-else` phải đứng ngay sau *directive*` v-if` hoặc `v-else-if`. 

   ```
<template>
    <div>
        <div class="class1" v-if="isActive == True">
            Hello world 1
        </div>
        <div class="class2" v-else>
            Hello world 2
        </div>
        <div>
            <button @click="isActive = !isActive">Button</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isActive: true
            }
        }
    }
</script>
```
###     3. v-else-if:
Tương tự như `v-else`, *directive* `v-else-if` đóng vai trò là một khối **“else-if”** cho `v-if` và chúng có thể được dùng nhiều lần nối tiếp nhau.
 ```
<template>
    <div>
        <div class="class1" v-if="count == 1">
            Hello world 1
        </div>
        <div class="class2" v-else-if="count == 2">
            This is block 2
        </div>
        <div class="class3" v-else>
            Hello world 3
        </div>
        <div>
            <button @click="setcount(1)">Show hello world 1</button>
        </div>
        <div>
            <button @click="setcount(2)">Show hello world 3</button>
        </div>
        <div>
            <button @click="setcount(3)">Show hello world 3</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                count: 1
            }
        },
        methods: {
            setcount(count_change) {
                this.count = count_change
            }
        }
    }
</script>
```
### 4. v-show:
*Directive* `v-show` cũng là 1 lựa chọn cho việc *render* theo điều kiện và cách dùng tương tụ như `v-if`.
```
<template>
    <div>
        <div class="class1" v-show="isActive == True">
            Hello world
        </div>
        <div>
            <button @click="isActive = !isActive">Button</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isActive: true
            }
        }
    }
</script>
```
Chúng ta hãy xem thử kết quả sẽ thấy nó trả ra tương tự với `v-if` khi *click* vào nút *button*.

**Vậy tại sao lại có 2 *directive* này trong khi kết quả trả về tương tự nhau?** 

Tại vì *directive* `v-show` sẽ luôn luôn được *render* ra trong **DOM** và chỉ ẩn hiện bằng các thuộc tính **CSS**. Còn `v-if` thì còn tùy thuộc vào điều kiện kiểm tra để *render* ra **DOM**.
## Render theo danh sách(v-for):
*Directive* `v-for` chúng ta dùng để *render* ra danh sách dựa trên 1 mảng, trong các dự án thì chúng ta sẽ sử dụng đến nó thường xuyên.

Chúng ta cùng đi vào ví dụ để các bạn có thể hiểu hơn nhé.
```
<template>
    <div class="test-list">
        <ul>
            <li v-for="student in students">{{ student.full_name }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                students: [
                    { full_name: 'Nguyen Van A' },
                    { full_name: 'Nguyen Thi B' },
                    { full_name: 'Nguyen Van C' },
                    { full_name: 'Nguyen Thi D' }
                ]
            }
        }
    }
</script>
```
Chúng ta có thể `v-for` 1 *object* như sau:
```
<template>
  <div class="test-list">
    <ul>
      <li v-for="(value, key) of student">{{ key }} - {{ value }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      student: {
        name: 'Nguyen Van A',
        age: '20',
        address: 'Ha Noi',
        email: 'email@gmail.com'
      }
    }
  }
}
</script>
```
Các bạn hãy chú ý là `v-for` thứ tự sắp xếp của các tham số sẽ là `(value, key, index)` với `index` là số thứ tự của thuộc tính.
Chúng ta có thể `v-for` với 1 dãy số:
```
<div>
  <span v-for="i in 100">{{ i }} </span>
</div>
```
Và cũng có thể v-for trực tiếp với component như 1 phần tử bình thường:

`<my-component v-for="item in items" :key="item.id"></my-component>`

Để **Vue** có thể nhận ra từng node và nhờ đó có thể tái sử dụng và sắp xếp các phần tử, bạn cần cung cấp một thuộc tính `key` với giá trị độc nhất cho từng *item*.
```
<!-- ở đây ta dùng shorthand `:key` thay vì `v-bind:key` -->
<div v-for="item in items" :key="item.id">
  <!-- nội dung -->
</div>
```
**Vue** khuyến khích sử dụng key bất cứ khi nào bạn dùng `v-for`, trừ phi nội dung **DOM** được duyệt qua quá đơn giản hoặc bạn đang cố ý sử dụng *behavior* mặc định của **Vue** để tăng tốc cho ứng dụng.

### v-for và v-if:
Khi v-for và v-if được sử dụng trên cùng 1 node thì v-for sẽ có độ ưu tiên cao hơn so với v-if và v-if thực thi trên mỗi vòng lặp của v-for làm giảm đi tốc độ xử lý. Hai directive này chỉ nên được sử dụng khi bạn muốn render ra 1 số item theo điều kiện mong muốn của các bạn.

```
<template>
  <div class="test-list">
    <ul>
      <li v-for="student in students" v-if="student.age < 20">{{ student.full_name }} - tuổi : {{ student.age }} </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      students: [
        {
          full_name: 'Nguyen Van A',
          age: '18'
        },
        {
          full_name: 'Nguyen Thi B',
          age: '19'
        },
        {
          full_name: 'Nguyen Van C',
          age: '20'
        },
        {
          full_name: 'Nguyen Thi D',
          age: '21'
        },
      ]
    }
  }
}
</script>
```

Ví dụ trên sẽ chỉ render ra những sinh viên dưới 20 tuổi.

**Các bạn lưu ý rằng Từ bản 2.2.0 trở đi, thuộc tính key là bắt buộc khi dùng v-for với một component.**
## Tổng kết:
Như vậy trong bài này, mình đã giới thiệu cho các bạn về **Computed property** và **watcher**, **Binding** cho **class** và **style**, **Render** theo điều kiện và theo danh sách trong **Vuejs** giúp các bạn nắm được các kiến thức cơ bản về **Vue**. Mình rất mong nhận được sự góp ý của các bạn. Cảm ơn các bạn đã lắng nghe bài chia sẻ của mình. Chúc các bạn thành công!
## Tài liệu tham khảo:
[https://vi.vuejs.org/v2/guide/](https://vi.vuejs.org/v2/guide/)