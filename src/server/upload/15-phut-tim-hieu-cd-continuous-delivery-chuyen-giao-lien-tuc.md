Tiếp tục với chủ đề CI/CD. Ở bài viết trước mình đã trình bày khái niệm về CI - Continuous Integration. Ở bài viết này chúng ta cùng tìm hiểu về khái niệm luôn được đề cập kèm với CI chính là CD - Continuous Delivery - tạm dịch chuyển giao liên tục nhé.

### CD là ...?
Khác với khái niệm CI - Continuous Integration - tích hợp liên tục là quy trình build và test tự động. CD - Continuous Delivery - nâng cao hơn một chút, bằng cách triển khai tất cả thay đổi về code (đã được build và test) đến môi trường testing hoặc staging. Continuous Delivery cho phép developer tự động hóa phần testing bên cạnh việc sử dụng unit test, kiểm tra phần mềm qua nhiều thước đo trước khi triển khai cho khách hàng (production). Những bài test này bao gồm UI testing, load testing, integration testing, API testing... Nó tự động hoàn toàn quy trình release phần mềm. 
Tóm lại CD có thể hiểu là quá trình ra đời sản phầm một cách liên tục theo từng phiên bản của phần mềm làm phần mềm dần hoàn thiện hơn cho tới bản release chính thức.

### CD lại là ...?
Có một khái niệm nữa là Continuos Deployment (cũng viết tắt là CD), và hai khái niệm này thường hay bị nhầm lẫn với nhau. Nếu Continuous Delivery là triển khai code lên môi trường staging, và deploy thủ công lên môi trường production, thì Continuous Deployment lại là kỹ thuật để triển khai code lên môi trường production một cách tự động.
![image.png](https://images.viblo.asia/20c57991-2187-4658-b4b5-a1b16c055669.png)

### Luồng thực hiện
Trên Continuous Delivery và Continuous Deployment đều được thực hiện theo flow sau:
1. Mỗi version code đưa lên đều trải qua một quy trình giống nhau, bao gồm: build automation, test automation,… Và nếu không có vấn đề gì xảy ra nghĩa là code đó có thể deploy.
2. Sau khi quyết định deploy thì sẽ thực hiện deploy tự động (deploy automation).
3. Nếu việc deploy gặp lỗi, hệ thống sẽ tự động rollback.
4. Developer sẽ nhanh chóng fix lỗi và redeploy version fix lỗi.

### Ưu điểm
1. Nhanh chóng đưa sản phẩm đến tay khách hàng
2. Giảm thiếu các vấn đề xảy ra khi deploy
3. Giảm thiếu risk: lượng deploy trong 1 lần càng nhiều, risk càng cao. Việc chia nhỏ lượng deploy sẽ giảm thiểu risk.
4. Rollback lập tức khi xảy ra lỗi
5. Giúp developer không còn lo lắng khi deploy khi đã có chức năng roll back automation.
6. 
### Mối quan hệ giữa CI và CD
CICD là một phương pháp thường xuyên cung cấp ứng dụng cho khách hàng bằng cách đưa tự động hóa vào các giai đoạn phát triển ứng dụng. Các khái niệm chính được gán cho CICD là tích hợp liên tục, phân phối liên tục và triển khai liên tục. CICD là một giải pháp cho các vấn đề tích hợp mã mới có thể gây ra cho các nhóm phát triển và hoạt động.

Cụ thể, CI CD giới thiệu tính năng tự động hóa liên tục và giám sát liên tục trong suốt vòng đời của ứng dụng.  Từ giai đoạn tích hợp và thử nghiệm đến phân phối và triển khai. Tổng hợp lại, các phương pháp kết nối này thường được gọi là ” đường dẫn CICD “. Chúng được hỗ trợ bởi các nhóm phát triển và hoạt động làm việc cùng nhau theo cách nhanh nhẹn với phương pháp tiếp cận DevOps hoặc SRE (site reliability engineering).

![image.png](https://images.viblo.asia/caf5d775-c1bf-4829-be29-bdb494df3996.png)

### Kết
Việc ứng dụng CI/CD sẽ giúp chúng ta gia tăng năng xuất và chất lượng cho sản phẩm phần mềm bằng việc phát hiện và cảnh báo sớm những rủi ro, đưa ứng dụng deloy một cách nhanh chóng và tiết kiệm thời gian nhất có thể. 
Cám ơn vì đã theo dõi. Hẹn gặp lại các bạn ở những bài viết tiếp theo.

### Tài liệu tham khảo

https://vnpro.vn/thu-vien/tien-trinh-cicd-trong-phan-mem-va-thuc-te-ap-dung-cho-nganh-network-3588.html
https://viblo.asia/p/tim-hieu-ve-devops-phan-1-ByEZk9Mo5Q0