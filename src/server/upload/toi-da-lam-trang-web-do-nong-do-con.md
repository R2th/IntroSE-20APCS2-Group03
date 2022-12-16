Queo cơm bắc, bài viết gốc tại [blog](https://duthaho.com) của mình, các bạn nhớ ủng hộ nhé.

---

Chắc dạo gần đây người người, nhà nhà ai cũng biết nghị định 100 của CP vừa ban hành luật "ăn nhậu", đi đâu cũng nghe bàn tán sôi nổi, thế lọ, thế chai.
Hàng loạt group kín hướng dẫn cách thông chốt xuất hiện, ko thấy hướng dẫn đâu mà toàn là quảng cáo nhan nhản, cũng ko ít cửa hàng bắt đầu bán máy đo nồng độ cồn nhưng cũng chẳng biết chất lượng thế nào.
Mình cũng là một bợm nhậu (cỡ 5 lon) nên khá là hiểu tâm tư nguyện vọng của anh em, đã là một coder chân chính thì phải tự mình build cái toy để còn sài, mà độ chính xác lại cao. Với sự quyết tâm cao thì trong buổi tối đã build xong trang web **đo nồng độ cồn**, mình đã thử 3 lần và độ chính xác lên đến 96,69%.

Sau đây là các bước mình build trang web https://nongdocon.duthaho.com/, trình mình gà nên các bạn cũng đừng gạch đá nhé.

#### Bước 1:
Đầu tiên là vào google gõ `đo nồng độ cồn`, thế dell nào toàn là tin quảng cáo máy đo và vài tin vịt câu like, càng làm cho mình quyết tâm hơn trong việc build website.
Thế là mình chuyển sang tìm bằng tiếng Anh, trên thế giới, vấn đề phạt người vi phạm nồng độ cồn trong máu khá là nhiều nên chắc sẽ có tool tương tự.
Đúng như dự đoán, sau một hồi tìm với `alcohol calculations` thì cũng ra một mớ kết quả, nào là giao diện và cả một mớ công thức tính toán.

#### Bước 2:
Vì có khá là nhiều trang, nên mình bắt đầu chọn ra những trang có giao diện thấy phù hợp nhất và đầy đủ thông tin (có chọn loại bia/rượu, body, thể tích uống, thời gian...). Sau khi chọn được 1 vài website, việc tiếp theo là **hack** công thức tính toán. Nói hack cho nó oai rứa thôi chứ thực ra là mở chrome debugger lên xem tab **network** là chính :smile:. Điền đầy đủ thông tin xong bấm Submit xem có gửi request đi đâu không, website có reload lại trang không.

#### Bước 3:
Kết quả của việc **hack** là mình sẽ loại ra những website nào gọi request hoặc reload (render server side), vì nếu là API thì chắc mình sẽ gặp [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) rồi, còn render server side thì code tính toán nằm trên server, chỉ có hack vô server luôn mới lấy được code thôi :cry:. Sau khi loại bớt thì mình còn lại 2 website, việc của mình là mở sang tab **source** của chrome mà vọc code JavaScript thôi.
Mọi việc chỉ mới bắt đầu, tìm trong 1 đống source của web thứ nhất, cuối cùng cũng đến được nơi có công thức, wtf, code đã được minify hết trơn rồi, đọc thế dell nào cũng không hiểu. Thôi qua web thứ hai thử xem sao, trời đúng là không phụ lòng người, chắc web này của senior nào code rồi, code ko minify mà đọc vô có comment rõ ràng, dể hiểu vô cùng :kiss:.

#### Bước 4:
Sau khi đã có cái công thức bảo bối, tiếp theo ta cần làm là phải phát họa giao diện, tool **đo nồng độ cồn** nên chắc chỉ cần 1 cái form đơn giản nhưng những chú nào lâng lâng rồi mới vô đo, vì thế website phải bắt mắt tí chứ ko lần sau mấy ảnh ko dùng nữa.
Mình tuy là đẹp trai nhưng lại không có gu thẩm mĩ, vậy là nhờ vào [list resource](http://duthaho.com/a-bookmark-reading-list/) mà mình đã sharing lần trước, cái cái trang Codepen.io hay sharing những UI nhỏ, dùng để thực hành html/css/javascript rất tốt. Sau một vài pha click chuột cơ bản thì cũng tìm được 1 cái form ưng ý.
Bắt đầu thêm công thức vào và chỉnh sửa thêm để có được giao diện bắt mắt như vầy:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/i7b9l66x0y_image.png)

#### Bước 5:
Thực nghiệm 1 vài dữ liệu thì thấy tool chạy khá ổn, đợi ngày release thôi. Nhưng chờ đã, hiện tại ai ai cũng đã trang bị cho mình một chiếc smartphone, thời điểm này là Tết nên họ sẽ dùng tool mình trên phone là nhiều, kiểm tra lại thì thấy form này chưa được responsive. Cũng do được thực hành trên Codepen nên cũng biết đôi chút về CSS. Lại mở chrome debugger lên, dùng tab **element** và công cụ responsive để chỉnh sửa styles, đến khi thấy đẹp thì thôi :smile:.

---

#### Tổng kết
Vậy là mình đã build xong trang web **[đo nồng độ cồn](https://nongdocon.duthaho.com)**, các bạn nhớ bookmark là lấy ra sài khi cần thiết. Qua bài viết này mình cũng học được nhiều thứ:

- Đa số các tài liệu điều là tiếng Anh, một số tiếng Việt hầu hết là quảng cáo hoặc tin vịt -> Bạn nên trang bị cho mình kỹ năng ngoại ngữ.
- Kỹ năng debug với **google chrome** -> dùng tab network, source, styles... ở bài viết này mình không đi vào chi tiết, hy vọng mình sẽ có ở bài viết tiếp theo.
- Có khá nhiều free resource mà chịu khó tìm hiểu và thực hành thì kỹ năng sẽ tăng khá nhanh. Không cần phải đăng ký học khóa học hay tốn tiền thuê gia sư... Có khá nhiều developer chịu khó chia sẽ kiến thức ở mọi nơi một cách free, như mình chẳng hạn [JavaScript learning](https://learn.duthaho.com).
- UI, UX là khá quan trọng để làm nên thành công website của bạn, hãy để lại comment cho mình improve hơn nhé.