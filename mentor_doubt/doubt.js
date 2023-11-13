const firebaseConfig = {
  apiKey: "AIzaSyBXSnGEfKTmoLznCzva3o2SLAJaJFG9s4g",
  authDomain: "knowsphere-cf9d5.firebaseapp.com",
  databaseURL: "https://knowsphere-cf9d5-default-rtdb.firebaseio.com",
  projectId: "knowsphere-cf9d5",
  storageBucket: "knowsphere-cf9d5.appspot.com",
  messagingSenderId: "748314546969",
  appId: "1:748314546969:web:5fd2df213facf68af1eb88",
  measurementId: "G-QEE9HRB35W"
  };


  firebase.initializeApp(firebaseConfig);

  // reference your database
  var Battle_of_BookwormsDB = firebase.database().ref("Battle_of_Bookworms");
  
  document.getElementById("Battle_of_Bookworms").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
  
    var firstName = getElementVal("firstName");
    var lastName = getElementVal("lastName");
    var email= getElementVal("email");
    var number= getElementVal("number");
    var question = getElementVal("question");
    
    saveMessages(firstName,lastName,email,number,question);
    
    //   enable alert
    document.querySelector(".alert").style.display = "block";

    //   remove the alert
    setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
    }, 3000);
  
    //   reset the form
    document.getElementById("Battle_of_Bookworms").reset();

    

  }
  
  const saveMessages = (firstName,lastName,email,number,question) => {
    var newBattle_of_Bookworms = Battle_of_BookwormsDB.push();
    
    newBattle_of_Bookworms.set({
      firstName: firstName,
      lastName : lastName,
      email:email,
      number:number,
      question:question,
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };