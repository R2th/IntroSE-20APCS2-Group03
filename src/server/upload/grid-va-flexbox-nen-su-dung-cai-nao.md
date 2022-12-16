Trước khi đi sâu vào chủ đề này, chúng ta hãy xem sơ qua một số lịch sử của trình duyệt.

[Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) được lấy cảm hứng từ các UI framework người dùng phổ biến như [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/). Bản draft đầu tiên của nó được publish vào 23/07/2009. Mười một năm sau, thật ngạc nhiên khi thấy rằng sự ủng hộ dành cho nó đã tăng vọt: nó được hỗ trợ trên khoảng 99,2% trình duyệt.

Điều đó quả thực là tuyệt vời. Tuy nhiên, lịch sử của `Grid` thậm chí còn thú vị hơn. Ban đầu nó được nhóm Microsoft soạn thảo và chuyển đến Internet Explorer 10 vào năm 2011. Thông số Grid Layout sau đó đã được trình bày cho W3C vào năm 2012.

![](https://images.viblo.asia/798bb311-9ae7-401d-beed-cffb0431513d.png)

`Grid` được hỗ trợ bởi gần 96% bởi trình duyệt. Nó đã liên tục phát triển, bổ sung các tính năng như *subgrid(\*)* - có thể chỉ có sẵn trong một tập hợp trình duyệt nhỏ. Bạn nên kiểm tra tất cả các tính năng của Grid mà bạn đang sử dụng để biết mức độ hỗ trợ của nó.

![](https://images.viblo.asia/bd4c7cbd-45ee-46f6-be13-6b02567a24e8.png)


### Trước khi Flex và Grid ra đời

Nói một cách ngắn gọn, nó là một cơn ác mộng cho các lập trình viên. Nếu không có những thứ đó, cần rất nhiều công sức để đạt được những thiết kế rất đơn giản. Công cụ được sử dụng phổ biến nhất lúc bấy giờ là `Float` - nó được sử dụng mọi lúc để căn chỉnh các item sang trái, phải, dọc...

![](https://images.viblo.asia/30b5aa45-44b0-49fd-9e5a-306725d55bd0.png)

May mắn thay, Grid và Flex đã ra đời: `Flex API` rất linh hoạt và dễ sử dụng - đây là một trong số ít các tính năng CSS đã được chuyển sang React Native. Chúng ta có thể kiểm tra [React Native document](https://reactnative.dev/docs/flexbox) để biết thêm thông tin và cách nó được triển khai. Vấn đề duy nhất với Flex là một số tính năng bị thiếu, và ngay cả khi bạn có thể làm gần như mọi thứ với nó, bạn vẫn sẽ phải sử dụng một số thủ thuật để xây dựng bố cục phức tạp.

Khi CSS Grid ra đời, thời đại của những thủ thuật đó đã kết thúc như đã xảy ra cách đây một thời gian với *Float*. Bây giờ chúng ta đã có trong tay tất cả các công cụ mà chúng ta có thể mơ ước. Vấn đề chỉ là biết sử dụng chúng khi nào và ở đâu.

### Khi nào sử dụng Flex Over Grid

Theo nguyên tắc chung, Grid là vùng chứa (container) và Flex là nội dung. Flex là một hệ thống bố trí một chiều, trong khi Grid là một hệ thống bố trí hai chiều. Điều đó nghĩa là gì? Có nghĩa là Grid có thể sắp xếp các mục theo hai hướng, trong khi Flex chỉ có thể làm theo một hướng. Nói một cách đơn giản, các bố cục phức tạp hơn có thể đạt được bằng cách sử dụng Grid.

Trong ví dụ bên dưới, bạn sẽ thấy rõ hơn: Flex có thể mở rộng theo chiều dọc hoặc chiều ngang bằng cách sử dụng *flex-direction: column/row*. (Các item có thể chuyển sang hàng hoặc cột tiếp theo, nhưng đó chỉ là tác dụng phụ của việc không có đủ kích thước màn hình.) Tuy nhiên, Grid có thể mở rộng trên trục X và Y theo ý muốn:

*Demo: Horizontal using Flex, vertical using Flex, both directions using Grid*

![](https://images.viblo.asia/199b03e3-a562-42f7-9dc5-1251bf2fbb20.gif)

Một điểm khác biệt quan trọng nữa là Flex ưu tiên nội dung, trong khi Grid là bố cục. Có nghĩa là, Flex sẽ quyết định vị trí dựa trên nội dung, trong khi Grid sẽ quyết định vị trí dựa trên bố cục đã cho. Flex cứng hơn và logic của nó được mở rộng trên các nút con của nó, còn Grid là trên tất cả các bố cục cha.

Nói tóm lại, Grid năng động hơn, hiện đại hơn và nhiều tính năng hơn. Vậy chúng ta chỉ cần sử dụng Grid là đủ? Câu trả lời là **không**, tùy từng trường hợp thực tế chúng ta sẽ sử dụng loại nào sẽ hợp lý.

###  Các trường hợp nên sử dụng Flex

#### 1. Căn chỉnh nội dung (Content alignment)

Ngày xưa, việc sắp xếp các item theo chiều dọc là một công việc khá khó khăn., còn bây giờ thì nó thực sự đơn giản. Chỉ cần có một thẻ div và cho biết cách nó căn chỉnh các item (css), là chúng ta đã hoàn thành.

Đối với ví dụ cụ thể dưới đây, bạn cần sử dụng thuộc tính *align-items*. Nó sẽ căn giữa theo chiều dọc (horizontal).

![](https://images.viblo.asia/77a1e578-9e85-47a7-8cd8-1c8d61b9ccf2.png)

*Code example*

```
<!DOCTYPE html>
<html>

<head>
	<title>Flex</title>
	<meta charset="UTF-8" />
</head>

<body>
	<style type="text/css">
		#container {
			display: flex;
			align-items: center;
		}
		#firstItem {
			padding: 10px;
			height: 200px;
			background-color: lightblue;
		}
		#secondItem {
			padding: 10px;
			height: 100px;
			background-color: lightcoral
		}
	</style>
	<div id="container">
		<div id="firstItem">
			height 200px
		</div>
		<div id="secondItem">
			height 100px
		</div>
	</div>
</body>
</html>
```

Bạn có thể thấy nó đã hoàn thành với một đoạn mã CSS nhỏ. Theo nguyên tắc chung, bạn càng sử dụng ít CSS, thì càng có nhiều khả năng là bạn đang sử dụng đúng công cụ cho đúng công việc.

#### 2. Căn chỉnh đồng đều các item theo 1 chiều.

Nếu như bạn muốn căn chỉnh các phần tử theo một hướng (cột hoặc hàng), `Flex` sẽ là công cụ tốt nhất. Nó vừa đủ đơn giản để giúp bạn thực hiện tất cả các công việc khó khăn.

Ví dụ điển hình là thực hiện bố cục của một mục thẻ action. Bạn có thể tạo khoảng cách đều các item trên một hàng mà không gặp khó khăn gì với thuộc tính `justify-content: space-around` và `flex-direction: row`.

![](https://images.viblo.asia/be5a3bb2-39b5-44a2-842a-a040451517fd.png)

Code example:

```
<!DOCTYPE html>
<html>

<head>
	<title>Parcel Sandbox</title>
	<meta charset="UTF-8" />
</head>

<body>
	<style type="text/css">
		#container {
			display: flex;
			justify-content: space-around;
			border: 1px solid #000;
			padding: 10px;
		}
		#firstItem {
			padding: 10px;
			background-color: lightblue;
		}
		#secondItem {
			padding: 10px;
			background-color: lightcoral
		}
		#thirdItem {
			padding: 10px;
			background-color: lightgreen;
		}
		#card-container {
			max-width: 500px;
		}
		#card {
			background-color: lightpink;
			padding: 10px;
		}
	</style>
	<div id="card-container">
		<div id="card">
				Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
		</div>
		<div id="container">
			<div id="firstItem">
				action 1
			</div>
			<div id="secondItem">
				action 2
			</div>
			<div id="thirdItem">
				action 3
			</div>
		</div>
	</div>
</body>
</html>
```

#### 3. Định vị item phức tạp trong một chiều

Trước kia, chúng ta thấy một cách bố trí rất đơn giản và dễ dàng. Chúng ta có thể làm những việc phức tạp hơn trong không gian một chiều. Một trường hợp sử dụng hoàn hảo cho Flexbox là một thanh điều hướng. Bạn có thể tạo một thanh điều hướng trông phức tạp chỉ trong một vài dòng như ví dụ dưới đây:

![](https://images.viblo.asia/be4c7350-fc23-4d53-9452-0dd3e875ae21.png)

Code example:

```
<!DOCTYPE html>
<html>
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <style type="text/css">
      #container {
        display: flex;
        justify-content: space-around;
        border: 1px solid #000;
        padding: 10px;
      }
      #firstItem {
        padding: 10px;
        background-color: lightblue;
      }
      #secondItem {
        padding: 10px;
        background-color: lightcoral;
      }
      #thirdItem {
        padding: 10px;
        background-color: lightgreen;
      }
      #separatorItem {
        flex-grow: 1;
      }
    </style>
    <div id="container">
      <div id="firstItem">
        Logo
      </div>
      <div id="separatorItem"></div>
      <div id="secondItem">
        Button 1
      </div>
      <div id="thirdItem">
        Button 2
      </div>
    </div>
  </body>
</html>
```

Chìa khóa ở đây là sử dụng `flex-grow` để tạo ra một thẻ div vô hình sẽ chiểm tất cả không gian còn lại và tạo ra sự tách biệt giữa các `button` và `logo`. Bạn có thể đạt được hiệu ứng tương tự với `space-between` hoặc `space-around`, nhưng sẽ cần nhiều thẻ div hơn.

#### 4. Các tính năng của Polyfill Grid

Lưu ý phổ biến nhất là khi sử dụng Grid thì trình duyệt không hỗ trợ tốt như đối với Flexbox, đặc biệt là đối với các tính năng mới của nó. Chúng ta sẽ sử dụng gì khi không có Grid, chính xác là Flexbox. Chúng ta có thể sử dụng điều hướng @supports:

Code example:

```
<!DOCTYPE html>
<html>
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <style type="text/css">
      #container {
        display: flex;
        flex-direction: column;
        border: 1px solid #000;
        padding: 10px;
      }
      @supports (display: grid) {
        #container {
          display: grid;
          grid-template-columns: 100px 1fr 100px;
        }
      }
      .footer {
        padding: 10px;
        background-color: lightgreen;
      }
      .header {
        padding: 10px;
        background-color: lightblue;
      }
      .content {
        padding: 10px;
        min-height: 400px;
        background-color: lightcoral;
      }
    </style>
    <div id="container">
      <div class="header">
        Button 1
      </div>
      <div class="content">
        Button 2
      </div>
      <div class="footer">
        Button 3
      </div>
    </div>
  </body>
</html>
```

Bạn có thể thấy trong đoạn code ví dụ trên, chúng ta có sử dụng thuộc tính `grid-template-columns` chỉ khi chúng ta biết trình duyệt có hỗ trợ `Grid`. Nếu không, chúng ta sẽ quay lại với `Flexbox` truyền thống.

**Lưu ý**

Đừng mắc vào cái bẫy cố gắng cung cấp cùng một thiết kế chính xác cho bố cục dự phòng. Những người dùng trên các trình duyệt cũ hơn có thể chấp nhận được các bố cục đơn giản hơn - chỉ cần cố gắng duy trì trải nghiệm UX nhất quán.

@supports không khả dụng trên Explorer 11, điều đó có nghĩa là mặc dù một số tính năng Grid được hỗ trợ ở đó, bạn vẫn sẽ sử dụng dự phòng `polyfill`. Không phải là một điều to tác, nhưng đó là một điều mà chúng ta cần lưu ý.

###  Các trường hợp nên sử dụng Grid

#### 1. Khoảng cách giữa các item

Nếu bạn đang cố gắng tạo ra khoảng trống giữa các item trên `Flexbox`, chắc chắn bạn đã sử dụng thuộc tính `margins` với giá trị âm và làm rối tung `padding` lên nữa..v.v. Những ngày đó đã không còn nữa vì `Grid` cung cấp 3 thuộc tính hữu ích sau:

* row-gap: Khoảng trống cho các hàng
* column-gap: Khoảng trống cho các cột
* gap: Khoảng cách cho cả hàng và cột

Với rất ít CSS, chúng ta có thể đạt được mục đích với yêu cầu khá phức tạp:

![](https://images.viblo.asia/e0022909-4e62-4aad-9fa2-ace351315959.png)

Code example:

```
#container {
  display: grid;
  border: 1px solid #000;
  padding: 10px;
  row-gap: 10px;
  column-gap: 10px;
}
.blueItem {
  padding: 10px;
  background-color: lightblue;
  grid-column: 1;
}
.redItem {
  padding: 10px;
  background-color: lightcoral;
  grid-column: 2;
}
.greenItem {
  padding: 10px;
  background-color: lightgreen;
  grid-column: 3;
}
```

*Update:* Gần đây Flex đã thêm tính năng khoảng trống (gap) vào `Flexbox`. Tuy nhiên, nó có mức hỗ trợ rất thấp, vì vậy nó vẫn chưa sẵn sàng để release.

#### 2. Các item có min-width phù hợp với column size.

Chúng ta biết rằng, `Flex` có thể bọc các item trên nhiều cột, nhưng điều không thể làm là cung cấp cho các item đó chiều rộng tối thiểu hoặc tối đa. Ví dụ, chúng ta muốn các item có kích thước 200px hoặc bằng kích thước của một cột (cho trước) nếu nó hơn hơn. Chúng ta có thể đạt được điều này bằng cách sử dụng Grid.

*Width is 745 px. It fits 3 items.*

![](https://images.viblo.asia/9b7f40d7-7392-4138-87bb-a82ef861ed49.png)

*Width is 580px. It fits 2 items.*

![](https://images.viblo.asia/fec5a606-722c-4df0-873c-2e7d90f06d5c.png)

Bố cục tuyệt vời này được thực hiện chỉ với đoạn code này:

```
#container {
  display: grid;
  border: 1px solid #000;
  padding: 10px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}
.redItem {
  padding: 10px;
  background-color: lightcoral;
}
```

Để chắc chắn hãy kiểm tra các tính năng minmax và repeat - nó đang thực hiện các công việc nặng nhọc cho chúng ta ở đó. Với minmax chúng chỉ định rằng muốn Grid column có chiều rộng ít nhất là 200px và lặp lại (repeat) đang thực hiện phần còn lại, cố gắng tạo ra nhiều cột nhất có thể với giới hạn kích thước đó.

Chúng ta có thể thấy, chúng ta đã đạt được một bố cục rất hữu ích, đáp ứng một cách "tình cờ" mà không cần bất kỳ `@media query` nào. Chúng ta sẽ đề cập đến nhiều tính năng bố cục đáp ứng hơn sau này, nhưng chắc chắn rằng hãy ghi nhớ điều này.

#### 3. Bố cục đa chiều phức tạp

Nếu muốn thiết kế một bố cục phức tạp, không có gì phải bàn cãi cả: bạn nên sử dụng `Grid`. Nó có rất nhiều cách để hoàn thành, nhưng đối với cách tiếp cận nào thì đều có mặt hạn chế của nó. Ở đây chúng ta hãy xem xét thuộc tính `grid-template-ereas` - nó khá trực quan và dễ đọc.

![](https://images.viblo.asia/afaa6aa8-cc3b-46c0-b80d-261710e6c96f.png)

Code example:

```
#container {
  display: grid;
  grid-auto-columns: minmax(100px, auto);
  grid-template-areas:
    "header header header header header header header header"
    "left-content content content content content content content right-content"
    "footer footer footer footer footer footer footer footer";

  border: 1px solid rgb(63, 49, 49);
  padding: 10px;
  gap: 10px;
}
.footer {
  padding: 10px;
  background-color: lightgreen;
  grid-area: footer;
}
.left-content {
  padding: 10px;
  background-color: lightgray;
  grid-area: left-content;
}
.right-content {
  padding: 10px;
  background-color: lightgray;
  grid-area: right-content;
}
.header {
  padding: 10px;
  grid-area: header;
  background-color: lightblue;
}
.content {
  padding: 10px;
  min-height: 400px;
  grid-area: content;
  background-color: lightcoral;
}
```

![](https://images.viblo.asia/702ad4cc-da6a-4b64-89b1-591826c1370b.jpeg)

Lưu ý: Tính năng này rất thú vị, nó chỉ được hỗ trợ trên 93,05% trình duyệt. Vì vậy, có thể bạn muốn tìm hiểu thêm các lựa chọn thay thế, chẳng hạn như `grid-row` và `grid-column`.

#### 4. Responsive layout

Chúng ta có thể dễ dàng định hình lại bố cục Gridvì gần như tất cả các thông tin bố cục đều nằm trong vùng chứa Grid. Hãy nhớ rằng chúng ta đã nói trước về việc các mục con chủ yếu nắm giữ thông tin vị trí. Chỉ cần thêm một `media query` (@media), bạn có thể thay đổi hoàn toàn bố cục của mình để thích ứng với kích thước màn hình hiện tại. Đây là hai ví dụ rất đơn giản.

Hãy xem ví dụ sau với *grid-area* và làm cho nó responsive:

```
#container {
  display: grid;
  grid-auto-columns: minmax(100px, auto);
  grid-template-areas:
    "header header header header header header header header"
    "left-content content content content content content content right-content"
    "footer footer footer footer footer footer footer footer";
  border: 1px solid rgb(63, 49, 49);
  padding: 10px;
  grid-gap: 10px;
}
@media screen and (max-width: 900px) {
  #container {
    grid-template-areas:
      "header header"
      "content content"
      "left-content right-content"
      "footer footer"
  }
}
.footer {
  padding: 10px;
  background-color: lightgreen;
  grid-area: footer;
}
.left-content {
  padding: 10px;
  background-color: lightgray;
  grid-area: left-content;
}
.right-content {
  padding: 10px;
  background-color: lightgray;
  grid-area: right-content;
}
.header {
  padding: 10px;
  grid-area: header;
  background-color: lightblue;
}
.content {
  padding: 10px;
  min-height: 400px;
  grid-area: content;
  background-color: lightcoral;
}
```

Có thể thấy rằng, việc thay đổi phân bố `grid-template-ereas` để đạt được hiệu ứng này rất đơn giản.

    
Trong một ví dụ khác, hãy chỉ định hình lại bằng `grid-template-columns`:
    
```
#container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;

  border: 1px solid #000;
  padding: 10px;
  grid-gap: 10px;
}
@media (min-width: 768px) {
  #container {
    grid-template-columns: 100px 1fr 100px;
  }
}
.footer {
  padding: 10px;
  background-color: lightgreen;
}
.header {
  padding: 10px;
  background-color: lightblue;
}
.content {
  padding: 10px;
  min-height: 400px;
  background-color: lightcoral;
}
```

*Responsive desktop design*

![](https://images.viblo.asia/2209893b-74f4-4d13-afd8-13c4cefb6e5b.png)

*Responsive mobile design*

![](https://images.viblo.asia/2a04f8a0-bc0d-49c9-860e-d53b144ba9cc.png)

Việc tạo bố cục responsive chưa bao giờ rõ ràng và trực quan như thế này :100:

#### 5. Sử dụng Grid column sizing trên child elements.

Tại thời điểm này, `Grid` và `Flexbox` chỉ có thể làm việc với phần tử con cấp 1, và các phần tử con của phần tử con cấp 1 đó không thể sử dụng bất kỳ lợi ích nào từ bố cục. Đây là lúc `sub-grid(*)`phát huy tác dụng. Nó trao quyền cho các item con với định vị bố cục Grid của cha mẹ. Có một điều là nó chỉ được hỗ trợ trên Firefox, chiểm 3% các trình duyệt. Vẫn còn quá sớm để sử dụng tính năng này, nhưng bạn có thể để tâm tới tính năng này, tôi sẽ sớm viết 1 bài viết cụ thể về nó.

### Tóm lại

Chúng ta đã cùng nhau thảo luận qua về `Flexbox + Grid` và kết luận rằng cả hai đều có các trường hợp rất cụ thể mà nó phát huy tối đa sức mạnh. Điểm quan trọng rút ra là ngay cả khi Grid có nhiều tính năng hơn Flex thì nó không có nghĩa là thay thế, đó chỉ là một công cụ khác mà chúng ta có thể sử dụng để thiết kế các bố cục phức tạ hơn.

Tôi hy vọng bạn bài viết này giúp bạn có một cái nhìn rõ ràng hơn về Grid và Flex, về những gì bạn cần sử dụng trong dự án hiện tại hoặc trong tương lai.

Cheers!

Nguồn tham khảo: https://sal.vn/TMqumK