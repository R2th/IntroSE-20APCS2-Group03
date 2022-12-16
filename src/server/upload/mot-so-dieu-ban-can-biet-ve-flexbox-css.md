## Giới thiệu
Để xây dựng layout của một ứng dụng web chúng ta có rất nhiều cách, hai cách được sử dụng nhiều nhất đó là Grid CSS và Flexbox CSS.
Nếu các bạn là một người lập trình Web thì ắt hẳn các bạn sẽ biết đến một thư viện là Bootstrap. Rất nhiều Dev sử dụng thư viện này để tuỳ chỉnh layout của website, và thư viện này đều sử dụng cả Grid CSS và Flexbox CSS.
Flexbox CSS cung cấp cho chúng ta một cách hiệu quả hơn để bố trí, sắp xếp và phân phối không gian giữa các khối trong một container, ngay cả khi kích thước của chúng dài hoặc to lên.
Có thể nói, Flexbox CSS linh hoạt và dễ sử dụng hơn Grid CSS nhưng Flexbox phù hợp nhất với nhưng website có bố cục và quy mô nhỏ, trong khi Grid CSS được thiết kế cho các website có bố cục và quy mô lớn hơn.
Riêng bản thân mình, vẫn thích dùng Flexbox CSS hơn
## Các khái niệm cơ bản và thuật ngữ

Ví dụ chúng ta có một đoạn HTML như thế này
```html
 <div class="container">
     <div class="item">
         <p>Child items</p>
     </div>
     <div class="item"></div>
     <div class="item"></div>
</div>
```
Container hay còn gọi là "cha" chính là cái thằng div mà chứa tất cả các thẻ bên trong nó một cấp.
Lưu ý rằng flex chỉ có tác động tới phần tử con nằm trực tiếp trong nó một cấp. Tức là khi bạn flex cho thằng container thì những thằng div có class item mới bị tác động, còn thằng thẻ p nó sẽ không bị tác động bởi flex của container.
Ok. Chúng ta bắt đầu đi thực hiện các thuộc tính của nó.
## Thuộc tính
##### display: flex
Để định nghĩa một container hiển thị theo kiểu flex. Chúng ta chỉ cần thêm dòng:
```css
div.container {
    display: flex;
}
```
**Note**: chúng ta cần thêm một số dòng css nữa để có thể đúng trên mọi trình duyệt.

##### flex-direction
Flex-direction để thiết lập bố cục của các phần của các phần tử con.
Chúng ta có 4 thuộc tính:
* **row**: hiển thị theo chiều ngang và từ trái sang phải theo thứ tự
* **row-reverse**: hiển thị theo chiều ngang và từ phải sang trái theo thứ tự
* **column**: hiển thị theo chiều dọc và từ trên xuống dưới theo thứ tự
* **column-reverse**: hiển thị theo chiều dọc và từ dưới lên trên theo thứ tự


Hình này thể hiện các thuộc tính trên:
![](https://images.viblo.asia/7d652cc5-556c-4058-9889-5866afc5fa3a.png)


##### flex-wrap

Theo mặc định, các item của một container sẽ sắp xếp hiển thị vừa trên một dòng. Chúng ta có thể thay đổi điều đó khi sử dụng thuộc tính này.
```css
flex-wrap: nowrap | wrap | wrap-reverse
```

Cụ thể:
* **nowrap**: tất cả các item sẽ nằm trên cùng một dòng
* **wrap**: các item sẽ nằm trên nhiều dòng từ trên xuống dưới
* **wrap-reverse**: các item cũng nằm trên nhiều dòng nhưng ngược lại với thuộc tính trên


#### flex-flow

Cái này cũng chả có gì cả, nó chỉ là thuộc tính gộp hai thuộc tính ở trên lại để viết cho đỡ dài dòng.
Ví dụ, thay vì viết: 
```css
flex-direction: row;
flex-wrap: wrap;
```
Thì chúng ta chỉ cần một dòng: 
```css
flex-flow: row wrap;
```


#### justify-content:
Thuộc tính này giúp chúng ta căn chỉnh các thành phần theo trục dọc của dòng
```css
justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
```
Cụ thể:
* **flex-start**: tất cả các item sẽ sắp xếp từ trái sang phải
* **flex-end**: các item sẽ sắp xếp từ phải sang trái
* **center**: các item sẽ nằm giữa của row đó
* **space-between**: các item sẽ căn chỉnh nằm cách nhau một khoảng bằng nhau và hai item đầu và cuối sẽ nằm sát bên dòng đó
* **space-around**: cũng giống như trên nhưng hai item hai bên đầu sẽ cách hai bên lề một khoảng  bằng nhau
* **space-evenly**: các item sẽ phân phối sao cho khoảng cách giữa các item và hai bên là bằng nhau


Hãy cùng xem hình dưới đây để dễ hiểu hơn

![](https://images.viblo.asia/beb355ee-9276-4278-9358-692a5efb2075.png)


#### align-items


Cũng giống như justify-content nhưng align-item sẽ căn chỉnh các thành phần theo trục ngang của dòng

```css
align-items: flex-start | flex-end | center | baseline | stretch;
```
Hãy xem hình để dễ hiểu hơn:
![](https://images.viblo.asia/32f5cda9-aacc-4409-8b7f-fef1156b96ca.png)


#### align-content
**Chú ý**: thuộc tính này không hoạt động khi các thành phần con chỉ hiển thị trên một dòng

Thuộc tính này cho phép chúng ta căn chỉnh các row (các dòng) chứa các phần tử trong không gian hiển thị của nó, nó hoạt động tương tự như justify-content.


```css
align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```
Hãy cùng xem hình này để dễ hiểu hơn nhé :thinking_face:
![](https://images.viblo.asia/4ea5a927-8707-484f-94de-e24842cbb537.png)

## Kết luận
CSS IS AWESOME!

Trên đây là các khái niệm và thuộc tính cơ bản của Flexbox CSS.
Thật sự CSS là một điều gì đó rất thú vị. Mình hi vọng các bạn sẽ tìm được cảm hứng với nó.
Mình tin rằng nó sẽ được áp dụng rất nhiều nếu bạn là một Frontend Developer. Hoặc nếu bạn là một Backend Developer, học thêm về Front-end sẽ có ích cho bạn rất nhiều.

Cám ơn các bạn đã theo dõi bài viết này.

Happy hacking!!!