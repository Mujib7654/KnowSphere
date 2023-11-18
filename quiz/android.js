const quizData = [
    {
      question: 'What is the purpose of the Intent class in Android development?',
      options: ['To manage component state', 'To navigate between activities', 'To handle background services', 'To create a new layout'],
      answer: 'To navigate between activities',
    },
    {
      question: 'Which XML-based language is used for designing the layout in Android?',
      options: ['JSON', 'HTML', 'XML', 'YAML'],
      answer: 'XML',
    },
    {
      question: 'What is an APK in the context of Android?',
      options: ['Android Package Kit', 'Application Programming Kit', 'Android Programming Key', 'Application Package Kit'],
      answer: 'Android Package Kit',
    },
    {
      question: 'Explain the concept of an Activity in Android development.',
      options: ['A unit of work in Android', 'A data storage class', 'A background process in Android', 'An external library in Android'],
      answer: 'A unit of work in Android',
    },
    {
      question: 'What is the purpose of the Gradle build system in Android development?',
      options: ['To manage component state', 'To handle background services', 'To build and manage the project', 'To create a new layout'],
      answer: 'To build and manage the project',
    },
    {
      question: 'Explain the concept of an AsyncTask in Android.',
      options: ['A background process in Android', 'A unit of work in Android', 'A layout component in Android', 'An external library in Android'],
      answer: 'A background process in Android',
    },
    {
      question: 'What is the AndroidManifest.xml file used for?',
      options: ['To specify the order of activities', 'To uniquely identify elements in a list', 'To handle events in Android', 'To declare essential information about the application'],
      answer: 'To declare essential information about the application',
    },
    {
      question: 'What is the purpose of the RecyclerView in Android development?',
      options: ['To manage component state', 'To display a scrolling list of elements', 'To handle background services', 'To create a new layout'],
      answer: 'To display a scrolling list of elements',
    },
    {
      question: 'What is the purpose of the IntentService class in Android?',
      options: ['To navigate between services', 'To manage component state', 'To handle background services asynchronously', 'To create a new layout'],
      answer: 'To handle background services asynchronously',
    },
    {
      question: 'Explain the concept of Fragments in Android development.',
      options: ['Small pieces of code', 'Sections of an activity with their own lifecycle', 'To handle background services', 'To create a new layout'],
      answer: 'Sections of an activity with their own lifecycle',
    },
];


const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();