Đây là bài dịch, link bài gốc ở [đây](https://medium.com/refactoring-ui/7-practical-tips-for-cheating-at-design-40c736799886) nhé.

-----

####
Chắc hẳn bất cứ ai từng lập trình web thì đều thường xuyên gặp phải những tình huống cần đưa ra quyết định liên quan đến thiết kế giao diện, cho dù có muốn hay không.
####
Có thể là vì công ty bạn đang làm không có 1 full-time designer hay là vào một ngày đẹp trời thì ông designer quyết định nghỉ phép và bạn thì đang bị khách hàng "thúc đít". Hoặc cũng có thể là bạn đang làm một project cá nhân nào đó và muốn làm cho nó có gì đó "chất chất" hơn là một trang dùng bootstrap đơn điệu.
####
Rất dễ để nói rằng, "Tôi sẽ chẳng bao giờ làm nó đẹp lên được, tôi có phải nghệ sĩ hay nhà thiết kế gì gì quái đâu chứ!", nhưng thực tế là có hàng đống những tip&trick về design mà bạn có thể tham khảo và áp dụng để "nâng tầm" cho trang web của mình, mà không cần phải là một người "có số má" về hội họa hay thiết kế gì cả.
####
Có rất nhiều mẹo mà bạn có thể sử dụng được, đến mức bạn chuyển từ việc không biết phải làm gì, đến một cơn đau đầu khác là không biết chọn cái nào cho hợp (facepalm). Vì thế, ở đây tôi sẽ đưa ra 1 nhóm 7 mẹo nhỏ mà bạn có thể áp dụng cùng nhau để cải thiện giao diện cho trang web của bạn nhé.

### 1. Sử dụng màu sắc và đậm nhạt thay vì kích thước để tạo ra sự phân cấp

![](https://images.viblo.asia/1765496b-dd4c-4663-bae5-f066cb3353d7.png)

Một sai lầm thường thấy khi thiết kế giao diện đó là quá phụ thuộc vào cỡ chữ để thể hiện sự phân cấp.
####
*"Đoạn text này quan trọng? Vậy thì cho nó to lên."*
####
*"Đoạn text này chỉ là phụ? Vậy thì cho nó nhỏ lại."*
####
Thay vì cứ phụ thuộc vào việc thay đổi cỡ chữ, thì  các bạn cũng có thể sử dụng màu sắc và độ đậm nhạt để có được cái mà mình muốn.
####
*"Đoạn text này quan trọng? **Vậy thì cho nó đậm lên.**"*
####
*"Đoạn text này chỉ là phụ? **Vậy thì dùng màu chữ nhạt hơn.**"*
####
Hãy thử nghiệm, và tôi khuyên các bạn là nên sử dụng 2-3 màu:
* Màu tối (nhưng không phải là đen xì đâu nhé) dành cho những content chủ đạo. (Ví dụ như đầu đề bài viết chẳng hạn)
* Màu xám dành cho những content phụ, kém quan trọng hơn 1 chút (VD: created_time của bài viết)
* Màu xám nhạt dành cho những content phụ trợ (VD: một thông tin liên quan đến copyright của trang ở footer)

![](https://images.viblo.asia/cce70995-c01b-4fbe-a801-3f48bc209cd3.png)

Tương tự như vậy, sử dụng song song 2 mức độ đậm nhạt là đủ:
* Bình thường (400 - 500 tùy theo từng font): dành cho hầu hết các nội dung
* Đậm (600 - 700): dành cho các nội dung muốn nhấn mạnh, làm nổi bật.

![](https://images.viblo.asia/feaa9230-114c-4175-a99c-fe16ea46fe4d.png)

※*Tránh sử dụng mức dưới 400 cho font-weight vì hầu hết trường hợp nó khá khó đọc, để có được tác dụng tương tự thì bạn có thể dùng một màu chữ nhạt hơn hoặc là cỡ chữ nhỏ hơn.*

### 2. Đừng dùng text màu xám nếu có background màu mè

![](https://images.viblo.asia/6d338ded-18fa-410f-8d43-3e039d722a27.png)

Sử dụng text có màu xám sẽ rất tốt nếu như bạn có background màu trắng, tuy nhiên nếu như background có màu khác (xanh đỏ tím vàng..) thì nó lại không thực sự hợp lí lắm.
####
Bởi vì thực ra lí do mà dùng màu xám vs background màu trắng là để giảm độ tương phản mà thôi.
####
Sử dụng màu tương đồng vs background sẽ vẫn giúp bạn tạo ra sự phân cấp mà bạn muốn.

![](https://images.viblo.asia/77dcd5cd-9618-4512-a236-1ae19d606bf9.png)


Có 2 cách giúp bạn giảm độ tương phản với các background hơi màu mè một chút:
#### 2.1 Giảm opacity của text + dùng text màu trắng
Giảm opacity của text sẽ khiến cho màu sắc  của background có thể "hòa trộn" với màu text hơn, trông sẽ hài hòa hơn đấy.

![](https://images.viblo.asia/8a32f42f-a0bd-41df-8b46-0c1f863759cc.png)

#### 2.2 Chọn một màu sắc tương đồng với background
Trong trường hợp mà background không phải là 1 màu đơn mà có cả hoa văn hay là 1 ảnh thì việc giảm opacity không đem lại hiệu quả tốt mà còn làm nó trông xấu hơn nữa. Nên trong trường hợp này thì  ta nên tự pick 1 màu "liên quan" một chút với background là được.

![](https://images.viblo.asia/fe1a47a7-ce9e-4870-a872-cca8f3051a6b.png)

Như tôi thường làm thì tôi sẽ chọn 1 màu có cùng HUE nhưng tôi sẽ thử tăng giảm saturation và độ sáng để ra 1 màu hợp lí.

### 3. Điều chỉnh lại shadow
![](https://images.viblo.asia/01ab06d2-522b-46c7-a1ee-14a5d26eebc7.png)

Thay vì tăng giá trị blur và spread của box-shadow lên cho nó "nổi lềnh phềnh" lên thì bạn hãy thử chỉnh lại offset để cho ra hiệu ứng đổ bóng tự nhiên hơn, ví dụ như trong ảnh, bạn sẽ thấy có cảm giác nguồn sáng ở phía trái bên trên -> bóng sẽ đổ ở bên phải và bên dưới, như thật luôn.
####
Tương tự với input-form:
![](https://images.viblo.asia/f975786a-1160-44ff-b981-be622bb32d92.png)

Nếu bạn muốn tìm hiểu sâu hơn về shadow thì hãy xem qua [Material Design Guidelines](https://material.io/guidelines/material-design/elevation-shadows.html) nhé.

### 4. Đừng lạm dụng border
![](https://images.viblo.asia/8d4633d5-f05b-4471-874f-17ae2f1b451b.png)

Khi bạn cần tạo ra sự tách biệt giữa 2 đối tượng thì, xin hãy đừng ngay lập tức sử dụng border. Tất nhiên là đó là 1 cách tốt để thể hiên sự tách biệt của 2 đối tượng nhưng, đó đâu phải là cách duy nhất đúng không?
####
Nhìn mà xem, lạm dụng nó quá mức khiến cho design của bạn trông hơi... "bừa bộn"  :pensive:
####
Thế nên, lần tới, thay vì ngay lập tức dùng border,  bạn hãy thử xem qua những cách này:

#### 4.1. Box-shadow
Box-shadow hoàn toàn có thể giúp bạn đạt được mục đích làm tách biệt 1 đối tượng ra, giống như border, nhưng lại không gây ra cảm giác bị ngắt quãng.

![](https://images.viblo.asia/5ce06b75-b5c3-4d5e-9ea7-d57ed52b2849.png)

#### 4.2. Dùng 2 background-color khác nhau
Về cơ bản thì đó là tất cả những gì bạn cần để đạt được mục đích tương tự với border. Nếu như bạn đang dùng cả 2 thứ này kết hợp với nhau, thì hãy thử bỏ border đi mà xem, bạn sẽ nhận ra mình chẳng cần đến nó nữa cơ.

![](https://images.viblo.asia/57006676-d798-42e0-a6dc-9903f3670e3d.png)

#### 4.3. Thêm khoảng cách
Đó là 1 cách tuyệt vời để phân tách các đối tượng mà không mang lại sự tách biệt. :rofl:

![](https://images.viblo.asia/94ba75ac-833c-44ba-8e1d-9fd372dcb82c.png)

Bạn cũng nhận thấy điều đó phải không nào :stuck_out_tongue_winking_eye:

### 5. Sử dụng icon với kích thước phù hợp
![](https://images.viblo.asia/77b332c6-0a60-4711-9951-4d20283c1ac3.png)

Hẵn là nhiều lúc bạn sẽ cần dùng các icon to cho các mục đích như là showcase các tính năng nổi bật ở trang landing-page, và bạn đơn giản là sử dụng Font Awesome rồi chọn size to hơn, thế là được, vì dù sao nó cũng là các vector nên phóng to hơn cũng đâu làm nó bị vỡ hình đúng không?
####
Tất nhiên là nó sẽ không vỡ hình đâu, nhưng nghĩ mà xem, những icon đó vốn được design cho kích cỡ khoảng 16-24px, nên nếu bạn bắt nó phải zoom x3 x4 lần lên thì chắc chắn là nó sẽ trông không được "chuyên nghiệp" cho lắm. Nó thiếu đi một chút sự chi tiết mà sẽ không ai để ý tới với 1 icon size 16px.

![](https://images.viblo.asia/f52ad303-ba38-410c-ae4e-0c8b1075c20e.png)

Trong trường hợp bạn chỉ có những icon size nhỏ như vậy, vẫn có 1 cách có thể chữa cháy khá ok đó là giữ nguyên size cũ nhưng cho nó thêm border xung quanh để "lấp khoảng trống".

![](https://images.viblo.asia/f26df596-5637-42b6-96ce-12bf8dfd5645.png)

Nếu bạn có thể đầu tư 1 chút, hãy tìm kiếm thử trên [Heroicons](http://www.heroicons.com/) hoặc là [Iconic](https://useiconic.com/).

### 6. Dùng thêm viền để biến những thiết kế đơn điệu trở nên màu sắc hơn.

![](https://images.viblo.asia/8c7ad776-68bb-47ba-9ea7-df97d5e154e5.png)

Một mẹo rất tuyệt để khiến cho trang web của bạn trở nên màu sắc hơn một chút trong trường hợp nó có vẻ khá ảm đạm đúng không nào.
####
Ví dụ như thêm viền cho thông báo:
![](https://images.viblo.asia/70722a6b-64e8-4b69-bbf2-eebe2067a323.png)

hay là highlight item nào đang được chọn:

![](https://images.viblo.asia/eefeaf98-cbea-4b6e-bf79-04e1230f77e0.png)

hay thậm chí là như này:
![](https://images.viblo.asia/cd970d88-2c1c-473e-b77c-89c08ad1d7a1.png)

Không cần phải có một khả năng "thiên phú" mà bạn vẫn có thể biến trang web của mình trông cool ngầu hơn rất nhiều đó.
#####
*Nếu ngay cả việc quyết định nên chọn màu nào cũng khiến bạn gặp khó, hãy thử dùng [Dribble color search](https://dribbble.com/colors/f4f19c) để tìm ra những màu phù hợp để kết hợp với màu có trong thiết kế của bạn* 

### 7.Không phải button nào cũng cần có background-color
![](https://images.viblo.asia/ae4beb5d-95da-452b-8ca6-e0960476c748.png)

Khi trong 1 trang mà user có nhiều action để thực hiện, chúng ta hay bị rơi vào một vấn đề là không biết phải dùng màu nào cho cái action nào cho hợp lí nhất.
####
Bootstrap đã làm khá tốt khi đưa ra 1 định nghĩa chung:

![](https://images.viblo.asia/c5e80b7b-d6cf-41f8-8d76-992f0896621f.png)

Phân chia màu theo từng ý nghĩa của action là một cách hay, nhưng đừng quên bạn cũng đang tìm kiếm giải pháp để thể hiện sự phân cấp. Có nghĩa là trong cả đống các action đó, sẽ có cái quan trọng và kém quan trọng hơn cái khác. Vì thế, ta cần chú ý cả đến những điểm sau:
* **Action chính thì nên được nổi bật hơn:** Rõ ràng, màu sắc có độ tương phản cao.
* **Action phụ cũng nên được hiển thị rõ ràng nhưng không nên nổi bật quá**. Màu có độ tương phản không quá cao hoặc là thiết kế kiểu bo viền thay vì background là những cách hay.
* **Những action kém quan trọng hơn nữa thì nên khiêm tốn hơn.** Thường thì hãy cho nó giống như 1 link thôi là ok rồi


![](https://images.viblo.asia/5f12c028-964b-40f2-81e0-98e4d6656505.png)

*Thế với những action xóa, deactive thì sao, có phải nó lúc nào cũng nên là màu đỏ?*

Không hẳn, hãy phân cấp mức độ quan trọng của nó và tuân theo những quy định trên.
![](https://images.viblo.asia/881645bf-4382-47f9-aa02-6649f9d3711e.png)



-----


## 1 phút quảng cáo
Bạn có thấy bài viết này thú vị và hữu ích chứ? Chúng tôi vừa xuất bản cả 1 cuốn sách liên quan đến design, [Refactoring UI](https://refactoringui.com/book/) . Hãy xem qua nếu thấy hứng thú nhé!



-----

*HAPPY CODING!*