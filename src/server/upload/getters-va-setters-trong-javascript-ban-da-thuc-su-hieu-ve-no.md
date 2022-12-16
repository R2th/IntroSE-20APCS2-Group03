**Getters** và **Setters** là các hàm hoặc phương thức được sử dụng để **lấy và đặt các giá trị của các biến**. Khái niệm getters và setters rất phổ biến trong lập trình. Hầu như tất cả các ngôn ngữ lập trình cấp cao đều đi kèm với một bộ cú pháp riêng để thực hiện **getters** và **setters**, bao gồm cả **Javascript**.

Trong bài viết này, chúng ta sẽ cùng xem getters và setters là gì và cách tạo và sử dụng chúng trong Javascript ra sao nhé!
## Getters - Setters và tính đóng gói

Ý tưởng của getters và setters luôn được đề cập cùng với tính đóng gói. Vậy tính đóng gói ở đây là gì? 
Đóng gói có thể hiểu theo 2 cách.
Đầu tiên, đó là việc bộ dữ liệu được khai báo trong getters và setters có thể bị ghi đè và có thể dễ dàng tùy  chỉnh bởi những function khác.
Thứ hai, đó là việc ẩn đi dữ liệu. Tức là bạn có biến a, bạn muốn xem giá trị của nó, bạn phải gọi qua hàm getters thì mới xem được. 
Nếu bạn muốn set giá trị cho nó thì bạn phải gọi tới hàm setters của nó, chứ không thể a = ?? là xong. Bằng cách này, chúng ta không vô tình ghi đè dữ liệu quan trọng bằng một số mã khác trong chương trình.

## Tạo getters và setters

### Với Methods
Vì getters và setters về cơ bản là các hàm tìm nạp / thay đổi một giá trị, có nhiều hơn một cách để tạo và sử dụng chúng. Cách đầu tiên là:
```javascript
var obj = {
  foo:    'this is the value of foo',
  getFoo: function() {
            return this.foo;
        },
  setFoo: function(val) {
            this.foo = val;
        }
}
 
console.log(obj.getFoo());
// "this is the value of foo"
 
obj.setFoo('hello');
 
console.log(obj.getFoo());
// "hello"
```

Đây là cách đơn giản nhất để tạo getters và setters. Có một thuộc tính  **foo** và có hai phương pháp: **getFoo** và **setFoo** để xem (return) và gán giá trị cho thuộc tính đó.

### Với Keywords

Một cách chính thức hơn và  mạnh mẽ để tạo ra getters và setters là bằng cách sử dụng từ khóa set và get.
Để tạo một **getter** , đặt  từ khóa **get** trước một khai báo hàm sẽ đóng vai trò là phương thức **getter** và sử dụng từ khóa **set**  theo cùng một cách để tạo một **setter** . Cú pháp như sau:
````javascript
var obj = {
  fooVal: 'this is the value of foo',
  get foo() {
      return this.fooVal;
  },
  set foo(val) {
      this.fooVal = val;
  }
}
 
console.log(obj.foo);
// "this is the value of foo"
 
obj.foo = 'hello';
 
console.log(obj.foo);
// "hello"
````

#### Cách nào tốt hơn?

Nếu chúng ta chọn tạo getters và setters bằng từ khóa, chúng ta có thể sử dụng **toán tử gán để đặt dữ liệu** và **toán tử dấu chấm** để lấy dữ liệu , giống như cách chúng ta truy cập / đặt giá trị của thuộc tính thông thường.

Tuy nhiên, nếu chúng ta chọn cách đầu tiên của mã hóa getters và setters, chúng ta phải gọi các phương thức setter và getter **bằng cú pháp gọi hàm** vì chúng là các hàm điển hình (không có gì đặc biệt như các hàm được tạo bằng từ khóa **get** và **set**).

Ngoài ra, có khả năng chúng ta sẽ **vô tình gán một số giá trị khác** cho các thuộc tính giữ các phương thức setter-setter đó và **mất chúng hoàn toàn** ! Điều đó chúng ta không phải lo lắng trong phương pháp sau.

Vì vậy, bạn có thể thấy lý do tại sao tôi nói **kỹ thuật thứ hai mạnh mẽ hơn .**

#### Phòng ngừa ghi đè

Nếu vì lý do nào đó bạn thích kỹ thuật đầu tiên, hãy làm cho các thuộc tính giữ các phương thức getter-setter chỉ đọc bằng cách tạo chúng bằng cách sử dụng **Object.defineProperties** . Thuộc tính tạo ra thông qua **Object.definePropertie**s, **Object.defineProperty** sẽ tự động cấu hình để có nghĩa là **read-only** : **Reflect.defineProperty writable: false
**

```javascript
/* Overwrite prevention */
var obj = {
  foo: 'this is the value of foo'
};
 
Object.defineProperties(obj, {
  'getFoo': {
      value: function () {
          return this.foo;
      }
  },
  'setFoo': {
      value: function (val) {
          this.foo = val;
      }
  }
});
 
obj.getFoo = 66;
// getFoo is not going to be overwritten!
 
console.log(obj.getFoo());
// "this is the value of foo"
```

### Bảo vệ dữ liệu với getters và setters

Cho đến nay, chúng ta đã đề cập đến việc sử dụng getters và setters trong nghĩa đầu tiên của sự đóng gói. Hãy chuyển sang phần thứ hai, tức là làm thế nào để ẩn dữ liệu khỏi mã bên ngoài với sự trợ giúp của getters và setters.

#### Dữ liệu không được bảo vệ

Việc thiết lập getters và setters không có nghĩa là dữ liệu chỉ có thể được truy cập và thay đổi thông qua các phương thức đó. Trong ví dụ sau, nó đã thay đổi trực tiếp mà không cần chạm vào các phương thức getter và setter:
```javascript
var obj = {
  fooVal: 'this is the value of foo',
  get foo() {
      return this.fooVal;
  },
  set foo(val) {
      this.fooVal = val;
  }
}
 
obj.fooVal = 'hello';
 
console.log(obj.foo);
// "hello"
```

Chúng ta đã không sử dụng setter nhưng trực tiếp thay đổi dữ liệu ( fooVal) . Dữ liệu ban đầu chúng ta đặt bên trong obj đã biến mất ngay bây giờ! Để ngăn chặn điều này xảy ra (vô tình), bạn cần một số bảo vệ cho dữ liệu của bạn. Bạn có thể thêm điều đó bằng cách **giới hạn phạm vi nơi dữ liệu** của bạn có sẵn. Bạn có thể làm điều đó bằng **block scoping** hoặc **function scoping.** 

#### Block scoping

Một cách là sử dụng block scoping trong đó dữ liệu sẽ được xác định bằng cách sử dụng từ khóa **let**  giới hạn phạm vi của nó đối với khối đó.

Một phạm vi khối có thể được tạo bằng cách đặt mã của bạn bên trong một cặp dấu ngoặc nhọn . Bất cứ khi nào bạn tạo một phạm vi khối, hãy đảm bảo để lại một bình luận ở trên nó yêu cầu niềng răng một mình, để không ai tháo niềng răng vì nghĩ rằng chúng là một số dấu ngoặc thừa trong mã hoặc thêm nhãn vào phạm vi khối .

````javascript
/* BLOCK SCOPE, leave the braces alone! */
{
let fooVal = 'this is the value of foo';
var obj = {
    get foo() {
        return fooVal;
    },
    set foo(val) {
        fooVal = val
    }
  }
}
 
fooVal = 'hello';
// not going to affect the fooVal inside the block
 
console.log(obj.foo);
// "this is the value of foo"
````
Thay đổi / tạo fooVal bên ngoài khối sẽ không ảnh hưởng đến tham fooVal chiếu bên trong setters getters.

#### Function scoping

Cách phổ biến hơn để bảo vệ dữ liệu với phạm vi là bằng cách giữ dữ liệu bên trong một hàm và trả về một đối tượng với các getters và setters từ hàm đó.
````javascript
function myobj(){
  var fooVal = 'this is the value of foo';
  return {
      get foo() {
          return fooVal;
      },
      set foo(val) {
          fooVal = val
      }
  }
}
 
fooVal = 'hello';
// not going to affect our original fooVal
 
var obj = myobj();
 
console.log(obj.foo);
// "this is the value of foo"
````
Đối tượng (với foo()getter-setter bên trong nó) được trả về bởi myobj() hàm được **lưu vào** obj , và sau đó obj được sử dụng để **gọi getter và setter** .

### Khi nào bạn nên sử dụng getters và setters?

Bây giờ đến câu hỏi lớn: bạn có bắt đầu dùng **getters** và **setters** cho tất cả dữ liệu của bạn bây giờ không?

Nếu bạn đang ẩn dữ liệu , thì không có lựa chọn nào khác .

Nhưng nếu dữ liệu của bạn được xem bởi mã khác là tốt, bạn vẫn cần sử dụng setters getters chỉ để gói nó với mã thực hiện một số hoạt động trên nó? Tôi muốn nói có . Mã cộng lại rất sớm . Tạo các đơn vị vi mô của dữ liệu riêng lẻ với trình thiết lập getter riêng cung cấp cho bạn sự độc lập nhất định để làm việc trên dữ liệu đã nói mà không ảnh hưởng đến các phần khác của mã.