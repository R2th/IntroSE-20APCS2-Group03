Vào những ngày đầu được join dự án thực tế lúc ấy khá là non nớt và còn chưa biết nhiều về cách thiết kế chương trình hay làm sao để chương trình của mình được viết một cách tối ưu nhất, thời điểm đấy team tôi thiếu người và leader lại bận "sm" vì phải care cùng lúc 2 projects, tôi nhận được task là phải thiết kế base cho một con module khá là phức tạp và rất nhiều xử lý logic, quả là một cơ hội nhưng mà cũng là một thử thách lúc đó đối với tôi. Sau một lúc suy nghĩ và lên ý tưởng tôi bắt đầu viết những dòng code đầu tiên theo ý tưởng kế thừa trong OOP tuy nhiên sau khi gửi pull request tôi đã nhận được không ít "gạch đá" à nhầm "comments". 

Hì hục ngồi thiết kế đi thiết kế lại làm sao cho sau này dễ dàng phát triển mở rộng và có thể giải quyết được những trường hợp "dị dị" khi khách hàng yêu cầu, may mắn tôi được một tiền bối suggest em nên thiết kế con base này theo kiểu **Composition over Inheritance** và đương nhiên tôi bắt đầu tìm hiểu về nguyên lý này vì trước đó khi ngồi trên ghế nhà trường hay thời gian thực tập tôi chưa từng nghe đến khái niệm trên. Sau khi áp dụng nó đã giải quyết được những vấn đề nhức đầu mà tôi gặp phải, bài viết dưới đây chúng ta sẽ cùng tìm hiểu về nguyên lý "Composition over Inheritance" và lợi ích của nó nhé.

