## 1. Cấu trúc dữ liệu đồ thị
Một đồ thị là một dạng biểu diễn hình ảnh của một tập các đối tượng, trong đó các cặp đối tượng được kết nối bởi các link.

Các đối tượng được nối liền nhau được biểu diễn bởi các điểm được gọi là các đỉnh (vertices), và các link mà kết nối các đỉnh với nhau được gọi là các cạnh (edges).
 
Nói chung, một đồ thị là một cặp các tập hợp (V, E), trong đó V là tập các đỉnh và E là tập các cạnh mà kết nối các cặp điểm. Bạn theo dõi đồ thị sau:

![](https://images.viblo.asia/40039023-8813-4a88-b5d7-b335c69b4b86.jpg)

Trong đồ thị trên:

V = {a, b, c, d, e}

E = {ab, ac, bd, cd, de}

## 2. 1 số khái niệm cơ bản
### 2.1 Đỉnh (Vertex)

![](https://images.viblo.asia/7f3d723a-d67a-4529-8b56-882ea7283cf2.jpg)

Mỗi nút của hình được biểu diễn như là một đỉnh. Trong trên các hình tròn biểu diễn các đỉnh. Do đó, các điểm từ A tới G là các đỉnh. 

Chúng ta có thể biểu diễn các đỉnh này bởi sử dụng một mảng, trong đó đỉnh A có thể được nhận diện bởi chỉ mục 0, điểm B là chỉ mục 1

### 2.2 Cạnh (Edge)

Cạnh biểu diễn một đường nối hai đỉnh. Trong hình dưới, các đường nối A và B, B và C, … là các cạnh. 

Chúng ta có thể sử dụng một mảng hai chiều để biểu diễn các cạnh này. 

Trong hình trên, AB có thể được biểu diễn như là 1 tại hàng 0; BC là 1 tại hàng 1, cột 2, …

### 2.3 Kề nhau

Hai đỉnh là kề nhau nếu chúng được kết nối với nhau thông qua một cạnh. Trong hình trên, B là kề với A; C là kề với B, …

### 2.4 Đường

Đường biểu diễn một dãy các cạnh giữa hai đỉnh. Trong hình trên, ABCD biểu diễn một đường từ A tới D.

## 3. Giải thuật tìm kiếm theo chiều sâu(Depth First Search)
Giải thuật tìm kiếm theo chiều sâu còn được gọi là giải thuật tìm kiếm ưu tiên chiều sâu, là giải thuật duyệt hoặc tìm kiếm trên một cây hoặc một đồ thị và sử dụng stack (ngăn xếp) để ghi nhớ đỉnh liền kề để bắt đầu việc tìm kiếm khi không gặp được đỉnh liền kề trong bất kỳ vòng lặp nào.

Giải thuật tiếp tục cho tới khi gặp được đỉnh cần tìm hoặc tới một nút không có con. Khi đó giải thuật quay lui về đỉnh vừa mới tìm kiếm ở bước trước.

![](https://images.viblo.asia/e8046133-c9cd-44b7-9307-0acb3e8de80a.jpg)

### 3.1 Quy tắc

* Duyệt tiếp tới đỉnh liền kề mà chưa được duyệt. Đánh dấu đỉnh mà đã được duyệt. Hiển thị đỉnh đó và đẩy vào trong một ngăn xếp (stack).
* Nếu không tìm thấy đỉnh liền kề, thì lấy một đỉnh từ trong ngăn xếp (thao tác pop up). (Giải thuật sẽ lấy tất cả các đỉnh từ trong ngăn xếp mà không có các đỉnh liền kề nào).
* Lặp lại các qui tắc 1 và qui tắc 2 cho tới khi ngăn xếp là trống.

### 3.2 Các bước thực hiện

Khởi tạo ngăn xếp (stack)

![](https://images.viblo.asia/e668348b-d79a-4900-8045-0833f135a657.jpg)

Đầu tiên ta đánh dấu đỉnh S là đã duyệt và đưa đỉnh này vào trong ngăn xếp. 
Tiếp theo chúng ta tìm kiếm bất kỳ đỉnh liền kề nào mà chưa được duyệt từ đỉnh S. 
Chúng ta có 3 đỉnh và chúng ta có thể lấy bất kỳ đỉnh nào trong số chúng. Ví dụ, chúng ta lấy đỉnh A theo thứ tự chữ cái.

![](https://images.viblo.asia/f7ed3858-e649-415c-9365-3cb4dd97a53f.jpg)

Tiếp theo ta đánh dấu đỉnh A là đã duyệt và đặt vào trong ngăn xếp. 
Tìm kiếm bất kỳ đỉnh liền kề nào với đỉnh A. 
Cả S và D đều là hai đỉnh liền kề A nhưng chúng ta chỉ quan tâm về đỉnh chưa được duyệt.

![](https://images.viblo.asia/0b6fa998-b474-4bab-8c42-cf79402ddc90.jpg)

Duyệt đỉnh D, chúng ta đánh dấu đỉnh này là đã duyệt và đưa vào trong ngăn xếp. 
Ở đây, chúng ta có B và C là hai đỉnh kề với D và cả hai đều là chưa được duyệt. 
Chúng ta sẽ chọn theo thứ tự chữ cái một lần nữa.

![](https://images.viblo.asia/5b739da7-bc4a-47f0-8a76-c81bfce63c70.jpg)

Chúng ta chọn đỉnh B, đánh dấu là đã duyệt và đưa vào trong ngăn xếp. 
Ở đây đỉnh B không có bất kỳ đỉnh liền kề nào mà chưa được duyệt. 
Vì thế chúng ta lấy B ra khỏi ngăn xếp.

![](https://images.viblo.asia/d498fa5d-bf0f-4644-a872-985d39ea0161.jpg)

Chúng ta kiểm tra phần tử trên cùng của ngăn xếp để trở về nút đã duyệt trước đó và kiểm tra xem đỉnh này có đỉnh nào liền kề mà chưa được duyệt hay không. 
Ở đây, chúng ta tìm thấy đỉnh D nằm ở trên cùng của ngăn xếp.

![](https://images.viblo.asia/c116dec5-e33c-4d86-8151-8e7c1763d1e3.jpg)

Ở đây chúng ta chỉ có một đỉnh liền kề với D mà chưa được duyệt, đó là đỉnh C. 
Chúng ta duyệt đỉnh C, đánh dấu là đã duyệt và đưa vào trong ngăn xếp.

![](https://images.viblo.asia/f4377f69-6860-4758-8131-6d409b5b292b.jpg)

Vì đỉnh C không có bất kỳ đỉnh nào liền kề mà chưa được duyệt, chúng ta tiếp tục lấy các đỉnh từ trong ngăn xếp để tìm xem có còn bất kỳ đỉnh nào liền kề mà chưa được duyệt hay không. 
Trong ví dụ này là không có, và chúng ta vẫn tiếp tục cho tới khi ngăn xếp là trống.

## 4. Giải thuật tìm kiếm theo chiều rộng((Breadth First Search)
Giải thuật tìm kiếm theo chiều rộng duyệt qua một đồ thị theo chiều rộng và sử dụng hàng đợi (queue) để ghi nhớ đỉnh liền kề để bắt đầu việc tìm kiếm khi không gặp được đỉnh liền kề trong bất kỳ vòng lặp nào.

![](https://images.viblo.asia/9d7549d2-d44b-4fe8-bea2-b882c23c3c92.jpg)

### 4.1 Quy tắc
* Duyệt tiếp tới đỉnh liền kề mà chưa được duyệt. Đánh dấu đỉnh mà đã được duyệt. Hiển thị đỉnh đó và đẩy vào trong một hàng đợi (queue).
* Nếu không tìm thấy đỉnh liền kề, thì xóa đỉnh đầu tiên trong hàng đợi.
* Lặp lại Qui tắc 1 và 2 cho tới khi hàng đợi là trống.

### 4.2 Các bước thực hiện

Đầu tiên chúng ta khởi tạo hàng đợi (queue) như hình dưới

![](https://images.viblo.asia/23ad115b-8516-4162-981e-043635be529a.jpg)

Chúng ta duyệt từ đỉnh S (đỉnh bắt đầu) và đánh dấu đỉnh này là đã duyệt.

![](https://images.viblo.asia/9684a8de-f67e-4efb-b585-61c40dee1a97.jpg)

Sau đó chúng ta tìm đỉnh liền kề với đỉnh S mà chưa được duyệt. 
Trong ví dụ này chúng ta có 3 đỉnh là A,B,C , và theo thứ tự chữ cái chúng ta chọn đỉnh A đánh dấu là đã duyệt và đưa đỉnh A vào hàng đợi.

![](https://images.viblo.asia/49a12c3d-ac66-4a76-8f51-15ef945a9c8f.jpg)

Chúng ta tiếp tục duyệt đỉnh liền kề với đỉnh S là đỉnh B. Đánh dấu là đã duyệt và đưa đỉnh B vào hàng đợi.

![](https://images.viblo.asia/2d46a939-7e3b-4be0-9b1a-2c3e1ce099c0.jpg)

Tiếp tục duyệt đỉnh C. Đánh dấu đỉnh C là đã duyệt và đưa đỉnh C vào hàng đợi.

![](https://images.viblo.asia/e1579841-c0e5-49b1-bc7e-3baf81d67224.jpg)

Bây giờ đỉnh S không còn đỉnh nào liền kề mà chưa được duyệt. Bây giờ chúng ta rút A từ hàng đợi.

![](https://images.viblo.asia/b9924a93-8de3-4bea-8f62-e6218a76f3af.jpg)

Từ đỉnh A chúng ta có đỉnh liền kề là D và là đỉnh chưa được duyệt. Đánh dấu đỉnh D là đã duyệt và đưa vào hàng đợi.

![](https://images.viblo.asia/bc3e7c62-a180-4c20-ab86-f4a048d23869.jpg)

Chúng ta vẫn tiếp tục rút các đỉnh từ hàng đợi theo thứ tự để tìm tất cả các đỉnh mà chưa được duyệt. Khi hàng đợi là trống thì đó là lúc kết thúc giải thuật.

## 5. Sự khác biệt giữa BFS và DFS
DFS giải quyết bài toàn theo cách đào sâu nhất có thể từ 1 đỉnh còn BFS thì duyệt tất cả các đỉnh liền kề với đỉnh đang duyệt, ở đây chính là độ rộng và độ sâu của thuật toán.