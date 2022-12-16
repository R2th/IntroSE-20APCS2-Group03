refer: https://www.stickyminds.com/article/tester-walks-bar-reviewing-test-techniques

Chi tiết bài toán: Một QA bước vào một quán bar và order bia. Anh ấy order 10 chai bia, số âm chai, 0 chai ... Có rất nhiều trường hợp xảy ra cho bài toán này. Ở đây, công việc của chúng ta cần làm là: hãy xây dựng các trường hợp thử nghiệm cho cách chúng tôi sẽ kiểm tra quá trình order bia như thể nó là phần mềm.

### Black Box Techniques

Hãy xây dựn testcase sử dụng những kỹ thuật phân tích trong quyển sách Foundations of Software Testing đã từng quen thuộc với mỗi QA.

Để xác định được các trường hợp test trước hết chúng ta cần xác định một số khả năng có thể hoặc không thể tồn tại trên thực tế như: Anh chàng QA đó không thể order số âm chai bia, cho nên số âm chai bia sẽ là nằm ngoài phạm vi order.

### 1. Equivalence partitioning- phân vùng tương đương

Đầu tiên chúng ta có thể sử dụng phương pháp cơ bản nhất equivalence partitioning- phân vùng tương đương để xây dựng Testcase cho bài toán.
Nhưng câu hỏi được đặt ra ở đây là: chúng ta dựa vào yếu tố nào để lựa chọn vùng tương đương cho nó. Giới hạn cận trên và giới hạn cận dưới của nó sẽ là bao nhiêu?
Về mặt lý thuyết, chúng ta có thể không giới hạn tiệm cậm cho nó, có thể lựa chọn từ âm vô cùng đến dương vô cùng số lượng chai bia có thể order.
Nhưng dựa trên thực tế đời sống, chúng ta sẽ loại trừ được trường hợp chọn số âm vô cùng (vì thực tế không thể order âm số chai bia) và khi order bia thực tế thì 1 người thường gọi tầm 1 két bia (khoảng 24 chai) 
=>  Dựa trên lý do này tôi nghĩ lựa chọn số 0 và 24 làm con số giới hạn là 1 lựa chọn khá hợp lý

Như vậy dựa theo phân tích theo phân vùng tương đương ở trên, bài toán trên được chia làm 3 vùng như sau:

* Từ số âm đến 0: là vùng lựa chọn không hợp lệ
* Từ 0 đến 24 là vùng hợp lý: Chàng QA có thể order số lượng bia ở vùng này.
* Từ 24 đến dương vô cùng là vùng không hợp lệ. Tất nhiên chàng QA có thể order > 24 chai bia, tuy nhiên, ở trên chúng ta đã lựa chọn giới hạn giả sử là 24 nên order số lượng > 24 chai là không hợp lệ.

Và dựa trên con số giới hạn của vùng tương đương kia, chúng ta có thể chọn ra các giá trị tiệm cận tương ứng với nó để test. Ví dụ như:

+ O là giới hạn của tiệm cận dưới => ta có thể chọn số -1, 0 và 1 là các case cần test.
+ 24 là tiệm cận trên => ta có thể lựa chọn các số 23, 24 và 25 để test.
+ Từ 0-24 là vùng hợp lệ: tất cả các con số thuộc vùng này đều là các con số cần test. Tuy nhiên, nếu lựa chọn như vậy thì có quá nhiều kết quả, quá tốn thời gian test. Do đó, theo tôi 1 lựa chọn hợp lý khi chọn số ở cùng này là chọn số trung bình của nó, tức là chọn số 12.

==> Vậy những số lượng cần test cho bài toán trên sẽ được chọn là : -1, 0, 1, 12, 23, 24 và 25.

### 2. Decision table - Bảng quyết định

Phương pháp thứ 2 có thể sử dụng để phân tích bài toán này đó là sử dụng bảng quyết định.

Giả sử ở đây chúng ta có các điều kiện sau cho bài toán này:

- Trên 18 tuổi với được phép uống bia.
- Không mắc bệnh (không được phép uống bia rượu).

Dựa theo phương pháp bản quyết đinh: số lượng rule thỏa mãn số lượng điều kiện trên là 2^n (với n là số điều kiện). Ở đây như ta giả sử ở trên có 2 điều kiện thì số rule cần là: 2^2=4 rule).

| Điều kiện | Rule 1 | Rule 2 | Rule 3 | Rule 4 |
| -------- | -------- | -------- | -------- | -------- | 
| >= 18 tuổi |  Y          |  Y        |  N         | N         |
| k bệnh tật |  Y          |  N       |  Y         | N         |
| **Hành động** |                  |
|Order bia|  Y          | N        |  N         | N         |

=> Vậy theo bảng trên ta có thể xác định được các trường hợp cần test như sau:

+ Trên 18 tuổi và không có bệnh tật -> được phép order bia
+ Trên 18 tuổi nhưng có bệnh -> không order được bia.
+ Dưới 18 tuổi và không có bệnh -> không order được bia.
+ Dưới 18 tuổi và có bệnh -> không order được bia.

### 3. state-transition diagrams - Biểu đồ trạng thái.

Giả sử có biểu đồ như sau:

