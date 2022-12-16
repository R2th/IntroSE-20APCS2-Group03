Bài viết tiếp theo trong chuổi bài viết này mình xin hướng dẫn cách để tạo và cài đặt một Alarm cho các Mertrics mà mình đã thêm ở  2 bài viết trước.

## 7. Alarms
Để cài đặt cảnh báo khi dung lượng lưu trữ đã đến ngưỡng 80% chúng ta bắt đầu các thao tác để set Alarm.

Tại tab Graphed Mertrics chúng ta click vào icon quả chuông của mertric DiskSpaceUtilization. Chúng ta được redirect đến màn hình tạo Alarms như bên dưới:
#### I. Step 1
![](https://images.viblo.asia/b196561a-0a5b-4513-a850-7aa20ca9e280.png)

Ở step đầu tiên chúng ta chỉ cần chú ý ở mục condition. Ở đây mình sẽ chọn là khi DiskSpaceUtilization lớn hơn 80(vì đơn vị của mertric này là %). Sau đó bấm next.

#### II. Step 2
![](https://images.viblo.asia/80892665-97f0-41ff-bfd4-3904f0c44b4d.png)

Ở step Configure actions này mình sẽ chọn In Alarm (tức là khi giá trị nằm ngoài ngưỡng xác định - cụ thể là lớn hơn 80%) thì sẽ nhận alarm.
Ở mục select an SNS topic này mình sẽ tạo mới 1 danh sách các người nhận Alarm. Danh sách này có thể được dùng nhiều lần bằng cách khi tạo Alarms mới mình chỉ cần chọn Select an existing SNS topic mà nhập tên topic vào là được. 
Sau khi điền đầy đủ tên topic và danh sách email vào chúng ta cần nhấn Create topic.

Ngoài ra ở đây còn cung cấp cho chúng ta 2 tuỳ chọn là auto Sacling action và EC2 action. 2 tuỳ chọn này sẽ giúp chúng ta thực hiện action sacle các tài nguyên hay thực hiện các thao tác liên quan đến EC2 như Stop, restart... Cái này mọi người có thể nghiên cứu thêm hoặc là đón đọc ở những bài viết tiếp theo của mình (mình cũng chưa nắm những phần này)

Nếu SNS topic được tạo mới thì AWS sẽ gửi 1 email confirm có muốn nhận thông báo từ AWS hay  không như hình bên dưới. Chúng ta cần click vào link Confirm... trong email là xong.
![](https://images.viblo.asia/110cd9ab-184e-4ad8-b233-8ee74c9845dd.png)

![](https://images.viblo.asia/369fa0bb-a7bf-427e-a603-7f7605527eb9.png)
Đây là màn hình khi mình click vào Link confirm trong email. Để huỷ nhận thì mình chỉ cần click vào link click here to unsubscribe.

#### III. Step 3
![](https://images.viblo.asia/f09aa834-db68-4809-aacb-f36503de069b.png)
Bước này đơn giản là chúng ta điền nội dung cho cái Alarm thôi. Lúc AWS gửi email Alarm thì còn rất nhiều thông tin khác ngoài 2 thông tin này được gửi cùng trong mail.

#### IV. Step 4
![](https://images.viblo.asia/22424a8a-083b-4b36-9967-d9bfcee2a6ac.png)
Ở bước cuối cùng này mình confirm lại 1 lượt nữa các thông tin mà mình đã chọn rồi sau đó click vào create alarm.

Sau khi create thành công chúng ta sẽ được redirect đến màn hình list Alarms như hình.
![](https://images.viblo.asia/88f69abb-5e38-4ceb-96e2-f5994d5261a1.png)
Ban đầu Alarm sẽ ở thạng thái INSUFFICIENT và sau đó sẽ chuyển sang trạng thái OK hoặc ALARM tuỳ thuộc vào điều kiện mà mình đang settings.
Vậy là mình đã xong việc tạo Alarm cảnh báo khi dung lượng lưu trử của con EC2 đó vượt quá 80% qua email của mình.

## 8. Quản lý SNS topic

Acctions ở Alarm mình vừa tạo ra sẽ ở trạng  thái là "Pending confirmation" cho đến khi toàn bộ các email trong topic SNS mà mình tạo ra đã confirm toàn bộ. Sau đó nó sẽ đổi sang dấu "-". 

Để kiểm tra danh sách email, status confirm của các email hoặc  thêm sửa xoá email trong topic mình đã tạo thì chúng ta cần Search và chọn service Amazon SNS
![](https://images.viblo.asia/6e0803ee-7f98-46f5-b2ce-dc39b74d31eb.png)
Ví dụ như hình là mình có 2 topic mà 1 topic mình đã confirm email, còn 1 cái thì chưa.

Để thêm/sửa/xoá thông tin topic chúng ta click vào topic cần thao tác.
![](https://images.viblo.asia/752e5f0a-82f3-4ed7-9d69-8a071774efa9.png)


## 9. Test
Trước khi test thử thì chúng ta cần chắc chắn đã confirm email mà AWS đã gửi cho chúng ta. Sau đó quay trở lại termial mà mình đã ssh vào EC2 đó.

Vì mình đang sét alarm cho metric DiskSpaceUtilization nên mình sẽ dùng 1 đoạn code để tạo ra file có dung lượng lớn để làm vượt ngưỡng mà mình đã setting Alarm. Ở ví dụ dưới mình tạo file có dung lượng 20GB để cho 1 cái alarm test condition 30% của mình hoạt động.
```
sudo fallocate -l 20G test.img
```

Tiếp theo mình chạy lệnh kiểm tra các tài nguyên disk trực tiếp bằng lệnh
``` 
~/aws-scripts-mon/mon-put-instance-data.pl --disk-space-util --disk-space-used --disk-space-avail  --disk-path=/data --verify --verbose
```
Và kết quả mình sẽ thấy DiskSpaceUtilization đã vượt ngưỡng 30%.
```
DiskSpaceUtilization [/data]: 34.0350012060389 (Percent)
DiskSpaceUsed [/data]: 33.4584274291992 (Gigabytes)
DiskSpaceAvailable [/data]: 59.8318862915039 (Gigabytes)
Using AWS credentials file </home/phamthanhluan/aws-scripts-mon/awscreds.conf>
No credential methods are specified. Trying default IAM role.
Using IAM role <xxxx>
Endpoint: https://monitoring.ap-northeast-1.amazonaws.com
Payload: {"Namespace":"System/Linux","MetricData":[{"Unit":"Percent","Timestamp":1587370914,"MetricName":"DiskSpaceUtilization","Value":34.0350012060389,"Dimensions":[{"Name":"Filesystem","Value":"/dev/nvme1n1"},{"Value":"i-0ea0f5923a6305ab3","Name":"InstanceId"},{"Name":"MountPath","Value":"/data"}]},{"MetricName":"DiskSpaceUsed","Value":33.4584274291992,"Unit":"Gigabytes","Timestamp":1587370914,"Dimensions":[{"Name":"Filesystem","Value":"/dev/nvme1n1"},{"Name":"InstanceId","Value":"i-0ea0f5923a6305ab3"},{"Name":"MountPath","Value":"/data"}]},{"Dimensions":[{"Value":"/dev/nvme1n1","Name":"Filesystem"},{"Name":"InstanceId","Value":"i-0ea0f5923a6305ab3"},{"Name":"MountPath","Value":"/data"}],"Unit":"Gigabytes","Timestamp":1587370914,"MetricName":"DiskSpaceAvailable","Value":59.8318862915039}],"__type":"com.amazonaws.cloudwatch.v2010_08_01#PutMetricDataInput"}
```
Vì mình set cronjob là 5 phút update 1 lần + condition của mình là nếu vượt quá 30% trong 5p (sau 2 lần gửi thông tin cho CloudWatch) nên mất tối đa 10p mình sẽ nhận đc email thông báo.

![](https://images.viblo.asia/a1cc8388-0664-430d-82cf-554ffc8759ee.png)

![](https://images.viblo.asia/4a61285b-1dd7-4457-9fdc-5ac550cf5385.png)

***Vậy là chúng ta đã hoàn thành xong các bước cài đặt và config để tạo Alarm khi dung lượng lưu  trữ của EC2 vượt quá một ngưỡng nào đó. Với thông tin mình cung cấp chúng ta hoàn toàn có thể tạo ra các kịch bản Alarm khác nhau cho các tài nguyên khác nhau để có thể can thiệp hoặc thông báo cho những người liên quan một cách sớm nhất. Cảm ơn mọi người đã đón đọc bài viết của mình.***