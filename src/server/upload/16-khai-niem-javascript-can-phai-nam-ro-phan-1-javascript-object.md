### Lời mở đầu

Để trở thành 1 chuyên gia về Javascripts, có một số khái niệm và công nghệ phát triển Web liên quan đến Javascripts mà bạn cần nắm rõ và hiểu rõ về nó. Nêú nắm chắc được 16 khái niệm mà series này liệt kê, thì xin chúc mừng, bạn đã có nền tảng vững chắc để có thể xây dựng các ứng dụng Web với Javascript hiện đại. 

Mình sẽ giải thích về từng khái niệm trong số 16 khái niệm này, và hy vọng rằng tất cả những người quan tâm đến ngôn ngữ này sẽ trở thành những lập trình viên chuyên sâu hơn về Javascript khi đi qua hết chuỗi bài viết này. Mình tin rằng mọi người quan tâm đến bài viết này đã học về Javascript đúng cách hoặc biết về nó đủ để xây dựng 1 ứng dụng đơn giản. Cũng nên lưu ý rằng, 16 khái niệm dưới đây không quá phức tạp và cũng không quá khó, bạn có thể hiểu chúng dễ dàng nếu đã có hiểu biết cơ bản về Javascript.


**Và trong bài viết này, mình sẽ trình bày về khái niệm đầu tiên: Object trong Javascript, một cách cụ thể nhất có thể**


-----

# Object là gì?

Một đối tượng là một danh sách không theo thứ tự các kiểu dữ liệu nguyên thủy (và đôi khi là các kiểu dữ liệu tham chiếu) được lưu trữ như là 1 loạt các cặp tên đi kèm với giá trị. Mỗi mục trong danh sách này được gọi là thuộc tính (các hàm được gọi là các phương thức).

Dưới đây là 1 đối tượng đơn giản:
```js
var myFirstObject = {firstName: "Richard", favoritesAuthor: "Conrad"};
```

Hãy nghĩ đơn giản, 1 đối tượng như 1 danh sách chứa các mục, và mỗi mục (tương ứng với các thuộc tính và phương thức) trong danh sách được lưu trữ bở một cặp tên - giá trị. Trong ví dụ trên, thuộc tính là ```firstName``` đi kèm với giá trị là "Richard", và 1 thuộc tính khác là ```favoriteAuthor``` đi kèm với giá trị là "Conrad".

Tên thuộc tính có thể là 1 chuỗi hoặc 1 số, nhưng nếu tên thuộc tính là 1 số, nó phải được truy cập với ký hiệu ngoặc vuông. Dưới đây là 1 ví dụ khác về đối tượng có tên thuộc tính là số:

```js
var ageGroup = {30: "Mature", 100: "Very old"};
console.log (ageGroup.30) // Điều này sẽ gây ra lỗi
// Đây là cách bạn sẽ truy cập giá trị của thuộc tính 30, để nhận giá trị "Mature"
console.log (ageGroup ["30"]); // Mature
// Tốt nhất là tránh sử dụng các số làm tên thuộc tính.
```

Không chỉ riêng đối với Javascript mà ở nhiều loại ngôn ngữ khác, bạn sẽ thường xuyên sử dụng đối tượng, chủ yếu để lưu trữ dữ liệu và để tạo các phương thức và chức năng tủy chỉnh của riêng bạn

# Kiểu dữ liệu tham chiếu và kiểu dữ liệu nguyên thủy

Một trong những khác biệt chính giữa kiểu dữ liệu tham chiếu và kiểu dữ liệu nguyên thủy là giá trị của kiểu dữ liệu tham chiếu được lưu trữ dưới dạng tham chiếu, nó không được lưu trực tiếp trên biến, dưới dạng giá trị, như kiểu dữ liệu nguyên thủy. Ví dụ:

```js
// Chuỗi kiểu dữ liệu nguyên thủy được lưu trữ dưới dạng giá trị
var person = "Kobe";
var anotherPerson = person; // anotherPerson = giá trị của person
person = "Bryant"; // giá trị của person đã thay đổi

console.log (anotherPerson); // Kobe
console.log (person); // Bryant
```

Điều đáng chú ý là mặc dù chúng ta đã thay đổi người thành “Bryant”, biến anotherPerson vẫn giữ nguyên giá trị của người đó.

So sánh dữ liệu nguyên gốc được lưu dưới dạng giá trị được minh họa ở trên với dữ liệu được lưu dưới dạng tham chiếu cho đối tượng:

```js
var person = {name: "Kobe"};
var anotherPerson = person;
person.name = "Bryant";

console.log (anotherPerson.name); // Bryant
console.log (person.name); // Bryant
```

