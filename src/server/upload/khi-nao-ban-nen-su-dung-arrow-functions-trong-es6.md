Arrow functions chắc chắn là một trong những tính năng phổ biến nhất trong ES6,  một cách viết function mới ngắn gọn hơn.

Đây là cú pháp viết một hàm trong ES5 :

``` 
    function timesTwo(params) {
       return params * 2
    }
    timesTwo(4);  // 8
```

Bây giờ hàm trên được viết lại với arrow functions :

 ```
 const timesTwo = params => params * 2
 timesTwo(4);  // 8
 ```
 
 Nó ngắn hơn nhiều! Chúng ta có thể bỏ qua các dấu ngoặc nhọn và câu lệnh return do trả về .

Điều quan trọng là phải hiểu cách arrow function hoạt động khác so với các chức năng ES5 thông thường.

## Biến thể

Một điều bạn sẽ nhanh chóng nhận thấy là sự đa dạng của các cú pháp có sẵn trong arrow funtions. Chúng ta hãy điểm qua những điểm phổ biến:

### 1. Không cần tham số

Nếu ở đây không có tham số, bạn có thể đặt dấu ngoặc rỗng trước ``` => ```

 ```
     () => 42
```

Thực tế, bạn không cần phải có dấu ngoặc đơn.

```
    _ => 42
```

### Tham số đơn

Với những hàm này, dấu ngoặc đơn là không bắt buộc:

```
x => 42  || (x) => 42
```

### Đa tham số

Dấu ngoặc đơn là bắt buộc ở đây :

```
(x, y) => 42
```

### Câu lệnh

Ở dạng cơ bản nhất của nó, một biểu thức hàm tạo ra một giá trị, trong khi một câu lệnh thực hiện một hành động.

Với arrow functions, điều quan trọng cần nhớ là các câu lệnh cần phải có dấu ngoặc nhọn. Một khi các dấu ngoặc nhọn có mặt, bạn cần phải có ``` return```.

Ở đây là ví dụ arrow function sử dụng với if :

```
    const feedTheCat = (cat) => {
           if (cat === 'hungry') {
                return 'Feed the cat';
           } else {
               return 'Do not feed the cat';
          }
    }
```

### ""Block body""

Nếu chức năng của bạn nằm trong một khối, bạn cũng phải sử dụng câu lệnh ``` return ``` rõ ràng:

```
    const addValues = (x, y) => {
         return x + y
    }
 ```
###  Đối tượng

Nếu bạn đang trả về một đối tượng theo nghĩa đen, nó cần được bỏ vào trong ngoặc đơn. Điều này buộc trình biên dịch phải tính toán những gì bên trong dấu ngoặc đơn và trả về đối tượng.

```
    x =>({ y: x })
```

## Cú pháp ẩn danh

Điều quan trọng cần lưu ý arrow functions là ẩn danh, có nghĩa là chúng không được đặt tên.

Sự ẩn danh này tạo ra một số vấn đề:

1. Debug khó khăn hơn

Khi bạn gặp lỗi, bạn sẽ không thể theo dõi tên của hàm hoặc số dòng chính xác nơi nó xảy ra.

2. Không tự tham chiếu 

Nếu chức năng của bạn cần phải tự tham chiếu tại bất kỳ thời điểm nào (ví dụ: đệ quy, trình xử lý sự kiện cần hủy liên kết), nó sẽ không hoạt động.

Trong các biểu thức hàm cổ điển, từ khóa  ``` this ```  được liên kết với các giá trị khác nhau dựa trên ngữ cảnh mà nó được gọi. Tuy nhiên, với arrow funtions, ```this``` bị ràng buộc về mặt từ vựng. Có nghĩa rằng nó sử dụng ```this``` từ code có chứa arrow functions.

Hãy xem ví dụ hàm ```setTimeout``` bên dưới:

```
// ES5
    const obj = {
          id: 42,
          counter: function counter() {
                setTimeout(function() {
                    console.log(this.id);
                }.bind(this), 1000);
          }
    };
```

.bind(this) được yêu cầu để giúp chuyển ```this``` vào bên trong hàm. Nếu không, theo mặc định, điều này sẽ không được xác định.

```
    // ES6
    var obj = {
          id: 42,
          counter: function counter() {
                setTimeout(() => {
                  console.log(this.id);
                }, 1000);
          }
    };
 ```
 
 ES6 arrow functions không thể được ràng buộc với ```this```, vì vậy nó sẽ đi lên một phạm vi và sử dụng giá trị của ```this``` trong phạm vi mà nó được xác định.
 
##  Khi nào bạn không nên sử dụng Arrow functions

Sau khi tìm hiểu thêm một chút về arrow functions, hy vọng bạn hiểu rằng chúng không thay thế các chức năng thông thường.

Dưới đây là một số trường hợp mà bạn có thể muốn sử dụng chúng:

1. Phương thức đối tượng

Khi bạn gọi ```cat.jumps```, số lượng ```lives``` không giảm. Đó là bởi vì ```this``` không bị ràng buộc với bất cứ điều gì, và sẽ kế thừa giá trị của ```this`` từ phạm vi cha của nó.

```
    const cat = {
          lives: 9,
          jumps: () => {
            this.lives--;
          }
    }
```

2.  Hàm callback với nội dung động

Nếu bạn cần nội dung của mình là động, arrow funtions không phải là lựa chọn đúng. Hãy xem xử lý sự kiện này dưới đây:

```
    const button = document.getElementById('press');
    button.addEventListener('click', () => {
      this.classList.toggle('on');
    });
 ```
 
 Nếu chúng ta nhấp vào button, chúng ta sẽ nhận được ```TypeError```. Đó là bởi vì ```this``` không bị ràng buộc với button, mà thay vào đó bị ràng buộc với phạm vi cha của nó.
 
 3. Khi nó làm cho code của bạn khó hiểu hơn
 
 Rất đáng để xem xét sự đa dạng của cú pháp mà chúng ta đã đề cập trước đó. Với các chức năng thường xuyên, mọi người biết những gì mong đợi. Với arrow functions, có thể khó giải mã những gì bạn đang nhìn thẳng.
 
##  Khi bạn nên sử dụng chúng

Arrow functions tốt nhất dùng với bất cứ điều gì yêu cầu ```this``` phải được ràng buộc với bối cảnh, và không phải chính chức năng đó.

Mặc dù thực tế là chúng ẩn danh, mình cũng thích sử dụng chúng với các phương thức như ```map``` và ```reduce```, vì mình nghĩ rằng nó làm cho code của  dễ đọc hơn. Đối với mình, những ưu điểm vượt trội hơn các nhược điểm.