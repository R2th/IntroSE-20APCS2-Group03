Buổi sáng chúa nhật, mở VNExpress thì biết thành phố công bố hơn 700 ca Covid ngày hôm qua. Dù sao cũng đã ngồi làm việc ở nhà 1 năm nay, những lúc thành phố chìm trong bão tố bệnh dịch thế này thì tốt nhất nên giữ thói quen ở nhà và bật ca khúc 'Đừng tuyệt vọng' của cố nhạc sĩ Trịnh Công Sơn + viết một cái gì đó có ích cho đời.


Câu chuyện hôm nay là sự liên quan giữa "Những Chiếc Ổ Cắm" và việc kết nối đến các Bank nội có, ngoại cũng có. Bài toán thế này:

Boss: Ê mày công ty cần kết nối với bank để làm PL(Khái niệm về việc các công ty tài chính được thuê làm hồ sơ vay cho Bank)

Coder: Kết nối với mấy bên và có API gì ko boss ơi. Trong lòng đầy tâm sự về việc phục vụ cho mấy ông cho vay nặng lãi :D

Boss: Khoảng 2-10 bên gì đó gồm MRBank, SEBank, vvv...(Đã đổi tên để các bác ấy khỏi bảo em là đạo trích :D) Bank gửi API qua mail cho anh rồi, đã forward cho chú.

Coder: (ĐM) gì mà nhiều vậy. Sau 3 ngày phân tích thì ra mớ Usecase sau


MRB
![](https://images.viblo.asia/6e00b97f-4748-42fd-988a-bd0ce5d44f48.png)

SEB
![](https://images.viblo.asia/878236ea-fc18-4e2a-84c8-c1a26969c97c.png)

Mỗi ông nội 1 style, quá phức tạp và loằng ngoằng, cuộc sống mà chúng ta phải theo tiếng gọi của thực phẩm để tồn tai :D, dù có lởm khởm mấy cũng phải tích hợp cho người ta :D

Động não chút, giờ mới có 2 ông, nếu sau này 10 ông thì sẽ căng đây. Phải kiếm 1 giải pháp gì đó để mix tất cả các bên này vào 1 cục nhưng phải đảm bảo dễ maintain và có thể mở rộng sau này.

Về cơ bản tất cả các usecase đều có điểm chung là gửi lên bank 1 request (Function) với Parameters và nhận lại là Response data. Có vẻ có thể xài adapter ở đây rồi.

Nếu các bạn từng kết nối với mấy SDK của Quickbook, Intact, vv.. Bạn sẽ thấy họ tổ chức để giúp coder có thể kết nối tới API theo style sau.
```

$finAdpter = FinancialAdapter::getInstance('MRB');
$params = [
   'p1' => 'p1_value',
   'p2' => 'p2_value',
];
$response = $finAdpter->execute(new InputQDEFunction(), $params);
```
Vậy thì ngon rồi, cách tốt nhất là cứ học cách người khổng lồ design :D. Nói là vậy nhưng vẫn phải động não làm sao sử dụng mấy cái cách đó.

* FinancialAdapter <= Cái này sẽ giúp ta tạo ra action với MRB, SEB, vv.. thông qua 1 interface, xài Adapter pattern ở đây được nè. Sẽ có phương thức là: getInstance('bank_name_here')
* Reponse sẽ là dữ liệu trả về, nhưng mỗi action trả về dữ liệu khác nhau, vậy phải có 1 interface chung ở đây: getStatus(), getBody(),getMessage(), toString()
* Function thì sao nhỉ, cần có 1 interface ở đây nữa, gọi là IFunction: execute($params)
* Còn việc xác thực thì sao, có ông xài Auth2, ông xài Basic Auth, có ông xài cái auth gì đó :D nói chung là cồng kềnh. Vậy thì phải có 1 interface chung cho Auth. Gọi bạn ấy là IAuth. Nhưng cũng cần 1 bộ tạo đối tượng Auth nữa, Factory có thể được xài ở đây.
* Việc request lên bank có thể xài curl hoặ guzzle nhưng về cơ bản cũng cần 1 cái Interface để handle cái đó, gọi bạn ấy là IRequestHandler: setRequestType(), execute()

Well, phức tạp quá, coi hình cho dễ hiểu, xem Class Diagram dưới đây:
![](https://images.viblo.asia/1f7fe8d2-69bc-4d80-b792-f6ad0ccae34e.png)

Code sử dụng sẽ điều chỉnh chút như sau:
```
$configs  = [
    'username' => '',
    'password' => ''
];
$authObj = AuthFactory::getInstance('MRB', $configs);

$finAdpter = FinancialAdapter::getInstance('MRB');
$finAdpter->setAuth($authObj);
$params = [
   'p1' => 'p1_value',
   'p2' => 'p2_value',
];
$response = $finAdpter->execute(new InputQDEFunction(), $params);
```