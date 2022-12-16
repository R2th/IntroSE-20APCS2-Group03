### Giới thiệu
Bạn có biết rằng năm 2018, Javascript được đánh giá là một ngôn ngữ được giới lập trình yêu thích nhất. Nhiều người nhận định rằng, Javascipt là một ngôn ngữ không khó. Oke! Phải khẳng định rằng Javascript khá nhẹ và dễ học. Tuy nhiên những tác dụng mà nó mạng lại thì không thể phủ nhận được.

Hiện nay có khá nhiều framework JS nổi tiếng, lập trình viên có thể lựa chọn để nghiên cứu và áp dụng vào các project của mình. Trong đó không thể không kể đến là: 

- VueJS: Theo dõi series: [2018 - Cùng nhau học VueJS ](https://viblo.asia/s/2018-cung-nhau-hoc-vuejs-b85ogvV252G) (*Viblo-Writer:* 	[Nguyễn Văn Quy](https://viblo.asia/u/ruacondepzaj))
- ReactJS: Theo dõi series: [Học reactjs và redux 2018](https://viblo.asia/s/hoc-reactjs-va-redux-2018-nB5pXJp65PG) (*Viblo-Writer:* 	[Nguyễn Văn Quy](https://viblo.asia/u/ruacondepzaj))
- AngularJS: Theo dõi series:  [JWT with Laravel 5.5 and Angular 4](https://viblo.asia/s/jwt-with-laravel-55-and-angular-4-aGK7jNrM5j2) (*Viblo-Writer:* 	[Trần Thanh Sơn](https://viblo.asia/u/sonhip))
- NodeJS: Theo dõi series: 	[Series lập trình Nodejs](https://viblo.asia/s/series-lap-trinh-nodejs-7LKXNqkelV4) (*Viblo-Writer:* 	[Đỗ Trung Quân](https://viblo.asia/u/quanlightning17))

- ...
>Điều quan trọng nhất mà mình muốn chia sẻ ở đây là: "Dù có sử dụng frameworkJS nào đi chăng nữa, chúng ta cũng cần phải nắm chắc các kiến thức thuần túy của Javascript"

Cùng tìm hiểu về Functional Programming trong Javascript để có những áp dụng hợp lý cho các project của mình nhé!  :blush: :blush: :blush:
### Mục Lục
- Functional Programming là gì?
- Các mô hình lập trình chính
- Mathematical Function hoặc Pure Function
- Tại sao nên sử dụng Functional Programming?
### Nội Dung
### Functional Programming là gì?
Functional Programming có nghĩa tiếng việt là lập trình hàm.

>Theo nguồn wikimedia: Trong ngành khoa học máy tính, lập trình hàm là một mô hình lập trình xem việc tính toán là sự đánh giá các hàm toán học và tránh sử dụng trạng thái và các dữ liệu biến đổi.

![](https://images.viblo.asia/8cfd2f5d-f105-42af-8a3b-dd8cb37c0298.jpg)

### Các mô hình lập trình chính
- Procedural Programming
- Object Oriented Programming
- Meta Programming
- Imperative Programming
- Declarative Programming

**Procedural Programming:** hay còn gọi là lập trình thủ tục là kiểu lập trình mà việc tính toán trong chương trình dựa trên việc ước lượng giá trị của các thủ tục hay procedure (bao gồm một tập hợp các câu lệnh khác nhau) theo một thứ tự xác định từ trên xuống dưới.
```javascript
    int i, sum = 0;
    for (i = 1; i <= 50; i++) {
        sum = sum + i;
    }
  
    return sum;
```
**Object Oriented Programming:** là kỹ thuật lập trình nhằm vào sự tương tác của các đối tượng. Mỗi đối tượng có những thuộc tính (thông tin lưu trữ), những phương thức xác định chức năng của đối tượng. Bên cạnh đó, đối tượng có khả năng phát sinh ra các sự kiện khi thay đổi thông tin, thực hiện một chức năng hay khi đối tượng khác tác động vào. Tất cả những thuộc tính, phương thức và sự kiện tạo nên cấu trúc hướng đối tượng.
```javascript
    function createNewPerson(name) {
      var obj = {};
      obj.name = name;
      obj.greeting = function() {
        alert('Hi! I\'m ' + this.name + '.');
      };
      
      return obj;
    }
```

**Meta Programming:** Lập trình meta hay còn gọi là siêu lập trình là việc tiến hành một trong hai thao tác (hay cả hai) sau:
- Công việc viết một chương trình máy tính mà chương trình này lại điều chỉnh hay soạn thảo một chương trình khác (hay điều chỉnh chính nó) như là dữ liệu của lập trình meta
- Công việc viết một chương trình máy tính mà một phần của công việc này chỉ hoàn tất trong thời gian dịch mã.
```javascript
    // Base level
    const obj = {
      hello() {
        console.log('Hello!');
      }
    };

    // Meta level
    for (const key of Object.keys(obj)) {
      console.log(key);
    }

    => hello
```

**Imperative Pattern:** Tập trung vào mô tả cách chương trình hoạt động, nó bao gồm các lệnh cho máy tính thực hiện.

**Declarative Pattern:** Tập trung vào những gì chương trình sẽ hoàn thành mà không chỉ định cách chương trình sẽ đạt được kết quả.

>Bạn có thể hình dung là với Imperative Programming thì bạn quan tâm tới việc làm thế nào để giải quyết bài toán còn Declarative Programming quan tâm tới đầu vào và đầu ra của bài toán.
```javascript
    var arr = [1, 2, 3, 4, 5, 6, ];

    // Imperative
    var result  = [ ];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            result.push(arr[i]);
        }
    }
    console.log(result);

    // Declarative
    var result = arr.filter((num) => num % 2 === 0);
    console.log(result);
```
### Mathematical Function hoặc Pure Function
- Trong toán học, một hàm là một mối quan hệ giữa một tập hợp các đầu vào và một tập các đầu ra cho phép với thuộc tính mà mỗi kết hợp đầu vào có liên quan đến chính xác một đầu ra.
- Trong Functional Programming (lập trình hàm), các hàm này được gọi là hàm thuần túy chỉ phụ thuộc vào dữ liệu đầu vào nhận được vào hàm và không thay đổi dữ liệu đầu vào ngoại trừ dữ liệu trả về.

```Math.random()``` không phải là một pure function bởi vì nó luôn trả về một giá trị mới trên mọi lần gọi hàm.

```Math.min(1,2)``` là một ví dụ của pure function vì nó luôn luôn trả về giá trị ứng với thiết lập đầu vào.

### Tại sao nên sử dụng Functional Programming?
- Với Pure Function, cung cấp sự tự tin không thay đổi mọi thứ bên ngoài phạm vi của nó.
- Nó làm giảm sự phức tạp, không cần phải lo lắng về cách nó đang làm nó, tập trung sẽ chỉ vào những gì nó đang làm.
- Dễ kiểm tra, bởi vì nó không phụ thuộc vào trạng thái của ứng dụng và xác minh kết quả cũng sẽ dễ dàng.
- Nó làm cho code dễ đọc hơn.
- Functional Programming còn giúp cho code dễ hiểu hơn nữa... :D :D :D
### Kết luận
Qua bài viết chắc hẳn chúng ta cũng đôi chút hiểu về Functional Programming trong Javascript. Hy vọng bài viết phần nào giúp các bạn có những kiến thức cần thiết trong việc học tập và tìm hiểu về Javascript.

Tiếp tục theo dõi series và chia sẻ kiến thức nhé mọi người: 	[Tìm hiểu về Javascript](https://viblo.asia/s/tim-hieu-ve-javascript-RNZqg7AG50n)

Còn tiếp...... ;) ;) ;)

**Tham Khảo:**
- Trang web:  https://codeburst.io/functional-programming-in-javascript-e57e7e28c0e5
- Github: https://github.com/Jam3/Javascript-Code-Conventions
- Viblo: https://viblo.asia/u/ruacondepzaj