## Overview:
Part tiếp theo của phần datatypes and objects, mình sẽ cùng các bạn tìm hiểu về các biểu hiện của kiểu dữ liệu **Text** trong Ruby. Part này khá là nhiều điều để nói, nên mình chia làm vài post nhỏ vậy. Post đầu tiên này, mình sẽ nói về **String Literals** ( các bạn tự tìm hiểu thêm về khái niệm literals nhé, mình cũng đã giải thích qua ở trong [part 1 - Number](https://viblo.asia/p/datatypes-and-objects-of-ruby-1-number-V3m5WbaxlO7) rồi).
**Text** (tạm dịch là các loại văn bản) ở trong Ruby được biểu diễn bởi các objects thuộc **String** class. Trong Ruby, String là các ***mutable objects*** - tức là các đối tượng có thể thay đổi được. Nói về ***mutable và immutable objects***, chúng ta đều biết các objects trong Ruby được định nghĩa sẵn rất nhiều các iterator method để nó có thể gọi ra (ví dụ như các method phổ biến mà hầu như mọi object đều gọi được : .object_id , .class , ..... ). 
```
irb(main):002:0> "Trouble H".object_id
=> 47156572167960
irb(main):003:0> "Trouble H".class
=> String
irb(main):004:0> 1.class
=> Integer
irb(main):004:0> 1.class
=> Integer
```
* Đối với ***immutable objects***, không có một method nào được định nghĩa sẵn hoặc được tạo ra mà có thể thay đổi được giá trị của object. Như chúng ta đã biết ở [bài viết trước](https://viblo.asia/p/datatypes-and-objects-of-ruby-1-number-V3m5WbaxlO7), Numeric objects là ***immutable objects***. 
* Còn đối với những ***mutable objects*** , chúng được định nghĩa nhiều method , operators(toán tử) để có thể thay đổi giá trị của objects. Cụ thể đối với String class, Ruby hỗ trợ nhiều operators, method để thêm, sửa , xóa các phần tử của các String objects sau khi nó được tạo ra. 
Ngoài ra , Ruby cũng cung cấp nhiều trò thú vị để chúng ta có thể làm với các **String objects**. Chúng ta có thể convert một object thuộc kiểu khác về **String objects**, chúng ta có thể truyền giá trị của một biểu thức vào trong một **String object** và chúng ta cũng có rất nhiều cách thú vị để hiển thị **String**. Tóm lại chúng ta sẽ cùng nhau tìm hiểu những điều thú vị này, trong những bài post của mình. 

## String Literals
Trong một ngôn ngữ lập trình, làm sao để chúng ta phân biệt giữa một **String** object với tên của một biến, một hàm hay một class? Có 1 cách đơn giản và thông dụng được sử dụng để giải quyết vấn đề này trong hầu hết các ngôn ngữ, đó là tạo ra các ***String delimiter*** . Các ***String delimiter*** , mình dịch nó là các "dấu phân cách", dạng phổ biến nhất của các delimiter là dấu nháy đơn( ' ' ) và dấu nháy kép ( " " ) . Tất cả những thứ được bao đóng bởi ***String delimiter*** (bao gồm bản thân delimiter đó) thì được gọi là **String object**. Lấy ví dụ nhé:
```
irb(main):007:0> "TRouble H".class
=> String
irb(main):008:0> 'TRouble H'.class
=> String
irb(main):009:0> %q(TRoubleH).class
=> String
irb(main):011:0> %Q(TRouble H).class
=> String
irb(main):012:0> %- TRouble H -.class
=> String
```
Chúng ta đi tìm hiểu đặc điểm của từng loại String object ứng với một số ***delimiter*** nhé.

### 1. Single-quoted string literals 
Dấu nháy đơn ' ', là loại **delimiter** phổ biến thường thấy trong hầu hết các ngôn ngữ lập trình, trong Ruby cũng không ngoại lệ.
```
'Tình thì sâu nhưng duyên lại mỏng'
```
Khi dấu nháy đơn là 1 delimiter, sự xuất hiện của nó mang ý nghĩa là sự kết thúc hoặc bắt đầu của chuỗi. Vì vậy, nếu chúng ta muốn hiển thị nó như 1 phần tử của chuỗi, ta có thể đặt trước nó 1 dấu backlash ('/') , như vậy trình thông dịch Ruby sẽ không hiểu nó là phần tử để kết thúc chuỗi. Ví dụ:
```
irb(main):001:0> 'hieu\'s dep\'s try\'s'
=> "hieu's dep's try's"
irb(main):002:0> puts 'hieu\'s dep\'s try\'s'
hieu's dep's try's
```
Ta gọi chức năng của dấu backlash ở trên, là dùng để escape dấu nháy đơn ' . Ngoài ra, dấu backlash cũng dùng để escape chính nó.
Ví dụ, khi dấu backlash xuất hiện 1 mình thì không có gì đặc biệt, nhưng khi nó xuất hiện trước dấu nháy đơn, hoặc trước dấu backlash, mọi thứ sẽ trở lên hơi đặc biệt 1 chút. Cụ thể hãy xem các ví dụ dưới đây nhé.
```
irb(main):008:0> puts ' Đây là 1 dấu backlash nạ : \\ '
 Đây là 1 dấu backlash nạ : \
 irb(main):008:0> puts ' Đây là 1 dấu backlash nạ : \ '
 Đây là 1 dấu backlash nạ : \
irb(main):016:0> puts ' Dấu nháy đơn và dấu backlash : \' '
 Dấu nháy đơn và dấu backlash : '
irb(main):020:0> puts ' Dấu nháy đơn và dấu backlash : \\\' '
 Dấu nháy đơn và dấu backlash : \'
```
Nhờ điều đặc biệt này, chúng ta có thể suy ra một hệ quả là 2 string dạng như dưới đây sẽ có giá trị bằng nhau:
```
irb(main):059:0> 'a\b' == 'a\\b'
=> true
```
Khi **Single-quoted string literals**  mở rộng trên nhiều dòng như dưới đây, nó sẽ bao gồm cả ký tự \n như 1 thành phần trong chuỗi.
```
'Thử xuống dòng nè.
 Xuống nè'
=> "Thử xuống dòng nè.\nXuống nè"
```
Nếu bạn muốn tạo một  **single-quoted string literals**  trên nhiều dòng, mà không muốn nó bao gồm cả ký tự \n, bạn có thể chia nó thành nhiều **single-quoted string literals** nối với nhau bởi dấu backlash như dưới đây:
```
'Thử xuống dòng nè.'\
 'Xuống nè.'\
 'Xuống thêm cái nữa nè'
 => "Thử xuống dòng nè.Xuống nè.Xuống thêm cái nữa nè"
```

### 2. Double-quoted string literals
Dấu ngoặc kép(double-quoted) cũng là 1 loại **string delimiter** vô cùng phổ biến. Các **double-quoted string literals** có độ linh hoạt cao hơn so với **single-quoted string literals**. Cụ thể là nó hỗ trợ các  ***backslash escape sequences*** ví dụ : \n để xuống dòng, \t cho dấu tab, và \\ cho dấu backlash,... để trình thông dịch Ruby không hiểu dấu ngoặc kép là sự kết thúc của string objects. Ví dụ:
```
irb(main):016:0> puts ' Trong dấu nháy đơn \n là: \n '
 Trong dấu nháy đơn \n là: \n
 irb(main):019:0> puts " Trong dấu nháy kép \\n là: \n " "Dấu xuống dòng đó :) "
 Trong dấu nháy kép \n là: 
 Dấu xuống dòng đó :)
```
Và quyền lực hơn cả, **double-quoted string literals** còn có thể bao gồm cả các expression được truyền vào, bằng việc sử dụng ký tự "#" quyền lực như trong ví dụ dưới đây:
```
"Sát thương của má núm = #{999**999}"
=> Sát thương của má núm = 368063488259223267894700840060521865838338232037353204655959621437025609300472231530103873614505175218691345257589896391130393189447969771645832382192366076536631132001776175977932178658703660778465765811830827876982014124022948671975678131724958064427949902810498973271030787716781467419524180040734398996952930832508934116945966120176735120823151959779536852290090377452502236990839453416790640456116471139751546750048602189291028640970574762600185950226138244530187489211615864021135312077912018844630780307462205252807737757672094320692373101032517459518497524015120165166724189816766397247824175394802028228160027100623998873667435799073054618906855460488351426611310634023489044291860510352301912426608488807462312126590206830413782664554260411266378866626653755763627796569082931785645600816236891168141774993267488171702172191072731069216881668294625679492696148976999868715671440874206427212056717373099639711168901197440416590226524192782842896415414611688187391232048327738965820265934093108172054875188246591760877131657895633586576611857277011782497943522945011248430439201297015119468730712364007639373910811953430309476832453230123996750235710787086641070310288725389595138936784715274150426495416196669832679980253436807864187160054589045664027158817958549374490512399055448819148487049363674611664609890030088549591992466360050042566270348330911795487647045949301286614658650071299695652245266080672989921799342509291635330827874264789587306974472327718704306352445925996155619153783913237212716010410294999877569745287353422903443387562746452522860420416689019732913798073773281533570910205207767157128174184873357050830752777900041943256738499067821488421053870869022738698816059810579221002560882999884763252161747566893835178558961142349304466506402373556318707175710866983035313122068321102457824112014969387225476259342872866363550383840720010832906695360553556647545295849966279980830561242960013654529514995113584909050813015198928283202189194615501403435553060147713139766323195743324848047347575473228198492343231496580885057330510949058490527738662697480293583612233134502078182014347192522391449087738579081585795613547198599661273567662441490401862839817822686573112998663038868314974259766039340894024308383451039874674061160538242392803580758232755749310843694194787991556647907091849600704712003371103926967137408125713631396699343733288014254084819379380555174777020843568689927348949484201042595271932630685747613835385434424807024615161848223715989797178155169951121052285149157137697718850449708843330475301440373094611119631361702936342263219382793996895988331701890693689862459020775599439506870005130750427949747071390095256759203426671803377068109744629909769176319526837824364926844730545524646494321826241925107158040561607706364484910978348669388142016838792902926158979355432483611517588605967745393958061959024834251565197963477521095821435651996730128376734574843289089682710350244222290017891280419782767803785277960834729869249991658417000499998999
```
Cụ thể, khi string được tao ra, giá trị của expression nằm trong dấu #{} sẽ được tính toán, convert sang string và insert vào đúng vị trí mà dấu #{} xuất hiện. Đây là 1 phương pháp mình thường xuyên sử dụng khi seed dữ liệu fake cho rails app, được chứng nhận là 1 chức năng vô cùng quyền lực trong nhiều bài toán. 
Ký tự # là 1 ký tự đặc biệt, thế nên để escape nó, chúng ta có thể sử dụng dấu backlash. Và khác với **single-quoted string literals**, **double-quoted string literals** có thể escape ký tự newline(\n) bằng dấu backlash:
```
#Single-quoted string literals
'Đang ở dòng đầu,
xuống dòng 2 và thêm 1 cái backlash \
, xuống dòng 3 xem sao nè.'
=> "Đang ở dòng đầu,\nxuống dòng 2 và thêm 1 cái backlash \\\n, xuống dòng 3 xem sao nè."

#Double-quoted string literals
"Đang ở dòng đầu,
xuống dòng 2 và thêm 1 cái backlash \
, xuống dòng 3 xem sao nè."
=> "Đang ở dòng đầu,\nxuống dòng 2 và thêm 1 cái backlash , xuống dòng 3 xem sao nè."
```
Ngoài ra trong Ruby, đối với **double-quoted string literals**, cũng có hỗ trợ kiểu in dữ liệu dạng printf như trong C: 
```
"%s: %f" % ["pi", Math::PI]
=> "pi: 3.141593"
```
Lợi ích của việc truyền biểu thức kiểu này, là bạn có thể điều chỉnh được số số 0 ở hàng thập phân của float object. 

### 3. Arbitrary delimiters for string literals
Ngoài dấu nháy đơn và dấu nháy kép, Ruby còn hỗ trợ ***cú pháp trích dẫn tổng thể*** cho string objects. ***Cú pháp trích dẫn tổng thể*** là một cụm từ khi dịch ra nghe thật ngu ngốc và khó hiểu, nhưng cụ thể nó là một kiểu delimiter thay cho dấu nháy đơn và dấu nháy kép, với dấu **%q** đánh dấu sự bắt đầu của một string object tuân theo quy tắc của **single-quoted string literals**, và dấu **%Q**(hoặc chỉ %) đánh dấu sự bắt đầu một string object tuân theo quy tắc của **double-quoted string literals**. Cụ thể cú pháp bao gồm:

> **delimiter character**( %q, %Q, %) + **open delimiter**( '(' hoặc '{' hoặc '<',....)  + **String content** + **close delimiter( match với open delimiter) ** 

Ví dụ:
```
%q(Don't worry about escaping ' characters!)
=> "Don't worry about escaping ' characters!"
%Q|"How are you?", he said|
=> "\"How are you?\", he said"
%-This string literal ends with a newline\n-
=> "This string literal ends with a newline\n"
```
Lợi ích của việc sử dụng cú pháp này, là chúng ta không cần phải lo lắng về việc escape các ký tự đặc biệt như dấu nháy đơn, nháy kép, dấu \n,..... Thứ duy nhất cần escape là cặp pair delimiter của cú pháp(**open** và **close delimiter**) . Chúng ta có thể dễ dàng escape **close delimiter** bằng dấu backlash, hoặc cách đơn giản hơn là chúng ta có thể thay cặp pair delimiter khác để tiện cho trường hợp hiển thị. Ví dụ:
```
%q_This string literal contains \_underscores\__
=> "This string literal contains _underscores_"
%Q!Just use a _different_ delimiter\!!
=> "Just use a _different_ delimiter!"
```
Ở part 1 mình giải thích cơ bản vài thứ thế thôi, các bạn chờ ở part tiếp theo nhé, ahihi. <3



-----
References: https://theswissbay.ch/pdf/Gentoomen%20Library/Programming/Ruby/The%20Ruby%20Programming%20Language%20-%20Oreilly.pdf