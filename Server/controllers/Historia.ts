import { Prisma } from "@prisma/client";
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
        }
    });

    return historia;
};

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