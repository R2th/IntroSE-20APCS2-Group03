Trong mọi ngôi ngữ lập trình, chúng ta thường rất hay làm việc với Array (mảng). Ở những ngôn ngữ lập trình cơ sở như C, Pascal, chúng ta được học về cách tạo mảng, duyệt mảng. Hay các thuât toán tìm kiếm, sắp xếp, xóa phần tử bất kỳ trong mảng

Đối với những ngôn ngữ "cao cấp" hơn như java, C#, javascript hay đặc biệt là Ruby. Rất nhiều hàm đã được viết sẵn giúp lập trình viên thao tác dễ dàng hơn với dữ liệu trong mảng. 
Cụ thể bài viết này sẽ giới thiệu một số phương thức cơ bản, thường xuyên được sử dụng khi làm việc với mảng trong ngôn ngữ lập trình Ruby. 

### Kiểm tra một phần từ có tồn tại trong mảng
Với Ruby, bạn có thể dễ dàng kiểm tra xem 1 phần tử bất kỳ (Số , chuỗi) có tồn tại trong 1 mảng hay không bằng cách sử dụng hàm `include? `
![](https://images.viblo.asia/3aa7f309-a860-4f67-a70e-fd00ee2ee1f2.png)
```
array = [1,2,3,4,5]
2.5.1 :002 > array.include? 1
 => true 
2.5.1 :003 > array.include? 7
 => false 
```
Ngoài ra, bạn cũng có thể sử dụng `member?`. Kết quả sẽ tương đương nhau.

### Tìm vị trí xuất hiện cuối cùng của phần tử X trong mảng
Bạn còn nhớ bài tập này với ngôn ngữ lập trình C chứ? Với Ruby, thật đơn giản vì đã có sẵn hàm `.rindex` hỗ trợ rồi. Có thể bạn chưa dùng tới mà thôi. Hãy xem ví dụ sau nhé
```
2.5.1 :012 > array_string = ["Minh", "ten", "la", "hung", "Hello", "moi", "nguoi", "hung", "dep", "trai"]
 => ["Minh", "ten", "la", "hung", "Hello", "moi", "nguoi", "hung", "dep", "trai"] 
2.5.1 :013 > array_string.rindex("hung")
 => 7
```
 ![](https://images.viblo.asia/a09bdc75-e517-4d7f-96f1-6fe227abd77c.png)

 ### Tim giá trị phù hợp với điều kiện bất kỳ
 Hàm .select cho phép bạn tìm thấy một phần tử trong một mảng. Bạn phải cung cấp cho nó điều kiện cần tìm ( Trả về true, false) để nó biết liệu có giữ hay không giữ một phần tử mảng hay không.
```
2.5.1 :028 > array = ['hello', 'hi', 'goodbye']
2.5.1 :029 > array.select{|word| word.length > 3}
 => ["hello", "goodbye"]
```
 
### Chuyển chuỗi thành mảng và mảng thành chuỗi
Đây là 1 trường hợp trước đây mình đã từng xử lý khi lưu dữ liệu vào database. Mình có sử dụng 1 trường để lưu 1 array là các list user_ids. Thay vì khai báo trường user_ids là serialize :properties, Array ( Đây là cách sử dụng nhanh, đơn giản, dễ hiểu cũng như dễ thao tác sau này. Vì lúc đó mới tìm hiểu về Ruby và Rails nên chưa biết cách để lưu dạng này). 
Và cách trước đó của mình chính là lưu nó ở dạng string và quy định các ID cách nhau bằng giấu phẩy , 
**Ví dụ:  1,2,3,4,5**
Sau này khi lấy dữ liệu ra thì mình vẫn được ở dạng string. Đến đây mình sẽ dùng hàm `.split` của Ruby để tách chuỗi thành mảng. Mục đích chuyển nó thành mảng là để dễ làm việc với mảng và các phần tử trong mảng bằng cách sử dụng các hàm Ruby hỗ trợ như lấy ID đầu tiên trong mảng, ID cuối trong mảng, kiểm tra 1 ID user có tồn tại trong mảng user_ids đó hay không? Còn khi lưu vào database thì mình lại chuyển array đó thành string rồi lại lưu vào database.

Cụ thể dòng lệnh sau đây sẽ tách các phần tử cách nhau bằng giấu phẩy (,) trong chỗ string thành từng phẩn tử của 1 mảng và ta cũng có hàm `.join` Ruby hỗ trợ để làm điều ngược lại biến Array thành dạng String như ban đầu.
![](https://images.viblo.asia/68e1f762-be4f-4746-be56-835ba26d26e6.png)

Tất nhiên, ví dụ trên của mình có thể sẽ không có ai ngu ngốc như mình làm vậy cả. Tuy nhiên, các bạn hãy nhớ nó bởi trong nhiều trường hợp, bạn sẽ dùng đến đó
### Loại bỏ các giá trị trùng trong 1 mảng

Mình có nhớ hồi học môn nhập môn lập trình C, cũng có bài tập viết thuật toán để loại bỏ các phần tử trùng trong 1 mảng. Cứ giá trị nào xuất hiện nhiều lần thì chỉ giữ lại 1 lần mà thôi.

Hay trong sql cũng có `distinct` tương tự vậy. Còn với array trong ruby, để xóa các giá trị trùng lặp trong 1 mảng thì khá đơn giản. Chúng ta sử dụng `.uniq`
Ví dụ:
```
2.5.1 :011 > [1,2,3,4,5,4,6,7,7,8,7].uniq
 => [1, 2, 3, 4, 5, 6, 7, 8] 
```
### Lấy x phần tử đầu tiên trong mảng

Hàm .first sẽ giúp các bạn làm điều đó. 
![](https://images.viblo.asia/97a806e7-9e46-4786-96a8-e7b9235da76c.png)
### Xóa x phần tử đầu tiên trong mảng
Hàm .drop x sẽ giúp xóa x phần tử đầu tiên trong mảng và trả về 1 mảng các phần tử còn lại trong mảng. Tuy nhiên, không làm thay đổi giá trị của mảng ban đầu

```
2.5.1 :029 > a = [1,2,3,4,5]
 => [1, 2, 3, 4, 5] 
2.5.1 :030 > a.drop(2)
 => [3, 4, 5] 
2.5.1 :031 > a
 => [1, 2, 3, 4, 5] 
```
### Xóa toàn bộ phần tử X trong mảng
Sử dụng hàm .delete(x)  sẽ giúp bạn xóa hết các phần tử có giá trị = x ra khỏi mảng. Cũng như **mảng ban đầu sẽ bị thay đổi**
![](https://images.viblo.asia/0569476a-870c-4c85-9180-1068c5011707.png)


Tuy không phải là Hàm trong Ruby nhưng  mình xin giới thiệu thêm cho các bạn toán tử & cũng rất hay được sử dụng để lấy các giá trị trùng giữa 2 mảng bất kỳ.


Bài toán đặt ra là mình có 1 mảng lưu accept_group_ids (Các groups) được phép tạo bài viết. Và 1 mảng user_group_ids của User ( Các nhóm mà User thuộc về). Có thể là bạn đã lấy được chúng từ CSDL thông qua select, pluck chẳng hạn.

Giờ mình muốn kiểm tra xem User hiện tại có được quyền tạo bài viết đó hay không. Thông thường nhiều bạn sẽ sử dụng 2 vòng lặp for lồng nhau để kiểm tra từng phần tử trong mảng này có thuộc mảng kia hay không. Nếu có thì return true và break vòng lặp ngay.

Tuy nhiên, trong Ruby bạn có thể sử dụng toán tử & để làm điều đó. Nó sẽ trả về 1 mảng các giá trị trùng nhau giữa 2 mảng. Bạn chỉ cần check xem nó có rỗng hay không.
![](https://images.viblo.asia/44987a40-0243-44ea-96f4-5c32786fde7b.png)

Có rất nhiều hàm khác được Ruby hỗ trợ sẵn để bạn làm việc đơn giản hơn với Array. Bạn có thể dễ dàng tìm chúng bằng cách sử dụng câu lệnh `Array.new.methods`
![](https://images.viblo.asia/7eccea3a-2b8a-4bfa-a686-6e2a4c840b05.png)

**Hi vọng bài viết này 1 lúc nào đó sẽ có ích với các bạn.**

Tham khảo thêm nhiều hàm ruby hỗ trợ để làm việc với Array tại:  https://ruby-doc.org/core-2.2.0/Array.html