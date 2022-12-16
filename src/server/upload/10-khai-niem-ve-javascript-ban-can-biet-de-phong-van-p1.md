Chào mọi người, mình là Báu, và đây là bài viết đâu tiên của mình trên Viblo. Nếu có thắc mắc, quan ngại hoặc ý kiến hay ho xịn xò nào đấy về bài viết, đừng ngại ngùng mà hãy comment hoặc inbox trực tiếp để chúng ta cùng thảo luận thêm nhé :stuck_out_tongue_winking_eye:

Đây là bài dịch từ trang Codeburst ([Click để đến bài gốc](https://codeburst.io/10-javascript-concepts-you-need-to-know-for-interviews-136df65ecce)), và từng là bài học vỡ lòng của mình, khi tiếp cận Javascript. :D
# I. Value vs. Reference - tham trị và tham chiếu
Đây link bài học cụ thể: [Here](https://www.educative.io/courses/step-up-your-js-a-comprehensive-guide-to-intermediate-javascript/7nAZrnYW9rG), dành cho những bạn không thích sự lòng vòng :D
Mình sẽ không dịch hoàn toàn theo bài viết chính mà thêm vào 1 số ý mới, theo hiểu biết của mình 1 chút nhé :D.

## 1. Biến:
Là 1 developer, chắc hẳn mọi người đều có định nghĩa về biến của riêng mình, nên mình sẽ không nhắc lại về định nghĩa `Biến là gì?` nữa nhé :D
Vậy còn các kiểu của biến trong Javascript thì như thế nào?
Lần đầu tiếp cận JS, mình hay xem các video youtube, và mình còn nhớ rằng có 2 kiểu chia như sau:

**Kiểu 1:** Tồn tại và không tồn tại (Existent and non-existent) :question:

Ở đây, chúng ta có 2 kiểu (`Typeof`): Object - tồn tại - existent, và undefined - không tồn tại - non-existent.

Với dạng có tồn tại biến, chúng ta gọi tất cả mọi dạng (`typeof`) của biến là 1 bản thể khác của Object (Ví dụ: Number là 1 bản thể rút gọn của Object, mất đi những properties cơ bản nhưng vẫn lưu giữ 1 giá trị cụ thể, giống như Object), và khi không tồn tại biến, thì là undefined. Rất đơn giản và dễ hiểu nhỉ? Nhưng đối với cách này, chúng ta lại không biết được cụ thể có bao nhiêu kiểu của biến :thinking::thinking::thinking:.

**Kiểu 2:** Ở kiểu này, chúng ta sẽ phân tích kỹ lưỡng hơn về các kiểu của biến, và cho chúng ta 2 nhóm: **primitive types** và **objects**.
## 2. Primitive types:
> JavaScript has 5 data types that are copied by value: Boolean, null, undefined, String, and Number. We’ll call these primitive types.
 
 
 `Primitive types` (biến dạng nguyên thuỷ - nhưng dịch ra nghe có vẻ củ chuối nhỉ? Mình sẽ vẫn gọi là `Primitive types` nhé) sẽ chứa `giá trị` khi được gán cho biến đó, chúng ta có 5 kiểu ở phân loại này là: `Boolean`, `null`, `undefined`, `String`, và `Number`. Ví dụ:
 
 ![demo-primitive-types](https://images.viblo.asia/7be38584-3cfd-4a86-9010-4b7909c96f42.png)

Đơn giản, sau khi dùng đoạn code gán biến như trên, chúng ta có: X chứa 'Báu cute', y chứa 10011998. Lúc này, các biến sẽ được lưu cùng với các giá trị tương ứng.

Khi chúng ta gán các biến này cho các biến mới bằng cách sử dụng phép gán `=`, các biến mới `sao chép giá trị` của biến ban đầu:

![copy-variables-by-assigning](https://images.viblo.asia/1f3ecef7-afe2-493e-9073-278ca8fa62cf.png)

Và bởi vì chỉ sao chép giá trị, chúng hoàn toàn riêng biệt, nên việc thay đổi giá trị của `b` không ảnh hưởng tới `y`, thay đổi `x` thì không ảnh hưởng đến `a`:

![change-value-after-assigned](https://images.viblo.asia/534cce8f-2707-4e8c-88e6-22b2718ad1d5.png)


Vậy, `Primitive types` chỉ sao chép giá trị.

## 3. Objects:
Và chúng ta có nhóm thứ 2: `Objects` (được dịch là các đối tượng):
> JavaScript has 3 data types that are copied by having their reference copied: Array, Function, and Object. These are all technically Objects, so we’ll refer to them collectively as Objects.

Về mặt kỹ thuật, cả 3 dạng `Array`, `Function` và `Object` đều được xét là những `Objects`, bởi vì chúng sao chép giá trị bằng `tham chiếu`. Các `Objects` sẽ sao chép theo dạng tham chiếu, có nghĩa là địa chỉ của 1 giá trị nằm trên RAM của chúng ta (Khi có 1 giá trị mới được tạo ra, nó sẽ chiếm 1 vị trí trên RAM của chúng ta, để được lưu giữ lại).

> Objects are copied by copying the reference instead of by copying the value. The object itself is unchanged and static. The only thing copied is the reference, the address, of the object.

"Well, tui vẫn không hiểu `tham chiếu` là gì? Và nó khác gì so với `tham trị` ở trên?"

Cùng nhìn vào ví dụ ngắn gọn của mình nhé. Ở đây chúng ta có 2 biến, là 2 Object A và B như sau:

![two-objects](https://images.viblo.asia/50949836-d05f-4dbb-8c25-bac77cfe95d4.png)

Đây là 2 Object có 2 giá trị khác nhau, nên :forsure: là 2 bạn này khi so sánh sẽ không bằng nhau rồi:

![](https://images.viblo.asia/97866951-ef3f-436f-8b3d-3edcd3799643.png)

Vậy nếu 2 Object có cùng giá trị, nó có bằng nhau không nhỉ?

![](https://images.viblo.asia/b734149b-63e3-4c4d-801a-6ae4f3ec08ab.png)

"WHAT???!!! Cái gì vậy? Giá trị của chúng là như nhau cơ mà?"

À thì, như mình đã nói ở trên, ở trường hợp của Object, chúng sao chép giá trị bằng tham chiếu, vậy nên khi ở trong 1 phép so sánh, chúng sẽ không so sánh giá trị của nhau, mà là vị trí lưu giá trị trên RAM. Cùng thử thêm ví dụ khác nhé:

![](https://images.viblo.asia/9775cdfe-fe9f-402c-a0aa-685568230cff.png)

"Ừ thì 2 ông này gán bằng nhau thì so sánh sẽ bằng nhau thôi"

Ồ không, khi B gán cho A, B tham chiếu tới tham chiếu của A, tức là cả 2 đang tham chiếu đến cùng 1 vị trí trên RAM của chúng ta đấy. Làm sao mình biết ư? Nhìn vào đoạn code này nhé:

![](https://images.viblo.asia/e58bf7d3-27af-44df-a4ad-e69c73335e3a.png)

"Wait??!! What??? Rõ ràng `B.sex` phải là `unknown` chứ?"

KHÔNG, tại sao ư?
Ban đầu ta có `A.sex` = `unknown`, và khi `B = A`, tức là Object B tham chiếu đến cùng 1 vị trí mà A cũng đang tham chiếu đến, thì bất cứ 1 property nào của tham chiếu thay đổi, cả A và B cùng nhận ngay giá trị mới. Cùng `log` giá trị ra xem nhé :D

![](https://images.viblo.asia/bf368b18-894e-4212-a8c8-ea573ad88bd8.png)

Cũng không quá rắc rối nhỉ :D, nhưng để nắm rõ phần giá trị này, mình đã mất nhiều thời gian hơn thời gian các bạn đọc bài này đấy :D Nếu biết thêm ví dụ hay ho khác về `Value vs. Reference`, nếu thích thú mọi người chia sẽ cho mình biết với nhé :D

Okey, vậy là hết phần 1 rồi nè. Nếu cảm thấy mình chưa đúng ở đâu thì comment bên dưới để mình tham khảo nha (vkiss)

Gặp mọi người ở Part.2: Block - Scope and Stuffs :rainbow::rainbow::rainbow: