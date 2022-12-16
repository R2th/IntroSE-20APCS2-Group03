[Tizonia](http://tizonia.org/) là một phần mềm trên Linux cho phép chơi nhạc online từ Youtube, Spotify, Google Music, SoundCloud bằng… dòng lệnh. Ngoài ra, qua phần mềm này, bạn còn có thể trở thành một Server trên mạng LAN để có thể chia sẻ nhạc với bạn bè !

![](https://images.viblo.asia/47beb50b-1418-4f7d-97da-d2e94831a69e.png)

## Cài đặt

Để cài đặt, bạn có thể tìm cài trong Software của Ubuntu (snap package) hoặc thông qua gói .deb với dòng lệnh:

```bash
# Cho Debian/Ubuntu/Raspbian
curl -kL https://github.com/tizonia/tizonia-openmax-il/raw/master/tools/install.sh | bash
```

Xem thêm cách cài cho các distro khác [tại đây](http://tizonia.org/docs/debian/).

Sẽ mất một lúc để cài đặt tất cả các thành phần phụ thuộc, sau khi cài đặt thành công, màn hình sẽ hiển thị log message sau đây:

```bash
tizonia 0.6.0. Copyright (C) 2017 Juan A. Rubio
This software is part of the Tizonia project

GNU Lesser GPL version 3
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Help topics:

global Global options available with most features.
openmax Various OpenMAX IL query options.
server SHOUTcast/ICEcast streaming server options.
client SHOUTcast/ICEcast streaming client options.
spotify Spotify options.
googlemusic Google Play Music options.
soundcloud SoundCloud options.
dirble Dirble options.
youtube Youtube options.
keyboard Keyboard control.
config Configuration files.
examples Some command-line examples.

Use "tizonia --help topic".

Tizonia is now installed.
Please add Spotify, Google Music, Soundcloud, and Dirble credentials in : /root/.config/tizonia/tizonia.conf
```

Như có thể thấy ở trên, để xem trợ giúp của các topic (cụ thể ở đây là youtube, spotify,...) bạn có thể sử dụng lệnh sau (với ví dụ là youtube)
```bash
tizonia --help youtube
```

## Dùng với Youtube

Với Youtube, bạn không cần cài đặt tài khoản gì cả.

Một số dòng lệnh mình thường dùng với YouTube:

```bash
# Nghe một video / bài hát cụ thể (qua URL hoặc ID)
tizonia --youtube-audio-stream https://www.youtube.com/watch?v=tCV4dSMeQzE

# Nghe một playlist cụ thể (qua playlist URL hoặc ID)
tizonia --youtube-audio-playlist https://www.youtube.com/playlist?list=PLsIRiRj6jaw7Z6bHs5V99yAvlMUf2icOG

# Nghe mix nhạc tự động dựa trên từ khóa search
tizonia --youtube-audio-mix-search "Lam Trường"
```

## Dùng với SoundCloud

Nếu bạn muốn nghe nhạc trên SoundCloud, bạn hãy làm theo [trang này](http://www.tizonia.org/docs/soundcloud) để có thể lấy được Authorization Token.

Sau đó bạn hãy mở file config này lên, dán Authorization Token được cấp bở Soundcloud vào:

```bash
vim $HOME/.config/tizonia/tizonia.conf
```

Một khi bạn đã paste token vào file config kia, bạn có thể chạy lệnh sau để play các bài hát đã được list trong stream của tài khoản

```bash
tizonia --soundcloud-user-stream
```

```bash
tizonia 0.6.0. Copyright (C) 2017 Juan A. Rubio
This software is part of the Tizonia project

[SoundCloud] [Connecting] : '1-154338-215580508-635f479696di8'.
[SoundCloud] [Tracks in queue] '3'.
[SoundCloud] [Connected] : 'SoundCloud user stream'.
E-Gham Ki Drazi : Zkm Qawali Group
Duration : 29m:24s
Likes count : 31
Permalink : https://soundcloud.com/zkm-qawali-group/e-gham-ki-drazi
License : all-rights-reserved
Audio Stream : 128 kbit/s, 44100 Hz
MPEG Layer : III, w/o CRC
Mode : joint (MS/intensity) stereo, no emphasis
2 Ch, 48 KHz, 16:s:b
2 Ch, 44.1 KHz, 16:s:b
```

Sử dụng lệnh sau để có thể play bất kỳ bài hát nào trong danh sách ưa thích của bạn dựa vào tiêu đề của nó:

```bash
tizonia --soundcloud-tracks 'Cruch'
```

Tizonia sẽ tự động tìm trong media directory rồi phát nó cho bạn

```bash
[SoundCloud] [Tracks in queue] '97'.
[SoundCloud] [Connected] : 'Crunch'.
Chris Travis - Crunch Time : ChrisTravis
Duration : 3m:53s
Likes count : 185367
Permalink : https://soundcloud.com/christravis/chris-travis-crunch-time
License : all-rights-reserved
Audio Stream : 128 kbit/s, 44100 Hz
MPEG Layer : III, w/o CRC
Mode : joint (MS/intensity) stereo, no emphasis
2 Ch, 48 KHz, 16:s:b
2 Ch, 44.1 KHz, 16:s:b
```

## Lệnh tắt (bash alias)

Lệnh để nhập cho Tizonia khá dài, nên mình đã tạo một số alias để gõ cho nhanh.

Ví dụ, thay vì gõ “tizonia --spotify-artist”, bạn chỉ cần gõ: `tisar` sau đó là tham số. Hoặc thay vì gõ “tizonia --youtube-audio-mix-search”, bạn sẽ gõ `tiyms`.

Để cài các alias này, bạn chỉ cần copy nội dung của gist bên dưới và paste phía cuối file `~/.bashrc` và sau đó khởi động lại Terminal.

```bash
# Tizonia aliases

alias ti="tizonia"
function tis() {
	echo "Shortcuts for tizonia --spotify-*"
	echo "tistr arg        Search and play from Spotify by track name."
	echo "tisar arg        Search and play from Spotify by artist name."
	echo "tisal arg        Search and play from Spotify by album name."
	echo "tispl arg        Search and play public playlists (owner is assumed current user, unless --spotify-owner is provided)."
	echo "tisop ow pl      Search and play public playlist by an owner"
}
alias tistr="tizonia --spotify-tracks"
alias tisar="tizonia --spotify-artist"
alias tisal="tizonia --spotify-album"
alias tispl="tizonia --spotify-playlist"
function tisop() {
	#tisop spotify sleep
	tizonia --spotify-owner "$1" --spotify-playlist "$2"
}

function tiy() {
	echo "Shortcuts for tizonia --youtube-*"
	echo "tiyst arg       Play a YouTube audio stream from a video url or video id."
	echo "tiypl arg       Play a YouTube audio playlist from a playlist url or playlist id."
	echo "tiymi arg       Play a YouTube mix from a video url or video id."
	echo "tiyse arg       Search and play YouTube audio streams."
	echo "tiyms arg       Play a YouTube mix from a search term."
	echo "tiycu arg       Play all videos uploaded to a YouTube channel (arg = channel url or name)."
	echo "tiycp arg       Play a playlist from particular YouTube channel (arg = '<channel-name[space]playlist-name>')."
}
alias tiyst="tizonia --youtube-audio-stream"
alias tiypl="tizonia --youtube-audio-playlist"
alias tiymi="tizonia --youtube-audio-mix"
alias tiyse="tizonia --youtube-audio-search"
alias tiyms="tizonia --youtube-audio-mix-search"
alias tiycu="tizonia --youtube-audio-channel-uploads"
alias tiycp="tizonia --youtube-audio-channel-playlist"

function tig() {
	echo "Shortcuts for tizonia --gmusic-*"
	echo "tigtr arg        Play tracks from the user's library by track name."
	echo "tigar arg        Play tracks from the user's library by artist."
	echo "tigal arg        Play an album from the user's library."
	echo "tigpl arg        A playlist from the user's library."
}
alias tigtr="tizonia --gmusic-tracks"
alias tigar="tizonia --gmusic-artist"
alias tigal="tizonia --gmusic-album"
alias tigpl="tizonia --gmusic-playlist"
```

## Nguồn bài viết
https://int3ractive.com/2018/08/gioi-thieu-phan-mem-nghe-nhac-tizonia.html

https://linoxide.com/linux-how-to/tizonia-command-line-music-player-linux/