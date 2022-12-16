Gần đây mình đã tìm hiểu về Python 3 để xem làm thế nào để có thể bắn ra một loạt email. Có thể có nhiều phương pháp đơn giản hơn để làm điều này, nhưng những cách dưới đây mình thấy hiệu quả ít nhất là đối với mình.

Và đây là kịch bản: Bạn có tên và địa chỉ email của một loạt các địa chỉ liên lạc. Và bạn muốn gửi một tin nhắn đến từng người trong số những người liên hệ đó, trong khi thêm một người thân yêu “Dear [name]” tên ở đầu tin nhắn.

Để đơn giản, bạn có thể lưu trữ các chi tiết liên lạc trong một tệp chứ không phải là cơ sở dữ liệu. Bạn cũng có thể lưu trữ mẫu của tin nhắn bạn muốn gửi trong một tệp.

Các smtplib mô-đun của Python về cơ bản tất cả các bạn cần khii email đơn giản, mà không cần bất kỳ dòng tiêu đề hoặc thông tin bổ sung như vậy. Nhưng đối với email thực , bạn cần một dòng chủ đề và nhiều thông tin - thậm chí có thể là hình ảnh và tệp đính kèm.

Đây là nơi gói email của Python xuất hiện. Hãy nhớ rằng không thể gửi thư email chỉ bằng emailgói. Bạn cần một sự kết hợp của cả hai emailvà smtplib.

Dưới đây là bốn bước cơ bản để gửi email bằng Python:
1.Thiết lập máy chủ SMTP và đăng nhập vào tài khoản của bạn.

2.Tạo MIMEMultipartđối tượng tin nhắn và tải nó với tiêu đề phù hợp với From, Tovà Subjectcác lĩnh vực

3.Thêm cơ thể tin nhắn của bạn.

4.Gửi tin nhắn bằng cách sử dụng đối tượng máy chủ SMTP.

Bây giờ hãy để mình hướng dẫn các bạn toàn bộ quá trình

Giả sử bạn có một tệp liên hệ `mycontacts.txt` như sau:
```
user@computer ~ $ cat mycontacts.txt
john johndoe@example.com
katie katie2016@example.com
```
Mỗi dòng đại diện cho một liên hệ duy nhất. Chúng ta có tên theo sau là địa chỉ email. Mình đang lưu trữ mọi thứ bằng chữ thường. Mình sẽ để nó theo logic lập trình để chuyển đổi bất kỳ trường nào sang chữ hoa hoặc chữ thường nếu cần. Tất cả điều đó là khá dễ dàng trong Python.

Tiếp theo, chúng ta có tệp tin mẫu `message.txt.`
```js
user@computer ~ $ cat message.txt 

Dear ${PERSON_NAME}, 

This is a test message. 
Have a great weekend! 

Yours Truly
```
Có chú ý chữ  `${PERSON_NAME}?` Đó là một chuỗi mẫu trong Python. Chuỗi mẫu có thể dễ dàng được thay thế bằng các chuỗi khác; trong ví dụ này, `${PERSON_NAME}`sẽ được thay thế bằng tên thật của người đó, như bạn sẽ thấy ngay sau đây.

Bây giờ hãy bắt đầu với code Python, chúng ta cần đọc các liên hệ từ `mycontacts.txt`tập tin. Chúng ta cũng có thể khái quát bit này vào chức năng riêng của nó.
```python
# Function to read the contacts from a given contact file and return a
# list of names and email addresses
def get_contacts(filename):
    names = []
    emails = []
    with open(filename, mode='r', encoding='utf-8') as contacts_file:
        for a_contact in contacts_file:
            names.append(a_contact.split()[0])
            emails.append(a_contact.split()[1])
    return names, emails
```
Hàm `get_contacts()` ấy tên tệp làm đối số của nó. Nó sẽ mở tệp, đọc từng dòng (nghĩa là từng liên hệ), chia nó thành tên và email, sau đó nối chúng vào hai danh sách riêng biệt. Cuối cùng, hai danh sách được trả về từ hàm.

Chúng ta cũng cần một hàm để đọc trong tệp mẫu (như `message.txt`) và trả về một`Template`đối tượng được tạo từ nội dung của nó.
```python
from string import Template

def read_template(filename):
    with open(filename, 'r', encoding='utf-8') as template_file:
        template_file_content = template_file.read()
    return Template(template_file_content)
```

Cũng giống như hàm trước, hàm này lấy tên tệp làm đối số của nó.

Để gửi email, bạn cần sử dụng *SMTP (Giao thức chuyển thư đơn giản)* . Như đã đề cập trước đó, Python cung cấp các thư viện để xử lý tác vụ này.
```python
# import the smtplib module. It should be included in Python by default
import smtplib
# set up the SMTP server
s = smtplib.SMTP(host='your_host_address_here', port=your_port_here)
s.starttls()
s.login(MY_ADDRESS, PASSWORD)
```

