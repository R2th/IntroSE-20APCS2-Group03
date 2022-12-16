# I. Giới thiệu.

Ngôn ngữ thống kê R đang phổ biến, đặc biệt cho việc phân tích dữ liệu. Trong bài hướng dẫn này mình sẽ giới thiệu cơ bản về ngôn ngữ mới lạ này.

Ngôn ngữ R đang “hot”. Hơn 4.400 gói add-on, thêm vào đó 18.000 thành viên của một nhóm ngôn ngữ R trên Linkedln, gần 80 nhóm Meetup R đang hiện hữu, có một vấn đề là việc quan tâm đến ngôn ngữ thống kê R đang dần phổ biến hơn, đặc biệt trong việc phân tích dữ liệu.

# II. Tại sao lại lựa chọn ngôn ngữ R?

R là một ngôn ngữ miễn phí, mã nguồn mở, mạnh, và có thể mở rộng. Chuyên gia kinh tế  trưởng của Google đã nói trên tờ báo New York Times năm 2009 “Bạn có nhiều công cụ đã được đóng gói sẵn có, vì thế bạn đang đứng trên vai của người khổng lồ.

Vì đây là một môi trường lập trình dùng chuỗi command-line, bạn có thể lưu lại một chuỗi các bước phân tích dữ liệu phức tạp bằng ngôn ngữ R. Giúp bạn dễ dàng hơn trong việc sử dụng lại công việc phân tích của bạn với cùng dữ liệu, nếu bạn đã dùng một giao diện point-and-click, Hadley Wickham,  tác giả của những gói ngôn ngữ R phổ biến và là nhà khoa học chính của Rstudio.

Điều này cũng tạo sự dễ dàng hơn cho mọi người xác nhận kết quả nghiên cứu và kiểm tra lỗi các công việc của bạn, một vấn đề nảy sinh theo tin tức nhận được gần đây, sau khi có một lỗi code trong Excel là một trong nhiều lỗ hổng được tìm thấy trong một báo cáo phân tích kinh tế theo Reinhart/Rogoff cho hay.

Các lỗi chính của nó không phải là một sự bất ngờ, Christopher Gandrud, người đã nhận được bằng tiến sĩ về Phương pháp nghiên cứu định lượng của trường Kinh tế Luân Đôn. Ông nhấn mạnh “Chúng ta sẽ luôn nổ lực tốt nhất” để tìm lỗi. Vấn đề là chúng ta thường dùng những công cụ và sự thực hành, rất khó để có thể tìm thấy và sửa chúng.

Ông giải thích, chắc chắn là bạn có thể dễ dàng kiểm tra những công thức phức tạp trên một bảng tính. Gần như không dễ dàng để chạy nhiều bộ dữ liệu thông qua một bảng tính công thức để kiểm tra như việc đặt nhiều bộ dữ liệu  thông qua một script.

Câu thần chú ở đây là : “Hãy chắc chắn rằng công việc của bạn có thể tái sản xuất” là câu nói phổ biến của những người đam mê ngôn ngữ R.

