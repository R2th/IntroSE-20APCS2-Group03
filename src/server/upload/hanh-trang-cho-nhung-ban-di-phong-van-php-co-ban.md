# Phỏng vấn PHP, thường hay gặp những câu nào ? trả lời sao cho hợp lý !
- Chào mọi người, mình hiện tại đang làm cả PHP lẫn Ruby, ngày trước mình đã phỏng vấn rất nhiều nơi về PHP và cũng gặp rất nhiều các câu hỏi khác nhau từ các công ty. và mình cố note lại dưới dây hi vọng sẽ giúp gì đó được cho các bạn newbie.
## SQL
- Thông thường thì khi nào cũng vậy, mình pv được 4 cty thì đều hỏi về SQL đầu tiên đại loại là :
    + Vẽ các bản chính ra ( Ví dụ users, order, product ).
    + Viết 3 4 câu SQL gì đó, như sau ( Lấy ra sản phẩm có nhiều người mua nhất, hoặc là lấy ra sản phẩm có nhiều comment nhất đại loại là như thế rồi dùng join, subquery để viết mỗi loaij). lúc trước mình pv intern nên người ta chỉ hỏi như vậy.
    + Và một số như phân biệt delete và truncate, primary key có thể là string được không, khác gì với foreignkey? các loại join, bla bla. như vậy là xong phần SQL
   
   ## Cơ bản về web:
   - Người ta sẽ hỏi bạn cơ chế hoạt động của WEB : 
        ** Khi người dùng vào một trang web nào đó thì nó sẽ đi như nào ? ** 
        - Theo cách khó hiểu thì : 
              +Gõ vào trình duyệt địa chỉ nào đó
              + Browers sẽ request đến máy chủ DNS, và hệ thống DNS sẽ phân tích domain và có địa chỉ là 1xx.xxx.xxx.xxx gì đó 
              + Sau khi xác thực được IP đó nó sẽ tìm đến địa chỉ IP đã nhận và vào nơi chưa nội dung website và lấy các tập tin HTML,CSS ... để trả cho trình duyệt và được dịch để chúng ta có thể thấy trên màn hình.
         - Theo cách dễ hiểu và cần trả lời PV là : Một HTTP request được gửi lển web server và từ serve trả về HTML cho trình duyệt từ đó dịch ra trang web mà ta thấy
    - Và từ đó người ta sẽ bắt đầu hỏi thêm về những cái như GET và POST:
        + Cả 2 đều được dùng để gửi dữ liệu lên server
        + GET thì gửi data lên server thông qua URL, data sẽ được hiển thị trên url vì thế bảo mật kém và bị giới hạn,
        + POST gửi data lên server dưới dạng ẩn thông qua HTTP header cho nên nó bảo mật hơn GET, và không giới hạn dữ liệu hơn quên, và POST thì chậm hơn GET
        + Tùy mục đích khi nào ta nên sử dụng nó cho hợp lí.
     - Thêm một cái nữa đó là Cookie và SESSION:
         + Nếu đã học web thì chắc các bạn cũng đã biết về nó là gì.
         + Cookie là một tệp nhỏ được lưu trữ trên náy tính của người dùng. Cookie thường được sử dụng để xác định, nhận dạng người dùng.
         + Session là một cách để lưu trữ thông tin, các thông tin này sẽ được lưu trữ trên máy chủ. Theo mặc định, các biến session sẽ bị mất đi nếu người dùng đóng trình duyệt
         + Còn về sâu vào cookie và session thì các bạn tự tìm hiểu nhé
     - Web tĩnh - web động :
         + Câu này mình nghỉ là rất dễ nhưng cũng hay gặp.
         + Nom na thì web tĩnh chỉ chứa các HTML,CSS, hay js và thường là các trang không giao tiếp hay không có các chức năng như gửi request form xử lý lên server, xác thực người dùng hay lưu trữ thông tin...
         + Còn web động là các trang web được viết bằng các ngôn ngữ kịch bản như PHP, Ruby, Python... Và các mã HTML được trùy biến cho các trang chức năng khác nhau, có thể lưu trữ, xác thực, và làm các công việc gì đó ...
         + Ngoài ra có khi người pv còn hỏi thêm về Web service là gì cái này bạn tìm hiểu nhé.
    ### Đó là cơ bản chung về web
    
    ## Còn về PHP: 
    ### Các cách khai báo php
       - <?php ?> / <?php / <% %> / <script language=”PHP”>…</script>
    ### Biến
    - Có lẻ được hỏi nhiều nhất là có bao nhiêu loại biến trong PHP đa số mọi người đều nghỉ là ui dời chi chớ dăm 3 cái ni, nhưng đối với các bạn newbie chưa dùng nhiều và khi vào pv run nên rất dễ quên tên :D của nó :
        + Cục bộ : Một biến được khai báo trong một scope là biến cục bộ. vd như được khai báo trong function();
        + Toàn cục : Trái ngược với biến cục bộ là biến toàn cục, có thể được truy cập vào bất cứ đâu trong chương trình, tuy nhiên muốn chính sửa biến toàn cục trong function ta cần khai báo GLOBAL phía trước.
        + Biến static : Tương phản với biến cục bộ, biến static sẽ không bị mất đi giá trị khi thoát khỏi hàm, và ta cần đặt từ khóa STATIC trước tên biến;
        + Hằng ( const) : Là biến sẽ có giá trị không được thay đổi suốt trường trình, và được định nghĩa trong hàm define();
        + Vậy nếu 1 hằng được khai báo 2 lần sẽ ntn? -> ctrinh sẽ lỗi với message là const đã được khi báo thôi
   ### Empty và isset?
     - Empty thì check giá trị đưa vào là rỗng hoặc mảng rỗng
     - Còn Isset thì check biến có tồn tại, có bị null không ?
   ### Các hàm xử lý mảng
     - Tìm một phần tử trong mảng -> in_array
     - Hàm array_merge() và array_combine() có gì khác nhau ?
          + array_combine(): Được sử dụng để tạo ra mảng mới bằng cách sử dụng key của 1 mảng làm keys và value của mảng khác là values.Điều quan trọng nhất kh sử dụng array_combine() là số phần tử của cả 2 mảng phải bằng nhau
          + array_merge(): Sử dụng để nối hai hay nhiều mảng lại thành một mảng. Nếu trong các mảng truyền vào có những phần tử có cùng khóa, phần tử của mảng cuối cùng được truyền vào sẽ được chọn để nối vào mảng kết quả.
     - Ngòai ra còn có thể hỏi thêm về các hàm khác như, array_pop, array_push, và các hàm sắp xếp mảng (sort(), ksort(), asort() ... cái này các bạn tự tìm hiểu nhé);
  ### Có bao nhiêu loại mảng
    Có 3 loại mảng : 
     + Mảng tuần tự: là mảng có key tự động tạo là chữ số tăng dần bắt đầu từ 0.
         
     + Mảng không tuần tự: là mảng có key mà bạn phải tự định nghĩa bằng các ký tự chữ hoặc số, và key không được sắp xếp bất kỳ thứ tự nào.
        
     + Mảng đa chiều: là mảng có chứa ít nhất một mảng khác trong nó.
     
     Các bạn hãy trả lời thêm để ghi điểm : Mảng bao gồm 2 thành phần là KEY và VALUE, key dùng để truy cập vào phần tử của mảng qua đó ta có thể gán giá trị hoặc lấy giá trị của các phần tử trong mảng.
    ### Khác nhau giữa === và ==
    Câu này khá là dễ và mình cũng gặp 2 3 lần, các bạn tự trả lời nhé
    ### Khi tắt cookie thì sẽ bị gì khoong?
    - Nếu tắt cookie thì bạn sẽ không sử dụng cả Session và cookie, cơ bản là khi hđ session sẽ tạo ra một cookie lưu trên browers của chúng ta, -> tắt thì ta sẽ không sử dụng được session, với cơ chế đăng nhập được lưu trong session thì sẽ bị văng ra ngoài :)) không tin bạn cứ thử vào facebook và khóa hết cookie xem :D
   ### MVC là gì ? Mô hình hoạt động của HTTP và MVC
   - Câu nãy cũng khá giống với câu cách hđ của web:
       + Client sẽ gửi 1 HTTP request đến server và trước khi vào controller thì nó sẽ qua 1 thứ trong đó ( Route, Loading language XML, site settings, middleware ...)
       
       + Route sẽ trỏ tới controller tương ứng và controller thực thi đên model
       
       + Model sẽ truy vấn vào CSDL để lấy data và trả cho controller
       
       + Controller sẽ nhận data và gửi đến view và nhận lại các content từ view tương ứng. lúc này controller mới gửi response về browers các file HTML, CSS, JS để được biên dịch và hiển thị lên trình duyệt
       
       + Có một số bạn hay trả lời nhanh là Controller đỗ dữ liệu ra view và hiển thị cho người dùng, ở đây nên nói rõ ra thì tốt hơn.
     ### Echo và print? 
     - Cả 2 đều là phương thức nhận output trong PHP;
     - Echo không trả về giá trị nào trng khi print trả về giá trị có thể sử dụng trong các biểu thức;
     - Không thể echo 1 mảng = [], print thì có thể
    ### Require và include ?
    - Cả 2 đều là câu lên để gọi 1 file vào trong file hiện tại
    - Nếu bị lỗi -> require sẽ tạo ra 1 lỗi và dừng chương trình/ còn include sẽ đưa ra cảnh báo và tiếp tục
    - Ngoài ra còn có include_once và require_once
     ### Hàm construct và  destruct
     - Construct là hàm khởi tạo đối tượng thuộc type của một lớp nào đó, sử dụng bằng cách trong class ta gọi hàm __construct($...)
     -  Destructor hay còn gọi là Hàm hủy trong PHP được sử dụng để gọi khi vòng đời của đối tượng sẽ kết thúc để giải phóng bộ nhớ bị chiếm giữ hoặc để thu gom rác giống nhau. __destruct()
    ### Có bao nhiêu biến môi trường ?
    – Có 4 bến môi trường là : $_GET, $_POST, $_REQUEST,$_SERVER
    ### Hướng đối tượng trong PHP
    - Cái này thì các bạn sẽ tự giải thích nhé, vì học php chắc sẽ học OOP rồi và đặc biệt giải thích rõ hơn càng tốt
    - Được thì hãy tìm hiểu Abstract và Interface khác nhau như nào, khi nào sử dụng 1 trong 2, ( câu này rất dễ hỏi và trả lời được người ta sẽ đánh giá cao hơn về OOP của bạn )
    ## Ngoài ra còn các câu hỏi năng cao như 
        - Viết giải thuật tính fibonaci đệ quy.
        - Restful API, SOAP API là gì. Sự giống và khác nhau giữa 2 loại này
        - So sánh public, protected, private
        - Htaccess là gì ? Tác dụng của nó như thế nào ?
        - Giả sử website B nhận được 1 ajax request từ website A thì website B có thực hiện request và trả response về cho website A hay không?


## Vâng đó là những câu hỏi mình nhớ và sưu tầm được, và trả lời theo cách mình hiểu, vì mình còn kém nên cách trả lời của mình không cao siêu lắm, nên các bạn thông cảm, Chúc các bạn PV thành công với những gì mình chia sẽ.