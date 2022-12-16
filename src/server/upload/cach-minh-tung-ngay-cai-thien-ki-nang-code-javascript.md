Chào các bạn lại quay trở lại với blog của mình, lại là mình đây, vâng dù cho vẫn chả ai biết mình là ai :-D :-D.

Lại bẵng đi một thời gian chăm chỉ cày cuốc kiếm tiền lấy vợ thì hôm nay lại nhân dịp có một số bạn có hỏi mình chia sẻ về code Javascript cần học gì, code sao cho đẹp rồng bay phượng múa, code dùng tool gì trông cho hổ báo cáo chồn,... Vậy là lại làm khơi dậy cái sự yêu thích được viết blog của mình.

Ở bài này mình sẽ chia sẻ về những điều mình áp dụng để cải thiện nâng cao code Javascript của mình, về những thứ mình đã học và làm vào thực tế thấy hiệu quả.

Đọc bài nếu không yêu xin đừng nói lời cay đắng nhé các bạn, con tim nay đau khổ nhiều lần rồi ;). Thôi vào bài thôi nào :-D

# Dùng Editor nào?
Hiện tại để lập trình thì ngoài kia cung cấp cho chúng ta vô vàn các loại editor, mới học trông thấy đã choáng rồi, không biết chọn cái nào code cho năng suất. 

Với mình trừ code Android buộc phải dùng Android Studio hay iOS dùng Xcode ra thì mình hầu hết chỉ dùng `Visual Studio Code`. 


Đây là editor do Microsoft phát triển, nghe Microsoft là sướng rồi, hàng của các anh to thì phải xịn rồi. Và đúng là nó xịn thật, support hầu như tất cả các ngôn ngữ, vô vàn các extension bổ trợ thêm cho mọi người, có AI gợi ý code, giao diện đẹp, và `nhẹ` (mình thấy không nặng hơn mấy so với các bạn cùng trang lứa) :-D

