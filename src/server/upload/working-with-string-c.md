# Remove extra white-spaces within a string

```
public static string RemoveExtraWhiteSpaces(string inputString)
        {
            string result = "";
            if (!String.IsNullOrEmpty(inputString))
            {
                result = Regex.Replace(inputString.Trim(), @"\s+", " ");
            }
            return result;
        }
        
  EX: string inputString ="    Remove     extra    white-spaces    within    a    string   ";
  string result ="Remove extra white-spaces within a string";
```

# Get First Name From FullName
```
 public static string GetFirstNameFromFullName(string fullname)
        {
            string firstName = "";
            if (!String.IsNullOrEmpty(fullname))
            {
                List<string> arrName = new List<string>();
                fullname = RemoveExtraWhiteSpaces(fullname);
                arrName = fullname.Split(' ').ToList();
                firstName = arrName[0];
            }
            return firstName;
        }
        
       EX: string inputString =" Nguyen Thi Yen Nhi";
      string result ="Nguyen"; 
```
#  Get Last Name From FullName
```
public static string GetLastNameFromFullName(string fullname)
        {
            string lastName = "";
            if (!String.IsNullOrEmpty(fullname))
            {
                List<string> arrName = new List<string>();
                fullname = XoaKhoangTrangDuThua(fullname);
                arrName = fullname.Split(' ').ToList();
                if(arrName.Count > 1)
                {
                    arrName.RemoveAt(0);
                    lastName = String.Join(" ", arrName);
                }
                else
                {
                    lastName = arrName[0];
                }
            }
            return lastName;
        }
        EX: string inputString =" Nguyen Thi Yen Nhi";
      string result ="Thi Yen Nhi";
```
# Get String With Lenght
```
public static string  GetStringWithLenght(string inputString, int maxl)
        {
            string result = "";
            if (string.IsNullOrEmpty(inputString))
            {
                return result;
            }
            result = inputString;

            if (result.Length > Math.Abs(maxl))
            {
                result = result.Substring(0, Math.Abs(maxl));
            }

            return result;
        }
          EX: string inputString ="0123456789111";
      string result = GetStringWithLenght(inputString,10)=> "0123456789";
        
```
# Change String To VietnameseSigns
```
 private static readonly string[] VietnameseSigns = new string[]
        {

            "aAeEoOuUiIdDyY", "áàạảãâấầậẩẫăắằặẳẵ","ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ", "éèẹẻẽêếềệểễ","ÉÈẸẺẼÊẾỀỆỂỄ","óòọỏõôốồộổỗơớờợởỡ","ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ", "úùụủũưứừựửữ",

            "ÚÙỤỦŨƯỨỪỰỬỮ", "íìịỉĩ", "ÍÌỊỈĨ", "đ", "Đ", "ýỳỵỷỹ", "ÝỲỴỶỸ"
        };
public static string ChangeStringToVietnameseSigns(string str)
        {
            if (str == "") return "";
            for (int i = 1; i < VietnameseSigns.Length; i++)
            {
                for (int j = 0; j < VietnameseSigns[i].Length; j++)
                    str = str.Replace(VietnameseSigns[i][j], VietnameseSigns[0][i - 1]);
            }
            if (str.Length > 0)
            {
                //Remove WhiteSpace
                str = Regex.Replace(str, @"\s", "");
            }
            return str;
        }
```
# Change Number To Alphabet
```
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
# Change Number To Roman
```
 public static string ConvertNumberToRoman(int _Number)
        {
            string rs = "";
            try
            {
                string strRet = string.Empty;
                Boolean _Flag = true;
                string[] ArrLama = { "M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I" };
                int[] ArrNumber = { 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 };
                int i = 0;
                while (_Flag)
                {
                    while (_Number >= ArrNumber[i])
                    {
                        _Number -= ArrNumber[i];
                        strRet += ArrLama[i];
                        if (_Number < 1)
                            _Flag = false;
                    }
                    i++;
                }
                rs = strRet;
            }
            catch (Exception ex)
            {
                rs = string.Empty;
            }
            return rs.ToString();
        }
```
# MD5Hash
```
public static string MD5Hash(string input)
        {
            StringBuilder hash = new StringBuilder();

            MD5CryptoServiceProvider md5provider = new MD5CryptoServiceProvider();
            byte[] bytes = md5provider.ComputeHash(new UTF8Encoding().GetBytes(input));

            for (int i = 0; i < bytes.Length; i++)
            {
                hash.Append(bytes[i].ToString("x2"));
            }
            return hash.ToString();
        }
```
# Date String To DateTime
```
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