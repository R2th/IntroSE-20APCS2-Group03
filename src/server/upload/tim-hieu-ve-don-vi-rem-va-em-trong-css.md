> Hôm nay chúng ta sẽ tìm hiểu về hai đơn vị **REM và EM**, đây là hai đơn vị thường gây nhầm lẫn cho các bạn trong quá trình học CSS. Mình xin chỉ ra một số điểm khác biệt chính của hai đơn vị REM và EM trong bài viết này ^^.

> Relative Units trong CSS hay các đơn vị tương đối thường được sử dụng để tạo các trang web responsive, lý do là chúng có tỷ lệ phụ thuộc vào các parent element hay window size (tùy thuộc vào đơn vị chúng ta sử dụng).
Khi sử dụng các đơn vị tương đối để style cho trang web, chúng ta có thể tránh phải set lại các style như width, font-size, padding, margin... cho các kích thước màn hình khác nhau 🌝.
Trong CSS chúng ta có các Relative Units như: %, VH, VW, REM, EM,...

## 1. Các loại đơn vị

Trong CSS có hai loại đơn vị là Absolute Units (đơn vị tuyệt đối) và Relative Units (đơn vị tương đối)
<br>

**Đơn vị tuyệt đối** : Là các đơn vị vật lý được định nghĩa sẵn. Các đơn vị này không phụ thuộc cũng những ko bị thay đổi bởi các tác động bên ngoài. Ví dụ như: met, centimet ... 

Các đơn vị tuyệt đối sử dụng trong CSS gồm có:
<br>
*  px: Đây là một đơn vị được sử dụng trên màn hình hiển thị, một px sẽ tương đương với một điểm ảnh trên màn hình hiển thị. Chất lượng của điểm ảnh sẽ hoàn toàn khác nhau trên một số thiết bị, ví dụ như một điểm ảnh trên các thiết bị in ấn sẽ khác với một điểm ảnh trên các thiết bị màn hình độ phân giải thấp. <br>
* pt: Đơn vị point và cứ 1 ich = 72pt. <br>
<br>

**Đơn vị tương đối** : Là các đơn vị đo lường được sử dụng trong CSS ở mức tương đối, nghĩa là nó có thể sẽ được thay đổi bởi các thành phần khác ví dụ như thay đổi phụ thuộc vào kích thước màn hình. <br>

