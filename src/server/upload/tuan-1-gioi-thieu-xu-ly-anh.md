Mình đang học xử lý ảnh ở trường, trong lúc vừa học vừa tìm hiểu, vừa viết bài để hiểu rõ hơn và cũng để chia sẻ kiến thức với những người bắt đầu tìm hiểu về xử lý ảnh. Nếu có gì thắc mắc hoặc có gì sai sót, mọi người có thể comment ở dưới, mình sẽ hết sức trả lời.:grinning:
# Ảnh số và điểm ảnh 
Đầu tiên chúng ta sẽ tìm  hiểu về điểm ảnh
- Điểm ảnh ( pixel) có vị trí (x,y) và có độ xám I (x,y)
- Ví dụ với ảnh trắng đen ta sẽ có ví dụ sau:
![](https://images.viblo.asia/a7c875f0-7252-446a-9821-a3311f07a795.PNG)
- Với ảnh màu ảnh ta hay nhìn thì mỗi điểm ảnh sẽ có 3 giá trị tương ứng với  độ sáng của các màu đỏ, xanh lục, xanh dương (RGB)

![](https://images.viblo.asia/bf5c7fae-7c20-46f3-b602-211e20f79aac.PNG)

Các khái niệm:
* Ảnh số: " một hình ảnh có thể được định nghĩa là hàm hai chiều, f (x, y), trong đó x và y là tọa độ không gian (mặt phẳng) và biên độ của f tại bất kỳ cặp tọa độ (x, y) nào được gọi là cường độ hoặc mức độ màu xám của hình ảnh tại điểm đó. Khi x, y và các giá trị cường độ của f đều là các đại lượng hữu hạn, rời rạc, chúng ta gọi hình ảnh là hình ảnh kỹ thuật số". 

 * Hay có thể hiếu 1 cách đơn giản rằng "Ảnh số là số hóa làm cho một hình ảnh kỹ thuật số trở thành một xấp xỉ của một cảnh thực".
![](https://images.viblo.asia/a5123082-3295-4c2f-b313-0aac8966a815.PNG)
* Điểm ảnh: "hình ảnh kỹ thuật số chứa một số lượng hữu hạn các hàng và cột của các phần tử. Mỗi phần tử được gọi là pixel "
* Độ phân giải: "độ phân giải là thước đo của chi tiết rõ ràng nhỏ nhất trong ảnh, được tính là số điểm (pixel)  trên một đơn vị khoảng cách ( dpi)"
![](https://images.viblo.asia/277f2cbe-be8e-4c6b-a2bb-065e2c2364b7.PNG)
Như ảnh trên chúng ta thấy rằng tuy cùng kích thước nhưng độ phân giải khác nhau, và độ phân giải càng thấp thì càng mờ. Như ảnh 1 sẽ được hiểu là chiểu rộng có 175 điểm ảnh và chiều cao có 256 điểm ảnh. 
> chú ý: **Kích thước != độ phân giải**

Các định dạng phổ biển của ảnh số bao gồm:
* 1 giá trị trên điểm/pixel ( B&W hay Grayscale)
* 3 giá trị trên điểm/pixel (Red, Green, Blue) 
*  4 giá trị trị trên điểm/pixel ( Red, Green, Blue, + “Alpha” or Opacity)
![](https://images.viblo.asia/6e7fe2a1-b496-41b6-873e-ed161dba2b6c.PNG)

Chúng ta sẽ bắt đầu với grayscale images, mở rộng với ảnh màu sau.
# Thu nhận ảnh
Các bước thu nhận ảnh được tổng quát như hình sau:
![](https://images.viblo.asia/2b18fdec-3d9d-4c4e-ab6c-3cef55294336.PNG)

Ngoài ra, ảnh có thẻ được tạo ra từ việc thu nhận và biểu diễn lại các sóng khác  (ngoài ánh sáng). Ví dụ: 
* Siêu âm (ultrasound)
* Tia X
* Tia gamma
* Sonar
* Sóng radio
# Một số ví dụ về ảnh số
Trong cuộ sống, chúng ta sẽ thấy ảnh số xuất hiện ở quanh ta
![](https://images.viblo.asia/21d02ad6-6c32-478c-9148-5bd287ee9baf.PNG)

![](https://images.viblo.asia/8a62cdde-b027-45a6-b77f-9eb7bbc6f54b.PNG)

![](https://images.viblo.asia/cfff424d-6ae3-4aad-b9d9-d4ad553b6893.PNG)

![](https://images.viblo.asia/467640da-1d5c-4d8d-847d-70d5afa1d66b.PNG)

# Xử lý ảnh là gì ?
* Là các thuật toán thay đổi hình ảnh đầu vào để tạo hình ảnh mới.
* Đầu vào là ảnh, đầu ra là ảnh
![](https://images.viblo.asia/b0119c7e-8afe-4bfa-93b6-b70ea1e006e0.PNG)

# Các ví dụ về xử lý ảnh
* Giảm nhiễu

 ![](https://images.viblo.asia/de553816-43c8-43b1-9117-4d2c92ae8b6a.PNG)
 
![](https://images.viblo.asia/6aedf97a-59bc-437d-93d0-172a23711119.PNG)

* Điều chỉnh độ tương phản

![](https://images.viblo.asia/f16bf04e-959c-4ab8-906d-2550ae066d4b.PNG)

* Tìm cạnh 

![](https://images.viblo.asia/d2820cb5-6289-492a-a57c-89a37d860715.PNG)

* Nén ảnh

![](https://images.viblo.asia/b7d9b6c8-e3e6-479f-b96e-f37c5f8239b0.PNG)

* Phân vùng
![](https://images.viblo.asia/f313cb7e-a613-4c13-984c-cfc833f18eb8.PNG)

* Khôi phục ảnh

![](https://images.viblo.asia/e96b9fcc-a176-4370-8827-b4b817335631.PNG)
Cũng như có nhiều ứng dụng trong các ngành khác như: điện ảnh, y tế, ...
# Xử lý ảnh không phải là thị giác máy.
![](https://images.viblo.asia/06348ac1-91e7-4ea6-9015-0536f9582883.PNG)
Các kĩ thuật điển của xử lý ảnh và thị giác máy cũng khác nhau.

![](https://images.viblo.asia/65403723-445e-43ba-a6d5-e7259bb32fc5.PNG)
# Xử lý ảnh và các ngành liên quan 
![](https://images.viblo.asia/2d0500fb-733b-44ec-9689-3ee52dcce75e.PNG)
# Tổng kết
Qua bài này, chúng ta có cái nhìn tổng quát về ảnh số, nhiểu loại ảnh số : chụp dùng cảm ứng ánh, hoặc các loại sóng hoạc hàm tuỳ chỉnh.  Các ứng dụng về xử lý ảnh, phân biệt xử lý ảnh và thị giác máy.
# Tham khảo
1. [https://web.cs.wpi.edu/~emmanuel/courses/cs545/S14/slides/lecture01.pdf](https://web.cs.wpi.edu/~emmanuel/courses/cs545/S14/slides/lecture01.pdf)
2. R. C. Gonzalez, R. E. Woods, “Digital Image Processing,” 4th edition, Pearson, 2018
3. https://github.com/chupibk/INT3404_1