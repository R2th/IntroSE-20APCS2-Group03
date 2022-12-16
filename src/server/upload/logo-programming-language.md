Khởi đầu cho [series](https://viblo.asia/s/programming-language-Wj53OmY856m) tìm hiểu các ngôn ngữ lập trình, mình sẽ bắt đầu với 1 ngôn ngữ lập trình khá thú vị. Đó là ngôn ngữ lập trình **Logo**.
### Lí do
Lí do mà mình chọn Logo để làm bài đầu tiên cho series này là bởi vì, ngay đến trước khi viết bài này, mình mới nhận ra rằng, đây chính là ngôn ngữ lập trình đầu tiên mà mình được tiếp xúc, từ khi học cấp 1, chứ không phải là PASCAL hồi học cấp 2 như mình vẫn luôn nghĩ.
#####
Ngày đó với một đứa trẻ chưa đến 10 tuổi thì khái niệm về ngôn ngữ lập trình là cái gì đó khá là xa vời. Mình chỉ biết rằng đó giống như 1 trò chơi, có các lệnh để mình điều khiển chú rùa di chuyển qua lại để vẽ ra các hình thù theo đề bài.  Mình cùng một đứa bạn đã hoàn thành hết các bài tập được đưa ra và đây có thể nói là con 10 đầu tiên của mình ở môn Tin, cũng vì thế mà mình mới nhớ được là đã học nó, cho đến tận hôm nay :stuck_out_tongue_closed_eyes:
### Giới thiệu
Logo là một ngôn ngữ lập trình được phát triển vào những năm 60 của thế kỉ 20 tại công ty Bolt Beranek and Newman, Cambridge, bởi 3 người là W. Feurzeig, D. Bobrow and S. Papert.
Mục đích của họ là tạo ra một ngôn ngữ lập trình dễ hiểu để hướng tới đối tượng là trẻ em, với giao diện trực quan thay vì chỉ là những dòng code khô khan.

#####
Logo có nhiều sự tương đồng với Lisp, một ngôn ngữ xuất hiện từ rất sớm (1958) và vẫn được sử dụng rộng rãi cho đến hiện tại, trong lập trình AI. Ngoài ra Logo còn có 1 số chức năng của các ngôn ngữ lập trình khác thời bấy giờ, ví dụ như PASCAL.
#####
Logo có rất nhiều phiên bản khác nhau (170), có 1 số phiên bản free và open-source
### Đặc trưng
#### Interactivity
Chủ yếu các phiên bản của Logo đều là interpreted language (ngôn ngữ thông dịch), có nghĩa là không cần thông qua 1 bước dịch nó sang mã máy rồi mới chạy chương trình. Nhờ hướng tiếp cận này mà nó mang lại cho Logo sự phản hồi trực quan và nhanh chóng mỗi khi bạn gõ lệnh. Message báo lỗi cũng rất cụ thể và dễ hiểu. VD:
```
fowad

//I don't know how to fowad
```
Không có lệnh nào mặc định hay hàm nào được định nghĩa có keyword là fowad cả
```
forward

//Not enough inputs to forward
```
Khi bạn đã gõ đúng keyword nhưng chưa truyền thêm tham số

```
forward 100
```

#### Modularity & Extensibility
Những chương trình được viết bằng Logo thực ra là một chuỗi các lệnh được thực hiện tuần tự. Với các keyword là tên các hàm, sau đó là các thông tin đi kèm (parameter). Mỗi dòng tương ứng với 1 lệnh. Bắt đầu bằng cách đặt tên hàm, với cú pháp là keyword `to` + `tên hàm`. Kết thúc chương trình bằng keyword `end`.

Sau đây là chương trình vẽ hình vuông

```
to square
repeat 4 [forward 50 right 90]
end
```

và sử dụng lại nó trong 1 hàm khác

```
to flower
repeat 36 [right 10 square]
end
```

Tương tự như vậy, `flower` lại trở thành 1 phần của 1 thứ to lớn hơn :v 1 khu vườn chẳng hạn :v 

```
to garden
repeat 25 [set-random-position flower]
end
```

`set-random-position` không phải là 1 hàm mặc định đâu nhé, bạn hãy tự đi mà viết nó đi :laughing:

*Fun fact: Mỗi phiên bản Logo thì lại có những hàm mặc định khác nhau đấy.*

Với Logo bạn có thể xây dựng được một hệ thống phức tạp bằng cách ghép nhặt từng thành phần nhỏ hơn. Nếu coi Logo như một cuốn từ điển thì việc lập trình cũng giống như việc bạn học thêm các từ vựng mới từ các từ vựng có sẵn. Giống với cách mà con người chúng ta học ngoại ngữ đúng không nào.

#### Flexibility
Logo làm việc với word và list. Một word trong Logo là một chuỗi các kí tự. Một list trong logo là 1 tập hợp có thứ tự các word/ list hoặc trộn lẫn cả 2. Các số thì cũng là word, nhưng nó đặc biệt hơn vì ta có thể làm các phép toán với nó.

Nhiều ngôn ngữ lập trình rất chặt chẽ trong việc giới hạn kiểu của dữ liệu. Điều đó giảm bớt công việc của máy tính, nhưng lại làm tăng công việc cho developer (định luật bảo toàn thôi mà :D ). Nên khi sử dụng số thì ta phải định nghĩa xem nó là số nguyên hay số thực,.. Nhưng với logo thì bạn không cần phải lo đến vụ đó nữa. Hãy xem với Logo thì nó sẽ được xử lí ra sao:

```
print 3 + 4
7

print 3 / 4
.75
```

```
print word "apple "sauce
applesauce

print word "3 "4
34

print 12 + word "3 "4
46
```

Phép đệ quy để tính giai thừa:

```
to factorial :number
if :number = 1 [output 1]
output :number * factorial :number - 1
end
```
```
print factorial 3
6
print factorial 5
120
```
Hay đảo ngược thứ tự các từ trong list

```
to reverse :stuff
ifelse equal? count :stuff 1
[output first :stuff]
[output sentence reverse butfirst :stuff first :stuff]
end

print reverse [apples and pears]
pears and apples
```

Nếu thấy thú vị hãy xem thử một chương trình đơn giản viết bằng Logo của  [Brian Harvey](https://people.eecs.berkeley.edu/~bh/logo-sample.html).


#### Enhancements
Những thứ vừa được giới thiệu bên trên là những tính năng cơ bản ở tất cả các phiên bản của Logo. Một vài phiên bản của Logo còn có cả những tính năng tăng cường khác.

Ví dụ như phiên bản 'hướng đối tượng' của Logo mang tên Object Logo dành cho Macintosh.

Phiên bản MicroWorlds Logo thì có hỗ trợ multi-tasking vậy nên nhiều process có thể chạy cùng lúc. Một phiên bản khác cũng có cùng tính năng như vậy đến từ Control Lab, mang tên LEGO Logo.

### Tổng hợp
Logo đã từng là một ngôn ngữ rất phổ biến, ngày nay thì có một ngôn ngữ lập trình khác cũng hướng đến đối tượng trẻ em là **Scratch**
#####
Nếu bạn cảm thấy hứng thú về Logo và muốn tìm hiểu thêm, có thể tham khảo 2 cuốn sách sau của [Brian Harvey](https://el.media.mit.edu/logo-foundation/resources/books.html#CSLS) và [Michael Friendly](https://el.media.mit.edu/logo-foundation/resources/books.html#advanced). Hoặc là down thử Logo về và tìm lại tuổi thơ tại [đây](https://el.media.mit.edu/logo-foundation/resources/software_hardware.html) hoặc là [đây](https://turtleacademy.com/).


-----
Hãy chia sẻ/góp ý về bài viết ở phần comment bên dưới nhé.
#####
*HAPPY CODING!!*
#### Reference
https://www.whoishostingthis.com/resources/logo/

https://wiki.kidzsearch.com/wiki/Logo_(programming_language)

https://el.media.mit.edu/logo-foundation/what_is_logo/logo_programming.html