Thông thường, để tạo một biểu đồ hiển thị trên website, chúng ta sẽ sử dụng canvas để có thể vẽ được biểu đồ mà ta mong muốn. Và việc này đòi hỏi bạn phải có một kiến thức nền tảng Javascript tốt. Tuy nhiên, với sự phát triển mạnh mẽ của HTML5 và CSS3, giờ đây chúng ta đã có thể vẽ được biểu đồ chỉ bằng HTML và CSS. Trong bài viết này, mình sẽ hướng dẫn các bạn vẽ biểu đồ hiển thị phần trăm kết hợp với hiệu ứng chuyển động.
![](https://images.viblo.asia/b90af544-ff2c-479f-a207-2fc42cc62ff6.gif)

## Ý tưởng
Để vẽ được biểu đồ này, trước tiên bạn sẽ cần phải vẽ một đường tròn có chu vi bằng 100. Đường tròn này sẽ có 2 đoạn:
* Đoạn thứ nhất sẽ hiển thị từ 0 đến 100 (tùy vào tham số mà chúng ta truyền vào) để làm nổi bật vòng tròn tương ứng với tỷ lệ phần trăm
* Đoạn thứ hai sẽ được sử dụng làm khoảng trống để che phần còn lại đi (đoạn này chúng ta sẽ không thể nhìn thấy).

Nghe có vẻ khó hiểu đúng không :D, mình sẽ không để bạn phải chờ lâu, chúng ta bắt đầu tiến hành vẽ nào!

## 1. Vẽ đường tròn bao quanh
Để vẽ được một đường tròn, hiển nhiên chúng ta cần phải tính được bán kính và đường kính của đường tròn đó (kiến thức "mẫu giáo" :D). Vậy chúng ta hãy cùng tính các giá trị đó qua các công thức toán học đơn giản:

```
radius = circumference / 2π
```

Bán kính sẽ bằng chu vi chia cho 2π, mà chúng ta đã có chu vi là 100, vậy thì công thức tính bán kính của chúng ta sẽ như sau:

```
radius = 100 / (3,14159 * 2) = 15,9155
```

Và cuối cùng là đường kính:

```
diameter = 15,9155 * 2 = 31.831
```

Tiếp đến chúng ta hãy tạo ra một file html và thêm các kết quả mà chúng ta đã tính được vào trong đó:

```html:progess-chart.html
<svg viewBox="0 0 36 36">
  <path
    d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
    fill="none"
    stroke="#444";
    stroke-width="1";
  />
</svg>
```

Đến đây, bạn đã vẽ được một đường tròn có đường kính là **31.831**. Nếu bạn để ý kỹ hơn bằng cách mở developer tools của trình duyệt và inspect element thì bạn sẽ thấy có một vùng bao bọc cả đường tròn. Vì chúng ta sẽ có thể vẽ một đường tròn khác rộng và dày hơn bao quanh nó nên mình đã để vùng này to hơn đường tròn đã vẽ trước đó một chút với tỉ lệ là **36x36**. Bên cạnh đó, điểm bắt đầu của đường tròn cũng được thiết lập với các giá trị như dưới đây:
* **x: 18** = (36/2)
* **y: 2.0845** = ((36–31.831) / 2)

![](https://images.viblo.asia/fdb8ba05-9bb8-4b7d-8284-dc28aef72327.png)

## 2. Chia đường tròn làm hai đoạn
Chúng ta đã có đường tròn hiển thị đầy đủ và không bị ngắt quãng, việc chúng ta cần làm bây giờ là làm cho nó ngắt tại điểm tương ứng với phần trăm mà chúng ta muốn. Việc này cũng không quá khó vì mình đã thiết lập đường tròn này có chu vi là 100. Giờ chúng ta chỉ cần thêm thuộc tính **stroke-dasharray** vào và đặt tham số thứ nhất là phần trăm mà bạn muốn hiển thị, tham số thứ hai là chu vi của đường tròn (tức là 100), như dưới đây:

```
stroke-dasharray="100, 100" --> 100%
stroke-dasharray="75, 100" --> 75%
stroke-dasharray="50, 100" --> 50%
stroke-dasharray="25, 100" --> 25%
stroke-dasharray="0, 100" --> 0%
...
```

Cuối cùng, đoạn code SVG của chúng ta sẽ như sau:

```html:progess-chart.html
<svg viewBox="0 0 36 36">
  <path
    d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
    fill="none"
    stroke="#444";
    stroke-width="1";
    stroke-dasharray="75, 100"
  />
</svg>
```

## 3. Tạo hiệu ứng và màu sắc cho đường tròn
**Hiệu ứng và màu sắc ở mức cơ bản:**
{@embed: https://codepen.io/sergiopedercini/pen/aWawra}

**Nâng cao hơn chút nữa:**
{@embed: https://codepen.io/sergiopedercini/pen/jmKdbj/}

## 4. Hỗ trợ trình duyệt:
Mặc dù chúng ta có thể vẽ được biểu đồ biểu thị phần trăm bằng HTML5 và CSS3 nhưng nó vẫn bị hạn chế trên một số trình duyệt. Cụ thể thì nó chỉ được hỗ trợ trên các trình duyệt dưới đây:
* Chrome 7+
* Firefox 4+
* Opera 12+
* Safari 5.1+
* Internet Explorer / Edge 9+ (*)

-----
***Tài liệu tham khảo:** https://medium.com/@pppped/how-to-code-a-responsive-circular-percentage-chart-with-svg-and-css-3632f8cd7705