### Đôi lời dạo đầu...
Dạo quanh khắp các trang báo mạng vào một buổi chiều mùa thu đầy nắng và gió, mình chợt đọc được 1 bài viết với tựa đề **"12 Super Useful techniques in JavaScript"**... Với một đứa ham học hỏi như mình, mình chợt nghĩ liệu không biết có gì hay ho không nữa, nhưng rõ ràng là mình cũng mang tiếng code javascript lâu lâu và làm nhiều projects với nó rồi, vậy còn gì mình có thể học đây? 

Thế rồi mình vẫn quyết định bỏ ra 5 phút để đọc thử, và rồi mình chợt thấy quá rất nhiều cách xử lí thú vị và thông mình từ những cái mà mình còn ngỡ mình đã biết rõ rồi. Đấy, thế là xong vì bài đó hay quá, nên hôm nay mình đây sẽ lại tiếp tục "đóng vai chị Google" để dịch ra cho các bạn cùng đọc nhé! Có thể các bạn đã biết rồi thì coi như ôn tập lại cùng mình nha... :satisfied::satisfied::satisfied:

**Now, let's go!**

# 1. Tạo một hàm tổng quát
Trước hết, hãy cùng tưởng tượng rằng chúng ta đang muốn phát triển một hàm tổng quát (dùng chung) và đầu vào là một số lượng các tham số nhất định được sử dụng trong quá trình thực thi. 

