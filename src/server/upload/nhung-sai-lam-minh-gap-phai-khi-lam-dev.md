Hello các bạn lại là mình đây, 

Lâu lắm mới lại được ngồi viết blog, ngồi chia sẻ với các bạn những gì mình học được trong quãng thời gian vừa qua.

"Giờ già bắt đầu có tuổi rồi nên đứng đắn hơn, tập trung vào công việc chứ lại cứ lên Viblo xong viết blog nghe như kiểu mấy hội trẩu trẩu 19-20 lại chả thấy nhột hay không". 

Đấy là mọi người nghĩ thế chứ mình thấy lúc mình 15 và bây giờ cũng không khác nhau mấy :D, vẫn yêu đời lắm.

Sau một vài năm đi làm, qua quá trình mình tự học hỏi để phát triển, làm việc cùng với những anh em khác, làm project ngoài và project trên công ty, rồi mentor cho các bạn mới  junior hơn, mình nhận thấy có nhiều những sai lầm của mình và của các bạn mới trong quá trình làm việc cũng như tìm hiểu những kiến thức mới, mà ở bài này mình cùng tâm sự với các bạn. Hi vọng là giúp được các bạn chút gì đó :D

Bài này mình sẽ viết cụ thể những vấn đề mình thấy mình và các bạn hay gặp phải, chắc cũng sẽ không theo 1 thứ tự nào cả, các bạn cứ đọc với tâm thế "cưỡi ngựa xem hoa" nhé :D

> Mình sẽ update thêm khi nếu thấy có thêm nội dung muốn chia sẻ trong tương lai :)
# Những thứ ối dồi ôi làm mình mất thời gian
## Tìm kiếm cách tổ chức source code sao cho thần thánh
Mỗi khi bắt đầu 1 project mới, câu hỏi mình hay đặt ra là "giờ kiến trúc project kiểu gì cho thật tốt, thật khủng, thật scale, 5 năm nữa cũng không cần thay đổi nhiều vẫn chạy được" 🚀🚀

Đó là mình của những ngày đầu học code, đến giờ mình nhận thấy nó là 1 việc cực cực cực mất thời gian mà không hiệu quả. Xong có những đoạn project chạy được mấy ngày rồi mà mình cứ loay hoay đập đi làm lại, nay theo kiểu cấu trúc này, mai đọc blog thấy người ta làm kiểu khác nom hay hay lại đập :D.

Có 1 số lí do mình thấy chúng ta hay bị sa đà vào việc này như sau:
- khi các bạn đã sử dụng 1 framework (ví dụ Laravel, Angular, NestJS,..) nào thì thường cái kiến trúc nó tạo cho bạn cũng đã khá oke, phổ biến và dùng được rồi. Mình chỉ việc kế thừa rồi tiếp tục kiến trúc lại nếu cần thiết trong quá trình dev sau này
- việc cấu trúc project như thế nào mình thấy nó hơi giống với khẩu vị món ăn, người này thấy món này ngon những không chắc nó sẽ ngon với người khác, bạn bè mình ăn bún đậu mắm tôm nhưng mình xin là cho tiền cũng không dám ăn mắm tôm nữa 😂😂. Việc cấu trúc project cũng vậy, người ta làm ở công ty khác, project khác, nghiệp vụ khác họ kiến trúc 1 kiểu, hiểu biết của người ta cũng khác, sở thích người ta khác nên họ làm kiểu đó, điều đó chưa chắc đúng trong trường hợp của mình. Đó là lí do vì sao trong quá trình sa đà này mình hay bị kiểu "đứng núi này trông núi nọ", hôm nay "ăn món này ngon", mai thấy "món khác ngon hơn" thì lại làm lại :D
- project bé như con kiến xong học theo kiến trúc siêu phức tạp của các app lớn hơn :)
- và rất nhiều lí do ối dồi ôi nữa...

Thật sự mình rất được các bạn hay hỏi về câu hỏi này: a ơi app ReactJs của e kiến trúc thế nào ổn chưa a, app VueJS nom folder structure thế này đủ ngầu chưa.....xong 2-3 ngày sau thấy vẫn sa đà vào và quay lại hỏi mình cái đó.

