## Giới thiệu
Nếu các bạn đã từng viết unit test với rspec trong ruby on rails, chắc hẳn sẽ không xa lạ gì với hàm `subject` 
Khi sử dụng `subject` ta cần lưu ý một vài điều như sau:
* `subject` sẽ không được gọi thực thi khi khai báo, mà chỉ được thực thi khi gọi tới nó (Xem ví dụ phía dưới để hiểu cụ thể)
* hàm `subject` sẽ chỉ được thực thi một lần trong mỗi một block test (một example)
* hàm `subject` sẽ được thực thi lại trong các block test khác nếu trong block test này có gọi tới subject.

## Ví dụ
Dưới đây là ví dụ chỉ rõ 3 chú ý trên:
### 1.  subject chỉ được thực thi khi gọi tới nó (chứ không phải khi khai báo subject)
```
RSpec.describe Human, type: :model do

  context 'high iq' do
  	subject(:smart_human) {
  		@something = 0
  		Human.new(iq: 3)
  	}

  	it 'expect iq equal 3' do
          expect(@something).to eq 0
          expect(subject.iq).to eq 3
  	end
  end
end
```

câu lệnh `expect(@something).to eq 0` sẽ không được pass vì `@something` ở đây vẫn đang có gía trị nil? Vì trong block test này (block nằm giữa 2 từ khóa do ... end của it) hàm `subject` chưa hề được gọi trước câu lệnh `expect(@something).to eq 0` nên `@something` chưa được khởi tạo.

Để đoạn code trên pass hết, ta có thể hoán đổi 2 expect để hàm `subject` được gọi trước.
```
RSpec.describe Human, type: :model do

  context 'high iq' do
  	subject(:smart_human) {
  		@something = 0
  		Human.new(iq: 3)
  	}

  	it 'expect iq equal 3' do
          expect(subject.iq).to eq 3
          expect(@something).to eq 0
  	end
  end
end
```
### 2. Hàm subject chỉ được thực thi một lần trong một block test

```
RSpec.describe Array do
  element_list = [1, 2, 3]

  subject { element_list.pop }

  it "is memoized across calls (i.e. the block is invoked once)" do
    expect {
      3.times { subject }
    }.to change{ element_list }.from([1, 2, 3]).to([1, 2])
    expect(subject).to eq(3)
  end

end
```
Ở vd trên, dù hàm `subject` có được gọi 3 lần đi chăng nữa thì cũng chỉ được thực thi một lần, đoạn code `3.times { subject }` hoàn toàn giống với toán tử `||=` trong ruby:
```
>> element_list = [1, 2, 3]
>> subject ||= element_list.pop
=> 3
>> element_list
=> [1, 2]
>> subject ||= element_list.pop
=> 3
>> element_list
=> [1, 2]
>> subject
=> 3
```
### 3. Hàm subject sẽ được thực thi lại trong các block test khác
Viết thêm một block test vào ví dụ trên như sau:
```
RSpec.describe Array do
  # This uses a context local variable. As you can see from the
  # specs, it can mutate across examples. Use with caution.
  element_list = [1, 2, 3]

  subject { element_list.pop }

  it "is memoized across calls (i.e. the block is invoked once)" do
    expect {
      3.times { subject }
    }.to change{ element_list }.from([1, 2, 3]).to([1, 2])
    expect(subject).to eq(3)
  end

  it "is not memoized across examples" do
    expect{ subject }.to change{ element_list }.from([1, 2]).to([1])
    expect(subject).to eq(2)
  end
end
```
Lúc này, ở block test thứ 2, hàm `subject` sẽ được thực thi lại (mỗi block test chỉ thực thi nhiều nhất một hàm subject).

Chú ý: Ở ví dụ trên, vì block test thứ nhất đã lấy ra phần tử `3` của `element_list` rồi nên block test thứ 2 chỉ còn lại `[1, 2]`, lúc này hàm `subject` được thực thi lại với `element_list` mới này.

 ## Kết luận
 Qua 3 ví dụ ngắn trên mình đã nói lại về cách sử dụng `subject` khi viết unit test với rspec trong ruby on rails. Hy vọng bài viết sẽ giúp mọi người hình dung rõ hơn về `subject`.
 Cám ơn mọi người đã đọc bài viết của mình.
 ## Nguồn
 https://relishapp.com/rspec/rspec-core/v/3-6/docs/subject/explicit-subject
 https://stackoverflow.com/questions/44224113/how-subject-work-in-rspec-in-ruby-on-rails/44224171#44224171