> Bạn sẽ ngạc nhiên khi để ý kĩ rằng vòng lặp chiếm tương đối nhiều thời gian chạy cũng như lượng code. Chính vì đó, người ta luôn luôn muốn cải thiện sức mạnh và độ xinh đẹp của vòng lặp. Ở trong Python, điều này đạt được với `comprehension`, nghe thật lạ lẫm nhưng cơ bản là trông em nó về cơ bản sẽ như sau: `team_dốt_có_đào_tạo = [đào_tạo(noob) for noob in team_dốt_bẩm_sinh]`
> 
### Điều làm ai cũng ngứa ngáy
Mỗi khi phải lặp qua cái array để làm gì đó, trong nhiều trường hợp, chúng ta thường tránh chỉnh sửa trực tiếp trên array đó, mà thay vì vậy mà tạo 1 cái mới cho đỡ động chạm.
```python
    ### Vấn đề muôn thuở về concurency
    foods = ['cơm rang dưa bòi', 'bún bòi']
    for f in foods:
        friend.cho_rất_nhiều_ớt(f)'
    # foods = ['cơm rang dưa bòi rất nhiều ớt', 'bún bòi rất nhiều ớt']
    for f in foods:
        you.eat(f)   # RIP
        
     ### Nếu bạn không ăn được ớt, thì chúng ta sẽ cấm thằng kia động vào hiện vật:
    friend_foods = []
    for f in foods:
        friend_foods.append(friend.cho_rất_nhiều_ớt(f))
       
    # và như vậy, hiện vật được giữ yên và bạn an toàn.
```
Các chỗ gây ngứa
1. Những 3 dòng code cho 1 quá trình transform 1 cái array

    với javascript ta có thể: `doubles = numbers.map(n => n * 2)`
    
    với ruby ta có thể: `doubles = numbers.map{ |n| n * 2 }`
2. Lúc nào cũng phải khởi tạo 1 cái biến rỗng mới cùng loại với cái mình cần biến đổi (trong trường hợp này là array)

### Tự gãi?
Nếu bạn chạy `dir([1,2,3])` thì sẽ thấy rằng chả có cái hàm #map, #each, etc. cho chúng ta dùng cả.
Với độc giả ưa khám phá, thì tôi xin gợi ý là chúng ta cũng có thể tự viết 1 cái hàm như sau:
```python
     def map(array, callback):
         new_array = []
         for e in array:
             new_array.append(callback(e))
         return new_array
             
     # với cái helper này thì sẽ làm ta cảm thấy khá hơn. Một chút.
```

### Batteries included
"Battery included" là một từ mà dev python khá thích xài, vì cơ bản với cái standard library to tổ chảng đã cung cấp cho chúng ta vô vàn các phụ kiện hay ho rồi, và cái `comprehension` chính là thứ mà chúng ta cần lúc này.
```python
    # quay lại cuộc ăn chơi
    friend_foods = [ friend.cho_rất_nhiều_ớt(f) for f in foods ]
    # done!
```
"WTF!! Cái gì đây? Sao không dùng " là câu nói chúng ta thường gặp đối với những người đầu tiên thấy nó (tất nhiên là trừ bạn ra vì tôi cá chắc bạn cũng thấy khá ngứa với 3 dòng xử lí cồng kềnh ở trên rồi).
Nó chả hề phức tạp chút nào cả:
1. Một đống code ở trong ngoặc thì nó là `comprehension`.
2. Viết code như viết văn: "cho ớt điên loạn với mỗi món ở trong foods, và ta có friend_foods"

"Tôi muốn filter, chắc không có rồi"
```python
  friend_foods = [ ........................................... if f.chưa_đủ_độ_cay()]
  # bồi thêm câu điều kiện, và ta có một cái filter
```

### Not only array, let's do with dict!!!
```python
  # đơn giản là ta chuyển ngoặc tròn thành ngoặc nhọn, và đổi syntax của phần tử, done!
  new_dict = { transform(key): transform(val) for (k,v) in dict }
```

### Even more, let's do with set!!!
cái này thì quá trớn rồi :\_v

### Chốt
Như vậy, comprehension đã giúp chúng code chúng ta trở nên xinh đẹp hơn. Tuy nhiên là phần cải thiện hiệu năng hứa hẹn bên trên chưa thấy đả động gì cả, nên là xin hẹn gặp lại các bạn vào phần sau, chúng ta sẽ gặp gỡ `Generator`. (thanks you)