![VSCode](https://images.viblo.asia/ba6a8c98-7734-4e32-816c-ae39c4995ae2.png)

Ngày trước có thời gian mình chỉ dùng Sublime Text (lúc đó VSCode chưa nổi), bạn mình bảo chuyển qua VSCode mà cứ bảo thủ không chịu đến lúc chuyển qua thì thật sự là tuyệt vời. Kết hợp với các plugin (mà mình sẽ nói ở bên dưới), tự động detect và sửa lỗi, tự format code. Mình tiết kiệm được vô vàn thời gian khi không còn phải fix những lỗi nhỏ nhặt mà rất hay gặp khi code nữa.

Có bạn code PHP sẽ thích PHPStorm, code Python sẽ thích PyCharm, đúng là những editor đó mạnh nhưng chỉ cho 1 ngôn ngữ, và mình thì Fullstack code Javascript, HTML, PHP, NodeJS rồi React Docker,...thì mình dùng VSCode vì nó cực kì mạnh mẽ, support nhiều, yêu nhất là autocomplete rất thông mình <3
# Yêu ESLint ngay từ hôm nay
Một trong những thứ làm mình mất thời gian nhất và bực mình nhất đó là các lỗi về cú pháp, lỗi chưa khai báo biến/hàm mà đã dùng, thiếu dấu,... Khi code của chúng ta nhiều lên, đôi mắt ấy đã mệt mỏi khi một lúc phải đọc hàng chục file, đầu óc quay cuồng, bàn tay run rẩy gõ từng dòng code :-D, dẫn tới việc chúng ta không để ý và mắc lỗi.

Khi code mình dùng 1 ESLint, đây là một plugin hỗ trợ tìm lỗi, kiểm tra cú pháp, format code, từ đó giảm được bug khi code, đồng thời giúp code trông đẹp hơn khi được format theo các chuẩn phổ biến trên thế giới. ESLint hỗ trợ khá nhiều anh lớn: Javascript thuần, React, Vue,...

Đặc biết dùng ESLint với VSCode thì thôi rồi, :-D, cặp đôi cực kì hoàn hảo, gõ code đến đâu sẽ được check lỗi/cú pháp ngay lập tức đồng thời gợi ý cách dùng hàm, biến sao cho tối ưu luôn. Lại còn auto format code nữa chứ, nghe thôi là thấy yêu rồi <3.
<div align="center">
<img src="https://images.viblo.asia/a4fd35f8-acec-4ee9-9616-7857a4cffa01.gif" alt="ESLINT_VSCODE" style="width: 100%;"/>
</div>

Thật sự là từ ngày dùng ESLint là mình đã giảm được phần lớn các lỗi lặt vặt mà cực kì hay xảy ra, ngày trước thì lắm lúc code -> build -> chạy báo thiếu 1 biến, lại sửa -> build -> chạy và báo thiếu 1 hàm, cực kì ức chế. Nhưng từ lâu rồi mình đã Say Goodbye với những điều đó :-D, code năng suất hơn nhiều

Bên cạnh ESLint cũng có Prettier cũng dùng để format code nhưng mình thích ESLint hơn vì nó hỗ trợ detect lỗi và gợi ý code sao cho tối ưu.
# Cấu trúc thư mục một cách tối ưu
Một trong những điều đến gần đây mình mới "chấp nhận" và tự dặn lòng như điều khắc cốt ghi tâm: 
> Đừng quá cố gắng cấu trúc project sao cho tối ưu ngay từ lúc bắt đầu project 

Ô hay không cấu trúc project cho tốt thì sau này project nát bươm à? :-D

Ngày trước (thực ra cũng không trước lắm, mới vài tháng trước đây), mỗi lần bắt đầu một project, dù to hay nhỏ, mình luôn mất rất nhiều thời gian cố gắng chọn ra một cách cấu trúc project sao cho tối ưu, lên mạng đọc đủ các thể loại "NodeJS folder structure best pratices",... nhưng rồi vẫn lại băn khoăn không biết thế naỳ có tối ưu hay không, có nên chọn framework để code không, bla và blo, rất mất thời gian.

Và mình cũng nhận ra được là dù ban đầu mình có cố gắng học theo một cấu trúc nào đó được cho là tốt đi chăng nữa, thì chỉ đôi ngày sau, code của mình lại thành một mớ hổ lốn. :-D Vì tư duy hệ thống mình chưa tốt, ban đầu cấu trúc đẹp ra sao code một lúc trông lại toang :boom:.

> Đừng nên suy nghĩ quá nhiều về việc chọn kiến trúc nào, tổ chức ra sao ngay từ ban đầu. Chọn lấy một hướng đi hay một thư viện, framework và hãy bắt tay vào làm, vừa làm vừa cải thiện sao cho tốt và hợp với thực tế nhất.

Phần này nói in ít thế thôi để dành cho những phần tiếp theo :-D

Nhưng nếu có bạn nào quan tâm tới việc project cấu trúc tốt thì mình chia sẻ với các bạn 1 framework NodeJS tên là `NestJS`, mình đọc khá nhiều về docs của họ và thấy cách kiến trúc của họ rất hay (khá giống AngularJS, mặc dù mình không có ưa Angular mấy :-D)
# Console.log bất kì nơi nào thấy có "mùi"
Khi code Javascript chắc `console.log` là thứ mình dùng nhiều hơn cả. Mục đích chủ yếu của việc này là để xem dữ liệu tại vị trí mình đang quan tâm có thực sự đúng hay không. 

Nhiều bạn hỏi mình đoạn code này của em sao không chạy, sao dữ liệu không đúng, mình hỏi bạn đã `console.log` chưa thì các bạn bảo console ở đâu, nom ở chỗ nào, console không thấy báo gì, đến khi mình bảo bạn chụp ảnh tab console trên Chrome thì đỏ lừ toàn lỗi :joy::joy:

Cá nhân mình nghĩ việc lập trình, dù với ngôn ngữ nào thì hầu như chỉ xoay quanh dữ liệu, do đó, nếu thấy bất kì đoạn code nào thấy băn khoăn, có thể chưa đúng thì các bạn cứ `console.log`  để chắc chắn.

Cũng có nhiều người nói là nên dùng `debugger` trông cho chuyên nghiệp và lên trình hơn, đồng thời Chrome cũng hỗ trợ đặt Debug ở các dòng code sẽ biết rõ hơn. Thực ra việc này với cá nhân mình thấy không cần thiết, `console.log` cũng báo được ở dòng nào trong code, đồng thời dùng `console.log` nhanh hơn, tiện hơn, mà mình xem tutorial các code nổi tiếng thế giới Google Facebook các kiểu vẫn dùng `console.log` thôi à :-D

Nhưng các bạn cũng nên để ý là khi `console.log` xong, kiểm tra mọi thứ đã ổn thì nên xoá đi nhé, đừng đưa đoạn code toàn `console.log` hổ lốn lên git hay cho người khác xem (như hình dưới), có thể họ sẽ rất ức chế và đau mắt đấy (như mình chẳng hạn :D, thôi trêu thế, mình cute lắm, có gì thắc mắc cứ gửi code mình xem nhé :-D :-D)

![console.log](https://images.viblo.asia/325cd338-bfa5-4401-90f4-689dcc8032d5.png)
# Comment đúng lúc
Trong quá trình code sẽ có nhiều lúc ta có các đoạn code dài, phức tạp, ta sợ rằng sau này khi đọc lại sẽ không biết đoạn code này làm gì nữa, hoặc với một tấm lòng nhân đạo ta muốn người đến sau đọc code có thể hiểu nó làm chức năng gì. 

Cá nhân mình thấy việc viết comment thực sự hữu ích, nhất là khi project có nhiều người cùng làm và không phải cứ lúc nào không hiểu là ta lại ping anh bạn người viết ra những dòng code đó, trong lúc ấy anh bạn đó cũng đang bù đầu fix 1 tấn bug buổi sáng đầu tuần bên tester gửi sang :-D, khi đó nếu code được comment giải thích thì những người sau có thể hiểu ngay được và tiết kiệm được thời gian.

Thế nhưng comment trông cũng phải hợp lý và đáng yêu nhé các bạn ;). Không nhất thiết là phải comment cho mọi thứ, và comment đến mức chân răng nhé, điều đó đôi lúc sẽ làm cho code của bạn khó đọc và lại làm người khác bị bệnh đau mắt :-D

![bad_comment](https://images.viblo.asia/3cf1744e-a8e4-489e-9655-98e3aa680c1a.png)

Khi viết code thường mình sẽ chọn các tên biến/hàm sao cho dễ hiểu, không để một class/function quá dài xử lý qúa nhiều, thay vào đó mình tách ra thành các class/function nhỏ hơn (nhưng cũng đừng bóc tách quá nhiều nhé các bạn, cũng phải hợp lý không bệnh đau mắt lại tiếp tục phát triển :-D). Và chỉ comment khi mình thấy thật sự cần thiết, hãy tập viết code sao cho nó "self-explain", đọc lên là biết nó làm gì nhé các bạn

Ở ví dụ trên mình có thể viết gọn lại như sau, người khác đọc cũng có thể hiểu được hàm này làm gì, nhận vào tham số gì, giảm bớt comment dài dòng:
![](https://images.viblo.asia/ca8f3004-fa79-4c08-ba12-c6e8e651b4e6.png)
# Sử dụng các chuẩn ES6,7,8,9
Javascript là ngôn ngữ có tốc độ phát triển rất nhanh đi kèm với đó là sự bổ sung rất nhiều các hàm/thư viện có sẵn mạnh mẽ. Theo mình được biết, mỗi năm "người ta" lại công bố các chuẩn Javascript gọi là ECMAScript hay gọi tắt là ES, mỗi chuẩn này lại bao gồm tập hợp một loạt các tính năng mới được tích hợp vào Javascript.

| Năm | Chuẩn |
| -------- | -------- |
| 2015     | ECMAScript 6 (ES6)     |
| 2016     | ECMAScript 7 (ES7)     |
| 2017     | ECMAScript 8 (ES8)     |
| 2018     | ECMAScript 9 (ES9)     |
| 2019     | ECMAScript 10 (ES10)     |
| 2020     | Chắc là vẫn còn :-D    |

Vậy nên khi code nếu biết tận dụng sức mạnh của thượng thừa của javascript thì code của chúng ta trông sẽ đẹp hơn, tối ưu hơn và trông cute hơn nhiều so với việc chỉ quen dùng các vòng `for` và `if`, `while` truyền thống :-D (cute như anh bạn viết bài này vậy :rofl::rofl:)

Dưới đây mình có để một vài ví dụ những hàm/toán tử mình hay sử dụng nhất khi code:
```js
// Duyệt mảng dùng forEach
arr.forEach((item, index) => {
    // TODO
})

// Duyệt mảng dùng for...of (nếu bên trong có xử lý bất đồng bộ)
for (const item of arr) {
    await something()
}

// Tạo mảng mới với giá trị từ mảng cũ (không làm thay đổi mảng cũ, React cực kì hay dùng)
// Ví dụ: tạo mảng mới có các phần tử với giá trị được x2 so với mảng cũ
const arr = [1,2,3]
const newArray = arr.map(item => item * 2)
console.log(newArray)

// Lọc mảng với điều kiện
const arr = [1,2,3,1]
const newArray = arr.filter(item => {
    if (item === 1) { return item }
})
console.log(newArray)

// nối mảng
const arr1 = [1,2,3]
const arr2 = [4,5,6]
const arr3 = [...arr1, ...arr2]
console.log(arr3)

// lấy ra một thuộc tính trong object
const { email, address } = user
console.log(email, address)

// Copy object/mảng (React rất hay dùng)
const obj = { name: 'my name' }
const clone = { ...obj }
console.log(obj === clone)
```

Ngoài ra còn rất rất nhiều thứ mới luôn được cập nhật mỗi khi có chuẩn Javascript được công bố. Sử dụng chúng một cách linh hoạt sẽ giúp code của chúng ta trông sạch và dễ hiểu hơn rất nhiều ;)

# Bỏ Promise/Callback và chuyển qua Async/Await ngay hôm nay
### Sự tù tội của Promise/callback
Phần này mình tách hẳn ra thành một mục mà không gộp với mục các chuẩn bên trên vì mình thấy hiện tại còn rất nhiều bạn quen dùng Promise/callback, đôi khi các bạn gửi cho mình xem đoạn code mà thấy choáng ngay từ những nốt nhạc đầu tiên :-D. Và sự tình nó là thế này...

Trong khi code, gần  như chắc chắn là chúng ta phải làm việc với API rất nhiều, gọi API từ backend hoặc từ bên thứ ba lấy dữ liệu về và hiển thị. Thường chúng ta sẽ làm như sau:
```js
// lấy danh sách user
axios.get('/users')
.then(response => {
    console.log(response)
})
.catch(error => {
    console.log(error)
})
```
Và nếu ta lại muốn gọi một API khác chỉ khi lấy thành công danh sách user thì thường các bạn sẽ làm như sau :
```js
// lấy danh sách user
axios.get('/users')
.then(response => {
    console.log(response)
    
    axios.get('/addresses') // lấy danh sách địa chỉ
    .then(response1 => {
        console.log(response1)
    })
    .catch(error1 => {
        console.log(error1)
    })
})
.catch(error => {
    console.log(error)
})
```
Điều tồi tệ gõ cửa khi ta muốn gọi 1 loạt API theo thứ tự. Và đây là thứ hẳn các bạn đã thấy khi project scale to lên và các request xử lý cũng nhiều và phức tạp hơn :joy::joy::

![Promise_hell](https://images.viblo.asia/5d655c0b-8d0b-49ec-970e-1060dfe9693b.jpeg)

Điều tương tự cũng sẽ xảy đến với các bạn hay dùng callback function (chạy đâu cho hết nắng :-D). Code của các bạn trông sẽ cực kì rối mắt bởi các câu lệnh xử lý lồng nhau, dẫn đến việc sau này đọc lại thấy choáng và ngay lập tức phải triệu hồi thái y :-D, đó là đối với các bạn người viết ra dòng code, còn với người đến sau thì thật sự là ngất ngay từ cái nhìn đầu tiên :dizzy_face::dizzy_face:

### Async/await giải cứu thế giới
Từ ES6 (2015) thì `async/await` được giới thiệu như một cách thay thế Promise/callback trong việc xử lý các thao tác bất đồng bộ. Sự tuyệt vời của `async/await` là nó giúp ta viết code bất đồng bộ mà trông như đồng bộ, code chạy từng dòng từng dòng, trông rất dễ nhìn, gọn gàng. 

Ví dụ như với đoạn code bên trên lấy danh sách user và địa chỉ ta có thể viết lại bằng cách dùng `async/await` như sau:
```js
async function test () {
    try {
        const users = await axios.get('/users')
        
        const addresses = await axios.get('/addresses')
    } catch (error) {
        console.log(error)
    }
}

test()
```
Xồi, mới thấy trông code đã gọn gàng phải không các bạn :-D. Code trông như đồng bộ, đảm bảo chạy tuần tự tuỳ theo ý muốn của chúng ta. 

Ở bên trên các câu lệnh gọi API như `axios.get('/users')` hay `axios.get('/addresses')` trả về cho chúng ta một Promise (xử lý bất đồng bộ mà kết quả không được trả về ngay lập tức mà ở một thời điểm nào đó sau này), khi ta để `await` trước Promise thì code chạy đến dòng đó sẽ chờ đến khi nào Promise trả về giá trị cho chúng ta thì thôi (hoặc báo lỗi khi timeout). Nhờ thế các request bất đồng bộ được xử lý một cách đơn giản, trực quan hơn.

Điều tương tự phải làm khi có nhiều xử lý bất đồng bộ hơn thì ta chỉ việc await toàn bộ chúng là xong.  :-D

Nhưng cũng có một số lưu ý các bạn cần để tâm:
-  `await` luôn luôn đi cùng với `async`
-  Dùng `try/catch` để bắt lỗi các thao tác xử lý bên trong `async function`
-  Bản chất `await` là nó sẽ đợi đến khi nào Promise trả về giá trị, vậy nên đôi khi `await` nhiều quá sẽ làm cho app của chúng ta chậm.

Mình đã mất một thời gian không chịu dùng vì ngại thay đổi cái mới nhưng đến bây giờ thì mình cực kì ít khi quay trở lại dùng Promise nữa :-D.

À có thêm một điều khá hay khi sử dụng `async/await` thay vì dùng  Promise/Callback thông thường, đó là khi dùng `try/catch` để bắt lỗi `async/await` đồng thời cũng cho phép chúng ta bắt toàn bộ các lỗi khác bên trong khối `try/catch` đó chứ không chỉ mỗi `async/await` nữa. Xem nhanh ví dụ để hiểu nhé :-D:
```js
// khi dùng Promise
axios.get('/users')
.then(response => {
    console.log(response)
    
    console.log(test) // `test` chưa khai báo, nhưng Promise không bắt được lỗi
})
.catch(error => {
    console.log(error) // không trả về lỗi biến `test` ở đây
})

// dùng `async/await`
async function test () {
    try {
        const users = await axios.get('/users')
        
        const addresses = await axios.get('/addresses')
        
        console.log(test) // `test` chưa được khai báo
    } catch (error) {
        console.log(error) // trả về  "test is undefined..."
    }
}
```
Ví dụ trên là một trường hợp đơn giản mà `try/catch` giúp ta bắt lỗi. Tưởng tượng một đoạn code dài như bài văn tế nếu dùng Promise khi xảy ra lỗi thì debug ngập mặt :confounded::confounded:, nhưng khi dùng `try/catch` thì ta có thể bắt được toàn bộ các lỗi xảy ra trong khối `try/catch` đó. Thấy yêu chưa nào các bạn <3 <3

> - "Nhưng giờ code toàn có Promise với callback thế này chuyển qua async/await được không"
> - "Code tôi rối thế này ông có chắc là có chuyển được từ Promise/callback sang async/await". 
> 
> Thì câu trả lời cho các bạn là: luôn có thể chuyển đổi từ các dạng bất đồng bộ truyền thống (Promise, Callback, hay các dạng event emitter bất đồng bộ) sang thành `async/await` nhé. ;)

Dưới đây mình điểm danh một số trường hợp mình hay gặp khi cần chuyển đổi từ Promise,callback... sang `async/await`
```js
//-----------START Promise -> async/await
// Trước
function getUsers(){
    axios.get('/users')
    .then(response => {
        console.log(response.data.user)
    })
    .catch(error => {
        console.log(error)
    })
}

// Sau
async function getUsers(){
    try {
        const users = await axios.get('/users')
    } catch (error) {
        console.log(error)
    }
}
//----------- END Promise -> async/await

//-----------START Callback -> async/await
// Trước
getUsers((error, response) => {
    if (error) { throw error }
    console.log(response)
})

// Sau
const util = require('util')
getUsersPromise = util.promisify(getUsers) // chuyển từ callback sang promise

async function getUsersAsync(){
    try {
        const users = await getUsers()
    } catch (error) {
        console.log(error)
    }
}

//-----------END Callback -> async/await
```
Trông cũng đơn giản không mất thời gian để chuyển sang `async/await` phải không nào ;), điều quan trọng là code của chúng ta đẹp, dễ bảo trì, sau này nhìn lại đảm bảo mắt không bị thêm bệnh gì nữa :-D :-D. Nói chung chỉ cần các bạn chuyển được các xử lý bất đồng bộ `Promise, callback hay dạng event` về thành `Promise` là ta có thể `await`được (đương nhiên nếu là Promise sẵn rồi thì không cần nói nhiều, phang luôn `async/await` nhé hỡi những người anh em thiện lành :-D)

> Note: trên đời không có gì là hoàn hảo cả, `async/await` cũng vậy :-D, sẽ có những trường hợp ta vẫn phải dùng Promise/callback. Nhưng nói chung cá nhân mình thấy async/await giải quyết được rất nhiều vấn đề, cái được nhiều hơn cái mất nhiều đó ;)
# Cải thiện chất lượng code với Typescript
### Chuyện bắt đầu là...
Ngày mới học lập trình, mình bắt đầu với C, sau đó đến Java, chúng là các ngôn ngữ mình thấy khá mạnh mẽ, và yêu cầu cực kì chặt chẽ khi code. Yêu cầu định nghĩ rõ, đầy đủ các kiểu dữ liệu (string, boolean,....) hay các chỉ định truy cập (public, private, protected,...), ngày đó mình lắm lúc mình phát ngấy vì chạy code không biết cái này public hay private, không biết kiểu dữ liệu của nó là gì, cứ chạy đã lúc nào báo lỗi thì biết :joy::joy:

Sau này chuyển qua Javascript (hay PHP, Python) thì đã được đơn giản đi rất nhiều vì không cần quan tâm kiểu dữ liệu là gì nữa. Cứ khai báo luôn biến là xong:
```js
let x = 1

const test = 'This is a test'

const arr = [1, 2, 3, 4, 5]
```
Đây cũng là một trong những điều làm mình yêu JS ngay từ những ngày đầu vì cú pháp rất "phóng khoáng", ít lằng nhằng, trông code sạch sẽ đẹp đẽ :-D. Và cuộc đời không như là mơ, không có tình yêu nào mãi là màu hồng :joy:, dần dần mình nhận ra một điều là khi project có nhiều người, hay sau khi code 1 thời gian ta quay lại đọc code thì thật sự bị rối trí bởi không biết biến này kiểu gì, hàm này trả về kiểu ra sao...
```js
const var1 = db.column1
const var2 = db.column2
const var3 = db.column3
const var4 = db.column4
```
Và điều gần như tất yếu là mình sẽ phải làm như sau:
```js
const var1 = db.column1
console.log(var1) // -> string
const var2 = db.column2
console.log(var2) // -> boolean (true/false)
const var3 = db.column3
console.log(var3) // -> number
const var4 = db.column4
console.log(var4) // -> array
```
Điều này làm mình rất mất thời gian, và không thể chắc được là tương lai mình quay lại đọc, hoặc người mới đọc code mình có thể hiểu được, và mình/họ lại phải làm đôi chục câu lệnh `console.log` để hiểu được code làm gì :-D
### Typescript giải quyết vấn đề nhức nhối
Đọc các blog, tutorial trên Medium, Hackernoon, lang thang trên Google mình biết đến `Typescript`. 