# Giới thiệu ý tưởng
Vì lý do bảo mật của dự án nên mình sẽ chỉ lấy một ví dụ demo be bé sau để chúng ta cùng xem tìm hiểu nhé. Vào một ngày cuối tuần đẹp trời ngẫu hứng bạn muốn làm một game đơn giản để lòe với bọn bạn hay ghi điểm với người yêu, giả sử trò chơi được thiết kế như sau đầu tiên chúng ta cần một chú chó và dĩ nhiên chó thì phải "sủa" rồi, chương trình của chúng ta sẽ có dạng như sau:
```
Dog
  .bark()
```
Tiếp tục nhé chúng ta thêm một đối tượng "cat" vào:
```
Cat
  .meow()
```
Game bắt đầu sinh động hơn rồi đây. Cũng như bao con vật khác chúng đương nhiên phải lớn lên khi đó ta bổ sung thêm function grow()
```
Dog
  .grow()
  .bark()
Cat
  .grow()
  .meow()
```
Có vẻ đã vi phạm nguyên tắc **DRY**(Don't repeat yourself) trong thiết kế chương trình, xử đẹp nó bằng cách thêm lớp Animal rồi ném function đấy vào là mọi chuyện đã được giải quyết :D
```
Animal
  .grow()
  Dog
    .bark()
  Cat
    .meow()
```
Giả sử 2 con vật trên của chúng ta làm rối tung căn nhà lên và khi đó chúng ta cần một con robot để dọn dẹp
```
CleaningRobot
  .drive()
  .clean()
```
Thêm một đối tượng robot sát thủ để "đá đít"nhưng con vật nào phá phách nào X:)
```
MurderRobot
  .drive()
  .kill()
```
Lại một lần nữa duplicate code ta lại áp dụng lý thuyết SGK bằng cách thêm class Robot
```
Robot
  .drive()
  CleaningRobot
    .clean()
  MurderRobot
    .kill()
```
Và đây tổng thể chương trình của chúng ta
```
Robot
  .drive()
  CleaningRobot
    .clean()
  MurderRobot
    .kill()

Animal
  .grow()   
  Dog
    .bark()
  Cat
    .meow()
```
Sau vài tháng phát triển game của bạn càng ngày càng được nhiều bạn bè biết đến và bỗng dưng cô nàng người yêu đỏng đảnh của bạn yêu cầu thêm một con chó robot có các hành động sau: `.kill(), .drive(), .bark()` nhưng không thể lớn lên `.grow()   `
Có vẻ hơi khoai vì ta không biết để đối tượng MurderRobotDog vào đâu trong cây kế thừa hiện tại của chương trình. Thử nhìn đoạn code dưới đây nhé: 
```
GameObject
  .bark()
 
  Robot
    .drive()
    CleaningRobot
      .clean()
    MurderRobot
      .kill()
      MurderRobotDog
  
  Animal
     .grow()
     Dog
     Cat
       .meow()
```
Bằng cách tạo một parent object và ném những function chung vào với cách thiết kế kiểu này tránh được việc DRY code nhưng lại làm cho các object có rất nhiều function không bao giờ dùng đến. Và hơn nữa nếu chương trình chúng ta có rất nhiều đối tượng và functions chứ không chỉ đơn giản như ví dụ trên thì chúng ta không thể nào overwrite lại hết chúng được. Nghĩ cách khác thôi:
```
Robot
  .drive()
  CleaningRobot
    .clean()
  MurderRobot
     .kill()
     MurderRobotDog
       .bark()

Animal
  .poop()
  Dog
    .bark()
  Cat
    .meow()
```
Hmm... Lại DRY code :(. Thử nghĩ đến cách thiết kế kiểu **Composition** nhé lưu ý sự khác nhau giữa inheritance và composition nha (inheritance is when you design your types around what they are, and composition is when you design types around what they do).

Tổng kết lại các đối tượng và hành động trong trò chơi
```
dog            = grow + barker
cat            = grow + meower
cleaningRobot  = driver + cleaner
murderRobot    = driver + killer
murderRobotDog = driver + killer + barker
```
Cùng thực hành trên browser luôn nhé :D, ta định nghĩa các function bark() và drive() như các đối số để truyền vào thay vì định nghĩa nó như các function nội bộ trong class
```
const barker = (state) => ({
  bark: () => console.log('Woof, I am ' + state.name)
})
const driver = (state) => ({
  drive: () => state.position = state.position + state.speed
})
const killer = (state) => ({
  kill: () => console.log('Kill someone')
})
```
```
const murderRobotDog = (name)  => {
  let state = {
    name,
    speed: 100,
    position: 0
  }
  return Object.assign(
        {},
        barker(state),
        driver(state),
        killer(state)
    )
}
const bruno =  murderRobotDog('bruno')
bruno.bark() // "Woof, I am Bruno"
```
Với cách thiết kế kiểu này murderRobotDog khởi tạo một state object và được gán các giá trị mặc định như speed và position. Object.assign tạo ra một đối tượng mới và gán các thuộc tính từ một đối tượng khác. Như vậy ta đã giải quyết được các vấn đề duplicate code và có thể dể dàng mở rộng chương trình khi áp dụng nguyên lý này.

Mặc dù không thể phủ nhận sức mạnh của Inheritance tuy nhiên ta cần xem xét việc áp dụng nó một cách hợp lý chứ không phải khi nào cũng lạm dụng một cách bừa bãi sẽ gây ra những rắc rối như ví dụ tôi đã đưa ra ở trên. Với nguyên lý **Composition over Inheritance** ta gom các phương thức chung vào một đối tượng riêng sau đó thực hiện tham chiếu các đối tượng này vào đối tượng mới được khởi tạo. 

Mỗi cách thiết kế đều có ưu nhược điểm riêng, chúng ta cần xác định rõ mục đich, và vận dụng các nguyên lý một cách thuần thục để thiết kế chương trình làm sao cho tối ưu nhất.

# Tài liệu tham khảo
[Composition over Inheritance (Mattias Petter Johansson)](https://medium.com/humans-create-software/composition-over-inheritance-cb6f88070205)