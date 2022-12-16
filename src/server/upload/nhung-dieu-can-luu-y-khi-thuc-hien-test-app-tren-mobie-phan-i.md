Thực hiện kiểm thử app trên mobie có thể sẽ là bài toán không dễ dàng đối với những ai mới bắt đầu. Vậy để thực hiện test app trên mobie, bạn cần chú ý những điều gì? Bài viết dưới đây liệt kê cho bạn các testcase cần chú ý khi thực hiện test app trên mobie. Lưu ý rằng nó còn phụ thuộc vào yêu cầu kiểm tra mobie của bạn. 
# Các loại kiểm thử trên mobie app
1. UI testing
2. Functional testing
3. Performance and load testing
4. Usability testing
5. Compatibility testing
6. Interaction testing
7. Monkey testing & Install/Uninstall testing

## UI testing
Các lưu ý khi test UI trên mobie:

**1. Status bar** 

Cần lưu ý xem việc ẩn hiện của Status  bar  khi đang mở ứng dụng có đúng theo spec hay không?

**2. Screen resolution( phân giải màn hình)** 

Cần kiểm tra xem với các độ phân giải màn hình khác nhau thì giao diện hiển thị của app có đúng hay không?

**3. Layout(bố trí)**

- Object : Kiểm tra xem đã đủ các đối tượng trên màn hình chưa và khoảng cách giữa các đối tượng có phù hợp hay không? 
- Color: chú ý màu sắc, màu nền có đúng như design không? 
- Usability: Kiểm tra button phải có kích thước yêu cầu và phù hợp với ngón tay 
- Header - Fotter phải hiển thị giống như spec( về nội dung, format..)
- Rotate: Kiểm tra giao diện có bị vỡ khi xoay màn hình hay ko? 
- Swipe: Kiểm tra giao diện có bị vỡ khi người dùng vuốt màn hình hay không?
- Zoom In/ Zoom Out: Kiểm tra giao diện có bị vỡ khi phong to/thu nhỏ màn hình không? 
- Position: Kiểm tra vị trí của đối tượng có giống với spec hay không? 
- Shake: Kiểm tra giao diện màn hình có bị vỡ khi người dùng lắc device hay không?

**4. Label**

- Text: Hiển thị theo đúng mô tả trong spec ( Nội dung, chữ không bị rời rạc)
- Format: Hiển thị theo đúng mô tả trong spec ( Màu sắc, hình dạng, )
- Size: Hiển thị theo đúng mô tả trong spec(ngang dọc, số hàng..)
- Position: Vị trí của label được đặt đúng như trong spec
- Default value: Hiển thị defalut trên màn hình (Ngay sau khi mở màn hình ra) theo đúng mô tả trong spec

**5. Text box/ Text area**

- Place hoder: Theo đúng mô tả trong spec (Nội dung, chữ không bị cắt rời rac..)
- Format: Theo đúng trong spec(màu sắc, hình dạng, căn chữ trái phải ở giữa, mép lề, 
độ lớn của đường kẻ)
- Size: Theo đúng mô tả trong spec( ngang dọc, số hàng..)
- Position: Kiểm tra vị trí của text box có đúng với spec không?
- Scroll: Nhiều hàng cột, việc thiết lập Scroll đúng như trong spec 
- Status: Kiểm tra trạng thái của text box/ text area  có nhập được dữ liệu ko? 
- Default value: Các giá trị mặc định của text box/ text area có đúng như spec không? 

**6. Button**

- Text: Theo đúng như trong mô tả spec (màu sắc, font size, font, chữ không bị cắt rời rạc)
- Format: Theo đúng mô tả trong spec (Màu sắc, hình dạng, căn trái phải ở giữa, mép lề, độ lớn của đường viền
- Size 		Theo đúng spec ( ngang dọc, boder)
- Status 		Ngay sau khi mở màn hình thì button ở trạng thái disable hay enable như spec? 
- Forcus 		Kiểm tra button có được forcus? 
- Position		Kiểm tra vị trí của button có đúng như trong spec không? 

**7. List box**

- List item: Thành phần các item có trong list đúng như mô tả trong spec 
- Format: Theo đúng mô tả trong spec( căn trái phải ở giữa, mép lề,…)
- Size: Theo đúng mô tả trong spec ( chiều dọc, chiều ngang, số hàng)
- Scroll: Nếu như list có nhiều item thì có cho scroll hay không?  Bao nhiêu item thì cho scroll 
- Default value : Kiểm tra giá trị mặc định của list box như spec không?
- Position: Kiểm tra vị trí của list, item có đúng vị trí, xô lệch không? 
- Status : kiểm tra ngay khi mở màn hình thì list đang enable hay disable 

**8. Pull Down**

- List item: Các item hiển thị trong list đúng như spec, chữ không bị cắt rời rạc 
- Format: Theo đúng mô tả trong spec( căn trái phải ở giữa, mép lề,…)
- Size: Theo đúng mô tả trong spec ( chiều dọc, chiều ngang, số hàng)
- Position: Kiểm tra vị trí của list, item có đúng vị trí, xô lệch không? 
- Status: Kiểm tra ngay khi mở màn hình thì list đang enable hay disable 

**9. Image**

- Position: Kiểm tra vị trí của ảnh có đúng như trong spec 
- Size: Theo đúng theo mô tả trong spec ( chiều dài, chiều rộng)
- Image Resolution: Image không bị mờ vỡ hình
- Tap image: Check ảnh có bị vỡ hay không?
- Muti tap: Ảnh có phóng to, thu nhỏ như spec ko? 
- Zoom In/ Zoom Out: Kiểm tra ảnh có phóng to thu nhở khi user zoom in / zoom out không( nếu ứng dụng yêu cầu) nếu zoom thì ảnh có bị vỡ , mờ ko?

**10. Check box**

- Text: Theo đúng theo mô tả trong spec ( nội dung, chữ ko bị rời rạc )
- Position: Check vị trí của checkbox đúng như yêu cầu 
- Default value: Ngay khi mở màn hình thì checkbox ở dạng uncheck all, hay check all 
- Check all: Kiểm tra có cho phép check tất cả các check box hay không? 
- Uncheck: Kiểm tra uncheck check box có được không? 
- Clear all: Kiểm tra xem có cho phép bỏ chọn tất cả các check box hay không? 

**11. Radio Button**

- Text: Theo đúng mô tả ( nội dung, chữ không bị cắt, rời rạc)
- Format		
- Position: Kiểm tra vị trí hiển thị radio button có đúng không? 
- Default value: Kiểm tra đối tượng mặc định nào được check ?

**12. Message dialog**

- Position: Kiểm tra vị trí hiển thị message có đúng như design ko? 
- Size: Kiểm tra kích thước của dialog có giống design ko?
- Icon: Kiểm tra các iocn  : lỗi, ?... Có như design ko?
- Message content: Kiểm tra nội dung của message có đúng với spec không 
- Object: Kiểm tra các đối tượng trong dialog có chính xác hay ko? 

**13. Keyboar**

Kiểm tra vị trí của keyboard trên màn hình có đúng hay không?

**14. Link**

- Text: Theo đúng theo mô tả trong spec ( nội dung, chữ ko bị rời rạc )
- Position: Kiểm tra vị trí  có đúng như trong spec 
- Fomat: Màu sắc,  căn trái , giữa, phải .. Như spec 
- Transaction: Kiểm tra link có di chuyển đến trang đích như trong yêu cầu hay ko?