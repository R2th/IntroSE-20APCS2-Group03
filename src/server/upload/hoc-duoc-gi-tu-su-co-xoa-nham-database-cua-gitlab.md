![](https://i.imgur.com/bRnM0Ga.jpeg)

Vào đầu năm 2017, GitLab gặp phải một incident rất nghiêm trọng. Trong quá trình khắc phục vấn đề liên quan đến replication của PostgreSQL, một kỹ sư (tạm gọi là *kỹ sư A*) đã vô tình `rm -rf` nhầm **hơn 300GB dữ liệu database** tại server database chính của GitLab.

Thiệt hại mà GitLab phải gánh chịu nói ngắn gọn thì:
- Mất hoàn toàn dữ liệu database của **6 tiếng đồng hồ**, từ 17:20 đến 00:00 UTC.
- GitLab bị down hoàn toàn, không thể truy cập **trong suốt 18 tiếng sau đó**, cho đến 18:00 UTC của ngày hôm sau.

Đọc đến đây chắc hẳn bạn sẽ nghĩ rằng, lỗi hoàn toàn thuộc về *kỹ sư A* đã làm việc thiếu trách nhiệm, và nên bị đuổi việc cũng như kiện ra tòa vì các thiệt hại mà mình gây ra? Hay là GitLab còn có một sai lầm nào đó khác, khiến cho quá trình khôi phục hệ thống mới kéo dài và thiệt hại về dữ liệu lớn như vậy?

Trong bài viết lần này, hy vọng mình có thể làm cho bạn hiểu rõ hơn về sự kiện kể trên của GitLab, những vấn đề và sai lầm mà GitLab gặp phải, cũng như cách mà GitLab đã giải quyết sự cố này.

# Khoảnh khắc xảy ra sự cố
Trước thời điểm xảy ra sự cố một vài giờ (khoảng 19:00 UTC), database của GitLab chịu lượng tải lớn, với nguyên do được xác định ban đầu là do spam. Vì lý do đó, quá trình replication database (từ server database chính `db1.cluster.gitlab.com` tới database phụ `db2.cluster.gitlab.com`) bị gặp trục trặc và bị gián đoạn.

Trong quá trình khắc phục vấn đề liên quan đến replication kể trên, *kỹ sư A* đã phải tiến hành xóa thư mục chứa database của database phụ, nhưng đã... vô tình **thực thi việc xóa ngay tại database chính**. Chỉ trong vòng vài giây sau, anh nhận ra sai lầm của mình nhưng đã quá muộn. 300GB dữ liệu database của GitLab đã bay màu!

Tuy nhiên câu chuyện sẽ đơn giản hơn rất nhiều chỉ bằng việc GitLab có tạo các bản backup thường xuyên, điều mà hẳn một dịch vụ lớn như GitLab chắc chắn có. Vậy có những chuyện gì xảy ra phía sau?

# Quá trình khôi phục lại database
## Tuyến phòng vệ thứ nhất: `pg_dump` backups
![Schrödinger's Backup](https://i.imgur.com/X8p0wZy.jpeg)

> Schrödinger's Backup: The condition of any backup is unknown until a restore is attempted.

Sau khi sự cố xảy ra, điều đầu tiên *kỹ sư A* nhanh chóng làm là tìm sự trợ giúp từ đồng nghiệp, đồng thời đi tìm và khôi phục lại bản backup database gần nhất.

Database của GitLab được backup bằng công cụ `pg_dump` và sau đó được upload lên một S3 bucket. Tuy nhiên, không biết từ bao lâu mà quá trình backup này **không hoạt động**. S3 bucket dùng để lưu backup kể trên thì **trống trơn**, bản backup cũng không có ở nơi nào khác.

> Our backups to S3 apparently don’t work either: the bucket is empty

Nguyên nhân của việc backup thất bại khá đơn giản: vì công cụ `pg_dump` được GitLab sử dụng để backup đang ở version 9.2, tuy nhiên cơ sở dữ liệu của GitLab được chạy trên PostgreSQL 9.6. Vì lý do trên, `pg_dump` gặp lỗi và không thể tạo ra được bản backup.

Vậy tại sao quá trình backup gặp lỗi mà **không một ai biết**? Lý do là vì, mặc dù đã được thiết lập gửi báo cáo lỗi của quá trình backup **qua email**, nhưng các email gửi đi từ cron job không được thiết lập DMARC, dẫn đến **bị lọc bỏ bởi email server**. Điều đáng nói ở đây là, GitLab lại không thiết lập để gửi email xác nhận mỗi khi bản backup được tạo thành công, dẫn đến không có ai biết rằng quá trình backup database đã bị fail từ lâu cho đến khi đã quá muộn.

Một nguyên nhân khác là không có kỹ sư/nhân viên nào được assign nhiệm vụ giám sát, kiểm tra quá trình backup. Dễ hiểu rằng mọi người sẽ có tâm lý "*chắc nó chừa mình ra*".

## Tuyến phòng vệ thứ hai: *Azure disk snapshots*
> Disk snapshots in Azure are enabled for the NFS server, but not for the DB servers.

GitLab có sử dụng tính năng *disk snapshot* của *Azure*. Tính năng này giúp thường xuyên chụp ảnh lại trạng thái hiện tại của toàn bộ ổ đĩa, có thể dùng để khôi phục khi gặp sự cố mất mát.

Disk snapshot có được kích hoạt cho NFS server, là nơi lưu các dữ liệu dạng file như các repository hay wiki của người dùng. Tuy nhiên, có lẽ vì lý do cắt giảm chi phí và **chủ quan** rằng các bản backup của `pg_dump` là đã đủ, server database **không được kích hoạt** tính năng này.

## Cơ hội cuối cùng: *LVM snapshots*
> ...out of five backup/replication techniques deployed none are working reliably or set up in the first place.

**Cứ mỗi 24h**, GitLab lại có tự động tạo một bản *LVM snapshot* của server production. LVM snapshot này để tạo cập nhật dữ liệu cho một server staging sao cho giống hệt production để mô phỏng chính xác/dễ dàng test hệ thống. **May mắn thay**, ngoài bản snapshot được tạo tự động ra mỗi 24h, các kỹ sư của GitLab ngày hôm đó có **tạo bằng tay một bản snapshot khác** cho server staging, ở thời điểm **khoảng 6 giờ** trước khi xảy ra sự cố mất dữ liệu, mới hơn nhiều so với bản LVM snapshot được tạo định kỳ.

Nhận thấy đây có lẽ là **cách duy nhất** để khôi phục lại database, các kỹ sư của GitLab nhanh chóng chọn bản LVM snapshot kể trên và bắt tay vào khôi phục database. Vấn đề ở đây là, không ai nghĩ đến việc sẽ có ngày bị **dồn vào thế bí** đến mức phải sử dụng một bản sao hệ thống ở staging để khôi phục lại. Để cắt giảm chi phí, server staging của GitLab được đặt ở một instance Azure giá rẻ ở region khác với production, tức quá trình truyền tải file sẽ chậm hơn nhiều. Với tốc độ 60Mbps (tức 7.5MB/s, chậm hơn cáp quang FPT Việt Nam), GitLab **mất xấp xỉ 18 giờ** để truyền tải xong thư mục chứa gần 300GB dữ liệu của PostgreSQL lên server database production.

GitLab công bố đã hoàn tất phục hồi hệ thống và xác nhận lại rằng mọi tính năng hoạt động bình thường vào lúc **18:00 UTC**, khoảng **18 tiếng** sau thời điểm gặp sự cố.

# Minh bạch về quá trình xử lý sự cố

Một điều thú vị là thay vì hạn chế công khai thông tin chi tiết về sự cố, GitLab chọn cách **công khai chi tiết** các thông tin cũng như quá trình xử lý sự cố. GitLab sử dụng Twitter để liên tục cập nhật tình hình của việc khôi phục, thậm chí còn **stream lại** quá trình khôi phục hệ thống **trên YouTube**.

Quyết định này cho thấy GitLab rất coi trọng sự minh bạch, tất nhiên cũng là lối đi khá mạo hiểm. Bởi vì quá trình stream có thể tiềm ẩn việc lộ key, source code và dữ liệu nhạy cảm khác.

Thông tin chi tiết về incident được GitLab tổng hợp lại và công bố qua bài blog [Postmortem of database outage of January 31](https://about.gitlab.com/blog/2017/02/10/postmortem-of-database-outage-of-january-31/).

# Kết luận
Qua những gì biết được từ sự cố trên, bạn có thể thấy được rằng: lỗi chính phải thuộc về sự lỏng lẻo trong triển khai hệ thống backup và failsafe của GitLab. Tuy *kỹ sư A* có trách nhiệm do thao tác thiếu cẩn thận trên production, nhưng con người luôn mắc sai lầm, và doanh nghiệp phải luôn kỳ vọng và chuẩn bị cho trường hợp xấu nhất.

Hãy thường xuyên kiểm tra quá trình backup có hoạt động không. Và kiểm tra file backup có được sinh ra không vẫn là chưa đủ, bạn cần phải **thực sự thử restore nó** để đảm bảo chắc chắn, tránh gặp phải trường hợp *Schrödinger's Backup*!

> Backups always succeed. It's restores that fail.

Ngoài ra, để tránh rơi vào tình huống lúng túng hơn, bạn nên đảm bảo rằng có dư thừa nhiều giải pháp backup khác nhau cùng hoạt động. Ngoài ra, hệ thống thông báo cho bản backup cần đảm bảo hoạt động thông suốt và báo cáo ngay cả khi thực hiện backup thành công hay thất bại.