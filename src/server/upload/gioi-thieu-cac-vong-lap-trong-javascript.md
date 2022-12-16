Vòng lặp, hay còn gọi là looping là kĩ thuật rất quan trọng trong lập trình Javascript. Khi lập trình Javascript, bạn sẽ không thể tránh khỏi làm việc với mảng các phần tử hay thậm chí mảng của mảng.
Do đó, nếu nắm vững kiến thức về vòng lặp Javascript, bạn sẽ làm việc hiệu quả và có nhiều lựa chọn hơn khi cần sử dụng đến vòng lặp. Ở bài viết này, mình sẽ đi qua các cách tạo vòng lặp Javascript thường được sử dụng.
![](https://images.viblo.asia/f2b5ca40-a885-4a4a-9df2-f3aaa9d95d13.jpg)

# 1. Vòng lặp for
- Vòng lặp for trong javascript hoạt động cũng giống như các ngôn ngữ khác.
``` js
const list = ['a', 'b', 'c']
for (let i = 0; i < list.length; i++) {
  console.log(list[i])  //value 
  console.log(i)  //index
}
```

**Chú ý:**
- Để dừng vòng lặp for ta sử dụng `break`.
- Bỏ qua vòng lần lặp và chuyển sang lần tiếp theo, sử dụng `continue`

# 2. Vòng lặp forEach
![](https://images.viblo.asia/c6e0e966-bd96-4a19-91d6-f830e3b30509.png)

```js
const list = ['a', 'b', 'c']
list.forEach((item, index) => {
  console.log(item) //value
  console.log(index) //index
})

//index không bắt buộc
list.forEach(item => console.log(item))
```
- forEach mới xuất hiện trong những phiên bản Javascript gần đây (ES5) cho các trình duyệt hiện đại, giúp tạo vòng lặp với mảng nhanh hơn.
- Thật không may là chúng ta không thể dùng `break` cho vòng lặp này.

# 3. Vòng lặp While
- Vòng lặp while khá giống như vòng lặp for, là nó có điều kiện để duy trì vòng lặp, và thân vòng lặp chứa các thao tác sẽ được lặp. Khi điều kiện để duy trì không còn đúng đắn nữa, vòng lặp sẽ kết thúc.
- Và có thể dùng `continue` và `break` cho vòng lặp này.
```js
const list = ['a', 'b', 'c']
let i = 0
while (i < list.length) {
  console.log(list[i]) //value
  console.log(i) //index
  i = i + 1
}
```

# 4. Vòng lặp do-while
- Ở vòng lặp While, biểu thức so sánh sẽ được đánh giá trước. Nếu như biểu thức đúng thì các lệnh bên trong mới được thực hiện. Do..while hoạt động khác với While ở một điểm: các lệnh sẽ được chạy trước biểu thức so sánh điều kiện.

```js
const list = ['a', 'b', 'c']
let i = 0
do {
  console.log(list[i]) //value
  console.log(i) //index
  i = i + 1
} while (i < list.length)
```
![](https://images.viblo.asia/72764323-4306-4d1b-bf0b-164970bf2b47.png)

# 5. Vòng lặp For..in
- Vòng lặp For..in tương tự như vòng lặp For cơ bản, nhưng có 1 điểm quan trọng là For..in có thể được dùng cho 1 biến Object.

![](https://images.viblo.asia/486f6663-7753-4143-9c4d-a745c056a379.png)
```js
// Vòng lặp for..in cho 1 Mảng
var arr = ['JS','loop','for..in']
for ( var i in arr ) {
    console.log(arr[i])
}
 
// Vòng lặp for..in cho 1 Object
var obj = {
 'name': 'test object',
 'type': 'test',
 'id': 12888
}

for ( var i in obj ) {
 console.log(obj[i]);
}
```

# 6. Vòng lặp For..of
```js
// lặp giá trị cơ bản
for (const value of ['a', 'b', 'c']) {
  console.log(value) //value
}

// sử dụng entries() để lấy thêm index
for (const [index, value] of ['a', 'b', 'c'].entries()) {
  console.log(index) //index
  console.log(value) //value
}
```

# 7. Lời kết
- Javascript hỗ trợ nhiều loại vòng lặp để ta tùy nghi sử dụng trong nhiều tình huống. Tuy nhiên, do thói quen nên có thể bạn sẽ yêu thích một loại vòng lặp Javascript nhất định hơn, dù cho loại đó có thể có nhược điểm về tốc độ hay cú pháp. 
- Test tốc độ ở đây [jsperf](https://jsperf.com/loops-testing5/4)
- Tham khảo: [flaviocopes](https://flaviocopes.com/javascript-loops)