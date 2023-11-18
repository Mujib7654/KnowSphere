const quizData = [
    {
      question: 'What does RGB stand for in graphic design?',
      options: ['Red, Green, Blue', 'Really Good Brush', 'Random Graphics Board', 'Raster Graphics Base'],
      answer: 'Red, Green, Blue',
    },
    {
      question: 'Which file format is commonly used for lossless compression in images?',
      options: ['JPEG', 'PNG', 'GIF', 'SVG'],
      answer: 'PNG',
    },
    {
      question: 'What is the purpose of the Pen Tool in graphic design software like Adobe Illustrator?',
      options: ['To write text', 'To draw shapes and paths', 'To apply color to images', 'To create gradients'],
      answer: 'To draw shapes and paths',
    },
    {
      question: 'Explain the concept of kerning in typography.',
      options: ['Adjusting space between characters', 'Changing font styles', 'Adding decorative elements to text', 'Choosing color for text'],
      answer: 'Adjusting space between characters',
    },
    {
      question: 'What is the role of layers in graphic design software?',
      options: ['To add special effects', 'To organize and separate elements', 'To control screen brightness', 'To create 3D graphics'],
      answer: 'To organize and separate elements',
    },
    {
      question: 'In the context of color theory, what is complementary color?',
      options: ['Colors that are similar', 'Colors opposite each other on the color wheel', 'Colors with low saturation', 'Colors with high brightness'],
      answer: 'Colors opposite each other on the color wheel',
    },
    {
      question: 'What is the purpose of the eyedropper tool in graphic design software?',
      options: ['To draw straight lines', 'To sample and pick colors from an image', 'To add textures to images', 'To resize images'],
      answer: 'To sample and pick colors from an image',
    },
    {
      question: 'Explain the concept of the rule of thirds in graphic design.',
      options: ['A rule for font spacing', 'A rule for organizing layers', 'A rule for color selection', 'A compositional rule for placing visual elements'],
      answer: 'A compositional rule for placing visual elements',
    },
    {
      question: 'What is the purpose of vector graphics in graphic design?',
      options: ['To create realistic images', 'To compress image files', 'To represent images using mathematical equations', 'To apply filters to images'],
      answer: 'To represent images using mathematical equations',
    },
    {
      question: 'What does the term "DPI" stand for in graphic design?',
      options: ['Dots Per Inch', 'Digital Photo Integration', 'Design Pixel Index', 'Data Processing Interface'],
      answer: 'Dots Per Inch',
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