![](https://images.viblo.asia/0ed84b57-5f45-4b1d-85e7-b6f80c632c3f.png)

Dựa theo sơ đồ trên, ta có thể nhận thấy đường đi ngắn nhất (nhanh nhất để chàng QA lựa chọn order bia và được phục vụ chính là đường đi đầu tiên của biểu đồ).
A chàng đó order bia, được phục vụ bia, có đủ tiền trong thẻ để thanh toán và anh ta được nhận bia theo đúng order của mình.
Tuy nhiên, cũng có các trường hợp khác xảy ra như anh ta có thể lựa chọn trả = tiền mặt hoặc là anh ta không đủ tiền để thanh toán nhưng có thẻ khuyến mại or ID khuyến mại.

Vậy dựa trên sơ đồ trên ta có thể phân tích được các testcase như sau:

+ Không order bia => không được phục vụ.
+ Order bia và thanh toán bằng thẻ => được phục vụ bia
+ Order bia và thanh toán bằng tiền mặt => được phục vụ bia.
+ Order bia và sử dụng thẻ khuyến mại để thanh toán => showID và ký giấy.

### White Box Techniques

Có nhiều người sẽ có thắc mắc rằng: order bia thì kiểm tra bằng phương pháp white box kiểu gì?

Ồ, tôi nghĩ là vẫn luôn luôn có thể áp dụng kỹ thuật này vào trong bất kỳ trường hợp kiểm thử nào của bạn.

Áp dụng với bài toán này: chúng ta có thể kiểm tra chất lượng của bia, kiểm tra loại hình chai bia, kiểm tra phương thức uống bia như uống vào buổi sáng hay buổi tối hoặc kiểm tra thành phần của bia xem có đúng với thành phần đã thông báo không?..

### Localization, Exploratory, and Load Testing

Để test cho localization, chúng ta có thể giả sử test khi gọi bia bằng nhiều ngôn ngữ khác nhau.

Ví dụ: ở 1 quán bar ở US người phục vụ chủ yếu sẽ chỉ dung tiếng anh hoặc 1 số sẽ sử dụng tiếng Tây Ba Nha, tuy nhiên, là 1 QA bạn không thể giới hạn cho việc test chỉ sử dụng 2 thứ tiếng trên, bạn có thể test trong các trường hợp sử dụng tiếng Nhật, Trung, tiếng Thụy Điển, thậm chí "body language" để gọi bia và kết quả mong đợi cua chúng ta là:  người phục vụ có thể hiểu được nếu anh chàng QA sử dụng tiếng anh, tiếng Tây Ba Nha và "body language" tuy nhiên k thể hiểu được trong trường hợp sử dụng các ngôn ngữ khác.

Về mặt test Exploratory: chúng ta có thể thảo sức sáng tạo để test cho bài toán này không theo một khuôn mẫu nào cả. Ví dụ như: a chàng QA sẽ gọi bia nhưng không quan tâm tới số lượng mà chỉ quan tâm về giá cả, mỗi loại bia với mức giá khác nhau, a chàng đó sẽ mua bia để phù hợp với túi tiền của mình, hoặc là a chàng đó quan tâm tới chất lượng của bia, thành phần bia, cốc đựng, đá, thái độ phục vụ ....

Cuối cùng là test load: Ồ, ở quán bia có thể phục vu 24/7 hay không? có thể phục vụ bao nhiêu người nhanh nhất trong 1 khoảng thời gian ...


### Tổng hợp số testcases có thể phát sinh với bài toán trên

Trên đây là 1 bài toán rất thú vị hải không? nó rất gần gũi với mỗi người chúng ta. Ở đây, thông qua bài toán tôi muốn nhấn mạnh vào việc có thể dùng kỹ năng của QA để phân tích bất kỳ 1 bào toán nào trở thành 1 chương trình, 1 phần mềm để test (bệnh nghề nghiệp ha =.=)

Dưới đây là tổng hợp các TCs được phân tích từ bào toán ở trên.



| No | Input  | Expected Result |
| -------- | -------- | -------- |
| 1    | số âm beer  | Không thể phục vụ    |
| 2    | 0 beer  | Không thể phục vụ    |
| 3   | 1 beer  | Bạn được phục vụ bia   |
| 4   | 12 beer  | Bạn được phục vụ bia   |
| 5   | 23 beer  | Bạn được phục vụ bia   |
| 6  | 24 beer  | Bạn được phục vụ bia   |
| 7   | 25 beer  | Bạn không thể được phục vụ bia   |
| 8   | <18 tuổi  | Bạn không thể được phục vụ bia   |
| 9   | Mắc bệnh  | Bạn không thể được phục vụ bia   |
| 10   | Mắc bệnh và < 18  | Bạn không thể được phục vụ bia   |
| 11   | Mắc bệnh và >= 18  | Bạn không thể được phục vụ bia   |
| 12   | Không mắc bệnh và <18 tuổi | Bạn không thể được phục vụ bia   |
| 13   | Không mắc bệnh và >=18 tuổi | Bạn được phục vụ bia   |
| 14   | Chủ quán order bia | Bạn được phục vụ bia miễn phí   |
| 15   | Thanh toán bằng thẻ | Bạn được phục vụ bia   |
| 16   | Thanh toán bằng tiền mặt | Bạn được phục vụ bia   |
| 17   | Bạn là thanh viên và có coupon khuyến mại | Show ID và ký giấy khuyến mại   |
| 18   | 1 bia lạnh không đá | Bạn được phục vụ đúng với sở thích  |
| 19   | 1 bia lạnh nhiều đá | Bạn được phục vụ đúng với sở thích  |
| 20   | 1 bia vào buổi sáng | Bạn được phục vụ |
| 21   | Bạn và bạn bè order bia | Bạn vầ bạn của bạn được phục vụ |
| 22   | Exploratory testing | Test bằng TBD|
| 23   | Order bằng nhiều tiếng anh | Bạn được phục vụ bia|
| 24   | Order bằng nhiều tiếng Tây Ba Nha | Bạn được phục vụ bia|
| 25  | Order bằng "body language" | Bạn được phục vụ bia|
| 26   | Order bằng nhiều tiếng Trung | Bạn không được phục vụ bia|