Thú thực thì đúng là nghe qua thì chả có gì liên quan tới nhau ! anh làm video thì chỉ suốt ngày cắm đầu vào mớ video rùi lên youtube đào sâu nghiên cứu technic mới , xem nhiều video của các nhà làm video khác nhau để tự phong phú hóa bản thân. 
Còn công việc của người lập trình thì suốt ngày số và những dãy số kín kịt màn hình hoa mắt. :D 

Thế nhưng cả hai công việc này đều cần điểm chung đó là có cả tư duy logic và 1 chút sáng tạo để phát kiến.
Trong tư duy logic của những người làm video đặc biệt sử dụng Animation hay làm những hiệu ứng đặc biệt thì đòi hỏi họ còn phải biết After Effect đó là một phần mềm trong vũ trụ phần mềm không lồ của Adobe,
ở trong After Effect ít người hình dung rằng có cả một vũ trụ kỹ năng liên quan tới tư duy logic cũng như lập trình - xin giới thiệu đó là tính năng ..
###  Expression 
![](https://images.viblo.asia/f02d0357-a5e7-47a4-bcc6-1a72a75dce04.jpg)

Expression là công cụ lập trình trong AE. Tuy nhiên việc sử dụng nó lại không quá khó khăn. Bạn không cần thiết phải có kiến thức như một lập trình viên, bạn vẫn có thể sử dụng tốt công cụ này.
Expression là tình năng mà các nhà làm phim chuyên nghiệp sử dụng.

Hãy thử cùng tôi tìm hiểu mối liên quan này nhé :D nhức đầu không kém lập trình viên.


# 1. Expression là gì? 
Expression đơn giản là 1 biểu thức mà nó có thể thay đổi các giá trị tham số của các đối tượng trong AE như position, opacity, scale, …
![](https://images.viblo.asia/7c09caa3-04c4-41ae-9519-17e6cc0e7271.png)https://images.viblo.asia/7c09caa3-04c4-41ae-9519-17e6cc0e7271.png


### Lập trình một đối tượng cụ thể nào đó theo ý muốn.
![](https://images.viblo.asia/9921531b-b1fc-4c17-84e8-6b98e219fdaf.gif)

# 2. Cách sử dụng.
 Trong AE, khi muốn đặt key một tham số bất kỳ thì bạn chỉ việc click vào biểu tượng cái đồng hồ trước tham số. Và khi muốn sử dụng expression trên tham số đó bạn chỉ việc giữ phím Alt và nhấn vào biểu tượng cái đồng hồ thì AE sẽ hiện ra 1 hộp thoại để bạn nhập biểu thức vào. Nếu không muốn sử dụng Expression nữa thì chỉ việc xóa biểu thức đi, hoặc nhấn vào dấu = để không áp dụng biểu thức cho đối tượng.
![](https://images.viblo.asia/a92ba974-af9c-4aba-a0aa-9bc4b47b4812.png)https://images.viblo.asia/a92ba974-af9c-4aba-a0aa-9bc4b47b4812.png

# 3. Các thuộc tính 
Bất kỳ thuộc tính nào của một object trong AE mà có biểu tượng chiếc đồng hồ phía trước thì các bạn có thể áp dụng Expression cho chúng. Các thuộc tính cơ bản của một object gồm có: 
### Position:
 Đây là thuộc tính xác định vị trí của đối tượng, các bạn có thể di chuyển object đến 1 vị trí bất kỳ, vị trí được xác định ở 2 tọa độ x và y, nếu đặt thêm 3D thì có thêm đọa độ z. 
### Scale 
Các bạn có thể phóng lớn nhỏ đối tượng, cũng tương tự như position, biến đổi object theo các trục x, y và z. Với Scale thì các bạn cần cẩn trọng vì thông thường nó sẽ scale theo 2 trọc không đều nhau, sẽ dẫn đến biến dạng đối tượng không đồng đều, đây là điều tối kị trong thiết kế. 
### Opacity 
Thuộc tính điều khiển độ trong suốt của đối tượng, thuộc tính này chỉ có 1 tham số, nên rất dễ sử dụng. 
### Rotation 
Thuộc tính để xoay objects, cũng giống position, rotation cũng có 3 tham số của 3 trục x,y và z. Trên đây là 4 thuộc tính cơ bản của 1 đối tượng trong AE mà các bạn có thể áp dụng Expression cho chúng. Ngoài ra các bạn còn có thể áp dụng cho rất nhiều thuộc tính khác trong effect, layer, comp, …

![](https://images.viblo.asia/57cee65e-f43f-4398-bc9c-90daedcb021d.png)https://images.viblo.asia/57cee65e-f43f-4398-bc9c-90daedcb021d.png
# 4. Giá trị 
Trong phần này, mình chỉ chú ý đến các bạn 4 phần, một là valu, hai là index, ba là time và bốn là thisComp.
![](https://images.viblo.asia/e9b3b934-fa95-48a4-b0ce-92b38bc4f991.jpg)https://images.viblo.asia/e9b3b934-fa95-48a4-b0ce-92b38bc4f991.jpg
###  Value
 Đây là giá trị hiện tại của thuộc tính trên 1 đối tượng.

> ` Ví dụ: để lấy giá trị của vị trí trục x của object, bạn phải gõ value[0], tương tự trục y là value[1], trục z là value[2].`

 Riêng các thuộc tính có nhiều tham số, các bạn phải nhớ sử dụng value[0], value[1], value[2] để giữ lại các giá trị gốc của các thuộc tính.
###  Index 
Là số thứ tự layer của một đối tượng trong một composition. Mỗi đối tượng trong một composition có 1 số thứ tự nhất định, và nó được gọi là index, nó chính là chỉ số ở cột có chữ # trong panel timeline. Nó dùng để làm gì thì tí nữa trong ví dụ mình sẽ nói thêm. 
### Time
 Đây là tham số thời gian trên timeline, cứ 1 giây trên timeline thì tham số time sẽ bằng 1, ví dụ tại thời điểm 10 giây trong composition thì time=10. 

> `Một ví dụ để thấy rõ nhất ứng dụng của các giá trị này là tạo chữ phong cách 3D trong AE. Các bạn có thể xem trong file ví dụ ở bên trên, mình hay sử dụng cách này để giải chữ 3D trog AE, mình giữ nguyên vị trí trục x và y, thay đổi vị trí trục z theo giá trị index để tạo khoảng cách giữ các layer, từ đó bạn sẽ cảm thấy chữ nó dầy lên.`

### ThisComp
 Bạn có thể lấy các giá trị của một composition như chiều rộng, chiều cao, độ dài thời gian, giá trị tham số của 1 layer nào đó, ….
> * thisComp.height 
> * thisComp.width 
> * thisComp.duration 
> * thisComp.layer(“tên layer”).effect(“tên effect”)(“tên tham số”) 
> * thisComp.layer(“tên layer”).transform.position
 
Ngoài ra, bạn có thể sử dụng các giá trị của một objects khác composition bằng biểu thức 
> comp(“tên composition”).layer(“tên layer”).effect(“tên effect”)(“tên tham số”)



# 5. Biểu thức
 AE Expression cũng sử dụng các biểu thức căn bản giống như nhiều chương trình khác như cộng (+), trừ (-), nhân (*), chia (/). Và các biểu thước so sánh như lớn hơn (>), nhỏ hơn (<), lớn hơn hoặc bằng (>=), nhỏ hơn hoặc bằng (<=), bằng (==), khác (!=), và (&&), hoặc (||)  

![](https://images.viblo.asia/bed45f1c-cc0f-4a44-a6e8-1b03682e0249.jpg)https://images.viblo.asia/bed45f1c-cc0f-4a44-a6e8-1b03682e0249.jpg
#  6. Hàm
Trong AE thì có rất nhiều hàm, ở đây mình chỉ giới thiệu cho các bạn 1 số hàm thông dụng, các bạn có thể tìm hiều thêm những hàm khác để sử dụng cho đa dạng và phù hợp với công việc.

![](https://images.viblo.asia/0b3768c2-94b0-4ada-a24e-ee8c58c4d823.jpg)https://images.viblo.asia/0b3768c2-94b0-4ada-a24e-ee8c58c4d823.jpg
 


### Wiggle
 Đây là một hàm rất thông dụng của Expression, bạn sẽ phải sử dụng rất nhiều lần đến nó khi tham gia vào motion. Nó dùng để tạo ra 1 giá trị bất kỳ tại một thời điểm nào đó. Biểu thức của nó bao gồm 
> * wiggle(freq, amp, octaves, amp_mult, t) 
> * freq: tần số 
> * amp : biên độ 
> * actaves : quãng, mặc định là 1 
> * amp_mult : số nhân biên độ, mặc định là 0.5
> *  t : thời gian bắt đầu, mặc định là tại thời điểm hiện tại.

  Nhưng thông thường khi sử dụng wiggle(), người ta chỉ chú ý đến 2 tham số là tần số và biên độ. Tần số càng cao thì dao động càng nhanh, biên độ càng cao thì dao động càng lớn. 

Ví dụ: để một object rung trong trong AE, ta gõ vào expression của position dòng wiggle(2,5)

### Random
 Đây cũng là một hàm dùng để tạo ra 1 số bất kỳ, nhưng người ta hay sử dụng wiggle hơn vì nó có thể tùy chỉnh được tần số và biên độ của sự thay đổi 

> random(t, value 1, value 2)  

### Math.sin 
Math.cos() Hồi xưa học toán chắc ai cũng ngán sin cos hết rồi, mà giờ có hỏi mình sin cos là gì mình cũng không biết đâu, do đó các bạn cũng chẳng cần biết sin cos là gì, các bạn chỉ cần nhớ 
> * math.sin(value) sẽ cho 1 giá trị biến thiên từ -1 đến 1 và bắt đầu từ 0 
> * math.cos(value) sẽ cho 1 giá trị biến thiên từ -1 đến 1 và bắt đầu từ 1  

 Ví dụ: để tạo dao động quả lắc, bạn chỉ cần gõ vào expression của rotation là math.sin(time)*50 với 50 là góc của quả lắc. Hoặc math.cos(time)*50




### If/else
 Đây là một hàm đặc biệt mà bất cứ một coder nào cũng phải biết. If/else là một biểu thức điều kiện giống như tên gọi của nó.


> If(biểu thức điều kiện) 
> 
> { kết quả 1} 
> 
> Esle 
> 
> { kết quả 2} 
> 
Ví dụ: để một chữ nghiêng -45 độ ở thời gian trước 2 giây và sau giây thứ 2 thì nghiêng 45 độ ta gõ vào expression của rotation dòng 
> > if(time>2)
> 
> >  {45}
> 
> >  else 
> 
> > {-45}
> 
![](https://images.viblo.asia/a014579b-3a9f-4940-9343-81ca4c0c0bc9.png)

![](https://images.viblo.asia/d68b7d15-1ab5-4475-ba23-7b003062661a.jpg)


Một số nguồn để tham khảo.

https://www.schoolofmotion.com/tutorials/amazing-expressions-in-after-effects
https://helpx.adobe.com/after-effects/using/expression-basics.html
https://helpx.adobe.com/after-effects/using/expression-language-reference.html