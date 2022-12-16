# Mở đầu
Hôm nay mình xin mạo muội chia sẻ một vài hiểu biết về của mình về **Code Convention** sau một thời gian đi làm tuy là không quá dài nhưng cũng không quá ngắn.
Đối với mình việc viết code cũng như là lên kích bản cho một bộ phim, phim càng dài càng nhàm và code càng dài càng lười đọc :laughing:. Một điều hiển nhiên nếu như các bạn được đưa vào maintain một dự án nhất là các dự án lớn, lâu năm. Đoạn đầu lúc đọc spec và source code, các bạn sẽ cầu trời cho những "người đi trước" các bạn là những người viết code có tâm. Còn không thì chắc các bạn phải đóng vai Chí Phèo mỗi ngày chỉ để chửi ![](https://images.viblo.asia/c973fd79-c958-4b22-8d6a-dd517f8aa0dc.gif).

# Lợi ích của việc "Code đẹp"
Không nói đâu cho xa, một đoạn code, một function các bạn viết, chắc hẳn các bạn sẽ phải có ngày đọc lại nó. Và các bạn đã gặp tình huống như vậy chưa nhỉ?

![](https://images.viblo.asia/a9157beb-b4ab-446d-8553-22b758198489.jpg)

Mình thì rồi nhé, và lúc đó mình phải ngồi ngẫm nghĩ lại vì sao lúc trước mình lại viết như vậy :thinking:.

Tiếp theo, nếu như chúng ta có thể clean code, làm code ngắn gọn dễ đọc dễ hiểu thì mình nghĩ một điều mà mọi **end-user** hay **client** luôn mong muốn đó chính là *performance* của hệ thống sẽ tốt hơn. Người viết code đọc còn khó hiểu thì lấy đâu mà máy dễ hiểu, đúng k nào ![](https://images.viblo.asia/d09412db-bdeb-447e-9f95-f503d348d330.png).

Và điều cuối cùng mình muốn nói là hãy viết code có tâm với những người đến sau :laughing:.

Vậy như thế nào để "code đẹp"? Hãy cùng đọc phần tiếp theo nhé.

# Cách đặt tên
Đối với mình, khi đặt tên một function, cần có đủ ba tiêu chí: *đúng nghĩa*, *ngắn gọn*, *dễ hiểu*. Và đối với mỗi ngôn ngữ, sẽ có các **convention** về cách đặt tên biến và hàm khác nhau, giả sử trong Javascript:

Mình thường sử dụng **camelCase** khi đặt tên các biến và hàm.
```
let firstName = 'Henry';
let lastName = 'Mills';
```

Và một điều quan trọng không kém, đó chính là chúng ta nên tránh đặt tên ngắn gọn quá mức vì có thể sẽ trùng các *keyword*.
```
let length = 99;
```

Và đây là một trường hợp mà khi còn đi học, mình rất hay dính phải:

![](https://images.viblo.asia/5cc130d6-4b49-4cff-b47d-a26c4fb8d907.jpg)

Và đương nhiên, theo thời gian, nó sẽ luôn "tự động" có các cái tên **final_1**, **final_2**, **final_n** xuất hiện :laughing:.
# Comment
Không hẳn lúc nào chúng ta cũng phải comment code, giải thích về các variable hay các function mà chúng ta đã viết trừ khi đó là bắt buộc. Chúng ta chỉ nên comment đối với những đoạn code khó hiểu, phức tạp. Và nếu quá lợi dụng vào việc comment code, sẽ làm bạn tạo ra ngày càng nhiều các đoạn code khó hiểu, phức tạp đúng k nào? Trước khi nghĩ đến việc comment code, thì chúng ta nên nghĩ đến việc viết đoạn code của chúng ta trở nên dễ hiểu và ngắn gọn hơn nữa.

![](https://images.viblo.asia/e0526a2a-dba0-4e0f-bf1a-15d53df55de5.jpeg)

# Indentation
Mình thấy hầu hết có hai kiểu khi canh lề code đó là sử dụng **tab** và sử dụng **space**. Việc sử dụng cách nào đó là do thói quen, sở thích của mỗi người hay cũng có thể là quy định của mỗi công ty đưa ra, nhưng dù sao thì mình nghĩ khi code chúng ta nên canh lề các đoạn code một cách rõ ràng, gọn gàng. Việc canh lề code, cũng góp phần làm code của bạn trông có vẻ sạch sẽ và dễ đọc hơn rất nhiều.

# Khác
Đó là 3 mục mà mình quan tâm khi viết code nhất, ngoài ra còn có các **convention** khác như:
* Space trước và sau các toán tử.
```
function toCelsius(fahrenheit) {
    return (5 / 9) * (fahrenheit - 32);
}
```
* Cách đặt dấu ngoặc nhọn: Mình thấy có 2 cách đặt như sau:
```
function() {
// code
}

function()
{
// code
}
```
Về vấn đề này, mình nghĩ không nhất thiết phải theo một format nào, chỉ dùng sao mình cảm thấy dễ nhìn là được.

![](https://images.viblo.asia/28628d1b-9902-4c12-8137-9818060f9d6b.jpg)

* Không nên viết code quá dài trên một dòng, thường thì mình thấy chỉ nên dừng ở 80 kí tự một dòng. Và đa số các editor hiện nay, luôn có *ruler* giúp chúng ta canh chỉnh việc này. Chỉ cần nhìn và enter, vậy ngại gì mà không sử dụng để giúp code trở nên đẹp hơn đúng không nào :thinking:.

# Kết
Trên đây là ý kiến khách quan của mình về **Code Convention**, nếu xét về thẩm mỹ thì mỗi người có một góc nhìn khác nhau, một cách viết code khác nhau. Nhưng xét trên khía cạnh dễ đọc và dễ maintain, mình nghĩ chúng ta nên tuân theo một **convention** chung, tổng quan nhất để giúp cho việc đọc code của bản thân và những người khác dễ dàng hơn.

Ngoài ra, mình cảm thấy việc code theo **convention** là một thói quen tốt cho các developer, giúp chúng ta trở nên có quy tắc trong công việc hơn. Và đương nhiên, mỗi công ty, mỗi môi trường làm việc sẽ đưa ra các **convention** khác nhau, và việc bản thân mỗi chúng ta luôn tuân theo các **convention** sẽ giúp chúng ta dễ dàng hơn trong việc áp dụng các rule mới về **Code convention** đúng không nào :smiley:.

Cảm ơn các bạn đã đọc.