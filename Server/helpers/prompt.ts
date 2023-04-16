export const historiaPrompt = (prompt: string) => {
  let result = `preencha o json com os dados de um mundo fictício descrito por "${prompt.trim()}". Adicione coisas como: as espécies/raças mais comuns, moedas, tecnologias, tipo de governo, religião, etc`;
  result += `{ nome: string; descricao: string; prompt_para_modelo_de_imagem_em_ingles: string; }`;
  return result;
};

export const lugarPrompt = (prompt: string) => {
  let result = `preencha o json com os dados de um lugar descrito por "${prompt.trim()}". onde "descricao_fisica_em_ingles" tem a lista em inglês das características físicas e geográficas mais importantes do lugar. `;
  result += `{ nome: string; descricao: string; riqueza: int (min: 0, max: 3); saude: int (min: 0, max: 3); seguranca: int (min: 0, max: 3); agua: int (min: 0, max: 3); descricao_fisica_em_ingles: string[]; }`;
  return result;
};

export const outroPrompt = (prompt: string) => {
  let result = `preencha o json com os dados de um objeto descrito por "${prompt.trim()}". onde "descricao" é uma lista de adjetivos do objeto e "descricao_fisica_em_ingles" tem a lista em inglês das características físicas mais importantes. Adicione coisas como formato, cor, material `;
  result += `{ nome: string; descricao: string; prompt_para_modelo_de_imagem_em_ingles: string; }`;
  return result;
};

export const personagemPrompt = (prompt: string) => {
  let result = `preencha o json com os dados de um personagem descrito por "${prompt.trim()}". onde "descricao" é uma lista de adjetivos do personagem e "descricao_fisica_em_ingles" tem a lista em inglês das características físicas mais importantes. Adicione coisas como cor dos olhos, cor e tamanho do cabelo, cor de pele.`;
  result += `{ nome: string; descricao: string[]; backstory: string; especie: string; personalidade: string[]; descricao_fisica_em_ingles: string[]; }`;
  return result;
};

export const relacaoPrompt = (category1: string, name1: string, category2: string, name2: string, prompt: string) => {
  let result = `escreva a relação entre um ${category1.trim()} ${name1.trim()} e um ${category2.trim()} ${name2.trim()} descrita por "${prompt.trim()}"`;
  return result;
};
