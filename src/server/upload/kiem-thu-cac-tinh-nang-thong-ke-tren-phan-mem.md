Nói tới thống kê dữ liệu, thì đa số mọi người cũng mang máng được phần nào thống kê là làm gì. Và chúng ta thường xuyên có tư duy thống kê trong mọi công việc hàng ngày. Ví dụ: Tôi thường ăn sáng lúc 6h30, hay tôi ít khi uống nước….. Đó chính xác là đang thống kê. Để thống kê, có rất nhiều phương pháp trong toán học, tin học, thống kê học. Trong bài viết này, chúng tôi muốn nói đến khía cạnh " nếu bạn là Tester, bạn sẽ thực hiện kiểm tra những tính năng có liên quan đến thống kê như nào? " 
Và dưới đây, team chúng tôi muốn đề cập đến những testcase thông dụng nhất cho tính năng thống kê thường có trong các phần mềm. Hi vọng sẽ giúp ích được cho các bạn. 
### I/ THỐNG KÊ DỮ LIỆU TRONG HỆ THỐNG
#### 1. Thống kê là gì
Thống kê là một hệ thống các phương pháp bao gồm thu thập, tổng hợp, trình bày số liệu, tính toán các đặc trưng của đối tượng nghiên cứu nhằm phục vụ cho quá trình phân tích, dự đoán và đưa ra các quyết định. 

#### 2. Ý nghĩa của thống kê
Việc thống kê dữ liệu, số liệu, giúp cho:
- Thu thập dữ liệu và thiết kế các nghiên cứu định lượng
- Tóm tắt thông tin nhằm hỗ trợ quá trình tìm hiểu về một vấn đề hoặc đối tượng nào đó
- Đưa ra những kết luận dựa trên số liệu
- Ước lượng hiện tại hoặc dự báo tương lai

#### 3. Những Testcase cần chú ý

***Phân quyền*** : Một hệ thống thống kê được xây dựng lên, nhằm thống kê, kiểm soát dữ liệu. Do đó đặc thù của chức năng thống kê luôn đi kèm với quyền hạn.
Quyền của hệ thống đang xây dựng, sẽ phụ thuộc vào yêu cầu của khách hàng, dựa vào đó sẽ chi tiết ra những quyền cần test
- Chưa login: View được các màn hình nào
- Đã login: View được các màn hình nào
- Cao cấp hơn, có thể phân thêm quyền cho Admin - full quyền, Member - chỉ xem được 1 vài màn hình

Ví dụ đơn giản như: File Google Sheet mình hay dùng:
 - Not Share: Không ai có quyền view/sửa
 - Share - Only view: Mọi người có link đều có thể xem, nhưng ko thể sửa xóa
 - Share - Edit: Ai có quyền Edit, sẽ được sửa nội dung, xóa nội dung trên file….
 - 
