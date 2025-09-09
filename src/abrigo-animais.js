class AbrigoAnimais {
  animais = {
    Rex: { tipo: 'cachorro', brinquedos: ['RATO', 'BOLA'] },
    Mimi: { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
    Fofo: { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
    Zero: { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
    Bola: { tipo: 'cachorro', brinquedos: ['CAIXA', 'NOVELO'] },
    Bebe: { tipo: 'cachorro', brinquedos: ['LASER', 'RATO', 'BOLA'] },
    Loco: { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
  };

  nome_animal_valido = Object.keys(this.animais);
  brinquedo_valido = new Set(['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE']);

  possuiDuplicidade(list) {
    return new Set(list).size !== list.length;
  }

  checkMatch(brinquedosPessoa, brinquedosAnimal, tipo) {
    if (tipo === 'jabuti') {
      return brinquedosAnimal.every(b => brinquedosPessoa.includes(b));
    }
    let idx = 0;
    for (let b of brinquedosPessoa) {
      if (b === brinquedosAnimal[idx]) idx++;
      if (idx === brinquedosAnimal.length) break;
    }
    if (tipo === 'gato') {
      return idx === brinquedosAnimal.length && brinquedosPessoa.length === brinquedosAnimal.length;
    }
    return idx === brinquedosAnimal.length;
  }

  encontraPessoas(pessoa1Brinquedos = '', pessoa2Brinquedos = '', ordemAnimais = '') {
    try {
      const p1 = pessoa1Brinquedos.split(',').map(b => b.trim().toUpperCase()).filter(b => b);
      const p2 = pessoa2Brinquedos.split(',').map(b => b.trim().toUpperCase()).filter(b => b);
      const ordem = ordemAnimais.split(',').map(a => a.trim()).filter(a => a);

      if (p1.some(b => !this.brinquedo_valido.has(b)) || p2.some(b => !this.brinquedo_valido.has(b))) {
        return { erro: 'Brinquedo inválido' };
      }

      if (this.possuiDuplicidade(p1) || this.possuiDuplicidade(p2)) {
        return { erro: 'Brinquedo inválido' };
      }

      if (ordem.some(a => !this.nome_animal_valido.includes(a))) {
        return { erro: 'Animal inválido' };
      }

      if (this.possuiDuplicidade(ordem)) {
        return { erro: 'Animal inválido' };
      }

      const adocoes = {};
      let qtdP1 = 0;
      let qtdP2 = 0;

      for (let nome of ordem) {
        const animal = this.animais[nome];
        let p1Match = this.checkMatch(p1, animal.brinquedos, animal.tipo);
        let p2Match = this.checkMatch(p2, animal.brinquedos, animal.tipo);

        if (p1Match && p2Match) {
          adocoes[nome] = 'abrigo';
        } else if (p1Match) {
          adocoes[nome] = 'pessoa 1';
          qtdP1++;
        } else if (p2Match) {
          adocoes[nome] = 'pessoa 2';
          qtdP2++;
        } else if (animal.tipo === 'jabuti') {
          if (ordem.length > 1) {
            adocoes[nome] = 'pessoa 1';
            qtdP1++;
          } else {
            adocoes[nome] = 'abrigo';
          }
        } else {
          adocoes[nome] = 'abrigo';
        }
      }

      if (qtdP1 > 3) {
        for (let nome in adocoes) {
          if (adocoes[nome] === 'pessoa 1') adocoes[nome] = 'abrigo';
        }
      }

      if (qtdP2 > 3) {
        for (let nome in adocoes) {
          if (adocoes[nome] === 'pessoa 2') adocoes[nome] = 'abrigo';
        }
      }

      const listaResultado = Object.keys(adocoes)
        .sort()
        .map(a => `${a} - ${adocoes[a]}`);

      return { lista: listaResultado };
    } catch (e) {
      return { erro: 'Ocorreu um erro interno.' };
    }
  }
}

export { AbrigoAnimais };
