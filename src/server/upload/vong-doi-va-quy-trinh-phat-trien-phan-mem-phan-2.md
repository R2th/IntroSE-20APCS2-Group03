### III. Quy trình kiểm thử phần mềm
Kiểm thử thực tế là một chuỗi các hoạt động được thực thi một cách khoa học nhằm đánh giá chất lượng của sản phẩm phần mềm. Các hoạt động (giai đoạn) này cấu thành nên vòng đời kiểm thử (hay còn gọi là software testing life cycle-STLC). Các giai đoạn trong vòng đời kiểm thử phần mềm bao gồm:<br/> 
Lập kế hoạch kiểm thử → Phân tích và thiết kế → Thực thi kiểm thử → Đánh giá và báo cáo → Kết thúc kiểm thử <br/> 
**1. Lập kế hoạch kiểm thử**<br/> 
Quyết định cũng như ước lượng chi phí cho dự án cũng như chuẩn bị và thống nhất kế hoạch kiểm thử.
- Chuẩn bị tài liệu, kế hoạch cho các loại kiểm thử khác nhau.
- Chọn công cụ kiểm thử.
- Ước lượng khối lượng công việc.
- Lên kế hoạch về nhân sự và vai trò, nhiệm vụ tương ứng.
- Lên kế hoạch đào tạo (nếu có)<br/> 

**2. Phân tích và thiết kế**<br/> 
- Đánh giá xem yêu cầu nào có thể test được, yêu cầu nào không; làm việc với các bên liên quan như khách hàng, phân tích hệ thống trưởng nhóm, kỹ sư hệ thống,... để làm rõ các yêu cầu về chức năng và non-function.
- Xác định loại kiểm thử sẽ thực thi.
- Xác định độ ưu tiên của các hoạt động kiểm thử.
- Xác định môi trường test và các thiết bị cần thiết trong quá trình thực thi kiểm thử.
- Xem xét tính khả thi của kiểm thử tự động.
- Tạo test case và kịch bản test
- Tạo dữ liệu kiểm thử<br/>
 
**3. Thực thi kiểm thử** <br/> 
Tiến hành kiểm thử dựa trên kế hoạch kiểm thử và bộ testcase đã chuẩn bị trước đó. Lỗi sẽ được báo cho đội phát triển để sửa lỗi và kiểm tra lỗi đã được sửa hay chưa.
- Chạy testcase.
- Ghi nhận kết quả và log bug cho những trường hợp bị fail.
- Ghi nhận bug với testcase trong bộ testcase.
- Kiểm tra lỗi đã được fix hay chưa
    +  Đóng lỗi (nếu đã được fix xong)
    +  Re-open (nếu lỗi chưa được fix) <br/> 
    
**4. Đánh giá và báo cáo**<br/> 
Thảo luận về kết quả thực thi test để lên kế hoạch cũng như rút ra bài học. Ý tưởng là loại bỏ những giai đoạn thắt cổ chai cũng như chia sẻ kinh nghiệm cho những dự án tương tự trong tương lai.
- Đánh giá mức độ hoàn thành của việc test dựa vào Thời gian, Độ bao phủ test, Chi phí, Mục tiêu kinh doanh đạt được, v.v.
- Ghi nhận những bài học rút ra.
- Chuẩn bị báo cáo.
- Đánh giá chất lượng sản phẩm.
- Phân tích kết quả kiểm thử để tìm ra việc phân bổ và độ nghiêm trọng của lỗi. <br/> 

**5. Kết thúc kiểm thử** <br/> 
Thu thập dữ liệu từ các hoạt động kiểm thử, tổng hợp kinh nghiệm dựa trên việc kiểm tra và hoàn thiện bộ sản phẩm kiểm thử.