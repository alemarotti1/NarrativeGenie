import db from "../config/db";

export const listarHistorias = async (email: string) => {
  const historias = await db.historia.findMany({
    where: {
      conta: {
        email
      }
    }
  });

  return historias;
};

export const buscarHistoria = async (id_historia: number) => {
  const historia = await db.historia.findUnique({
    where: {
      id_historia
    },
    include: {
      elemento_narrativo: {
        include: {
          personagem: true,
          lugar: true,
          outro: true,
        }
      }
    }
  });

  return historia;
};

export const apagarHistoria = async (id_historia: number) => {
  await db.historia.delete({
    where: {
      id_historia
    }
  });
};

type HistoriaParams = {
  nome: string;
  descricao: string;
  path_img_capa: string;
  prompt: string;
  imgPrompt: string;
}

export const criarHistoria = async (historiaParams: HistoriaParams) => {
  const historia = await db.historia.create({
    data: {
      nome: historiaParams.nome,
      descricao: historiaParams.descricao,
      path_img_capa: historiaParams.path_img_capa,
      prompt: historiaParams.prompt,
      imgPrompt: historiaParams.imgPrompt,
      conta: {
        connect: {
          email: "teste@teste.com"
        }
      }
    }
  });

  return historia.id_historia;
};

type AtualizarHistoriaParams = {
  id_historia: number;
  nome?: string;
  descricao?: string;
  path_img_capa?: string;
  prompt?: string;
  imgPrompt?: string;
}

export const atualizarHistoria = async (historiaParams: AtualizarHistoriaParams) => {
  await db.historia.update({
    where: {
      id_historia: historiaParams.id_historia
    },
    data: {
      nome: historiaParams.nome,
      descricao: historiaParams.descricao,
      path_img_capa: historiaParams.path_img_capa,
      prompt: historiaParams.prompt,
      imgPrompt: historiaParams.imgPrompt,
    }
  });
};
