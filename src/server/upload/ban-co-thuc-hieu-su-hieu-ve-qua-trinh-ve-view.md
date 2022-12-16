Tạo ra một UI tuyệt vời là mục tiêu của mọi lập trình viên. Để làm được như vậy, bước đầu tiên là hiểu cách thức hoạt động của hệ thống, để chúng ta có thể phối hợp tốt hơn, tận dụng những ưu điểm  và tránh những sai sót của nó.
Bạn có bao giờ từng thắc mắc là layout của mình được gen ra từ file xml như thế nào không. 
Hôm nay hãy cùng thử tìm hiểu một chút về nó nhé

Về cơ bản thì nó sẽ gồm 3 bước chính 
![](https://miro.medium.com/max/2400/0*wSqC1gtdkKwSwutW.)
## Bước 1: Measure
*Mục tiêu*: Xác định view size.

Size ở đây bao gồm kích thước của view con và sự phụ thuộc của nó với view cha.
View size được xác định theo 2 cách:
* measured width & measured height - view sẽ có kích thước thế nào trong view cha. 
* width & height (hay còn gọi là: drawing width & drawing height) - Kích thước thực tế trên màn hình, tại thời điểm vẽ và sau khi layout. 

## Step 2: Layout
Mục tiêu: Set position and size (drawing width & drawing height)  cho view và tất cả các view con trong nó.

Tương tự như step 1: Duyệt đệ quy từ trên xuống của view tree .
Mỗi parent view sẽ định vị tất cả các children của mình theo kích thước đã đo ở bước trước.

Việc định vị được thực hiện trên phương thức `onLayout(boolean changed, int left, int top, int right, int bottom)`  với left, top, right và bottom là quan hệ với view cha.
Khi overriding `onLayout()`, chúng ta phải gọi `layout()` trên mỗi view con 
## Step 3: Draw
Sau khi xác định kích thước và vị trí, lúc này view có thể tự vẽ chính nó rồi.
Trong `onDraw (Canvas)`, đối tượng `Canvas` tạo (hoặc cập nhật) một danh sách các lệnh OpenGL-ES (displayList) để gửi đến GPU.

Tổng hợp lại thì sẽ thế này . Đây là hình ảnh trong slide thuyết trình hồi xưa của mình.
![](https://images.viblo.asia/f82bdeee-a1cb-4a96-9c22-ea75af3946ed.png)
![](https://images.viblo.asia/4b237789-0d65-4720-9345-aa2e37a0a6b9.png)
![](https://images.viblo.asia/fe08a2c8-bd3b-4513-b156-6c7fb569e98c.png)
![](https://images.viblo.asia/741531bb-0912-4a83-963e-df9b19880d47.png)

Vậy đó, đây là quá trình mỗi view ở file xml của chúng ta được vẽ lên! Nhưng điều gì sẽ xảy ra khi chúng tôi thay đổi thuộc tính của view ? khi có animation tác động hoặc do người dùng nhập hoặc nếu chúng ta quyết định thay đổi chúng?

##  Khi mọi thứ thay đổi…
Khi các thuộc tính của view thay đổi, view sẽ thông báo cho hệ thống. Tùy thuộc vào các thuộc tính đã thay đổi, view sẽ gọi:

* **Invalidate** - gọi `onDraw () `chỉ cho view hiện tại 
* **requestLayout** - > gọi ngược lại view root và thực hiện lại toàn bộ quá trình (measure → layout → draw)

![](https://vladsonkin.com/wp-content/uploads/2020/12/android-view-lifecycle.jpg)

Ở đây mình dùng cụmg từ request layout , layout pass với cùng 1 ý nghĩa là thực hiện quá trình layout.
![](https://miro.medium.com/max/2400/0*xr9f92lWQLyVrKzu.)

Một ví dụ đơn giản cổ điển cho tình huống `requests a layout`: Giả sử chúng ta có 2 view nằm tương đối với nhau trong một RelativeLayout. Hơn nữa, nếu một view thay đổi kích thước của nó - thì nó dẫn đến view kia phải đặt lại vị trí và có thể là chính thay đổi kích thước. Vì vậy, chúng ta đã thay đổi thuộc tính của một view con , nhưng nó khiến toàn bộ view bị outdated.

Những tình huống như thế này nhắc nhở chúng ta rằng điều quan trọng là phải có layouc hiệu quả, do đó, layout sẽ được thực thi trơn tru và không gây ra hiện tượng skip frames.

Chưa cần view thay đổi, ngay khi khởi tạo view cũng đã có hiện tượng layout pass rồi. 
Vậy thì khi xảy ra layout pass xảy ra quá 2 lần ?
**RelativeLayout**

Luôn chạy ít nhất 2 lần layout pass: Đầu tiên theo yêu cầu của mỗi view. Sau đó, thì layout sẽ đánh giá mối quan hệ giữa các views, tính toán weight, height, v.v. và cuối cùng thực hiện một lần layout khác, để xác định vị trí cuối cùng để render.

**LinearLayout**

Thông thường thì chạy một lần layout duy nhất , nhưng nếu bạn sử dụng `weight` thì lại khác . Trường hợp đó tương tự trong quy trình đã đề cập ở trên: `LinearLayout` thực hiện lần chuyển đầu tiên theo từng yêu cầu của views. Sau đó, nó mới có thể tính toán kích thước views theo `weight`  và cuối cùng là layout pass lần 2.

**Gridlayout**

Thường cũng là 1 lần layout pass . Tuy nhiên, nếu chúng ta sử dụng sai `weight` hoặc sử dụng “fill* ” trong thuộc tính `layout_gravity` - thì có thể xảy ra lỗi layout pass lần hai.

Trong trường hợp đơn giản, 2 lần layout pass có thể không ảnh hưởng nhiều đến hiệu suất. Tuy nhiên, nếu không chú ý, nó có thể tổng hợp lại khá nhanh và quá trình này trở nên tốn kém hơn rất nhiều.

# Các tình huống cần chú ý
**Deep view hierarchy** - quá trình layout có thể tốn kém theo một cách nào đó. Do đó, view hierarchy của chúng ta càng sâu và phức tạp, thì việc layouting càng tốn nhiều thời gian. Có thể nói tránh deep view hierarchy chính là tránh  nested layout

**Double taxation causing object is close to the root view** -- 
Hãy nhớ rằng khi request layout sẽ request lên tận rootview (như kiểu gia phả gia đình vậy đó). Với những view mà có tình trạng double layout , thì mỗi view con sẽ tự động tăng gấp đôi số lần tham gia vẽ. Điều này dẫn tới việc gia tăng chóng mặt các công việc cần làm như kiểu thác nước chảy vậy đó.
![](https://miro.medium.com/max/414/0*tH-xYMrnayMoBXwg.)

Hãy nhớ rằng quá trình bố trí bắt đầu ở trên cùng của hệ thống phân cấp, tất cả các cách xuống. Bình thường bản thân Bà Nội tự layout pass đã mất 2 lần rồi. Vì vậy, nếu Bà Nội yêu cầu Bố bố layout 2 lần và Bố yêu cầu Con Gái layout 2 lần và con gái yêu cầu Teddy layout 2 lần - thì tổng thể Teddy tham gia vào 2³ = 8 lần layout pass. Giờ thì bạn thấy cái giá phải trả rồi đó. 

Rất nhiều view lồng nhau đến  6 7 lượt thì sẽ ra sao đây. Mặc dù đó là những hàm không tốn quá nhiều thời gian cũng như tài nguyên để thực hiện, có khi chỉ 0.00000x giây thôi nhưng với màn hình có cả hàng trăm view , view group khác nhau thì sẽ ra sao 
Khi code cải thiện được performace dù rất ít thôi cũng là quý giá rồi.
 
# Làm phẳng hệ thống phân cấp- Flatten hierarchy
* Xóa các views vô ích 
* Sử dụng thẻ `merge`, thẻ `include`, `viewstub`
* Cố gắp làm phẳng hệ thống phân cấp layout.
* Custom view sẽ cho hiệu quả  vì có thể làm chính xác hơn cho nhu cầu ứng dụng của bạn.
### Minimize requests layout
Chỉ cần request layout nếu bạn không thực sự cần đến việc đó.

Giờ đây chúng ta có constraint layout giúp chúng ta giải quyết các vấn đề trên. Tuy nhiên nhiều người vẫn chưa nhận ra giá trị thực sự của  nó. việc layout pass chỉ diễn ra 1 lần và nó giúp chúng ta rất tốt đối với những view phức tạp. Tất nhiên với những view quá đơn giản thì không nhất thiết phải dùng constraintlayout nhưng khi gặp những màn hình khó nhằn, hãy dùng constraint layout, nó dễ dàng sử dụng hơn bạn nghĩ, hơn nữa với việc motion layout ngày càng phổ biến, việc sử dụng constraint cũng dần là điều bắt buộc nếu ta muốn có những animation độc đáo do motion layout tạo ra.

Hồi đó mình có thực hiện việc tạo 1 mà hình với 2 loại layout khác nhau và đây là kết quả : 
![](https://images.viblo.asia/75585c13-3c8e-4545-b5a7-c5221b11055a.png)
![](https://images.viblo.asia/aa424318-59f4-4289-8c16-7d7f64002a0e.png)

Bạn thấy đó, hiệu quả của việc constraint layout là đáng để chúng ta sử dụng nó thường xuyên hơn. Tuy cũng còn một vài hạn chế (sử dụng quá nhiều constraint với nhau, chưa tối ưu khi khi dùng với layout notification, item recyelview , ...) nhưng với các view phức tạp thì không gì tuyệt vời hơn constraint layout.

Bài viết này được mình dịch từ một bài viết khá lâu trên [Medium](https://medium.com/@britt.barak/layout-once-layout-twice-sold-aef156ff16a4) nhưng giờ giá trị của nó vẫn còn rất hiệu quả. Cảm ơn mọi người đã quan tâm.