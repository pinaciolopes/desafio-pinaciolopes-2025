import { AbrigoAnimais } from './abrigo-animais.js';

describe('Abrigo de Animais', () => {
  let abrigo;

  beforeEach(() => {
    abrigo = new AbrigoAnimais();
  });

  test('Deve rejeitar animal inválido', () => {
    expect(abrigo.encontraPessoas('BOLA', 'LASER', 'Inexistente')).toEqual({ erro: 'Animal inválido' });
  });

  test('Deve encontrar pessoa para um animal', () => {
    const result = abrigo.encontraPessoas('RATO,BOLA', 'LASER', 'Rex');
    expect(result.lista).toContain('Rex - pessoa 1');
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const result = abrigo.encontraPessoas('BOLA,RATO', 'LASER', 'Rex');
    expect(result.lista).toContain('Rex - pessoa 1');
  });


  test('Deve rejeitar brinquedo inválido', () => {
    expect(abrigo.encontraPessoas('BOLA,PIÃO', 'LASER', 'Rex')).toEqual({ erro: 'Brinquedo inválido' });
  });

  test('Não deve adotar gato se houver brinquedos extras', () => {
    const result = abrigo.encontraPessoas('BOLA,RATO,LASER', '', 'Mimi');
    expect(result.lista).toContain('Mimi - abrigo');
  });

  test('Deve adotar gato corretamente com brinquedos exatos', () => {
    const result = abrigo.encontraPessoas('BOLA,LASER', '', 'Mimi');
    expect(result.lista).toContain('Mimi - pessoa 1');
  });

  test('Cachorro pode adotar mesmo com brinquedos extras', () => {
    const result = abrigo.encontraPessoas('BOLA,RATO,CAIXA', '', 'Rex');
    expect(result.lista).toContain('Rex - pessoa 1');
  });

  test('Loco adotado sozinho vai para o abrigo se não houver outro animal', () => {
    const result = abrigo.encontraPessoas('', '', 'Loco');
    expect(result.lista).toContain('Loco - abrigo');
  });

  test('Loco pode ser adotado com outros animais', () => {
    const result = abrigo.encontraPessoas('SKATE,RATO', 'BOLA', 'Loco,Rex');
    expect(result.lista).toContain('Loco - pessoa 1');
  });

  test('Limite de 3 animais por pessoa', () => {
    const result = abrigo.encontraPessoas(
      'RATO,BOLA,LASER,CAIXA,NOVELO,SKATE', 
      '', 
      'Rex,Mimi,Fofo,Bebe'
    );
    const adotados = result.lista.filter(item => item.includes('pessoa 1'));
    expect(adotados.length).toBeLessThanOrEqual(3);
  });

  test('Verifica duplicidade de brinquedos', () => {
    expect(abrigo.encontraPessoas('BOLA,BOLA', '', 'Rex')).toEqual({ erro: 'Brinquedo inválido' });
  });

  test('Verifica duplicidade de animais', () => {
    expect(abrigo.encontraPessoas('BOLA', '', 'Rex,Rex')).toEqual({ erro: 'Animal inválido' });
  });
});

