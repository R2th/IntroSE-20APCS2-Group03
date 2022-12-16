Bài viết chỉ mang tính chất tổng hợp từ từ :grin:

1. Kiểm tra mật khẩu: từ 8->15 ký tự,chứa 1 nhất : 1 hoa. 1 thường, 1 ký tự đặc biệt

```
/// <summary>
        /// /// từ 8->15 ký tự,chứa 1 nhất : 1 hoa. 1 thường, 1 ký tự đặc biệt, 1 số
        /// </summary>
        /// <param name="pass"></param>
        /// <returns>Boolean</returns>
        public static Boolean checkPassHash(string pass)
        {          
            var passValidation = new Regex(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$");
            
             ////var passValidation = new Regex(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$");///Yêu cầu mật khẩu ít nhất 8 kí tự bao gồm chữ hoa, chữ thường, chữ số và kí tự đặc biệt, 1 số.
            return passValidation.IsMatch(pass);
        }
```

2.  Kiểm tra hợp lệ ngày tháng

```
   /// <summary>
        /// Chuyển chuỗi ngày tháng năm [giờ phút giây] thành đối tượng DateTime
        /// </summary>
        /// <param name="inputString">chuỗi ngày tháng, định dạng dd/MM/yyyy hoặc dd-MM-yyyy (nếu có giờ thì thêm theo định dạng ' HH:mm:ss')</param>
        /// <param name="outputDateTime">kết quả ngày sau khi chuyển</param>
        /// <param name="formatString">định dạng riêng nếu có</param>
        /// <returns>true nếu chuyển được, false là chuyển thất bại</returns>
        public static bool DateStringToDateTime(string inputString, out DateTime outputDateTime, string formatString = "")
        {
            outputDateTime = DateTime.MinValue;
            if (string.IsNullOrEmpty(inputString))
                return false;
            inputString = inputString.Trim();
            bool coGio = false;
            string format = "";
            if (!string.IsNullOrEmpty(formatString))
                format = formatString;
            else
            {
                if (inputString.Contains('-'))
                    format = "dd-MM-yyyy";
                if (inputString.Contains('/'))
                    format = "dd/MM/yyyy";
                if (inputString.Contains(' '))
                    coGio = true;
            }
            if (coGio)
            {
                if (DateTime.TryParseExact(inputString, format + " HH:mm:ss", null, DateTimeStyles.None, out outputDateTime))
                    return true;
                if (DateTime.TryParseExact(inputString, format + " HH:mm", null, DateTimeStyles.None, out outputDateTime))
                    return true;
                if (DateTime.TryParseExact(inputString, format + " HH", null, DateTimeStyles.None, out outputDateTime))
                    return true;
                return false;
            }
            else
            {
                if (DateTime.TryParseExact(inputString, format, null, DateTimeStyles.None, out outputDateTime))
                    return true;
                return false;
            }
        }
```

3.  Convert string html to Plain Text
Link: https://viblo.asia/p/convert-html-to-plain-text-c-XL6lAMXRlek