Typescript theo mình hiểu theo cách đơn giản là Javascript "phiên bản nâng cấp". Giờ đây code Javascript của ta sẽ có các kiểu được định nghĩa rõ ràng (string, boolean, number,...), các hàm có chỉ định truy cập (public, private),... và rất nhiều thứ khác. Code viết bằng Typescript sẽ được biên dịch thành Javascript thuần nên ta có thể chạy như bình thường, không cần bộ chuyên chạy Typescript hay gì khác. Xem qua chút ví dụ nhé ;):
```typescript
class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");
```
Nhờ vào việc viết code Javascript nhưng lại "có kiểu", nên code của ta sẽ chặt chẽ hơn nhiều, khi đọc ta có thể hiểu được biến này kiểu dữ liệu là gì, hàm này nhận tham số đầu vào là gì, trả về dữ liệu ra sao.

> WTH? Ông đùa tôi đấy à? Mình đi từ C -> Java -> ... -> đến Javascript, qua cả một chặng đường dài, :-D, code Javascript thuần đang đẹp như thế, ông thêm mấy cái kiểu dữ liệu bla blo vào, giờ trông nó có rối mắt không? có khác gì code Java, C++ không? Thế hoá ra mình đang quay lại code theo kiểu ngày trước à? Các phần trên ông nói về bệnh đau mắt, đây mắt tôi chuẩn bị mờ đến nơi rồi đây này. :joy::joy:

