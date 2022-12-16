Để hiểu một cách cơ bản các chương trình hoạt động như thế nào tôi đã tóm tắt những gì xảy ra bên trong khi một chương trình được hoạt động. Bình thường thì tôi không đặc biệt chú ý đến nó nhưng có lẽ sẽ hữu ích nếu bạn biết được, hy vọng các bạn sẽ thích thú khi đọc nó.

## Ngôn ngữ máy

Trước hết, chúng ta cần phải biết rằng máy tính chỉ có thể hiểu được hai giá trị là 0 và 1. Và những gì được viết chỉ với các số 0 và 1 thì được gọi là ngôn ngữ máy. Tóm lại, bất kỳ chương trình nào được viết bằng bất cứ ngôn ngữ nào thì cuối cùng vẫn được thực thi bằng ngôn ngữ máy.

Việc diễn giải các dãy số 0 và 1 được thực hiện theo các quy tắc tùy thuộc vào loại CPU có trong máy tính. Chính xác thì nó phụ thuộc vào tập lệnh mà CPU sử dụng. Tập lệnh là một tập hợp các quy tắc dùng để diễn giải các dãy số 0 và 1, chẳng hạn như Intel x86, ARM và MIPS. Ví dụ, cho đến hiện tại thì tập lệnh được cài đặt trong CPU của máy Mac là Intel x86, nhưng với con chip M1 mới nhất thì tập lệnh được sử dụng là ARM.

Tóm lại, ngay cả với cùng một loại ngôn ngữ máy thì có thể hoạt động ở máy tính này, tuy nhiên nó có thể lại không hoạt động với máy tính khác.

## Hợp ngữ

Trong lịch sử từ xa xưa, các chương trình được viết bằng cách nhập trực tiếp các kí tự 0 và 1. Tuy nhiên, việc viết chương trình bằng cách này có rất nhiều khó khăn, vất vả nên hợp ngữ đã ra đời.

Hợp ngữ là loại ngôn ngữ dễ hiểu đối với con người, chẳng hạn như "add A,B", và về cơ bản nó có sự tương ứng hoàn hảo 1-1 đối với ngôn ngữ máy. Ví dụ, việc "add A,B" sẽ là "10001100101000000". Ngoài ra, các phần mềm cũng được tạo ra để tự động chuyển đổi hợp ngữ sang ngôn ngữ máy. Phần mềm này gọi là trình  hợp ngữ, và việc chuyển đổi hợp ngữ thành ngôn ngữ máy được gọi là assembly.

Điều quan trọng ở đây là có sự tương ứng 1-1 giữa ngôn ngữ máy và hợp ngữ. Sự tương ứng 1-1 có nghĩa là nếu các  tập lệnh của ngôn ngữ máy khác nhau thì các tập lệnh của hợp ngữ cũng sẽ khác nhau tương ứng. Tóm lại, giống như việc sẽ có hợp ngữ Intel x86, hợp ngữ ARM vậy.

Không có hợp ngữ nào chạy được trên mọi máy tính. Ngoài ra, sự tương ứng 1-1 có nghĩa là các lập trình viên vẫn cần phải suy nghĩ chặt chẽ như trước đây về phía máy tính. Do dó, hiện nay có rất ít chương trình được xây dựng từ đầu bằng hợp ngữ. 

## Ngôn ngữ lập trình cấp cao

Ngôn ngữ lập trình cấp cao được tạo ra để giải quyết các vấn đề phía trên của hợp ngữ. Nói nôm na thì nó được gọi là ngôn ngữ lập trình, được biểu diễn gần giống với tiếng Anh, và cùng một chương trình giống nhau có thể chạy được trên hầu hết máy tính. Lí do tại sao có thể làm được điều đó là vì có các trình thông dịch  và biên dịch mạnh mẽ, sau đây tôi sẽ giới thiệu sơ qua về chúng.

### Trình biên dịch

