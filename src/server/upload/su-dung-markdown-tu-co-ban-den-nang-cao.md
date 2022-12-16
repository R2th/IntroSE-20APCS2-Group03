# 1.  Markdown là gì?
Là ngôn ngữ đánh dấu ( markup language) được sử dụng để thêm các yếu tố định dạng như tiêu đề, in đậm/in nghiêng, danh sách... vào tài liệu văn bản của bạn.   
Văn bản viết bằng **Markdown** sẽ được chuyển đổi thành HTML và ngược lại.
# 2.  Tại sao nên sử dụng?
- **Markdown** có thể được sử dụng ở everything . Bạn có thể sử dụng nó để tạo [websites](https://www.markdownguide.org/getting-started/#websites), [documents](https://www.markdownguide.org/getting-started/#documents), [notes](https://www.markdownguide.org/getting-started/#notes),[ books](https://www.markdownguide.org/getting-started/#books), [presentations](https://www.markdownguide.org/getting-started/#presentations),[ email messages](https://www.markdownguide.org/getting-started/#email), and [technical documentation](https://www.markdownguide.org/getting-started/#documentation).  
- **Markdown** ở everywhere. Các website như Reddit và Github đều trợ giúp Markdown và rất nhiều ứng dụng Desktop và Web hỗ trợ nó.
- Chúng ta có 1 ngôn ngữ đánh dấu khác rất là phổ biến chính là HTML . Nó được sử dụng phổ biến trong các ứng dụng sử dụng internet từ các trang web đến nội dung email hay rất nhiều tài liệu hướng dẫn online cũng đều sử dụng html . Tuy nhiên cú pháp của HTML ko phải ai cũng hiểu và hình dung được nên HTML thì nó ko thân thiện vs người dùng lắm. Ví dụ ta có đoạn HTML sau:
```html
<h1>Chào em </h1>
<p>Em tên gì?</p>
<p>Anh quen em ko nhỉ! </p>
<p>Hình như em là vợ tương lai của anh đấy hehe!</p>
```
Nhìn đoạn HTML trên thì việc viết các thẻ mở và đóng thì nó khá lâu và gây khó chịu cho minh rồi. Giả sử với những người ko hay sử dụng HTML như mình ^-^ mà lại hay sử dụng các ký tự \*.()... khi viết văn bản hay gì đấy thì việc nhớ các thẻ, viết chúng rồi hình nhung chúng hiển thị như nào thì nó là cả 1 vấn đề rồi đúng ko?:innocent:   
Thay vì viết phức tạp như HTML để hiển thị nội dung như vậy thì ta sử dụng *Markdown* nhanh và đơn giản hơn nhiều:   
```markdown
# Chào em
Chào em  
Em tên gì?    
Anh quen em ko nhỉ!    
```
# 3.  Cách nó làm việc
Khi bạn viết trong Markdown, text nó sẽ được lưu trữ trong file văn bản gốc ( văn bản thô ) có phần mở rộng là .mh or .markdown. Nhưng sau đó là gì? Cách mà file Markdown của mình đã được định dạng (Formatted) được chuyển đổi thành HTML or 1 tài liệu sẵn sàng để in.   

Câu trả lời đó là bạn cần 1 Markdown Application để có thể xử lý ( biên dịch ) markdown file như: Microsoft Word, Dillinger, VS Code ... để hiển thị văn bản Markdown-formatted.

Markdown Application nó sử dụng 1 cái gì đấy đc gọi là Markdown processor  (thường được gọi là "parser - trình phân tích cú pháp" or "implementation - mình ko hiểu implementation ở đây là gì? Bạn đọc giải thích cho mình với nhes!!! ") để lấy vào 1 văn bản Markdown đã được định dạng thành 1 định dạng HTML ( tức là HTML đấy ) như : Dillinger,  trên VS code thì bạn tham khảo [Compiling Markdown into HTML](https://code.visualstudio.com/docs/languages/markdown#_compiling-markdown-into-html) ...

Xem hình ảnh cho ló rễ hình dung nhể:  
![Markdown illustration](https://d33wubrfki0l68.cloudfront.net/75cdd78aba218a9abbfe91d2ba2cf540a7502d8c/553fa/assets/images/process.png)
# 4.  Sử dụng
## 4.1 - Tiêu đề
```markdown
# h1
## h2
### h3
#### h4
##### h5
###### h6
```
Output:
# h1
## h2
### h3
#### h4
##### h5
###### h6
## 4.2 - Đoạn văn
Sử dụng 1 dòng trống để phân tách 1 or nhiều dòng text. Chú ý là ko được thụt về bằng space or tab nếu ko thì text đó chuyển thành Code block trong markdown. Ví dụ: 
```markdown
Chào em

Em ăn khoai ko
```
Output:  
Chào em

Em ăn khoai ko
## 4.3 - Ngắt dòng
Để ngắt dòng thì ta sử dụng 2 or nhiều dấu cách ở cuối dòng mà bạn muốn cách. VD:   
```markdown
Em như ánh mặt trời.   
Nhìn em anh đã muốn...
```
Output:   
Em như ánh mặt trời.   
Nhìn em anh đã muốn...  
## 4.4 - Nhấn mạnh từ
### In đậm
Có 2 cách:  
```markdown
Ai hay **Ảo tưởng**    
Thì bớt __Ảo Tưởng__ đi.
```
Output:   
Ai hay **Ảo tưởng**   
Thì bớt __Ảo Tưởng__ đi.
### In nghiêng
Cách viết thì giống in nghiêng nhưng chỉ có 1 dấu sao và 1 gạch ngang ở trước và sau của từ.
### Đậm và nghiêng
Có 4 cách nhưng mình chỉ giới thiệu 2 cách mà mọi người hay dùng nhất:   
```markdown
Chủ tịch ***Cuong***   
Vợ chủ tịch ___Ko biết___
```
Output:   
Chủ tịch ***Cuong***    
Vợ chủ tịch ___Ko biết___
## 4.5 - Blockquotes
Thêm > trước 1 đoạn văn.  
```markdown
> Mùa đông lạnh thụt ...
```
Output:   
> Mùa đông lạnh thụt ...
## 4.6 - Danh sách
Thụt 1 or nhiều item trong item cha để có 1 list lồng nhau.   
### Có thứ tự
Các item trong list phải bắt đầu là 1 số + dấu chấm + dấu cách + tên item. **Chú ý**: số ở đây ko phải là số thứ tự của item ( tức là 1 số bất kì >= 0): VD :
```markdown
1. Sản phẩm
2. Liên hệ

6. Cháo lòng
5. Tiết cách
```
Output:    
1. Sản phẩm
2. Liên hệ

6. Cháo lòng
5. Tiết canh
### Ko thứ tự
Các item bắt đầu bằng : 1 dấu * or + or - + dấu cách + tên item
```markdown
* Mùa xuân
- Mùa hạ
+ Mùa thu
* Mùa đông
```
Output:   
* Mùa xuân
- Mùa hạ
+ Mùa thu
* Mùa đông
### Thêm elements
Để thêm các thành phần khác vào trong 1 list mà vẫn duy trì được tính liên tục của list thì thành phần đó phải đc thụt lề bằng 4 dấu cách or 1 tab.   
```markdown
* Xuân đã đến 
    bên em
 * Dáng xuân tuyệt vời
```
Output:   
* Xuân đã đến  
    bên em
* Dáng xuân tuyệt vời 
## 4.7 - Code block
Để định nghĩa, xác định 1 khối code thì ta thụt dòng bằng tab or 4 dấu cách. Đây là cách ko nên dùng vì nó hay gây nhầm lẫn.  
```markdown
    Tết tết tết đến rồi
    Tao tao tao trắng túi rồi
```
Output:   
Do trên viblo ko hỗ trợ code block bằng thụt lề thì các bạn thử ở [đây](https://stackedit.io/app#)
## 4.8 - Thước ngang
Có 3 cách để thước ngang: 3 dấu *** or - - - or ___   
```markdown
***
- - -
___
```
Output:   
- - -
## 4.9 - Links
Xem ví dụ cho rễ hình dung:   
```markdown
Muốn hiểu sâu, nhớ sâu, sau này quên thì hãy viết 1 blog trên [Viblo](https://viblo.asia)
```
Output:  
Muốn hiểu sâu, nhớ sâu, sau này quên thì hãy viết 1 blog trên [Viblo](https://viblo.asia)
### Thêm titles
Nó xuất hiện 1 cái tooltip khi bạn hover vào link.  
```markdown
Hãy viết bài trên [Viblo](https://viblo.asia "Viblo việt nam")
```
Output:   
Hãy viết bài trên [Viblo](https://viblo.asia " Viblo việt nam")
### urls & email address
Để nhanh chóng chuyển 1 url or email thành 1 link thì đặt chúng trong <> (cách viết ngắn gọn hơn trên nhưng ko đc thẩm mỹ và dài :blush::blush:)  
```markdown
<https://www.markdownguide.org>
<fake@example.com>
```
Output:  
<https://www.markdownguide.org>   
<fake@example.com>
### Format links
Tức là làm cho links in đậm hay nghiêng.     
```markdown
I love supporting the **[EFF](https://eff.org)**.
This is the *[Markdown Guide](https://www.markdownguide.org)*.
```
Output:  
I love supporting the **[EFF](https://eff.org)**.  
This is the *[Markdown Guide](https://www.markdownguide.org)*.
### Links kiểu tham chiếu
Hiểu đơn giản là làm cho link mà mình viết trong markdown nó đẹp hơn, gọn gơn thay vì bạn hay để cả url vào trong 1 đoạn text như này:   
```markdown
Ngày xửa ngày xưa có 1 anh tên [mạng xã hội lotus](https://lotus.vn/w/) vừa mới ra mắt đã bị chê lên chê xuống vì người việt ko ủng hộ hàng việt....
```
Thì giờ ta có kiểu khác:   
```markdown
(a) = Ngày xửa ngày xưa có 1 anh tên [mạng xã hội lotus][1] vừa mới ra mắt đã bị chê lên chê xuống vì người việt ko ủng hộ hàng việt....

(b) = [1]: <https://lotus.vn/w/> = (or)
[1]: <https://lotus.vn/w/> "Mạng xã hội lotus việt nam" = (or)
[1]: https://lotus.vn/w/ = (or)
[1]: https://lotus.vn/w/  "Mạng xã hội lotus việt nam" 
```
Output: 
Ngày xửa ngày xưa có 1 anh tên [mạng xã hội lotus][1] vừa mới ra mắt đã bị chê lên chê xuống vì người việt ko ủng hộ hàng việt....

[1]: <https://lotus.vn/w/> "Mạng xã hội lotus việt nam"
Chú ý:  (b) trong đoạn code trên thì bạn có thể đặt ở bất kì đâu trong tài liệu mà bạn đang viết, nếu (b) được đặt ngay sau (a) thì (b) phải cách (a) 1 dòng trống, \[1] trong (a) và (b) phải giống nhau và số 1 trong \[1] là duy nhất ( chỉ có \[1] xuất hiện 1 lần ) nếu tồn tại 2 \[1] thì link nó chọn \[1]  đầu tiên, nếu cái \[1] đầu tiên lỗi thì nó chọn cái thứ 2. Các bạn chạy thử để xem nó như nào nhé tại [đây](https://stackedit.io/app#)
## 4.10 - Images
Cú pháp: 
```markdown
![giá trị alt](Đường dẫn tuyệt đối (absolute-path tên khác là 1 cái url đầy đủ) or đường dẫn tương đối (relative-path : home/views...) "titile - có hoặc ko có title cũng đc")
```
Cụ thể nha các bạn: 
```markdown
![Xinh thế em ơi!](https://znews-photo.zadn.vn/w660/Uploaded/....68232_n_1.jpg "Xinh thật sự <3")
```
Output:   
![Xinh thế em ơi!](https://znews-photo.zadn.vn/w660/Uploaded/cqdhmdxwp/2019_10_18/22196045_1812118665468264_7078060295852768232_n_1.jpg "Xinh thật sự <3")
### Linking Images
Cú pháp ảnh ở trên thì ta cho vào ngoặc vuông \[] + (trong này là url đến 1 page nào đấy), ví dụ nuôn cho nó rễ hiểu.   
```markdown
[![Xinh như tó thế em ơi!](https://znews-photo.zadn.vn/w660/Uploaded/...)](https://news.zing.vn/dan-trai-xinh-gai-dep-chiem-spotlight-nho-loat-anh-mac-dong-phuc-post1003190.html)
```
Output:  
[![Xinh như tó thế em ơi!](https://i.pinimg.com/originals/47/4a/32/474a32757e5d8a3df1858fbcb67a8164.jpg "Xinh hết phần người khác")](https://news.zing.vn/dan-trai-xinh-gai-dep-chiem-spotlight-nho-loat-anh-mac-dong-phuc-post1003190.html)
## 4.11 - Escaping characters
Escaping characters tức là giải thoát cho [các ký tự dùng để định dạng trong markdown](https://www.markdownguide.org/basic-syntax/#characters-you-can-escape). Ví dụ, khi bạn muốn hiển thị như lày: \*Ngọc Trinh* thì trong markdown bạn viết như vậy    là nó in nghiêng cái từ *Ngoặc Trinh*, để hiện thị như bạn muốn thì thêm ký tự: \ vào trước cái mà bạn muốn hiển thị.   
```markdown
\*Bưởi to lắm Trinh ê*
```
Output:   
\*Bưởi to lắm Trinh ê*:stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:   
## 4.12 - Tables
Để tạo bảng ta sử dụng 3 or nhiều dấu gạch ngang (---) và sử dụng pipes (|) để tách các cột.  
```markdown
|Họ và tên | Giới tính|
|---|----------------|
|Sùng a bái | Nam|
|Lò a hính|Nữ|
```
Output:   
|Họ và tên | Giới tính|
|---|----------------|
|Sùng a bái | Nam|
|Lò a hính|Nữ|
### Căn chỉnh
Để căn chỉnh text trong cột sang trái, phải or giữa thì thêm dấu 2 chấm ":" vào trước or sau or cả trước và sau.  
```markdown
|Họ và tên | Giới tính|Dân tộc|
|:---|:----------------:|----:|
|Sùng a bái | Nam|Hơ mông|
|Lò a hính|Nữ|Ê đê|
```
Output:   
|Họ và tên | Giới tính|Dân tộc|
|:---|:----------------:|----:|
|Sùng a bái | Nam|Hơ mông|
|Lò a hính|Nữ|Ê đê|
### Format text
Định dạng text bên trong bảng. Ví dụ, Bạn có thể thêm [links](https://www.markdownguide.org/basic-syntax/#links), [code](https://www.markdownguide.org/basic-syntax/#code) (chỉ có từ hoặc cụm từ trong (\`\`) và ko có [code blocks](https://www.markdownguide.org/basic-syntax/#code-blocks)), và [emphasis](https://www.markdownguide.org/basic-syntax/#emphasis) (nhấn mạnh) : in đậm, in nghiêng...

Ko được thêm headings, blockquotes, lists, horizontal rules, images, and HTML tags.    
### Escaping pipe characters
Bạn có thể sử dụng (|) trong bảng bằng cách dùng mã kí tự HTML của nó là: `&#124;`
## 4.13 - Fenced code blocks
Ta có cách để tạo 1 code blocks trong markdown là dùng 4 dấu cách or tab nhưng cách này nó ko tiện lợi, rễ gây nhầm lẫn . Thay vào đó ta sử dụng hàng rào (fence) để tạo code blocks thay vì thụt lề như trước. Phụ thuộc vào Markdown processor or editor của bạn mà chọn fence phù hợp. Sử dụng 3 (\`\`\`) or 3 (\~\~\~) ở trước và sau 1 code block.  
```json
{
"firstname":"cuong",
"lastname":"Nguyen",
"age":20
}
```
Output:           
Xem chi tiết tại [đây!](https://www.markdownguide.org/extended-syntax/#fenced-code-blocks)
### Systax highlight
Nhiều Markdown processor trợ giúp systax highlighting cho đoạn code đc rào chắn ( fenced code blocks). Tức là thêm các màu nổi bật cho các đoạn mã đc viết bằng của các ngôn ngữ khác nhau. Chỉ định ngôn ngữ mà bạn viết trong code block vào sau 3 \`\`\` ở phía trước đoạn code.  Tham khảo tại [đây!](https://www.markdownguide.org/extended-syntax/#syntax-highlighting)
## 4.14 - Heading IDs
- Nhiều Markdown processor trợ giúp ID tùy chỉnh cho tiêu đề (heading) - 1 vài processor thì tự động thêm ID cho heading. Thêm ID này thì ta có link trực triếp đến tiêu đề mà ta đặt ID này và ID này thì ta cũng chỉnh sửa được chúng với CSS.    
- Cú pháp : #(##,###...) + tên heading + {# + ten-ID}     
- Xem VD ở [Heading IDs
](https://www.markdownguide.org/extended-syntax/#heading-ids)

### Linking to Heading IDs
Bạn click vào link là nó nhảy đến heading mà có ID trùng với ID trong link của bạn.    
Xem chi tiết ở [Linking to Heading IDs](https://www.markdownguide.org/extended-syntax/#linking-to-heading-ids) khi bạn click vào Heading IDs trong bảng là nó nhảy lên tiêu đề Heading IDs.  
## 4.15 - Strikethrough
Sử dụng (~\~) trước và sau 1 từ or cụm từ.    
```markdow
~~Em là Hương~~. Anh nhớ là anh chén em rồi mà hương.
```
Output:   
~~Em là Hương~~. Anh nhớ là anh chén em rồi mà hương.   

# 5. Tổng Kết 
- Còn 1 số phần khác như: [Task Lists](https://www.markdownguide.org/extended-syntax/#task-lists),... thì bạn tham khảo trên trang chủ của [Markdown](https://www.markdownguide.org/) né!:innocent::innocent:
-  1 số các chức năng khác mà bạn có thể làm trên viblo ở [đây!](https://viblo.asia/helps/cach-su-dung-markdown-bxjvZYnwkJZ#_viblo-advanced-markdown-embedment-16)
- Bài viết của mình có chỗ nào sai hay ko đúng thì mọi người góp ý cho mình nha!
- ***Mình ko hiểu thuật ngữ Implementation***  này nên các bạn biết thì comment ở dưới cho mình tham khảo với nha! thank you!:heart_eyes::heart_eyes::heart_eyes::heart_eyes:   

*Bạn có thể thực hành viết Markdown ở [Đây](https://stackedit.io/app#)*
#### Nguồn tham khảo
https://quantrimang.com/markdown-la-gi-va-tai-sao-nen-hoc-no-ngay-hom-nay-159018  
https://viblo.asia/helps/cach-su-dung-markdown-bxjvZYnwkJZ#_mo-dau-0    
https://www.markdownguide.org/   
https://www.codehub.vn/Markdown-La-Gi