> Sẵn tiện dự án có liên quan đến S3 nên tìm hiểu luôn.
## S3 em là ai ??
Amazon Simple Storage Service (Amazon S3) là dịch vụ lưu trữ đối tượng (object) được xây dựng để lưu trữ và truy xuất dữ dữ liệu từ bất cứ nơi nào.
Đây là dịch vụ lưu trữ đơn giản có độ bền, độ khả dụng, hiệu suất, tính bảo mật dẫn đầu ngành và khả năng thay đổi quy mô gần như không giới hạn với chi phí thấp.
Độ bền lên tới 99,99999999 %
Đối với S3 thì chỉ trả phí cho phần sử dụng thực tế.
### Vậy lưu trữ đối tượng là gì ???
Lưu trữ đối tượng được hiểu là nếu có thay đổi file trong đối tượng thì toàn bộ đối tượng sẽ được update.
### Dữ liệu như nào thì mới lưu được trên S3 ??
Có thể lưu trữ ảo với bất kỳ dữ liệu nào từ video, text ... với bất kỳ định dạng nào trên S3
Dung lượng tối đa lên tới 5TB.
### Lớp lưu trữ trên S3
Amazon S3 cung cấp nhiều lớp lưu trữ khác nhau được thiết kế cho các tình huống sử dụng khác nhau.
Tùy theo nhu cầu kinh doanh hoặc giá cả mà lựa chọn lớp lưu trữ thích hợp.
#### Có 2 tiêu chí cơ bản để lựa chọn đó là:
1. Tùy theo mật độ truy cập dữ liệu
2. Tùy theo yêu cầu về tính khả dụng của data.
#### Hiện tại S3 cung cấp 7 lớp lưu trữ như sau
1. S3 Standard
    - Được thiết kế để lưu trữ dữ liệu thường xuyên được truy cập
    - Dữ liệu được lưu trữ trên tối thiểu 3 AZ
    - S3 Standard cung cấp đối tượng có độ khả dụng cao cho nên thích hợp sử dụng trong website, phân phối nội dung, phân tích data....
2. S3 Standard - IA
    - Thích hợp cho dữ liệu có độ khả dụng cao nhưng tần suất truy cập thấp
    - Dữ liệu được lưu trên tối thiểu 3 AZ
    - Phí lưu trữ thì thấp hơn so với S3 Standard nhưng phí truy cập thì cao.
3. S3 1 Zone - IA
    - Em này tương tự S3 Standard - IA nhưng dữ liệu chỉ được lưu trên 1 AZ duy nhất
    - AZ mà bị phá hủy thì dữ liệu cũng bị phá hủy theo
    - Giá thấp hợp S3 Standard - IA khoảng 20%
4. S3 Intelligent - Tiering
    - Thích hợp với kiểu mẫu không rõ tần suất truy cập cũng như hay thay đổi
    - Cung cấp dịch vụ tự động thay đổi lớp lưu trữ cho đối tượng tùy thuộc vào tần suất truy cập.
    - S3 Intelligent - Tiering sẽ giám sát tuần suất đối tượng được truy cập, liên tiếp 30 ngày đối tượng không được truy cập thì sẽ chuyển vào lớp lưu trữ S3 standard -IA. Liên tiếp 90 ngày không được truy cập thì sẽ chuyển vào S3 Glacier. Nếu liên tiếp 180 ngày không được truy cập thì sẽ chuyển vào S3 Glacier Deep Archive. Bất kỳ lúc nào đối tượng được truy cập thì sẽ chuyển vào S3 Standard
5. S3 Glacier
    - Được thiết kế làm kho lưu trữ với mức phí thấp
    - Độ khả dụng dữ liệu thấp, có thể truy cập đối tượng từ vài phút đến vài tiếng đồng hồ.
    - Thích hợp lưu trữ những dữ liệu ít khi cần đến.
6. S3 Glacier Deep Archive
    - Có mức phí thấp nhất, được thiết kế làm kho lưu trữ đồ cổ ngàn năm không chạm :)
    - Có thể truy cập dữ liệu trong vòng 12 tiếng đồng hồ.
7. S3 Outpost
    - S3 trên Outposts cung cấp một lớp lưu trữ Amazon S3 duy nhất, có tên là S3 Outposts, sử dụng các API S3 và được thiết kế để lưu trữ dữ liệu dự phòng và lâu dài trên nhiều thiết bị và máy chủ trên Outposts của bạn.
    - Outpost là gì thì tìm hiểu ở 1 post khác nhé.
> Để tìm hiểu cơ bản thì đến đây có vẻ ổn rồi nhé!