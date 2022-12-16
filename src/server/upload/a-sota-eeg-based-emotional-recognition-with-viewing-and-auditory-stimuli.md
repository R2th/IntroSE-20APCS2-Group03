Quay lại với chủ đề bài viết lần này, mình sẽ chia sẻ với mọi người 1 chủ đề nghiên cứu mà mình đang làm gần đây, EEG hay còn gọi là sóng não hoặc điện não đồ. EEG không còn mới tuy nhiên nó lại chưa thực sự phổ biến và các researchs về nó cũng chưa có nhiều. Nguyên nhân chính là do thiếu dữ liệu, máy móc trang thiết bị cho bài toán này cũng như ngoài các kỹ năng, kiến thức về AI, xử lý tín hiệu nó còn đòi hỏi về các mảng khác liên quan đến y sinh, sinh lý học, tâm lý học... Hiện nay, EEG có khá nhiều ứng dụng , ngoài các bài toán liên quan đến não người, cảm xúc thì nó còn được sử dụng để làm tăng độ chính xác cho các bài toán NLP, recommendation system (music...) hay thậm chí là liên quan đến `Infant inheritance`, vân vân và mây mây. Ngoài ra trong một số bài toán, ngoài EEG dữ liệu về mắt Eye Tracking cũng được sử dụng, các bạn có thể tham khảo thêm các papers kết hợp 2 loại dữ liệu này tại [đây](http://www2.hu-berlin.de/eyetracking-eeg/papersusing.html)

Ở bài viết này, mình sẽ cùng nhau đi phân tích một nhánh nhỏ của EEG, Emotional Recognition (nhận diện cảm xúc). Bài viết được xây dựng dựa trên nội dung của một paper, sử dụng movie làm nguồn gây kích thích cảm xúc, thuật ngữ chuyên nghành gọi là sound, pictoral stimulus. Mọi người tham khảo thêm tại [đây](https://www.researchgate.net/publication/313015621_Real-Time_Movie-Induced_Discrete_Emotion_Recognition_from_EEG_Signals).

*** Bài viết gồm những nội dung chính sau:
- Giới thiệu về EEG
- EEG contaminations và một số solutions
- Giới thiệu bài toán `EEG-based Emotional Recognition`
- Xây dựng bộ dữ liệu 
- EEG Data Acquisition, Preprocessing, Feature Extraction and Normalization
- Emotion Classification with Feature Selection 


## I. EEG Introduction

![](https://images.viblo.asia/5946d8a6-e4e5-4c50-8e9f-db573b9e1511.jpg)
Hình minh hoạ EEG

EEG (Electroencephalography) là một loại dữ liệu dạng sóng thu được từ não bằng cách sử dụng một bộ công cụ chuyên biệt có các cực (hay còn gọi là electrodes) đặt trên da đầu của người. Số lượng các electrodes này thường sẽ là 32, 64, 128 và cũng có thể là 2, 14 và 256 cực, số lượng càng lớn càng tỉ lệ thuận với độ đa dạng, độ chi tiết của dữ liệu mà não đang có ý định mô phỏng.

Các thuật ngữ về dữ liệu EEG mà chúng ta cần quan tâm: Raw, Epochs, Evoked. Trong đó, raw là dữ liệu gốc thu được còn chứa nhiễu chưa được tiền xử lý, Epochs hay Trials là các vùng nhỏ dữ liệu được segment từ raw hoặc từ preprocessed EEG, nó thường liên quan đến sự lặp đi lặp lại từ các nguồn gây kích thích cảm xúc, còn Evoked được lấy trung bình từ các Epochs.

EEG được chia thành 5 bands tần số chính, trong đó:
- Delta band: 0 - 3.5 Hz
- Theta band: 3.5 - 8 Hz
- Alpha band: 8 - 13 Hz
- Beta band: 13 - 30 Hz
- Gamma band: > 30 (usual 30 - 45 Hz)

Để mô phỏng EEG, hiện nay có 1 số tools của từng ngôn ngữ support chúng ta làm việc này. Với python, mình suggest các bạn có thể sử dụng python MNE, bộ công cụ này khá đầy đủ từ việc mô phỏng, tiền xử lý, các bộ dataset mẫu. Matlab thì có EEGLAB khá nổi tiếng.

Dữ liệu EEG sau khi thu được thường chứa rất nhiều các loại nhiễu, do đó để mô mình có thể trả về kết quả tốt thì bước tiền xử lý, trích chọn đặc trưng là vô cùng quan trọng. ở phần II, chúng ta sẽ cùng đi tìm hiểu 1 số loại nhiễu và cách xử lý chúng nhé.

## II. EEG Contaminations and Solutions

Để phân biệt EEG contaminations, chúng ta sẽ quan tâm đến các nguồn gây ra những loại tín hiệu này, chúng có thể là từ hoạt động sinh lý của con người như hô hấp, nháy mắt, tim đập hay tuyến mồ hôi..., cũng có thể từ các nguồn ngoại lai như tác động của các môi trường bên ngoài. Tại bài này chúng ta sẽ chỉ nói đến những nguồn chính là xuất phát từ chính cơ thể con người.

### 1. Ocular activity

là một loại nhiễu gây ra từ mắt, thuật ngữ sử dụng là EOG, bắt nguồn từ các hành động như nháy mắt, chớp mắt, chuyển động mắt. Đặc điểm nhận dạng là sự thay đổi biên độ sóng đột ngột trong khoảng 100-200 microvolts. Ở miền thời gian, có thể dễ dàng thấy được sự thay đổi về biên độ sóng, cùng xem ảnh dưới đây:

![](https://images.viblo.asia/c8486004-62b0-4114-8d46-bb5dd852bed6.png)

Quan sát các channel F7, Fpz, F8, F3 chúng ta cố thể dễ dàng nhận thấy được.  Còn ở miền tần số, chúng dễ bị nhầm lẫn với các delta và theta bands.

### 2. Muscle activity

Được gọi với thuật ngữ (EMG), chúng xuất phát từ các chuyển động cơ của người. Đặc điểm nhận dạng là các chuyển động sóng với tần số cao overlap các EEG ở miền thời gian, độ lớn biên độ của EMG sẽ tỉ lệ vs strength của nhóm cơ đang hoạt động.

![](https://images.viblo.asia/3cb35827-2049-4476-88f3-d73765b22490.png)

Quan sát các channel C3, Cz trên ảnh. Ở frequency domain, chúng dễ gây hiểu nhầm với các beta và gamma bands.

### 3.Cardiac activity
ECG, đúng như tên gọi của nó, chúng bắt nguồn từ những hành động của tim như co bóp gây ra những tín hiệu nhiễu với sóng não. Đặc điểm nhận dạng như các sóng có nhịp lên xuống tuần hoàn tương ứng với heartbeats.

![](https://images.viblo.asia/a6791bfb-ba00-418f-a3bd-c217353ae99c.png)

Quan sát hình trên chúng ta có thể nhận ra được đâu là tín hiệu ECG đang overlap EEG (mũi tên đỏ)

### 4. Respiration
Nguyên nhân là do sự chuyển động của ngực và đầu trong quá trình ta hô hấp. Đặc điểm nhận dạng của loại nhiễu này ta có thể thấy là các sóng có tần số thấp và biên độ thay đổi theo miền thời gian.

![](https://images.viblo.asia/a847b316-059d-40a9-8c71-10ce48f5b964.png)

Trong miền tần số, chúng cũng rất dễ gây nhầm lẫn với delta và theta band.

### 5. Solutions

Có khá nhiều cách để có thể giải quyết vấn đề này. Đầu tiên có thể kể đến là 

* **EEG artifact rejection**: phương pháp này cho phéo chúng ta có thể tuỳ ý lựa chọn các epochs hoặc trials có chứa nhiễu để lựa bỏ. Tuy nhiên đây không phải là phương án tốt trong trường hợp chúng ta có quá ít dữ liệu để phân tích và huấn luyện, do ngoài bỏ nhiễu ở 1 số channel thì nó còn lược bỏ cả clean EEG ở các channel khác. 
* Do đó sự xuất hiện của **Filtering** giúp loại bỏ những tần số sóng ở ngoài 1 khoảng nào đó trong khi cố gắng giữ lại nhiều EEG nhiều nhất có thể, ví dụ: lowpass filter, bandpass filter hay highpass filter. Ngoài ra, có thể sử dụng regression methods kết hợp với 1 reference signal để loại bỏ đi EOG và ECG...
* **Blind Source Separation** tư tưởng chính của thuật toán là phân tách các tín hiệu EEG ra thành sự kết hợp của các nguồn tín hiệu tuyến tính (linear signal sources). Một trong những thuật toán phổ biến nhất có thể kể đến là **ICA** (Independent Component Analysis).

![](https://images.viblo.asia/9c7bcbea-5b72-44ff-a0ef-4b0abbee0cb1.png)

* **Source decomposition methods** Khác với  **Blind Source Separation** thì ở đây nó chỉ biến đổi theo từng channel tuý ý thay vì tất cả, các channel sẽ được biến đổi thành các basic waveform, loại bỏ đi nhiễu rồi sau đó reconstruct lại thành clean EEG data.

## III. EEG-based Emotional Recognition

Với bài toán nhận diện cảm xúc, đã có những thí nghiệm sử dụng các loại dữ liệu khác như self-report, behavioral responses, physiological measures… tuy nhiên EEG được cho là mạng lại kết quả chính xác hơn cả. Hiện nay có 2 mô hình chính để tạo ra/ nhận biết không gian cảm xúc của mỗi người. 
![](https://images.viblo.asia/abe220e9-4532-4359-8368-4c1b37b22985.png)
* The dimension model: sẽ là 2 giá trị valence-arousal hoặc 3 valence-arousal-dominance. Trong đó valence biểu thị trạng thái positive or negative, arousal biểu thị mức độ của cảm xúc (vui như thế nào, buồn như thế nào...) và dominance mô tả đang kiểm soát hay bị kiểm soát.
* The discrete model: chứa một tập số lượng hữu hạn các cảm xúc của người, ví dụ: joy, sadness, surprise, fear, anger, disgust... Với các mô hình rời rạc, việc nhận biết sẽ trở lên khó khăn hơn rất nhiều, do trong không gian cảm xúc, việc biểu thị đang ở trạng thái tích cực là không hoàn toàn giống nhau. Cụ thể là khi ta nghe 1 bài nhạc vui khác hoàn toàn với một comedy video.

Với paper này, tác giả đã cải tiến hơn so với các mô hình cũ bằng cách kết hợp 2 mô hình này lại với nhau để thu được kết quả tối ưu hơn.

## IV. Construction of Database

Với các bài toán nhận diện cảm xúc dựa trên EEG thì việc mô hình sử dụng stimulus gì để làm nguồn gây kích thích cảm xúc là khá quan trọng, cảm xúc càng mạnh thì khả năng nhận biết của mô hình càng tốt hơn. Các loại stimuli phổ biến như ảnh, âm thanh hoặc có thể kết hợp cả 2 như ở paper này. Bộ dataset được xây dựng dựa trên 1 tập các đoạn film ngắn, mỗi cặp 2 film sẽ biểu thị 1 loại cảm xúc.

![](https://images.viblo.asia/545df9d2-06fd-423f-894b-3e4bf197aeff.png)
Danh sách các đoạn film tương ứng với từng loại cảm xúc 

Việc chọn ra đâu sẽ là bộ phim dùng để thu nhận EEG cũng vô cùng khắt khe. Trước khi 16 bộ phim cuối cùng này được chọn, 111 bộ phim do 9 research assistances sẽ chọn trước và được xem bởi 462 tình nguyện viên tham gia xem và rate theo 3 chỉ số: SAM (self-assessment manikin), PANAS (positive and negative affect schedule và DES (differential emotion scale).

![](https://images.viblo.asia/9e883e82-c090-4c39-90c0-620eaf6f53cc.gif)
Chỉ số SAM

Trong đó SAM là các giá trị rời rạc cho từng loại cảm xúc trên thang điểm 5 hoặc 10 (tuỳ từng paper) dưới dạng pictoral-oriented questionaire.

![](https://images.viblo.asia/391a4aa9-8156-4900-802f-41739cb10867.png)
Ví dụ về PANAS

PANAS chứa 2 subscale là Positive và negative, mỗi subscale sẽ có 1 số lượng hữu hạn các loại cảm xúc tương ứng với nó là thang điểm từ 0-5.

Còn DES sẽ có thang điểm từ 0-9 mô tả mức độ của cảm xúc trong emotional dimension.

## V. EEG Data Acquisition, Preprocessing, Feature Extraction and Normalization

Tại paper này, tác giả sử dụng phần mềm Emotiv EPOC system với 14 electrodes và sampling rate là 128Hz cho việc thu nhận, mô phỏng dữ liệu EEG. Trong quá trình thu nhận, để hạn chế tối đa nhiễu, người tham gia cũng sẽ được đặt trong một phòng kín tránh external disturbance, được hướng dẫn ngồi ở tư thế thoải mái nhất và có time nghỉ sau mỗi video được xem. 

EEG sau khi thu nhận được sẽ được đưa qua 1 bước tiền xử lý bao gồm bandpass filter trong khoảng (1-45Hz) và ICA để lược bỏ EOG, ECG và EMG.

Okie bước tiếp theo chúng ta cần quan tâm sẽ là feature extraction và normalization. Ở đây tác giả sử dụng thuật toán Short-time Fourier Transform với cách tiếp cận sử dụng một cửa sổ trượt thời gian trên miền time-frequency domain (TF). Phân tích theo TF giúp biểu diễn tín hiệu EEG theo 2 miền quang phổ và cung cấp được cả thông tin về biên độ và tần số của tín hiệu. 

![](https://images.viblo.asia/91f7455b-5bfd-4806-97df-87066344d03f.png)

Để extract và normalize EEG, các tín hiệu được tính toán dựa trên concept của event-related desynchronisation (ERD) và synchronisation (ERS), giả sử rằng các event-related activity sẽ biểu diễn sử thay đổi về cường độ tín hiệu trong một dải tần số nhất định.

## VI. Emotion Classification with Feature Selection

Trước khi đưa vào model dự đoán, 1 bước cuối cùng được thực hiện là feature selection, việc trau chuốt trong quá trình phân tích, xử lý và chọn tín hiệu sẽ giúp lược bỏ được tối đa nhiễu và features tốt nhất cho mô hình huấn luyện. Tại đây,  tác giả sử dụng LDA (Linear Discriminant Analysis) để chọn đặc trưng rồi đưa qua k(k-1) mô hình SVM để huấn luyện 3-level classification. Trong đó k là số lượng label cảm xúc, mỗi mô hình SVM đôi một tương ứng với 2 cảm xúc riêng biệt bao gồm Joy, Amusement, tenderness, anger, sadness, fear, disgust và neutrality. 

![](https://images.viblo.asia/10f58de5-2e77-4427-8133-bd88f408762f.png)
Một ví dụ của kết quả dự đoán từ paper

Một điều đặc biệt so với các nghiên cứu trước, thay vì trực tiếp dự đoán ra các discrete emotion, chúng sẽ được phân biệt là neutrality hay non-neutrality nghĩa là đang ở trạng thái có cảm xúc hay không có cảm xúc. Nếu có cảm xúc, mô hình sẽ tiếp tục dự đoán, trả về trạng thái là positive hay negative và giá trị mức độ cảm xúc arousal. Phân lớp cuối cùng sẽ là các giá trị cảm xúc rời rạc trong miền không gian cảm xúc. 

## VII. Conclusion

Cảm ơn mọi người đã đọc đến đây, với nội dung của một paper sẽ có nhiều thiếu sót khi được gói gọn trong một bài viết, nếu có bất cứ điều gì thắc mắc xin vui lòng comment xuống dưới giúp mình. Mọi thông tin đóng góp đều là vô cùng hữu ích để mình có các bài viết chất lượng hơn. Xin cảm ơn!!!

### REFERENCES

https://www.researchgate.net/publication/313015621_Real-Time_Movie-Induced_Discrete_Emotion_Recognition_from_EEG_Signals

http://www2.hu-berlin.de/eyetracking-eeg/papersusing.html

https://en.wikipedia.org/wiki/Electroencephalography

https://www.bitbrain.com/blog/eeg-artifacts

https://www.semanticscholar.org/paper/MEG-and-EEG-data-analysis-with-MNE-Python-Gramfort-Luessi/be6638e641c5e993474703de6e0261357da71736

https://www.emotiv.com/

https://mne.tools/stable/index.html

https://sccn.ucsd.edu/eeglab/index.php