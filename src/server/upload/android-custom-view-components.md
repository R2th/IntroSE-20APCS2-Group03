## 1. Custom view components là gì?
- Lập trình android chúng ta đều hiểu, để xây dựng UI của ứng dụng, ta cần sử dụng phối hợp cùng lúc nhiều các thành phần View khác nhau từ TextView, ImageView, EditText, ... từ các ViewGroup như LinearLayout, ConstrainLayout, RelativeLayout, ... tất cả chúng đều được kế thừa từ lớp cơ sở View.

![image.png](https://images.viblo.asia/5f081507-47be-4ce4-ba1c-a1cc11b14c50.png)
- Việc tạo ra Custom view components có thể hiểu một cách đơn giản là chúng ta đang tự tạo ra một dạng thành phần view nào đó không có sẵn trong hệ thống để giải quyết bài toán nào đó được đưa ra.

=> Custom view là một View do chúng ta tạo ra, tùy ý linh động để giải quyết một vấn đề thiết kế UI nào đó.
## 2. Custom view components giải quyết vấn đề gì?
- Qua định nghĩa mơ hồ của tôi bên trên, hẳn những người mới vẫn đang khó hình dung ra vấn đề, câu hỏi lớn ở đây là tại sao dùng custom view components, có nhất thiết cứ phải dùng custom view hay không?
- Tôi xin đưa ra một ví dụ mà chắc chắn một vài bạn search mạng sẽ gặp, dạng bài toán vẽ hình một icon nào đó trên màn hình kiểu:
![image.png](https://images.viblo.asia/9e25434d-3ca0-4300-9fac-4a45f979c052.png)
    
    Hẳn là bạn sẽ chẳng bao giờ có thể tìm thấy bất cứ một view component nào có thể làm được điều này chỉ trong 1 thẻ </> trừ khi bạn lại dùng thư viện của người ta dựng sẵn và ung dung làm điều đó. Việc không tìm thấy, hay không áp dụng thư viện của người ta sẽ dẫn đến việc bạn phải kết hợp các view component hiện có vào để giải quyết bài toán này (nếu được).
- Một ví dụ khác đơn giản hơn nhưng cũng sẽ khiến các bạn thấy được sự hay ho của custom view. Ở đây tôi sử dụng chỉ gồm TextView, EditText kết hợp lại ra được một view copmponent như này: ![image.png](https://images.viblo.asia/e96658d6-acb6-460c-ba1a-9c2115e6c5ef.png)
   
   Tôi dùng TextView làm label cho EditText, điều này chắc các bạn cũng đã nhận ra. Hiển nhiên trong đầu các bạn đã ngay lập tức nghĩ ra cách làm thế nào để xây dựng UI như trên rồi đúng không, quá dễ!? Nếu trong hệ thống UI của app chỉ tồn tại một vài cái "input data" kiểu này, hẳn các bạn sẽ chơi bài coppy paste cho lẹ và nếu chúng giống nhau y đúc thì có khi chỉ thay đổi mỗi thuộc tính Id, text cho label, hint cho EditText là đủ. Thế nhưng chẳng may, hệ thống UI app của bạn chứa vài chục cái, vài trăm cái "input data" và chúng cũng có dạng kiểu như này, có khi chúng chỉ khác nhau có thể là màu sắc, có thể cỡ chữ, và một vài thứ lắt nhắt khác, tôi cá rằng, bạn chơi bài copy paste sẽ khá là mệt mỏi ( các nút Ctrl C, V mòn hết rồi cũng nên :v). Tôi thì tôi thấy kiên trì copy paste cũng xong thôi, nhưng hôm đó leader, hay designer của bạn kiểu: " giờ anh thấy phông chữ này sida quá, chú đổi cho anh hết toàn bộ label và hint của view input data này qua font abc nhé!", hay kiểu: "Màu này lớm quá, chú đổi qua màu mới này cho anh nha!", tôi thì tôi tin là mấy ông copy paste chắc khóc ra tiếng mán luôn ;D. ( Tôi đùa thôi, cũng chưa chắc đã khóc đâu :v)
- Trong trường hợp trên thì custom view có thể làm gì? Khi tôi tạo ra một custom view và biến nó thành một view component của riêng tôi, tôi có thể đem nó ra sử dụng ở bất cứ đâu, tôi có thể tùy chỉnh chỉ 1 lần và đáp ứng được chuyện mọi nơi sử dụng view component này đều thay đổi theo, tôi cũng có thể chỉ tùy chỉnh nó chỉ ở một nơi nào đó nhất định nhằm tạo ra những sự khác biệt riêng ở đó (ví dụ ở Home screen textColor màu xanh, ở Login screen textColor lại thành màu đỏ chẳng hạn).

=> Việc tạo ra các custom view component nhằm mục đích tiết kiệm công sức thiết kế UI, đồng thời tránh việc tệp code bị phình to, hơn nữa lại dễ dàng cho việc sử dụng, mở rộng và thay đổi sau này.
## 3. Triển khai custom view components ra sao ?
- Các ví dụ trên không phải chỉ kể ra cho vui đâu các bạn trẻ, giờ tôi xin mạn phép chia sẻ một chút, cách để triển khai chúng.
### 3.1. Cảnh giới: tạo custom view.
- Ví dụ vẽ Emoji trên, tại một bài viết mà tôi tham khảo (tôi sẽ ném nguồn cuối bài viết này) thì họ gọi ví dụ 1 là level 1 của việc sử dụng custom view :D. Tại đây, bài viết đề cập đến Canvas và Paint.
    + Canvas là một đối tượng, được xem như một mặt phẳng 2D tuyệt vời để vẽ các hình dạng toán học cơ bản ( hình tròn, elip, tam giác, ... các kiểu). => like a piece of paper :)
    + Paint là một class cung cấp cho chúng ta thứ để vẽ lên Canvas. => like a pen :)
    
    Giờ tôi sẽ quẩy quả Emoji mặt mĩm cười nha :D:
        
    + Bước 1: Tạo một class cho custom view. Trong thực tế, khi ta muốn vẽ một hình tròn, ta cần xác định 2 yếu tố: thứ nhất là vị trí tâm, thứ hai là bán kính. Trong android, tờ giấy canvas mà chúng ta sẽ vẽ lên giống như một mặt phẳng tọa độ, với gốc tọa độ O(0;0) nằm ở góc trái trên cùng của màn hình, trục hoành (Ox) có chiều dương từ trái qua phải, còn trục tung (Oy) lại có chiều dương từ trên xuống dưới. Do đó, việc xác định vị trí tâm của hình tròn trên android, chính là xác định cặp giá trị (x, y) trên mặt phẳng tọa độ canvas mà tôi vừa nói.
       
       ```kotlin
        class CuoiMimView : View {
            constructor(context: Context) : super(context) { init(context, null) }
            constructor(context: Context, attributeSet: AttributeSet?) : super(context, attributeSet) { init(context, attributeSet) }
            
            // Khai báo các cây bút ra
            val pen1 = Paint()
            val pen2 = Paint()
            
            private fun init(context: Context, attributeSet: AttributeSet?) {
                // Tôi sẽ dùng cây bút thứ nhất để vẽ hình tròn màu vàng :v
                pen1.color = resources.getColor(R.color.yellow)
                
                // Cây bút thứ 2 là để vẽ đường, đường tròn màu đen
                pen2.color = resources.getColor(R.color.black)
                pen2.style = Paint.Style.STROKE // Chọn kiểu vẽ là STROKE (tự gu gồ xem nó là gì nha)
                pen2.strokeWidth = 80f // set độ rộng cho đường vẽ
            }
            
            /**
            * ok, sau khi khởi tạo xong 2 cây bút, giờ chúng ta tiến hành vẽ.
            * Method drawCircle() including 4 parameters: hoành độ tâm, tung độ tâm, bán kính, bút vẽ (Paint).
            **/
            
            override fun onDraw(canvas: Canvas?) {
                super.onDraw(canvas)
                // vẽ hình tròn màu vàng trước nè
                canvas?.drawCircle(520F, 520F, 500F, pen1)

                // sau đó vẽ hai mắt :D
                canvas?.drawCircle(300F, 400F, 100F, pen2)
                canvas?.drawCircle(740F, 400F, 100F, pen2)

                /** 
                * Vẽ miệng mĩm cười, cái này khá phức tạp.
                * Muốn hiểu tại sao, phải hiểu về kỹ thuật vẽ đường cong. (Key: Bezier curve)
                * Ở đây tôi sẽ vẽ đường cong bậc 2 nha.
                **/
                val path = Path()
                path.moveTo(260F, 760F)
                path.cubicTo(520F, 900F, 520F, 900F, 780F, 760F)
                canvas?.drawPath(path, pen2)
            } 
        }
        ```
        
    + Bước 2: Là ném lên file XML như này: ![image.png](https://images.viblo.asia/8ed12d4a-7ab6-492b-860c-e48b841291e9.png)
        
        And finally, here is my results:
        <img src="https://images.viblo.asia/aeb7d6f6-1418-4698-ba20-ab06b4aba0fc.png" />
        
        Chỉ với 2 bước cơ bản, chúng ta đã tạo ra được 1 custom view. Nhìn cũng không được mượt mà lắm nhỉ, các bạn đọc có ý tưởng gì hay ho thì comment cho tôi biết luôn nhé. :D

### 3.2. Cảnh giới: làm việc với AttributeSet để custom view linh động.
- Cuộc sống thì luôn chứa đầy những cú lừa của đấng sáng thế; ngay cả khi ta trên lớp học được dạy rằng 1 + 1 = 2, thì khi đi thi, bài thi sẽ vả vào mặt chúng ta phép toán kiểu 69 + 96 = ?. Custom view cũng thế, thứ mà custom view sẽ vả vào mặt chúng ta là sự linh động, và đó cũng là lý do vì sao chúng ta phải "farm quái" để lên lv2 này :D.
- Hãy nhìn vào thẻ TextView sau trên XML:
![image.png](https://images.viblo.asia/f6ea1c03-b123-4155-b8fc-5d34258fa5c3.png)
So với thẻ CuoiMimView của chúng ta, thẻ TextView linh động hơn rất nhiều, chúng ta có thể gọi đối tượng ra, chỉnh sửa giá trị các thuộc tính theo ý muốn để thỏa mãn được bài toán đề ra.
- Tôi hỏi các bạn, chẳng hạn bây giờ tôi muốn thay đổi màu của Emoji trên thì phải làm như nào? Vào code để sửa à ? Noooo ..., thế tôi muốn có 2 Emoji màu sắc khác nhau thì sao? Vào code để sửa tiếp? Sờ top pừ... :v
- Như các bạn thấy, để thỏa mãn nhiều yêu cầu khác nhau, thì custom view cần phải có tính linh động, đó cũng chính là thứ sẽ giải quyết triệt để vấn đề tại ví dụ 2 mà tôi đã nói ở đầu. Vậy chúng ta cần triển khai như nào? Tiếp tục ví dụ 1 nhé:
    + Bước 1: Tại package <img src="https://images.viblo.asia/04a8617c-a2b0-479e-8a01-7fe5d93ed4bd.png" /> tôi sẽ tiến hành tạo một ![image.png](https://images.viblo.asia/3735dfa4-02cc-4b8f-bfcf-1962224159ee.png) với tên là attrs.
    + Bước 2: Định nghĩa thuộc tính. Tôi sẽ tiến hành viết thêm thuộc tính "faceColor" với định dạng là color vào file attrs.
    
    ![image.png](https://images.viblo.asia/413ad6f6-3b7c-4ccc-8ca3-7ca3f26253d3.png)
    
    + Bước 3: Hiện thực hóa thuộc tính. Bước 2 chỉ đơn giản là khai báo tên thuộc tính, kiểu thuộc tính. Tại bước 3 này, chúng ta sẽ tiến sâu hơn, chỉ định sự tác động của thuộc tính lên đối tượng ra sao.
    
    ``` kotlin
    // Giá trị mặc định
    val FACE_COLOR = resources.getColor(R.color.yellow)

    private fun init(context: Context, attributeSet: AttributeSet?) {
        /**
         * Khai báo biến attrs.
         * Biến attrs này sẽ chứa một TypedArray, TypedArray này chứa giá trị của các thuộc tính
         * trong tập hợp mà chúng ta liệt kê trong file attrs.
         * */
        val attrs = context.obtainStyledAttributes(attributeSet, R.styleable.CuoiMimView)

        /** 
          * Tác động giá trị mà thuộc tính faceColor nhận được vào pen1, nếu 
          * không chỉ định giá trị cho faceColor thì pen1.color sẽ nhận giá trị
          * mặc định là FACE_COLOR.
          * */
        pen1.color = attrs.getColor(R.styleable.CuoiMimView_faceColor, FACE_COLOR)
        ...
        
        /**
        * Đừng quên method recycle() đặt ở cuối cùng sau khi dùng attrs xong.
        * recycle() có tác dụng như một ta đóng dấu xác nhận cho phép GC thực thi nhiệm vụ 
        * thu gom rác. Và sau khi recycle() được gọi, chúng ta must not ever touch vào attrs nữa. :v
        * */
        attrs.recycle()
    }
    ```
    
    Sau khi thực hiện 3 bước trên và Re-build prj. Ta cùng nhau xem thành quả: 
    
    ![image.png](https://images.viblo.asia/dd5192fd-42e2-4a4f-a982-4eb165810cba.png)
    
    ![image.png](https://images.viblo.asia/f9f18efa-278e-46bb-aceb-3ac21bd0b60e.png)
    
    ![image.png](https://images.viblo.asia/ee3e7371-4b5e-460e-be82-2c5ac27d2758.png)
    
    Ỏ :).
    
- Ngoài chỉ định màu sắc, các bạn có thể đẻ thêm bất cứ thuộc tính nào các bạn muốn, và tiến hành định nghĩa nó. Chúc các bạn thành công nhé. :D
    
### 3.3. Cảnh giới: tìm hiểu view life-cycle.
- Viết đến đây cũng đã vượt qua phạm vi đàm đạo của topic này, nên mình xin phép dừng.
- Nếu các bạn muốn tìm hiểu tiếp cảnh giới này, vậy mình sẽ đặt link tham khảo <a href="https://proandroiddev.com/android-custom-view-level-3-81e767c8cc75"><b> ở đây</b></a>.

## Cuối cùng
- Sau bài viết này, các bạn đã có thể triển khai được các custom view rồi.
- Nếu có ý kiến, các bạn hãy mạnh dạn đóng góp cho mình nhé. Thân ái! :D