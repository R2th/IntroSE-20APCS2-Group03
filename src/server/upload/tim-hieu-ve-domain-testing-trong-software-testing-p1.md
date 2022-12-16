Phần 1: 
* Giới thiệu về Domain Testing
* Simpler Practice of Domain Testing
* Domain Testing Strategy

Phần 2:
* Domain Testing Example
* Domain Testing Structure
* Kết luận
                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                       
## 1. Giới thiệu về Domain Testing
Domain Testing là một loại của Functional Testing. Nó thực hiện bằng cách đưa ra các đầu vào và đánh giá các đầu ra.
Nó là một kỹ thuật kiểm thử phần mềm trong đó đầu ra của hệ thống phải được kiểm tra với số lượng đầu vào tối thiểu, trong trường hợp này để đảm bảo rằng hệ thống không chấp nhận giá trị đầu vào không hợp lệ.

Một trong những phương pháp quan trọng nhất của White Box Testing là Domain Testing.
Mục tiêu chính của Domain Testing là kiểm tra xem hệ thống có chấp nhận đầu vào trong phạm vi có thể chấp nhận được hay không và cung cấp đầu ra theo yêu cầu.Ngoài ra, nó xác minh hệ thống không nên chấp nhận các yếu tố đầu vào, điều kiện và chỉ số bên ngoài phạm vi được chỉ định hoặc hợp lệ.

Trong hướng dẫn này, bạn sẽ học:
* Simpler Practice of Domain Testing
* Domain Testing Strategy
* Domain Testing Example
* Domain Testing Structure
## 2. Thực hành đơn giản về Domain testing (Simpler Practice of Domain Testing)
Trong thử nghiệm tên miền, chúng tôi chia miền thành các tên miền phụ (các lớp tương đương) và sau đó thử nghiệm sử dụng các giá trị từ mỗi tên miền phụ.Ví dụ, nếu một trang web (tên miền) được đưa ra để thử nghiệm, chúng tôi sẽ chia trang web thành các phần nhỏ ( tên miền phụ) để dễ kiểm tra.
Miền có thể liên quan đến việc thử nghiệm bất kỳ biến đầu vào nào hoặc kết hợp các biến đầu vào.
Các học viên thường nghiên cứu các trường hợp thử nghiệm miền đơn giản ít hơn hai tên khác, "kiểm tra ranh giới" và "phân tích lớp tương đương".

Thử nghiệm ranh giới - Phân tích giá trị ranh giới (BVA) dựa trên việc kiểm tra lý thuyết và giá trị đầu vào không hợp lệ trong phân vùng / lớp.

#### Kiểm tra đẳng thức tương đương 
Ý tưởng đằng sau kỹ thuật này là phân chia bằng nhau (tức là phân vùng), do đó 'phân vùng tương đương'.

Biểu mẫu đơn giản đó được áp dụng cho kiểm tra miền 
+ Chỉ để kiểm tra các biến đầu vào
+ Chỉ khi được kiểm tra ở cấp hệ thống
+ Chỉ khi thử nghiệm một lần
+ Chỉ khi được thử nghiệm một cách rất hời hợt

Nó có thể được đơn giản hóa như sau:
![](https://images.viblo.asia/870e4725-22f2-48ef-8341-06481f0895b0.png)

#### Giải thích:
1. Nếu một trường chấp nhận phạm vi từ 0-100, trường sẽ không chấp nhận -1 và 101 vì chúng là mục nhập không hợp lệ và vượt ra ngoài ranh giới.
2. Trường phải chấp nhận các giá trị như 0, 100 và bất kỳ số nào giữa chúng.
#### Xây dựng bảng như thế này (trong thực tế)
1. Bắt đầu bằng cách liệt kê các biến, thêm thông tin về chúng khi bạn nhận được.
2. Điều này có nghĩa là tất cả các biến đầu vào, tất cả các biến đầu ra và bất kỳ biến trung gian nào mà bạn có thể quan sát.
3. Trong thực tế, hầu hết các bảng mà tôi đã nhìn thấy là không đầy đủ.Những cái tốt nhất nhìn thấy danh sách tất cả các biến và thêm chi tiết cho các biến quan trọng.

## 3. Chiến lược thử nghiệm tên miền (Domain Testing Strategy)
Trong khi thử nghiệm miền, bạn cần cân nhắc những điều sau đây,
+ Chúng tôi đang thử nghiệm miền nào?
+ Làm thế nào để nhóm các giá trị vào các lớp?
+ Giá trị của các lớp cần kiểm tra?
+ Làm thế nào để xác định kết quả?

#### Chúng tôi đang thử nghiệm miền nào?
Sẽ có một số biến đầu vào được nhập vào và đầu ra thích hợp phải được xác minh

![](https://images.viblo.asia/2de42460-00f5-4f9c-a586-1ab46dbd1e29.png)

### 4. Ví dụ kiểm tra miền (Domain Testing Example)
+ Xem xét một kịch bản thử nghiệm đầu vào đơn lẻ:

      C = a + b, 
      
trong đó a và b là các biến đầu vào và C là biến đầu ra.
Ở ví dụ trên, không cần phân loại hoặc kết hợp các biến được yêu cầu.

+ Xem xét nhiều đầu vào sau và kịch bản đầu ra thích hợp:
Vé là một trong những mô-đun được kiểm tra trong toàn bộ chức năng của Triển lãm trò chơi.

Theo kịch bản, chúng tôi có sáu kịch bản dựa trên độ tuổi và các cuộc thi:

Tuổi> 5 và <10, Boy nên tham gia Kể chuyện.

Tuổi> 5 và <10, cô gái nên tham gia Cuộc thi vẽ.

Tuổi> 10 và <15, Boy nên tham gia Quiz.

Tuổi> 10 và <15, cô gái nên tham gia viết bài luận.

Tuổi <5, cả nam và nữ nên tham gia Cuộc thi Rhymes.

Tuổi> 15, cả nam và nữ nên tham gia cuộc thi Thơ.

Phân vùng trường hợp đầu vào này hoặc chỉ đơn giản là nhóm các giá trị đi vào hình ảnh.

#### Làm thế nào để nhóm các giá trị vào các lớp?
Phân vùng một số giá trị có nghĩa là tách nó thành các tập con không chồng chéo.
Như chúng ta đã có, có hai kiểu phân vùng:
#### Phân vùng tương đương 
- Phân vùng tương đương là một đơn vị dữ liệu từ các phân vùng dữ liệu tương đương mà từ đó trường hợp thử nghiệm được bắt nguồn.
#### Phân tích giá trị ranh giới 
- Phân tích giá trị biên là một kỹ thuật kiểm thử phần mềm trong đó các phép thử được bao gồm các đại diện của các giá trị biên trong một phạm vi.

Chúng tôi đang phân vùng các phân đoạn weare các giá trị thành một tập hợp con hoặc tập hợp con.

Lớp 1: Trẻ em có nhóm tuổi từ 5 đến 10

Lớp 2: Trẻ em có nhóm tuổi dưới 5

Lớp 3: Trẻ em có độ tuổi từ 10 đến 15

Lớp 4: Trẻ em có nhóm tuổi lớn hơn 15.

#### Giá trị của các lớp cần kiểm tra?
Các giá trị được chọn để thử nghiệm phải là các giá trị Ranh giới:
Ranh giới là đại diện là đại diện của các lớp tương đương mà chúng tôi lấy mẫu. Họ có nhiều khả năng phơi bày lỗi hơn các thành viên khác trong lớp, vì vậy họ là đại diện tốt hơn.
Đại diện tốt nhất của một lớp tương đương là một giá trị ở giữa phạm vi.

Đối với ví dụ trên, chúng tôi có các lớp sau để được kiểm tra:

Ví dụ cho kịch bản # 1:
Lớp 1: Trẻ em từ 5 đến 10 tuổi (Tuổi> 5 và <= 10)

#### Giá trị ranh giới:

* Các giá trị phải bằng hoặc nhỏ hơn 10. Do đó, tuổi 10 nên được bao gồm trong lớp này.
* Giá trị phải lớn hơn 5. Do đó, 5 tuổi không nên được đưa vào lớp này.
* Giá trị phải bằng hoặc nhỏ hơn 10. Do đó, tuổi 11 không nên được đưa vào lớp này.
* Giá trị phải lớn hơn 5. Do đó, tuổi 6 nên được bao gồm trong lớp này.

<Continue to part 2>

 Link tham khảo: https://www.guru99.com/domain-testing.html