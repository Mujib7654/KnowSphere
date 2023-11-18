const quizData = [
    {
      question: 'What is a blockchain?',
      options: ['A centralized database', 'A decentralized and distributed ledger', 'A programming language', 'A type of cryptocurrency'],
      answer: 'A decentralized and distributed ledger',
    },
    {
      question: 'What is a smart contract in the context of blockchain?',
      options: ['A legally binding contract', 'An automated, self-executing contract with the terms of the agreement directly written into code', 'A contract with a high level of intelligence', 'A contract used in the financial industry'],
      answer: 'An automated, self-executing contract with the terms of the agreement directly written into code',
    },
    {
      question: 'What is the consensus mechanism used in Bitcoin?',
      options: ['Proof of Authority', 'Proof of Stake', 'Proof of Work', 'Delegated Proof of Stake'],
      answer: 'Proof of Work',
    },
    {
      question: 'Explain the concept of a private blockchain.',
      options: ['A blockchain restricted to a single entity', 'A blockchain with public access', 'A blockchain used only for government purposes', 'A blockchain without any restrictions'],
      answer: 'A blockchain restricted to a single entity',
    },
    {
      question: 'What is a decentralized application (DApp) in blockchain development?',
      options: ['An application developed by a decentralized team', 'An application without any users', 'An application that runs on a decentralized network and uses smart contracts', 'An application with centralized control'],
      answer: 'An application that runs on a decentralized network and uses smart contracts',
    },
    {
      question: 'What is the purpose of a token in blockchain?',
      options: ['To represent a physical asset', 'To serve as a unit of value in a blockchain network', 'To control the blockchain network', 'To facilitate communication between nodes'],
      answer: 'To serve as a unit of value in a blockchain network',
    },
    {
      question: 'What is a 51% attack in the context of blockchain security?',
      options: ['An attack on 51% of the network nodes', 'An attack where 51% of the total computing power in a network is controlled by a single entity', 'An attack involving 51% of the smart contracts', 'An attack that occurs 51% of the time'],
      answer: 'An attack where 51% of the total computing power in a network is controlled by a single entity',
    },
    {
      question: 'What is the role of a nonce in blockchain?',
      options: ['A cryptographic hash function', 'A random number used in proof-of-work algorithms', 'A consensus algorithm', 'A type of smart contract'],
      answer: 'A random number used in proof-of-work algorithms',
    },
    {
      question: 'Explain the concept of a fork in blockchain development.',
      options: ['A type of consensus mechanism', 'A split in the blockchain, creating two separate chains', 'A cryptographic algorithm', 'A type of encryption technique'],
      answer: 'A split in the blockchain, creating two separate chains',
    },
    {
      question: 'What is the significance of a public key in blockchain cryptography?',
      options: ['To encrypt data', 'To decrypt data', 'To verify digital signatures and receive funds', 'To sign transactions'],
      answer: 'To verify digital signatures and receive funds',
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