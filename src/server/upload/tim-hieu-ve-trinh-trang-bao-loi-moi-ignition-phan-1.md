## Giới thiệu.
 
- Các kiến thức về laravel của mình bắt đầu từ bản 5.5 là bản LTS, cũng với các kiến thức từ lâu rồi. Phần đọc nội dung, thấy có bản release 6.0 mới, có đọc qua qua, nhưng chưa tìm hiểu thật kỹ càng, nhưng bẵng đi thời gian khoảng 2 tháng, chúng ta đã có bản 6.2 và sắp có bản 6.3 rồi. Trong khi kiến thức của mình vẫn là bản 5.5 từ năm ngoái đến giờ.  Mình đang băn khoăn là liệu cứ tiếp tục như vậy, có khi nào laravel bản 7.0 release, mình cùng chưa kịp dùng thử bản 6.0 xem nó có thật nhiều đổi mới như những gì người ta nói hay không.
 
- Trong dự án thực tế, thì dùng một phiên bản cố định, và lựa theo ý khách hàng, thì dường như sẽ không có ý định nâng cấp phiên bản laravel, nghĩa là chúng ta phải làm một cái gì đó để thực hiện việc dùng laravel 6.0 cho bằng bạn bằng bè chứ. 

- Hôm nay chúng ta sẽ đi tìm hiểu bài giới thiệu về **Ignition** - *trang thông báo lỗi mới* của laravel, bắt đầu được sử dụng vào laravel 6.0 trở lên. Nó là một phần mới được giới thiệu trong bản laravel 6.0, và thông thường, các bài viết thường viết lướt qua nội dung, vì có nhiều cái cần viết về nội dung mới của laravel 6.0 quá. Mà mình thì không viết vậy, nội dung của bài viết này chỉ tập trung vào **Ignition** thôi, các nội dung khác sẽ được viết ở các bài viết khác. 

- Ở các phiên bản trước, người anh mà mình mong chờ, thường có những bài viết kiểu, laravel 5.x có gì mới. hoặc các thay đổi cần lưu ý trong phiên bản 5.x. Mỗi lần có bản release mới của Laravel 5.x, ông ấy hay có bài viết về nó, dạo gần đây, thì mình không thấy ông ấy viết những thứ như vậy nữa. Kể ra cũng hơi buồn buồn.  Bỏ qua những thứ râu ria, chúng ta cùng tìm hiểu về nội dung chính của bài viết này nào.

## Nội dung
### Tổng quan
- **Ignition** được viết bởi 2 tác giả là **Freek Van der Herten và Marcel Pociot**, nó được giới thiệu ở Laracon EU 2019, và từ đó, nó được xem như là trang thông báo lỗi mặc định mới của các phiên bản Laravel 6.0

### Chi tiết 
Ở **Ignition**, đưa ra một số các tính năng mới, rất đang chú ý như sau:
- **Ignition**  không chỉ còn tập trung vào thông báo lỗi, nó phỏng đoán và đưa ra một số các solution có thể giải quyết vấn đề 


