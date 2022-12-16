### Phần 2: Stream, Redirect và Pipe trong Linux
### 1.1.  Tìm hiểu về File Descriptor:

Linux xử lý tất cả các object như là một file vậy, bao gồm cả những dòng input và output từ terminal. Để xác định một file object nhất định Linux sử dụng file desciptor (tạm dịch là đặc tả tập tin). Linux dùng các file descriptor chính như sau:

![](https://images.viblo.asia/8b352095-d49e-47bd-adca-3e7dc1d00684.png)

* Standard Input (stdin): có file desciptor là 0, trong hầu hết các trường hợp data đến từ keyboard của người dùng.

* Standard Output (stdout): có file descriptor là 1, thể hiện trên màn hình dạng text-mode hoặc GUI.

* Standard Error (stderr): có file descriptor là 2, thể hiện các thông tin quan trọng như lỗi ra màn hình như stdout, ta có thể tách biệt stderr ra 1 file riêng so với stdout để theo dõi.


### 1.2. Redirect Input và Output:

Ví dụ để redirect stdout của lệnh echo ta kết hợp lệnh đó với các operator như sau:

`echo $PATH 1> file1.txt`

Ở câu lệnh trên ta dùng operator **>** (dấu nhọn hướng đến đâu output đi đến đó) để redirect output của lệnh echo vào file1.txt, với file descriptor là **1** ta chỉ redirect stdout mà thôi . Kiểm tra file1 ta có:
![](https://images.viblo.asia/b30ed352-f17b-45bd-88fd-2be7ec88d401.JPG)

Ở câu lệnh này, ta có thể bỏ descirptor là 1 đi mà vẫn cho ra kết quả như nhau. Bảng dưới thể hiện các operator thường dùng trong việc redirect.



| Redirection Operator | Chức năng |
| -------- | -------- | -------- |
|>  |  Tạo file mới chứa stdout, nếu file đã tồn tại sẽ ghi đè lên. Không cần file descriptor kèm theo|
|>> |  Chèn thêm stdout vào file có sẵn, nếu file không tồn tại sẽ tạo file mới. Không cần file descriptor kèm theo|
|2>  |  Tạo file mới chứa stderr, nếu file đã tồn tại sẽ ghi đè lên. Cần file descriptor kèm theo|
|2>>  |  Chèn thêm stderr vào fiel có sẵn, nếu file chưa tồn tại sẽ tạo mới. Cần file descriptor kèm theo|
|&>  |  Tạo file mới chứa stdout và stderr, nếu file đã tồn tại sẽ ghi đè lên. Không cần file descriptor kèm theo|
|<  |  Gửi nội dung file ra màn hình input. Không cần file descriptor kèm theo|
|<< |  Chỉ gửi những dòng khai báo ra màn hình input. Không cần file descriptor kèm theo|
|>  |  Tạo file mới chứa stdout, nếu file đã tồn tại sẽ ghi đè lên. Không cần file descriptor kèm theo|
|<>  |  Nội dung file được dùng cho cả input và output. Không cần file descriptor kèm theo|

**Mẹo nhỏ:**

Nếu bạn muốn thoát khỏi một lượng data khổng lồ từ 1 chương trình nào đó hãy redirect nó đến** /dev/null** (đây là device kết nối đến "hư không"). Ví dụ bạn mún redirect các stderr vào hư không:

`$ bigprogram 2> /dev/null`

Khi muốn chương trình nhận input từ file cho đến dòng tồn tại ký tự EOF (End of File), ta gõ lệnh:

`$ someprogram << EOF`

Một vài chương trình đòi hỏi ta phải kết thúc input bằng việc gửi tổ hợp phím CTRL + D để gửi ký hiệu EOF đến chương trình.


### 1.3. Pipe data:

Pipe data được sử dụng trong trường hợp ta muốn lấy output của program1 đem làm input của program2. Cách sử dụng như sau:

`$ proram 1 | program 2 | program 3`

Một ví dụ cụ thể hơn, ta mún xuất biến $PATH ra cả stdoutput lẫn vào file2.txt, khi đó ta sẽ dùng lệnh **tee** như sau:

`$ echo ls /etc/ | grep sys | tee file2.txt`

![](https://images.viblo.asia/bf51d9ec-04dc-4e9d-a203-658684528bed.JPG)

Câu lệnh trên lọc các file hoặc folder chứa keyword "sys" trong đường dẫn /etc và nhập vào file2.txt cũng như thể hiện ra màn hình.

**Lưu ý**: nếu file đã tồn tại lệnh **tee** sẽ ghi đè lên data đã có, để chèn thêm data ta dùng option **-a** (append) cho lệnh **tee **

### 1.4. Khởi tại command line:

Trong Linux đôi khi ta muốn thực hiện các thao tác phức tạp như delete tất cả các file thuộc về một user nào đó. lệnh rm không có option để hỗ trợ ta việc này. Ta thực thi yêu cầu trên bằng cách kết hợp lệnh **find** nhằm tìm kiếm tất cả các file thuộc về 1 user nhất định sau đó **pipe** với lệnh **rm** để xóa các file đó.

```
$ find / -user yoda | rm -f
```

Tuy nhiên gõ lệnh trên có khả năng là máy bạn sẽ bị tràn bộ nhớ và không thực thi lệnh trên được vì nó phải tìm cho bằng hết các file liên quan trong hệ thống từ root (sẽ rất rất nhiều) sau đó mới tiến hành xóa từng file một, vậy nên dùng lệnh trên chưa thực sự tối ưu. Thay vào đó ta sử dụng lệnh **xargs**.

> xargs [options] [command [initial-arguments]]


* **options** là tùy chọn của chính xargs, các option này không được pass vào command, có thể đặt nhiều option khác nhau trong dấu **" "** . 

* **command** là lệnh mà ta muốn thực thi. 

* **initial-argument** là danh sách các đối số ta muốn pass vào command

Trở lại với ví dụ trên, ta ứng dụng lệnh xargs như sau:

`$ find / -user yoda | xargs -d "\n"  rm`

**-d "\n"** : chính là **option** nhằm chỉ rằng delimeter của hàm xargs chính là new line (hàm find ngăn cách các file tìm được bằng 1 new line)

Câu lệnh trên có nghĩa là tìm file thuộc sỡ hữu của user có tên là yoda từ thư mục root sau đó xóa file đó ngay lập tức và lặp lại quá trình trên, nó khác với cách thực thi của ví dụ đầu ở chỗ tìm được đến đâu nó xóa luôn tới đấy chứ không chờ đến khi tìm hết mới xóa một lần.
 
 Ngoài câu lệnh trên ta có thể dùng dấu **backtick** với kết quả tương tự.
 
![](https://images.viblo.asia/2d3701ad-f879-4d99-90e8-5a6508df7ba6.JPG)

Tuy nhiên **backtick** sẽ không thực hiện được trong các trường hợp phức tạp và bạn cũng không thêm được các option như với lệnh **xargs**. Backtick còn thường dễ bị nhầm lẫn với quotation mark (ngoặc kép) nên trong một số shell có hỗ trợ ký tự **$** để thay thế **backtick**

```
rm $ (find / -user yoda ) 
```
 
 Vậy là chúng ta đã kết thúc phần 2 của chương 1 rồi, các bạn nhớ phải trực tiếp gõ lệnh để hiểu và nhớ nhé, có gì thắc mắc hãy để lại comment dưới post mình sẽ giải đáp nhé.