Ví dụ, một máy tính có N tham số và N phép toán. Bạn có thể dễ dàng đạt được điều này bằng cách sử dụng [spread operation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) và [hàm reduce](https://www.w3schools.com/jsref/jsref_reduce.asp):

![](https://images.viblo.asia/5b742142-70a1-46ac-9fba-01a8ea98f154.png)

Thiệt là nhanh gọn lẹ để tạo ra 1 chiếc "máy tính bỏ túi" chạy bằng cơm với javascript phải không các bạn? :joy:

# 2. Switch với khoảng giá trị
Cái hồi mà mình dùng Pascal, C, hay Java cũ, mình đã thấy được sự bất tiện của Switch khi chẳng tài nào mình có thể dùng nó với một khoảng giá trị cả... Thế là toàn phải lồng `if...else` liên tục trong một số trường hợp. Mà thật ra hồi đó mình cũng còn "non và xanh nữa" :sweat_smile:

Chắc cũng không ít bạn gặp tình huống giống mình phải không ạ, vậy thì giờ với Javascript, ta hoàn toàn có thể xử lí được vấn đề đõ một cách dễ dàng và dễ hiểu như code dưới đây:

```javascript
function chooseSportByTemperature(fahrenheit) {
  let sport

  switch (true) {
    case fahrenheit >= 15 && fahrenheit <= 20:
      sport = 'Running'
      break
    case fahrenheit > 20 && fahrenheit <= 30:
      sport = 'Cycling'
      break
    case fahrenheit > 30:
      sport = 'Stay in home'
      break
    default:
      sport = 'Sex'
  }

  return sport
}
```

Ở trên ảnh còn có một kỹ thuật thông minh đó chính là thay vì ta dùng switch cho một biến nào đó thì ta sẽ `switch (true)` và các case sẽ là các điều kiện ta cần kiểm tra...

Thoát khỏi các vòng `if...else` vô tận thôi nào! Trong code của chúng ta giờ đây thật "clean"!

# 3. Gộp nhiều cases trong switch
Lại là một kĩ thuật khác liên quan tới switch, kĩ thuật này có thể cũng có nhiều bạn đã biết rồi ha! Các bạn nào chưa biết thì nhìn cái trong ảnh là hiểu ngay luôn nhé:

![](https://images.viblo.asia/664f1d8e-3fde-43e3-8d00-cc2784001937.png)

So easy! Muốn gộp chúng lại thì ta cho chúng cạnh liền nhau và không có `break` ở giữa các case là xong ngay! :satisfied::satisfied::satisfied:

# 4. Đợi nhiều hàm bất đồng bộ cùng lúc với async/await
Kỹ thuật này nâng cao do có liên quan tới [async/await](https://javascript.info/async-await) , và cũng không ít các bạn có thể gặp phải tình huống muốn thực thi cùng lúc nhiều hàm bất đồng bộ và chờ cho toàn bộ chúng thực thi xong. Vậy kỹ thuật dưới đây sẽ giúp bạn giải quyệt được vấn đề đó:

```javascript
function resolveAfter1Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved')
    }, 1000)
  })
}

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved')
    }, 2000)
  })
}

function resolveAfter3Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved')
    }, 3000)
  })
}

function resolveAfter4Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved')
    }, 4000)
  })
}

async function asyncFunction() {
  console.log('start')

  const result = await Promise.all([
    resolveAfter1Seconds(),
    resolveAfter2Seconds(),
    resolveAfter3Seconds(),
    resolveAfter4Seconds(),
  ])

  console.log(result) //resolved after 4 seconds !
  console.log('end')
}

asyncFunction()
```

Như bạn thấy đó, ta sẽ **bọc** các công việc bất đồng bộ cần thực thi vào các **Promise**, sau đó có 1 hàm async/await chung gọi tới `Promise.all` để thực thi tất cả các công việc của các Promise ta tạo ra... Rất đơn giản phải không nào? Các bạn ngẫm tí là mình tin hiểu ngay ạ!

# 5. San phẳn mảng 2 chiều chỉ trong 1 bước đơn giản
Đôi khi trong cuộc đời coder, ta sẽ ngồi nhâm nhi tách cafe mà nghĩ rằng trong Javascript thì làm sao để mà có thể "giãn phẳng" một mảng 2 chiều thành mảng một chiều được bây giờ nhỉ? :sweat_smile: 

Chẳng nhẽ phải đệ quy đi vào từng element của mảng và lấy giá trị ra ư? Không cần phức tạp vậy đâu, hãy nhìn xuống ảnh dưới và cẩn thận kẻo "há hốc miệng" vì ngạc nhiên nha:

![](https://images.viblo.asia/c2bdde6f-bd74-4f64-a4f9-07523a8fc981.png)

Đó, chỉ với spread operation mà ta có thể "bẻ thẳng" bất cứ mảng 2 chiều nào! :astonished:

# 6. San phẳn mảng đa chiều chỉ trong 1 bước đơn giản
Kỹ thuật thứ 5 có vẻ "ngầu" đấy, nhưng mà chạy bằng cơm thôi, thật ra dễ hơn thì Javascript đã cung cấp sẵn cho ta một hàm gọi là flat() để thực hiện công việc "bẻ thẳng" đó rồi! Mà còn cho đa chiều nữa nhé chứ không chỉ riêng 2 chiều đâu ạ... :stuck_out_tongue_closed_eyes::stuck_out_tongue_closed_eyes:

Sử dụng phương thức flat(), chúng ta có thể tạo một mảng mới với tất cả các phần tử của mảng con được nối vào nó một cách đệ quy lên đến độ sâu đã chỉ định. Nếu chưa hiểu kĩ thì nhìn ảnh dưới nha các bạn:

![](https://images.viblo.asia/957fc501-a839-40fa-bc7d-ebac5236d76b.png)

# 7. Tạo đối tượng "thuần" trong Javascript
Cái kỹ thuật này chắc là hữu ích cho bạn nào muốn tự mình xây dựng cơ ngơi, vì việc tạo ra một đối tượng "thuần" tức là tạo ra một đối tượng mà trong nó chẳng có bất cứ cái gì cả.

Thông thường, khi ta tạo một đối tượng, đối tượng của ta sẽ được thêm vào sẵn một số các thuộc tính và phương thức mặc định, hãy cùng nhìn hình dưới nhé:

![](https://images.viblo.asia/94247c1a-d3eb-4ae5-8772-1d98132a6257.png)

Như các bạn thấy, dù ta không khai báo nhưng đối tượng mà ta tạo ra cũng có sẵn các thuộc tính và phương thức mặc định rồi...

Vậy thì, nếu một ngày đẹp trời nào đó bạn ghét bỏ sự tiện dụng mặc định của Javascript và muốn tự nhào nặn ra một đối tượng của riêng mình, thì hãy làm như ảnh dưới đây nhé:

![](https://images.viblo.asia/c1f845df-1a4a-48fc-bd50-02282aabdd2f.png)

Đó, easy again! :joy::joy::joy:

# 8. Xóa thành phần trùng nhau trong mảng chỉ với 1 bước
Cái chuyện làm sao để nhanh chóng xóa các thành phần trùng nhau trong một mảng thì là câu chuyện muôn thuở của bất kì lập trình viên nào từ cái thời Pascal còn được dùng để thi HSG Quốc gia rồi ý chứ :stuck_out_tongue_closed_eyes:

Thông thường thì để làm công việc lọc trùng này, ít nhất cũng phải mất 2 vòng for với cách làm cơ bản ai cũng có thể nghĩ ra, cơ mà giờ đây, với sự phát triển mạnh mẽ của ES6 trong Javascript, ta chỉ cần "one shot" như dưới ảnh:

![](https://images.viblo.asia/0e619e7b-3260-438b-a4e8-ba4aaef2c8f7.png)

Và các bạn biết kết quả sẽ là gì rồi đó!!!

# 9. Ghi ra console khi mà trang được bắt đầu và tải xong
Cái này thì hơi ít tình huống cần dùng nhưng cũng là kỹ thuật hay vì ta sẽ có thể dùng nó để kiểm tra hiệu suất, thời gian tải một trang một cách dễ dàng hơn...

Bạn cũng có thể sử dụng các hàm `console.time('nhãn tên bạn muốn đặt để theo dõi')` và `console.timeEnd('nhãn tên bạn đã đặt trước đó')` để bắt đầu và kết thúc bộ đếm thời gian để bạn theo dõi thời gian thực hiện một thao tác nào đó. Cái này thì cũng không nhiều bạn biết ha, vì toàn console.log mà haha :joy:

```javascript
<script>
    window.onload = () => {
      console.log('Start')
    }
    window.onunload = () => {
      console.log('Finish')
    }
</script>
```

Hoặc hay ho hơn thì:

```javascript
<script>
    window.onload = () => {
      console.time('pageLoadingTime')
    }
    window.onunload = () => {
      console.timeEnd('pageLoadingTime')
    }
</script>
```

Btw, cá nhân mình vẫn thích dùng addListener hơn là override lại hàm event như này... :sweat_smile:

# 10. Nút in cho trang
Giờ ta có thể tạo ra một nút kích hoạt máy in ngay trên trang web một cách nhanh chóng mà người dùng ai cũng có thể ấn mà chẳng cần hiểu quá sâu về công nghệ... Cái này thì ngắn gọn dễ hiểu thôi nè!

```html
<input type="button" value="Print this page!" onclick="window.print()" />
```

# 11. Làm tròn số
Đây cũng chắc là kỹ thuật cơ bản mà bạn nào đã làm việc với số trên Javascript sẽ biết, nhưng cũng là một kỹ thuật hay đáng liệt kê... Chúng ta có thể làm tròn đến số nguyên gần nhất, làm tròn xuống hoặc làm tròn lên. JavaScript cung cấp cho ta ba phương thức để đạt được điều này thông qua đối tượng Math.

Trước hết là làm tròn tới số phần thập phân ta muốn, để làm điều này, ta dùng hàm `toFixed('số phần thập phần cần giữ')` của chính biến chứa giá trị số mà ta cần:

![](https://images.viblo.asia/3c9be32b-121f-4b6c-b642-769b273d3520.png)

Đầu ra là một chuỗi cần được chuyển đến hàm `parseFloat()` để trả về một số. Dẫu là cách này có vẻ chậm nhưng kết quả của nó thì luôn vô cùng chính xác.

Tiếp theo là làm tròn tới số gần nhất, ta dùng `Math.round('số cần làm tròn')`:

![](https://images.viblo.asia/2652b8ad-39e6-4b15-bc3a-339c8a76541d.png)

Ngoài ra còn có `Math.floor()` để làm tròn xuống và `Math.ceil()` để làm tròn lên nữa nhé!

Có một chú ý là, việc làm tròn số khác với việc cắt bớt, khi ta sử dụng hàm `Math.trunc('số cần cắt bớt')`, thì nó đơn giản là sẽ cắt bỏ hết phần thập phân của số đầu vào chứ không phải làm tròn đâu nha! :sweat_smile::sweat_smile:

![](https://images.viblo.asia/458c6cfc-7299-409b-ba31-6a6dd43098a8.png)

# 12. Làm rỗng một mảng
Cái lúc trước khi mình đọc kỹ thuật này, mình đã nghĩ ta chỉ cần gán biến đó bằng một mảng rỗng mới là xong, nhưng thiết nghĩ lại thì rõ ràng điều đó không đúng với câu "Làm rỗng một mảng" lắm... :joy:

Thế nên ở đây có một cách nhanh gọn để làm điều đó, chính là gán cho `length` của mảng bằng 0. Thế là xong :joy:

![](https://images.viblo.asia/d5e9cc60-8c69-47ee-8b72-eaab6271dec0.png)


### Đôi lời dạo kết...
Thế là tóm cái váy lại, mình cũng đã xong công việc phiên dịch viên kiêm đầu bếp "thêm mắm thêm muối" vào bài để giúp cung cấp cho các bạn thêm hoặc ôn lại được 12 kỹ thuật thú vị và hay dùng trong Javascript rồi!

Rất mong các bạn sẽ nhận thêm được nhiều kiến thức bổ ích sau khi bỏ ra 5 phút để đọc con bài nho nhỏ này của mình.

Chúc các bạn một ngày thật vui vẻ! Mình xin chân thành cảm ơn! :heart_eyes::heart_eyes::heart_eyes:

***Bài gốc:** [12 Super Useful techniques in JavaScript](https://medium.com/javascript-in-plain-english/12-super-useful-tricks-in-javascript-65c0595d309b)*