Bài viết dưới đây mình dịch của một bạn trẻ người Nhật, sinh năm 98, tự học lập trình và làm được 1 app khá hữu ích cho đồng nghiệp của bạn ý.
Hy vọng các bạn sẽ có thêm nhiều cảm hứng trong việc tự học, tự mình phát triển các ứng dụng nha. 

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Xin chào các bạn.

Trên diễn đàn Qiita, tôi được đọc, học được rất nhiều từ các bài viết thú vị của các bạn, tôi cảm thấy rất vui. Cảm ơn tất cả mọi người.

Nhân đây, thì tôi cũng muốn kể một câu chuyện. Trong thời gian làm thêm tại khách sạn Hachijo jima tại Tokyo, tôi đã được tạo điều kiện để làm ra một app hệ thống tự động in hóa đơn.

Tất cả các chức năng của app hệ thống này, tôi đã chuyển sang bài viết trên blog sang thành video để giải thích. 


Xem giải thích toàn bộ chức năng của app: bấm vào link sau: giải thích toàn bộ chức năng: [bấm vào đây (tiếng Nhật)](https://www.yoji0806.com/entry/2019/05/27/%E6%A5%AD%E5%8B%99%E7%94%A8%E3%83%BB%E4%BC%9D%E7%A5%A8%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E3%82%A2%E3%83%97%E3%83%AA%E3%81%AE%E8%AA%AC%E6%98%8E)

**Lời cảm ơn**

Gửi tới tất cả mọi người đang làm việc tại khách sạn.
Bản thân tôi giành được cơ hội quý báu này; có thể phát triển app cho đến bản hoàn thiện cuối cùng là nhờ có sự giúp đỡ nhiệt tình; sự khoan dung với những lỗi lầm của các leader, staff của khách sạn.

Lúc đầu khi mới đưa app vào sử dụng, cũng đã gây ra các phiền toái cho mọi người, như: Ra hóa đơn chậm, in ra 2 hóa đơn...v.v Thành thật xin lỗi. 
Tuy nhiên, mỗi ngày, sau khi mọi người sử dụng app, tôi đều nhận được feedback rất nhiệt tình. Vì vậy, việc phát triển, chỉnh sửa app diễn ra rất nhanh chóng, thuận lợi. 

Hiện tại, app đã được mọi người trong khách sạn đón nhận, khen ngợi:「Nhờ có app, mọi người làm việc đỡ tốn công hơn, tôi rất cảm kích!」「Đây là app dễ sử dụng nhất từ trước tới nay」...v.v Bản thân làm được một việc giúp mọi người đỡ vất vả, tôi cũng thấy rất vui sướng.

**Lời cảm ơn đến Firebase(Google)**

Cảm ơn Firebase và Google!!!

Nhờ có Firebase và Google, tôi đã có thể phát triển được app không cần server (server less) và không tốn bất cứ chi phí nào cho việc vận hành.
Lần tới, tôi sẽ mua Pixel 3a.

**Và đây là app tôi đã làm được**

![](https://images.viblo.asia/6c5a6278-9467-4682-acbe-1018a19913e7.png)

Bên trên là ảnh minh họa thôi, các bạn **xem đầy đủ video thì bấm vào link này nhé** https://twitter.com/i/status/1133707670618136577[](https://twitter.com/i/status/1133707670618136577)

Twitter của tôi: 山本 燿司
@baske0806

### App đã làm---Sơ đồ thiết kế---
![](https://images.viblo.asia/e7082540-8466-48ab-b19d-8833ba362840.png)



👆Trong sơ đồ trên, vẫn còn 1 số phần không hiển thị hết. 
Tuy nhiên, nghiệp vụ của app mà tôi đã làm như sau:


* Staff đến chỗ khách hàng, nhập order vào Tablet → Ghi thông tin đã order vào DB
* Thiết bị (Fire HD10) tại bar counter sẽ listen sự thay đổi của DB, rồi lấy dữ liệu từ DB, và gửi đến Printer thông qua Bluetooth　→ **In hóa đơn**

Tôi đã thực hiện những việc này bằng **Kotlin** & **Firebase Realtime Database** trên **Android**.

(Lý do tôi chọn máy và Tech: tôi sẽ trình bày sau)

**Giới thiệu một chút về bản thân tôi**

Tôi sinh năm 1998, đang theo học khoa kinh tế của đại học Kobe. Hiện tại tôi đang nghỉ học (và không có ý định quay lại trường). Tôi vốn là sinh viên ngành xã hội, những tưởng sẽ không có duyên với việc lập trình. Tuy nhiên, khoảng nửa năm trước đến nay, tôi bắt đầu học lập trình từ quyển sách Tutorial dành cho Kotlin. Tôi cực kỳ thích Kotlin.

Sắp tới đây, tôi sẽ làm một app nào đó bằng  **Flutter** & **Firebase** rồi public.
Thời gian tới, tôi muốn đến Tokyo và làm việc tại đây. Nếu có duyên, tôi rất mong nhận được sự giúp đỡ của mọi người.

Nguyên do tôi đã tạo ra app này.
Ban đầu, tôi đã làm part time cho nhà hàng trực thuộc khách sạn. Khi có thời gian rảnh, tôi đã làm 1 app cá nhân.

Nhà hàng trong khách sạn - nơi tôi làm thêm: Mời các bạn xem page [公式ホームページ](http://www.lidohotels.jp/park/)

Khách sạn này có sức chứa tối đa là 200 người. Nhà hàng thì có:

* Tổng cộng 149 chỗ 
* Là nhà hàng loại lớn, có phòng tiệc riêng (40 chỗ) 

Khi làm việc tại nhà hàng, tôi đã thấy có nhiều điểm mà nhà hàng cần cải thiện.
Một trong số đó (và cũng là vấn đề lớn nhất) là: flow từ lúc  **Order đồ uống  → mang đồ đến chỗ của khách** và việc **Xử lý tính toán hóa đơn**.

Công việc tại nhà hàng, trừ những lúc mở cửa, đóng cửa thì gồm những việc chính sau:
1. Hướng dẫn khách hàng ngồi vào chỗ　→　Thực hiện order đồ uống lần đầu tiên
2. Đến chỗ khách hàng đưa đồ ăn (nếu là chọn món Nhật, thì có khoảng 7 món) và dọn các đĩa bẩn.
3. Khi nhận thêm Order đồ uống, phải dừng các việc đang làm để làm đồ uống và mang ra cho khách.


Vấn đề là việc order và làm đồ uống ở bước 1, và bước 3 đang bị tắc nghẽn => Cần cải thiện.

Từ trước tới giờ, khi  order đồ uống, flow sẽ theo như ảnh dưới đây.
![](https://images.viblo.asia/038be635-5fa0-4fb6-833f-74ba91e3704a.png)

Như vậy, **1 nhân viên phục vụ sẽ phải làm toàn bộ chuỗi các nghiệp vụ**.

Trong khoảng thời gian bữa tối, có 3 quãng đông, là (**18 giờ~/18 giờ 30 phút~/19 giờ~**). 
Mỗi quãng có từ 20～50 khách sẽ đến nhà hàng cùng lúc. Nhân viên phục vụ sẽ phải đến từng chỗ ngồi của khách, ghi order và trở về quầy bar, rồi mang đồ uống cho khách. Như vậy, nếu không mang đồ uống đầu tiên ra sớm, thì toàn bộ các công việc phía sau sẽ bị ùn ứ lại.

Khi order thêm cũng vậy. Do công việc bị gián đoạn giữa chừng nên hiệu suất làm việc cũng sẽ bị giảm xuống.

Thêm nữa, khi tất cả khách hàng đồng loạt ra về, nhân viên sẽ phải **ghi đơn giá mỗi đồ uống vào từng hóa đơn**, rồi **lấy máy tính để bàn (loại dùng để tính tiền) để tính tiền**. Sau đó ghi tổng tiền vào hóa đơn (khi đông, có tận hơn 100 khách lận).

Bản thân tôi muốn bỏ thao tác này đi, nên đã tạo ra 1 app dùng thử. Sau đó đưa cho quản lý và leader của khách sạn xem. Rất may, các anh chị đã nói:  “Uh, chúng ta thử làm xem sao”. Vì vậy, tôi đã quyết định phát triển app hệ thống này.

### Flow các thao tác nghiệp vụ sau khi đưa app hệ thống mới đi vào sử dụng

Người phục vụ bàn sẽ để thiết bị (Fire7) vào trong túi. Thiết bị dùng để truyền dẫn tín hiệu và máy in sẽ được đặt tại bar counter. 

*Nhân viên phục vụ nhận order* không cần phải chạy về bar counter nữa. Sau khi nhập xong order, họ tiếp tục đến bàn tiếp theo để nhận order của khách hàng khác.

*Nhân viên tại bar counter (pha chế)* sẽ lần lượt xem các hóa đơn được in, làm đồ uống, đặt đồ uống và hóa đơn lên khay.  Sau đó, *những nhân viên đang rảnh rỗi*, sẽ mang bưng khay ra chỗ ngồi đã được ghi trong hóa đơn. (Chồng hóa đơn ngày càng dày hơn)

Cứ như vậy, mọi thao tác đã được thực hiện theo cách **chuyên môn hóa** hơn！
Hơn nữa, **đơn giá cho mỗi đồ uống cũng đã được ghi trong một hóa đơn, nên không cần lấy từng hóa đơn cho từng lần order ra cộng dồn, để ra kết quả cuối cùng**.

### Lý do chọn kĩ thuật, máy móc đã dùng

### Về phần cứng

**Why Fire7 ?**

Trước khi tôi đến làm việc tại khách sạn này, bên phía quản lý khách sạn cũng đã thử dùng 1 dịch vụ sao kê khác. Nó cũng được cài đặt trên máy Fire 7. (Tuy nhiên kết cục là: hình như khách sạn không đưa dịch vụ đó vào sử dụng)
Ngoài ra, thì thiết bị Fire 7 lại có kích thước vừa khít với chiếc túi nằm ở phía trước tạp dề nhân viên phục vụ bàn thường đeo.

**Why（Thermal Printer) StarPrnt TSP650||？**

Là máy của công ty Star Micronic, nên rất an tâm về độ tiện dụng, chính xác. SDK cũng rất ổn, hơn nữa giá cả cũng rất hợp lý (chưa tới 4 man yên ~ 8.4 triệu VND)
Model này còn hỗ trợ truyền gửi tín hiểu bằng Bluetooth, tốc độ in cũng nhanh số 1, nên nhà hàng đã quyết định mua máy này.

### Về phần mềm

**Why Android？**

Ban đầu khách sạn đã có sẵn thiết bị Fire. Bản thân tôi ngay từ đầu cũng chỉ toàn học Android, nên đã quyết định chọn Android để phát triển app. (Fire OS là hệ điều hành độc lập, tuy nhiên hầu như đều giống Android). Những sự ngẫu nhiên này quả thật rất may mắn.

**Why Kotlin?**

Do tôi đã bắt đầu học lập trình với Kotlin:D

**Why Firebase？**

Ban đầu tôi nghĩ là sẽ dùng AWS hoặc Azure. Tuy nhiên Firebase lại có mức dùng miễn phí (Mà  dung lượng lại lớn nhất). Tính năng của DB cũng là cao nhất, nên tôi thấy dùng Firebase là đủ rồi. (Bonus thêm còn có xử lý đồng bộ Realtime và offline).

👇 Trong một ngày, số khách đến ăn tối sẽ khoảng 100 người. Với dung lượng này, thì vẫn thoải mái.

![](https://images.viblo.asia/35f6e023-e0f6-49a4-a549-93c6252a7948.png)


**Why Firebase RealtimeDB？**

Về phần này, tôi cũng khá lo lắng đắn đo về FireStore. Tuy nhiên cuối cùng tôi đã chọn RealtimeDB. Lý do là vì:
* Realtime DB là  Key-Value => tốc độ cao.
* Không cần Querry nặng - là đặc trưng của FireStore
* ~~FireStore là bản beta, nên tôi cảm thấy không thoải mái lắm~~.

Tuy nhiên, sau khi suy nghĩ kĩ thì tôi thấy là: với khoảng 130 khách, thì thông tin order chỉ rơi vào tầm khoảng **500B**, nên sẽ không xảy ra thay đổi tới mức gây tốn nhiều dung lượng.

Ngoài ra, gần đây tôi mới biết là: **phía FireStore đang tận dụng tối đa infra của Google**. Nên sau này, có lẽ Google sẽ đẩy mạnh việc giới thiệu quảng bá cho Fire Store.
~~Tuy nhiên, tôi vẫn băn khoăn vì nó vẫn là bản beta β.~~

Tôi dự định sẽ tiếp tục sử dụng Fire store trong lần phát triển dự án cá nhân tiếp theo của mình.

### Giải quyết các vấn đề

Từ phần này trở đi, tôi sẽ viết các vấn đề khúc mắc khi phát triển dự án và cách mà tôi đã giải quyết chúng.

### Hiển thị tất cả thông tin trong 1 tờ hóa đơn.

Do tính chuyên môn hóa khi phân chia công việc ra cho 3 role: *người nhận order, người làm đồ uống, người bê đồ uống cho khách*, nên cần phải thực hiện việc truyền đạt thông tin thông qua 1 tờ hóa đơn duy nhất. 

**Những thông tin để làm đồ uống**

* Tên đồ uống (hoặc tên sản phẩm)
* Cách thức uống (pha rượu với nước nóng, chanh hay với đá...v.v)
* Option tùy chọn nếu có (uống nhiệt độ thường, thêm chanh, thêm muối...v.v)

**Để bê đồ đến bàn** 

* Số bàn

**Những thông tin để tính tiền**

* Lịch sử đã order và tổng số tiền của bàn đó
* Đơn giá các loại đồ uống (sản phẩm)
* Mã số phòng (Do nhà hàng này có đánh số phòng - khu vực khi tính tiền)

Tất cả các thông tin trên phải được điền đầy đủ trong 1 tờ hóa đơn.
Đầu tiên, tôi đã nghĩ rằng: nếu sử dụng SDK của StarPrnt thì sẽ được tự động phân bổ các vùng in trên hóa đơn, có vẻ sẽ ổn.(nhưng đây chỉ là mong đợi của tôi thôi).

Tuy nhiên, **trong thực tế, thì tôi phải tự mình điều chỉnh template, số dòng, font  size.**
Việc này cực kỳ vui luôn. Kể từ lúc bắt tay vào làm template cho hóa đơn, tôi đã học được rất nhiều điều, đi hết từ ngạc nhiên này đến ngạc nhiên khác. “Wow, cách này thật dễ dùng..vv” “Tuyệt vời, không hiểu sao họ lại làm được như vậy.” Chính tôi cũng phải thốt ra những lời như vậy đấy các bạn ạ =))

Tôi định show cho các bạn xem code. Tuy nhiên nếu copy code vào bài viết này, thì bài này sẽ cực dài. Vì thế, tôi đã tổng hợp Flow in hóa đơn trong 1 bài viết khác.

Nói qua một chút thì: để căn chỉnh chiều ngang, chiều dọc, thì bạn phải chuyển tất cả các ký tự về dạng Full-width. Cần phải tính toán và điền khoảng trắng thích hợp, và sao cho các con số (tiền) đều nằm trên cùng 1 hàng.👇

(Do size Half-width không phải nhỏ bằng một nửa size Full-width, nên nếu không thử cẩn thận, thì chữ rất dễ bị lộn xộn)

```
  var order = Transliterator.getInstance("Halfwidth-Fullwidth").transliterate(orderList[x])

   if (order.count() >= 18){
         order = order.substring(0, 18)
    }

   val size = order.count()
   val rest = 22 - size
   data = (order + "　".repeat(rest - 3) + qList[x] + "\n")    
```

Để giải quyết vấn đề này, tôi đã làm phép thử - sai. Sau nhiều lần, thì tôi cũng đã giải quyết được vấn đề, tạo được template khá ổn cho tờ hóa đơn.

![](https://images.viblo.asia/766f0416-1d38-47f5-9869-21ebd54206a1.png)

Trong quá trình làm, tôi đã chú ý tới những điểm dưới đây:

* Những thông tin quan trọng đối với khách hàng, thì cần phải **IN TO, IN ĐẬM**. (Tại nhà hàng  này có khá nhiều khách hàng lớn tuổi, nên tôi đã cố gắng tạo ra layout dễ nhìn)
* Những thông tin không quan trọng đối với khách hàng (Ngày giờ, cách làm đồ uống, mã số thiết bị) thì ghi chữ bé lại.
* **Chia block cho mỗi lượt order**. (Người làm đồ uống tại quầy bar sẽ luôn làm đồ uống được ghi tại block cuối cùng).
 Ví dụ, khi khách hàng order đồ uống lần 2, thì người pha chế chỉ đọc block cuối cùng trong hóa đơn (order của lần 2) và làm đồ uống.

Trong quá trình làm, tôi đã luôn tâm niệm rằng: layout của hóa đơn nên làm như thế nào để khách hàng dễ hiểu. Cuối cùng, tôi đã chọn cách chia block, giúp khách hàng hiểu được họ đã order những gì trong mỗi lần gọi phục vụ. 

Bằng cách này, chỉ cần liếc hóa đơn 1 cái là *khách hàng* sẽ hiểu ngay: À, tôi đã gọi những đồ này, tổng tiền là từng này. Còn *người làm đồ uống (pha chế)* cũng sẽ hiểu được là cần làm cái gì. *Người bưng đồ ra bàn* cũng biết là cần bưng tới đâu. 

Để thực hiện việc chia mỗi lượt order thành block riêng, thì cần phải xem xét, sửa **thiết kế DB** một chút.
Những vấn đề cần lưu ý khi thiết kế Database tôi sẽ trình bày sau. Về tổng quát, tôi đã sử dụng **NoSQL - rất linh hoạt và dễ thao tác**.

### Loại trừ tương tranh (mutual exclusion) của máy in

Phần này khiến tôi rất đau đầu. Đầu tiên, do không biết về cơ chế “Loại trừ tương tranh của máy in” , nên tôi đã lên Google search thử, nhưng không tìm được thông tin nào giúp ích. Sau đó, tôi đã thảo luận với các mentor trên web service có tên là [MENTA](https://menta.work/) và ngay lập tức tìm được cách tháo gỡ vấn đề.

Chỉ cần dùng câu lệnh Kotlin(Java) vô cùng đơn giản.

```
@Syncronized
fun a (){
//Xử lý
}
```

> 👆Chỉ cần nhập  @Syncronized vào tham số đơn giản như trên, tôi đã có thể thực hiện được việc “Loại trừ tương tranh của máy in”.
Sau đây, tôi sẽ giới thiệu tới các bạn phần thiết kế code. Tôi đã thực hiện xử lý 

**Load dữ liệu từ DB→ Tạo thông tin cho hóa đơn → In → Initialize (khởi tạo từ đầu)**

 trong tham số đã thực hiện việc “Loại trừ tương tranh cho máy in” 
 
Hiện tại, kể cả khi có 13 order được thực hiện đồng thời, thì máy in vẫn in được thông tin một cách chính xác.

### Thiết kế DB

Firebase RealtimeDB không phải là Relational model, mà là NoSQL model - lưu trữ dữ liệu ở dạng JSON Tree.
Bản thân tôi hầu như chưa từng động tới DB bao giờ cả, nên ngược lại, tôi không cảm thấy khó chịu nào khi phát triển cả.
Có hai điểm quan trọng trong model này.
* **Không tạo nest tầng sâu** để không load các dữ liệu thừa
* **Làm phẳng (không chuẩn hóa)** để phát hiện ra các dữ liệu quan trọng một cách hiệu quả hơn.
* 
Thêm nữa, với app này, khi suy nghĩ cách thiết kế DB, tôi luôn suy nghĩ về các vấn đề sau đây, và thực hiện thiết kế DB.

* **Chia block cho mỗi lần order** (Lý do: tôi đã ghi ở trên)
* Có thể in được Hóa đơn một cách đơn giản

Kết quả sau một thời gian mày mò thiết kế của tôi như dưới này đây.👇！
(Chỉ order của bàn số 11)
![](https://images.viblo.asia/5fac13f2-6ec6-4490-896d-0d57c2be1fb0.png)

RealtimeDB có thể tạo được tối đa tới nest thứ 34. Tuy nhiên, ở đây tôi đã giới hạn chỉ đến 5 lần.

Ngoài ra, dữ liệu nào cũng được gắn kèm với mã số bàn  (**T**able **N**umber) (trong ảnh là **TN 11**). Do đó kể từ lần order thứ 2 trở đi, sau khi nhập mã số bàn, sẽ chuyển tới màn hình Menu,và có thể xóa dữ liệu, thay đổi số lượng...v.v giữa chừng.

Thêm nữa, có thể in hóa đơn hiệu quả hơn bằng cách tạo **node "Checker"** trên cùng.
Tuy phải in hóa đơn từ nhiều class, (sau khi thay đổi lịch sử order, hoặc dùng để confirm...v.v) nhưng việc in hóa đơn vẫn có thể thực hiện được bằng đoạn code dưới đây.👇

```
val table = "11" //code trong thực tế: đang truyền giá trị này bằng intent
//trong thực tế sẽ xử lý transaction
val mDatabase = Firebase.getInstance().getReference("Checker")
mDatabase.child("TN $table").child("check").setValue(false)
mDatabase.child("TN $table").child("check").setValue(true)
```

Về thiết bị đầu cuối đặt cạnh máy in: 
**Đặt listener vào  node "Checker"**. Do chỉ cần quan sát khi giá trị “check” chuyển từ false → true là được, nên nó sẽ như dưới đây.👇

```
val check: Boolean = p0.child("check").value.toString().toBoolean()
 val tablet = p0.child("tablet").value.toString()

 if (!oldValue && check){    //oldValue đang định nghĩa không phải là listener
       val tableNum = p0.key.toString()
       readData(tableNum, tablet)  //load toàn bộ thông tin của bảng, in hóa đơn
  }

 oldValue = check
```

Vấn đề hóa đơn bị in thành 2 tờ cũng đã được giải quyết bằng cách này.

### UI trực quan

Nhân đây thì tôi xin nói qua về hệ thống in hóa đơn mà trước đây khách sạn định mua về dùng. Toàn bộ app đó đều là màu đơn sắc, nên tại màn hình chọn menu, toàn là danh sách các text tên đồ uống, rất là khó nhìn.

Do vậy, với app lần này do tôi tự thiết kế, tôi đã cố gắng **tận dụng tối đa hình ảnh, vec tơ minh họa, màu sắc, font size dễ nhìn...v.v và tránh tối đa dùng text nhàm chán**.

Ngoài ra, do không thể hoàn tất toàn bộ các thao tác trong cùng 1 màn hình, nên tôi đã quyết định làm theo cách: **Trên mỗi màn hình chỉ được thực hiện 1 thao tác**.

Nhân viên phục vụ khi **đang thực hiện thao tác order cũng  có thể tự trả lời những câu hỏi đơn giản** với từng màn hình.
(Ví dụ, khi khách chọn rượu Nhật, sẽ *hỏi khách  một số câu*, kiểu uống nóng hay lạnh. Khi gọi rượu vang thì sẽ hỏi *số ly*, gọi sochu thì hỏi về *cách uống*. Gọi nước ngọt, thì sẽ hỏi xem *có uống đá hay không.*..v.v)
👇Dưới đây là sơ đồ chuyển màn hình khi order một chai rượu sochu

![](https://images.viblo.asia/23529b74-8669-4ff6-9d4a-4f4a2684ea1d.jpg)

Tôi đã cố gắng thực hiện sao cho **flow thao tác trong app được nhanh nhất**, tuy nhiên ngược lại, việc này **có khả năng làm số lỗi bị tăng lên**.

Do đó, để giảm số lỗi về mức tối thiểu, tôi đã thực hiện sao cho: **có thể đối ứng được với các yêu cầu gấp của khách hàng**. (ví dụ: gọi 4 bia, nhưng sau đó khách báo lại là “Thôi, chỉ gọi 3 bia em nhé”.
Khi trong order có từ 3 loại đồ uống trở lên, sẽ tự động chuyển tới màn hình **Nội dung order không có vấn đề gì chứ?**
Từ màn hình này, nhân viên có thể thêm sản phẩm, thay đổi số lượng sản phẩm...v.v

**Video**

https://twitter.com/baske0806/status/1133707670618136577

### Các tips cải tiến sau khi bắt đầu sử dụng app

**Tip cải tiến ①: Điều chỉnh focus của SoftKeyboard**
 
Còn một số lỗi nhỏ nhưng tôi vẫn muốn sửa để tối ưu hóa app hơn.

Tại màn hình cuối cùng của phần order, tôi đã bỏ phần EditText Focus mặc định đi. Tuy nhiên, khi tap vào button **メモを残す/để lại memo ghi chú**, thì soft keyboard lại show ra.

Tôi đã implement phần show ra soft keyboard bằng đoạn code dưới đây. 👇
```
fun showSoftKeyboard(view:View) {
  if (view.requestFocus())
  {
    val imm = getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
    imm.showSoftInput(view, InputMethodManager.SHOW_IMPLICIT)
  }
}
```

Page tham khảo　[How to Hide and Show Soft Keyboard in Android](http://www.androidtutorialshub.com/how-to-hide-and-show-soft-keyboard-in-android/)

**Tip cải tiến ②: Điều chỉnh màn hình Home**

Phần này không liên quan gì tới hệ thống. Tuy nhiên, tôi muốn là: Khi đang dùng app bị back về màn home do bấm nhầm, thì tôi vẫn có thể biết được đâu là app Hệ thống ghi hóa đơn.

![](https://images.viblo.asia/7ba50630-9bbe-4da0-bbdf-a5efb6c9f02c.jpg)

### Kết bài

Sau khi đã chọn được Hardware, thiết kế DB, rồi đến UI, hầu như tôi đều tự làm một mình. Tuy nhiên, tôi đã nghiệm ra 1 điều, đó là: Trình độ của bản thân vẫn còn khá thấp (Thật sự luôn ý các bạn ạ!)

Do đó, **feedback của mọi người là cực kỳ quan trọng**. Với những dự án do cá nhân phát triển, sẽ không có phần feedback trực tiếp như lần này, nên tôi nghĩ cần phải điều tra từ Log, dữ liệu của user...v.v. Lần tới, tôi sẽ phát huy tối đa các phần này.

Bên cạnh đó là **tầm quan trọng của Mentor**. Lần này tôi mới chỉ đăng ký chứ chưa sử dụng. Sau này tôi sẽ tích cực sử dụng các service giải đáp, hướng dẫn code. Với tiếng Anh thì có [CodeMentor](https://www.codementor.io/), tiếng Nhật thì có [MENTA](https://menta.work/)....

Tôi rất vui vì các bạn đã dành thời gian đọc đến cuối bài.
Cảm ơn các bạn rất nhiều.

**Link bài gốc**: https://qiita.com/Yoji0806/items/d895d1fbd2d8c1736449

`Dịch bài: Thanh Thảo`