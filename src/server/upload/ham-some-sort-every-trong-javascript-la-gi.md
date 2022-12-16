## Hàm some trong javascript là gì?

Hàm some trong js có nhiệm vụ lặp qua tất cả các phần tử của mảng, mỗi lần lặp nó sẽ truyền giá trị của phần tử đang lặp vào hàm callback. Chỉ cần hàm callback return true là hàm some sẽ return true. Ngược lại, nếu duyệt hết mảng mà không có return true nào thì hàm some sẽ return false.

Nói đơn giản, nếu một phần tử nào đó thỏa với chương trình trong hàm callback thì hàm some sẽ return true. Ngược lại nếu tất cả các phần tử đều không thỏa thì nó sẽ return false.

Cú pháp của some như sau:
```
// Arrow function
some((element) => { ... } )
some((element, index) => { ... } )
some((element, index, array) => { ... } )
 
// Callback function
some(callbackFn)
some(callbackFn, thisArg)
 
// Inline callback function
some(function callbackFn(element) { ... })
some(function callbackFn(element, index) { ... })
some(function callbackFn(element, index, array){ ... })
some(function callbackFn(element, index, array) { ... }, thisArg)
```

**Trong đó:**
* **element** là biến chứa giá trị của phần tử đang lặp.
* **index** là key của phần tử đang lặp.
* **array** là mảng gốc mà phần tử đang thuộc về.
* **thisArg** là tham số không bắt buộc. Nếu được truyền vào thì thisArg sẽ được sử dụng làm giá trị "this", nếu không được truyền vào thì giá trị "this" là "undefined".

**Ví dụ:** Kiểm tra xem trong mảng numbers có số nào lớn hơn 10 hay không.

```
function isBiggerThan10(element, index, array) {
  return element > 10;
}
 
[2, 5, 8, 1, 4].some(isBiggerThan10);  // false
[12, 5, 8, 1, 4].some(isBiggerThan10); // true
```

bạn cũng có thể sử dụng arrow function cho trường hợp này như sau:

```
[2, 5, 8, 1, 4].some(x => x > 10);  // false
[12, 5, 8, 1, 4].some(x => x > 10); // true
```
**Một ví dụ khác về hàm some trong js:**

**Ví dụ:** Sử dụng hàm some để kiểm tra điểm số của học sinh được lưu dưới dạng mảng có bị trượt kì thì không.

**Quy ước**: có một môn dưới 5 điểm sẽ bị tính là trượt.

Bài này khá đơn giản, ta chỉ cần viết một hàm kiểm tra một số, nếu số bé hơn 5 thì return false, ngược lại return true. Sau đó gắn nó vào hàm callback của mảng điểm số.

```
<button onclick="myFunction()">Kiểm tra</button>
 
<p id="demo"></p>
 
<script>
    var score = [7, 8, 9, 10, 3];
 
    function checkPass(score) {
        return score < 5;
    }
 
    function myFunction() {
        if (score.some(checkPass) == true) {
            document.getElementById("demo").innerHTML = 'không đủ điểm đỗ!';
        } else {
            document.getElementById("demo").innerHTML = 'Đủ điểm đỗ!';
        }
    }
</script>
```


## Hàm sort trong javascript là gì?

Hàm sort là một method thuộc đối tượng array trong javascript, được đùng dể sắp xếp các phần tử trong mảng tăng dần hoặc giảm dần theo số thứ tự trong bảng mã ascii, hoặc theo quy tắc trong callback function.

* Mặc định các phần tử sẽ được sắp xếp theo bảng chữ cái với thứ tự tăng dần, điều này khiến phương thức sort sẽ sắp xếp các chuỗi rất chính xác. Tuy nhiên, khi sắp xếp các số sẽ không được chính xác (ví dụ 20 và 100 thì 20 sẽ lớn hơn 100 vì 2 > 1).
* Bạn có thể khắc phục điều này bằng việc truyền tham số là một mảng so sánh.
* Hàm sort sẽ làm thay đổi mảng ban đầu.

**Cú pháp sort javascript như sau:**

```
// Functionless
array.sort()
 
// Arrow function
array.sort((firstEl, secondEl) => { ... } )
 
// Compare function
array.sort(compareFn)
 
// Inline compare function
array.sort(function compareFn(firstEl, secondEl) { ... })
```

