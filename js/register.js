
    function handleRegister(e) {
      e.preventDefault();
      var valid = true;

      function check(id, errId, condition) {
        var input = document.getElementById(id);
        var err = document.getElementById(errId);
        if (!input || !err) return;
        if (!condition(input)) {
          input.classList.add('error');
          err.classList.add('show');
          if (valid) input.focus();
          valid = false;
        } else {
          input.classList.remove('error');
          err.classList.remove('show');
        }
      }

      check('first-name', 'err-first',   function(i) { return i.value.trim().length > 0; });
      check('last-name',  'err-last',    function(i) { return i.value.trim().length > 0; });
      check('email',      'err-email',   function(i) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.value.trim()); });
      check('dob',        'err-dob',     function(i) { return i.value !== ''; });
      check('password',   'err-password',function(i) { return i.value.length >= 8; });

      var terms = document.getElementById('terms');
      var termsErr = document.getElementById('err-terms');
      if (!terms.checked) {
        termsErr.classList.add('show');
        valid = false;
      } else {
        termsErr.classList.remove('show');
      }

      if (valid) {
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('success-msg').style.display = 'block';
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

    document.querySelectorAll('.auth-form input, .auth-form select').forEach(function(el) {
      el.addEventListener('input', function() {
        this.classList.remove('error');
        var errId = 'err-' + this.id.replace('first-name', 'first').replace('last-name', 'last');
        var err = document.getElementById(errId);
        if (err) err.classList.remove('show');
      });
    });
