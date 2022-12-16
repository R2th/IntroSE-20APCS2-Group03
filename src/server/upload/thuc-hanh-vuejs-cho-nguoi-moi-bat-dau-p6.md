Đây là phần cuối của thực hành vuejs.  
Hôm nay chúng ta sẽ giải quyết 2 khái niệm quan trọng **watchers** và **input bindings**.   
Chúng ta cùng bắt đầu nhé!

```
<html>

<head>
  <title>Vue 101</title>
</head>

<body>
  <div id="app">
    <label>What's your favorite game ever?</label>
    <input type="text" >

    <hr>

    <p>{{ response }}</p>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

  <script>
    const app = new Vue({
      el: '#app',
      data() {
        return {
          favoriteGame: null,
          response: ''
        }
      }
    });
  </script>
</body>

</html>
```
Bên trong  <div id="app"> tôi đã tạo một label và một form cơ bản nhất với thẻ input. Sau đó là một kết quả `response`.
Bên trong Vue instance, tôi khởi tạo 2 properties local là `favoriteGame` and `response`. Lưu ý rằng lần này chúng tôi đang sử dụng data() làm hàm với cú pháp return, nếu không thì mô hình v-model sẽ không hoạt động.
Ý tưởng ở đây là trước tiên chúng ta muốn lưu trữ bất cứ cái gì mà người dùng nhập vào trường <input> vào một biến, theo cách đó chúng ta có thể sử dụng nó sau này vào lúc thích hợp.
Trong vanilla JS hoặc thậm chí jQuery, bạn có thể cố gắng lấy ra giá trị đầu vào bằng cách $ ('input') hoặc document.querySelector, nhưng trong Vue, chúng ta có một cách đơn giản hơn nhiều. Đó chính là v-model.
## Giới thiệu v-model
Như bạn đã học trước đây, mọi thứ bắt đầu bằng v- là một **Vue directive**. Những gì mô hình v chuyển thành, nói theo cách đơn giản, là:
>     Vue, tao muốn mày lấy đầu vào này và tạo mối quan hệ hai chiều với nó. Tao sẽ cung cấp cho mày một property vàt cứ khi nào tao thay đổi thuộc tính này ở bất kỳ đâu trong source code của tao thì tao muốn mày thay đổi nó ở input, và tương tự, bất cứ khi nào đầu vào này thay đổi - tao muốn mày phản ánh những thay đổi đó trong prop của tao.
   
Bây giờ, chúng ta hãy thử thực hiện điều này, đi đến khai báo <input> và thêm directive v vào nó.   

    <input type="text" v-model="favoriteGame">

Bây giờ hãy làm và run trong trình duyệt của bạn và nhập một cái gì đó vào box input. Taaaaa ... da?  
Ok, mặc dù dường như không có gì đang xảy ra. Hãy tiếp tục và mở devtools Vue của bạn và kiểm tra dữ liệu của phần tử <Root>. YEAH. 
![](https://images.viblo.asia/382d3b30-5bac-4e42-8058-0919cded2c47.png)    
Bây giờ vào dev tools và thay đổi giá trị của `FavoritesGame` thành một cái gì đó khác (đừng quên trích dẫn nó, chúng ta cần một chuỗi ở đây)   
    Phía sau v-model thực sự đang thiết lập một v-bind: value và v-on:input ràng buộc, nhưng đi sâu vào vấn đề này là một chút ngoài phạm vi vì vậy tôi sẽ thả cho bạn một liên kết nếu bạn quan tâm đến nó [Using-v-model-on-Components](https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components)
##     Watchers          
 Bây giờ chúng ta đã biết two-way binding v-model, hãy thử làm điều gì đó với nó nhaaaa    
    
Bạn đã học được rằng với một prop state `data`, bạn có thể đặt nó vào template với {{FavoritesGame}}, do đó không cần phải nói lại điều đó một lần nữa. Bạn đã học cách sử dụng nó trong một method và computed với prop this.favoriteGame - vì vậy không cần phải làm lại điều đó. Nhưng điều gì xảy ra khi bạn muốn "listen" hoặc "react" với property này thực sự bị sửa đổi?   
    
Các thuộc tính được computed là tuyệt vời trong việc tính toán lại các công cụ và trả về một giá trị, nhưng nếu chúng ta muốn sửa đổi một trạng thái khác trên ứng dụng của mình khi giá trị này thay đổi, hoặc thậm chí có thể thực hiện một yêu cầu không đồng bộ nào đó thì sao? Trong những trường hợp thích hợp `watchers` đến giúp chúng ta.   
    
Chúng ta hãy thêm một bản để tạo ra một watcher prop
```
 <script>
  const app = new Vue({
    el: '#app',
    data() {
      return {
        favoriteGame: null,
        response: ''
      }
    },

    // Watchers here
    watch: {
      favoriteGame(newValue, oldValue) {
        console.log('Favorite game was ' + oldValue + ' and now is ' + newValue)
      }
    }
  });
</script>
```
Watchers được định nghĩa bên trong một watch property trong instance hoặc component của tôi và tôi truyền cho nó một object sẽ bao gồm một thuộc tính cho mỗi một props mà chúng tôi muốn watch.
    
Nói một cách đơn giản,  mọi prop `data` hoặc `props` prop bạn muốn watch / react với nhu cầu đi vào bên trong watch: {} với tên của nó. Vì vậy, nếu prop của bạn được đặt tên `favoriteGame` đó là tên function của bạn.
    
Mỗi một trong số functions này có hai tham số được truyền vào cho nó, hàm đầu tiên sẽ là `newValue` mà prop này nhận được, và hàm thứ hai là `oldValue` mà nó đã có trước khi thay đổi.
    
Kiểm tra câu lệnh console.log và làm mới cửa sổ trình duyệt của bạn. Hãy thử gõ một cái gì đó vào <input> và kiểm tra output giao diện điều khiển của bạn. Mỗi khi prop `favoriteGame` thay đổi theo bất kỳ cách nào, watcher sẽ được kích hoạt.
    
Bây giờ hãy thực sự làm một cái gì đó mới mẻ với nó. Ghi nhớ response của tôi? Chúng ta hãy làm một cái gì đó fun fun tùy thuộc vào câu trả lời của người dùng.
    
```
watch: {
  favoriteGame(newValue, oldValue) {
    if (!newValue) return // Nếu giá trị rỗng, bỏ qua

    // Nếu new value chứa keyword metroid
    if (newValue.toLowerCase().indexOf('metroid') !== -1) {
      this.response = 'Ceres station is under attack!'
      return
    }

    // Nếu new value chứa từ zelda
    if (newValue.toLowerCase().indexOf('zelda') !== -1) {
      this.response = 'Its dangerous to go alone, take this 🗡️'
      return
    }

    // Nếu old value là metroid, và người dùng thay đổi giá trị của nó khác
    if (
      oldValue.toLowerCase().indexOf('metroid') !== -1 &&
      newValue.toLowerCase().indexOf('metroid') === -1
    ) {
      this.response = 'GET TO DA CHOPPA NAO'
      return
    }

    // response mặc định
    this.response = 'Sure, why not?'
  }
}
```
    
Trong trường hợp bạn không biết, indexOf dùng để kiểm tra chuỗi và trả về, -1 trong trường hợp không có kết quả trùng khớp và nếu có, nó sẽ trả về vị trí của chuỗi mà bạn đang tìm kiếm trong chuỗi đó.
    
Tôi hy vọng bạn có thể thấy sức mạnh của các watched properties, tôi thấy hữu ích trong trường hợp thuộc tính của tôi thay đổi và tôi cần phải THỰC HÀNH lập trình cho nó (với lệnh gọi ajax, hàm bên ngoài, cập nhật giá trị thứ hai, vv), khi đó sử dùng watchers thường là một cách tốt. Còn đối với những trường hợp khác, hãy sử dụng computed properties.
    
```
<html>
<head>
  <title>Vue 101</title>
</head>

<body>
  <div id="app">
    <label>What's your favorite game ever?</label>
    <input type="text" v-model="favoriteGame">

    <hr>

    <p>{{ response }}</p>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

  <script>
    const app = new Vue({
      el: '#app',
      data() {
        return {
          favoriteGame: null,
          response: ''
        }
      },
      watch: {
        favoriteGame(newValue, oldValue) {
          if (!newValue) return

          if (newValue.toLowerCase().indexOf('metroid') !== -1) {
            this.response = 'Ceres station is under attack!'
            return
          }

          if (newValue.toLowerCase().indexOf('zelda') !== -1) {
            this.response = 'Its dangerous to go alone, take this 🗡️'
            return
          }

          if (
            oldValue.toLowerCase().indexOf('metroid') !== -1 &&
            newValue.toLowerCase().indexOf('metroid') === -1
          ) {
            this.response = 'Nothing is true , everything is permitted'
            return
          }

          this.response = 'Sure, why not?'
        }
      }
    });
  </script>
</body>

</html>
```

##     Conclusion
Bây giờ bạn có các công cụ cơ bản để thực sự xây dựng một ứng dụng thực sự thú vị và chức năng trong Vue, tôi đảm bảo nó. Tuy nhiên, vẫn còn rất nhiều điều để tìm hiểu và rất nhiều điều để khám phá để bạn có thể vắt từng tép nước trái cây ra khỏi khuôn khổ này.

    
Cảm ơn bạn vì đã đọc! ♥