Một vài lưu ý trước khi bắt đầu.

* Code demo trong bài sẽ sử dụng rspec, capybara, factory_bot (Ruby/Rails), hướng tới đối tượng Web developer.
* Bài viết không tránh khỏi thiếu sót, nếu có chỗ nào không đúng, mọi người cứ quăng gạch ở dưới comment :v

Ông cha ta có câu "Dục tốc bất đạt". Trước khi đi vào chi tiết, ta hãy cùng điểm qua một vài khái niệm trước.
# 1. Test là gì?

Nếu bạn là một developer, chắc hẳn sẽ không lạ lẫm gì khái niệm "testing". 

Ví dụ khi bạn lập trình chức năng đăng nhập của 1 trang web. Sau một hồi hì hục code, chắc hẳn bạn sẽ vào trang đó, tiến hành đăng nhập, rồi chờ xem code mình có chạy đúng hay không :v

Tuy nhiên giờ đây, đa số đều sử dụng các automated test script để tự động hóa quá trình test. Hơn thế, nó còn giúp những người maintainer sau này có thể hiểu ~~cái đống hổ lốn~~ code bạn để lại chạy như thế nào.

Test khác với Debug.

Các loại test nên chú ý:

* Unit test: test riêng lẻ từng class/function, viết khá dễ.
* Integration test, Feature test: ở đây bắt đầu có sự kết hợp giữa nhiều module với nhau để mô tả 1 (hay nhiều) chức năng của ứng dụng.

Màu sắc đặc trưng:

* Đỏ: xin chia buồn test của bạn đã tạch =))
* Xanh: chúc mừng, test đã pass, code của bạn "có thể" đã chạy đúng.

# 2. TDD - Test Driven Development

Dịch ra thì sẽ là **Phát triển với trọng tâm là kiểm thử (test)**, hay nôm na là test trước code sau.

