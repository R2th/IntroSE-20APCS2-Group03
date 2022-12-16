Một cách chúng ta có thể thử thách bản thân để phát triển là luyện tập với các câu hỏi đố vui! Các câu hỏi sau đây sẽ là những thách thức đồng thời cũng là hướng dẫn. Nếu bạn biết chính xác làm thế nào để trả lời từng câu hỏi, điều đó thật tuyệt, nhưng nếu bạn có một số sai lầm và tìm hiểu được lý do tại sao bạn sai, thì mình cho rằng điều đó thậm chí còn tốt hơn nữa!

# 1. So sánh mảng sắp xếp 

Hãy xem xét các mảng sau. Liệu console log sẽ trả ra những kết quả như thế nào trong các điều kiện sắp xếp khác nhau?

```
const arr1 = ['a', 'b', 'c'];
const arr2 = ['b', 'c', 'a'];

console.log(
  arr1.sort() === arr1,
  arr2.sort() == arr2,
  arr1.sort() === arr2.sort()
);
```

## Trả lời và giải thích
**True, True, false**

Đầu tiên, **sort** sẽ sắp xếp mảng ban đầu của bạn và cũng trả về một tham chiếu đến mảng đó. Điều này có nghĩa là khi bạn viết **arr2.sort()**, đối tượng mảng **arr2** được sắp xếp.

Tuy nhiên, hóa ra thứ tự sắp xếp của mảng không quan trọng khi bạn so sánh các đối tượng. Do **arr1.sort()** và **arr1** trỏ đến cùng một đối tượng trong bộ nhớ, phép kiểm tra đầu tiên sẽ trả về true. Điều này cũng đúng đối với phép so sánh thứ hai: **arr2.sort ()** và **arr2** trỏ đến cùng một đối tượng trong bộ nhớ.

Trong phép thử thứ ba, thứ tự sắp xếp của **arr1.sort()** và **arr2.sort()** là như nhau; tuy nhiên, chúng vẫn trỏ đến các đối tượng khác nhau trong bộ nhớ. Do đó, phép thử thứ ba kết quả là là false.

# 2. Set Objects 

Hãy xem xét **set** sau đây và đoán xem log sẽ trả ra kết quả như thế nào

```
const mySet = new Set([{ a: 1 }, { a: 1 }]);
const result = [...mySet];
console.log(result);
```

## Trả lời và giải thích
**[{a: 1}, {a: 1}]**

Mặc dù đúng là Set sẽ loại bỏ trùng lặp, nhưng hai giá trị chúng ta tạo Set là các tham chiếu đến các đối tượng khác nhau trong bộ nhớ, mặc dù có key-value giống hệt nhau. Đây cũng là lý do {a: 1} === {a: 1} là sai.

Cần lưu ý nếu set được tạo bằng biến đối tượng, giả sử obj = {a: 1}, Tập mới ([obj, obj]) sẽ chỉ có một phần tử, vì cả hai phần tử trong mảng tham chiếu cùng một đối tượng trong bộ nhớ .

# 3. Biến đổi những Object nhiều tầng

Hãy xem xét Object sau đây, đại diện cho 1 người dùng - Joe và chú chó của anh ta, Buttercup. Chúng ta sử dụng Object.freeze để bảo vệ object và sau đó cố gắng đổi tên ButterCup. Log sẽ là gì đây...

```
const user = {
  name: 'Joe',
  age: 25,
  pet: {
    type: 'dog',
    name: 'Buttercup'
  }
};

Object.freeze(user);

user.pet.name = 'Daffodil';

console.log(user.pet.name);
```

## Trả lời và giải thích
**Daffodil**

Object.freeze sẽ thực hiện đóng băng bề nổi của một đối tượng, và sẽ không bảo vệ các thuộc tính sâu khỏi bị thay đổi. Trong ví dụ này, chúng ta sẽ không thể thay đổi user.age hay user.name, nhưng chúng ta sẽ không gặp vấn đề gì khi thay đổi user.pet.name. Nếu chúng ta cảm thấy cần phải bảo vệ một đối tượng khỏi bị thay đổi bằng "mọi cách," chúng tôi có thể áp dụng đệ quy Object.freeze hoặc sử dụng thư viện "[deep freeze](https://www.npmjs.com/package/deep-freeze)".

# 4. Kế thừa nguyên mẫu
Trong câu hỏi này, chúng ta có hàm **Dog**. Con chó của chúng ta rõ ràng biết lệnh nói. Vậy khi chúng ta yêu cầu Pogo nói thì chuyện gì sẽ xảy ra?

```
function Dog(name) {
  this.name = name;
  this.speak = function() {
    return 'woof';
  };
}

const dog = new Dog('Pogo');

Dog.prototype.speak = function() {
  return 'arf';
};

console.log(dog.speak());
```

## Trả lời và giải thích
**woof**

Mỗi lần chúng ta tạo một cá thể **Dog** mới, chúng ta đặt thuộc tính speak của cá thể đó là một hàm trả về chuỗi "woof". Vì điều này được thiết lập mỗi khi chúng ta tạo một cá thể **Dog** mới, nên trình thông dịch không bao giờ phải nhìn xa hơn chuỗi nguyên mẫu để tìm thuộc tính nói. Do đó, phương thức nói trên Dog.prototype.speak sẽ không bao giờ được sử dụng.

# 5. Thứ tự trong Promise.all

Trong câu hỏi này, chúng ta có chức năng **timers** trả về một Promise sẽ giải quyết sau một khoảng thời gian ngẫu nhiên. Chúng ta sử dụng Promise.all để giải quyết một mảng của **timers**. Log sẽ nói cho chungs ta điều gì, hay mọi việc đều là ngẫu nhiên?

```
const timer = a => {
  return new Promise(res =>
    setTimeout(() => {
      res(a);
    }, Math.random() * 100)
  );
};

const all = Promise.all([
  timer('first'),
  timer('second')
]).then(data => console.log(data));
```

## Trả lời và giải thích
**["first", "second"]**

Thứ tự giải quyết các Promise không quan trọng đối với Promise.all. Chúng ta có thể tin cậy rằng chúng sẽ được trả về theo cùng thứ tự mà chúng được cung cấp trong mảng.

Bài viết của mình tạm thwoif kết thúc tại đây, nếu các bạn có thắc mắc gì hay không đồng ý với phần nào hãy để lại comment ở dưới nhé