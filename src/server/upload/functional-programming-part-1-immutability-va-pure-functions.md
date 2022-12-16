Functional Programming được nhiều người đánh giá là rất khó học. Tuy nhiên, bất kỳ kỹ năng nào mà bạn cố gắng master mình nghĩ cũng đều sẽ có những sự khó khăn. Vì vậy, mình nghĩ rằng học Functional Programming không khó hơn việc học lập trình nói chung, chỉ là có sự khác biệt mà thôi.
<br>

Trong loạt bài này, chúng ta sẽ từng bước học Functional Programming. Hãy tham gia cùng mình trong chuyến đi này, và hãy tin rằng khi kết thúc, bạn sẽ trở thành một lập trình viên tốt hơn bởi những nỗ lực mà mình bỏ ra.
<br>

Mình sẽ bắt đầu với một vài khái niệm cơ bản mà chúng ta cần làm quen. Sau đó, chúng ta sẽ bắt đầu đi sâu vào các chủ đề phức tạp hơn.

---

# Immutability
Immutability tạm dịch là bất biến. Trong Functional Programming (FP), chúng ta cần cố gắng biến đổi dữ liệu của mình càng ít càng tốt. Nếu bạn không hiểu rõ lắm như vậy có nghĩa là gì thì có thể nói theo một cách khác là chúng ta cần cố gắng thay đổi giá trị của các biến càng ít càng tốt. Ví dụ, hãy xét khai báo sau: `const a = 1;`
<br>

Biến `a` không bao giờ được phép thay đổi. Nó không bao giờ được có giá trị gì khác 1. Trong ví dụ này, mình đang sử dụng `const`, vì vậy mình không thể thay đổi nó mà không bị báo lỗi. Tuy nhiên, nếu giá trị của biến là mảng thì bạn vẫn có thể `push` hoặc `pop` các phần tử khỏi mảng ngay cả khi chúng được khai báo bằng `const` chính vì vậy bạn cũng không nên khai báo kiểu này trong Functional Programming.
<br>

Lý do mình nói rằng chúng ta nên biến đổi dữ liệu của mình *càng ít càng tốt* là vì chương trình của chúng ta vẫn cần phải hoạt động. Nếu dữ liệu không bao giờ biến đổi thì tức là sẽ chẳng bao giờ có gì xảy ra và chương trình cũng sẽ trở nên vô nghĩa. Tuy nhiên, sự khác biệt giữa FP và "lập trình bình thường" là sự biến đổi data xảy ra một cách rất có kiểm soát.
<br>

Ví dụ, tất cả các biến đổi sẽ thường được xảy ra vào tận cuối chương trình của chúng ta. Mình biết là ngay bây giờ các bạn sẽ thấy câu này thật khó hiểu. Tuy nhiên, khi chúng ta đi sâu thêm, các bạn sẽ hiểu được nó. Trong lúc này, hãy cứ cố giữ một mindset rằng bạn sẽ cố gắng không bao giờ biến đổi dữ liệu trừ khi thực sự cần thiết. Sau này khi bạn đã có kĩ năng tốt hơn, bạn sẽ thấy rằng có những chỗ mà bạn thường nghĩ mình cần phải biến đổi trong khi thực tế lại không cần thiết.
<br>

Vậy, tại sao chúng ta lại phải cố gắng giữ sự bất biến? Có nhiều lý do, nhưng mình sẽ đề cập đến lý do mà mình cho là quan trọng số một: sự ổn định. Gỉa sử nếu bạn biết rằng biến của bạn không bao giờ bị thay đổi, bạn biết rằng bạn có thể tin tưởng rằng dữ liệu luôn có ở đó và bạn luôn được đảm bảo rằng nó có giá trị mà bạn mong đợi, thì khi đó, code của bạn sẽ ít có nguy cơ ẩn chứa các lỗi không mong muốn. Một lợi ích rất lớn, đúng không?
<br>

