🐾 Desafio Abrigo de Animais

Este projeto simula a lógica de um abrigo de animais, onde cada animal deve ser direcionado para a pessoa correta de acordo com os brinquedos favoritos.
O sistema foi desenvolvido em JavaScript com testes automatizados em Jest.

📌 Atualizações

Implementação da classe AbrigoAnimais no arquivo abrigo-animais.js.

Validação de animais e brinquedos válidos.

Regras de distribuição de animais para pessoas com base na ordem de preferência.

Criação de testes unitários em abrigo-animais.test.js.

Configuração do Jest para rodar os testes (jest.config.js).

desafio-pinaciolopes-2025-main/

│── .gitignore

│── README.md

│── estrutura-repositorio.png

│── jest.config.js

│── package.json

│── package-lock.json

│
└── src

/├── abrigo-animais.js   # Código principal
    
├── abrigo-animais.test.js  # Testes automatizados

⚙️ Como Rodar o Projeto

git clone https://github.com/SEU-USUARIO/desafio-pinaciolopes-2025-main.git
cd desafio-pinaciolopes-2025-main

npm install

npm test

🧪 Testes Implementados

Os testes foram criados com Jest e cobrem:

✅ Rejeição de animais inválidos.

✅ Rejeição de brinquedos inválidos.

✅ Distribuição correta dos animais para as pessoas.

✅ Garantia de que as regras são seguidas em todos os cenários.


Exemplo de teste (abrigo-animais.test.js):

test('Deve rejeitar animal inválido', () => {
  const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
  expect(resultado.erro).toBe('Animal inválido');
  expect(resultado.lista).toBeFalsy();
});