Mình không phủ nhận việc kiến trúc tốt sẽ giúp cho project được "sáng sủa", dễ hiểu, dễ bảo trì hơn sau này. Nhưng mình nghĩ là 1 project cũng giống như 1 đứa "con cưng" vậy, khi còn nhỏ "dạy" nó thế này, khi nó lớn lên "dạy" nó thế khác. Tuỳ vào mức độ project ở thời điểm hiện tại mà ta "xoay vần" sao cho phù hợp. Bởi vì dù các bạn có chọn kiến trúc khủng cỡ nào, mà mình không biết cách sử dụng nó cho phù hợp trong quá trình dev thì rồi 1-2 tuần cái kiến trúc đó cũng nát và người sau vào sẽ chửi "WTF, thằng nào kiến trúc project này đây" 🤣🤣

Mỗi khi có ai hỏi mình về vấn đề này mình luôn gửi cho họ [câu quote của React JS](https://reactjs.org/docs/faq-structure.html#dont-overthink-it) này:  
> don’t spend more than five minutes on choosing a file structure (đừng dành quá 5 phút vào việc chọn cấu trúc thư mục như thế nào)
## Search không đúng trọng tâm

Là 1 developer, gần như 90% kiến thức chúng ta học được là từ internet (google, youtube, stackoverflow,...), nên chúng ta sẽ phải tìm kiếm trên internet rất nhiều để có thể tìm được những thứ cần thiết cho công việc (fix bug, công nghệ mới...).

Mình hay được các bạn junior hỏi những câu rất là ứ hự hư.... 😅😅, ví dụ "anh ơi `map` và `foreach` trong JS khác nhau như thế nào? làm cách nào để loại bỏ 1 số trường khi query MongoDB, cài nodejs version 14 như thế nào ?". Nghe xong mình kiểu "ủa ủa, em đã search google hay chưa", xong mình đưa cho các bạn ấy 1 số keyword và rồi 15 phút sau lại nhắn mình và hỏi e search rồi tìm không ra, và sau đó mình thử tìm cho các bạn thì có tới 1 nghìn lẻ 1 cái kết quả :)

Việc biết cách search google đúng cách sẽ giúp các bạn nhanh chóng tìm ra câu trả lời và ít phải đi hỏi người khác. Một hint cho các bạn đó là khi search google, tuỳ thuộc vào bạn đang dùng ngôn ngữ/framework/library nào thì các bạn cứ đặt tên của nó lên đầu cho mình, ví dụ:
```
javascript difference between array map and foreach

typescript optional chaining

React how to call API on component mounted

docker how to expose a service to localhost
...
```
> Tất nhiên cũng cần biết tiếng anh nữa đó để có thể đưa ra keyword cho hợp lý ;)

Tập luyện việc này hàng ngày, các bạn sẽ chủ động được hơn rất nhiều trong công việc, ít phải hỏi tới người khác hơn, nhờ thế mà tiết kiệm được thời gian nhiều hơn
## Code thì ít mà lang thang thì nhiều
Trước đây mình hay có kiểu, code thì chưa có mấy, deadline thì càng ngày càng gần, nhưng vẫn ngồi lọ mọ nào là phải ốp eslint, ốp prettier, áp dụng chuẩn này, chuẩn kia cho code JS/TS/SCSS, có nên cài stylelint để lint CSS ko, setup Github Action sao cho chuẩn để có thể auto deploy, tạo chuẩn PR template như thế nào,...

Nhưng việc đó đôi khi rất mất thời gian và làm cho mình quên đi phần công việc chính của mình, và hơn thế những thứ đó chỉ là kiểu "có thêm vào thì tốt", không có thì cũng chẳng sao.

Nếu các bạn đang rảnh thì ngồi xem mấy cái trên cũng được không thì cũng đừng đâm đầu vào nó quá trong khi deadline đang tới gần nhé 😊
## Code hay bị phiêu quá
Ngày xưa mình hay bị kiểu, khi đang làm 1 tính năng, xong vào tới 1 module bị cuốn quá, làm nó cực phức tạp, nom cao siêu, chăm chút, dành lượng lớn thời gian để vọc vạch nó, mà có khi mấy thứ đó cũng không quá cần thiết, trong khi còn tới cả 5-7 module đang chờ. Hậu quả là luôn bị sít deadline. 