Trong đoạn mã trên, bạn đang nhập smtplib và sau đó tạo một phiên bản SMTP đóng gói kết nối SMTP. Nó lấy tham số là địa chỉ máy chủ và số cổng, cả hai đều phụ thuộc hoàn toàn vào cài đặt SMPT của nhà cung cấp dịch vụ email cụ thể của bạn. Chẳng hạn, trong trường hợp của Outlook, dòng 4 ở trên sẽ là:
```python
s = smtplib.SMTP(host='smtp-mail.outlook.com', port=587)
```
Bạn nên sử dụng địa chỉ máy chủ và số cổng của nhà cung cấp dịch vụ email cụ thể của mình để toàn bộ hoạt động.

`MY_ADDRESS`và `PASSWORD`ở trên là hai biến chứa địa chỉ email và mật khẩu đầy đủ của tài khoản bạn sẽ sử dụng.

Bây giờ sẽ là thời điểm tốt để lấy thông tin liên lạc và các mẫu tin nhắn bằng cách sử dụng các chức năng chúng tôi đã xác định ở trên.
```python
names, emails = get_contacts('mycontacts.txt')  # read contacts
message_template = read_template('message.txt')
```
Bây giờ, đối với mỗi liên hệ đó, hãy gửi thư riêng.
```python
# import necessary packages
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# For each contact, send the email:
for name, email in zip(names, emails):
    msg = MIMEMultipart()       # create a message

    # add in the actual person name to the message template
    message = message_template.substitute(PERSON_NAME=name.title())

    # setup the parameters of the message
    msg['From']=MY_ADDRESS
    msg['To']=email
    msg['Subject']="This is TEST"

    # add in the message body
    msg.attach(MIMEText(message, 'plain'))

    # send the message via the server set up earlier.
    s.send_message(msg)
    
    del msg
```
Đối với mỗi `name`và` emai`l(từ tập tin danh bạ), bạn đang tạo một `MIMEMultipar`t đối tượng, lập `From`, `To`, `Subjectcontent-type` tiêu đề như một cuốn từ điển từ khóa, và sau đó gắn các nội dung thư cho` MIMEMultipart`đối tượng dưới dạng văn bản đơn giản. Bạn có thể muốn đọc tài liệu để tìm hiểu thêm về các loại` MIME` khác mà bạn có thể thử nghiệm.

Cũng lưu ý rằng trên dòng 10 ở trên, mình sẽ thay thế `${PERSON_NAME}`bằng tên thực được trích xuất từ ​​tệp danh bạ bằng cơ chế tạo khuôn mẫu trong Python .

Trong ví dụ cụ thể này, mình sẽ xóa `MIMEMultipart`đối tượng và tạo lại nó mỗi khi bạn lặp qua vòng lặp.

Khi đã xong, bạn có thể gửi tin nhắn bằng hàm `send_message ()` tiện dụng của đối tượng `SMTP` mà bạn đã tạo trước đó.
Đây là code đầy đủ:
```python
import smtplib

from string import Template

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

MY_ADDRESS = 'my_address@example.comm'
PASSWORD = 'mypassword'

def get_contacts(filename):
    """
    Return two lists names, emails containing names and email addresses
    read from a file specified by filename.
    """
    
    names = []
    emails = []
    with open(filename, mode='r', encoding='utf-8') as contacts_file:
        for a_contact in contacts_file:
            names.append(a_contact.split()[0])
            emails.append(a_contact.split()[1])
    return names, emails

def read_template(filename):
    """
    Returns a Template object comprising the contents of the 
    file specified by filename.
    """
    
    with open(filename, 'r', encoding='utf-8') as template_file:
        template_file_content = template_file.read()
    return Template(template_file_content)

def main():
    names, emails = get_contacts('mycontacts.txt') # read contacts
    message_template = read_template('message.txt')

    # set up the SMTP server
    s = smtplib.SMTP(host='your_host_address_here', port=your_port_here)
    s.starttls()
    s.login(MY_ADDRESS, PASSWORD)

    # For each contact, send the email:
    for name, email in zip(names, emails):
        msg = MIMEMultipart()       # create a message

        # add in the actual person name to the message template
        message = message_template.substitute(PERSON_NAME=name.title())

        # Prints out the message body for our sake
        print(message)

        # setup the parameters of the message
        msg['From']=MY_ADDRESS
        msg['To']=email
        msg['Subject']="This is TEST"
        
        # add in the message body
        msg.attach(MIMEText(message, 'plain'))
        
        # send the message via the server set up earlier.
        s.send_message(msg)
        del msg
        
    # Terminate the SMTP session and close the connection
    s.quit()
    
if __name__ == '__main__':
    main()
```
Mình tin rằng sau bài hướng dẫn này việc gửi mail bằng pyhon đã trở nên dễ dàng hơn nhiều so với trước kia.

Hãy sử dụng và cấu hình sao cho phù hợp nhất cho việc sử dụng của bạn nhé :D

Ngoài các tài liệu Python chính thức, mình có tham khảo thêm các nguồn tài liệu khác ở đây :)
http://naelshiab.com/tutorial-send-email-python/
### Tài liệu tham khảo:
1.https://docs.python.org/3/library/smtplib.html

2.https://www.python.org/