## Understanding Vsync ? 
Trong bài viết này mình sẽ cùng tìm hiểu về  `Vsync`  để có thể cải thiện được performance (khía cạnh hiển thị) của ứng dụng tránh các hiện tượng như junk, stutter, hitching,.. thì trước tiên ta cần hiểu được **cách thức mà phần cứng (hardware) render ra hình ảnh lên màn hình**. Lúc này chúng ta sẽ đả động đến 1 thuật ngữ (term) là 
`Vsync`. Nhưng khoan hãy tìm hiểu về `Vsync` là cái "hếch" gì thì trước tiên ta nên tìm hiểu được 2 term đơn giản hơn là `Refresh Rate` và `Frame Rate`.

**1. Refresh Rate**



>its represents how many times a screen update(draw a new image) its display per second

Thuật ngữ đầu tiên là tượng trưng cho việc 1 số lần mà màn hình cập nhật hiển thị của nó trong thời gian 1 giây và giá trị này được specified hay do lường bằng Hz `hertz` . Đây là giá trị mặc định dựa trên phần cứng của chúng ta.

**2.Frame Rate** 

![](https://images.viblo.asia/cafcea31-897e-4591-b00d-1c4b22929b86.gif)



> this term represents for how many times GPU can draw a frame per second 

Hãy nhớ những cuốn sách lật nhỏ thú vị mà một tập giấy có hình ảnh trên mỗi trang và khi bạn lật nhanh các trang, hình ảnh sẽ xuất hiện để sinh động và di chuyển. Mặt khác, đây cũng chính là cách video của chúng ta hoạt động.
Nó là một chuỗi các hình ảnh tĩnh mà khi được xem theo thứ tự ở một tốc độ nhất định, chúng sẽ có dạng chuyển động. Mỗi hình ảnh đó được gọi là “frame”. Và nó được đo lường bằng đơn vị là "frame per second" `fps` chắc chắn thuật ngữ này không còn xa lạ gì với chúng ta nữa

![](https://images.viblo.asia/887f7803-9cda-42ef-b4ce-a15229aaf26a.gif)

Đến đây có thể 1 số bạn sẽ bị lú con cú khi phân biệt giữa 2 khái niệm trên vậy nên mình sẽ giúp các bạn tổng kết lại:
![](https://images.viblo.asia/15eaae49-497c-4385-9f93-74f61626807e.jpg)
`Frame rate` (tốc độ khung hình) được tạo ra bởi sự kết hợp giữa cạc đồ họa (GPU) và bộ xử lý (CPU) của bạn, vì vậy về cơ bản nó là số khung hình (frame) mà hệ thống có thể tạo ra trong một giây, trong khi `refresh rate`
 ( tốc độ làm mới) là tốc độ mà màn hình có thể làm mới hoàn toàn màn hình của nó.
     Đến đây thì ta cũng có thể được 1 phần nào đó nguyên nhân gây ra hiện tượng "giật" , "lag" mà chúng ta hay gặp phải mỗi khi chơi game, hay làm những tác vụ nặng. Nguyên nhân chính của hiện tượng giật, lag chính là do sự chênh lệch giữa 1 tỷ lệ `refresh rate` và `frame rate`. Để 1 hình ảnh có thể hiển thị được trên màn hình của bạn một cách mượt mà thì 2 ông `refresh rate` và ông `frame rate` này phải làm việc cùng nhau một cách **đồng bộ**.
     
     
Đầu tiên CPU hoặc GPU sẽ lấy dữ liệu sau đó tính toán sau đó vẽ nó ra rồi phần cứng sẽ giúp chúng ta đưa nó ra màn hình (chúng ta sẽ không đi sâu hơn vì chỉ cần đây không phải là mục đích của bài viết) và điều này được lặp đi lặp lại trong suốt vòng đời của ứng dụng hay chương trình. Nếu trong quá trình này sự kết hợp giữa 2 ông `refresh rate` và `frame rate` không  **đồng bộ** 
![image.png](https://images.viblo.asia/3e1b63cd-a366-4773-b232-50139af25660.png)
Ví dụ: Cùng trong vòng 1s nhưng "frame rate" đã xử lý xong nhưng "refresh rate" lại chưa kịp update cái frame đó lên trên màn thì sẽ gây ra hiện tượng đè frame sau lên frame trước (hoặc ngược lại) hay còn được gọi với những cái tên thân thương "giật", "lag",... 

Vậy tóm lại việc để tránh ứng dụng của chúng ta "mượt hơn" thì chúng ta nên phải tìm cách để đảm bảo được 2 ông `refresh rate` và `frame rate` này hoạt động 1 cách **đồng bộ**. Và từ đây chúng ta mới cần tìm hiểu đến khái niệm `Vsync`.

**3.Vsync**

>VSync, or vertical sync, is a graphics technology that synchronizes the frame rate with refresh rate of the monitor

`VSync` là viết tắt của vertical synchronization, giải thích một cách dễ hiểu: VSync có nghĩa là đồng bộ hóa FPS (số khung hình trên giây) của game đang sử dụng với Refresh Rate (Tốc độ làm mới) của màn hình.

Đấy là cơ bản khái niệm về `vsync` nhưng nó thực sự hoạt động như thế nào ? Mình chưa có nhiều thời gian để đào sâu hơn về `vsync` nhưng dựa vào tìm hiểu sơ qua của mình thì mình hiểu `vsync` như sau:

Về cơ bản là người ta sử dụng cách lưu frame của GPU vào 2 buffer memory là `Back Buffer` và `Frame Buffer`

**Note:** 
Mình muốn giải thích sơ qua về buffer memory cho bạn nào chưa biết nếu biết rồi bạn có thể lướt qua phần này: 
>Buffer memory, hay còn gọi là bộ nhớ đệm là một phần của bộ nhớ máy tính được dành làm nơi lưu giữ tạm thời cho dữ liệu được gửi đến hoặc nhận từ một thiết bị bên ngoài, chẳng hạn như ổ đĩa cứng (HDD), bàn phím hoặc máy in
>
>Ý nghĩa ban đầu của bộ đệm là một thiết bị giống như tấm đệm để giảm chấn động từ sự tiếp xúc của hai vật thể. Bộ đệm trong hệ thống máy tính thường nằm giữa hai thiết bị có tốc độ xử lý dữ liệu khác nhau hoặc được sử dụng khi có sự khác biệt về Tương tự như vậy, một bộ đệm trong máy tính đảm bảo rằng dữ liệu có một nơi nào đó để đi, tức là, vào bộ đệm tạm thời cho đến khi đích cuối cùng của nó trở nên khả dụng.
>Tóm lại có thể hiểu qua rằng nó là bộ nhớ tạm thời  :D

Khi mà GPU xử lý xong 1 frame thì frame đó sẽ được lưu vào `Back Buffer` đồng thời nó sẽ được copy vào `Frame Buffer` sau đó khi mà GPU xử lý frame khác thì nó sẽ xóa frame ở `Back Buffer` đi và lưu frame tiếp theo và đồng thời `Frame Buffer` vẫn giữ nguyên frame đã được copy từ `Back Buffer` trước đó. Và khi màn hình update thì nó sẽ lấy frame ở `Frame Buffer`  trong khi frame ở trong `Back Buffer` thì vẫn tiếp tục được xử lý. Và đến đây việc làm của ông `Vsync` chính là đồng bộ việc copy từ `Back Buffer` sang `Frame Buffer` nếu quá trình refresh của màn hình đang diễn ra. Nếu `Frame Rate` > `Refresh Rate` thì k có gì để bàn nhưng ngược lại nếu `Frame Rate` <`Refresh Rate` thì chắc chắn ứng dụng của bạn sẽ bị giật lag. Vậy để có thể tránh được việc giật lag thì chúng ta cần tránh việc làm `Frame Rate` <`Refresh Rate`. Cùng tìm hiểu trong các phần sau nhé :D