**Trong đó:** compareFn là tham số không bắt buộc. Đây là một callback function dùng để quyết định thứ tự sắp xếp của các phần tử trong mảng. Hai tham số firstEl và secondEl đại diện cho hai phần tử kề nhau trong mảng, và ta sẽ sử dụng nó để quyết định cách sắp xếp.

* Nếu hàm callback trả về số lớn hơn 0 thì secondEl sẽ đứng trước firstEl.
* Nếu hàm callback trả về số bé hơn hoặc bằng 0 thì thứ tự được giữ nguyên, tức là firstEl sẽ đứng trước secondEl.



**Ví dụ hàm array sort trong javascript**

**Ví dụ 1**: Trường hợp sắp xếp với chuỗi.
```
const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.sort(); // Apple,Banana,Mango,Orange
```

**Ví dụ 2**  rường hợp sắp xếp với số.


```
var score = [700, 8, 9, 10, 3];
 
console.log(score.sort());
// Keets Kết quả: [10, 3, 700, 8, 9]
```

Như bạn thấy, kết quả trả về là sai, bởi hàm sort nó hiểu giữa hai số 3 và 10 thì 3 lớn hơn 1, vì vậy 3 sẽ đứng sau 10.

Để khắc phục thì ta sẽ sử dụng callback function như sau:

```
console.log(score.sort( (firstEl, secondEl) => {
    if (secondEl > firstEl){
        return -1;
    }
    else {
        return 0;
    }
} ));
 
// Kết quả: [3, 8, 9, 10, 700]
```

## Hàm every trong javascript là gì?

Every javascript là một phương thức dành cho đối tượng mảng trong javascript. Công dụng của hàm này là giúp kiểm tra tất cả các phần tử trong mảng có thõa mãn một điều kiện nào đó hay không. Nếu tất cả phần tử đều thỏa thì sẽ trả về true, ngược lại nếu chỉ cần một phần tử không thỏa thôi là nó sẽ trả về false.

**Cú pháp hàm every như sau:**

```
array.every(function(currentValue, index, arr), thisValue)
```

**Trong đó:**

* currentValue - giá trị của phần tử hiện tại.
* index - chỉ số của phần tử hiện tại.
* arr - mảng mà phần tử hiện tại thuộc về.
* thisValue - tham số không bắt buộc. Nếu được truyền vào thì thisValue sẽ được sử dụng làm giá trị của this, nếu không được truyền vào thì giá trị this là "undefined".

Mỗi phương thức xử lý trong hàm every sẽ thực hiện một lần với lần lượt tất cả các phẩn tử trong mảng,

Nếu có một phần tử của mảng không thỏa mãn phương thức của hàm every và trả về False, hàm every đó sẽ trả về False. Nếu không có lỗi xảy ra hàm every sẽ trả về True.

**Lưu ý:**

* Hàm every sẽ không thực hiện chức năng truyền vào đối với các phần tử không có giá trị.
* Hàm every không làm thay đổi mảng ban đầu.

**Bạn có thể tách function ra một hàm riêng biệt như sau:**
```
array.every(check, thisValue)
 
function check(currentValue, index, arr){
    // Code
}
```

**Ví dụ:** Kiểm tra tất cả phần tử của mảng có lớn hơn 20 không.

```
/ Danh sách mảng
const ages = [32, 33, 15, 40]
 
// Kiểm tra
console.log(ages.every(checkAge))    // Returns false
 
// Hàm kiểm tra giá trị truyền vào có lớn hơn 20 không
function checkAge(age) {
  return age > 20;
}
```

Vì phần tử thứ 3 có giá trị là 15, bé hơn 20 nên kết quả sẽ trả về là false.

**ví dụ về hàm every trong javsascript**

**Ví dụ 1:** Sử dụng hàm every để kiểm tra điểm số của học sinh được lưu dưới dạng mảng có đủ để đỗ kì thì không.

Quy ước: tất cả các môn trên hoặc bằng 5 điểm thì được xem là đỗ.

```
var score = [7, 8, 9, 10,3];
 
function checkPass(score) {
    return score >= 5;
}
 
function myFunction() {
    if (score.every(checkPass) == true) {
        document.getElementById("demo").innerHTML = 'Đủ điểm đỗ!';
    }else{
        document.getElementById("demo").innerHTML = 'không đủ điểm đỗ!';
    }
}
```
Như vậy là chúng ta đã học xong cách sử dụng hàm  some,sort ,every. Hãy làm theo ví dụ và kiểm tra kết quả nhé!!!