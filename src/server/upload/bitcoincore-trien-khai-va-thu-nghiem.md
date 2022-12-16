![](https://images.viblo.asia/b0420fac-40cc-4a85-9e99-3b4f39e5c053.png)

Thời gian gần đây, việc Bitcoin trở thành một hiện tượng và được sự quan tâm rất lớn của nhiều nhà đầu tư đã khiến cho nhiều bài báo chí phải tốn không biết bao nhiêu giấy mực. Công nghệ Blockchain đã được đưa vào trong vận hành Bitcoin đã thể hiện tính chất an toàn và có hiệu quả.
# Cài đặt Bitcoin Core cho node mạng
Bài viết này thử triển khai mã nguồn mở Bitcoin Core để kiểm thử, thực nghiệm và nắm phương thức hoạt động cơ bản nhất của hệ thống Bitcoin. Các chức năng cơ bản nhất như triển khai peer-to-peer Bitcoin network node, phương thức giao dịch, ví điện tử cũng sẽ được triển khai nhằm xác định cách thức hoạt động của hệ thống này. 
Trước hết, ta thử triển khai mã nguồn mở BitcoinCore, để tải mã nguồn của bitcoin core, ta clone thẳng từ Github về:
```
$ git clone https://github.com/bitcoin/bitcoin.git
Cloning into 'bitcoin'...
remote: Counting objects: 109784, done.
remote: Compressing objects: 100% (7/7), done.
remote: Total 109784 (delta 4), reused 3 (delta 2), pack-reused 109775
Receiving objects: 100% (109784/109784), 95.23 MiB | 881.00 KiB/s, done.
Resolving deltas: 100% (76914/76914), done.
```
Trong thư mục bitcoin, ta đã có đầy đủ mã nguồn của bitcoin core.
```
$ cd bitcoin/
```
Để cài đặt bản bitcoin mới nhất với tính ổn định cao, thường chúng ta sẽ chọn version nào đã được đánh giá ổn định tốt và cài đặt cho hệ thống cần thử nghiệm để triển khai.
```
$ git tag
noversion
v0.1.5
v0.1.6test1
v0.10.0
v0.10.0rc1
....
v0.16.0
v0.16.0rc1
v0.16.0rc2
v0.16.0rc3
…
```
Từ thông tin trên ta thấy được phiên bản v0.16.0 là phiên bản ổn định nhất của bitcoin core. Để đồng bộ code với version này thì ta sẽ đồng bộ bằng một số lệnh git sau:
```
$ git checkout v0.16.0
warning: refname 'v0.16.0' is ambiguous.
Previous HEAD position was 66bc647e8... doc: Update manpages to 0.16.0
Switched to branch 'v0.16.0'
$ git status
On branch v0.16.0
nothing to commit, working tree clean
```
Đến đây, mục tiêu của bài viết là cài đặt thử command-line bitcoin client để chạy thử các câu lệnh trên terminar và xem cách hoạt động của hệ thống. Chú ý 1 điều là bài viết dùng MacOS nên có thể sẽ không gần giống với các hệ thống khác. Bây giờ, ta thử tiến hành build bitcoin client.
```
$ ./autogen.sh 
glibtoolize: putting auxiliary files in AC_CONFIG_AUX_DIR, 'build-aux'.
glibtoolize: copying file 'build-aux/ltmain.sh'
glibtoolize: putting macros in AC_CONFIG_MACRO_DIRS, 'build-aux/m4'.
glibtoolize: copying file 'build-aux/m4/libtool.m4'
glibtoolize: copying file 'build-aux/m4/ltoptions.m4'
glibtoolize: copying file 'build-aux/m4/ltsugar.m4'
glibtoolize: copying file 'build-aux/m4/ltversion.m4'
glibtoolize: copying file 'build-aux/m4/lt~obsolete.m4'
…
```
Thực hiện xong bước này, ta có thể bắt đầu compile cho bitcoin core
```
$ ./configure 
checking build system type... x86_64-apple-darwin14.5.0
checking host system type... x86_64-apple-darwin14.5.0
checking for a BSD-compatible install... /usr/bin/install -c
checking whether build environment is sane... yes
checking for a thread-safe mkdir -p... build-aux/install-sh -c -d
checking for gawk... gawk
checking whether make sets $(MAKE)... yes
checking whether make supports nested variables... yes
checking whether to enable maintainer-specific portions of Makefiles... yes
checking whether make supports nested variables... (cached) yes
…
```
Tiếp theo, ta chỉ việc make là install được. Chú ý là để ./confgure được thì các thư viện cần thiết phải được cấu hình đầy đủ nha.
```
$ ./configure --with-gui
….
Options used to compile and link:
  with wallet   = yes
  with gui / qt = yes
    qt version  = 5
    with qr     = auto
  with zmq      = no
  with test     = yes
  with bench    = yes
  with upnp     = auto
  use asm       = yes
  debug enabled = no
  werror        = no

  target os     = darwin
  build os      = darwin

  CC            = gcc
  CFLAGS        = -g -O2
  CPPFLAGS      =  -DHAVE_BUILD_INFO -D__STDC_FORMAT_MACROS -isystem /opt/local/include -I/opt/local/include/db48 -I/usr/local/Cellar/berkeley-db@4/4.8.30/include -DMAC_OSX
  CXX           = g++ -std=c++11
  CXXFLAGS      = -g -O2 -Wall -Wextra -Wformat -Wvla -Wformat-security -Wthread-safety-analysis -Wno-unused-parameter -Wno-self-assign -Wno-unused-local-typedef -Wno-deprecated-register -Wno-implicit-fallthrough
  LDFLAGS       =  -Wl,-headerpad_max_install_names -Wl,-dead_strip
  ARFLAGS       = cr
```
Tiếp đến, ta compile source code và cài vào trong máy của chúng ta.
```
$ make
…
CXX      qt/test/qt_test_test_bitcoin_qt-moc_wallettests.o
  CXXLD    qt/test/test_bitcoin-qt
ld: warning: directory not found for option '-L/usr/local/Cellar/berkeley-db@4/4.8.30/lib'
  CXX      test/test_test_bitcoin_fuzzy-test_bitcoin_fuzzy.o
  CXXLD    test/test_bitcoin_fuzzy
ld: warning: directory not found for option '-L/usr/local/Cellar/berkeley-db@4/4.8.30/lib'
Making all in doc/man
```
Nếu mọi thứ diễn ra tốt đẹp, Bitcoin Core đã được biên dịch. Bước cuốn cùng là việc cài đặt các chương trình chạy được vào hệ thống dùng lệnh sudo make install.
```
$ sudo make install
Password:
...
libtool: install: /usr/bin/install -c bitcoind /usr/local/bin/bitcoind
libtool: install: /usr/bin/install -c bitcoin-cli /usr/local/bin/bitcoin-cli
libtool: install: /usr/bin/install -c bitcoin-tx /usr/local/bin/bitcoin-tx
libtool: install: /usr/bin/install -c test/test_bitcoin /usr/local/bin/test_bitcoin
libtool: install: /usr/bin/install -c bench/bench_bitcoin /usr/local/bin/bench_bitcoin
libtool: install: /usr/bin/install -c qt/bitcoin-qt /usr/local/bin/bitcoin-qt
libtool: install: /usr/bin/install -c qt/test/test_bitcoin-qt /usr/local/bin/test_bitcoin-qt
 ../build-aux/install-sh -c -d '/usr/local/include'
…
```
Thư mục mặc định cài đặt bitcoind là /usr/local/bin. Bạn có thể xác nhận lại việc Bitcoin Core đã được cài đặt chính xác hay chưa bằng việc hỏi lại hệ thống đường dẫn của file chạy, như sau đây:
```
$ which bitcoind
/usr/local/bin/bitcoind
```
Như vậy là ta đã xác định được là bitcoin core đã được cài đặt thành công trong hệ thống.
# Vận hành Bitcoin Core node
Thông thường, để vận hành một hệ thống mạng peer-to-peer cho Bitcoin Core, các máy tính tham gia vào mạng này sẽ triển khai một nút Bitcoin Core tương ứng. Mỗi node mạng này sẽ chứa copy tất cả các thông tin của chuỗi block đã được sinh ra trong hệ thống blockchain này. Do đó, khi dữ liệu blocks của một hệ thống lớn lên, mỗi node mạng cần phải có đủ tài nguyên để lưu trữ toàn bộ copy của các dữ liệu blocks này. Theo khuyến cáo của tài liệu [3] thì mỗi node mạng này với full-index cần 2GB RAM và 125 GB không gian ổ đĩa. Các node của bitcoin cũng cần phải truyền và nhận giao dịch bitcoin và block, do đó tiêu thụ một lượng đường truyền internet.
* Tiến hành chạy thử bitcoind, vận hành hệ thống.
Trước tiên, để cấu hình username/password cho Bitcoin Core node, người quản trị cần cấu hình lại trong file cấu hình cho đảm bảo an toàn cho hệ thống này. Thông thường, người dùng sẽ tạo một file cấu hình trong thư mục ./bitcoin. File cấu hình này sẽ có tên là ./bitcoin/config với thông tin và username/password như sau:
```
$ vi ~/.bitcoin/bitcoin.conf
rpcuser=thanhbitcoin
rpcpassword=***********
```
Trong file config này, chúng ta có thể cấu hình các thông số tuỳ chọn cho bitcoind để không phải chỉ định trong quá trình thực thi lệnh trên terminater. Để xem toàn bộ tuỳ biến cho tham số cần thiết thì có thể xem trong câu lệnh bitcoind --help. Một số tham số cần thiết có thể cấu hình trong file config được tài liệu [3] liệt kê như sau:
> alertnotify Chạy một lệnh đặc biệt để gửi alert khẩn cấp tới chủ sở hữu của node, thường là bằng email.
> 
> conf Một ví trí thay thế cho configuration file. Chỉ tương thích với tham số của bitcoindcommand-line bởi nó không thể bên trong chính configuration file.
> 
> datadir Thư mục và filesystem để đặt dữ liệu blockchain. Mặc định thì là .bitcoin dưới thư mục home. Chắc chắn rằng thư mục này có không gian khoảng trống vài gigabytes.
> 
> prune Giảm yêu cầu về lưu trữ ổ cứng tới con số megabytes này, bằng việc xóa bỏ những block cũ. Dùng tùy chọn này trên resource-constrained node, là cái không chứa được toàn bộ blockchain.
> 
> txindex Quản lý index cho giao dịch. Điều này có nghĩa toàn bộ copy của blockchain cho phép bạn lập trình nhận bất kỳ giao dịch nào bằng ID.
> 
> maxconnections Thiết lập tổng số node từ đó chấp nhận kết nối. Giảm con số này đồng nghĩa với việc giảm việc tiêu thụ băng thông đường truyền. Dùng nó khi bạn có giới hạn dữ liệu hoặc đường truyền trả theo gigabyte.
> 
> maxmempool Giới hạn memory pool của giao dịch tới con số megabytes này. Dùng tùy chọn này để giảm độ dùng memory của node.
> 
> maxreceivebuffer/maxsendbuffer Giới hạn bộ đệm memory cho mỗi kết nối tới con số này nhân với 1000 bytes. Dùng cho memory-constrained node.
> 
> minrelaytxfee Thiết lập phí thấp nhất cho giao dịch mà bạn sẽ chuyển tiếp. Phí nhỏ hơn con số này sẽ được coi như bằng 0. Dùng tùy chọn này trên memory-constrained node để giảm kích thước của pool giao dịch in-memory.
> 
> Index cơ sở dữ liệu giao dịch và tùy chọn txindex

Như vậy, Bitcoin Core client đã có thể thử nghiệm trên hệ thống. Đầu tiên, client sẽ download toàn bộ block hiện có để tạo thành hệ thống blockchain. Đương nhiên, nếu hệ thống có khối lượng blocks lớn thì thời gian download copy các blocks này sẽ mất rất nhiều thời gian. Để chạy bitcoind ở backgroud thì có thể gán thêm option -daemon.
```
$ bitcoind -daemon
Bitcoin server starting
```
Như vậy, server của bitcoin core đã được khởi động để sẵn sàng giao dịch cho các client trong hệ thống. Để kiểm tra trạng thái của server thì ta có thể kiểm tra được trạng thái đang chạy của server như thế nào như sau:
```
$ bitcoind -printtoconsole
2018-03-09 10:57:11
2018-03-09 10:57:11 Bitcoin Core version v0.16.0 (release build)
2018-03-09 10:57:11 InitParameterInteraction: parameter interaction: -whitelistforcerelay=1 -> setting -whitelistrelay=1
2018-03-09 10:57:11 Assuming ancestors of block 0000000000000000005214481d2d96f898e3d5416e43359c145944a909d242e0 have valid signatures.
2018-03-09 10:57:11 Setting nMinimumChainWork=000000000000000000000000000000000000000000f91c579d57cad4bc5278cc
2018-03-09 10:57:11 Using the 'sse4' SHA256 implementation
2018-03-09 10:57:11 Using RdRand as an additional entropy source
```
Kiểm tra trạng thái tức thời của bitcoin core node, ta có thể kiểm tra như sau:
```
$ bitcoin-cli -getinfo
{
  "version": 160000,
  "protocolversion": 70015,
  "walletversion": 159900,
  "balance": 0.00000000,
  "blocks": 201448,
  "timeoffset": -2,
  "connections": 8,
  "proxy": "",
  "difficulty": 2864140.507810974,
  "testnet": false,
  "keypoololdest": 1520588275,
  "keypoolsize": 1000,
  "paytxfee": 0.00000000,
  "relayfee": 0.00001000,
  "warnings": ""
}
```
Ta nhận được một dữ liệu với định dạng JSON. Một số thông số quan trọng nhận về có thể giải thích như sau: version của bitcoin client (160000) là 0.16.0; bitcoin protocol là 70015, version của ví là 159900; số tiền trong ví là 0.0000000; số block hiện tại là 201448; giá trị PoW là 2864140.507810974; ...
# Thiết lập ví và mã hoá
Việc đầu tiên ta cần phải thiết lập ví và tạo mã hoá cho ví. Ta dùng câu lệnh encryptwallet để thực hiện thao tác này.
```
$ bitcoin-cli encryptwallet 1234567890
wallet encrypted; Bitcoin server stopping, restart to run with encrypted wallet. The keypool has been flushed and a new HD seed was generated (if you are using HD). You need to make a new backup.
```
Mật khẩu “1234567890” được dùng để mã hoá ví của client. Để biết được ví có được mã hoá hay không thì ta dùng câu lệnh getinfo là có thể xác nhận được. 
```
$ bitcoin-cli -getinfo
{
  "version": 160000,
  "protocolversion": 70015,
  "walletversion": 159900,
  "balance": 0.00000000,
  "blocks": 236695,
  "timeoffset": 0,
  "connections": 3,
  "proxy": "",
  "difficulty": 11187257.46136079,
  "testnet": false,
  "keypoololdest": 1520611889,
  "keypoolsize": 1000,
  "unlocked_until": 0,
  "paytxfee": 0.00000000,
  "relayfee": 0.00001000,
  "warnings": ""
}
```
Trong kết quả trả về, thông số unlocked_until là một trường dữ liệu đã được thêm mới với giá trị là 0. Có nghĩa là ví đã được khoá. Để mở khoá của ví, ta dùng câu lệnh walletpassphrase. Dùng câu lệnh sau, ta mở được khoá ví và chỉ định sau 360s thì ví lại khoá lại.
```
$ bitcoin-cli walletpassphrase 1234567890 360
```
Tiếp tục dùng getinfo để lấy thông tin
```
$ bitcoin-cli -getinfo
{
  "version": 160000,
  "protocolversion": 70015,
  "walletversion": 159900,
  "balance": 0.00000000,
  "blocks": 238767,
  "timeoffset": -2,
  "connections": 7,
  "proxy": "",
  "difficulty": 12153411.70977583,
  "testnet": false,
  "keypoololdest": 1520611889,
  "keypoolsize": 1000,
  "unlocked_until": 1520613383,
  "paytxfee": 0.00000000,
  "relayfee": 0.00001000,
  "warnings": ""
}
```
* Backup ví và dump dữ liệu của ví
Trong thao tác này ta thử tiến hành backup ví và tiến hành restore lại ví của hệ thống client. Giả sử ta tiến hành backup vào file walet.bk như sau:
```
$ bitcoin-cli backupwallet wallet.bk
```

* Địa chỉ ví và transation
Để tạo địa chỉ ví, ta thực hiện câu lệnh sau:
```
$ bitcoin-cli getnewaddress
3HwW4D95K9fvrnd7FJwnRJF3qmDTgtriu5
```
Để xác nhận số tiền trong ví, ta có thể sử dụng câu lệnh sau:

```
$ bitcoin-cli getreceivedbyaddress 3HwW4D95K9fvrnd7FJwnRJF3qmDTgtriu5 0
0.00000000
```
Tạm thời đến đây ta đã biết được phần nào việc thiết lập cho Bitcoin Core.

Còn một số thao tác về hoạt động của mạng private bitcoin core thì xin hẹn bài sau bao gồm các nội dung sau:

a. Private mining 

b. Transaction 

c. Decode transaction 

d. Khám phá block trong chain 

# Tài liệu tham khảo 
[1]. https://viblo.asia/p/tu-thiet-lap-private-blockchain-dua-tren-nen-tang-ethereum-RQqKLg0457z

[2]. http://bitcoinbook-builds.mkvd.net/translations/ja/chapter-3.html

[3]. https://phuongnq.me/2018-01-06-mastering-bitcoin-chapter3/