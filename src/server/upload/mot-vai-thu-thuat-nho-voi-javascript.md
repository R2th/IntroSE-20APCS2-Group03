Xin chào mọi người, lại là mình đây :D Nhân dịp đợt dịch "cô vít" còn chưa lắng, phải làm remote thì mình xin chia sẻ cho các bạn một vài thủ thuật khá hay, mà mình lụm nhặt được trong các dự án và đâu đó trên internet. Nào cùng theo dõi nhé!

![](https://images.viblo.asia/6a1bca7b-885b-40d7-833f-eb07a1738581.jpg)

### 1. Shuffle các element của array
Để shuffle các phần tử của array khi mà ngại dùng tới các thư viện hỗ trợ như Lodash, thì hay thử cách sau đây:
```js
var list = [1, 2, 3];
console.log(list.sort(function() {
    return Math.random() - 0.5
})); 

//Kết quả: [3, 1, 2]
```
Khá hay phải không nào!

### 2. Gộp các array
Nếu bạn cần gộp 2 array Bạn có thể dùng function Array.concat():
```js
var array1 = [1, 2, 3];
var array2 = [4, 5, 6];
console.log(array1.concat(array2)); 

//Kết quả: [1, 2, 3, 4, 5, 6];
```

Tuy nhiên, function này không phù hợp để gộp các array lớn vì nó sẽ tiêu tốn nhiều dung lượng bằng cách tạo ra array mới. Trong trường hợp này, bạn có thể dùng Array.push.apply(arr1, arr2) để tạo array mới – nó sẽ gộp array thứ hai vào cái đầu tiên để giảm tiêu hao bộ nhớ. Và được viết lại như sau:
```js
var array1 = [1, 2, 3];
var array2 = [4, 5, 6];
console.log(array1.push.apply(array1, array2)); 

//Kết quả: [1, 2, 3, 4, 5, 6];
```
Trong các dự án nhỏ, nếu không cần quan tâm nhiều đến performance thì các bạn hoàn toàn sử dụng cách đầu tiên.

### 3. Thay thế toàn bộ
```js
var string = "anh anh";
console.log(string.replace(/a/, "ti")); 

//Kết quả: "tinh anh"

console.log(string.replace(/a/g, "ti")); 

//Kết quả: "tinh tinh"
```

Function String.replace() cho phép dùng String và Regex để thay thế các string, căn bản thì chỉ thay thế được phần đầu tiên. Nhưng bạn có thể mô phỏng function replaceAll() bằng cách dùng /g ở cuối Regex.

### 4. Conditional short-circuits
```js
if (isAuth) {
    redirect();
}
```
Nếu bạn thấy dòng code như trên, bạn có thể shorten nó bằng cách dùng bộ kết hợp variable và một function dùng && (AND operator) giữa chúng. Ví dụ, code trước sẽ trở nên ngắn hơn chỉ với một dòng:
```js
isAuth && redirect();
```

### 5. Convert sang boolean dùng operator !! 
Đôi khi bạn cần check xem variable có tồn tại hay có giá trị không, để xem chúng như giá trị thực. Để làm vậy bạn có thể dùng !!, sẽ tự động chuyển bất kì loại data nào thành boolean và biến này sẽ trả về false chỉ khi nó nhận được các giá trị: 0, null, “”, undefined hoặc NaN, còn lại nó sẽ trả về true. Để hiểu rõ hơn hãy xem ví dụ dưới đây:
```js
function Man(money) {
    this.money = money;
    this.isHandSome = !!money;
}
var quocanh = new Man(100000000);
console.log(quocanh.money); 
//Kết quả: 100000000
console.log(quocanh.isHandSome); 
//Kết quả: true


var quocy = new Man(0);
console.log(quocy.money);
//Kết quả: 0
console.log(quocy.isHandSome);
//Kết quả: false
```
### 6. Gán giá trị mặc định dùng operator ||
Trong ES6 hiện tại đang có feature default argument. Để mô phỏng feature này trong các browser cũ bạn có thể dùng || (OR operator) bằng cách đưa default value như một parameter thứ hai. Nếu parameter đầu tiên trả về false thì cái thứ 2 sẽ được dùng như default value. Xem ví dụ sau:
```js
function User(name, age) {
    this.name = name || "Quoc Anh";
    this.age = age || 30;
}
var user1 = new User();
console.log(user1.name); 
//Kết quả: Quoc Anh
console.log(user1.age); 
//Kết quả: 30


var user2 = new User("My My", 27);
console.log(user2.name); 
//Kết quả: My My
console.log(user2.age); 
//Kết quả: 27
```

### 7. Tổng kết
Trên đây là một số tips nhỏ mình muốn chia sẻ cho các bạn. Hi vọng nó sẽ có ích cho chúng ta trong hoàn cảnh nào đó. Cám ơn mọi người đã theo dõi bài chia sẻ, hẹn gặp lại!