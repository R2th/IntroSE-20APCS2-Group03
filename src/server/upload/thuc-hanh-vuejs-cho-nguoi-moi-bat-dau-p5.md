Phần này, chúng ta hãy nói về các computed props.

Cho đến nay bạn đã học được cách Vue xử lý state chính nó, thứ mà chúng ta truyền vào bên trong *data* và cách mà component xử lý những próp của nó - những thứ mà ta được truyền lại từ hàm cha.

Tuy nhiên, có một loại thuộc tính trong Vue được gọi là **computed props**. Đây chính là nội dung chính trong bài viết dưới đây.

Hôm nay chúng ta sẽ sử dụng một state hoàn toàn mới, để chúng ta có thể xây dựng một ví dụ rõ ràng.

```
<html>

<head>
  <title>Vue 101</title>
</head>

<body>
  <div id="app">
    <age-calculator></age-calculator>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

  <script>
    Vue.component('age-calculator', {
      template: `
        <p>
          NAME has been kicking butt for X days!
        </p>
      `
    });

    const app = new Vue({
      el: '#app'
    });
  </script>
</body>

</html>
```

Mình đã đi trước và thêm phần đầu cho component *age-calculator*, bây giờ nó chỉ xuất ra thẻ <p> với dấu **X** nơi chúng ta sẽ thực hiện một số phép tính. Mình cũng đã thêm các thẻ tương ứng <age-Calculator> vào *div#app*.

