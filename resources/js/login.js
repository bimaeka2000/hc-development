    (function () {
      // --- Dummy user database for testing ---
      const dummyUsers = [
        { username: 'admin', password: 'password123', email: 'admin@satyaterrabhinneka.ac.id', nip: '1987001' },
        { username: 'user@example.com', password: 'demo123456', email: 'user@example.com', nip: '1987002' }
      ];

      // --- helpers for simple static UI hints ---
      const loginUser = document.getElementById('loginUser');
      const loginPass = document.getElementById('loginPass');
      const hintUser = document.getElementById('hintUser');
      const hintPass = document.getElementById('hintPass');
      const forgotTrigger = document.getElementById('forgotTrigger');
      const forgotHint = document.getElementById('forgotHint');
      const loginAlert = document.getElementById('loginAlert');
      const forgotForm = document.getElementById('forgotForm');
      const forgotInput = document.getElementById('forgotInput');
      const forgotAlert = document.getElementById('forgotAlert');
      const forgotBtn = document.getElementById('forgotBtn');

      // show 'Fill this field' only when the user leaves the field empty (blur)
      function attachHint(inputEl, hintEl) {
        if (!inputEl || !hintEl) return;
        // hide when user types
        inputEl.addEventListener('input', () => {
          if (inputEl.value.trim()) hintEl.classList.remove('show');
        });
        // show on blur if still empty
        inputEl.addEventListener('blur', () => {
          if (!inputEl.value.trim()) hintEl.classList.add('show');
        });
        // remove hint briefly when focusing again
        inputEl.addEventListener('focus', () => {
          hintEl.classList.remove('show');
        });
      }

      attachHint(loginUser, hintUser);
      attachHint(loginPass, hintPass);

      // --- Validate credentials against dummy data ---
      function validateCredentials(username, password) {
        return dummyUsers.some(user =>
          user.username === username && user.password === password
        );
      }

      // --- Show alert message ---
      function showAlert(message, type = 'danger') {
        loginAlert.innerHTML = message;
        loginAlert.className = `alert alert-${type}`;
        loginAlert.classList.remove('d-none');
        setTimeout(() => {
          loginAlert.classList.add('d-none');
        }, 5000);
      }

      // --- Show forgot password alert message ---
      function showForgotAlert(message, type = 'danger') {
        forgotAlert.innerHTML = message;
        forgotAlert.className = `alert alert-${type}`;
        forgotAlert.classList.remove('d-none');
        setTimeout(() => {
          forgotAlert.classList.add('d-none');
        }, 5000);
      }

      // --- Validate email or NIP in forgot password ---
      function validateEmailOrNIP(input) {
        return dummyUsers.some(user =>
          user.email === input || user.nip === input
        );
      }

      // Simple client-side submit validation: show hints if fields empty and prevent submit
      const loginForm = document.getElementById('loginForm');
      if (loginForm) {
        loginForm.addEventListener('submit', (ev) => {
          ev.preventDefault();

          const u = loginUser && loginUser.value.trim();
          const p = loginPass && loginPass.value.trim();
          let firstEmpty = null;

          if (!u) {
            hintUser.classList.add('show');
            firstEmpty = loginUser;
          }
          if (!p) {
            hintPass.classList.add('show');
            if (!firstEmpty) firstEmpty = loginPass;
          }

          if (firstEmpty) {
            firstEmpty.focus();
            return false;
          }

          // Validate credentials
          if (validateCredentials(u, p)) {
            showAlert(`<div style="display: flex; align-items: center; gap: 0.5rem;"><i class="bi bi-check-circle-fill" style="font-size: 1.3rem;"></i><div><strong>Berhasil!</strong><br><small>Anda akan diarahkan ke dashboard dalam beberapa detik...</small></div></div>`, 'success');
            // Simulate redirect after 1.5 seconds
            setTimeout(() => {
              // In production, this would be replaced with actual form submission or redirect
              window.location.href = 'route{{/}}';
              // Uncomment the line below to enable actual form submission:
              // loginForm.submit();
            }, 1500);

          } else {
            showAlert(`<div style="display: flex; align-items: center; gap: 0.5rem;"><i class="bi bi-exclamation-circle-fill" style="font-size: 1.3rem;"></i><div><strong>Login Gagal</strong><br><small>Username atau password salah. Silakan coba lagi.</small></div></div>`, 'danger');
          }

          return false;
        });
      }

      // clicking Forgot Password shows a small hint near bottom; it's static and hides after 3s
      if (forgotTrigger && forgotHint) {
        forgotTrigger.addEventListener('click', (e) => {
          e.preventDefault();
          forgotHint.classList.add('show');
          setTimeout(() => forgotHint.classList.remove('show'), 3000);
          // also open the modal for the actual forgot flow (if Bootstrap modal exists)
          const fm = new bootstrap.Modal(document.getElementById('forgotModal'));
          fm.show();
        });
      }

      // Handle forgot password form submission
      if (forgotForm) {
        forgotForm.addEventListener('submit', (ev) => {
          ev.preventDefault();

          const input = forgotInput && forgotInput.value.trim();

          if (!input) {
            showForgotAlert(`<div style="display: flex; align-items: center; gap: 0.5rem;"><i class="bi bi-exclamation-circle-fill" style="font-size: 1.3rem;"></i><div><strong>Input Kosong</strong><br><small>Silakan masukkan email atau NIP terlebih dahulu.</small></div></div>`, 'danger');
            return false;
          }

          // Validate email or NIP
          if (validateEmailOrNIP(input)) {
            showForgotAlert(`<div style="display: flex; align-items: center; gap: 0.5rem;"><i class="bi bi-check-circle-fill" style="font-size: 1.3rem;"></i><div><strong>Berhasil!</strong><br><small>Instruksi pemulihan telah dikirim ke email Anda. Silakan cek inbox atau folder spam.</small></div></div>`, 'success');
            // Clear the input field
            setTimeout(() => {
              forgotInput.value = '';
            }, 500);
          } else {
            showForgotAlert(`<div style="display: flex; align-items: center; gap: 0.5rem;"><i class="bi bi-exclamation-circle-fill" style="font-size: 1.3rem;"></i><div><strong>Email/NIP Tidak Ditemukan</strong><br><small>Email atau NIP yang Anda masukkan tidak terdaftar dalam sistem.</small></div></div>`, 'danger');
          }

          return false;
        });
      }
      // --- end small static helpers ---
    })();
