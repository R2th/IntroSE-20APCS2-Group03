## Tại sao lại có bài này ?

Hôm trước, có một anh bạn của mình gặp một cái incident khá là vui: a ý mới thử tìm hiểu và sử dụng AWS cho một dự án cá nhân. Và sau 1 hôm đầu tiên thử nghịch 1 vài tính năng của AWS (EC2 ...), Amazon charge a ấy 500$.

***

Với các bạn mới bắt đầu tìm hiểu tới các dịch vụ Cloud như của Amazon hay Google, thì một trong những vấn đề mà mọi người hay quan tâm đầu tiên đó là chi phí. Vì vậy, bài viết của mình sẽ có nội dung về chủ đề này: Làm thế nào để bật tính năng theo dõi và cảnh báo Billing Alarm trên Amazon Web Service.

## Bật tính năng theo dõi và thông báo Billing Alarms

Trước khi tiến hành cài đặt Billing Alarm, thì ta sẽ phải làm một việc, đó là cho phép (enable) AWS theo dõi billing của ta.

Trước đây, khá là dễ để tạo Billing Alarm trên AWS. Tuy nhiên, theo thời gian, số lượng các service của AWS tăng lên, đồng thời với đó là việc tạo Billing Alarm trên AWS cũng trở nên rắc rối hơn chút.

Đầu tiên, đăng nhập vào tài khoản AWS của bạn. Chú ý là ở menu phía trên, khi click vào sẽ có 1 option có nhãn `My Billing Dashboard`

