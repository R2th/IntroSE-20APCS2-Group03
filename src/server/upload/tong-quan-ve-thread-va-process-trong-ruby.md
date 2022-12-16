Trước khi tìm hiểu **Thread** và **Process** trong Ruby ta cần hiểu được 2 khái niệm **Concurrency** và **Parallelism**.
# Concurrency vs Parallelism
## Concurrency
Có thể hiểu đơn giản là Process có thể luân phiên thực hiện các task để tiết kiệm khoản thời gian "rảnh"  của mỗi task.

Ví dụ khi ta nấu mì thì cần thực hiện 2 nhiệm vụ là đun nước và bóc mì và các gói gia vị bỏ vào bát. Lúc này thay vì ngồi đợi nước sôi thì trong lúc đó ta có thể chuẩn bị mì => tối ưu hóa thời gian hơn nhiều.

Hình minh họa:
![](https://images.viblo.asia/8ee9e91b-6d55-4845-add5-311066e1dd96.png)

## Parallelism
Đơn giản là việc thực hiện nhiều task song song cùng lúc khi có nhiều Process/CPU.

Ví dụ cùng công việc nấu mì như trên nhưng có 2 người cùng làm thì một người có thể chuẩn bị mì, 1 người có thể đun nước. Do hai người cùng làm một lúc nên sẽ nhanh hơn.

Hình minh họa:
![](https://images.viblo.asia/054dcc99-330a-4c1b-8e4a-f692b55153b1.png)

# Thread vs Process
## Thread
Ruby cung cấp class **Thread** giúp ta tạo và xử lý các thread. Vậy nhiều thread có đồng nghĩa với việc code sẽ chạy nhanh hơn không ? Cùng thử một ví dụ dưới đây:

Khi không sử dụng thread:
```
require 'benchmark'

def fib(n)
	return n if [0,1].include?(n)
	fib(n-1) + fib(n-2)
end

puts Benchmark.measure { 4.times { fib(32) } }

(CPU time|system CPU time|user and system CPU times|real time)
  2.580000   0.000000   2.580000 (  2.583519)
```

Khi sử dụng thread:
```
require 'benchmark'

def fib(n)
	return n if [0,1].include?(n)
	fib(n-1) + fib(n-2)
end

puts Benchmark.measure {
	threads = []
	4.times do
	  threads << Thread.new { Thread.current[:output] = fib(32) }
	end
	threads.each { |thread| thread.join }
}

(CPU time|system CPU time|user and system CPU times|real time)
2.710000   0.020000   2.730000 (  2.726402)
```

Ta thấy thời gian thực thi gần như tương đương, đó là vì **Thread** sử dụng concurrency task. Thread có 5 status là:
* sleep: khi sử dụng Thread.stop hoặc thread đang đợi I/O
* run: khi thread đang được thực thi
* aborting: khi thread bị aborting (ví dụ sử dụng lệnh sleep)
* false: khi sử dụng Thread.exit
* nil: khi thread bị terminate khi có exception

Khi thực thi nhiều thread cùng một lúc, ruby sẽ thực hiện lần lượt từng thread một cho đến khi status không còn là run nữa. Lúc này process sẽ chuyển sang thread tiếp theo.

Do đó **Thread** sẽ chỉ thực sự hiệu quả khi trương trình có sử dụng request I/O như request đến một server khác, query database, đọc dữ liệu từ ổ cứng, ... hoặc đơn giản là có sử dụng sleep trong code. Ví dụ:

Không sử dụng thread:
```
require 'benchmark'

def fib(n)
	return n if [0,1].include?(n)
	fib(n-1) + fib(n-2)
end

puts Benchmark.measure { 4.times { fib(32); sleep(1) } }

(CPU time|system CPU time|user and system CPU times|real time)
2.650000   0.000000   2.650000 (  6.657430)
```

Sử dụng thread:
```
require 'benchmark'

def fib(n)
	return n if [0,1].include?(n)
	fib(n-1) + fib(n-2)
end

puts Benchmark.measure {
	threads = []
	4.times do
	  threads << Thread.new { Thread.current[:output] = fib(32); sleep(1) }
	end
	threads.each { |thread| thread.join }
}

(CPU time|system CPU time|user and system CPU times|real time)
2.730000   0.010000   2.740000 (  3.738425)
```

##  Process
Process sử dụng Parallelism task vì vậy nếu nhiều process được thực thi cùng lúc thì chương trình sẽ chạy nhanh hơn. Ví dụ:

Không sử dụng process:
```
require 'benchmark'

def fib(n)
	return n if [0,1].include?(n)
	fib(n-1) + fib(n-2)
end

puts Benchmark.measure { 16.times { fib(31) } }

(CPU time|system CPU time|user and system CPU times|real time)
  6.400000   0.000000   6.400000 (  6.402474)
```

Sử dụng 8 process:
```
require 'benchmark'

def fib(n)
	return n if [0,1].include?(n)
	fib(n-1) + fib(n-2)
end

puts Benchmark.measure {
	read_stream, write_stream = IO.pipe
	8.times do
	  Process.fork do
		2.times { write_stream.puts fib(31) }
	  end
	end
	Process.waitall
	write_stream.close
	results = read_stream.read
	read_stream.close
}

(CPU time|system CPU time|user and system CPU times|real time)
  0.010000   0.000000  13.280000 (  1.805481)
```

Ta có thể thấy khi sử dụng process thì code thực thi nhanh hơn rất nhiều, tuy nhiên có phải càng nhiều process thì code càng chạy nhanh ? Ta cùng thử ví dụ:

Chia task ra làm 16 process:
```
require 'benchmark'

def fib(n)
	return n if [0,1].include?(n)
	fib(n-1) + fib(n-2)
end

puts Benchmark.measure {
	read_stream, write_stream = IO.pipe
	16.times do
	  Process.fork do
		write_stream.puts fib(31)
	  end
	end
	Process.waitall
	write_stream.close
	results = read_stream.read
	read_stream.close
}

(CPU time|system CPU time|user and system CPU times|real time)
 0.040000   0.080000  13.910000 (  1.858237)
```

Ta thấy kết quả gần như tương đương với việc sử dụng 8 process do vậy không hẳn là càng nhiều process thì code càng chạy nhanh mà còn phụ thuộc vào số core của CPU nữa.

# Tài liệu tham khảo
https://naturaily.com/blog/multiprocessing-in-ruby

https://ruby-doc.org/core-2.6.3/Process.html

http://tutorials.jenkov.com/java-concurrency/concurrency-vs-parallelism.html

https://ruby-doc.org/core-2.5.0/Thread.html