function createUserCollection(user){
    firebase.firestore().collection('users')
    .doc(user.uid)
    .set({
        uid:user.uid,
        name:user.displayName,
        email:user.email,
        phone: "",
    })
}