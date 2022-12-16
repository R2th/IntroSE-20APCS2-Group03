# Vấn đề
Ai cũng đã từng trải qua giai đoạn kén nhộng với vòng "for" quen thuộc khi còn là sinh viên.

Tuy nhiên thì trong thực tế chúng ta không nhất thiết cần phải khai báo index dài dòng, rồi độ dài bước nhảy, rồi cả trùng lặp biến trong biến ngoài lồng nhau... Sử dụng for() không có gì sai nếu bạn làm đúng logic =)) Thế nhưng nó làm code của chúng ta khá là rối bời, đã thế còn dài nữa, nói thẳng ra là " người khác nhìn vào thấy chán không muốn đọc tiếp luôn, có cảm giác mấy chỗ loằng ngoằng rồi thế nào cũng tạo ra bug ~".

Ơ thế không "for" thì chạy loop kiểu gì bây giờ ? 

Không cần lo, mấy cái dưới này mà dùng ý nhé thì con sâu trong kén cũng có ngày thành con bay được, cứ gọi là thích luôn !

# Bắt đầu
Mình sẽ sử dụng array đơn giản này cho các phần bên dưới:
```
var ninja = [
    {
        'name': 'naruto',
        'skill': 'rasen shuriken',
        'damage': 9000,
    },
    {
        'name': 'kakashi',
        'skill': 'raikiri',
        'damage': 7000,
    },
    {
        'name': 'sasuke',
        'skill': 'amaterasu',
        'damage': 9000,
    },
    {
        'name': 'hashirama',
        'skill': 'moku ryudan',
        'damage': 8500,
    },
    {
        'name': 'madara',
        'skill': 'susanoo',
        'damage': 9500,
    },
    {
        'name': 'itachi',
        'skill': 'shuriken',
        'damage': 8000,
    },
    {
        'name': 'nagato',
        'skill': 'shinra tensei',
        'damage': 9500,
    },  
];
```
## Hàm Map
Khi chúng ta muốn xử lí các phần tử trong mảng theo cùng một cách, giả như là "chỉ lấy name của các phần tử" chẳng hạn !

Cú pháp :
```
array.map(function(item, index, array) {
 return valueOfNewItem
});


or:

array.map((item, index, array) => {
 return valueOfNewItem                             // cú pháp arrow function ES6
});
```

Chỗ này (item, index, array) hiểu như sau : (định danh của phần tử mảng, key của phần tử tương ứng, mảng ban đầu), bạn có thể truyền mỗi item vào thôi cũng vẫn được.

valueOfNewItem ở đây là giá trị trả về của mỗi vòng xử lí, ví dụ nếu phần tử item có trường name và tôi muốn lấy nó làm item cho mảng mới sẽ được tạo ra thì thay là item.name.

VD: 
```
let name_of_ninja = ninja.map((item) => {
    return item.name;
});
console.log(name_of_ninja);
```
Ta sẽ được: 
```
(7) ["naruto", "kakashi", "sasuke", "hashirama", "madara", "itachi", "nagato"]
```
## Hàm filter
Khi tôi muốn lọc các phần tử mảng theo một điều kiện, tiêu chí nào đấy thì sẽ dùng cái này:

Cú pháp:
```
array.filter(function(item, index, array) {
 return condition;
});


or:

array.filter((item, index, array) => {
 return condition;                             // cú pháp arrow function ES6
});
```

Phần đối số truyền vào callBack thì ý nghĩa vẫn vậy nha.
Condition là điều kiện lọc các phần tử, dạng nào nó cũng chạy. Nó chỉ phân biệt có dữ liệu vùng nhớ hay không thôi. Tức là điều kiện đúng, string khác rỗng, mảng(thậm chí rỗng) cũng đều pass hết nhé =))
VD: 
```
let super_ninja = ninja.filter((item) => {
    return item.damage >= 8500;
});
console.log(super_ninja);
```
Ta nhận được:
```
[
    {
        'name': 'naruto',
        'skill': 'rasen shuriken',
        'damage': 9000,
    },
    {
        'name': 'sasuke',
        'skill': 'amaterasu',
        'damage': 9000,
    },
    {
        'name': 'hashirama',
        'skill': 'moku ryudan',
        'damage': 8500,
    },
    {
        'name': 'madara',
        'skill': 'susanoo',
        'damage': 9500,
    },
    {
        'name': 'nagato',
        'skill': 'shinra tensei',
        'damage': 9500,
    },  
];
```
## Hàm reduce
Khi tôi muốn lấy một kết quả tổng hợp, duy nhất, khác biệt về mặt dữ liệu... thì dùng cái này ok !
Cú pháp:
```
array.reduce(function(result, item, index, array) {
 return aggregate_result;
}, init_result);


or:

array.filter((result, item, index, array) => {
 return aggregate_result;                             // cú pháp arrow function ES6
}, init_result);
```
Trong (result, item, index, array) thì 3 đối số quen thuộc được giữ nguyên chức năng, vị trí đầu tiên được chèn vào là biến lưu kết quả được khởi tạo ngay từ đầu bằng init_result.

aggregate_result là nơi tổng hợp lại kết quả sau mỗi vòng.
VD:
```
let total_super_ninja = ninja.reduce((total, item) => {
    return total += (item.damage >= 8500 ? 1 : 0);
}, 0);
console.log('total super ninja:', total_super_ninja);
```
Ta được 
```
total super ninja: 5
```

Hi vọng là bài chia sẻ nho nhỏ này sẽ giúp nhiều bạn mới code có thể hiểu rõ và thành thạo ngay sau vài lần gõ, rất hữu dụng đấy nhé !