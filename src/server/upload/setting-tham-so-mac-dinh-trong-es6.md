Thật đơn giản để cài đặt tham số mặc định với  ES6 . Với cách làm trước đây thì ta sẽ sử dụng toán tử ba ngôi để gán giá trị mặc định nếu nó không được xác định. Với ES6 bạn có thể cài đặt giá trị mặc định ngay trong lúc khai báo hàm.
```
// Cách cũ
function beverage(drink) {
  drink = drink !== undefined ? drink : '🍵';
}
// ✅ Với ES6
function beverage(drink = '🍵') {}
```

**Khi giá trị mặc định được nhận vào** <br>
Giá trị mặc định chỉ được nhận khi ta truyền vào hàm **undefined**  hoặc không truyền giá trị nào. Cùng xem nào:
```
function beverage(drink = '🍵') {
  return drink;
}
beverage(); // '🍵'
beverage(undefined); // '🍵'
```
**Thử với các giá trị khác:**<br>
Liệu giá trị mặc định nhận vào lời gọi hàm có thể giữ nguyên với các giá trị khác không? Câu hỏi tuyệt vời. Hãy xem: 
```
function beverage(drink = '🍵') {
  return drink;
}
beverage(false); // false
beverage(null); // null
beverage(NaN); // NaN
beverage(0); // 0
beverage(''); // ""
```
Câu trả lời là không. Giá trị mặc định chỉ nhận vào lời gọi hàm với **undefined**.<br>
**Cài đặt tham số mặc định với tất cả các giá trị giả:**<br>
Nếu bạn muốn xem tất cả các giá trị giả. Thay vào đó bạn hãy làm như dưới này:
```
function beverage(drink) {
  drink = drink || 'default value';
  return drink;
}
beverage(); // 'default value'
beverage(undefined); // 'default value'
beverage(false); // 'default value'
beverage(null); // 'default value'
beverage(NaN); // 'default value'
beverage(0); // 'default value'
beverage(''); // 'default value'
```
**Tham số mặc định với Destucturing** <br>
Bạn cũng có thể cài đặt tham số mặc định với destructuring

**Object Destructuring**
```
function beverage({ name } = { name: '🍵' }) {
  return name;
}
beverage(); // '🍵'
beverage({ name: '🥤' }); // '🥤'
```
**Array Desructuring**
```
function color([black] = ['#000']) {
  return black;
}
color(); // #000
color(['#222']); // #222
```
**Tại sao tham số mặc định lại quan trọng với Destucturing?**<br>
Đặt một tham số mặc định rất quan trọng đối với destucturing bởi vì nếu bạn cố gắng destucturing một cái gì đó là undefined nó sẽ bắn ra lỗi . Oke đôi khi lỗi có thể là tốt nhưng nó chỉ báo một cái gì đó lỗi với ứng dụng của bạn chính vì thế bạn nên sửa nó sẽ tốt hơn.Nhưng đôi khi bạn vẫn thích nó bị lỗi một cách duyên dáng mà ứng dụng vẫn chạy.
Ứng dụng của bạn sẽ bị lỗi nếu bạn cố gắng set lại một giá trị .
```
const person = undefined;
const { name } = person;
// ❌ TypeError
```
Và làm như dưới đây sẽ oke hơn . Ứng dụng của bạn sẽ không bị lỗi:
```
const person = {};
const { name } = person;
// ✅ undefined (no crash)
```
**Sửa lỗi TypeError  trong hàm chứa tham số mặc định**<br>
Thử đoạn code sau:
```
function beverage({ name }) {
  return name;
}
beverage();
// ❌ TypeError
```
Oke như trên ta sẽ nhận ngay 1 lỗi và đó là lý do chúng ta nên đặt tham số mặc định  cho các function để tránh sự cố này.
```
function beverage({ name } = {}) {
  return name;
}
beverage();
// ✅ undefined (no crash)
```
**Tham số mặc định có hoạt động với hàm mũi tên không?**<br>
Tất nhiên. Nó có thể hoạt động với hàm mũi tên.
```
const beverage = (drink = '🍵') => drink;
```
Trong javascript hàm mũi tên có thể ngầm hiểu là trả về một cái gì đó. (chả qua là cú pháp viết tắt thôi)<br>
Ở trên cũng như dưới đây:
```
const beverage = (drink = '🍵') => {
  return drink;
};
```

Sử dụng tham số trong giá trị mặc định của bạn. 
<br>
Nó thực sự thú vị. Bạn có thể truy cập tham số sớm hơn tham số mặc định của bạn ví dụ:
```
function metric(kilogram, gram = kilogram * 1000) {
  return gram;
}
metric(0.5); // 500
metric(0.5, 200); // 200
```
Chú ý: 
Các tham số được đọc từ trái qua phải . Nên bạn không thể truy cập sớm vào các tham số sau các tham số trước đó.
```
function metric(gram = kilogram * 1000, kilogram) {
  return gram;
}
metric(undefined, 200);
// ❌ ReferenceError:
```
**Cách thực hành tốt nhất**<br>
Luôn luôn đặt tham số mặc định ở cuối.
```
// ❌ bad
function handleThings(opts = 'default', name) {}
// ✅ good
function handleThings(name, opts = 'default') {}
```

Tóm lại: 
Thực ra cách cũ dùng toán tử ba ngôi cũng không có gì sao cả. Bản thân tôi giờ vẫn dùng cả 2 .Nhưng đương nhiên với cách viết ngắn gọn và cũng không kém phần dễ hiểu như trên thì tại sao bạn không thử đặc biệt nó làm cho code chúng ta có sự tinh tế và ngắn gọn hơn. 
<br>
Bài viết được lược và dịch từ: 
https://medium.com/dailyjs/setting-default-parameters-3d827d81e6ab