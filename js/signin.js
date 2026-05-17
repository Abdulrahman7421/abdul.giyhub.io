
    function handleSignin(e) {
      e.preventDefault();
      var valid = true;

      var email = document.getElementById('si-email');
      var emailErr = document.getElementById('err-si-email');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        email.classList.add('error');
        emailErr.classList.add('show');
        email.focus();
        valid = false;
      } else {
        email.classList.remove('error');
        emailErr.classList.remove('show');
      }

      var pw = document.getElementById('si-password');
      var pwErr = document.getElementById('err-si-password');
      if (pw.value.length < 1) {
        pw.classList.add('error');
        pwErr.classList.add('show');
        if (valid) pw.focus();
        valid = false;
      } else {
        pw.classList.remove('error');
        pwErr.classList.remove('show');
      }

      if (valid) {
        document.getElementById('signin-form').style.display = 'none';
        document.getElementById('si-success').style.display = 'block';
      }
    }

    function togglePassword(id, btn) {
      var input = document.getElementById(id);
      if (input.type === 'password') {
        input.type = 'text';
  
      } else {
        input.type = 'password';
        btn.textContent = '👁';
      }
    }

    document.querySelectorAll('.auth-form input').forEach(function(el) {
      el.addEventListener('input', function() {
        this.classList.remove('error');
        var errId = 'err-si-' + this.id.replace('si-', '');
        var err = document.getElementById(errId);
        if (err) err.classList.remove('show');
      });
    });
