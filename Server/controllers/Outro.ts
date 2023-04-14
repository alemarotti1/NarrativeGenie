import db from "../config/db";

export const listarOutros = async (id_historia: number) => {
  const outros = await db.outro.findMany({
    where: {
      elemento_narrativo: {
        Historia_id_historia: id_historia
      }
    }
  });

  return outros;
};

export const buscarOutro = async (id_elem_narr: number) => {
  const outro = await db.outro.findUnique({
    where: {
      id_elem_narr
    }
  });

  return outro;
};

type OutroParams = {
  imagem: string;
  nome: string;
  descricao: string;
  id_historia: number;
}

export const criarOutro = async (outroParams: OutroParams) => {
  const outro = await db.outro.create({
    data: {
      imagem: outroParams.imagem,
      nome: outroParams.nome,
      descricao: outroParams.descricao,
      elemento_narrativo: {
        create: {
          tipo: "outro",
          historia: {
            connect: {
              id_historia: outroParams.id_historia
            }
          }
        },
      },
    }
  });

  return outro.id_elem_narr;
};
