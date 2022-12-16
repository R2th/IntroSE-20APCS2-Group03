Khi làm việc với bất kì ngôn ngữ lập trình nào thì việc kiểm tra tính hợp lệ của các dữ liệu input là điều không thể thiếu, đặc biệt khi validate number thông qua các dạng form. Bài viết này sẽ giới thiệu cho bạn về cách nhập input  kiểu bàn phím tiếng nhật: hiragana, katakana… chỉ nhập number và tự động chuyển về dạng dấu phẩy sau hàng nghìn: 1,234,567,890.<br><br>
**1. Bắt đầu**<br><br>
Viết đoạn code javascript này vào file application.js
```Language
$(document).on('keyup input', 'input.auto-numberic', function(event){
  var selection = window.getSelection().toString();
  if( selection !== '' ){
    return;
  }

  var $this = $(this);

  var input = $this.val();

  input = input.toHalfWidth().replace(/[\D\s\._\-]+/g, "");

  $this.val( function() {
    return input ? parseInt(input, 10).toLocaleString( "en-US" ) : "";
  });
});

String.prototype.toHalfWidth = function() {
  return this.replace(/[Ａ-Ｚａ-ｚ０-９]/g, 
    function(s) {return String.fromCharCode(s.charCodeAt(0) - 0xFEE0)});
};
```

<br><br>
**2.Sử dụng**
<br><br>
ở view khi cần sử dụng chỉ cần gọi ra:
<br>
ví dụ: 
```Language
<%= form_for @example do |f| %>
    <%= f.text_field :name, class: "auto-numberic " %>
<% end%>
```
<br>
Đoạn code trên để nhập input chỉ với kiểu number, Sau khi nhập chuyển từ Fullwidth sang Halfwidth với bàn phím tiếng nhật, và tự động thêm dấu phẩy sau hàng nghìn: 12,345
<br><br>

**3.Cài Đặt Bộ Gõ Tiếng Nhật Trên Ubuntu**
<br><br>
Bước 1: Click vào Dash home<br>
![](https://images.viblo.asia/875b28e6-bb6a-4594-bc8e-1f6530edeace.png)
<br>
Bước 2: Tìm kiếm Language Support.<br>
![](https://images.viblo.asia/bfa2470c-e94f-41ae-b191-21be0cf9d318.png)
<br>
Bước 3: Click vào icon Language Support<br>
![](https://images.viblo.asia/7375f4d1-a512-4cd0-97dd-8a55a8746b03.png)
<br>
Bước 4: Nếu bạn nhận được thông báo language support is not installed completely thì click vào Install để cài đặt.<br>
![](https://images.viblo.asia/c3224043-2620-48fd-bdd2-e906e4412625.png)
<br>
Bước 5: Tại cửa sổ Language Support chọn  Language tab sau đó click vào Install / Remove Languages…<br>
![](https://images.viblo.asia/b1103072-8a30-4849-bcad-249660fbc58c.png)
<br>
Bước 6: Tại cửa sổ Installed Languages bạn kéo xuống và chọn Japanese sau đó check vào  Installed. Click Apply.<br>
![](https://images.viblo.asia/0f4004ee-2922-4766-b67c-aada6ae36b6f.png)
<br>
Bước 7: Gõ mật khẩu và chờ hệ thống tải gói Japanese IME.<br>
![](https://images.viblo.asia/e243415f-30bf-4c27-98ac-38b61ad0ce22.png)
<br>
Bước 8: Trở lại cửa sổ Language Support , chọn IBus tại dòng Keyboard input method system, sau đó chọn Close.<br>
![](https://images.viblo.asia/3d36d228-aa79-4a19-ba5b-aff8e500abec.png)
<br>
Bước 9: Để cài đặt có hiệu lực thì chúng ta Log Out sau đó Log In<br>
![](https://images.viblo.asia/df79fccd-d888-401d-8b7b-b03c7e87a3c8.png)
<br>
Bước 10: Sau khi log in trở lại, click vào language icon phía trên top panel rồi chọn Text Entry Settings…<br>
![](https://images.viblo.asia/d298a456-10e4-48c2-9ab8-8d9d76e4501d.png)
<br>
Bước 11: Click dấu + tại cửa sổ Input sources to use area.<br>
![](https://images.viblo.asia/6ca59116-f92f-4c48-83b7-8e9685ddbbdc.png)
<br>
Bước 12: Tại cửa sổ Choose an input source screen, bạn kéo xuống và chọn Japanese (Mozc) (IBus). Sau đó click Add<br>
![](https://images.viblo.asia/7f0f7f49-8548-47e9-9486-03b7f66b4eed.png)
<br>
Bước 13: Lúc này tại language icon phía trên đã xuất hiện bộ gõ tiếng Nhật Mozc. Bạn click vào Mozc<br>
![](https://images.viblo.asia/770d6301-8b24-46a8-95db-e7ad2622af97.png)
<br>
Bước 14: Language icon sẽ chuyển thành Mozc icon<br>
![](https://images.viblo.asia/bfd9e3e0-f6c2-413e-baa5-d8e7232e1a9f.png)
<br>
Bước 15: Click vào Mozc icon và chọn kiểu gõ tiếng Nhật bạn muốn sử dụng.<br>
![](https://images.viblo.asia/326a22f9-d7a6-41eb-a6d4-7d81de7d6456.png)
<br>
Trên đây là một chia sẻ nhỏ của mình, hy vọng nó sẽ hữu ích với các bạn. cảm ơn các bạn đã theo dõi bãi viết !!