![TDD](https://images.viblo.asia/bd25076f-2ddb-4b27-888e-d58ab8e8c286.png)

* Trước tiên ta viết các test script và chạy chúng, tất nhiên là sẽ fail vì làm gì có code =))

  VD ta muốn viết 1 hàm tính số Fibonacci:

  ![Fibonacci](https://wikimedia.org/api/rest_v1/media/math/render/svg/6693d2c78bc8132bb9b65be861148ca574a738ef)

  ```ruby
  # spec/fibonacci_spec.rb
  describe "#fibonacci_of" do
    context "one" do
      it "returns 1" do
        expect(fibonacci_of(1)).to eq 1
      end
    end
    
    context "two" do
      it "returns 1" do
        expect(fibonacci_of(2)).to eq 1
      end
    end
    
    context "greater than two" do
      it "returns sum of two elements before" do
        expect(fibonacci_of(4)).to eq 3
      end
    end
  end
  ```

* Rồi ta mới bắt tay vào code, chạy test, nếu fail thì lại hì hục sửa, hỏng đâu vá đó. Lúc này bạn chưa cần bận tâm về việc code mình có dễ hiểu/đẹp không. 

  Và sau 1 hồi thì cuối cùng test ta cũng pass :v

  ```ruby
  # fibonacci.rb
  def fibonacci_of(n)
    case n
    when 1
      1
    when 2
      1
    else
      fibonacci_of(n - 1) + fibonacci_of(n - 2)
    end
  end
  ```

* Ta sẽ nhìn lại đống hổ lốn mà ta vừa viết ra, tỉa tót lại cho đẹp mắt, tách service các thứ. Và nhớ rằng đừng làm cho test đỏ lòm.

  ```ruby
  # fibonacci.rb
  def fibonacci_of(n)
    return 1 if [1, 2].include?(n)
    fibonacci_of(n - 1) + fibonacci_of(n - 2)
  end
  ```

**Lưu ý:** Không phải cứ test pass là app của ta đã chạy đúng, việc này còn bao gồm nhiều yếu tố khác như

* Ta có hiểu đúng yêu cầu của khách hàng không
* Test của ta đã bao gồm hết các trường hợp có thể chưa


Có thể dễ dàng nhận thấy, hàm `#fibonacci_of` ở trên sẽ chết ngay lập tức nếu gặp tham số `<= 0`.


# 3. BDD - Behavior Driven Development

![BDD](http://blog.andolasoft.com/wp-content/uploads/2015/05/TDD-vs-BDD.jpg)

Kế thừa người tiền nhiệm TDD với phương châm "Test trước code sau", BDD chỉ khác chút là ta sẽ tập trung vào hành vi người dùng (feature).

Theo đó, ta sẽ viết các feature test trước (mô tả một tính năng của ứng dụng, hoặc usecase/userstory). Với mỗi feature test đó, ta có thể sẽ phải triển khai thêm 1 vài unit test/integration test cho các class/function cần thiết trong feature test.



Ví dụ: Ta muốn xây dựng tính năng tạo album cho ứng dụng quản lý album nhạc.

Trước hết hãy hình dung tính năng này trong đầu:

> Admin từ trang index albums (/albums), bấm nút "Add album", 1 form sẽ hiện ra để nhập thông tin album (bao gồm title và artist name). 
>
> Nếu anh admin này nhập đúng, hãy redirect sang trang index và hiển thị album mới này, còn không thì hãy hiện lỗi để anh admin còn biết đường mà lần.

Feature test của ta sẽ như sau:

```ruby
# spec/features/create_album_spec.rb
RSpec.feature "album creating process", type: :feature do
  context "all fields are filled correctly" do
    it "create a new album" do
      visit '/albums'
      click_link 'Add album'

      within 'form#album_form' do
        fill_in 'Title', with: 'Chay ngay di'
        fill_in 'Artist name', with: "Sep'ss"
      end
      click_button 'Create'

      expect(page).to have_content('Chay ngay di')
    end
  end
  
  context "title is blank" do
    it "show errors" do
      visit '/albums'
      click_link 'Add album'

      within 'form#album_form' do
        fill_in 'Artist name', with: "Sep'ss"
      end
      click_button 'Create'

      expect(page).to have_content("Title can't be blank")
    end
  end
end

```

Nếu làm theo đúng flow của Rails, ta sẽ phải viết unit test cho:

* Controller: index, create - test xem logic bên trong đã đúng chưa, status code ra sao.
* View: new, index - test xem trường hợp có lỗi thì form hiển thị sao, hay trường hợp không có album thì view index có thông báo cho người dùng biết hay không.
* Model: album - test xem validate có hoạt động hay không.

Chi tiết thì mình xin lược bớt vì dài quá, bạn có thể tham khảo thêm ở [đây](http://hanamirb.org/guides/1.2/getting-started/).

Nếu bạn băn khoăn nên test cái gì trong Rails, có thể tham khảo bài [này](https://m.patrikonrails.com/how-i-test-my-rails-applications-cf150e347a6b).

# 3. Các nguyên tắc khi viết test (TDD)

1. Chỉ viết code khi nó cần thiết để test của bạn pass.

   VD bạn viết một hàm lấy về email của người dùng theo `id`.

   ```ruby
   def get_user_mail_by_id(id)
     user = User.find(id)
     user.mail
   end
   ```

    Ở đây bắt buộc phải truy vấn CSDL để tìm ra user. Không dùng `find` thì lấy thông tin user thế nào :v

2. Chỉ viết nên unit test trong phạm vi vừa đủ.

# 4. Ưu điểm

* Những người não to trên thế giới đã chứng minh được TDD giúp thay đổi mindset của bạn, và bạn sẽ trở thành những lập trình viên tốt hơn.

  Nó đòi hỏi bạn phải thu tập trung hơn vào những chi tiết nhỏ để test của mình pass, hơn là suy nghĩ vẩn vơ về cả cái app to đùng.

* Ngoài kiểm thử, test cũng là docs cho maintainer sau này, nó cung cấp chi tiết về các đặc tả kỹ thuật (specification) của app.

* Ít bug hơn, dễ bảo trì, phát hiện lỗi sớm.

* Cho bạn biết code mà bạn vừa viết xong nó làm hỏng cả app không =))

# 5. Kết luận

* TDD/BDD thực sự rất tốt, nếu bạn muốn trở thành một lập trình viên tốt hơn, hãy cố gắng tryhard :v

* Thường mọi người hay có xu hướng code xong mới viết test, và mình cũng là một trong số đó =)). Tuy vậy, hãy cố gắng viết test case của mình thật minh bạch, dễ hiểu, vì chính bản thân ta và các maintainer sau này.

# 6. Tham khảo

* [Test-Driven Development (TDD) Resource Site](https://medium.com/pacroy/test-driven-development-tdd-resource-site-tdd-pacroy-com-a02e02396f32)
* [Rails: Things you must know about TDD and BDD](http://blog.andolasoft.com/2014/06/rails-things-you-must-know-about-tdd-and-bdd.html)
* [9 Benefits of Test Driven Development](https://www.madetech.com/blog/9-benefits-of-test-driven-development)
* [20 ADVANTAGES OF TEST DRIVEN DEVELOPMENT](https://apiumhub.com/tech-blog-barcelona/advantages-of-test-driven-development/)
* [Hanami Official Guide](http://hanamirb.org/guides/1.2/getting-started/)

* [How I test Rails applications](https://m.patrikonrails.com/how-i-test-my-rails-applications-cf150e347a6b)