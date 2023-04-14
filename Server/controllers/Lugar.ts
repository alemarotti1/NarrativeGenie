import db from "../config/db";

export const listarLugares = async (id_historia: number) => {
  const lugares = await db.lugar.findMany({
    where: {
      elemento_narrativo: {
        Historia_id_historia: id_historia
      }
    }
  });

  return lugares;
};

export const buscarLugar = async (id_elem_narr: number) => {
  const lugar = await db.lugar.findUnique({
    where: {
      id_elem_narr
    }
  });

  return lugar;
};

type LugarParams = {
  imagem: string;
  nome: string;
  descricao: string;
  id_historia: number;
}

export const criarLugar = async (lugarParams: LugarParams) => {
  const lugar = await db.lugar.create({
    data: {
      imagem: lugarParams.imagem,
      nome: lugarParams.nome,
      descricao: lugarParams.descricao,
      elemento_narrativo: {
        create: {
          tipo: "lugar",
          historia: {
            connect: {
              id_historia: lugarParams.id_historia
            }
          }
        },
      },
    }
  });

  return lugar.id_elem_narr;
};