***Về chức năng cụ thể***: Với mỗi bài toán thống kê, có nhiều yêu cầu khác nhau. nhưng về cơ bản, đều cần quan tâm tới các yếu tố
- Dữ liệu cơ sở để tính toán
- Các công thức của chức năng
Các case cơ bản check GUI 
- Tất cả các trường trên một trang (ví dụ: Label, textbox, radio, dropdownlist) phải được căn chỉnh đúng cách. 
- Giá trị số được hiển thị chính xác định dạng
- Khoảng cách các item, textbox, message….. hợp lý
- Scrollbar ẩn hiện khi cần thiết
- FontSize, FontType, Coloer của Label, Textbox, …. được thể hiện giống mô tả
-  Các trường inactive sẽ không forcus vào được, và có mầu xám
- DropdownList sẽ không nhập vào được, chỉ cho chọn (hoặc có yêu cầu khác)
- Sau khi thông báo lỗi, sẽ vẫn giữ được giá trị đã nhập vào trên màn hình
- Thông báo lỗi sẽ cso dạng:  label, hoặc tooltip
- DropdownList: Giá trị sẽ được hiển thị theo thứ tự sắp xếp quy định, và hiển thị đầy đủ
- Nhấn Tab, và Shift Tab hoạt động bình thường 
- Radio button: Sẽ có giá trị mặc định, và chỉ chọn được 1 radio duy nhất
- Validate chỉ báo lỗi với các trường bị lỗi, không báo lỗi cho các trường đúng
- Luôn hiển thị thông báo xác nhận (Thêm mới, cập nhật, xóa)
- Hiển thị trạng thái “Đang xử lý” khi ứng dụng chưa hoàn thành sự kiện 
Các case cần check khi Lọc dữ liệu
- Đảm bảo có thể lọc kết quả bằng cách sử dụng tất cả các thông số trên trang. 
- Thay đổi giá trị tìm kiếm, sẽ tải lại trang với giá trị tìm kiếm mới đó. 
- Với tiêu chí bắt buộc, nếu không chọn sẽ có thông báo lỗi thích hợp hiển thị khi người dùng gửi yêu cầu  mà không chọn bất kỳ tiêu chí lọc nào
- Với tiêu chí không bắt buộc, người dùng không lựa chọn, đảm bảo gửi được yêu cầu lọc.
- Đảm bảo luôn có các thông báo xác nhận hợp lệ hiển thị khi nhập vào tiêu chí lọc các giá trị không hợp lệ.
Các case check biểu đồ
- Khi khởi tạo, biều đồ chỉ gồm 2 trục x,y  (tùy vào yêu cầu bài toán)
- Khi có kết quả tìm kiếm, kiểm tra biểu đồ đã hiển thị được thông số chưa (dạng line hoặc cột….)
- Giá trị trên từng điểm của biểu đồ đã chính xác so với điều kiện tìm kiếm
- Tìm kiếm không có giá trị: Biểu đồ sẽ như khi khởi tạo, thông số có kết quả =0
- Tìm kiếm có 1 kết quả: hiển thị chính xác 1 kết quả tương ứng vẽ trên biểu đồ
- Tìm kiếm có nhiều kêt quả: Hiển thị chính xác số lượng kết quả trên biểu đồ
- Với yêu cầu: Biểu thị nhiều đối tượng thể hiện trên một biểu đồ: Kiểm tra mầu sắc, kích thước,  cách thức biểu diễn (Cột, đường, điểm, biều đồ góc….) cho từng đối tượng biểu đồ; Kiểm  tra color, size, font của text  biểu diễn cho từng điểm trên biểu đồ (nếu có)
- Trường hợp biểu đồ biểu diễn bằng Đường: Nếu nhiều đối tượng cùng biểu hiện bằng đường, tại 1 điểm, các đối tượng có giá trị bằng nhau, sẽ ưu tiên hiển thị mầu của đường nào? Text biểu diễn giá trị của các đối tượng có hiển thị đủ không? (Text có thể biểu diễn bằng các hình thức: luôn hiển thị hoặc trỏ vào điểm sẽ hiển thị)
- Kiểm tra mầu sắc của  từng loại dữ liệu trên biểu đồ
- Kiểm tra cập nhật biểu đồ theo data: Khi có dữ liệu thêm dữ liệu vào (thêm trên hệ thống, hoặc Import từ file, Update dữ liệu, Delete dữ liệu…..)
- Với ngày tháng: Kiểm tra dữ liệu với các ngày đặc biệt. Ví dụ với ngày nối tháng, ngày lễ  tết (hệ thống chứng khoán), ngày chuyển giao các năm tài chính (với hệ thống tài chính), ngày cuối năm, đầu năm….
- Kiểm tra việc hiển thị kết quả real time (nếu có yêu cầu): nghĩa là không cần load lại màn hình, nhưng vẫn nhảy thông số nếu có sự biến động (dùng trong các hệ thống  như Chứng khoán)
-  Với yêu cầu đặc biệt: Với từng quyền của User, biểu đồ sẽ hiển thị như thế nào

