**1. All pairs Testing là gì?**

All pair testing (Kiểm thử tất cả các cặp) hay còn gọi là pairwise testing,là một phương pháp test được thực hiện để kiểm thử các phần mềm sử dụng phương pháp tổ hợp. Đó là một phương pháp để kiểm tra tất cả các kết hợp rời rạc có thể có của các thông số liên quan, phương pháp test ít nhất sao cho chất lượng tốt nhất.
Thực tế quan sát cho thấy, hầu hết lỗi do kết hợp của 2 yếu tố/tham số.
=> Kiểm thử tất cả các cặp sinh bộ kiểm thử chứa tất cả các cặp giá trị cần kiểm thử của các biến.
Giảm đáng kể số lượng ca kiểm thử.
Vẫn hiệu quả trong việc phát hiện lỗi (50-90%).

**2. Ví dụ**

Một ứng dụng với list box đơn giản với 10 phần tử ( 0,1,2,3,4,5,6,7,8,9) cùng với một checkbox, radio Button, Text Box và OK Button. Các ràng buộc cho ô Text là nó có thể chấp nhận các giá trị chỉ từ 1 đến 100. Dưới đây là những giá trị mà mỗi một trong số các đối tượng giao diện có thể thực hiện:

* List Box - 0,1,2,3,4,5,6,7,8,9
* Check Box - Checked hoặc Unchecked
* Radio Button - ON hoặc OFF
* Text Box - Bất kỳ giá trị từ 1 đến 100

a. Sự kết hợp đầy đủ các giá trị 

* List Box = 10 giá trị
* Check Box = 2 giá trị
* Radio Button = 2 giá trị
* Text Box = 100 giá trị

--> Tổng số testcase khi sử dụng phương pháp Cartesian, nghĩa là khi ta kiểm tra đầy đủ tất cả các trường hợp là 10 x 2 x 2 x 100 = 4000 testcase.

--> Tổng số testcase bao gồm những trường hợp tiêu cực có thể > 4000. Như vậy, sẽ mất rất nhiều thời gian để kiểm tra đầy đủ.

b. Áp dụng kiểm thử với kiểm thử thông thường

Ta xét các giá trị 

* List box: chia thành 2 vùng kiểm tra 0 và những giá trị khác (others) (1,2,3,4,5,6,7,8,9).
* Check box: giữ nguyên 2 giá trị: Checked hoặc Unchecked
* Radio Button: giữ nguyên 2 giá trị: ON hoặc OFF
Text Box: Bất kỳ giá trị từ 1 đến 100 có thể được chia thành ba đầu vào (Integer hợp lệ là trong khoảng từ 1 đến 100, Integer không hợp lệ là ngoài khoảng 1 đến 100 và các kí tự đặc biệt không phải là số nguyên).
--> Số lượng các testcase sử dụng kỹ thuật kiểm thử phần mềm đã giảm xuống còn 2 x 2 x 2 x 3 = 24 (bao gồm cả trường hợp tiêu cực).

c. Áp dụng kĩ thuật với All pairs testing 

* Bước 1: Sắp xếp các giá trị: biến có nhiều vùng giá trị nhất sắp xếp đầu tiên và biến có số lượng vùng giá trị ít nhất được để ở cuối cùng.
* Bước 2: Điền các vùng giá trị tương ứng vào bảng theo cột. Bắt đầu từ List box cột thứ 2, có thể lấy 2 giá trị: 0 và others.
* Bước 3: Tiếp tục điền vùng giá trị cho cột Check box: có thể nhận 2 giá trị là check và uncheck.
* Bước 4: Kiểm tra để đảm bảo rằng đã bao phủ tất cả các trường hợp kết hợp giữa List box và Check box.
* Bước 5: Tiếp tục điền giá trị cho cột Radio Button: nhân 2 giá trị là ON hoặc OFF.
* Bước 6: Xác minh để đảm bảo tất cả các cặp giá trị đều được bao phủ như trong bảng dưới đây.
![](https://images.viblo.asia/23aa892c-4bb9-4024-9c4e-d5e62acc0e80.png)

**Kết quả kiểm tra**

* Kết quả kết hợp đầy đủ trong> 4000 test cases.
* Kết quả kỹ thuật thông thường kiểm thử phần mềm 24 test cases.
* Kết quả kỹ thuật Pair Wise kiểm thử phần mềm chỉ trong 6 test cases.

**3. Tài liệu tham khảo**
https://www.tutorialspoint.com/software_testing_dictionary/all_pairs_testing.htm

http://www.slideshare.net/ushakannappan/all-pairs-testing-technique