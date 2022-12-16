AWS CLI là giao diện dòng lệnh để quản lí các dịch vụ của AWS. Trong bài viết này mình xin giới thiệu về các lệnh sử dụng với dịch vụ s3.
Các lệnh có thể sử dụng là:
- cp
- ls
- mb
- mv
- presign
- rb
- rm
- sync
- website

### cp

Dùng để sao chép files hoặc s3 object đến các vị trí khác trong hoặc ngoài s3.

Cú pháp:

```
 cp
<LocalPath> <S3Uri> or <S3Uri> <LocalPath> or <S3Uri> <S3Uri>
[--dryrun]
[--quiet]
[--include <value>]
[--exclude <value>]
[--acl <value>]
[--follow-symlinks | --no-follow-symlinks]
[--no-guess-mime-type]
[--sse <value>]
[--sse-c <value>]
[--sse-c-key <value>]
[--sse-kms-key-id <value>]
[--sse-c-copy-source <value>]
[--sse-c-copy-source-key <value>]
[--storage-class <value>]
[--grants <value> [<value>...]]
[--website-redirect <value>]
[--content-type <value>]
[--cache-control <value>]
[--content-disposition <value>]
[--content-encoding <value>]
[--content-language <value>]
[--expires <value>]
[--source-region <value>]
[--only-show-errors]
[--no-progress]
[--page-size <value>]
[--ignore-glacier-warnings]
[--force-glacier-transfer]
[--request-payer <value>]
[--metadata <value>]
[--metadata-directive <value>]
[--expected-size <value>]
[--recursive]
```

Một số tùy chọn:

--dryrun (boolean) hiển thị các hoạt động sẽ được chạy với dòng lệnh mà không thực sự chạy chúng.

--quiet (boolean) không hiển thị các hoạt động được thực hiện từ dòng lệnh.

--include (string) không loại trừ các file hoặc đối tượng trong lệnh khớp với mẫu đã chỉ định.

--exclude (string) loại trừ các file hoặc đối tượng trong lệnh khớp với mẫu đã chỉ định.

--acl (string) xét Access Control List (ACL) cho object khi lệnh được thực hiện. Để thực hiện lệnh này bạn phải có quyền "s3:PutObjectAcl" trong danh sách hoạt động trong IAM policy của bạn. Các tham số đi kèm là: private, public-read, public-read-write, authenticated-read, aws-exec-read, bucket-owner-read, bucket-owner-full-control and log-delivery-write.

--content-language (string) ngôn ngữ của nội dung.

--expires (string) thời hạn đối tượng không còn được lưu trữ.

Ví dụ:

- Copy local file sang s3:
```
aws s3 cp test.txt s3://mybucket/test2.txt
```
Output:
```
upload: test.txt to s3://mybucket/test2.txt
```

- Copy local file sang s3 với ngày hết hạn:
```
aws s3 cp test.txt s3://mybucket/test2.txt --expires 2014-10-01T20:30:00Z

```
Output:
```
upload: test.txt to s3://mybucket/test2.txt
```

- Copy file trong s3:
```
aws s3 cp s3://mybucket/test.txt s3://mybucket/test2.txt
```
Output:
```
copy: s3://mybucket/test.txt to s3://mybucket/test2.txt
```

- Copy file từ s3 về local:
```
aws s3 cp s3://mybucket/test.txt test2.txt
```
Output:
```
download: s3://mybucket/test.txt to test2.txt
```

- Copy object sang buket khác:
```
aws s3 cp s3://mybucket/test.txt s3://mybucket2/
```
Output:
```
copy: s3://mybucket/test.txt to s3://mybucket2/test.txt
```

- Copy thư mục lên s3:
```
aws s3 cp myDir s3://mybucket/ --recursive
```
Output:
```
upload: myDir/test1.txt to s3://mybucket/test1.txt
upload: myDir/test2.txt to s3://mybucket/test2.txt
```

- Copy thư mục sang buket khác:
```
aws s3 cp s3://mybucket/ s3://mybucket2/ --recursive --exclude "another/*"
```
Output:
```
copy: s3://mybucket/test1.txt to s3://mybucket2/test1.txt
```

- Xét ACL khi copy:
```
aws s3 cp s3://mybucket/test.txt s3://mybucket/test2.txt --acl public-read-write
```
Output:
```
copy: s3://mybucket/test.txt to s3://mybucket/test2.txt
```

### ls

Liệt kê các object trong s3.

Cú pháp:

```
 ls
<S3Uri> or NONE
[--recursive]
[--page-size <value>]
[--human-readable]
[--summarize]
[--request-payer <value>]
```

Một số tùy chọn:

--recursive (boolean)  lệnh được thực hiện trên tất cả các file hoặc objetc trong thư mục hoặc tiền tố được chỉ định.

--page-size (integer) chỉ định số lượng kết quả trả về. Mặc định là 1000 (số tối đa được cho phép).

--human-readable (boolean) Hiển thị kích thước tệp ở định dạng có thể đọc được.

--summarize (boolean) Hiển thị thông tin tóm tắt (số lượng đối tượng, tổng kích thước).

--request-payer (string) Xác nhận rằng người yêu cầu biết rằng họ sẽ bị tính phí cho yêu cầu.

Ví dụ:

- Liệt kê tất cả buket:
```
aws s3 ls
```
Output:
```
2013-07-11 17:08:50 mybucket
2013-07-24 14:55:44 mybucket2
```

