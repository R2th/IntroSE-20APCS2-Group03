Chào mừng bạn trở lại với series!  
Ở bài trước chúng ta đang dừng lại ở v-if và v-show. Bài này chúng ta sẽ học cách lặp qua các arrays và objects và tạo một phần tử cho một từng các items của chúng.
## v-for
Chúng ta có thể dùng directive v-for để render một danh sách các item dựa trên một mảng. Directive v-for đòi hỏi một cú pháp đặc biệt dưới dạng item in items, trong đó items là mảng dữ liệu nguồn và item trỏ đến phần tử mảng đang được duyệt đến.   
Hôm nay chúng ta sẽ bắt đầu với một bảng trống để mọi thứ rõ ràng hơn.
```
<html>

<head>
  <title>Vue 101</title>
</head>

<body>
  <div id="app">

  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

  <script>
    const app = new Vue({
      el: '#app',
      data: {

      },
      methods: {

      }
    });
  </script>
</body>

</html>
```
chúng ta sẽ bắt đầu tạo một list đơn giản, một arrays, mà chúng ta có thể lặp nội dung của nó. Tôi sẽ tạo một thuộc tính bên trong đối tượng dữ liệu của tôi, được gọi là games. Hãy thoải mái thay đổi tiêu đề thành bằng tên mà bạn thích.
```
data: {
  games: [
    'Super Mario 64',
    'The Legend of Zelda Ocarina of Time',
    'Secret of Mana',
    'Super Metroid'
  ]
},
```
Bây giờ chúng ta đã thiết lập mảng của mình, hãy tạo một phần tử <ul> đơn giản để hiển thị nó.   
Trong Vue, tôi khai báo chỉ thị v-for của chúng tôi trên TOP của phần tử mà tôi muốn lặp. Thực hiện những thay đổi này cho thẻ <li> của bạn và tôi sẽ mổ xẻ chúng sau.
```
<ul>
  <li v-for="game in games">{{ game }}</li>
</ul>
```
Cùng xem nào.
1. v-for đã được thêm trực tiếp vào <li>, không phải ở thẻ <ul> như chúng ta đã thấy trước đó. Điều này nghĩa là: "Đối với mỗi game trong mảng arrays của tôi, vui lòng tạo một <li> mới bên trong các thẻ <ul> này.
2. Lưu ý rằng game là thuộc tính mà tôi đã thêm trước đó với mảng bên trong dữ liệu của tôi, vì vậy tôi phải sử dụng tên biến này.
3. Biến game (số ít) được định nghĩa tùy ý, tôi có thể sử dụng `item`, `game`, `title` hoặc bất cứ tên tôi cảm thấy thích. Nhưng hãy chắc chắn hiểu rằng `game` này trong các games là những gì bạn sẽ sử dụng như một biến trong vòng lặp của mình.
4. Cuối cùng, bên trong thẻ <li> của tôi, tôi đưa ra nội dung của biến game, vì vậy trong khi vòng lặp đang chạy cho mỗi games, điều này sẽ xuất chuỗi thành <li>.  
    
Chạy ứng dụng của bạn bên trong trình duyệt và bạn sẽ thấy danh sách các mục của mình được đưa ra màn hình.
### Taking it up a notch
Xa hơn, v-for thực sự là một khái niệm rất đơn giản và ví dụ này là siêu nhàm chán. Vậy làm thế nào về việc chúng ta làm cho mọi thứ phức tạp hơn một chút, bằng cách làm cho array của chúng ta bao gồm một số objects và cũng áp dụng một số v-if trong danh sách của chúng ta?  
Trước tiên, hãy cập nhật games của tôi với một số dữ liệu thú vị hơn.
```
data: {
  games: [
    { name: 'Super Mario 64', console: 'Nintendo 64', rating: 4 },
    { name: 'The Legend of Zelda Ocarina of Time', console: 'Nintendo 64', rating: 5 },
    { name: 'Secret of Mana', console: 'Super Nintendo', rating: 4 },
    { name: 'Fallout 76', console: 'Multiple', rating: 1 },
    { name: 'Super Metroid', console: 'Super Nintendo', rating: 6 }
  ]
},
```
Nếu bạn chạy ứng dụng của mình thì điểm này sẽ không bị hỏng, nhưng nó sẽ chỉ xuất ra các đối tượng ở định dạng chuỗi, không đẹp. Trên thực tế, tôi sẽ hoàn toàn xem xét phương pháp <ul> của mình và sử dụng` <div>` để xuất thông tin của chúng tôi.
```
<div id="app">
  <div v-for="game in games">
    <h1>{{ game.name }} - <small>{{ game.console }}</small></h1>

    <span v-for="star in game.rating">❤️</span>

    <div v-if="game.rating > 5">Wow, this game must be <b>REALLY</b> good</div>
  </div>
</div>
```
1. `div v-for="game in games"` Tương tự như cũ, tôi sẽ lặp lại mảng games của chúng tôi và lưu trữ từng game trong biến `game`.
2. `h1`:  `game` là một đối tượng, lần lượt giữ các thuộc tính, name, console và rating riêng của nó. Bên trong <h1> chúng tôi sẽ xuất name* của game: `game.name`. Và console: `game.console`. Như bạn có thể thấy bây giờ, v-for không bị giới hạn chỉ xuất ra một yếu tố duy nhất như chúng ta đã thấy trước đây với li, nhưng bạn thực sự có thể xuất ra nhiều HTML như bạn cần.
3.  Các v-for lồng nhau. Bên trong phần tử span chúng ta thực sự có một vòng lặp v-for lồng nhau (điều này HOÀN TOÀN ok để làm), ngoại trừ một chút khác biệt, chúng ta không lặp một mảng hoặc một đối tượng.
4. Cuối cùng, `v-if`. Chúng tôi sẽ xuất thẻ `<div>` trong vòng lặp của mình IF điều kiện được đáp ứng, vì vậy chỉ hiển thị khi và chỉ khi rating của trò chơi hiện tại lớn hơn 5. 
    
Hãy tiếp tục và chạy nó một lần nữa trong trình duyệt của bạn và xem xét sự tuyệt vời và đừng bận tâm với CSS.
###     The :key attribute
Một điều cuối cùng mà tôi cố tình để lại cho đến cuối cùng. Thuộc tính `:key`.
Khi bạn lặp qua các phần tử với v-for, Vue.js KHÔNG có cách nào để theo dõi các phần tử của bạn để phản ứng, bởi vì nó không thể "phân biệt" một đối tượng này với đối tượng kia. Điều này có ý nghĩa gì với bạn là vì Vue không thể làm điều này, nó sẽ hiển thị lại phần WHOLE của trang đang được tạo bởi vòng lặp này. Trong trường hợp của tôi, đó là một phần rất nhỏ và hiệu suất đạt được có thể là tối thiểu, nhưng đó là điều mà bạn nên ghi nhớ - và chỉ cần làm điều đó để thực hành tốt nhất.  
Làm thế nào để sử dụng nó?
`:key` mong đợi một số chuỗi nó sẽ sử dụng để "đặt tên" hoặc "theo dõi" phần tử, vì vậy chúng tôi cần cung cấp cho nó một mã định danh duy nhất. Trong trường hợp `games` của tôi đơn giản, tôi có thể làm:
```
<div v-for="game in games" :key="game.name">
```
Tôi khá chắc chắn rằng tôi sẽ không có cùng một trò chơi hai lần trong danh sách này, vì vậy điều này khá an toàn. Dùng một `id` nếu bạn có dữ liệu đến từ cơ sở dữ liệu cũng là lý tưởng để sử dụng ở đây.
## Form Input Bindings
### Basic Usage
Bạn có thể sử dụng directive v-model để tạo ràng buộc dữ liệu 2 chiều lên các phần tử form input và textarea. Vue sẽ tự động chọn cách phù hợp để cập nhật phần tử này dựa trên kiểu của input. Có một chút ma thuật, v-model là syntax sugar trong việc cập nhật dữ liệu dựa trên các sự kiện input từ người dùng kèm theo một số trường hợp đặc biệt khác.  
Đối với v-model nó sẽ bỏ qua tất cả các khởi tạo của value, checked hay selected trên các thành phần của form và nó luôn xử lý các dữ liệu có trong Vue instance, chính vì thế bạn nên khai báo các giá trị khởi tạo đó ở trong data scope của Vue instance.
Ví dụ với form input:
```
<input v-model="message" placeholder="Enter mesage">
<p>Message: {{ message }}</p>
```
Ví dụ với form text area:
```
<span>Thông điệp có nhiều dòng:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<br>
<textarea v-model="message" placeholder="Nhập văn bản có nhiều dòng"></textarea>
```
### Modifier
1. lazy  
Thông thường thì v-model sẽ tự động đồng bộ trong quá trình soạn thảo (chỉ trừ các ngôn ngữ IME - xem ở phần lời kết nhé!), nhưng nếu bạn muốn thay đổi trạng thái đó thì bạn có thể sử dụng .lazy modifier để chuyển đổi nó sang trạng thái change event (có nghĩa là khi input thay đổi thì dữ liệu mới tiến hành đồng bộ).
```
<div id="app">
    <input type="text" v-model.lazy="message" placeholder="nhập dữ liệu...">
    <p>message = {{ message }}</p>
</div>
```
2.    number  
Nếu như bạn muốn ràng buộc dữ liệu đầu vào của input chỉ được phép là số thì hãy sử dụng modifier .number để ràng buộc điều này.
```
<div id="app">
    <input type="text" v-model.number="message" placeholder="nhập dữ liệu...">
    <p>message = {{ message }}</p>
</div>
```
3. trim  
Còn nếu như bạn muốn loại bỏ những khoảng trắng ở hai đầu của dữ liệu thì .trim modifier là một lựa chọn cực kỳ tuyệt vời.
```
<div id="app">
    <input type="text" v-model.trim="message" placeholder="nhập dữ liệu...">
    <p>message = {{ message }}</p>
</div>
```
    
    
    
> v-model chỉ hoạt động tốt trên các ngôn ngữ dạng latinh thôi, còn nếu như bạn sủ dụng các dạng ngôn ngữ thuộc loại IME (là loại dành cho mấy ngôn ngữ nhật bản, trung quốc, hàn quốc, ...) thì v-model nó sẽ không thể đồng bộ hóa dữ liệu trong quá trình soạn thảo hoặc changing được, và để khắc phục nhược điểm đó bạn có thể sử dụng các directive sự kiện.