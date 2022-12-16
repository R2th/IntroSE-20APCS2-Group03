### 1. Mở đầu
Chắc hẳn ai trong chúng ta cũng từng thử tìm cách download video trên Youtube vì nhiều lý do khác nhau.

Hôm nay mình xin được giới thiệu một phương pháp đơn giản để download video Youtube bằng Python hoặc Command Line mà mình đã đọc được.

※ Mặc dù library nêu trong bài viết không vi phạm bản quyền, tuy nhiên chúng ta cũng cần có trách nhiệm với các video download từ Youtube.

### 2. Install 「youtube_dl」 library
Trước hết, chúng ta cần install library **youtube_dl**
```
pip install youtube_dl
```

### 3. Dowload video Youtube với Python
Để download 1 video Youtube, chúng ta chỉ cần tạo và chạy 1 file python với nội dung như dưới đây. 

Để download được video mong muốn, ta chỉ cần thay URL `https://www.youtube.com/watch?v=～` ở dòng thứ 5 bằng URL của video tương ứng.

※ Nếu giữ nguyên đoạn code dưới đây sẽ có thể download được 1 video ngắn của channel VTV24 :D
```
from __future__ import unicode_literals
import youtube_dl
ydl_opts = {}
with youtube_dl.YoutubeDL(ydl_opts) as ydl:
    ydl.download(['https://www.youtube.com/watch?v=dfIho5iC370'])
```

### 4. Download video Youtube bằng Command Line
Ngoài ra, sau khi install ta cũng có thể tiến hành download bằng command line.
Chỉ với command như dưới đây
```
youtube-dl [OPTIONS] URL [URL...]
```


#### Options
```
-h, --help                           Print this help text and exit
--version                            Print program version and exit
-U, --update                         Update this program to latest version.
                                     Make sure that you have sufficient
                                     permissions (run with sudo if needed)
-i, --ignore-errors                  Continue on download errors, for
                                     example to skip unavailable videos in a
                                     playlist
--abort-on-error                     Abort downloading of further videos (in
                                     the playlist or the command line) if an
                                     error occurs
--dump-user-agent                    Display the current browser
                                     identification
--list-extractors                    List all supported extractors
--extractor-descriptions             Output descriptions of all supported
                                     extractors
--force-generic-extractor            Force extraction to use the generic
                                     extractor
--default-search PREFIX              Use this prefix for unqualified URLs.
                                     For example "gvsearch2:" downloads two
                                     videos from google videos for youtube-
                                     dl "large apple". Use the value "auto"
                                     to let youtube-dl guess ("auto_warning"
                                     to emit a warning when guessing).
                                     "error" just throws an error. The
                                     default value "fixup_error" repairs
                                     broken URLs, but emits an error if this
                                     is not possible instead of searching.
--ignore-config                      Do not read configuration files. When
                                     given in the global configuration file
                                     /etc/youtube-dl.conf: Do not read the
                                     user configuration in
                                     ~/.config/youtube-dl/config
                                     (%APPDATA%/youtube-dl/config.txt on
                                     Windows)
--config-location PATH               Location of the configuration file;
                                     either the path to the config or its
                                     containing directory.
--flat-playlist                      Do not extract the videos of a
                                     playlist, only list them.
--mark-watched                       Mark videos watched (YouTube only)
--no-mark-watched                    Do not mark videos watched (YouTube
                                     only)
--no-color                           Do not emit color codes in output
```

#### Network Options

```
--geo-verification-proxy URL         Use this proxy to verify the IP address
                                     for some geo-restricted sites. The
                                     default proxy specified by --proxy (or
                                     none, if the option is not present) is
                                     used for the actual downloading.
--geo-bypass                         Bypass geographic restriction via
                                     faking X-Forwarded-For HTTP header
--no-geo-bypass                      Do not bypass geographic restriction
                                     via faking X-Forwarded-For HTTP header
--geo-bypass-country CODE            Force bypass geographic restriction
                                     with explicitly provided two-letter ISO
                                     3166-2 country code
--geo-bypass-ip-block IP_BLOCK       Force bypass geographic restriction
                                     with explicitly provided IP block in
                                     CIDR notation
```

#### Trường hợp không thể download video
- Rất có thể phía youtube đã có thay đổi nên bạn không thể download được video
- Những lúc như vậy cần phải chờ update từ library youtube_dl
- Sau khi có bản update, có thể sử dụng command sau để cập nhật bản mới nhất.
```
pip install -U youtube_dl
```

### 5. Kết
youtube_dl là một library khá thú vị đối với người mới bắt đầu với ngôn ngữ Python.

Từ việc sử dụng library này có thể tiếp tục với những ý tưởng lập trình khác mới mẻ hơn (tạo một tool tự động thu thập video Youtube chẳng hạn :D)

Chúc mọi người có thời gian lập trình, cũng như xem video Youtube vui vẻ !

### References
[【Python】youtubeの動画をコピペ５行でダウンロードする方法（違法性なし）](https://qiita.com/shinkai_/items/7175215d7433b4cf150c)