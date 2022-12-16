**Hiện tại có rất nhiều nhà cung cấp hỗ trợ service nhận diện giọng nói từ file sang văn bản, nổi bật nhất trong đó có lẽ là service từ Google Cloud. Hôm nay mình sẽ hướng dẫn các bạn cách setup và sử dụng service này trên nền tảng NodeJS.**

![image.png](https://images.viblo.asia/4e843616-260f-4f0e-a34b-d632ab839761.png)

# I. Đăng kí tài khoản Google Cloud
Để sử dụng service của Google Cloud, trước tiên chúng ta cần đăng kí tài khoản: https://console.cloud.google.com/freetrial/signup/

![image.png](https://images.viblo.asia/4152dd7c-ff13-4ae7-a46e-3d46a85d9360.png)

Điền đầy đủ thông tin yêu cầu ở bước 2, lưu ý Google Cloud yêu cầu người dùng cung cấp thông tin thẻ Visa, Master Card mới có thể đăng kí tài khoản (hiện tại Google không chấp nhận thẻ Master Card ảo, nên không thể dùng thẻ Master Card ảo đăng kí bằng Viettel Pay hay bên bất kì nào nhé).
![image.png](https://images.viblo.asia/8dc45f38-57e4-4047-80da-88f2ae140bea.png)

Sau khi tạo thành công tài khoản, ta vào Dashboard của Google Cloud và tạo một chứng thực (credential) và lưu về máy.
![image.png](https://images.viblo.asia/6bf0f5e0-5435-4ea5-8bd9-6e660b89695b.png)

Set biến môi trường ở máy của bạn, cho phép gọi APIs mà Google cung cấp với credential đã tải về
* Với Linux/MacOS
![image.png](https://images.viblo.asia/a9bbd1c8-20c8-487a-96c3-2410ae5ca636.png)

* Với Window
![image.png](https://images.viblo.asia/b0d9cb38-31f0-44aa-a905-9faa286753e5.png)
# II. Tạo Project NodeJS
1. Tạo thư mục chứa project, đặt tên CloudSpeech
2. Mở terminal, đi đến thư mục đã tạo, chạy câu lệnh “npm init” (Yêu cầu máy của bạn phải cài NodeJs rồi nhé)
3. Điền các thông tin cần thiết (nếu có), và nhấn enter để tiếp tục
![image.png](https://images.viblo.asia/99550f94-13c3-40c6-879d-e44fd7c414e0.png)

4. Tạo file index.js bằng câu lệnh “echo > index.js” hoặc tự tạo bằng tay nhé
5. Install package: `npm install @google-cloud/speech`
6. Google Cloud có rất nhiều project sample như convert file voice to text, nhận diện giọng nói từ microphone, ở đây mình sẽ demo với project infinite streaming: https://github.com/googleapis/nodejs-speech/blob/master/samples/infiniteStreaming.js
7. Các bạn copy hết source ở trên và bỏ vào file index.js đã tạo ở trên nhé.
8. Install các package cần thiết:
+ `npm i chalk`
+ `npm i node-record-lpcm16`
9. Để project nhận diện được voice từ micro và convert sang đúng định dạng mà Google Cloud Speech yêu cầu ta cần dùng SoX, install Sox tại: http://sox.sourceforge.net/
![image.png](https://images.viblo.asia/ac4c686f-26fc-4b07-a2be-22195540c42a.png)

*Hiện tại version 14.4.2 đang gặp một số lỗi nên chúng ta sẽ install version 14.4.1
Với MacOS thì đơn giản hơn, chúng ta chỉ cần chạy câu lệnh “brew install sox” với terminal, không cần tự tải*
# III. Config
Các bạn mở file index.js lên, trong function main, chúng ta có thể điều chỉnh languageCode về ngôn ngữ chúng ta nói để bộ nhận diện sẽ detect chính xác hơn. Ví dụ nếu bạn nói tiếng Việt thì chuyển ‘en-US’ về ‘vi-VN’.
![image.png](https://images.viblo.asia/05cc3830-167b-4d15-9b61-4c0bb124234c.png)

# IV. Run project 
Bằng câu lệnh: `node index.js` , bây giờ chúng ta đã có thể nói vào micro, Google APIs sẽ tự detect ra text và show kết quả lên console.

# REFERENCE
https://medium.com/@khaleo/h%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-build-%E1%BB%A9ng-d%E1%BB%A5ng-s%E1%BB%AD-d%E1%BB%A5ng-d%E1%BB%8Bch-v%E1%BB%A5-speech-to-text-c%E1%BB%A7a-google-cloud-tr%C3%AAn-nodejs-79653d85f33

**Cảm ơn các bạn đã xem bài viết!! ❤**

# Mục tìm kiếm đồng đội
Hiện tại thì bên công ty mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và là trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn để cần giải quyết, và sẽ có rất nhiều bài toàn thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình nha `kha.le@hoang-phuc.net`. Cảm ơn các bạn đã đọc.