# Giới thiệu
Vào một ngày đẹp trời, tôi được vào một dự án creation sau bao nhiêu năm mài đũng quần ở các dự án maintain. Tôi hì hục viết code, tập trung toàn bộ những cái kinh nghiệm code trong những dự án mình đã từng làm. Mọi thứ đều tốt đẹp cho đến khi tôi đưa anh Team lead cộm cán của dự án review:
* “Anh ơi em code xong màn hình XXX rồi anh review giúp em.”
* “Ok em, chờ anh chút. Anh review nốt code của bạn AAA sắp xong rồi.”
* (sốt ruột) “Vâng a. Em tranh thủ qua code màn hình khác nhé.”
* “OK em, good!”
<br>
(15 phút sau)
* “Em code cái gì thế này, anh đọc chả hiểu cái gì cả, thôi tạm thời dừng toàn bộ task hiện tại đang làm để học lại cách code đi em. Làm thì ít nhất cũng phải cho người khác hiểu được chút chứ!”
* (ahuhu) “Dạ anh :(”
<br>

Bỗng dưng ngày hôm đó trời tối sầm, mưa tầm tã. Tôi về nhà mà không biết phải làm thế nào để xoa dịu nỗi buồn này, cả cuộn giấy ăn bên máy tính cũng không buồn dùng. Và may thay, cuối ngày hôm đó nhận được email của anh team lead, cho mình link để đọc một cuốn về chủ đề nghệ thuật code đẹp. Và đó cũng là bước ngoặt để biến mình thoát ra khỏi cái mác code đơ a-ma-tơ (amateur) :D :D :D
 
Thôi lan man thế đủ rồi. Giờ chúng ta sẽ bàn về vấn đề chính. Mình sẽ giới thiệu với các bạn một series về viết code "nghệ thuật": ***The art of readable code*** của đồng tác giả ***Dustin Boswell*** và ***Trevor Foucher***.

# PHẦN MỞ ĐẦU 
Trong nhiều năm qua, tác giả đã thu thập hàng trăm ví dụ về “code xấu xí” (phần lớn trong số đó cũng là của tác giả). Họ đã phân tích những gì làm cho nó “xấu xí”, tìm ra nguyên tắc/kỹ thuật để làm cho nó tốt hơn. Những gì họ nhận thấy là tất cả các nguyên tắc bắt nguồn từ một chủ đề duy nhất:
> ##### KEY IDEA: 
> ##### ***Mã nên dễ hiểu***.
Tác giả tin rằng đây là nguyên tắc hướng dẫn quan trọng nhất mà bạn có thể sử dụng khi quyết định cách code của bạn. Trong suốt cuốn sách, mình sẽ hướng dẫn cách áp dụng nguyên tắc này cho các khía cạnh của việc code hàng ngày của bạn. Nhưng trước khi chúng ta bắt đầu, mình sẽ giải thích về nguyên tắc này và lý giải tại sao điều đó lại quan trọng.
<br><br>
![](https://images.viblo.asia/b27a3b27-d5f0-415d-a67d-8b266f0b7f59.png)
<br>
## Chương I: Code nên dễ hiểu
### Điều gì giúp code “ngon" hơn
Phần lớn các lập trình viên viết code theo cảm giác lẫn trực giác. Toàn bộ chúng ta đều biết rằng viết như này:
```
if (a != 0 && b != 0) { 
    system.out.println("Display: " + a + ", " + b);
}
```
Sẽ “xịn” hơn như này:
```
if (a == 0) { 
    return;
} else if (b == 0) {
    return;
} else {
    system.out.println("Display: " + a + ", " + b);
}
```
(2 kết quả trả về đều tương đương)
<br><br>
Nhưng nhiều khi nó là một quyết định khó khăn hơn. Ví dụ đoạn code sau:
<br>
```
return a > 0 ? a : 0;
```
sẽ tồi hơn hay tốt hơn đoạn code sau:

```
if (a > 0) { 
    return a; 
} else { 
    return 0; 
}
```

Đoạn code đầu tiên trông gọn hơn, nhưng đoạn code thứ hai ít “đáng sợ” hơn. <br>
Tiêu chí nào quan trọng hơn? Nói chung, làm thế nào để bạn quyết định cách để code cho mục đích gì?
<br><br>
### Định lý cơ bản của việc "dễ đọc"
Sau khi nghiên cứu nhiều ví dụ code trong thực tế, tác giả đã đi đến kết luận rằng có một tiêu chí cho khả năng đọc quan trọng hơn bất kỳ loại nào khác và họ gọi nó là “Định lý cơ bản của việc "dễ đọc". ”
> ##### KEY IDEA: 
> ##### ***Mã nên được viết để giảm thiểu thời gian đọc hiểu cho người khác***.
Để ví dụ theo đúng nghĩa đen nhé: nếu bạn có một người đồng nghiệp, và bạn có thể đo lường được thời gian mà người ta có thể hiểu được đoạn code của bạn. Khoảng thời gian mà người đó bỏ ra chính là thứ mà bạn cần phải giảm thiểu. Và khi họ nói "hiểu", "hiểu" ở đây có nghĩa là người đó hoàn toàn hiểu code của bạn, có thể thay đổi nó, phát hiện bug và biết đoạn code đó tương tác với phần còn lại trong cả khối code của bạn như thế nào.<br>
Bây giờ, bạn có thể đang nghĩ rằng, *ai cần quan tâm người khác phải hiểu code mình làm gì? Tôi là người duy nhất sử dụng đoạn code này!* Ngay cả khi bạn là người duy nhất của dự án đó, và dự án đó đáng là mục tiêu sự nghiệp mà bạn theo đuổi.<br>
Và 6 tháng sau đó, khi bạn nhìn vào đoạn code của mình, thấy có gì đó không được "thân quen" cho lắm, và bạn cũng chẳng biết được có ai đó có thể join vào dự án của bạn, hoặc "những đoạn code bỏ đi ấy" có thể được tái sử dụng ở dự án mà bạn sẽ join. Và lúc đó bạn chỉ "ước gì" có người từng hiểu được code của bạn và cùng bạn đi "chinh chiến".<br>
![](https://images.viblo.asia/47d109d5-eea0-4b33-a6bb-a86d7296af44.png)
### Có phải cứ ngắn gọn là "xịn" hơn?
Nói chung, bạn càng viết ít code hơn để giải quyết vấn đề thì càng tốt. Nó có thể mất ít thời gian hơn để hiểu một class 2000 dòng hơn là một class 5000 dòng.<br>
Nhưng ít dòng hơn không phải lúc nào cũng tốt hơn! Có rất nhiều lần khi một biểu thức một dòng như:
```
(!(boong = findBoong()) || !(boong == canUseNow())) ? return "Không xài được rồi!" : return "Ngon!";
```

mất nhiều thời gian để hiểu hơn là nhiều dòng:

```
boong = findBoong();
if (!boong || !(boong == canUseNow()))
    return "Không xài được rồi!";
else
    return "Ngon!";
```

Tương tự, bổ sung comment có thể giúp bạn hiểu code nhanh hơn, ngay cả khi nó "thêm code” vào file:
```
//Kiểm tra boong xem có dùng được bây giờ không
boong = findBoong();
if (!boong || !(boong == canUseNow()))
    return "Không xài được rồi!";
else
    return "Ngon!";
```

Vì vậy, mặc dù có ít dòng code hơn là một mục tiêu tốt, nhưng giảm thiểu thời gian đọc hiểu là một mục tiêu tốt hơn nữa.


### Có phải tiêu chí thời gian đọc hiểu bị xung đột với các mục tiêu khác?
Bạn có thể suy nghĩ rằng, *thế còn những ràng buộc khác như tạo ra những dòng code hiệu quả, hay kiến trúc tốt, hoặc dễ test, v.v. Có phải những điều này thỉnh thoảng làm ảnh hưởng đến việc viết code cho dễ hiểu không?*
Chúng tôi nhận thấy rằng những ràng buộc khác này không can thiệp nhiều đâu :D Ngay cả trong lĩnh vực tối ưu hóa code, vẫn còn nhiều cách để làm cho nó dễ đọc hiểu. Và làm cho code của bạn dễ đọc hiểu thường giúp cho code có được cấu trúc tốt và dễ test.
Phần còn lại của cuốn sách sẽ thảo luận về cách áp dụng sự “dễ đọc” trong các hoàn cảnh khác nhau. Nhưng hãy nhớ, khi "bối rối", ***Định lý cơ bản của việc "dễ đọc"*** (P1) sẽ vượt trội hơn bất kỳ quy tắc hoặc nguyên tắc nào khác trong cuốn sách này. Ngoài ra, một số coder có yêu cầu bắt buộc để sửa code mà chưa chác đó đã là một sự thay thế hoàn hảo. Thì điều quan trọng khi đó là phải luôn quay lại và hỏi, *Code này có dễ hiểu không?* Nếu có, có thể chuyển sang đoạn code khác.


### Và phần quan trọng là
Công việc này đòi hỏi bạn phải tốn thêm công sức để liên tục suy nghĩ và tưởng tượng về việc liệu một người ngoài sẽ thấy code của bạn dễ đọc hiểu hay không. Làm như vậy đòi hỏi bạn phải "mở công tắc" một phần bộ não của mình mà có thể bạn chưa từng sử dụng trước đây trong khi viết code. Nhưng nếu bạn áp dụng được nó (như chúng tôi có), chúng tôi chắc chắn bạn sẽ trở thành một lập trình viên pro hơn, có ít bug hơn, tự hào hơn trong công việc của bạn, và khi bạn viết code thì mọi người xung quanh bạn ai cũng sẽ thích sử dụng code của bạn. Vậy hãy bắt đầu thôi!
<br><br>
#### Kết (P1)
Lần đầu tiên giới thiệu thì nói sơ qua nội dung cuốn sách như vậy là đủ rồi, còn dài lắm, mình sẽ biên dịch dần dần, hẹn gặp lại các bạn ở phần tiếp theo.
<br> [Series Viết code "nghệ thuật"](https://viblo.asia/s/series-viet-code-nghe-thuat-o754jLL0ZM6)
<br> Tài liệu tham khảo: *The art of readable code by Dustin Boswell and Trevor Foucher*