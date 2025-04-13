async function handleAuth() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    if (!username || !password) {
      alert('Please fill in all fields');
      return;
    }
  
    const endpoint = isLogin ? '/login' : '/register';
  
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
  
      const data = await res.json();
  
      if (!res.ok) throw new Error(data.message);
  
      if (isLogin) {
        sessionStorage.setItem('authenticated', true);
        window.location.href = 'students.html';
      } else {
        alert('Registration successful! You can now login.');
        toggleForm();
      }
    } catch (err) {
      alert(err.message);
    }
  }
  