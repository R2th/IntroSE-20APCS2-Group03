Hi, xin chào cả nhà, đây là bài viết đầu tiên của mình. Hôm nay mình sẽ hướng dẫn các bạn tạo Custom Radio button đơn giản trong React Native mà không cần sử dụng thư viện nào cả.
hình ảnh đây ạ
![](https://images.viblo.asia/ef478feb-72ab-40af-a03e-277565474185.jpg)

đây là code ạ

ở phần styles. mình tạo 2 styles cho button và 2 styles cho text, buttonSelect và buttonNonSelect, buttonTextSelect và buttonTextNonSelect
```
/*this is styles for radio button*/
  buttonContainHorizontal:{
    flex:4,
    flexDirection: 'row',
    borderRadius: 4,
  },
  buttonNonSelect:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ededed',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#c1c1c1'
  },
  buttonSelect :{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#00bfa5',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  },

  buttonTextSelect:{
    fontSize: 14,
    fontFamily: 'sans-serif',
    color: '#fafafa'
  },
  buttonTextNonSelect:{
    fontSize: 14,
    fontFamily: 'sans-serif',
    color: '#777'
  },
```

Trong phần mình tạo 1 biến chứa giá trị, ví dụ như gender để chứa giá trị của radio button gender
```
const [gender, setGender] = useState(0) // 0 là "Nam", 1 là "Nữ"
```

Trong phần return, mình tạo 2 nút, thay đổi kiểu khi người dùng click vào
```
{/*This is form container*/}
	          	<View style={styles.formContain}>
		            {/*This is input contain*/}
		            <View style={styles.inputContain}>
		              <View style={styles.titleInput}>
		                <Text style={styles.titleInputText}>Gender</Text>
		              </View>

		              <View style={styles.buttonContainHorizontal}>
						<TouchableOpacity
							style= {gender == 0 ? styles.buttonSelect : styles.buttonNonSelect}
							onPress={() => setGender(0)}>

							<Text style={gender == 0? styles.buttonTextSelect : styles.buttonTextNonSelect}>{t('male')}</Text>
							<Text style={styles.titleInputDesc}>+0</Text>

						</TouchableOpacity>

						<TouchableOpacity
							style={gender == 1 ? styles.buttonSelect : styles.buttonNonSelect}
							onPress={() => setGender(1)}>

							<Text style={gender == 1? styles.buttonTextSelect : styles.buttonTextNonSelect}>{t('female')}</Text>
							<Text style={styles.titleInputDesc}>+1</Text>

						</TouchableOpacity>
		              </View>
		            </View>
		            {/*end input contain*/}
	          	</View>
	         	 {/*end from contain*/}
```

Như vậy khi người dùng chọn "nam", button nào được chọn sẽ thay đổi kiểu, và giá trị của biến gender cũng thay đổi theo

Chỉ có vậy thôi ạ. Đây là bài viết đầu tiên của em. mong các anh chị chém nhẹ tay thôi ạ

full code

```
import React, {useState} from 'react'
import {View, Text, TextInput, ScrollView, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard} from 'react-native'

import AdMob from '../components/AdMob'

import {styles} from '../components/styles'
import {t} from '../locales/index'

export default function NauseaVomiting(){

	const [gender, setGender] = useState(0)
	const [smoke, setSmoke] = useState(0)
	const [history, setHistory] = useState(0)
	const [opioid, setOpioid] = useState(0)

	var point = gender + smoke + history + opioid
	var rick = 0

	switch(point) {
	  case 0:
	    rick = 10
	    break;
	  case 1:
	    rick = 21
	    break;
	  case 2:
	    rick = 39
	    break;
	  case 3:
	    rick = 61
	    break;
	  case 4:
	    rick = 79
	    break;
	  default:
	    rick = 0
	}

	return(
	<View>
	    <ScrollView>
	    <KeyboardAvoidingView style={styles.container}>
	      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
	      	<View style={styles.inner}>
	      		{/*This is header*/}
		        <View style={styles.headerContain}>
			        <Text style={styles.headerTitle}>{t('nausea_voimiting')}</Text>
			        <Text style={styles.headerSubTitle}>{t('nausea_voimiting_desc')}</Text>
			        </View>
		        {/*End header*/}

				<View style={styles.formInfo}>
              		<Text style={styles.infoText}>{t('nausea_voimiting_info')}</Text>
            	</View>

				{/*This is form container*/}
	          	<View style={styles.formContain}>
		            {/*This is input contain*/}
		            <View style={styles.inputContain}>
		              <View style={styles.titleInput}>
		                <Text style={styles.titleInputText}>{t('gender')}</Text>
		              </View>

		              <View style={styles.buttonContainHorizontal}>
						<TouchableOpacity
							style= {gender == 0 ? styles.buttonSelect : styles.buttonNonSelect}
							onPress={() => setGender(0)}>

							<Text style={gender == 0? styles.buttonTextSelect : styles.buttonTextNonSelect}>{t('male')}</Text>
							<Text style={styles.titleInputDesc}>+0</Text>

						</TouchableOpacity>

						<TouchableOpacity
							style={gender == 1 ? styles.buttonSelect : styles.buttonNonSelect}
							onPress={() => setGender(1)}>

							<Text style={gender == 1? styles.buttonTextSelect : styles.buttonTextNonSelect}>{t('female')}</Text>
							<Text style={styles.titleInputDesc}>+1</Text>

						</TouchableOpacity>
		              </View>
		            </View>
		            {/*end input contain*/}
	          	</View>
	         	 {/*end from contain*/}

	         	 {/*This is form container*/}
	          	<View style={styles.formContain}>
		            {/*This is input contain*/}
		            <View style={styles.inputContain}>
		              <View style={styles.titleInput}>
		                <Text style={styles.titleInputText}>{t('smoking_status')}</Text>
		              </View>

		              <View style={styles.buttonContainHorizontal}>
						<TouchableOpacity
							style= {smoke == 0 ? styles.buttonSelect : styles.buttonNonSelect}
							onPress={() => setSmoke(0)}>

							<Text style={smoke == 0? styles.buttonTextSelect : styles.buttonTextNonSelect}>{t('yes')}</Text>
							<Text style={styles.titleInputDesc}>+0</Text>

						</TouchableOpacity>

						<TouchableOpacity
							style={smoke == 1 ? styles.buttonSelect : styles.buttonNonSelect}
							onPress={() => setSmoke(1)}>

							<Text style={smoke == 1? styles.buttonTextSelect : styles.buttonTextNonSelect}>{t('no')}</Text>
							<Text style={styles.titleInputDesc}>+1</Text>

						</TouchableOpacity>
		              </View>
		            </View>
		            {/*end input contain*/}
	          	</View>
	         	 {/*end from contain*/}

	         	 {/*This is form container*/}
	          	<View style={styles.formContain}>
		            {/*This is input contain*/}
		            <View style={styles.inputContain}>
		              <View style={styles.titleInput}>
		                <Text style={styles.titleInputText}>{t('history_ motion_sickness')}</Text>
		              </View>

		              <View style={styles.buttonContainHorizontal}>
						<TouchableOpacity
							style= {history == 1 ? styles.buttonSelect : styles.buttonNonSelect}
							onPress={() => setHistory(1)}>

							<Text style={history == 1? styles.buttonTextSelect : styles.buttonTextNonSelect}>{t('yes')}</Text>
							<Text style={styles.titleInputDesc}>+1</Text>

						</TouchableOpacity>

						<TouchableOpacity
							style={history == 0 ? styles.buttonSelect : styles.buttonNonSelect}
							onPress={() => setHistory(0)}>

							<Text style={history == 0? styles.buttonTextSelect : styles.buttonTextNonSelect}>{t('no')}</Text>
							<Text style={styles.titleInputDesc}>+0</Text>

						</TouchableOpacity>
		              </View>
		            </View>
		            {/*end input contain*/}
	          	</View>
	         	 {/*end from contain*/}

	         	{/*This is form container*/}
	          	<View style={styles.formContain}>
		            {/*This is input contain*/}
		            <View style={styles.inputContain}>
		              <View style={styles.titleInput}>
		                <Text style={styles.titleInputText}>{t('use_postoperative_opioid')}</Text>
		              </View>

		              <View style={styles.buttonContainHorizontal}>
						<TouchableOpacity
							style= {opioid == 1 ? styles.buttonSelect : styles.buttonNonSelect}
							onPress={() => setOpioid(1)}>

							<Text style={opioid == 1? styles.buttonTextSelect : styles.buttonTextNonSelect}>{t('yes')}</Text>
							<Text style={styles.titleInputDesc}>+1</Text>

						</TouchableOpacity>

						<TouchableOpacity
							style={opioid == 0 ? styles.buttonSelect : styles.buttonNonSelect}
							onPress={() => setOpioid(0)}>

							<Text style={opioid == 0? styles.buttonTextSelect : styles.buttonTextNonSelect}>{t('no')}</Text>
							<Text style={styles.titleInputDesc}>+0</Text>

						</TouchableOpacity>
		              </View>
		            </View>
		            {/*end input contain*/}
	          	</View>
	         	 {/*end from contain*/}

	         	{/*This is result contain*/}
		          <View style={styles.resultContain}>
		              <View style={styles.resultTitle}>
		                <Text style={styles.resultTitleText}>{point} {t('point')}</Text>
		              	<Text style={styles.resultTitleDesc}>{t('apfel_score')}</Text>
		           </View>

		           <Text style={styles.result}>{rick}%</Text>
		           <Text style={styles.unit}>{t('rick_ponv')}</Text>
		          </View>
		          {/*End result contain*/}

		         <View style={styles.formInfo}>
		         	<Text style={styles.titleInfo}>{t('advice')}</Text>
              		<Text style={styles.infoText}>{t('ponv_advice')}</Text>
            	</View>

            	<View style={styles.formInfo}>
            		<Text style={styles.titleInfo}>{t('facts_figures')}</Text>

            		<View style={styles.formInfo2col}>
	            		<View style={styles.infoCol1}>
		            		<Text style={styles.infoText}>{t('apfel_score')}</Text>
	            		</View>

	            		<View style={styles.infoCol2}>
	            			<Text style={styles.infoText}>{t('rick_ponv')}</Text>
	            		</View>
	            	</View>

            		<View style={styles.formInfo2col}>
	            		<View style={styles.infoCol1}>
		            		<Text style={styles.infoText}>0</Text>
	            		</View>

	            		<View style={styles.infoCol2}>
	            			<Text style={styles.infoText}>10%</Text>
	            		</View>
	            	</View>

            		<View style={styles.formInfo2col}>
	            		<View style={styles.infoCol1}>
		            		<Text style={styles.infoText}>1</Text>
	            		</View>

	            		<View style={styles.infoCol2}>
	            			<Text style={styles.infoText}>21%</Text>
	            		</View>
	            	</View>

            		<View style={styles.formInfo2col}>
	            		<View style={styles.infoCol1}>
		            		<Text style={styles.infoText}>2</Text>
	            		</View>

	            		<View style={styles.infoCol2}>
	            			<Text style={styles.infoText}>39%</Text>
	            		</View>
	            	</View>

            		<View style={styles.formInfo2col}>
	            		<View style={styles.infoCol1}>
		            		<Text style={styles.infoText}>3</Text>
	            		</View>

	            		<View style={styles.infoCol2}>
	            			<Text style={styles.infoText}>61%</Text>
	            		</View>
	            	</View>

            		<View style={styles.formInfo2col}>
	            		<View style={styles.infoCol1}>
		            		<Text style={styles.infoText}>4</Text>
	            		</View>

	            		<View style={styles.infoCol2}>
	            			<Text style={styles.infoText}>79%</Text>
	            		</View>
	            	</View>

            	</View>

            	<View style={styles.formInfo}>
            		<Text style={styles.infoText}>{t('creator')}: {'Dr. Christian C. Apfel'}</Text>
				</View>

	      	</View>
	      </TouchableWithoutFeedback>
	    </KeyboardAvoidingView>

	    </ScrollView>

	</View>
	)
}

```