Việc không "nhận thức" được tiến độ công việc đang như thế nào làm mình hay bị phiêu quá, tới khi đồng nghiệp hỏi làm xong chưa mới sực nhớ ra, cơ mà cái phần hiện tại đang phiêu quá rồi, đập đi thì tiếc 😭😭😭, thôi cố tối nay về làm tới đêm chắc cũng xong :)

Dần dần mình cũng cải thiện được điều này, và giờ khi mentor các bạn junior khi thấy các bạn ấy đang có vẻ "la cà" quá là mình phải kéo các bạn ấy về đúng tiến độ ngay :D. Mình hơi thực tế chút, dù bạn có viết 1 function đẹp đẽ kinh khủng cao siêu tới mức nào nhưng cả chương trình không chạy thì coi như kết quả bằng 0.

Ngay cả hiện tại đôi khi mình cũng bị như thế này, nhưng ngay khi mình thấy rằng mình đang đi chơi hơi quá là mình sẽ chấn chỉnh và tập trung lại phần công việc chính
## Đâm đầu vào fix 1 lỗi trong khi còn cả 1 project
Trong quá trình dev, đôi khi mình gặp 1 số lỗi mà ban đầu thật sự là không hiểu tại sao nó lại không chạy, nhất là bên frontend, kiểu "ủa state thay đổi sao không thấy re-render, rõ là có useState rồi mà, Redux báo lỗi state bị thay đổi trực tiếp ở 1 chỗ nào đó mà không tìm ra,..."

Những lỗi mà không biết tạo sao như vậy, lắm lúc mình dành tới cả ngày trời để search tìm cách fix, debug, console.log... xong cứ ngồi than trời tại sao code không chạy, mà quên đi là còn cả 1 đống task phía sau nữa. 😢😢

Cũng phải công nhận là không phải lúc nào ta cũng bỏ tạm đấy và quay qua task khác được, nhưng ngồi review lại và nếu thấy rằng lỗi hiện tại có vẻ khá khoai và có thể làm được phần khác thì mình sẽ nhảy qua phần đó và làm trước thay vì cứ đâm đầu vào lỗi hiện tại và làm tiến độ công việc bị chậm đi.

Mà chính việc nhảy qua task khác làm đôi khi nó còn làm cho đầu mình "giải thoát" khỏi lỗi hiện tại, thông thoáng hơn, mai quay lại fix thì vèo cái là xong, và mình kiểu "ơ, thế hôm qua mình đã làm cái quái gì vậy nhỉ, fix dễ thế này thôi mà", đầu óc lúc đã rối càng đâm đầu nó càng rối đó các bạn 🤣🤣
## Cẩu thả
Trong khi code, nhiều khi tập trung nhiều quá, hay gặp bugs quá trời làm xây xẩm mặt mặt, nó làm cho đầu óc mình mụ mị đi hết cả, và đôi khi dẫn theo cả sự cẩu thả không để ý mình đang làm gì, và hệ quả là dẫn tới vô vàn lỗi, bugs không đáng có và mất rất nhiều thời gian vào những thứ đâu đâu 🥲🥲

Khi thì không hiểu sao `useEffect` bên React không chạy, nhìn mờ mắt thì ra là truyền vào thiếu dependency. Code Graphql truyền vào type trả về sai xong cứ không hiểu tại sao nó báo lỗi, `"if"` check thì thiếu dấu `"!"` để check trường hợp ngược lại, Promise thì không `await` xong cứ bảo sao không thấy value đâu...

Những lỗi cẩu thả đó cũng ngốn của mình biết bao nhiêu là thời gian, nhiều đoạn còn phải đi hỏi người khác, chờ đợi người ta xem cho xong vừa xem cái người ta nhìn ra lỗi ngay, mình kiểu "u là trời, tôi đã nghĩ gì thế này" 😁😁

