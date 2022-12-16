> Bạn Method.
> 
> Chả ai béo nhanh bằng bạn này vì bạn ý có khả năng ăn (nhận argument) và ** (trả về value).
> 
> Xử lí giống này thì có ti tỉ chuyện để bàn, nhưng trước hết chúng ta sẽ không cạy khóe gì việc ăn & **
> của bạn ý mà thay vì đó tập trung giúp bạn giảm cân.
> 
```ruby
# Ảnh chụp của một bạn Method bị "mũm mĩm"
def hoc_hanh(diem_thi_vua_roi, diem_trung_binh)
  chenh_lech_toi_da = 1 # lệch quá 1 điểm là no đòn
  sach = Sach.find_by(studying: true)
  
  if (diem_trung_binh - diem_thi_vua_roi > chenh_lech_toi_da)
    # đọc sách
    sach.pages.each do |p|
      read p if p.ly_thuyet?
    end
    
    # làm bài tập
    sach.pages.each do |p|
      thuc_hanh p if p.bai_tap?
    end
  elsif (diem_trung_binh - diem_thi_vua_roi < chenh_lech_toi_da
         && diem_thi_vua_roi - diem_trung_binh < chenh_lech_toi_da)
    # quẩy lên
    pc = PC.find_by(mine: true)
    pc.turn_on
    play(pc)
  else
    bo_hoc # bạn bá cmn đạo rồi!!
  end
end
```

Quá kinh dị! Cơ mà, để giúp bạn này, chúng ta vẫn có đôi ba cái cách.

### Đẩy bớt code ra ngoài (Extract method)
Như cái tên gọi, cách này đơn giản là tách một method to rất to thành nhiều method bé nhỏ.
Dấu hiệu ở đâu? Với mỗi block code, thường sẽ có một comment nhỏ nhỏ để giải thích đoạn code đó làm gì.
Ở đây, ta hoàn toàn có thể lôi đoạn code đó ra thành một method riêng, với cái tên method mới là ... bạn đoán xem, nó chính là cái comment!
```ruby
  # đọc sách
  def hoc_hanh...
    ...
    sach.pages.each do |p|
      read p if p.ly_thuyet?
    end
	...
  end
  # => có thể viết thành
  def hoc_hanh...
    ...
    doc(sach)
	...
  end
  
  def doc(sach)
    sach.pages.each { |p| read p if p.ly_thuyet? }
  end
```
Lợi ích? Dễ thấy trước hết là method hoc_hanh sẽ trở nên rõ đọc hơn, và nếu người đọc quan tâm đên việc bạn đọc sách như thế nào,
thì họ sẽ chuyển xuống và đọc method bên dưới. Lợi ích lâu dài? Sau này, nếu việc đọc sách bị thay đổi, như là chỉ đọc phần tóm tắt,
hay chỉ đọc phần được highlight, thì bạn sẽ dễ dàng thấy được sừa đâu cho đúng. Và hơn nữa, việc viết test sẽ trở nên nhẹ nhàng hơn bao giờ hết.


### Đẩy hết biến tạm thời ra ngoài (Extract local variables)
Biến tạm thời là không thể thiếu, nhưng xài nó thì giống như hút cần vậy, ít thì tốt(???) mà nhiều thì thành sai.
Ví dụ:
```ruby
  # ta sẽ lôi thử biến sach ra ngoài
  sach = Sach.find_by(studying: true) # ==> xóa dòng này
  
  # thêm hàm này
  def sach
    Sach.find_by(studying: true)
  end

```
Một lần nữa, người đọc sẽ không cần phải quá bận tâm xem *sach* là cái gì. Tuy nhiên, nhiều bạn tinh mắt (và kĩ tính) sẽ cảm thấy *ngứa ngáy* với đoạn refactor này.
Nếu để ý kĩ, bạn sẽ thấy đoạn code trên được thực hiện nhiều lần, mỗi khi ta gọi method *sach*, như vậy thì rõ ràng là thọt về hiệu năng.
Vì vậy, xin hãy lưu ý với tôi vài điểm sau:
- Máy tính thời nay trâu rồi, nên nhiều khi hi sinh một tí hiệu năng không đáng kể để cải thiện "chất lượng hiển thị" của code là cần thiết.
- Cơ mà, nếu đoạn code trên có thực hiện kết nối với database (hay với bất kì service bên ngoài nào) thì chúng ta tuyệt đối không sử dụng.
- Nếu bạn dùng Rails, ActiveRecord sẽ giúp ta cache lại giá trị nếu câu lệnh SQL vẫn vậy, nên hàm trên nếu gọi tới database, thì cũng chả sao cả.

### Giấu bớt các điều kiện dài loằng ngoằng (Extract conditions)
Các đoạn điều kiện dày đặc làm method to ra trông thấy, nhưng điều đáng bận tâm là: thường thì các đoạn điều kiện rất khó hiểu.
Thường thì chúng ta có thể lôi các điều kiện ra các method riêng như xài "extract method", tuy nhiên nó sẽ làm tăng số lượng method có trong class.
Tất nhiên nhiều method thì tốt, nhưng nhiều quá thì lại khác, code sẽ trở nên thiếu nhất quán và tự nhiên lại thành khó đọc hơn.
Vì vậy, với những class chứa đông đảo method quá rồi, thì tôi lại khoái dùng biến tạm thời hơn, method sẽ không gầy đi mà thậm chị còn to ra chút đỉnh,
cơ mà đây là béo khỏe béo đẹp, nên ai cũng yêu =)
```ruby
  def hoc_hanh(diem_thi_vua_roi, diem_trung_binh)
    ...
	hoc_kem = diem_trung_binh - diem_thi_vua_roi > chenh_lech_toi_da
	hoc_tot = diem_trung_binh - diem_thi_vua_roi < chenh_lech_toi_da
              && diem_thi_vua_roi - diem_trung_binh < chenh_lech_toi_da
    
	if hoc_kem
	  ...
	eslif hoc_tot
	  ...
	else
	  bo_hoc # bạn bá cmn đạo rồi!!
	end
  end
```
Lưu ý, với những đoạn điều kiện đơn giản và tương đối rõ ràng rồi, thì không nhất thiết phải tách ra, vì dù sao coder chúng ta đều là những con người sáng dạ cả =)


### Như vậy
chỉ với 3 bước xử lý đơn giản tới mức cơ bản, chúng ta đã có một bạn method xinh đẹp thon thả như sau :3
```ruby
  def hoc_hanh(diem_thi_vua_roi, diem_trung_binh)
    chenh_lech_toi_da = 1 # cái này đẹp nhất là ném vô file config
	hoc_kem = diem_trung_binh - diem_thi_vua_roi > chenh_lech_toi_da
	hoc_tot = diem_trung_binh - diem_thi_vua_roi < chenh_lech_toi_da
              && diem_thi_vua_roi - diem_trung_binh < chenh_lech_toi_da
  
    if hoc_kem
	  doc(sach)
	  lam_bai_tap(sach)
    elsif hoc_tot
      quay_len
    else
      bo_hoc # bạn bá cmn đạo rồi!!
    end
  end
  
  def my_sach
    Sach.find_by(studying: true)
  end
  
  def quay_len
    pc = PC.find_by(mine: true)
    pc.turn_on
    play(pc)
  end
  
  def doc(sach)
    sach.pages.each { |p| read p if p.ly_thuyet? }
  end
  
  def lam_bai_tap(sach)
    sach.pages.each { |p| practice p if p.bai_tap? }
  end
```

Stay fit & happy refactoring!! =)))