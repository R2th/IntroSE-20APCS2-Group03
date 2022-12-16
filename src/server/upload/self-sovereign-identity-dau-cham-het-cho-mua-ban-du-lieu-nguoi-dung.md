# Intro
Blockchain đã đạt đến 1 bước phát triển lớn, trở thành cuộc cách mạng cho hệ thống phân tán. Và cốt lõi của Blockchain là thuật toán đồng thuận. Nó đã được ứng dụng và rất nhiều lĩnh vực khác nhau và một trong số đó là **Quản lý định danh**

Chúng ta dành ngày càng nhiều thời gian trên Internet để hoàn thành, và vì vậy **Digital Identity** đang dần trờ thành phương tiện để khẳng định chủ thể là ai? Ví dụ, ta có thể nhận biết được 1 hotgirl/hotboy thông qua việc xem profile của họ trên Facebook, Twitter chứ không phải là thẻ căn cước, bằng lái xe của họ,...

![](https://hackernoon.com/hn-images/1*eynF_bCskMMhc-Ii4-33wQ.jpeg)
# I. Self-Sovereign Identity (SSID) là gì ?
Hiện nay, danh tính (trên Internet) của ta thường gắn với tài khoản Facebook, Google,... vì sự lớn mạnh và ảnh hưởng của những ông lớn này, cho phép ta có thể sử dụng 1 danh tính với nhiều trang web khác nhau.Tiện lợi là vậy, tuy nhiên, việc phụ thuộc tập trung vào 1 số ít nhà cung cấp định danh tiềm tàng nhiều rủi ro, giả dụ như nếu danh tính của ta không được họ chấp nhận hoặc họ bị tấn công,... hay thậm chí, bên cung cấp dịch vụ có thể dùng dữ liệu người dùng để trao đổi. 

Trong thực tế, đã xảy ra những vụ bế bối như vậy, ví dụ như: Facebook bán dữ liệu user cho Cambridge Analytica gây tác động lớn đến cuộc bầu cử Tổng thống Mỹ 2016, hay là phổ biên hiện nay, thông tin cá nhân của khách hàng được giao bán trên mạng dẫn đến tình trạng spam mail, gọi điện quảng cáo, lừa đảo,...

=> Vì vậy, **SSID** được sinh ra nhằm loại bỏ sự phụ thuộc và những rủi ro này. <br>

**Self-Sovereign Identity (SSID)** cho phép user làm chủ định danh của chính họ và đồng thời cho phép các nhà cung cấp dịch vụ có thể xác thực, tin tưởng vào định danh này. Và với công nghệ Blockchain, sự tập trung sẽ chuyển từ những bên cung cấp nền tảng (Facebook, Google) sang tập trung vào người dùng.

> **Fact**: W3C đã tuyên bố rằng với **Self-Sovereign Identity**, sự tồn tại của user không phụ thuộc vào bất cứ nền tảng nào!

# II. Thế nào được coi là Self-Sovereign Identity ?
Christopher Allen đã đề xuất 10 luật để một đinh danh có thể coi là SSID [*Ten Principles of Self-Sovereign
Identity*](http://www.lifewithalacrity.com/2016/04/the-path-to-self-soverereign-identity.html). 
Nhìn chung, 10 luật này có thể được chia vào 3 nhóm: *security, controllability*, và *portability* :  

![](https://images.viblo.asia/c893e5dc-840b-401a-8d36-48d34cc1b8eb.png)


1. **Existence**: 
    Users phải tồn tại một cách độc lập, và định danh chỉ để tham chiếu đến họ.
2. **Control**:
    Users hoàn toàn kiểm soát danh tính của họ như chia sẻ, cập nhật hay thậm chí che dấu nó. Nói cách khác, users tự chủ trong cách danh tính của họ được sử dụng.
    Sau nhiều những bê bối lộ lọt dữ liệu người dùng đã dấy lên câu hỏi "*Liệu người dùng có sở hữu dữ liệu của mình ?*"
    Các giải pháp dựa vào công nghệ Blockchain đã được đưa ra, cho phép user quyết định lúc nào và ở đâu, dữ liệu của họ được chia sẻ.
    
3. **Access**: User là người duy nhất và có thể dễ dàng truy cập vào toàn bộ dữ liệu gắn với định danh của họ.  <br>  Điều này không có nghĩa là user nắm quyền thay đổi thông tin của họ, tuy nhiên họ có thể biết được bất cứ thay đổi nào tiềm tàng rủi ro cho họ.
    
4. **Transparency**: Cách định danh của user được sử dụng cần được công khai
**Transparency** đảm bảo rằng user có thể giám sát cách định danh của họ được lưu trữ và sử dụng. Hệ thống và thuật toán được sử dụng cần open, không chỉ về chức năng mà cả cách quản lý, cập nhật, ... 
-> User tự bảo vệ mình khỏi những rủi ro tiềm tàng
5. **Persistence**: Định danh cần tồn tại lâu dài
Một định danh nền tồn tại mãi mãi hoặc ít nhất cho đến khi user không muốn giữ nó nữa. 

> Persistence là một tư tưởng cơ bản để cho 2 luật khác: portability và interoperability

6. **Portability**: Thông tin cần có tính di động
Định danh không nên được nắm giữ do duy nhất một tổ chức, cho dù tổ chức này có đáng tin và hoạt động tốt tới đâu. Trên Internet hiện nay, một tổ chức nắm giữ thị trường không có nghĩa là nó sẽ tồn tại lâu dài. Một đinh danh có tính di động đảm bảo rằng định danh đó tồn tại lâu dài và user có thể kiểm soát nó

7. **Interoperability**: Một định danh nên được sử dụng rộng rãi nhất có thể
Đinh danh sẽ có giá trị thấp nếu chỉ nằm trong khuôn khổ. Với sự phát triển của Internet, nhu cầu được kết nối xuyên biên giới và nền tảng ngày càng cao. Vì vậy việc 1 định danh được chấp nhận bởi đa nền tảng trở thành thiết yếu.

8. **Consent**: Việc sử dụng định danh của người dùng cần có sự đồng thuận của họ. Hay nói cách khác, nếu muốn chia sẻ dữ liệu cần được chủ của nó cho phép !
Đa số các hệ sinh thái đa nền tảng hiện nay đều đảm bảo **Interoperability**, 1 định danh sẽ được chia sẻ trên nhiều nền tảng của hệ sinh thái này. Tuy nhiên tất cả điều đó chỉ được thực hiện dựa trên sự đồng thuận của user.
Ví dụ: khi 1 ứng dụng muốn kết nối đên tài khoản facebook sẽ cần user phê duyệt.

9. **Minimalization**: Giới hạn tới mức tối thiểu lộ lọt thông tin.
Chỉ những thông tin cần thiết cho task nên được chia sẻ, còn những thông tin khác nên được bảo mật tránh những rủi ro tiềm tàng. 
Ví dụ: Một hệ thống cần tuổi của user thì chỉ nên chia sẻ tuổi, ko nên chứa nhiều thông tin hơn như ngày sinh.
10. **Protection**: Quyền của users cần đặt lên trên mọi thứ, cho dù có đi ngược lại lợi ích của nhà cung cấp định danh.


# III. Self-Sovereign Identity (SSID) trong Blockchain
Với Blockchain, **SSID** cho phép user sở hữu và kiểm soát định danh của họ, show danh tính khi cần thiết để những nhà cung cấp dịch vụ có thể xác minh nó. Sổ cái phân tán đã phi tập trung hoá quá trình xác thực và uỷ quyển của nhà cung cấp dịch vụ, biến **SSID** như smart contract giữa nhà phát hành định danh (Issuer), chủ sở hữu (Owner) và bên xác thực (Verifier). Giờ đây, những công nghệ Blockchain như Bitcoin và Ethereum đều dựa trên kiến trúc sổ cái phân tán có thể coi là giải pháp lý tưởng đáp ứng 10 yêu cầu của SSID.  

![Mối quan hệ "tin tưởng" giữa Issuer/Holder/Verifier](https://www.windley.com/archives/2018/09/credential_flow.png) 
  
> Tuy nhiên, cần chú ý rằng, dữ liệu về định danh người dùng chỉ nên lưu trữ bảo mật trên thiết bị của chính họ chứ không được công khai trên sổ cái.

Hãy thử xem 1 ví dụ: 
John Smith muốn thuê 1 chiếc xe để đi du lịch. Thông thường anh ấy sẽ cần phải đăng ký với dịch vụ cho thuê xe bằng thông tin cá nhân của mình như: tuổi (ngày sinh), bằng lái xe, ... 

Tuy nhiên, với hệ thống SSID, mọi thứ sẽ thay đổi như sau:
![](https://www.idaptive.com/sites/default/files/inline-images/Rajesh%20Self%20Sovereign%20image%202.png)

- Bước 1: John (Owner) đăng ký với nhà phát hành (Issuer) một bằng lái xe điện tử.
- Bước 2: John đăng nhập vào hệ thống của Issuer để lấy bằng lái xe.
- Bước 3: Issuer ký bằng lái xe và gửi lại bằng lái xe cho John.
- Bước 4: John ký bằng lái xe và lưu trữ nó ở thiết bị và giữ nó bí mật.
- Bước 5: Request đặt xe với dịch vụ cho thuê xe (Verifier).
- Bước 6: John cho phép dịch vụ cho thuê xe truy cập ví của mình để xác minh những thông tin cần thiết.
- Bước 7: Dịch vụ cho thuê xe xác minh chữ ký để chắc chắn rằng bằng lái của John được phát hành từ cơ quan có thẩm quyền.
- Bước 8: Xác minh thành công và hoàn tất cho thuê xe.

Bằng cách này, John Smith (Owner) có thể chứng minh mình đủ điều kiện thuê xe mà không cần đăng ký với dịch vụ cho thuê xe, và anh ấy có thể sử dụng SSID này cho nhiều dịch vụ khác nhau, chỉ cần cung cấp những thông tin mà dịch vụ đó cần, tăng tính tiện dụng và bảo mật thông tin.

# IV. Kết luận
Khách hàng đang dần hiểu ra một điều ***Nếu ta không trả tiền cho sản phẩm, thì ta chính là sản phẩm*** nên họ ngày càng nhận thức rõ về việc cần bảo mật thông tin cá nhân. **Self-sovereign Identity** (SSID) đang mở ra một cách thức mới để xác minh, lưu trữ và chia sẻ thông tin cá nhân. Tuy nhiên, vẫn còn một con đường dài để thúc đẩy các nhà cung cấp dịch vụ cũng như người dùng thay đổi cuộc chơi.

# Tài liệu tham khảo
- [sovrin.org](https://www.windley.com/archives/2018/09/multi-source_and_self-sovereign_identity.shtml)
- [A Survey on Essential Components of a Self-Sovereign Identity](https://arxiv.org/pdf/1807.06346.pdf)
- [Self Sovereign Identity — a guide to privacy for your digital identity with Blockchain](https://medium.com/@AlexPreukschat/self-sovereign-identity-a-guide-to-privacy-for-your-digital-identity-5b9e95677778)
- [The Path to Self-Sovereign Identity](http://www.lifewithalacrity.com/2016/04/the-path-to-self-soverereign-identity.html)
- [Introduction to Self-Sovereign Identity and Its 10 Guiding Principles](https://medium.com/metadium/introduction-to-self-sovereign-identity-and-its-10-guiding-principles-97c1ba603872)