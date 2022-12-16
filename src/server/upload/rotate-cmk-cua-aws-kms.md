Đầu tiên, nếu bạn chưa biết KMS là gì thì bạn có thể xem bài viết cũ hơn của mình [tại đây](https://viblo.asia/p/tim-hieu-ve-aws-kms-bJzKm4gD59N).

CMK là thứ giúp KMS mã hóa, giải mã cho bạn. Và rõ ràng việc sử dụng CMK không thay đổi gì từ năm này qua tháng nọ cũng không tốt cho security.
Vì vậy trong bài hôm nay mình sẽ giới thiệu những cách có thể rotate CMK.

Có 2 cách để rotate CMK như sau :
* Rotate tự động
* Rotate thủ công

Chúng ta sẽ tìm hiểu kỹ hơn về từng loại rotate dưới đây.


## 1. Rotate tự động
AWS cung cấp sẵn cho chúng ta tính năng rotate tự động CMK, và để sử dụng chúng ta chỉ cần enable nó lên là được. Khi enable tính năng này thì AWS KMS sẽ generate ra key material mới cho CMK của bạn vào mỗi năm. Đồng thời AWS KMS cũng giữ lại key material cũ để có thể giải mã các data đã được mã hóa trước đó (điều này có nghĩa là bạn không cần phải migrate data cũ ). Các key material của CMK sẽ không bị xóa đi cho đến khi bạn xóa CMK đó.

Nôm na thì cách hoạt động của rotate tự động như sau :
![](https://images.viblo.asia/37fc8fc6-b0f1-423c-b8c0-fa3d326ce491.PNG)


Nhìn vào sơ đồ hoạt động như trên thì ta có thể thấy khi rotate tự động CMK thì không tạo ra 1 CMK mới mà chỉ thay đổi key material (là cái giúp bạn mã hóa, giải mã data) của CMK hiện tại.
Điều này sẽ mang lại những lợi ích sau :
* Những properties của CMK như keyID, keyARN, policies,... không thay đổi vì không tạo mới CMK
* Không cần update application, alias trỏ tới keyID, keyARN
* Tiết kiệm chi phí. Về chi phí khi tạo CMK thì có thể xem [ở đây](https://aws.amazon.com/kms/pricing/)
* Vì là tự động nên chúng ta không cần phải làm gì cả

Đồng thời nó cũng có những nhược điểm sau :
* Chỉ support rotate tự động đối với customer managed CMK (nghĩa là với AWS managed CMK thì không có chế độ rotate tự động này mà AWS KMS sẽ tự động rotate AWS managed CMK mỗi 3 năm 1 lần)
* Không rotate data key mà CMK generate ra và cũng không re-encrypt lại data cũ. Nghĩa là nếu bạn làm mất data key thì việc rotate tự động cũng không giúp bạn loại trừ khả năng bị lộ data. 
* Không support với các type sau của CMK
   - Asymmetric CMKs

   - CMKs trong custom key stores

   - CMKs đã được imported key material
   
Với các type này thì phải rotate thủ công

## 2. Rotate thủ công
Với những loại CMK không support rotate tự động thì bạn hoàn toàn có thể thực hiện rotate thủ công. Khác với rotate tự động - chỉ rotate key material, rotate thủ công sẽ tạo ra CMK mới và sử dụng thay cho CMK hiện tại.

![](https://images.viblo.asia/68e3d86c-6115-476f-ba5f-fdfd41d2708e.PNG)

Vì tạo mới CMK nên sẽ sinh ra properties khác. Do đó, bạn cần update keyID, key ARN tham chiếu đến application và alias.

Về step cụ thể để rotate thủ công thì bạn tham chiếu [ở đây](https://aws.amazon.com/premiumsupport/knowledge-center/rotate-keys-customer-managed-kms/?nc1=h_ls). 

Khi tạo ra CMK mới bạn sẽ dùng CMK mới để tiếp tục encrypt data mới, còn decrypt data cũ thì AWS KMS sẽ tự biết data của bạn đã được mã hóa bằng CMK nào để thực hiện giãi mã.
Do đó bạn cũng không cần thực hiện bước migrate data. 

Tuy nhiên, vì AWS không nói cụ thể họ làm thế nào để biết được data được mã hóa bằng CMK nào nên mình đang đoán là khi decrypt data, mặc dù bạn truyền lên keyID của CMK mới nhưng AWS sẽ chạy qua 1 lượt CMK đang có cho tới khi giải mã được data. 

Bạn nào đã thử rồi thì comment cho mình biết với nhé :)