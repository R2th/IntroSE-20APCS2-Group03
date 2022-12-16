Xin chào các bạn, bài viết trước thì mình cũng giới thiệu đến các bạn những khái niệm về mô hình BPMN rồi, các bạn có thể tham khảo bài viết của mình tại đây. Trong bài viết lần này, mình muốn chia sẻ với các bạn tiếp về những thành phần cơ bản trong BPMN. Nào chúng mình cùng nhau đi tìm hiểu những khái niệm này nhé.


![](https://images.viblo.asia/03abb751-ec86-4331-a784-2951dc4c7f26.jpeg)

# Các thành phần cơ bản trong BPMN
![](https://images.viblo.asia/e97287c3-ff5d-42af-9c76-07ae34c75e76.png)
Trong BPMN thật sự có rất nhiều ký hiệu, các bạn sẽ phải mất mốt thời gian để tìm hiểu được hết ý nghĩa của các ký hiệu. Tuy nhiên, chúng ta có thể phân loại các biểu tượng sơ đồ BPMN thành 4 nhóm chinhs: `flow objects`, `connecting objects`, `swimlanes` và `artifacts`.
# Actions
Thành phần này dùng để mô tả công việc. `Actions` được chia làm 2 loại chính
* Task: đây là loại hoạt động không thể chia nhỏ hơn được nữa
* Sub-process: đây là hoạt động có thể chia nhỏ thành các hoạt động nhỏ hơn hay các hoạt động thành phần.

![](https://images.viblo.asia/3d7970e0-a392-4ce0-91a0-a63469f19f48.png)

## Task
`Task` mô tả hành động trong một xử lý mà không thể chia nhỏ hơn hay chi tiết hơn. Task có thể chia làm 2 loại chính :
* Loop: tác vụ lặp
* Compensation: tác vụ cho phép quay lui về trạng thái ban đầu nếu tác vụ xử lý thất bại.
* Multiple Instance : tác vụ xử lý nhiều công việc cùng một lúc (xử lý song song).
==> Cả 3 loại này có thể kết hợp qua lại lẫn nhau

![](https://images.viblo.asia/41131285-654e-444f-9a48-a27d815b641f.png)

Ngoài ra, `Task Type` cũng có một số ký hiệu bổ sung cho các tác vụ. Dưới đây là bảng mô tả :


| Task Type | Mô tả |
| -------- | -------- |
| ![](https://images.viblo.asia/adfbaa97-85a1-4dc8-900b-eaa2d9ef62bf.png)| Task  này được thực hiện bằng service của hệ thống hoặc từ một web service khác.|
|![](https://images.viblo.asia/e475ddc5-c514-4b1c-a3aa-22df479fc2f4.png)|Task gửi và nhận message cho participants bên ngoài có liên quan đến quy trình xử lý.|
|![](https://images.viblo.asia/3fd2b354-3606-46f8-bd23-109af4949a8a.png)|Task do con người thực hiện có sự trợ giúp của phần mềm ứng dụng.|
|![](https://images.viblo.asia/4d666d3f-48d9-4c86-b7ff-94b4514fff31.png)|Task này ý muốn nói cung cấp đầu vào cho Business Rule Engine và sau đó lấy ra kết quả sau một quá trình.|
|![](https://images.viblo.asia/11771df5-789d-404e-8d38-09a22c96016f.png)|Task này được thực hiện bởi một business process engine, nó định nghĩa ra một `script` mà engine có thể thông dịch. Khi bắt đầu thì engine sẽ thực thi script, task hoàn thành khi chạy xong script.|
|![](https://images.viblo.asia/32676135-66a5-4fa0-83a6-f62d402576b0.png)|Task này được thực thi mà không cần bất cứ một process excecution engine hay application nào hỗ trợ. Hay nói cách khác là task này do con người thực hiện mà không có sự trợ giúp của phần mềm ứng dụng nào.|
Đây là một số ví dụ 
![](https://images.viblo.asia/873f1a0a-5cf6-4bbd-879c-d6db5db4e81b.png)

### Loop Task
Là tác vụ mô tả công việc được thực hiện lpawj lại nhiều lần (chúng mình lưu ý điều kiện dừng).

![](https://images.viblo.asia/f214fc0f-bab7-4072-9f31-2dcfffa57d3c.png)
Tác vụ thu thập thông tin sẽ liên tục nhận thông tin từ message trong vòng 2 ngày. Sau 2 ngày  kết thúc thì tác vụ này sẽ kết thúc và chuyển sang tác vụ tổng hợp báo cáo do nhân viên thực hiện có sự trợ giúp của phần mềm.
### Compensation Task
`Compensation Task` là các tác vụ mô tả sự khôi phục lại trạng thái trước đó.

![](https://images.viblo.asia/7fe99542-1864-42ba-9838-928ca70b5d1a.png)


Ví dụ trên có ý nghĩa là nếu task đặt vé chuyến bay và đặt phòng khách sạn thành công thì kết thúc đặt chỗ, ngược lại nếu thất bại thì sẽ quay lại trạng thái ban đầu (trả lại số vé và số phòng đã đặt)

### Multiple Instance
`Multiple Instance` là tác vụ mô tả các công việc được thực hiện song song với nhau.
## Sub-Processes
`Sub processes` là loại xử lý bên trong còn có thể chia nhỏ và bao gồm các xử lý hoạt động nhỏ bên trong. Thông thường, chúng ta tạo nhiều BPMN diagram để giao tiếp nhiều quy trình với những cái còn lại. Để tạo điều kiện communicate hiệu quả, chúng ta thực sự không muốn một quy trình business của chúng ta quá phức tạp. Bằng cách sử dụng `sub-processes`, chúng ta có thể chia quy trình phức tạp này thành nhiều mức độ, ý là khi nói đến sub-process thì bạn có nhìn sang cái này để xem process nó như nào. Hay các nói khác cách này sẽ không làm diagram của chúng ta rối mắt, mang lại hiệu quả cho người nhìn vào diagram.

Nó có thể được chia làm 4 loại chính
* Loop
* Compensation
* Multiple Instance
* Ad Hoc
Trong đó 3 loại đầu thì có ý nghĩa giống như mình đã trình bày ở phần Task. Sub process có thể sử dụng cùng với các ký hiệu để bổ sung thêm ngữ nghĩa như mình đã trình bày ở phía trên.

![](https://images.viblo.asia/df22f142-977b-4e08-9196-d2035f44c6f1.png)
# Event
`Event` (sự kiện) là các loại sự kiện xảy ra trong quá trình thực hiện tiến trình. Những event này sẽ tác động đến luồng thực thi của tiến trình.

`Event` được mô tả bởi một hình tròn, trống ở giữa, cho phép thêm vào các ký hiệu mô tả các loại sự kiện xảy ra khác nhau.

![](https://images.viblo.asia/44b3f383-8562-4477-a3bf-1342b7c1bb10.png)

**Có 2 cách sử dụng event:**

`Normal Flow`: Đặt giữa 2 action, là điều kiện để thực hiện action tiếp theo
![](https://images.viblo.asia/4be9bf38-df0f-4416-a52d-834916cfe16f.png)

`Attached to Boundary`: gắn với phạm vi của 1 action, được sử dụng trong việc quản lý lỗi, exception.

![](https://images.viblo.asia/f3a3e11a-2de6-40b1-a3fe-5aae6dc6b83a.png)

## Phân loại event
Chúng ta có thể căn cứ vào thời điểm tác động hay xảy ra sự kiện vào process thì chia làm 3 loại event như sau:
* Start Event
* Intermediate Event
* End Event

![](https://images.viblo.asia/44b3f383-8562-4477-a3bf-1342b7c1bb10.png)
Chúng ta có thể hiểu như sau: Event bắt đầu và hầu hết các event trung gian đều có một "trigger" đi kèm, xác định nguyên nhận nào gây ra event đó. Có rất nhiều nguyên nhân có thể kích hoạt event nào đó. Trong khi đó event end được xem như là kết quả của một chuỗi các action.
### Event Start


| Ký hiệu| Mô tả |
| -------- | -------- | 
| ![](https://images.viblo.asia/4e24c4b5-f3ff-43d5-943e-fdb565dcc74d.png)|None: bắt đầu process xử lý không cần điều kiện kích hoạt.|
|![](https://images.viblo.asia/039386ab-ad24-4749-9f1f-3dfc56efde69.png)|Message: process được kích hoạt khi có thông điệp được gửi đến email, fax, phone,...|
|![](https://images.viblo.asia/f47d387d-79fb-4b84-889f-07304b0f99b3.png)|Timer: process được kích hoạt sau khoảng thời gian xác định.|
|![](https://images.viblo.asia/1d633a6d-cee1-4ad5-b28a-2f2aa309c240.png)|Rule / Conditional: process được kích hoạt theo điều kiện nào đó (vd như khi có giá 23.3 thì mới khớp lệnh mua.)|
|![](https://images.viblo.asia/7b9ef376-a6b3-45a3-b5cd-a120f6245e2d.png)|Multiple: process có thể được kích hoạt từ ít nhất một hay nhiều event khác nhau.|
### Intermediate Event
Event này xảy ra giữa start event và end event.

Giúp xác định những điều kiện làm gián đoạn hoặc trì hoãn process xử lý nghiệp vụ.



| Ký hiệu | Mô tả |
| -------- | -------- |
| ![](https://images.viblo.asia/22b42bb0-d03c-4ad8-804d-77dd8777a8d4.png)|None: minh họa quá trình chuyển trạng thái xử lý.|
|![](https://images.viblo.asia/a79a4e3e-f88c-4e19-9e85-bafa79addac4.png)|Msg 'catch': event được kích hoạt khi nhận được thông điệp.<br/> Msg 'throw': được kích hoạt khi gửi thông điệp đi.|
|![](https://images.viblo.asia/202a9190-8f27-448e-bc30-d906c85c2a66.png)|Timer: event được kích hoạt để hoãn xử lý sau khoảng thời gian, sau đó sẽ thực hiện tiếp action tiếp theo.|
|![](https://images.viblo.asia/ff4387a4-c98a-4d37-afc7-7c21b2444e19.png)|Rule: event được kích hoạt khi điều kiện đúng.|
|![](https://images.viblo.asia/74773922-47d4-49a2-b326-c7888a8f9b5c.png)|Multiple 'catch': có thể nhận nhiều trigger kích hoạt xử lý. <br> Multiple 'throw': có thể gửi đi nhiều trigger kích hoạt xử lý.|
|![](https://images.viblo.asia/8da7fc08-b38a-4f7f-9c7f-fd784cf0f2d5.png)|Link: chuyển sang xử lý khác 'go-to'|
|![](https://images.viblo.asia/9f045a4b-6e74-44ae-bad3-8ae14e7fc487.png)|Compensation(catch-throw): event được kích hoạt khi có lỗi mà muốn phục hồi lại trạng thái trước đó.|
|![](https://images.viblo.asia/d570bd72-023e-4fb7-9610-8bb158376dd3.png)|Error: event được khi hoạt khi gặp lỗi.|
|![](https://images.viblo.asia/1d00847c-7b2f-44a0-bfd1-d11dcd853f9c.png)|Escalation: event được kích hoạt để giải quyết một rằng buộc nào đó không được thỏa mãn trong quá trình xử lý.|

### End Event


| Column 1 | Column 2 |
| -------- | -------- |
|![](https://images.viblo.asia/3f6b07c8-4f54-4822-b64b-9aeaac636103.png)|None: kết thúc quy trình xử lý.|
|![](https://images.viblo.asia/f355a351-d589-40b3-8449-8683f60ea9ee.png)|Message: Gửi kết quả cho đối tượng tham gia thông điệp và kết thúc process.|
|![](https://images.viblo.asia/7b4c9004-fd9a-49d5-a054-017a702f4894.png)|Error: thông báo lỗi và kết thúc process.|

# Gateways
`Gateway` là đối tượng điều khiển dùng để trộn hoặc phân chia các luồng thực thi. Vì vậy nó sẽ quyết định việc rẽ nhánh, trộn,... các luồng tiến trình với nhau tùy thuộc vào loại hành vi được chỉ định.

![](https://images.viblo.asia/c60d503f-ced3-41bf-ad6b-5f224df33d00.png)
## Phân loại
### Parallel gateway (AND)
Cái này ý muốn làm nhiệm vụ như sau: tất cả các action được xử lý song song, tiến trình được tiếp tục khi tất cả được hoàn tất.
* Fork: chia action ra làm nhiều nhánh để thực hiện song song.
* Join: sau khi thực hiện song song các nhánh thì thực hiện join để đi đến kết quả cuối cùng.
Đây là một ví dụ
![](https://images.viblo.asia/304b16c2-7e84-4f8b-aba9-78d882ffe88c.png)

Một order để đến tay được người tiêu dùng thì ở đây chúng ta sẽ chia làm 2 luồng chạy song song đó chính là Ship bưu phẩm cho người tiêu dùng và thực hiện thanh toán (có thể là online hoặc giao hàng xong mới thanh toán). Khi người tiêu dùng nhân được hàng và thanh toán xong thì lúc đó mới kết thúc order. 
### Exclusive gateway (XOR)
Một trong các action sẽ được thực thi. Việc lựa chọn phụ thuộc vào điều kiện logic tại Gateways.

Chia làm 2 loại :
* Data-based
* Event-based
![](https://images.viblo.asia/87f0bcfa-57b5-4235-84ce-da701f9c83c6.png)

### Inclusive gateway (OR)
Một vài action sẽ được lựa chọn thực thi, bao hàm chức năng cả `parallel` và `exclusive` gateways.

![](https://images.viblo.asia/9f1cf6c3-83a0-467e-9318-6dec1d063b08.png)

# In conclusion
Vậy qua đó mình đã giới thiệu với các bạn được `Actions`, `Events` và `Gateways`. Mong răng nó giúp ích cho các bạn trong quá trình tìm hiểu về BPMN. Bài tiếp theo mình sẽ chia sẻ tiếp về chủ đề này nhé. Cảm ơn các bạn đã đọc bài viết của mình.
# Reference
https://www.visual-paradigm.com/guide/bpmn/