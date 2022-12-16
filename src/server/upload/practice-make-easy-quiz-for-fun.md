**Tạo 1 Quiz game đơn giản với nội dung như sau:**
- Gồm 3 câu hỏi
- Mỗi câu hỏi có 3 đáp án, chỉ được phép chọn 1 đáp án cho mỗi câu
- Button submit kết quả
- Count  được số đáp án chính xác


**Tạo file index.html**
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Thuy's Mega Quiz</title>
		<link rel="stylesheet" href="./index.css">
	</head>
	<body>
		<div id="quiz"></div>
		<script src="./View.js"></script>
		<script src="./Logic.js"></script>
	</body>
</html>
```

**Tạo file view.js**
```
var View = {
	renderQuestionText: function (text) {
		return '<div class="quiz__text">' + text + '</div>';
	},
	renderAnswer: function (name, value, text) {
		return '<label><input type="radio" name="' + name + '" value="' + value + '">' + text + '</label>';
	},
	// @param array answers
	renderAnswerList: function(name, answers) {
		var answersHtml = [];
		for (var answerId in answers) {
			if (answers.hasOwnProperty(answerId)) {
				answersHtml.push(this.renderAnswer(name, answerId, answerId + ' : ' + answers[answerId]));
			}
		}
		return '<div class="quiz__answers">' + answersHtml + '</div>';
	},
	renderQuestion: function(name, text, answers) {
		return '<div class="quiz__question">'
			+ this.renderQuestionText(text)
			+ this.renderAnswerList(name, answers)
			+ '</div>';
	},
	renderLine: function() {
		return '<hr>';
	},
	renderButton: function() {
		return '<button id="quiz__submit">Get Results</button>';
	},
	renderResults: function(correct, count) {
		return '<div id="quiz__results">' + correct + ' / ' + count + '</div>';
	}
};
```

**Tạo file logic.js**
```
(function (window, View) {
	var database = [
		{
			text: 'Who is Thuy?',
			answers: {
				a: 'A tiger',
				b: 'A cat',
				c: 'A hooman'
			},
			result: 'b'
		},
		{
			text: 'What does Thuy do?',
			answers: {
				a: 'Eat',
				b: 'Work',
				c: 'Sleep'
			},
			result: 'c'
		},
		{
			text: 'How does Thuy feel?',
			answers: {
				a: 'Happy',
				b: 'Sad',
				c: 'Crazy'
			},
			result: 'a'
		}
	];

	var QuizBuilder = {
		// Hien thi toan bo noi dung bai test
		// Truyen list cau hoi vao day
		render: function(questions) {
			var html_parts = [];
			// hien thi tung cau hoi
			for (var i = 0; i < questions.length; i++) {
				var question = questions[i];
				html_parts.push(View.renderQuestion('question_' + i, question.text, question.answers));
			}

			// them button vo
			html_parts.push(View.renderButton());

			// them duong thang
			html_parts.push(View.renderLine());

			// them ket qua vo
			html_parts.push(View.renderResults(0, questions.length));

			// join lai roi tra ve chuoi html
			return html_parts.join('');
		},
		// Lay so cau tra loi dung
		getCorrectCount: function(questions) {
			var correctCount = 0;
			for (var i = 0, question; i < questions.length; i++) {
				question = questions[i];
				var answers = document.getElementsByName('question_' + i);
				for (var answer_idx = 0; answer_idx < answers.length; answer_idx++) {
					var answer = answers[answer_idx];
					if (answer.checked && answer.value == question.result) {
						correctCount += 1;
						correctAnswer = true;
						answer.parentElement.style.color = 'black';
					}
					else if (answer.value == question.result){
						answer.parentElement.style.color = 'green';
					}
				}
			}

			return correctCount;
		},
		// su kien click button
		clickButton: function(questions) {
			document.getElementById('quiz__results').innerHTML = View.renderResults(this.getCorrectCount(questions), questions.length);
		}
	};

	window.onload = function() {
		// hien thi toan bo noi dung bai thi
		document.getElementById('quiz').innerHTML = QuizBuilder.render(database);
		// bat su kien click
		document.getElementById('quiz__submit').onclick = function() {
			QuizBuilder.clickButton(database);
		};
	};
})(window, View);
```

**Tạo file index.css**
```
html,body {
	margin: 0;
    padding: 0;
}
#quiz {
	background: #dfdfdf;
    width: 500px;
    margin: 0 auto;
    padding: 20px;
    font-size: 18px;
    text-align: center;
}
.quiz__question {
	padding: 0 20px;
	text-align: left;
	margin-bottom: 10px;
}
.quiz__text {
	font-size: 22px;
    margin-bottom: 5px;
    font-weight: bold;
}
.quiz__answers label {
	/*margin-right: 10px;	*/
	padding: 2px 10px;	
}
.quiz__answers label:hover {
	background: #bbb;
}
.quiz__answers label input {
	margin: 0px;
	margin-right: 4px;
	vertical-align: middle;
}
button#quiz__submit {
	background: #3a8;
    color: white;
    padding: 15px;
    border: solid 1px transparent;
    border-radius: 5px;
    margin: 0 auto;
    margin-top: 30px;
}
.quiz__answers label, button {
	cursor: pointer;
}
```

**Kết quả**

![](https://images.viblo.asia/11d65a1a-04ec-4f9d-bbef-82f8dc3a42db.PNG)
![](https://images.viblo.asia/db664b33-3aa5-41f1-8c01-7e005a55a8d0.PNG)
![](https://images.viblo.asia/b18392ec-214e-4a19-a4ad-c3569de4dac1.PNG)