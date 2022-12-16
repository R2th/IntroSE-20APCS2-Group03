# 1. Giới thiệu
Các phần mềm trên Linux không tự đóng gói sẵn. Bởi vì chạy trên chạy trên nhìều hệ thống khác nhau trong họ Unix như Solaris, AIX, HP-UX… thậm chí các phần mềm đó có thể chạy trên rất nhiều vi xử lý khác nhau như Intel, Motorola, PPC… Có được sự đa năng đó là nhờ vào tính đa nền (portable) của ngôn ngữ C/C++ nhưng đòi hỏi chúng ta phải biên dịch lại phần mềm từ mã nguồn cho hệ thống mà chúng vận hành. Bạn sẽ tự hỏi là tại sao các nhà phát triển lại không biên dịch sẵn cho chúng ta trên hệ thống thông dụng nào đó như Linux chẳng hạn.

Các phần mềm này là phần mềm mã nguồn mở và các nhà phát triển không có cách gì hơn là để lại phần biên dịch cho chúng ta. Tuy nhiên bạn đừng thất vọng vì có một số nhà phát triển rất là tốt bụng có thể biên dịch sẵn cho chúng ta ra các gói có dạng rpm và cùng với sự hỗ trợ của công ty Red Hat chúng ta cũng đã có những chương trình quản lý các phần mềm hiệu quả không kém gì trên Windows như RPM (Redhat Package Manager).
![](https://images.viblo.asia/7702595f-ccd0-4764-8337-56d2b594c6e3.jpeg)


# 2. Căn bản của việc cài đặt
Điều đầu tiên khi bạn tiến hành cài đặt là bạn phải có mã nguồn của gói đó trước. Hãy lên mạng search bất kì gói nào bạn thích như thư viện Gtk+ hoặc Gnome… Sau khi tải về, thông thường có dạng là .gz hoặc .bz2, đây đều là 2 chuẩn nén khác nhau, sau khi giải nén bằng gunzip cho gz hoặc bunzip2 cho bz2 thì các gói sẽ có dạng mới là tar, cũng là một chuẩn nén khác, bạn có thể giải nén bằng lệnh, tar -xvf… Thế nhưng đế dễ dàng và tiết kiệm dung lượng ổ đĩa thì chúng ta có thể gộp các câu lệnh đó thành 1 như sau:

– Đối với gói .gz:  
```
# tar -zxvf tengoi.gz
```
– Đối với gói .bz2:
```
# tar -jxvf tengoi.bz2
```
Sau khi giải nén xong và tìm tập tin INSTALL để đọc cụ thể cho phần hướng dẫn cài đặt. Thế nhưng hầu như các gói đều tuân theo các thao tác tuần tự sau:
```
# ./configure
# make
# make install
```
 **./configure…**  Thực chất configure là một shell script sẽ kiểm tra những yêu cầu của hệ thống của bạn có đáp ứng đủ để cài đặt gói lên không. 
 
 Ví dụ:  Như một số gói đòi hỏi bạn phải có sẵn thư viện đồ họa Gtk 2.4 trở lên hoặc là thư viện để giải nén nhạc Mp3…

Rất nhiều gói có sự phụ thuộc như thế chứ các gói khi tải về không hề có sẵn các gói tương ứng cần thiết cho nó. Khi bạn chạy configure xong kết quả sẽ cho bạn biết các gói nào cần thiết để cài đặt. Nhiệm vụ của bạn không gì hơn là phải tìm các gói phụ thuộc đó cài lên máy rồi mới tiếp tục việc cài đặt. Nếu như hệ thống của bạn thỏa mãn đầy đủ các yêu cầu để cài đặt thì các Makefile sẽ được tạo ra. Makefile là một file đặc biệt của tiện ích make nhằm hướng dẫn biên dịch mã nguồn của gói ra dạng thực thi.

Sau khi bạn thực thi lệnh **‘make’** xong thì toàn bộ mã nguồn của gói đã được biên dịch sang dạng thực thi nhưng các file thực thi vẫn còn nằm trên thư mục hiện hành. Do đó bạn cần phải thực hiện thêm lệnh **‘make install’** để chép các file thực thi đó sang đúng vị trí của nó trên hệ thống. Nếu như không có thông báo lỗi gì xảy ra thì bạn đã hòan tất việc cài đặt gói lên hệ thống của mình.

# 3. Loại bỏ một gói
Nếu bạn mong muốn lọai bỏ một gói đã cài đặt trên hệthống thì cách duy nhất là bạn phải vào lại thư mục mã nguồn của gói và gõ lệnh
```
make uninstall
```
Thông thường bạn sẽ có các câu lệnh sau:
```
make clean
make distclean
```
# 4. Quản lý các gói
Do việc xóa bỏ một gói như trên rất là phiền phức đôi lúc bạn chẳng thể xóa bỏ được nếu như mất đi mã nguồn, cho nên bạn có thể thay vì cài nó vào thư mục mặc định là **/usr** thì bạn có thể cài vào các thư mục của riêng bạn, ví dụ như bạn có thể tạo thư mục ‘**/soft’…**.  Sau đó để cài gói gedit thì bạn tạo thêm thư mục **/soft/gedit** và dùng lệnh **./configure…** bạn thêm tùy chọn sau:
```
./configure –prefix=/soft/gedit
```
# 5. Lời kết
Đối với cách cài trên thì bạn dể dàng quản lý các gói của mình nhưng đối với các dạng thư viện thì bạn nên cài nó vào thư mục **/usr** hơn là thư mục riêng của mình vì một số gói sẽ tìm các thư việc trên thư mục mặc định **/usr** và **/usr/local** hơn là các thư mục riêng người dùng nên nếu bạn cài lên thư mục riêng thì đôi lúc các thư viện đó sẽ không được tìm ra. Thông thường lệnh **./configure** đi đôi với rất nhiều tùy chọn cho phép bạn lựa chọn nhiều tính năng khác nhau, bạn gõ để mà biết đầy đủ các tùy chọn của gói:
```
./configure –help
```
# 6. Cài đặt phần mềm trên Redhat – Centos
Bản thân các gói RPM không chứa chương trình cài đặt, nó chỉ chứa các thông tin về các file sẽ được cài đặt, thông tin mô tả về phần mềm chứa trong gói và các file nằm trong gói RPM sẽ được cài đặt vào thư mục nào trong hệ thống. Các gói phần mềm dạng RPM được cài đặt vào hệ thống nhờ vào chương trình RPM có trong hệ thống.

Cách đơn giản nhất để cài một gói RPM, chẳng hạn gói ***foobar-1.0-1.i386.rpm*** là dùng lệnh:
```
rpm -i foobar-1.0-1.i386.rpm
```
Để theo dõi quá trình install, bạn có thể thêm tham số:
```
rpm –ivh foobar-1.0-1.i386.rpm
```
Để uninstall package đã được cài:
```
rpm -e foobar
```
Nếu có một file RPM mà không biết nó là phần mềm nào, bạn có thể lấy thông tin bằng lệnh:
```
rpm -qpi koules-1.4-1.i386.rpm
```
Nếu đã lỡ xóa một vài file nào đó và không chắc chắn rằng file đó đang còn cần thiết cho chương trình nào đó, bạn có thể xem thử hệ thống đang thiếu file cần thiết nào:
```
rpm –Va
```
Bạn cũng có thể dùng lệnh yum để cài đặt phần mềm, vd bạn muốn cái webserver gõ lệnh sau
```
# yum install httpd
```
Sau đó nhấn -y để xác nhận, hoặc có thể tìm một gói cài đặt bằng cách dùng lệnh yum search, sẽ liệt kê các gói cần cài đặt
```
# yum search httpd
```
# 7. Cài đặt phần mềm trên Ubuntu – Debian
Cài đặt các file **.deb**

File này rất dễ cài, bạn chỉ cần click đúp vào file và trình cài đặt phần mềm trên hệ thống tự mở, click **“Install Package”** và chờ quá trình cài đặt hoàn tất.

**Chú ý:** Một số phần mềm yêu cầu máy phải cài sẵn một số Dependency, nếu không đủ các Dependency lúc cài đặt sẽ báo lỗi. Để giải quyết vấn đề Dependency với file .deb nhanh gọn có thể sử dụng gói Gdebi

Đây là một ứng dụng có giao diện người dùng, nó cho phép bạn cài đặt các gói .deb đã dowload sẵn và nằm trên HDD, còn các Dependency phải kết nối Internet đề Gdebi tự tìm và download giúp bạn. Gdebi cũng có thể chạy trong chế độ non-GUI bằng cách chuyển tới folder chứa file .deb và gõ sudo gdebi package_name.deb tại nhắc lệnh và vẫn có khả năng giải quyết các dependency.

Cài đặt các file **.rpm**

Bạn nên sử dụng gói Alien để chuyển từ **.rpm** sang **.deb** cho dễ cài đặt

– Mở Terminal lên, gõ vào sudo apt-get install alien đề download và cài đặt gói Alien thông qua tiện ích quản lý gói APT

Gõ vào Password ứng với User bạn đang Logon. Gõ **‘y’**  để đồng ý cài đặt gói Alien

– Sau khi cài xong Alien, bạn move file **.rpm** tới Desktop rồi mở Terminal, gõ cd Desktop

– Bây giờ, gõ **sudo alien -k filename.rpm** để convert từ file **.rpm -> .deb.** Sau đó bạn cài file **.deb** như trên

Cài đặt file **.bin**

Download và save file **.bin** tới Desktop. Mở Terminal và gõ cd Desktop

– Gõ tiếp **sudo chmod +x filename.bin**

– Gõ .**/filename.bin**

Sau đó chương trình sẽ cài trong Terminal!

# 8. Cài đặt phần mềm từ TARBALL
Một tarball (thường là các file **.tar , .tar.gz , .tgz , .tar.bz2 , .tbz2** ) gồm có mã nguồn cho chương trình mà bạn phải tự biên dịch, trình biên dịch (compile) như GCC… thì thường có sẵn trong Linux . Các bước cài đặt Tarball về cơ bản như sau

Giải nén tarball

Tar làm việc với một chương trình nén như gzip để nén các file, đây là lý do tại sao bạn thấy hai đuôi mở rộng (.tar và .gz). Các đuôi mở rộng này đôi khi còn được viết tắt là .tgz

Tuy nhiên không cần phải chạy hai chương trình riêng biệt để bung các file mà chúng ta chỉ cần lệnh cho tar chạy các file thông qua gzip để giải nén. Bạn có thể sử dụng tiện ích đồ họa để bung các file này bằng cách kích đúp vào tarball từ bộ quản lý file của mình, hoặc có thể thực hiện điều đó bằng dòng lệnh:
```
# tar zxvf file.tar.gz hoặc
# tar zxf file.tar.gz
# tar zxf file.tgz
# tar jxf file.tar.bz2
# tar jxf file.tbz2
```
Các tùy chọn chúng ta cung cấp cho tar được mô tả bên dưới:

• -z để lệnh cho tar chạy file này thông qua gzip để giải nén (sử dụng –j cho các file bzip)

• -x để bung các file

• -v cho “verbose”, để chúng ta có thể thấy danh sách các file đang bung

• -f để lệnh cho tar rằng chúng ta đang làm việc với một file

**Configure**

Khi các file được bung ra, mở một command terminal và vào thư mục nơi các file được giải nén trong đó. Trước khi biên dịch, chúng ta cần chạy kịch bản cấu hình. Công việc của kịch bản cấu hình là kiểm tra hệ thống của bạn về tất cả những gì phần mềm cần thiết để biên dịch chương trình từ mã nguồn thành chương trình nhị phân có thể sử dụng được. Nó sẽ tìm kiếm những thứ như phiên bản GCC và các công cụ cần thiết khác để xây dựng phần mềm. Khi bạn nằm trong thư mục với tất cả các file đã được bung từ tarball (sử dụng lệnh cd để change directory), hãy đánh vào ./configure

Nếu tất cả đều diễn ra tốt đẹp, lệnh trên sẽ kiểm tra một loạt các phần khác nhau của hệ thống bạn, sau đó đưa bạn trở lại dòng lệnh như bên dưới:

Vấn đề gây ra lỗi chung nhất trong bước này là mất dependency. Hãy quan sát bất cứ lỗi nào mà bạn gặp phải để xác định xem gói phần mềm nào bị thiếu.

**Make**

Đây là phần cốt lõi của quá trình – nơi chúng ta biên dịch mã nguồn thành một chương trình có khả năng chạy. Đây là bước đơn giản nhất, chỉ yêu cầu một lệnh đơn giản. Nếu bước cấu hình hoàn tất mà không có lỗi, bạn chỉ cần đánh vào make

Đối với các chương trình lớn, bước này có thể mất đến vài phút. Khi quá trình kết thúc, bạn sẽ được đưa quay trở lại shell nhắc lệnh

Chương trình của bạn lúc này đã hoàn toàn sẵn sàng cho sử dụng. Mặc dù vậy bạn vẫn nên chạy thêm một bước nữa để chương trình có thể được cài đặt hoàn toàn vào đúng location và có thể chạy từ bất cứ đâu.

**Make install**

Tất cả những gì cần thiết lúc này là copy chương trình vừa được biên dịch vào các thư mục hệ thống như /usr/bin để có thể chạy từ bất cứ thư mục nào mà không cần chỉ định đường dẫn đến các file. Do nó sẽ copy đến một thư mục bên ngoài thư mục chủ nên bạn có thể cần đến các đặc quyền root. Nếu bước này được hoàn tất mà không có lỗi, bạn hãy chạy sudo make install để copy các file. Đến đây, bạn đã hoàn thành xong phần việc của mình. Chương trình mới của bạn có thể được sử dụng giống như bất cứ chương trình nào đang chạy khác.

Tham khảo: [Cài phần mềm từ source trên linux](https://vietcalls.com/cai-phan-mem-tu-source-tren-linux/)