4.Convert base64 to Image
```
 public static Image Base64ToImage(string base64String)
        {
           
            // Convert Base64 String to byte[]
            byte[] imageBytes = Convert.FromBase64String(base64String);
            Bitmap tempBmp;
            using (MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length))
            {
                // Convert byte[] to Image
                ms.Write(imageBytes, 0, imageBytes.Length);
                using (Image image = Image.FromStream(ms, true))
                {
                    //Create another object image for dispose old image handler
                    tempBmp = new Bitmap(image.Width, image.Height);
                    Graphics g = Graphics.FromImage(tempBmp);
                    g.DrawImage(image, 0, 0, image.Width, image.Height);
                }
            }
            return tempBmp;
        }
```
5. Convert Image To Base64
```
public static string ImageToBase64(Image image, ImageFormat format)
        {
            string base64String;
            using (MemoryStream ms = new MemoryStream())
            {
                // Convert Image to byte[]
                image.Save(ms, format);
                ms.Position = 0;
                byte[] imageBytes = ms.ToArray();

                // Convert byte[] to Base64 String
                base64String = Convert.ToBase64String(imageBytes);
            }
            return base64String;
        }
```
6. Get First Day Of Month
```
/// <summary>
        /// Lấy ra ngày đầu tiên trong tháng có chứa 
        /// 1 ngày bất kỳ được truyền vào
        /// </summary>
        /// <param name="dtDate">Ngày nhập vào</param>
        /// <returns>Ngày đầu tiên trong tháng</returns>
        public static DateTime GetFirstDayOfMonth(DateTime dtInput)
        {
            DateTime dtResult = dtInput;
            dtResult = dtResult.AddDays((-dtResult.Day) + 1);
            return dtResult;
        }
```
```
/// <summary>
        /// Lấy ra ngày đầu tiên trong tháng được truyền vào 
        /// là 1 số nguyên từ 1 đến 12
        /// </summary>
        /// <param name="iMonth">Thứ tự của tháng trong năm</param>
        /// <returns>Ngày đầu tiên trong tháng</returns>
        public static DateTime GetFirstDayOfMonth(int iMonth)
        {
            DateTime dtResult = new DateTime(DateTime.Now.Year, iMonth, 1);
            dtResult = dtResult.AddDays((-dtResult.Day) + 1);
            return dtResult;
        }
```
7. Get Last Day Of Month
```
/// <summary>
        /// Lấy ra ngày cuối cùng trong tháng có chứa 
        /// 1 ngày bất kỳ được truyền vào
        /// </summary>
        /// <param name="dtInput">Ngày nhập vào</param>
        /// <returns>Ngày cuối cùng trong tháng</returns>
        public static DateTime GetLastDayOfMonth(DateTime dtInput)
        {
            DateTime dtResult = dtInput;
            dtResult = dtResult.AddMonths(1);
            dtResult = dtResult.AddDays(-(dtResult.Day));
            return dtResult;
        }
        /// <summary>
        /// Lấy ra ngày cuối cùng trong tháng được truyền vào
        /// là 1 số nguyên từ 1 đến 12
        /// </summary>
        /// <param name="iMonth"></param>
        /// <returns></returns>
        public static DateTime GetLastDayOfMonth(int iMonth)
        {
            DateTime dtResult = new DateTime(DateTime.Now.Year, iMonth, 1);
            dtResult = dtResult.AddMonths(1);
            dtResult = dtResult.AddDays(-(dtResult.Day));
            return dtResult;
        }
```
8.  Check string is Url web
```
public static bool CheckUrlWeb( string link)
        {
            bool check = false;
            Regex regex = new Regex(@"^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$");
            // Step 2: call Match on Regex instance.
            Match match = regex.Match(link);
            // Step 3: test for Success.
            if (match.Success)
            {
                check = true;
            }
            return check;
        }
```
10.  Convert Numert to Character

```
/// <summary>
        /// Chuyển số sang ký tự, bắt đầu bằng 0
        /// </summary>
        /// <param name="number"></param>
        /// <returns></returns>
        public static string ConvertNumberToCharacter(int number)
        {
            string letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var value = "";

            if (number >= letters.Length)
                value += letters[number / letters.Length - 1];

            value += letters[number % letters.Length];

            return value.ToLower();
        }
```
 
10.  Check PhoneNumber
	
```

  public static Boolean checkPhoneNumber(string phone)
        {
            var passValidation = new Regex(@"^([0-9]{10,12})$");/// từ 10-12 số

            return passValidation.IsMatch(phone);
        }
```

11. Check Valid Email


```
public static bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
```
		
12. 	Convert string to unsigned
```
public Dictionary<string, string> MapCharacterSpecial = new Dictionary<string, string> {{ "'", "`"}, { "\"", "`"},{ "&", "and" },{ ",", ":" }, { "\\", "/" }
};

        private static readonly string[] VietnameseSigns = new string[]
        {

            "aAeEoOuUiIdDyY", "áàạảãâấầậẩẫăắằặẳẵ","ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ", "éèẹẻẽêếềệểễ","ÉÈẸẺẼÊẾỀỆỂỄ","óòọỏõôốồộổỗơớờợởỡ","ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ", "úùụủũưứừựửữ",

            "ÚÙỤỦŨƯỨỪỰỬỮ", "íìịỉĩ", "ÍÌỊỈĨ", "đ", "Đ", "ýỳỵỷỹ", "ÝỲỴỶỸ"
        };
        /// <summary>
        /// Chuyển tiếng việt sang không dấu, k khoan trang
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string ChuyenSangKhongDau_KhongKTrang(string str)
        {
            if (str == "") return "";
            for (int i = 1; i < VietnameseSigns.Length; i++)
            {
                for (int j = 0; j < VietnameseSigns[i].Length; j++)
                    str = str.Replace(VietnameseSigns[i][j], VietnameseSigns[0][i - 1]);
            }
            if (str.Length > 0)
            {
                //loai no khoang trang
                str = Regex.Replace(str, @"\s", "");
            }
            return str;
        }
```
        
        
        
        .............Continue..........