Trong ví dụ này, chúng ta đã sao chép đối tượng ```person``` sang ```anotherPerson```, nhưng vì giá trị trong ```person``` được lưu trữ dưới dạng tham chiếu và không phải là giá trị thực, khi chúng ta thay đổi thuộc tính ```person.name``` thành “Bryant”, ```anotherPerson``` phản ánh thay đổi vì nó không bao giờ được lưu trữ một bản sao thực sự của giá trị riêng của nó thuộc tính của ```person```, nó chỉ có một tham chiếu đến nó.

# Thuộc tính dữ liệu của Object cũng có thuộc tính

Mỗi thuộc tính dữ liệu (thuộc tính của đối tượng để lưu trữ dữ liệu) không chỉ có cặp giá trị - tên mà còn có 3 thuộc tính đi kèm (3 thuộc tính mặc định là true):
- Thuộc tính có thể định cấu hình: Chỉ định xem thuộc tính có thể bị xóa hoặc thay đổi hay không.
- Enumerable: Chỉ định xem thuộc tính có thể được trả về trong vòng lặp hay không.
- Có thể ghi: Chỉ định xem thuộc tính có thể thay đổi hay không.

# Khởi tạo Object
Có 2 cách thông thường được sử dụng để khởi tạo object

### Object literals
Cách thông dụng nhất và cũng là cách dễ nhất để khởi tạo đối tượng:
```js
// This is an empty object initialized using the object literal notation
var myBooks = {};

// This is an object with 4 items, again using object literal
var mango = {
  color: "yellow",
  shape: "round",
  sweetness: 8,

  howSweetAmI: function () {
    console.log("Hmm Hmm Good");
  }
}
```

### Object constructor
Cách phổ biến thứ hai để tạo đối tượng là sử dụng constructor. Một hàm khởi tạo là một hàm được sử dụng để khởi tạo các đối tượng mới và ta sử dụng từ khóa mới để gọi hàm khởi tạo.
```js
var mango =  new Object ();
mango.color = "yellow";
mango.shape= "round";
mango.sweetness = 8;

mango.howSweetAmI = function () {
  console.log("Hmm Hmm Good");
}
```

# Khởi tạo Object trên thực tế

Đối với các đối tượng đơn giản có thể chỉ gọi 1 lần trong ứng dụng để lưu trữ dữ liệu, 2 phương pháp ở trên có lẽ là thừa đủ.

Tuy nhiên, chúng ta xét thử 1 bài toán yêu cầu hiểu thị trái cây và chi tiết về từng loại trái cây. Tất cả các loại trái cây trong ứng dụng của bạn đều có các thuộc tính sau: màu sắc, hình dạng, vị, chi phí và phương thức ```showName```. Nó sẽ thực sự tẻ nhạt và mất công khi phải copy lại các dòng code mỗi khi muốn tạo ra 1 đối tượng trái cây mới.

```js
var mangoFruit = {
  color: "yellow",
  sweetness: 8,
  fruitName: "Mango",
  nativeToLand: ["South America", "Central America"],

  showName: function () {
    console.log("This is " + this.fruitName);
  },
  nativeTo: function () {
   this.nativeToLand.forEach(function (eachCountry)  {
     console.log("Grown in:" + eachCountry);
   });
  }
}
```

Nếu bạn có 10 loại trái cây, bạn sẽ phải copy và chỉnh sửa lại đoạn code này 10 lần. Và thử tưởng nếu chúng ta phải thay đổi lại phương thức đã được khai báo, chúng ta sẽ phải thay đổi 10 lần. 

Nói đến đây chắc hẳn các bạn cũng hình dung ra cách thức mà chúng ta tạo ra các đối tượng cho đến nay không phải là lý tưởng. Để giải quyết bài toán lặp đi lặp lại này, các kĩ sư phần mêm đã nghĩ ra 1 khái niệm: mẫu (giải pháp cho các công việc lặp đi lặp lại và phổ biến) để việc phát triển phần mềm trở nên hiệu quả và sắp xếp hợp lí hơn.

Dưới đây là 2 mẫu phổ biến để tạo object

### Constructor pattern
```js
function Fruit (theColor, theSweetness, theFruitName, theNativeToLand) {

  this.color = theColor;
  this.sweetness = theSweetness;
  this.fruitName = theFruitName;
  this.nativeToLand = theNativeToLand;

  this.showName = function () {
    console.log("This is a " + this.fruitName);
  }

  this.nativeTo = function () {
  this.nativeToLand.forEach(function (eachCountry)  {
   console.log("Grown in:" + eachCountry);
    });
  }
}
```

