### I. Giới thiệu
- Vì sao cần quan tâm unit test, đơn giản là để tránh bị những bug đáng ra không nên bug :v, đùa thôi,  nói chung là xác định xem phần mềm được tạo ra có hoạt động đúng như mong đợi hay không
-  unit test là phần thấp nhất trong các tầng của testing, được xử lý bởi dev

![](https://images.viblo.asia/270ebc6a-a962-42fc-90d1-6f7d7041cb20.png)

- Đối với dev khi viết unit test thì chỉ cần quan tâm tới scope là được
    - Validation check (error message, required fields, max length...)
     - P1 test cases: Happy path flow
     - P3 test cases: Components
     - Functionality Test
     - Role and permission
 - Còn những gì ngoài scope, quan tâm được thì càng tốt :v (hoặc nếu bị bắt buộc =)))
     - UI / UX
     - Non functional testing: Usability, Performance/Stress/Load test...
     - Abnormal case
     - Enhancement

### II. TDD - ATDD - BDD
- TDD thì mọi người nghe nhiều rồi: Test Driven Development, viết test trước khi code
![](https://images.viblo.asia/7c0de482-e391-4afb-9a3c-c3bb9e3b07fc.jpeg)
- ATDD (Acceptance Tést Driven Development) BDD (Behaviour Driven Development) thì là nâng cao hơn của TDD
- Mình thấy 2 thằng khá tương đồng:
    - Đều dựa theo story mà KH cung cấp
    - Sau khi có story, các bên liên quan: Dev, QA, Tester, PM, ... sẽ cùng ngồi xuống và nói chuyện với nhau về story này
    - Chia thành 3 phần
        - Give: Nhận được gì
        - When: Khi nào thực hiện
        - Then: Sau đó thì sao
    - Sau đó áp dụng TDD
- Video về ATDD: https://www.youtube.com/watch?v=uPgTvZO5laY&ab_channel=VladimirMandala
- Video về BDD: https://www.youtube.com/watch?v=ydddSkVz_a8&ab_channel=MarkShead
### III. Một số cách tìm test case
1. Test giá trị biên
    - Ví dụ 1: ta có một input nhập tuổi
    - spec yêu cầu là tuổi lớn hơn 18
    - Test giá trị biên là, đối với value yêu cầu, ta cộng trừ 1
    - Tức là có 3 case ta cần test 17, 18, 19
    - Ví dụ 2: input nhập password
    - spec yêu cầu length từ 6 tới 12 kí tự
    - Dựa theo công thức +-1, ta có tổng 6 case cần test, 5 ,6, 7 và 11, 12, 13
2. Phân vùng tương đương
    - Cái này thì nâng cao của test giá trị biên
    - Bài toán: Ta có hệ thống tính toán số điểm chuyển đổi thành điểm chữ cái
        - Từ 0 -> 64: F
        - Từ 65 -> 69: D
        - Từ 70 -> 79: C
        - Từ 80 -> 89: B
        - Từ 90 -> 100: A
    - Ở đây ta chia làm 2 TH: valid và invalid
    - Áp dụng test giá trị biên, ta có

    ![](https://images.viblo.asia/5a3c68b5-5d0f-4314-8899-022f547049f6.PNG)

3. Decisions Table
    - Ta có bài toán về mở thẻ tín dụng, với các điều kiện được cho sau đây
        - Nếu khách hàng mới và muốn mở tài khoản thẻ tín dụng sẽ được giảm giá 15%
        - Nếu đã là khách hàng và có thẻ loyalty => được giảm giá 10%.
        - Và nếu khách hàng có phiếu mua hàng thì sẽ được giảm giá 20%
        - Không áp dụng đồng thời với điều kiện giảm giá cho khách hàng mới
        - Các khoản giảm giá được cộng dồn (nếu áp dụng)
    - Theo cách làm cũ, ta sẽ tự suy nghĩ các TH có thể xảy ra :v, nhưng phía tester sẽ có công thức để tính ra
    - Đầu tiên là list các điều kiện có thể xảy ra
        - KH mới
        - KH có Loyalty card
        - KH có coupon
    - ta lấy 2 mũ với số điều kiện sẽ ra các case cần: 2^3 = 8
    - Vậy ta có 8 case cần kiểm tra

        | Điều kiện | TH 1 | TH 2 | TH 3 | TH 4 | TH 5 | TH 6 | TH 7 | TH 8 |
        | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
        | KH mới                         | T     | T     | T     | F     | F     | T     | F     | F     |
        | KH có Loyalty card     | T     | T     | F     | T     | T     | F     | F     | F     |
        | KH có coupon             | T     | F     | T     | T     | F     | F     | T     | F     |
        | -| - | - | - | - | - | - | - | - |
        | Giảm giá                      | x     | x     | 20     | 30     | 10     | 15     | 20     | 0     |
    - Qua bài toán nâng cao hơn: Bảo hiểm xe
        - Với nữ dưới 65 tuổi: bán 500$
        - Với nam dới 25 tuổi: bán 3000$
        - Với nam từ 25 tới 64: bán 1000$
        - Với cả nam lẫn nữ trên 65 tuổi: bán 1500$
    - Tổng cộng ta sẽ có 5 điều kiện
        - `Nam`
        - `Nữ`
        - `< 25`
        - `>= 25 và < 65`
        - `>= 65`
    - Nếu dùng công thức 2 ^ với số điều kiện thì ta có tới tận 25 test case để check @@
    - Nhưng trên thực tế có những TH sẽ không bao giờ xảy ra: giới tính không thể vừa nam vừa nữ, không thể không có giới tính, nhỏ hơn 25 thì không lớn hơn 25 được, ...
    - Rút gọn lại ta chỉ cần test 6 TH là đủ
    
        | Điều kiện | TH 1 | TH 2 | TH 3 | TH 4 | TH 5 | TH 6 |
        | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
        | Nam               | T     | T     | T     | F     | F     | F     |
        | Nữ                  | F     | F     | F     | T     | T     | T     |
        | < 25                | T     | F     | F     | T     | F     | F     |
        | >= 25 và <65 | F     | T     | F     | F     | T     | F     |
        | >= 65             | F     | F     | T     | F     | F     | T     |
        | - | - | - | - | - | - | - |
        | Giá bán             | 3000     | 1000     | 1500     | 500     | 500     | 1500     |

4. State Transition Testing
    - Như tên của nó: Kiểm tra thay đổi trạng thái, ví dụ như đăng nhập với giới hạn 3 lần sẽ khóa account, status trạng thái online - offline, ...
    - Lấy ví dụ về đăng nhập với giới hạn 3 làn khóa
    - Cái này thì không dùng được công thức 2 mũ, vì có điều kiện đâu =))
    - Nên cái này ta sẽ vẽ hình để có thể thấy được cần bao nhiêu test case
    ![](https://images.viblo.asia/c1800dfa-4fc6-41a9-a80e-e58dd930bb90.png)
    - Dựa vào hình trên ta sẽ có 6 TH xảy ra:
        - TH 1: login lần 1 thành công
        - TH 2: login  lần 1 không thành công
        - TH 3: login lần 2 thành công
        - TH 4: login lần 2 không thành công
        - TH 5: login lần 3 thành công
        - TH 6: login lần 3 không thành công, khóa tài khoản
5. Dựa vào kinh nghiệm, hỏi người có kinh nghiệm và review pull request :v 
    - Vì sao ở đây mình lại nói là dựa vào kinh nghiệm hoặc hỏi người khác kinh nghiệm
    - Đơn giản là có những TH không thể dùng công thức để tìm ra được như
        - có space (đầu, cuối, giữa) trong chuỗi
        - kí tự đặc biệt
        - full size - half size character
        - .v.v.
### IV. Statement coverage và Decision coverage
- Statement coverage là cover code của mình đã chạy hết chưa
- Hiện tại có rất nhiều tool support cho phần này
![](https://images.viblo.asia/bcebc5a8-5f6b-45cc-80f4-50d7d257bc35.png)
- Decision coverage là cover thêm các TH mà trong code không có như trong code chúng ta chỉ có như sau
    ```
    if (gender === 'male') { discount = '10%' }
    ```
- thì nếu chỉ statement coverage thì pass đoạn code if đó là ok
- nhưng decision coverage là chúng ta sẽ test thêm các đoạn else của if trên, xem xem sẽ có gì xảy ra, và nó xảy ra theo đúng ý của mình hay chưa
### V. Kết
- Còn có rất nhiều thứ để có thể test được, nhưng đối với dev thì mình thấy chừng này là đủ sài để có thể viết unit test một cách xịn xò nhẩt rồi :v 
- Mọi người nên tập làm quen dần với việc cover đủ unit test, vì nếu sau này có change request xảy ra, khi chạy tổng, những chổ nào bị ảnh hưởng sẽ được unit test thể hiện