# Giới thiệu
* Việc sử dụng mạng tương tác ngày càng tăng, chúng ta cần một sự bảo đảm an toàn khỏi các rủi ro truy cập, sử dụng, phá hoại, thay đổi, ghi lại hoặc phá hủy một cách trái phép. Có hai phương pháp mã hóa và giấu tin được sử dụng để đảm bảo an toàn thông tin. Mã hóa là nghệ thuật viết tin một cách bí mật nhằm mục đích làm cho tin nhắn không thể bị đọc được bởi một bên thứ ba nhưng không che giấu sự tồn tại của phương thức giao tiếp. Giấu tin có nghĩa là ẩn thông tin trong một phương tiện mang tin tưởng chừng như vô hại. Ví dụ như: tin nhắn, âm thanh, hình ảnh, video, VoIP, …. Bất kỳ ai xem phương tiện này sẽ không thấy dữ liệu bị ẩn hoặc mã hóa. Việc ẩn tin trong hình ảnh có thể được phân loại thành Phương pháp miền không gian hoặc Phương pháp miền tần số. 
* Phương pháp miền không gian đơn giản và nổi tiếng là “Phương pháp tối thiểu” (LSB). Trong LSB, thông điệp được nhúng vào LSB của từng pixel hình ảnh. Hai mục tiêu chính của kỹ thuật giấu tin vào hình ảnh là khả năng che giấu cao và độ khó nhận biết cao. Bằng cách sử dụng hai hoặc nhiều LSB của ảnh gốc (Feng J.B., Lin, I.C., Tsai, C.S., Chu, Y.P 2006 và Katzenbeisser, S., Petitcolas 2000) cho khả năng ẩn cao với chất lượng hình ảnh chấp nhận được. Tối đa ba sơ đồ LSB có thể được sử dụng để tạo ra hình ảnh đơn giản có thể chấp nhận được (Nan-I Wu1 và Min-Shiang Hwang 2007). Hiệu quả đạt được là che giấu nhiều dữ liệu hơn vào ảnh gốc và độ mạnh mẽ đã được phân tích và tóm tắt bởi Liao et al (Liao, Z., Huang, Y., Li, C. 2007 và Wu, N.I., Hwang, M.S 2007). Để cải thiện chất lượng hình ảnh, Chan và Cheng năm 2004 đã đề xuất một phương pháp LSB đơn giản bằng việc Điều chỉnh pixel tối ưu (OPA). Kết quả thử nghiệm của phương pháp của họ cho thấy hình ảnh stego không thể phân biệt được với hình ảnh gốc. Để cải thiện tính không thể nhận dạng của hình ảnh stego trong phương pháp LSB, Lee và Chen 2000 đã đề xuất một LSB có kích thước thay đổi với phương pháp thay thế lỗi tối thiểu. Gần đây, Soleimanpour 2013 đã giới thiệu một phương pháp lập thể mới lạ dựa trên thuật toán di truyền giúp cải thiện chất lượng hình ảnh của hình ảnh stego. Để đạt được mức độ không chấp nhận cao, Wu và Tsai 2003 đã đề xuất phương pháp Chênh lệch giá trị pixel (PVD), trong đó thông điệp bí mật được nhúng vào chênh lệch giá trị xám của hai pixel liên tiếp của ảnh gốc.
* Để giảm méo hình ảnh stego trong phương pháp PVD, các giá trị mới được điều chỉnh lại trong phạm vi hợp lệ. Do điều chỉnh, các vấn đề tràn ranh giới xảy ra trong PVD. Nếu hai pixel nằm ở các cạnh viền hoặc vùng mịn của ảnh, vấn đề này có thể làm tình hình tồi tệ hơn. Để khắc phục vấn đề này, C.M.Wang, Nan-I Wu 2007 đã sử dụng chức năng PVD và mô đun của nó. Trong phương pháp của họ, với một cách tiếp cận tối ưu, thông điệp có thể được nhúng vào hai pixel bằng cách sửa đổi phần còn lại của chúng. Để chống lại tấn công phân tích biểu đồ PVD, phần mở rộng mới của PVD (EPVD) đã được đề xuất bởi ZaZamin Zaker và Ali Hamzeh, Seraj 2009. Để đạt được điều này, biểu đồ Gaussian đã được lập. Để tăng khả năng ẩn, họ đã điều chỉnh các quy tắc chồng lấp phạm vi trong đó các giá trị khác nhau sẽ được chuyển sang phạm vi lân cận bên trái.
Nhược điểm lớn nhất của phương pháp PVD là khả năng ẩn tin không cao. Để tăng khả năng ẩn của hình ảnh stego, Ko-Chin Changa và Chien-Ping Changa 2008 đã đề xuất phương pháp phân biệt giá trị pixel Tri Way Pixel Value Differencing (TPVD) thay vì chỉ đề cập đến một hướng như PVD thông thường, ba hướng khác nhau được đề cập xem xét. Để giảm méo hình ảnh stego, cách tiếp cận tối ưu là chọn điểm tham chiếu và quy tắc thích ứng được trình bày bởi R.Sridevi và G. John Babu 2012 đã đề xuất TPVD với mô đun để tạo ra khả năng ẩn nhiều hơn TPVD.
Các phương pháp PVD hiện nay tuy có khả năng ẩn tin thấp, một số tấn công thống kê đã được giới thiệu và chắc chắn phá được PVD. Weiqi Luo và Fangjun Huang 2009 đã đề xuất một phương pháp giấu tin an toàn hơn dựa trên sơ đồ thích ứng nội dung, trong đó các vùng cạnh sắc nét hơn được ưu tiên sử dụng đầu tiên để ẩn dữ liệu. Khả năng che giấu của TPVD được tăng lên đáng kể bằng phương pháp được đề xuất bởi Xin Liao và Qiao-yan Wena 2011. Họ đã đề xuất một phương pháp dựa trên TPVD và thay thế LSB. Kết quả là hình ảnh stego tạo ra chất lượng hình ảnh chấp nhận được và cũng cung cấp khả năng ẩn nhiều thông tin hơn.
* Trong tất cả các phương pháp PVD đã đề cập ở trên, chỉ có hai biến phạm vi lượng tử hóa được sử dụng để tăng dung lượng của ảnh gốc và đồng thời cho ra chất lượng hình ảnh tốt hơn. Hsien Wen, Tseng và Hui-Shih 2013 đã đề xuất một phương pháp mới trong đó một bảng định lượng mới được thực hiện dựa trên số mũ hoàn hảo để quyết định payload. J.K.Mandal và Debashis Das 2012 đã đề xuất một phương pháp giấu tin vào ảnh màu. Bằng cách sử dụng ba thành phần màu, khả năng ẩn trong các thành phần pixel khác nhau thường được tăng lên. Để tăng tính bảo mật, số bit khác nhau trong các thành phần khác nhau được sử dụng. Trong phương pháp giấu tin vào ảnh màu của J.K.Mandal và Debashis Das 2012, phương pháp PVD được áp dụng cho từng thành phần màu riêng biệt để nhúng dữ liệu bí mật. Vì vậy, phương pháp này tương tự như phương pháp PVD thông thường. Bằng cách sử dụng phương pháp PVD thông thường, hiện tượng biến mầu đáng kể đo cách điều chỉnh các pixel liên tiếp có trong ba thành phần màu đã xảy ra. Để giảm sự biến dạng này, một phương pháp mới được đề xuất trong bài viết này. Trong phương pháp được đề xuất này, các pixel màu khác nhau giữa các cặp (r,g), (g,b) và (b,r) được dùng để ẩn dữ liệu bí mật. Trong quá trình ẩn, phương pháp PVD được áp dụng cho từng khác biệt màu nội bộ. Không cần có khóa bí mật để chọn ra các thành phần màu. Những khác biệt màu nội bộ được thực hiện một cách tuần tự. Tính không thể nhận biết được cải thiện bằng cách sử dụng phương pháp PVD. Tính an toàn của phương pháp đề xuất đã được kiểm tra bằng việc phân tích Biểu đồ và phân tích RS. PSNR cũng được tính toán để đánh giá và thẩm định chất lượng hình ảnh stego.
# Phương án đề xuất
Trong phương pháp đề xuất này, hình ảnh màu được coi là ảnh gốc. Sự khác biệt màu sắc giữa các pixel liên tiếp của hình ảnh gốc được sử dụng để ẩn dữ liệu bí mật. Bằng cách sử dụng cả ba thành phần màu, dung lượng bản tin có thể mã hóa của phương pháp được đề xuất này cao hơn phương pháp PVD.
## Thuật toán mã hóa.
1. Trích xuất ba thành phần mầu từ mầu của ảnh gốc để lấy ba giá trị ma trận M*N. Chọn hai pixel có độ hoàn thiện cao từ tổ hợp mầu (Ri,Ri+1), (G i,G i+1), (B i,B i+1).
2. Tính toán sự khác nhau của các giá trị d0, d1, d2
3. Xác định vị trí thích hợp của di ( i=0, 1, 2) trong bảng. Ký hiệu là Rj,i
4. Tính số lượng bit bí mật ti bằng công thức ![](https://images.viblo.asia/502d8407-6c5c-4931-9953-f6e520a91051.png) trong đó wi,j là chiều dài bảng.
5. Lấy giá trị ti từ dữ liệu bí mật và chuyển nó thành giá trị thập phân tương ứng bi
6. Tính giá trị khác nhau mới bằng công thức ![](https://images.viblo.asia/873e77e5-99c4-48d2-be82-57fc37a494af.png). Trong đó lj,i là mức thấp hơn trong phạm vi di được chọn. 
7. Chỉnh sửa giá trị (Ri,Ri+1), (G i,G i+1), (B i,B i+1) ![](https://images.viblo.asia/5d05430c-6841-40d1-8f21-404463bf373c.png). Trong đó mi = di  - di’
8. Lặp lại bước 1 đến 7 cho đến khi tất cả các bit bí mật được nhúng vào tin.
9. Để tránh việc nhúng tin ra ngoài biên ảnh, ta chia làm hai trường hợp sau: 
    * Trường hợp 1:  Nếu ![](https://images.viblo.asia/174959c1-b507-4bd0-aff6-0778b5de0ec5.png) và ![](https://images.viblo.asia/c0bd6f45-f4c1-440d-8b0b-26706cb45ee4.png),  ta chỉnh lại P0, P1, P2 như sau: ![](https://images.viblo.asia/da0c420a-4810-44cf-84ed-ac10e13fe875.png)
    * Trường hợp 2: Nếu ![](https://images.viblo.asia/a1a39821-814f-4db5-a5c1-ba36571af7ba.png) và ![](https://images.viblo.asia/65cf57ab-73c7-490e-8671-1c6a0f00dde4.png) ta chỉnh lại P0, P1, P2 như sau: ![](https://images.viblo.asia/a1a5db00-70bf-490b-a6a0-07d514d45297.png)
 
## Thuật toán trích xuất.
1. Trích xuất ba giá trị mầu R, G, B từ ảnh stego.
2. Tính toán sự khác biệt màu nội bộ giữa các thành phần màu như trong quá trình ẩn tin.
![](https://images.viblo.asia/5bb5c8ab-72e3-4f2c-a2c5-d4ef083ee7ae.png)
3. Xác định các khoảng phù hợp cho d0’, d1’, d2’ trong khoảng bảng mà dùng trong việc ẩn tin.
4. Tính lượng bit mã hóa ti bằng ![](https://images.viblo.asia/9f026892-2dbb-44a3-bad7-06f2f0f4d8a0.png)
5. Lấy mức thấp hơn lj,i  trừ di để lấy giá trị bi .
6. Cuối cùng bi’ được chuyển đổi thành giá trị thập phân tương ứng với bit dữ liệu bi.
    Việc trích xuất dữ liệu bí mật từ ví dụ minh họa ở trên được giải thích như sau:
    ![](https://images.viblo.asia/33645052-1270-47fc-b445-bccb0ecac6e8.png)
    Trừ các giá trị trên với các giới hạn dưới 32, 8, 64, chúng ta thu được các giá trị thập phân là 5,1,19. Giá trị nhị phân tương ứng 0101,001,010011 với độ dài 4, 3 và 6. Suy ra, luồng bit bí mật là 0101000110011 như chúng ta đã sử dụng trong quá trình ẩn.
    ![](https://images.viblo.asia/c180cfca-7fc2-4191-b364-567069aa6ba9.png)
    
 7. Kết quả thí nghiệm và thảo luận
   Để chứng minh hiệu suất của phương pháp được đề xuất, các thí nghiệm khác nhau bởi các phương pháp hiện có đã được thực hiện cho chín hình ảnh thử nghiệm. Kết quả thử nghiệm cho thấy phương pháp được đề xuất có thể thực hiện tốt hơn phương pháp PVD (Wu, DC, Tsai, WH 2003), phương pháp Chung-Ming Wang 2007 và phương pháp TPVD 2008. Bảng phạm vi R có sáu phạm vi phụ như R1 [0-7], R2 [8-15], R3 [16-31], R4 [32-63], R5 [64- 127], R6 [128-255]. Độ rộng của các phạm vi này lần lượt là 8, 8,16,32,64,128. Để đánh giá chất lượng hình ảnh stego, tỷ lệ Tín hiệu / Nhiễu (PSNR) đã được tính cho hình ảnh stego
   ![](https://images.viblo.asia/bbe75579-e7e0-4b79-9f31-716275fdef84.png)
   Trong đó ![](https://images.viblo.asia/4a87039f-cbdf-4f57-9394-609982c787c4.png)  là pixel của ảnh gốc và ![](https://images.viblo.asia/5fcfbb91-83a2-49bd-8606-ace897c54fb9.png) là pixel của ảnh stego.
   Đối với hình ảnh màu, MSE được tính riêng cho từng thành phần màu. Giá trị trung bình của ba giá trị này cho ra  MSE của hình ảnh màu: 
   MSE (ảnh màu) = (mseR + mseG + mseB) / 3
   Đối với giá trị PSNR lớn hơn, độ không nhận dạng của hình ảnh stego là tốt. Để dễ so sánh, hình ảnh stego màu được chuyển thành hình ảnh tỷ lệ xám. Các kết quả trong a, d của hình 5 là các hình ảnh rõ ràng của phương pháp được đề xuất và trong b, e và c, f là các hình ảnh theo phương pháp Wu & Tsai và phương pháp Chung Ming Wange. PSNR thu được từ phương pháp được đề xuất này rõ ràng tốt hơn hai phương pháp còn lại.
   
   * Hình : Kích thước của hình ảnh 256X256. (a), (d) - hình ảnh stego của phương pháp được đề xuất.  (b), (e) và (c), (f) là hình ảnh theo phương pháp Wu & Tsai và phương pháp Chung Ming Wange.
   ![](https://images.viblo.asia/d8e5f528-2ec2-46dd-a6e3-c18c4ec1727f.png) 
   
   * Hình: So sánh giữa Phương pháp Hiện tại & Phương pháp được Đề xuất.
   ![](https://images.viblo.asia/6451bad3-62b7-4ea7-a582-b45e57f80c14.png) 
   
   Biểu đồ so sánh trong hình 6 cung cấp các giá trị PSNR giữa các phương pháp được đề xuất và các phương pháp hiện có và hình ảnh được chụp để phân tích. Nó chứng minh tính chất của phương pháp được đề xuất là tốt hơn. Trong bảng 1, các giá trị PSNR của phương thức được đề xuất và hai phương thức khác được đưa ra. Nó được tăng thêm 3 đến 14dB, vì độ méo ở các cạnh bị giảm khi điều chỉnh thích ứng. Trong hình 7, hình ảnh gốc màu và hình ảnh stego được đưa ra. Không có sự khác biệt có thể nhìn thấy giữa chúng. Vì vậy, tính không thể nhận biết của phương pháp được đề xuất là tốt. Cuối cùng, phương pháp đề xuất cũng được so sánh với TPVD. Các giá trị PSNR trong bảng 2 cho thấy sự cải thiện của phương pháp được đề xuất. Năng lực và thời gian tính toán của hai phương pháp cũng được đưa ra. Phương pháp đề xuất có khả năng lẩn trốn cao với sự gia tăng nhỏ trong thời gian.
   
   * Bảng: So sánh giá trị PSNR giữa các phương pháp được đề xuất và hiện có.
   ![](https://images.viblo.asia/fc9b46d7-c69b-402e-b1c4-ea4f341a1c26.png) 
   
   * Hình: (a) & (b) Ảnh gốc và stego của khỉ đầu chó (c) & (d) Ảnh gốc và stego của Elaine
   ![](https://images.viblo.asia/cef4d001-1f7e-4d38-a6a5-c1e670eab8b9.png)
   
   * Hình: (a) Biểu đồ của phương pháp được đề xuất (b) Biểu đồ của phương pháp TPVD.
   ![](https://images.viblo.asia/0281ba57-ba90-42a6-8afe-67bce32e230e.png)
   
   * Bảng: So sánh giữa phương pháp đề xuất và TPVD.
   ![](https://images.viblo.asia/aa515cb5-770f-454e-8b77-6da75232c2d9.png)
   
   Vì mục đích phân tích, biểu đồ giữa ảnh bìa gốc và ảnh stego của ảnh Lena được chụp. Hình 8, (a) hiển thị biểu đồ của phương thức được đề xuất và (b) biểu đồ của phương pháp TPVD.
   
   * Hình: (a) Hỉnh ảnh stego của Lena, (b) Đầu ra của tấn công Chi-square của phương  pháp được đề xuất . (c) Hỉnh ảnh stego của Lena, (d) Đầu ra của tấn công Chi-square của phương pháp TPVD
   ![](https://images.viblo.asia/5bdfd4a1-b824-4743-9a11-f3e853563c7c.png)
   
# Kết luận
Bằng cách sử dụng hoàn hảo ba thành phần màu, khả năng ẩn của phương thức được đề xuất được tăng lên so với phương pháp TPVD. Điều chỉnh thích ứng các pixel sau khi ẩn làm giảm đáng kể độ méo hình ảnh. Kết quả thử nghiệm cho thấy sự không thể nhận ra của hình ảnh stego trong khi so sánh với hình ảnh gốc. Ngoài ra khả năng phát hiện của phương pháp đề xuất này là rất ít cho dung lượng lớn. Vì vậy, hai sự cân bằng của steganography được thực hiện bằng phương pháp đề xuất này. Trong công việc trong tương lai, bảng phạm vi biến số có thể được sử dụng để tăng cường độ mạnh mẽ của nó để chống lại việc bị phân tích. Bên cạnh đó việc lựa chọn ngẫu nhiên các thành phần màu bằng khóa bí mật cũng có thể được thực hiện trong tương lai để có được sự chắc chắn. Ngoài ra, việc trích xuất dữ liệu nhúng có thể hoạt động tốt mà không cần có kiến thức về ảnh gốc trong phương pháp đề xuất này. Trong tương lai, phương pháp được đề xuất này có thể được áp dụng trong chụp ảnh bản đồ hướng đối tượng để tăng tính vững chắc của nó.

# Tài liệu tham khảo
* Chan, C.K., L.M. Cheng, 2004. ‘Hiding data in images by simple LSB substitution,’ Pattern Recognition, 37(3): 469-474.
* Chung-Ming Wang a, Nan-I Wu a, Chwei-Shyong Tsai b, Min-Shiang Hwang, 2007. ‘A high quality steganographic method with pixel-value differencing and modulus function’ The Journal of Systems and Software xxx.
* Feng, J.B., I.C. Lin, C.S. Tsai, Y.P. Chu, 2006. ‘Reversible watermarking: current status and key issues’, International Journal of Network Security 2: 161-170.
* Hsien-Wen Tseng and Hui-Shih, 2013. ‘A steganographic method based on pixel-value differencing and the perfect square number’ Journal of Applied Mathematics, Article ID 189706, 8 pages.
* Katzenbeisser, S., F.A.P. Petitcolas, 2000. ‘Information Hiding Techniques for Steganography and Digital Watermarking.’ Artech House Inc., Boston.
* Ko-Chin Changa, Chien-Ping Changa, Ping S. Huangb and Te-Ming Tu, 2008. ‘A Novel Image Steganographic Method Using Tri-way Pixel-Value Differencing’ journal of multimedia, 3(2).
* Lee, Y.K., L.H. Chen, 2000. ‘High capacity image steganographic model,’ IEE Proceedings on Vision, Image and Signal Processing, 147(3): 288-294.
* Liao, Z., Y. Huang, C. Li, 2007. ‘Research on data hiding capacity’, International Journal of Network Security 5 September, 140-144.
* Mandal, J.K. and Debashis Das, 2012. ’Colour Image Steganography Based on Pixel Value Differencing in Spatial Domain’ International Journal of Information Sciences and Techniques (IJIST), 2(4).
* Nan-I Wu1 and Min-Shiang Hwang, 2007. ‘Data Hiding: Current Status and Key Issues’ International Journal of Network Security, 4(1): 1-9.
* Nazanin Zaker, Ali Hamzeh, Seraj Dean Katebi, Shadrokh Samavi, 2009.’Improving Security of Pixel Value Differencing Steganographic Method’ IEEE-.

*Nguồn: Tạp chí khoa học cơ bản và ứng dụng Úc, 8 (3) Tháng ba năm 2014, Trang: 161-167*