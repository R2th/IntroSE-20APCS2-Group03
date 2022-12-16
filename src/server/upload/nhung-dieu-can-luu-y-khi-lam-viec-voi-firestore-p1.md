# Giới hạn của document
 ## Dung lượng lớn nhất của 1 document là 1 MB

![](https://images.viblo.asia/bb543d55-17f6-4be5-91b6-727fad614f82.png)


Khi bạn có data khổng lồ và dự định của bạn là lưu theo kiểu map chứa tất cả các object trong 1 document đơn lẻ thì đây chắc chắc là một thiết kế tồi. Giải pháp ở đây sẽ là lưu chúng ra các document khác nhau để dễ dàng truy vấn và phân biệt các data với nhau.

Vậy nếu vẫn quá dung lượng thì sao? Bạn có thể chia chúng nhỏ hơn nữa, hoặc lưu chúng vào storage


## Tối đa 20.000 trường cho mỗi document
Đầu tiên, hãy cùng tìm hiểu cách Firebase đếm số lượng các trường như thế nào nhé
![](https://images.viblo.asia/46682fe3-1fb6-4195-ba09-0204288cf965.png)

Ở model tương ứng với hình đầu tiên, bạn thấy có 6 trường tất cả. Có thể bạn sẽ nghĩ có thể giảm thiếu số lượng trường bằng cách nhét tất cả bọn chúng vào trong 1 trường `address` và như vậy chỉ còn 1 trường? Rất tiếc, lúc này Firebase sẽ tính bạn đã thêm 1 trường address và như vậy là 7 chứ không phải 1. Tương tự nếu thiết kế như hình cuối cùng sẽ được tính là 9 trường.


Lý do firebase giới hạn số lượng trường là vì firebase đánh index trên toàn bộ các trường trong 1 document, kể cả các trường là thuộc tính của kiểu map. Vì vậy,  nếu bạn đã đảm bảo rằng số lượng trường trong 1 document của bạn không bao giờ vượt quá con số 20.000, thì cũng hãy lưu ý khi tạo một document mới, Firebase sẽ làm việc lại để sắp xếp theo cơ chế index. Do đó hãy cân nhắc thật kỹ về số lượng trường.

## Tốc độ ghi tối đa vào 1 document là 1s
![](https://images.viblo.asia/c5f46f5d-be00-4354-acf5-9120e9eea1e2.png)

Mỗi giây chỉ có 1 toán tử ghi được thực hiện trên cùng 1 document. Khi ứng dụng của bạn có nhiều người dùng, cùng tác động đến 1 document cùng một thời điểm, bạn sẽ thấy 1 số phần xử lý ghi sẽ bị thất bại. 
Về giải pháp cho phần này:
- Nếu vẫn muốn ghi trên cùng 1 document, giải pháp bạn có thể đọc thêm ở đây https://firebase.google.com/docs/firestore/solutions/counters
- Hoặc cấu trúc data để ghi  trên  các document khác nhau ở cùng một thời điểm.


Ngoài các phần giới hạn trên, còn nhiều phần khác nữa, các bạn xem chi tiết ở đây nhé
https://firebase.google.com/docs/firestore/quotas

# Không thể truy vấn chỉ lấy một phần của document
Khi truy vấn, bạn sẽ nhận được toàn bộ dữ liệu, không thể nhận được một phần khi sử dụng client SDK.
![](https://images.viblo.asia/899b8c6b-ce18-4abb-b870-286dd9a3a132.png)

Giả sử bạn có 1 collection tên là `books` lưu trữ các sách gồm tiêu đề và nội dung sách. Bạn cần truy vấn lấy ra tất cả tiêu đề sách. Nhưng với cách lưu trữ data như vậy, bạn sẽ nhận được cả phần content bài viết, lượng data bạn tải xuống đã gấp cả trăm nghìn lần lượng data mà bạn cần, điều này nghe thật tồi tệ. Nó sẽ ảnh hưởng đến perfomance của ứng dụng, lượng data read, và lãng phí tài nguyên.


Không chỉ vậy, cách thiết kế này cũng sẽ ảnh hưởng rule, khi bạn muốn giữ dữ liệu title là  public, còn data content lại là private.

Giải pháp ở đây cũng khá đơn giản. Bạn chỉ cần đặt phần data cần private lại ra một document mới. Vậy là cả phần lấy data và phần thiết kế rule sẽ trở nên dễ dàng vô cùng.


# Hạn chế khi truy vấn
https://firebase.google.com/docs/firestore/query-data/queries

- Các truy vấn chỉ có thể thực hiện với  các phần filter kiểu range (>, <, etc) trên các trường đơn lẻ. Truy vấn dựa theo range với nhiều trường chưa được hỗ trợ.


Giả sử bạn có một danh sách nhân viên và cần truy vấn lấy tất cả nhân viên có tuổi > 25 và lương > 15 triệu. Như vậy query sẽ là
```
employeesRef.where("age", ">", 25).where("salary", ">", 15000000);
```
Rất tiếc, Firestore không hỗ trợ như vậy, ngay lập tức nó sẽ bắn ra lỗi. Vì bạn đã query kiểu range trên 2 trường khác nhau là "age" và "salary"

- Truy vấn với mệnh đề `!=` cũng chưa được hỗ trợ. Trong trường hợp đó giải pháp là bạn sẽ chia query thành 2 phần lơn hơn và nhỏ hơn.

Cùng với ví dụ ở trên. Giả sử bạn cần lấy tất cả nhân viên có tuổi khác 25` where("age", "!=", "30")` . Lúc này bạn cần kết hợp 2 truy vấn `where("age", "<", "30")`  và `where("age", ">", 30)`


- Firestore đã hỗ trợ truy vấn theo kiểu OR, tuy nhiên còn nhiều hạn chế. Toán tử `in` và `array-contains-any`chỉ so sánh tối đa 10 giá trị. Toán tử `array-contains` sẽ chỉ có tác dụng trên 1 trường đơn lẻ. Với những phần xử lý chưa được hỗ trợ, chúng ta cần phải tạo ra nhiều query nhỏ, rồi sau đó merge chúng lại để được kết quả mong đợi


<br>

Trên đây là 1 số điểm mà bạn cần lưu ý và cân nhắc khi sử dụng Firestore. Vẫn còn một số điểm nữa nhưng mình xin được phép chia sẻ ở bài viết sau trong phần 2. Hi vọng bài viết sẽ hữu ích với các bạn

Tham khảo: https://www.youtube.com/watch?v=o7d5Zeic63s