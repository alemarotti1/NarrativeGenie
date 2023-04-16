export const historiaPrompt = (prompt: string) => {
  let result = `preencha o json com os dados de um mundo fictício descrito por "${prompt.trim()}". `;
  result += `{ nome: string; descricao: string; prompt_para_modelo_de_imagem_em_ingles: string; }`;
  return result;
};

export const lugarPrompt = (prompt: string) => {
  let result = `preencha o json com os dados de um lugar descrito por "${prompt.trim()}". onde "descricao_fisica_em_ingles" tem a lista em inglês das características físicas e geográficas mais importantes do lugar.`;
  result += `{ nome: string; descricao: string; riqueza: int (min: 0, max: 3); saude: int (min: 0, max: 3); seguranca: int (min: 0, max: 3); agua: int (min: 0, max: 3); descricao_fisica_em_ingles: string[]; }`;
  return result;
};

export const outroPrompt = (prompt: string) => {
  let result = `preencha o json com os dados de um objeto descrito por "${prompt.trim()}". `;
  result += `{ nome: string; descricao: string; prompt_para_modelo_de_imagem_em_ingles: string; }`;
  return result;
};

export const personagemPrompt = (prompt: string) => {
  let result = `preencha o json com os dados de um personagem descrito por "${prompt.trim()}". onde "descricao" é uma lista de adjetivos do personagem e "descricao_fisica_em_ingles" tem a lista em inglês das características físicas mais importantes.`;
  result += `{ nome: string; descricao: string[]; backstory: string; especie: string; personalidade: string[]; descricao_fisica_em_ingles: string[]; }`;
  return result;
};
