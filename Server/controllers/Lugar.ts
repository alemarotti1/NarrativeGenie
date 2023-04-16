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

  return lugar;
};

export const apagarLugar = async (id_elem_narr: number) => {
  await db.lugar.delete({
    where: {
      id_elem_narr
    }
  });
};

type LugarParams = {
  imagem: string;
  nome: string;
  descricao: string;
  riqueza: number;
  saude: number;
  seguranca: number;
  agua: number;
  prompt: string;
  imgPrompt: string;
  id_historia: number;
}

export const criarLugar = async (lugarParams: LugarParams) => {
  const lugar = await db.lugar.create({
    data: {
      imagem: lugarParams.imagem,
      nome: lugarParams.nome,
      descricao: lugarParams.descricao,
      riqueza: lugarParams.riqueza,
      saude: lugarParams.saude,
      seguranca: lugarParams.seguranca,
      agua: lugarParams.agua,
      prompt: lugarParams.prompt,
      imgPrompt: lugarParams.imgPrompt,
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
