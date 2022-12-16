Phần này ta sẽ bắt đầu tìm hiểu về component nhé. 
Chúng ta sẽ bắt đầu bằng đoạn code dưới đây
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

      }
    });
  </script>
</body>

</html>
```

# Component cơ bản
Chúng ta sẽ hướng đến việc tạo component bởi vì đây là nơi những thứ thú vị thực sự bắt đầu. Nhưng hãy yên tâm rằng những gì sau đây chỉ đơn thuần là component. Ngoài ra, chúng ta sẽ chưa tìm hiểu các thuộc tính và watcher, đây cũng là một trợ giúp rất lớn cho các bạn sau này. Nhưng chúng ta sẽ đề cập đến nó trong lần tiếp theo sau khi nắm rõ được những bài học của chúng ta ngày hôm nay.

Các component là một phần cốt lõi của Vue.js, chúng là các khối Lego của bạn để xây dựng các ứng dụng phong phú - và may mắn cho chúng ta, chúng rất đơn giản để tìm hiểu và sử dụng!

Hãy coi component như là bất kỳ yếu tố nào trong trang web / ứng dụng của bạn mà bạn muốn sử dụng một hoặc nhiều lần. Nó có thể là button, hoặc input field, hoặc lớn như toàn bộ thanh menuhoặc thậm chí toàn bộ trang.

Ưu điểm của việc tạo một component là bạn viết logic cho cách hiển thị của nó (HTML / CSS) và cách nó tương tác với người dùng (JS) một lần - và sau đó bạn có thể thoải mái sử dụng nó trên ứng dụng của mình.

Như thường lệ, chúng ta sẽ bắt đầu với một ví dụ đơn giản nhất có thể, button.
Trước tiên, hãy xác định kế hoạch chi tiết hoặc mẫu cho component này, chúng ta sẽ gọi nó là awesome-button!

Hãy tạo một component awesome-buttoni mới. Sao chép đoạn code này và bỏ vào phía trên khai báo *new Vue* của bạn.
```
Vue.component('awesome-button', {
  template: `<button @click="clickHandler">Click me for some awesomeness</button>`,
  methods: {
    clickHandler() {
      alert('YAAAS 😎');
    }
  }
});
```

Component Vue được cung cấp cho chúng ta thông qua thẻ *script Vue.js* mà chúng ta đã thêm vào trong ngày đầu tiên. Nó cho phép chúng ta tạo ra một component mới, như mong đợi. Tham số đầu tiên chúng ta thiết lập sẽ là một *String*, đây sẽ là tên component của chúng ta.

Tham số thứ hai là một object JavaScript cùng loại với object mà chúng ta đã cấu hình và sử dụng cho ví dụ *Vue instance*! Bạn nghĩ điều này có ý nghĩa gì với bạn? Đó chính là bạn đã biết cách gán các thuộc tính và phương thức cho component mới này.

Trong ví dụ trên, bạn sẽ nhận thấy chỉ có một điểm khác biệt - thuộc tính mẫu. Ở đây, chúng ta đang khai báo một *String* (lưu ý rằng chúng ta cũng đang sử dụng ký tự back-tick để bọc nó để chúng ta có thể khai báo nhiều dòng sau này nếu chúng ta cần mà không phải nối nhiều String), String này sẽ giữ an toàn cho code HTML của component này. Trong trường hợp của ví dụ cụ thể này, chỉ cần một thẻ <button> đơn giản là đủ.

Nếu bàn reload trang của mình ngay bây giờ, sẽ không có chuyện gì xảy ra cả. Hãy nhớ rằng trước đó tôi đã bảo với bạn rằng đây chỉ là bản mẫu? Bây giờ chúng ta sẽ khiến cho nó thực sự hiển thị trên trang web của ta.
    
Đi vào <div id = "app"> nơi chúng ta đã đặt tất cả các đánh dấu của mình và tạo một phần tử <awesome-button> mới.
    
Đoạn HTML của bạn nên trông giống như thế này
```
<div id="app">
  <awesome-button></awesome-button>
