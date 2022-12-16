# Giới thiệu
![image.png](https://images.viblo.asia/f53dfbcb-a7c1-417e-9c2e-6e3dd6a02378.png)
Trước khi flex xuất hiện, để tạo bố cục cho một trang web ta thường sử dụng kiểu **float** hoặc **table**. Tuy nhiên, cả float và table đều có nhiều nhược điểm khiến việc sử dụng không đạt hiệu quả cao. Từ khi **flex** xuất hiện việc dàn layout trở nên đơn giản rất nhiều. Vậy **flex** có gì mạnh mẽ mà đến 99,9999% các trang web ngày nay đều sử dụng nó? Chúng ta cùng tìm hiểu đâu nào!

# 1. Flex Container - Parent Element

 Để sử dụng mô hình Flexbox, trước hết ta cần định nghĩa một flex container với cú pháp `display: flex`.
 
 Ví dụ với đoạn code dưới ta sẽ được một layout với bố cục như sau:
 
 
HTML:
```html
 <div class="flex-container">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```
CSS:
```css
.flex-container {
  display: flex;
  background-color: DodgerBlue;
}

.flex-container > div {
  background-color: #f1f1f1;
  margin: 10px;
  padding: 20px;
  font-size: 30px;
}
```
![image.png](https://images.viblo.asia/a306de9d-d19e-4691-b6ec-75f4eacf497e.png)
Ở đây, flex container chính là vùng màu xanh với ba flex item.

Các thuộc tính của flex container là: 
* **flex-direction**: row*|row-reverse|column|column-reverse|initial|inherit;

    Xác định hướng của các flex item trong flex container
    - row: Giá trị mặc định. Các phần tử sẽ nằm theo chiều ngang (một hàng)
    - column: Các phần tử sẽ nằm theo chiều ngang (một cột)
    - row-reverse, column-reverse: thứ tự sắp xếp các sẽ đảo ngược so với row và column
* **flex-wrap**: nowrap*|wrap|wrap-reverse|initial|inherit

    Ý tưởng ban đầu của flexbox là đặt các mục linh hoạt theo một hàng duy nhất. Nhưng sẽ thế nào nếu chúng ta muốn có một bố cục với các mục xếp thành nhiều hàng? Thuộc tính flex-wrap được tạo ra để giúp chúng ta giải quyết điều này.
    - nowrap: Giá trị mặc định. Các phần tử được hiển thị trên cùng một hàng, mặc định chúng sẽ tự động dãn hoặc thu hẹp để vừa với chiều rộng của khung lớn.


    ![image.png](https://images.viblo.asia/a3becb84-f9a3-4ab5-9790-998fd675183d.png)
    - wrap: Các phần tử  có thể hiển thị nhiều hàng từ trái qua phải và từ trên xuống dưới nếu cần
    
     ![image.png](https://images.viblo.asia/03e9e15e-7b02-446f-97e6-f3c1acc92961.png)
    - wrap-reverse: tương tự như wrap nhưng thứ tự sẽ đảo ngược lại
     
    ![image.png](https://images.viblo.asia/df2a6754-4a3a-4fbc-ac81-24b09d824503.png)
* **flex-flow**: flex-direction flex-wrap|initial|inherit; Thuộc tính này là một dạng viết tắt (shorthand) cho hai thuộc tính flex-direction và flex-wrap.
* **justify-content**: flex-start*|flex-end|center|space-between|space-around|space-evenly|initial|inherit;. thuộc tính căn chỉnh các mục của phần tử khi các phần tử không sử dụng hết không gian có sẵn trên "**trục chính**".

    - flex-start: Giá trị mặc định. Các phần tử sẽ bắt đầu được đặt ở đầu của flex container
     ![image.png](https://images.viblo.asia/e5213ad2-aea2-45ff-b03b-774f41172d8e.png)

    - flex-end: Ngược lại với flex-start, các phần tử sẽ được đặt sao cho phần tử cuối cùng ở cuối cùng của flex container
    ![image.png](https://images.viblo.asia/9ed523f7-8abf-42c3-bf00-796c30ef3380.png)

    - center: Các phần tử sẽ bắt đầu được đặt ở chính giữa của flex container
    ![image.png](https://images.viblo.asia/337df1da-7a80-4e88-8df0-028738feb32e.png)

    - space-between: Giữa các phần tử sẽ có khoảng trống sao và khoảng trống đó sẽ bằng nhau
    ![image.png](https://images.viblo.asia/36e582b6-ab9f-481b-bee2-1f13ee834b92.png)

    - space-around: Các phần tử sẽ có khoảng trống ở đầu, ở giữa các phần tử, và ở sau nó. Như hình bên dưới ta thấy, khoảng cách giữa phần tử 1 và 2, 2 và 3 là bằng nhau và gấp đôi khoảng cách giữa 1 và đầu của flex container.
    ![image.png](https://images.viblo.asia/e9624fdb-718c-4345-93d3-294705143f2e.png)

    - space-evenly: Các phần tử sẽ có khoảng không gian bằng nhau tức là khoảng cách đến flex container cũng như đến các phần tử khác sẽ bằng nhau.
    ![image.png](https://images.viblo.asia/9d059ab0-0a92-4b09-acb1-33b025536305.png)
* **align-items**: stretch*|center|flex-start|flex-end|baseline|initial|inherit; Căn chỉnh theo chiều dọc các mục linh hoạt khi các mục không sử dụng tất cả không gian có sẵn trên trục vuông góc với **trục chính**
    - stretch: Giá trị mặc định. Các phần tử được kéo căng để vừa với flex container. Chiều cao của các phần tử sẽ bằng chiều cao của flex container
     
    ![image.png](https://images.viblo.asia/dec6ddc6-895a-45a9-8da5-3b20370271af.png)
    - center: Các phần tử được đặt ở chính giữa flex container
    
    ![image.png](https://images.viblo.asia/26163219-7126-4a3c-bce3-39892ff01814.png)
    - flex-start: Các phần tử được đặt ở đầu flex container

    ![image.png](https://images.viblo.asia/7f025180-7434-4f66-ac50-ae7868e90fad.png)
    - flex-end: Các phần tử được đặt ở cuối flex container

    ![image.png](https://images.viblo.asia/ee302d4c-ae72-43a1-b713-681b67fcbb91.png)
    - baseline: Các phần tử được đặt ở đường cơ sở (baseline) của flex container.

    ![image.png](https://images.viblo.asia/180b4e7d-5367-4605-a05b-3ce95679b304.png)
    
    *Giải thích thêm một chút: Theo wikipedia, baseline là: "The line upon which most letters "sit" and below which descenders extend."
    ![image.png](https://images.viblo.asia/6756e64f-6d2f-42dc-8485-1fdccbd7cb15.png)
    
    Vì vậy nếu các phần tử trong flex container có font-size bằng nhau thì khi sử dụng thuộc tính baseline ta sẽ được kết quả giống với khi sửa dụng flex-start
    
    Các bạn có để ý rằng bên trên mình có dùng một từ là **trục chính** không? Vâng nó chính là chiều phân bố của các phần tử trong flex container hay chính là thuộc tính flex-direction. Vì vậy nếu flex container có `flex-direction: column` thì thuộc tính `justify-content` lúc này sẽ giúp căn dọc và ngược lại `align-item` sẽ giúp chúng ta căn ngang
    
* **align-content**: stretch*|center|flex-start|flex-end|space-between|space-around|space-evenly|initial|inherit; Thuộc tính align-content thay đổi các hiển thị của thuộc tính flex-wrap. Nó tương tự như align-items, nhưng thay vì căn chỉnh các mục linh hoạt, nó căn chỉnh các đường linh hoạt. Flex container phải có nhiều dòng mục để thuộc tính này có bất kỳ tác dụng nào! Tức là ta phải sử dụng kèm thuộc tính `flex-wrap: wrap;`
    - stretch: Giá trị mặc định. Các dòng kéo dài để chiếm không gian còn lại
     
    ![image.png](https://images.viblo.asia/3d2d4d95-8530-482a-9f41-de8c0a7f3169.png)
    - center: Các dòng được "đóng gói" về phía trung tâm của flex container
    
    ![image.png](https://images.viblo.asia/76289851-38e1-48c3-a3c1-66ca50fe42e0.png)
    - flex-start: Các dòng được "đóng gói" về phía đầu của flex container

   ![image.png](https://images.viblo.asia/008b274d-0211-4226-b896-7173e917c6e8.png)
    - flex-end: Các dòng được "đóng gói" về phía cuối của flex container

    ![image.png](https://images.viblo.asia/fe66767d-f6e8-4505-a14c-cca537e5b432.png)
    - space-between:

    ![image.png](https://images.viblo.asia/c0e5ebc4-8637-4678-a441-da368692a538.png)
    - space-around: 

   ![image.png](https://images.viblo.asia/118d4775-b742-44ff-966d-19c49b4c9485.png)
    
    - space-evenly:

   ![image.png](https://images.viblo.asia/99b749b0-034d-40e0-ac45-ddb36f6f9526.png)

    Ta thấy rằng thuộc tính này khá giống với `justify-content` nhưng phân bố các phân tử theo chiều dọc.
 # 2. Flex Items - Children Element
 
 Các thuộc tính của flex items bao gồm:
 
*  **order**: number|initial|inherit; Chỉ định thứ tự của các mục linh hoạt bên trong cùng một flex container. Chú ý một số trình duyệt cần phải sử dụng tiếp đầu ngữ để có thể hoạt động ví dụ với Safari ta cần viết: `-webkit-order: 0`

    Ví dụ với đoạn code ta sẽ có kết quả như sau:
    
    HTML:
    ```html
    <div id="main">
      <div style="background-color:coral;" id="myRedDIV"></div>
      <div style="background-color:lightblue;" id="myBlueDIV"></div>
      <div style="background-color:lightgreen;" id="myGreenDIV"></div>
      <div style="background-color:pink;" id="myPinkDIV"></div>
    </div>
    ```
    CSS:
    ```css
    div#myRedDIV   {order: 2;}
    div#myBlueDIV  {order: 4;}
    div#myGreenDIV {order: 3;}
    div#myPinkDIV  {order: 1;}
    ```
    ![image.png](https://images.viblo.asia/bbd7cffb-38a4-422d-bee4-3f348711ffb8.png)
    
*  **flex-basis**: number*|auto|initial|inherit; Xác định độ rộng ban đầu của các phần tử
    - auto: Độ rộng của nó sẽ bằng chính độ rộng của content chính nó
    - number: Đơn vị độ dài hoặc tỷ lệ phần trăm, chỉ định độ dài ban đầu của (các) phần tử
    ví dụ: 
    
    
    HTML:
    ```html
    <div id="main">
        <div style="background-color:coral;">50px</div>
        <div style="background-color:lightblue;">100px</div>
        <div style="background-color:khaki;">50px</div>
        <div style="background-color:pink;">50px</div>
        <div style="background-color:lightgrey;">50px</div>
    </div>
    ```
    CSS:
    ```css
    #main {
      width: 300px;
      height: 100px;
      border: 1px solid #c3c3c3;
      display: flex;
    }

    #main div {
      flex-basis: 50px;
    }

    #main div:nth-of-type(2) {
      flex-basis: 100px;
    }
    ```
    ![image.png](https://images.viblo.asia/8100d11c-ab37-4f64-b950-847d8379f3ef.png)
    
    Tuy nhiên trong một vài trường hợp độ rộng của các phần tử sẽ không bằng giá trị của thuộc tính `flex-basis`. Ví dụ
    
    HTML:
     ```html
    <div id="main">
        <div style="background-color:coral;">50px and more content....................</div>
        <div style="background-color:lightblue;">100px</div>
        <div style="background-color:khaki;">50px</div>
        <div style="background-color:pink;">50px</div>
        <div style="background-color:lightgrey;">50px</div>
    </div>
    ```
    CSS:
    ```css
    #main {
      width: 300px;
      height: 100px;
      border: 1px solid #c3c3c3;
      display: flex;
    }

    #main div {
      flex-basis: 50px;
    }

    #main div:nth-of-type(2) {
      flex-basis: 100px;
    }
    ```
    ![image.png](https://images.viblo.asia/8c3754dd-4f8f-4bc6-ae5a-f6f195dfbd51.png)
    
    Ở ví dụ trên ta thấy độ rộng của content thẻ div màu cam lớn hơn 50px nên chiều rộng thẻ div đó sẽ lớn hơn giá trị flex-basis đã được gán. Lúc đó độ rộng của các phần tử khác cũng bị thay đổi chứ không còn bằng đúng giá trị flex-basis đã được gán nữa. Nhưng độ rộng của flex-container vẫn giữ nguyên là 300px. Suy ra, khi tổng chiều rộng của các phần tử con lớn hơn chiều rộng của flex container thì khi đó, các phần tử con sẽ được phân chia lại độ rộng theo một tỉ lệ nào đó. Tỉ lệ đó như nào mình sẽ giải thích trong **flex-grow**  và **flex-shrink**
*  **flex-grow**: number|initial|inherit; 

    - number: Giá trị mặc định là 0. Sẽ chỉ định phần tử đó sẽ tăng bao nhiêu so với phần còn lại của các mục linh hoạt

    Ví dụ:
    
    HTML:
    ```html
    <div id="main">
      <div style="background-color:coral;">50px</div>
      <div style="background-color:lightblue;">100px</div>
      <div style="background-color:khaki;">50px</div>
      <div style="background-color:pink;">50px</div>
      <div style="background-color:lightgrey;">50px</div>
    </div>

    <div id="main2">
      <div style="background-color:coral;">50px</div>
      <div style="background-color:lightblue;">100px</div>
      <div style="background-color:khaki;">50px</div>
      <div style="background-color:pink;">50px</div>
      <div style="background-color:lightgrey;">50px</div>
    </div>
    ```
    CSS:
    ```css
    #main, #main2 {
      width: 300px;
      height: 100px;
      border: 1px solid #c3c3c3;
      display: flex;
    }

    #main div {
      flex-grow: 0;
      flex-basis: 50px;
    }
    #main2 div {
      flex-grow: 0;
      flex-basis: 50px;
    }

    #main2 div:nth-of-type(2) {
      flex-grow: 1;
    }
    ```
    
    ![image.png](https://images.viblo.asia/24598886-7f52-4d7f-b5fe-9fed997a1535.png)
    
    Ta thấy ở main2, block màu xanh đã chiếm hết khoảng trống còn thừa của cha nó. Điều gì đã làm điều này xảy ra? Câu trả lời là do block đó có `flex-grow: 1`. Các block khác có giá trị flex-grow là 0 nên block màu xanh sẽ chiếm `1 /(0 + 1 + 0 + 0 + 0) = 1 `tức là sẽ chiếm toàn bộ khoảng trống còn thừa của element cha.
*  **flex-shrink**: number|initial|inherit; ngược lại với flex-grow. Thuộc tính này này sẽ xác định các phần tử con sẽ bị cắt bớt đi như thế nào nếu độ rộng của element cha nhỏ hơn tổng độ rộng của element con. Giá trị mặc định của nó sẽ là 1. Công thức tính toán như sau
    ```js
    flexBasis * (1 + shrinkFactor / sumScaledShrinkFactors * remainingFreeSpace)
    ```
    ví dụ:
    
    HTML:
    ```html
    <div class="main">
      <div style="background-color:coral;"></div>
      <div style="background-color:lightblue;"> main1</div>
      <div style="background-color:khaki;"></div>
    </div>
    <div class="main">
      <div class="item1" style="background-color:coral;"></div>
      <div class="item2" style="background-color:lightblue;"> main2</div>
      <div class="item3" style="background-color:khaki;"></div>
    </div>
    ```
    CSS:
    ```css
    .main {
      width: 300px;
      height: 100px;
      border: 1px solid #c3c3c3;
      display: flex;
    }

    .main div {
      flex-basis: 200px;
      text-align: center
    }

    .main .item1 {
      flex-basis: 200px;
      flex-shrink: 2;
    }

    .main .item2 {
      flex-basis: 300px;
      flex-shrink: 1;
    }


    .main .item3 {
      flex-basis: 400px;
      flex-shrink: 2;
    }
    ```
    
   ![image.png](https://images.viblo.asia/fb74127b-a2ff-48fb-abce-00383dedd1e5.png)
    
    Ta bắt tay tính toán độ rộng của các phần tử con nào theo công thức ở trên nào:
    - Element của main: 200 * ( 1 + 1 / ( 1 * 200 + 1 * 200 + 1 * 200) * ( 300 - 200 - 200 - 200)) = 100
    
    ![image.png](https://images.viblo.asia/a39e66b4-f909-4bfb-9058-56ae4f93d125.png)
    - Element item3 của main2: 400 * ( 1 + 2 / (2*200+ 300 +400*2) * (300 - 200 - 300 - 400))  = 80
    
    ![image.png](https://images.viblo.asia/bf5d0973-119f-4376-bdc3-a324604758a8.png)
    
    Kết quả tính toán hoàn toàn chính xác so với kết quả hiển thị thực tế
*  **flex**: là cách viết ngắn gọn của các thuộc tính flex-grow, flex-shrink, flex-basis: flex: flex-grow flex-shrink flex-basis|auto|initial|inherit;
*  **align-self**: Chỉ định căn chỉnh theo chiều vuông góc với trục chính cho một phần tử (ghi đè thuộc tính align-items của flex container). Các giá trị tương tự như align-item: auto*|stretch|center|flex-start|flex-end|baseline|initial|inherit;

    Ví dụ:
    
    HTML:
    ```html
    <div id="main">
      <div style="background-color:coral;">RED</div>
      <div style="background-color:lightblue;" id="myBlueDiv">BLUE</div>  
      <div style="background-color:lightgreen;">Green div with more content.</div>
    </div>
    ```
    CSS:
    ```css
    #main {
      width: 220px;
      height: 300px;
      border: 1px solid black;
      display: flex;
      align-items: flex-start;
    }

    #main div {
      flex: 1;
    }

    #myBlueDiv {
      align-self: center;
    }
    ```
    ![image.png](https://images.viblo.asia/f0b10976-c5f7-4649-bbf0-86d3e5a1af69.png)
    
    
#     Kết
Bài viết đến đây cũng đã dài rồi. Hy vọng nhưng kiến thức mình chia sẽ có thể giúp bạn khi làm CSS. Nếu có góp ý gì xin hãy để lại ở phần bình luận bên dưới. Cảm ơn các bạn rất nhiều.