## Giới thiệu
Đặt tên là 1 trong những vấn đề đau đầu nhất trong khoa học, đặt tên class hay biến, hàm... trong lập trình web của chúng ta cũng vậy. Trước đây thì việc đặt class khá tự do và không có quy chuẩn nào chung, nhưng từ khi BEM ra đời, mọi thứ đã khác đi. Tuy nhiên với ai mới tiếp cận BEM thì chắc chắn sẽ có những băn khoăn, mình viết bài này để giới thiệu 1 số vấn đề mà mình hiểu, mọi người hãy góp ý nếu thấy gì chưa đúng để cùng tìm ra cách sử dụng BEM hợp lý nhất nhé.

## BEM là gì và cách dùng?
BEM gồm 3 phần. Block-Elements-Modifiers:

Blocks : là thành phần độc lập về mặt chức năng và logic của trang web, block có thể lồng trong nhau và được lặp lại

Elements: là các thành phần con trong block

Modifiers: bạn hãy hiểu là chúng ta có 1 số kiểu button trong 1 trang web, đa số là màu xanh, ta sẽ cho button mặc định màu xanh, với trường hợp button màu đỏ, ta sẽ thêm hậu tố để phân biệt

Các đặt tên theo BEM sẽ như thế này: **.block__element--modifier**

Cách chia block thì các bạn hãy để ý các page, chia page ra thành các phần riêng biệt có thể tái sử dụng ở nhiều nơi cả trong 1 page và nhiều page, nếu nó chỉ có trong 1 page thì có thể đặt tên theo page đó còn nếu nó dùng chung cho nhiều page thì hãy tìm 1 cái tên chung chung, ví dụ block text-box chỉ có trong page giới thiệu thì có thể đặt nó là "text-box-intro" sẽ dễ hình dung, còn nếu nhiều page có cái text-box tương tự thì hãy đặt là "text-box" mà thôi. 

1. Elements: Nhiều người mới tiếp cận sẽ thắc mắc, ta có 1 block, trong có element, trong element lại có thành phần con nữa, thì chả lẽ lại đặt là *block__element1__element2* ? Câu trả lời là không nên, sau khi chúng ta đã xác định được block trong trang web, **tất cả những phần tử con bên trong block đều nên đặt theo block chứ ko phải đặt từ ngoài vào trong**. Nên chúng ta sẽ đặt như này: block__element1, block__element2

