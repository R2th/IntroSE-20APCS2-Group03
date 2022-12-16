Xin chào anh em, lâu lắm rồi mình mới lại ngồi viết bài chia sẻ điều mình đã học được trong quá trình mới bước vào nghề :)) Thì trong bài viết này mình xin giới thiệu một thư viện javascript khá là hữu dụng trong quá trình làm dự án.
# 1.Giới thiệu
Lodash là một phiên bản mở rộng hơn của thư viện `underscore`, nó cung cấp rất nhiều tính năng linh hoạt cho các lập trình viên ví dụ như chức năng làm việc với mảng, làm việc với collection, object, vv ... Vì phạm vi bài viết cũng có hạn nên trong bài viết này mình sẽ giới thiệu cho các bạn những hàm trong thư viện `lodash` thường hay sử dụng nhất nhé.

Các bạn có thể dùng npm hoặc yarn để tải package này về dự án của mình sử dụng


# 2. Giới thiệu một số hàm hay sử dụng trong Lodash

**.assign(object, [source])** 
Đây là hàm hợp nhất các Object.
```Javascript
var firstObject = { 'name': 'A', 'age': 10};
var secondObject = { 'address': 'Ha Noi' }
var object = _.assign(firstObject, secondObject);
//kq: { 'address': 'Ha Noi', 'name': 'A', 'age': 10 }
```

Ngoài ra chúng ta cũng còn có thể custome firstObject với tham số thứ 3
```Javascript
var firstObject = { 'name': 'A', 'age': 10};
var object = _.assign({}, firstObject, { 'name' : 'B'});
//kq: { 'name': 'B', 'age': 10 }
```
Trường hợp dưới đây tạo ra một object sau khi hợp nhất firstObject và secondObject mà trường `name` trong firstObject bị customize
```Javascript
var firstObject = { 'name': 'A', 'age': 10};
var secondObject = { 'address': 'Ha Noi' }
var object = _.assign({},firstObject, {
    'name': 'Hoang'
}, secondObject);
//kq: { 'address': 'Ha Noi', 'name': 'Hoang', 'age': 10 }
```
Trường hớp dưới đây sẽ tạo ra một object sau khi hợp nhất firstObject và secondObject , trường `name` của firstObject và `address` của secondObject bị customize
```Javascript
var firstObject = { 'name': 'A', 'age': 10};
var secondObject = { 'address': 'Ha Noi' }
var object = _.assign({},firstObject, {
    'name': 'Hoang'
}, secondObject, {'address': 'Nhat Ban'});
//kq: { 'address': 'Nhat Ban', 'name': 'Hoang', 'age': 10 }
```

**.get(object, path, [dèaultValue])** Đây là hàm trả về một object
```Javascript
var object = { 'name': 'Hoang', 'age': 10};
_.get(object, 'name');
//kq: "Hoang"

_.get(object, 'address', 'Ha Noi')
//kq: "Ha Noi", nếu không để giá trị default cho trường address thì giá trị sẽ là undefined
```

**.pick(object, [paths])** Đây là hàm sẽ trả về một object với thuộc tính là thuộc tính của object nguồn
```Javascript
var object = { 'a': 1, 'b': '2', 'c': 3 };
 
_.pick(object, ['a', 'c']);
// => { 'a': 1, 'c': 3 }
```

**_.pickBy(object, [predicate=.identity])**  Đây là hàm sẽ trả về một đối tượng, tham số truyền vào là một đối tượng và một hàm lodash để xem giá trị thuộc tính của object có thỏa mãn hàm lodash hay không
```Javascript
var object = { 'name': 'Hoang', 'age': 12}
_pickBy(object, _isNumber)
//kq: { 'age': 12}
```

**.merge(object, [source])**
Hàm này tương đối giống với hàm `_.assign()` nhưng chỉ có điều hàm `_.assign()` sẽ overrite lại giá trị undefined, còn `_.merge()` thì không
```Javascript
_.assign      ({}, { a: 'a'  }, { a: undefined }) // => { a: undefined }
_.merge       ({}, { a: 'a'  }, { a: undefined }) // => { a: "a" }
```

**_.map(collection, [iteratee=_.identity])** Đây là hàm sẽ trả về là một array, tham số thứ hai sẽ là một hàm tính toán hoặc hàm điều kiện
```Javascript
function dieuKien(n) {
  if (n> 5) {
    return n;
  }
}
_.map([4, 8], dieuKien);
//kq: [undefined, 8] do phần tử đầu tiên là 4 không thoải mãn hàm dieuKien.

```

