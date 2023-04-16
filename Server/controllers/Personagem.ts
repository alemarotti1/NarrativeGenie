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
        select: {
          historia: {
            select: {
              id_historia: true,
              nome: true,
            }
          }
        }
      }
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
};
