 
  function startQuiz(type) {
  quizData = quizSets[type];
  currentIndex = 0;
  score = 0;
  isAnswered = false;

   // 선택 화면 숨기기, 퀴즈 화면 보이기
  document.getElementById("quiz-selection").classList.add("hidden");
  document.getElementById("quiz-area").classList.remove("hidden");

  // 처음으로 돌아가기 버튼 숨기기
  document.getElementById("back-to-selection-btn").classList.add("hidden");

  loadQuestion();
}
 
  const quizData1 = [
    {
      question: "다음 중 결과가 boolean형으로 나오는 연산자가 아닌 것은?",
      options: [
        "!",
        "&&",
        ">",
        "+="
      ],
      correct: 3
    },
    {
      question: "다음 중 컴파일 에러가 발생하는 것은?",
      options: [
        "byte a = 1;",
        "boolean b = 1;",
        "char c = 1;",
        "double d = 1;"
      ],
      correct: 1
    },
    {
      question: "다음 수식을 계산했을 때 다른 값이 출력되는 것은?",
      options: [
        "1 + 2 / 3",
        "2.0 / (int) 5.2",
        "(int) 6.0 / (int) 5.0",
        "((int) 2.8 - 1)"
      ],
      correct: 1
    },
    {
      question: "특정 변수의 값을 변경시키지 못하도록 하는 키워드는?",
      options: [
        "final",
        "finally",
        "static",
        "public"
      ],
      correct: 0
    },
    {
      question: "자바의 기본자료형 중에서 가장 큰 정수형 자료형은?",
      type : "text",
      correctAnswer : "long"
    },
    {
      question: "자바의 기본자료형 중에서 가장 큰 실수형 자료형은?",
      type : "text",
      correctAnswer : "double"
    },
    {
      question: "자바의 기본자료형 중에서 주로 1문자를 표현하는데 사용되는 자료형은?",
      type : "text",
      correctAnswer : "char"
    },
    {
      question: "자바의 기본자료형 중에서 논리적인 값 true 혹은 false 만을 가질 수 있는 자료형은?",
      type : "text",
      correctAnswer : "boolean"
    }
  ];

  const quizData2 = [
    {
      question: "다음 중 MySQL에서 문자열 자료형이 아닌 것은?",
      options: [
        "VARCHAR",
        "TEXT",
        "INT",
        "CHAR"
      ],
      correct: 2
    },
    {
      question: "다음 중 WHERE 절에서 사용 가능한 비교 연산자가 아닌 것은?",
      options: [
        "=",
        "!=",
        "BETWEEN",
        "ORDER"
      ],
      correct: 3
    },
    {
      question: "다음 중 두 값을 같은지를 비교하는 비교 연산자는?",
      options: [
        ":=",
        "==",
        "=",
        "==="
      ],
      correct: 2
    },
    {
      question: "다음 중 SQL에서 테이블을 생성할 때 사용하는 키워드는?",
      options: [
        "MAKE TABLE",
        "NEW TABLE",
        "CREATE TABLE",
        "SET TABLE"
      ],
      correct: 2
    },
    {
      question: "SELECT 문에서 중복된 결과를 제거할 때 사용하는 키워드는?",
      options: [
        "UNIQUE",
        "DISTINCT",
        "DELETE",
        "LIMIT"
      ],
      correct: 1
    },
    {
      question: "다음 중 날짜와 관련된 MySQL 함수가 아닌 것은?",
      options: [
        "Now()",
        "CURDATE()",
        "ADDDATE()",
        "SUBSTRING()"
      ],
      correct: 3
    },
    {
      question: "현재 날짜와 시간을 반환하는 MySQL 함수는?",
      type : "text",
      correctAnswer : "now()"
    },
    {
      question: "문자열 길이를 구하는 함수는?",
      type : "text",
      correctAnswer : "Length()"
    }
  ];

  const quizSets = {
  jp: quizData1,
  db: quizData2
};

  let quizData;
  let currentIndex = 0;
  let score = 0;
  let isAnswered = false; // 정답이 이미 표시되었는지 여부

  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const resultEl = document.getElementById("result");
  const submitBtn = document.getElementById("submit-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const showAnswerBtn = document.getElementById("show-answer-btn");  


  //현재 문제를 화면에 출력
  function loadQuestion() {
    const current = quizData[currentIndex];
    questionEl.textContent = `Q${currentIndex + 1}. ${current.question}`;
    optionsEl.innerHTML = "";

    if (current.type === "text") {
    optionsEl.innerHTML = `
      <input type="text" id="text-answer" placeholder="정답을 입력하세요" style="width:100%; padding:8px; font-size:16px;" />
    `;
    } else {
      current.options.forEach((option, index) => {
      const label = document.createElement("label");
      label.classList.add("option-box");
      label.innerHTML = `
        <input type="radio" name="answer" value="${index}" />
        ${option}
      `;
      label.addEventListener("click", () => {
        // 선택된 박스에 .selected 클래스 추가
        if (isAnswered) return;  // 정답 표시 후 클릭 무시
        document.querySelectorAll('.option-box').forEach(el => el.classList.remove('selected'));
        label.classList.add('selected');
      });
      optionsEl.appendChild(label);
    });
    }

    resultEl.textContent = "";
    submitBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
    showAnswerBtn.classList.remove("hidden");
    restartBtn.classList.add("hidden");

    isAnswered = false; // 새 문제에서 초기화

    const labels = document.querySelectorAll(".option-box");
    labels.forEach(label => {
      label.style.pointerEvents = "auto";
    });
  }


  //사용자의 정답을 확인
  //정답일 경우 '다음' 버튼이 생성되고 '제출', '정답 보기' 버튼이 사라짐
  function submitAnswer() {
    const current = quizData[currentIndex];
    if (current.type === "text") {
    const userInput = document.getElementById("text-answer").value.trim().toLowerCase();
    const correct = current.correctAnswer.toLowerCase();

    if (userInput === "") {
      resultEl.textContent = "정답을 입력해주세요.";
      resultEl.style.color = "orange";
      return;
    }

    if (userInput === correct) {
      resultEl.textContent = "정답입니다!";
      resultEl.style.color = "green";
      submitBtn.classList.add("hidden");
      nextBtn.classList.remove("hidden");
      showAnswerBtn.classList.add("hidden");
      score++;
    } else {
      resultEl.textContent = "틀렸습니다. 다시 시도해보세요.";
      resultEl.style.color = "red";
    }
  } else {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
      resultEl.textContent = "정답을 선택해주세요.";
      resultEl.style.color = "orange";
      return;
    }

    const answer = parseInt(selected.value);
    const current = quizData[currentIndex];
    const correct = quizData[currentIndex].correct;
    const labels = document.querySelectorAll(".option-box");
    

    if (answer === correct) {
      labels[correct].classList.add("selected");
      labels[correct].style.borderColor = "green";
      labels[correct].style.backgroundColor = "#d4edda";

      resultEl.textContent = "정답입니다!";
      resultEl.style.color = "green";

      submitBtn.classList.add("hidden");
      nextBtn.classList.remove("hidden");
      showAnswerBtn.classList.add("hidden");
      score++;
      isAnswered = true;

       const inputs = document.querySelectorAll('input[name="answer"]');
       inputs.forEach(input => input.disabled = true);
    } else {
      labels[answer].style.borderColor = "red";
      labels[answer].style.backgroundColor = "#f8d7da";

      resultEl.textContent = "틀렸습니다. 다시 시도해보세요.";
      resultEl.style.color = "red";
      
      // 다음 버튼은 여전히 숨겨져 있어야 함
      nextBtn.classList.add("hidden");
      submitBtn.classList.remove("hidden"); // 제출 버튼은 계속 표시
      }
     }
  }

  //다음 문제로 넘어가기
  function loadNextQuestion() {
    currentIndex++;
    if (currentIndex < quizData.length) {
      loadQuestion();
    } else {
      showFinalResult();
    }

  }

  //문제를 다 풀었을 때 나오는 화면
  function showFinalResult() {
    questionEl.textContent = "모든 문제를 풀었습니다.";
    optionsEl.innerHTML = "";
    resultEl.innerHTML = "";
    resultEl.style.color = "black";
    nextBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");

    document.getElementById("back-to-selection-btn").classList.remove("hidden");
  }

  //전체 퀴즈를 다시 시작
  function restartQuiz() {
    currentIndex = 0;
    score = 0;
    restartBtn.classList.add("hidden");
    document.getElementById("back-to-selection-btn").classList.add("hidden");
    loadQuestion();
  }

  //현재 문제의 정답 확인
  function showAnswer() {
  if (isAnswered) return;

  const current = quizData[currentIndex];

   if (current.type === "text") {
    resultEl.textContent = `정답: ${current.correctAnswer}`;
    resultEl.style.color = "blue";
  } else {
  const correct = current.correct;
  const labels = document.querySelectorAll(".option-box");

  labels.forEach(label => {
    label.style.pointerEvents = "none";
  });

  labels.forEach((label, index) => {
      // 모든 선택지에서 selected 제거
      label.classList.remove("selected");
      label.style.borderColor = ""; // 초기화
      label.style.backgroundColor = ""; // 초기화

      if (index === correct) {
        label.classList.add("selected"); // 선택 효과 주기
        label.style.borderColor = "green";
        label.style.backgroundColor = "#d4edda";
      }
    });

  resultEl.textContent = "정답이 표시되었습니다.";
  resultEl.style.color = "blue";
  }

  isAnswered = true;

  const inputs = document.querySelectorAll('input[name="answer"]');
  inputs.forEach(input => input.disabled = true);
  

  // 제출 버튼 숨기고 다음 버튼 보이게 처리
  submitBtn.classList.add("hidden");
  nextBtn.classList.remove("hidden");
  showAnswerBtn.classList.add("hidden");
  
  // 정답 보기 버튼 숨기기
  showAnswerBtn.classList.add("hidden");
  }

  function goToSelection() {
  document.getElementById("quiz-area").classList.add("hidden");
  document.getElementById("quiz-selection").classList.remove("hidden");

  // 초기화
  currentIndex = 0;
  score = 0;
  isAnswered = false;
}

  