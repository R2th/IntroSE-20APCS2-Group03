Đã bao giờ bạn muốn tạo ra robot, đèn nhấp nháy theo nhạc, làm hiệu ứng đèn LED nhấp nháy trên các biển quảng cáo,… hay có thể là máy in 3D, máy bay không người lái,... Bạn biết về lập trình nhưng do không có nhiều thời gian và thiếu những kiến thức về điện tử nên gặp rất nhiều khó khăn. Từ những trở ngại đó đã tạo nên sự ra đời một thiết bị tên là Arduino loại bỏ những trở ngại đó giúp bạn.

# Vậy Arduino là gì ?
Arduino là một nền tảng mã nguồn mở được sử dụng để xây dựng các dự án điện tử. Arduino bao gồm cả bảng mạch lập trình (thường được gọi là vi điều khiển) và một phần mềm ( IDE ) được sử dụng để lập trình viết và tải mã máy tính lên bo mạch.

Nhờ sự đơn giản và dễ tiếp cận, Arduino đã được sử dụng trong hàng nghìn dự án và ứng dụng khác nhau. Phần mềm Arduino rất dễ sử dụng cho người mới bắt đầu, nhưng đủ linh hoạt cho người dùng nâng cao. Không giống như hầu hết các bo mạch lập trình trước đây, Arduino không cần phần cứng riêng để tải mã mới lên bo mạch - bạn có thể chỉ cần sử dụng cáp USB. Ngoài ra, Arduino IDE sử dụng phiên bản đơn giản của C++, giúp việc học lập trình dễ dàng hơn.  


# Các phiên bản Arduino
Tại thời điểm hiện tại, có rất nhiều các phiên bản Arduino, chúng được thiết kế để hướng tới phục vụ cho các mục đích khác nhau tùy theo người sử dụng. Có thể kể đến như Arduino Nano hướng tới sự nhỏ gọn, tiện dụng, và đơn giản, hay dòng Arduino Mega 2560 thường được sử dụng cho các dự án rất phức tạp cần nhiều chân I/O,... nhưng phổ biến và được sử dụng nhiều nhất là Arduino UNO R3 hướng tới sự cân bằng, đây sẽ là mạch được giới thiệu chi tiết trong bài viết này.

![Arrduino All](https://images.viblo.asia/51792c1f-bf60-4203-87b2-0ee39b6d6c9b.jpg)

# Arduino UNO R3
Khi ai nhắc tới mạch Arduino dùng để lập trình, cái đầu tiên mà người ta luôn nghĩ tới là dòng Arduino UNO. Hiện dòng mạch này đã phát triển tới thế hệ thứ 3 (R3). đây là mạch mà ta sẽ tìm hiểu, khi bạn đã hiểu rõ về nó, bạn có thể dễ dàng tìm hiểu và lập trình các dòng Arduino khác dễ dàng.

![unor3](https://images.viblo.asia/e22b1175-cfca-40d2-81b8-d5dc6e1e7b86.jpg)


## Tổng quan thông số của Arduino Uno R3

* Vi xử lý: ATmega328P
* Điện áp hoạt động: 5 Volts
* Điện áp vào giới hạn: 7 đến 20 Volts
* Dòng tiêu thụ: khoảng 30mA
* Số chân Digital I/O: 14 (với 6 chân là PWM)
* UART: 1
* I2C: 1
* SPPI: 1
* Số chân Analog: 6
* Dòng tối đa trên mỗi chân I/O: 30 mA
* Dòng ra tối đa (5V): 500 mA
* Dòng ra tối đa (3.3V): 50 mA
* Bộ nhớ flash: 32 KB với 0.5KB dùng bởi bootloader
* SRAM: 2 KB
* EEPROM: 1 KB
* Clock Speed: 16 MHz

## Sơ đồ chân của Arduino Uno R3

![R3pins](https://images.viblo.asia/400x400/160435cd-9fb1-4a40-aceb-dea214442e2f.png)

### Chân cấp năng lượng

* 5V: cấp điện áp 5V đầu ra, dùng để cấp nguồn cho các linh kiện điện tử kết nối với Arduino
* 3.3V: chức năng tương tự như cấp nguồn 5v nhưng đây là cấp điện áp 3.3V đầu ra.
* Ground: hay còn gọi là chân GND, là cực âm của nguồn điện cấp cho Arduino UNO. Khi bạn dùng các thiết bị sử dụng những nguồn điện riêng biệt thì những chân này phải được nối với nhau.
* Vin (Voltage Input): tương tự như chân 5V, nhưng thêm chức năng cấp nguồn ngoài cho Arduino UNO thay vì cắm USB, bạn nối cực dương của nguồn với chân này và cực âm của nguồn với chân GND.


### Các cổng vào/ra (I/O)
Arduino cung cấp nhiều các chân  I/O ( hay còn gọi là Pin ) để ta giao tiếp hay gửi lệnh điều khiển các thiết bị, dưới đây là sẽ nói về các chân sử dụng nhiều nhất và phân chúng làm các loại như sau:  
#### Các chân Digital

Phiên bản Arduino UNO R3 được sở hữu 14 chân digital từ 0 đến 13 dùng để đọc hoặc xuất tín hiệu. Chúng chỉ có 2 mức điện áp có thể điều khiển là 0V và 5V với dòng vào/ra tối đa trên mỗi chân là 40mA. Ngoài ra một số chân digital có chức năng đặc biệt là chân PWM.



* Chân PWM: là các chân có dấu '~' đằng trước, các chân này cho phép bạn xuất ra xung PWM với độ phân giải 8bit (giá trị từ 0 đến 255) tương ứng với mức giao động điện áp của chân từ 0V đến 5V, khác với các chân không phải PWM, chỉ có thể chọn giá trị 0V hoặc 5V. 

#### Các chân Analog

Arduino UNO có 6 chân analog (A0 đến A5) cung cấp độ phân giải tín hiệu 10bit (0 đến 1023) để đọc giá trị điện áp trong khoảng 0V đến 5V. 

* Đặc biệt, Arduino UNO có 2 chân A4 (SDA) và A5 (SCL) hỗ trợ giao tiếp I2C/TWI với các thiết bị khác.

#### Chân TXD và RXD
Đây là các chân Serial dùng để gửi (transmit – TX) và nhận (receive – RX) dữ liệu TTL Serial. Arduino Uno có thể giao tiếp dữ liệu với các thiết bị cần sử dụng thông qua 2 chân này, ngoài ra có thể sử dụng 2 chân này để nạp code cho mạch mà không cần thông qua USB của mạch. 


# Lập trình cho Arduino
Các mạch Arduino hay các mạch dựa trên nền tảng Arduino được lập trình bằng ngôn riêng. Ngôn ngữ này dựa trên ngôn ngữ Wiring được viết cho phần cứng nói chung và khi ta xem, ta thấy nó rất giống lập trình C đơn giản, do vậy việc tiếp cận sẽ không mấy khó khăn.

Để lập trình cũng như gửi lệnh và nhận tín hiệu từ mạch Arduino, ta sử dụng một môi trường lập trình Arduino được gọi là Arduino IDE.
Để sử dụng bạn tải phần mềm tại [đây](https://www.arduino.cc/en/Main/Software) và cài đặt.

![ide](https://images.viblo.asia/400x400/c5a3eb43-9995-4a21-823b-0ab91abc4d65.png)

Khi ta tạo một project mới, ta sẽ có khung code như hình. Chi tiết cách thức lập trình mình sẽ nói chi tiết ở một bài viết khác sau. 

Hẹn gặp lại.