# Giới thiệu
![](https://images.viblo.asia/8fa35e50-e31e-43ea-94e3-6134e717c3b4.jpg)

Nếu bạn tạo ra bản copy của 1 bản copy của 1 bản copy, chất lượng sẽ giảm dần qua từng lần copy. Vấn đề này được gọi là "***generation loss***" (*mất chất qua thế hệ*). Điều này không khó để hiểu tại sao nó xảy ra với máy photocopy. Việc scan và in không phải là công đoạn hoàn hảo, nó dựa vào các cảm biến tín hiệu, giấy và mực, và kết quả của việc nhiễu sẽ càng ngày tăng lên.

Các ảnh số về mặt lý thuyết không có vấn đề này: 1 file có thể được copy lần này sang lần khác, và nó vẫn là những bit-bit giống như bản gốc.

Tuy nhiên, các định dạng ảnh lossy (ảnh bị mất chất) giống như **JPEG** có thể hoạt động giống như máy photocopy. Nếu bạn đơn giản chỉ copy 1 file **JPEG**, không có gì thay đổi, nhưng nếu bạn mở 1 file **JPEG** trong một trình sửa ảnh và sau đó save nó, bạn sẽ có thể nhận được 1 file **JPEG** khác với ảnh ban đầu (mặc dù mắt thường có thể không nhận ra). Điều tương tự xảy ra mỗi khi bạn upload ảnh lên Facebook hoặc Twitter: ảnh đã được encoded lại 1 cách tự động (trong trường hợp của 2 mạng xã hội này, với cấu hình chất lượng ảnh thấp để tiết kiệm không gian lưu trữ cũng như băng thông). Một vài thông tin bị mất đi trong quá trình này, ảnh càng ngày được nén. Nếu bạn làm việc này đủ nhiều, ảnh cuối cùng có thể giảm chất lượng đáng kể.

Trong bài viết này chúng ta sẽ đi sâu vào "*generation loss*" của **JPEG** và những định dạng ảnh lossy khác. Tôi sẽ chỉ cho bạn điều gì gây ra việc này và cách để tránh.
# Điều gì xảy ra nếu bạn save file JPEG nhiều lần
Mỗi lần bạn open và save lại 1 ảnh **JPEG**, chính là 1 lần ảnh đó được mã hóa lại (encode). Sau nhiều lần bị encode, điều xảy ra là

{@youtube: https://youtu.be/jjhomJ04S18}

<br>

![](https://images.viblo.asia/468a6f81-a4d3-4297-a250-a2781d24e7e0.PNG)

**JPEG** có 1 setting về chất lượng cho phép bạn chọn lựa giữa tỉ nén và chất lượng hiển thị. Cấu hình chất lượng thấp sẽ cho bạn 1 file dung lượng nhỏ, nhưng sẽ giảm luôn thông tin chứa trong ảnh (chất lượng ảnh). Cấu hình chất lượng ảnh cao sẽ cho ra 1 file có dung lượng lớn hơn, nhưng phần lớn thông tin của ảnh vẫn được lưu giữ để cho ra file giống hơn với bản gốc.

VÌ vậy nếu bạn chỉ muốn lưu file **JPEG** ở 1 cấu hình chất lượng vừa đủ, thì có vấn đề gì ở đây không?

Thật buồn, là có. Rõ ràng, thông tin đã bị mất đi thì không có phép thuật nào có thể phục hồi lại được. Vì vậy nếu bạn có 1 ảnh **JPEG** được lưu với chất lượng 70, sau đó lưu lại nó với chất lượng 90, dĩ nhiên là không làm cho ảnh nhìn có vẻ tốt hơn. Và nó có thể càng tệ hơn. Mỗi lần file **JPEG** được encode thì sẽ là 1 lần thông tin bị mất, dù cho nó được lưu với chất lượng cao hơn so với bản **JPEG** gốc.

# Tại sao điều này lại xảy ra
Để hiểu tại sao **JPEG** lại hoạt động theo cách này, chúng ta phải đi sâu hơn vào cách **JPEG** thực sự hoạt động. **JPEG** format sử dụng một vài cơ chế để giảm dung lượng file của 1 ảnh.

Đầu tiên, **JPEG** sử dụng màu chuyển hệ. Ảnh số được đặc trừng bằng các pixel bao gồm 3 giá trị màu riêng biệt **RGB** (đỏ, xanh là cây, xanh trời). Đây là cách máy tính hiển thị hình ảnh: mỗi một kênh màu có 256 level khác nhau của cường đồ, cho ra 16.7 triệu màu (256*256*256) nếu bạn phối 3 màu này với tất cả khả năng.

Nếu nén ảnh là mục tiêu lớn, thì **RGB** không phải là lựa chọn tối ưu. Thay vào đó, **JPEG** sử dụng hệ màu **YCbCr**. Kênh màu Y được gọi là "*luma*" (cường độ của ánh sáng, thành phần đen trắng), 2 kênh còn lại là Cb và Cr, được gọi là "*chroma*" (là thành phần màu).

Bên cạnh thể hiện được thông tin của pixel, việc chuyển vị màu có 1 ưu điểm khác: mắt người nhạy cảm hơn với màu "*luma*" so với "*chroma*", vì vậy trong việc nén lossy, bạn có thể để mất đi 1 số thông tin ở kênh màu chroma nhiều hơn ở kênh màu luma.

Việc chuyển vị màu sẽ làm mất một số thông tin màu, vì quá trình làm tròn. Nếu bạn chuyển 1 ảnh bao gồm tất cả 16.7 triệu màu từ **RGB** sang **YCbCr** và ngược lại, sau đó tính số lượng màu khác nhau, bạn sẽ chỉ nhận được khoảng 4 triệu màu khác nhau. Hầu hết màu bị mất là Red và Blue.

![](https://images.viblo.asia/a44854d1-6b25-4ca2-acaf-b576e263ca37.png)

# Chroma subsampling (Giảm màu phụ)
Chuyển sang hệ màu **YCbCr** không gây ra mất thông tin hay **"generation loss".** JPEG trải qua một giai đoạn gọi là "**chroma subsampling**", thường liên quan đến 1 vài kí hiệu khó hiểu như là 4:2:0 (việc này là tùy chọn, nhưng nó thường được mặc định). Điều này có nghĩa là chỉ chanel Y được mã hóa ở mức cao nhất, còn 2 channel màu Cb và Cr, độ phân giải được giảm 1 nửa theo chiều ngang và dọc. Theo cách này, thay vì 2 kênh màu Cb và Cr chiếm 2/3 lượng thông tin, thì nó đã được giảm đi còn lại 1/3.

Chroma subsamplig thường gây ra việc giảm chất lượng ("**generation loss**") và có thể dẫn đến 1 thứ gọi là "**color bleeding**" (chảy máu màu) hay "**color drifting**" (trôi màu). Vì vậy kênh màu chroma trở nên mờ hơn sau mỗi lần subsampling. Ví dụ, điều này xảy ra nếu bạn chụp 1 ảnh và lưu nó vơi **JPEG** quality 100 với chroma subsampling 4:2:0

![](https://images.viblo.asia/be249bf1-8b86-4052-8150-122149d2b293.PNG)

Đây là 1 trong những bước có thể gây ra giảm chất lượng ("**generation loss**"). Nhưng chúng ta vẫn chưa đến chỗ gây ra loss thực sự của **JPEG** ...

# Quantization (lượng tử hóa)
Chi tiết về cách nén mà **JPEG** thực sự hoạt động là chuyển vị Cosine rời rạc (**Discrete Cosine Transform** -  [DCT](https://en.wikipedia.org/wiki/JPEG#Discrete_cosine_transform)) ở các block 8x8. Nhưng việc giải thích cho "**generation loss**" có thể được hiểu mà không đi vào quá sâu. Bản chất của việc nén **JPEG** là **quantization**, 1 cơ chế khá đơn giản mà hiểu quả.

Nó hoạt động như thế nào? Giả sử bạn muốn nén 1 dãy các chữ số, không quan trọng những số này có đại diện cho các giá trị pixel, DCT coefficients hay cái gì khác. Số lượng khoảng trắng bạn cần để mã hóa những số này phụ thuộc vào độ lớn của các số đó: với những số nhỏ, thì cần ít bit hơn.

Vậy làm cách nào bạn có thể làm cho những số này nhỏ hơn. Đáp án khá đơn giản: chỉ cần chi nó cho 1 số nào đó (số này được gọi là **hằng số quantization**) khi mã hóa, sau đó nhân chúng lại bằng chính hằng số đó khi giải mã. Hằng số quantization càng lớn, các giá trị sau khi mã hóa sẽ càng nhỏ, nhưng đồng thời càng dễ mất thông tin ban đầu (more lossy), bởi vì chúng ta làm tròn các số về integer.

Ví dụ, giả sử bạn muốn mã hóa dãy sau 

![](https://images.viblo.asia/e56d3952-ae2f-42a6-8b8b-109f843a8feb.PNG) 
Nếu bạn sử dụng hằng số quantization là 50, bạn sẽ giảm giá trị dãy số trên và có thể lấy dãy số gốc một cách chính xác

![](https://images.viblo.asia/d4accdf9-0c17-45da-b680-efda8e9e8b8f.PNG)
Nhưng thật không may là chúng ta không thể may mắn như trên và thực tế đa số chúng ta sẽ có sai số, và kết quả chỉ có thể "gần đúng". Ví dụ, nếu hằng số quantization là 100, chúng ta sẽ có dãy số nhỏ hơn, nhưng sẽ gây ra mất thông tin:

![](https://images.viblo.asia/a1644d59-5b34-4ff1-963c-8efbc2853b30.PNG)

Như bạn thấy thì, thì dãy số ban đầu không thể trở về đẹp như ban đầu được nữa. Đó là 1 loại ảnh hưởng của quantization, dẫn đến "**color banding**" (chia dải màu). Hằng số quantization càng lớn, chất lượng ảnh càng thấp. Chât lượng 100 tương ứng với hệ số quantization là 1, nói cách khác là không quantization gì cả.

Để thêm chi tiết về việc nén, giả sử JPEG quality là 70 tương ứng với hằng số quantization 60, JPEG quality 80 tương ứng với hằng số quantization là 35. Rõ ràng, chất lượng ảnh 80 sẽ gần bản gốc hơn chất lượng ảnh 70.

![](https://images.viblo.asia/2d290474-1eb1-43cf-80d1-e21bf072e4a1.PNG)


Trong trường hợp này, chất lượng 80 có maximum error là 15 (và thông thường nó không thể có lỗi lớn hơn 1 nửa hằng số quantization là 35/2 = 17), trong khi chất lượng 70 thì dãy số có maximum error là 30.
Nhưng điều gì xảy ra nếu lấy ảnh chất lượng 70 và mã hóa lại nó với chất lượng 80? Bây giờ thì bản "gốc" đã không còn là dãy số ban đầu nữa, và chất lượng 70 khi giải mã sẽ là:

![](https://images.viblo.asia/f902d7dd-5a19-4428-a505-6d8ae6bce103.PNG)

Nếu chúng ta may mắn, như giá trị thứ 2 trong dãy, sai số giá trị đầu tiên mã hóa (+20) đã 1 phần được bù đắp bởi sai số của giá trị mã hóa thứ 2 (-15), kết quả có vẻ gần với dãy gốc hơn. Nhưng đó chỉ là may mắn. Sai số lỗi vẫn tiếp tục tăng. Ở ví dụ này, sai số lỗi lớn nhất là 45, lớn hơn max error từ cả 2 quá trình nén bằng quantization trước đó.

Điều này giải thích tại sao khi save lại ảnh **JPEG** lần thứ 2 ở chất lượng cao hơn ban đầu là 1 ý tưởng tồi: bạn có thể nhận được 1 file dung lượng lớn hơn, mà dữ liệu bị mất nhiều hơn so với nếu bạn cứ save nó ở cùng chất lượng như ban đầu.

# Làm sao để tránh "generation loss"
Có 2 cách
- Đừng sử dụng format ảnh là lossy.
  Khi edit ảnh, tốt nhất bạn nên lưu nó dưới dạng các format mà không mất chất lượng ảnh như PNG, TIFF, FLIF hoặc là format gốc của các trình chỉnh sửa ảnh như PSD hoặc XCF. Chỉ khi muốn xuất ra ảnh có dung lượng nhỏ thì bạn mới save bằng file JPEG.
- Giữ ảnh gốc (giữ cho generation càng gần 1 càng tốt)