![](https://images.viblo.asia/a263fd54-256d-4741-aa03-8b7c3a5476de.png)

Click vào. Tại trang tiếp theo, bạn có thể theo dõi được tổng thể về chi phí mà mình đã sử dụng trên các dịch vụ của AWS. (Vì con account này của mình vẫn đang trong thời gian xài Free Tier nên là về cơ bản thì không tốn chút tiền nào)

![](https://images.viblo.asia/17818a38-127c-4ab3-978b-0a726b96b297.png)

Nhìn về sidebar bên trái, để ý sẽ thấy mục `Billing preferences` -> click tiếp vào đây.

Ở trang này thì ta có thể thấy 1 vài option:

- Receive PDF Invoice By Email: nhận hóa đơn thanh toàn tiền trên AWS hàng tháng qua Email.
- Receive Free Tier Usage Alerts: Như đã nói ở trên thì cái account này của mình đang trong thời gian sử dụng Free Tier. Và cái Tier này thì cũng có giới hạn - về tài nguyên cũng như thời gian sử dụng - đối với từng service của AWS. Vì vậy mà nếu như bạn cũng đang sử dụng cái Tier này và không muốn sử dụng quá giới hạn mà AWS cấp cho, thì ta cũng có thể lựa chọn option này. Về cơ bản thì khi chọn option này, AWS sẽ gửi mail thông báo - một khi mà bạn đã dùng gần hết (hoặc vượt quá) tài nguyên mà Free Tier cung cấp - vào một địa chỉ mail không phải địa chỉ mail đăng kí account AWS.
- Receive Billing Alerts: Đây là cái mà chúng ta đang quan tâm đến ! Khi lựa chọn option này, ta có thể cài đặt việc theo dõi tự động các tài nguyên mà ta đang dùng trên AWS, cũng như tự động thông báo khi việc sử dụng tài nguyên đã đến một ngưỡng nhất định.

> Chú ý: đã bật cái option này rồi là không thể tắt được !

Click chọn và ấn `Save preferences`.

![](https://images.viblo.asia/8e5d9831-b34c-483d-9728-f2d4d76b435a.png)

Đã có gì xảy ra chưa ?

Chưa có gì cả ! Việc thay đổi ở trên chỉ là ta đã bật tính năng theo dõi Billing trên AWS mà thôi, chứ ta vẫn chưa cài đặt việc theo dõi đó. Việc này được thực hiện trên một service của AWS có tên là `CloudWatch`.

## Cài đặt theo dõi và thông báo với CloudWatch

![](https://images.viblo.asia/611a9a2a-5d5c-47d5-9c89-f1225f115a12.png)

> CloudWatch - đúng với tên gọi của nó (`Watch your Cloud`) - là dịch vụ của AWS cho phép theo dõi tất cả các dịch vụ khác của AWS mà ta dùng, cũng như các hoạt động khác của ta trên AWS.

Khi vào giao diện của CloudWatch, ta có thể thấy đươc rất nhiều loại biểu đồ ở đây.

![](https://images.viblo.asia/c091f54e-8081-4c2a-ac51-ab2952582cd4.png)

Để ý về sidebar bên trái: Cái mà hiện giờ ta đang cần quan tâm đến đó là billing, vì vậy hãy click tiếp vào option này: `Billing`.

Có chuyện gì xảy ra nhỉ ?

![](https://images.viblo.asia/b3b0e3bb-58ad-4283-a20b-fdab580089da.png)

Vậy tức là ở thời điểm hiện tại thì CloudWatch cung cấp tính năng hiển thị billing data cũng như alarm - tuy nhiên chỉ có ở Region `US East (North Virginia)` mà thôi. Vì account hiện tại của mình đang xài region `Singapore`, nên mình sẽ cần phải chuyển region sang Region `North Virginia`.

> Đừng lo vì việc phải đổi Region: như thông báo đã nói thì việc thực hiện monitor từ CloudWatch sẽ bao phủ được tất cả các service của bạn - bất kể nó đang được bật và sử dụng ở region nào :)
 
Ok, chuyển sang region `North Virginia`, sau đó click chọn lại vào `Billing`.

![](https://images.viblo.asia/0c129516-8531-481e-80a4-8758bd0a2197.png)

Ở trang này sẽ liệt kê ra danh sách các Billing Alarm mà hiện thời bạn đang dùng (ở đây thì mình đang có sẵn 1 cái rồi). Giờ ta sẽ thử tạo một cái mới xem : click vào `Create Alarm`.

### Create Alarm - Step 1 - Metric

Ở bước một này, CloudWatch sẽ bắt ta lựa chọn `Metric`

![](https://images.viblo.asia/9ac0a172-e5c3-43a8-a853-869d66b77232.png)

*** 
Từ từ chút - 1 phút dành cho bạn nào chưa biết khái niệm [`Metric` trong AWS là gì](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Metric):

> Metrics are the fundamental concept in CloudWatch. A metric represents a time-ordered set of data points that are published to CloudWatch. Think of a metric as a variable to monitor, and the data points as representing the values of that variable over time. For example, the CPU usage of a particular EC2 instance is one metric provided by Amazon EC2. The data points themselves can come from any application or business activity from which you collect data.

Đại khái: `Metric` là một dạng biểu đồ, thể hiện lượng tài nguyên của bất cứ hoạt động gì mà ta đã thực hiện hay sử dụng trên AWS, và nó được vẽ theo đơn vị là thời gian.

***

Click chọn `Select metric`, CloudWatch sẽ bật ra hẳn 1 cái modal to đùng, và việc của ta lúc này là lựa chọn cái metric mà ta đang cần: `Billing` -> `Total Estimated Charge`

![](https://images.viblo.asia/47489a29-208e-4cae-867c-672e42f56ba7.png)

> Như đã nhắc ở trên rồi: thì CloudWatch sẽ cho phép ta theo dõi tất-cả-các-service-cũng-như-hoạt-động trên AWS, như thế cũng tức là có rất nhiều loại metric cho ta lựa chọn.
 
Rồi, sau khi lựa chọn được metric, thì màn hình step 1 sẽ cho ta config lại cái metric mà ta cần sử dụng này.

![](https://images.viblo.asia/c136d6e5-765c-4d74-983d-522848b4e09c.png)

- Ở step này, ta có thể lựa chọn để sửa lại tên của cái metric (`Metric name`), đơn vị tính tiền (`USD`), cũng như là chu kì theo dõi (`period`).

> `Period` ở đây có nghĩa là CloudWatch sẽ tiến hành định kì việc quan sát, thống kê và cảnh báo ... theo chu kì bao lâu 1 lần - như cái `metric` mình vừa tạo thì mặc định là cái chu kì này sẽ được thực hiện 6 tiếng một lần.
 
 ***
Tiếp đến ở phần dưới: Ta sẽ thấy một mục to có tên là `Conditons`

Ở mục này, ta có thể lựa chọn điều kiện - hay còn có thể gọi là *ngưỡng* (`Threshold`) . Đây là cột mốc mà ta cài đặt để tiến hành theo dõi.

Ở đây, ta sẽ chọn loại condition là `Static`. Đi kèm với các option `Greater/Equal` và `20 USD`, cái điều kiện này có thể hiểu được là: một khi Billing Usage của ta lớn hơn hoặc bằng 20 USD, thì sẽ tiến hành alarm.

![](https://images.viblo.asia/35e0d525-5df4-4e7f-b9f9-5fc7c371b024.png)

Click next và sang bước thứ 2.

### Create Alarm - Step 2 - Configure Actions

Ok, nếu như ở bước 1 vừa nãy, ta đã cài đặt về thông số theo dõi cũng như các ngưỡng cần theo dõi, thì ở bước 2 này, ta sẽ thực hiện cài đặt `việc gì sẽ xảy ra nếu như có 1 sự kiện ở bước 1 được trigger`.

![](https://images.viblo.asia/c423ba78-4ee4-4adf-9d90-eabd7f9030dd.png)

Đầu tiên, chú ý tới 2 cái đầu tiên:

- in Alarm: Đây là khi mà số liệu thống kê vượt quá `threshold` mà ta đã cài đặt.
- OK: khi mà số liệu thống kê nằm trong `vùng an toàn`

Ta sẽ lựa chọn option đầu tiên -  `In Alarm` - và nhìn sang list thứ 2: Cài đặt SNS (`Simple notification service`).

Giờ thì bạn đã hiểu câu nói lúc đầu của mình chưa ? Chỉ là cài đặt thông báo thôi mà AWS cũng đã làm phức tạp hóa vấn đề lên rồi: họ bắt dùng tận 2 service để phục vụ 1 quá trình - `CloudWatch` để theo dõi số liệu và `SNS` để thông báo cái chỉ số theo dõi đó.
 
> SNS là [1 service của Amazon dùng để thông báo](https://aws.amazon.com/sns/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc) - `Amazon Simple Notification Service (SNS) is a highly available, durable, secure, fully managed pub/sub messaging service that enables you to decouple microservices, distributed systems, and serverless applications.`
 
Tìm hiểu SNS là gì thì sẽ cần thêm 1 (hoặc vài) bài report nữa, nhưng ở đây thì ta cứ thử tạo mới 1 cái thôi xem sao. Lựa chọn `Create new topic`, AWS sẽ bắt bạn điền tên cho cái SNS mà ta sẽ tạo, cũng như điền email mà ta sẽ dùng để nhận notification từ SNS.

Điền xong thì ấn next nhé :)

![](https://images.viblo.asia/f8c21ddd-e1c7-4f44-8375-1c57e6d1f68b.png)

### Create Alarm - Step 3 - Configure Alarm

Bước này không có gì cả, chỉ đơn giản là đặt tên và điền description cho cái Alarm này thôi. Điền vào đi và next sang step 4 :D

![](https://images.viblo.asia/10674a09-0e44-4b5d-8b56-9bba7d3d7ae5.png)

### Create Alarm - Step 4 - Confirmation

Bước này cũng chỉ đơn thuần là xác nhận lại các thông tin đã điền từ các step trước -..- Ấn xác nhận và tạo một cái Alarm mới thôi !

***

Vậy là quá trình tạo đã kết thúc. Sau khi tạo xong, AWS sẽ gửi một cái mail cho bạn vào cái địa chỉ mail đã điền ở step 2. Ta sẽ phải thực hiện xác nhận việc subscription từ địa chỉ mail đó.

![](https://images.viblo.asia/a5d517d4-1053-4b8c-9db1-a520822fd019.png)

Click vào `Confirm subscription` để xác nhận việc nhận mail thông báo của AWS. Vậy là xong :D

## Tài liệu

Như đã nhắc tới ở trên rồi: Ngoài Billing Alarm ra thì ta cũng có thể tạo Free Tier Alarm nữa, quá trình tạo và theo dõi Alarm cũng tương tự, nếu bạn nào muốn thì có thể tham khảo tài liệu của AWS ở đây.

- https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html
- https://aws.amazon.com/about-aws/whats-new/2017/12/aws-free-tier-usage-alerts-automatically-notify-you-when-you-are-forecasted-to-exceed-your-aws-service-usage-limits/