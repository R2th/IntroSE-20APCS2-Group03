Trong ngành lập trình chắc hẳn các bạn đã không còn xa lạ với terminal, các dòng lệnh, việc thực thi các chương trình thông qua các lệnh trong Terminal mà không phải sử dụng giao diện. Nhưng với một số tác vụ đôi khi ta vẫn phải dùng giao diện và có đôi khi ta thắc mắc là có cách nào để có thể thực hiện được tối ưu các công việc thông qua dòng lệnh, thì hôm nay mình sẽ giới thiệu cho các bạn một tool có thể làm được việc đó, đó là I3 window manager. bài hướng dẫn này sẽ thực hiện trên Ubuntu do mình đang dùng ubuntu thôi chứ không có dùng window hay macOS.

## Giới thiệu về I3 window manager

I3 window manager là một trình quản lí màn hình gọn nhẹ, mục tiêu của nó là kiểm soát các màn hình trong hệ thống và tự động sắp xếp các cửa sổ để chiếm toàn bộ màn hình mà không vị chồng chéo. I3 không cồng kềnh cũng không lạ mắt, nó được thiết kế để đơn giản và hiệu quả nhất. i3 là một trình quản lí màn hình và không giống như các môi trường máy tính để bàn đầy đủ tính năn, nó không chỉ định các ứng dụng bạn nên sử dụng. Chọn các công cụ phù hợp nhất với quy trình làm việc của bạn và i3 sẽ quản lý tất cả chúng theo cùng một cách. 

I3 sử dụng rộng rãi các phím tắt để kiểm soát các khía cạnh khác nhau trong môi trường của bạn. Chúng bao gồm mở terminal và các chương trình khác, thay đổi kích thước và định vị cửa sổ, thay đổi bố cục và thậm chí thoát i3. Khi bắt đầu sử dụng i3, bạn cần ghi nhớ một vài phím tắt đó để sử dụng và theo thời gian, bạn sẽ sử dụng nhiều phím tắt đó hơn. 

Lợi ích chính là bạn không cần thường xuyên chuyển đổi từ bàn phím sang chuột. Điều đó có nghĩa là bạn sẽ cải thiện tốc độ và hiệu quả của quy trình làm việc của mình.

Ví dụ: để mở một Terminal mới, hãy nhấn `<SUPER>+<ENTER>`, các bạn có thể thắc mắc là phím `SUPER` là cái quái gì vậy, cứ bình tĩnh đọc xuống dưới đi đây mới là ví dụ thôi mà :poop: . Vì các cửa sổ được định vị tự động, bạn có thể bắt đầu nhập các lệnh của mình ngay lập tức. Kết hợp điều đó với trình soạn thảo văn bản hướng đến thiết bị đầu cuối (ví dụ: Vim) và trình duyệt tập trung vào bàn phím để có quy trình làm việc hoàn toàn dựa trên bàn phím.

I3 sử dụng ít tài nguyên hệ thống, nhưng điều đó không có nghĩa là nó không thể đẹp. I3 linh hoạt và có thể được tùy chỉnh theo một số cách để cải thiện trải nghiệm hình ảnh. Vì i3 là trình quản lý màn hình nên nó không cung cấp các công cụ để kích hoạt các tùy chỉnh; bạn cần các công cụ bên ngoài cho việc đó. Vài ví dụ: 

- Sử dụng feh để xác định hình nền cho màn hình của bạn.
 -Sử dụng trình quản lý tổng hợp chẳng hạn như compton để bật các hiệu ứng như mờ cửa sổ và trong suốt.
- Sử dụng dmenuhoặc rofiđể bật các menu có thể tùy chỉnh có thể được khởi chạy từ một phím tắt.
- Sử dụng dunstcho các thông báo trên màn hình.

Do bài này mình focus chủ yếu vào giới thiệu về i3 và cách sử dụng cơ bản về nó nên sẽ không viết sâu về phần custom này và cơ bản thì mình thích giao diện mặc định đơn giản của i3, nếu bạn thích thay đổi lại theo ý mình thì hoàn toàn có thể sửa lại theo mấy keyword mà mình đã nêu ở trên 

