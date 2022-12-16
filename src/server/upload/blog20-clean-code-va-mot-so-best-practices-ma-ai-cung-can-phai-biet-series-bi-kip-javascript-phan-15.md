![image.png](https://images.viblo.asia/a666b4c2-8915-444e-9481-d44f25e17dce.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Hôm nay mình sẽ chia sẻ đến cho các bạn Beginner một số Best Practices. Nó giúp các bạn code tốt hơn và tránh phải những lỗi không đáng có.

Code được viết một lần. Sau đó, nó được đọc, debug, tái cấu trúc và mở rộng liên tục. Cách bạn lập trình ngày hôm nay sẽ giúp bạn maintenance và mở rộng ứng dụng sau này. Chúng ta thường xuyên phải chịu áp lực về **deadline** trong quá trình phát triển phần mềm. Dù vậy, điều quan trọng là **sử dụng các best practices về lập trình để giúp đảm bảo code có chất lượng tốt hơn cho chính bạn và cho bất kỳ ai có thể phải mở rộng code đó trong tương lai**.

Hôm nay, chúng ta sẽ thảo luận về tầm quan trọng của việc sử dụng các best practices này. Năm best practices mà bạn nên biết nếu bạn là một lập trình viên mới bắt đầu. 

**Mục lục** :
  - [Tại sao bạn nên sử dụng các best practices về lập trình](#tại-sao-bạn-nên-sử-dụng-các-best-practices-về-lập-trình)
  - [3 coding best practices cho người mới bắt đầu](#3-coding-best-practices-cho-lập-trình-viên-mới-bắt-đầu)
    - [1\. Đặt tên có ý nghĩa](#1-đặt-tên-có-ý-nghĩa)
    - [2\. Comment](#2-comment)
    - [3\. Đừng lặp lại những gì đã có](#3-đừng-lặp-lại-những-gì-đã-có)
  - [Tổng kết](#tổng-kết)


Tại sao bạn nên sử dụng các best practices này
----------------------------------------------------------

Là một lập trình viên, nếu bạn quen và thường xuyên áp dụng các best practices này sẽ giúp việc mở rộng và debug code dễ dàng hơn trong tương lai. Ngay cả khi bạn không còn làm việc với codebase đó, những thứ mà bạn để lại sẽ ảnh hưởng đến các dev làm việc với code đó trong tương lai.

Các best practices về lập trình giúp đảm bảo [chất lượng code của bạn](https://www.educative.io/blog/questions-assess-codebase-health-interviews). Sử dụng các good practices tốt khi lập trình sẽ làm cho code của bạn nâng cao: Khả năng maintenance, khả năng mở rộng, khả năng đọc và tính linh hoạt.

> Code được viết một lần và đọc hàng nghìn lần.

Một số good coding practices, chẳng hạn như comment, tuy nó không ảnh hưởng đến function hệ thống. **Tuy nhiên, chúng ảnh hưởng đến trải nghiệm cho những người sẽ đọc và maintenance code đó sau này**. Không phải cứ chạy được là được.

3 coding best practices cho người mới bắt đầu
-------------------------------------------------------------

### 1\. Đặt tên có ý nghĩa

Tên biến và tên hàm của code phải trực quan. Lý tưởng nhất là chúng ta có thể đoán một hàm hoạt động dựa trên tên của hàm.

Bạn nên **đặt tên trực quan cho các đối tượng, biến, lớp, hàm và hằng số**. Tuy nhiên, chúng ta cũng cố gắng giữ cho code của mình ngắn gọn và dễ đọc. Nếu tên trực quan nhất quá dài để giữ cho code ngắn gọn, bạn có thể sử dụng `shorthand` (*tốc ký*) của nó. Cần lưu ý rằng **`shorthand` cũng nên duy trì tính trực quan**.

Ví dụ sau về không tuân theo các quy ước đặt tên có ý nghĩa. Điều này làm cho nó khó hiểu và khó sử dụng lại.

```js
function find(A) {
  let ret = -1;
  for (let i = 0; i < A.length; i++) {
    if (A[i] > ret) {
      ret = A[i];
    }
  }
  return ret;
}

const A = [1, 3, 7, 13, 99, 0, 8, 3];
console.log("find(A) :>> ", find(A));
// find(A) :>>  99
```

Ngược lại, ví dụ code sau đây có cùng function, nhưng cách đặt tên có ý nghĩa giúp bạn dễ hiểu hơn.

````javascript
function findLargest(inputAry) {
  let largest = -1;
  for (let i = 0; i < inputAry.length; i++) {
    if (inputAry[i] > largest) {
      largest = inputAry[i];
    }
  }
  return largest;
}

const inputArray = [1, 3, 7, 13, 99, 0, 8, 3];
console.log("findLargest(A) :>> ", findLargest(inputArray));
````

### 2\. Comment

> Code dành cho trình biên dịch, trong khi comment dành cho lập trình viên.

Ngay cả khi các best practices khác được sử dụng, source code không phải lúc nào cũng có thể tự giải thích được ý nghĩa của nó. Khi code không thể tự giải thích, thì chúng ta nên comment. Phương pháp ở đây là: **Bạn càng đoán trước được suy nghĩ của người đọc, thì comment của bạn càng có ích**.

Dưới đây là một số hướng dẫn chung cho comment code:

*   **Ưu tiên chất lượng hơn số lượng** : Đừng comment mọi dòng code. Quá nhiều comment thì rất khó đọc. Nếu tên hàm hoặc tên biến của bạn đã clean code thì nó có thể tự giải thích, bạn không cần phải giải thích lại nó.
    
*   **Đừng cho rằng ai cũng sẽ hiểu bạn đang làm gì và làm trong hoàn cảnh nào** : Hãy cho người đọc biết hoàn cảnh đằng sau đoạn code đó để họ có thể hiểu tại sao nó lại cần thiết. Nếu bạn đã sửa đổi code để fix bug, các _comment lúc này là rất cần thiết_ .
    
*   **Giải thích “WHY”** : Đừng giải thích WHAT. Bàn đang làm cái gì. Thay vào đó hãy giải thích _lý do tại sao_ bạn làm cái đó. Mọi người có thể biết bạn đang làm gì thông qua việc đọc code của bạn, nhưng biết _lý do tại sao_ sẽ giúp người đọc hiểu rõ hơn về code đó hơn.

Sau đây là một ví dụ về comment code được thực hiện tốt.

```javascript
/**
 * Finds the largest integer from the given array
 * @param {*} inputAry
 * @returns largest
 */
function findLargest(inputAry) {
  //Assumption: array will have n elements.
  //Thus, the largest is initialized with -1 (smallest possible value).
  let largest = -1;

  for (let i = 0; i < inputAry.length; i++) {
    if (inputAry[i] > largest) {
      largest = inputAry[i];
    }
  }

  return largest;
}

const inputArray = [1, 3, 7, 13, 99, 0, 8, 3];
console.log("findLargest(A) :>> ", findLargest(inputArray));
```

### 3\. Đừng lặp lại những gì đã có

Còn được gọi là nguyên tắc DRY, "Don’t repeat yourself" cố gắng giảm sự trùng lặp code. Ý tưởng ở đây là nếu bạn có code làm cùng một việc hai lần, thì sẽ tạo một hàm. **Bằng cách trừu tượng hóa code thành các hàm, bạn có thể sử dụng lại code đó và làm cho việc phát triển hiệu quả hơn**. Ngoài ra, việc tránh trùng lặp code giúp debug dễ dàng hơn, vì bạn sẽ không phải sửa lỗi tại mọi vị trí mà code lặp lại trong toàn bộ source của mình.

### Tổng kết

Các nguyên tắc lập trình khác nhau trong các contexts khác nhau. Tùy thuộc vào ngôn ngữ lập trình, công ty hoặc việc mà bạn đang làm, có thể có các hướng dẫn lập trình khác nhau cho các quy ước đặt tên, kiểu lập trình, thụt lề và cấu trúc tệp. Hãy quan tâm đến nhu cầu dự án của bạn và tôn trọng các tiêu chuẩn lập trình đó khi bạn có thể.

> Sử dụng khả năng phán đoán tốt nhất của bạn và điều chỉnh theo bất cứ điều gì mà tình huống của bạn yêu cầu.

Điều quan trọng là phải biết các good coding practices, nhưng **các quy tắc chỉ đơn giản là khái quát hóa mà không có contexts cụ thể. Để được sử dụng tốt, chúng cần sự đánh giá tốt của bạn**. Sẽ có lúc contexts của bạn bắt buộc bạn phải đánh đổi những nguyên tắc này vì cái gì cũng có ngoại lệ mà.

Như mọi khi, mình hy vọng bạn thích bài viết này và biết thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/10/blog20-clean-code-va-mot-so-best.html