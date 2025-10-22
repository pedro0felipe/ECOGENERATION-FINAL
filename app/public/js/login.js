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
    const senha = document.getElementById('senha').value.trim();
    if (!senha || senha.length < 6) {
        showError('senha', 'Senha deve ter no mínimo 6 caracteres.');
        return false;
    }
    showError('senha', '');
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

addValidationListener('nome', validateNome);
addValidationListener('email', validateEmail);
addValidationListener('senha', validateSenha);
addValidationListener('dataNascimento', validateDataNascimento);

const form = document.getElementById('cadastro-form');
if (form) {
    form.addEventListener('submit', function(event) {
        // Limpa mensagens de erro anteriores
        document.querySelectorAll('.ui.pointing.red.basic.label.frontend').forEach(e => e.remove());
        let hasError = false;
        if (!validateNome()) hasError = true;
        if (!validateEmail()) hasError = true;
        if (!validateSenha()) hasError = true;
        if (!validateDataNascimento()) hasError = true;
        if (hasError) {
            event.preventDefault();
        }
    });
}
