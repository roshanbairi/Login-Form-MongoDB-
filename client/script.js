document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registerform');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    document.getElementById('message').textContent = "User registered successfully!";

    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!fullname || !email || !phone || !password) {
      alert('All fields are required!');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert('Phone number must be 10 digits.');
      return;
    }

    const userData = { fullname, email, phone, password };

    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then(res => res.json())
      .then(data => {
        alert('User saved successfully!');
        form.reset();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong!');
      });
  });
});
