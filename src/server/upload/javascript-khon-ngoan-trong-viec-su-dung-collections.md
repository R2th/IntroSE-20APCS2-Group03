![](https://images.viblo.asia/a1cf8dca-0f1f-442c-b500-dac2fd7348b3.jpg)
##### Collections là gì?
Collections là một kiểu dữ liệu mà chúng ta hay thường sử dụng để lưu trữ dữ liệu có dạng một danh sách các giá trị, gọi dưới cái tên cụ thể là arrays, sets và maps.<br/><br/>

##### Tại sao tôi cần quan tâm đến nó?
Trong Javascript, chúng ta thường xuyên phải làm việc với collection, đơn giản như việc trỏ lần lượt đến từng phần tử, lọc ra những thứ cần thiết, tìm một phần tử hoặc thậm chí giảm mảng ban đầu bằng nhiều cách khác nhau. <br/>
Có 3 phương thức chính để thao tác với collection là `.map()`, `.filter()`, và `.reduce()`.<br/>
Nắm vững trong tay 3 phương thức này là một bước quan trọng để viết ra một đoạn `code sạch`, rõ ràng và dễ hiểu.<br/>
Ngoài ra trong bài viết mình có kết hợp sử dụng cú pháp **arrow function trong ES6** giúp cú pháp gọn gàng hơn. Do đây không phải là trọng tâm của bài viết nên bạn có thể tìm hiểu thêm thông qua những bài viết trước đó của mình hoặc thông qua google nhé :v.
Hãy bắt đầu mới một mảng chứa thông tin của các `developer` sau:
```javascript
let developers =  [
    { id: 1, name: 'Bjarne Stroustrup', born: 1950 },
    { id: 2, name: 'James Gosling', born: 1955 },
    { id: 3, name: 'Linus Torvalds', born: 1969 },
    { id: 4, name: 'Guido van Rossum', born: 1956 },
    { id: 5, name: 'Ken Thompson', born: 1943 }
]
```
### Map pattern
Map sẽ áp dụng một function đến từng phân tử trong mảng và trả về một mảng mới với giá trị là kết quả khi chạy function đó.<br/>
Rườn ra thế là đủ rồi. Hiểu đơn giản như bây giờ chúng ta có một mảng object, nếu bạn muốn sửa đổi dữ liệu của từng phần tử, hoặc đơn giản chỉ là lấy ra những thuộc tính cần thiết thì hãy sử dụng `.map()`.<br/>
Ví dụ như chúng ta chỉ cần lấy ra ngày sinh của từng developer thôi thì làm như thế nào nhỉ.<br/>
**Input:** Một mảng dữ liệu developers <br/>
**Output:** Một mảng dữ liệu chỉ chứa tên của các developer
#### Khi không dùng map():
Sử dụng `for()`:
```javascript
var listNameEmployeesUsingFor =  function (developers) {

    var listNames = [];
    
    for (let i = 0; i < developers.length; i++) {
        listNames.push(developers[i].name)
    }
    
    return listNames
}
```
Sử dụng `.forEach()`:
```javascript
var listNameEmployeesUsingForEach =  function (developers) {

    var listNames = [];

    developers.forEach(function (developer) {
        listNames.push(developer.name);
    });

    return listNames
}
```
#### Và khi dùng map() 
Sử dụng `.map()`:
```javascript
var listNameEmployeesUsingMap = function(developers) {
    return developers.map(function(developer) {
        return developer.name;
    });
}

// better and faster (using arrow function)
var listNameEmployeesUsingMap = function(developers) {
    return developers.map(developer => developer.name);
}

// ["Bjarne Stroustrup", "James Gosling", "Linus Torvalds", "Guido van Rossum", "Ken Thompson"]
```
Chuyện gì vừa xảy ra vậy? Sao chỉ có 1 dòng return mà đã ra được những cái kia. Hãy để tôi giải thích những gì đã xảy ra khi dùng map ở ví dụ trên nhé:
1. Tạo 1 mảng mapArr
2. Lặp qua các phần tử của mảng developers
3. Gọi hàm mapFunc với phần tử hiện tại làm đối số 
4. Đẩy kết quả của mapFunc vào mảng mapArr
5. Trả về mảng mapArr sau khi đã duyệt qua tất cả các phần tử<br/>
 
Khá là giống với việc sử dụng `.for()` và `.forEach` đúng không.
#### Ngoài ra bạn có thể xử lý dữ liệu (thêm, sửa đổi) thông qua map()
Giúp tôi lấy ra số tuổi của developer nào:
```javascript
developers.map(function(developer) {
  return 2020 - developer.born;
});

// better and faster (using arrow function)
developers.map(developer => 2020 - developer.born);

// [70, 65, 51, 64, 77]
```

#### Cách tạo ra hàm map()
Hàm `.map()` có thể được thực hiện thông qua đệ quy.
```javascript
const customMap = (fn, arr, i=0, result=[]) =>
i < arr.length ? customMap(fn, arr, i+1, [...result, fn(arr[i])]) : result


console.log(customMap(developer => developer.name, developers))
// ["Bjarne Stroustrup", "James Gosling", "Linus Torvalds", "Guido van Rossum", "Ken Thompson"]
```

### Filter Pattern
Filter sẽ áp dụng một function kiểm tra điều kiện duyệt qua từng phần tử một, sang đó trả về một mảng mới với dữ liệu chứa các phần tử đã pass điều kiện đó(trả về true).<br/>
Cái tên nói lên tất cả, bất kể khi nào bạn muốn lọc dữ liệu từ một mảng hãy sử dụng filter nhé.
Hãy bắt đầu với việc lấy ra những developer sinh sau năm 1950.<br/>
**Input:** Một mảng dữ liệu developers <br/>
**Output:** Một mảng dữ liệu chỉ chứa những developer sinh sau năm 1950
#### Cách tốt nhất
```javascript
var listDevelopersOlder25UsingFilter =  function(developers) {
    return developers.filter(function(developer) {
        return developer.born <= 1950;
    });
};

// better and faster(using arrow function)
var listDevelopersOlder25UsingFilter =  function(developers) {
    return developers.filter(developer => developer.born <= 1950);
}
```
Hãy đi từng bước để biết hàm `.filter()` hoạt động như thế nào nha:
1. Tạo một mảng trống filterArr.
2. Lặp qua các phần tử mảng.
3. Gọi đến hàm filterFunc với phần tử hiện tại làm đối số.
4. Nếu kết quả là đúng, đẩy phần tử vào mảng filterArr.
5. Trả về mảng filterArr sau khi đi qua tất cả các phần tử.
#### Khi không dùng filter
```javascript

var listDevelopersOlder1950UsingForEach = function (developers) {
    var listOfAges = [];

    developers.forEach(function (developer) {
        if (developer.born < 1950)
            listOfAges.push(developer.born);
    });

    return listOfAges
}
```
Và đây là kết quả trả về:
```javascript
[ 
 { id: 1, name: 'Bjarne Stroustrup', born: 1950 },
 { id: 5, name: 'Ken Thompson', born: 1943 } 
]
```
#### Cách tạo ra hàm filter() 
Chúng ta có thể tạo ra hàm filter() bằng cách sử dụng hàm đệ quy.
```javascript
const customFilter = (predicate, arr, i = 0, res = []) => {
    if (i < arr.length) {
        return predicate(arr[i])
            ? customFilter(predicate, arr, i + 1, [...res, arr[i]]) : customFilter(predicate, arr, i + 1, res);
    }
    return res;
};

console.log(customFilter(developer => developer.born <= 1950, developers))
/*[ 
 { id: 1, name: 'Bjarne Stroustrup', born: 1950 },
 { id: 5, name: 'Ken Thompson', born: 1943 } 
 ]*/
```
### Reduce Pattern
Reduce sẽ chuyển đổi mảng thành một giá trị bằng cách kết hợp từng phần tử lại với nhau.<br/>
Ví dụ như bạn có một mảng dữ liệu các bảng điểm các môn học, giờ bạn muốn biết điểm phẩy của mình thì reduce sẽ dẽ dàng giúp bạn tính toán và trả về điểm phẩy cho bạn.
Giờ chúng ta muốn biết năm sinh trung bình của các developer thì như thế nào nhỉ:<br/>
**Input:** Một mảng dữ liệu developers <br/>
**Output:** Năm sinh trung bình của các developer
#### Cách tốt nhất
Sử dụng `.reduce()`, thật sự rất đơn giản:
```javascript
var averageYear = developers.reduce(function(acc, developer) {
    return acc + developer.born, 0)/(developers.length);
});

// better and faster
var averageYear = developers.reduce((acc, developer) => acc + developer.born, 0)/(developers.length)
<< 1954.6
```
#### Khi không dùng reduce 
```javascript
var sumOfYears = 0

developers.forEach(function(developer) {
    sumOfYears += developer.born
});

var averageYear = sumOfYears/(developers.length)
```
### Bonus
### Cách sử dụng join()
Nếu bạn muốn có được thông tin đây đủ của developer thì làm như thế nào?
```javascript
const toString = function(developer) {
    return developer.name + "was born in " + developer.born
}
```
Mọi thứ có vẻ ổn đấy, nhưng chúng ta nên viết như sau thì hơn đấy:
```javascript
const toString = function(developer) {
    return [developer.name, "was born in", developer.born].join(" ")
}
```
### Cách sử dụng .min() hoặc .max() 
Việc so sánh 2 giá trị với nhau và sau đó trả về giá trị nhỏ hơn hoặc lớn hơn khá là phố biến đấy:
Cách điển hình để giải quyết vấn đề đó là:
```javascript
Math.min.apply(Math, (developers.map(developer => developer.born)))
<< 1946
```
Tại sao phải như vậy? Hàm `Math.min()` sẽ trả về giá trị nhỏ nhất của bất kỳ tập hợp số nào đúng không. Mỗi tham số được truyền vào lần lượt chứ không phải là truyền thẳng vào một mảng. Để dễ hiểu hơn, hay xem ví dụ dưới đây:
```javascript
Math.min(1, 2, 3, 4)
<< 1
Math.min([ 1, 2, 3, 4 ])
<< NaN
```
Trước ES6/ES2015 .apply() function đã được dùng để giải quyết vấn đề đó. 
Ngoài ra cũng có thể dùng Spread syntax (...) đối với ES6
```javascript
Math.min.apply(Math, [ 1, 2, 3, 4 ])
<< 1
Math.min.apply(null, [ 1, 2, 3, 4 ])
<< 1
Math.min(...[1, 2, 3, 4])
<< 1
```
### Cách tạo ra hàm sum()
Hàm .sum () trả về tổng của tất cả các giá trị trong một mảng đã cho.
```javascript
const sum = function(arr) {
    return arr.reduce((a,b) => a + b, 0)
}
```
### Tham khảo
https://levelup.gitconnected.com/use-collections-wisely-in-javascript-c1440f2ff595 <br/>
https://www.freecodecamp.org/news/how-to-write-your-own-map-filter-and-reduce-functions-in-javascript-ab1e35679d26/