![](https://images.viblo.asia/f24b5995-b5fb-4067-824a-c196f8233236.png)

# III. Tại sao không phải là ngôn ngữ R?

Những khó khăn đầu tiên. Cú pháp ngôn ngữ R thì khác so với nhiều ngôn ngữ khác.

“Tôi có thể viết một phần mềm chuyên nghiệp bằng nhiều chương trình, trong đó ngôn ngữ R là ngôn ngữ khó học nhất.” Cố vấn John D.Cook chia sẻ trên một trang web về ngôn ngữ lập trình R cho những ai đang học ngôn ngữ khác chuyển qua học ngôn ngữ R. “Ngôn ngữ này thật sự khá đơn giản nhưng thật sự không tiện lợi.”

# IV. Bắt đầu với R

Đây là bài hướng dẫn không dành cho những người đã thành thạo ngôn ngữ R, chúng tôi chỉ hướng dẫn cho bạn cách để bắt đầu dùng ngôn ngữ R làm việc với dữ liệu cơ bản: giải nén các thống kê của một tập dữ liệu, khám phá một tập dữ liệu với những biểu đồ cơ bản, và định hình lại dữ liệu để dễ dàng hơn trong việc phân tích các dữ liệu.

## 1. Bước đầu tiên

Để bắt đầu sử dụng ngôn ngữ R, truy cập r-project.org để dowload và cài đặt cho desktop hay laptop của bạn. Nó chạy trên môi trường Windows, OS X, và một loạt những nền tảng của Unix, nhưng không thể chạy trên Android hay iOS.

Cài đặt ngôn ngữ R là điều đầu tiên bạn phải làm. Tuy nhiên,  Tôi đề nghị cài đặt ngôn ngữ R IDE RStudio miễn phí. R có những tính năng hữu ích mà bạn sẽ mong đợi từ một nền tảng mã hóa; chẳng hạn như cú pháp highlight và tab được dùng trong mã hóa auto-completion. Tôi thích không gian làm việc với 4 cửa sổ, quản lý tốt hơn nhiều cửa sổ R để gõ lệnh, lưu trữ sript hiển thị lịch sử các dòng lệnh , hiển thị trực quan và còn nhiều ưu điểm khác.

## 2. TITLE

Mặc dù bạn không cần có RStudio IDE để bắt đầu, tuy nhiên nó cũng giúp cho việc làm việc với R dễ dàng hơn.

Cửa sổ góc trên bên trái là nơi làm việc chính của bạn. Đó là trình biên dịch ngôn ngữ R cho phép bạn tạo một file với nhiều dòng lệnh của ngôn ngữ R, hay mở một tâp tin đang tồn tại, sau đó chạy toàn bộ một tập tin hay những thành phần của tập tin.

Cửa sổ dưới bên trái là giao diện điều khiển tương tác, nơi bạn có thể nhập các câu lệnh của R một dòng tại một thời điểm. Bất kì những dòng code nào chạy trên cửa sổ biên dịch cũng sẽ xuất hiện trên giao diện điều khiển (console).

Cửa sổ góc trên bên phải hiển thị không gian làm việc, gồm một danh sách các object hiện tại trong bộ nhớ. Cũng có một tab hiển thị lịch sử với một danh sách các lệnh trước của bạn: bạn có thể chọn một hoặc một số hay tất cả các dòng code, bằng một click để gởi chúng đến ,hoặc giao diện điều khiển (console) hoặc là bất cứ tập tin nào

đang hoạt động trên trình biên dịch của bạn.

Cửa sổ góc dưới bên phải hiển thị một biểu đồ, nếu bạn tạo một sự trực quan dữ liệu mã hóa bằng ngôn ngữ R. Hiển thị lịch sử của các biểu đồ trước và một sự lựa chọn để xuất ra một biểu đồ dưới dạng một file hình hoặc định dạng PDF.  Đây cũng là một cửa sổ hiển thị những gói mở rộng(những phần mở rộng của R) có sẵn trong hệ thống của bạn, những tập tin trong thư mục làm việc của bạn và hiển thị các tập tin được gọi từ giao diện điều khiển.

## 3. Các phím tắt:

Wickham là một nhà khoa học chủ chốt của RStudio cho rằng có nhiều phím tắt quan trọng nhất trong RStudio sau:

Phím Tab: là một chức năng tự động hoàn tất. Nếu bạn bắt đầu nhập dữ liệu trong giao diện điều khiển (console) hay trình biên dịch thì hãy nhấn phím Tab, RStudio đơn giản nếu bạn chọn một chức năng hoặc một tập tin mà bạn muốn,rồi nhấn giữ hoặc phím Tab hoặc Enter để chấp nhận chúng RStudio sẽ tự động làm việc.

Ctrl+ Mũi tên lên (Cmd+ Mũi tên lên trên MAC) cũng là một dụng cụ tự động hoàn thành tương tự. Bắt đầu nhập dữ liệu và giữ tổ hợp phím này, sẽ hiển thị một danh sách mỗi dòng lệnh mà đã nhập với tổ hợp phím này. Chọn và nhấn Return. Cách làm này chỉ có hiệu lực với giao diện điều khiển tương tác và không có tác dụng trong cửa sổ trình biên dịch.

Ctrl+ Enter (Cmd+ Enter trên MAC) hiển thị dòng code hiện tại trong trình biên dịch, và gởi chúng đến trình điều khiển. Nếu bạn chọn nhiều dòng code trong trình biên dịch và sau đó nhấn Ctrl/Cmd+ Enter, những dòng lệnh đó sẽ chạy.

Vẫn còn nhiều chức năng trong RStudio bao gồm một danh sách đầy đủ các phím trên tài liệu trực tuyến: http://www.rstudio.com/ide/docs/

## 4. Cài đặt thư mục làm việc:

Thay đổi thư mục đang làm việc với chức năng : setwd(), chẳng hạn:

```php
setwd(“~/mydirectory”)
```

Chú ý: những dấu gạch chéo luôn luôn phải được đặt phía trước, ngay cả khi bạn đang trên một hệ thống Windows. Trong Windows, dòng lệnh như sau:

```php
setwd(“C:/Sharon/Documents/RProjects”)
```

Nếu bạn sử dụng RStudio cũng có thể thay đổi thư mục làm việc bằng cách: Session > Set Working Directory.

## 5. Cài đặt và sử dụng:

Bạn có cơ hội được làm việc một cách dễ dàng bất cứ điều gì bằng ngôn ngữ R, nếu bạn biết tận dụng những lợi thế sẵn có trong ngôn ngữ R với hàng ngàn gói add-on ở CRAN (Comprehensive R Archive Network). Cú pháp lệnh để cài đặt gói là :

```php
install.packages(“thepackagename”)
```

Nếu bạn không muốn gõ lệnh , trong RStudio có một tab Packages trong cửa sổ dưới bên phải, click vào sẽ xuất hiện button “Install Packages.”( Cũng có danh sách những dòng lệnh, nhiều vị trí đa dạng phụ thuộc vào hệ điều hành của bạn).

Để nhìn thấy các packages đã cài đặt vào hệ thống, bạn gõ:

```php
 installed.packages()
```

Hay trong RStudio, tab ‘Packages’ trong cửa sổ bên dưới.

Sử dụng một packages đã được cài đặt:

```php
library(“thepackagename”).
```

Nếu muốn hiển thị ngày cài đặt của những package, bạn chạy câu lệnh:

```php
update.packages()
```

Bằng cách này , bạn có thể biết được phiên bản làm việc với nhất mà các package đã được cài đặt.

Nếu muốn xóa một package trong hệ thống, sử dụng chức năng:

```php
remove.packages(“thepackagename”)
```

## 6. Help!

Nếu muốn tìm ra nhiều hơn một chức năng, bạn có thể gõ dấu hỏi kèm theo tên chức năng, có hoặc không trong dấu ngoặc đơn trong ngôn ngữ R:

```php
?functionName
```

Đây là phím tắt của chức năng help có sử dụng dấu ngoặc:

```php
help(functionName)
```

Tuy nhiên, tôi không chắc tại sao bạn lại muốn dùng nó với lệnh ?functionName ngắn hơn.

Nếu bạn biết những gì mà một chức năng dùng để làm gì hay chỉ muốn những định dạng để dùng nó đúng, bạn có thể gõ:

```php
example(functionName)
```

Bạn cũng có thể lấy một danh sách các ví dụ  của chức năng được dùng. Với chức năng của đối số (arg) sẽ hiển thị một danh sách chức năng của các đối số:

```php
args(functionName)
```

Nếu bạn muốn tìm kiếm một thuật ngữ trong tài liệu giúp đỡ của ngôn ngữ R, có thể dùng:

```php
help.search(“your search term”)
```

Phím tắt : ??(“my search term”)

Không cần dấu ngoặc  nếu thuật ngữ tìm kiếm là từ đơn không có dấu cách.

# V. Tổng kết.

Như vậy mình đã giới thiệu qua những thao tác cơ bản của R

Là một người mới tìm hiểu về R nên mình cũng hướng dẫn một chút hiểu biết của mình về ngôn ngữ mới lạ này một cách cơ bản rất mong sẽ có ích gì với mọi người.

link tham khảo: https://devmaster.edu.vn/r-la-gi-nhung-ly-do-ban-nen-bat-dau-hoc-ngon-ngu-lap-trinh-r.html