> Code viết dài dòng văn tự, cứ để đấy, tôi dùng console.log cũng được.

Với mình, nghe đến Typescript từ tầm 2 năm trước, nhưng vẫn không thích dùng và không muốn dùng vì chỉ yêu thích sự phóng khoáng của Javascript, lắm lúc muốn thử tí coi sao nhưng khổ mắt mình bị nhạy cảm, cứ thấy loằng ngoằng là bệnh đau mắt nó phát triển :laughing::laughing:

Nhưng một thời gian trước đây mình quyết định chuyển qua Typescript vì những vấn đề đau đầu ở trên mình đã nói khi đọc lại code cũ hoặc code của người khác, và cũng vì anh em cộng đồng dev xu hướng chuyển sang Typescript rất nhiều và review rất tốt. Và đúng thật, dù có đôi chút khó khăn ban đầu nhưng về sau mình thấy Typescript rất dễ dùng, vì bản chất nó chỉ như "nâng cấp" của Javascript, code chuyển từ Javascript sang Typescript rất dễ, thậm chí đoạn Javascript nào không muốn chuyển cứ để đó :). 

Giờ đây mỗi khi quay lại đọc code mình có thể hiểu ngay và tường tận từng biến thuộc kiểu gì, hàm này trả về kiểu gì, mảng này có bị thay đổi xuyên suốt chương trình hay không,... Lại rút ngắn thêm được rất nhiều thời gian và giảm được tối đa các thao tác thừa như check xem dữ liệu là gì, như thế nào (ý là check bằng console.log đó các bạn :-D :-D)

