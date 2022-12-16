![](https://images.viblo.asia/431ccae7-529d-45a9-9487-94e0ff525f5c.jpg)

Tại sao lại tồn tại bài viết này trong series [Machine Learning, Deep Learning cho người bắt đầu](https://viblo.asia/s/machine-learning-deep-learning-cho-nguoi-bat-dau-vElaBkkY5kw)?

Như các bạn đã biết gần đây mình có viết một vài bài viết về Machine Learning (với những bạn chưa biết có thể xem [ở đây](https://viblo.asia/s/machine-learning-deep-learning-cho-nguoi-bat-dau-vElaBkkY5kw) nhé). Trong đó mình có nhắc đến việc phải chuẩn bị nền tảng kiến thức toán học thật tốt về đạo hàm, xác suất... Là lập trình viên chắc hẳn các bạn đã từng được thầy cô hoặc cao nhân nào đó nói rằng phải học toán thật tốt thì mới có thể trở thành "dân IT" và thực tế rằng mình cũng như nhiều bạn ở đây chẳng động gì tới toán mà vẫn mang danh "lập trình viên" (oai thế không biết, ý là nói với bọn khối kinh tế ấy :().

Nói vậy thì hóa ra làm lập trình không cần đến toán thật à cccm (không biết cái này liên hệ member otofun nhé :D).

![](https://images.viblo.asia/1c0dd2db-80aa-4336-9405-0f491ab33aea.jpg)

Đúng vậy, chúng ta không cần giỏi toán để trở thành lập trình viên. Công nghệ thông tin nó rất rộng và với đại đa số công việc mà chúng ta vẫn làm hiện nay có phần thiên về kỹ thuật nhiều hơn là tư duy, cộng thêm sự trang bị "tận răng" của các IDE, framework,... thì thường chúng ta chỉ cần giỏi tiếng Anh và chịu khó tìm tòi, ngâm cứu (đọc docs, stackoverflow, ...) là đã đủ đáp ứng rồi.

"Không cần toán chúng ta vẫn có thể giải quyết được hầu hết vấn đề, ở một số vấn đề, nếu sử dụng toán thì chúng ta có thể giải quyết chúng hiệu quả hơn, cũng có một vài lĩnh vực bắt buộc chúng ta phải dùng tới toán" ("Bác" Huy Trần bên kipalog có nói).

Lan man lâu quá, một vài ví dụ sau cần dùng tới toán mà có thể bạn đã skip khi còn mài đ*t trên ghế nhà trường.

## Ví dụ 1: Bracket Highlighter cho Editor (Sublime, Atom, Visual code...)
![](https://images.viblo.asia/c83d7fcd-58ff-401c-93f4-39f8a19c2998.png)

Giả sử bạn muốn viết một plugin cho Editor để làm nhiệm vụ highlight các dấu đóng ngoặc/mở ngoặc (brackets) trong một đoạn code.

Đơn giản chúng ta dùng cấu trúc Stack. Quét đoạn code cần xử lý từ trên xuống dưới, khi gặp một dấu mở ngoặc thì ta tống nó vào stack, tiếp tục quét. Khi gặp một dấu ngoặc đóng thì ta tìm coi dấu ngoặc mở cuối cùng vừa được đưa vào stack có cùng loại với dấu ngoặc đóng đang xét hay không, nếu có thì lôi nó ra và highlight nó lên. Nếu không phải thì báo lỗi syntax error ngay!

![](https://images.viblo.asia/449cf468-8c56-4576-aad8-c45548ca62b4.png)

Chi tiết xem [tại đây!](http://www.willamette.edu/~fruehr/241/labs/lab3.html)

Và bạn đang nghĩ Stack thì liên quan quái gì đến toán học thì đọc ngay [ở đây](https://vi.wikipedia.org/wiki/Ng%C4%83n_x%E1%BA%BFp) nhé!
## Ví dụ 2: Ứng dụng ma trận vào CSS
Đúng rồi đó, bạn không nhầm đâu. Nó chính là thứ kiến thức ma trận đầy khô khan nhàm chán lại có thể kết hợp với thứ được xem là son phấn của html - CSS.
Chỉ cần nắm vững kỹ thuật sau đây bạn hoàn toàn có thể tạo ra những hiệu ứng thần sầu cho các element trên trang web một cách bắt mắt, không những thế việc tạo ra một plugin như image slider, 3d effect, ... là hoàn toàn có thể.

![](https://images.viblo.asia/b9d57cf4-1820-4cc7-b5eb-4a8bc3d3cb0f.png)

Đầu tiên về CSS3. Thuộc tính CSS3 transform có thể thực hiện một số điều thực sự thú vị - với nó, các nhà thiết kế web có thể xoay, chia tỷ lệ, nghiêng và lật các đối tượng khá dễ dàng. Tuy nhiên, để các deisgners có thể làm hiệu ứng sao cho trông "mượt" nhất, kiểm soát mức điểm ảnh trên các biến đổi của chúng, thì việc hiểu hàm  matrix () hoạt động là thực sự cần thiết. Với hàm matrix (), các deisgners có thể định vị và định hình các phép biến đổi của chúng một cách chính xác nơi chúng muốn.

![](https://images.viblo.asia/dafe341d-60a6-4d11-b5f0-216b7791e09c.png)

Ghé chút vào đây đi, sẽ rất thú vị cho bạn: [Click now](http://www.useragentman.com/matrix/)!

Vấn đề là, không nhiều người thực sự hiểu được những con số trong bộ lọc ma trận thực sự có ý nghĩa gì. Để giải quyết vấn đề này, mình sẽ giới thiệu cho các bạn công cụ [CSS3 Matrix Construction Set](http://www.useragentman.com/matrix/) (là cái mà bạn vừa nghịch ở trên đấy) có thể lấy bất kỳ phần tử khối nào, được đặt ở bất kỳ vị trí nào trên trang, chuyển đổi nó ở bất kỳ nơi nào khác trên trang bằng bộ lọc ma trận () (google nó dịch như thế) và đưa ra mã CSS chính xác tương ứng. Nói cái này dài quá, nếu bạn chỉ cần đến thế về CSS3 Matrix thì dừng ở đây, còn không bạn muốn thực sự nắm bắt nó thì xem thêm [tại đây!](http://www.useragentman.com/blog/2011/01/07/css3-matrix-transform-for-the-mathematically-challenged/), cảnh báo trước là hơi nặng đầu đó nhé :D :D :D .

## Ví dụ 3: Sắp xếp 10 GB dữ liệu giới hạn trong 1 GB bộ nhớ (hấp dẫn)
Đây là một ví dụ điển hình của việc xử lý Big data. Và cũng là một câu hỏi bạn sẽ gặp khá thường xuyên khi đi phỏng vấn ở các công ty lớn.

![](https://images.viblo.asia/e30213a0-4119-4d70-8790-8951a85e97fa.png)

Xem chi tiết [ở đây](https://stackoverflow.com/questions/6988611/sorting-10gb-data-in-1-gb-memory-how-will-i-do-it)

## Tổng kết
Nói một câu cho nó vuông: 
> You Don’t Need Math Skills To Be A Good Developer But You Do Need Them To Be A Great One
> (Cũng chỉ copy về thôi nhé :D)
> 

Bạn không cần giỏi toán để trở thành một lập trình viên giỏi. Nhưng bạn chắc chắn cần toán nếu muốn trở thành một lập trình viên tuyệt vời! 

Nhưng thật sự không đùa đâu bạn: Để có thể cạnh tranh được với lập trình viên khắp thế giới, chúng ta cần trang bị cho mình những thứ kiến thức chuyên sâu và mới, những thứ công việc xa vời như Data Scientist, Algorithm Developer hay những thứ công nghệ như Deep Learning, Machine Learning đều có thể trở thành những con đường mà lập trình viên như mình hay các bạn nên xác định. Để làm được điều này thì chúng ta cần phải bỏ đi định kiến "công việc không yêu cầu" cố hữu mà cố gắng trang bị cho bản thân những kiến thức nền tảng thật tốt để ngâm cứu những lĩnh vực mới ngay từ bây giờ.
Thân ái!