Mình hiểu các bạn sẽ cảm thấy hoài nghi ngay lúc này: "Tôi sẽ làm thế nào để chương trình của mình chạy được?", "Làm cách nào để thêm một phần tử vào mảng của tôi?"... Mình sẽ nói càng nhiều hơn về những vấn đề này khi chúng ta đi càng sâu hơn, nhưng ngay lúc này, mình sẽ nói thế này - thay vì thay đổi dữ liệu của chúng ta mọi lúc, trong FP, chúng ta sẽ tạo dữ liệu mới dựa trên dữ liệu hiện có và làm việc với dữ liệu đó.
<br>

# Pure functions
Tiếp tục nối tiếp tinh thần của khái niệm bất biến, chúng ta hãy tiếp tục với khái niệm về Pure functions. Ngay từ tên gọi mô hình lập trình chúng ta đang tìm hiểu, các bạn có thể thấy được rằng, các function chính là thứ quan trọng thiết yếu trong Functional Programming. May mắn cho chúng ta, trong Javascript, các function lại thuộc vào diện "công dân hạng nhất". Điều này có nghĩa rằng, Javascript là một ngôn ngữ khá tốt để học FP.
<br>

Trong FP, tất cả các chức năng phải... pure (trong sáng, tinh khiết...)  - ít nhất là bất cứ khi nào nó cần thiết phải như thế. Nhưng tinh khiết có nghĩa là gì?  Tất nhiên nó có nghĩa là function phải không có tác dụng phụ (có nghĩa là làm thay đổi những thứ khác ngoài phạm vị của chương trình). Các pure function trả về cùng một giá trị bất cứ khi nào nó được cung cấp cùng một đầu vào.
<br>

Nếu bạn vẫn chưa hiểu thì cũng không sao cả, mình sẽ cho các bạn một ví dụ như sau:
<br>

```javascript
let a = 1;

// Function không pure, biến đổi 'a' do nó được khai báo ở ngoài function
function increaseA (addition) {
    a += addition;
    return a;
}

increaseA(2); // trả về a lúc này giá trị là 3
increaseA(2); // trả về a lúc này giá trị là 5
```

Hãy thử xem ví dụ về một pure function:
```javascript
const a = 1;

function add (num1, num2) {
    return num1 + num2;
}

add(a, 2); // trả về một giá trị mới là 3
add(a, 2); // trả về một giá trị mới là 3
```
<br>

`add` là một pure function vì nó chỉ xử lý các đối số của nó. Hãy để ý rằng, nó không thay đổi bất kỳ đối số nào mà chỉ trả về một giá trị mới dựa trên hai đối số.
<br>

Ở phía trên mình có đã đề cập rằng, một pure function cần không có tác dụng phụ. Dưới đây là một số tác dụng phụ mà có thể bạn không nhận ra:
- `console.log` (thay đổi thế giới bên ngoài chương trình: cụ thể là đầu ra trên màn hình)
- Ghi vào file (thay đổi thế giới bên ngoài chương trình: file hệ thống)
- Tính ngẫu nhiên, vd: Math.random (không trả về cùng một giá trị dựa trên cùng một đầu vào)

Hy vọng rằng các ví dụ trên có thể cho các bạn thấy rõ ràng được thế nào là một pure function.

---

Phía trên chính là phần mở đầu của series này. Điều quan trọng trong bài này là bạn cần phải nắm được các khái niệm pure function và tính bất biến cũng như tầm quan trọng của chúng.
<br>

Tóm lại, tất cả nhưng điều trên đều nhằm mục đích làm cho chương trình của bạn có được sự ổn định và đáng tin cậy. Sự ổn định và đáng tin cậy sẽ luôn hữu ích bất kể bạn lập trình theo mô hình lập trình nào. Khi chúng ta tiếp tục với các bài viết sau, các bạn sẽ thấy rằng hoàn toàn có thể kết hợp một số mô hình lập trình với nhau -  về tổng thể, việc này sau cùng sẽ khiến bạn trở thành một lập trình viên tốt hơn.
<br>

Trong phần tiếp theo của loạt bài này, chúng ta sẽ bắt đầu tìm hiểu về [currying](https://viblo.asia/p/functional-programming-part-2-currying-63vKj1QV52R) - một thủ thuật tuyệt vời khiến cho các function của bạn có thể tái sử dụng và kết hợp nhiều hơn.

---

*Source: https://levelup.gitconnected.com/functional-programming-for-javascript-developers-669c3db705f0*