Hiện tại mình thấy Typescript đang là xu thế của anh em dev Javascript, các thư viện mới, các framework mới hầu như đều phải chú ý support cho Typescript như Angular, React hay Vue đều có thể viết Typescript được. Cho bạn nào chưa biết: Vue 3 cũng được viết lại 100% Typescript luôn đó các bạn ;). Đồng thời Typescript do Microsoft phát triển nên anh em yên tâm về chất lượng và độ support nhé ;)

Ngày trước đọc tuyển dụng các job nước ngoài lương khơ khớ, thì toàn thấy đòi Typescript/Flow*, và cứ thấy job kiểu đó là mình chạy mất dép vì không có biết Typescript /Flow là cái gì hết á, mà title là về làm web mà, sao không dùng mỗi Javascript iu dấu cũng được mà :sob::sob:

**Flow cũng là 1 dạng gần như Typescript do Facebook phát triển, code React/React Native mọi người cũng dùng khá nhiều*

Nhưng giờ cũng gọi là "quen quen" được Typescript nên không còn ngại những job kiểu đó nữa (số lượng các job đó thì tăng ngày một nhanh), đồng thời đúng thật khi project scale to hơn, nhiều người hơn thì lúc đó ta sẽ thấy rõ được sự tiện lợi của nó. Mặc dù project hiện tại mình đang làm không có nhiều người, nhưng hầu như mình đã chuyển toàn bộ code Javascript sang thành Typescript. Cũng phải luyện tập chuẩn bị cải thiện dần, học những cái tốt hơn cho tương lai tươi sáng chứ nhỉ hỡi những người anh em thiện lành của tôi ;)
# CI/CD - Code -> Test->Deploy
Phần này biết anh em đọc đến cái tiêu đề là chuẩn bị buồn ngủ rồi đây, nhưng mình rất mong các bạn có thể đọc nốt được vì mình thấy đây cũng đang là xu thế trong những năm gần đây.
### Automation test
Thật sự đây là vấn đề muôn thuở anh em nào cũng biết nhưng cũng khá nhiều anh em vẫn bỏ qua và cố gắng chỉ tập trung vào code cho thật to thật khủng :-D 

