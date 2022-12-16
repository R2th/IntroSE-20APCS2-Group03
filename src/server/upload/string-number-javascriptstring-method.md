![alt](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLz4UWl-n-VG94ON7MUQjIR3u-Sw4f1MtbXE4kCc1kLk18MuFkEHALDtA)

- các phép cộng trự nhân chia trong lập trình khá quan trọng, ngoài nhưng cái phép cộng trự basic thì nó còn có những phép tính rất khó như các chuỗi + với number chẳng hạn vậy khi có trường hợp như thi máy tính nó sẽ có những result như thê nào nhé !! à ngoài ra các bạn con fđược khuyến mãi thêm cách tách tính toán vị trí trong một String radom, ok vậy bây giờ chúng ta bắt đàu thôi


# Tính toán Basic in JavaScript !!

> qua đây mình cũng giới thiệu về đời mình một tẹo hê hê , hồi trước ấy khi mà mình cũng có học c++ :smile: nó khá hay về cái cộng từ nhân nâng cao, nhưng mình cũng đếch quan tâm nó (nói như kiểu tau đếch quan tâm những thứ ta dell quan tâm =VV),nhưng một thời gian sau khi học java,C,JavaScript,Jquery thì nó toàn khặp những cái kiểu như thế này trong dự án nên rảnh tay viết luôn cái blog này luôn :smile:
 


 **1.**  var a = **546e5**
 - e5 tức là nhân lên ấy nếu ở trên a = 54600000(5 con zero)
 - ngược lại tức là vả a = 546e-5 tức là chia => a=0.00546
 
 **2**  var **0.1 +0.2** =?????;
  ở trong lớp 6,7,8 chúng ta đã học về cộng trự nhân chia nhưng trong Js nó khác đây theo như ở đây result=**0.30000000000000000004**,nó khá lạ =));
- nhưng phép tính ở đây có thể viết như thế này thì nó sẽ khác như :**(1+2)/10** thì kết quả bằng **0.3** trong luôn đấy ??,vì sao vì đây là phép /10 lal fmoojt số tròn chục nên kết quả sẽ khác hản đấy

**3** number + String like vả a = **20 +"30"** 
thì theo bạn value của a sẽ đc tính như thế nào ?????? result sẽ là **2030** ok nhưng dữ liệu này đc lưu ở dạng String chứ không phỉa number đâu nhé !!ok

**4** String +number like : var a = **"30"+20** ,vì String là một con qiaus vật hút máu đây ? number mà cộng với nó thì xác định theo String luôn nên khi cộng zầy thì result sẽ là **3020**
**5** tiếp tục với basic String nhé : "chun" + " milion " ="chunmilion"

**6** nếu nhân thì Sao ??   **"100"* "10"** result sẽ bằng 100*10="1000  khi String * String thì sản phẩm là number đấy
```javascript
var x = "100";
var y = "10";
var z = x * y;  
alert(typeof(z));
```
> Console : number
> ngoài nhân ra thì cách này còn áp dụng cho trừ,chia nhé nhưng nó không áp dụng cho + đâu nhé 

# NaN (not a number)

nếu trong trường hợp nhân chia String ở tên thì nếu như thế này thì kết quả khác đấy nhé !!
 ex : 100/"chun" => result = NaN
 ok đây là exception đơn giản nên nó khá hiếm khặp đấy
 
# String =>Array (HOW??)
first,mình có một chuỗi String như sau "chunngu" chẳng hạn thì làm sau phân nó thành các phần tử của Array lúc này chúng ta cần dùng function split() để tách cái "chunngu" ra thì chúng ta cần sử dụng hàm split như sau 
```javascript
var chunngu="chunngu";
var chunnguAfter=chunngu.split("");
```
sau đoạn code này chunnguAfter= array(c,h,u,n,n,g,u)
- thực chất hàm split dùng để cắt chuỗi String bằng các ký tự như space ok 
- ngoài hàm Split ra còn có hàm indexof hàm này cho phép ta truy cập đến vị trí của một String trong một String lớn hơn nếu true nó trả về vị trí còn nếu sai nó always trả về -1 nhé , hàm length cũng là một hàm đóng vai trò rất quan trọng tỏng vong lặp loop nó dùng để duyệt và xử lý các dự liệu có trong mảng ex

``` javascript 
for( var i =0 ; i< array.length ;i++){
//your code
}
```