import { Prisma } from "@prisma/client";
import db from "../config/db";

export const criarHistoria = async (id_historia: number, nome: string, descricao: string) => {
    const historia = await db.historia.create({
        data: {
            id_historia,
            nome,
            descricao,
            conta: {
                connect: {
                    email: "teste@teste.com"
                }
            }
        }
    });

    return historia.id_historia;
};