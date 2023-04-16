import db from "../config/db";

export const listarPersonagens = async (id_historia: number) => {
  const personagens = await db.personagem.findMany({
    where: {
      elemento_narrativo: {
        Historia_id_historia: id_historia
      }
    }
  });

  return personagens;
};

export const buscarPersonagem = async (id_elem_narr: number) => {
  const personagem = await db.personagem.findUnique({
    where: {
      id_elem_narr
    },
    include: {
      elemento_narrativo: {
        include: {
          historia: true,
          relacao_relacao_id_elem_narr1Toelemento_narrativo: {
            include: {
              elemento_narrativo_relacao_id_elem_narr2Toelemento_narrativo: {
                include: {
                  personagem: true,
                  outro: true,
                  lugar: true,
                }
              }
            }
          },
          relacao_relacao_id_elem_narr2Toelemento_narrativo: {
            include: {
              elemento_narrativo_relacao_id_elem_narr1Toelemento_narrativo: {
                include: {
                  personagem: true,
                  outro: true,
                  lugar: true,
                }
              }
            }
          }
        }
      },
    }
  });

  return personagem;
};

export const apagarPersonagem = async (id_elem_narr: number) => {
  await db.personagem.delete({
    where: {
      id_elem_narr
    }
  });
};

type PersonagemParams = {
  imagem: string;
  nome: string;
  descricao: string;
  backstory: string;
  personalidade: string;
  especie: string;
  prompt: string;
  imgPrompt: string;
  id_historia: number;
}

export const criarPersonagem = async (personagemParams: PersonagemParams) => {
  const personagem = await db.personagem.create({
    data: {
      imagem: personagemParams.imagem,
      nome: personagemParams.nome,
      descricao: personagemParams.descricao,
      backstory: personagemParams.backstory,
      personalidade: personagemParams.personalidade,
      especie: personagemParams.especie,
      prompt: personagemParams.prompt,
      imgPrompt: personagemParams.imgPrompt,
      elemento_narrativo: {
        create: {
          tipo: "personagem",
          historia: {
            connect: {
              id_historia: personagemParams.id_historia
            }
          }
        },
      },
    }
  });

  return personagem.id_elem_narr;
};

type AtualizarPersonagemParams = {
  id_elem_narr: number;
  imagem?: string;
  nome?: string;
  descricao?: string;
  backstory?: string;
  personalidade?: string;
  especie?: string;
  prompt?: string;
  imgPrompt?: string;
  personagens?: {
    id_elem_narr: number;
    descricao: string;
    nome_relacao: string;
    prompt: string;
  }[];
  lugares?: {
    id_elem_narr: number;
    descricao: string;
    nome_relacao: string;
    prompt: string;
  }[];
  objetos?: {
    id_elem_narr: number;
    descricao: string;
    nome_relacao: string;
    prompt: string;
  }[];
}

export const atualizarPersonagem = async (personagemParams: AtualizarPersonagemParams) => {
  await db.personagem.update({
    where: {
      id_elem_narr: personagemParams.id_elem_narr
    },
    data: {
      imagem: personagemParams.imagem,
      nome: personagemParams.nome,
      descricao: personagemParams.descricao,
      backstory: personagemParams.backstory,
      personalidade: personagemParams.personalidade,
      especie: personagemParams.especie,
      prompt: personagemParams.prompt,
      imgPrompt: personagemParams.imgPrompt,
    }
  });

  await db.relacao.deleteMany({
    where: {
      OR: [
        { id_elem_narr1: personagemParams.id_elem_narr },
        { id_elem_narr2: personagemParams.id_elem_narr }
      ]
    }
  });

  const relacoes = [
    ...(personagemParams.personagens || []),
    ...(personagemParams.lugares || []),
    ...(personagemParams.objetos || []),
  ];

  await db.relacao.createMany({
    data: relacoes.map(relacao => ({
      id_elem_narr1: personagemParams.id_elem_narr,
      id_elem_narr2: relacao.id_elem_narr,
      descricao: relacao.descricao,
      nome_relacao: relacao.nome_relacao,
      prompt: relacao.prompt,
    }))
  });
};
