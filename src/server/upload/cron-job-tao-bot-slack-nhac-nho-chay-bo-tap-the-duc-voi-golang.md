**Hà Nội, Chủ nhật, 21/08/2022... Vài lời gửi gắm thời gian**

Nhạc sĩ : [Trịnh Công Sơn](https://vi.wikipedia.org/wiki/Tr%E1%BB%8Bnh_C%C3%B4ng_S%C6%A1n)

*Hà Nội mùa thu, mùa thu Hà Nội<br>
Mùa hoa sữa về thơm từng cơn gió<br>
Mùa cốm xanh về thơm bàn tay nhỏ<br>
Cốm sữa vỉa hè thơm bước chân qua...*

![image.png](https://images.viblo.asia/0df77cca-bc2d-4a7f-97a6-5766ffbb2faf.png)

Tôi nhớ thu *Hà Nội* quá, những đêm nghêu ngao hát cùng em trên những con phố thu vắng gió thu khẽ luồn qua tà áo em bay. Tay đan vào nhau, em nói yêu tôi 😍

Mùi rượu thoang thoảng quyện theo từng cơn gió. Em đổ vào lòng tôi, má hây hây hồng, miệng thơm mùi rượu, mắt em khẽ cong. *Hà Nội* đẹp nhất vào ngày ấy - ngày *Thu* có em...

![hi.gif](https://images.viblo.asia/51d1e3d5-2d62-4c94-ba80-a2094bd7a34d.gif)

# 1. Giới thiệu tổng quan

Tập **thể dục** có thể ngăn tích tụ mỡ thừa và duy trì giảm cân. Khi hoạt động thể chất, đốt cháy calo, hoạt động càng mạnh, càng nhiều calo bị đốt cháy.

Hoạt động thể chất tích cực thúc đẩy lượng **Lipoprotein** tỷ trọng cao **(HDL)** – mỡ máu tốt và giảm **triglyceride, Lipoprotein** tỷ trọng thấp **(LDLc)** không lành mạnh, tác dụng kép này giúp máu lưu thông dễ dàng và giảm nguy cơ bệnh tim mạch.

![running.gif](https://images.viblo.asia/3808f219-2a08-41b4-9cbf-bd626f418066.gif)

Hiện tại, mình là một **developer** nên phải ngồi máy tính 8h một ngày. Vì vậy tập thể dục, thể thao đối với mình là việc rất cần thiết sau ngày làm căng thẳng. Tuy đã trang bị rất nhiều đồ công nghệ phục vụ cho việc này như: Đồng hồ thông minh, app [Strava](https://www.strava.com/) đã mua license 😃, google fit,... nhưng việc thể dục của mình vẫn không được đều đặn khi có nhiều lý do đến từ chủ quan lẫn khách quan.

Mình vẫn luôn ước ao sẽ có một người nào đó sẽ luôn nhắc nhở bản thân mình đúng giờ trong mỗi ngày: *" Đứng lên ! Đi thể dục đi. "* và cuối tháng tổng kết lại kết quả mình đạt được của tháng đó: số liệu, thành tựu biểu diễn dưới dạng biểu đồ chẳng hạn. Việc thuê một người làm việc đó thì cũng là một cách không tồi nhưng đối với một người làm nghề **Dev** thì việc tự tạo ra một con **Bot** thật sự là một cách thú vị và có tính chính xác gần như tuyệt đối 😃😃😃

Mình làm việc từ **8h-8h30** cho đến **18h-18h30** hàng ngày. Công cụ trao đổi với mọi người trong team đa phần dùng [Slack](https://slack.com/) nên ở đây mình tạo **bot** trên Slack để alert nhắc nhở và tổng kết thành biểu đồ hàng tháng. Các chức năng chính của **bot** như sau:

1. **9h hàng ngày**, bot crawl thông tin trên account [Strava](https://www.strava.com/) của mình rồi alert thông tin mình chạy được ngày hôm qua. VD: **Số km, thời gian chạy, tốc độ chạy,...**
2. **9h30 Ngày đầu tiên của hàng tháng**, bot thống số liệu từng ngày mình chạy rồi generate ra biểu đồ alert lại cho mình.
3. **17h30 hàng ngày**, bot kiểm tra thời tiết hôm nay rồi alert cho mình thông tin đó và dựa vào đó để gợi ý xem có nên ra ngoài chạy thể dục không?

# 2. Sequence diagram

![sync-data.png](https://images.viblo.asia/0174c195-5d2e-4954-ba7e-511eb190cf93.png)

**Note** : [App Zepp](https://play.google.com/store/apps/details?id=com.huami.watch.hmwatchmanager&hl=vi&gl=US) - ứng dụng lưu trữ thông tin sức khoẻ được đo từ smart watch. Dữ liệu sẽ được tự đồng bộ từ smart watch -> app **Zepp** -> app **Strava**

![bot-notify-run.png](https://images.viblo.asia/26aa1d1d-40cf-49c4-9db0-c1a26cb48dc2.png)

**Note** : [Open Weather Map](https://openweathermap.org/api) - cung cấp api miễn phí để lấy thông tin thời tiết theo **vị trí, khu vực**.

![bot-notify-summary.png](https://images.viblo.asia/272d232a-2e48-4bdd-95d6-85f741b8027e.png)

**Note** : [Strava](https://developers.strava.com/docs/reference/) - lưu trữ, chia sẻ hoạt động thể dục, thể thao dễ hiểu hơn là mạng xã hội dành cho người chơi thể thao

![bot-notify-statistical.png](https://images.viblo.asia/22f91f2d-cbb6-4b38-ba4e-189b96d46ddf.png)

# 3. Tạo bot Slack
![bot.gif](https://images.viblo.asia/b03f1591-718b-4849-aa13-411c35d9f344.gif)

Để tạo một con **bot** có thể gửi tin nhắn vào channel thì cần tạo một webhook trong Slack. Khi có trigger hành động thì con **bot** sẽ tự động post message tới channel thông qua webhook này. Cách tạo thì mọi người tham khảo link [Incoming Webhook](https://team-tbo7018.slack.com/apps/new/A0F7XDUAZ-incoming-webhooks) của Slack.

Để implement code bằng Go thì cũng đơn giản thôi chỉ cần generate theo format của Slack rồi gọi webhook. Slack có hướng dẫn từng bước mọi người [tham khảo đây nhé](https://api.slack.com/messaging/webhooks#:~:text=Incoming%20Webhooks%20are%20a%20simple,make%20the%20messages%20stand%20out.)

```Go
func sendMessage(webhook string, message *model.SlackMessage) error {
	logrus.Info("Send message to webhook ", webhook)

	payload, err := json.Marshal(message)
	if err != nil {
		return err
	}
	req, err := http.NewRequest("POST", webhook, bytes.NewReader(payload))
	if err != nil {
		return err
	}

	req.Header.Add("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")
	res, err := http.DefaultClient.Do(req)

	if err != nil {
		return err
	}

	defer func(Body io.ReadCloser) {
		err = Body.Close()
		if err != nil {
			return
		}
	}(res.Body)
	if res.StatusCode != http.StatusOK {
		if res != nil {
			bodyBytes, err := ioutil.ReadAll(res.Body)
			if err != nil {
				logrus.Warnf("response %v", string(bodyBytes))
				return err
			}
			return errors.New("notification failure")
		}
	}
	logrus.Info("successfully sent notification...")
	return nil
}
``` 

# 4. Tạo cron job với Golang

## 4.1. Tài liệu cho cron job

Ở phần này nhanh thì mình dùng luôn thư viện trên github [robfig/cron/v3](https://github.com/robfig/cron/) được vote **10k starts** để tạo cron job của Golang.

Còn nếu tự build phần cron job thì trong tương lai gần hy vọng mình có thời gian để ra bài về phần này 😄😄😄. Các bạn có thể tham khảo thuật toán [Round-robin scheduling](https://en.wikipedia.org/wiki/Round-robin_scheduling) để hiểu rõ cách một **Scheduler** hoạt động như thế nào nhé.

## 4.2. Cấu hình cron job

Cron job có dạng

```
cron = "X X X X X" (5 kí tự)
``` 
Tương ứng

```
<phút> <giờ> <ngày trong tháng> <tháng> <ngày trong tuần>
``` 
Các bạn có thể đọc thêm [cron job ở đây nhé](https://en.wikipedia.org/wiki/Cron)

Dựa vào định nghĩa trên ta implement ra được cấu hình cho **bot** để gửi message

1. **9h hàng ngày** -> CRON_NOTIFY_SUMMARY=0 9 * * *
2. **9h30 Ngày đầu tiên của hàng tháng** -> CRON_NOTIFY_STATISTICAL=30 9 1 * *
3. **17h30 hàng ngày** -> CRON_NOTIFY_RUN=30 17 * * *

## 4.3. Implement code

```Go
func main() {
	cfg, err := config.LoadConfig("build")
	if err != nil {
		logrus.Warnf("cannot load config: %v", err)
		return
	}

	logrus.Info("Create new cron")
	c := cron.New()

	// Notify run at 17:30 every day
	notifyRun, err := c.AddFunc(cfg.CronNotifyRun, func() {
		err = notifyBot.ProcessNotifyRun()
		if err != nil {
			logrus.Warnf("send message for run is failed %v", err)
		}
	})

	// Notify summary 09:00 every day
	notifySummary, err := c.AddFunc(cfg.CronNotifySummary, func() {
		err = notifyBot.ProcessNotifySummary()
		if err != nil {
			logrus.Warnf("send message for summary is failed %v", err)
		}
	})

	// Notify statistical 09:30 on day-of-month 1
	notifyStatistical, err := c.AddFunc(cfg.CronNotifyStatistical, func() {
		err = notifyBot.ProcessNotifyStatistical()
		if err != nil {
			logrus.Warnf("send message for statistical is failed %v", err)
		}
	})
	if err != nil {
		c.Remove(notifyRun)
		c.Remove(notifySummary)
		c.Remove(notifyStatistical)
		return
	}

	// Start cron with one scheduled job
	logrus.Info("Start cron")
	c.Run()
}
``` 

# 5. Bot nhắc nhở chạy thể dục

**17h30 hàng ngày**, bot kiểm tra thời tiết hôm nay rồi alert cho mình thông tin đó và dựa vào đó để gợi ý xem có nên ra ngoài chạy thể dục không?

## 5.1. Kiểm tra thời tiết hiện tại

Để lấy các thông tin về thời tiết hiện tại theo khu vực mình sử dụng API của 
[openweathermap](https://openweathermap.org) - Nó cho **1,000 API calls per day for free** vậy là quá đủ dùng rồi đúng không nào 😄😄😄. Các bạn có thể đọc tài liệu api ở đây nhé -> [Document API](https://openweathermap.org/api/one-call-3) openweathermap

```Go
func GetWeatherInfo(url string, params *model.ParamOpenWeather) (*model.OpenWeather, error) {
	logrus.Info("Get weather information")

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	q := req.URL.Query()
	q.Add("lat", params.Lat)
	q.Add("lon", params.Lon)
	q.Add("units", params.Units)
	q.Add("appid", params.Appid)
	q.Add("exclude", params.Exclude)
	req.URL.RawQuery = q.Encode()

	req.Header.Add("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")
	res, err := http.DefaultClient.Do(req)

	if err != nil {
		return nil, err
	}

	defer func(Body io.ReadCloser) {
		err = Body.Close()
		if err != nil {
			logrus.Errorf("Close body fail %v", err)
		}
	}(res.Body)
	body, err := ioutil.ReadAll(res.Body)
	if res.StatusCode != http.StatusOK {
		if res != nil {
			bodyBytes, err := ioutil.ReadAll(res.Body)
			if err != nil {
				logrus.Warnf("response %v", string(bodyBytes))
				return nil, err
			}
			return nil, errors.New("get weather information failure")
		}
	}

	openWeather := &model.OpenWeather{}
	err = json.Unmarshal(body, openWeather)
	if err != nil {
		return nil, err
	}
	logrus.Info("successfully get weather information...")

	return openWeather, nil
}
``` 
Ở đây tạm thời mình chỉ cần quan tâm tới nhiệt độ và thời tiết: **Mưa, nắng, nhiều mây**. Dựa vào các thông tin đó để alert có nên chạy bộ không.

## 5.2. Implement code

Kết hợp code api lấy thông tin thời tiết và bot gửi message vào channel bằng **Slack Webhook** để xử lý alert nhắc nhở chạy thể dục

```Go
func (b *BotNotify) ProcessNotifyRun() error {
	weatherInfo, err := weather.GetWeatherInfo("https://openweathermap.org/data/2.5/onecall", &model.ParamOpenWeather{
		Lat:     Latitude,
		Lon:     Longitude,
		Units:   Units,
		Appid:   b.cfg.AppID,
		Exclude: Exclude,
	})
	if err != nil {
		logrus.Errorf("get weather information from open-weather fail %v", err)
		return err
	}
	textMessage := &model.TextMessageNotifyRun{
		CurrentTime: time.Now().Format(FormatDateTime),
		Location:    Location,
		Temperature: fmt.Sprintf("%v %v feels like %v %v", weatherInfo.Current.Temp, Celsius, weatherInfo.Current.FeelsLike, Celsius),
		Weather:     weatherInfo.Current.Weather[0].Description,
		IsRunning:   "Yes",
		Note:        fmt.Sprintf("Hôm nay %v, trời không mưa nên chạy đi nhé", time.Now().Format(FormatDate)),
	}
	if weatherInfo.Current.Weather[0].Main == "Rain" {
		textMessage.IsRunning = "No"
		textMessage.Note = fmt.Sprintf("Hôm nay %v, trời mưa rồi nên ở nhà đi nhé", time.Now().Format(FormatDate))
	}
	message := &model.SlackMessage{
		Text:        Text,
		IconEmoji:   client.DefaultEmoji,
		Attachments: textMessage.ToAttachment(),
	}
	return client.SendMessageSlack(b.cfg.WebhookSlack, message)
}
``` 

Kết quả nhận được sau khi tới **17h30 hàng ngày**

![image.png](https://images.viblo.asia/16c75e44-df21-42f1-98f6-007d2a722985.png)

# 6. Bot thông báo thông tin chạy bộ

**9h hàng ngày**, bot crawl thông tin trên account [Strava](https://www.strava.com/) của mình rồi alert thông tin mình chạy được ngày hôm qua. VD: **Số km, thời gian chạy, tốc độ chạy,...**

## 6.1. Crawl thông tin Strava

Mình có smart watch để đo thông tin chạy thể dục. Mỗi lần chạy xong sẽ tự sync dữ liệu lên [Strava](https://www.strava.com/). Để lấy các thông tin về chi tiết hoạt động của ngày hôm đó mình dùng API của Strava -> [Docment API](https://developers.strava.com/docs/reference/#api-Activities-getLoggedInAthleteActivities)

Video tham khảo thêm ***Intro and accessing Strava API***

{@embed: https://www.youtube.com/watch?v=sgscChKfGyg}

```Go
func GetStravaActivityInfo(params *model.ParamStrava) ([]*model.StravaActivity, error) {
	logrus.Info("Get strava activity information")

	stravaToken, err := GetStravaTokenInfo(UrlGetStravaToken, params)
	req, err := http.NewRequest("GET", UrlGetStravaActivity, nil)
	if err != nil {
		return nil, err
	}

	q := req.URL.Query()
	q.Add("page", "1")
	q.Add("per_page", "3")
	req.URL.RawQuery = q.Encode()

	req.Header.Add("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Authorization", strings.Join([]string{"Bearer ", stravaToken.AccessToken}, ""))
	res, err := http.DefaultClient.Do(req)

	if err != nil {
		return nil, err
	}

	defer func(Body io.ReadCloser) {
		err = Body.Close()
		if err != nil {
			logrus.Errorf("Close body fail %v", err)
			return
		}
	}(res.Body)
	body, err := ioutil.ReadAll(res.Body)
	if res.StatusCode != http.StatusOK {
		if res != nil {
			bodyBytes, err := ioutil.ReadAll(res.Body)
			if err != nil {
				logrus.Warnf("response %v", string(bodyBytes))
				return nil, err
			}
			return nil, errors.New("get strava activity information failure")
		}
	}

	stravaActivity := make([]*model.StravaActivity, 0)
	err = json.Unmarshal(body, &stravaActivity)
	if err != nil {
		return nil, err
	}
	logrus.Info("successfully get strava activity information...")

	return stravaActivity, nil
}
``` 
Mình sẽ lấy 3 hoạt động gần nhất trên **Strava** bởi vì 1 ngày chắc mình thể dục nhiều nhất là 3 lần : **Sáng, Chiều, Tối** nhưng thường là 1 lần 1 ngày vào buổi tối thôi :LOL: 😄😄😄

## 6.2. Implement code

Kết hợp code api lấy thông tin hoạt động trên **Strava** và **bot** gửi message vào channel bằng **Slack Webhook** để xử lý alert nhắc nhở chạy thể dục.

Trong phần xử lý alert này khi lấy được thông tin hoạt động trên Strava **bot** bắn message và đồng thời lưu lại thông tin này để tiện hết 1 tháng mình sẽ thống kê lại kết quả vào **generate ra chart** 😄😄😄

Table **statisticals** lưu thông tin thống kê dữ liệu
```sql
CREATE TABLE `statisticals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `time_chart` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `metadata` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
``` 

```Go
func (b *BotNotify) ProcessNotifySummary() error {
	stravaActivities, err := strava.GetStravaActivityInfo(&model.ParamStrava{
		ClientId:     b.cfg.ClientId,
		ClientSecret: b.cfg.ClientSecret,
		RefreshToken: b.cfg.RefreshToken,
		GrantType:    b.cfg.GrantType,
	})
	if err != nil || len(stravaActivities) == 0 {
		return errors.New("strava activities information empty")
	}

	distanceGoal, err := strconv.ParseFloat(b.cfg.DistanceGoal, 64)
	timeChart, messageActives, chartsInfo := time.Now().AddDate(0, 0, -1).Format(FormatDate), make([]*model.TextMessageNotifySummary, 0), make([]*internalModel.ChartInfo, 0)
	for _, activity := range stravaActivities {
		if timeChart != activity.StartDateLocal.Format(FormatDate) {
			continue
		}
		textMessage := &model.TextMessageNotifySummary{
			CurrentTime:  time.Now().Format(FormatDateTime),
			Distance:     fmt.Sprintf("%v km", math.Round((activity.Distance/float64(1000))*100)/100),
			MovingTime:   time.Duration(activity.MovingTime * 1000000000).String(),
			AverageSpeed: fmt.Sprintf("%.2f km/h", activity.AverageSpeed*60*60/float64(1000)),
			MaxSpeed:     fmt.Sprintf("%.2f km/h", activity.MaxSpeed*60*60/float64(1000)),
			Note:         fmt.Sprintf("Chúc mừng bạn đã hoàn thành mục tiêu chạy %v km ngày hôm qua %v nhé", distanceGoal, time.Now().AddDate(0, 0, -1).Format(FormatDate)),
		}
		if activity.Distance < distanceGoal*1000 {
			textMessage.Note = fmt.Sprintf("Bạn đã không hoàn thành mục tiêu chạy %v km ngày hôm qua %v rồi :sleepy: ", distanceGoal, time.Now().AddDate(0, 0, -1).Format(FormatDate))
		}
		messageActives = append(messageActives, textMessage)
		chartsInfo = append(chartsInfo, &internalModel.ChartInfo{
			Day:   timeChart,
			Value: math.Round((activity.Distance/float64(1000))*100) / 100,
		})
	}

	if len(messageActives) == 0 {
		messageActives = append(messageActives, &model.TextMessageNotifySummary{
			CurrentTime:  time.Now().Format(FormatDateTime),
			Distance:     fmt.Sprintf("%v km", 0),
			MovingTime:   "0h0m0s",
			AverageSpeed: fmt.Sprintf("%v km/h", 0),
			MaxSpeed:     fmt.Sprintf("%v km/h", 0),
			Note:         fmt.Sprintf("Hôm qua %v, bạn không chạy à :rage:", time.Now().AddDate(0, 0, -1).Format(FormatDate)),
		})
	}

	err = b.statisticalDomain.UpsertStatistical(chartsInfo)
	for _, messageActivity := range messageActives {
		message := &model.SlackMessage{
			Text:        "Activity Information",
			IconEmoji:   client.DefaultEmoji,
			Attachments: messageActivity.ToAttachment(),
		}
		err = client.SendMessageSlack(b.cfg.WebhookSlack, message)
		if err != nil {
			return err
		}
	}
	return nil
}
``` 

Kết quả nhận được sau khi tới **9h hàng ngày**

![image.png](https://images.viblo.asia/13b8963d-c4b2-4478-9e3a-cffc204e9a73.png)

# 7. Bot thống kê dữ liệu hàng tháng

**9h30 Ngày đầu tiên của hàng tháng**, bot thống số liệu từng ngày mình chạy rồi generate ra biểu đồ alert lại cho mình.

Để generate đống dữ liệu thu thập được thành biểu đồ mình dùng thư viện [wcharczuk/go-chart/v2](https://github.com/wcharczuk/go-chart/) trên github được vote gần 4k stars.

Để bot gửi vào Slack biểu đồ thống kê mình cần upload ảnh chart lên host nào đó để lấy link ảnh để bot có thể bắn message vào channel Slack. Mình có search google và tìm được một [freeimage.host](https://freeimage.host/page/api?lang=en) - host free mà lại còn cho lưu ảnh full-size 😄😄😄

## 7.1. Xử lý upload ảnh

```Go
func UploadImage(params *model.ParamUploadImage) (*model.ImageInfo, error) {
	logrus.Info("Get link upload image")

	payload := &bytes.Buffer{}
	writer := multipart.NewWriter(payload)
	_ = writer.WriteField("source", params.Base64StringImage)
	_ = writer.WriteField("key", params.ApiKey)
	err := writer.Close()
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest("POST", UrlHost, payload)

	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", writer.FormDataContentType())
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer func(Body io.ReadCloser) {
		err = Body.Close()
		if err != nil {
			return
		}
	}(res.Body)

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}
	if res.StatusCode != http.StatusOK {
		if res != nil {
			bodyBytes, err := ioutil.ReadAll(res.Body)
			if err != nil {
				logrus.Warnf("response %v", string(bodyBytes))
				return nil, err
			}
			return nil, errors.New("link upload image failure")
		}
	}

	imgInfo := &model.ImageInfo{}
	err = json.Unmarshal(body, imgInfo)
	if err != nil {
		return nil, err
	}
	logrus.Info("successfully link upload image...")

	return imgInfo, nil
}
``` 
Sau khi gọi api để lưu ảnh mình sẽ nhận được url của ảnh mới được upload đó từ api trả về.

## 7.2. Generate biểu đồ thống kê dữ liệu

```Go
func (s *StatisticalDomain) GetBase64StringChart(queries map[string]interface{}) (string, float64, error) {
	statistical, err := s.statisticalRepo.GetByQueries(queries)
	if err != nil {
		return "", 0, err
	}

	chartInfo, sumKilometers := make([]*model.ChartInfo, 0), float64(0)
	err = json.Unmarshal([]byte(statistical.Metadata), &chartInfo)
	if err != nil {
		return "", 0, err
	}

	// Generate chart
	graph := chart.BarChart{
		Width:  2560,
		Height: 1440,
		Title:  strings.Join([]string{"Statistical Chart", time.Now().Month().String(), fmt.Sprintf("%v", time.Now().Year())}, "-"),
		XAxis: chart.Style{
			Hidden:              false,
			TextRotationDegrees: 45.0,
		},
	}

	bars := make([]chart.Value, 0)
	for _, value := range chartInfo {
		bars = append(bars, chart.Value{
			Label: value.Day,
			Value: value.Value,
		})
		sumKilometers += value.Value
	}
	graph.Bars = bars

	var buf bytes.Buffer
	err = graph.Render(chart.PNG, &buf)
	if err != nil {
		return "", 0, err
	}

	// Encode as base64.
	return base64.StdEncoding.EncodeToString(buf.Bytes()), sumKilometers, nil
}
``` 
Sau khi, mình thực hiện generate chart từ dữ liệu lưu được ở database được file của hình ảnh -> encodebase64 image -> truyền encode base64 string vào api upload ảnh được xử lý ở bước 7.1 để lấy được link đường dẫn của hình ảnh.

## 7.3. Implement code

Kết hợp code api lấy được được link đường dẫn hình ảnh và **bot** gửi message vào channel bằng **Slack Webhook** để xử lý alert thống kê dữ liệu mình đạt được sau 1 tháng nỗ lực tập luyện, chạy bộ 😄😄😄

```Go
func (b *BotNotify) ProcessNotifyStatistical() error {
	timeChart := strings.Join([]string{time.Now().Month().String(), fmt.Sprintf("%v", time.Now().Year())}, "-")
	base64StringImage, sumKilometers, err := b.statisticalDomain.GetBase64StringChart(map[string]interface{}{
		"time_chart": timeChart,
	})
	if err != nil {
		return err
	}

	imageInfo, err := upload_images.UploadImage(&model.ParamUploadImage{
		Base64StringImage: base64StringImage,
		ApiKey:            b.cfg.ApiKeyUploadImage,
	})
	if err != nil {
		logrus.Errorf("get weather information from open-weather fail %v", err)
		return err
	}

	// Send message to slack
	textMessage := &model.TextMessageNotifyStatistical{
		ImageUrl: imageInfo.Image.Url,
	}

	message := &model.SlackMessage{
		Text:        strings.Join([]string{"Statistical Chart", timeChart, ". Tổng số:", fmt.Sprintf("%.2f km", sumKilometers)}, " "),
		IconEmoji:   client.DefaultEmoji,
		Attachments: textMessage.ToAttachment(),
	}
	return client.SendMessageSlack(b.cfg.WebhookSlack, message)
}
``` 
Kết quả nhận được sau khi tới **9h30 Ngày đầu tiên của hàng tháng**. Hiện tại, cũng đến khi ngồi viết bài này thì mình vẫn chưa thu thập được 1 tháng data nên mình fake data gen tạm chart cho mọi người dễ hình dung nhé 😄

![image.png](https://images.viblo.asia/9d48ed79-6a22-44de-998f-1f701a519ed8.png)

# 8. Kết luận

Sau quá trình giới thiệu cũng như hướng dẫn làm một con **bot** đơn giản phục vụ cho cuộc sống cá nhân hàng ngày, mình hi vọng mọi người sẽ thấy thú vị và bớt nhàm chán sau những ngày code căng thẳng, mệt mỏi.

Source code : https://github.com/nguyenvantuan2391996/be-topsis

Bài viết được trích từ blog của mình : https://tuannguyenhust.hashnode.dev/

Tiện thể **Tiki** đang có chương trình [đi bộ lên mặt trăng săn thưởng 1 tỷ đồng](https://tiki.vn/khuyen-mai/di-bo-nhan-thuong/?utm_source=tiki360_homepage). Mọi người tham giá hốt xu nào 😄😄😄

Link tham gia: [Đi bộ săn thưởng cùng Tiki](https://tiki.vn/khuyen-mai/di-bo-nhan-thuong/?utm_source=tiki360_homepage)

![image.png](https://images.viblo.asia/3cba23c9-a5eb-4ea5-b95f-814ac69734d1.png)