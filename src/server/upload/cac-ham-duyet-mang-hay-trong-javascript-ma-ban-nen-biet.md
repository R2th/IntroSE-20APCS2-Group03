# **Mở đầu**
Hiện nay, hầu hết khi code chúng ta đều phải xử lý các mảng dữ liệu. Và sử dụng vòng for để duyệt là cách vô cùng dễ dàng và phổ biến. Tuy nhiên, sử dụng vòng for cũng đem lại nhiều nhược điểm, ví dụ như mỗi lần duyệt, vòng for sẽ khai báo lại giá trị đếm mà ta sử dụng. Hôm nay, chúng ta sẽ cùng tìm hiểu các hàm được sử dụng trong javascript để làm việc với mảng một cách ngắn gọn và chuyên nghiệp hơn.

# **Spread**
Spread chia một mảng thành các phần tử, để sử dụng chúng ta chỉ cần thêm ... vào trước mảng được khai báo

**Ví dụ: Ta có một mảng và muốn in tất cả các phần tử của mảng đó**
```js
let example = ["dog", "cat", "fish", "chicken"]

console.log(...example)

//output: dog cat fish chicken
```

**Ưu điểm của spread:**
* Cú pháp sử dụng ngắn, dễ dàng
* Tiện lợi trong việc show toàn bộ phần tử của mảng

# **Includes()**
Includes được sử dụng để kiểm tra xem một phần tử đã biết liệu đã tồn tại trong mảng hay chưa, nếu mảng có chứa phần tử đó, includes sẽ trả về true và ngược lại.

**Ví dụ: Ta có một mảng ["dog", "cat", "fish", "chicken"] và muốn kiểm tra xem phần tử "dog" có nằm trong mảng đó hay không**
```js
let example = ["dog", "cat", "fish", "chicken"]

console.log(example.includes("dog"))

//output: true
```

**Ưu điểm của includes:**
* Dễ dàng sử dụng để kiểm tra phần tử có trong trong mảng hay không
* Dễ dàng đọc hiểu

# **Every()**
Every sẽ duyệt qua từng phần tử trong mảng và trả về true nếu các phần tử đều thỏa mãn điều kiện cho trước và ngược lại

**Ví dụ: Ta có một mảng [20, 21, 22, 23] và muốn kiểm tra xem tất cả các phần tử đều lớn hơn 1 hay không**
```js
let example = [20, 21, 22, 23]

example.every((value) => value > 1)

//output: true
```

**Ưu điểm của every:**
* Đảm bảo mọi phần tử đều thỏa mãn điều kiện
* Dễ dàng viết các câu điều kiện bằng hàm

# **Some()**
Some sẽ duyệt qua từng phần tử trong mảng và trả về true nếu có ít nhất 1 phần tử đều thỏa mãn điều kiện cho trước và ngược lại

**Ví dụ: Ta có một mảng [20, 21, 22, 23] và muốn kiểm tra xem có tồn tại ít nhất 1 phần tử lớn hơn 22 hay không**
```js
let example = [20, 21, 22, 23]

example.some((value) => value > 22)

//output: true
```

**Ưu điểm của some:**
* Đảm bảo có ít nhất 1 phần tử thỏa mãn điều kiện
* Dễ dàng viết các câu điều kiện bằng hàm

# **Filter()**
Filter trả về một mảng mới với các phần tử là các phần tử thỏa mãn điều kiện cho trước

**Ví dụ: Ta có một mảng [20, 21, 22, 23] và muốn lấy ra một mảng chứa các phần tử là số chẵn trong mảng trên**
```js
let example = [20, 21, 22, 23]

example.filter((value) => value % 2 ===0)

//output: [20, 22]
```

**Ưu điểm của filter:**
* Dễ dàng lọc phần tử của mảng
* Cú pháp dễ dàng, ngắn gọn

# **Map()**
Map thao tác với từng phần tử trong mảng và xuất ra mảng mới

**Ví dụ: Ta có một mảng [20, 21, 22, 23] và muốn lấy ra một mảng chứa các phần tử là các giá trị trong mảng trên + 100**
```js
let example = [20, 21, 22, 23]

example.map((value) => {
    return value + 100;
})

//output: [120, 121, 122, 123]
```

**Ưu điểm của map:**
* Dễ dàng thao tác với từng phần tử mình muốn trong mảng mà không làm thay đổi giá trị của mảng
* Cú pháp dễ dàng, ngắn gọn

# **Reduce()**
Reduce sẽ biến đổi một mảng thành một giá trị đơn giản bằng cách duyệt qua từng phần tử từ trái sang phải

**Ví dụ: Ta có một mảng [20, 21, 22, 23] và muốn tính tổng của tất cả các phần tử trong mảng**
```js
let example = [20, 21, 22, 23]

example.reduce((prev, next) => prev + next)

//output: 86
```

**Ưu điểm của reduce:**
* Thực hiện tính toán dễ dàng
* Code ngắn gọn, dễ hiểu

# **Lời kết**
Qua bài viết này, mình đã giới thiệu đến các bạn một số hàm hay trong javascript được sử dụng để thao tác với dữ liệu của mảng. Mong bài viêt sẽ giúp các bạn code nhanh và hiệu quả hơn với javascript.