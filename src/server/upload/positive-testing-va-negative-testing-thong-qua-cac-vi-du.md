Kiểm thử phần mềm là quá trình xác minh và xác nhận ứng dụng phần mềm để xem nó có hoạt động đúng như mong đợi hay không. Mục đích là tìm ra defect và cải thiện chất lượng sản phẩm. Có hai cách để kiểm tra phần mềm, đó là Positive Testing (Kiểm tra Tích cực) và Negative Testing (Kiểm tra Tiêu cực).
# 1.  Positive Testing là gì?
**Positive testing** là thực hiện thử nghiệm trên hệ thống bằng cách cung cấp dữ liệu đầu vào hợp lệ. Nó sẽ kiểm tra xem ứng dụng có hoạt động như mong đợi với đầu vào đúng hay không. Thử nghiệm này được thực hiện để kiểm tra ứng dụng thực hiện những gì nó phải làm.

Ví dụ: 
![](https://images.viblo.asia/584acc86-4ee5-41a4-b209-dd6754c255fc.png)
Text box trong một ứng dụng chỉ chấp nhận số. Việc nhập các giá trị lên tới 99999 sẽ được hệ thống chấp nhận và mọi giá trị khác ngoài khoảng này sẽ không được chấp nhận. Để thực hiện positive testing, cần input các giá trị hợp lệ từ 0 đến 99999 và kiểm tra xem hệ thống có chấp nhận các giá trị hay không.

# 2. Negative Testing là gì?
**Negative Testing** là một biến thể của testing, nó có thể được thực hiện trên hệ thống bằng cách cung cấp dữ liệu đầu vào không hợp lệ. Nó kiểm tra xem một ứng dụng có hoạt động như mong đợi với các đầu vào không hợp lệ hay không. Điều này là để kiểm tra ứng dụng không làm bất cứ điều gì mà nó không phải làm như vậy.

Ví dụ:
![](https://images.viblo.asia/fa2622a4-a29c-4b58-8dee-e8dad3077ec7.png)
Negative testing có thể được thực hiện bằng cách nhập các ký tự từ A đến Z hoặc từ a đến z. Hệ thống phần mềm không được chấp nhận các giá trị hoặc sẽ đưa ra thông báo lỗi cho các dữ liệu đầu vào không hợp lệ này.

Trong cả hai thử nghiệm, cần lưu ý những điều sau:
* Dữ liệu đầu vào
* Thực hiện action
* Kết quả output

# 3. Các kỹ thuật test được sử dụng trong  Positive and Negative Testing:
Các kỹ thuật sau đây được sử dụng để kiểm tra xác thực positive và negative là:
* Phân tích giá trị biên
* Phân vùng tương đương
## 3.1. Phân tích giá trị biên:
Đây là một trong những kỹ thuật kiểm thử phần mềm trong đó các test case được thiết kế sẽ bao gồm các giá trị tại biên. Nếu dữ liệu đầu vào được sử dụng trong giới hạn giá trị biên, thì nó được gọi là Positive Testing. Nếu dữ liệu đầu vào được chọn bên ngoài giá trị biên, thì nó được gọi là Negative Testing.
![](https://images.viblo.asia/84e486ed-8d97-461b-bc33-338bedfcf1c0.png)
Ví dụ:

Một hệ thống chấp nhận các số từ 0 đến 10. Tất cả các số khác là giá trị không hợp lệ. Theo kỹ thuật này, các giá trị biên -1,0,1 và 9,10,11 sẽ được kiểm tra.
## 3.1. Kỹ thuật phân vùng tương đương:
Đây là một kỹ thuật kiểm thử phần mềm để phân chia dữ liệu đầu vào thành nhiều phân vùng. Giá trị từ mỗi phân vùng phải được kiểm tra ít nhất một lần. Các phân vùng có giá trị hợp lệ được sử dụng cho  Positive Testing. Trong khi các phân vùng có giá trị không hợp lệ được sử dụng cho negative testing. 
![](https://images.viblo.asia/e6f90055-c302-4af1-87a5-a16c9aada8fd.png)
Ví dụ:

Các giá trị số từ 0 đến 10 có thể được chia thành hai (hoặc ba) phân vùng. Trong trường hợp này, có hai phân vùng -10 đến -1 và 0 đến 10. Các giá trị mẫu (5 và -5) có thể được lấy từ mỗi phần để kiểm tra các kịch bản.

**Kết luận**
Testing giúp nâng cáo chất lượng ứng dụng phần mềm và đảm bảo phần mềm không có lỗi trước khi được khởi chạy. Để testing hiệu quả, hãy sử dụng cả hai phương pháp - Positive and Negative testingin nhằm mang lại sự tự tin về chất lượng của phần mềm. Người dùng thực có thể nhập bất kỳ giá trị nào và những giá trị đó cần được kiểm tra trước khi phát hành.

Link reference: https://www.guru99.com/positive-and-negative-testing.html