Destructuring là một công cụ mạnh mẽ trong Javascript. Nó cho phép bạn giải nén các mảng hay object thành những biến có nhiều ý nghĩa hơn và dễ dàng để xử lý.

Ví dụ dưới đây là cách phổ biến nhất chúng ta thường thấy về destructuring.

![](https://images.viblo.asia/68b4bcde-2603-4990-b184-c3222eb8c992.png)

Nếu như biến 'name' được truyền vào bên trái của đoạn destructuring không khớp với thuộc tính của đối tượng, giá trị sẽ được gán là undefined. Trong phần tiếp theo, chúng ta sẽ cùng xem xét một số trường hợp cụ thể của destructuring. Nó sẽ chỉ ra một vài tips, tricks mà có thể bạn chưa biết

## Swapping Variables Using Destructuring Expressions

Thông thường để hoán đổi các biến, chúng ta sẽ đặt 1 biến tạm để phục vụ cho việc hoán đổi (mặc dù có một biểu thức toán học và toán tử XOR để thực hiện điều này):

```
let a = 1;
let b = 2;

let temp;

temp = a;
a = b;
b = temp;
```

Destructuring cũng có thể làm được điều này nhưng chỉ với 1 dòng lệnh:

```
[a, b] = [b, a];
```

Thậm chí nó còn có thể dùng để hoán đổi nhiều biến cho nhau chứ không chỉ là 2 biến:

```
[a, b, c] = [b, c, a];
```

## Access Nested Properties and Set Default Values

Destructuring cũng có thể dùng với đối tượng có nhiều cấp và hữu dụng cả với những danh sách nhiều mắt xích

Đây là 1 ví dụ:

```
const person = {
  name: 'Fred',
  age: 26,
  work: {
    job: 'Blogger'
  }
};
const {work: {job} } = person;
console.log(job); //prints: Blogger
```

Chú ý: Ở ví dụ trên, 'work' không được khai phá. Chỉ duy nhất thuộc tính ở nhánh cuối của object được gán cho 1 biến - ở đây là 'job'. Để lấy được cả thuộc tính 'work', ta cần làm như sau

```
const {work, work: {job} } = person;
```

Nếu 1 key không tồn tại trong đối tượng, chúng ta sẽ nhận được undefined. Bạn có thể tránh trường hợp này bằng cách gán cho chúng giá trị mặc định.
![](https://images.viblo.asia/71f64d44-a3a5-443b-8a3a-636d817deb89.png)

Bây giờ hãy xem xét nếu như thuộc tính 'work' không tồn tại chúng ta cũng sẽ gặp phải lỗi, vì thế hãy viết biểu thức destructuring như sau

```
const { work: { job = 'NA', salary = 'NA'} = {} } = person;
```

## Rename Things Using Destructuring Aliases

Bí danh (Alias) giúp chúng ta tránh được xung đột namespace, trong các đối tượng cấp cao hoặc khi chúng ta import thư viện.

```
import { some-func1, some-func2 } from 'some-library';
//use aliasing
import { some-func1 as newFunc } from 'some-library';
newFunc();
import { * as some-library } from 'some-library'
```

## Accessing Array Elements

Giống như đối với đối tượng, mảng cũng có thể sử dụng với destructuring:

```
const arr = [1,2,3]; 
const [a, b] = arr;
//a = 1, b = 2
```

Bạn cũng có thể đặt giá trị cho từng biến cho các biến destructured giống như với object.

Ngoià ra bạn cũng có thể bỏ qua 1 hay nhiều items trong mảng mà bạn không cần tới

```
//skips the 2nd element
const [first,,third] = arr;
```

Tuy nhiên đối với những mảng dài thì việc sử dụng như trên đôi khi sẽ gây phiền toái, hoặc đơn giản hơn là nhìn rất rối mắt, khó đọc. Chính vì thế, bạn cũng có thể destructure bằng index của các phần tử trong mảng, ví dụ:

```
const arr = ['a','b','c','d'];
const {0: first, 3: fourth} = arr;
console.log(fourth) //d

const {0: first, 3: fourth, 9: tenth = 'z'} = arr;
```

## Omitting Properties Using the Rest Syntax

Đây là cách để bạn nhặt nhiều phần tử và gán chúng vào một biến mới thay vì phải nhặt từng cái một tùy vào nhu cầu của bạn

```
const arr = ["Hello", "How" , "are", "you"];
var [hello,...remaining] = arr;
console.log(remaining) // ["How" , "are", "you"]
```

Biểu thức trên cũng có thể dùng để clone một mảng, và tất nhiên nó cũng làm việc được với object

![](https://images.viblo.asia/af007eaa-c0d0-45fa-8ac5-1e45f6f511f5.png)

## Using Computed Properties in Destructuring
Cho đến tận lúc này, chúng ta mới chỉ thấy và sử dụng key tĩnh cho destructuring. Nhưng đối với những đối tượng có keys dynamic thì sao, chúng ta cần sử dụng như thế này

```
const person = {
  name: 'Fred',
  work: {
    job: 'Blogger'
  }
};
let name = 'name'
const { [name] : username } = person;
console.log(username); //Fred
```

Chúng ta cũng có thể tạo ra 1 mảng các thuộc tính

![](https://images.viblo.asia/53b7a8b3-2189-4022-96b9-f149fdbdf5fd.png)