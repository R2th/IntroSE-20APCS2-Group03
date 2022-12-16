## Introduction
Gần đây, do nhu cầu phát triển theo mô hình microservice ngày càng phổ biến, mình chủ yếu code mảng Python - Backend nên được phép chọn một framework để phát triển project mới cho công ty, sau khi cân nhắc giữa 3 framework phổ biến hiện tại sử dụng Python là Django, Flask và FastAPI, mình quyết định chọn FastAPI để phát triển project, dưới đây là lý do cho việc này.

## Main Reason
FastAPI là một micro framework khá mới, chỉ vừa được release năm 2018. Github của framework này hiện tính đến tháng 1/2021 đang đạt 25,4k star, tuy nhiên do được áp dụng khá nhiều công nghệ mới nên có FastAPI có vài điểm mạnh mà mình cảm thấy khá phù hợp để sử dụng phát triển project:
-	High performance
Do được base trên 2 lib khá mạnh ở thời điểm hiện tại của python là Pydantic và Starlette nên FastAPI sở hữu hiệu suất cao nhất trong tất cả các framework Python hiện nay, bạn có thể tham khảo so sánh hiệu năng giữa các framework tại [https://www.techempower.com/](https://www.techempower.com/benchmarks/#section=test&runid=7464e520-0dc2-473d-bd34-dbdfd7e85911&hw=ph&test=query&l=zijzen-7)
![](https://images.viblo.asia/a7de7dab-1d6f-442a-ad46-a0e2e71a4182.png)
-	Development Speed
Được hỗ trợ tích hợp sẵn giao diện Swagger – OpenAPI kèm theo cách code khá đơn giản nên lập trình có thể release function rất nhanh mà vẫn có document đầy đủ, đây là lợi thế có thể nói là quan trọng nhất của FastAPI so với các Framework khác. Dưới đây là một đoạn code in ra dòng text healthcheck
```
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel


class ResponseSchemaBase(BaseModel):
    code: str = '00'
    message: str = ''

app = FastAPI()

@app.post("/health-check", response_model=ResponseSchemaBase)
async def health_check():
    return {"message": "Health check success"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

-	Bất đồng bộ
Hiện tại bất đồng bộ đã được hỗ trợ từ phiên bản Django 3.x nhưng ngay từ khi release, FastAPI mặc định đã hỗ trợ developer Async, cũng vì vậy mà FastAPI chỉ có thể sử dụng với python3.6 trở lên
## Compare Django, Flask and FastAPI
Dưới đây là bảng so sánh giữa 3 Framework Django, Flask và FastAPI dựa trên những kinh nghiệm của bản thân mình trong việc trải nghiệm cả 3 framework

| | Django | Flask | FastAPI |
| -------- | -------- | -------- | -------- |
| Community     | Cộng đồng của Django hiện tại khá lớn và lâu đời, vì vậy số lượng lib hỗ trợ cho Django có thể nói là nhiều nhất ở thời điểm hiện tại     | Cộng đồng của Flask hiện tại cũng lớn nhưng không bằng Django, bởi vậy số lượng lib cũng hạn chế hơn Django     | Cộng đồng của FastAPI là khá mới, do vậy số lượng lib hỗ trợ khá ít     |
| Python version     | All version: 2x, 3x     | All version: 2x, 3x     | Only python3.x     |
| Performance     | Do hỗ trợ nhiều feature nên perfomance của Django không được cao     | Performance khá cao     | Là framework có hiệu năng cao nhất trong các framework python hiện tại     |
| ORM     | Django ORM     | Flask-sqlachemy     | Sqlachemy     |
| Async     | Hỗ trợ từ Django 3.x     | Chưa hỗ trợ     | Tương thích hoàn toàn     |
| Builtin Admin UI      | Có     | Không     | Không     |
| Project Frame     | Có, chỉ cần run python manage startapp yourapp     | Không     | Không     |
| Python shell     | Có     | Có     | Không – đây là hạn chế của một microframework so với các framework thực thụ     |
| OpenAPI document     | Phổ biến nhất là sử dụng Django-rest-framework, với Swagger thì dùng django-rest-swagger với python2.x, dùng drf-yasg với python3.x     | Sử dụng Flask-restplus     | Mặc định đã tích hợp sẵn Swagger và Redocs     |