</div>
```
    
 Tải trang và bây giờ bạn sẽ thực sự thấy button được hiển thị trên trang. Đặt một hoặc mười hay nhiều hơn (tùy vào bạn), thẻ awesome-button trên trang. Bây giờ bạn bắt đầu thấy sức mạnh của các component, mặc dù tại thời điểm này tôi nghĩ rằng chúng ta có thể nâng nó lên thêm một chút.
    
Bonus: Nếu bạn thuộc loại tò mò, hãy xem source trang của bạn và so sánh nó với tính năng *inspect*. Khi tải trang, Vue.js đang sử dụng thẻ <awesome-button> làm phần giữ chỗ đến nơi sẽ đặt nội dung của mẫu của chúng ta.
    
# Level 2 - Những thứ hữu dụng hơn chút!!
    
Hãy xem lại ví dụ của chúng ta từ tuần trước và nghịch thêm một số dữ liệu về *game* của chúng ta.

Đầu tiên, hãy thêm lại mảng trò chơi này vào *data()* trong ví dụ Vue.
    
```
const app = new Vue({
  el: '#app',
  data: {
    games: [
      { name: 'Super Mario 64', console: 'Nintendo 64', rating: 4 },
      { name: 'The Legend of Zelda Ocarina of Time', console: 'Nintendo 64', rating: 5 },
      { name: 'Secret of Mana', console: 'Super Nintendo', rating: 4 },
      { name: 'Fallout 76', console: 'Multiple', rating: 1 },
      { name: 'Super Metroid', console: 'Super Nintendo', rating: 6 }
    ]
  }
});
```

Cũng như trước kia, vui lòng cập nhật những điều này với các title yêu thích của bạn.

Tuy nhiên, lần này, chúng ta sẽ tạo ra một component *game-card*, điều đó sẽ có ý nghĩa hơn một chút để hiển thị dữ liệu của chúng tôi.

Các bạn đã sẵn sàng chưa?
```
Vue.component('game-card', {
  props: ['gameData'],
  template: `
    <div style="border-radius: .25rem; border: 1px solid #ECECEC; width: 400px; margin: 1rem; padding: 1rem;">
      <h2>{{ gameData.name }} - <small>{{ gameData.console }}</small></h2>

      <span v-for="heart in gameData.rating">❤️</span>

      <button @click="increaseRating">Increase Rating</button>
    </div>
  `,
  methods: {
    increaseRating() {
      // this.game.rating++ ?
    }
  }
});
```
    
Đừng cảm thấy choáng ngợp, bạn đã biết gần hết những thứ trên rồi mà.

Chúng ta đang tạo một Vue.component mới và đặt tên nó là *game-card*. Hãy bỏ qua *props* trong một giây và nhìn vào *template*.

Không có gì mới ở đây, ngoại trừ bạn có thể nhận thấy chúng ta đang truy cập vào các thuộc tính của *gameData* thứ mà không được định nghĩa bên trong *data*, nhưng lại được định nghĩa trong *props*.
    
Sau đó, chúng ta khai báo *method object*, với phương thức *increaseRating* bên trong nó. Tôi đã để lại nhận xét *this.game.rating ++*, đó sẽ là logic bạn muốn thực hiện trong method này, nhưng hiện tại nó sẽ không hoạt động! Bây giờ là lúc để nói về *props*.

# Component Props
    
Một trong những thuộc tính riêng mà chúng ta có thể có trên các component tùy chỉnh của mình được gọi là *props. Ở dạng đơn giản nhất, nó sẽ lấy một chuỗi các String sẽ xác định các biến. Trong ví dụ trước của chúng ta, chúng ta đang nói về bản thiết kế / mẫu của component mà chúng ta muốn nó nhận được một thuộc tính được gọi là *game*.
    
*Props * sẽ cho phép chúng ta truyền thông tin vào các component từ bên ngoài! Hãy xem điều này trong các ví dụ cụ thể, nó sẽ dễ nắm bắt hơn.

Trước tiên, hãy thêm một loạt các mục <game-card> vào ứng dụng của chúng ta. Chúng ta sẽ sử dụng vòng lặp v-for giống như đã làm trước đây, nhưng lần này chúng ta sẽ lặp lại trên các component tùy chỉnh của mình!
```
<div id="app">
  <awesome-button></awesome-button>
  <hr>
  <game-card v-for="game in games" :game-data="game" :key="game.name"></game-card>
