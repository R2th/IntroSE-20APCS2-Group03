* ![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/i4dmju881x_textbackground.jpg)
#Tản mạn chém gió
Thời nay người ta thường quan tâm tới các công nghệ mới, các công nghệ phát triển như vũ bão cộng  thêm hàng loạt các thư viên ra đời với tốc tăng theo từng giây, từng phút, nhất là đối với ae làm về javascript, số lượng của thư viện js phải nói là quá nhiều, nên việc ae js bị phụ thuộc vào nó là điều khó tránh phải, việc hiểu thư viện là rất quan trọng, muốn dùng thì phải hiểu kĩ trước là điều khá quan trọng, mình rất may mắn được làm việc với một người anh leader, a ấy có sở thích nhìn lại cách hoạt động của thư viện rồi viết lại, và mình cũng lây được thói quen đó của a ấy, mình rất thích viết lại thư viện, và trong quá trình tìm hiểu về các thư viện liên quan đến text mình cũng đã biết đến range , selection , document,execCommand. Việc viết lại thư viện nghe có vẻ là việc gì đó cao siêu nhưng thực ra nó cũng không thấy có gì cao siêu cả, vả lại mình lại nghĩ cách học sâu nhất và triệt để một khái niệm nào về công nghệ nào đó là viết lại công nghệ đó, tất nhiên là không viết lại hoàn toàn mà sẽ viết lại phần tinh tuý của nó, không nói lằng nhằng nó mình sẽ đi thẳng vào vấn đề như tiêu đề  	:smile: :smile: :smile: :smile: :smile: :smile: :smile: 
# Các ví dụ điển hình về Text
Nếu đa phần các bạn đọc ở đây có sở thích đọc blog thì không thể không biết đến medium, medium là một trong những thằng khai thác được triệt để việc xử lý các đoạn text , rich text
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/fw5r0ar9g0_Screen%20Shot%202018-11-19%20at%205.12.18%20PM.png)

Ngoài ra facebook là một thằng khai thác triệt để về text, vd như hashTag , #ass , ...
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/bvzy4g46ah_Screen%20Shot%202018-11-19%20at%205.13.31%20PM.png)
# Giới thiệu vài concept cơ bản 
Các bạn để ý khi các bạn viết blog trên medium, khi nào mình bôi đen vào chữ nó sẽ hiển thị một thanh toolbar ở trên, vậy chúng ta đặt câu hỏi: Làm sao mediun có thể detect được lúc nào thanh toolbar đó hiện thị lên  và so nó có thể set đúng vị trí đoạn mà mình bôi đen vào ?
Trả lời : trong javascript trên trình duyệt thì có một hàm toàn cục là getSelection(), nó giúp mình lấy được thông tin đoạn text mà user bôi đen vào, nó trả về các thông tin như offset, range. Vì trong giới hạn một bài viết thì mình sẽ giới thiệu những function được cho theo mình là hay dùng.
note : hàm getSelection() là hàm toàn cục từ chính cái frame bạn đang chọn, vì vậy bạn phải chọn được frame mà bạn muốn lấy
``` javascript
getSelection().toString() // trả về chuỗi mà user đang bôi đen, thường dùng để lấy và  detect lúc nào user đang bôi đen text
getSelection().getRangeAt(0)  // lấy range từ đoạn text được bôi đen
getSelection().addRange(rangeForMe) // thêm range vào
getSelection().removeAllRanges() // xoá range, hàm này thường được dùng khi chúng ta muốn thêm range
```

# Range trong javascrit![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/7n7t2a94fa_Screen%20Shot%202018-11-19%20at%205.47.41%20PM.png)
Thoạt ra thấy trong proto của nó nhiều hàm thật :v, mà thực ra khi mình áp dụng vào thì chỉ 3 4 function thôi, không hiểu hàm nào vào [doc](https://developer.mozilla.org/en-US/docs/Web/API/Range) của nó đọc  chúng ta bắt đầy tìm hiểu nào,
Chúng ra đã biết đấy dom trong javascript, các element trên một page đều có dom, vậy text cũng phải có range, hiểu nôm na là range cũng gần giống như dom chỉ khác là nó dành cho text,
Ở đây mình có liệt kê vài tip nhỏ về sử dụng các hàm mà mình thấy nó hay dùng nhất
``` javascript
const range = getSelection().getRangeAt(0) // lấy range
range.getBoundingClientRect() // lấy position của đoan text, thanh toolbar của medium cũng tìm vị trí đoan text bằng hàm này
range.cloneRange() // hàm này mình rất hay dùng để lưu lại những bước user đã bôi đen đoạn text, ứng dụng vào việc undo , redo đoạn text user đã bôi đen
```
# document.execCommand  trong javasript
Nhớ lần đầu tiên mình sử dụng nó, mình còn ngạc nhiên nghĩ : ơ đm thằng js nó xịn vl :smile: , nếu bạn nào đang đọc bài này chưa từng dùng nó thì sau khi đọc xong hãy dùng ngay, các bạn để ý thanh toolbar trong medium lúc mình nhắc đầu bài viết, khi nó bấm nút Bold thì ngay lập tức text đc bôi đen sẽ bold ngay, magic vc nhở và document.execCommand đã làm ra chuyện đó
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/4allp2lwmi_Screen%20Shot%202018-11-19%20at%206.56.06%20PM.png)
Nhiệm vụ của thằng execCommand là style những text  tuỳ ý  tuỳ theo parameter mà mình truyền vào function execCommand
```javascript
// cú pháp document.execCommand(aCommandName, aShowDefaultUI, aValueArgument)
document.execCommand('formatBlock', false, command);  
document.execCommand('bold', false, command); // bold những text đang bôi đen
document.execCommand('foreColor', false, 'red') ; // text đang được bôi đen sẽ thành màu đỏ 
```
* aCommandName có thể là delete  , createLink , copy, paste , bold , italy ,heading,foreColor   ... , đủ mọi thể loại style luôn
* aShowDefaultUI : mặc định mình sẽ để là false
* aValueArgument:  thường khi  aCommandName là heading, foreColor  thì sẽ truyền vào , nó có thể là h1, h2, red, ...

# Tổng kết
Các khái niệm mình nêu ở trên nó khá là rời rạc, để mọi người có cái nhìn chung về chúng và cách kết hợp chúng để tạo ra sản phẩm mình sẽ liệt kê vài thư viện và demo nhỏ của mình trên github của mình
* demo git của mình:smile:  : https://github.com/ducga1998/rich-text-javascript
* Thư viện về  range : https://github.com/timdown/rangy
* Thư viện undo : https://github.com/jzaefferer/undo
* Thư viện text về medium : https://github.com/jakiestfu/Medium.js


Qua bài viết này mình hi vọng ae có thể có cái nhìn sơ qua về các thứ mình đã đề cập và mong mọi người sẽ tìm hiểu sâu hơn về nó tiếp nữa, các vấn đề thắc mắc ae cmt tẹt ga ở dưới, yeahhh :smile: :smile: