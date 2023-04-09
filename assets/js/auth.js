//User SignUp

async function signup(e) {
  e.preventDefault();
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");

  console.log(email.value, password.value);
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value);
    console.log(result);
    await result.user.updateProfile({
      displayName: "User",
    });
    createUserCollection(result.user);
    window.alert("Success! Account created.");
    // window.close(); // Close the sign-up page
    window.location.href = "login.html"; // Redirect to the login page
  } catch (err) {
    console.log(err);
    window.alert("Error occurred. Try again.");
  }
}

//Login

async function login(e) {
  e.preventDefault();
  const email = document.querySelector("#loginEmail");
  const password = document.querySelector("#loginPassword");

  console.log(email.value, password.value);
  try {
    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value);
    console.log(result);
    window.alert("Success! Welcome to KnowSphere.");
    // window.close(); // Close the sign-up page
    window.localStorage.setItem("user", JSON.stringify(result.user));
    window.location.href = "index.html";
  } catch (err) {
    console.log(err);
    window.alert("Error occurred. Try again.");
  }
}