</div>
```
Bạn có thể thấy khá nhiều *game* bị ném mọi nơi, vì vậy hãy xem xét chi tiết.

Bước đầu tiên, chúng ta đang tạocomponent <game-card>, như chúng ta đã thảo luận trước đó.

Sau đó, chúng ta thêm vòng lặp v-for = "game in games" như chúng ta đã thấy lần trước. Điều này tạo ra một biến *game* sẽ giữ nó trong vòng lặp và chúng ta có thể sử dụng nó ngay lập tức!

Cuối cùng, chúng ta gán cho prop--gameData, một giá trị, trong trường hợp này là biến trò chơi của chúng ta từ vòng lặp. Lưu ý rằng thay vì camel case, chúng ta đang sử dụng game-data vì HTML không phân biệt chữ hoa chữ thường. Nếu bạn đang gặp khó khăn trong việc nắm bắt điều này, hãy thử nghĩ về nó theo thuật ngữ đối tượng. Chúng ta đang điều tương tự như *game-card.props.gameData = game*
    
Đừng quên :key !

Có một vấn đề rất lớn cần đề cập ở đây, chúng ta đang chuyển game sang game-data prop, nhưng có ":" đằng sau nó. Bạn có để ý không?

Khi chúng ta gán một thuộc tính cho một component , có hai cách để xử lý nó. Theo ví dụ của chúng ta, chúng ta có thể làm điều đó với ":" ở trước (đây là cách viết tắt của v-bind:!). Điều này sẽ đảm bảo dữ liệu mà chúng ta chuyển qua phía sau = "<here>" được JavaScript sử dụng làm biến hoặc một đoạn code thực tế.
    
Nếu bạn gõ *gameData = "game"*, thì Vue sẽ coi việc này là gán cho gameData prop "game". Vì vậy, một cái gì đó như: game-card.props.gameData = "game"!

Hãy dành chút thời gian nghỉ ngơi và chạy trình duyệt của bạn. Bạn sẽ thấy đúng như mong đợi, toàn bộ component  <game-card> của chúng ta đang được hiển thị cho từng trò chơi của chúng ta.

Phần lớn nhất về điều này là nếu chúng ta thực hiện thay đổi HTML của mình, nó sẽ được cập nhật ở mọi nơi trong ứng dụng của chúng ta.

Ngoài ra, và quan trọng nhất, các component cho phép bạn chứa logic cho component cụ thể đó. Chúng ta hãy xem lại phương thức *increaseRating()* của *game-card*.
    
# Component Data với Props
    
Props cho các component thực sự có thể là một chủ đề rất dài, nhưng có một quy tắc rất quan trọng mà bạn phải luôn ghi nhớ. Một Props KHÔNG BAO GIỜ được sửa đổi từ bên trong một component.

Trên thực tế, nếu bạn cố gắng làm điều này, Vue sẽ ném tất cả các loại cảnh báo và la mắng bạn trong consolo - bởi vì điều này sẽ dẫn đến một hành vi bất ngờ. [Đây](https://vuejs.org/v2/guide/migration.html#Prop-Mutation-deprecated) là tài liệu, trong trường hợp bạn muốn đọc về nó.
    
Vậy chúng ta sẽ sửa đổi giá trị của *rating* bên trong bộ nhớ của component như thế nào? Điều quan trọng là trong chính câu hỏi! Chúng ta cần tạo một bản sao của prop này vào dữ liệu của mình để có thể thực sự sửa đổi nó.

Trước tiên, hãy thêm dữ liệu của chúng ta vào component *game-card* và gán cho nó một tên mới không trùng lặp (Props và data props sẽ xung đột nếu được đặt tên giống nhau), sau đó điền trước giá trị của prop.
```
data() {
  return {
    game: {...this.gameData}
  }
},
```
Một vài điều cần lưu ý ở đây, nhưng trước đó, nếu bạn chưa biết {... gameData} đang làm gì, thì đó là một toán tử lây lan. Tôi sẽ không đi vào chi tiết đầy đủ ở đây và sẽ cố gắng đăng một bài viết ngắn về nó, nhưng về cơ bản là tạo một bản sao của gameData prop, bởi vì chúng ta không muốn thay đổi giá trị của gameData.   
`data` property of `return`: Data giữ tất cả các thuộc tính chúng tôi cần và đây là cách chúng tôi đã thực hiện nó. Tuy nhiên, đối với các thành phần, chúng ta thực sự cần phải làm cho nó thành một hàm, bằng cách thêm () và thứ hai trả về đối tượng thực tế.   
# Conclusion
Với các phần tôi đã đề cập, có thể bạn đã bắt đầu tạo làm ứng dụng của bạn thêm thú vị. Hãy cúng đón chờ và theo dõi part4 nhé