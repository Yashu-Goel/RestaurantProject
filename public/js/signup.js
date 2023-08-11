const signup = document.querySelector(".signup");
async function mysignup(name, email, password, confirmpassword) {
    const result = await axios.post("/api/user/signup", {
        name, email, password, confirmpassword
    });

    if (result.data.success) {
        alert("Welcome to our gym");
        location.assign("/me");
    } else {
        alert("Please fill up all  details");
    }
}
if (signup) {
    signup.addEventListener("submit", function (event) {
        event.preventDefault();
        const inputs = document.getElementsByTagName("input");
        const name = inputs[0].value;
        const email = inputs[1].value;
        const password = inputs[2].value;
        const confirmpassword = inputs[3].value;
        console.log(email + "  " + password + " name=" + name + " cp" + confirmpassword);
        mysignup(name, email, password, confirmpassword);
    })
}