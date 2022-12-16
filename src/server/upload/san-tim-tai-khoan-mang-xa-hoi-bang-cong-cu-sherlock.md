`Các phương tiện truyền thông - Mạng xã hội là nơi mà những tin tặc lợi dụng để tìm hiểu thông tin về bất kỳ người hoặc mục tiêu cụ thể nào.`

Hôm nay - cũng như mọi ngày, tôi ngủ dậy, đánh răng rửa mặt, ăn sáng rồi đi làm. Và lúc đi làm thì mình có tìm hiểu khá nhiều thứ hay ho, sau đó lại chia sẻ cho các bạn cùng đọc để hiểu thêm. Chính vì lẽ đó, hôm nay mình lại chia sẻ cho các bạn một công cụ khá là hay, 'Săn tìm tài khoản mạng xã hội bằng công cụ sherlock'.

## Vậy, Sherlock là gì?

Sherlock là một công cụ mã nguồn mở viết bằng python có thể quét được tài khoản của người dùng được tạo bởi một người trên nhiều trang web (chủ yếu là các trang mạng xã hội, phương tiện truyền thông) với `screen_name` hoặc `username`.

Bạn có thể đọc qua source code của Sherlock tại github của nó `https://github.com/sherlock-project/sherlock`.

![source sherlock](https://manhnv.com/images/posts/hacking/san-tim-tai-khoan-mang-xa-hoi-bang-sherlock-tool/source-sherlock.png "source sherlock")

## Cài đặt Sherlock

* Clone the repo

    ```shell
    git clone https://github.com/sherlock-project/sherlock.git
    ```

    ![clone source sherlock](https://manhnv.com/images/posts/hacking/san-tim-tai-khoan-mang-xa-hoi-bang-sherlock-tool/clone-source-sherlock.png "clone source sherlock")

* Di chuyển vào thư mục `sherlock`

    ```shell
    cd sherlock
    ```

* Cài đặt python3 và python3-pip (nếu chưa có)
* Cài đặt các thư viện có trong file `requirements.txt`

    ```shell
    pip3 install -r requirements.txt
    ```

## Trải nghiệm Sherlock

### 1. Để xem help của Sherlock

```shell
$ python sherlock.py -h

usage: sherlock.py [-h] [--version] [--verbose] [--rank]
                   [--folderoutput FOLDEROUTPUT] [--output OUTPUT] [--tor]
                   [--unique-tor] [--csv] [--site SITE_NAME]
                   [--proxy PROXY_URL] [--json JSON_FILE]
                   [--proxy_list PROXY_LIST] [--check_proxies CHECK_PROXY]
                   [--print-found]
                   USERNAMES [USERNAMES ...]

Sherlock: Find Usernames Across Social Networks (Version 0.7.8)

positional arguments:
  USERNAMES             One or more usernames to check with social networks.

optional arguments:
  -h, --help            show this help message and exit
  --version             Display version information and dependencies.
  --verbose, -v, -d, --debug
                        Display extra debugging information and metrics.
  --rank, -r            Present websites ordered by their Alexa.com global
                        rank in popularity.
  --folderoutput FOLDEROUTPUT, -fo FOLDEROUTPUT
                        If using multiple usernames, the output of the results
                        will be saved at this folder.
  --output OUTPUT, -o OUTPUT
                        If using single username, the output of the result
                        will be saved at this file.
  --tor, -t             Make requests over Tor; increases runtime; requires
                        Tor to be installed and in system path.
  --unique-tor, -u      Make requests over Tor with new Tor circuit after each
                        request; increases runtime; requires Tor to be
                        installed and in system path.
  --csv                 Create Comma-Separated Values (CSV) File.
  --site SITE_NAME      Limit analysis to just the listed sites. Add multiple
                        options to specify more than one site.
  --proxy PROXY_URL, -p PROXY_URL
                        Make requests over a proxy. e.g.
                        socks5://127.0.0.1:1080
  --json JSON_FILE, -j JSON_FILE
                        Load data from a JSON file or an online, valid, JSON
                        file.
  --proxy_list PROXY_LIST, -pl PROXY_LIST
                        Make requests over a proxy randomly chosen from a list
                        generated from a .csv file.
  --check_proxies CHECK_PROXY, -cp CHECK_PROXY
                        To be used with the '--proxy_list' parameter. The
                        script will check if the proxies supplied in the .csv
                        file are working and anonymous.Put 0 for no limit on
                        successfully checked proxies, or another number to
                        institute a limit.
  --print-found         Do not output sites where the username was not found.
```

### 2. Xác định tên tài khoản cần dò quét

Chúng ta có thể lên các trang mạng xã hội như facebook, twitter, ... tìm lấy một username bất kỳ nào đó muốn dò quét.

Ở đây mình dùng luôn tài khoản của mình làm demo cho các bạn xem, với username là `nguyenmanh1997`

![manhnv](https://manhnv.com/images/posts/hacking/san-tim-tai-khoan-mang-xa-hoi-bang-sherlock-tool/nguyenmanh.png "manhnv")

### 3. Quét tài khoản

Bây giờ, mình đã chạy file `sherlock.py` bằng lệnh sau `python sherlock.py target_name -r --print-found` để tìm ra tất cả tài khoản trên các trang mạng truyền thông xã hội của mục tiêu tôi cần tìm hiểu.

![manhnv](https://manhnv.com/images/posts/hacking/san-tim-tai-khoan-mang-xa-hoi-bang-sherlock-tool/result-sherlock.png "manhnv")

**Lưu ý:**

* Tham số  `-r` trong lệnh trên sẽ sắp xếp danh sách các tài khoản được tìm thấy theo các trang web phổ biến nhất.
* Tham số `--print-found` sẽ chỉ hiển thị những trang tìm thấy tài khoản đó.

Bạn cũng có thể quét nhiều tài khoản cùng một lúc

```shell
python sherlock.py user1 user2 user3
```

![manhnv](https://manhnv.com/images/posts/hacking/san-tim-tai-khoan-mang-xa-hoi-bang-sherlock-tool/user1-2-3.png "manhnv")

Tất cả các tài khoản được tìm thấy sẽ lưu ra một tệp `.txt` cho từng tài khoản riêng.

![manhnv](https://manhnv.com/images/posts/hacking/san-tim-tai-khoan-mang-xa-hoi-bang-sherlock-tool/file.png "manhnv")


Bạn cũng có thể chạy bằng `docker` nếu bạn đã cài đặt docker.

```shell
docker build -t mysherlock-image .
```

Khi docker image được chạy lên bạn có thể chạy lệnh:

```shell
docker run --rm -t mysherlock-image user123
```

## Tổng kết

* Bạn có thể thấy ví dụ trên mình đã tìm kiếm tài khoản trên internet bằng cách sử dụng `sherlock.py` một cách đơn giản.
* Qua bài viết này mình cũng muốn nhắn nhủ rằng các bạn hãy sử dụng internet một cách cẩn thận, đưa ít thông tin cá nhân lên mạng xã hội thôi. Vì một khi trở thành mục tiêu của hacker thì những trang mạng bạn sử dụng sẽ luôn là nói tìm kiếm thông tin hữu ích cho hacker.

Cuối cùng thì cảm ơn các bạn đã đọc bài viết của mình. Và có thể ghé blog của mình [manhnv.com ](https://manhnv.com)để đọc nhiều bài khác hay ho hơn nữa nhé!