**_curry(func, [arity=func.length])** Đây là hàm  sẽ trả về là một function, với tham số đâu tiên là một function.
```Javascript
var temp = function(name, age, address) {
    return `Name : ${name} , age: ${age}, address: ${address}`;
}
var info = _.curry(temp);
    info("Hoang", 12, "Ha Noi");
    //kq: "Name : Hoang , age: 12, address: Ha Noi"
```

**_.concat(array, [values])** Đây là hàm sẽ tạo một array mới nối các giá trị từ [value] vào mảng array
```Javascript
var array = ['name','age'];
var result = _.concat(array, ['address']);
//kq: ['name','age', 'address']
```

**_.flow([funcs])** Đây là hàm sẽ trả về kết quả  sau giá trị truyền vào được tính toán qua các hàm [func].
```Javascript
function multiple(n) {
    return 2*n;
}

var add = _.flow([_.add, multiple]);
var result = add(3,4);
//kq : 14
```

**_.filter(collection, [predicate=_.identity])** Đây là nhận vào đối số đầu tiên là một collection, tham số thứu hai là một hàm điều kiện để lọc ra các giá trị cần thiết lấy từ collection - tham số đầu tiên.
```Javascript
var collection = [
    {'name': 'A', 'age': 20, },
    {'name': 'B', 'age': 12}
]

_.filter(collection, function(c){
    return c.age > 18;
})

//kq: {age: 20, name: "A"} 
```

**_.flatten(array)** Hàm này nhận tham số đầu vào là array chứa nhiều array lồng nhau, kết quả trả về là mảng mới.
```Javascript
_.flatten([1, [2, [3, [4]], 5]]);
// => [1, 2, [3, [4]], 5]
```

**_.omit(object, [paths])** hàm này truyền vào một object chứa các thuộc tính, tham số thứ hai là các thuộc tính của object không được trả về khi của kết quả trả về.
```Javascript
var object = {'name': 'Hoang', 'age': 20, 'address': 'Ha Noi'}
_.omit(object, ['address', 'age']);
//kq: {'name': 'Hoang'}
```

**_.range(start=0,end, step=1)** Đây là hàm sẽ trả về kết quả là một mảng giá trị nằm trong khoảng từ start cho đến end, tham số thứ 3 là bước nhảy. Số phần từ sẽ chạy từ 0 cho đến end -1, có end phần tử.
```Javascript
_.range(3) //kq: [0,1,2] 
]
```

**.uniq(array)** Hàm này sẽ nhận vào tham số là một mảng. Kết quả trả về là một mảng giá trị trùng nhau trong mảng gốc sẽ bị loại bỏ.
```Javascript
var array = ['Hoang', 'An', 'Hoang', 'Hang'];
_.uniq(array);
//kq: ['Hoang', 'An', 'Hang'];
```

**_.escape([string=''])** Đây là hàm sẽ convert các ký tự đặc biết như `"&", "<", ">", '"', và "'"` trong đoạn text chúng ta truyền vào là tham số thứ nhất. Sau đó nó sẽ render ra HTML entities.
```Javascript
_.escape('fred, barney, & pebbles');
// => 'fred, barney, &amp; pebbles'
```

**_.slice(array, [start=0], [end=array.length])** Đây là hàm sẽ trả về một array. Tức là nó sẽ cắt array ban đầu ra từ vị trí start cho đến vị trí end.
```Javascript
_.slice([1,2,3,4,5], 1, 3)
//kq: [2, 3]
```

**_.find(collection, [predicate=_.identity], [fromIndex=0])** Đây là hàm sẽ trả về một phần tử mà thỏa mãn điều kiện tham số thứ 2. Kết quả sẽ trả về phần tử đầu tiên mà thỏa mãn điều kiện của tham số thứ 2.
```Javascript
var array = [1,2,3,4,5,6];
_.find(array, function(a) { return a < 4});
kq: 1
```
# 3.Kết luận
Qua bài viết trên mình mong rằng đã mang đến những điều hữu ích cho các bạn. Đây chỉ là một số hàm cơ bản mình muốn giới thiệu đến các bạn biết cách dùng nó như thế nào. Có rất nhiều hàm mà bạn có thể ứng dụng rất nhiều trong dự án của mình. Cảm ơn các bạn đã đọc bài viết của mình.
# 4.Tham khảo
https://lodash.com/docs