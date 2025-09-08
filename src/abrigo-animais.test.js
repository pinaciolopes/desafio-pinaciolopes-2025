import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  let abrigo;
  beforeEach(() => {
    abrigo = new AbrigoAnimais();
  });

  test('Deve rejeitar animal duplicado', () => {
    const resultado = abrigo.encontraPessoas('BOLA', 'LASER', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = abrigo.encontraPessoas('RATO,FOO', 'LASER,RATO', 'Rex,Mimi');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo duplicado', () => {
    const resultado = abrigo.encontraPessoas('BOLA,BOLA', '', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um cachorro', () => {
    const resultado = abrigo.encontraPessoas('RATO,BOLA', 'RATO,NOVELO', 'Rex');
    expect(resultado.lista).toContain('Rex - pessoa 1');
  });

  test('Gato não aceita brinquedos extras', () => {
    const resultado = abrigo.encontraPessoas('BOLA,LASER,RATO', '', 'Mimi');
    expect(resultado.lista).toContain('Mimi - abrigo');
  });

  test('Cachorro aceita brinquedos extras', () => {
    const resultado = abrigo.encontraPessoas('RATO,BOLA,CAIXA', '', 'Rex');
    expect(resultado.lista).toContain('Rex - pessoa 1');
  });

  test('Se duas pessoas podem adotar, animal vai para o abrigo', () => {
    const resultado = abrigo.encontraPessoas('RATO,BOLA', 'RATO,BOLA', 'Rex');
    expect(resultado.lista).toContain('Rex - abrigo');
  });

  test('Loco sozinho vai para o abrigo', () => {
    const resultado = abrigo.encontraPessoas('', '', 'Loco');
    expect(resultado.lista).toContain('Loco - abrigo');
  });

  test('Loco com outro animal é adotado pela pessoa', () => {
    const resultado = abrigo.encontraPessoas('RATO,BOLA', '', 'Rex,Loco');
    expect(resultado.lista).toContain('Loco - pessoa 1');
  });

  test('Limite de 3 animais por pessoa', () => {
    const resultado = abrigo.encontraPessoas(
      'RATO,BOLA,LASER,CAIXA,NOVELO',
      'BOLA,LASER,RATO,SKATE',
      'Rex,Bola,Bebe,Loco,Mimi'
    );
    const adotadosPessoa1 = resultado.lista.filter(item => item.includes('pessoa 1'));
    const adotadosPessoa2 = resultado.lista.filter(item => item.includes('pessoa 2'));
    expect(adotadosPessoa1.length).toBeLessThanOrEqual(3);
    expect(adotadosPessoa2.length).toBeLessThanOrEqual(3);
  });

  test('Lista final deve estar em ordem alfabética', () => {
    const resultado = abrigo.encontraPessoas('RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
    expect(resultado.lista).toEqual(['Fofo - abrigo', 'Rex - pessoa 1']);
  });

  test('Deve retornar erro interno se houver exceção', () => {
    abrigo.encontraPessoas = () => { throw new Error('Erro simulado'); };
    const resultado = abrigo.encontraPessoas();
    expect(resultado.erro).toBe('Ocorreu um erro interno.');
  });
});
