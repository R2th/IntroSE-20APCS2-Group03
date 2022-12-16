### I. Mở đầu
Một trong số khái niệm cực kỳ cơ bản mà bạn bắt buộc phải đọc khi học vuejs có lẽ chính là **computed properties and watcher**. 

**computed properties**:  Được hiểu đơn giản đây là "thuộc tính được tính toán". Các data hay props sẽ được tính toán theo 1 logic tùy ý dưới dạng function. Các function này không thể tự thay đổi trực tiếp được, nó được thay đổi theo data và các props cần tính toán bởi nó. Trong template hoàn toàn không cần dùng computed vẫn có thể tính toán bình thường, nhưng để tối ưu code cũng như để dễ dàng maintain sau này thì **computed** là 1 lựa chọn rất hợp lý.
Không chỉ computed mới có thể làm được việc này. Vuejs còn cung cấp cho ta một khái niệm nữa đó là **watcher**, nó còn làm được hơn rất nhiều so với những gì chúng ta biết về **computed**

![](https://images.viblo.asia/c9a98922-9b9c-4ceb-9516-6c6b67a3cb01.gif)

Vậy **watcher** trong vuejs là gì?

Nhưng ở trên mình có trình bày khá kỹ về **computed properties**, cơ bản watcher có thể được dùng để tính toán như nó.
Tuy nhiên, điểm mạnh của **watcher** là việc nó có thể giám sát và lắng nghe được sự thay đổi của các đối tượng, điều mà **computed properties** chưa làm được. Chính vì vậy Vue đã tạo ra **watcher** để ta có thể phản ứng với các thay đổi dữ liệu.
```js
    export default {
      name: 'ColourChange',
      props: ['colour'],
      watch: {
        colour()
          console.log('The colour has changed!');
        }
      }
    }
```
### III. Nội dung chính
### Watch thay đổi của đối tượng data là một string
Ở một trường hợp khá đơn giản mà có lẽ các bạn thường xuyên gặp:
```js
<template>
    <div id="watch-example">
      <p>
        Ask a yes/no question:
        <input v-model="question">
      </p>
      <p>{{ answer }}</p>
    </div>
</template>
```

```js
<script>
    export default {
        data: {
        question: '',
        answer: 'I cannot give you an answer until you ask a question!'
      },
      watch: {
        question: function (newQuestion, oldQuestion) {
          this.answer = 'Waiting for you to stop typing...'
          this.debouncedGetAnswer()
        }
      },
      created() {
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
      },
      methods: {
        getAnswer: function () {
          if (this.question.indexOf('?') === -1) {
            this.answer = 'Questions usually contain a question mark. ;-)'
            return
          }
          this.answer = 'Thinking...'
          var vm = this
          axios.get('https://yesno.wtf/api')
            .then(function (response) {
              vm.answer = _.capitalize(response.data.answer)
            })
            .catch(function (error) {
              vm.answer = 'Error! Could not reach the API. ' + error
            })
        }
      }
    }
</script>
```
### Watch thay đổi của một đối tượng data là array hoặc object
Vào một ngày đẹp trời bạn được sếp giao một task cũng nho nhỏ thôi, có thể update một data là một array hoặc object. Và bạn phải dùng **watcher** để làm một phản ứng gì đó khi data này thay đổi chẳng hạn. Chắc có rất nhiều bạn sẽ làm như cách ở trên. 

![](https://images.viblo.asia/b67bf6ec-fa7f-475b-8173-6e09f9e5d848.gif)

Kết quả là code không chạy =)) đúng không nào!!! Bạn lục tung documents của vue2.x và chẳng có chút tài liệu nào về trường hợp này. Đừng lo cách giải quyết của trường hợp này là:

Ta có một array đơn giản như này
```js
const array = [1, 2, 3, 4];
// array = [1, 2, 3, 4]
```

và bây giờ ta update array một chút, thêm vài values vào đó
```js
array.push(5);
array.push(6);
array.push(7);
// array = [1, 2, 3, 4, 5, 6, 7]
```