Và đây là cách chúng ta khởi tạo ra các đối tượng trái cây:

```js
var mangoFruit = new Fruit ("Yellow", 8, "Mango", ["South America", "Central America", "West Africa"]);
mangoFruit.showName(); // This is a Mango.
mangoFruit.nativeTo();
//Grown in:South America
// Grown in:Central America
// Grown in:West Africa

var pineappleFruit = new Fruit ("Brown", 5, "Pineapple", ["United States"]);
pineappleFruit.showName(); // This is a Pineapple.
```

Nếu cần thiết phải thay đổi phương thức ```showName```, bạn chỉ phải thực hiện ở 1 vị trí. Mẫu bao bọc tất cả các chức năng và đặc điểm của tất cả các loại trái cây bằng cách taọ ra duy nhất 1 function ```Fruit``` với tính kế thừa

### Prototype pattern
```js
function Fruit () {}

Fruit.prototype.color = "Yellow";
Fruit.prototype.sweetness = 7;
Fruit.prototype.fruitName = "Generic Fruit";
Fruit.prototype.nativeToLand = "USA";

Fruit.prototype.showName = function () {
  console.log("This is a " + this.fruitName);
}

Fruit.prototype.nativeTo = function () {
  console.log("Grown in:" + this.nativeToLand);
}

var mangoFruit = new Fruit ();
mangoFruit.showName(); // This is a Generic Fruit
mangoFruit.nativeTo(); // Grown in:USA
```

# Tiếp cận thuộc tính của Object
2 cách thông thường để truy cập vào thuộc tính của đối tượng là thông qua dấu ```.``` và dấu ```[]```
### Thông qua ```.```
```js
var book = {title: "Ways to Go", pages: 280, bookMark1: "Page 20"};

// To access the properties of the book object with dot notation, you do this:
console.log (book.title); // Ways to Go
console.log (book.pages); // 280
```

### Thông qua ```[]```
```js
console.log (book["title"]); //Ways to Go
console.log (book["pages"]); // 280

//Or, in case you have the property name in a variable:
var bookTitle = "title";
console.log (book[bookTitle]); // Ways to Go
console.log (book["bookMark" + 1]); // Page 20
```

# Thuộc tính sở hữu và thuộc tính kế thừa
Object có thuộc tính sở hữu và thuộc tính kế thừa. Thuộc tính sở hữu là thuộc tính được khai báo theo object, còn thuộc tính kế thừa là thuộc tính được kế thừa từ nguyên mẫu của đối tượng

Để kiểm tra thuộc tính có tồn tại không, ta sử dụng ```in```
```js
// Create a new school object with a property name schoolName
var school = {schoolName: "MIT"};

// Prints true because schoolName is an own property on the school object
console.log("schoolName" in school);  // true

// Prints false because we did not define a schoolType property on the school object, and neither did the object inherit a schoolType property from its prototype object Object.prototype.
console.log("schoolType" in school);  // false
 
// Prints true because the school object inherited the toString method from Object.prototype. 
console.log("toString" in school);  // true
```

Để kiểm tra xem object có sở hữu thuộc tính nào đó hay không, ta sử dụng phương thức ```hasOwnProperty```
```js
// Create a new school object with a property name schoolName
var school = {schoolName: "MIT"};

// Prints true because schoolName is an own property on the school object
console.log(school.hasOwnProperty ("schoolName"));  // true
 
// Prints false because the school object inherited the toString method from Object.prototype, therefore toString is not an own property of the school object.
console.log(school.hasOwnProperty ("toString"));  // false 
```

Đếm số lượng thuộc tính:
```js
// Create a new school object with 3 own properties: schoolName, schoolAccredited, and schoolLocation.
var school = {schoolName:"MIT", schoolAccredited: true, schoolLocation:"Massachusetts"};

//Use of the for/in loop to access the properties in the school object
for (var eachItem in school) {
  console.log(eachItem); // Prints schoolName, schoolAccredited, schoolLocation
}
```

Các thuộc tính được kế thừa từ ```Object.prototype``` là không đếm được do đó không thể hiển thị trong vòng lặp. Tuy nhiên các thuộc tính có thể đếm được vẫn có thể hiển thị ra:

```js
 //Use of the for/in loop to access the properties in the school object
for (var eachItem in school) {
  console.log(eachItem); // Prints schoolName, schoolAccredited, schoolLocation
}

// Create a new HigherLearning function that the school object will inherit from.
function HigherLearning () {
  this.educationLevel = "University";
}

// Implement inheritance with the HigherLearning constructor
var school = new HigherLearning ();
school.schoolName = "MIT";
school.schoolAccredited = true;
school.schoolLocation = "Massachusetts";

//Use of the for/in loop to access the properties in the school object
for (var eachItem in school) {
  console.log(eachItem); // Prints educationLevel, schoolName, schoolAccredited, and schoolLocation
}
```
Trong ví dụ cuối, có thể thấy thuộc tính ```educationLevel``` được khai báo kèm với function ```HigherLearning``` và được list ra là 1 trong các thuộc tính của ```school``` mặc dù đó không phải là 1 thuộc tính sở hữu mà được kế thừa.

Để xóa thuộc tính của object, ta sử dụng toán tử ```delete```. Bạn không thể xóa bỏ thuộc tính kế thừa, để xóa bỏ thuộc tính này bạn phải xóa bỏ thuộc tính được kế thừa của object nguyên mẫu. Bên cạnh đó, bạn cũng không thể xóa bỏ thuộc tính của đối tượng toàn cục, được định nghĩa với từ khóa ```var```.

Toán tử ```delete``` trả về ```true``` nếu thuộc tính được xóa bỏ thành công. Và đáng ngạc nhiên, nó cũng trả về ```true``` nếu thuộc tính không tồn tại hoặc không thể xóa bỏ.

Dưới đây là 1 ví dụ
```js
var christmasList = {mike: "Book", jason: "sweater" }
delete christmasList.mike; // deletes the mike property

for (var people in christmasList) {
  console.log(people);
}
// Prints only jason
// The mike property was deleted

delete christmasList.toString; // returns true, but toString not deleted because it is an inherited method

// Here we call the toString method and it works just fine—wasn’t deleted 
christmasList.toString(); //"[object Object]"

// You can delete a property of an instance if the property is an own property of that instance. 
// For example, we can delete the educationLevel property from the school's object we created above because the educationLevel property is defined on the instance: we used the "this" keyword to define the property when we declare the HigherLearning function. We did not define the educationLevel property on the HigherLearning function's prototype.

console.log(school.hasOwnProperty("educationLevel")); // true
// educationLevel is an own property on school, so we can delete it
delete school.educationLevel; // true 

// The educationLevel property was deleted from the school instance
console.log(school.educationLevel); // undefined

// But the educationLevel property is still on the HigherLearning function
var newSchool = new HigherLearning ();
console.log(newSchool.educationLevel); // University

// If we had defined a property on the HigherLearning function's prototype, such as this educationLevel2 property:
HigherLearning.prototype.educationLevel2 = "University 2";

// Then the educationLevel2 property on the instances of HigherLearning would not be own property. 

// The educationLevel2 property is not an own property on the school instance
console.log(school.hasOwnProperty("educationLevel2")); // false
console.log(school.educationLevel2); // University 2

// Let's try to delete the inherited educationLevel2 property
delete school.educationLevel2; // true (always returns true, as noted earlier)

// The inherited educationLevel2 property was not deleted
console.log(school.educationLevel2); // University 2
```

# Serialize và Deserialize Object
Để gửi đối tượng thông qua HTTP hoặc convert sang kiểu string, chúng ta cần phải serialize đối tượng đó. Có thể dùng phương thức ```JSON.stringify``` để serialize đối tượng.

Ngược lại, để deserialize, ta sử dụng ```JSON.parse```

Ví dụ:
```js
var christmasList = {mike:"Book", jason:"sweater", chelsea:"iPad" }
JSON.stringify (christmasList);
// Prints this string:
// "{"mike":"Book","jason":"sweater","chels":"iPad"}"

// To print a stringified object with formatting, add "null" and "4" as parameters:
JSON.stringify (christmasList, null, 4);
// "{
//  "mike": "Book",
//  "jason": "sweater",
//  "chels": "iPad"
//}"

// JSON.parse Examples \\
// The following is a JSON string, so we cannot access the properties with dot notation
var christmasListStr = '{"mike": "Book", "jason": "sweater", "chels": "iPad"}';

// Let’s convert it to an object
var christmasListObj = JSON.parse (christmasListStr); 

// Now that it is an object, we use dot notation
console.log(christmasListObj.mike); // Book
```



-----
Trên đây mình đã trình bày khá là trọn vẹn những gì cần nắm rõ về đối tượng trong Javascript. Hy vọng qua bài viết này mọi người có thể hiểu hơn và làm việc tốt hơn với kiểu dữ liệu này. 

*Bài viết được tham khảo tại: **http://javascriptissexy.com/javascript-objects-in-detail/***