Sở hữu sản phẩm có chất lượng tối ưu nhất là mục tiêu hàng đầu của tổ chức kiểm thử.

Với sự trợ giúp hiệu quả của quy trình đảm bảo chất lượng , các nhóm kiểm thử cố gắng tìm ra tối đa các khiếm khuyết trong quá trình kiểm thử của họ, đảm bảo rằng khách hàng hoặc người dùng cuối sử dụng sản phẩm không thấy bất kỳ bất thường nào liên quan đến hoạt động của sản phẩm trong môi trường sử dụng của họ.

Vì tìm ra các khiếm khuyết là một trong những mục tiêu chính nên người kiểm thử cần phải soạn thảo hoặc thiết kế các tình huống thử nghiệm một cách cẩn thận để đảm bảo ứng dụng hoặc sản phẩm cụ thể hoạt động theo cách mà nó sẽ hoạt động. 

![](https://images.viblo.asia/4e888d35-f569-407b-bc5e-a628b3141fb1.jpg)

Mặc dù việc xác minh rằng phần mềm thực hiện các chức năng cơ bản của nó đúng như mong muốn là rất quan trọng, nhưng việc xác minh rằng phần mềm có khả năng xử lý trơn tru một tình huống bất thường hay không cũng là điều quan trọng không kém.

Hầu hết chúng ta đều đã biết đến một số loại kiểm thử như Functional testing, Sanity testing, Smoke testing, Integration testing, Regression testing, Alpha and beta testing, Accessibility testing, v.v. Tuy nhiên, mọi người sẽ đồng ý rằng dù thực hiện bất cứ loại hình kiểm thử nào thì toàn bộ nỗ lực thử nghiệm về cơ bản có thể được khái quát thành hai loại:  Positive testing ( kiểm thử chỉ với dữ liệu đúng và hợp lệ)  và Negative testing (kiểm thử với những dữ liệu không hợp lệ) 

## Positive testing và Negative testing là gì?
### Positive testing
Positive testing còn được gọi là “Happy Testing” thường là hình thức kiểm thử đầu tiên mà người thử nghiệm sẽ thực hiện trên một ứng dụng. Đây là quá trình chạy các kịch bản thử nghiệm mà người dùng cuối sẽ chạy để sử dụng sản phẩm. Nếu thử nghiệm kịch bản không cần dữ liệu, thì Positive testing sẽ yêu cầu chạy thử nghiệm chính xác theo cách mà nó phải chạy để đảm bảo rằng ứng dụng đang đáp ứng tốt các thông số kỹ thuật.

Đôi khi có thể có nhiều cách thực hiện một chức năng hoặc nhiệm vụ cụ thể với mục đích mang lại cho người dùng cuối sự linh hoạt hơn hoặc để đảm bảo tính nhất quán chung của sản phẩm. Đây được gọi là ‘Alternative path testing’ (kiểm thử đường dẫn thay thế) , cũng là một loại Positive testing. Trong thử nghiệm đường dẫn thay thế, kịch bản thử nghiệm sẽ được thực hiện lại nhưng với 1 đường dẫn khác.. Kịch bản kiểm thử thậm chí sẽ dùng cùng loại dữ liệu để đạt được kết quả tương tựđể trả về cùng một kết quả.

![](https://images.viblo.asia/9e410f43-9786-4381-ab6a-57d40995345b.jpg)


Hình và giải thích bên dưới có thể giúp bạn hiểu rõ hơn:  
A là điểm xuất phát và B là điểm kết thúc 
--> Có 2 cách để đi từ A đến B 
- Route 1 là tuyến đường sử dụng chung 
-  Route 2 là tuyến đường thay thế
Do đó ở trường hợp này, "Happy path testing" sẽ đi từ điểm A đến B sử dụng Route 1 và ‘Alternative path testing’ sẽ bao gồm việc lấy Route 2 để đi từ A đến B. Quan sát thấy kết quả của cả 2 cách đều ra cùng kết quả. 

### Negative Testing

Negative Testing thường được gọi là Error Path Testing hay Failure Testing,  thường được thực hiện để đảm bảo tính ổn định của ứng dụng.

Negative Testing là quá trình áp dụng càng nhiều khả năng sáng tạo càng tốt và xác nhận ứng dụng xử lý những dữ liệu không hợp lệ. Điều này có nghĩa mục đích dự kiến là kiểm tra xem lỗi có được hiển thị cho người dùng ở đúng chỗ hay không, hoặc xử lý giá trị xấu một cách hợp lý .

Thực sự quan trọng để hiểu lý do tại sao Negative Testing  là cần thiết.

Độ tin cậy chức năng của ứng dụng hoặc phần mềm có thể được đánh giá chỉ với những kịch bản Negative khi chúng được thiết kế hiệu quả. Negative Testing không chỉ nhằm mục đích đưa ra bất kỳ sai sót tiềm ẩn nào có thể gây ra tác động nghiêm trọng đến việc sử dụng sản phẩm mà còn có thể là công cụ để xác định trong những điều kiện nào thì ứng dụng có thể bị crash. Cuối cùng, nó đảm bảo rằng có nhiều lỗi có khả năng vẫn còn tồn tại trong phần mềm. 


Ví dụ, bạn cần viết các trường hợp Negative về một chiếc bút.Chuyển động cơ bản của chiếc bút là có thể viết trên giấy.

Một số ví dụ về kịch bản Negative có thể là:

- Thay đổi phương tiện mà nó phải viết, từ giấy sang vải hoặc gạch và xem nó có còn viết được hay không.
- Đặt bút vào chất lỏng và kiểm tra xem nó còn viết được hay không.
- Thay ống mực của bút bằng một ống rỗng và kiểm tra xem nó còn viết được hay không.

### Ví dụ thực tế về Positive Testing và Negative Testing
Hãy lấy một ví dụ về UI Ziward để tạo một số điều khoản. Trong Ziward, người dùng phải nhập các giá trị dạng văn bản vào một ô và giá trị số trong một ô khác.

Ô đầu tiên:

Trong lần đầu tiên, người dùng phải đặt tên cho điều khoản như hình dưới đây:

![](https://images.viblo.asia/6f6507fe-33ae-4bf9-91c8-141b2f773a89.jpg)

Giờ hãy cùng kiểm tra các quy tắc cơ bản để đảm bảo chúng ta thiết kế tốt các kịch bản Positive và Negative.

Yêu cầu: 

- Textbox tên là một tham số bắt buộc
- Mô tả không bắt buộc.
- Textbox tên chỉ có thể có các ký tự a-z và A-Z. Không được nhập số, ký tự đặc biệt.
- Tên có thể dài tối đa 10 ký tự.

Bây giờ chúng ta hãy thiết kế các trường hợp thử nghiệm Positive và Negative cho ví dụ này.

**Positive Testing** : Dưới đây là một số trường hợp thử nghiệm Positive 

1. ABCDEFGH (xác thực chữ hoa trong giới hạn 10 ký tự)
2. abcdefgh ( xác thực chữ thường trong giới hạn 10 ký tự)
3. aabbccddmn (xác thực giới hạn 10 ký tự)
4. aDBcefz (chữ hoa kết hợp với xác thực chữ thường trong giới hạn 10 ký tự)
.. và các kịch bản khác.

**Negative Testing** : Dưới đây là một số trường hợp thử nghiệm Negative

1. ABCDEFGHJKIOOOOOKIsns (tên vượt quá 10 ký tự)
2. abcd1234 (tên có các giá trị số)
3. Không nhập tên 
4. sndddwwww_ (tên chứa các ký tự đặc biệt)

     .. và các kịch bản khác.
  
**Ô thứ 2**

Trong ô thứ hai, người dùng dự kiến chỉ nhập các giá trị số như được hiển thị bên dưới:

![](https://images.viblo.asia/6cfb197f-3bb0-41e0-b7e4-7bc011b45bda.jpg)

Chúng ta hãy thiết lập một số yêu cầu ở đây:

1. ID phải là một số từ 1- 250
2. ID là bắt buộc.

Dưới đây là một số kịch bản kiểm thử Positive và Negative cho trường hợp này.

**Kịch bản Positive Testing**

12 (Nhập giá trị hợp lệ trong phạm vi được yêu cầu )

1,250 (Nhập giá trị biên trong phạm vi được yêu cầu)

**Kịch bản Negative Testing**

Ab (Nhập văn bản thay vì số)

0, 252 (Nhập giá trị ngoài biên)

Không nhập gì cả

-2 (Nhập giá trị ngoài yêu cầu)

+56 (Nhập giá trị hợp lệ có tiền tố là một ký tự đặc biệt)

### Các yếu tố cơ bản giúp ích cho việc viết kịch bản kiểm thử Positive và Negative

Nếu bạn xem kỹ ví dụ ở trên, bạn sẽ thấy có rất nhiều kịch bản positive và negative.Tuy nhiên, thử nghiệm hiệu quả là khi bạn tối ưu hóa danh sách các tình huống Positive và Negative  sao cho việc thử nghiệm đầy đủ nhất.

Ngoài ra, trong cả hai trường hợp này, bạn sẽ thấy một điểm chung về cách các kịch bản được thiết lập.  Trong cả hai trường hợp trên, có hai thông số hoặc kỹ thuật cơ bản tạo thành một cơ sở để thiết kế đủ số lượng các trường hợp kiểm thử positive và negative

Hai tham số là: 

- Phân tích giá trị biên
- Phân vùng tương đương

### **Phân tích giá trị biên**

Như chính tên gọi của nó, các biên cho biết giới hạn đối với một cái gì đó. Do đó, kỹ thuật này liên quan đến việc thiết kế các kịch bản thử nghiệm chỉ tập trung vào các giá trị biên và xác thực cách ứng dụng hoạt động. Nếu các đầu vào được cung cấp trong các giá trị biên thì nó được xem xét là thử nghiệm Positive, các đầu vào vượt quá giá trị ranh giới được coi là một phần của thử nghiệm Negative.

Ví dụ:  Một ứng dụng cụ thể chấp nhận các Id VLAN nằm trong khoảng từ 0 - 255. Do đó, ở đây 0, 255 sẽ tạo thành các giá trị biên. Bất kỳ đầu vào nào dưới 0 hoặc trên 255 sẽ được coi là không hợp lệ và sẽ tạo thành thử nghiệm Negative.

![](https://images.viblo.asia/16949f2f-8a5a-40da-bc79-884b7e146b48.jpg)

### **Phân vùng tương đương**

Trong phân vùng Tương đương, dữ liệu thử nghiệm được tách biệt thành các vùng khác nhau. Các vùng này được gọi là các lớp dữ liệu tương đương. 

Giả định rằng các dữ liệu đầu vào khác nhau (dữ liệu có thể là một điều kiện) trong mỗi phân vùng hoạt động giống nhau. Do đó, mỗi vùng chỉ cần kiểm thử một dữ liệu cụ thể hoặc 1 tình huống cụ thể, vì nếu một dữ liệu trong vùng đó hoạt động thì tất cả các dữ liệu khác trong vùng đó được coi là hoạt động. Tương tự, nếu một dữ liệu trong  vùng không hoạt động thì toàn bộ dữ liệu trong vùng này sẽ không hoạt động.


Trong cùng một ví dụ về VLAN ở trên, các giá trị có thể được chia thành hai phân vùng.

Hai phân vùng ở đây sẽ là:

Giá trị -255 đến -1 trong một phân vùng

Giá trị 0 đến 255 trong một phân vùng khác

![](https://images.viblo.asia/ce784e8d-c7ef-4b7e-a997-25bf7f533146.jpg)

### Kết luận

Trong khi kiểm tra Positive đảm bảo ứng dụng hoặc phần mềm được xác thực, kiểm tra Negative  đảm bảo rằng phần mềm được phân phối không có sai sót nào có thể cản trở việc sử dụng phần mềm của khách hàng.

Việc thiết kế các kịch bản kiểm thử Negative chính xác và mạnh mẽ đòi hỏi sự sáng tạo, tầm nhìn xa, kỹ năng và trí thông minh của người kiểm thử. Hầu hết các kỹ năng này có thể có được bằng kinh nghiệm, vì vậy hãy kiên trì và tiếp tục đánh giá toàn bộ tiềm năng của bạn !

Nguồn : https://www.softwaretestinghelp.com/what-is-negative-testing/