![](https://images.viblo.asia/8b74ae86-4cdb-424b-a53c-bc4981c80450.png)

Ví dụ ta có block giới thiệu phim đang hot như này, giả sử đặt là film-hot đi :laughing:, phần khoanh vàng là 1 element: box-info, mọi người có thể đặt là film-hot__box-info. Trong box-info có các element như title phim mình khoanh đỏ, rating..., lúc này chúng ta sẽ đặt là film-hot__title. **Các element chỉ cần thể hiện mối quan hệ với block, không cần ràng buộc với thành phần cha bao nó**

2. Sử dụng Modifiers: 

![](https://images.viblo.asia/9d8a6f40-5853-4dd7-97dc-6d97e2ab170b.png) ![](https://images.viblo.asia/a2b55b69-8b37-47c0-9669-fb4c1b734f44.png)

Bây giờ chúng ta có 2 nút thế này, cùng background-color, cùng text-color, font, cùng border-radius. Và hầu hết các nút đều có height như nút to, vậy thì chúng ta sẽ đặt 1 block là "btn" với height "cao", font, color, border... mặc định. Khi cần sử dụng tới button nhỏ, chúng ta sẽ đặt là "btn btn--small" và css height khác đi đè lên. Tuy nhiên chúng ta cũng có thể đặt là "btn--small" thôi, lúc này các bạn phải css cho btn--small các thuộc tính base như của bth và btn mặc định các bạn sẽ không đặt height nữa, chỉ css những gì chung giữa các nút mà thôi, mình thì hay sử dụng cách 1 và đó cũng là cách được dùng phổ biến hơn, cách này các bạn cũng có thể css btn chỉ những gì chung nhất, không set height mặc định nữa dù đa phần các nút có height giống nhau. Các bạn nên nhớ là việc đặt class không có đúng hay sai, làm sao cho team làm việc thuận lợi nhất có thể là được. 

Tuy nhiên thì nó sẽ có vấn đề như này, các nút có height nhỏ chỉ xuất hiện trong trang giới thiệu, còn nút to chỉ xuất hiện trong trang detail, thì lúc này sẽ có 1 cách khác tường minh hơn là các bạn hãy đặt 1 class cha lên tận body hoặc main gì đó to nhất, page-intro và page-detail,  lúc này hãy css từ tận page này xuống btn thay vì thêm "--" vào sau btn, người xem sẽ hiểu là "à, cái nút này nó khác là do nằm trong page này". Nếu đó là mục đích khi design thì các bạn nên làm theo cách này, nó sẽ tường minh hơn. Còn nếu các nút thay đổi không phải theo page mà do mục đích ví dụ nút edit thì màu xanh da trời còn nút xóa thì màu đỏ thì các bạn cũng có thể đặt là "btn btn--edit" và "btn--delete" na ná như bootstrap: "btn-warning" đó. 

3. Xác định block

![](https://images.viblo.asia/123e2d00-4349-4b80-ac0d-b8f381888172.png)

Ví dụ phần phim lẻ mới cập nhật này, hẳn là sẽ có người chia từng phim khoanh vàng thành 1 block, nhưng lại thấy cái bao ngoài giống hệt phần phim bộ phía dưới, chẳng lẽ ta sẽ cho cả phần bao là 1 block và đặt là movie-list -> movie-list__item -> movie-list__title-item (để phân biệt với title của list phim), movie-list__thumbnail-item....? Theo mình thì không nên làm như vậy, BEM nên đặt theo block nhỏ nhất mà đủ bao quát những cái chung và dễ dàng tùy biến. Nếu ta chọn block quá bao quát, quá to, tên các element trong cùng sẽ rất lộn xộn như ví dụ trên. Hãy chia từng phim khoanh vàng là 1 block và cho vào 1 div cha là "movie-list", movie-list sẽ được dùng chung cho cả phần phim bộ phía dưới vì nó tương đồng. Kết quả sẽ như này: movie-list -> movie-item -> movie-item__title, movie-item__sub-title, movie-item__time...
Các bạn hãy nhớ rằng BEM là cách đặt tên theo block chứ không phải từ ngoài vào trong, hãy nhìn từ phần tử nhỏ nhất ngược trở ra thay vì cố gắng đặt class từ ngoài vào trong, mình thấy nhiều bạn cố gắng đặt như này: page -> page__wrap -> page__content -> page__content-title, page__content-main. Không nên làm thế, chúng ta không nhất thiết phải sử dụng BEM mọi lúc mọi nơi, chỉ nên sử dụng khi có block, thay vì đặt như trên chúng ta hãy đặt như này: page -> page-wrap -> page-content -> page-title... do page chẳng thể nào là 1 block, các thành phần con của nó không cần đặt theo BEM, tất nhiên đặt cũng chả sao nhưng nó sẽ gặp vấn đề nếu trong cái page__content-main lại có title và nhiều thứ khác, các bạn sẽ đặt theo BEM sao đây?

## Kết luận
BEM là 1 quy chuẩn đặt tên class chung tuy nhiên các bạn đừng cố áp đặt mọi thứ phải theo BEM, hãy nghĩ thoáng 1 chút nếu không các bạn sẽ mất rất nhiều thời gian đắn đo để đặt tên. Chỉ cần nhớ rằng hãy đặt tên theo block nhỏ nhất có thể, chứ đừng đặt tên từ ngoài vào trong. 1 block hợp lý là 1 block chỉ có block, các con block__element. BEM sẽ tốt khi chúng ta dùng với SCSS, còn nếu bạn chỉ css thường thì cũng nên học dần, nó giúp class tường minh hơn tuy nhìn class khá khó chịu và dù gì các bạn cũng phải dùng scss, sass... sau này thôi, không tránh được. Sẽ có 1 số quan niệm riêng khi mỗi người học về BEM như vấn đề số 2 "btn btn--small" và "btn--small", tuy nhiên không có đúng hay sai, quan trọng nhất là thống nhất team làm như thế nào để dễ phát triển và edit khi cần.
Trên đây là những ý kiến của mình về BEM, mọi người cứ thoải mái chém vì mình cũng chỉ là gà mờ thôi, rất mong các cao nhân vào chỉ giáo thêm :clap: