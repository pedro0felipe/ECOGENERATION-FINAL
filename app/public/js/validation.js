// Validação simples do lado cliente
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    // Remove erro anterior
    const next = input.nextSibling;
    if (next && next.classList && next.classList.contains('frontend')) {
        next.remove();
    }
    if (message) {
        const errorLabel = document.createElement('section');
        errorLabel.className = 'ui pointing red basic label frontend';
        errorLabel.innerText = message;
        input.parentNode.insertBefore(errorLabel, input.nextSibling);
    }
}

function validateNome() {
    const nome = document.getElementById('nome').value.trim();
    if (!nome) {
        showError('nome', 'Nome é obrigatório.');
        return false;
    }
    if (nome.length < 3) {
        showError('nome', 'Nome deve ter pelo menos 3 caracteres.');
        return false;
    }
    showError('nome', '');
    return true;
}

function validateEmail() {
    const email = document.getElementById('email').value.trim();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        showError('email', 'E-mail inválido.');
        return false;
    }
    showError('email', '');
    return true;
}

function validateSenha() {
    const input = document.getElementById('senha');
    if (!input) return false;
    const v = input.value.trim();
    if (!v) {
        showError(input, 'Senha é obrigatória.');
        return false;
    }
    if (v.length < 6) {
        showError(input, 'A senha deve ter no mínimo 6 caracteres.');
        return false;
    }
    removeFrontendError(input);
    return true;
}

function validateDataNascimento() {
    const dataNascimento = document.getElementById('dataNascimento').value;
    if (!dataNascimento) {
        showError('dataNascimento', 'Data de nascimento é obrigatória.');
        return false;
    }
    const hoje = new Date();
    const data = new Date(dataNascimento);
    if (data > hoje) {
        showError('dataNascimento', 'Data de nascimento não pode ser no futuro.');
        return false;
    }
    showError('dataNascimento', '');
    return true;
}

function addValidationListener(id, fn) {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('blur', fn);
        el.addEventListener('input', fn);
    }
}

(function () {
  function removeFrontendError(input) {
    const next = input && input.nextElementSibling;
    if (next && next.classList && next.classList.contains('frontend')) {
      next.remove();
    }
  }

  function showError(input, message) {
    if (!input) return;
    removeFrontendError(input);
    if (!message) return;
    const errorLabel = document.createElement('section');
    errorLabel.className = 'ui pointing red basic label frontend';
    errorLabel.innerText = message;
    input.parentNode.insertBefore(errorLabel, input.nextElementSibling);
  }

  function validateNome() {
    const input = document.getElementById('nome');
    if (!input) return false;
    const v = input.value.trim();
    if (!v) {
      showError(input, 'Nome é obrigatório.');
      return false;
    }
    removeFrontendError(input);
    return true;
  }

  function validateEmail() {
    const input = document.getElementById('email');
    if (!input) return false;
    const v = input.value.trim();
    if (!v) {
      showError(input, 'E-mail é obrigatório.');
      return false;
    }
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(v)) {
      showError(input, 'E-mail inválido.');
      return false;
    }
    removeFrontendError(input);
    return true;
  }

  function validateSenha() {
    const input = document.getElementById('senha');
    if (!input) return false;
    const v = input.value.trim();
    if (!v) {
      showError(input, 'Senha é obrigatória.');
      return false;
    }
    if (v.length < 6) {
      showError(input, 'A senha deve ter no mínimo 6 caracteres');
      return false;
    }
    removeFrontendError(input);
    return true;
  }

  function validateConfirmar() {
    const senhaInput = document.getElementById('senha');
    const confirmar = document.getElementById('confirmar-senha');
    if (!confirmar) return false;
    const sv = senhaInput ? senhaInput.value.trim() : '';
    const cv = confirmar.value.trim();
    if (!cv) {
      showError(confirmar, 'Confirmação é obrigatória.');
      return false;
    }
    if (cv.length < 6) {
      showError(confirmar, 'A senha deve ter no mínimo 6 caracteres');
      return false;
    }
    if (sv !== cv) {
      showError(confirmar, 'Senha inválida');
      return false;
    }
    removeFrontendError(confirmar);
    return true;
  }

  function validateDataNascimento() {
    const input = document.getElementById('dataNascimento');
    if (!input) return false;
    const v = input.value;
    if (!v) {
      showError(input, 'Data de nascimento é obrigatória.');
      return false;
    }
    const inputDate = new Date(v);
    if (isNaN(inputDate.getTime())) {
      showError(input, 'Data inválida.');
      return false;
    }
    const today = new Date();
    inputDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    if (inputDate > today) {
      showError(input, 'Data de nascimento não pode ser no futuro.');
      return false;
    }
    removeFrontendError(input);
    return true;
  }

  function addListeners(id, fn) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('blur', fn);
    el.addEventListener('input', fn);
  }

  document.addEventListener('DOMContentLoaded', function () {
    addListeners('nome', validateNome);
    addListeners('email', validateEmail);
    addListeners('senha', validateSenha);
    addListeners('confirmar-senha', validateConfirmar);
    addListeners('dataNascimento', validateDataNascimento);

    const cadastroForm = document.getElementById('cadastro-form');
    if (cadastroForm) {
      cadastroForm.addEventListener('submit', function (ev) {
        // remove avisos frontend antigos antes de validar
        document.querySelectorAll('.frontend').forEach(e => e.remove());

        // validação explícita — garante que campos vazios bloqueiem o redirecionamento
        const okNome = validateNome();
        const okEmail = validateEmail();
        const okSenha = validateSenha();
        const okConfirm = validateConfirmar();
        const okData = validateDataNascimento();

        const allOk = okNome && okEmail && okSenha && okConfirm && okData;
        if (!allOk) {
          ev.preventDefault();
          // foca no primeiro campo inválido
          if (!okNome) document.getElementById('nome').focus();
          else if (!okEmail) document.getElementById('email').focus();
          else if (!okSenha) document.getElementById('senha').focus();
          else if (!okConfirm) document.getElementById('confirmar-senha').focus();
          else if (!okData) document.getElementById('dataNascimento').focus();
          return;
        }

        // todos válidos: impedir submit padrão e redirecionar para a página inicial
        ev.preventDefault();
        window.location.href = '/';
      });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', function (ev) {
        document.querySelectorAll('.frontend').forEach(e => e.remove());
        // valida somente email e senha do login
        const okEmail = validateEmail();
        const okSenha = validateSenha();
        if (!okEmail || !okSenha) ev.preventDefault();
        // se ok, permite envio ao servidor
      });
    }
  });
})();