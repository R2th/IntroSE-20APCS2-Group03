Điều mà tất cả người dùng Xcode sẽ quen thuộc là quá trình tạo Files mới. Khi tạo File mới, chúng ta sẽ thấy một cửa sổ chứa lựa chọn các mẫu để làm base cho file mới. Các Templates mới này thường chứa các dòng code mà chúng ta xóa ngay lập tức hoặc thay đổi để phù hợp với style code của mình.
Nhiều người có thể không biết rằng thay vì chỉ dựa vào các Templates được cung cấp, chúng ta có thể tạo Templates của riêng mình. Điều này có thể đơn giản hóa quá trình tạo Files mới và cho phép chúng phù hợp với các yêu cầu cụ thể hơn.
Quá trình tạo Templates thoạt đầu có vẻ hơi khó hiểu, nhưng kết quả cuối cùng có thể thực sự hữu ích. Chúng ta sẽ khám phá quá trình viết các Files Templates Xcode của riêng mình, trước khi đi sâu vào cách chúng ta có thể chia sẻ những mẫu này với các nhà phát triển khác trong một dự án cụ thể.

### Tạo một Template
Khi Xcode khởi chạy, nó sẽ tìm kiếm các Templates files tại: ~ / Library / Developer / Xcode / Templates / File Templates. Để bắt đầu, chúng ta cần tạo một thư mục trong đây sẽ chứa tất cả các Templates File của chúng ta.

`mkdir -p ~/Library/Developer/Xcode/Templates/File\ Templates/Custom`

Trong thư mục này, một cách nhanh chóng để bắt đầu là sao chép một trong các Templates dựng sẵn và sau đó thay đổi nó. Chúng có thể được tìm thấy trong  Xcode application bundle, với một tùy chọn tốt cho các Templates dựa trên Swift là một cho một tệp Swift mới, `Source / Swift File.xctemplate.`

```
/Applications/Xcode.app/Contents/ 
  > Developer/ 
    > Library/ 
      > Xcode/ 
        > Templates/ 
          > File Templates/
```

Sau khi sao chép các tệp, chúng ta thấy xctemplate chứa 4 tệp khác nhau.

* TemplateIcon.png và TemplateIcon@2x.png là các thumbnail được hiển thị trong cửa sổ tệp mới. Chúng ta có thể sử dụng chúng cho tất cả các Templates Swift của mình hoặc tạo các Templates cụ thể của riêng mình.
* TemplateInfo.plist là nơi chúng ta configure templates.
* ___ FILEBASENAME .swift chứa source Swift tạo base cho Templates.

Chúng ta sẽ bắt đầu bằng cách tạo một Template cho struct Swift mới, được gọi là Swift Struct.xctemplate, dựa trên Swift File.xctemplate được đề cập ở trên.

##### → TemplateInfo.plist
Bằng cách gọi tệp ___ FILEBASENAME.swift, tệp Swift kết quả sẽ được đặt tên theo những gì được nhập vào cửa sổ tệp mới. Đối số tương tự này có thể được sử dụng trong Template bằng FILEBASENAMEASIDENTIFIER.* Điều này có nghĩa là nếu chúng ta nhập Contact vào cửa sổ tệp mới, tệp được tạo sẽ là Contact.swift, chứa struct Contact.

```
struct ___FILEBASENAMEASIDENTIFIER___ {
}
```

Sau khi hoàn thành Template, khởi động Xcode và yêu cầu tệp mới, chúng ta có thể thấy Template của chúng ta đang được cung cấp trong section có tên là 'Custom'. Tên của section được kiểm soát bởi tên thư mục mà chúng ta đã sử dụng trong ~ / Library / Developer / Xcode / Templates / File Templates.

![](https://images.viblo.asia/ccd2625c-a6ba-4e19-8ddf-3228c9cfe7c4.png)

### Những thứ khác mà chúng ta có thể làm
Mặc dù chúng có thể bắt đầu rất cơ bản, nhưng có một số điều quan trọng hơn chúng ta có thể làm với các Templates.

* Cung cấp tùy chọn Swift hoặc Objective-C khi tạo tệp mới. 
* Thay đổi tên tệp dựa trên những gì được nhập, ví dụ: đặt tên tệp là UsersRepositoryTest nếu nhập UsersRepository. 
* Yêu cầu nhập arguments trong cửa sổ tệp mới và sau đó sử dụng arguments này trong code. 
* Thêm headers hoặc copyright. 
* Thêm imports hoặc skeleton code để được đưa vào tệp theo mặc định.

Khi chúng ta khám phá các khả năng mà các file templates cung cấp, một problem trở nên cực kỳ đơn giản. Sẽ thực sự tuyệt vời nếu chúng ta có thể tạo các templates dành riêng cho dự án và chia sẻ chúng với các dev khác trong dự án. Mặc dù các templates cho một dự án cụ thể không được Xcode hỗ trợ tự động, nhưng nó có thể được thực hiện thông qua việc sử dụng khéo léo các symbolic link.

Chúng ta nên đặt tất cả các templates trong một thư mục trong dự án của mình, chẳng hạn như FileTemplates. Có khả năng dự án được giữ trong source control, điều này sẽ đảm bảo các templates được theo dõi và chia sẻ với mọi người khác trong nhóm.

Thư mục mà Xcode dự kiến sẽ tìm thấy các templates của chúng ta nên đã tồn tại nếu các bước được thực hiện ở trên. Nếu không thì chúng ta cần đảm bảo rằng nó đã được tạo.

`mkdir -p ~/Library/Developer/Xcode/Templates/File\ Templates`

Khi thư mục tồn tại, symbolic link có thể được tạo ở đây trỏ đến các Templates trong dự án Xcode của chúng ta. Điều đáng nói là nếu chúng ta xóa dự án hoặc di chuyển nó, symbolic link có thể bị xóa và tạo lại một cách đơn giản.

```
ln -s [Project Location]/FileTemplates \
  ~/Library/Developer/Xcode/Templates/File\ Templates/[ProjectName]
```

ví dụ:

```
ln -s ~/projects/github/chatapp/FileTemplates \
  ~/Library/Developer/Xcode/Templates/File\ Templates/ChatApp
```

Sau khi khởi động lại Xcode, mọi Templates dự án bây giờ sẽ được hiển thị trong cửa sổ ‘New File’. 

Nguồn tham khảo: [Create Xcode file templates and share them with your team](https://medium.com/swift-programming/create-xcode-file-templates-and-share-them-with-your-team-6a3af1b800f5)