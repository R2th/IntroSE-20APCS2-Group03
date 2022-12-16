## 1.Định nghĩa forEach() và map()
Theo như trên trang MDN, *forEach* và *map* được định nghĩa như sau:
> **forEach()** — executes a provided function once for each array element.
> 
> **map()** — creates a new array with the results of calling a provided function on every element in the calling array.

Chính xác nó có nghĩa là gì?

- ***forEach*** và ***map*** giống nhau ở điểm: đều thực hiện hàm callback lên từng phẩn tử ở trong mảng
- Khác nhau ở điểm:

|  forEach | map | 
| -------- | -------- | 
|  không trả về giá trị nào cả  | có trả về giá trị
|hàm callback có thể thay đổi trực tiếp mảng ban đầu|tạo ra một mảng mới có cùng số phần tử với mảng cũ và trả về mảng mới này

## 2. Ví dụ
Giả sử mình có 1 mảng sau
```php
let arr = [];
for (var i=0; i<10000; i++, arr.push(i));
```
Và mình muốn nhân đôi giá trị của mỗi phần tử trong mảng mà không muốn sử dụng vòng lặp *for* :sweat_smile:

***forEach*** 

Lưu ý, bạn sẽ không bao giờ *return* từ 1 hàm forEach vì các giá trị return về đều bị loại bỏ (undefined)
```php
arr.forEach((num, index) => {
    return arr[index] = num * 2;
});
// Result: arr = [2, 4, 6, 8, 10]
```
***map***
```php
let test = arr.map(num => {
    return num * 2;
});
// Result: arr = [2, 4, 6, 8, 10]
```
Kết quả giống hệt nhau phải không ạ. Vây bây giờ hay xem tốc độ của 2 thằng
## 3. So sánh tốc độ
https://jsperf.com/ là một trang web khá tốt để so sánh tốc độ của các phương thức Javascript khác nhau.
Đây là kết quả thu được 
![](https://images.viblo.asia/b3f03908-608a-458e-9a05-ed62600f7145.png)

Như bạn có thể thấy *map()* nhanh hơn 21% so với *forEach* đối với trình duyệt mình đang sử dụng, còn với trình duyệt của bạn có lẽ sẽ ra kết quả khác.

Demo https://jsperf.com/so-sanh-foreach-va-map

## 4. Cái nào dùng tốt hơn?
Nó phụ thuộc vào việc bạn muốn thực hiện

* Nếu không muốn thay đổi dữ liệu trong mảng nhưng thay vào đó chỉ muốn làm gì đó với nó - như lưu nó vào cơ sở dữ liệu hoặc log ra màn hình thì dùng ***forEach***
* Nếu muốn thay đổi dữ liệu ra 1 mảng mới với tốc độ tốt hơn thì dùng ***map***

## Tổng kết
* Những gì ***forEach()*** làm được thì ***map()*** cũng có thể làm được và ngược lại.
* ***map()*** cấp phát bộ nhớ và lưu trữ các giá trị trả về,  ***forEach()*** thì bỏ qua các giá trị trả về
* ***forEach()*** cho phép gọi hàm callback để thay đổi mảng hiện tại, thay vào đó ***map()*** sẽ trả về một mảng mới.


 **Nguồn** https://codeburst.io/javascript-map-vs-foreach-f38111822c0f