Đơn vị tương đối được sử dụng trong CSS gồm có: <br>
* % (percentages): Là đơn vị tham chiếu tỷ lệ so với một phần tử mẹ của nó dựa vào kích thước. <br>
* **em**: Là đơn vị tham chiếu tỷ lệ so với phần tử mẹ của nó dựa vào giá trị của thuộc tính **font-size** . Ví dụ bạn đặt cho font-size cho phần tử mẹ của nó là 19px thì nếu bạn sử dụng em trong khu vực phần tử đó thì 1em = 19px.  <br>
* **rem**: Là đơn vị tham chiếu tỷ lệ so với phần tử gốc của một website dựa vào thuộc tính **font-size**, nghĩa là sẽ biến đổi tùy theo giá trị của thuộc tính font-size trong thẻ <html>. Cũng như rem, nếu bạn khai báo font-size cho thẻ <html> là `16px thì 1rem = 16px`. 
    <br>
            ![](https://images.viblo.asia/ff7ef10d-55de-499f-b21a-60e5e02bbdaf.PNG)    
    <div align="center">Sơ đồ minh họa sự khác nhau giữa đơn vị em và rem</div>
    
## 2. REM trong CSS
REM trong CSS được viết gọn lại của root em. Nó có nghĩa là **"The root element's font-size"**, hiểu đơn giản REM trong CSS sẽ được tính toán dựa trên kích thước font-size của html(root).

Nếu chúng ta không set cho HTML root một giá trị font-size, giá trị mặc định của font-size khi đó sẽ là 16px. Do đó, khi phần tử sử dụng đơn vị REM, phần tử này sẽ tìm để phần tử root xem giá trị font-size là bao nhiêu để tính toán và set giá trị. <br>
    
 Ví dụ: 
    ![](https://images.viblo.asia/51dfdf0f-5cb0-4662-aff7-f005c932665d.PNG)

Demo trên mình sử dụng một container có class **cha** chứa phần tử có class **con**. Ta sẽ sử dụng REM làm đơn vị cho font-size của **con**.
    
 Lúc này ta sẽ thấy phần tử **con** với   **font-size: 1rem**  sẽ có font-size bằng với font-size của phần tử root là **20px**. Lý do là chúng ta đã thêm cho **root** một **font-size** mới khác với giá trị ban đầu là 16px. Khi đó, một phần tử bất kỳ sử dụng rem sẽ được `1rem = 20px`, tương tự ta có `2rem = 2*20 = 40px.`

Khi phần tử root các bạn không set font-size cho nó, lúc này `root = 16px và 1rem = 16px`.

Giả sử  ta muốn padding cho phần tử con, với giá trị sau khi sử dụng REM tương đương với 30px thì sẽ tính toán thế nào? Chúng ta sẽ lấy 30/16 để đổi sang đơn vị REM đúng không 😃.

Ta sẽ được như sau:
    ![](https://images.viblo.asia/48296fb3-d14a-4e5a-84b0-5bdd1468978a.PNG)

 Với `30px ta sẽ đổi sang rem là 1.875rem` với 1rem = 16px nha.
   

## 3. EM trong CSS
 
Khác với REM ở chỗ nó sẽ sử dụng **font-size** của cha để tính toán giá trị cho nó, nếu như parent gần nó nhất không sử dụng **font-size**, nó sẽ tìm tới parent tiếp theo, cứ như vậy đến khi tìm thấy parent có sử dụng **font-size**, nó sẽ được tính toán giá trị dựa trên phần tử parent này.
    
 Mình sẽ sử dụng phần tử **cha** và **con** ở ví dụ trên để xem EM sẽ trả về giá trị **font-size** tương ứng thế nào nhé, cùng set cho cha một font-size:
    
  ![](https://images.viblo.asia/a5974dc2-6a62-464d-bc5c-845881303329.PNG)

  Với font-size của cha là **20px**, khi phần tử **con** sử dụng `font-size: 0.5em` , kích thước font sẽ là 10px, vì `20px x 0,5em = 10px`.

Giả sử chúng ta không set** font-size** cho cha ở trên thì sao? Lúc này **con** sẽ tìm phần tử chứa nó có font-size lúc này là root, vì giá trị mặc định của root lúc này là 16px. Và con sẽ mang giá trị font-size là 8px vì `16px x 0,5em = 8px`.
    
>   Chúng ta có thể sử dụng EM cho padding, height, width và các thuộc tính khác và nó vẫn sẽ được tính toán dựa trên giá trị **font-size** của parent.
    
   Cùng set thử cho **con** giá trị padding sử dụng EM:
    ![](https://images.viblo.asia/ce6c1c53-b9cc-4548-9bbb-ddce33e68066.PNG)

    
 Chúng ta dễ dàng tính toán được **con** có **font-size** là **10px** đúng không ^^, vậy height sẽ là `5 x 20px = 100px ?` Câu trả lời là không chính xác 🥶. Tại sao lại không đúng, lý do là vì trong **con** chúng ta đã sử dụng font-size cho phần tử, lúc này các thuộc tính trong phần tử **con** sẽ tính toán dựa trên **font-size** của **con** (Nếu có).

Như vậy height sẽ có giá trị `5 x 10px = 50px` và padding là `0.5 x 10 = 5px`.

Trong một số trường hợp, nếu chúng ta sử dụng EM trong các phần tử thuộc nhiều parent, các thuộc tính EM có thể sẽ khó sử dụng, <br> <br>
    ví dụ như:
    ![](https://images.viblo.asia/e384a0f3-092a-4378-800d-9a2d7f964d3b.PNG)

Khi set **font-size** cho phần tử last-element sử dụng **EM**, chúng ta sẽ phải xem phần tử parent có font-size là bao nhiêu, nếu parent sử dụng **EM** ta sẽ phải tìm trên nó xem font-size có giá trị và đơn vị là gì 🥴. Chính vì lí do này mình hay sử dụng đơn vị REM hơn.
<br>
<br>

***~~Lời kết: ~~*** <br>
* Chúng ta nên sử dụng các relative units như EM hay REM khi trang web của chúng ta yêu cầu responsive.
* Đơn vị EM thường được tham chiếu đến font-size parent hoặc chính nó (nếu có).
* Đơn vị REM tham chiếu đến font-size phần tử Root. <br>
    
Mình hay sử dụng đơn vị REM hơn EM, vì sử dụng REM cho padding, margin, height, font-size,... chúng ta có các giá trị dựa trên font-size phần tử root và chúng ta có thể dễ dàng set font-size cho root nếu muốn .


Tham khảo:
*  [css-units-tim-hieu-ve-rem-va-em-trong-css](https://www.homiedev.com/css-units-tim-hieu-ve-rem-va-em-trong-css/)


<br>