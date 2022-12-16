*Như các bạn đã biết ( nếu chưa biết thì mình nói cho mà biết ) đối với những ai sử dụng các hệ điều hành linux thì không thể thiếu “chương trình giao diện cửa sổ dòng lệnh” (command line interface), trong ubuntu thì có một chương trình có tên là “terminal”.* 
![](https://images.viblo.asia/7a8908ab-ff7d-47f6-8ab9-dd8c3d94334d.png)

*Việc tại sao, vì sao hay why sử dụng “chương trình giao diện cửa sổ dòng lệnh” là điều không thể thiếu đối với hệ điều hành linux, thì mình xin được nhường lại cho các bạn tự tìm hiểu nhé.
Còn vấn đề chính của mình trong bài viết này là mình sẽ hướng dẫn các bạn “Tùy biến messages khi bạn mở terminal trên ubuntu sao cho đẹp và độc”.*
# VẤN ĐỀ CHÍNH
Tại sao phải tùy biến messages chào mừng khi mở terminal làm gì? tôi không hiểu?
Câu trả lời là: các bạn có thể nhìn lên hình bên trên, đó là một hình mình đã mở terminal lên khi chưa có tùy biến gì hết ( dòng chữ “Đây là terminal nè các bạn” là mình viết vào sau khi mở đó, chứ mặc lúc mở lên nó ko có đâu nha ). Sau khi qua màn ảo thuật hô biến “úm bà là xì bùa” thì mình có thể làm cho nó xịn sò như thế này đây:
![](https://images.viblo.asia/a57df286-516d-4254-8ac7-58cd97cc2386.png)
Anh/em thấy sao nào? Nếu thích thì đọc tiếp bài để tôi hướng dẫn cách làm nhé! :D
## Cách làm thủ công ( tự thân vận động , không dựa dẫm tools )
### Các bước làm
1. Đầu tiên, mở terminal và mở tệp ./bashrc bằng bất kỳ trình soạn thảo nào bạn chọn: vim, gedit, sublime text, nano, pico, ...v…v... (Ở đây minh sẽ sử dụng vim). 
```
vim ~/.bashrc
```
Tệp sẽ được mở bằng vim như trong hình bên dưới:
![](https://images.viblo.asia/813ae0dd-28b8-4f4c-b94c-e5a94fb703df.png)
2. Bây giờ, tôi sẽ thử hiển thị lời chào đơn giản, bằng việc thêm vào cuối file .bashrc đã mở:
```
echo “Xin chào, Nguyễn Mạnh”
```
Hãy đóng terminal của bạn và bật lại, các bạn sẽ thấy nó như thế này đây:
![](https://images.viblo.asia/8e04d692-3a19-4daa-8769-f166e49d0d6f.png)
> BẠN ĐÃ LÀM ĐƯỢC :)
## Sử dụng tools
Có một cách thú vị khác để làm cho nó thật là bá cháy thì bạn  có thể dùng tools cài đặt trên mạng, kết hợp với `~/.bashrc`.
> fortune và cowsay
> fortune: in ra một câu tục ngữ ngãu nhiên
> cowsay: Hiển thị một con bò biết nói :v: 
### Các bước làm
1. Trên ubuntu hoặc linux mint, hãy cài đặt coway,
```
sudo apt-get install fortune cowsay
```
2. Bây giờ, hãy mở terminal và mở tệp ./bashrc bằng bất kỳ trình soạn thảo nào bạn chọn. (Ở đây, tôi tiếp tục sử dụng vim).
```
vim ~/.bashrc
```
3. Thêm dòng dưới đây vào cuối file `.bashrc `.
```
fortune | cowsay -pn
```
4. Bây giờ, tận hưởng thành quả thôi nào .
![](https://images.viblo.asia/c47f000b-77c7-47f8-ac63-aca9f7026f5b.png)
> Tuyệt vời, mọi thứ đều hoàn hảo :D 
## Một số ví dụ cao cấp hơn.
### Ví dụ về cách thủ công.
![](https://images.viblo.asia/a57df286-516d-4254-8ac7-58cd97cc2386.png)
1. Tạo một file "buddha.py”, mình sử dụng python.
```
sudo touch buddha.py
```
2. Viết nội dung bên trong nó giống như vầy:
![](https://images.viblo.asia/e9939367-fcd6-437a-b3a7-aa4799ce4190.png)
3. Bây giờ, hãy mở terminal và mở tệp ./bashrc bằng bất kỳ trình soạn thảo nào bạn chọn. (Ở đây, tôi tiếp tục sử dụng vim).
```
vim ~/.bashrc
```
4. Thêm dòng dưới đây vào cuối file` .bashrc` vừa mở,
```
python buddha.py
```
5. Hãy đóng terminal của bạn và bật lại, bạn sẽ thấy thành quả.
![](https://images.viblo.asia/a57df286-516d-4254-8ac7-58cd97cc2386.png)
### Ví dụ về cách dùng tools.
> Bằng cách thay đổi thông số khác nhau thì “fortune and cowsay” có thể thay nhiều hình của nhiều con vật khác nhau chứ không chỉ mỗi con bò :3rd_place_medal: 
1. Hiển thị một Tux:  bằng các thêm `-f tux` với fortune | cowsay trong file ` ~/.bashrc`.
```
fortune | cowsay -f tux
```
Chúng ta đã có một kết quả mới:
![](https://images.viblo.asia/0052ef78-4ede-4664-8024-a07f2ca84b0f.png)
2. Hiển thị khủng long: bằng các thêm `-f stegosaurus` với fortune | cowsay trong file ` ~/.bashrc`.
```
fortune | cowsay -f stegosaurus
```
![](https://images.viblo.asia/462ea189-108f-4c75-baf2-f47aaf9af2b7.png)
3. Tùy chỉnh messages hiển thị cùng con vật theo ý bạn:
Chỉ cần thêm `cowsay -f tux "Xin chào, Nguyễn Mạnh"` vào cuối file `~/.bashrc` là chúng ta lại có kết quả như vầy nè:
![](https://images.viblo.asia/a713880f-7d3e-4e66-8d85-6280a4fc9feb.png)

# Tổng kết
Mình đã hướng dẫn cho các bạn cách tùy biến làm sao cho khi mở terminal lên trông nó đẹp hơn, sịn sò hơn, nguy hiểm hơn.

Những thứ mình hướng dẫn còn hạn hẹp, nhưng hi vọng giúp cho các bạn được phần nào đó để vọc vạch.

Chúc các bạn thành công, và hãy tìm ra nhiều cách tùy biến cho các bạn đi nào :D

Nguồn tham khảo: https://www.geeksforgeeks.org/cool-custom-welcome-messages-linux-terminal/