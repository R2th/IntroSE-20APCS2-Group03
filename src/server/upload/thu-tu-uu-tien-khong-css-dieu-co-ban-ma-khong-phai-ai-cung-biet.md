Các bạn có muốn học css không? Có khát vọng làm Frontend developer không? Có muốn 1 Id ăn 3 class không? Vậy thì hãy theo tôi, chúng ta sẽ tìm hiểu về một thứ cơ bản nhưng phức tạp, selector của CSS và thứ tự ưu tiên.

## Selector

CSS có thể phân làm 6 loại
* element (Vd: div, span,...)
* pseudo-element (Vd: :before, :after)
* class (Vd: .class-1, .class-2,...)
* pseudo-class (vd: :last-child, :first-child,...)
* attibute (vd: [href], [src])
* id (vd: #pages, #pagination,...)
* inline style
* universal selector (*, +, >, ~)

## Thứ tự ưu tiên

Dù là mời nghịch css thì chắc các bạn cũng nhận ra những thứ cơ bản như thằng dưới đè thằng trên, thằng id thì lớn hơn class, và thằng inline thì "dưới một người trên vạn người", hay selector càng chi tiết thì ưu tiên càng cao,...  Nhưng như vậy thì chẳng lẽ mỗi element lại phải có 1 id, hay file css lại toàn những đoạn selector dài đến đau mắt? Không đâu, CSS quy định cho id, class,.. nhưng giá trị khác nhau,  dựa vào đó, chúng ta có thể tối ưu được selector hợp lý.

### Bắt đầu với **universal selector**

![](https://images.viblo.asia/f28e41e8-e65c-445a-8d6e-db72ebfac58d.png)

**Point**: 0 - 0 - 0

**Hiệu ứng**: Là một selector có tác dụng bổ trợ (ngoại trừ *), một khi xuất hiện, nhưng selector gần nó sẽ đc liên kết tuỳ theo universal selector được "triệu hồi". Nó hoàn toàn không có giá trị khi tính thứ tự ưu tiên.

**VD**: 
* `*` = 0-0-0
* `* > *` = 0-0-0
* `* + * + *` = 0-0-0

### Element và pseudo-element

![](https://images.viblo.asia/fb3309f4-8502-451c-85c8-fe8eef571ed2.png)

**Point**: 0 - 0 - X

**Hiệu ứng**: Với mỗi element hoặc pseudo-element xuất hiện trong selector, `X` sẽ được tăng thêm 1 điểm. 

**VD**: 
* `div` = 0-0-1
* `div div` = 0-0-2
* 10 element = 0-0-10

### Class, pseudo-class và attribute

![](https://images.viblo.asia/ee097a88-03ec-400b-b664-5f7d856913d2.png)

**Point**: 0 - X - 0

**Hiệu ứng**: Với mỗi class, pseudo-class, hoặc attibute xuất hiện trong selector, `X` sẽ được tăng thêm 1 điểm.

**VD**: 
* `.list` = `*:first-child` = `[type="text"]` = 0-1-0
* `div.list` = `li:first-child` = `input[type="text"]` = 0-1-1
* `div input[type="text"]` = 0-1-2
* `.list .items` = `.list.items` = `.item:first-child` = 0-2-0
* `input[type="text"]:not(.class)` = 0-2-1
* 10 class + 11 element = 0-10-11

*Chú ý: độ ưu tiên áp dụng với cả pseudo-class :not(x), nhưng nó có hơi đặc thù khi mà selector x được chọn sẽ không thay đổi giá trị nhưng những selector khác x sẽ được tăng độ ưu tiên*

### ID

![](https://images.viblo.asia/7b556076-e637-486a-a73d-f616be713699.png)

**Point**: X - 0 - 0

**Hiệu ứng**: Với mỗi ID xuất hiện trong selector, `X` sẽ được tăng thêm 1 điểm.

**VD**: 

### Inline style

![](https://images.viblo.asia/57e5e11b-a150-4bdf-83a2-211cb7493449.png)

**Point**: 1 - 0 - 0 - 0

**Hiệu ứng**: là dạng chỉ mặt, đặt tay rồi, thuộc hàng COCC, dưới một người trên vạn người, là một sự phiền phức, rắc rồi, nhưng đôi khi vẫn phải dùng đến :upside_down_face:


### !important

![](https://images.viblo.asia/85805642-6079-4bca-8e64-75d48049aa45.png)

**Point**: 1 - 0 - 0 - 0 - 0

**Hiệu ứng**: Dù chỉ là giá trị thêm trong thuộc tính của css, nhưng nó lại thuộc hàng máu mặt nhất, đứng đầu thiên hạ, hiệu triệu quần hùng, một khi anh xuất hiện thì toàn dân dẹp đường cho anh thả ga chạy, một sự cucsuc không hề nhẹ :slightly_smiling_face:

## Kết luận

Nếu bạn dùng một thư viện CSS như tailwind thì cũng không cần lo nhiều về vấn đề này khi mà nó đã tách mỗi thuộc tính thành 1 class riêng, nhưng biết thêm một chút để tuỳ chỉnh thì cũng chả hại ai phải không nào :laughing:

*Nguồn tham khảo: [Css Specificity](https://cssspecificity.com/)*