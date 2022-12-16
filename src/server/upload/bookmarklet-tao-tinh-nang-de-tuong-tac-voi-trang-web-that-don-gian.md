Có lẽ kỹ thuật này đã xuất hiện từ rất lâu và chắc nhiều người đã biết tới, nhưng thực sự thì đến giờ mình mới được biết đến, cảm thấy nó cực kỳ tiện lợi và thú vị nên muốn chia sẻ lại cho những bạn chưa biết. Chúng ta cùng tìm hiểu về **Bookmarklet** và xem cách tạo một tool đơn giản và tiện lợi bằng kỹ thuật này như thế nào nhé.

# Bookmarklet là gì?
Khi sử dụng trình duyệt web, các bạn hẳn đã không còn xa lạ với tính năng **bookmark** (đánh dấu) các trang web mà mình hay truy cập để khi cần tới chỉ bằng một cú nhấp chuột là dễ dàng truy cập lại. **Bookmarklet** cũng là bookmark, nhưng thay vì lưu URL của trang web, chúng ta sẽ lưu các dòng lệnh JavaScript. Do vậy, bookmarklet có thể được hình dung là một chương trình JavaScript, một extension cho trình duyệt, giúp các bạn bổ sung một tính năng nào đó cho trang web chỉ với một cú nhấp chuột.

Nếu so sánh với một extension hẳn hoi của trình duyệt thì quả là khập khiễng, bởi bookmarklet sẽ chỉ có thể thao tác trên trang web mà bạn đang truy cập (đọc, thêm, sửa đổi cây DOM của trang, giống như **content_script** của extension). Nhưng sự tiện lợi, đơn giản và nhanh chóng, từ bước code đến sử dụng, rõ ràng là một ưu điểm để chúng ta cân nhắc khi có use case phù hợp. Ngoài ra, vì cũng là bookmark nên bookmarklet vẫn có thể được sử dụng trên mobile, đây là một lợi thế đáng chú ý so với extension.

# Cách tạo một bookmarklet