![thông báo lỗi và gợi ý cách giải quyết](https://images.viblo.asia/ba963da3-ceb3-4e59-bac2-08d358fbffda.png)

Như trong hình chụp mình họa, chúng ta có thể thấy, trang thông báo lỗi đã phát hiện ra, tham số truyền vào không đúng, có lỗi đánh máy ở đây, và chúng ta có thể sửa nó như thế nào. Nhìn vào thông báo lỗi, chúng ta hoàn toàn có thể dễ dàng tìm ra nơi bị lỗi, và sửa chữa chúng. Nhìn thông báo lỗi như này thì trang thông báo lỗi này có vẻ thơm. 
- **Ignition** còn cung cấp đường dẫn đến những tài liệu nếu có lỗi xảy ra. 

 ![cung câp đường dẫn đến tài liệu cần thiết](https://images.viblo.asia/7b4559cb-598e-496a-ba20-f469d6e134a3.png)
 
 - Ngoài ra, **Ignition** cung cấp một giao diện dễ nhìn hơn, về dễ lần vết hơn, xem khi có lỗi xảy ra, thì lỗi thực sự đang diễn ra ở đâu, chúng ta còn đang thiếu cái gì. Hãy so sánh một số trang hiển thị lỗi mặc định, để thấy rõ hơn điều này. 
Đầu tiên là trang hiển thị lỗi của PHP mặc đinh sẽ như sau: 
![php-error-default](https://images.viblo.asia/914ce6e1-d77c-4574-91f6-2de8596aba46.png)

  Với một trang hiển thị như vậy, chúng ta không có đường dẫn để lần vết lỗi, không có request, không có thông tin chi tiết của ứng dụng, như vậy là khó khăn hơn trong việc xác định điều gì đang thực sự xảy ra trong ứng dụng đang bị lỗi.

  Tiếp đến là trang hiển thị lỗi mặc định của Symfony, nó tốt hơn một chút khi có các đường dẫn để lần vết lỗi đang xảy ra ở đâu. Tuy nhiên vấn đề là nó có quá nhiều các đường dẫn khác nhau, chúng ta phải phán đoán xem đường dẫn nào là chính xác, và nơi nào mới đang thực sự gây lỗi ở đây. Nếu không có cơ sở nào để phán đoán, vậy điều dễ nhất và ngu ngốc nhất chúng ta có thể làm, là đi theo các đường dẫn lần vết lỗi từng cái một. Cũng không giúp được nhiều lắm trong quá trình phát triển. 
![symfony-error](https://images.viblo.asia/7ad88f3e-2b27-49eb-b8a8-7808e3d9ec17.png)

  Tiếp đến, chúng ta tiếp cận đến trang báo lỗi của các phiên bản Laravel 5, nó được gọi là **Whoops** thì phải. Đây là trang thân thuộc với mình nhất, tuy vậy, có một số lỗi cơ bản, mà trang báo lỗi đưa ra, nếu không có kinh nghiệm, thì rất khó phán đoán được là nó đang thực sự lỗi cái gì, trong trường hợp này là đang lỗi thiếu view, nhưng thông tin được đưa ra, thì là một cái gì đó rất ảo diệu.

![whoops-error](https://images.viblo.asia/8bb4315e-5130-4bcf-ae40-9cdcdfed3af9.png)

  Còn đây là đối tượng chính của chúng ta, **Ignition** sẽ báo lỗi thiếu view hoặc sai tên view tương tự như sau. Nhìn vào cái là có thể biết chính xác nó đang lỗi ở đâu rồi. 
![](https://images.viblo.asia/ea6ff41f-7e42-4a4d-8afb-b771ddcb3184.png)

  Tất nhiên là mình chưa có dùng thử, xem nó có hiển thị như vậy được không, nhưng chắc là có thời gian thì mình cũng sẽ cố gắng build một cái dự án tutorial về Laravel 6.x để test thử. Các hình ảnh vào thông tin trong bài viết thì các bạn có thể truy cập vào[ bài viết gốc tại đây.](https://freek.dev/1441-introducing-ignition)

- Nếu như chúng ta có một lỗi ở view, thì hình ảnh dưới đây là là cách mà trang báo lỗi **Whoops** của các phiên bản Laravel 5 hiển thị chúng. Các thông báo lỗi exception không đưa ra được chính xác nơi file bị lỗi được lưu trữ, và đường dẫn lần vết lỗi là các đường dẫn sau khi đã complied file .blade, Nó gây cản trở trong việc tìm file .blade nào đang bị lỗi, và nội dung nào trong file .blade đang bị lỗi vì nó khá là khó đọc

![whoops-view-error](https://images.viblo.asia/8c97642e-59e0-42c7-a40d-b8237ab88f67.png)

- **Ignition** lại cung cấp một giải pháp hoàn toàn khác, mà chỉ nhìn vào kết quả thôi, thì chúng ta, những người gõ phím kiếm tiền sẽ cảm thấy vô cùng dễ chịu. **Ignition** đưa ra đường dẫn trước khi complied và đó chính là đường dẫn chính xác file .blade nào chúng ta đang bị lỗi trong thư mục dự án, ngoài ra, nội dung hiển thị lỗi cũng chỉ ra chính xác dòng code trong file .blade nào gây lỗi. Tất nhiên cũng là dòng code chưa compiled. Điều này giúp chúng ta dễ dàng định hình và sửa chữa code một cách nhanh chóng hơn nhiều.
![ignition-view-error](https://images.viblo.asia/aefdf12a-ec3a-477f-9ffa-10de339b02a0.png)
  Nếu bạn click vào hình cái bút chì gần đường dẫn của file, thì file đó sẽ được mở ra bằng trình soạn thảo (cụ thể nó là editor, dịch là trình soạn thảo nghe có vẻ sao sao đó) yêu thích của bạn. Mặc định là dung phpStorm, ngoài ra bạn có thể cấu hình trình soạn thảo yêu thích ở file config ccủa *ignition*. Với hình thì dùng mặc định là ngon rồi.
- Ở góc bên phải, có đưa ra một số đường dẫn được gọi là [**Laravel Telescope**](https://laravel.com/docs/5.8/telescope). Một cái gì đó được giới thiệu ở bản 5.8 của Laravel, mà mình nếu chưa đọc bài viết này, còn không biết là có cái thứ đó. Cay. :), thôi, để tìm hiểu nó sau vậy 
- **Ignition** có chế độ **dark mode**, cái này thường là mấy ông thích màu đen, ngay cả phpStorm cũng để dark-mode. Chứ riêng mình, mình để màu trắng quen rồi. Không quan tâm lắm, nhưng mà có dark-mode nhé anh em, để bữa nào dùng xem nó bật dark-mode như nào. 
## Tóm lại
- Trong bài viết này, chúng ta đã xem qua một số giới thiệu về trang báo lỗi mởi được sử dụng ở version Laravel 6.x. Nhìn chung thì nó có vẻ khá là chi tiết và dễ nhìn. Tuy nhiên, **Ignition** không chỉ có thế, nó còn có rất nhiều thứ hay ho khác mà chúng ta phải tìm hiểu, nhưng nội dung bài viết khá dài rồi, nên mình sẽ trình bày vào bài viết sau. Dài quá thì có ai đọc đâu. 
- Như đã đề cập ở trên thì Ignition là một open-sources, và nó [có repo trên github](https://github.com/facade/ignition)