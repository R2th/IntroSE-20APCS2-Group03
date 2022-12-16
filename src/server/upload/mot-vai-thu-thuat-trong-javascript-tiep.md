# Một vài thủ thuật trong javascript
1. Loại bỏ những điều kiện không cần thiết
2. Chuyển đổi sang số thập phân tiết kiệm hiệu suất
3. Sử dụng length để xóa phần tử trong mảng
4. Merge mảng sử dụng concat hoặc push
5. Sử dụng splice để xóa phần tử trong mảng
6. Sử dụng switch thay vì if/else
7. Lấy phần tử từ cuối mảng sử dụng slice
8. Kết 
## 1. Loại bỏ những điều kiện không cần thiết
- Khi sử dụng các giá trị mặc định một số kiếm tra cho giá trị đã tồn tại trở nên không cần thiết. Tuy nhiên bạn có thể bạn có thể làm việc với điều kiện true hoặc false. Nó sẽ khiến code ngắn gọn và tiết kiệm hơn.

Ví dụ:
```
if(a === true)
  console.log("ok");
 
hoặc
 
if(stringValue.length > 0)
  console.log("ok");
  
hoặc
  
if(isNaN(numberValue))
  console.log("ok");
```

Chúng ta có thể rút gọn như thế này:

```
if(a)
  console.log("ok");
 
hoặc
 
if(stringValue)
  console.log("ok");
  
hoặc
  
if(!numberValue)
  console.log("ok");
```

***Tổng quát điều kiện trả về false:***
1. Chuỗi có độ dài bằng 0
2. Số 0
3. Giá trị false
4. undefined
5. null
6. NaN

***Tổng quát điều kiện trả về true:***
1. mảng rỗng
2. đối tượng rỗng
..

## 2. Chuyển đổi sang số thập phân tiết kiệm hiệu suất
Thông thường chúng ta thường sử dụng  Math.floor, Math.ceil and Math.round để loại bỏ số thập phân. Thay vì sử dụng chúng hãy sử dụng ~~ để loại bỏ số thập phân.

```
Sử dụng

~~Math.round(Math.random()*100)

Thay vì 

Math.round(Math.random()*100)
```

## 3. Sử dụng length để xóa phần tử trong mảng
- Thủ thuật này giúp chúng ta thay đổi kích thước và xóa một vài phẩn tử trong mảng
- Để xóa n phần tử trong một mảng chúng ta có thể sử dụng array.length

ví dụ 1:
```
var mang1 = [5,6,7,3,2];
mang1.length = 3;

console.log(mang1);
// kết quả [5,6,7]

```

## 4. Merge mảng sử dụng concat hoặc push
- Để hợp nhất hai mảng với nhau chúng ta có thể sử dụng hàm concat, nó hoạt động tốt với mảng có kích thước nhỏ

ví dụ:

```
var mang1 = ["a", "b", "c"]; 
var mang2 = ["d", "e", "f"]; 

console.log(mang1.concat(mang2));
// kết quả ["a", "b", "c", "d", "e", "f"]; 
```

- Đối với mảng lớn concat hoạt động thực sự không hiệu quả và hiệu suất kém bởi vì concat tạo ra mảng mới riêng biệt vì vậy chúng ta có thể sử dụng push thay thế, push sẽ giữ nguyên mảng ban đầu và chỉ đẩy thêm phần tử vào mảng.

ví dụ:

```
var mang1 = ["a", "b", "c"]; 
var mang2 = ["d", "e", "f"]; 
mang1.push(...mang2);

console.log(mang1);
// kết quả ["a", "b", "c", "d", "e", "f"]; 
```

## 5. Sử dụng splice để xóa phần tử trong mảng
- splice thay thế một hoặc một số phần tử của mảng bằng một hoặc một số phần tử khác
- các phần tử bị bỏ đi có thể ít hơn các phần tử được thêm vào và ngược lại.

ví dụ:

```
var mang1 = ["a", "b", "c"]; 
mang1.splice(0, 2) ["a", "b"]

console.log(mang1)
// kết quả:["c"]
```

## 6. Sử dụng switch thay vì if/else
- Thực tế sử dụng switch sẽ tiết kiệm thời gian hơn if/else

## 7. Lấy phần tử từ cuối mảng sử dụng slice
- Chúng ta có thể lấy các phần tử từ cuối mảng bằng cách sử dụng slice với giá trị âm được cho phép

ví dụ:

```
var mang1 = ["a", "b", "c", "d", "e", "f"]; 

console.log(mang1.slice(-1)); // kết quả ["f"] 
console.log(mang1.slice(-2)); // kết quả ["e", "f"] 
console.log(mang1.slice(-3)); // kết quả ["d", "e", "f"]
```
## 8. Kết
Đây là những kiến thức mình tìm hiểu được về một số thủ thuật javascript, các bạn có thể tự tìm hiểu thêm các thủ thuật khác...