Trước hết, tôi sẽ giới thiệu về trình biên dịch. Đây là một phần mềm chuyển đổi ngôn ngữ lập trình cấp cao sang hợp ngữ, thường được dùng trong C, C++, Go, Rust, Swift,... Tùy thuộc vào trình biên dịch các hợp ngữ đích sẽ có các tập lệnh được chuyển đổi tương ứng. Có nghĩa là để các ngôn ngữ lập trình cấp cao có thể chạy trên tất cả các ,máy tính, tác giả trình biên dịch sẽ tạo ra những trình biên dịch tương ứng với từng tập lệnh, chẳng hạn như trình biên dịch cho Intel x86, trình biên dịch cho ARM. Điều đó làm cho hầu hết ngôn ngữ lâp trình cấp cao có thể hoạt động trên bất cứ máy tính nào. Tuy nhiên, trình biên dịch có thể sẽ không hỗ trợ các tập lệnh mới được tạo.

Và đương nhiên, một khi đã được biên dịch sang hợp ngữ thì nó không thể chạy trên máy tính có tập lệnh khác. Ngoài ra, tùy thuộc vào ngôn ngữ, có những lệnh có thể được chuyển đổi đột ngột sang ngôn ngữ máy hoặc thậm chí được thực thi.

### Trình thông dịch

Tiếp theo sẽ là trình thông dịch. Thường được sử dụng nhiều trong Python, Ruby, PHP,.. có khác một chút so với trình biên dịch. Trình viên dịch chuyển đổi chương trình đã nhận sang ngôn ngữ máy, nhưng trình thông dịch chuẩn bị trước một ngôn ngữ máy có mục đích chung và thực thi ngôn ngữ máy tương ứng với chương trình đã nhận. Nói cách khác, thay vì thực sự tạo ra ngôn ngữ máy, nó bắt chước cách viết và thực thi của ngôn ngữ máy. Tiên đây thì bản thân ngôn ngữ máy này chính là sự tổng hợp của những gì được viết bằng ngôn ngữ C,...

Ngoài ra, cũng giống như trình biên dịchcũng có các trình thông dịch cho mỗi tập lẹnh, chẳng han như trình thông dịch cho Intel x86, trình thông dịch cho ARM....

### Ưu nhược điểm của Trình biên dịch và Trình thông dịch

Ưu điểm của trình thông dịch là bạn có thể thực thi nó ngay lập tức vì bạn không cần biên dịch, còn nhược điểm là hiệu suất tối đa thấp. Ngược lại, ưu điểm của trình biên dịch là hiệu suất tối đa cao, và nhược điểm của nó là mất nhiều thời gian thực thi khi tính cả thời gian biên dịch. Điều đó có nghĩa là sự khác biệt giữa trình thông dịch và trình biên dịch là có thực hiện việc tạo ra ngôn ngữ máy hay không?

Nói cách khác, trình biên dịch mất thời gian lúc đầu để tạo ra ngôn ngữ máy, còn trình thông dịch sử dụng ngôn ngữ máy hiện có, vì vậy nó có thể được thực thi nhanh chóng. Ngoài ra, vì trình thông dịch cần tìm kiếm ngôn ngữ máy tương ứng với mã nguồn ban đầu và sau đó thực thi nó, vậy nên hiệu suất tối đa (tức là tốc độ tối đa có thể xuất ra) sẽ chậm hơn trình biên dịch tạo ra ngôn ngữ máy do không cần phải tìm kiếm mã nguồn tương ứng.

### Trình biên dịch JIT

Ngoài ra còn có trình biên dịch JIT, tận dụng những ưu điểm của cả trình biên dịch và trình thông dịch. Nó chủ yếu được sử dụng trong JavaScript,vvv và về cơ bản nó sử dụng trình thông dịch, khi cùng một chương trình xuất hiện nhiều lần trong một câu lệnh lặp,... chỉ phần đó được biên dịch sang ngôn ngữ máy.

Nói cách khác, trình biên dịch JIT biến phần có thể được sử dụng nhiều lần thành một ngôn ngữ máy, giúp thời gian thực thi nhanh hơn và phần chỉ được thực thi một lần sẽ được trình thông dịch thực thi nhanh chóng. Điều này sẽ dẫn đến thời gian thực thi nhanh hơn so với một trình thông dịch bình thường.

JIT là viết tắt của Just In Time, có nghĩa là "Đúng sản phẩm - với đúng số lượng - tại đúng nơi - vào đúng thời điểm cần thiết" - là phương pháp sản xuất được Toyota hoàn thiện vào năm 1970.

Đọc bài viết gốc tại [đây](https://qiita.com/_s_/items/8ac270314f6827564328)