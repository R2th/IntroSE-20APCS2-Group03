https://www.softwaretestinghelp.com/what-is-negative-testing/

Chất lượng sản phẩm tối ưu nhất chính là mục tiêu chính của các tổ chức thử nghiệm.

Với sự trợ giúp của quy trình đảm bảo chất lượng hiệu quả, test teams luôn cố gắng tìm ra các lỗi tối đa trong quá trình thử nghiệm của họ để đảm bảo rằng khách hàng hoặc users sử dụng sản phẩm không thấy bất kỳ sự bất thường nào liên quan đến chức năng của sản phẩm. 

Vì vậy việc tìm ra lỗi là một trong những mục tiêu chính của testers . Muốn làm được điều này họ cần phải cẩn thận trong việc thiết kế, tạo các kịch bản kiểm thử để đảm bảo ứng dụng hoặc sản phẩm đúng theo yêu cầu. Nhưng điều quan trọng hơn là xác minh rằng phần mềm có thể xử lý được trong một tình huống bất thường. Điều này có được nhờ Mindset tốt, cũng như khả năng sáng tạo hợp lý và logic từ tester. 

Các loại  kiểm thử  thông thường : Functional test, Sanity test , Smoke test , Integration test , Regression test , Alpha and Beta test, Accessibility test...  Tuy nhiên, bất kỳ loại thử nghiệm nào bạn thực hiện thì toàn bộ nỗ lực thử nghiệm có thể được khái quát hóa thành 2 loại: Kiểm thử Tích cực và Kiểm thử Tiêu cực. 

## Kiểm thử tích cực và kiểm thử tiêu cực là gì?

### Kiểm thử tích cực

Kiểm thử  tích cực hay được gọi là case Happy test, đây là hình thức test đầu tiên mà testers sẽ thực hiện trên một ứng dụng nào đó.  Đó là quá trình chạy các kịch bản test mà người dùng cuối sẽ chạy trong quá trình sử dụng.  Do đó, Kiểm thử  tích cực  đòi hỏi phải chạy một kịch bản test chỉ với dữ liệu chính xác và hợp lệ. Nếu một kịch bản test không cần dữ liệu, thì Kiểm thử  tích cực sẽ yêu cầu chạy thử nghiệm chính xác theo cách mà nó phải chạy và do đó để đảm bảo ứng dụng đáp ứng các thông số kỹ thuật.

Có thể có nhiều hơn một cách để thực hiện một chức năng hoặc task cụ thể với mục đích giúp người dùng cuối linh hoạt hơn;  cho sự thống nhất của sản phẩm nói chung. Đây được gọi là Kiểm thử đường dẫn thay thế và cũng là một loại thuộc Kiểm thử  tích cực.  Trong Kiểm thử đường dẫn thay thế, Kiểm thử lại được thực hiện để đáp ứng các yêu cầu nhưng sử dụng tuyến đường khác với đường dẫn rõ ràng. Kịch bản thử nghiệm thậm chí sẽ sử dụng cùng loại dữ liệu để đạt được kết quả tương tự.

