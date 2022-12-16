![](https://images.viblo.asia/3983d7dd-41ba-4d88-997a-48df405f98ab.jpg)

# Vấn đề về sao lưu thư mục lớn
Mình có lưu "sương sương" **300GB các tệp tin** của người dùng upload lên, như hình ảnh hay các tệp đính kèm. Cứ mỗi ngày, mình lại có **thêm cỡ 2-3GB** các tập tin mới được upload lên nữa. Giờ mình muốn dữ liệu kia **được sao lưu *hàng ngày*** lên một server backup khác.

Một lưu ý nhỏ là mình cần *sao lưu* chứ không phải *đồng bộ hóa*, tức là mình phải có thể **giữ thêm được vài chục bản backup** như thế nữa cùng lúc để khôi phục được về một thời điểm mình muốn ở quá khứ. Nếu phải là bạn, bạn sẽ định làm như thế nào?

Giải pháp đầu tiên bạn nghĩ tới có thể kể đến là các công cụ của linux giúp sao chép file sang server khác **như `scp` hay `rsync`**. Những tool này có thể backup tốt với thư mục dung lượng nhỏ, tuy nhiên mình cho rằng cách này **không thể khả thi** trong trường hợp của mình, bởi vì:
- Thời gian tiến hành backup **sẽ lâu vô cùng**. Giả dụ sử dụng ổ HDD, việc backup 300GB dữ liệu có thể lâu đến hơn 10 tiếng đồng hồ, đồng thời chiếm dụng hết băng thông đĩa trong khoảng thời gian đó.
- Các bản backup chiếm **dung lượng cực lớn**. Nếu mình muốn backup liên tục hàng ngày và giữ trong suốt 30 ngày mới xóa, mà mỗi bản backup lại chiếm 300GB, thì server backup của mình cần phải có dung lượng ít nhất 300GB * 30 = 9TB mới đủ (?) **Băng thông tiêu tốn cho mỗi lần backup cũng tỷ lệ thuận theo**.
- Ngộ nhỡ quá trình backup **bị dừng đột ngột** (do server bị tắt đột ngột, lỡ tay nhấn nhầm Ctrl+C) thì sao? Chẳng nhẽ đành phải "yêu lại từ đầu" à?
- Rất khó khăn nếu bạn muốn **nén hay mã hóa file** trước khi đưa lên server backup. Đừng bảo là bạn sẽ `tar -zcvf` trước cả một folder 300GB nhé.

Chẳng nhẽ đến đây đành bó tay sao?

# Giải pháp *deduplicating/incremental backup*
![data loss is coming](https://images.viblo.asia/9cd2122a-58fa-4095-844a-7f10065840a4.jpg)

Để ý kỹ thì thấy rằng 300GB dữ liệu kia **không phải file nào cũng thay đổi thường xuyên**. Mỗi ngày lại có thêm vài tệp mới được thêm vào, vài tệp được người dùng xóa bỏ, nhưng **phần rất lớn dữ liệu còn lại thì "nguyễn y vân"**. Rõ ràng là mình chỉ cần backup những phần tệp tin bị thay đổi đó thôi. 

Vậy là có một giải pháp: chia dữ liệu 300GB to chà bá kia **thành từng khối nhỏ** hơn và backup đầy đủ lần đầu. Sau đó, mỗi lần tiến hành backup lại, ta chỉ việc **so sánh xem cái nào có thay đổi/tạo mới**, rồi tạo backup chỉ gồm riêng những khối đó.

Như vậy, bản backup đầu tiên của mình sẽ chiếm 300GB, nhưng **mỗi bản backup sau chỉ nhỏ gọn cỡ vài GB** là đã đủ! Chưa kể, việc chia giữ liệu thành từng khối lại giúp rất dễ dàng nén, mã hóa tệp tin trước khi truyền tải, cũng như dễ khôi phục lại quá trình backup khi chẳng may bị gián đoạn nữa!

Nói mồm thì dễ, nhưng để implement một công cụ sao lưu thực hiện như vậy một cách chính xác hoàn hảo thì **không phải chuyện một nốt nhạc**. Rất may mắn là người ta đã làm ra những công cụ sao lưu với cách thức chính xác những gì được mình mô tả phía trên, một trong số đó mà mình biết và từng sử dụng là **borgbackup**.

# *borg* có gì hay?
![borgbackup](https://images.viblo.asia/8d07bf69-05d7-48dd-98c4-afdb33cda4d1.png)

**borgbackup** (ngắn gọn là **borg**) giúp dễ dàng đáp ứng hết yêu cầu của mình ở đầu bài viết, đồng thời **giải quyết trọn vẹn** những vấn đề gặp phải khi backup lượng dữ liệu lớn như thế!

*borg* khéo léo **loại bỏ các phần dữ liệu đã trùng lặp** ra khỏi các bản sao lưu, giúp việc sao lưu vừa nhẹ, vừa nhanh chóng. *borg* có thể sao lưu dữ liệu sang **server bên ngoài** bạn muốn, đồng thời **mặc định nén và mã hóa file** sẵn luôn trước khi truyền tải.

Một **điểm trừ nho nhỏ** của *borg* là server bên ngoài dùng để backup **phải kết nối được bằng ssh**, đồng nghĩa với việc sẽ khó khăn hơn nếu bạn muốn **lưu backup lên đám mây như S3 hay GCS**.

# Cài đặt *borg*
*borg* cài khá đơn giản trên Ubuntu:

``` shell
sudo apt-get install borgbackup
```

*borg* cũng có tên gói tương tự với alpinelinux, nếu bạn muốn dùng *borg* trong container :wink: 

# Khởi tạo một *repository*
Các **repository** là các kho để *borg* lưu giữ các dữ liệu. Thường thì bạn cần từng repository riêng biệt cho mỗi website bạn muốn backup.

Để bắt đầu tạo các bản backup, đương nhiên bạn sẽ cần tạo một repository mới trước. Khởi tạo một repository mới tại ngay một thư mục cục bộ:

``` shell
borg init --encryption=repokey ~/borg-repo
```

Hoặc khởi tạo repository ở một máy chủ từ xa khác:

``` shell
borg init --encryption=repokey username@server:~/borg-repo
```

Sau đó *borg* sẽ hỏi bạn mật khẩu (passphrase) bạn muốn đặt cho repository định tạo và cung cấp nhiều thông tin khác. Sau đó, một *borg repository* mới sẽ được tạo tại thư mục `~/borg-repo`.

![borgbackup repository initialize](https://images.viblo.asia/33a88444-a5c0-4385-9d32-f898dee322de.png)

# Tạo bản backup mới
Câu lệnh để tạo một bản backup mới hết sức đơn giản:

``` shell
borg create ~/borg-repo::snapshot1 /my/important/data
```

Với snapshot1 là tên bản backup bạn muốn đặt, còn `/my/important/data` là đường dẫn thư mục bạn cần backup.

Tuy nhiên, câu lệnh trên chạy hoàn toàn im lặng và không có output trừ khi có lỗi. Đầy đủ hơn, bạn có thể thêm vài argument nữa vào câu lệnh trên:

``` shell
borg create --progress --stats --exclude /my/important/data/not_this/ ~/borg-repo::snapshot1 /my/important/data
```

Giải thích qua ý nghĩa các optional argument trên như sau:
- `--progress` hiện tiến độ của việc thực hiện backup theo thời gian thực.
- `--stats` hiện kết quả tổng thể sau khi backup thực hiện thành công.
- `--exclude` loại trừ một thư mục bất kỳ ra khỏi bản backup. Nếu có nhiều thư mục thì bạn dùng nhiều argument `--exclude` cho mỗi thư mục đó.

# Khôi phục
*borg* cho bạn 2 cách để khôi phục dữ liệu:
- Mount một bản backup thành một thư mục ảo để thoải mái xem và copy các file nhất định nào đó bạn muốn (chậm hơn, nhưng hữu dụng nếu bạn chỉ cần lấy một vài file nhất định)
- Xả nén tất cả dữ liệu có trong bản backup vào một thư mục (nhanh hơn)

Trước hết, kiểm tra bạn đang có những bản backup nào đang có trong repository với lệnh sau:

``` shell
borg list ~/borg-repo
```

Restore với cách mount directory:

``` shell
mkdir /tmp/mount
borg mount ~/borg-repo::snapshot1 /tmp/mount
# When done getting files you wanted, run this to unmount directory:
borg umount /tmp/mount
```

Restore với cách extract directory:

``` shell
borg extract ~/borg-repo::snapshot1
```

# Giờ sao nữa?
*borg* sẽ còn hoạt động **hiệu quả hơn nữa** nếu cả **server từ xa** (truy cập qua ssh) của bạn cũng có **cài sẵn *borg***.

Để tìm hiểu thêm nhiều tính năng hay ho khác của *borgbackup*, ví dụ như **đổi cách thức nén dữ liệu**, bạn nhất định phải tìm hiểu thêm tại [borgbackup.org](https://borgbackup.org/).

Đã backup bằng cách gõ lệnh tay được thì bạn thử sức thiết lập **tự động hóa** nó hàng ngày bằng **cron job** xem sao. Trong tài liệu của *borg* có sẵn script tham khảo cùng các lưu ý khác bạn nên biết [tại đây](https://borgbackup.readthedocs.io/en/stable/quickstart.html#automating-backups).

Ngoài ra, bạn thử tham khảo thêm **[restic](https://restic.net/)** cũng là một công cụ tương tự *borg*. Tuy có tuổi đời trẻ hơn, *restic* có thêm tính năng **cho backup lên các cloud storage** như S3 nữa, thay vì chỉ mỗi qua ssh như *borg*.

# Nguồn tham khảo
- https://medium.com/swlh/backing-up-with-borg-c6f13d74dd6
- https://restic.readthedocs.io/