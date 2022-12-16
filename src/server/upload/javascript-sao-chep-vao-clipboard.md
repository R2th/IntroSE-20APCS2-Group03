Sao chép vào clipboard là một chức năng chúng ta sử dụng hàng chục lần mỗi ngày.Trong bài này,mình sẽ hướng dẫn các bạn triển khai khả năng cắt hoặc sao chép dữ liệu vào clipboard của người dùng sử dụng clipboard.js.
### Cách cài đặt
Bạn có thể lựa chọn một trong số cách cài đặt sau:
1. sử dụng CDN
```
<script src="https://cdn.jsdelivr.net/clipboard.js/1.5.12/clipboard.min.js"></script>
```

2. sử dụng npm bằng cách chạy câu lệnh
`npm install clipboard --save`
3. sử dụng bower bằng cách chạy câu lệnh 
`bower install clipboard --save` 
4. Tài file [clipboard.js](https://github.com/zenorocha/clipboard.js/archive/master.zip) và import vào project của bạn
### Cách sử dụng
Mình cần có 2 phần. 
1. Phần thứ nhất chứa nội dung cần sao chép. Vd:

```
<input id="post-shortlink" value="https://ac.me/qmE_jpnYXFo">
```


2. Phần thứ 2 sẽ là một nút click để thực hiện sao chép hoặc cắt.
```
<button class="button" id="copy-button" data-clipboard-target="#post-shortlink">Copy</button>
```
Sau đó sẽ gọi đến javascript clipboard.js
```
<script>
  (function(){
    new Clipboard('#copy-button');
  })();
</script>
```
Chỉ cần thực hiện vai bước trên ta có thể bắt đầu sao chép text một cách dễ dàng. Ta sẽ có kết quả như trong ảnh sau đây:
![](https://images.viblo.asia/2a3d35d9-2950-424e-b09e-3ff95990d738.png)
### Handle event
clipboard.js có hỗ trợ event để biết được việc copy text đã thành công hoặc fail. Để handle event đó bạn chỉ cần viết nhau sau:
```
<script>
  var clipboard = new Clipboard('#copy-button');

  clipboard.on('success', function(e) {
    alert("copy success")
  });

  clipboard.on('error', function(e) {
   alert("copy fail")
  });
</script>
```

### Tài liệu tham khảo
* https://richonrails.com/articles/implementing-clipboard-functionality
* https://webdesign.tutsplus.com/tutorials/copy-to-clipboard-made-easy-with-clipboardjs--cms-25086
* https://alligator.io/js/clipboardjs/