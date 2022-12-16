# Giới thiệu
Như các bạn đã biết. Java Script là 1 ngôn ngữ lập trình không quy định phong cách lập trình, Bạn có thể sử dụng JS như 1 kiểu lập trình hướng đối tượng hoặc là 1 kiểu functional.
Tôi thì thích viết kiểu functional hơn. Vì nó giúp tôi dễ dàng test, tái sử dụng và dễ dàng đọc hiểu code hơn. Vì vậy khi bạn muốn viết 1 function JS, đầu tiên bạn cần chọn 1 thư viện library giúp bạn làm điều đó. Tôi sẽ nói về 3 thi viện và lý do tôi chọn Ramda cũng như đi sâu 1 chút vào thư viện Ramda - Rambda.
3 Thư vuện là tôi muốn nói đều giúp chúng ta viết code ngắn hơn và không gặp phải những vấn đề logic khi viết function.
# Underscore.js https://underscorejs.org/
Thư viện lâu đời nhất, nó đc released năm 2009. Nó cung cấp toàn bộ hàm hữu ích, làm việc với mảng và đối tượng.
ex:
```
_.each([1, 2, 3], alert);
_.map([1, 2, 3], function(num){ return num * 3; });
_.first([5, 4, 3, 2, 1]);
_.flatten([1, [2], [3, [[4]]]]);
_.keys({one: 1, two: 2, three: 3});
....
```
 
 # Lodash https://lodash.com/
 Thư viện loadash được sinh ra năm 2012. 
 ex:
 ```
 _.forEach([1, 2], function(value) {
  alert(value);
});
_.map([{user: 'barney', user: 'fred'}], 'user');
_.flatten([1, [2], [3, [[4]]]]);
 ```
 Rõ ràng lodash cúng bắt đầu với `_.` điều đó có nghĩa là Lodash cũng đc hình thành và sử dụng API từ Underscore. 
 Vậy sự khác nhau giữa Underscore và Lodash là gì?
 
 - Cải thiện khả năng sử dụng:

    Nó cung cấp mọi thứ mà Underscore làm, cùng với 1 vài hàm được hỗ trợ bổ sung.
    VD: `_.forOwn, _.create, _.parseInt, ...`
 - cú pháp của lodash ngắn hơn so vs underscore
 
     VD:
     ```
     var characters = [
      { 'name': 'barney', 'age': 36, 'blocked': false },
      { 'name': 'fred',   'age': 40, 'blocked': true }
    ];

    // using "_.filter" callback shorthand
    _.filter(characters, { 'age': 36 });

    // using underscore
    _.filter(characters, function(character) { return character.age === 36; } );

    // → [{ 'name': 'barney', 'age': 36, 'blocked': false }]
     ```
 
 - Hiệu suất
     
   Phẩn lớn function Lodash nhanh hơn Underscore
   
   https://gist.github.com/phil303/688f7fdce9c316d0e48d
   
 - Kích thước
   Full library của lodash là 33KB minified và nó gấp đôi Underscore's 16KB size
   
 Kết: Có lẽ phần thắng giữa lodash và underscore thuộc về lodash ngoài những tính năng vượt trội của mình. Nhược điểm duy nhất của lodash là kích thước tệp lớn. Nhưng việc sủ dụng ngữ nghĩa quan trọng hơn rất nhiều cho các nhà phát triển. Tuy nhiên bạn vẫn có thể sử dụng Underscore cho dự án của mình để tối ưu hóa trọng lượng của trang(đặc biệt trên web mobile) Trong khi các hàm và tính năng bổ sung của lodash có vẻ như ít cần thiết. Do vậy tùy thuộc vào các dự án mà bạn có thể chọn và ưu tiên Lodash hay Underscore.

# Ramda https://ramdajs.com/
Ramda được released cuối năm 2013. 
Chúng ta nói về currying trước, nó cho phép bạn tạo 1 function từ 1 function khác mà không cần arguments. 
VD:
```
// Ramda
const ramda = R.map(x => x + 1);

// Underscore
function underscore(x){
  return _.map(x, function(num){ return num + 1; });
}
const arr1 = [1, 2, 3];
ramda(arr1); // [2, 3, 4]
underscore(arr1); // [2, 3, 4]
```
Tôi bắt đầu tìm hiểu và biết tới Ramda khi KH của tôi sử dụng nó trong dự án:
Các bạn thử xem 1 VD nữa với lodash
```
// Ramda
$.getJSON('https://api.github.com/users?since=135')
  .then(R.pluck('avatar_url'))
  .then((d) => console.log(d));
```
```
// Lodash
$.getJSON('https://api.github.com/users?since=135')
  .then((users) => _.map(users, (user) => user.avatar_url))
  .then((d) => console.log(d));
```

Quá tuyệt vời phải không nào? Khi áp dụng nó với promises và observables. Tôi không cần phải tạo 1 lamda function để map lên users

Chưa hết quy tắc bất biến được áp dụng trong Ramda.
Bạn đã thử hàm `merge` của lodash và ramda chưa? Thử xem ví dụ để hiểu rõ hơn nhé
```
//Ramda
const obj = {a: 'A', b: 'B'}
const other = {c: 'C'}
R.merge(obj, other) // {a: 'A', b: 'B', c: 'C'}
console.log(obj) // {a: 'A', b: 'B'}
```
```
// Lodash
const obj = {a: 'A', b: 'B'}
const other = {c: 'C'}
_.merge(obj, other) // {a: 'A', b: 'B', c: 'C'}
console.log(obj) // {a: 'A', b: 'B', c: 'C'}
```

Nếu function của bạn là 1 chuỗi các function thì sao?
VD: Bài toán hiện tại là tôi có 1 list số từ 0 -> 20, tôi chọn ra những số lẻ và sau đó tôi nhân từng số lẻ đó với 2 và tôi tính tổng các số đó lại

Với lodash tôi sẽ phải đi ntn:
```
// lấy ra những số lẻ được nhân 2 để tính tổng
const arry = _.range(21).filter((x) => x % 2 > 0).map((x) => x *2 )
_.sum(arr) // _.sum(_.range(21).filter((x) => x % 2 > 0).map((x) => x *2 ))
```
bạn có thể viết với Ramda như sau:
```
R.compose(
  R.sum,
  R.map(x => x * 2),
  R.filter(x => x % 2 > 0)
)(R.range(1, 21))
```

Đầu tiên tìm hiểu compose là j? VD nếu bạn có a, b, c functions thì R.compose(a,b,c) = f(a(b(c)))
vậy theo như trên thì `a = R.sum`, `b = R.map(x => x * 2)`, `c = R.filter(X => x%2 > 0)` và dữ liệu đầu vào là `(R.range(1, 21))` hiểu hơn thì nó có nghĩa vụ gọi đến function compose bên trên có cùng cấp và truyền parameter.

Kết luận: mọi người thường gắn bó với lodash và sử dụng nó nhiều hơn. Bạn cũng có thể sử dụng lodash/fp nó cũng tương tự như Ramda. Tuy nhiên về sizes thì Ramda(42Kb) sẽ nhỏ hơn Lodash/fb(82Kb)
Vì vậy Ramda thật sự rất đáng để mọi người thử trong dự án.