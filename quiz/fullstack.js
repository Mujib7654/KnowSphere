const quizData = [
    {
      question: 'What does the term "full stack" refer to in web development?',
      options: ['The entire stack of pancakes at a brunch', 'A stack of code written in multiple programming languages', 'The combination of front-end and back-end development skills', 'A comprehensive set of web design tools'],
      answer: 'The combination of front-end and back-end development skills',
    },
    {
      question: 'What is the purpose of a front-end framework like React or Angular?',
      options: ['To handle server-side logic', 'To manage databases', 'To create user interfaces and handle client-side logic', 'To optimize website performance'],
      answer: 'To create user interfaces and handle client-side logic',
    },
    {
      question: 'In the context of databases, what is MongoDB?',
      options: ['A relational database', 'A NoSQL database', 'A programming language', 'A server-side scripting language'],
      answer: 'A NoSQL database',
    },
    {
      question: 'Explain the role of Node.js in full-stack development.',
      options: ['A front-end framework', 'A back-end framework', 'A database management system', 'A testing library'],
      answer: 'A back-end framework',
    },
    {
      question: 'What is the purpose of RESTful APIs in full-stack development?',
      options: ['To design user interfaces', 'To manage databases', 'To enable communication between the front end and back end', 'To handle server-side logic'],
      answer: 'To enable communication between the front end and back end',
    },
    {
      question: 'What is the significance of version control systems like Git in full-stack development?',
      options: ['To design user interfaces', 'To manage databases', 'To enable communication between the front end and back end', 'To track changes in code and collaborate with others'],
      answer: 'To track changes in code and collaborate with others',
    },
    {
      question: 'Explain the concept of MVC (Model-View-Controller) in the context of web development.',
      options: ['A database architecture', 'A front-end framework', 'A design pattern that separates the application into three components', 'A version control system'],
      answer: 'A design pattern that separates the application into three components',
    },
    {
      question: 'What is the purpose of package managers like npm or Yarn in full-stack development?',
      options: ['To design user interfaces', 'To manage databases', 'To enable communication between the front end and back end', 'To manage and install project dependencies'],
      answer: 'To manage and install project dependencies',
    },
    {
      question: 'In the context of full-stack development, what is CORS?',
      options: ['A front-end framework', 'A security feature in databases', 'A protocol for communication between the front end and back end', 'A security feature to control cross-origin resource sharing'],
      answer: 'A security feature to control cross-origin resource sharing',
    },
    {
      question: 'Explain the concept of serverless architecture in full-stack development.',
      options: ['A type of database architecture', 'A design pattern that eliminates the need for servers', 'A front-end framework', 'A version control system'],
      answer: 'A design pattern that eliminates the need for servers',
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