Khi mình review PR cho các bạn khác cũng rất hay gặp tình trạng này, đôi khi cũng hơi trầm cảm chút, nhưng nhìn ra hình ảnh của chính mình ngày xưa 🥰🥰
# Những điều làm mình thấy không thích
*Dưới đây vừa là những điều mình đã cảm thấy và đang thấy ở nhiều bạn developers*
## Cảm giác bị đem con bỏ chợ
Đã bao giờ các bạn tham gia 1 project mới, được đưa cho cái source, bảo là làm theo README, vào đọc setup thì thấy dài tổ bố, ngồi setup thì không có docker xong lọ mọ nào thì mysql, nào redis nào elastic,...setup tới cả 2 ngày không xong, tới ngày thứ 3 chạy lên thì thấy báo lỗi cần phải setup oAuth để xác thực tài khoản mới đăng nhập, cảm giác thật sự bất lực và lạc lõng 😪😪

Mình nghĩ đây cũng là cảm giác của khá là nhiều bạn khi mới vào công ty, hay mới tham gia một project. Đôi khi công việc của người mentor (hướng dẫn) của mình hơi bận chăng, nên họ không sát sao thường xuyên được, và cũng có khi do ngày đó mình ngại hỏi.... 😅😅 Cảm giác này thường mang tới sự hoang mang, bơ vơ cho các bạn đồng nghiệp, đặc biệt là các bạn mới, gây chán nản và thậm chí là bỏ việc (fulltime hoặc thực tập) vì thấy no hope :)

Đến bây giờ khi đã được giúp đỡ các bạn mới mình thường dành nhiều thời gian (mình có thể) để sát sao các bạn, giải thích kĩ công việc mới, hoặc các vấn đề các bạn thường hỏi. Nhiều bạn cũng bảo thấy anh chỉ dẫn tận tình nên em thích hỏi hơn (tự sướng chút các bạn ạ :D :D)

> Qua đây mình cũng mong rằng các bạn mentor, các anh chị leader, hãy luôn "chăm sóc, quan tâm" các bạn member của team mình để các bạn ấy thấy có người hướng dẫn, được giúp đỡ khi thấy khó khăn, biết là các bạn nên chủ động hỏi nhưng các bạn mới cũng có nhiều cái bỡ ngỡ không phải vừa vào là sấn sổ đi hỏi cả công ty :)

## Đọc code của các "siêu nhân" đi trước
Một trong những điều làm mình cảm thấy khá là khó chịu khi đọc code của những "anh tài" đi trước với những dòng code mà khi đọc mình muốn đăng xuất khỏi thế giới. 😅😅

Mình biết là trong mỗi chúng ta ai cũng muốn được thể hiện mình bằng 1 cách nào đó ở 1 nơi nào đó, và developer cũng vậy, đôi khi mình cảm giác như người viết code trước muốn thể hiện 1 điều gì đó qua những đoạn code loằng ngoằng, phức tạp gây khó hiểu cho cả team

Kiểu thay vì viết if/else rõ ràng thì:
```js
function example(…) {
    return condition1 ? value1 : condition2 ? value2 : condition3 ? value3 : value4;
}


function example(…) {
    if (condition1) { return value1; }
    else if (condition2) { return value2; }
    else if (condition3) { return value3; }
    else { return value4; }
}
```
Mà mỗi cái `condition` bên trên phức tạp nữa chứ, hỏi thì các bạn bảo viết theo kiểu số 1 nom ngắn hơn nhiều mà 🙃

Hoặc mình đã từng khá là trầm cảm khi đọc 1 số hàm code đệ quy cực kì khủng khiếp với gần như không có 1 chút comment nào, hay các đoạn code xử lý URL/string dùng Regex cực choáng. Cũng có khi đó là 1 module có kiến trúc "scalable", navigate tới 2 chục file để biết được tận cùng của 1 đoạn console.log được khởi nguồn từ đâu...😂

Với mình, code tốt đó là làm sao để người sau vào đọc code của mình có thể hiểu được, hơn là mang tới cho người ta cảm giác khó chịu khi đọc code, và để người ta phải suy nghĩ là "giờ đọc hiểu tiếp hay đập đi làm lại mới đây" :). Mình thà viết dài 1 chút nhưng đảm bảo rõ ràng còn hơn tiết kiệm mấy dòng xong code logics nhìn không ai hiểu, mình thà chọn 1 cách tiếp cận phổ biến còn hơn là dùng 1 số toán tử kì kì mà 96,69% 1 tháng sau đọc lại mình cũng quên nó là gì. Thường khi review các PR kiểu như này mình hơi khó tính hơn bình thường chút 😁😁

