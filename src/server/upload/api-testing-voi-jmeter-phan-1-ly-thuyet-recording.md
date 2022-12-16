**PHẦN 1** này mình xin trình bày một vài lý thuyết về Recording trong JMETER.

Trước tiên, để thực hiện **RECORD** một tính năng nào đó một cách hoàn chỉnh thì mình sẽ chia nó thành 5 step:

**Step 1:** Recording.

**Step 2:** Chosse related Request and isolate them.

**Step 3:** Correlation.

**Step 4:** Testing.

**Step 5:** Optimize.

Còn bây giờ mình sẽ đi chi tiết từng step để có thể biết được ý nghĩa và cách thực hiện từng Step nhé: 

## **STEP 1: RECORDING**

Để có các request phù hợp thì song song với việc check trực tiếp trên phần network của web thì tool Jmeter có hỗ trợ tính năng Recording. Khi chúng ta thực hiện các thao tác trực tiếp trên web thì Jmeter có support **lưu lại những request API tương ứng** đối với những action mà chúng ta đã thực hiện.

**Ví dụ nhé:** Khi thực hiện Login thì sẽ có những Request gọi lên Server, Jmeter sẽ giúp lưu lại những request này.
Minh xin đưa ra ảnh minh họa giao diện và xin lưu ý hình ảnh chỉ mang tính chất minh họa vì đằng sau nó sẽ là chè thập cẩm các bước nho nhỏ xinh xinh nữa nhé.

Đầu tiên là tiền đề để chúng ta vào việc là cần tạo một test plan. Mà hiểu đơn giản nhất về Test plan là một nơi để chứa các test case. Nó định nghĩa các test case và làm thế nào để đi đến test case đó. 