Cũng chỉ muốn nói với các bạn một chút rồi tiến tới phần sau:
- Đôi khi quá tập trung vào code mà quên đi phần test do đó khi deploy code có nhiều lỗi, nhẹ thì fix nhanh deploy lại là xong, nặng thì dẫn tới sai sót dữ liệu, hệ thống xử lý không chính xác,...
- Và cũng đôi khi chúng ta nghĩ rằng code của chúng ta đã cover (bao trọn) được các trường hợp xảy ra lỗi nên ta chủ quan không test nữa dẫn tới hệ quả như trên
- Và rồi cũng lại vì sự chủ quan, có test, nhưng test không kĩ dẫn đến việc suýt đánh nhau sống chết với team Tester vì "làm gì code của tôi nhiều lỗi thế, tôi test hết rồi" :joy::joy:

Vậy nên ngay từ bây giờ ta nên tập cho mình thói quen viết test sau khi đã hoàn thành một/một số công đoạn trong quá trình phát triển, test kĩ càng cố gắng sao cho cover được hầu hết các trường hợp cơ bản. Mỗi lần trước khi commit chạy test để máy nó test code cho ta rồi hẵng push code nhé, mà test hoàn toàn tự động cơ mà, mình chỉ việc định nghĩa 1 lần, ;)

