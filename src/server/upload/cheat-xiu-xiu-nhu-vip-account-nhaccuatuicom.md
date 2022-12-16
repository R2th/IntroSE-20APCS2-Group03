### Lời Nói Đầu
Trước khi viết tiếp mình xin chú giải là mình không cố ý gây thương tổn gì cho NhacCuaTui nói riêng, chỉ là mình viết code để phục vụ cho 1 tí xíu nhu cầu cấp bách tí xíu. Mình nghĩ NhacCuaTui cũng biết lỗ hổng này từ lâu nhưng không hiểu sao họ lại không fix. Trong quá trình tìm hiểu thì ngoài việc mình có thể download playlist ... mình còn Vô Tình download được luôn của mode 320kb mà chỉ tài khoản VIP mới có quyền.

### Bài Toán & Vấn Đề
Sáng nay Má Mi nhờ download mấy bài nhạc cho Má Mi nghe. Ờ thì đơn giản thôi, nhưng Má Mi nói là 100 bài cơ, để Má Mi nghe đỡ chán. Thế là Đev Đít Đen tui cũng lên google rồi lục được tuyển tập nhạc mà Má Mi thích. (Con trai 32 nồi bánh chưng của má có hiếu quá!)

Vấn đề gặp phải là 
- Cái playlist đó không cho phép download toàn bộ.
- Download từng bài thì bắt phải xem quảng cáo rồi mới cho download.
- Tài khoản thường hoặc không đăng nhập chỉ được download ở mode 128k
- ~~Ở bài này mình chỉ viết script download 128kb nha, 320kb các bạn tự suy luận nhé !~~

### Coding
Thật sự là khi gặp vấn đề trên việc mình đầu tiên là mình lên google, nhưng đa số là soft bắt phải cài đặt và script thì bị lỗi không run được, nên mình tinh chỉnh lại xíu cho phù hợp với mình cho thuận tiện.

- Lúc đầu mình viết toàn bộ bằng Javasript
    -  Download bài hát và nén lại rồi download xuống.

- Nhưng mình thấy nó bất tiện nên mình đã tách ra làm 2 phần.
    - Lấy danh sách URLs cần download.
    - Download bằng bash shell. 

- Demo & Source Code: https://github.com/minhlong/Playlist-Downloader

```javascript
   /**
     * Download playlist from NhacCuaTui page
     * Ps: So sorry when i don't spend my time on your adverts.
     */
    function fun4MyMom() {
        var AJAX = [];
        var playListArr = Array.from(downloadPlaylist.listDownload);

        playListArr.forEach(function (x) {
            var url = "https://www.nhaccuatui.com/download/song/" + x.key + "_128";
            AJAX.push($.getJSON(url));
        });

        $.when.apply($, AJAX).done(function (data) {
            var urls = "";
            for (var i = 0, len = arguments.length; i < len; i++) {
                urls += arguments[i][0].data.stream_url + "\n"
            }

            if (urls) {
                download('fileList.txt', urls)
                console.info('Finish!')
            }
        });

        console.info('Processing...')
    };

```

![Shell](https://github.com/minhlong/Playlist-Downloader/raw/master/screenshots/shell.png?raw=true)

![Screenshot](https://github.com/minhlong/Playlist-Downloader/raw/master/screenshots/raw-code.png?raw=true)