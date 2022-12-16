Bài viết là tổng quan ngắn gọn về cấu trúc dữ liệu hash, cách nó được triển khai trong Ruby, và một số những thay đổi của hash trong MRI Ruby.

### Hash là gì?
Hash là một cấu trúc dữ liệu giúp tổ chức, sắp xếp dữ liệu theo các cặp key-value.
Nó cũng được giới thiệu như là 1 từ điển hoặc 1 mảng kết hợp
Hash lưu trữ những cặp key-values của dữ liệu được liên kết theo cách: Cho phép Insert và tra cứu một cách hiệu quả, trong một khoảng thời gian không đổi  O (1).
Các thuộc tính này của Hash khiến nó trở thành một trong những tool hữu ích nhất trong số các tools của lập trình viên.
Hash cũng có sẵn trong các library cốt lõi của hầu hết các ngôn ngữ lập trình.

Trong Ruby, hash có thể được khai báo theo 2 cách:

```
h = {color: "black", font: "Monaco"}
h = {:color=>"black", :font=>"Monaco"}
```

hoặc khai báo bằng method mới
```
h = Hash.new
h[:color] = "black"
h[:font] = "Monoco"
```
### Hash lưu trữ dữ liệu như thế nào và tại sao nó lại hiệu quả?

Để hiểu cách dữ liệu được lưu trữ trong Hash và tại sao nó hoạt động hiệu quả, chúng ta hãy cùng xem lại cấu trúc dữ liệu tuyến tính cơ bản: Array (mảng). 
Mảng cho phép chúng ta truy cập ngẫu nhiên vào bất kỳ phần tử nào mà nó lưu trữ, nếu chúng ta biết index tương ứng của phần tử đó..


```
a = [1,2,4,5]
puts a[2]  #> 4
```
Nếu các cặp key-value mà chúng ta đang muốn lưu là số nguyên, trong một phạm vi giới hạn như: từ 1-20 hoặc từ 1-100, chúng ta chỉ cần sử dụng mảng.
Key sẽ là interger (số nguyên).

Ví dụ:
Chúng ta cần lưu tên sinh viên trong một lớp có 20 học sinh.
Mỗi sinh viên có một id từ 1 đến 20.
Không có hai sinh viên nào có cùng id.
=> Chúng ta sẽ dùng mảng để lưu tên của các sinh viên. Key sẽ là interger.

| Key | Value |	
| -------- | -------- | -------- |
|1|	Belle|
|2|	Ariel|
|3|	Peter Pan|
|4|	Mickey Mouse|


