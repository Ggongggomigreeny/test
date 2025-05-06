function ledOn() {
  console.log("led 켜짐")
  var ref = database.ref('led');
  ref.update({ led: 1 })
}

function ledOff() {
  console.log("led 꺼짐")
  var ref = database.ref('led');
  ref.update({ led: 0 })
}

var config = {
    apiKey: "AIzaSyCTElvOqjzcz_cP7qCt_VXVuRplYL_Fnrw",
    authDomain: "page-20a3b.firebaseapp.com",
    databaseURL: "https://page-20a3b-default-rtdb.firebaseio.com",
    projectId: "page-20a3b",
    storageBucket: "page-20a3b.firebasestorage.app",
    messagingSenderId: "358964190185",
    appId: "1:358964190185:web:a8c4f20981e83acd858978"
};

//Firebase 데이터베이스 만들기
firebase.initializeApp(config);
database = firebase.database();

// Firebase 데이터베이스 정보 가져오기
var ref = database.ref("led");
ref.on("value", gotData);

function gotData(data) {
  var val = data.val();

  if (val.led == 0){
    document.getElementById("img").src = "ledoff.png";}
  else {
    document.getElementById("img").src = "ledon.png";}

  console.log(val)
}

var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

// 음성 인식 설정
recognition.lang = 'ko-KR';         // 인식할 언어 설정 (한국어)
recognition.interimResults = false;  // 중간 결과를 반환하지 않음 (최종 결과만 반환)
recognition.maxAlternatives = 1;     // 인식 결과의 대안 개수를 1개로 설정

// 음성 인식 시작
recognition.start();

// 음성 인식 결과 처리 이벤트 핸들러
recognition.onresult = function(event) {
  // 인식된 텍스트 추출 (첫 번째 결과의 첫 번째 대안)
  var speechResult = event.results[0][0].transcript;
  // 콘솔에 인식된 텍스트 출력
  console.log('인식된 텍스트: ' + speechResult);

  // '켜'라는 단어가 포함된 경우 LED를 켬
  if ((speechResult.indexOf('밝게') !== -1) || (speechResult.indexOf('켜') !== -1) || (speechResult.indexOf('on') !== -1)){
    ledOn()
  }

  // '꺼'라는 단어가 포함된 경우 LED를 끔
  if ((speechResult.indexOf('어둡게') !== -1) || (speechResult.indexOf('꺼') !== -1) || (speechResult.indexOf('off') !== -1)) {
    ledOff()
  }
};

// 음성 인식 오류 처리 이벤트 핸들러
recognition.onerror = function(event) {
  // 오류 메시지를 콘솔에 출력
  // 주요 오류 유형:
  // - no-speech: 음성이 감지되지 않음
  // - aborted: 사용자 또는 시스템에 의해 인식이 중단됨
  // - network: 네트워크 오류
  // - not-allowed: 마이크 권한이 없음
  console.log('오류 발생: ' + event.error);
};

// 음성 인식 종료 이벤트 핸들러
// 음성 인식이 종료될 때마다 다시 시작하여 연속적인 인식 가능
recognition.onend = function() {
  // 음성 인식 재시작
  recognition.start();
};
