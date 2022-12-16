# Đối tượng
Có một lượng kiến thức về async/await.

Đã từng sử dụng async/await nhưng chưa nắm rõ lắm.

# Vì tính tiện lợi nên sử dụng async/await trong mọi trường hợp !
Sẽ có nhiều ý kiến cho rằng nên như thế, nhưng thực tế đây là một cú lừa.
Nếu như không chú ý hiểu rõ sẽ mang lại cảm giác không hiệu quả. Bài viết này sẽ là một dẫn chứng cho điều đó. 
Tuy nhiên, thay bằng giải thích bằng cách thông qua source code, mình sẽ tham chiếu vào cách làm món mỳ **Ramen** để sinh động và dễ hình dung hơn. 
![](https://images.viblo.asia/bee729ca-6478-49b6-8aed-2007fce99c2b.jpg)

# Cùng bắt tay vào chế biến món Ramen nào !
Hơi đường đột, nhưng bạn sẽ đảm nhận vai chủ tiệm mỳ. 
Tọng tiệm mỳ của bạn có 3 nhân viên tay nghề giỏi đảm nhận những mảng sau :  
Phụ trách mỳ. 
Phụ trách soup
Phụ trách phụ gia
(chắc bạn cũng từng nhìn thấy format này ở đâu đó rồi phải không).

Tiếp đến, để tạo món Ramen:
1. Nhân viên phụ trách mỳ sẽ luộc mỳ lên. 
2. Nhân viên phụ trách soup sẽ chế soup.
3. Nhân viên phụ trách tạo phụ gia để nướng thịt lợn và cắt lát mỏng. 
Đây là các bước cần thiết để hoàn thành món Ramen. 

# Chuẩn bị API nào !
Cùng tưởng tượng coi như chúng ta đã được chuẩn bị trước những API như dưới đây: 
| End point | End point | Overview |
| -------- | -------- | -------- |
| /noodle | GET | get Mỳ |
| /soup     | GET     | get Soup     |
| /pork     | GET     | get PG     |
| /ramen     | POST     | tạo Ramen     |
Chiến thôi！

# Quá đơn giản, dễ như ốp mỳ. 
```
async () => {

  // Nhân viên phụ trách mỳ sẽ luộc mỳ lên. 
  const noodles = await axios.get('/noodle');

  // Nhân viên phụ trách soup sẽ chế soup.
  const soup = await axios.get('/soup');

  // Nhân viên phụ trách tạo phụ gia để nướng thịt lợn và cắt lát mỏng.
  const pork = await axios.get('/pork');

  // Finish Ramen.
  const ramen = await axios.post('/ramen', {
    noodles,
    soup,
    pork
  });

  return ramen;
}
```
Ok, có vẻ ổn rồi sắp có Ramen ăn, nhưng với cách làm này thì **NG**.


**Cái bẫy await**

Khi sử dụng await thì những xử lý bên trong async function sẽ tạm thời tạm dừng cho đến khi kết quả Promise của function được chỉ định trả về kết quả.
Vậy có nghĩa là ???

`await axios.get('/noodle');`

Sẽ wait những xử lý cho đến khi có kết quả của **/noodle'** trả về. 
Trong time đo thì  /soup /pork  sẽ ko được request. 
Nghĩa là : 
Đợi đun sôi xong Mỳ mới bắt đầu chế biến Soup
Đợi chế soup xong mới bắt đầu thái thịt nướng. 
Đại khái là như thế thì sẽ mất đi tính hiệu quả trong khi chủ tiệm như bạn phải trả lương cho cả 3 nhân viên trong cùng một thời điểm！
Vậy là đợi cho đến khi finish tất cả thì bạn có thể hình dung Mỳ sẽ ntn rồi đó. 

Vậy giải pháp ở đây, đó là không nhất thiết phải đợi từng người một hoàn thành mới tiến hành làm các công đoạn tiếp theo,bạn trả tiền lương cho nhân viên vì vậy bạn muốn cùng một lúc bạn sẽ chỉ thị cả 3 nhân viên cùng làm việc, không phụ thuộc vào ai cả. 

# Cụ thể nên làm như thế nào？
Dịch timing await.
```
async () => {

  // Nhân viên phụ trách mỳ cứ luộc mỳ lên. 
  const noodlesPromise = axios.get('/noodle');

  // Nhân viên phụ trách soup cứ chế soup.
  const soupPromise = axios.get('/soup');

  // Nhân viên phụ trách tạo phụ gia cứ nướng thịt lợn và cắt lát mỏng.
  const porkPromise = axios.get('/pork');

  // Wait cả 3 nhân viên hoàn thành công việc.
  const noodles = await noodlesPromise;
  const soup = await soupPromise;
  const pork = await porkPromise;

  // Finish Ramen
  const ramen = await axios.post('/ramen', {
    noodles,
    soup,
    pork
  });

  return ramen;
}
```
![](https://images.viblo.asia/90a29fe2-38a2-4ce2-ae72-648b4210a42f.jpg)
Done！Đánh chén！

# Tóm tắt
Với những nội dung ở trên chúng ta đang có một bát Ramen nóng hổi vừa thổi vừa ăn vào những ngày đông se lạnh rồi.  Nhưng các bạn đừng quên nhé: 

**Cần thiết phải chờ thì chờ + chờ ở đâu + chờ ở thời điểm nào, không cần thiết thì thui ko chờ nữa **