```
students= ['Belle', 'Ariel', 'Peter Pan', 'Mickey Mouse']`
```

Nhưng điều gì sẽ xảy ra nếu id của sinh viên là một số có 4 chữ số?
Khi đó, chúng ta sẽ phải gán một bảng có 10.000 phần tử để truy cập tên theo id. 
Để giải quyết điều này, chúng ta đơn giản hóa các key, chỉ lấy 2 chữ số cuối cùng trong số có 4 chữ số.
Tuy nhiên, nếu chúng ta có một sinh viên khác với id “3221” - cũng kết thúc bằng “21”, chúng ta sẽ phải lưu hai giá trị tại cùng vị trí =>  dẫn đến va chạm.

|Key|	Hash(key) = last 2 digits|	Value|
| -------- | -------- | -------- |
|4221, 3221|	21|	Belle, Sofia|
|1357|	57|	Ariel|
|4612|	12|	Peter Pan|
|1514|	14|	Mickey Mouse|





```
students= Array.new(100)
students[21]=['Belle','Sofia']
students[57]='Ariel'
students[12]='Peter Pan'
students[14]='Mickey Mouse'
```

Tuy nhiên, điều gì sẽ xảy ra nếu id là một số có 10 chữ số, hoặc một chuỗi gồm cả chữ và số? 
Lúc này dùng mảng sẽ không hiệu quả và khó có thể dùng để tìm ra tên một cách nhanh chóng. 
Không may, nếu dùng chiến lược Hash quá đơn giản có thể dẫn đến vấn đề.

### Cách hoạt động của Hash của Ruby

Giờ chúng ta đã hiểu rằng mục đích của Hash là: chuyển đổi một key đã cho thành một số nguyên có phạm vi giới hạn. 
Để giảm phạm vi, một kỹ thuật thường được sử dụng là phương pháp chia. 
Trong phương pháp chia, key được chia theo kích thước của nơi lưu trữ hoặc theo các bảng. Phần còn lại là bên trong bảng - nơi lưu các bản ghi.
Do đó, trong ví dụ trên, nếu kích thước bảng là 20, các vị trí sẽ là 1, 17, 12 , 14 - được lấy ra từ tính toán dưới đây.

* 4221 % 20 = 1
* 1357 % 20 = 17
* 4612 % 20 = 12
* 1514 % 20 = 14

Tuy nhiên trong lập trình thực tế, các key không phải lúc nào cũng là số nguyên đẹp đẽ, chuẩn chỉnh.
Chúng có thể sẽ là strings, object hoặc một số kiểu dữ liệu khác.
Vấn đề này sẽ được giải quyết bằng cách sử dụng Hash một chiều (digest) trong key và sau đó áp dụng phương pháp chia để lấy vị trí.
Hash là một thuật toán lấy một chuỗi (strings) có độ dài bất kỳ, và tạo ra một giá trị số nguyên có độ dài cố định. 
Cấu trúc dữ liệu Hash được lấy tên từ cơ chế băm này.

Ruby sử dụng hàm băm murmur (hàm băm không mật mã) và sau đó áp dụng phương pháp chia với số nguyên tố M - được Ruby xác định dựa trên kích thước bảng cần thiết để lưu trữ.

`murmur_hash(key) % M`

Code cho phần này, các bạn có thể tìm trong source code của ngôn ngữ Ruby, tệp st.c.

Trong trường hợp hai key trả về cùng một số, còn được gọi là xung đột hash:  value sẽ được liên kết vào cùng một vị trí (location) hoặc cùng 1 bucket trong table.

### Cách Ruby xử lý xung đột Hash và phát triển

Một trong những vấn đề mà Hash phải đối mặt là phân bổ dữ liệu.
Điều gì sẽ xảy ra nếu hầu hết các phần còn lại rơi vào cùng một bucket?
Trước tiên, chúng ta sẽ phải tìm bucket trong table bằng cách tính toán qua key. Sau đó sẽ xét tất cả dữ liệu được xâu chuỗi trong location để tìm bản ghi phù hợp. 
Điều này sẽ phá hỏng mục đích "tạo cấu trúc dữ liệu Hash cho truy cập ngẫu nhiên với thời gian O (1)". Bởi vì chúng ta phải lặp lại với tất cả các giá trị (value) để tìm ra bản ghi
=> Việc này đưa chúng ta trở lại thời gian O (n).

Người ta nhận thấy rằng: Nếu số chia M là số nguyên tố, kết quả sẽ không bị thiên lệch và phân bố đều hơn.
Tuy nhiên, ngay cả với số chia tốt nhất, xung đột vẫn sẽ xảy ra khi: Số lượng bản ghi được thêm mới tăng lên.
Ruby điều chỉnh giá trị của M dựa trên "density - mật độ".
Density - mật độ:  là số lượng bản ghi được xâu chuỗi tại một location trong bảng. 
Trong ví dụ trên,  là 2, vì chúng ta có 2 bản ghi có index/location 1.

Ruby đặt giá trị mật độ tối đa cho phép là 5.

`#define ST_DEFAULT_MAX_DENSITY 5`

