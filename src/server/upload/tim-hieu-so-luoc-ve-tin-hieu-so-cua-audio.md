Đầu tiên giả sử bạn đặt tần số lấy mẫu từ mic của bạn ở 8000hz, và chọn một kích thước chunk là 2048 để capture từ mic của bạn.
bạn sẽ có độ phân giải tần số = 3,9063 (8000/2048).

Để có được tần số của bất kỳ đỉnh nào, bạn có thể lấy như sau:
```
freq = i * Fs / N;
```
Trong đó

freq = tần số (Hz)

i =index của peak

Fs = tần số lấy mẫu (ví dụ: 8000 Hz trong trường hợp ta đang nói đến)

N = kích thước của FFT (ví dụ: 2048 trong trường hợp ta đang nói đến)

như vậy bạn sẽ có tần số tại các đỉnh là

1 -> 3,90625 hz

2 -> 7.8125 hz

3 -> 11.71875 hz

...

1024 -> 4000 hz

...

2048 -> 8000 hz

Theo mình hiểu thì dữ liệu sẽ được mô tả bởi tập hợp các số phức ,

mỗi số phức có thể biểu đạt độ lớn của tần số

với các phần thực là ở index 2 * i, 

các phần ảo nằm ở index 2 * i + 1.

Để có được độ lớn của phổ tại index i bạn làm như sau:

phần thực
```
real = fft [2 * i];
```

phần ảo
```
imaginary  = fft [2 * i + 1];
```

độ mạnh của của tần số đc tính bằng modun của số phức
```
magnitude [i] = sqrt (real * real + imaginary * imaginary);
```
lưu ý nếu bạn không áp dụng một window function phù hợp với dữ liệu đầu vào miền thời gian thì bạn sẽ nhận được một lượng rò rỉ quang phổ nhất định và phổ sẽ có vẻ "bị bẩn".

Để mở rộng thêm về điều này, đây là pseudo-code cho một ví dụ hoàn chỉnh, mà mình lấy dữ liệu âm thanh và xác định tần số của đỉnh lớn nhất:

```
N = 1024          // size of FFT and sample window
Fs = 44100        // sample rate = 44.1 kHz
data[N]           // input PCM data buffer
fft[N * 2]        // FFT complex buffer (interleaved real/imag)
magnitude[N / 2]  // power spectrum

capture audio in data[] buffer
apply window function to data[]

// copy real input data to complex FFT buffer
for i = 0 to N - 1
  fft[2*i] = data[i]
  fft[2*i+1] = 0

perform in-place complex-to-complex FFT on fft[] buffer

// calculate power spectrum (magnitude) values from fft[]
for i = 0 to N / 2 - 1
  re = fft[2*i]
  im = fft[2*i+1]
  magnitude[i] = sqrt(re*re+im*im)

// find largest peak in power spectrum
max_magnitude = -INF
max_index = -1
for i = 0 to N / 2 - 1
  if magnitude[i] > max_magnitude
    max_magnitude = magnitude[i]
    max_index = i

// convert index of largest peak to frequency
freq = max_index * Fs / N
```