/* js/script.js */

document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initValidation();
});

// --- Lógica do Carrossel ---
function initCarousel() {
    const track = document.querySelector('.carousel-inner');
    if (!track) return; // Sai se não houver carrossel na página

    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let index = 0;

    function updateCarousel() {
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % items.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + items.length) % items.length;
        updateCarousel();
    });
    
    // Auto-play opcional
    setInterval(() => {
        index = (index + 1) % items.length;
        updateCarousel();
    }, 5000);
}

// --- Validação de Formulário ---
function initValidation() {
    const form = document.getElementById('cadastroForm');
    if (!form) return;

    const cpfInput = document.getElementById('cpf');
    const phoneInput = document.getElementById('telefone');

    // Máscaras de entrada
    cpfInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        e.target.value = value;
    });

    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d)(\d{4})$/, "$1-$2");
        e.target.value = value;
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Validação de CPF
        if (!validaCPF(cpfInput.value)) {
            showError(cpfInput, 'CPF inválido.');
            isValid = false;
        } else {
            clearError(cpfInput);
        }

        // Validação Telefone
        if (phoneInput.value.length < 14) {
            showError(phoneInput, 'Telefone inválido.');
            isValid = false;
        } else {
            clearError(phoneInput);
        }

        if (isValid) {
            alert('Cadastro realizado com sucesso! Bem-vindo à Sociedade.');
            form.reset();
        }
    });
}

function showError(input, message) {
    const errorDiv = input.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-msg')) {
        errorDiv.innerText = message;
        errorDiv.style.display = 'block';
    }
}

function clearError(input) {
    const errorDiv = input.nextElementSibling;
    if (errorDiv) errorDiv.style.display = 'none';
}

function validaCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}