Khi mật độ của các bản ghi đạt đến 5, thì Ruby sẽ điều chỉnh giá trị của M, tính toán lại và điều chỉnh Hash cho tất cả các bản ghi có trong Hash đó. Theo câu "The algorithm that computes M is one that generates prime numbers near powers of 2" - thuật toán tính M là một thuật toán tạo ra các số nguyên tố gần lũy thừa của 2 - được trích từ cuốn sách
[ Data Structures using C.](https://www.amazon.com/Data-Structures-Using-Aaron-Tenenbaum/dp/0131997467) 
Hãy xem hàm new_size trong st.c dòng 158. Đây là nơi tính kích thước của Hash mới.

```
new_size(st_index_t size)
{
    st_index_t i;
    for (i=3; i<31; i++) {
      if ((st_index_t)(1<<i) > size) return 1<<i;
    }
    return -1;
}
```

Sẽ dễ dàng hơn nếu bạn đọc phần implement Hash trong [ JRuby](https://github.com/jruby/jruby/blob/master/core/src/main/java/org/jruby/RubyHash.java) - trong đó các giá trị số nguyên tố đã chuẩn bị và được sử dụng cố định từ một mảng int. Như bạn có thể thấy, các giá trị tiếp theo là 11, 19, v.v.

```
private static final int MRI_PRIMES[] = {
8 + 3, 16 + 3, 32 + 5, 64 + 3, 128 + 3, 256 + 27, ....};
```
Rehashing sẽ xảy ra khi lượng dữ liệu trở lên quá lớn (khi Hash đã đạt đến các kích thước nhất định). Điều này dẫn đến việc tài nguyên (CPU) của hệ thống sẽ bị tăng đột ngột.
Pat Shaughnessy đã thực hiện phân tích chi tiết về điều này trong  [Ruby under a Microscope](http://patshaughnessy.net/ruby-under-a-microscope)  . Ông cũng đã vẽ biểu đồ dữ liệu để các bạn có thể thấy việc tăng tài nguyên đột biến khi Rehashing.

### Các Hash của Ruby là unique cho mỗi process
Một điều thú vị cần lưu ý là các Hash là duy nhất cho mỗi process Ruby.
Hash âm thầm gieo nó với một giá trị ngẫu nhiên, dẫn đến một hàm băm khác nhau cho một khóa cụ thể cho mỗi quá trình Ruby..

### Từ Ruby 2.0, Ruby đã đóng gói Hash cho tối đa 6 entry 
Một điều thú vị khác cần lưu ý là: Hash của Ruby rất nhỏ (nhỏ hơn hoặc bằng 6) được lưu trong một nhóm và không trải rộng trên nhiều nhóm, dựa trên Hask được tính toán của key. Thay vào đó, chúng chỉ đơn giản là một mảng giá trị. Việc này mới được thêm vào gần đây. Trong [Pull request](https://github.com/ruby/ruby/pull/84) thay đổi này được submit, người commit code đã đưa ra nhận xét như sau:

"Điều tra cho thấy, các ứng dụng Rails phổ biến  phân bổ rất nhiều Hash nhỏ. Có tới 40% tổng số Hash được phân bổ không bao giờ lớn hơn 1 kích thước phần tử."

### Những key của Hash được sắp xếp  trong Ruby như thế nào?
Bắt đầu từ Ruby 1.9.3,  thuộc tính của Hash sẽ là: các key được sắp xếp thứ tự dựa trên cách chúng được insert vào Hash.
Có một câu hỏi thú vị đã được đăng trên diễn đàn Ruby, đặt câu hỏi về: Lý do gì đứng sau sự thay đổi thuộc tính này và nó sẽ ảnh hưởng đến hiệu suất như thế nào. 

> Ai có thể giải thích giúp tôi: Tại sao tính năng này lại được thêm vào?
> 
Câu hỏi này đã được đích thân Matz - người sáng lập ra Ruby trả lời như sau:

> “Nó sẽ rất hữu ích cho một số trường hợp, đặc biệt là là cho keyword arguments.”

> Nó sẽ không làm chậm các hoạt động trên Hash phải không?

> "Không. Hành động tham chiếu Hash không liên quan đến thông tin về thứ tự (order), nó chỉ để lặp lại. Tuy nhiên, mức tiêu hao memory (bộ nhớ) sẽ tăng lên một chút."

Lưu ý: Các keyword argument đã được thêm vào Ruby trong bản 2.0, ví dụ như dưới đây:


def books(title: 'Programming Ruby')
  puts title
end

books # => 'Programming Ruby'
books(title: 'Eloquent Ruby') # => 'Eloquent Ruby'


Hai thay đổi tiềm năng sắp tới trong Hash
1) Phiên bản tiếp theo của Ruby, rất có thể sẽ giới thiệu cú pháp cho phép khai báo của Hash chứa khoảng trắng trong các ký hiệu.. Với thay đổi sắp tới này, Hash sẽ trông giống JSON hơn.





 ```
 h = {:"a perfect color" => "vermilion"}
  #=> {:"a perfect color"=>"vermilion"}
```
Với sự thay đổi này, nó sẽ chỉ đơn giản là biểu tượng trong dấu ngoặc kép theo sau là dấu hai chấm.


`h = {"a perfect color": "vermilion"}`


2) Một thay đổi thú vị khác đang được thực hiện là: Một phương thức sẽ cho phép trả về các giá trị mặc định cho các key bị thiếu trong Hash.

Hiện tại, bạn chỉ có thể trả về giá trị mặc định của key bằng cách sử dụng hash.fetch, tuy nhiên, phương thức hash.values_at cho phép trả về nhiều giá trị cho các keys.



```
h = {color: "black", font: "monaco"}
h.fetch(:fontsize, "12pt") #=> "12pt"
h.values_at(:color, :font) #=> ["black", "monaco"]
```
Thay đổi được đề xuất là kết hợp hai phương pháp này thành một. Nó có thể hoạt động giống như phương thức fetch_values ​​được hiển thị bên dưới. 
Lưu ý rằng tên phương thức mới vẫn đang được bỏ phiếu và ví dụ là giả thuyết.

```
h.fetch_values(:color, :font, :fontsize, :border) do |k|
k == "fontsize" ? "12pt" : "#{k} is missing"
end
#=> ["black", "monaco", "12pt", "border is missing"]
```

## Kết luận

Cấu trúc dữ liệu đa dạng.  Hash về cơ bản giống nhau, cho dù nó được triển khai bằng Java, Python hay Ruby.
Hy vọng rằng, quan điểm này sẽ giúp các bạn hiểu rõ hơn về hiệu quả của code mà các bạn đang viết, thậm chí giúp các bạn đóng góp để cải thiện bản phát hành tiếp theo của Ruby.