### CI/CD - Test và deploy liên tục
CI/CD (Continuous integration / continuous integration - tích hợp/ triển khai liên tục), mình thấy hiện tại đây là một xu hướng, một cách mới trong việc giúp ta viết code, test và deploy một cách tự động và liên tục.
![CI_CD](https://images.viblo.asia/1534c1ca-29fa-4090-98fe-21f8d2218eee.png)
Trước kia khi code xong ta cần phải test sau đó nếu mọi thứ ok tuyệt vời thì mới commit code lên repository, mặc dù ở local đã được setup automation test rồi, chạy một phát check code ok rồi commit là xong.
- Nhưng điều gì sẽ xảy ra nếu như một người chưa test code mà đã push ngay lên repo chung? khi đó sẽ lại cần phải có những người đi review code, check lại code để chắc chắc mọi thứ đều ổn
- Nếu ở local lỡ xoá đi một vài test case bằng một cách "vô thức" nào đó :-D :-D, vẫn chạy test bình thường, qua các bước kiểm tra ngặt nghèo, commit code tưởng xong và ôi thôi khi tester nhảy vào thì bật console của Chrome lại thấy đỏ lừ :pout::pout:
- Đặc biệt đối với các project có nhiều người cùng tham gia, hay như các thư viện/framework có cả trăm/nghìn contributor, không thể tin tưởng vào tay nghề test của mấy cha dev được, ông nào cũng test linh tinh xong commit code lên lỗi thì thời gian đâu ngồi review code :) :)

Vậy là các tool dành cho việc test code, build code và deploy tự động ra đời. Các tool này thường được setup chung với repository chưa source code, ta setup các kịch bản test, các bước build project, rồi deploy như thế nào, sau đó với mỗi commit của dev đều sẽ được tự động check qua các bước/kịch bản đó, nếu ok thì mới merge vào code chính, rồi build rồi deploy chạy thật. Qúa trình này hay gọi là CI/CD.

Điều này tiết kiệm được rất nhiều thời gian, giảm thiểu tối đa các thao tác thừa và lặp lại, đồng thời cho phép ta khả năng triển khai code ra `production` càng sớm càng tốt.

Ok đã hiểu, giờ bắt đầu thế nào:
- Đầu tiên các bạn nên học thêm về Docker
- Viết automation test cho project (tất nhiên rồi, phải có test :joy::joy:)
- Tìm các platform có cung cấp dịch vụ CI/CD. Ở đây mình hay dùng Gitlab, vì Gitlab free, private và có rất nhiều công cụ mạnh mẽ cho CI/CD so với những nơi khác (theo mình xem qua circleci và travisci thì đánh giá nhanh vậy :D)
- Tìm hiểu và cấu hình test (unit test, api test, coverage test,...), build deploy tự động.

# Lời kết
Phù, vẫn như thường lệ, ông viết blog này vẫn dài dòng lê thê như các bài khác, vừa đọc vừa ngáp lên ngáp xuống :joy::joy:

Qua bài này mong rằng có thể chuyển tải chút gì đó từ những thứ mình học được để giúp các bạn có phương hướng cải thiện kĩ năng code Javascript, ngày càng nâng cao khả năng của bản thân, từ đó mở ra được những cơ hội mới, tạo ra các sản phẩm chất lượng hơn :)

Javascript mình thấy là một ngôn ngữ có tốc độ phát triển nhanh, cực kì mạnh mẽ (build được hầu hết các loại ứng dụng trên tất cả các nền tảng mà mình biết), do đó nếu liên tục cập nhật, học hỏi, cập nhật có thể giúp chúng ta rút ngắn thời gian phát triển, nâng cao năng suất, chất lượng và giúp ta giảm thiểu được bệnh đau mắt nhiều hơn :joy::joy:

Cám ơn các bạn đã theo dõi blog của mình, trong bài nếu có gì chưa chính xác hoặc các bạn có những điều gì hay ho thì nhớ comment bên dưới cho mọi người cùng biết nhé <3 <3 .