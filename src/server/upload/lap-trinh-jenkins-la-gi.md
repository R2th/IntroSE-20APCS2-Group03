# Jenkins là gì?

* Jenkins là một opensource dùng để thực hiện chức năng tích hợp liên tục (gọi là CI – Continuous Integration) và xây dựng các tác vụ tự động hóa.
* Nó tích hợp các source code của các members trong team lại nhanh chóng một cách liên tục, theo dõi sự thực thi và trạng thái thông qua các bước kiểm thử (Integration test, units test). Tất nhiên là nhằm giúp sản phẩm chạy ổn định.


![](https://images.viblo.asia/fad496be-2b4c-4211-bc54-81f6ae246e61.png)

# Quá trình hình thành

* Năm 2004, Kohsuke Kawaguchi – một lập trình viên Java tại Sun vào một ngày cảm thấy mệt mỏi vì các mã nguồn của mình thường xuyên bị fail.
* Ông ta muốn tìm cách biết là trước khi đưa code vào deploy, liệu code có hoạt động hay không.
* Vì vậy, Kawaguchi đã xây dựng một hệ thống server tự động hóa cho chính server và cho Java có thể kiểm tra tình trạng code trước khi deploy, được gọi là Hudson. Hudson trở nên phổ biến tại Sun và thịnh hành sang các công ty khác dưới dạng opensource.
* Đến năm 2011, với việc Oracle mua lại Sun gây nên sự tranh chấp với cộng đồng nguồn mở, Jenkins được forked từ Hudson sau đó. Cả Hudson và Jenkins đều tiếp tục tồn tại, mặc dù Jenkins có phần phổ biến hơn.
* Năm 2014 Kawaguchi trở thành CTO của CloudBees, một công ty cung cấp các sản phẩm dựa trên nền tảng Jenkins.


# CI là gì? CD là gì?
![](https://images.viblo.asia/ce3cdddf-0231-4ad6-a55f-1463451ec89f.png)

## CI là viết tắt của Continuous Integration
* Là tích hợp liên tục, nhằm liên tục tích hợp các source code của các thành viên trong team lại một cách nhanh chóng.

### Chu trình làm việc
1.Bước đầu tiên, các thành viên trong team dev sẽ bắt đầu pull code mới nhất từ repo về branch để thực hiện các yêu cầu chức năng nhất định.

2.Tiếp đó là quá trình lập trình và test code để đảm bảo chất lượng của chức năng cũng như toàn bộ source code.

3.Thành viên code xong thì sẵn sàng cho việc commit vào branch develop của team.

4.Thành viên cập nhật code mới từ repo về local repo.

5.Merge code và giải quyết conflict.

6.Build và đảm bảo code pass qua các tests dưới local.

7.Commit code lên repo.

8.Máy chủ CI lắng nghe các thay đổi code từ repository và có thể tự động build/test, sau đó đưa ra các thông báo (pass/failure) cho các thành viên.

### CD là viết tắt của Continuous Delivery

* Continuous Delivery là chuyển giao liên tục, là 1 tập hợp các kỹ thuật để triển khai tích hợp souce code trên môi trường staging ( một môi trường rất giống với môi trường production)


:fist_right: Bài Sau mình sẻ hướng dẫn **Build, deploy với Jenkins và Docker** nhé