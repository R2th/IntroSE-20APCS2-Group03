# Lời mở đầu


Có lẽ bài toán generate PDF file là bài toán mà dự án nào cũng đã từng gặp. Đây là bài toán rất phổ biến và có khá nhiều cách để giải quyết: chẳng hạn như dùng thư viện để tạo file pdf như pdfkit, hoặc dùng các thư viện convert file, hoặc dùng tool từ bên thứ 3...

Ở phạm vi bài viết này, mình sẽ đưa ra 1 cách giải quyết mà theo mình là đơn giản nhất, dễ phát triển và maintain sau này. Đó chính là tạo PDF từ html template. Chỉ mất 3 bước là bạn đã có thể tạo ra file PDF đúng theo yêu cầu của khách hàng. Chúng ta bắt đầu luôn nhé.

# 1. Design HTML template

Để tạo file pdf từ html template thì đầu tiên đương nhiên là tạo html template rồi :smiley:. Dựa trên những case mà mình từng xử lý thì với các file pdf cần tạo không quá phức tạp, chỉ cần một chút kiến thức về html và css là có thể tạo ra một file template theo yêu cầu rồi. Mình chỉ có đôi điều ghi chú về cái này thôi:

* Keep it simple: việc design template không cần phải quá mức phức tạp với bootstrap hay đủ các thứ. Chỉ đơn giản với 1 file html, 1 file css nếu bạn muốn tái sử dụng cho các template khác. Nhìn chung thì cấu trúc của 1 template nó sẽ như thế này
    ```
    report-template
        |   main.html
        |   
        +---asset
        |       logo.png
        |       
        \---css
                main.css
    ```

* Đối với data cần setting trong template thì nên đặt theo dạng mustache variable `{{ ... }}`. Nếu bạn chưa biết gì về mustache thì bạn có thể xem và demo tại [đây](https://mustache.github.io/#demo). Tuy nhiên trong giai đoạn thiết kế thì bạn nên hard code phần data này để mọi thứ hiển thị như mong muốn. Sau đó hãy setting nó thành `{{ ... }}`
* Trong khi thiết kể thì nên check bằng print preview trên trình duyệt. Vì view ở HTML có thể khác so với view trên giấy nên là cứ `Ctrl + P` ở trình duyệt để xem mình thiết kế có giống với yêu cầu của KH hay không

    Ví dụ

    |  view trên Chrome | view bằng print preview |
    | -------- | -------- |
    | ![](https://images.viblo.asia/3fea96eb-f464-4616-b96d-02703c7375ca.png)     | ![](https://images.viblo.asia/1649f1ed-dad8-450c-ade9-0a77899a6686.png)     |


* Khi template đã thiết kế xong thì chúng ta cần hợp nhất tất cả thành 1 file html duy nhất, bao gồm cả css lẫn img sử dụng. Điều này là cần thiết vì khi get file template chúng ta chỉ cần lấy 1 file chứ không phải lấy cả 1 folder. Để làm được việc này, lựa chọn của mình là dùng [gulpfile](https://gulpjs.com/). Với một chút setting để chỉ định file cần hợp nhất và folder chứa file sau khi hợp nhất, với 1 file html template duy nhất được tạo ra, chúng ta có thể lưu nó trên S3, firebase... để có thể get từ generate service khác.

* Khi thêm mới một template thì các bạn nên đặt nó thành một folder độc lập và ngang cấp với folder của template khác. Bạn có thể copy lại tài nguyên từ các template khác nhưng không nên dùng chung vì nó gây ảnh hưởng nếu như có bất cứ thay đổi nào. Việc generate file html cũng thuận tiện hơn.

# 2. Parsing data to HTML template

Khi đã có template rồi thì kế tiếp ta sẽ parse data vào thôi. Việc này khá đơn giản khi sử dụng thư viện mustache để render template. Ở trên đã setting thì bây giờ mình xài thôi :smile:  

Mustache hiện tại support hầu hết các ngôn ngữ và có sẵn các example nên việc sử dụng mustache quá là ngon lành luôn. Việc này giúp cho bạn không cần quan tâm đến logic phải ráp data này vào trường này của template này, data kia vào trường kia của template kia, không cần mỗi template phải có 1 function xử lý. Logic chính bạn cần quan tâm lúc này chỉ là việc get đúng template và truyền đúng data để render, mọi thứ còn lại cứ để mustache lo. 

Bạn có thể demo việc parsing data tại [đây](https://mustache.github.io/#demo) để có thể biết được data json hay template có chỗ nào chưa mapping với nhau

Lưu ý là key trong data json phải trùng với `{{ key }}` trong file html

# 3. Convert HTML to PDF

Đây là bước cuối cùng. Và việc chúng ta cần làm vẫn là sử dụng thư viện để convert. Rất hay ho mà chẳng tốn sức, và nên dùng thư viện gì. [Wk<html>topdf](https://wkhtmltopdf.org/index.html) chính là câu trả lời. Bạn chỉ cần download, tạo một batch với command line của wkhtmltopdf để convert với một số argument optional để thêm header, footer, điểu chỉnh page size... là bạn sẽ có 1 file pdf hoàn chỉnh rồi. 
    
Những gì cần chú ý là bạn cần thư viện wfhtmltopdf, một batch để setting command convert bao gồm file thực thi của wfhtmltopdf, link file html và chỉ định nơi lưu file pdf cũng như tên của nó và một số option khác. Nếu không muốn lưu file tại local bạn có thể thêm xử lý upload file pdf lên đâu đó như s3 hay firebase
    


# Lời kết

Việc xây dựng file PDF từ file html theo mình là một giải pháp nhanh, đơn giản và thuận tiện khi mà bạn không cần vật lộn với quá nhiều dòng code tạo từng line từng text hay từng format cho file pdf (khi bạn dùng thư viện tạp pdf thuần túy). Bạn cũng không phải tốn chi phí khi mua dịch vụ tạo pdf sẵn từ bên thứ 3.
    
Để giải quyết bài toán tạo file pdf từ html template, tất cả những gì chúng ta cần xây dựng là:

* TemplateService: nơi chứa các thiết kế của template và file batch để guplfile và upload lên host
* PDFGenerationService: nơi chứa xử lý get template, get data để tiến hành render file html và chứa batch để convert html to pdf và upload lên host

Trên đây là bài viết giới thiệu về giải pháp tạo file PDF đơn giản và thuận tiện cho việc thay đổi phát triển PDF sau này. Hi vọng bài viết này sẽ giúp ích cho các bạn. Ở phần 2 của bài viết này mình sẽ demo một số xử lý code convert mà mình đã thực hiện cũng như kết quả file và các lỗi mình từng gặp nhé :D
    
    
# Tham khảo
    
https://gulpjs.com/
    
https://mustache.github.io/
    
https://wkhtmltopdf.org/