I3 hoàn toàn có thể định cấu hình và bạn có thể kiểm soát mọi khía cạnh của nó bằng cách cập nhật tệp cấu hình mặc định. Từ việc thay đổi tất cả các phím tắt, xác định lại tên của không gian làm việc, sửa đổi thanh trạng thái, bạn có thể làm cho i3 hoạt động theo bất kỳ cách nào phù hợp nhất với nhu cầu của bạn.

## Cài đặt

Để cài đặt i3 bạn chỉ cần chạy 1 lệnh sau trong terminal là được, nhưng để chắc thì chúng ta cũng cần chạy update trước tí  :pouting_cat: 

```
sudo apt update
sudo apt-get install i3
```

Sau khi cài đặt xong, bạn sẽ chưa thể dùng ngay được đâu, để kích hoạt bạn cần restart lại máy, với một số đời ubuntu như 16.04 thì khi login lại bạn có thể thấy ngay nút chuyển còn với ubuntu 18.04 lên trên thì truy cập vào màn hình nhập pass bạn sẽ thấy biểu tưởng như đây 

![image](https://user-images.githubusercontent.com/51064915/115189573-da5cde00-a110-11eb-8a49-d3b07e704d41.png)

bạn cần chọn chế độ i3 và đăng nhập bằng thông tin đăng nhập người dùng của mình, sẽ có một màn hình bên dưới xuất hiện tai đây bạn sẽ thấy hai option `<Enter>` để tạo cấu hình cho i3 và `<Esc>` sử dụng cấu hình mặc định. Chúng ta sẽ đi với tùy chọn Đầu tiên và nhấn `<Enter>` 

![image](https://user-images.githubusercontent.com/51064915/115190946-f5c8e880-a112-11eb-84fc-e39cb50b823e.png)

Trong bước tiếp theo, bạn sẽ thấy màn hình bên dưới , nơi bạn cần chọn `<Win>` hoặc `<Alt>` làm công cụ sửa đổi mặc định của mình. Ở đây chúng ta sẽ chọn First Option tức là `<Win>` làm công cụ sửa đổi mặc định rồi nhấn `<Enter>`

![image](https://user-images.githubusercontent.com/51064915/115191097-2dd02b80-a113-11eb-8e1d-bc5c07b68a08.png)

Trong bước tiếp theo, bạn sẽ thấy một màn hình trống có nghĩa là cấu hình đã hoàn tất và bây giờ bạn có thể bắt đầu sử dụng nó.
Ban đầu ban có thể sẽ thấy bỡ ngỡ vì những thứ quen thuôc như giao diện cũ, thanh taskbar, ... lại bay mất đâu rồi :pensive:  đừng lo giờ mình sẽ chỉ cho bạn một số phím để bạn có thể bắt đầu sử dụng nhé 

```
<Win> + <Enter> - Để mở Terminal
<Win> + f - Để vào chế độ toàn màn hình
<Win> + <Shift> + q - Để thoát khỏi chế độ toàn màn hình
<Win> + d - Để serach ứng dụng mà bạn muốn vào, ví dụ : `google` thì bạn sẽ thấy ứng dụng google chorme 
<Win> + <Esc> - Để đóng menu đã mở trước đó
```

![image](https://user-images.githubusercontent.com/51064915/115192274-cadf9400-a114-11eb-8fc9-c1b5c648cff2.png)

![image](https://user-images.githubusercontent.com/51064915/115192423-fc585f80-a114-11eb-9bb1-f2cd930b698d.png)

![image](https://user-images.githubusercontent.com/51064915/115192466-0b3f1200-a115-11eb-8b7d-613a26f1f8ac.png)

Ngoài các cú pháp mặc định này bạn hoàn toàn có thể sửa lại theo ý mình bằng cách sửa lại file config của I3:

```
vi ~/.i3/config
```
trong này có chưa tất cả config i3, nếu không thích dùng các cấu hình này hoặc nếu bạn tham khảo trên [deviantart](https://www.deviantart.com/search?q=i3%20wm) có config nào làm bạn hứng thú bạn hoàn toàn có thể sửa lại. 

Ngoài ra bạn có thể kiểm tra trang man của trình quản lí i3 bằng lệnh: 

```
@localhost:~$ man i3

NAME
i3 - trình quản lí màn hình

Tóm tắt
i3 [-a] [-c configfile] [-C] [-d all] [-v] [-V]

OPTIONS
-a
Tắt tự động khởi động. 

-c
Chỉ định đường dẫn tệp cấu hình thay thế. 

-C
Kiểm tra các tập tin cấu hình cho tính hợp lệ và thoát. 

-d all
Bật ghi nhật ký gỡ lỗi. Tất cả các tham số hiện diện vì lý do lịch sử.

-v
Hiển thị số phiên bản.
```

## Một vài chú ý

Khi mới sử dụng có thể bạn sẽ chưa biết làm sao để gõ tiếng việt, đừng lo hãy click chuột phải vào biểu tưởng EN ở góc dưới cùng bên phải và chọn add để add thêm tiếng việt vào và dùng bình thường, có thể chuyển qua lại giữa các ngôn ngữ bằng lệnh : `Ctrl Space`. Nhớ đảm bảo đã cài ibus bambo nhé :poop:, đôi khi bạn có thể không thể chuyển qua lại giữa tiếng anh và tiếng việt thì hay dùng câu lệnh sau: `ibus-daemon -rd`
Ngoài ra thì khi khi sử dụng bạn có thể muốn khóa màn hình lại để đi đâu đó mà không sợ bạn bè troll mình thì sẽ cần cài thêm một package sau: `i3autolock` 
I3-wm không có keybinding để khóa màn hình hoặc màn hình khóa tự động được cấu hình sẵn. Ý chính này mô tả cách thiết lập cả sử dụng i3lock và xautolock . i3lock là một màn hình khóa tối giản và xautolock giám sát các hoạt động của chuột và bàn phím để tự động khóa màn hình sau một thời gian nhất định không hoạt động.
để cài đặt ta cần run: `sudo apt install i3lock xautolock` 
Để thiết lập liên kết phím `Ctrl + Alt + l` (cuối cùng là chữ L viết thường) để khóa màn hình
Sau đó thêm các dòng sau vào tệp cấu hình i3 có tại ~/.config/i3/config.

```
vi ~/.config/i3/config

# keybinding to lock screen
bindsym Control+Mod1+l exec "i3lock -c 000000"
```

`-c 000000` làm cho màn hình chuyển sang màu đen thay vì màu trắng mặc định sau khi màn hình bị khóa.

Sau đó, thêm một dòng vào cùng một tệp cấu hình để chạy xautolock khi khởi động.

```
# auto lock the screen
exec "xautolock -detectsleep -time 3 -locker \"i3lock -c 000000\""
```

`-detectsleep` khóa màn hình đúng cách khi máy tính chuyển sang chế độ ngủ, `-time 3` đặt thời gian sau đó khóa thành 3 phút và `-locker` thiết lập i3lock làm lệnh khóa.

Cuối cùng để load lại config cần run : `$mod+Shift+r`

Cái cuối cùng là để sử dụng terminal ngon nghẻ thì mình khuyên các bạn nên cài đặt Terminater để có thể chia nhiều màn hình trong một cửa sổ thì sẽ tiện hơn. Nếu hứng thú tìm hiểu thêm về các tool khác tương tự bạn có thể tìm hiểu về tool này nhé [awesomewm](https://awesomewm.org/)

## Kết luận

Nếu bạn coi trọng sự đơn giản và hiệu quả và không ngại làm việc với bàn phím, i3 là trình quản lý cửa sổ dành cho bạn. Một số người nói rằng nó dành cho người dùng cao cấp, nhưng điều đó không nhất thiết phải như vậy. Bạn cần học một vài phím tắt cơ bản để làm quen khi bắt đầu, nhưng chúng sẽ sớm cảm thấy tự nhiên và bạn sẽ bắt đầu sử dụng chúng mà không cần suy nghĩ.

## Tham khảo:
[I3autolock](https://gist.github.com/rometsch/6b35524bcc123deb7cd30b293f2088d8)
[i3 reference](https://i3wm.org/docs/refcard.html)
[Install i3](https://www.cyberithub.com/how-to-install-and-use-i3-window-manager-on-ubuntu-20-04/)
[Repo i3](https://github.com/i3/i3)
[opensource i3](https://opensource.com/article/18/8/i3-tiling-window-manager)
[Doc i3](https://i3wm.org/docs/userguide.html)
[Config reference](https://www.deviantart.com/search?q=i3%20wm)