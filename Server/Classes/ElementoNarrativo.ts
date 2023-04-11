class ElementoNarrativo {
    /*
    *   Atributos
        id_elem_narr                                      Int         @id
        Historia_id_historia                              Int
        tipo                                              String?     @db.VarChar(45)
        historia                                          historia    @relation(fields: [Historia_id_historia], references: [id_historia], onDelete: NoAction, onUpdate: NoAction, map: "fk_Elemento_narrativo_Historia1")
    */
    private id_elem_narr: number;
    private Historia_id_historia: number;
    private tipo: string;
    private historia: Historia;


	constructor($id_elem_narr: number, $Historia_id_historia: number, $tipo: string, $historia: Historia) {
		this.id_elem_narr = $id_elem_narr;
		this.Historia_id_historia = $Historia_id_historia;
		this.tipo = $tipo;
		this.historia = $historia;
	}
    

    /**
     * Getter $id_elem_narr
     * @return {number}
     */
	public get $id_elem_narr(): number {
		return this.id_elem_narr;
	}

    /**
     * Getter $Historia_id_historia
     * @return {number}
     */
	public get $Historia_id_historia(): number {
		return this.Historia_id_historia;
	}

    /**
     * Getter $tipo
     * @return {string}
     */
	public get $tipo(): string {
		return this.tipo;
	}

    /**
     * Getter $historia
     * @return {Historia}
     */
	public get $historia(): Historia {
		return this.historia;
	}

    /**
     * Setter $id_elem_narr
     * @param {number} value
     */
	public set $id_elem_narr(value: number) {
		this.id_elem_narr = value;
	}

    /**
     * Setter $Historia_id_historia
     * @param {number} value
     */
	public set $Historia_id_historia(value: number) {
		this.Historia_id_historia = value;
	}

    /**
     * Setter $tipo
     * @param {string} value
     */
	public set $tipo(value: string) {
		this.tipo = value;
	}

    /**
     * Setter $historia
     * @param {Historia} value
     */
	public set $historia(value: Historia) {
		this.historia = value;
	}



}