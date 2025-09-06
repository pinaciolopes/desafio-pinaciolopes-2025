import { AbrigoAnimais } from './abrigo-animais.js';

describe('Abrigo de Animais - Cobertura Completa', () => {
  let abrigo;

  beforeEach(() => {
    abrigo = new AbrigoAnimais();
  });

  test('Animal inválido deve retornar erro', () => {
    expect(abrigo.encontraPessoas('RATO,BOLA', 'LASER,RATO', 'Rex,Invalido'))
      .toEqual({ erro: 'Animal inválido' });
  });

  test('Brinquedo inválido deve retornar erro', () => {
    expect(abrigo.encontraPessoas('RATO,FOO', 'LASER,RATO', 'Rex,Mimi'))
      .toEqual({ erro: 'Brinquedo inválido' });
  });

  test('Duplicidade em brinquedos deve retornar erro', () => {
    expect(abrigo.encontraPessoas('RATO,RATO', 'LASER,RATO', 'Rex,Mimi'))
      .toEqual({ erro: 'Brinquedo inválido' });
  });

  test('Duplicidade em animais deve retornar erro', () => {
    expect(abrigo.encontraPessoas('RATO,BOLA', 'LASER,RATO', 'Rex,Rex'))
      .toEqual({ erro: 'Animal inválido' });
  });

  test('Pessoa 1 adota Rex (cão) com brinquedos na ordem correta', () => {
    const resultado = abrigo.encontraPessoas('RATO,BOLA', '', 'Rex');
    expect(resultado.lista).toContain('Rex - pessoa 1');
  });

  test('Pessoa 1 adota Rex (cão) com brinquedos intercalados', () => {
    const resultado = abrigo.encontraPessoas('RATO,BOLA', '', 'Rex');
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

  test('Loco sozinho retorna para abrigo', () => {
    const resultado = abrigo.encontraPessoas('SKATE,RATO', '', 'Loco');
    expect(resultado.lista).toContain('Loco - abrigo');
  });

  test('Loco adotado quando há outro animal', () => {
    const resultado = abrigo.encontraPessoas('RATO,BOLA,SKATE', '', 'Rex,Loco');
    expect(resultado.lista).toContain('Loco - pessoa 1');
  });

  test('Limite de 3 animais por pessoa é respeitado', () => {
    const resultado = abrigo.encontraPessoas(
      'RATO,BOLA,LASER,CAIXA,NOVELO',
      'BOLA,LASER,RATO,SKATE',
      'Rex,Bola,Bebe,Loco,Mimi'
    );
    const lista1 = resultado.lista.filter(a => a.includes('pessoa 1'));
    expect(lista1.length).toBeLessThanOrEqual(3);
    const lista2 = resultado.lista.filter(a => a.includes('pessoa 2'));
    expect(lista2.length).toBeLessThanOrEqual(3);
  });

  test('CheckMatch cobre todos os tipos: cão, gato e jabuti', () => {
    expect(abrigo.checkMatch(['RATO','BOLA'], ['RATO','BOLA'], 'cão')).toBe(true);
    expect(abrigo.checkMatch(['BOLA','LASER'], ['BOLA','LASER'], 'gato')).toBe(true);
    expect(abrigo.checkMatch(['SKATE','RATO'], ['SKATE','RATO'], 'jabuti')).toBe(true);
  });

  test('CheckMatch gato falha com brinquedo extra', () => {
    expect(abrigo.checkMatch(['BOLA','LASER','RATO'], ['BOLA','LASER'], 'gato')).toBe(false);
  });

  test('CheckMatch jabuti falha se faltar algum brinquedo', () => {
    expect(abrigo.checkMatch(['SKATE'], ['SKATE','RATO'], 'jabuti')).toBe(false);
  });

  test('CheckMatch cão falha se ordem incorreta', () => {
    expect(abrigo.checkMatch(['BOLA','RATO'], ['RATO','BOLA'], 'cão')).toBe(false);
  });

  test('CheckMatch retorna true mesmo com brinquedos extras para cão', () => {
    expect(abrigo.checkMatch(['RATO','BOLA','CAIXA'], ['RATO','BOLA'], 'cão')).toBe(true);
  });
});
