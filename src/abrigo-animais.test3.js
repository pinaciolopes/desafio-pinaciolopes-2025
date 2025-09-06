import { AbrigoAnimais } from './abrigo-animais.js';

describe('Abrigo de Animais', () => {
  let abrigo;

  beforeEach(() => {
    abrigo = new AbrigoAnimais();
  });

  test('Deve rejeitar animal inválido', () => {
    const resultado = abrigo.encontraPessoas('RATO,BOLA', 'LASER,RATO', 'Rex,Invalido');
    expect(resultado).toEqual({ erro: 'Animal inválido' });
  });

  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = abrigo.encontraPessoas('RATO,FOO', 'LASER,RATO', 'Rex,Mimi');
    expect(resultado).toEqual({ erro: 'Brinquedo inválido' });
  });

  test('Deve rejeitar brinquedos duplicados', () => {
    const resultado = abrigo.encontraPessoas('RATO,RATO', 'LASER,RATO', 'Rex,Mimi');
    expect(resultado).toEqual({ erro: 'Brinquedo inválido' });
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = abrigo.encontraPessoas('RATO,BOLA', 'LASER,RATO', 'Rex');
    expect(resultado.lista).toContain('Rex - pessoa 1');
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = abrigo.encontraPessoas('RATO,BOLA', 'BOLA,RATO', 'Rex');
    expect(resultado.lista).toContain('Rex - pessoa 1');
  });

  test('Gato não pode ter brinquedos extras', () => {
    const resultado = abrigo.encontraPessoas('BOLA,LASER,RATO', '', 'Mimi');
    expect(resultado.lista).toContain('Mimi - abrigo');
  });

  test('Cão pode ter brinquedos extras', () => {
    const resultado = abrigo.encontraPessoas('RATO,BOLA,CAIXA', '', 'Rex');
    expect(resultado.lista).toContain('Rex - pessoa 1');
  });

  test('Loco sozinho deve voltar para o abrigo se não houver outro animal', () => {
    const resultado = abrigo.encontraPessoas('SKATE,RATO', '', 'Loco');
    expect(resultado.lista).toContain('Loco - abrigo');
  });

  test('Loco com outro animal deve ser adotado pela pessoa', () => {
    const resultado = abrigo.encontraPessoas('RATO,BOLA,SKATE', '', 'Rex,Loco');
    expect(resultado.lista).toContain('Loco - pessoa 1');
  });

  test('Limite de 3 animais por pessoa', () => {
    const resultado = abrigo.encontraPessoas(
      'RATO,BOLA,LASER,CAIXA,NOVELO',
      'BOLA,LASER,RATO,SKATE',
      'Rex,Bola,Bebe,Loco,Mimi'
    );
    // Verifica que nenhuma pessoa ultrapassou 3 animais
    const lista = resultado.lista.filter(a => a.includes('pessoa 1'));
    expect(lista.length).toBeLessThanOrEqual(3);
    const lista2 = resultado.lista.filter(a => a.includes('pessoa 2'));
    expect(lista2.length).toBeLessThanOrEqual(3);
  });
});