Các case check cho bảng kết quả
- Hiển thị trạng thái “Đang xử lý” khi cần nhiều thời gian hơn để tải trang kết quả. 
- Kiểm tra xem tất cả các tham số tìm kiếm có được sử dụng để tìm kiếm dữ liệu được hiển thị trên bảng kết quả không. 
- Tổng số kết quả sẽ được hiển thị trong bảng kết quả. 
- Tiêu chí tìm kiếm được sử dụng để tìm kiếm sẽ được hiển thị trong bảngkết quả. 
- Giá trị bảng kết quả sẽ được sắp xếp theo cột mặc định. 
- Hiển thị biểu tượng sắp xếp với các cột được sắp xếp.
- Bảng kết quả nên bao gồm tất cả các cột được chỉ định với các giá trị chính xác. 
- Chức năng sắp xếp tăng dần và giảm dần sẽ hoạt động đối với các cột được hỗ trợ sắp xếp dữ liệu. 
- Bảng kết quả sẽ được hiển thị với khoảng cách cột và hàng thích hợp.
- Phân trang phải được bật khi có nhiều kết quả hơn số kết quả mặc định trên mỗi trang. 
- Kiểm tra chức năng phân trang tiếp theo, trước, đầu tiên và trang cuối cùng. 
- Các bản ghi trùng lặp không được hiển thị trong bảng kết quả. 
- Kiểm tra xem tất cả các cột có thể nhìn thấy và thanh cuộn ngang được kích hoạt nếu cần thiết. 
- Kiểm tra dữ liệu cho cột động (cột có giá trị được tính động dựa trên giá trị các cột khác). 
- Đối với bảng kết quả hiển thị các báo cáo, hãy kiểm tra hàng 'Tổng cộng' và xác minh tổng số cho mỗi cột. 
- Đối với bảng kết quả hiển thị các báo cáo, hãy kiểm tra dữ liệu hàng 'Tổng cộng' khi phân trang được bật và người dùng chuyển đến trang tiếp theo.
- Kiểm tra xem các ký hiệu thích hợp có được sử dụng để hiển thị các giá trị cột hay không, ví dụ:% ký hiệu sẽ được hiển thị để tính tỷ lệ phần trăm. 
- Kiểm tra dữ liệu bảng kết quả để biết phạm vi ngày có được bật hay không.

Các case check cơ sở dữ liệu
- Kiểm tra xem dữ liệu đã hiển thị có chính xác trong CSDL không: sử dụng các câu truy vấn SQL...
- Sử dụng các câu truy vấn, kiểm tra xem với điều kiện tìm kiếm đã nhập vào, kết quả trả ra trên màn hình có chính xác không
- Kiểm tra xem, dữ liệu đã được dánh dấu xóa có hiển thị trên màn hình kết quả không
- Kiểm tra xem dữ liệu trên màn hình đã sắp xếp đúng như trên csdl hay không
- Tính toán giá trị các cột động xem chính xác không


VÍ DỤ:
Thống kê: Số lượng user truy cập vào trang web của Viblo https://viblo.asia/ với các tiêu chí:
- Thống kê số lượng user vào lần đầu tiên trong ngày / tháng, tỉ lệ %
- Thống kê số lượng user đăng nhập vào trang trong ngày /tháng, tỉ lệ %

### II/ Chức năng Import  và Export Data
#### 1. Export 
Đối với function Export của chức năng thống kê dữ liệu thì chủ yếu là xuất ra file XML hoặc CSV, bởi các định dạng file này hỗ trợ format hàng cột phổ thông của kiểu các loại dữ liệu được thống kê. 

Phần mềm có phản ứng khi khởi động chức năng Export
- Button Export có thể được click
- Button Export sẽ bị disable khi tác vụ Export chưa hoàn thành

Phần mềm có hoàn thành chức năng Export
- File được export thành công, có thể download hoặc tự động save trên thiết bị
- Không xảy ra lỗi timeout hoặc treo ứng dụng khi export
  
Một  số Tcs lưu ý đối với file
- Đảm bảo file được export đúng extension
- Extension của file được xuất ra phải giống với loại file đã chọn trước ở phần mềm hoặc đúng với loại file tiêu chuẩn được quy định trong specs 
- File có thể được mở và đọc bình thường bởi các phần mềm tiêu chuẩn đối với loại file đó

Đảm bảo file được export đúng tên yêu cầu
- Tên của file được xuất ra phải có tên giống với setting của người dùng 
- Tên của file được xuất ra phải có format giống với specs của phần mềm
- Nếu có timestamp thì phải đảm bảo thể hiện đúng mốc thời gian khi export file

