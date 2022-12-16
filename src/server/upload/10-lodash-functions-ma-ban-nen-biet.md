# Lodash là gì?
Lodash là một thư viện JavaScript và là phiên bản nâng cấp của [Underscore](https://underscorejs.org/) với nhiều chức năng hơn và có hiệu năng tốt hơn.

Lodash cung cấp rất nhiều chức năng, chia làm vài nhóm như: Array, Collection, Date, Function, Lang, Math, Number, Object, Seq, String, Util, Properties ...

# Tại sao nên sử dụng Lodash?

Nó sẽ giúp bạn đối phó với tất cả các loại object và bạn sẽ tiết kiệm thời gian, không cần phải code những hàm chung. Code của bạn sẽ sạch hơn, ít dòng hơn và hoạt động trên tất cả các trình duyệt. Nếu bạn không dùng thậm chí không biết nó là gì, bạn nên nghiêm túc suy nghĩ về việc tìm hiểu và sử dụng lodash.
Sau đây mình sẽ liệt kê ra một số function rất hữu dụng của lodash để phần nào cho các bạn thấy tại sao chúng ta nên sử dụng thư viện này.

# Những function bạn nên biết

## 1 _.assign

_.assign gán các thuộc tính của một hoặc nhiều object cho một object nguồn.
```
var foo = { a: "a property" };
var bar = { b: 4, c: "an other property" }

var result = _.assign({ a: "an old property" }, foo, bar);
// result => { a: 'a property', b: 4, c: 'an other property' }
```

## 2 _.times

_.times nhận một biến dạng số n và một function để được thực hiện n lần cuối cùng trả về một mảng kết quả của function được truyền vào. _.times rất hữu ích khi tạo dữ liệu khi test.

```
function getRandomInteger() {
    return Math.round(Math.random() * 100);
}

var result = _.times(5, getRandomNumber);
// result => [64, 70, 29, 10, 23]
```

## 3 _.debounce

_.debounce sẽ gọi lại một function sau một khoảng thời gian nhất định kể từ lần cuối cùng function đó được gọi.

```
function validateEmail() {
    // Validate email here and show error message if not valid
}

var emailInput = document.getElementById("email-field");
emailInput.addEventListener("keyup", _.debounce(validateEmail, 500));
```

Trong ví dụ này, validateEmail sẽ được gọi sau 500ms nên thông báo lỗi sẽ không được hiển thị ngay lập tức. Khoảng thời gian đếm ngược 500ms sẽ đặt lại mỗi khi người dùng bấm phím. Bằng cách này, người dùng sẽ không nhìn thấy thông báo lỗi cho đến khi ngừng gõ.

## 4 _.find

Thay vì lặp qua một mảng với một vòng lặp để tìm một đối tượng cụ thể, chúng ta chỉ cần sử dụng  _.find. Điều này rất hay, và tiện lợi, nhưng đây không phải là điều duy nhất bạn có thể làm với _.find. Bạn cũng có thể tìm một object sử dụng nhiều thuộc tính với một code. Hãy xem ví dụ sau!

```
var users = [
  { firstName: "John", lastName: "Doe", age: 28, gender: "male" },
  { firstName: "Jane", lastName: "Doe", age: 5, gender: "female" },
  { firstName: "Jim", lastName: "Carrey", age: 54, gender: "male" },
  { firstName: "Kate", lastName: "Winslet", age: 40, gender: "female" }
];

var user = _.find(users, { lastName: "Doe", gender: "male" });
// user -> { firstName: "John", lastName: "Doe", age: 28, gender: "male" }

var underAgeUser = _.find(users, function(user) {
	return user.age < 18;
});
// underAgeUser -> { firstName: "Jane", lastName: "Doe", age: 5, gender: "female" }
```

## 5  _.get and ._set

 _.get sẽ trả về một giá trị thuộc tính từ một object và _.set sẽ đặt một thuộc tính với giá trị bạn mong muốn. Không có gì đặc biệt ngoại trừ việc bạn có thể truy cập vào một thuộc tính với đường dẫn của nó.
 
 ```
 var bar = { foo: { key: "foo" } };
_.set(bar, "foo.items[0]", "An item");
// bar => { foo: { key: "foo", items: ["An item"] } }
var name = _.get(bar, "name", "John Doe");
// name => John Doe
 ```
 
 Khi sử dụng _.set, nếu đường dẫn không tồn tại, một thuộc tính sẽ được tạo mới. Không còn phải bận tâm với những dòng lỗi như  “Cannot set property ‘items’ of undefined” . Với _.get, nếu đường dẫn không tồn tại, nó sẽ trả về undefined thay vì lỗi.

## 6 _.deburr

_.deburr xóa hết dấu của biến truyền vào, "é" sẽ trở thành "e"

```
_.deburr("déjà vu");
// -> deja vu
_.deburr("Juan José");
// -> Juan Jose
```


## 7 _.keyBy

_.keyBy giúp bạn rất nhiều khi bạn cố gắng để có được một object với một thuộc tính cụ thể. Giả như chúng ta có 100 bài đăng trên blog và muốn lấy được bài đăng với Id là "34abc". Làm thế nào chúng ta có thể làm được điều này? 

```
var posts = [
    { id: "1abc", title: "First blog post", content: "..." },
    { id: "2abc", title: "Second blog post", content: "..." },
    // more blog posts
    { id: "34abc", title: "The blog post we want", content: "..." }
    // even more blog posts
];

posts = _.keyBy(posts, "id");

var post = posts["34abc"]
// post -> { id: "34abc", title: "The blog post we want", content: "..." }
```

Bất cứ khi nào server trả về kết quả là một object dưới dạng array, function này có thể giúp bạn tổ chức lại kết quả trả về đó. Biến thứ 2 truyền vào hoàn toàn có thể là một function.

## 8 _.reduce

_.reduce có chút tuơng tự với function lọc. Sự khác biệt duy nhất là bạn có thể chọn hình thức của object trả về. Sẽ là bình thường nếu bạn không hiểu những gì tôi nói, hãy xem ví dụ sau để làm rõ hơn.

```
var users = [
    { name: "John", age: 30 },
    { name: "Jane", age: 28 },
    { name: "Bill", age: 65 },
    { name: "Emily", age: 17 },
    { name: "Jack", age: 30 }
]

var reducedUsers = _.reduce(users, function (result, user) {
    if(user.age >= 18 && user.age <= 59) {
        (result[user.age] || (result[user.age] = [])).push(user);
    }
  
    return result;
}, {});

// reducedUsers -> { 
//     28: [{ name: "Jane", age: 28 }], 
//     30: [{ name: "John", age: 30 }, { name: "Jack", age: 30 }] 
// }
```

Về cơ bản, reduce trả về một object mới với người dùng được nhóm theo độ tuổi của họ và chỉ dành cho người dùng trong khoảng từ 18 đến 59. Function trợ giúp này là một trong những đối tượng được sử dụng nhiều nhất trong Lodash. Nó cũng là một phần của ES6. Tôi cũng muốn chỉ ra 2 lỗi phổ biến mà bạn có thể mắc phải, đừng quên trả về kết quả ở cuối hàm và đừng quên chỉ định giá trị mặc định cho kết quả như là đối số thứ ba (ở đây là {}).

## 9 _.cloneDeep

_.cloneDeep sẽ sao chép một Object. Object mới cũng sẽ có một địa chỉ mới trong bộ nhớ nên mọi sự thay đổi của nó sẽ không ảnh hưởng tới các thuộc tính của object ban đầu.

```
var original = { foo: "bar" };
var copy = original;
copy.foo = "new value";
// copy -> { foo: "new value" } Yeah!
// original -> { foo: "new value" } Oops!

var original = { foo: "bar" };
var copy = _.cloneDeep(original);
copy.foo = "new value";
// copy -> { foo: "new value" } Yeah!
// original -> { foo: "bar" } Yeah!
```

## 10 _.sortedUniq

Với function này, tất cả các giá trị trùng lặp sẽ không được trả về.  _.sortedUniq thường được sử dụng để cải thiện hiệu suất, vì nó đặc biệt dành cho các mảng đã được sắp xếp.

```
var sortedArray = [1, 1, 2, 3, 3, 3, 5, 8, 8];
var result = _.sortedUniq(sortedArray);
// -> [1, 2, 3, 5, 8]
```

Function này rất hữu ích khi bạn phải đuơng đầu với những mảng lớn. Nếu bạn muốn hiệu suất tốt hơn, bạn nên sắp xếp mảng của mình và sử dụng các function hoạt động tốt hơn với các mảng đã được sắp xếp. Có một số function khác tuơng tự như thế này trong Lodash. Bạn có thể xem qua _.sortIndex, _.sort Index

# Tổng kết

Lodash cung cấp rất nhiều chức năng để giúp bạn tiết kiệm thời gian. Thư viện này rất nhẹ (69 KB), hiệu quả, phổ biến và được yêu thích (hơn 18.000 starts trên Github). Nó được cập nhật rất thường xuyên và lần cuối cùng tôi xem trang Github của họ, có 0 issue trên đó (trang Github). Nếu bạn đã và đang chạy dự án của mình mà không sử dụng Lodash thì đừng lo, việc tích hợp Lodash vào một dự án là rất đơn giản và ít rủi ro. Nếu bạn bắt đầu một dự án mới, bạn nên thực sự nghĩ về việc sử dụng nó.