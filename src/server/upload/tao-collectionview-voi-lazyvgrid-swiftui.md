Xin chào các bạn, 
hôm ni mình sẽ giới thiệu cách tạo collectionView với swiftUI bằng LazyVGrid.
Mình thấy LazyVGrid viết khá ngắn gọn và dễ chỉnh sửa.
Mình sẽ lấy chủ đề là thế giới động vật nhé.
![](https://images.viblo.asia/f68a89c3-5283-4623-89b1-24b9f9323a6e.png)

Đầu tiên mình sẽ chuẩn bị nguyên liệu gồm có:
- 1 struct Animal
- 1 list data giả để test
- 1 album ảnh thế giới động vật (file Asserts)

![](https://images.viblo.asia/c867aa2d-c8bd-4f75-8008-28e425fffa72.png)
Ở đây struct Animal có Identifiable là 1 protocol để định danh object, protocol này yêu cầu object phải có 1 id để xác định object duy nhất.
Ở đây mình cho id là name animal luôn (nghĩa là name sẽ là giá trị xác định cho 1 object animal, nếu mình tạo 2 animal cùng name thì sẽ lỗi. Các bạn có thể cho id = UUID(), hoặc Int, String... cũng được nhé).

![](https://images.viblo.asia/3acdbe90-d9df-408f-9e53-44511f58483d.png)

![](https://images.viblo.asia/518c04be-63a4-4ae2-a790-e09078a5ad37.png)

CollectionView thì sẽ có nhiều Item, mỗi item làm 1 con vật.
Giờ mình tạo 1 file là AnimalRow thể hiện cho 1 Item của collectionView nhé.

![](https://images.viblo.asia/475195ed-2fff-47fc-8895-792f03aa7a26.png)

Chuẩn bị đã xong.
Tiếp theo là tạo file AnimalCollectionView.
![Screen Shot 2021-06-18 at 11.48.25.png](https://images.viblo.asia/df7a4809-f6b6-4cd7-b32a-19623e9c3610.png)
LazyVGrid: là chế độ xem dạng lưới, sắp xếp các item theo chiều dọc, truyền vào coumns số cột cho grid.
(columns là 1 mảng GridItem, count = 3 nghĩa là có 3 cột)

![](https://images.viblo.asia/d975f6ff-633b-4f47-9eea-ad1b62371b48.png)

ForEach: chạy loop qua mảng animals và tạo AnimalRow với từng animal.

Giờ mình sẽ nhấn vào 1 Item vào chuyển qua màn hình detail.

Tạo màn hình AnimalDetail.
![](https://images.viblo.asia/0aa9908a-df4c-487e-8a35-077df306f176.png)

Vào file AnimalCollectionView, chỗ tạo AnimalRow sẽ sửa lại thành:
![](https://images.viblo.asia/520cf979-f1d5-4c54-8454-753c261cf903.png)

Và run app lại.

Vậy là xong rồi. Đó mấy bạn thấy dễ ghê hôn. 

Cảm ơn đã ghé ngang qua bài viết của mình nhé. :kissing_smiling_eyes: