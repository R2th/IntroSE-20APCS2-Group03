Tiếp tục series về những thủ thuật javascript
- [4 CSS tips and tricks](https://viblo.asia/p/4-css-tips-and-tricks-WAyK8JpWlxX)
- [Some useful javascript functions (P2)](https://viblo.asia/p/some-useful-javascript-functions-p2-Az45bPwNZxY)
- [4 useful Javascript function](https://viblo.asia/p/4-useful-javascript-function-eW65GJvYlDO)
- [4 Javascript Operators with question mark](https://viblo.asia/p/4-javascript-operators-with-question-mark-gGJ59M1G5X2)
- [Some useful javascript tips](https://viblo.asia/p/some-useful-javascript-tips-Az45be66lxY)
- ....

## 1. Resize the Array using an array. length.

Lấy 1 array tính từ vị trí đầu tiên từ 1 array gốc

```
a=['Pune','Hyderabad','Banglore','Mumbai','Indore','Delhi']
console.log(a.length) //OUTPUT 6
a.length=3
console.log(a) //OUTPUT ['Pune','Hyderabad','Banglore']
```

## 2. Swapping of two Numbers.

```
let a=10;
let b=20;
console.log(a,b) //OUTPUT: 10,20
[a,b]=[b,a]
console.log(a,b) //OUTPUT :20,10
```

## 3. Concatenating two or more arrays without causing server overload.
Cùng xem cách cũ và cách mới nhé
```
//old way
a=[1,2,3,4,5]
b=[4,5,6,7,8]
c=a.concat(b) //This will Create a new array c and then will push contents fo array a and array b in array c which will consume lot of memory.
console.log(c) //OUTPUT:1,2,3,4,5,4,5,6,7,8


//new way
a=[1,2,3,4,5]
b=[4,5,6,7,8]
a.push.apply(a,b) // it will only push the content of array b in array a.
console.log(a)
```

bạn có thể thấy ở cách bên dưới chúng ta đã tiết kiệm được việc tạo thêm một biến c nhưng vẫn có kết quả như mong muốn. Việc này tuy nhỏ nhưng mà tích tiểu thành đại mà phải không :))

## 4. How about loop 100 times?

```
[...Array(100)].map((it,index)=>console.log(index))
```

Chúng ta sẽ tạo ra 1 Array và loop qua nó. Cú pháp rất đơn giản và dễ nhớ

## 5. String to number / Number to string.

```
// string to number
a="123"
console.log(+a) //Output 123
b=""
console.log(+b) //NaN

//number to string

a=123
console.log(a+"")
```

## 6. Get n power of any number.

```
console.log(2 ** 3) //8
console.log(2 ** 12)  //4096
```

## 7. new.target in javascript
```
// new.target được sử dụng để phát hiện rằng 1 function được gọi có sử dụng từ khoá new hay không.
function learn(){ 
  new.target?console.log("Called using new"):console.log("Called without new")
}

learn() //called without learn
new learn() //called using new.
//In arrow functions, new.target is inherited from the surrounding scope.
```

## 8. Simple deep flatten an object
Có sự hộ trợ của Lodash :))
```
function flattenObject(obj) {
  let flattenDepthOne = _.flatMapDeep(obj);
  _.map(flattenDepthOne, (item, index) => {
    if (typeof item === "object") {
      flattenDepthOne[index] = flattenObject(item);
    }
  });
  return _.flattenDeep(flattenDepthOne);
}
```

Đây mới chỉ tuỳ chỉnh để làm phẳng "object".

## 9. Rest parameters Syntax.

```
function abc(...args)
{
  console.log(args)
}
abc(1) //[1]
abc(1,2) //[1,2]
abc(1,2,3) //[1,2,3]
abc(1,2,3,4)//[1,2,3,4[
```

Đỡ phải đặt tên biến phải không tuy nhiên nó sẽ hữu dụng trong 1 số trường hợp, nếu lạm dụng bạn sẽ làm code của mình trở nên khó hiểu, khó maintain.