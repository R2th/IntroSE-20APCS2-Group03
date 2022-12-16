Xin chào mọi người!

Hôm nay mình sẽ giới thiệu cơ bản mảng trong javascript. Bài viết chỉ mang tính chất giới thiệu các khái niệm căn bản.

Hy vọng sẽ được thảo luận cùng anh em. Không để chờ lâu bắt đầu luôn nào.

**Không có cách học nào tốt hơn việc thực hành.**

Để chạy thử ví dụ các bạn có thể vào https://jsfiddle.net/ để chạy code xem kết quả cụ thể.

### 1. Array là gì?

Mảng là 1 kiểu dữ liệu thuộc kiểu tham chiếu (reference type) dùng để lưu trữ nhiều values (giá trị) trong 1 biến duy nhất.

Ví dụ:
```js
const cars = ["Saab", "Volvo", "BMW"];
console.log(cars);
console.log(typeof cars); //Lưu ý: Kiểu của array là object (reference type)
```

Phần tử của array có thể là: number, boolean, string, object, function,…
```js
myArray[0] = Date.now;
myArray[1] = myFunction;
myArray[2] = myCars;
```

### 2. Một số thao tác cơ bản với array

**- Tạo mới array**

```js
const array_name = [item1, item2, ...]; 
```
**- Truy cập phần tử**

Ta có thể truy cập 1 phần tử của array thông qua index. (trong array index sẽ bắt đầu từ 0).

Ví dụ bên dưới có 3 phần tử sẽ có index lần được là 0("Saab"), 1("Volvo"), 2("BMW")

```js
const cars = ["Saab", "Volvo", "BMW"];
let x = cars[0];    // x = "Saab"
```

**-  Thêm phần tử vào cuối array: (push keyword)**

```js
const fruits = ["Banana", "Orange", "Apple"];
fruits.push("Lemon");  // Adds a new element (Lemon) to fruits
```

**- Thêm nhiều phần tử vào array (splice keyword)**

```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2, 0, "Lemon", "Kiwi");
console.log(fruits); //Kết quả: ["Banana", "Orange", "Lemon", "Kiwi", "Apple", "Mango"]
```

Tham số đầu tiên sẽ xác định vị trí thêm mới. (ở đây thêm vào vị trí số 2 (index là 2) sau phần tử index 1 (Orange))

Tham số thứ hai là số phần tử remove. (ở đây là 0 phần tử)

Các tham số còn lại là phần tử mới được thêm vào.

**- Xóa phần tử cuối array: (pop keyword)**

```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.pop();  // Removes "Mango" from fruits
console.log(fruits); //Kết quả ["Banana", "Orange", "Apple"]
```

**- Xóa phần tử dựa vào index (delete keyword)**

```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];
delete fruits[1];           // Changes the second element in fruits to undefined
console.log(fruits); //kết quả: ["Banana", undefined, "Apple", "Mango"]
```

**Lưu ý:** Khi xóa phần tử bằng delete keyword thì phần tử đó vẫn còn trong array nhưng có giá trị là undefined.

**- Xóa phần tử đầu tiên trong array (shift keyword)**
```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];
let x = fruits.shift();    // x = "Banana"  Removes "Banana" from fruits
```

**Lưu ý:** Pop xóa phần tử cuối cùng của mảng, shift xóa phần tử đầu tiên của mảng

**- Thêm phần tử vào đầu mảng (unshift keyword)**
```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.unshift("Lemon");    // Adds "Lemon" to fruits
```

**Lưu ý:** Push thêm phần tử vào cuối mảng, còn unshift thêm phần tử vào đầu mảng

### 3. Khác nhau giữa array và object

Trong javascript cả 2 đều có kiểu object nhưng

- Array sử dụng number index. Có thể thao tác với mảng qua index(index bắt đầu từ 0)
```js
const fruits = ["Banana", "Orange", "Apple"];
fruits[6] = "Lemon"; 
```

- Object sử dụng name index. Có thể thao tác với object qua field name của object(ví dụ: fistName, lastName)

```js
const person = {
  firstName: "John",
  lastName : "Doe",
  id       : 5566
};
console.log(person.firstName);
```

