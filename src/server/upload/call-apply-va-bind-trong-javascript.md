Khi học và thực hành với Javascript, chắc hẳn đều khá quen thuộc với ít nhất một trong ba phương thức all(), bind() và apply(). Có thể chúng ta không thường xuyên sử dụng các phương thức này, tuy nhiên nó lại khá phổ biến trong bất kì cuộc phỏng vấn nào về Javascript.

Trong Javascript, functions (hàm) là các objects (đối tượng). Objects có thể bao gồm các properties (thuộc tính) và methods (phương thức). Hầu hết với mọi function, chúng ta đều có thể nhận được ba phương thức này. 
![](https://images.viblo.asia/e0d33109-926b-48d8-8042-bdc1b4b69e59.png)
Nhưng trước khi bắt đầu, hãy xem các ví dụ sau:
Khi thực thi một function, điều này sẽ được xác định bởi cách mà một function được gọi (runtime binding).

```
const person = {
  firstName: 'Sanjeev',
  lastName: 'Sharma',
  age: 22,
  getIntro: function() {
     console.log(`${this.firstName} ${this.lastName} is ${this.age} years old.`);
  }
}

person.getIntro(); // "Sanjeev Sharma is 22 years old."

function randomFunc() {
  console.log(this);
}

randomFunc(); // window object
```

- Trong một method (phương thức): đề cập đối owner object (đối tượng chủ sở hữu).
- Trong một function (sloppy mode - chế độ không nghiêm ngặt): đề cập đến global object (đối tượng toàn cục).
- Trong một function (strict mode - chế độ nghiêm ngặt): không xác định.

Giờ thì bắt đầu nào...

### call()
Theo định nghĩa:

Phương thức call() gọi một function với value đã sẵn có và các argument (đối số) được cung cấp riêng lẻ. Nói một cách dễ hiểu, quyết định cái gì thì sẽ là cái đó - ở trong function khi ta gọi nó.

Hãy xem một ví dụ cơ bản để hiểu vấn đề này.

```
function personIntro() {
  console.log(`${this.firstName} ${this.lastName}`);
};

const person1 = {
  firstName: 'Sanjeev',
  lastName: 'Sharma'
};

personIntro(); // Output 1: undefined undefined

personIntro.call(person1); // Output 2: Sanjeev Sharma

personIntro.call({ firstName : 'Harry', lastName : 'Potter' }); // Output 3: Harry Potter
```
Ta có một function personIntro() đang cố gằng truy nhập vào console của firstName và lastName. Chúng ta có ba outputs như sau:
- Nếu không sử dụng phương thức call(), vì thế phương thức này sẽ mặc định tham chiếu đến window object. Window object sẽ không có bất kì thuộc tính nào là firstName hay lastName. Do đó, kết quả trả về là không xác định và không xác định (undefined & undefined).
- Nếu sử dụng call() và truyền một object có properties là required, ở đây là *person*. Do đó, kết quả trả về sẽ là *Sanjeev Sharma*.
- Giống như outputs trên, chỉ là mô tả thêm về cách call() hoạt động.

Cũng có thể pass các đối số bổ sung trong call() như sau:

```
function personIntro(city, state) {
  console.log(`${this.name} is from ${city}, ${state}`);
};

const person = {
  name: 'Max',
  age: 26
}

personIntro.call(person, 'Los Angeles', 'California'); // Output: Max is from Los Angeles, California
```

### bind()
Theo định nghĩa:

Phương thức bind() tạo ra một function mới, và khi được gọi, keyword (từ khoá) của nó sẽ được set một value được cung cấp, với một chuỗi các đối số cho trước bất kì đối số nào được cung cấp khi function được gọi. 

Rất tiếc, quá nhiều thông tin để xử lý cùng một lúc, vì vậy nếu đã hiểu call(), hãy sử dụng kiến thức đó để hiểu bind().

```
function getPerson(person) {
  console.log(`${ person } is from ${ this.state }.`);
}

getPerson.call({ state : 'California' }, 'Max'); // Output 1: Max is from California.

const personFromCalifornia = getPerson.bind({ state : 'California' });

personFromCalifornia('Max'); // Output 2: Max is from California.
personFromCalifornia('Ben'); // Output 3: Ben is from California.
```

Chúng ta lại tạo ra một function getPerson(). Giờ thì có hai outputs:
- Sử dụng call() và pass *{ state: 'California' }* (đối số đầu tiên) làm đối số. Đối số thứ hai sẽ là *person*.
- Cố gắng để output sẽ giống như khi sử dụng bind(). Với việc sử dụng bind(), chúng ta có thể liên kết giá trị này với một funtion và nhận lại một function khác. Trong trường hợp trên, chúng ta liên kết nó với *{ state: 'California' }* và lữu trữ được function trả về trong *personFromCalifornia*. Giờ khi khi gọi *personFromCalifornia*, chỉ cần truyền argument là *person*. Nó sẽ có một giá trị như này.

Chỉ cần gọi lại một function tương tự với một agrument *person* khác.

Vậy sự khác biệt giữa call() và bind() ở đây là gì?
- call() được get invoked ngay lập tức trong khi bind() trả về một function mà có thể invoke sau.
- call() nhận các agrument bổ sung nhưng bind() thì không vậy.
- call() không tạo ra bản sao của function, không giống như bind().

### apply()
Theo định nghĩa:

Phương thức apply() gọi một function với value đã cho, và các agrument đã được cung cấp dưới dạng một array (mảng) (hoặc một đối tượng giống mảng).

Về cơ bản là giống hệt như call(), chỉ có một sự khác biệt nhỏ.

```
function sum(num1, num2) {
  console.log(this + num1 + num2);
}

sum.call(2, 3, 4); // Output: 9
sum.apply(2, [3, 4]); // Output: 9
```

call() nhận đối số riêng lẻ nhưng apply() thì nhận dưới dạng một mảng. Chỉ có vậy thôi.

Link tham khảo [tại đây](https://dev.to/thesanjeevsharma/call-apply-and-bind-in-javascript-2nno)