Hôm nay mình thấy có bạn đăng bài về [cách tải tất cả ảnh trên trang web bằng JS](https://viblo.asia/p/download-all-images-tren-website-su-dung-javascript-bJzKm4ED59N) khá hay, mình sẽ hiện thực chức năng này bằng bookmarklet và chúng ta cùng xem nó đơn giản như thế nào:

Cú pháp để tạo một bookmarklet như sau:
```js
javascript:(function(){
  // code
})();
```

Code chức năng tải ảnh mình sẽ viết như sau:
```js
javascript: (function () {
  document.querySelectorAll("img").forEach((img) => {
    fetch(img.src)
      .then((response) => response.blob())
      .then((blob) => {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = img.src.split("/").pop();
        a.target = "blank";
        a.click();
      });
  });
})();
```

Sau đó, copy code này vào ô URL của bookmark:
![](https://images.viblo.asia/500/ce24fad5-3215-4f32-9b9d-edd8421fa704.png)

Lưu lại, vậy là xong. Chỉ mất một phút để có một tool tải tất cả ảnh trên trang web, quá đơn giản phải không? Khi cần sử dụng, chỉ việc mở thanh bookmark (hoặc bấm tổ hợp phím **Ctrl + Shift + B**) và nhấp vào bookmark mà chúng ta vừa lưu.

## Chia sẻ bookmarklet

Để chia sẻ bookmarklet của mình cho những người khác, các bạn có thể áp dụng cách tương tự như trang [Wirify](https://www.wirify.com/) này. Những gì họ làm, đơn giản chỉ là gán đoạn code JS vào `href` của môt thẻ anchor như sau:
```html
<a href="javascript:(function(){//code})()">Tên Bookmarklet</a>
```

Những người khác nếu muốn dùng, chỉ cần kéo link đó vào thanh bookmark của mình là xong.

## Dùng remote code

Trường hợp đoạn code JS cần dùng quá nhiều, hoặc bạn cần lưu trữ code ở một host nào đó để tiện cho việc phát triển, và code được dùng lúc nào cũng là phiên bản build mới nhất, các bạn có thể áp dụng thủ thuật sau để remote tới code:

```js
javascript: (function() {
    var script = document.createElement("script");
    script.src = "https://my-code.min.js?" + new Date().getTime();
    document.body.appendChild(script);
})();
```

# Một số bookmarklet hữu ích

Dưới đây là vài bookmarklet được viết sẵn, khá tiện lợi mà các bạn có thể sử dụng ngay, chỉ với 1 click chuột.

* **[Bootlint](https://github.com/twbs/bootlint)**: HTML linter dành cho các trang web sử dụng Bootstrap.
    ```js
    javascript:(function(){var s=document.createElement("script");s.onload=function(){bootlint.showLintReportForCurrentDocument([]);};s.src="https://stackpath.bootstrapcdn.com/bootlint/latest/bootlint.min.js";document.body.appendChild(s)})();
    ```
* **[a11y.css](https://ffoodd.github.io/a11y.css/)**: Hiển thị lỗi HTML trên trang web.
    ```js
    javascript:(function(){a11ycss=document.createElement("LINK");a11ycss.href="https://ffoodd.github.io/a11y.css/css/a11y-en.css";a11ycss.rel="stylesheet";a11ycss.media="all";document.body.appendChild(a11ycss);})();
    ```
* **[Instantgram](https://theus.github.io/instantgram/)**: Hỗ trợ xem và tải ảnh trên Instagram.
    ```js
    javascript:(function (){d=document;d.body.appendChild(d.createElement("script")).src="https://raw.githubusercontent.com/theus/instantgram/gh-pages/dist/main.js";})();
    ```
* **[Performance Bookmarklet](https://github.com/micmro/performance-bookmarklet)**: Phân tích, hiển thị số liệu hiệu suất của trang web.
    ```js
    javascript:(function(){var el=document.createElement('script');el.type='text/javascript';el.src='https://micmro.github.io/performance-bookmarklet/dist/performanceBookmarklet.min.js';el.onerror=function(){alert("Looks like the Content Security Policy directive is blocking the use of bookmarklets\n\nYou can copy and paste the content of:\n\n\"https://micmro.github.io/performance-bookmarklet/dist/performanceBookmarklet.min.js\"\n\ninto your console instead\n\n(link is in console already)");console.log("https://micmro.github.io/performance-bookmarklet/dist/performanceBookmarklet.min.js");};document.getElementsByTagName('body')[0].appendChild(el);})();
    ```
* **Soạn thư Gmail**: mở Gmail chế độ soạn thư + chèn sẵn title và URL của trang bạn đang đứng + chèn sẵn phần văn bản mà bạn copy. Bạn chỉ việc điền người nhận và gửi.
    ```js
    javascript:(function (){popw="";Q="";d=document;w=window;if(d.selection){Q=d.selection.createRange().text;}else if(w.getSelection){Q=w.getSelection();}else if(d.getSelection){Q=d.getSelection();}popw=w.open("http://mail.google.com/mail/s?view=cm&fs=1&tf=1&to=&su="+encodeURIComponent(d.title)+"&body="+encodeURIComponent(Q)+escape("%5Cn%5Cn")+encodeURIComponent(d.location)+"&zx=RANDOMCRAP&shva=1&disablechatbrowsercheck=1&ui=1","gmailForm","scrollbars=yes,width=680,height=575,top=175,left=75,status=no,resizable=yes");if(!d.all)setTimeout(function (){popw.focus();},50);})();
    ```
* **Mở khóa chuột**: một số trang khóa chuột phải, không cho phép bạn chọn khối văn bản, đoạn code sau kích hoạt lại.
    ```js
    javascript:(function (){function R(a){ona="on"+a;if(window.addEventListener)window.addEventListener(a,function (e){for(var n=e.originalTarget;n;n=n.parentNode)n[ona]=null;},true);window[ona]=null;document[ona]=null;if(document.body)document.body[ona]=null;}R("click");R("mousedown");R("mouseup");R("selectstart");R("contextmenu");})();
    ```
* **Hiển thị mật khẩu**: một số trang không có chức năng hiển thị mật khẩu bạn đang nhập.
    ```js
    javascript:(function(){var s,F,j,f,i;s="";F=document.forms;for(j=0;j<F.length;++j){f=F[j];for(i=0;i<f.length;++i){if(f[i].type.toLowerCase()=="password")s+=f[i].value+"\n";}}if(s)alert("Passwords in forms on this page:\n\n"+s);else alert("There are no passwords in forms on this page.");})();
    ```
* **Tìm kiếm nhanh**: tìm kiếm từ khóa trên trang (ở đây mình tìm trên trang "viblo.asia").
    ```js
    javascript:(function (){s="viblo.asia";void(q=prompt("Searching at "+s+":"));if(q)location.href="http://www.google.com/search?q=site%3A"+s+" "+escape(q);})();
    ```

# Kết
Bài chia sẻ ngắn nhưng hi vọng các bạn cũng biết được một thứ mới, thú vị và hữu ích để tận dụng vào công việc, cuộc sống của mình 🙂 Cảm ơn các bạn đã theo dõi.

Tham khảo: [Bookmarklet - Wikipedia](https://en.wikipedia.org/wiki/Bookmarklet)

----
@khangnd<br>[![Github](https://images.viblo.asia/20x20/81dd12f0-a8c9-403f-ae51-27b92828ca22.png)](https://github.com/khang-nd) [![Linkedin](https://images.viblo.asia/20x20/4981766e-5e57-401a-8623-d3657a3148e5.png)](https://www.linkedin.com/in/khangnd/) [![Dev.to](https://images.viblo.asia/20x20/3921db2e-e4e5-45d7-acc8-e8b92e02d47d.png)](https://dev.to/khangnd) [![Fandom](https://images.viblo.asia/20x20/fad64df3-0be8-4481-b810-8995f18f71ea.png)](https://dev.fandom.com/wiki/User:KhangND)