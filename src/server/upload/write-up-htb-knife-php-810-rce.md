![](https://images.viblo.asia/983d21f3-a4bf-4228-a5d4-55bd5d709f3d.PNG)

# Giới thiệu
BountyHunter là một machine về leo quyền trên Linux. Độ khó của machine này chỉ ở mức dễ, và nó thực sự là dễ. Điều những người mới chơi có thể học được ở machine này là cách tìm kiếm thông tin, tìm kiếm mã khai thác, né lỗ thỏ (lỗ nhỏ nhỏ xíu thôi, nhưng vẫn dễ rơi vào).
# Tìm kiếm thông tin
## Rà quét các cổng và dịch vụ
Bước đầu tiên là scan bằng nmap để xem machine này có những cổng nào đang mở và dịch vụ nào đang chạy.

![](https://images.viblo.asia/1e3ca390-06f5-4373-9f6e-ae2cc72d0a09.PNG)

Vâng, không có gì bất ngờ cả. Với một machine đơn giản thì chắc nó chỉ có vài dịch vụ cơ bản thôi. Khả năng cao là cái trang web tại cổng 80 kia có lỗ hổng.

## Rà quét các đường dẫn ẩn
Vì chỉ nó 1 trang web thôi, nên chúng ta có thể quét đường dẫn ẩn luôn. Trong thời gian chạy của dirsearch thì chúng ta có thể kiểm tra các chức năng của trang web.

Nhưng thực ra tốc độ scan của tool nhanh hơn mình nghĩ. Kết quả chẳng có gì cả :D

![](https://images.viblo.asia/0d3cba12-d340-4978-80ad-0e93f5412e98.PNG)

Có vẻ người làm đề cảm thấy các chức năng của trang web chẳng liên quan gì đến lỗ hổng mà họ thiết kế, vì thế họ quyết định ```host bừa cái web có mỗi trang index lên, không cần phải làm thêm các trang khác làm gì cả, đằng nào cũng có dùng đến đâu``` => 0 điểm cho sự đầu tư vào mặt hình thức.

Tin vui là chúng ta không cần phải kiểm tra kỹ thêm quá nhiều về cái trang web này nữa. Tin buồn là chúng ta phải tìm kỹ hơn với lượng thông tin ít ỏi có được.

## Kiểm tra trang web tại cổng 80
Vì có mỗi trang index nên chúng ta cần chú ý vào kết quả do Wappalyzer cung cấp

![](https://images.viblo.asia/9b8504e7-2e59-4b43-9d72-9c5bb41fa767.PNG)

Thông tin từ Wappalyzer thì có 2 điểm làm mình chú ý:
- Server sử dụng: Apache phiên bản 2.4.41
- Ngôn ngữ lập trình back end: PHP phiên bản 8.1.0

Như mình đã viết ở tiêu đề và cái ảnh có bôi vàng kia thì hướng chúng ta cần đi là tìm lỗ hổng với PHP phiên bản 8.1.0

Tuy nhiên thì ban đầu mình không đi thẳng theo hướng đó. Mình đã nghĩ rằng "PHP bản mới thế thì chắc gì có lỗ hổng mà khai thác, thằng Apache kia có mỗi bản 2.4.41 thì khả năng cao là có này". Tất nhiên mình đã nhầm, mình cảm thấy như chui sâu vào cái hang thỏ vậy.

Mã exploit cũng tìm được một số đấy, nhưng chẳng dùng được cái nào cả.
# Lấy cờ user
## PHP 8.1.0 "User-Agentt" RCE
Khi tìm kiếm với từ khóa "php 8.1.0 rce" chúng ta có thể tìm được rất nhiều kết quả khả thi ở ngay đầu. Đây đúng là niềm vui nhỏ sau khi mình chui ra khỏi lỗ thỏ :D

![](https://images.viblo.asia/74386175-f785-4eeb-a4aa-22535007260f.PNG)

Lỗ hổng này có thể nói là "ảo thật đấy" :clown_face: Khi mà để khai thác lỗ hổng này, chúng ta cần chèn thêm header **```User-Agentt```**. 

![](https://images.viblo.asia/ed3dbc61-1d64-45b7-ba9c-bbe71c5d03a1.png)

Có vẻ đây là một lỗi typo, chúng ta có thể đọc thêm [tại đây](https://flast101.github.io/php-8.1.0-dev-backdoor-rce/).

![](https://images.viblo.asia/ec5138b8-3eef-4449-98cc-e31a57b6d80e.png)

## Tạo reverse shell
Để tạo reverse shell, mình sử dụng [mã khai thác của **flast101**](https://github.com/flast101/php-8.1.0-dev-backdoor-rce/blob/main/revshell_php_8.1.0-dev.py)

![](https://images.viblo.asia/e19667d0-73cd-4b48-be9e-2305f9882823.PNG)

![](https://images.viblo.asia/5a55a1c5-beb2-4138-8c15-a66ee9df0037.PNG)

Khi mã khai thác chạy thành công, chúng ta đã có reverse shell và cờ user

![](https://images.viblo.asia/4c18fbb7-fa25-4fb4-a8eb-9824402efc2f.PNG)

![](https://images.viblo.asia/31b276d2-8fe2-429c-bac1-45669eb4db49.PNG)

# Lấy cờ root
## Kiểm tra các thông tin về phân quyền
Không có lỗ thỏ như phần RCE, thông tin về phân quyền ở machine này rất rõ ràng và trực tiếp. Chỉ với lệnh ```sudo -l```, chúng ta có ngay con đường lên root.

![](https://images.viblo.asia/d2120fca-9cb8-4eaf-b09f-c92b858a8892.PNG)

## Đọc cờ root
Theo như kết quả từ lệnh ```sudo -l```,  user james được quyền thực thi lệnh ```sudo knife``` mà không cần nhập mật khẩu. Khi kiểm tra chương trình **Knife** trên GTFO Bins, chúng ta thấy rằng chương trình này có thể thực thi các script Ruby.

![](https://images.viblo.asia/3ce8f14e-58e9-431f-9aed-8b4124c47e22.PNG)

Và với quyền sudo thì có thể leo quyền dễ dàng từ đây. Tất nhiên chúng ta không cần phải lấy shell với quyền root như hướng dẫn làm gì, chỉ cần trực tiếp đọc cờ root là được:

![](https://images.viblo.asia/d4d78e81-f6ac-4b7f-9b5d-9804eff5f36f.PNG)