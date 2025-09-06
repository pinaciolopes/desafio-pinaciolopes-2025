class AbrigoAnimais {
  animais = {
    'Rex': { tipo: 'cão', brinquedo: ['RATO', 'BOLA'] },
    'Mimi': { tipo: 'gato', brinquedo: ['BOLA', 'LASER'] },
    'Fofo': { tipo: 'gato', brinquedo: ['BOLA', 'RATO', 'LASER'] },
    'Zero': { tipo: 'gato', brinquedo: ['RATO', 'BOLA'] },
    'Bola': { tipo: 'cão', brinquedo: ['CAIXA', 'NOVELO'] },
    'Bebe': { tipo: 'cão', brinquedo: ['LASER', 'RATO', 'BOLA'] },
    'Loco': { tipo: 'jabuti', brinquedo: ['SKATE', 'RATO'] }
  };

  nome_animal_valido = Object.keys(this.animais);
  brinquedo_valido = new Set(['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE']);

  checkMatch(brinquedosPessoas, brinquedosAnimais, tipoAnimal) {
    if (tipoAnimal === 'jabuti') {
      const brinquedosAnimaisSet = new Set(brinquedosAnimais);
      const brinquedosPessoasSet = new Set(brinquedosPessoas);
      for (const brinquedo of brinquedosAnimaisSet) {
        if (!brinquedosPessoasSet.has(brinquedo)) {
          return false;
        }
      }
      return true;
    }

    let brinquedoIndice = 0;
    for (let i = 0; i < brinquedosPessoas.length; i++) {
      if (brinquedosPessoas[i] === brinquedosAnimais[brinquedoIndice]) {
        brinquedoIndice++;
      }
    }

    const brinquedosOrdem = brinquedoIndice === brinquedosAnimais.length;

    if (tipoAnimal === 'gato') {
      const todosBrinquedosAnimaisSet = new Set(brinquedosAnimais);
      const todosBrinquedosOrdem = brinquedosAnimais.every(brinquedo => todosBrinquedosAnimaisSet.has(brinquedo));
      return brinquedosOrdem && todosBrinquedosOrdem;
    }

    return brinquedosOrdem;
  }

  possuiDuplicidade(list) {
    const itensUnico = new Set(list);
    return itensUnico.size !== list.length;
  }

  encontraPessoas(pessoa1Brinquedos, pessoa2Brinquedos, ordemAnimais) {
    try {
      const brinquedo1 = pessoa1Brinquedos.split(',').map(t => t.trim().toUpperCase()).filter(t => t);
      const brinquedo2 = pessoa2Brinquedos.split(',').map(t => t.trim().toUpperCase()).filter(t => t);
      const animalOrder = ordemAnimais.split(',').map(a => a.trim()).filter(a => a);

      const todosBrinquedos = [...brinquedo1, ...brinquedo2];
      const todosAnimais = [...animalOrder];

      if (todosBrinquedos.some(brinquedos => !this.brinquedo_valido.has(brinquedos))) {
        return { erro: 'Brinquedo inválido' };
      }
      if (this.possuiDuplicidade(brinquedo1) || this.possuiDuplicidade(brinquedo2)) {
        return { erro: 'Brinquedo inválido' };
      }

      if (todosAnimais.some(animal => !this.nome_animal_valido.includes(animal))) {
        return { erro: 'Animal inválido' };
      }
      if (this.possuiDuplicidade(animalOrder)) {
        return { erro: 'Animal inválido' };
      }

      const adocoes = {};
      let quantidadeAdocoesPessoa1 = 0;
      let quantidadeAdocoesPessoa2 = 0;
      let locoAdotadoPor = null;

      for (const nomeAnimal of animalOrder) {
        const animal = this.animais[nomeAnimal];
        let correspondePessoa1 = false;
        let correspondePessoa2 = false;

        if (animal.tipo === 'jabuti') {
          correspondePessoa1 = this.checkMatch(brinquedo1, animal.brinquedo, animal.tipo);
          correspondePessoa2 = this.checkMatch(brinquedo2, animal.brinquedo, animal.tipo);
        } else {
          correspondePessoa1 = this.checkMatch(brinquedo1, animal.brinquedo, animal.tipo);
          correspondePessoa2 = this.checkMatch(brinquedo2, animal.brinquedo, animal.tipo);
        }

        if (correspondePessoa1 && correspondePessoa2) {
          adocoes[nomeAnimal] = 'abrigo';
        } else if (correspondePessoa1) {
          adocoes[nomeAnimal] = 'pessoa 1';
          if (nomeAnimal === 'Loco') {
            locoAdotadoPor = 'pessoa 1';
          } else {
            quantidadeAdocoesPessoa1++;
          }
        } else if (correspondePessoa2) {
          adocoes[nomeAnimal] = 'pessoa 2';
          if (nomeAnimal === 'Loco') {
            locoAdotadoPor = 'pessoa 2';
          } else {
            quantidadeAdocoesPessoa2++;
          }
        } else {
          adocoes[nomeAnimal] = 'abrigo';
        }
      }

      if (locoAdotadoPor === 'pessoa 1' && quantidadeAdocoesPessoa1 > 0) {
        quantidadeAdocoesPessoa1++;
      } else if (locoAdotadoPor === 'pessoa 2' && quantidadeAdocoesPessoa2 > 0) {
        quantidadeAdocoesPessoa2++;
      } else if (locoAdotadoPor) {
        adocoes['Loco'] = 'abrigo';
      }

      if (quantidadeAdocoesPessoa1 > 3) {
        for (const nomeAnimal in adocoes) {
          if (adocoes[nomeAnimal] === 'pessoa 1') {
            adocoes[nomeAnimal] = 'abrigo';
          }
        }
      }
      if (quantidadeAdocoesPessoa2 > 3) {
        for (const nomeAnimal in adocoes) {
          if (adocoes[nomeAnimal] === 'pessoa 2') {
            adocoes[nomeAnimal] = 'abrigo';
          }
        }
      }

      const listaResultado = Object.keys(adocoes)
        .sort()
        .map(animal => `${animal} - ${adocoes[animal]}`);

      return { lista: listaResultado };

    } catch (e) {
      console.error(e);
      return { erro: 'Ocorreu um erro interno.' };
    }
  }
}

export { AbrigoAnimais as AbrigoAnimais };
