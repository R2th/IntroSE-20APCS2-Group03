Chắc hẳn là các bạn cũng đã khá quen thuộc với trình soạn thảo code SublimeText. Nó rất đơn giản, dễ dùng nhưng ẩn chứa bên trong rất nhiều tính năng hay ho và sẽ khiến bạn không khỏi bất ngờ. Bài viết này sẽ đề cập đến một số mẹo và thủ thuật khi sử dụng SublimeText để code.

![](https://images.viblo.asia/0d3a825b-875e-41a3-ae42-56707953993b.png)

### 1. Selection

Trong khi phát triển web, người lập trình sẽ thường xuyên phải chỉnh sửa code, dưới đây là một số phím tắt tiện dụng cho bạn:

| Phím tắt | Ý nghĩa |
| -------- | -------- |
| `Command` + `D` | Bôi đen một từ |
| `Command` + `L` | Bôi đen một dòng |
| `Command` + `A` | Bôi đen tất cả code |
| `Ctrl` + `Command` + `M` | Bôi đen tất cả bên trong dấu ngoặc, rất hữu ích khi khi code CSS hoặc JavaScript |

SublimeText còn cho phép chúng ta chọn nhiều dòng cùng một lúc giúp tăng đáng kể tốc độ code cuả bạn. Để chọn được nhiều dòng code, bạn có thể làm theo những cách sau:

| Phím tắt | Ý nghĩa |
| -------- | -------- |
| `Command` | Giữ phím `Command` vàvà click chuột vào những dòng bạn muốn chọn |
| `Command` + `Ctrl` + G | Chọn một đoạn code, một dòng hay là một từ, xong sử dụng tổ hợp phím này để chọn những chỗ khác tương tự trong file |
| `Command` + `D` | Chọn một đoạn code, một dòng hay là một từ, xong sử dụng tổ hợp phím này để chọn thêm những chỗ khác tương tự tiếp theo ở trong file|

Bạn có thể xem ảnh để thấy chọn nhiều dòng làm việc thế nào:

![](https://images.viblo.asia/bbe04797-8736-4a02-b407-a1603f09c8a2.gif)

### 2. Sắp xếp CSS

Thường thì bạn sẽ không để ý đến việc sắp xếp các thuộc tính trong file CSS, bởi vì với thứ tự nào thì trình duyệt cũng cho đầu ra là như nhau thôi. Tuy nhiên, việc sắp xếp sẽ giúp cho code của bạn có tổ chức hơn và dễ dàng tra cứu về sau hơn. Bạn chỉ cần bôi đen đoạn code cần sắp xếp rồi nhấn `F5` là xong (nếú cần sắp xếp lại tất cả thì cứ việc nhấn `F5` thôi). Hãy xem hình minh hoạ bên dưới.

![](https://images.viblo.asia/ab513881-6aa5-4ba6-8e1b-b49dff318ec1.gif)

Bên cạnh đó, bạn cũng có thể sử dụng các plugin của bên thứ ba như [CSScomb](https://github.com/csscomb/CSScomb-for-Sublime) để có thể sắp xếp linh hoạt hơn.

### 3. Câu lệnh Palette

Với câu lệnh này, bạn có thể thực hiện nhanh nhiều việc như đổi tên file, định nghĩa cú pháp của file, chèn các snippet. Để sử dụng câu lệnh Palette trong SublimeText, trước tiên bạn sẽ sử dụng tổ hợp phím `Command` + `Shift` + `P`, sau đó gõ tiếp lệnh của bạn để thực hiện. Ví dụ:

- Đổi tên file
![](https://images.viblo.asia/4fe617f1-5de7-4b2f-89bb-c393827a1139.jpg)

- Định nghĩa cú pháp file là HTML
![](https://images.viblo.asia/81ed0d13-f7c9-4508-9494-2ce742e2b8e7.jpg)

- Chèn mã snippet
![](https://images.viblo.asia/d6cc71db-9022-4221-8c6a-009e328af058.jpg)

### 4. Di chuyển giữa các tab và project

Chắc hẳn là bạn sẽ mở nhiều file khi code, trong SublimeText, bạn có thể di chuyển giữa các file đó một cách nhanh chóng bằng một số phím tắt sau:

| Phím tắt | Ý nghĩa |
| -------- | -------- |
| `Command` + `T` | Liệt kê ra các file đang được mở, bạn sẽ lựa chọn một file để xem chi tiết |
| `Command` + `Shift` + `]` | Ngay lập tức di chuyển đến tab kế tiếp, kể cả bạn đang view layout nhiểu cột |
| `Command` + `Shift` + `[` | Ngay lập tức di chuyển đến tab liền trước nó |
| `Ctrl` + `Tab` | Di chuyển đến một tab bất kỳ, nếu view theo nhiều cột thì chỉ chọn được các file trong cùng một cột |
| `Command` + `Ctrl` + `P` | Di chuyển giữa các project được liệt kê trong thanh sidebar |

### 5. Chỉnh sửa nhiều file

Tính năng này sẽ rất hữu ích khi bạn phải làm việc với nhiều file. Giả sử bạn có những đoạn code tương tự nhau ở trên nhiều file trong project. Để thay đổi những đoạn code đó một cách hiệu quả, bạn có thể làm như sau:

1. Sử dụng tổ hợp phím `Command` + `Shift` + `F`, điền vào ô `Find`, đoạn hoặc dòng code mà bạn muốn thay đổi.

**Mẹo:** Trỏ chuột xong kết hợp tổ hợp  `Command` + `E` để điền code được chọn vào ô `Find` nhanh chóng hơn.
2. Chọn những file bạn áp dụng để thay đổi vào ô `Where`, giả sử là `<open files>` để áp dụng cho những file đang được mở.
3.  Điền từ hoặc là đoạn code dùng để thay thế vào ô `Replace`, xong nhấn button `Replace` là xong.

![](https://images.viblo.asia/94a885a9-6528-4ea7-a063-e2e899047620.jpg)

### 6. File crawling

Tính năng này thực sự hữu ích khi bạn muốn chỉnh sửa CSS. Nhấn tổ hợp `Command` + `R`, một hộp thoại sẽ hiện ra với danh sách các bộ chọn CSS trên tài liệu. Bạn có thể xem ảnh dưới đây:

![](https://images.viblo.asia/30b9e6c9-7fa3-4b16-b473-1acfd2696bea.jpg)

Bạn có thể tìm kiếm và chọn các bộ chọn mà bạn định điều hướng đến.

Mình thấy đây là một cách thuận tiện hơn để search code hơn là cách thông thường.

### 7. Kiểm tra chính tả

Việc sử dụng tiếng Anh để code nhiều đôi khi cũng khiến bạn bị sai chính tả, bạn có thể bật tính năng kiểm tra chính tả cho SublimeText. Hãy đi theo memu **Preferences > Settings – User**, ở file được mở ra hãy thêm dòng sau vào:

```json
"spell_check": true,  
```

Xong thì lưu lại và khởi động lại SublimeText.

Bạn cũng có thể dùng cách này để thay đổi một số thông số như theme, ...

### 8. Đồng bộ setting

Nếu bạn đang làm việc trong nhiều máy tính, bạn có thể sẽ muốn giữ và áp dụng cùng một setting cho SublimeText trên các máy tính đó. Bạn có thể thiết lập điều này với sự trợ giúp của Dropbox (và một tinh chỉnh nhỏ).

Đầu tiên, bạn hãy chạy dòng lệnh này từ Terminal để up setting của bạn lên Dropbox:
```
mkdir $HOME/Dropbox/sublime-text-3/
mv "$HOME/Library/Application Support/Sublime Text 3/Packages" "$HOME/Dropbox/sublime-text-3/"
mv "$HOME/Library/Application Support/Sublime Text 3/Installed Packages" "$HOME/Dropbox/sublime-text-3/"
```

Sau đó, chạy câu lệnh này trên mỗi máy tính mà bạn muốn đồng bộ setting, khi mà setting đó đã được up lên Dropbox:

```
DSTPATH="$HOME/Library/Application Support/Sublime Text 3"
DROPBOX_PATH="$HOME/Dropbox/sublime-text-3"
rm -rf "$DSTPATH/Installed Packages"
rm -rf "$DSTPATH/Packages"
mkdir -p "$DSTPATH"
ln -s "$DROPBOX_PATH/Packages" "$DSTPATH/Packages"
ln -s "$DROPBOX_PATH/Installed Packages" "$DSTPATH/Installed Packages"
```

Tham khảo chi tiết ở [đây](http://skrobul.tumblr.com/post/63912356219/sublimetext-3-keeping-your-settings-in-sync)

### Kết

Như mình đã đề cập từ đầu bài viết, SublimeText đơn giản, dễ sử dụng nhưng nó cũng có nhiều tính năng khá là hay ho; nếu sử dụng thuần thục thì sẽ giúp bạn rất nhiều trong quá trình phát triển dự án.

Cám ơn bạn đã theo dõi bài viết này.

### Tham khảo

- https://www.hongkiat.com/blog/sublime-text-tips/
- http://skrobul.tumblr.com/post/63912356219/sublimetext-3-keeping-your-settings-in-sync