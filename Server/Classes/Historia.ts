class Historia {
    /*
    *   Atributos

        id_historia        Int                  @id
        nome               String?              @db.VarChar(255)
        descricao          String?              @db.VarChar(1000)
        path_img_capa      String?              @db.VarChar(255)
        email_escritor     String               @db.VarChar(255)

    */
    private id_historia: number;
    private nome: string;
    private descricao: string;
    private path_img_capa: string;
    private email_escritor: string;
    

	constructor($id_historia: number, $nome: string, $descricao: string, $path_img_capa: string, $email_escritor: string) {
		this.id_historia = $id_historia;
		this.nome = $nome;
		this.descricao = $descricao;
		this.path_img_capa = $path_img_capa;
		this.email_escritor = $email_escritor;
	}


    /**
     * Getter $id_historia
     * @return {number}
     */
	public get $id_historia(): number {
		return this.id_historia;
	}

    /**
     * Getter $nome
     * @return {string}
     */
	public get $nome(): string {
		return this.nome;
	}

    /**
     * Getter $descricao
     * @return {string}
     */
	public get $descricao(): string {
		return this.descricao;
	}

    /**
     * Getter $path_img_capa
     * @return {string}
     */
	public get $path_img_capa(): string {
		return this.path_img_capa;
	}

    /**
     * Getter $email_escritor
     * @return {string}
     */
	public get $email_escritor(): string {
		return this.email_escritor;
	}

    /**
     * Setter $id_historia
     * @param {number} value
     */
	public set $id_historia(value: number) {
		this.id_historia = value;
	}

    /**
     * Setter $nome
     * @param {string} value
     */
	public set $nome(value: string) {
		this.nome = value;
	}

    /**
     * Setter $descricao
     * @param {string} value
     */
	public set $descricao(value: string) {
		this.descricao = value;
	}

    /**
     * Setter $path_img_capa
     * @param {string} value
     */
	public set $path_img_capa(value: string) {
		this.path_img_capa = value;
	}

    /**
     * Setter $email_escritor
     * @param {string} value
     */
	public set $email_escritor(value: string) {
		this.email_escritor = value;
	}

}