![](https://images.viblo.asia/e887c172-7973-41c7-9aaa-98a52f40bcbb.jpg)

### Kiểm thử tiêu cực 

Kiểm thử tiêu cực thường được gọi là kiểm tra đường dẫn lỗi hoặc kiểm tra lỗi thường được thực hiện để đảm bảo tính ổn định của ứng dụng.

Kiểm thử tiêu cực là quá trình áp dụng càng nhiều sáng tạo càng tốt và đầu vào của thử nghiệm là dữ liệu invalid . Điều này có nghĩa là mục đích của nó là kiểm tra xem các lỗi đang được hiển thị cho user khi mà họ input những giá trị invalid sẽ được xử lý như thế nào .

### Vậy tại sao Kiểm thử tiêu cực lại cần thiết ? 

Như ta đã biêt, Độ tin cậy chức năng của 1 ứng dụng hoặc phần mềm chỉ có thể được định lượng với việc thiết kế hiệu quả đối với các tình huống tiêu cực. Kiểm thử tiêu cực không chỉ nhằm mục đích đưa ra bất kỳ lỗ hổng tiềm năng nào có thể gây ra tác động nghiêm trọng đến việc sử dụng sản phẩm mà còn có thể là công cụ xác định các điều kiện mà ứng dụng có thể gặp sự cố. Cuối cùng, nó đảm bảo rằng có đủ các xác nhận lỗi trong cả phần mềm khi nó gặp bất kỳ vấn đề nào. 

Example: 

Bạn cần viết trường hợp Kiểm thử tiêu cực về một cây bút. Chức năng cơ bản của 1 cây bút là có thể viết được trên giấy.

Vậy một số ví dụ về Kiểm thử tiêu cực có thể là:

- Thay đổi môi trường mà nó sẽ viết lên như : vải , gạch và xem liệu nó có viết được không ? 
- Đặt bút vào chất lỏng và sau đó xem nó có thể thực hiện viết tiếp được không ? 
- Đổ hết mực của bút sau đó xem nó có thể thực hiện viết tiếp được không ?

### Ví dụ thực tế về Kiểm thử Tích cực và Tiêu cực : 

Hãy lấy một ví dụ về trình hướng dẫn giao diện người dùng để tạo một số chính sách. Trong trình hướng dẫn, người dùng phải nhập các giá trị văn bản trong một khung và các giá trị số trong một khung khác.

**Khung đầu tiên:**

Trong lần đầu tiên, người dùng dự kiến sẽ đặt tên cho chính sách như dưới đây:

![](https://images.viblo.asia/8d101e8d-b7d1-47d1-b8a9-e6c41eafc5aa.jpg)

Chúng ta cũng có được một số quy tắc cơ bản để đảm bảo chúng ta thiết kế các kịch bản tích cực và tiêu cực tốt.

**Yêu cầu:**

- Textbox name là trường bắt buộc
- Description là trường không bắt buộc.
- Textbox name chỉ có thể có các ký tự a-z và A-Z.  Không chứa số,  ký tự đặc biệt.
- Name max = 10 ký tự.

Bây giờ chúng ta hãy thiết kế các trường hợp Kiểm thử tích cực và Kiểm thử tiêu cực cho ví dụ này.

**- Các trường hợp Kiểm thử  tích cực : **

- ABCDEFGH (xác thực chữ hoa trong giới hạn ký tự)
- abcdefgh xác nhận trường hợp thấp hơn trong giới hạn ký tự)
- aabbccddmn (xác nhận giới hạn ký tự)
- aDBcefz (chữ hoa kết hợp với xác thực chữ thường trong giới hạn ký tự)
.... (tương tự )


**Các trường hợp Kiểm thử tiêu cực:** 

- ABCDEFGHJKIOOOOOKIsns (tên vượt quá 10 ký tự)
- abcd1234 (tên có giá trị số)
- Name : để trống 
- sndddwwww_ (tên chứa các ký tự đặc biệt)
 ... (tương tự )
  
  **Khung thứ hai:**

Trong khung thứ hai, người dùng dự kiến sẽ chỉ đưa vào các giá trị số như dưới đây:

![](https://images.viblo.asia/07a43154-a6a2-4f13-9d01-9cb56fc42726.jpg)

Yêu cầu:

- ID phải là một số trong khoảng 1- 250
- ID là bắt buộc.

**- Các trường hợp Kiểm thử  tích cực : **

- 12 (Nhập giá trị hợp lệ giữa phạm vi được chỉ định)
- 1,250 (Nhập giá trị biên của phạm vi được chỉ định)

**Các trường hợp Kiểm thử tiêu cực:** 

- Nhập Ab (Nhập văn bản thay vì số)
- Nhập 0, 252 (Nhập các giá trị biên)
- Nhập Null 
- Nhập -2 (Nhập giá trị phạm vi)
- Nhập +56 (Nhập giá trị hợp lệ có tiền tố đặc biệt)


### Các yếu tố cơ bản giúp tạo được các case Kiểm thử tích cực và tiêu cực

Nếu bạn quan sát chặt chẽ các ví dụ trên, bạn sẽ nhận thấy rằng có thể có nhiều kịch bản tích cực và tiêu cực. Tuy nhiên, Kiểm thử hiệu quả là khi bạn tối ưu hóa một danh sách vô tận các kịch bản tích cực và tiêu cực theo cách mà bạn đạt được thử nghiệm đầy đủ.

Ngoài ra, trong cả hai trường hợp này, bạn sẽ thấy một mô hình chung về cách các kịch bản được nghĩ ra. Trong cả hai trường hợp trên, có hai tham số hoặc kỹ thuật cơ bản tạo thành cơ sở để thiết kế đủ số lượng trường hợp Kiểm thử tích cực và tiêu cực . 

Hai tham số đó  là:

**- Phân tích giá trị biên**
**- Phân vùng tương đương**

**Phân tích giá trị biên:**

Như chính tên gọi của nó, ranh giới chỉ ra giới hạn cho một cái gì đó. Do đó, điều này liên quan đến việc thiết kế các kịch bản Kiểm thử chỉ tập trung vào các giá trị biên và xác nhận cách ứng dụng hoạt động. Do đó, nếu các đầu vào được cung cấp trong các giá trị biên thì nó được coi là Kiểm thử tích cực  và đầu vào vượt quá các giá trị biên được coi là một phần của Kiểm thử tiêu cực .

Example :  Nếu một ứng dụng cụ thể chấp nhận Id Vlan trong khoảng từ 0 - 255. Do đó ở đây 0, 255 sẽ tạo thành các giá trị biên. Bất kỳ đầu vào nào dưới 0 hoặc trên 255 sẽ được coi là không hợp lệ và do đó sẽ tạo thành Kiểm thử tiêu cực . 

![](https://images.viblo.asia/61d8d371-56e4-4a9b-adec-0a8dba33ed61.jpg)

**Phân vùng tương đương:**

Trong phân vùng tương đương, dữ liệu thử nghiệm được phân tách thành các phân vùng khác nhau. Các phân vùng này được gọi là các lớp dữ liệu tương đương. Giả định rằng các dữ liệu đầu vào khác nhau (dữ liệu có thể là một điều kiện) trong mỗi phân vùng hoạt động theo cùng một cách. Do đó, sẽ chỉ có một điều kiện hoặc tình huống cụ thể cần được kiểm tra từ mỗi phân vùng vì nếu một cái hoạt động thì tất cả các điều kiện khác trong phân vùng đó được coi là hoạt động. Tương tự, nếu một điều kiện trong phân vùng không hoạt động, thì không một điều kiện nào khác sẽ hoạt động.

Do đó, hiện tại, rất rõ ràng rằng các lớp dữ liệu hợp lệ (trong các phân vùng) sẽ bao gồm Kiểm thử tích cực trong khi các lớp dữ liệu không hợp lệ sẽ bao gồm Kiểm thửn tiêu cực. 

Trong cùng một ví dụ Vlan ở trên, các giá trị có thể được chia thành hai phân vùng.

Vì vậy, hai phân vùng ở đây sẽ là:

- Giá trị -255 đến -1 trong một phân vùng
- Giá trị 0 đến 255 trong phân vùng khác

![](https://images.viblo.asia/af303cd5-4489-4b9a-919c-42ad2ea56cb5.jpg)

### Tổng kết : 

Nhiều lần, tôi đã phải đối mặt với tình huống khi mà  mọi người tin rằng Kiểm thử tiêu cực  ít nhiều là sự trùng lặp của Kiểm thử tích cực hơn là tin vào thực tế rằng nó chứng minh Kiểm thử tích cực . Quan điểm của tôi về những câu hỏi này luôn luôn nhất quán với testers những người hiểu và phấn đấu cho các tiêu chuẩn và chất lượng cao chắc chắn sẽ thực thi Kiểm thử  tiêu cực như một điều bắt buộc trong quy trình chất lượng.

Mặc dù Kiểm thử  tích cực đảm bảo rằng trường hợp sử dụng kinh doanh được xác thực, Kiểm thử  tiêu cực đảm bảo rằng phần mềm được phân phối không có sai sót có thể là yếu tố ngăn cản việc sử dụng của khách hàng.

Thiết kế các kịch bản Kiểm thử  tiêu cực chính xác và mạnh mẽ đòi hỏi sự sáng tạo, tầm nhìn xa, kỹ năng và mindset tốt của testers.  Hầu hết các kỹ năng này có thể có được bằng kinh nghiệm. Vì vậy hãy cố gắng trong việc duy trì mindset tốt cho testers.