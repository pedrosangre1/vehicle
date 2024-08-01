document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  // Намираме формата за логин по ID
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Предотвратяваме стандартното поведение на формата
      console.log('Login form submitted');

      const email = document.getElementById('email').value; // Извличаме имейл адреса
      const password = document.getElementById('password').value; // Извличаме паролата

      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }), // Изпращаме данните до сървъра
        });

        const result = await response.json();
        console.log('Response received:', result);

        if (response.ok) {
          localStorage.setItem('username', result.name); // Запазваме името на потребителя в localStorage
          window.location.href = 'welcome.html'; // Пренасочваме към страница за успешен вход
        } else {
          document.getElementById('result').innerHTML = `<div class="alert alert-danger">Error: ${result.error}</div>`; // Показваме грешка, ако не е успешен вход
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        document.getElementById('result').innerHTML = '<div class="alert alert-danger">Error logging in</div>'; // Показваме грешка, ако е възникнала грешка по време на fetch
      }
    });
  } else {
    console.log('Login form not found');
  }

  // Намираме формата за добавяне на потребител по ID
  const userForm = document.getElementById('userForm');
  if (userForm) {
    userForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Предотвратяваме стандартното поведение на формата
      console.log('User form submitted');

      const name = document.getElementById('name').value; // Извличаме името
      const email = document.getElementById('email').value; // Извличаме имейл адреса
      const password = document.getElementById('password').value; // Извличаме паролата

      try {
        const response = await fetch('/addUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }), // Изпращаме данните до сървъра
        });

        const result = await response.json();
        console.log('Response received:', result);

        if (response.ok) {
          document.getElementById('result').innerHTML = `<div class="alert alert-success">User added successfully</div>`; // Показваме съобщение за успешен добавяне на потребител
        } else {
          document.getElementById('result').innerHTML = `<div class="alert alert-danger">Error: ${result.error}</div>`; // Показваме грешка, ако не е успешен добавяне
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        document.getElementById('result').innerHTML = '<div class="alert alert-danger">Error adding user</div>'; // Показваме грешка, ако е възникнала грешка по време на fetch
      }
    });
  } else {
    console.log('User form not found');
  }

  // Намираме формата за добавяне на автомобил по ID
  const carForm = document.getElementById('carForm');
  if (carForm) {
    carForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const brand = document.getElementById('brand').value;
      const model = document.getElementById('model').value;
      const type = document.getElementById('type').value;
      const axles = document.getElementById('axles').value;
      const reg_number = document.getElementById('reg_number').value;
      const fuel = document.getElementById('fuel').value;

      try {
        const response = await fetch('/addCar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ brand, model, type, axles, reg_number, fuel })
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Response received:', result);
          document.getElementById('result').innerHTML = '<div class="alert alert-success">Car added successfully</div>';
        } else {
          const errorText = await response.text();
          document.getElementById('result').innerHTML = `<div class="alert alert-danger">Error: ${errorText}</div>`;
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        document.getElementById('result').innerHTML = '<div class="alert alert-danger">Error adding car</div>';
      }
    });
  } else {
    console.log('Car form not found');
  }
});
