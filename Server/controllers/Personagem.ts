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
  especie: string;
  id_historia: number;
}

export const criarPersonagem = async (personagemParams: PersonagemParams) => {
  const personagem = await db.personagem.create({
    data: {
      imagem: personagemParams.imagem,
      nome: personagemParams.nome,
      descricao: personagemParams.descricao,
      backstory: personagemParams.backstory,
      especie: personagemParams.especie,
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
