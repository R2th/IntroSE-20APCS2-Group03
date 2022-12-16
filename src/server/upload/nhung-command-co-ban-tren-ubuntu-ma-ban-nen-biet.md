### [Những command cơ bản trên Ubuntu mà bạn nên biết](https://vantien.net/kien-thuc-chung/nhung-command-don-gian-tren-ubuntu-ma-ban-nen-biet/)

## 1. pwd
Đây là một trong những command được sử dụng thường xuyên nhất đó. Command pwd này bạn có biết nó viết tắt của từ nào không? Đó chính là print working directory. Như vậy thì chắc các bạn cũng đoán được ra tác dụng của nó là gì rồi phải không. Nó có tác dụng vô cùng đơn giản thôi. Đó chính là hiển thị ra thư mục làm việc hiện tại (working directory) của bạn.


Thêm một điều nữa là command này không có nhiều option lắm đâu (ít nhất là cho đến thời điểm bài viết này). Nó có 1 option đó là lấy ra link thật nếu như bạn đang ở trong 1 symlink. Giả sử mình có 1 symlink từ public/storage sang storage/app/public. Hãy xem sự khác biệt nhé.

## 2. cd
Nhìn command này mình nghĩ ai cũng đều từng sử dụng hay ít nhất là nhìn thấy rồi nhỉ. Trên Windows hay MacOS hay Linux đều có command này. Chính vì vậy theo mình thấy thì nó là command được sử dụng nhiều nhất. cd là viết tắt của từ change directory. Cái tên nói lên tất cả rồi nhỉ. Nó được sử dụng để thay đổi thư mục làm việc hiện tại. Ví dụ bạn đang ở folder storage mà muốn vào folder app chẳng hạn.
Command này cũng hỗ trợ chúng ta di chuyển nhiều cấp thư mục hay bất kỳ thư mục nào. Việc của các bạn chỉ cần chỉ định đường dẫn thư mục cần đến và Enter là xong. Việc còn lại hãy cứ để cd lo nhé.
Ngoài ra bạn có thể chuyển ra thư mục cha bằng cách chỉ định đường dẫn là ../. Thư mục ông là ../../. Thư mục cụ là ../../../. Thư mục cụ tổ là… à mà thôi.

## 3. ls
Command ls này là viết tắt của từ list. Tất nhiên rồi, nó được dùng để list tất cả các folder và file trong thư mục. Bạn có thể chỉ định folder muốn list ra, còn nếu trong trường hợp mà bạn không chỉ định thì nó sẽ chọn thư mục hiện tại và list ra.

Nó cũng có một vài option khá là hữu dụng đó. Với lệnh ls mặc định thì nó sẽ không list ra các hidden file (file ẩn) – những file bắt đầu bằng dấu chấm ví dụ như: .env, .htaccess, .hihihuhu,… Nếu bạn muốn hiển thị những file này thì dùng option -a nhé.

Các bạn có thể thấy mặc định nó chỉ lấy ra tên của file, folder thôi. Nếu các bạn muốn lấy thêm thông tin chi tiết khác như size, quyền, timestamps thì dùng option -l nhé.


## 4. cp & mv
cp là viết tắt của copy đó các bạn. Khỏi phải nói thì chắc các bạn cũng biết nó để làm gì rồi nhỉ. Command cp có 2 tham số đầu vào. Tham số đầu tiên là tên file/folder mà bạn muốn copy, còn tham số thứ 2 là thư mục mà bạn muốn copy đến. Ví dụ mình muốn copy file .env vào public:

Nếu bạn muốn copy 1 folder mà trong folder này có nhiều folder con, cháu khác thì bạn cần thêm option -R tức là recursive.

Command cp này cũng còn nhiều option hay nữa để việc copy trở lên hiệu quả hơn. Ví dụ bạn muốn copy tất cả file có đuôi .php vào folder public.

Bên cạnh copy thì ko thể thiếu move nhỉ. Command mv chính là thứ bạn cần đó. Về cơ bản cách dùng thì nó cũng giống như cp thôi. Tuy nhiên khi move folder có folder con cháu thì ko cần option -R nữa nhé.

## 5. mkdir & touch
Để tạo 1 folder thì bạn có thể dùng lệnh mkdir (make directory). Command này chỉ cần 1 tham số duy nhất đó là tên của folder mà bạn muốn tạo. Nếu folder đã tồn tại rồi thì sẽ bạn sẽ ko thể tạo được nữa nên là sẽ có 1 thông báo lỗi hiện ra.

Ở trên là tạo folder rồi thì bây giờ đến việc tạo file chứ nhỉ. Để tạo file thì mình sẽ phải sử dụng command touch. Lệnh touch này sẽ tạo ra 1 file rỗng với tên là tham số do bạn chỉ định.

## 6. rmdir & rm
Ở mục 5 là 2 command giúp cho các bạn tạo file và folder rồi thì command này sẽ giúp các bạn xóa đi folder/file mà các bạn mong muốn.

Để xóa một folder bạn có thể dùng command rmdir, viết tắt của remove directory. Tuy nhiên command này chỉ xóa được các thư mục rỗng thôi. Tức là nếu trong thư mục này tồn tại các file hay folder con thì bạn sẽ không thể xóa được.

Tiếp theo là 1 command mạnh mẽ hơn rmdir. Đó là rm, với command này bạn có thể xóa các file mà bạn muốn.

Đồng thời nó cũng xóa được folder (kể cả folder có file hay folder con khác bên trong) nếu bạn dùng thêm option -r nhé.

## 7. cat & tail
Để mà đọc nội dung của file thì bạn có khá là nhiều cách. Mục số 7 này sẽ giới thiệu cho bạn 2 câu lệnh giúp bạn làm điều đó.

Đầu tiên là bạn có thể sử dụng command cat – viết tắt của concatenate.

Tuy nhiên cần lưu ý là command cat này sẽ hiển thị ra toàn bộ nội dung file đó. Nên là nếu file bạn có 1 nghìn, 1 trăm nghìn dòng thì nó cũng vẫn sẽ hiển thị hết ra. Vậy nếu chỉ muốn hiển thị N dòng thôi mà không muốn hết thì sao? tail sẽ giúp bạn làm được điều đó. tail sẽ hiển thị ra 10 dòng cuối cùng của file. Nếu bạn muốn nhiều hơn thì sử dụng option -n <số dòng> nhé.

Ngoài ra mình hay dùng tail vì nó có 1 option rất hay đó là -f. Option này sẽ hiển thị ra các dòng của file được append mới vào theo thời gian thực. Rất phù hợp cho ai muốn check log server đó.