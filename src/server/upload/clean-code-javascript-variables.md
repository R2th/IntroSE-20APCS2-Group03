### Giới thiệu

Cùng liên tưởng một chút về ký ức của bạn.
Bạn A thì học không được giỏi nhưng chữ viết sạch đẹp, gọn gàng. Bạn B học giỏi nhưng chữ xấu, ít ai có thể đọc được chữ của bạn ngoài chính bạn.
Và rồi một ngày nọ hai bạn cùng tham gia một kì thi nọ. Và vì chữ xấu mà bạn B đã bị tạch cho dù vẫn tự tin làm được bài.

Và việc lập trình, hay gọi đơn giản là code, cũng cần phải "sạch", đẹp và dễ hiểu.
Khi bạn code như thế thì bạn sẽ được đánh giá cao hơn trong interview, hay là sẽ bị ít comment hơn khi mà review code.
Viết code chạy được là tốt, nhưng viết code chạy được và để người khác đọc, hiểu được những gì bạn đang viết một cách dễ dàng thì điều đó lại tốt hơn nữa và không phải ai cũng ngẫu nhiên có được những skills đó. 
Trong bài viết này, mình sẽ hướng dẫn cho các bạn những mẹo để bạn áp dụng vào để có một "code sạch". Mình đang áp dụng cho ngôn ngữ Javascript, nhưng bạn hoàn toàn có thể áp dụng với ngôn ngữ mà bạn đang sử dụng.

Hãy bắt đầu với **Variables**.

### Sử dụng tên có ý nghĩa và có thể phát âm.
##### Tên có ý nghĩa
Tên biến cần phải thể hiện rõ ý định và mục đích của biến đó, không được quá dài.
Chúng ta không nên đặt tên biết là "x" hoặc "y" trừ khi chúng ta đang phát triển các phần mềm toán học.
Giả sử chúng ta có các cách đặt tên biến như sau:
```javascript
const x; // What it is?!
const x; // User information
const user;
```
Ở Line 1, khi đọc code, chúng ta sẽ tự đặt câu hỏi: "x" là cái đ** gì vậy?
Điều này gây khó khăn cho chính bản thân bạn khi đọc lại code của mình và cũng là một thách thức cho người đọc code của bạn, review code của bạn.
Để hiểu được "x" là cái gì, có thể bạn sẽ phải đọc cả nguyên cả chục dòng code.

Ở Line 2. chúng ta có thể hiểu được nó là "User information".  Nhưng rõ ràng đây cũng không phải là cách tốt.
Ví dụ như chúng ta sử dụng "x" ở một chỗ khác. Chúng ta sẽ lại quay lại câu hỏi đầu tiên ở trên? What is x?

Và ở Line 3, đây chính xác là cách chúng ta đặt tên.
Một ví dụ khác về vấn đề này:

**BAD**
```javascript
const locations = ["Austin", "New York", "San Francisco"];
locations.forEach(l => {
  doStuff();
  doSomeOtherStuff();
  // ...
  // ...
  // ...
  // Wait, what is `l` for again?
  dispatch(l);
});
```
**GOOD**
```javascript
const locations = ["Austin", "New York", "San Francisco"];
locations.forEach(location => {
  doStuff();
  doSomeOtherStuff();
  // ...
  // ...
  // ...
  dispatch(location);
});
```
##### Tên có thể phát âm được
Đừng bao giờ đặt tên cho biến với một từ (thậm chí nó không phải là từ ) mà bạn khó có thể phát âm được.

**BAD**
```javascript
const yyyymmdstr = moment().format("YYYY/MM/DD");
```
**GOOD**
```javascript
const currentDate = moment().format("YYYY/MM/DD");
```

### Sử dụng cùng một từ cho cùng một loại biến
Sử dụng cùng một từ vựng cho cùng một loại dữ liệu. Đó là, nếu chúng ta cần lấy thông tin của người dùng hoặc khách hàng . Chúng ta không thể đề cập đến người dùng hoặc khách hàng bằng hai cách khác nhau. Nghĩa là cùng một thông tin của User, nhưng ở chỗ này chúng ta gọi đó là "người dùng", ở một chỗ khác chúng ta lại gọi la "Khách hàng". Trên thực tế, "người dùng" và "khách hàng" lại là một, và cùng được lưu một nơi trong Database.

**BAD**
```javascript
getUserInfo();
getCustomerInfo();
```
**GOOD**
```javascript
getUser();
```

### Sử dụng tên có thể tìm kiếm được

**BAD**
```javascript
// What the heck is 86400000 for?
setTimeout(blastOff, 86400000);
```
**GOOD**
```javascript
// Declare them as capitalized named constants.
const MILLISECONDS_IN_A_DAY = 86400000;

setTimeout(blastOff, MILLISECONDS_IN_A_DAY);
```
### Sử dụng các biến giải thích
Đôi khi trong khi code, bạn nhác phải thêm một biến vì biến đó chỉ sử dụng ở dòng sau nó, dùng để thêm một lời giải thích, tốn thêm một dòng code. Nhưng đừng bao giờ nghĩ như thế, sẽ không bao giờ là thừa cho biến đó vì nó có thể giúp code của bạn dễ hiểu hơn rất nhiều.
Nhưng cũng không nên lạm dụng quá nhiều việc này.
Hãy linh động khi sử dụng.

**BAD**
```javascript
const address = "One Infinite Loop, Cupertino 95014";
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
saveCityZipCode(
  address.match(cityZipCodeRegex)[1],
  address.match(cityZipCodeRegex)[2]
);
```
**GOOD**
```javascript
const address = "One Infinite Loop, Cupertino 95014";
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
const [, city, zipCode] = address.match(cityZipCodeRegex) || [];
saveCityZipCode(city, zipCode);
```

### Đừng thêm bối cảnh không cần thiết
**BAD**
```javascript
const Car = {
  carMake: "Honda",
  carModel: "Accord",
  carColor: "Blue"
};

function paintCar(car) {
  car.carColor = "Red";
}
```
**GOOD**
```javascript
const Car = {
  make: "Honda",
  model: "Accord",
  color: "Blue"
};

function paintCar(car) {
  car.color = "Red";
}
```
Rõ ràng là tên Object "Car" đã có thể liên kết với những key ở trong đó để bạn có thể hiểu được.
Bạn không cần thiết phải thêm tiền tố "car" vào mỗi key của object này.
Bạn nghĩ sao giữa **car.carColor** và **car.color**.
Hãy chú ý nhé.
### Sử dụng giá trị mặc định cho biến thay vì gán lại giá trị sử dụng ||
**BAD**
```javascript
function createMicrobrewery(name) {
  const breweryName = name || "Hipster Brew Co.";
  // ...
}
```
**GOOD**
```javascript
function createMicrobrewery(name = "Hipster Brew Co.") {
  // ...
}
```

### Kết  luận
Tổng hợp lại những chú ý khi sử dụng biến:
* Sử dụng tên có ý nghĩa và có thể phát âm.
*  Sử dụng cùng một từ cho cùng một loại biến
*  Sử dụng tên có thể tìm kiếm được
*  Sử dụng các biến giải thích
* Đừng thêm bối cảnh không cần thiết
* Sử dụng giá trị mặc định cho biến thay vì gán lại giá trị sử dụng ||

Hi vọng bài viết này sẽ có giúp ích cho các bạn khi code.

Link tham khảo:  https://github.com/ryanmcdermott/clean-code-javascript