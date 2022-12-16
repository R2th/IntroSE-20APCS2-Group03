Khi download các bộ thư viện trên Internet (đặc biệt là thư viện Jquery, Javascript), thỉnh thoảng bạn sẽ nhận được những file rất nhỏ, nội dung bên trong thì bị `minify` và không có 1 chút meaning nào. Đó chính là kỹ thuật `Obfuscated code.`
## **Obfuscated code là gì?**
Đây là một kỹ thuật để trả lời cho câu hỏi mà mình thường gặp của các bạn developer mới vào nghề: “Làm sao để che giấu source code của mình?”. Hãy thử xem ví dụ phía dưới:

**Source:**

```php
function redirectUrl(url, selectorString) {
    if (url !== '') {
        if (selectorString === null || (selectorString !== null && $(selectorString).val() != url)) {
            window.location.replace(url);
        }
    }
}
function removeData(row) {
    row.addClass("warning");
    row.fadeOut(400, function () {
        row.remove();
    });
}
var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();
```
**Obfuscated code:**
```js
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\b'+e(c)+'\b','g'),k[c])}}return p}('1 g(3,4){6(3!==''){6(4===a||(4!==a&&$(4).d()!=3)){f.b.c(3)}}}1 e(2){2.l("n");2.o(h,1(){2.p()})}7 m=(1(){7 5=0;i 1(8,9){j(5);5=k(8,9)}})();',26,26,'|function|row|url|selectorString|timer|if|var|callback|ms|null|location|replace|val|removeData|window|redirectUrl|400|return|clearTimeout|setTimeout|addClass|delay|warning|fadeOut|remove'.split('|'),0,{}))
```

**Obfuscated code format:**
```php
eval(function (p, a, c, k, e, d) {
    e = function (c) {
        return c.toString(36)
    };
    if (!''.replace(/^/, String)) {
        while (c--) {
            d[c.toString(a)] = k[c] || c.toString(a)
        }
        k = [function (e) {
            return d[e]
        }];
        e = function () {
            return '\w+'
        };
        c = 1
    }
    ;
    while (c--) {
        if (k[c]) {
            p = p.replace(new RegExp('\b' + e(c) + '\b', 'g'), k[c])
        }
    }
    return p
}('1 g(3,4){6(3!==''){6(4===a||(4!==a&&$(4).d()!=3)){f.b.c(3)}}}1 e(2){2.l("n");2.o(h,1(){2.p()})}7 m=(1(){7 5=0;i 1(8,9){j(5);5=k(8,9)}})();', 26, 26, '|function|row|url|selectorString|timer|if|var|callback|ms|null|location|replace|val|removeData|window|redirectUrl|400|return|clearTimeout|setTimeout|addClass|delay|warning|fadeOut|remove'.split('|'), 0, {}))
```

**Tại sao cần phải Obfuscated code?**
- Dung lượng code sẽ được giảm xuống.
-  Trong Javascript, sẽ làm thời gian tải xuống đáng kể.
-  Khi code được Obfuscated sẽ rất khó để đảo ngược lại định dạng ban đầu.

Các bạn có thể thấy, với `Obfuscated code,` nó không những chỉ `minify` (cắt bỏ các đoạn xuống dòng, dấu cách không cần thiết làm giảm dung lượng file, tiết kiệm băng thông) mà nó còn thay đổi luôn cả tên lớp, tên hàm, tên biến,… thành những kí tự đơn giản vô nghĩa (VD: a(), var b,…). Vậy nên Obfuscated code còn được biết đến với cái tên Việt là **kỹ thuật làm rối code**: người khác có thể có được code của bạn nhưng khó có thể hiểu hết toàn bộ ý nghĩa code mà bạn viết ;)
Obfuscated code được dùng trong rất nhiều ngôn ngữ chứ không chỉ riêng Javascript. Thường thì đối với các source public họ sẽ chỉ minify để giảm dung lượng file khi load. Còn Obfuscated chỉ dùng khi muốn cải thiện hiệu suất hơn nữa và đặc biệt là dùng để giấu code. Giấu code ở đây cũng không hoàn toàn là không dịch ngược lại được, tuy nhiên sẽ tốn khá nhiều thời gian.

**Obfuscation == Encryption?**

Không, obfuscation != encryption.
* Trong JavaScript, trình duyệt có thể thực thi encrypted code, trong khi trình duyệt sẽ thực thi  obfuscated code.
* Encrypted code luôn cần giải mã để được thực thi.
* Obfuscated code không yêu cầu khử dữ liệu để thực thi.

**Khi viết Obfuscator cần chú ý:**

-Chỉ thay đổi những tên riêng, không thay đổi từ khóa, tên lệnh, hay các API của hệ thống

-Tránh xung đột tên. Ví dụ: nếu thay tên lớp và tên biến giống nhau, chương trình có thể chạy không giống bình thường và thậm chí là không hiểu nó đang làm gì

-Nhất quán. Khi thay đổi tên phải thay đổi toàn bộ các file nguồn có chứa cùng đối tượng đó. Ví dụ: file abc.jsp chứa lớp tên ABC thì khi đổi tên lớp ABC, tất cả các file khác có dùng lớp ABC cũng phải thay đổi theo.

-Đặt tên mới càng ngắn càng tốt. Làm như thế để dịch mã nhanh hơn, đỡ tốn công sức cho trình dịch

-Lọai bỏ dư thừa

**Làm sao để Obfuscated code?**

Tất nhiên bạn có thể tự làm bằng tay. Thôi, tốt nhất là dùng các bộ thư viện, phần mềm hoặc một số tools online vì những công cụ này đã được viết để có thể Obfuscated code của bạn một cách tối ưu nhất. Một số tools online:

* JavaScript HTML Code/Text Obfuscator
* Online Javascript Obfuscator DaftLogic
* Jsobfuscate

*Nếu code của bạn là vì cộng đồng thì bạn chỉ cần minify để giảm dung lượng file thôi, còn nếu vẫn muốn giấu code thì Obfuscated code là một lựa chọn tối ưu cho bạn. Cám ơn các bạn đã đọc bài viết*

Tài liệu tham khảo:
- https://obfuscator.io/
- http://soaptek.blogspot.com/2013/01/tim-hieu-ve-minified-obfuscated-code.html