Trường hợp export tất cả các trường dữ liệu
- Đảm bảo tất cả các cột đều được output ra file
- Tên của các cột đều chính xác như thể hiện trong phần mềm
- Format của hàng/cột được xuất ra đúng với mô tả trong specs
- File có thể được import trực tiếp vào phần mềm khác hoặc chính phần mềm đó (nếu cần thiết)
- Các trường không có sẵn trong DB mà chỉ tính toán khi xuất ra file thì phải được tính toán chính xác

Trường hợp export chỉ một số trường dữ liệu
- Đảm bảo chỉ có các trường dữ liệu được chọn trước mới được xuất ra
- Tên của các cột đều chính xác như thể hiện trong phần mềm
- Format của hàng/cột được xuất ra đúng với mô tả trong specs
- File có thể được import trực tiếp vào phần mềm khác hoặc chính phần mềm đó (nếu cần thiết)
- Các trường không có sẵn trong DB mà chỉ tính toán khi xuất ra file thì phải được tính toán chính xác

Trường hợp export tất cả data
- Đảm bảo tất cả các record trong DB đều được output ra file
- Nội dung của mỗi record đều chính xác với DB
- Nội dung của các record được phân chia chính xác vào các cột như thể hiện trên phần mềm

Trường hợp chỉ export một số data đã được filter
- Đảm bảo các record phù hợp với filter đều được output ra file
- Nội dung của mỗi record đều chính xác với DB
- Nội dung của các record được phân chia chính xác vào các cột như thể hiện trên phần mềm
- Trường hợp có các hàm thống kê như Sum, Group by,... thì phải check ko có record trùng lặp tùy theo nội dung quy định của hàm

Đảm bảo cách sắp xếp data
- Thứ tự sắp xếp các record phải giống với cách sắp xếp mặc định thể hiện trên phần mềm
- Thứ tự sắp xếp các trường dữ liệu phải giống với cách sắp xếp mặc định thể hiện trên phần mềm
- Đối với các trường dữ liệu không có trong thể hiện phần mềm thì cần phải đảm bảo phù hợp với specs cho trước

Đảm bảo dữ liệu được xuất ra đúng format
- Format của mỗi cell đều chính xác với kiểu dữ liệu trong DB (integer, string, float, datetime,...) 
- Tên của các cột đều chính xác như thể hiện trong phần mềm
- Format của hàng/cột được xuất ra đúng với mô tả trong specs
- File có thể được import trực tiếp vào phần mềm khác hoặc chính phần mềm đó (nếu cần thiết)

#### 2. Function import dữ liệu 
Ngày nay, với sự phát triển của công nghê, nhiều công ty, tổ chức đã ứng dụng các sản phẩm phần mềm vào nhiều lĩnh vực, quy trình hoạt động của tổ chức mình. Đa số các function chủ yếu của các phần mềm là nhập dữ liệu, xử lí dữ liệu và đưa ra các báo cáo. Trong giới hạn bài viết này, chúng ta tập trung tìm hiểu về function import dữ liệu. Việc import dữ liệu có 2 cách:
- Import bằng từng dữ liệu: chức năng nhập thông tin từng loại sản phẩm, từng sản phẩm, từng thông tin khách hàng. Việc import này thực hiện qua các chức năng khác nhau: Quản lý loại sản phẩm, quản lý sản phẩm, quản lý thông tin khách hàng,…
- Import hàng loại bảng ghi một lúc bằng function import dữ liệu của phần mềm từ file csv hoặc excel. Đây là cách chúng ta sẽ thực hiện trong khuôn khổ bài viết này. 
- 
***Đối với phần mềm:***
- Phần mềm phản ứng được với chức năng import
- Button import có thể được click
- Button import sẽ bị disable khi tác vụ import chưa hoàn thành
- Phần mềm hoàn thành được chức năng import
- File được import thành công có thể import được từ các nguồn dữ liệu phù hợp.
- Không xảy ra lỗi timeout hay treo dữ liệu khi import

