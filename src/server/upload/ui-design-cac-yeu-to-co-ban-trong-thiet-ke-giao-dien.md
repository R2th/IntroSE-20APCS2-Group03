[![UI Components](https://cdn.dribbble.com/users/427857/screenshots/14376977/media/c35b2be4b09afcc1d0fadf8ccf783cb4.png)](https://dribbble.com/shots/14376977-UI-Components-for-Unity-Gaming)
*UI components by [Tran Mau Tri Tam](https://dribbble.com/tranmautritam)*

Nếu là một front-end developer, chắc hẳn bản thân bạn cũng sẽ ít nhiều hiểu được tầm quan trọng của UI đối với người dùng, cũng như việc một ứng dụng có giao diện đẹp, ưa nhìn sẽ giúp người dùng có cái nhìn tốt hơn và sẽ lựa chọn việc sử dụng ứng dụng của bạn nhiều hơn. Là developer, thường chúng ta sẽ không nhúng quá sâu vào công việc thiết kế UI, mà phần lớn thời gian sẽ dùng để code ra giao diện dựa trên những mẫu thiết kế có sẵn, hay sử dụng các UI framework như Bootstrap, Material UI, Ant Design... để xây dựng front-end. Tuy nhiên, giả sử bạn rơi vào một trong những trường hợp sau:
* Có một số thứ mà UI framework bạn đang sử dụng không hỗ trợ
* Quy mô ứng dụng không lớn (ví dụ như extension, plugin, tool), việc dùng framework khiến bạn cảm thấy thừa thãi
* Hay đơn giản là bạn phải bố trí các element của UI framework sao cho phù hợp với bố cục
* Hoặc thậm chí, bạn là người thực hiện việc phát triển một sản phẩm từ A - Z (Developer kiêm Designer kiêm luôn Tester 😎)

Đây chính là lúc việc nắm rõ **các yếu tố cơ bản trong thiết kế UI** sẽ rất có ích cho bạn, giúp bạn có những cảm nhận tốt hơn về tính thẫm mĩ, và xây dựng các thành phần UI nhanh và đẹp. Vậy ta cùng xem các yếu tố cơ bản nào trong thiết kế UI mà ta cần biết.

*Bài viết dựa trên khóa học "[Learn UI Design Fundamentals](https://scrimba.com/learn/design)" của tác giả Gary Simon.*

# Các yếu tố cơ bản
## 1. White space (khoảng trắng)
> Giữa các phần tử trên giao diện cần được cách nhau bởi các khoảng trắng thích hợp.

Cùng xem 2 hình ảnh của cùng một `card` bên dưới:

![whitespace](https://images.viblo.asia/845437b9-f18d-4d8c-a086-5caea553c6ea.png)

Các bạn có thể thấy hình bên phải nhìn được hơn hẳn đúng không? Các phần tử sau khi được chia khoảng trắng hợp lý bằng các thuộc tính như `padding`, `margin`, thì bạn có thể thấy sự khác biệt rõ rệt.
 
## 2. Alignment (căn chỉnh)
> Đảm bảo các phần tử được đặt đúng vị trí sao cho tương thích với nhau.

Cùng xem 2 hình sau:
![alignment](https://images.viblo.asia/b6cd7835-3416-4b10-8bca-bf94d3af1642.png)

Ở 2 hình này, bạn có thể thấy các phần tử đã được cách nhau bởi những khoảng trắng, nhìn cũng ok. Nhưng ở hình bên trái, các phần tử thụt ra thụt vào không đều so với lề bên trái của khung, điều nay khiến bạn cảm thấy hơi khó chịu khi nhìn. Ở hình bên phải, các phần tử được căn đều so với lề bên trái, trông được hơn chứ nhỉ?

## 3. Contrast (độ tương phản)
> Đảm bảo các phần tử có độ tương phản nhất định, giúp người dùng dễ nhìn.

Độ tương phản là sự khác biệt về màu sắc giữa phần tử này với phần tử kia trên giao diện. Ví dụ như độ tương phản giữa:
* Text trên một button và nền của button đó
* Button và div chứa nó
* Hay div đó và nền của cả trang web.

![](https://images.viblo.asia/95d2f6cf-d96e-4439-b525-451a151491e2.png)

[WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) (một chuẩn dành cho phát triển web) quy định tỷ lệ tương phản tối thiểu nên có giữa 2 phần tử là **4.5:1**, hoặc đối với các phần tử cỡ lớn thì nên là **3:1**. Tỷ lệ này càng lớn, các phần tử càng dễ phân biệt, người dùng càng dễ nhìn, nhất là đối với người dùng có các tật về mắt.

Để hiểu rõ hơn về độ tương phản, cùng xem 2 hình sau:

![contrast](https://images.viblo.asia/45ae3836-9a9f-42fa-9078-d932f273a9d3.png)

Chỉ cần ngó sơ qua là bạn có thể thấy ngay là hình nào dễ nhìn hơn đúng không? Hình bên trái là ví dụ của một thiết kế có độ tương phản kém, trong khi ở hình bên phải, các phần tử được phối màu với độ tương phản tốt nên từng phần tử hiện lên rõ ràng.

## 4. Scale (kích cỡ)
> Cân nhắc sử dụng kích cỡ phù hợp với phần tử cũng như mục đích sử dụng của phần tử.

Một ví dụ đơn giản là, khi bạn thấy một bài viết, cái đầu tiên bạn quan tâm chắc hẳn là **tiêu đề** vì nó khái quát được **nội dung** bài viết nói gì. Nếu tiêu đề không hứng thú, bạn liền next, tiết kiệm khối thời gian. Do vậy **tiêu đề** cần có kích cỡ to hơn, nổi bật hơn phần chữ trong **nội dung**.

Cùng xem 2 hình sau:

![scale](https://images.viblo.asia/28eba25e-e90a-4e8a-bd83-f0246d6a44e0.png)

Quá rõ ràng bên nào nhìn thích hơn đúng không? Ở hình bên trái, các phần tử hầu như đều cùng cỡ chữ, chúng ta không biết mình cần chọn lọc những thông tin gì để lưu vào đầu, ngoài ra các khung màu cũng không trải hết độ rộng trang, nhìn không đều. Ở hình bên phải, chúng ta phân biệt được trang này có tiêu đề là gì, từng màu sắc có mã màu hiện rõ lên giúp ta dễ dàng ghi nhớ và các khung màu trông cũng ok hẳn.

## 5. Typography (kiểu chữ)
> Sử dụng kiểu chữ nhất quán, phù hợp mục đích sử dụng, và tương thích với các yếu tố khác.

Thường trên cùng một giao diện chỉ nên sử dụng 1 hoặc 2 font chữ để đảm bảo tính nhất quán, người dùng nhìn dễ quen mắt hơn. Và tùy vào mục đích sử dụng, nên chọn font và kiểu chữ sao cho phù hợp, ví dụ như bạn đang làm một giao diện trang bán đồ nội thất, bạn lại sử dụng một font chữ phong cách đường phố như graffiti, như vậy không phải là sáng tạo đâu nhé 😅

Cùng xem tiếp 2 hình sau:

![typography](https://images.viblo.asia/7911a590-e5d0-464f-a982-14c4f60ed5b0.png)

Vấn đề của hình bên trái đó là sử dụng quá nhiều kiểu chữ (tiêu đề 1 kiểu, nội dung 1 kiểu, footer 1 kiểu) và kích cỡ cũng không ổn, hoặc là do kiểu chữ, hoặc do lỗi của người thiết kế. Sau khi chuyển về cùng 1 kiểu chữ và tinh chỉnh một số thứ như trong hình bên phải, có phải nhìn ổn hơn một tí?

## 6. Color (màu sắc)
> Lựa chọn màu sắc một cách khoa học, hài hòa và phù hợp với chủ đề đang hướng tới.

Một trong những yếu tố cơ bản và cực kỳ quan trọng mà không thể không nói tới, đó chính là màu sắc. Lấy ví dụ như khi bạn truy cập một trang web, điều đầu tiên đập vào mắt của bạn không phải là bố cục, không phải là nội dung, mà chính là màu sắc của trang đó. Do đó, việc lựa chọn màu sắc là một công việc khá quan trọng và đòi hỏi tính thẫm mỹ cao ở người thiết kế. Chúng ta sẽ không đi quá sâu, mà cùng điểm qua một số lưu ý sau:
* **Cần lựa chọn màu sắc phù hợp với chủ đề đang hướng tới**: mỗi màu sắc có thể mang một ý nghĩa tượng trưng, ví dụ như màu xanh lục thường đại diện cho thiên nhiên, sự sung túc... hoặc màu đen, đại diện cho sự trang trọng, quý phái... Do đó, nên cân nhắc lựa chọn màu sắc tùy vào đối tượng sử dụng, sản phẩm, hay loại hình kinh doanh của công ty.
* **Không nên sử dụng quá nhiều màu sắc trên cùng một giao diện**: quá nhiều màu sắc có thể làm người dùng bị rối mắt, mất đi mục đích biểu đạt của phần tử giao diện. Thường để dễ dàng và an toàn hơn, ta chỉ nên chọn 1 hoặc 2 màu chủ đạo, rồi phối với các shade (độ đậm nhạt) khác nhau để tạo sự hài hòa.
* **Chú ý kết hợp với độ tương phản một cách hợp lý**: như đã đề cập ở trên, độ tương phản tốt giúp người dùng dễ nhìn hơn, và màu sắc đóng một vai trò quan trọng trong việc điều phối độ tương phản.

Cùng xem 2 hình sau:

![color](https://images.viblo.asia/e8d57da4-dec5-4496-b8b4-bb5eac96ef53.png)

Ta cùng đếm xem có bao nhiêu màu ở hình bên trái, chắc có bạn đếm được 4, có bạn 5, hoặc rộng rãi hơn thì cứ cho 6. Từ đây, các bạn có thể thấy các phần tử quan trọng không được nổi bật, nếu không muốn nói là khó nhìn, vì sử dụng quá nhiều màu sắc và một phần do độ tương phản giữa các màu này đem lại không được tốt. Sang hình bên phải, ở đây mình thấy có 3 màu, màu nền mình tính hoàn toàn là 1 màu, chỉ là các shade khác nhau, màu thứ 2 là màu chữ, màu thứ 3 là button. Các bạn có thể dễ dàng nhìn ra đâu là cái button mình có thể bấm, đâu là phần chữ mình có thể đọc.

## 7. Visual Hierarchy (mối liên hệ trực quan)
> Làm nổi bật chức năng, mục đích của các phần tử trên giao diện

Một ví dụ dễ thấy nhất là cái slider, có phải khi cuộn cái slider, tấm hình ở giữa sẽ to hơn những tấm hình ở 2 bên, điều này giúp bạn tập trung nhiều hơn vào tấm hình đó. Đó là một cách làm nổi bật phần tử vận dụng yếu tố **visual hierarchy**. Visual hierarchy được vận dụng làm nổi bật phần tử thông qua các yếu tố cơ bản đã kể trên. Chúng ta cùng xem những cách thực hiện điều đó bằng 5 cái hộp:

5 cái hộp | Sử dụng `white space` & `alignment` | Sử dụng `contrast`
-------- | -------- | --------
![](https://images.viblo.asia/931b75dc-48e8-48f6-bcd4-09ccea6f0a5c.png) | ![](https://images.viblo.asia/753de628-c72f-450d-b948-28a66d31ff35.png) | ![](https://images.viblo.asia/97a20ba6-f9ab-4010-a18f-3af0f6e5fb76.png)

Sử dụng `scale` | Sử dụng `color` | Hỗn hợp nhiều cách
-------- | -------- | --------
![](https://images.viblo.asia/ca4776d1-238e-4e8e-b733-f5fc130ffa9e.png) | ![](https://images.viblo.asia/c4b226dc-ceb2-43c9-b936-b605cf724d76.png) | ![](https://images.viblo.asia/d2b73c76-b745-443a-98f6-84b6433e8982.png)

Ta lại xem tiếp 2 hình sau của cùng một form:

![](https://images.viblo.asia/a2bfe145-3702-41e5-b366-20f510f62fce.png)

Hình bên trái là một ví dụ khi không vận dụng yếu tố visual hierarchy, các phần tử trông đều như nhau, không có điểm nhấn. Ở hình bên phải, các phần tử được làm nổi bật, thể hiện rõ chức năng và mục đích của mình nhờ vận dụng yếu tố visual hierarchy. Các bạn có thể kể tên được bao nhiêu yếu tố cơ bản đã được áp dụng trong hình bên phải không? Bình luận bên dưới nhé.

# Kết
Vậy là mình đã chia sẻ qua các yếu tố cơ bản trong UI design, hi vọng bài viết giúp bạn phần nào hiểu hơn về UI cũng như có cái nhìn tốt hơn và thẫm mỹ hơn khi làm việc với UI. Xin kết thúc bài viết bằng một bài tập nho nhỏ để áp dụng các yếu tố kể trên, các bạn thiết kế giao diện cho khung xương HTML trong codepen sau, sau khi hoàn tất có thể đối chiếu với thiết kế mẫu mình đặt bên JS. Share kết quả bên dưới nhé. Have fun!
{@codepen: https://codepen.io/khangnd/pen/JjRbdvZ}

----
@khangnd<br>[![Github](https://images.viblo.asia/20x20/81dd12f0-a8c9-403f-ae51-27b92828ca22.png)](https://github.com/khang-nd) [![Linkedin](https://images.viblo.asia/20x20/4981766e-5e57-401a-8623-d3657a3148e5.png)](https://www.linkedin.com/in/khangnd/) [![Dev.to](https://images.viblo.asia/20x20/3921db2e-e4e5-45d7-acc8-e8b92e02d47d.png)](https://dev.to/khangnd) [![Fandom](https://images.viblo.asia/20x20/fad64df3-0be8-4481-b810-8995f18f71ea.png)](https://dev.fandom.com/wiki/User:KhangND)