> Đừng mặc định rằng người khác sẽ luôn hiểu code của mình làm gì nhé các bạn, nếu như chính bạn cũng cảm giác là nó sẽ gây khó hiểu cho người khác ;)
##  Thẹn thùng ngại lên tiếng
Khi mới join công ty, thường mình thấy các bạn mới hay bị ngại khi phải đi hỏi đồng nghiệp, lầm lũi làm việc 1 mình, lỗi vật vã vẫn cố đơn thương độc mã fix. Cho tới khi mọi thứ nó đã toang hết cả ra rồi thì mới hỏi tới đồng nghiệp, dẫn tới ảnh hưởng tới công việc, đồng nghiệp thấy mình lầm lì, leader thì có khi nghĩ mình không năng động :D

Từ phía của mình, ngày xưa khi mới join vào các công ty thì đúng là nhiều lúc cũng bỡ ngỡ ngại thật, nhìn xung quanh toàn người lạ, tính hỏi mentor/leader thì nom người ta cũng bận, hỏi 1-2 lần hỏi nhiều sợ người ta thấy mình "gà" nên cứ phải hỏi suốt....😅😅

Rồi có những lúc thấy sản phẩm có vấn đề nhưng nghĩ là hiện tại cũng không ảnh hưởng gì lắm, cứ để cho leader lên tiếng thay, xong tới lúc lỗi xảy ra bảo "e thấy nó từ trước rồi" xong bị hỏi "sao em không nói cho mọi người cùng biết" thì lại chỉ biết cười :)

Đến giờ khi mình lại mentor cho các bạn khác thì mình vẫn hay thấy tình trạng tương tự. Mình nghĩ các anh chị mentor/leader luôn sẵn sàng giải đáp cho các bạn, đó cũng là 1 phần trách nhiệm của họ khi nhận hướng dẫn cho các bạn, và thường họ cũng rất vui vẻ các bạn ạ, đúng là đôi khi nom thần thái của họ cũng không thân thiện lắm, nhưng hãy cứ mở lời, ai cũng thích sự ham học hỏi cả các bạn ạ ;)

## Chỉ học framework/library mà quên đi cái cơ bản
Bây giờ khi đi làm thường hầu hết chúng ta chủ yếu làm việc với các thư viện, framework có sẵn và phổ biến ngoài kia, vì chúng đã có sẵn rất nhiều thứ ta có thể nhanh chóng dựng lên sản phẩm, cả mình cũng vậy, nào Vue/React/Angular, NestJS/Laravel...

Nhưng có 1 điều mình thấy cực kì không ổn đó là rất nhiều bạn bây giờ (cả sinh viên), vừa mới học code, xem qua 1-2 buổi vẫn còn lọ mọ đã nhảy luôn vào framework, những cái cơ bản thì không năm vững, để rồi đến khi làm thật thì vỡ mộng vì nhiều cái nó khó, và đặc biệt khi gặp bug thì fix rất vất vả vì không hiểu bản chất.

Mình có từng biết những em mới học được HTML chút chút đã nhảy vào React luôn, xong thắc mắc những câu, rất là ối dồi ôi, mà mình lại vẫn chỉ muốn đăng xuất khỏi trần gian. Hoặc có những bạn dev, trên CV ghi đi làm web 1-2 năm, kinh nghiệm thực chiến này kia, cho tới khi hỏi viết code CSS thuần thì đến class/id selector cũng còn chật vật 🥲🥲🥲

Vậy nên điều mình muốn gửi tới các bạn là, dù framework nào, thư viện gì, thì nó cũng được dựng trên từ những cái cơ bản, và nắm vững những thứ bản lề đó mới là cái cốt yếu để giúp các bạn hiểu những thứ mà lúc các bạn thực sự làm đó nhé 🤗🤗

## Ngại khi phải thử những cái mới
Sau 1 thời gian code 1 công nghệ nào đó, dần dần chúng ta sẽ tự tin hơn với nó, làm việc thành thục hơn, và thường khi phải bắt đầu 1 project mới thì ta sẽ chọn luôn những thứ mà ta đã quen để có thể nhanh chóng build lên sản phẩm. Do vậy khi được hỏi tìm hiểu, chuyển qua công nghệ khác thì một số bạn lại hơi dè dặt, ngại, và đôi khi là từ chối chuyển qua cái mới vì "cái cũ làm mãi quen rồi sao không dùng luôn" :D

