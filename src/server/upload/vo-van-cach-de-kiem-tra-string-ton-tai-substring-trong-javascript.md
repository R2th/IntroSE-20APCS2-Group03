Xin chào mọi người! Hôm nay mình xin chia sẻ một vấn đề mà chúng ta thường xuyên gặp phải ở bất cứ bài toán nào hay bất cứ ngôn ngữ lập trình nào. Đó là việc kiểm tra xem **một chuỗi (string)** tồn tại, chứa **một chuỗi con (substring)** hay không? 

Vì vậy, bài viết này mình sẽ tổng hợp các cách để kiểm tra string tồn tại, chứa substring hay không trong JavaScript, cùng theo dõi nhé!

# 1. ES6 .includes()
- Phương thức string.includes() sẽ kiểm tra xem một substring được người dùng cung cấp có nằm trong string hay không. Phương thức sẽ trả về **True** nếu chuỗi chứa substring mà người dùng cung cấp, ngược lại sẽ trả về **False**.
```
const string = "this is test";
const substring = "test";
string.includes(substring);

>>> True
```

- Lưu ý rằng:
    - Phương thức có phân biệt chữ hoa chữ thường.
    - Phương thức includes() được hỗ trợ từ ES6 trở lên.

# 2. RegExp .search()
- Phương thức search() sẽ thực hiện tìm kiếm đoạn string tương ứng với một **Regular Expression** bên trong string cho trước, nếu **tìm được thì sẽ trả về vị trí kí tự đầu tiên** của substring bên trong string, **ngược lại sẽ trả về -1**.

```
const string = "this is test";
const substring = "test";
string.search(new RegExp(substring));

>>> 8 (!== -1)
```

- substring − Một đối tượng Regular Expression. Nếu một đối tượng obj không là RegExp được truyền, nó hoàn toàn được biến đổi thành một RegExp bởi sử dụng new RegExp(substring).

# 3.  RegExp .match()
- Phương thức match() cũng sẽ thực hiện tìm kiếm đoạn string tương ứng với một **Regular Expression** bên trong string cho trước, nếu **tìm được thì sẽ trả về một Array** chứa phần trùng khớp ở vị trí đầu tiên, **ngược lại sẽ trả về null**.

```
const string = "this is test";
const substring = "test";
string.match(new RegExp(substring));

>>> ["test", index: 8, input: "this is test", groups: undefined]
```

- Lưu ý:
    - Nếu Regular Expression không bao gồm g flag, nó trả về cùng kết quả như regexp.exec(string).
    - Nếu Regular Expression bao gồm g flag, phương thức này trả về một Mảng chứa tất cả các sự so khớp.
    - Để tìm kiếm mà không phần biệt chữ hoa thường sử dụng modifier i( ví dụ /test/i).

# 4. RegExp .test()
- Phương thức test() cũng sẽ thực hiện tìm kiếm đoạn string tương ứng với một **Regular Expression** bên trong string cho trước, nếu **tìm được thì sẽ trả về true,** **ngược lại sẽ trả về false**.

```
const string = "this is test";
const substring = "test";
new RegExp(substring).test(string);

>>> True
```

- Cũng tương tự các cách sử dụng trên, chỉ khác ở cú pháp một chút.

# 5. Good old’ .indexOf()
- Phương thức indexOf() sẽ tìm substring bên trong một string, nếu **tìm được thì sẽ trả về vị trí kí tự đầu tiên** của substring bên trong string, **ngược lại sẽ trả về -1**.

```
const string = "this is test";
const substring = "test";
string.indexOf(substring) !== -1;

>>> 8
```

- Phương thức indexOf() có hỗ trợ ES5 hoặc các phiên bản thấp hơn.

# 6. Test thử tốc độ
- Ok, vậy là chúng ta đã đi qua 5 cách để kiểm tra 1 string có tồn tại substring hay không? Vậy thì chọn các nào phù hợp và tối ưu cho website của mình, cùng xem qua tốc độ nhé:


![](https://images.viblo.asia/8155146b-b973-428c-a50e-7cf643f77a8e.PNG)

- Kết quả đã thấy, indexOf() là vô địch, sẽ cho thời gian thực thi nhanh nhất :D

# Tổng kết
- Trên đây là một số cách để kiểm tra string tồn tại substring trong JavaScript. Trong đó, mình thấy cách sử dụng **indexOf()** vừa nhanh mà lại hỗ trợ hầu hết các trình duyệt.
- Hi vọng sau khi xem bài viết này, các bạn sẽ có sự lựa chọn riêng cho mình, cám ơn các bạn, hẹn gặp lại.
- Nguồn tham khảo: [Medium](https://medium.com/@switzerlandhero/5-ways-to-check-if-a-string-contains-a-substring-in-javascript-523ac134f878)