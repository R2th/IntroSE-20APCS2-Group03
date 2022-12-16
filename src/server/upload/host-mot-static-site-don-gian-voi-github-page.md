## Chuẩn bị
- Tên miền (có thể đăng kí trên goDaddy, namecheap, freenom hoặc bất cứ nhà cung cấp tên miền nào)
- Tài khoản github
- Một HTML template hoặc HTML game có cấu trúc đơn giản
![](https://images.viblo.asia/96c0e6bc-4ec4-40d0-94f5-46302077f381.PNG)
## Đẩy folder code lên github
Trước hết chúng ta cần push code lên public repo github của mình.
![](https://images.viblo.asia/ccee5699-8f03-4fe2-a826-e40e1232f634.PNG)
## Public trên internet
Vào mục setting, kéo xuống phần Github Pages và chọn nhánh master.
![](https://images.viblo.asia/15f06699-a448-4747-960e-25f08bd3b2d6.PNG)
![](https://images.viblo.asia/6016f13c-5fe8-414b-8d6a-979182806265.PNG)
Bây giờ site của chúng ta đã được public và có thể truy cập từ bất kì đâu thông qua địa chỉ: https://asunaxran.github.io/vongquaymayman/. <br>
Trong đó, "asunaxran" là username github, và "vongquaymayman" là tên repo.
![](https://images.viblo.asia/abdac7de-0650-4028-858c-1367468f7195.PNG)
## Tùy chỉnh tên miền
Với địa chỉ url như vậy thường không được đẹp và khó nhớ. Đây là lúc chúng ta muốn tùy chỉnh bằng cách sử dụng tên miền riêng của mình. Bạn có thể đăng ký một tên miền miễn phí qua website freenom.com <br>
Sau khi sở hữu tên miền từ nhà cung cấp dịch vụ (DNS provider) chúng ta cần phải cấu hình lại. Đăng ký tên miền tại đâu thì quản lý, chỉnh sửa tại đấy. <br>
Tạo A record trỏ tên miền đã đăng ký đến các địa chỉ IP sau: <br>
    185.199.108.153 <br>
    185.199.109.153 <br>
Tùy vào giao diện trang quản trị của nhà cung cấp mà các bạn tự chỉnh. Ở đây mình ví dụ vài trang. <br>
Freenom.com <br>
Ở freenom thì khá đơn giản. Chúng ta chỉ cần chọn tab DNS và nhập vào lần lượt 2 địa chỉ IP ở trên.
![](https://images.viblo.asia/bc148a10-ed24-4342-8a78-754edea9348f.PNG)
godaddy.com <br>
Chúng ta vào phần quản lý DNS và thêm vào 2 bản ghi tương ứng với địa chỉ IP github đã đề cập.
![](https://images.viblo.asia/4f54b3e7-bfd8-4b63-966d-18172785bb16.PNG)
![](https://images.viblo.asia/4dde81c6-9782-4a31-a861-39dfa65d3461.PNG)
inet.vn <br>
Vào phần quản lý tên miền và chọn Cập nhật bản ghi. Sau đó cập nhật giá trị bản ghi A với địa chỉ IP github
![](https://images.viblo.asia/09d3d8af-6356-4eb4-853c-24b286a17e28.PNG)
![](https://images.viblo.asia/fec3664e-3e47-4ae5-b201-be064b830c34.PNG)
Cuối cùng chúng ta quay lại phần setting của repo, xuống phần custom domain và nhập vào tên miền đã được cấu hình.
![](https://images.viblo.asia/3191e088-dd26-486c-a016-bc4ed91c2879.PNG)
Thành quả :grinning:
![](https://images.viblo.asia/5821c182-f7f8-4b30-80b2-293482204140.PNG)