Mình đã được nói chuyện với 1 số bạn khi được hỏi chuyển từ React sang Angular đã thẳng thắn nói rằng "em không muốn, chỉ muốn làm React ,master React lên 1 đỉnh cao", kể ra ý các bạn ấy nói cũng đúng, ai chả muốn master cái mình đang làm. Nhưng vậy nếu 2-3 năm nữa Angular nó soán lại ngôi và đè bẹp React thì sao các bạn? Và job Angular ngon như thế này mà các bạn bỏ lỡ thì thật sự phí, vì Vue/React/Angular thì âu cũng là frontend thôi mà ;)

> Đừng để bản thân bị phụ thuộc vào công nghệ mà ta nên làm chủ chúng các bạn à 😁

Làm công nghệ gì cũng được, miễn là ta có cơ hội được làm, được trải nghiệm, giữ bản thân luôn trong trạng thái linh hoạt, sẵn sàng với những điều mới mẻ, vì nghề khác thì mình không biết chứ nghề IT thì công nghệ mới ra đời cực kì nhanh và nhiều, mạnh dạn mà thử những cái mới nhé các bạn ;)

## Thiếu chủ động, hay hỏi
Đôi khi vì các bạn mới, ít kinh nghiệm nên sợ làm sai, làm lỗi, nên cái gì cũng hỏi lại cho chắc, nhưng không nên cái gì cũng hỏi các bạn à.

Lắm lúc đưa project mới cho các bạn, nhắn xem Readme setup theo rồi có gì hỏi mình, xong lúc làm thì cứ 1 bước các bạn lại nhắn mình
- "anh ơi nó hiện thế này là được chưa ạ, lỗi này fix thế nào ạ, hiện như kia là thành công phải không anh..."
- anh ơi sao cú pháp của typescript nó lại như thế này hả anh? (Ủa anh đâu phải là người phát minh ra nó hả em?)
- Tải Docker, VSCode ở đâu anh gửi em link với (🙃)

Thật sự là 1 ngày mà đôi ba bạn như vậy thì mình cũng hết muốn làm việc luôn :D Tình trạng này không chỉ xảy ra ở chỗ mình mà chỗ các bạn mình cũng có nhiều.

Ủa sao đoạn này nghe mâu thuẫn vậy? bên trên vừa bảo người ta nên hay hỏi nhiều hơn?? 🧐🧐🧐

Ý của mình ở đây là những cái gì có trên google thì các bạn nên chủ động tìm trên đó trước, nhiều khi nó rất sẵn và nhanh hơn nhiều so với việc nhắn tin hỏi xong chờ người ta reply, và lại còn luyện được cả kĩ năng search tìm kiếm nữa chứ. (nhiều khi cái các bạn hỏi mình không biết và mình đi search thay cho các bạn 😢😢). Việc chủ động tự tìm kiếm câu trả lời cũng giúp các bạn độc lập, tự tin hơn trong công việc rất nhiều, sau làm cái gì cũng được miễn là có google :D :D

Vậy nên trước khi hỏi về 1 điều gì đó, các bạn có thể tự đặt câu hỏi "liệu mình có tìm được nó ở trên internet hay không" xem nhé ;)

# Kết bài
Mình viết blog trên Viblo cũng được mấy năm rồi, và nhóm đối tượng mình chủ yếu hướng tới là các bạn mới, junior, mong muốn các bạn có thể có nhiều kĩ năng, thông tin hơn qua các bài viết của mình, mong muốn các bạn cải thiện được nhiều thứ mà mình đã và đang gặp phải.

Ngày xưa khi mới học code mình không có được nhiều người chỉ dạy cho nên khá là mất thời gian trong việc lọ mọ tìm hiểu xem mọi thứ hoạt động như thế nào.

Mong rằng bài viết này đã giúp các bạn "chột dạ" chút nào đó để từ đó cải thiện cho tốt hơn.

Cám ơn các bạn đã theo dõi và hẹn gặp lại các bạn vào những bài sau <3