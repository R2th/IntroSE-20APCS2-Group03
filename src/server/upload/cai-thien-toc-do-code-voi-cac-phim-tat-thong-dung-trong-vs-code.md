<div align="center">

# Lời mở đầu

</div>

- Không biết các bạn có giống mình không, nhưng mà ngày xưa khi xem mấy film hành động có 1 anh IT "siêu ngầu" thì hay có mấy cảnh như thế này 

![](https://images.viblo.asia/d370fc11-e9d4-44f9-bf7d-e84f1bab3dee.gif)

- Hồi ấy thấy đỉnh cao thực sự, và đến sau này mình đã biết có 2 cách để thực hiện điều đó:
    + 1 công cụ làm màu cực kỳ hữu hiệu [Hacker Typer](https://hackertyper.net/).
    + Còn nếu bạn muốn "thực chiến", không chỉ để trông ngầu hơn mà còn có thể cải thiện đáng kể tốc độ code, thì việc sử dụng thuần thục các tổ hợp phím tắt của editor là một điều rất cần thiết.

    Và trong bài viết này thì mình sẽ đề cập đến VS Code, vì đơn giản là mình đang sử dụng nó và mình nghĩ rằng nó được sử dụng khá phổ biến.

<div align="center">

# Nội dung

</div>

- Trong một phần mềm (không riêng gì Code Editor) thì luôn có những tổ hợp phím tắt được đưa ra để bạn có thể sử dụng chức năng một cách nhanh chóng, thay vì phải click vào button hoặc Menu Bar. Giống như những tổ hợp phím mà tất cả mọi người đều thuộc nằm lòng này: 
    - `Ctrl + C`: Copy
    - `Ctrl + V`: Paste
    - `Ctrl + S`: Save
    - ...

    Và với VS Code, bạn sẽ có 2 cách để tìm kiếm những tổ hợp phím cho chức năng mà mình mong muốn: 
    - Click chọn trên Menu Bar, các bạn sẽ thấy tổ hợp phím tắt tương ứng được đặt cùng dòng với mỗi chức năng như thế này
    
    ![](https://images.viblo.asia/dc97bad8-c530-40de-86f2-788a0a24fd97.jpg)

    - Chọn **File -> Preferences -> Keyboard Shortcuts** (hoặc tổ hợp phím `Ctrl + K Ctrl + S`) để mở ra trong cài đặt phím tắt, ở đây sẽ list ra tất cả các tổ hợp phím tắt của VS Code. Tại đây bạn không chỉ có thể tìm kiếm tổ hợp phím tắt cho chức năng mình mong muốn mà còn có thể thay đổi tổ hợp phím tắt theo mong muốn của mình. Trong bài viết này thì mình sẽ đề cập đến những phím tắt mặc định thôi nhé.

        ![](https://images.viblo.asia/faedbf98-388f-4414-abe0-ca4f3d025e36.png)


<div align="center">

## Các tổ hợp phím tắt thông dụng (mà mình thường sử dụng)

</div>

- [**Basic Editing**](https://code.visualstudio.com/docs/getstarted/keybindings#_basic-editing)

| Phím tắt | Chức năng | 
| -------- | -------- |
| Ctrl + C     | Copy (nếu không có vùng chọn thì sẽ copy cả dòng)     | 
| Ctrl + X     | Cut (nếu không có vùng chọn thì sẽ cut cả dòng)     | 
| Ctrl + V     | Paste đoạn đã cut/copy vào vị trí con trỏ     | 
| Ctrl + L    | Chọn (bôi đen) dòng hiện tại    | 
| Ctrl + /    | Comment dòng hiện tại hoặc vùng chọn   | 
| Ctrl + K Ctrl + C   | Thêm dòng comment mới    | 
| Ctrl + K Ctrl + U   | Xóa comment (tương tự vs Ctrl + / lần 2)   | 
| Ctrl + Z    | Undo (hoàn tác)  | 
| Ctrl + ] `hoặc` Tab   | Lùi đầu dòng (indent)  | 
| Ctrl + [  `hoặc` Shift + Tab   |Ngược lại với command trên  | 
| Ctrl + Home    | Chuyển con trỏ đến đầu file    | 
| Ctrl + End    | Chuyển con trỏ đến cuối file   | 
| Home    | Chuyển con trỏ đến đầu dòng    | 
| End    | Chuyển con trỏ đến cuối dòng   | 
| Ctrl + Shift + Z  `hoặc` Ctrl + Y  | Redo (ngược vs Undo, mình cũng ko biết tiếng Việt gọi là gì :grinning::grinning:)   | 
| Ctrl + Shift + K     | Xóa dòng con trỏ đang đứng    | 
| Ctrl + Shift + Enter     | Thêm 1 dòng trống phía trên dòng hiện tại    | 
| Alt + ↑  | Chuyển dòng hiện tại lên trên 1 dòng   | 
| Alt + ↓  | Chuyển dòng hiện tại xuống dưới 1 dòng    | 
|Shift + Alt + ↑     |Copy dòng hiện tại và paste lên trên 1 dòng    |
|Shift + Alt + ↓    | Copy dòng hiện tại và paste xuống dưới 1 dòng   | 
|Ctrl + Alt + ↑   | Thêm 1 con trỏ lên dòng bên trên (type đồng thời nhiều dòng)   | 
|Ctrl + Alt + ↓    | Thêm 1 con trỏ xuống dòng bên dưới (type đồng thời nhiều dòng)    | 


- [**Rich Languages Editing**](https://code.visualstudio.com/docs/getstarted/keybindings#_rich-languages-editing)

| Phím tắt | Chức năng | 
| -------- | -------- |
| Ctrl + Space     | Mở list gợi ý     |
| Shift + Alt + F     | Định dạng lại file (theo ngôn ngữ lập trình)     |
| F12     | Go to Definition (di chuyển tới nơi định nghĩa function đó)    |
| Ctrl + K Ctrl + X      | Xóa các khoảng trắng (space) thừa (cái này giờ chắc ít dùng vì có thể settings tự động xóa space khi lưu file rồi)   |
| Ctrl + K M      | Đổi ngôn ngữ lập trình (*)  |

- [**Navigation**](https://code.visualstudio.com/docs/getstarted/keybindings#_navigation)

| Phím tắt | Chức năng | 
| -------- | -------- |
| Ctrl + P     | Tìm kiếm và mở nhanh file     |
| Ctrl + G     | Di chuyển đến dòng     |
| Ctrl + Shift + P `hoặc` F1     | Hiển thị list commands     |
| Ctrl + Shift + O    | Đi đến phần Symbol     |
| Ctrl + Shift + M     | Mở phần Problems (**)    |
| Ctrl + Shift + `     | Mở Terminal   |
| F8     | Di chuyển đến chỗ Error/Warning kế tiếp    |
| Shift + F8     | Di chuyển đến chỗ Error/Warning trước đó   |

- [**Editor/Window Management**](https://code.visualstudio.com/docs/getstarted/keybindings#_editorwindow-management)

| Phím tắt | Chức năng | 
| -------- | -------- |
| Ctrl + Shift + N     | Mở cửa sổ mới     | 
| Ctrl + W     | Đóng cửa sổ hiện tại    | 
| Ctrl + \     | Chia nhóm màn hình editor (***)    | 
| Ctrl + 1/2/3    | Di chuyển con trỏ đến nhóm thứ 1/2/3 (sau khi đã chia màn hình bằng command trên)     | 
| Ctrl + Shift + PageUp  | Chuyển file (trong cùng 1 nhóm) sang bên trái      | 
| Ctrl + Shift + PageDown  | Chuyển file (trong cùng 1 nhóm) sang bên phải     | 
| Ctrl + K  ←    | Chuyển nhóm sang bên trái     | 
| Ctrl + K →     | Chuyển nhóm sang bên phải     | 
| Ctrl + Alt + → | Chuyển file sang nhóm bên phải      | 
| Ctrl + Alt + ← | Chuyển file sang nhóm bên trái      | 

- [**File Management**](https://code.visualstudio.com/docs/getstarted/keybindings#_file-management) 

| Phím tắt | Chức năng | 
| -------- | -------- |
| Ctrl + N     | Mở File mới   | 
| Ctrl + O     | Mở File cũ    | 
| Ctrl + S     | Lưu file hiện tại     | 
| Ctrl + Shift + S     | Lưu file với tên/định dạng khác (Save As)     | 
| Ctrl + F4    | Đóng editor |
| Ctrl + Shift + T    | Mở lại editor vừa đóng | 
| Ctrl + K P     | Copy đường dẫn của file hiện tại | 


- [**Display**](https://code.visualstudio.com/docs/getstarted/keybindings#_display)

| Phím tắt | Chức năng | 
| -------- | -------- |
| F11     | Hiển thị toàn màn hình    | 
|Ctrl + K  Z    | Bật chế đổ Zen Mode (****)   | 
| Escape Escape (2 lần escape)     | Thoát chế độ Zen Mode    | 
| Ctrl + =    | Zoom In  | 
| Ctrl + -     | Zoom Out    | 
| Ctrl + Numpad 0 (số 0 bên bàn phím mở rộng bên phải)    | Hiển thị toàn màn hình    | 
| Ctrl + B   | Ẩn/hiện sidebar bên trái   |
| Ctrl + Shift + E   | Mở File Explorer bên sidebar | 
| Ctrl + Shift + F   | Mở Search bên sidebar (**search toàn bộ workspace**) | 
| Ctrl + Shift + G   | Mở Source Control bên sidebar   | 
| Ctrl + Shift + D   | Mở Debug bên sidebar  | 
| Ctrl + Shift + X   | Mở Extension bên sidebar  | 


- [**Search**](https://code.visualstudio.com/docs/getstarted/keybindings#_search)

| Phím tắt | Chức năng | 
| -------- | -------- |
| Ctrl + F     | Mở phần tìm kiếm (**search file hiện tại**)   | 
| Ctrl + H     | Mở phần tìm kiếm  và thay thế  (**search file hiện tại**)  | 
| Ctrl + Alt + Enter     | Thay thế tất cả những phần đã tìm thấy  | 
| F4     | Di chuyển con trỏ đến kết quả tìm kiếm trùng khớp tiếp theo (**search toàn bộ workspace**) | 
| F3     | Di chuyển con trỏ đến kết quả tìm kiếm trùng khớp tiếp theo (**search file hiện tại**) | 
| Shift + F4     | Di chuyển con trỏ đến kết quả tìm kiếm trùng khớp trước đó (**search toàn bộ workspace**) | 
| Shift + F3     | Di chuyển con trỏ đến kết quả tìm kiếm trùng khớp trước đó (**search file hiện tại**) | 




- [**Preferences**](https://code.visualstudio.com/docs/getstarted/keybindings#_preferences)

| Phím tắt | Chức năng | 
| -------- | -------- |
| Ctrl + ,     | Mở trang settings của VS Code     | 
| Ctrl + K Ctrl + S    | Mở trang phím tắt của VS Code    | 
| Ctrl + K Ctrl + T   | Lựa chọn theme cho VS Code    | 


<div align="center">

# Kết luận 

</div>

- Mình biết là số lượng phím tắt là rất lớn nên không thể nhớ được hết trong ngày một ngày hai được, và tất nhiên thì tốc độ code của bạn không thể cải thiện ngay được đâu. 
- Nhưng các cụ bảo rồi `Trăm hay không bằng tay quen` mà, cứ từ từ làm quen, sử dụng thường xuyên rồi một ngày đẹp trời, bạn sẽ "code như gió" mà có khi chính bạn còn không nhận ra đấy :smile::smile::smile::smile:
- Nếu thấy bài viết hữu ích, hãy upvote và clip bài viết cho mình nhé. Còn nếu bạn có các phím tắt hữu dụng nào khác, đừng ngại chia sẻ cùng mọi người bằng cách comment thêm xuống dưới bài viết này hoặc viết bài chia sẻ lên viblo nhé!

<div align="center">

# Tài liệu tham khảo

</div>

- [VSCode documents](https://code.visualstudio.com/docs/getstarted/keybindings#_keyboard-shortcuts-reference)

- HÌnh ảnh chú thích:
    - *: Đổi ngôn ngữ lập trình:
    
    ![](https://images.viblo.asia/e88e0fcc-1551-4701-8918-d3e8d4543a4f.jpg)
    
    - **: mở phần problems: 

    ![](https://images.viblo.asia/e465923c-1498-45f6-9710-0adee1e1c56f.jpg)


    - ***: Chia nhóm màn hình editor
    
    ![](https://images.viblo.asia/bf2e0303-b47c-453b-8106-c75ce80f9cce.jpg)

    - ****: Chế đổ Zen Mode
    
    ![](https://images.viblo.asia/8b277004-209f-4aa9-8d99-64c570822645.jpg)