![](https://images.viblo.asia/219a5dab-2e75-4b51-8070-3650d12fe378.png)


Một testplan hoàn chỉnh bao gồm một hoặc nhiều yếu tố như thread groups, logic controllers, sample-generating controllers, listeners, timers, assertions, và configuration elements. 

Nhưng tiên quyết là testplan **phải bao gồm ít nhất 1 Thread Group**. Vậy nên dưới đây chúng ta có hình ảnh tạo 1 Thread Group nhé.

Mà Threat Group sẽ cho phép làm việc với những số liệu nào là: Có bao nhiêu truy cập này, thời gian giữa mỗi lần truy cập, hay số lần lặp lại nha...

![](https://images.viblo.asia/7935efef-5920-43ae-9966-3c89f4d56a2f.png)

**Ờ thì** đến đây là nhào vô tạo Request rồi. HTTP Request chính là nơi sẽ chứa các thành phần cấu hình thông số của API nhé.

![](https://images.viblo.asia/d49e4d8e-d0c0-4f4d-80ff-c8ac4d762e56.png)

Có một số lưu ý khi cấu hình mình có khoanh đỏ ở đây nhé. Nên trong quá trình thao tác bạn cần lưu tâm hơn để tránh phát sinh những lỗi không mong muốn nha.

![](https://images.viblo.asia/c6d42250-46de-4bc0-8ec3-2d1c359871ff.png)


Sau khi thực hiện xong phần record chúng ta tiếp tục qua **STEP 2**.

## **STEP 2: CHOOSE AND ISOLATE REQUEST**

Nói trắng ra thì đây là bước để lựa chọn những Request phù hợp với Tính năng/Action của mình, sau đó duplicate và tách nó ra khỏi phần Recording Controller để chúng ta dễ quản lý tránh việc vùi đầu vào mớ bòng bong hỗn độn không biết đâu là điểm dừng.

**Ví dụ xíu:** Vẫn là cái Login cơ bản vào một trang web, lúc này sẽ phát sinh rất nhiều Request được gọi liên quan đến nào là hình ảnh (png, jpeg...), token, username, password, lại còn cả mớ css, js... Bla..Bla...

Thì dựa vào những Request này chúng ta sẽ chọn ra những Request nào liên quan trực tiếp đến cái đang cần như Token, username, password... sau đó thực hiện Duplicate nó và Move ra ngoài phần Recording Controller (Tức là **BÉ** hơn Tesplan nhưng **TO** hơn Recording Controller đó bạn).

Cái này thì Click vào cái Test plan là có sẵn các danh mục rồi bạn nhé nên chỉ cần lựa ra để ném nó vào thôi.

![](https://images.viblo.asia/c2ba4848-6e3e-45d1-8b68-8806ff639503.png)

**ĐẤY ĐẤY**: Bạn có nhìn thấy hai anh bạn **"URL Patterns to Include"** và **"URL Patterns to Exclude"** mà chứa phần mình khoanh đỏ không. Thì anh bạn **Include** là cái mà chúng ta sẽ giữ lại, còn anh chàng **Exclude** là những request không cần thiết nên gác sang một bên. 

Hiểu theo cách của dân mù tiếng Anh như mình thì vẫn biết **IN** là trong, còn **EX** là ngoài haha **AMAZING GÚT CHÓP**.

Thế là xong việc phân loại đâu là gạo và đâu là đỗ đen của cô Tấm rồi chuẩn bị đi thay đổi phong cách trong **STEP 3** thôi nào.

## **STEP 3: CORRELATION**

Đến bước này là chúng ta cần xác định trong những Request mình đã chọn ra, Request nào có chứa **Dynamic Value**.

Dynamic Value: Là những giá trị mà sẽ thay đổi qua những lần chạy hoặc là nó sẽ bị hết hạn trong một khoảng thời gian nhất định.

**Lại một tỉ dụ:** Token sẽ có thời gian hết hạn, hoặc API_key chẳng hạn.

Vậy việc ở đây là chúng ta sẽ áp dụng công thức để lấy được những Dynamic Value này. Trong Jmeter cũng có support vấn đề này nên cứ yên tâm thôi. 
Ảnh ọt nè.

Trong giao diện của HTTPS default của chúng ta thì có phần parameter mình lại khoanh đỏ nhé (Đừng hiểu nhầm nhé mình không phải tín đồ màu đỏ đâu).

![](https://images.viblo.asia/534ea665-72d4-4da4-b168-79e38848d344.png)

TÈN TÉN TEN và **ĐÂY** chính là phần Dynamic Value. Cái này là phải tự xác định nhé vì không có công thức chung nào cho mọi dự án cả.

![](https://images.viblo.asia/e0c9e703-c380-4558-a956-c009bac09c86.png)


**KHOAN ĐÃ** Đến đây có lẽ có bạn nghĩ sao không nói huỵch ra là tính năng nào trong Jmeter hỗ trợ cho Step 3 đi nhỉ. Câu trả lời là trong phần này mình chỉ nêu những ý chính để mọi người có cái nhìn tổng quát những gì chúng ta cần làm. Còn việc đi sâu chi tiết xin phép được để ở những phần sau nhé vì **Đợi chờ là hạnh phúc mà :)**. Đấy mình đã phải bôi đậm rồi nhé.

Vậy là thay đổi trang phục xong chúng ta đi dự tiệc ở **STEP 4** thôi nhỉ. 

## **STEP 4: TESTING**

Ai da cuối cùng cũng tìm thấy chân ái đây rồi. Nhìn qua đã thấy quen thuộc rồi phải không. 

Và các thực hiện cũng Easy như chính nó vậy, bạn chỉ cần nhấn RUN và ngồi chờ Kết quả trả về thôi :>>

**A ĐÂY NHÉ** lại bảo không có hình ảnh minh họa nữa đi hehe.

![](https://images.viblo.asia/cbe9cb3d-e933-42fa-9929-8cd66bf3eb1b.png)

Bạn có thấy cái BUTTON ấy chết phải nói là cái **Hình tam giác màu xanh chuối** mình khoanh đỏ kia kìa. Cái **RUN** mà mình nói chính là click chuột vào cái hình đó đó **NGON - BỔ -RẺ** đúng không.

Rồi **TẦM NÀY THÌ CẦN GÌ LIÊM SỈ NỮA** đi xem kết quả trả về thôi. Ờ mà nó nằm ở chỗ nào ấy nhỉ **MÉM QUÊN**. Mình gửi địa chỉ bằng hình ảnh nha.

![](https://images.viblo.asia/b92834b0-7201-49f2-b043-134f20e0dfda.png)

Và chốt sổ nhé chúng ta cùng đến với **STEP 5** nào.

## **STEP 5: OPTIMIZE**

Ở đây thì cơ bản đó là việc chúng ta Tút lại vẻ đẹp Choai một xíu.

Để cho Script được gọn gàng, được đẹp hơn và rút ngắn thời gian test hơn thì đương nhiên là sau khi RUN một hồi thành công chúng ta sẽ cần phải Optimize nó lại đúng không nào.

Thường thì mình sẽ optimize những phần sau:

**- https default:** Thiết lập này cho phép bạn thay vì sẽ phải nhập tên máy chủ theo cách thủ công cho tất cả yêu cầu thì bạn chỉ cần thiết lập mặc định cho nó để loại bỏ phiền phức này.

![](https://images.viblo.asia/224837b2-9142-487e-9f86-0cef1bcce9cf.png)

**- Những giá trị lặp đi lặp lại trong suốt quá trình test:** Trường hợp cần truyền vào thông tin cố định nhưng lặp đi lặp lại thì chúng ta có bước cấu hình tự động. 

**Ví dụ**: Thông tin user và password của người dùng cần lặp đi lặp lại trong quá trình test ta có thể cấu hình trong Login Config Element.

![](https://images.viblo.asia/63ed254b-9863-49c3-9ddb-d542e6368113.jpg)

![](https://images.viblo.asia/8d0c9862-e652-4148-8305-4dd40cbb8a58.jpg)

**- Những giá trị cần thay đổi liên tục trong quá trình test:** Chúng ta có thể thiết lập các dữ liệu có data thay đổi (Ví dụ user và password của nhiều user khác nhau) cần truyền vào thông qua file csv để chỉ cần import vào thì Jmeter sẽ tự động lấy data và truyền vào thay vì chúng ta mỏi tay thực hiện bằng CƠM.

![](https://images.viblo.asia/90485bc3-dab3-4c09-b2d0-28225920321c.png)

![](https://images.viblo.asia/02aaf11d-1652-42ab-8c7a-481cd3bc3f68.png)

**- Một số trường hợp khác:** Uhm cái này thì còn tùy con mắt thẩm mỹ của mỗi người nhé ... blabla...

**Nếu ảnh có không may bị đẹp thì cho xin 1 Like nhé :)**

Vậy là kết thúc **STEP 5** và cũng là STEP cuối cùng trong bản trình bày dài thượt của mình rồi. Mình cũng đã cố gắng cô đọng và ném một vài từ ngữ chợ búa vào hi vọng làm cho phần chia sẻ này nhẹ nhàng và mọi người tiếp cận thấy thoải mái hơn. Nếu có chỗ nào hơi quá tay mong bà con thông cảm nhé.

**LỜI NHẮN:**

Hi vọng đọc tới đây các bạn có thể nắm rõ được **5 STEP** trên để đến **PHẦN 2** mình xin phép được chia sẻ thêm với các bạn về:

- Cách làm sao để thiết lập Browser để recording.

- Cách để tìm đúng Request mà mình cần.

- Cách để correlate những Dynamic Value.

- Cách để Optimize Scrip cho sịn sò hơn nhé.

Hẹn gặp lại các bạn trong **PHẦN 2** nhé.

**Nguồn tham khảo:**

https://itmscoaching.com/recording-tren-jmeter/

https://freetuts.net/cac-thanh-phan-trong-jmeter-1507.html

https://itmscoaching.com/giao-dien-jmeter-cach-config-api/

https://docgihocgi.com/huong-dan-su-dung-jmeter-doc-du-lieu-tu-file-csv/


##  **THE END**