Không biết các bạn thế nào, chứ bản thân mình mỗi khi viết một dòng code nào đó đều nghĩ: “Liệu mình viết code như này đã clean code chưa?”, “Liệu code của mình có khiến ai đó văng tục không nhỉ?”.

Tất nhiên, mỗi người sẽ có phong cách và sở thích viết code khác nhau, nhưng nhìn chung là nên tuân theo nguyên tắc dễ đọc, dễ hiểu nhất có thể.
## Khối lệnh switch case là gì?

Khối lệnh này có nhiệm vụ cực kỳ đơn giản, giải thích kiểu “nông chí điền” là nó nhận đầu vào và tương ứng với nó là một đầu ra. Để dễ hình dung hơn, khối lệnh này giống như hình ảnh phân luồng giao thông: xe máy thì đi vào luồng dành cho xe máy, oto thì vào luồng oto.v.v..
![](https://images.viblo.asia/b090d154-1f57-405b-bfc7-56c57ee676cd.jpg)

Dưới đây là một ví dụ về một đoạn code sử dụng switch..case
```
    function displayPet(pet = 'dog') {
      switch (pet) {
        case 'lizard':
          console.log('I own a lizard');
          break;
        case 'dog':
          console.log('I own a dog');
          break;
        default:
          console.log("I don't own a pet");
          break;
      }
    }
```
## Vấn đề của khối lệnh switch

Nhìn chung thì dùng câu lệnh switch…case không có gì sai cả. Nhưng đôi khi, bạn sẽ thấy khối lệnh switch case nó dài vô tận, kiểu như dưới đây.
```
    const handleKeyUp = (e, target) => {
      // if the key is 'Enter'
      if(e.keyCode === 13) {
          switch (target) {
              case 'firstName':
                  this.lastNameRef.current.lastChild.firstChild.focus()
                  break
              case 'lastName':
                  this.yobRef.current.lastChild.firstChild.focus()
                  break
              case 'yob':
                  this.bioRef.current.lastChild.focus()
                  break
              case 'bio':
                  this.emailRef.current.lastChild.firstChild.focus()
                  break
              case 'email':
                  this.passRef.current.lastChild.firstChild.focus()
                  break
              case 'password':
                  this.passConfRef.current.lastChild.firstChild.focus()
                  break
              case 'passwordConf':
                  this.countryRef.current.lastChild.firstChild.focus()
                  break
              case 'country':
                  this.cityRef.current.lastChild.firstChild.focus()
                  break
              case 'city':
                  this.occupationRef.current.lastChild.firstChild.focus()
                  break
              case 'occupation':
                  this.lang1Ref.current.lastChild.firstChild.focus()
                  break
              case 'language1':
                  this.lang2Ref.current.lastChild.firstChild.focus()
                  break
              case 'language2':
                  this.lang3Ref.current.lastChild.firstChild.focus()
                  break
              case 'language3':
                  this.submitRef.current.focus()
                  break
              default:
                  this.firstNameRef.current.lastChild.firstChild.focus()
                  break
          }  
      }
    }
```
Vậy chúng ta phải làm thế nào? Có giải pháp viết code nào ngon lành hơn không? Với những bài toán như này thì không dùng switch case thì dùng cái gì? Tác giả lại chém gió rồi!

Hihi. Tất nhiên là có giải pháp thay thế rồi. Đó là sử dụng Object literal lookup
## Object Literal lookups

Với Javascript nói riêng, chúng ta sử dụng Object ở mọi nơi, mọi lúc. Vậy tại sao chúng ta không áp dụng Object vào trong trường hợp này. Việc sử dụng Object cho chúng ta cái nhìn thân quen hơn vì theo thống kê thì việc sử dụng Object và Array chiếm nhiều nhất trong cách viết code của chúng ta.

Ok, quay trở lại hàm handleKeyUp() dài ngoằng ở trên, chúng ta có thể viết lại như sau:
```
    const cases = {
      'firstName': this.lastNameRef.current.lastChild.firstChild,
      'lastName': this.yobRef.current.lastChild.firstChild,
      'yob': this.bioRef.current.lastChild,
      'bio': this.emailRef.current.lastChild.firstChild,
      'email': this.passRef.current.lastChild.firstChild,
      'password': this.passConfRef.current.lastChild.firstChild,
      'passwordConf': this.countryRef.current.lastChild.firstChild,
      'country': this.cityRef.current.lastChild.firstChild,
      'city': this.occupationRef.current.lastChild.firstChild,
      'occupation': this.lang1Ref.current.lastChild.firstChild,
      'language1': this.lang2Ref.current.lastChild.firstChild,
      'language2': this.lang3Ref.current.lastChild.firstChild,
      'language3': this.submitRef.current,
    } 
    // Định nghĩa hàm
    const handleKeyUp = (e, target) => {
      if(e.keyCode === 13) cases[target].focus()
    }
    // Lúc sử dụng
    handleKeyUp(event, "email")
```
Giải pháp đơn giản là chúng ta đặt các điều kiện vào trong một Object. Việc Object lookup rất nhanh, đặc biệt khi chúng có kích thước lớn lên theo thời gian.

Ngoài ra, với cách làm trên, mỗi khi phải thêm điều kiện mới, bạn không cần phải sửa lại logic của hàm handleKeyup(), mà chỉ đơn giản là thêm vào trong Object (không có logic gì ở đây cả).

Bạn thấy giải pháp mới này thế nào? Có phù hợp với phong cách viết code của bạn không? Hãy để lại bình luận bên dưới để mọi người cùng trao đổi nhé.

Nguồn tham khảo:
https://vntalking.com/clean-code-js-dung-viet-switch-case-nhu-nay-nua.html