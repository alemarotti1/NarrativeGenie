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

type AtualizarLugarParams = {
  id_elem_narr: number;
  imagem?: string;
  nome?: string;
  descricao?: string;
  riqueza?: number;
  saude?: number;
  seguranca?: number;
  agua?: number;
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

export const atualizarLugar = async (lugarParams: AtualizarLugarParams) => {
  await db.lugar.update({
    where: {
      id_elem_narr: lugarParams.id_elem_narr
    },
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
    }
  });

  await db.relacao.deleteMany({
    where: {
      OR: [
        { id_elem_narr1: lugarParams.id_elem_narr },
        { id_elem_narr2: lugarParams.id_elem_narr }
      ]
    }
  });

  const relacoes = [
    ...(lugarParams.personagens || []),
    ...(lugarParams.lugares || []),
    ...(lugarParams.objetos || []),
  ];

  await db.relacao.createMany({
    data: relacoes.map(relacao => ({
      id_elem_narr1: lugarParams.id_elem_narr,
      id_elem_narr2: relacao.id_elem_narr,
      descricao: relacao.descricao,
      nome_relacao: relacao.nome_relacao,
      prompt: relacao.prompt,
    }))
  });
};
