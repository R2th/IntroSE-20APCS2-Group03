Javascripts (JS) giúp lập trình viên đưa vào trang web của mình những thành phần quan trọng. Hầu hết các lập trình viên đều hiểu tầm quan trọng của việc tối ưu hóa 1 đoạn code JS, nhưng không phải ai cũng biết cách thức triển khai việc này. Trong bài viết này, mình sẽ giới thiệu 1 vài hacks nho nhỏ giúp rút ngắn đoạn code JS.

# 1. Bộ lọc mảng
1 tips nhỏ để lọc ra 1 nhóm phần tử từ 1 đơn vị mảng. Phương thức này sẽ sinh ra 1 mảng được fill với các phần tử của 1 mảng cho sẵn với điều kiện các phần tử này đã thông qua 1 phép thử (phương thức). Dựa trên yêu cầu mà chúng ta tạo ra phương thức callback khác nhau cho các phần tử không cần thiết.
Trong ví dụ dưới đây, các phần tử null là các phần tử cẩn phải loại bỏ:
```
schema = ["hi", "ihaveboyfriend", null, null,  "goodbye"]
schema = schema.filter(function(n) {
            return n
        });
Output:   ["hi", "ihaveboyfriend",  "goodbye"]
```

# 2. Sử dụng phương thức String.replace() để thay thế giá trị
Phương thức ```String.replace()``` cho phép bạn thay chuỗi bằng 1 chuỗi khác hoặc Regex
Thông thường, phương thức này thay thế chuỗi ở lần xuất hiện đầu tiên của nó. Nhưng để thay thế tất cả sử dụng phương thức ```replaceAll()```, ta dùng ```/g``` ở cuối của đoạn Regex:

```
var string = "login login";  
console.log(string.replace("in", "out")); // "logout login"  
console.log(string.replace(/in/g, "out")); //"logout logout"
```

# 3. Chuyển đổi sang dạng Float mà không làm giảm hiệu năng
Thông thường, chúng ta sử dụng các phương thức ```math.floor```, ```math.ceil``` và ```math.round``` để loại bỏ phần thập phân. Thay vào đó, chúng ta sẽ dử dụng "~~" để loại bỏ phần thập phân của giá trị. Cách thức này sẽ giúp tối ưu hóa đoạn code của chúng ta.

Ví dụ:

Chúng ta sử dụng
```~~(math.random*100)```
thay vì
```math.round(math.random*100)```

# 4. Sử dụng length để xóa hoặc làm rỗng mảng
Kỹ thuật này sẽ giúp lập trình viên thay đổi kích thước hoặc xóa rỗng một mảng.

Để xóa bỏ n phần tử trong mảng, ta dùng ```array.length```. Ví dụ:
```
var array = [1, 2, 3, 4, 5, 6];  
console.log(array.length); // 6  
array.length = 3;  
console.log(array.length); // 3  
console.log(array); // [1,2,3]
```

Để xóa rỗng mảng ta dùng ```array.length = 0;```. Ví dụ:
```
var array = [1, 2, 3, 4, 5, 6]; 
array.length = 0;   
console.log(array.length); // 0 
console.log(array); // []
```

# 5. Kiểm tra giá trị của 1 object
Để kiểm tra xem object có rỗng không, ta sử dụng:
```
Object.keys(YOUR_OBJECT).length 
// 0 returns if object is empty
```
Đoạn code trên sẽ trả về số lượng phần tử nằm trong 1 object

# 6. Gộp 2 mảng 1 cách tối ưu nhất
Nếu bài toán yêu cầu chúng ta gộp 2 mảng, sử dụng ```Array.concat()```. Ví dụ:
```
var array1 = [1, 2, 3];  
var array2 = [4, 5, 6];  
console.log(array1.concat(array2)); // [1,2,3,4,5,6];  
```

Tuy nhiên, phương thức này chỉ hoạt động tốt đôí với các mảng nhỏ.

Đối với các mảng lớn hơn, ta sử dụng:
```Array.push.apply(arr1, arr2)```
Lý do là sử dụng ```Array.concat()``` đối với mảng lớn sẽ tiêu thụ 1 lượng lớn bộ nhớ khi tạo ra 1 mảng mới tách biệt. Trong trường hợp này, sử dụng cách 2 sẽ gộp thẳng mảng 2 vào mảng 1, do đó giảm được lượng lớn bộ nhớ tiêu thụ

Ví dụ:
```
var array1 = [1, 2, 3];  
var array2 = [4, 5, 6];  
console.log(array1.push.apply(array1, array2)); // [1,2,3,4,5,6];
```

# 7. Câu điều kiện rút gọn
Đoạn code

```
if (loggedin) {  
    welcome_messege();
}
 ```
 có thể được rút gọn bằng cách sử dụng kết hợp biến điều kiện và phương thức bằng việc sử dụng toán tử ```&&``` ở giữa.

Bây giờ chúng ta rút gọn đoạn code trên bằng 1 dòng như sau:
```
loggedin && welcome_messege();
```

# 8. Sử dụng switch case thay cho if/else
Thông thường, switch cases sẽ được ưu tiên hơn câu lệnh if/else để thực thi cùng 1 nhiệm vụ.

Trên thực tế, câu lệnh switch chỉ thực thi đánh giá 1 lần, do đó thời gian thực hiện câu lệnh sẽ ngắn hơn so với câu lệnh if/else ở chỗ sử dụng câu lệnh này, tất cả các "if" đều phải được chạy qua và đánh giá.

# 9. Làm đẹp đoạn code JS
Để đoạn code JS đẹp hơn mình gợi ý 1 sử dụng [jsbeautifier](http://jsbeautifier.org/). Ứng dụng này sẽ giúp chuyển đổi những đoạn code JS vụng về xấu xí trở thành đoạn code có cấu trúc tốt.

**Code trước khi làm đẹp**
![](https://images.viblo.asia/4150aac3-4eb4-4161-8878-415db45e30ef.jpg)

**Code sau khi làm đẹp**
![](https://images.viblo.asia/8fc8fa9d-9eee-432c-96d6-a90a262e0f2b.jpg)

# 10. Kiểm tra performance của đoạn code JS
Để kiểm tra đoạn code JS của chúng ta thực hiện tốt ra và chia sẻ kết quả kiểm tra ta có thể dùng [jsperf](https://jsperf.com/). Đó là cách dễ dàng nhất để tạo và chia sẻ testcases.



-----
Bài viết được tham khảo từ: https://www.loginradius.com/engineering/16-javascript-hacks-for-optimization/