Nếu bạn cần làm mới lại các component cơ bản, hãy xem Phần 4 của loạt bài này, hoặc ghi lại từ các [tài liệu chính thức](https://vuejs.org/v2/guide/components.html)

# Khi mà props cơ bản là không đủ đáp ứng
 
Trước khi chúng ta bắt tay vào viết bất kỳ đoạn code nào, hãy nói về những gì chúng ta đang cố gắng thực hiện.

Mình muốn có một component mà khi mình nhập tuổi của ai đó vào, nó sẽ cho chúng ta biết họ đã ở đây bao nhiêu ngày để thưởng thức bánh mỳ. Nếu bạn không thích bánh mỳ thì đây chính là lúc sự liên kết của chúng ta kết thúc, hãy tìm cho mình một cuộc sống tốt đẹp mà không có bánh mỳ.

Hãy bắt đầu bằng việc giải quyết các nhiệm vụ dễ dàng mà chúng ta đã biết cách thực hiện, trước tiên chúng ta cần một mảng chứa người cùng với độ tuổi để chúng ta có thể chạy vòng lặp qua nó và tạo ra một loạt các components. Hãy thêm *data* tương ứng.

```
const app = new Vue({
  el: '#app',
  data: {
    people: [
      { name: 'Mario', age: 38 },
      { name: 'Luigi', age: 38 },
      { name: 'Samus', age: 31 },
      { name: 'Link', age: 20 },
      { name: 'Marina', age: 32 },
      //Add yourself here :)
    ]
  }
});
```
Bây giờ hãy cài đặt vòng lặp "v-loop" của chúng ta với đầu ra là một "age-calculator"

```
<div id="app">
  <age-calculator v-for="person in people" :key="person.name"></age-calculator>
</div>
```

Thật tuyêt, bây giờ ta sẽ cho phép age-calculator nhận một biến person hãy nhớ rằng ta sẽ thực hiện điều này bằng props. Để bắt đầu hãy thêm một props mới vào component.

```
Vue.component('age-calculator', {
  props: {
    person: {
      type: Object,
      required: true
    }
  },
  template: `
    <p>
      {{ person.name }} has been kicking butt for X days!
    </p>
  `
});
```

**Bonus!** Trước khi bạn học được rằng để khai báo các props mà một component có thể nhận được, bạn sẽ thiết lập một mảng string *props: ['person']*, điều này rất ok trong hầu hết các trường hợp. Nhưng điều gì xảy ra nếu chúng ta muốn kiểm soát nhiều hơn một chút?

Bạn cũng có thể, như trong trường hợp này, đặt các props bằng với một object. Bên trong object này, chúng ta có thể tạo một thuộc tính cho mỗi props mà chúng ta muốn khai báo.

Trong khai báo thuộc tính, trong trường hợp này, chúng ta có thể đặt một số config.

*type* để khai báo loại dữ liệu nào chúng ta sẽ truyền, ví dụ như Object, Array, String, Number.

*required* là một giá trị boolean cho phép chúng ta đánh dấu thuộc tính này là bắt buộc yêu cầu để component hoạt động.

Bạn cũng có thể đặt giá trị *default*, nhưng chúng ta sẽ không sử dụng giá trị đó ở đây.

Tiếp theo, nhìn vào đoạn code mẫu. Chúng ta hiện đang xuất ra tên người *{{person.name}}* vào thẻ <p>.

Một điều nữa trước khi chúng ta thực sự có thể chạy nó trong trình duyệt của mình. Bạn có thể đoán được những gì chúng ta đang thiếu không?

Chúng ta vẫn cần phải chuyển *person* đến component *age-calculator*!

Đi vào vòng lặp render và truyền vào biến của chúng ta.

```
<age-calculator 
  v-for="person in people" 
  :person="person"
  :key="person.name">
</age-calculator>
```

Hãy tiếp tục và chạy nó trong trình duyệt của bạn để kiểm tra xem mọi thứ đang hoạt động. Bước chân nhỏ đầu tiên!

Lưu ý trước khi chúng ta tiếp tục, nếu bạn tò mò việc cài đặt **required** prop sẽ giúp gì cho bạn, hãy thử loại bỏ bước truyên person vào component và xem các dev tool của bạn trong phần console.
 
![](https://images.viblo.asia/b5b4b85c-937c-4194-8156-1d3df52e0258.png)

Tất cả mọi thứ đều trong tầm kiểm soát ;)

# Computed Property

Được rồi, cài đặt và review như thế là đủ.

Chúng ta vẫn còn một tính năng nữa để giải quyết bên trong component của mình, chúng ta muốn tính số ngày mỗi người đã sống.

Đó không phải là một phép tính quá khó, chúng ta chỉ cần nhân lên gấp 365 lần số năm (chúng ta sẽ không gặp khó khăn với JS Dates ở đây). Và trên thực tế, chúng ta có thể làm một cách thô kệch, truyền thẳng nó vào template.

```
template: `
        <p>
          {{ person.name }} has been kicking butt for {{ person.age * 365 }} days!
        </p>
      `
```

Nó đã hoạt động. Nhưng điều gì sẽ xảy ra khi bạn cần sự logic hơn? Một tính toán khó hơn, một số if / ands / ors / whens / beers? Sau đó, bạn sẽ gặp vấn đề thực sự bởi vì bạn không thể đặt nhiều logic như thế vào trong template, bằng không nó sẽ nhanh chóng trở nên khó kiểm soát.

Đây là thời điểm **computed properties** tỏa sáng. Computed properties nằm trong các end functions, nó sẽ thực thi một chút code và trả về một giá trị. Giá trị này hiện được coi như một props, có nghĩa là chúng ta có thể sử dụng nó trong template của mình.

Chúng ta hãy cùng xem nên làm gì với nó. Trước tiên, hãy thêm wrapper vào component.

```
Vue.component('age-calculator', {
  props: {
    person: {
      type: Object,
      required: true
    }
  },
  template: `
    <p>
      {{ person.name }} has been kicking butt for {{ person.age * 365 }} days!
    </p>
  `,
  computed: {
    // Computed props go here
  }
});
```

Trên thực tế cấu trúc này là hoàn toàn tuơng tự như khi chúng ta đã sử dụng cho các *method*, bạn có nhớ không? (Nếu bạn đang nghĩ method cũng có thể giải quyết vấn đề của chúng ta, thì bạn đang đi đúng hướng - chúng ta sẽ nói về vấn đề này chỉ trong một phút.)

Chúng ta hãy tạo một **computed props** mới được gọi là *daysAlive*, nó cần phải là một hàm và nó cần trả về một cái gì đó.

```
computed: {
  daysAlive() { //Remember, computed props are functions in the end
    return this.person.age * 365
  }
}
```

Hãy lưu ý rằng giống như trong *methods* chúng ta cần truy cập vào prop *person* thông qua *this*, chỉ bên trong template chúng ta có thể sử dụng nó trực tiếp! Ngoài ra, không có gì quá lạ đang diễn ra.

Bây giờ chúng ta hãy sử dụng props *daysAlive* trong template của chúng ta.

```
template: `
  <p>
    {{ person.name }} has been kicking butt for {{ daysAlive }} days!
  </p>
`,
```

Lưu ý rằng chúng ta đang lấy ra giá trị của daysAlive** --property--**. Vue coi **computed props**, cũng như các props - vì vậy chúng ta có thể sử dụng điều này ở đây như bàn muốn *props* props hay *data* props.

Trong thực tế, Vue sẽ thực hiện nó để nếu bạn cần sử dụng prop này bên trong một *method* chẳng hạn, bạn sẽ phải truy cập nó thông qua *this.daysAlive*. Gọn gàng phải không? Nó THỰC SỰ trở thành prop. 🤯

Bây giờ, hãy chạy nó trong trình duyệt và đắm mình trong sự tuyệt vời của bạn.

![](https://images.viblo.asia/ffd4418a-badc-427a-900b-2a398a1dd665.jpg)

# Methods với Computed Properties

Bạn có thể đã nhận thấy rất nhiều điểm tương đồng giữa các methods và computed properties, ý mình là, về cơ bản chúng giống hệt nhau ở cấp độ code. Tuy nhiên, có một sự khác biệt chính mà bạn cần phải hiểu để khai thác chúng đầy đủ.

**Computed properties** được nhận bộ nhớ cache.

Điều này có nghĩa là, theo cách đơn giản nhất có thể để giải thích, rằng đằng sau hậu trường, Vue sẽ "đọc" code của bạn và tìm kiếm các **reactive depndencies** - ở đây là *data* props và *props* props. Nó sẽ xem các thuộc tính này và bất cứ khi nào chúng thay đổi, Vue sẽ tính toán lại giá trị của **computed properties** của bạn. Nếu nó không thay đổi, nó sẽ chỉ sử dụng giá trị đựoc cached/stored.

Mặt khác, methods được chạy MỖI LẦN - và không có bộ nhớ đệm, không code reading, không có "magic" nào ở đây cả. Chúng chỉ là các functions cũ đơn giản.

Tại sao vấn đề này lại đáng lưu tâm? Khi nào các fucntions này đựoc gọi?

Mỗi khi component / ứng dụng của bạn render lại (vì vậy mỗi khi dữ liệu của component thay đổi hoặc mỗi khi dữ liệu của component cha thay đổi), Vue sẽ tìm hiểu xem dữ liệu đó có được gắn với **computed properties** không, nếu không - nó sẽ không gọi function này một lần nữa. Tuy nhiên, đối với methods thông thường, chúng sẽ được chạy lại mỗi lần!

Trong ví dụ này, khi chúng ta thực hiện một phép tính rất đơn giản cho một vài đối tượng, điều đó thực sự không quan trọng. Nhưng khi bạn bắt đầu thực hiện code nghiêm túc trên hàng ngàn components, thì bạn sẽ muốn tận dụng bộ nhớ đệm này hoặc ứng dụng của bạn sẽ nhận đươcj những cú đánh mạnh mẽ mỗi khi thực hiện vòng render.

Nếu bạn muốn đọc thêm, đây là một liên kết đến các tài liệu chính thức liên quan đến [**computed properties**](https://vuejs.org/v2/guide/computed.html).

Còn đây là code hoàn chỉnh cho ngày hôm nay.

```
<html>

<head>
  <title>Vue 101</title>
</head>

<body>
  <div id="app">
    <age-calculator 
      v-for="person in people" 
      :person="person"
      :key="person.name"></age-calculator>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

  <script>
    Vue.component('age-calculator', {
      props: {
        person: {
          type: Object,
          required: true
        }
      },
      template: `
        <p>
          {{ person.name }} has been kicking butt for {{ daysAlive }} days!
        </p>
      `,
      computed: {
        daysAlive() {
          return this.person.age * 365
        }
      }
    });

    const app = new Vue({
      el: '#app',
      data: {
        people: [
          { name: 'Mario', age: 38 },
          { name: 'Luigi', age: 38 },
          { name: 'Samus', age: 31 },
          { name: 'Link', age: 20 }
        ]
      }
    });
  </script>
</body>

</html>
```

Vậy là đủ bài học cho ngày hôm nay, cảm ơn bạn đã giành thời gian, lần tới mình sẽ trở lại với *watchers* 🕵️‍♀️ 👀