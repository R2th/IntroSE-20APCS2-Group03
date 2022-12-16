# 1. Giới thiệu về TESSERACT OCR
OCR - Optical Character Recognition tạm dịch là nhận dạng kí tự quang học, nôm na hiểu thì đây là kỹ thuật giúp nhận dạng các ký tự trên một bức ảnh, về định nghĩa cụ thể hơn thì các bạn có thể xem trên wiki: https://en.wikipedia.org/wiki/Optical_character_recognition 
[TESSERACT OCR](https://github.com/tesseract-ocr/) là một thư viện open source nhận dạng chữ viết được phát triển bởi google,  Bài viết dưới đây sẽ hướng dẫn mọi người cách intergrade tesseract vào trong C# project. Sau đây mình sẽ hướng dẫn các bạn làm 1 project tự động đăng ký accout vào 1 trang web có captcha
Các thư viện sẽ sử dụng trong project
1. https://github.com/MyBotRun/Libraries/tree/master/ImageSearchDLL
2. https://www.autoitscript.com/site/autoit/
3. https://github.com/regnatmalum/FakeNameGenerator
4. https://github.com/charlesw/tesseract
5. http://raw.github.com/NLog/NLog/
6. https://github.com/JamesNK/Newtonsoft.Json

# 2. Tạo project sử dụng tesseract
![](https://images.viblo.asia/fee068e9-8adf-4ecc-981a-187adbd98a07.png)

## 2.1 Viết 1 function để detech captcha
```
        private String detechCaptcha(String fileName)
        {
            var ocrtext = string.Empty;
            using (var engine = new TesseractEngine(@"tessdata", "eng", EngineMode.TesseractOnly))
            {
                engine.SetVariable("tessedit_char_whitelist", "ABCDEFGHJKLMNPQRSTVWXYZ1234567890");
                using (var img = Pix.LoadFromFile(fileName))
                {
                    using (var page = engine.Process(img))
                    {
                        ocrtext = page.GetText();
                    }
                }
            }

            return ocrtext.Replace(" ", "");
        }
```

Trong tesseract có rất nhiều time số và option, nó sử dụng data để tự học để càng lúc càng chính xác hơn,
trong ví dụ của mình mình chỉ sử dụng để detech chữ cái và chứ số nên sử dụng** tessedit_char_whitelist = ABCDEFGHJKLMNPQRSTVWXYZ1234567890**

## 2.2 Tạo config tọa độ mà sẽ di chuyển chuột đến
```
{
	"account_X": 900,
	"account_Y": 258,
	"full_name_X": 900,
	"full_name_Y": 327,
	"pwd_X": 900,
	"pwd_Y": 400,
	"confirm_pwd_X": 900,
	"confirm_pwd_Y": 475,
	"captcha_X": 900,
	"captcha_Y": 547,
	"captcha_LEFT_X": 1098,
	"captcha_TOP_Y": 512,
	"captcha_RIGHT_X": 1262,
	"captcha_BOTTOM_Y": 570,
	"btn_register_X": 1103,
	"btn_register_Y": 641,
	"btn_refresh_X": 1304,
	"btn_refresh_Y": 547,
	"timeout_loading" : 30000,
	"delay_reg_next_time" : 10000,
	"timeout_captcha" : 20000
}
```
## 2.3 Tạo 1 hàm để tạo account ngẫu nhiên
```
//String [] found = ImageHelper.UseImageSearch(@"images/wrong_captcha.PNG");
//if(found != null)
//{
//    Console.WriteLine(found[0]);
//    Console.WriteLine(found[1]);
//    ImageHelper.OnClickAnImage(@"images/wrong_captcha.PNG", 1000);
//}
//return;
FakeNameGeneratorAPI FNGAPI = new FakeNameGeneratorAPI();

//Identity id = FNGAPI.CreateIdentity(Gender.Male, NameSet.Vietnamese, Country.UnitedStates);

//Console.WriteLine("                 Name: {0}", id.Name);
//Console.WriteLine("              Address: {0}", id.Address);
//Console.WriteLine(" Mother's Maiden Name: {0}", id.MaidenName);
//Console.WriteLine("                  SSN: {0}", id.SSN);
//Console.WriteLine("                Phone: {0}-{1}", id.CountryCode, id.Phone);
//Console.WriteLine("             Birthday: {0}", id.Birthday);
//Console.WriteLine("                  Age: {0}", id.Age);
//Console.WriteLine("                Email: {0}", id.Email);
//Console.WriteLine("             Username: {0}", id.Username);
//Console.WriteLine("             Password: {0}", id.Password);
//Console.WriteLine("              Website: {0}", id.Website);
//Console.WriteLine("   Browser User Agent: {0}", id.UserAgent);
//Console.WriteLine("     Credit Card Type: {0}", id.CardType);
//Console.WriteLine("   Credit Card Number: {0}", id.CardNumber);
//Console.WriteLine("      Card Expiration: {0}", id.CardExpiration);
//Console.WriteLine("              Company: {0}", id.Company);
//Console.WriteLine("           Occupation: {0}", id.Occupation);
//Console.WriteLine("               Height: {0}", id.Height);
//Console.WriteLine("               Weight: {0}", id.Weight);
//Console.WriteLine("           Blood Type: {0}", id.BloodType);

Random rnd = new Random();
List<string> accountList = new List<string>();
for (int i = 0; i < Int32.Parse(total_acc.Text); i++)
{
Identity id = FNGAPI.CreateIdentity(Gender.Male, NameSet.Vietnamese, Country.UnitedStates);

string[] emailPlit = id.Email.Split('@');

string username = emailPlit[0].Substring(0, emailPlit[0].Length / 2) + rnd.Next(1000, 3000);
if(username.Length < 6){
    username = username.PadRight(7, '0');
}else if( username.Length > 12){
    username = username.Substring(0, 8);
}

string fullname = emailPlit[0].Substring(0, emailPlit[0].Length - emailPlit[0].Length / 4);

if (fullname.Length < 6){
    fullname = fullname.PadRight(7, '0');
}else if (username.Length > 12){
    fullname = fullname.Substring(0, 8);
}

string password = id.Password;
if (username.Length < 6){
    password = password.PadRight(7, '0');
} else if (username.Length > 12){
    password = password.Substring(0, 8);
}

string account = username + "|" + fullname + "|" + password;

accountList.Add(account);
}

System.IO.File.WriteAllLines(@"account.txt", accountList.ToArray());
MessageBox.Show("Finished...");
```

## 2.4 Tạo hàm chụp ảnh vùng mà có captcha
```
private void CaptureScreen(VicConfig vicConfig)
{
    int width = vicConfig.captcha_RIGHT_X - vicConfig.captcha_LEFT_X;
    int height = vicConfig.captcha_BOTTOM_Y - vicConfig.captcha_TOP_Y;
    Size s = new Size(width, height);
    Rectangle rect = new Rectangle(vicConfig.captcha_LEFT_X, vicConfig.captcha_TOP_Y, width, height);

    Bitmap memoryImage = new Bitmap(width, height);
    Graphics memoryGraphics = Graphics.FromImage(memoryImage);
    memoryGraphics.CopyFromScreen(rect.Left, rect.Top, 0, 0, s);
    memoryImage.Save("temp.png", System.Drawing.Imaging.ImageFormat.Png);
}
```

## 2.5. Tiến hành viết script theo 1 kịch bản để tạo account

```
private void btnStart_Click(object sender, EventArgs e)
        {
            btnStart.Enabled = false;

            tStart = new Thread(() =>
            {
                try
                {
                    // Read config
                    var r = new StreamReader("vic_conf.json");
                    var json = r.ReadToEnd();
                    VicConfig config = JsonConvert.DeserializeObject<VicConfig>(json);
                    progressBar1.Minimum = 0;
                    List<string> accountList = new List<string>();

                    using (var reader = new StreamReader("account.txt"))
                    {
                        // Continous line 1
                        reader.ReadLine();

                        while (!reader.EndOfStream)
                        {
                            accountList.Add(reader.ReadLine());
                        }
                    }
                    progressBar1.BeginInvoke((Action)delegate ()
                    {
                        progressBar1.Maximum = accountList.Count;
                    });
                    
                    for (int i=0; i< accountList.Count; i++)
                    {
                        long start = DateTimeHelper.CurrentTimeMillis();
                        if( i% 5 == 0)
                        {
                            ImageHelper.QuitChrome();
                        }
                        Process.Start(@"chrome.exe", "--incognito https://vic.club/");

                        // Wait loading okie
                        bool loading = false;
                        string[] found = null;
                        while (true)
                        {
                            found = ImageHelper.UseImageSearch(@"images/btn_dangky.PNG");

                            if (found != null)
                            {
                                loading = true;
                                break;
                            }

                            if (DateTimeHelper.CurrentTimeMillis() - start > config.timeout_loading)
                            {
                                break;
                            }
                        }

                        if (loading == false)
                        {
                            continue;
                        }
                        
                        //Processing bạn xem ở video dưới
                        
                        progressBar1.BeginInvoke((Action)delegate ()
                        {
                            progressBar1.Value = i+1;
                        });

                        if ((i+1) == accountList.Count)
                        {
                            btnStart.BeginInvoke((Action)delegate ()
                            {
                                btnStart.Enabled = true;
                            });
                            MessageBox.Show("Finished...");
                        }
                    }
                }
                catch (Exception ex)
                {
                    logger.Error(ex.ToString());
                }
            });

            tStart.Start();
        }
```

## 3. Các bạn xem video xem kết quả
{@youtube: fDpOPshKukY}

Bạn có thể xem video ở trên để xem cách hoạt động, phần captcha mình thấy nếu chữ kiểu italic xác suất thành công chỉ 50%
Nó có nhiều option, ở bài viết tới mình sẽ tìm hiểu về cái **tessdata** để tối ưu hon nữa nhận dạng chữ trong image
Bạn nào muốn xem full code thì comment ở dưới mình sẽ share bitbucket :-p