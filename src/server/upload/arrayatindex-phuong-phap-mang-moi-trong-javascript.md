Array là một cấu trúc dữ liệu được sử dụng rộng rãi trong rất nhiều ngôn ngữ trong đó có Javascript. Chưa hết, việc sử dụng những method của Array cũng giúp cho các lập trình viên js tiếp cận dến kết qủa cuối cùng nhanh nhất có thể. 

Và chúng ta sẽ tiếp cận thêm một method mới đó là array.at(index). Trước khi tìm hiểu về array.at(index) thì chúng ta xem thực tế vì sao lại có đề xuất này. Lợi ích chính của phương pháp mới là truy cập các phần tử từ cuối mảng bằng cách sử dụng chỉ mục âm, không thể sử dụng cú pháp dấu ngoặc vuông thông thường array[index]. Ngoài ra thì các bạn nên tìm hiểu những method trong Array JavaScript cần biết  mà bài trước đã nói.

### Tìm phần tử cuối cùng của array


Cách thông thường để truy cập một phần tử mảng theo chỉ mục là sử dụng dấu ngoặc vuông array[index].

```
const fruits = ['orange', 'apple', 'banana', 'grape'];

const item = fruits[1];
item; // => 'apple'
```


Biểu thức array[index] đánh giá mục mảng nằm tại index và được đặt tên là trình truy cập thuộc tính . Như bạn có thể đã biết, việc lập chỉ mục các mảng trong JavaScript bắt đầu từ 0. Nó có một cú pháp đơn giản và dễ đọc. Nhưng đôi khi bạn muốn truy cập các phần tử từ cuối, thay vì từ đầu. 

Ví dụ: hãy truy cập phần tử cuối cùng của mảng thì bình thường chúng ta sẽ sủ dụng cú pháp sau:

```
const fruits = ['orange', 'apple', 'banana', 'grape'];

const lastItem = fruits[fruits.length - 1];
lastItem; // => 'grape'
```
Nhưng đôi khi có nhiều người sử dụng code này không đúng vì nó sinh ra âm thì làm thế nào. May mắn thay, một đề xuất mới (ở giai đoạn 3 kể từ tháng 1 năm 2021) đưa phương thức Array.at() để giải quyết nhiều hạn chế của trình truy cập dấu ngoặc vuông này.

### array.at()


Nói cách đơn giản, array.at(index) truy cập phần tử tại đối số index. Nếu index là số nguyên dương >= 0, phương thức trả về mục tại chỉ mục đó:

```
const fruits = ['orange', 'apple', 'banana', 'grape'];

const item = fruits.at(1);
item; // => 'apple'
```

Nếu index lớn hơn hoặc bằng độ dài mảng, thì giống như trình truy cập thông thường, phương thức trả về undefined:

```
const fruits = ['orange', 'apple', 'banana', 'grape'];

const item = fruits.at(999);
item; // => undefined
```

Điều kỳ diệu thực sự xảy ra khi bạn sử dụng một chỉ mục âm với phương thức array.at(). Như sau: Ví dụ: hãy sử dụng chỉ mục -1 để truy cập phần tử cuối cùng của mảng:

```
const fruits = ['orange', 'apple', 'banana', 'grape'];

const lastItem = fruits.at(-1);
lastItem; // => 'grape'
```

Dưới đây là một ví dụ chi tiết hơn về cách phương thức array.at() truy cập các phần tử:

```
const vegetables = ['potatoe', 'tomatoe', 'onion'];

vegetables.at(0); // => 'potatoe'
vegetables.at(1); // => 'tomatoe'
vegetables.at(2); // => 'onion'
vegetables.at(3); // => undefined

vegetables.at(-1); // => 'onion'
vegetables.at(-2); // => 'tomatoe'
vegetables.at(-3); // => 'potatoe'
vegetables.at(-4); // => undefined
```
### Tóm tắt

Cú pháp dấu ngoặc vuông trong JavaScript là cách thông thường và tốt để truy cập các mục theo chỉ mục. Chỉ cần đặt biểu thức chỉ mục trong dấu ngoặc vuông array[index] và nhận mục mảng tại chỉ mục đó. 

Tuy nhiên, việc truy cập các mục từ cuối bằng trình truy cập thông thường không thuận tiện vì nó không chấp nhận các chỉ mục âm. Vì vậy, ví dụ, để truy cập phần tử cuối cùng của mảng, bạn phải sử dụng biểu thức giải pháp thay thế:

const lastItem = array[array.length - 1];


May mắn thay, phương thức mảng mới array.at(index) cho phép bạn truy cập các phần tử của mảng bằng chỉ mục như một trình truy cập thông thường. Hơn nữa, array.at(index) chấp nhận các chỉ mục âm, trong trường hợp đó phương thức lấy các phần tử từ cuối:

`const lastItem = array.at(-1);`

Chỉ cần sử dụng polyfill array.prototype.at vào ứng dụng của bạn và bắt đầu sử dụng array.at() ngay hôm nay!