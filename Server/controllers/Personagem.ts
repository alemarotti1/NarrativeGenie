import { Prisma } from "@prisma/client";
import db from "../config/db";

export const criarPersonagem = async (id_elem_narr: number, nome: string, descricao: string) => {
    const personagem = await db.personagem.create({
        data: {
            id_elem_narr,
            elemento_narrativo: {
                create: {
                    id_elem_narr,
                    historia: {
                        create: {
                            id_historia: id_elem_narr,
                            nome,
                            descricao,
                            conta: {
                                connect: {
                                    email: "teste@teste.com"
                                }
                            }
                        }
                    },
                    tipo: "personagem",
                    Historia_id_historia: 1,
                },
            },
        }
    });

    return personagem.id_historia;
};