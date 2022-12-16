Như các bạn đã biết, khi làm việc với `javascript`, thì chúng ta không còn xa lạ gì `console.log()`. Nhưng ngoài phương thức `log` ra thì `console` còn gì thú vị nữa không? Hãy cùng tìm hiểu qua một vài phương thức khác để biết ***sức mạnh*** thực sự của console nhé!

# 1. console.table()
- Như cái tên của nó, lệnh sẽ hiển thị dữ liệu dạng table, giúp bạn đọc dữ liệu một cách dễ dàng hơn. 
```
const inventors = [
 { first: ‘Albert’, last: ‘Einstein’, year: 1879, passed: 1955 },
 { first: ‘Isaac’, last: ‘Newton’, year: 1643, passed: 1727 },
 { first: ‘Galileo’, last: ‘Galilei’, year: 1564, passed: 1642 },
 { first: ‘Marie’, last: ‘Curie’, year: 1867, passed: 1934 },
 { first: ‘Johannes’, last: ‘Kepler’, year: 1571, passed: 1630 },
 { first: ‘Nicolaus’, last: ‘Copernicus’, year: 1473, passed: 1543 },
 { first: ‘Max’, last: ‘Planck’, year: 1858, passed: 1947 },
 { first: ‘Katherine’, last: ‘Blodgett’, year: 1898, passed: 1979 },
 { first: ‘Ada’, last: ‘Lovelace’, year: 1815, passed: 1852 },
 { first: ‘Sarah E.’, last: ‘Goode’, year: 1855, passed: 1905 },
 { first: ‘Lise’, last: ‘Meitner’, year: 1878, passed: 1968 },
 { first: ‘Hanna’, last: ‘Hammarström’, year: 1829, passed: 1909 }
];
console.table(inventors);
```

- Kết quả:

![](https://images.viblo.asia/90b0cc22-95cc-4918-af5a-c96e089c06c2.png)

# 2. Styled console.log()
- Nếu bạn mở console ở facebook.com thì bạn sẽ thấy thông báo của họ có màu đỏ. Để làm được điều đó thì cẩn sử dụng `%c` trong chuỗi và sử dụng `code css` ở tham số thứ hai để định nghĩa style:

```
console.log("%cStop!", "color: red; font-size: 50px; font-weight: bold; text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15);");
```

- Kết quả sẽ như sau, hãy thử ngay nhé:

![](https://images.viblo.asia/06710fce-42b8-4dfd-a0cc-65cb9b115a58.png)

# 3. console.warn()
```
console.warn(‘This a warning message!’);
```

- Đây là phương thức để hiển thị ra một message cảnh báo, nó sẽ trong giống như bên dưới:

![](https://images.viblo.asia/5da40bec-54d4-4260-b746-c758dcf01b9e.png)

# 4. console.error()
- Tương tự như phương thức `console.warn()`, nhưng thay vì hiển thị một message cảnh báo, thì phương thức `console.error()` sẽ hiển thị thông báo lỗi:

![](https://images.viblo.asia/c1f5b543-aa29-487b-a85d-562ce9b1718f.png)

# 5.  console.assert()
```
console.assert(1 === 2, ‘Assertion is incorrect!’);
```

- Đây là phương thức giúp bạn test code của mình, và cho ra output một message bạn tự định nghĩa nếu `assertion` không chính xác. Nói cách khác, message sẽ được hiển thị khi code của bạn trả về `false`.

![](https://images.viblo.asia/592c4d54-a1dc-457a-ace3-f20f0ba0d84d.png)

# 6. console.group()
- Trở lại với data ở mục 1, nhưng lần này ta sẽ nhóm các dòng lại với nhau:

```
const inventors = [
 { first: ‘Albert’, last: ‘Einstein’, year: 1879, passed: 1955 },
 { first: ‘Isaac’, last: ‘Newton’, year: 1643, passed: 1727 },
 { first: ‘Galileo’, last: ‘Galilei’, year: 1564, passed: 1642 },
 { first: ‘Marie’, last: ‘Curie’, year: 1867, passed: 1934 },
 { first: ‘Johannes’, last: ‘Kepler’, year: 1571, passed: 1630 },
 { first: ‘Nicolaus’, last: ‘Copernicus’, year: 1473, passed: 1543 },
 { first: ‘Max’, last: ‘Planck’, year: 1858, passed: 1947 },
 { first: ‘Katherine’, last: ‘Blodgett’, year: 1898, passed: 1979 },
 { first: ‘Ada’, last: ‘Lovelace’, year: 1815, passed: 1852 },
 { first: ‘Sarah E.’, last: ‘Goode’, year: 1855, passed: 1905 },
 { first: ‘Lise’, last: ‘Meitner’, year: 1878, passed: 1968 },
 { first: ‘Hanna’, last: ‘Hammarström’, year: 1829, passed: 1909 }
];
inventors.forEach(inventor => {
 console.groupCollapsed(`${inventor.first}`);
 console.log(`This is ${inventor.first} ${inventor.last}`);
 console.log(`${inventor.first} ${inventor.last} was born in ${inventor.year}`);
 console.log(`${inventor.first} ${inventor.last} died in ${inventor.passed}`);
 console.groupEnd(`${inventor.first}`);
});
```
- Phương thức này sẽ giúp bạn gom data theo từng category hay nhóm. Khi bắt đầu, bạn bắt buộc phải gọi hàm `console.group()` hoặc 
`console.groupCollapsed(‘group name’)` nếu muốn group được hiển thị dưới dạng collapsed. Và kết thúc nhóm bằng lệnh `console.groupEnd(‘group name’)`
- Cùng xem kết quả:

![](https://images.viblo.asia/ceef1ec4-a12d-406a-aa1d-4538c02ec824.png)

# 7. console.time()
```
console.time(‘fetching data’);
fetch(‘https://api.github.com/users/ogasimli')
 .then(data => data.json())
 .then(data => {
 console.timeEnd(‘fetching data’);
 });
```

- Phương thức này sẽ giúp bạn kiểm tra được thời gian thực thi code của mình. Bạn chỉ cần gọi `console.time(‘key’)` trước lệnh chạy code và gọi tiếp `console.timeEnd(‘key’)` sau lệnh chạy code. Như vậy hàm sẽ detect được thời gian thực thi code và log dưới đơn vị mili giây (milliseconds):

![](https://images.viblo.asia/9fe0bf00-9c18-4a25-88ae-58ed37b3bb8e.png)

# Tổng kết
- Rõ ràng `console` còn rất nhiều phương thức thú vị mà mình chưa chia sẽ hết, các bạn có thể tìm hiểu thêm ở link bên dưới.
- Có nhiều phương thức chúng ta ít khi sử dụng tới, nhưng biết đâu sẽ hữu ích cho các bạn trong trường hợp nào đó.
- Cám ơn các bạn đã theo dõi bài chia sẻ, chúc các bạn học tốt.
- Tham khảo: [Medium](https://medium.com/quick-code/js-tips-powerful-console-29ad159f1ae9)