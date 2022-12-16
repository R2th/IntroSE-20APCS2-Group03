Kiểm thử tích cực
Cái nhìn tổng quát về kiểm thử tích cực:

Kiểm thử phần mềm là quá trình verifying và validating và xác nhận rằng nó đang hoạt động như mong đợi. Người kiểm thử phần mềm nên có ý định tìm lỗi và đảm bảo rằng ứng dụng hoạt động như mong đợi bằng cách sử sụng các loại kĩ thuật kiểm thử khác nhau.

Kiểm thử được phân loại như sau:

#1) Kiểm thử tích cực

#2) Kiểm thử tiêu cực

Cả hai loại thử nghiệm này đều cần thiết để xác nhận rằng phần mềm đang hoạt động như mong đợi.

Kiểm thử tích cực là gì?

Kiểm thử tích cực là loại kiểm thử xác minh rằng ứng dụng đang được kiểm thử với bộ đầu vào có giá trị tích cực.

Nói cách khác, kiểm thử tích cực là một loại kiểm thử được thực hiện với giá trị biên và việc kiểm thử này kiểm tra xem sản phẩm/ ứng dụng có hoạt động đúng heo tài liệu đặc tả với một bộ dữ liệu kiểm thử hợp lệ hay không.

Ví dụ 1: 1 ứng dụng web có 1 from fill in như sau:



Xem xét một trang đăng nhập, Người dùng nên nhập tên người dùng, mật khẩu và nhấn Gửi. Khi người dùng nhập tên người dùng và mật khẩu chính xác và nhấn nút Gửi, người dùng sẽ được điều hướng đến trang tiếp theo.

Các kịch bản kiểm thử tích cực:

Nhập Tên người dùng và Mật khẩu chính xác (Ví dụ: Username, and Password), nhấp vào nút gửi và xác minh rằng người dùng được điều hướng đến trang tiếp theo như mong đợi.



Ví dụ 2: 1 textbox chỉ nhập số

Nhập số và kiểm tra xem đầu vào có được ứng dụng chấp nhận không.



Khi nào thì thực hiện kiểm thử tích cực?

Kiểm thử tích cực được thực hiện khi ứng dụng đã sẵn sàng để kiểm thử. Một người kiểm thử có thể thực hiện tất cả các kịch bản khác được lên kế hoạch cho chức năng đó như kiểm thử tiêu cực, kiểm thử cơ sở dữ liệu, v.v chỉ sau khi kiểm thử tích cực được thông qua.

Thực hiện kiểm thử tích cực bất cứ khi nào bản dựng sẵn sàng được gọi là smoke testing, kiểm thử xác minh bản dựng, kiểm thử độ chính xác và cổng chất lượng, v.v., dù tên là gì, nhưng thực hiện kiểm thử tích cực là bước đầu tiên của thực hiện kiểm thử.

Thực hiện kiểm thử tích cực bằng cách nào?

Các kĩ thuật sử dụng để kiểm thử tích cực là:

Kiểm thử giá trị biên
Phân vùng tương đương
Những kỹ thuật này sẽ được áp dụng bất cứ khi nào người kiểm thử cần kiểm tra các trường số. Trong khi thực hiện kiểm thử tích cực này, người kiểm thử nên xem xét dữ liệu đầu vào, hành động được thực hiện và kết quả đầu ra.

Trong kiểm thử tích cực, mỗi lần người kiểm thử nên xác minh xem đầu vào kiểm thử có nằm trong ranh giới của dữ liệu kiểm thử không

#1) Kiểm thử giá trị biên:

Phân tích giá trị biên là một trong những kỹ thuật kiểm thử được sử dụng để kiểm thử các trường số. Để sử dụng kỹ thuật này, người kiểm thử cần tạo dữ liệu kiểm thử nằm trong ranh giới hoặc phạm vi dữ liệu.

Ví dụ: Một trường / hệ thống sẽ chấp nhận các số từ 1 đến 100. Phần còn lại của các số không hợp lệ.

Sử dụng kỹ thuật này, các giá trị biên là 0, 1, 2 và 99.100 (Giá trị trong phạm vi từ 1 đến 100).



#2) Phân vùng tương đương:

Phân vùng tương đương là một kỹ thuật kiểm thử khác, trong đó người kiểm thử sẽ chia đầu vào kiểm thử thành các phân vùng bằng nhau và sử dụng các giá trị từ mỗi phân vùng làm dữ liệu kiểm thử.

Người kiểm thử cần đảm bảo nếu dữ liệu kiểm thử có chứa các giá trị từ tất cả các phân vùng.

Ví dụ: Một trường / hệ thống sẽ chấp nhận các số từ 1 đến 100. Phần còn lại tất cả các số không hợp lệ.

Trong kỹ thuật kiểm tra phân vùng tương đương, dữ liệu đầu vào được chia thành 4 phân vùng như được đề cập dưới đây,

Vùng 1: 1 đến 25

Vùng 2: 26 đến 50

Vùng 3: 51 đến 75

Vùng 4: 76 đến 100

Trong khi sử dụng kỹ thuật phân vùng tương đương với kiểm thử tích cực, tất cả dữ liệu kiểm thử được chọn trong phạm vi từ 1 đến 100



Ưu điểm và tác dụng của kiểm thử tích cực

Kiểm thử tích cực là bước đầu tiên của kiểm thử để dễ dàng kiểm thử đến các cấp độ tiếp theo.

Kiểm thử này được sử dụng để Kiểm thử đường dẫn tích cực của một ứng dụng. Nếu Kkểm thử này thất bại, điều đó có nghĩa là chức năng cơ bản của ứng dụng không hoạt động và cần thực hiện ngay hành động tương ứng để tiếp tục kiểm thử thêm.

Kiểm thử tích cực sẽ có phạm vi bao phủ ít hơn và nó xác nhận rằng ứng dụng đang hoạt động cho phạm vi đầu vào được chỉ định như mong đợi và nó không đảm bảo chất lượng của ứng dụng vì người kiểm thử không thể xác minh hành vi của ứng dụng trong các tình huống bất ngờ như 'khi người dùng vào dữ liệu sai'.

Ví dụ:

1 ứng dụng web có 1 from fill in như sau:

Xem xét một trang đăng nhập, người dùng nên nhập tên người dùng, mật khẩu và nhấn Gửi. Khi người dùng nhập tên người dùng và mật khẩu chính xác và nhấn nút Gửi, người dùng sẽ được điều hướng đến trang tiếp theo.



Các kịch bản kiểm thử có thể có cho các chức năng trên là:

Kịch bản kiểm thử 1: Nhập tên người dùng và mật khẩu chính xác và nhấp vào nút gửi. Kết quả mong đợi : Người dùng nên được điều hướng đến trang tiếp theo.

Kịch bản kiểm thử 1: Nhập sai tên người dùng và mật khẩu và nhấp vào nút gửi. Kết quả mong đợi : Người dùng sẽ nhận được thông báo lỗi thích hợp là ‘Tên người dùng và mật khẩu không phù hợp với nhau.

Kịch bản kiểm thử 1: Không nhập bất cứ thứ gì và nhấp vào nút gửi. Kết quả mong đợi : Người dùng sẽ nhận được thông báo lỗi thích hợp là ‘Nhập tên người dùng hợp lệ.

Kịch bản kiểm thử 1: Nhập tên người dùng là 123 và nhấp vào gửi. Kết quả mong đợi: Người dùng sẽ nhận được thông báo lỗi vì Tên người dùng không thể là số.

Và còn nhiều kịch bản kiêm thử khác

Trong số tất cả các kịch bản kiểm thử này, kịch bản số 1 tình huống được thử nghiệm tích cực và phần còn lại là kịch bản kiểm thử tiêu cực.

Kết luận:

Kiểm thử phần mềm giúp cung cấp phần mềm không có lỗi. KIểm thử tích cực là loại kiểm thử xác nhận rằng ứng dụng đang hoạt động như mong đợi với tất cả các đầu vào có thể.

Tất cả các loại kiểm thử khác là cần thiết để đảm bảo rằng ứng dụng không có lỗi và ổn định.

Hy vọng bạn đã hiểu rõ hơn về kiểm thử tích cực !!

Nguồn tham khảo: https://www.softwaretestinghelp.com/positive-testing/