Chắc rằng bạn nghĩ rằng array đã thay đổi đúng không nào, Nhưng vue không biết rằng bạn đã thay đổi nhưng gì trong array đó. Bạn phải nói với vue rằng bạn muốn nó kiểm tra bên trong prop khi giám sát các thay đổi.
Bạn có thể làm điều đó bằng cách thêm setting **deep: true** trong **watcher**: và sử dụng **handler** function để vue có thể thực hiện thay đổi.
```js
export default {
  name: 'ColourChange',
  props: {
    colours: {
      type: Array,
      required: true,
    },
  },
  watch: {
    colours: {
      // This will let Vue know to look inside the array
      deep: true,

      // We have to move our method to a handler field
      handler()
        console.log('The list of colours has changed!');
      }
    }
  }
}
```
### Một vài function quan trọng trong watcher
**Immediate:**
Khi bạn sử dụng watcher với mục đích là nó được kích hoạt khi giá trị của prop chưa thay đổi.
Giả sử ta có một component tên là **MovieData**, và nó được gọi api để fetch dữ liệu từ server thông qua prop là **movie**
```js
export default {
  name: 'MovieData',
  props: {
    movie: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      movieData: {},
    }
  },
  
  watch: {
    // Whenever the movie prop changes, fetch new data
    movie(movie) {
      // Fetch data about the movie
      fetch(`/${movie}`).then((data) => {
        this.movieData = data;
      });
    }
  }
}
```
Và với đoạn code trên với việc prop **movie** được thay đổi thì watcher cũng được kích hoạt và tự động lấy dữ liệu mới.
Nhưng có một vài vấn đề như thế này:
Khi bạn tải trang prop **movie** đang được set với một giá trị mặc định, nhưng vì prop này chưa có sự thay đổi nên **watcher** chưa được kích hoạt dẫn đến việc data không được fetch cho đến khi **movie** được thay đổi.
Vậy nên bạn cần sử dụng **immediate: true** và chuyển vào function handler để khi load trang, **watcher** sẽ tự động được kích hoạt.
```js
watch: {
  // Whenever the movie prop changes, fetch new data
  movie: {
    // Will fire as soon as the component is created
    immediate: true,
    handler(movie) {
      // Fetch data about the movie
      fetch(`/${movie}`).then((data) => {
        this.movieData = data;
      });
    }
  }
}
```
**Handler:**
* **immediate**
* **deep**
* **handler**

Trong vue, **watcher** có sử dụng 3 thuộc tính đặc biệt. ở phần trên mình đã giải thích hai thuộc tính **immediate** và **deep** rồi. Và ở đây mình sẽ trình bày nốt về thuộc tính **handler**.
**handler** được gọi khi đã kích hoạt **watcher** lúc mà prop được thay đổi. Khi không cần sử dụng **immediate** và **deep** thì các phản ứng của watcher cũng có thể được thực thi tại **handler**
```js
watch: {
  movie: {
    handler(movie) {
      // Fetch data about the movie
      fetch(`/${movie}`).then((data) => {
        this.movieData = data;
      });
    }
  }
}
```
Và đương nhiên bạn có **watcher** cũng có thể được thực thi ở bên ngoài mà không cần **handler**.
```js
watch: {
  movie(movie) {
    // Fetch data about the movie
    fetch(`/${movie}`).then((data) => {
      this.movieData = data;
    });
  }
}
```
Như vậy các bạn cũng có thể hiểu rằng **handler** là function giúp **watcher** thực thi sự thay đổi của prop và trong trường hợp bình thường có thể rút gọn mà ta từng viết ở  phía trên.
### III. Tạm kết
Trong quá trình tìm hiểu và làm các dự án mình đã đúc kết ra được một số kiến thức về **watcher** như trên, hy vọng nhận được góp ý của các bạn

![](https://images.viblo.asia/44306c29-91cb-43f1-9ca1-b6ebeb10fb48.jpg)