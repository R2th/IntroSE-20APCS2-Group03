# Array method
Ngôn ngữ nào cũng vậy, phải nắm những chức năng quan trọng để giải quyết nhanh hơn chứ không riêng gì về javascript.
Array là một phần không thể thiếu trong các dự án javascript, vì vậy hôm nay mình xin giới thiệu một số array methods phổ biến thường dùng
sau đây những method mình cảm thấy là nó phổ biến, hay dùng, nên muốn chia sẻ cho anh em nào đang bắt đầu học javascript
### 1, Array.from 
Có thể để hỗ trợ cho map(). filter()...
Cho phép bạn tạo các array từ một kiểu dữ liệu khác
![](https://images.viblo.asia/b5f26003-23c3-4b86-b856-756241de17b9.JPG)
### 2. filter()
* filter() dùng để lọc ra các phần tử trong mảng thoả mãn một điều kiện nào đó
* filter() KHÔNG làm thay đổi mảng ban đầu
* filter() trả về 1 mảng mới sau khi lọc
* filter() trả về một mảng RỖNG nếu không có phần tử nào thỏa mãn điều kiện
* Cú pháp
```
var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
```
![](https://images.viblo.asia/99fa5c93-49eb-4cea-8c52-8d029acb8585.JPG)

### 3. find()
find() cũng dùng để lọc phần tử trong mảng, tuy nhiên nó sẽ trả về giá trị ĐẦU TIÊN tìm thấy ở trong mảng hoặc có thể trả về undefined nếu không tìm thấy
* find() KHÔNG làm thay đổi mảng ban đầu
* Cú pháp
```
arr.find(callback(element[, index[, array]])[, thisArg])
```

### 4. forEach()
* forEach() dùng để duyệt qua từng phần tử của mảng
* forEach() trả về undefined
* Cú pháp
```
arr.forEach(function callback(currentValue[, index[, array]]) {
    // your iterator
}[, thisArg]);
```
### 5. includes()
Đây là method mới trong ES6
* includes() kiểm tra xem phần tử đã cho có tồn tại trong mảng hay không
* includes() KHÔNG làm thay đổi mảng ban đầu
* includes() trả về kiểu Boolean: true nếu tìm thấy hoặc false nếu không tìm thấy
* Cú pháp
```
arr.includes(valueToFind[, fromIndex])
```

### 6. indexOf()
* indexOf() dùng để tìm kiếm vị trí của phần tử trong mảng
* indexOf() KHÔNG làm thay đổi mảng ban đầu
* indexOf() trả về giá trị index ĐẦU TIÊN của mảng nếu phần tử tồn tại trong mảng
* indexOf() trả về -1 nếu phần tử không tồn tại trong mảng
* Cú pháp
```
arr.indexOf(searchElement[, fromIndex])
```


### 7. map()
map() giúp tạo ra một mảng mới với các phần tử là kết quả từ việc thực thi một hàm lên TỪNG PHẦN TỬ của mảng ban đầu
* map() KHÔNG làm thay đổi mảng ban đầu
* Cú pháp
```
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
    // return element for new_array
}[, thisArg])
```
### 8 Array.of javascript
Có thể hiểu nôm na là khi truyền vào một số đơn,
sẽ tạo giá trị đó như một element trong array, thay vì tạo ra số lượng các element đó.

![](https://images.viblo.asia/3a644b76-394e-4ca0-bfab-ade50fb99ad6.JPG)

### 9. reduce()
có thể nói đây là 1 method quan trọng như kiểu anh cả của các method còn lại, bởi vì nó có thể giúp chúng ta rất nhiều :
* làm phẳng mảng
* thay thế cho filter
* tính tổng 
* nối mảng
* …...
* reduce() dùng để thực thi một hàm lên từng phần tử của mảng (từ trái sang phải) với một biến tích lũy để thu về một giá trị duy nhất
* reduce() KHÔNG làm thay đổi mảng ban đầu
reduce() trả về giá trị sau khi rút gọn
* Cú pháp
```
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```

### 10. sort()
Mặc định các phần tử sẽ được sắp xếp theo bảng chữ cái với thứ tự tăng dần.
* sort() CÓ làm thay đổi mảng ban đầu
* sort() trả về mảng sau khi được sắp xếp
* Cú pháp
``` 
arr.sort([compareFunction])
```


## Kết luận :
những methods trên là những methods khá thông dụng và được sử dụng nhiều của mình, mọi người hãy để lại ý kiến riêng của bản thân để giúp mình hoàn thiện hơn nhé !
> good luck for you