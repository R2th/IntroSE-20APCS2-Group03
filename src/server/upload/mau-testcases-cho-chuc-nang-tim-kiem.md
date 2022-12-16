Để có một bộ Testcase hiệu quả, Tester cần xác định được những case sẽ được viết trong testcase của mình và thể hiện nó một cách rõ ràng,đầy đủ và dễ hiểu. Thông thường, một testcase rõ ràng sẽ được chia theo 2 phần: Test UI (Giao diện người dùng) và Test Function (Chức năng). Test UI là thực hiện test về Bố cục, Màu sắc, Kiểu chữ, Đồ họa,...tất cả những gì thuộc về giao diện người dùng nhìn vào. Test Function là thực hiện test về giá trị đầu vào đầu ra thuộc đặc tả yêu cầu. 

I. Kiểm tra giao diện
1. Check  default giao diện => Các item trên màn hình nằm đúng vị trí so với thiết kế. (test layout màn hình)
2. Check giao diện hiển thị trong quá trình search
* Check quá trình loading dữ liệu => Show icon loading và hiển thị icon đúng vị trí 
* Check hiển thị kết quả => Hiển thị không vỡ layout, hiển thị thứ tự từ trên xuống dưới, không bị ẩn kết quả 


II. Kiểm tra với điều kiện thường 

1. DB không có data, nhập thông tin tìm kiếm 
2. DB có data, nhập thông tin không khớp với data trong DB 
3. DB có data, nhập keyword giống với kết quả 
4.  Nhập keyword có độ dài lớn 
5.  Nhập keyword giống 1 phần kết quả
6.  Nhập keyword similar với kết quả
7.  Nhập keyword chữ hoa, chữ thường
8. Nhập kí tự đặc biệt,emoji 🌷👩👨
9. Nhập kí tự số 
10. Check Japanese: Full size, half size, katakana, hiragana, kanji
11. Không nhập giá trị 
12. Tìm kiếm bởi dấu cách 
13. Chặn SQL injection

III. Kiểm tra hiển thị datagrid và phân trang, ví dụ datagrid chỉ hiển thị tối đa 20 records, nếu hơn 20 records thì hiển thị scroll dọc

1. Search không có data (0 record) => datagrid chỉ hiển thị header và không hiển thị scroll dọc
2. Search có 1 record => datagrid hiển thị header và 1 dòng record, các cột tương ứng với các field trong DB và không hiển thị scroll dọc
3. Search có 20 records => datagrid hiển thị header và 20 dòng và không hiển thị scroll dọc
4. Search có 21 records => datagrid hiển thị header và 20 dòng (record 21 đến 40) và hiển thị scroll dọc
5. Datagrid có 30 records, kéo scroll xuống dưới cùng => hiển thị từ record thứ 21 đến 30.

IV. Kiểm tra hiển thị datagrid và phân trang, ví dụ datagrid chỉ hiển thị tối đa 20 records, nếu hơn 20 records thì hiển thị phân trang

1. Search không có data (0 record) 
2. Search có 1 record => datagrid hiển thị header và 1 dòng record, các cột tương ứng với các field trong DB
3. Search có 20 records => datagrid hiển thị header và 20 dòng
4. Search có 21 records => datagrid hiển thị trang 2  header và 20 dòng (record 21 đến 40)
5. Datagrid có 30 records => hiển thị trang 2 từ record thứ 21 đến 30



Tài liệu tham khảo :
- http://www.testingjournals.com/test-website-search-functionality/
- http://blogs.innovationm.com/search-from-a-list-reusable-test-cases/