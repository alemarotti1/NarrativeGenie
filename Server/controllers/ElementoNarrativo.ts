import db from "../config/db";

export const apagarElemento = async (id_elem_narr: number) => {
  await db.elemento_narrativo.delete({
    where: {
      id_elem_narr
    }
  });
};
