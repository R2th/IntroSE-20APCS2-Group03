Chào các bạn thì đúng như tiêu đề của bài viết thì hôm nay mình sẽ hướng dẫn các bạn tạo một trò chơi lật tìm những lá bài giống nhau một cách đơn giản nhất.
Các bạn có thể xem video demo trò chơi để xem trò chơi của ta sau cùng sẽ như thế nào nhé.
{@embed: https://www.youtube.com/watch?v=BfSf4hQ6mz0}
Và không để các bạn đợi lâu chúng ta cùng bắt đầu nào.
# Phần tính điểm của người chơi
Thì để người chơi có thể xem được mình đã chơi hoặc tìm được bao nhiêu thẻ bài giống nhau rồi thì ta sẽ tạo ra một cái view nhỏ dùng để hiển thị tên và số điểm đạt được để mọi người nắm rỏ số điểm hiện tại hơn.

Bắt đầu thì để tạo cái view như vậy mình sẽ sử dụng hai thằng Container Layout chính đó là:
 + HStack thằng này sẽ xắp xếp các phần tử trong nó theo hàng ngang
 + Vstack thằng này sẽ xắp xếp các phần tử trong nó theo hàng dọc
Và hai thằng này đều có ba thuộc tính trong nó :
+ alignment: cách căn chỉnh các bố cục trong nó ( leading, trailing, center,… ) 
+ spacing: khoảng cách giữa các phần tử trong nó 

![](https://images.viblo.asia/2be965cc-e2f7-4642-9c7b-b794c5e6c659.png)

Đầu tiên ta sẽ tạo một thẻ Image để hiển thị hình ảnh ở trong mục Assets lên và để thay đổi kích thước hình ảnh ta sẽ sử dụng thuộc tính resizable() và nếu các bạn để ý thì có thể thấy một thuộc tính đó là:
Modifier thì thằng này sinh ra với mục đích nếu như khi ta tạo view và có nhiều thuộc tính ta sử dụng đi sử dụng lại nhiều lần và ta không muốn phải lập lại đoạn code đó nữa khá tốn thời gian thì ta sẽ tạo ra một thuộc tính.
ViewModifier thằng này nhìn khá là giống với việc ta dùng thằng Extension để tái sử dụng code cho các UIView nhỉ.
![](https://images.viblo.asia/9646537f-4567-4682-a93e-53e2d936535b.png)
 Và các bạn trong lúc tạo View này mình dùng thằng padding() rất nhiều lần thì thằng này sẽ giúp ta tạo ra khoảng cách giữa nó với các phần tử khác. Nếu ta dùng nó một cách hợp lý và đúng thứ tự thì ta có thể tạo ra dạng giống margin và padding trong web :relaxed:.
 
Thì xong những bước trên thì ta đã có được một cái view như này nhìn cũng không đến nối nào chứ nhỉ :kissing_heart::kissing_heart:.

![](https://images.viblo.asia/c62fa02b-d66a-44b9-bd17-5998d7fae793.png)

# Tạo model và những hàm cần thiết trong trò chơi
Thì ở đây mình chỉ tạo một model thôi đó chính là Pokemon dùng để hiển thị ra các Container Layout và để được thì ta phải kế thừa hai thằng là Identifiable, Hashable không có hai thằng này thì sẽ lỗi đó :smile:

![](https://images.viblo.asia/a1e3dc31-acce-45af-bd47-1ed82eb362db.png)

Hàm đầu tiên sẽ tạo một Array chứa những thẻ bài pokemon thôi và sau đó gọi hàm shuffled() để xáo trộn các phần tử trong array đó. Đơn giản phải không nào.

Và hàm tiếp theo sẽ thay đổi trạng thái hiển thị của lá bài nếu trạng thái isVisible của model Pokemon là false thì ta sẽ ẩn lá bài đó đi.

Và hàm cuối cùng là hàm checkWin giúp ta kiểm tra xem người dùng đã chiến thắng hay chưa mà để kiểm tra nhanh các phần tử trong một Array thì ta có hàm allSatisfy và ta chỉ cần kiểm tra thuộc tính isVisible của từng phần tử là được.

![](https://images.viblo.asia/d56edf28-1881-4201-bf97-530f224a2be9.png)

# Tạo view để hiển thị các lá bài pokemon

Ở đây để tạo các view hiển thị dạng giống như Collection trong UIKit thì ta mình sẽ sử dụng LazyVGrid để xắp xếp các ứng dụng theo dạng lưới dọc 
Và ở trong này ta chỉ cần tạo một colums để cho Grid biết ta muốn xắp xếp của nó như thế nào. Sau đó ta sẽ tạo một vòng lặp để hiển thị ra các phần tử trong Array của ta ra.
![](https://images.viblo.asia/42ad467c-1ce2-4b06-840f-db5597d380eb.png)

![](https://images.viblo.asia/e3184398-c586-4f93-9a2c-1b93a68e0862.png)

Sau một lúc thì ta đã có một cái view cơ bản như thế này rồi nhưng mà view như này thì chỉ để xem thôi ta ko thể lật bài được.

![](https://images.viblo.asia/9c0f66ef-af89-4ddf-8334-bf19fe2136e1.png)

# Thêm event cho trò chơi

Ở trong View hiển thị thẻ bài thì ta sử dụng Zstack thì thằng này sẽ xắp xếp phần tử nằm đè lên nhau. Ta sẽ sử dụng thằng này để tạo mặt sau của những lá bài.
Sau khi tạo xong thì ta sẽ được như này nè.

![](https://images.viblo.asia/db6ea6ad-919c-4ac1-a3c2-d5fb910b0e5b.png)

![](https://images.viblo.asia/483416ac-b562-4541-98f0-e64d69620af2.png)

Tạo Event cho View thì ta sẽ sử dụng onTapGesture để nhận biết được event mỗi khi người dùng bấm vào một thẻ bài nào đó. Và sau khi người dùng bấm vào ta sẽ gán thẻ bài đó vào một trong hai biến là thẻ bài đầu tiên và thẻ bài thứ hai.

Và khi đó thì nó sẽ thực hiện việc rotation3Deffect giúp ta có thể xoay thẻ bài đó. Và sau khi tìm được hai lá giống nhau rồi thì ta sẽ ẩn hai lá đó đi và disable nó.

![](https://images.viblo.asia/ed7b1bdc-0839-4e80-bdbf-51418874c9b6.png)

Và khi người dùng đã chọn hết các lá bài thì ta sẽ tạo một thông báo giúp cho người dùng biết là mình đã chiến thắng rồi :v.

![](https://images.viblo.asia/9e6aba33-1ebb-48c7-a0a4-06d8b65f0b97.png)

Nếu bạn đã đọc đến đây thì chúc mừng bạn đã làm xong trò chơi này rồi đó :heart_eyes:

Đây là mã nguồn tham khảo của trò chơi: https://github.com/thanduchuy/SwiftUI-PokemonCard