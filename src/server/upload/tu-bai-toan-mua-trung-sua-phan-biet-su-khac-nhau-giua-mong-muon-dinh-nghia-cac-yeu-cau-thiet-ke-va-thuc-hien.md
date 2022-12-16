# Mở đầu

Trong giới lập trình, có một chuyện đùa khá nổi tiếng. Bản gốc tiếng Anh là:

> A wife asks her husband, a programmer, “Could you please go shopping for me and buy one carton of milk, and if they have eggs, get 6?”

Tạm dịch: Người vợ nhờ ông chồng - làm nghề lập trình đi mua đồ “Anh ơi mua cho em 1 hộp sữa. Nếu có trứng, thì mua 6 nhé!” 
![](https://images.viblo.asia/9aa478bb-6ab4-49f0-aee9-ce572bd4d16d.jpg)
Câu chuyện này thường được đem ra để nói vui về tính đãng trí của các ông chồng làm nghề lập trình viên. Tôi thì thấy câu chuyện này có case study khá thú vị, nên muốn dựa vào câu chuyện này để cùng mọi người phân tích sự khác nhau giữa “Mong muốn”, “Định nghĩa các yêu cầu”, “Thiết kế” và “Thực hiện”

Dưới đây là phần bàn luận về “Nguyên lý, nguyên tắc trong từng Phase” khi phát triển phần mềm.

#  Nguyên tắc trong từng Phase phát triển phần mềm

## 1. Mong muốn

Viết ra mong muốn của khách hàng (trong câu chuyện kia là người vợ): Công việc của Khách hàng
* Đi mua đồ, mua 1 hộp sữa. Nếu có trứng thì mua 6 nhé.

## 2. Định nghĩa các yêu cầu 1 (digest - hiểu ý)

Xem lại yêu cầu của khách hàng, làm sáng tỏ những điều chưa rõ: Công việc của PM

Trong câu chuyện trên, người chồng lập trình viên đã mua 6 hộp sữa về. Lẽ ra người chồng cần phải clear cụ thể là mua cái gì, việc này quan trọng hơn là làm theo ý muốn như vợ nói (mà thực ra anh ý đã hiểu lầm). 

Bằng việc confirm lại với vợ “Mua 6 quả trứng”, anh chồng có thể tránh được “tai nạn” mua 6 hộp sữa như đã kể trên.

* Mua 1 hộp sữa.
* Nếu có trứng thì mua 6 quả trứng.
![](https://images.viblo.asia/9fb705cf-ed8c-40be-b693-2d599d7ace53.jpg)
## 3. Định nghĩa các yêu cầu 2 (Chi tiết)

Cụ thể hóa, làm sáng tỏ hơn nữa các yêu cầu của khách hàng: Việc của PM (Project manager), SE (System Engineer)
Người chồng làm lập trình là người thông minh nên chỉ cần nghe định nghĩa yêu cầu (sơ lược) ở trên là đã có thể đưa ra kết quả - Mong muốn của Người vợ.
Tuy nhiên, nếu mối quan hệ vợ chồng này dễ bị tổn thương, ví dụ: một sai sót nhỏ cũng có thể hủy hoại mối quan hệ, thì người chồng sẽ cần phải confirm lại với người vợ.
* Dung tích của 1 hộp sữa là 1 lít.
* “Sữa” ở đây dùng để chỉ sản phẩm sữa tươi nguyên chất. Không dùng để chỉ đồ uống có thành phần từ sữa, ví dụ: sữa ít béo...v.v
* Thành phần chất béo của sữa mua về phải trên xx %
* “Trứng” dùng để chỉ trứng gà tươi. Không gồm nghĩa chỉ các loại trứng động vật khác, ví dụ: trứng cút, trứng vịt...v.v
* Nếu có sữa, thì mua về 1 hộp.
* Nếu có từ 6 quả trứng trở lên, thì mua 6 quả.
* Nếu chỉ có 5 quả trứng hoặc ít hơn, thì cũng mua trứng về.
* Nếu đơn vị nhỏ nhất để mua trứng đã được nơi bán quyết định,thì sẽ mua với số lượng nhỏ nhất lớn hơn 6 theo bội số của đơn vị bán nhỏ nhất. Ví dụ, đóng gói 4 quả 1 pack, thì sẽ mua 2 pack trứng.
* Nếu giá sữa vượt quá một mức nào đó, thì sẽ không mua sữa nữa.
* Nếu giá trứng vượt quá một mức nào đó, thì sẽ không mua trứng.
* Nếu hạn sử dụng của sữa hết trước ngày X, thì không mua sữa.
* Nếu hạn sử dụng của trứng hết trước ngày X, thì không mua trứng.
* Nếu tổng tiền vượt quá số tiền dự kiến, sẽ chỉ mua sữa.
* Nếu không thỏa mãn điều kiện mua sữa (trường hợp không có sữa thì không làm được món ăn) thì cũng sẽ không mua trứng.
* Nếu không mua sữa, thì không cần đến cửa hàng cũng được.

## 4. Thiết kế

Dựa vào định nghĩa về các yêu cầu, sẽ xác định cụ thể hơn nữa những việc cần làm: Công việc của SE (System Engineer).

Nếu người chồng thông minh hơn, anh ta sẽ không tự mình thực hiện nhiệm vụ vợ giao, anh sẽ sử dụng robot, chỉ cho nó đích xác những việc cần làm. Robot sẽ thực hiện nhiệm vụ thay cho anh ta.

Lúc này, sẽ cần phải viết lại những yêu cầu thiết yếu ghi trên ra ngôn ngữ dễ hiểu hơn cho Robot. Việc này gọi là “Thiết kế”.
Tại giai đoạn này, nếu phát hiện ra có case nào còn thiếu, chưa đầy đủ thì sẽ cần xem xét lại phần “yêu cầu thiết yếu”.
Trong nhiều trường hợp, không cần phải confirm lại phần “thiết kế” này với “người vợ”.

* Điều kiện tiền đề
  * Nếu không mua sữa thì không cần đến cửa hàng.
* Định nghĩa “Sữa”
  * Dung tích của 1 hộp sữa là 1 lít.
  * “Sữa” ở đây dùng để chỉ sản phẩm sữa tươi nguyên chất. Không dùng để chỉ đồ uống có thành phần từ sữa, ví dụ: sữa ít béo...v.v

* Định nghĩa “Trứng”
  * Là trứng gà
  * Là trứng gà nhưng phải là trứng tươi, trứng sống.
* Điều kiện mua sữa
  * Hạn sửdụng phải lớn hơn “thời hạn nhất định”
  * Thành phần chất béo của sữa mua về phải trên xx %
  * Gía phải thấp hơn một mức nhất định.
  * Tổng tiền cho 2 món đồ không được vượt quá con số dự toán.
  * Tình trạng hàng hóa tại cửa hàng: phải có từ 1 hộp trở lên.
*  Số lượng mua sữa.
   * Tối đa 1 hộp
* Điều kiện mua trứng
  * Hạn sử dụng phải lớn hơn một “thời hạn nhất định”
  * Gía phải thấp hơn một mức nhất định.
  * Tình trạng hàng hóa tại cửa hàng: Có từ 1 quả trở lên.
  * Phải thỏa mãn điều kiện “mua được sữa” (trường hợp giả định: nếu không có sữa thì không thể làm món ăn được)
  * Tổng số tiền mua sữa, trứng không được vượt quá tổng số tiền dự toán.
* Số lượng trứng sẽ mua
  * Nếu đơn vị nhỏ nhất để mua trứng đã được nơi bán quyết định,thì sẽ mua với số lượng nhỏ nhất lớn hơn 6 theo bội số của đơn vị bán nhỏ nhất. Ví dụ, đóng gói 4 quả 1 pack, thì sẽ mua 2 pack trứng.
  * Tuy nhiên, nếu số trứng tại cửa hàng còn ít quá, thì sẽ mua số lượng có thể mua được. Ví dụ, cửa hàng còn 4 quả, thì mua cả 4.
![](https://images.viblo.asia/9e96e546-0907-4f00-ab94-bd9c88a1570a.png)
## 5. Thực hiện

Dựa vào những thông tin trong phần “thiết kế”, sẽ “dịch” ra các bước, trình tự có thể hoạt động: Công việc của PG (Lập trình viên)

Trường hợp robot không thể thực hiện việc “dịch” từ ngôn ngữ Nhật, phải “dịch” ra ngôn ngữ mà robot có thể hiểu được. 

Đây là phần implement. Tuy là lập trình, nhưng bản chất là thao tác “dịch ra ngôn ngữ máy”.

Ngoài ra, để check xem việc lập trình (programming) có được tiến hành chính xác hay không, thì lập trình code test cũng sẽ có trong phase này.

### Tóm tắt
1. Mong muốn: Công việc của khách hàng
2. Định nghĩa yêu cầu 1 (digest - hiểu ý): công việc của PM (Project Manager)
3. Định nghĩa yêu cầu 2 (Chi tiết) : công việc của PM (Project Manager), SE (System Engineer)
4. Thiết kế: công việc của SE (System Engineer)
5. Thực hiện (implement): công việc của PG (lập trình viên)

# Trong thực tế

Những phần tôi viết ở trên có lẽ chỉ áp dụng được trong điều kiện lý tưởng. Còn trong thực tế lại đang khác khá nhiều.
Dưới đây là mô hình điển hình trong thực tế.
1. Mong muốn: Công việc của khách hàng
2. Định nghĩa yêu cầu 1 (Digest): Công việc của Project Manager, SE (System Engineer)
3. Định nghĩa yêu cầu 2 (Chi tiết) : Công việc của Programmer (lập trình viên)
4. Thiết kế: Công việc của Programmer (lập trình viên)
5. Thực hiện/Implement: Công việc của Programmer (lập trình viên)


Lập trình viên vẫn phải làm khá nhiều việc ngoài phạm vi của mình :v

Nói cách khác, hiện vẫn còn tồn tại không ít công ty mà PM, SE tham gia thiết kế, nhưng không cụ thể hóa, phân tích chi tiết “các yêu cầu thiết yếu 2” mà lại giao việc này cho lập trình viên.
（※Đây chỉ là ước tính mang phạm vi quan trắc cá nhân, không phải ý kiến về công ty mà bản thân mình đang trực thuộc)
# Kết bài
> A wife asks her husband, a programmer, “Could you please go shopping for me and buy one carton of milk, and if they have eggs, get 6?”

Từ câu chuyện hài nói trên, tôi mong rằng các bạn hiểu rằng tại sao:  dù là 1 vấn đề nhỏ, nhưng nhiều khi lập trình viên lại suy nghĩ khó hiểu đến mức việc xây dựng hệ thống sẽ tốn rất nhiều effort, thời gian. Câu trả lời là : Lập trình viên suy cẩn thận các yêu cầu của khách hàng.


Link bài gốc:

https://qiita.com/taruhachi/items/b8d71dd1a53768265bdc?utm_source=Qiita%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%B9&utm_campaign=d4b326c10b-Qiita_newsletter_353_03_13_2019&utm_medium=email&utm_term=0_e44feaa081-d4b326c10b-33433141

Sưu tầm & Dịch bài: *Thanh Thảo*