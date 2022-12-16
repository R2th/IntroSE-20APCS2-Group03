## Introduction
![](https://images.viblo.asia/d19826b3-248b-4260-8317-fbe8dce8579e.png)

**RSpec** là một unit test framework rất phổ biến của ngôn ngữ Ruby. **RSpec** không giống như các framework `xUnit` truyền thống (vd: JUnit) vì **RSpec** là một công cụ phát triển theo hành vi. Tức là các cases được viết trong **RSpec** đều tập trung vào hành vi của ứng dụng đang được test. **RSpec** không nhấn mạnh vào cách thức hoạt động của ứng dụng, mà thay vào đó là các hành vi và luồng xử lý, hay nói cách khác là những gì mà ứng dụng đang thực sự làm. Bài viết này nhằm giới thiệu về 2 feature khá hữu dụng của **RSpec** là **filtering** và **formatter**.
## Filtering & Formatters
### Filtering
Giả sử như chúng ta có 1 file `test_spec.rb` và bên trong có chứa 2 examples tương ứng với 2 trường hợp pass (positive) hoặc fail (negative), như sau:
```ruby
RSpec.describe "An Example Group with positive and negative Examples" do 
   context 'when testing Ruby\'s build-in math library' do
      
      it 'can do normal numeric operations' do 
         expect(1 + 1).to eq(2) 
      end 
      
      it 'generates an error when expected' do
         expect{1/0}.to raise_error(ZeroDivisionError) 
      end
      
   end 
end
```
Sau khi chạy thử `test_spec.rb` chúng ta được kết quả:
```
.. 
Finished in 0.003 seconds (files took 0.11201 seconds to load) 
2 examples, 0 failures
```
Nếu như bây giờ chúng ta muốn chạy lại file `test_spec.rb` nhưng chỉ áp dụng cho một trong 2 cases là positive pass hoặc là case negative, thì chúng ta sẽ cần dùng đến **filter**:
```ruby
RSpec.describe "An Example Group with positive and negative Examples" do 
   context 'when testing Ruby\'s build-in math library' do
      
      it 'can do normal numeric operations', positive: true do 
         expect(1 + 1).to eq(2) 
      end 
      
      it 'generates an error when expected', negative: true do 
         expect{1/0}.to raise_error(ZeroDivisionError) 
      end
      
   end 
end
```
Sau khi save lại chúng ta dùng lệnh:
```
rspec --tag positive filter_spec.rb
```
Chúng ta sẽ được output:
```
Run options: include {:positive=>true} 
. 
Finished in 0.001 seconds (files took 0.11401 seconds to load) 
1 example, 0 failures
```
Bằng cách chỉ định `--tag` pass, **RSpec** sẽ chỉ chạy example chứa metadata `positive`  được định nghĩa là `true`. Tương tự cho case fail:
```
rspec --tag negative filter_spec.rb
```
Chúng ta có thể đặt các tag name theo ý muốn.
### Formatters
**Formatters** cho phép **RSpec** hiển thị ra test result output theo nhiều cách khác nhau. Giả sử như chúng ta có 1 file `formatter_spec.rb`:
```ruby
RSpec.describe "A spec file to demonstrate how RSpec Formatters work" do 
   context 'when running some tests' do 
      
      it 'the test usually calls the expect() method at least once' do 
         expect(1 + 1).to eq(2) 
      end
      
   end 
end
```
Giờ chúng ta sẽ thử chạy với option `--format progress`:
```
rspec --format progress formatter_spec.rb
```
Kết quả thu được:
```
... 
Finished in 0.002 seconds (files took 0.11401 seconds to load) 
1 example, 0 failures
```
Không có gì khác biệt so với khi chạy với câu lệnh thông thường, vì `progress` là format mặc định, giờ chúng ta sẽ thử với option `doc`:
```
rspec --format doc formatter_spec.rb
```
Kết quả:
```
A spec file to demonstrate how RSpec Formatters work 
   when running some tests 
      the test usually calls the expect() method at least once
Finished in 0.002 seconds (files took 0.11401 seconds to load) 
1 example, 0 failures
```
Như đã thấy, output giờ đang được format theo dạng document style. Tương tự với trường hợp test fail:
```ruby
RSpec.describe "A spec file to demonstrate how RSpec Formatters work" do 
   context 'when running some tests' do 
      
      it 'the test usually calls the expect() method at least once' do 
         expect(1 + 1).to eq(1) 
      end
      
   end 
end
```
Run command `rspec` khi chưa chỉ định option:
```
F 
Failures:
1) A spec file to demonstrate how RSpec Formatters work when running some tests 
the test usually calls the expect() method at least once
   Failure/Error: expect(1 + 1).to eq(1)
	
      expected: 1
         got: 2
			  
      (compared using ==)			  
   # ./formatter_spec.rb:4:in `block (3 levels) in <top (required)>'

Finished in 0.016 seconds (files took 0.11201 seconds to load)
1 example, 1 failure
Failed examples:

rspec ./formatter_spec.rb:3 # A spec file to demonstrate how RSpec 
   Formatters work when running some tests the test usually calls 
   the expect() method at least once
```
Khi có thêm option format:
```
A spec file to demonstrate how RSpec Formatters work
   when running some tests
      the test usually calls the expect() method at least once (FAILED - 1)
		
Failures:

1) A spec file to demonstrate how RSpec Formatters work when running some
   tests the test usually calls the expect() method at least once
   Failure/Error: expect(1 + 1).to eq(1)
	
   expected: 1
        got: 2
		  
   (compared using ==)
   # ./formatter_spec.rb:4:in `block (3 levels) in <top (required)>'
	
Finished in 0.015 seconds (files took 0.11401 seconds to load) 
1 example, 1 failure
```
**RSpec Formatters** cho phép chúng ta có thể thay đổi hiển thị của các kết quả test, thậm chí ta có thể tự tạo ra các định dạng format theo ý mình muốn (chẳng hạn như thay đổi màu sắc, format dạng JSON..) chi tiết có thể tham khảo thêm tại [đây](https://relishapp.com/rspec/rspec-core/v/3-7/docs/formatters).
## Summary
Bài viết này nhằm giới thiệu về 2 feature khá hữu dụng của **RSpec** là **filtering** và **formatter**. Bài viết còn nhiều hạn chế và thiếu sót, cảm ơn các bạn đã dành thời gian đọc.
Nguồn và tài liệu tham khảo:
* https://relishapp.com/rspec/rspec-core/v/3-7/docs/formatters
* https://www.tutorialspoint.com/rspec/rspec_filtering.htm