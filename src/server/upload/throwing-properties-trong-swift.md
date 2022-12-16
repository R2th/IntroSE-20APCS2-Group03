***Swift 5.5*** cho phép chúng ta ***throw error*** ngay cả khi define ***computed properties***, chứ không chỉ riêng ở ***function*** nữa. 

### Cách define throwing properties trong Swift

Để define ***throwing properties***, chúng ta chỉ cần sử dụng keyword ***throws*** như sau:

<img src="https://images.viblo.asia/02feb054-6ea4-4be2-b431-6f17bac63722.jpg" />

Vì việc khởi tạo ***Data*** có thể ***throw error***, nên bằng việc define ***computed properties*** của chúng ta ở dạng throw, chúng ta có thể ***catch error*** này.

Nếu không có tính năng mới này, chúng ta sẽ phải define ở dạng ***method***:
<img src="https://images.viblo.asia/8b988c63-ddae-4bb5-8fce-eaf46775f34d.jpg" />


### Sử dụng custom-defined errors

Chúng ta có thể throw ***custom-defined errors***. Ví dụ:
<img src="https://images.viblo.asia/bd7c120c-c800-467d-a009-5d30b79cebc8.jpg" />

Trong ví dụ trên chúng ta define 1 ***custom error*** là *imageNotFound*. Nếu url chúng ta truyền vào không tồn tại trong cache thì sẽ throw error này.

### Throwing setter cho computed properties
Tiếc rằng hiện tại chúng ta sẽ không thể define ***throwing setter*** cho ***computed properties***. Nếu chúng ta làm vậy thì sẽ thấy báo lỗi sau:
<img src="https://images.viblo.asia/2196b6fe-0e1e-4baf-90b1-417da38a6487.png" />

Giới hạn này tồn tại để ***đơn giản hoá việc implement throwing properties.***


### Nên dùng throwing property hay throwing method?
Cũng không có một nguyên tắc cố định nào cho việc quyết định chọn ***computed properties*** hay ***method***. 

Chúng ta nên tâm niệm việc sử dụng ***computed properties*** hay ***method*** đều là để tăng tính dễ đọc cho code của chúng ta. Như vậy, chúng ta nên quyết định dựa trên việc mỗi loại này ***ám chỉ điều gì***.

Thường thì ***method*** sẽ tốt hơn trong trường hợp ***cần phải tính toán nhiều***, vì method thường ám chỉ việc "cần tính toán", và có thể sinh ra ***side effect***, trong khi ***computed properties*** thường áp dụng cho trường hợp chỉ cần ***format data đơn giản***. 


Nguồn: https://www.avanderlee.com/swift/throwing-properties/