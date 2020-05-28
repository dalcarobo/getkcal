const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const age = getNumber('age');
    const weight = getNumber('weight');
    const height = getNumber('height');
    const gender = getSelect('gender');
    const activityLevel = getSelect('activity_level');

    const taxaMetabolicaBasal = Math.round(
        gender === 'female'
            ? (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age))
            : (66 + (13.7 * weight) + (5 * height) - (6.8 * age))
    );
    const maintenanceWeight = Math.round(taxaMetabolicaBasal * Number(activityLevel));
    const loseWeight = maintenanceWeight - 450;
    const gainWeight = maintenanceWeight + 450;
    const imc = (weight * 100 / (height * height)) * 100;

    const resultIMC = (imc) => {
        if (imc < 18.5) return "Abaixo do peso";
        else if (imc > 18.5 && imc < 25) return "Peso normal";
        else if (imc >= 25 && imc < 29) return "Sobrepeso";
        else if (imc >= 30 && imc < 35) return "Obesidade grau 1";
        else if (imc >= 35 && imc < 39) return "Obesidade grau 2";
        else if (imc >= 40) return "Obesidade grau 3";
        else return "Não foi possível calcular";
    };

    const layout = `
    <h2>Aqui está o resultado:</h2>
    <div class="result-content">
      <ul>
        <li>
          Seu metabolismo basal é de <strong>${taxaMetabolicaBasal} calorias</strong>.
        </li>
        <li>
          Para manter o seu peso você precisa consumir em média <strong>${maintenanceWeight} calorias</strong>.
        </li>
        <li>
          Para perder peso você precisa consumir em média <strong>${loseWeight} calorias</strong>.
        </li>
        <li>
          Para ganhar peso você precisa consumir em média <strong>${gainWeight} calorias</strong>.
        </li>
        <li>
          O resultado do seu IMC é: <strong>${resultIMC(imc)}</strong>.
        </li>
      </ul>
    </div>`;

    const result = document.getElementById('result');

    result.innerHTML = layout;
});

const getNumber = (id) => (Number(document.getElementById(id).value));
const getSelect = (id) => {
    const select = document.getElementById(id);
    return select.options[select.selectedIndex].value;
}

const darkMode = document.getElementById('dark-mode');

darkMode.addEventListener('click', () => {
    const t = darkMode.textContent; 
    document.body.classList.toggle('dark-mode'); 
    darkMode.classList.toggle('dark-mode'); 
    
    if(t == 'Light mode') darkMode.textContent = 'Dark mode';
    else darkMode.textContent = 'Light mode';
})