### 4. Clone array (nhân bản mảng)

Bởi vì array cũng là kiểu tham chiếu(**reference type**) như object nên ta phải cẩn thận khi dùng phép gán.

Như ở ví dụ bên dưới ta gán anotherCourses cho array courses với mong muốn tạo ra 1 array mới(anotherCourses ) độc lập và giống giá trị của array cũ (courses).

Nhưng khi ta gán giá trị cho phần tử số 0 của anotherCourses thì courses cũng bị thay đổi theo do array là kiểu tham trị nên course và anotherCourses cùng trỏ về 1 địa chỉ. Điều này đã sai với mục đích ban đầu.

Ví dụ:

```js
const courses = ["Javascript", "Reactjs", "C#"];
const anotherCourses = courses;
anotherCourses[0] = "Jquery"; 
console.log("Courses: " + courses); //"Courses: Jquery,Reactjs,C#"
console.log("Another Courses: " + anotherCourses); //"Another Courses: Jquery,Reactjs,C#"
```

**Vậy nên để clone array ta sử dụng sử dụng spread để clone array**

**Spread** sẽ giúp rã 1 mảng thành 1 list các phần tử. Copy các phần tử của course sang anotherCourses là 1 mảng mới.

Và khi ta thay đổi giá trị course thì anotherCourses không bị thay đổi.

```js
const courses = ["Javascript", "Reactjs", "C#"];
const anotherCourses = [...courses];
anotherCourses[0] = "Jquery"; 
console.log("Courses: " + courses); //"Courses: Jquery,Reactjs,C#"
console.log("Another Courses: " + anotherCourses); //"Another Courses: Jquery,Reactjs,C#"
```

### 5. Vòng lặp trong mảng

- Dùng vòng lặp for với index (cách truyền thống trước khi có ES5)

```js
const courses = ["Javascript", "Reactjs", "C#"];
for(let i = 0; i < courses.length; i++){
	console.log(courses[i]);
}
```

- Dùng forEach(forEach xuất hiện từ ES5) Cú pháp:

![image.png](https://images.viblo.asia/ecd7dbac-a56e-4204-a7e1-19e32a80408e.png)


Thường sẽ dùng 2 kiểu đầu tiên để lấy ra index và value của mỗi phần tử trong array.

```js
forEach((element) => { ... } )
forEach((element, index) => { ... } )
```


Ví dụ:

Kiểu 1:

```js
const courses = ["Javascript", "Reactjs", "C#"];
courses.forEach(x => console.log(x));
```

Kiểu 2:
```js
const courses = ["Javascript", "Reactjs", "C#"];
courses.forEach((course, index) => {
	console.log("index:  " + index + " - value: " + course)
});
```

- For of (xuất hiện từ ES6)
```js
const courses = ["Javascript", "Reactjs", "C#"];
for(let course of courses){
	console.log(course);
}
```

### 6. Sử dụng map trong array (biến đổi -transform array thành 1 array mới)

Javascript cung cấp hàm map để tạo mới một mảng mới dựa trên mảng ban đầu (mảng cũ). Lưu ý số lượng phần tử của mảng mới phải bằng phần tử số lượng mảng cũ.

Ví dụ đơn giản nhất là ta tạo ra mảng mới từ mảng cũ bằng cách nhân đôi giá trị của mỗi phần tử trong mảng cũ

```js
const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]
```

Cú pháp:
![image.png](https://images.viblo.asia/ce3255c0-82c5-4f16-b738-8fae7646cb12.png)

Ví dụ map với string array: Tạo 1 array mới từ array cũ.

> Input: ["Javascript", "Reactjs", "C#"]

> Output: ["Course số 1: Javascript", "Course số 2: Reactjs", "Course số 3: C#"]

```js
const courses = ["Javascript", "Reactjs", "C#"];
const newCourse = courses.map((course, index) => {
	let numberCourse = index + 1;
	return "Course số: " + numberCourse + ": " + course;
})
console.log(newCourse);
```


Tham khảo:

https://www.w3schools.com/js/js_arrays.asp

https://fullstack.edu.vn/blog/co-banarray-trong-javascript-phan-1.html

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map