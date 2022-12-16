Dạo gần đây có động đến một dự án mới tình cờ biết đến khái niệm chữ ký điện tử.
Cũng hơi tò mò nên quyết định tìm hiểu thử mới thấy các thông tin về công nghệ này cũng còn khá ít.
Viết lên đây để bạn nào có kiến thức rộng hơn về mảng này thì cùng share với nhau. :)

## Khái niệm chữ ký điện tử
Chữ ký điện tử là gì?
Cũng giống như các văn bản thông thường cần chữ ký để chứng minh tính xác thực. Khi cuộc sống càng phát triển, các hoạt động của con người dần được công nghệ hóa thì khái niệm chữ ký điện tử cũng ra đời với tác dụng giống như chữ ký thật.

Chữ ký điện tử thực chất là một đoạn dữ liệu đã được mã hóa, tồn tại duy nhất, để chứng thực tác giả của tài liệu là ai và giúp người nhận kiểm tra tính toàn vẹn của tài liệu gốc.
Có nhiều loại chữ ký điện tử, đó có thể là một chuỗi, một mã khóa, hoặc một dữ liệu sinh trắc học (vân tay, móng mắt,...)

## Công nghệ tạo ra chữ ký điện tử
Chữ ký điện tử là một khái niệm rộng, chưa kể nó còn có nhiều loại.
Mỗi loại chữ ký điện tử lại có cách tạo khác nhau. Loại chữ ký điện tử phổ biến hiện nay nhất có thể nói là chữ ký số.
Nhiều người thường nhầm lần chữ ký số và chữ ký điện tử là một. Nhưng thực ra hai khái niệm này hoàn toàn khác nhau. Chữ ký số là một loại của chữ ký điện tử, có độ an toàn cao, vừa xác minh được người gửi,vừa đảm bảo nội dung không bị thay đổi sau khi gửi đi.

Trong khi đó một chữ ký điện tử có thể là hình ảnh số hóa của chữ ký viết tay, một biểu tượng, voice,... Chữ ký điện tử nói chung dễ bị giả mạo hơn chữ ký số. Do đó, thông thường chữ ký điện tử không bị ràng buộc pháp lý và phải có phần mềm riêng để nhận diện.

Do công nghệ tạo chữ ký điện tử khá phức tạp nên mình sẽ đi vào công nghệ tạo chữ ký số.
Công nghệ tạo ra chữ ký số được gọi là KPI (mã khóa công khai). Chữ ký số được tạo ra bằng cách áp dụng thuật toán băm một chiều trên tài liệu cần ký điện tử để tạo ra văn bản phân tích, sau đó sử dụng private key của chủ văn bản để mã hóa tạo ra chữ ký số đính kèm với tài liệu gốc để gửi đi. Khi nhận, tài liệu được tách ra làm 2 phần, phần tài liệu gốc được tính toán lại bằng thuật toán fingerprint để so sánh với fingerprint cũ được phục hồi từ việc sử dụng public key để giải mã.
Có thể hình dung các bước tạo ra chữ ký điện tử khi gửi như sau:
1. Thay đổi origin content gửi đi bằng cách dùng giải băm, lúc này sẽ nhận được một chuỗi ký tự mới gọi là message digest.
2. Dùng private key của người gửi để mã hóa chuỗi kí tự message digest thu được ở bước 1. Sử dụng giải thuật RSA thu được  chữ ký số của message ban đầu.
3. Gộp chữ ký điện tử vào message ban đầu sau đó ký nhận vào message. Sau khi đã ký nhận mọi sự thay đổi trên message sẽ bị phát hiện trong giai đoạn kiểm tra, ngoài ra, quá trình này sẽ đảm bảo rằng người nhận sẽ hoàn toàn tin tưởng rằng thông tin nhận được xuất phát từ chính người gửi mà họ mong muốn chứ không phải bị giả mạo, thay đổi.

Các bước kiểm tra nội dung có bị thay đổi hay không như sau:

1. Sử dụng public key của người gửi sau đó giải mã chữ ký số của message.
2. Sử dụng giải thuật để băm message đính kèm.
3. Kết quả thu được sẽ so sánh với message, nếu trùng hợp hoàn toàn thì sẽ kết luận message này không bị thay đổi, không bị đánh cắp dữ liệu và thông điệp được nhận từ chính người gửi.

Khi sử dụng  chữ ký số bạn sẽ nhắc đến một khái niệm nữa gọi là "chứng thư số". 
Vậy chứng thư số là gì? Điểm quan trọng của công nghệ KPI tạo ra chữ ký số đó là cặp khóa private key và public key trên do những nhà cung cấp dịch vụ đăng ký chữ ký điện tử cấp sau khi đã kiểm tra, xác minh chủ của nó (cá nhân, tổ chức) là có thực. Sau khi đã xác thực tính xác thực của chủ sử dụng, nhà cung cấp dịch vụ sẽ giao cho tổ chức hoặc cá nhân đó một chứng thư số – gần giống với chứng minh nhân dân hay giấy xác nhận sự tồn tại của cơ quan, tổ chức đó trên mạng. Chứng thư này có chứa public key của cá nhân/tổ chức đó và được lưu trên cơ sở dữ liệu của nhà cung cấp chữ ký số, do vậy người nhận có thể truy cập vào cơ sở dữ liệu đó để xác minh xem đúng là có người đó hay không.

Bạn cần phải lưu ý rằng nếu bạn đăng ký sử dụng chữ ký số thì bạn phải chịu trách nhiệm pháp lý. Vì khi bạn dùng chữ ký số thì nội dung bạn gửi đi được đảm bảo không bị thay đổi và bạn cũng không thể thoái thác được trách nhiệm của mình.

## Ứng dụng của chữ ký điện tử
Chữ ký điện tử thường được sử dụng  trong các hoạt động thương mại điện tử. Ví dụ trong các trong các trường hợp sau:
1. Một e-mail có thể được ký bằng chữ ký điện tử và đảm bảo người nhận có thể chắc chắn rằng email đó đúng là của người gửi, chứ không phải e-mail giả mạo. 
2. Các giao dịch thanh toán trực tuyến của ngân hàng. 
3. Ký xác nhận khi mua hàng online

Không chỉ nằm trong lĩnh vực thương mại điện tử, chứng thư số hiện còn được sử dụng như một dạng của chứng minh thư nhân dân. Tại các nước phát triển, chứng thư số (CA ) được tích hợp vào các con chíp nhớ nằm trong thẻ tín dụng để tăng khả năng bảo mật, chống giả mạo, cho phép chủ thẻ xác minh danh tính của mình trên các hệ thống khác nhau như xe bus, thẻ rút tiền ATM, hộ chiếu điện tử tại các cửa khẩu, kiểm soát hải quan …