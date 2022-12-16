Đã trải qua một thời gian không ngắn code angular, vào một ngày tình cờ tôi bị chú ý bởi dòng code trên trình duyệt.

![](https://cdn-images-1.medium.com/max/800/1*mIQLobNDf0JSUgL7jfq9aQ.png)

Khi inspec DOM tôi thấy `ngcontent` được render trên element. Tôi biết trong angular có 2 component là `ng-content`, `ng-container` mà thẻ div kia không nằm trong 2 phần tử kia nhưng lại có attribute `ng-content`. Vậy không biết là nó được phân loại như thế nào.

Tôi quyết định tìn hiều về `ng-template` để giải quyết vấn đề bối rối này. Trong quá trình tìm hiểu tôi phát hiện ra có 4 loại element liên quan đến nhau là : `ng-template`, 'ng-container', 'ng-content', '*ngTemplateOutlet'. Nên bài biết này tôi xin chia sẻ những kiến thức mà tôi đã tìm hiểu về 4 loại thành phần này.

**1. <ng-template>**

Giống như tên gọi của nó `<ng-template>` là một đối tượng template trong Angular có thể sử dụng các directives (*ngIf, *ngFor, [ngSwitch] và custom directive ).

`ng-template` chỉ hoạt động khi được chỉ định với directive điều khiển hiển thị. Angular bao đọc html trong `ng-template` và khi được hiển thị trên DOM, nó sẽ thay thế ng-template bằng html bên trong và có vài dòng comment phía trên mô tả trạng thái của directive.

Đây là ví dụ sử dụng *ngIf với thẻ div

![](https://cdn-images-1.medium.com/max/800/1*5QM2oe5GQVf7HATJxrX8Cw.png)

Khi biên dịch code trên , angular sẽ thay thế thẻ div bằng một `ng-template` với @Input [ngIf]  , nội dung bên trong là html cần hiển thị. Trên DOM sẽ hiển thị comment phía trên mô tả trạng thái của directive.

![](https://cdn-images-1.medium.com/max/800/1*y2SVXFRl57rxi5wr-FzKvA.jpeg)

* Dùng ng-template với *ngIf:

ví dụ có code sau:

![](https://cdn-images-1.medium.com/max/800/1*FLw4KCyW4vU1NupwP1z1uQ.png)

Trong trường hợp biến home=true , output trên DOM như sau:

![](https://cdn-images-1.medium.com/max/800/1*Iki7GXryxU_o9gCuGte0YA.jpeg)

Không có gì được render cả. Tại sao không hề có nội dung gì khi sử dụng ng-template với directive *ngIf:
Chúng ta nhớ lại ví dụ với thẻ div, Angular sẽ thay thế thẻ ng-template bằng comment mô tả, đây là 2 kết quả cuối cùng của 2 ví dụ

![](https://cdn-images-1.medium.com/max/600/1*y2SVXFRl57rxi5wr-FzKvA.jpeg)![](https://cdn-images-1.medium.com/max/600/1*Iki7GXryxU_o9gCuGte0YA.jpeg)


Hãy nhìn thật kĩ ở kết quả thứ 2 có đoank <!---->, đây chính là nội dung html cần được hiện nhưng tại sao lại là đoạn comment.
Bây giờ ta hãy diễn giải code như ví dụ 1 thì ví dụ 2 được hiểu như sau:

![](https://cdn-images-1.medium.com/max/800/1*Nrmv3ivT8fB-h3qMS8gzkw.png)

Angular sẽ đưa thẻ hiện tại vào trong thẻ ng-template, cho nên sẽ có ng-template nằm bên trong 1 thẻ ng-template, mà thẻ ng-template bên trong không có đi kèm directive hiển thị nên không có hiển thị gì cả mà chỉ có đoạn comment trên trình duyệt.

* Để tránh sai sót cho trường hợp này có 2 cách để xử lý:

![](https://cdn-images-1.medium.com/max/800/1*WSp1Iep84HFY9iOM1TLPDw.png)

Cách 1:
Sử dụng ng-template với @Input Ngif chứ không phải directive Ngif, như vậy khi render trên trình duyệt sẽ hiển thị toàn bộ nội dung bên trong ng-template.
Cách 2:
Cách này thì ít khi được sử dụng, thẻ ng-template khi được hiển thị sẽ chuyển hướng hiển thị thẻ ng-template khác với điều kiện true
Cách này hơi rối rắm và không hiệu quả nên không nên sử dung.

**2. <ng-container>.**

Đã bao giờ bạn viết hoặc nhìn thấy dòng code như sau:

![](https://cdn-images-1.medium.com/max/800/1*xSzfSSecltMEvHbwKoTlhQ.png)

Lý do tại sao nhiều người viết đoạn code này không thể sử dụng nhiều directive trên một element trong angular. Đoạn code này hoạt động ok nhưng sẽ xuất ra mọt vài thẻ div empty in Dom nếu `item.id` is false mà thực sự không cần thiết.

![](https://cdn-images-1.medium.com/max/800/1*EZDOC5gDjhx0y-2pMGgP1A.jpeg)

Đối với một ví dụ đơn giản sẽ không gây ảnh hưởng gì cả nhưng đối với project lớn với hàng ngàn line html sẽ là một vấn đề lớn đến việc gán các sự kiện DOM.
Ngoài ra nó cũng gây phức tạp cho việc viết class cho CSS.

Đừng lo lắng, chúng ta có <ng-container> sẽ giải quyết vấn đề này.

ng-container là một group element mà không có chứa bất kì 1 style css nào.
Nên chúng ta viết lại ví dụ 1 với ng-container:

![](https://cdn-images-1.medium.com/max/800/1*j-TJRTA11OrLKdLrmrjQjA.png)

Chúng ta sẽ nhận được DOM như sau:

![](https://cdn-images-1.medium.com/max/800/1*7D-if7f35ct3vkY3AnozUQ.jpeg)

Oke. sẽ không còn các thẻ div dư thừa nữa.

**3. <ng-content>**

Dùng để tạo component có thể sử dụng linh hoạt, có nghĩa là có thể tùy biến thành phần bên trong theo ý của người dùng.  Ví dụ đây là một component <project-content> có chứa <ng-content> bên trong:

![](https://cdn-images-1.medium.com/max/800/1*gzHVRbeW6JYv3XUxX5tQRA.png)

Khi sử dụng <project-content> :

![](https://cdn-images-1.medium.com/max/800/1*HIp3l46s5LRIPS8Cs3ZPlg.png)

Khi render, nội dung của thẻ div sẽ được thay thế vào thẻ ng-content , như vậy người dùng có thể đưa footer vào trong project-content một cách linh hoạt.

* Multiple Projections:

Giả sử trong project-content cần thay thế nội dung ở nhiều chỗ, nên không thể thay thế toàn bộ nội dung vào thể ng-content được. Cho nên cần một sttribute selector để xác định nội dung nào được thay vào ng-content cụ thể nào.
Ví dụ nôi dung project-content như sau:

![](https://cdn-images-1.medium.com/max/800/1*G6Ruc21MJctpiYqkdD5DjQ.png)

trong project-content địng nghĩa multiple-content projection. Thuộc tính `select` địng nghĩ loại của element được render bên trong thẻ ng-content đó. Thẻ ng-content có `select` thứ nhất sẽ render `h1` element và thẻ có `select` thứ 2 sẽ render thẻ `div` và ng-content còn lại sẽ render phần html còn lại vì không có thuộc tính `select`.
Sử dụng project-content như sau:

![](https://cdn-images-1.medium.com/max/800/1*rZar8_BvO5g53BQVJS36aQ.png)

4. *ngTemplateOutlet

Directive này cho phép sử dụng ng-template ở nhiều chỗ trên 1 file view.

Ví dụ, logo của một công ty cần được đặt ở nhiều nơi trên một website. Chúng ra cần tạo ra một template biểu diễn logo của công ty để sử dụng ở nhiều nơi trên view.
Ví dụ như đoạn code sau:

![](https://cdn-images-1.medium.com/max/1000/1*M2mxgv1g3VcftdHOFFmTdw.png)

Bạn có thể thấy chúng ta tạo logo template một lần và sử dụng 3 lần trên cùng 1 page chỉ với 1 line gọi lại template đó.
*ngTemplateOutlet có thể tùy chỉnh tham số input vào component, bạn có thể xem thêm tại đây [docs](https://angular.io/api/common/NgTemplateOutlet).

*Sử dụng để *ngTemplateOutlet custom components.
Bây giờ ta sẽ customer project-content có thể truyền vào header, body, footer để sử dụng , nếu không truyền sẽ sử dụng mặc định đã được địng nghĩa sắn.
Chỉnh sửa project-content thành như sau:

![](https://cdn-images-1.medium.com/max/1000/1*AwPv-pFH7e-Abhr-odvPyQ.png)

Thêm 3 @Input header, body, footer vào component prooject-content:

![](https://cdn-images-1.medium.com/max/800/1*KHFWhtDmaysZMxGDTT_61Q.png)

Và sửa dụng project-content:

![](https://cdn-images-1.medium.com/max/1000/1*13rIyei1HqPdOsQ44l9tug.png)

Trên đây là bài tìm hiểu của mình về 4 thành phần liên quan đến template trong angular, mong nhận được nhận xét và đóng góp.