- Liệt kê trong 1 buket (somePrefix là 1 thư mục):
```
aws s3 ls s3://mybucket
```
Output:
```
                                                          PRE somePrefix/
2013-07-25 17:06:27         88 test.txt
```

- Trường hợp không có đối tượng phù hợp:
```
aws s3 ls s3://mybucket/noExistPrefix
```
Output:
```
None
```

- Liệt kê tất cả các file trong buket (kể cả trong thư mục con):
```
aws s3 ls s3://mybucket --recursive
```
Output:
```
2013-09-02 21:37:53         10 a.txt
2013-09-02 21:37:53    2863288 foo.zip
2013-09-02 21:32:57         23 foo/bar/.baz/a
2013-09-02 21:32:58         41 foo/bar/.baz/b
2013-09-02 21:32:57        281 foo/bar/.baz/c
2013-09-02 21:32:57         73 foo/bar/.baz/d
2013-09-02 21:32:57        452 foo/bar/.baz/e
2013-09-02 21:32:57        896 foo/bar/.baz/hooks/bar
2013-09-02 21:32:57        189 foo/bar/.baz/hooks/foo
2013-09-02 21:32:57        398 z.txt
```

- Hiển thị thêm các thông số size và tổng số object và tổng size:
```
aws s3 ls s3://mybucket --recursive --human-readable --summarize
```
Output:
```
2013-09-02 21:37:53   10 Bytes a.txt
2013-09-02 21:37:53  2.9 MiB foo.zip
2013-09-02 21:32:57   23 Bytes foo/bar/.baz/a
2013-09-02 21:32:58   41 Bytes foo/bar/.baz/b
2013-09-02 21:32:57  281 Bytes foo/bar/.baz/c
2013-09-02 21:32:57   73 Bytes foo/bar/.baz/d
2013-09-02 21:32:57  452 Bytes foo/bar/.baz/e
2013-09-02 21:32:57  896 Bytes foo/bar/.baz/hooks/bar
2013-09-02 21:32:57  189 Bytes foo/bar/.baz/hooks/foo
2013-09-02 21:32:57  398 Bytes z.txt

Total Objects: 10
   Total Size: 2.9 MiB
```

### mv

Di chuyển file local hoặc đối tượng s3 sang vị trí khác hoặc trong s3.

Cú pháp:
```
mv
<LocalPath> <S3Uri> or <S3Uri> <LocalPath> or <S3Uri> <S3Uri>
[--dryrun]
[--quiet]
[--include <value>]
[--exclude <value>]
[--acl <value>]
[--follow-symlinks | --no-follow-symlinks]
[--no-guess-mime-type]
[--sse <value>]
[--sse-c <value>]
[--sse-c-key <value>]
[--sse-kms-key-id <value>]
[--sse-c-copy-source <value>]
[--sse-c-copy-source-key <value>]
[--storage-class <value>]
[--grants <value> [<value>...]]
[--website-redirect <value>]
[--content-type <value>]
[--cache-control <value>]
[--content-disposition <value>]
[--content-encoding <value>]
[--content-language <value>]
[--expires <value>]
[--source-region <value>]
[--only-show-errors]
[--no-progress]
[--page-size <value>]
[--ignore-glacier-warnings]
[--force-glacier-transfer]
[--request-payer <value>]
[--metadata <value>]
[--metadata-directive <value>]
[--recursive]
```

Một số tùy chọn (cũng tương tự như lệnh cp):
--dryrun (boolean) hiển thị các hoạt động sẽ được chạy với dòng lệnh mà không thực sự chạy chúng.

--quiet (boolean) không hiển thị các hoạt động được thực hiện từ dòng lệnh.

--include (string) không loại trừ các file hoặc đối tượng trong lệnh khớp với mẫu đã chỉ định.

--exclude (string) loại trừ các file hoặc đối tượng trong lệnh khớp với mẫu đã chỉ định.

--acl (string) xét Access Control List (ACL) cho object khi lệnh được thực hiện. Để thực hiện lệnh này bạn phải có quyền "s3:PutObjectAcl" trong danh sách hoạt động trong IAM policy của bạn. Các tham số đi kèm là: private, public-read, public-read-write, authenticated-read, aws-exec-read, bucket-owner-read, bucket-owner-full-control and log-delivery-write.

Ví dụ:

- Di chuyển 1 file vào vị trí chỉ định:
```
aws s3 mv test.txt s3://mybucket/test2.txt
```
Output:
```
move: test.txt to s3://mybucket/test2.txt
```

- Di chuyển file trong s3:
```
aws s3 mv s3://mybucket/test.txt s3://mybucket/test2.txt
```
Output:
```
move: s3://mybucket/test.txt to s3://mybucket/test2.txt
```

- Di chuyển file từ s3 về local:
```
aws s3 mv s3://mybucket/test.txt test2.txt
```
Output:
```
move: s3://mybucket/test.txt to test2.txt
```

- Di chuyển file và giữ nguyên tên (không chỉ định tên mới):
```
aws s3 mv s3://mybucket/test.txt s3://mybucket2/
```
Output:
```
move: s3://mybucket/test.txt to s3://mybucket2/test.txt
```

- Di chuyển tất cả file trong buket
```
aws s3 mv s3://mybucket . --recursive
```
Output:
```
move: s3://mybucket/test1.txt to test1.txt
move: s3://mybucket/test2.txt to test2.txt
```