Chúng ta đều biết sự hữu ích của việc tạo ra số ngẫu nhiên trong một số trường hợp cụ thể dù là trong lập trình hay trong cuộc sống thường nhật. Trong các trò chơi, chúng ta ném xúc xắc để tạo ra một con số không thể đoán trước, xác định bước đi tiếp theo của người chơi. Ngoài ra, tất cả chúng ta đều sẽ đồng ý rằng việc chơi bất cứ một trò chơi bài nào mà không có sự xáo trộn ngẫu nhiên các lá bài sẽ là vô nghĩa.
<br><br>
Vậy chắc hẳn, khi các bạn xử lý với số ngẫu nhiên trong lập trình Python cũng sẽ có thắc mắc giống như mình. Liệu Python có sinh ra được những số *thực sự ngẫu nhiên*?
### Ngẫu nhiên thực VS. Giả ngẫu nhiên
Số ngẫu nhiên có thể thu được do áp dụng các phương pháp toán học hay được gọi là bộ tạo số ngẫu nhiên (Random Number Generator - *RNG*). Nó có thể được chia thành 2 loại: **bộ tạo số ngẫu nhiên thực** (True Random Number Generators - *TRNGs* hay còn gọi là bộ tạo số ngẫu nhiên phần cứng) và **bộ tạo số giả ngẫu nhiên** (Pseudo-random Number Generator - *PRNGS*).
## 1. True Random Number Generators
Các bộ tạo số ngẫu nhiên thực là các phương pháp trích rút tính ngẫu nhiên hoặc không thể tiên đoán từ các khía cạnh không thể đoán trước được của các tiến trình vật lý. Các phương thức này không trực tiếp tạo ra các số, mà là các trạng thái, sau đó có thể được diễn dịch sang dạng số - đây là lý do tại sao chúng thường được gọi là các trình tạo sự kiện ngẫu nhiên (Random Event Generators - *REGs*). Một số trong số chúng, sử dụng các sự kiện vĩ mô phổ biến, như là các phương pháp ném xúc xắc, lật đồng xu hoặc xáo trộn thẻ bài.
<br><br>
Những bộ tạo số ngẫu nhiên thực này thường sử dụng các hiện tượng vật lý phức tạp hơn. Một số trong số chúng, như phân rã phóng xạ, nhiễu nhiệt hoặc nhiễu vô tuyến, được trích xuất sự khó lường từ đặc thù của cơ học lượng tử. Các phương pháp khác sử dụng tính không thể đoán trước được của tiếng ồn trong khí quyển hoặc thậm chí là trạng thái của đèn đối lưu giọt dầu.
## 2. Pseudo Random Number Generators
Sự thật là, việc thường xuyên tạo ra những con số phải thực sự ngẫu nhiên là không cần thiết. Trong nhiều trường hợp, tất cả những gì chúng ta cần là các bộ số "*có vẻ ngẫu nhiên*". Loại dữ liệu này có thể được lấy từ các bộ tạo số giả ngẫu nhiên. Đây là các thuật toán, sử dụng một phần nhỏ thông tin (được gọi là ***seed***) và sau đó áp dụng các công thức toán học phức tạp để tạo ra các bộ số xác định giống như các bộ thực sự ngẫu nhiên. Seed có thể là một giá trị được lấy từ một trình tạo số ngẫu nhiên thực sự hoặc một nguồn khác, như đồng hồ của hệ thống hoặc thời gian hiện tại.
<br><br>
Chạy bộ tạo số nhiều lần bằng cùng một seed sẽ dẫn đến cùng một output mỗi lần chạy. Các số kết quả hầu như không thể phân biệt được với các số có nguồn gốc từ các bộ tạo số ngẫu nhiên thực, mặc dù thực tế có một số quy tắc ẩn trong sự phân phối của chúng. Tuy nhiên, đối với nhiều ứng dụng, loại giả ngẫu nhiên xác định này là hoàn toàn đủ.
## 3. Module Random trong Python
Python cung cấp sẵn một module cực kỳ dễ sử dụng để xử lý với các số ngẫu nhiên. Module này gọi là `random`, được cài đặt một bộ tạo số giả ngẫu nhiên và chứa các hàm cho phép chúng ta giải quyết trực tiếp nhiều vấn đề lập trình khác nhau sử dụng đến tính ngẫu nhiên.
<br><br>
Module `random` dựa trên Marsenne Twister - một thuật toán rất phổ biến, là trình tạo số giả ngẫu nhiên mặc định không chỉ cho Python, mà còn cho nhiều hệ thống phần mềm phổ biến khác như Microsoft Excel, MATLAB, R hay PHP. Ưu điểm nổi bật của nó là việc được cấp phép chứng nhận, tính ngẫu nhiên được xác nhận bởi nhiều thử nghiệm thống kê và tốc độ tương đối cao so với các PRNG khác.
### Hàm random()
Phương thức quan trọng nhất của module `random` là phương thức `random()`. Hầu hết các chức năng khác phụ thuộc vào nó. Phương thức `random()` tạo ra một số thực float ngẫu nhiên trong phạm vi (0.0, 1.0).
```erlang
>>> import random
>>> random.random()
0.8474337369372327
```
### Hàm seed()
Nếu chúng ta không đặt một seed cho bộ tạo số giả ngẫu nhiên, thì seed mặc định là thời gian hệ thống hiện tại. Tuy nhiên, chúng ta có thể đặt giá trị chính xác của seed một cách thủ công, việc này sẽ rất hữu ích nếu chúng ta muốn sao chép kết quả giả ngẫu nhiên trong tương lai. Với mục đích như vậy, chúng ta có thể sử dụng phương thức `random.seed()`
```python
>>> random.seed(5)
>>> random.random()
0.6229016948897019
>>> random.random()
0.7417869892607294
>>> random.random()
0.7951935655656966
>>> random.seed(5)
>>> random.random()
0.6229016948897019
```
Phương thức `random.seed()` sẽ ảnh hưởng đến tất cả các phương thức của module `random` mà chúng ta sử dụng sau khi gọi nó. Trong đoạn code ví dụ ở trên, ta đặt seed là `5` và sau đó gọi hàm `random.random()` nhiều lần. Điều quan trọng cần lưu ý ở đây là seed do người dùng định nghĩa sẽ chỉ được sử dụng lần đầu tiên khi có một phương thức `random` khác được thực thi - sau đó, các seed cho các phương thức sau sẽ thay đổi bằng cách sử dụng các giá trị ngẫu nhiên được tạo ra trước đó.
<br><br>
Điều này cho phép Python đưa ra được giá trị ngẫu nhiên mới mỗi lần. Tuy nhiên, sau khi thiết lập lại seed bằng phương thức `random.seed()`, chúng ta sẽ có thể sao chép chính xác chuỗi số giả ngẫu nhiên bất cứ lúc nào. Điều này rất hữu ích cho những việc như chạy thử nghiệm. Nếu bạn đưa ra cùng một seed mỗi khi bạn chạy một thử nghiệm có sử dụng một trong các phương pháp `random` thì bạn vẫn có thể biết đầu ra sẽ là gì cho các thử nghiệm này.
### Một vài ví dụ cụ thể của module Random
#### Hàm randint()
```markdown
>>> random.randint(1,10)
4
```
Phương thức `random.randint()` lấy hai đối số thể hiện phạm vi mà phương thức rút ra một số nguyên ngẫu nhiên. Ở ví dụ trên là số nguyên được chọn ngẫu nhiên từ 1 đến 9.
#### Hàm randrange()
```ruby
>>> random.randrange(2,10,2)
2
>>> random.randrange(2,10,2)
4
>>> random.randrange(2,10,2)
8
>>> random.randrange(2,10,2)
6
```
Trong đoạn code trên, phương thức `random.randrange()` tương tự như `random.randint()` nhưng nó cũng cho phép chúng ta xác định đối số thứ ba, là bước nhảy trong phạm vi được xác định. Ở ví dụ này, ta chỉ yêu cầu đưa ra các số chẵn trong phạm vi từ 2 đến 9.
#### Hàm choice()
```html
>>> cards = ['ace_spades','10_hearts','3_diamonds','king_hearts']
>>> random.choice(cards)
'10_hearts'
```
Trong đoạn code này, phương thức `random.choice()` chọn một phần tử ngẫu nhiên thuộc danh sách.
#### Hàm shuffle()
```html
>>> cards = ['ace_spades','10_hearts','3_diamonds','king_hearts']
>>> random.shuffle(cards)
>>> print(cards)
['king_hearts', '3_diamonds', 'ace_spades', '10_hearts']
```
Trong đoạn code trên, phương thức `random.shuffle()` xáo trộn một danh sách các phần tử. Điều quan trọng cần lưu ý ở đây là nó xáo trộn chính ở trong danh sách đó. Có nghĩa là phương thức này trả về `None` và thực sự sửa đổi biến `cards` của chúng ta.
## Kết luận
Vậy là thực chất `random()` trong Python không phải là ngẫu nhiên, đó đều là kết quả do máy tính (hay chính xác hơn là con người với các thuật toán) tạo ra mà thôi!
## Nguồn tham khảo
[Tài liệu chính thức trên trang chủ Python](https://docs.python.org/3/library/random.html)