***Đối với file***
- Đảm bảo là file đúng yêu cầu về cấu trúc có thể import thành công
- File CSV: Có bao nhiêu cột dữ liệu, số dòng tối thiểu của file, số dòng tối đa của file,….
- File Excel: các trường bắt buộc và không bắt buộc, kiểu dữ liệu mỗi trường, định dạng dữ liệu từng trường…
- Đảm bảo thống nhất giữa file được import và cấu trúc bảng trong Database.
- Khi thực hiện insert dữ liệu vào Database: Các bảng, trường dữ liệu trong file phù hợp với các bảng, trường dữ liệu trong SQL thì import được thành công
Thông báo lỗi nếu bảng, trường dữ liệu không phù hợp với setting của các bảng , trường dữ liệu trong SQL ( trường bắt buộc phải có dữ liệu nhưng trong file để import không có, kiểu dữ liệu không đúng, số lượng dữ liệu lớn hơn cho phép,…
### III/ Thống kê bằng các sử dụng Google Analytics 

#### 1. Google Analytics là gì 
- Google analytics là một công cụ phân tích website hết sức tin cậy và được cung cấp bởi google.Công cụ này rất hiệu quả cho những người làm SEO khi muốn thống kê những thông tin về Website của mình.Ví dụ như: lượt người truy cập, lượt người dùng app, tỉ lệ người xem quảng cáo, tỉ lệ click quảng cáo, vv
- Đây là 1 dịch vụ miễn phí và chạy rất ổn định nên được rất nhiều người sử dụng

#### 2. Cách test thống kê GA 

***Tiền điều kiện: Chuẩn bị tài khoản test ***

- Cách tạo tài khoản GA trong trường hợp không có account KH https://drive.google.com/file/d/1qxqqOWJxU8IgxP1WLjHw7eClfXEV2P7X/view

- Trong TH khách hàng cung cấp account test: đăng nhập vào GA page theo đường dẫn : https://analytics.google.com/

***Các bước thực hiện test*** 
- Bước 1 .Trước khi test, comfirm trước với dev xem giá trị ID sử dụng để theo doĩ ứng dụng của mình trên GA là gì  Ví dụ : 
ứng dụng 1- trang web, sử dụng id làUA-128284788-1
ứng dụng 2 - thiết bị di động sử dụng id là UA-128284788-2
- Bước 2.Đăng nhập tài khoản GA , dựa vào id đã xác định ở bước 1 từ đó chọn tài khoản  ứng dụng như sau:                  https://drive.google.com/file/d/1N6vy968UM8CZk_fMu4gvYSEdkFujow_J/view
- Bước 3.Test GA với 3 bước nhỏ sau:
        - Check xem tracking/event GA có được gửi request đi không
        - Check xem trên Charles có bắt được tracking/event đã gửi đi ở bước 1 không?
        - Check trên trang Google analytics xem tracking/event đó có được hiển thị không ?
- Bước 4: Kiểm tra thông tin: Check xem tracking/event GA có được gửi request đi không.  Ở bước này , đối với bản PC sẽ inspect trên trình duyệt , search với từ khóa là : collect, để xem tracking/event GA đó đã được gửi đi hay chưa: 
https://drive.google.com/file/d/1JSfRPowVYhhUohEe7BBZJj_U3W9WpR0W/view
       - Bản Android(app) sẽ kết nối remote devices và inspect giống như PC
       - Bản iOS sẽ kết nối device và dùng trình duyệt Safari để kể nối , sau đó làm tương tự như PC
       -  Kiểm tra xem trên charles đã nhận được gói tin tracking/event GA chưa
Cách cài đặt và kết nối charles đối với device: https://viblo.asia/p/gioi-thieu-cong-cu-charles-7rVRq7V9G4bP. Sau khi kết nối, sử dụng app và check xem có nhận được gói tin hay chưa .
Kiểm tra xem tracking/event GA có được hiển trị trên trang google analytics hay không , chỉ quan tâm 2 mục như dưới đây
![](https://images.viblo.asia/4e6177dd-4973-4687-9e61-21d696c4163a.png)
![](https://images.viblo.asia/5f8b5d30-d161-429e-b9ba-649ec57d5b34.png)