var stripe = Stripe('pk_test_Rfi0w2hbRhSDwRkHPXTzwzVg00o9bg34Fp');

const login = document.querySelector(".login");
const forget = document.querySelector(".forget");
const signupButtons = document.querySelectorAll(".signup-button");

// public key

// function booking(id){
//   console.log(id);
// }


async function mylogin(email, password) {
  const result = await axios.post("/api/user/login", {
    email, password
  });
  if (result.data.success) {
    alert("User logged in");
    location.assign("/me");
  } else {
    alert("Wrong Email or Password");
  }
}


async function bookings(id) {
  const result = await axios.post("/api/booking/checkout", {
    id
  });
  // console.log(result.data.success);
  if (result) {
    
    await stripe.redirectToCheckout({
      sessionId:result.data.session.id
    });
    
    
    
    alert("are wah apne payment krdi");
    // console.log(result.data.session.id);
  } else {
    alert("Something went wrong");
  }
}


if (signupButtons) {
  // console.log(signupButtons);
  for (var i = 0; i < signupButtons.length; i++) {
    signupButtons[i].addEventListener("click", function (event) {
      // console.log(event.target.getAttribute("plan-id"));
      bookings(event.target.getAttribute("plan-id"));
    })
  }

}

async function myforget(email) {
  const result = await axios.post("/api/user/forgetpassword", { email });
  if (result.data.success) {
    alert("please check your email to reset passowrd");
    // location.assign("/resetpasswordwithtoken");
  } else {
    alert("Email id incorrect");
  }
}

if (login) {
  login.addEventListener("submit", function (event) {
    event.preventDefault();
    const inputs = document.getElementsByTagName("input");
    const email = inputs[0].value;
    const password = inputs[1].value;
    console.log(email + "  " + password)
    mylogin(email, password);
  })
}

if (forget) {
  forget.addEventListener("submit", function (event) {
    event.preventDefault();
    const inputs = document.getElementsByTagName("input");
    const email = inputs[0].value;
    // console.log(email)
    myforget(email);
  })
}