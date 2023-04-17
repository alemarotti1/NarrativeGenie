export const historiaPrompt = (prompt: string) => {
  let result = `preencha o json com os dados de um mundo fictício descrito por "${prompt.trim()}". Adicione coisas como: as espécies/raças mais comuns, moedas, tecnologias, tipo de governo, religião, etc na descrição. Além disso, garanta que "descricao" tenha ao menos 500 caracteres e que o único campo que não está em pt-br é "prompt_para_modelo_de_imagem_em_ingles".`;
  result += `{ nome: string; descricao: string; prompt_para_modelo_de_imagem_em_ingles: string; }`;
  result += `. Não gere nada além do JSON`;
  return result;
};

export const lugarPrompt = (prompt: string) => {
  let result = `preencha o json com os dados de um lugar descrito por "${prompt.trim()}". onde "descricao" tem a história do lugar, cultura, características físicas e pontos importantes e "descricao_fisica_em_ingles" tem a lista em inglês das características físicas e geográficas mais importantes do lugar. Garanta que "descricao" tenha ao menos 500 caracteres e que o único campo que não está em pt-br é "descricao_fisica_em_ingles". `;
  result += `{ nome: string; descricao: string; riqueza: int (min: 0, max: 3); saude: int (min: 0, max: 3); seguranca: int (min: 0, max: 3); agua: int (min: 0, max: 3); descricao_fisica_em_ingles: string[]; }`;
  result += `. Não gere nada além do JSON`;
  return result;
};

export const outroPrompt = (prompt: string) => {
  let result = `preencha o json com os dados de um objeto descrito por "${prompt.trim()}". onde "descricao" é uma lista de adjetivos do objeto e "descricao_fisica_em_ingles" tem a lista em inglês das características físicas mais importantes. Adicione coisas como formato, cor, material em "descricao_fisica_em_ingles". Garanta ao menos 500 caracteres em "descricao", descrevendo uso, história, etc. e que o único campo que não está em pt-br é "descricao_fisica_em_ingles". `;
  result += `{ nome: string; descricao: string; descricao_fisica_em_ingles: string[]; }`;
  result += `. Não gere nada além do JSON`;
  return result;
};

export const personagemPrompt = (prompt: string) => {
  let result = `preencha o json com os dados de um personagem descrito por "${prompt.trim()}". Onde "descricao" deve ser preenchido com uma lista de adjetivos que remetem às características físicas do personagem, além das que já foram ditas e digam coisas como espécie, gênero, cor dos olhos, cor do cabelo, tamanho do cabelo, cor de pele. O campo de "descricao_fisica_em_ingles" tem a lista em inglês de características físicas mais importantes. Garanta que o campo 'backstory' possua pelo menos 500 caracterese que o único campo que não está em pt-br é "descricao_fisica_em_ingles". `;
  result += `{ nome: string; descricao: string[]; backstory: string; especie: string; personalidade: string[]; descricao_fisica_em_ingles: string[]; }`;
  result += `. Não gere nada além do JSON`;
  return result;
};

export const relacaoPrompt = (category1: string, name1: string, category2: string, name2: string, prompt: string) => {
  let result = `escreva a relação entre um ${category1.trim()} ${name1.trim()} e um ${category2.trim()} ${name2.trim()} descrita por "${prompt.trim()}". `;
  result += `adicione coisas como: como eles se encontraram, como se relacionam, etc. `;
  result += `Gere no máximo 200 caracteres.`
  return result;
};
