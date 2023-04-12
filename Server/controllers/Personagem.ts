import db from "../config/db";

export const criarPersonagem = async (personagemParams: any) => {
    // const personagem = await db.personagem.create({
    //     data: {
    //         imagem: personagemParams.imagem,
    //         categoria: 'personagem',
    //         nome: personagemParams.nome,
    //         descricao: personagemParams.descricao,
    //         backstory: personagemParams.backstory,
    //         especie: personagemParams.especie,
    //         elemento_narrativo: {
    //             create: {
    //                 id_elem_narr,
    //                 historia: {
    //                     create: {
    //                         id_historia: id_elem_narr,
    //                         nome,
    //                         descricao,
    //                         conta: {
    //                             connect: {
    //                                 email: "teste@teste.com"
    //                             }
    //                         }
    //                     }
    //                 },
    //                 tipo: "personagem",
    //                 Historia_id_historia: 1,
    //             },
    //         },
    //     }
    // });

    // return personagem.id_historia;
};