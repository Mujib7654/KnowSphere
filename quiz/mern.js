const quizData = [
    {
      question: 'What does the MERN stack stand for in web development?',
      options: ['MySQL, Express.js, React.js, Node.js', 'MongoDB, Express.js, React.js, Node.js', 'Microsoft, Express.js, React.js, Node.js', 'Mocha, Express.js, React.js, Nginx'],
      answer: 'MongoDB, Express.js, React.js, Node.js',
    },
    {
      question: 'Which component of the MERN stack is used for server-side programming?',
      options: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
      answer: 'Node.js',
    },
    {
      question: 'What is the purpose of Express.js in the MERN stack?',
      options: ['To manage the database', 'To handle client-side logic', 'To create user interfaces', 'To build web servers and APIs'],
      answer: 'To build web servers and APIs',
    },
    {
      question: 'In the context of MongoDB, what is a document?',
      options: ['A file with code', 'A record in a table', 'A data structure in JavaScript', 'A record in a MongoDB collection'],
      answer: 'A record in a MongoDB collection',
    },
    {
      question: 'What is JSX in the context of React.js?',
      options: ['JavaScript Extension', 'JavaScript XML', 'JavaScript Execute', 'Java Syntax Extension'],
      answer: 'JavaScript XML',
    },
    {
      question: 'What is the virtual DOM in React.js?',
      options: ['A virtual representation of the browser DOM', 'A separate DOM for mobile devices', 'A simulation of document object model', 'A version of DOM for virtual reality'],
      answer: 'A virtual representation of the browser DOM',
    },
    {
      question: 'What is the purpose of npm in Node.js?',
      options: ['To manage server configuration', 'To create databases', 'To install and manage dependencies', 'To build user interfaces'],
      answer: 'To install and manage dependencies',
    },
    {
      question: 'What is the role of Babel in the MERN stack?',
      options: ['To manage server-side programming', 'To transpile JavaScript code', 'To handle database queries', 'To create user interfaces'],
      answer: 'To transpile JavaScript code',
    },
    {
      question: 'Explain the concept of middleware in Express.js.',
      options: ['Software between the client and server', 'Functions that have access to the request and response objects', 'A type of database middleware', 'A way to optimize server performance'],
      answer: 'Functions that have access to the request and response objects',
    },
    {
      question: 'What is the purpose of CORS in the context of MERN stack development?',
      options: ['To manage server configuration', 'To enable cross-origin resource sharing', 'To transpile JavaScript code', 'To create user interfaces'],
      answer: 'To enable cross-origin resource sharing',
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