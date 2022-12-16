![](https://images.viblo.asia/faf94f29-3c1d-4bad-8854-5ac4fe20a7bb.png)
Trong VueJS, có rất nhiều các để tính toán giá trị cho view, ví dụ như là binding data trực tiếp vào view, sử dụng các phép tính đơn giản hoặc là sử dụng filters để thực hiện việc chuyển đổi dữ liệu. Ngoài ra chúng ta còn có thể sử dụng computed properties để lấy giá trị thông qua các items khác ở data model.
# Computed property có thể hiểu là một "thuộc tính được tính toán".
Ở trong Vue, nó rất hữu dụng.
Viết biểu thức trực tiếp trong template rất tiện, nhưng chỉ dành cho những biểu thức có tính toán đơn giản. Những biểu thức phức tạp được viết theo cách đó sẽ khiến template cồng kềnh và khó bảo trì. Ví dụ:
```HTML
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```

Đến đây, template không còn đơn giản và mang tính khai báo (declarative) nữa. Bạn sẽ phải mất chút thời gian thì mới nhận ra được message đã bị đảo ngược. Càng tệ hơn khi bạn sử dụng biến message đảo ngược này nhiều lần trong code.
Và bạn sẽ nghĩ đến cách tạo một method `reverseMessage` và đưa nội dung đó vào:
```HTML
<p>Thông điệp bị đảo ngược: "{{ reverseMessage() }}"</p>
```

```
// trong component
methods: {
  reverseMessage: function () {
    return this.message.split(' ').reverse().join(' ')
  }
}
```

Nhưng liệu đây đã là cách tốt nhất chưa? Mỗi lần gọi `reverseMessage()` thì nội dung của nó sẽ phải được tính toán lại, kể cả khi message không thay đổi.
Mình thử chuyển thành khai báo một computed property có tên `reversedMessage` xem sao:
```HTML
<div id="example">
  <p>Thông điệp ban đầu: "{{ message }}"</p>
  <p>Thông điệp bị đảo ngược bằng tính toán (computed): "{{ reversedMessage }}"</p>
</div>
```

```Javascript
computed: {
    // một computed getter
    reversedMessage: function () {
      // `this` trỏ tới đối tượng vm
      return this.message.split(' ').reverse().join(' ')
    }
  }
```

Bây giờ khi bạn gọi `reversedMessage` thì nội dung của nó cũng sẽ trả về giống như khi mình gọi `reversedMessage()`.
Vậy hai cái này khác nhau gì mà lại phải chia ra như vậy?
Nếu xét về kết quả cuối cùng thì hai cách tiếp cận này thât ra chỉ là một. Tuy nhiên, sự khác biệt ở đây là computed property được cache lại dựa vào những những thành phần phụ thuộc (dependency). Một computed property chỉ được tính toán lại khi những thành phần phụ thuộc của chúng thay đổi. Điều này có nghĩa: miễn là giá trị của message không thay đổi, thì những truy cập tới computed `reversedMessage` sẽ ngay lập tức trả về kết quả được tính toán trước đó mà không phải chạy lại hàm một lần nữa.
Điểu này cũng có nghĩa là computed property dưới đây sẽ không bao giờ cập nhật, bởi vì Data.now() không phải là một thành phần phụ thuộc phản ứng (reactive dependency) :

```Javascript
computed: {
  now: function () {
    return Date.now()
  }
}
```

Vì vậy, tùy theo mục đích sử dụng mà bạn nên chọn computed property hoặc method.

# 3 trường hợp phổ biến hay dùng computed property
### VD1: Sử dụng map() và reduce() để lấy tổng tiền từ giỏ hàng
Trong ví dụ này, chúng ta sẽ có 1 trang thương mại điện tử. Tất cả các items sẽ được lưu trong một array và nằm trong data() function.
Mỗi item sẽ có dạng
```JSON
{
    id: 205,
    name: 'Banana',
    price: 1,
    imageSrc: Banana
}
```

Bây giờ, bài toán của chúng ta là mỗi lần thêm 1 item vào giỏ hàng, ta cần tính lại tổng tiền để hiển thị. Bình thường thì đây không phải là một bài toán đơn giản, nhưng với computed propertiy, chúng ta có thể tính toán lại các giá trị mỗi khi `cart` thay đổi (thêm vào hoặc xóa đi).
```
computed: {
    shoppingCartTotal() {
        return this.cart.map(item => item.price).reduce((total, amount) => total + amount);
    }
},
```

Và bài toán đã được giải quyết.
Ở đây, ta sử dụng map() để lấy từng về 1 array chỉ chứa giá của các items trong cart, sau đó, ta dùng reduce() để thực hiện việc tính tổng giá và trả về giá trị.
Nhưng làm sao Vue có thể biết mỗi lần `cart` được thêm hay xóa để chạy?
Các bạn có thể sử dụng luôn computed property `shoppingCartTotal` hoặc là gán giá trị cho `total` ngay sau mỗi lần click vào nút Thêm vào giỏ hàng:
```
methods: {
    updateCart(e) {
        this.cart.push(e);
        this.total = this.shoppingCartTotal;
    }
}
```
Như các bạn thấy đấy, ngay sau khi mỗi lần thêm item vào giỏ hàng, ta sẽ set luôn giá trị `shoppingCartTotal` vào `total`. `shoppingCartTotal` lúc này sẽ tính lại giá trị vì `cart` đã bị thay đổi thay vì cache lại giá trị trước đó.
Quá đơn giản đúng không nào :D

### VD2:  Nối chuỗi lại với nhau
Ví dụ này thì chắc ai cũng đã từng gặp. Trong data chỉ có first_name và last_name, làm thế nào để lấy được full_name.
Ta sẽ có user object như sau:
```
user: {
    name_first: 'Sunil',
    name_last: 'Sandhu',
}
```
Giờ ta có thể tính toán full_name đơn giản:
```
computed: {

    fullName() {
        return `${this.user.name_first} ${this.user.name_last}`
    }
},
```

Và trong view của cần
```
<p>{{ fullName }}</p>
```

Nó sẽ hiển thị ra `Sunil Sandhu`

### VD3: Tính toán các con số
Trong ví dụ này, ta sẽ dùng v-model để tự động cập nhật giá trị cho data() và sau đó sẽ sử dụng computed property để cộng 2 số lại với nhau.
data() sẽ có dạng:
```
data() {
    return {
        num1: 0,
        num2: 0
    }
},
```

Rất đơn giản, và ta gán cho `num1` và `num2` bằng `0` để tránh các vấn đề về dữ liệu.
Sau đó ta có 2 input fields như sau:
```
<input type="number" v-model="num1"/>
<input type="number" v-model="num2"/>
```

Bây giờ mỗi lần thay đổi trong 2 inputs trên, thì `num1` và `num2` cũng sẽ thay đổi.

Trong phần computed, ta thêm function `answer`:
```
computed: {
    answer() {
        return this.num1 + this.num2
    }
},
```

Trên view hãy thêm:
```
<p>{{answer}}</p>
```

Vậy là xong, bây giờ chỉ cần nhập giá trị vào 2 inputs phía trên thì kết quả sẽ được tính toán ngay lập tức và hiện ra trước mắt.

## Bonus
Ngoài ra các bạn còn có thể sử dụng computed Setter để có thể mở rộng khả năng giải quyết vấn đề.
Những computed property mặc định chỉ có getter, nhưng bạn cũng có thể cung cấp setter nếu cần thiết:
```
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```
Bây giờ, khi bạn gán vm.fullName = 'John Doe', thì setter sẽ được gọi, vm.firstName và vm.lastName sẽ được cập nhật tương ứng.

# Kết luận
Trên đây chỉ là 3 ví dụ tương đối phổ biến về việc sử dụng computed properties. Phần này khá là cơ bản, nhưng mình nghĩ cũng tương đối quan trọng. Khi học bất cứ ngôn ngữ hay công nghệ gì, bạn cần nghiên cứu kỹ những điều cơ bản để có thể áp dụng một cách đúng đắn. Nó sẽ không chỉ giúp chúng ta giải quyết vấn đề tốt hơn mà còn giúp chúng ta hiểu rõ bản chất, từ đó việc lập trình không bao giờ là đáng sợ nữa.
Cảm ơn các bạn đã đọc hết, nếu có vấn đề gì thì nên comment thay vì downvote nhé :v