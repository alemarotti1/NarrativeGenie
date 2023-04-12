import db from "../config/db";

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
            categoria: "personagem",
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
