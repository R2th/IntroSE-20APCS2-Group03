# Giới thiệu 
   Ở bài viết này mình xin giới  thiệu  về một số loại mã hóa cổ  điển như: 
      
   - Mã hóa dịch vòng 
   
   - Mã hóa thay thế
   - Mã hóa Affine

trước hết chúng ta cần biết xem mã hóa là gì, mã hóa là quá trình dùng để biến thông tin từ dạng này sang dạng khác và ngăn những người không phận sự tiếp cận vào thông tin đó. Bản thân việc mã hóa không ngăn chặn việc thông tin bị đánh cắp, có điều thông tin đó lấy về cũng không xài được, không đọc được hay hiểu được vì đã được làm biến dạng đi rồi.
Mã hóa sẽ mang lại tính an toàn cao hơn cho thông tin, đặc biệt là trong thời đại Internet ngày nay, khi mà thông tin phải đi qua nhiều trạm trung chuyển trước khi đến được đích. Nếu không có mã hóa, khả năng thông tin của bạn sẽ bị ai đó xem trộm trong quá trình truyền tải rồi lợi dụng để làm việc xấu.

Đối với những người mới tìm hiểu về mã hóa thì tìm hiểu về mã hóa cổ điển có lẽ là cách tiếp cận dễ dàng nhất. Mã hoá cổ điển là cách đơn giản nhất, tồn lại lâu nhất trên thế giới và không cần khóa bảo mật, chỉ cần người gửi và người nhận cùng biết về thuật toán này là được.

Sau đây mình sẽ đi vào một số loại mã hóa cổ điển cụ thể :)

# Mã Hóa dịch vòng
Mã hóa dịch vòng là một bộ năm (P, C, K, E, D) thỏa mãn:

![](https://images.viblo.asia/0fab8f12-73fe-4d49-99d8-0dc45083f81c.PNG)

Ví dụ : giải mã và mã hóa đoạn text: p = " abcde" với k = 5 ( p ở đây là các kí tự thường trong bảng chữ cái tiếng anh )

   Quy ước: Số thứ tự của các chữ cái trong bảng chữ
cái tiếng anh như sau: a = 0, b = 1, …, z= 25 nên t có : 
- n = 26 
- p = "abcde" 
- k = 5 
Xách định bản mã c = ?

- Bước 1 : Đổi các ký tự trong p sang thứ tự của chúng trong bảng
chữ cái.  
a = 0 , b=1, c= 2, d= 3, e = 4 

- Bước 2 : Tiến hành mã hóa bản rõ p với khóa k = 5

     ![](https://images.viblo.asia/6804e261-1293-4579-9837-e1c04f924ee3.PNG)


- Bước 3: xác định bản mã c

![](https://images.viblo.asia/2d5ac582-5821-4fdd-96f7-6ebcb499f701.PNG)

=> c = "fghij"

Bài toán ngược:
- cho bản mã c = "fghij"
- k =5 
- n =26 
- xác đinh bản rõ p 

Quy ước: Số thứ tự của các chữ cái trong bảng chữ
cái tiếng anh như sau: a = 0, b = 1, …, z= 25

Bước 1: đổi các ký tự trong c sang thứ tự của chúng trong bảng
chữ cái.
    ![](https://images.viblo.asia/09129a6c-96f1-469d-a27e-6b130dedd020.PNG)
    
Bước 2: tiến hành giải mã bản mã c với khóa k = 5

   ![](https://images.viblo.asia/61921e4e-3da0-4d09-8a72-96f9d475c6b0.PNG)


Bước 3: xác định bản rõ p
   ![](https://images.viblo.asia/e634c40e-9122-4526-81dc-f89e4097f331.PNG)
   
   => p = "abcde"
   
   # Mã hóa thay thế 

Mã hóa thay thế là một bộ năm thành phần (P, C, K, E, D) thỏa mãn:
![](https://images.viblo.asia/a207bfb5-7028-49d9-947c-e64bf66f43d5.PNG)


Ví dụ : giải mã  với 
- c = "yudhk"
- pi được mô tả ở bảng dưới 

 ![](https://images.viblo.asia/b281629d-2d7c-4704-a4cf-2ef6407488c1.PNG)
 
 - xác định c = ?

Ta có c: 
![](https://images.viblo.asia/7073069e-4b75-45de-9d96-0884a84bda4b.PNG)

=> c = “yudhk”

Tương tự như trên đối với bài toán ngược cho: 
  - c = “yudhk” 
  -  π -1 được mô tả như ở bảng bên dưới
  
  ![](https://images.viblo.asia/deee7505-3db4-47e1-92c5-c949c1db47ac.PNG)

Ta xác định được  p = “abcde”

# Mã hóa Affine 

Mã hóa Affine là một bộ năm (P, C, K, E, D) thỏa mãn:

![](https://images.viblo.asia/1e16e486-7b26-4602-8ce1-7751fcdc8e98.PNG)

Ví dụ : mã hóa 
- p = "abcde"
- k = (a, b) =  (5, 3); n =26 
- Tính c = ?

Ta có c :


| p | a | b|c | d | e |
| -------- | -------- | -------- | -------|----- | -------- | ----------- |
| x    | 0   |1     | 2 | 3| 4|
|(5x +3 ) mod 26| 3| 8|13|18|23
|c|d|i|n|s|x|


=> c= "dinsx"

Tương tự với bài toán ngược, cho 
- "dinsx" 
- k = (a, b) = (5, 3); n= 26; tính được a mũ -1 = 21 từ công thức :

![](https://images.viblo.asia/494f839d-6b5e-4cff-8b51-002172cb41ae.PNG)
- tính p = ? 

ta có p : 

| c | d | i|n | s | x |
| -------- | -------- | -------- | -------|----- | -------- | ----------- |
| y    | 3   |8     | 13| 18|23|
|(21(y-3))mod 26| 0| 1|2|3|4
|p|a|b|c|d|e|

 =>  p = "abcde"

# Lời kết 

Như vậy mình đã giới thiệu với các bạn 3 thuật toán mã hóa cổ điển dành cho những bạn mới bắt đầu tìm hiểu về mã hóa. Bài viết còn nhiều thiếu sót rất mong được sự đóng góp từ các bạn, mọi thắc mắc các bạn có thể comment bên dưới để mình và mọi người cùng giải đáp. Cảm ơn các bạn đang quan tâm và đón đọc.