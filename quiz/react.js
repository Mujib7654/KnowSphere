const quizData = [
  
    {
      question: 'What is the purpose of the useState hook in React?',
      options: ['To manage component state', 'To fetch data from a server', 'To create a new component', 'To handle side effects'],
      answer: 'To manage component state',
    },
    {
      question: 'What is the role of the ReactDOM library in React?',
      options: ['To manipulate the DOM directly', 'To handle routing in React', 'To manage component state', 'To render React components to the DOM'],
      answer: 'To render React components to the DOM',
    },
    {
      question: 'What are props in React?',
      options: ['Local state in a component', 'External data passed to a component', 'HTML attributes', 'Reacts built-in components'],
      answer: 'External data passed to a component',
    },
    {
      question: 'Explain the concept of "lifting state up" in React.',
      options: ['Elevating the state of a child component to its parent', 'Moving state from a functional component to a class component', 'Rendering a component higher in the DOM tree', 'Removing state from a component'],
      answer: 'Elevating the state of a child component to its parent',
    },
    {
      question: 'What is the purpose of the useCallback hook in React?',
      options: ['To memoize functions for performance optimization', 'To manage component state', 'To handle side effects', 'To fetch data from a server'],
      answer: 'To memoize functions for performance optimization',
    },
    {
      question: 'Explain the concept of controlled components in React forms.',
      options: ['Components with restricted access', 'Components that require authentication', 'Components with controlled state', 'Components with external dependencies'],
      answer: 'Components with controlled state',
    },
    {
      question: 'What is the significance of the key prop in React lists?',
      options: ['To specify the order of elements', 'To uniquely identify elements in a list', 'To style list items', 'To handle events in a list'],
      answer: 'To uniquely identify elements in a list',
    },
    {
      question: 'What is Redux in the context of React?',
      options: ['A form of server-side rendering', 'A state management library', 'A built-in React component', 'A data fetching library'],
      answer: 'A state management library',
    },
    {
      question: 'What is the purpose of the useMemo hook in React?',
      options: ['To memoize values for performance optimization', 'To manage component state', 'To handle side effects', 'To fetch data from a server'],
      answer: 'To memoize values for performance optimization',
    },
    {
      question: 'Explain the concept of higher-order components (HOCs) in React.',
      options: ['Components rendered at the top of the DOM tree', 'Components with elevated state', 'Functions that take a component and return a new component', 'Components with external dependencies'],
      answer: 'Functions that take a component and return a new component',
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