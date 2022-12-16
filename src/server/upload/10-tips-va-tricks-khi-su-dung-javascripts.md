## Giới thiệu
Để phát triển web hoặc phát triển đa nền tảng, JavaScript đang trở nên phổ biến rộng rãi. Trước đây nó chỉ được coi là một ngôn ngữ kịch bản front-end nhưng giờ đây nó cũng trở nên phổ biến với tư cách là back-end. Ngay cả Facebook’s React Native cũng dựa trên JavaScript. Do đó, chắc chắn sẽ rất hữu ích nếu biết một số thủ thuật trong JavaScript không chỉ ngăn chúng ta viết thêm các dòng mã mà còn giúp mã của chúng ta trở nên sắc nét và hiệu quả.
## Các tips, trick giúp việc sử dụng Javascript hiệu quả hơn
### 1. Lập chỉ mục mảng nhanh hơn
Hãy xem xét một mảng [999, 998, 997, 996, 995], nếu chúng ta muốn gán giá trị của mảng này cho bất kỳ biến nào, chúng ta sẽ khai báo là const a = array[0]. Nếu chúng ta muốn gán nhiều biến, sẽ thật tẻ nhạt nếu cứ tiếp tục làm như vậy.
#### Khi bạn học ở trường
```javascript
    var array1 = [999, 998, 997, 996, 995]; 
    var x = array1[0]; 
    var y = array1[1]; 
    var z = array1[2]; 
    document.write("x = " + x + "<br>"); 
    document.write("y = " + y + "<br>"); 
    document.write("z = " + z + "<br>");
```
#### Output
```
x = 999
y = 998
z = 997
```
#### Cách tốt hơn
```javascript
    var array2 = [999, 998, 997, 996, 995]; 
    var [x, y, z, ...rest] = array2; 
    document.write("x = " + x + "<br>"); 
    document.write("y = " + y + "<br>"); 
    document.write("z = " + z + "<br>"); 
    document.write("rest = " + rest + "<br>"); 
```
#### Output
```
x = 999
y = 998
z = 997
rest = 996, 995
```
Do đó, việc gán cho nhiều biến như thế này có thể tiết kiệm thời gian và mã. Tuy nhiên, cần lưu ý rằng phần còn lại là mảng tập hợp những phần tử còn lại chứ không phải từng mục riêng lẻ.
### 2. Định nghĩa Function
Ý tưởng là đặt một số nhiệm vụ phổ biến hoặc lặp đi lặp lại với nhau và tạo một hàm để thay vì viết đi viết lại cùng một mã cho các đầu vào khác nhau, chúng ta có thể gọi hàm đó. Mọi người chắc hẳn đã sử dụng các hàm như thế này trong JavaScript.
#### Cách khai báo hàm thông thường
```html
<!DOCTYPE html> 
<html> 
  
<body> 
    <p>Usual function in JavaScript</p> 
    <p id="demo"></p> 
  
    <script> 
        function myFunction(p1, p2) { 
            return p1 * p2 ; 
        } 
        document.getElementById("demo").innerHTML 
                = myFunction(5, 4); 
    </script> 
</body> 
  
</html> 
```
#### Output
```
Usual function in JavaScript
20
```
#### Cách mới hơn: 
Có một cách khác mà thay vào đó, các hàm được coi là biến không phải là một thủ thuật rất hữu ích nhưng vẫn là một cái gì đó mới. Giữ hàm trong một biến, nó sử dụng các hàm mũi tên như thế này.
```html
<!DOCTYPE html> 
<html> 
  
<body> 
    <p> 
        Function treated as 
        variable in JavaScript: 
    </p> 
  
    <p id="demo"></p> 
  
    <script> 
        var myFunction = (p1, p2) => { 
            return p1 * p2; 
        } 
        document.getElementById("demo") 
            .innerHTML = myFunction(5, 4); 
    </script> 
</body> 
  
</html> 
```
#### Output
```
Function treated as variable in JavaScript
20
```
### 3. Định nghĩa function trong một dòng
Bây giờ thủ thuật này thực sự hay. Nếu bạn biết Python, bạn có thể biết hàm lambda hoạt động như một hàm tùy ý và được viết bằng một dòng. Chà, chúng tôi không sử dụng hàm lambda trong JavaScript, nhưng chúng tôi vẫn có thể viết các hàm một lớp. Giả sử chúng ta muốn tính tích của hai số a và b, chúng ta có thể làm điều đó trong tập lệnh một dòng. Chúng ta không cần phải viết cụ thể câu lệnh return vì cách xác định này đã có nghĩa là nó sẽ tự trả về kết quả đầu ra.
```html
<!DOCTYPE html> 
<html> 
   
<body> 
    <p> 
        Function treated as  
        variable in JavaScript 
    </p> 
   
    <p id="demo"></p> 
   
    <script> 
        const myFunction = (a, b) => a * b 
  
        document.getElementById("demo") 
            .innerHTML = myFunction(5, 4); 
    </script> 
</body> 
   
</html> 
```
#### Output
```
Function treated as variable in JavaScript
20
```
### 4. Kiểu Boolean
Trong khi mọi ngôn ngữ lập trình, chỉ có hai giá trị Boolean Đúng và Sai. JavaScript đưa nó đi xa hơn một chút bằng cách giới thiệu một tính năng cho phép người dùng tạo bools. Không giống như True và False, chúng thường được gọi là "Truthy" và "Falsy" tương ứng. Để tránh nhầm lẫn, tất cả các giá trị ngoại trừ 0, False, NaN, null, “” được mặc định là Truthy. Việc sử dụng bools mở rộng này giúp chúng tôi kiểm tra điều kiện một cách hiệu quả.
```javascript
    const a = !1; 
    const b = !!!0; 
  
    console.log(a); 
    console.log(b); 
```
#### Output
```
False
True
```
### 5. Lọc kiểu Boolean
Đôi khi chúng ta có thể muốn lọc ra tất cả các bools, chẳng hạn như các bools “Falsy” (0, False, NaN, null, “”) khỏi một mảng, điều này có thể được thực hiện bằng cách sử dụng kết hợp các hàm bản đồ và bộ lọc. Ở đây, nó sử dụng từ khóa Boolean để lọc ra các giá trị Falsy.
```javascript
arrayToFilter 
    .map(item => { 
        // Item values 
    }) 
      
    .filter(Boolean); 
```
```
Input: [1, 2, 3, 0, "Hi", False, True]

Output: [1, 2, 3, "Hi", True]
```
### 6. Tạo một Objects trống
Nếu được yêu cầu tạo một đối tượng trống trong JavaScript, phương thức truy cập đầu tiên của chúng ta sẽ sử dụng trong dấu ngoặc nhọn và gán nó cho một biến. Nhưng đây không phải là một đối tượng trống vì nó vẫn có các thuộc tính đối tượng của JavaScript như __proto__ và các phương thức khác. Có một cách để tạo một đối tượng mà không có bất kỳ thuộc tính đối tượng tồn tại nào. Đối với điều này, chúng ta khai báo một biến và gán nó cho một giá trị null với __proto__ của nó là không xác định.
```javascript
/* Using .create() method to create  
       a completely empty object */
  
    let dict = Object.create(null); 
  
    // dict.__proto__ === "undefined" 
```
Đối tượng này sẽ không có __proto__ mặc định hoặc các thuộc tính khác cho đến khi người dùng định nghĩa khác.
### 7. Truncate mảng
Mặc dù phương thức .splice () được sử dụng rộng rãi để cắt hoặc loại bỏ các phần cụ thể của một mảng, nhưng nó có độ phức tạp thời gian trong trường hợp xấu nhất là O (n). Tồn tại một giải pháp thay thế tốt hơn để xóa các phần tử khỏi phần cuối của mảng. Nó sử dụng thuộc tính .length của mảng để làm như vậy.
```javascript
let arrayToTruncate = [10, 5, 7, 8, 3, 4, 6, 1, 0]; 
  
/* Specifying the length till where the 
   array should be truncated */
arrayToTruncate.length = 6;   
console.log(arrayToTruncate) 
```
#### Output
Như đã thấy, chúng ta phải biết độ dài của mảng sẽ được cắt bớt theo cách này, nếu không nó sẽ dẫn đến lỗi. Thời gian chạy ở đây là O (k) trong đó k là số phần tử sẽ còn lại trong mảng.
```
[10, 5, 7, 8, 3, 4]
```
### 8. Merging objects
Sự ra đời của toán tử spread (…) cho phép người dùng dễ dàng hợp nhất với hoặc nhiều đối tượng đã đạt được trước đó bằng cách tạo một chức năng riêng biệt để thực hiện cùng một công việc.
#### Cách thông thường
```javascript
function mergeObjects(obj1, obj2) { 
    for (var key in obj2) { 
        if (obj2.hasOwnProperty(key)) obj1[key] = obj2[key]; 
    } 
    return obj1; 
} 
```
#### Cách cải tiến hơn
```javascript
    const obj1 = {}; // Items inside the object 
    const obj2 = {}; // Items inside the object 
  
    const obj3 = {...obj1, ...obj2}; 
```
```
Input: 
obj1 = { site:'abcd', purpose:'Education'}
obj2 = { location:'Noida'}

Output:
obj3 = {site:'abcd', purpose:'Education', location:'Noida'}
```
### 9. Câu điều kiện rút gọn
Kiểm tra và lặp qua các điều kiện là một phần thiết yếu của mọi ngôn ngữ lập trình. Trong JavaScript, chúng tôi làm điều đó như:
```javascript
if (condition) { 
    doSomething(); 
} 
```
Tuy nhiên, việc sử dụng các toán tử khôn ngoan giúp kiểm tra các điều kiện dễ dàng hơn và cũng làm cho mã code có một dòng:
```javascript
condition && doSomething(); 
```
### 10. Sử dụng regex để thay thế ký tự
Rất thường xuyên, người ta gặp phải tình huống trong đó mỗi lần xuất hiện của một ký tự hoặc một chuỗi con nhưng thật không may, phương thức .replace () chỉ thay thế một trường hợp xảy ra. Chúng ta có thể giải quyết vấn đề này bằng cách sử dụng regex với phương thức .replace ().
```javascript
    var string = "somethingstring"; // Some string 
  
    console.log(string.replace(/ing/, "abc")); 
```
#### Output
```
somethabcstrabc
```
## Kết thúc
Bài viết đến dây là kết thúc. Mong rằng những típ và trick này sẽ sẽ giúp đuọc các bạn trong việc code của mình.

Nguồn: [https://www.geeksforgeeks.org/javascript-top-10-tips-and-tricks/](https://www.geeksforgeeks.org/javascript-top-10-tips-and-tricks/)