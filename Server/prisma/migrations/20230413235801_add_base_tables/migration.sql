-- CreateTable
CREATE TABLE `conta` (
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(64) NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `elemento_narrativo` (
    `id_elem_narr` INTEGER NOT NULL AUTO_INCREMENT,
    `Historia_id_historia` INTEGER NOT NULL,
    `tipo` VARCHAR(45) NULL,

    INDEX `fk_Elemento_narrativo_Historia1`(`Historia_id_historia`),
    PRIMARY KEY (`id_elem_narr`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `historia` (
    `id_historia` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NULL,
    `descricao` VARCHAR(1000) NULL,
    `path_img_capa` VARCHAR(255) NULL,
    `email_escritor` VARCHAR(255) NOT NULL,

    INDEX `fk_Historia_Conta`(`email_escritor`),
    PRIMARY KEY (`id_historia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lugar` (
    `id_elem_narr` INTEGER NOT NULL,

    PRIMARY KEY (`id_elem_narr`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `outro` (
    `Elemento_narrativo_id_elem_narr` INTEGER NOT NULL,

    PRIMARY KEY (`Elemento_narrativo_id_elem_narr`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personagem` (
    `id_elem_narr` INTEGER NOT NULL,
    `nome` VARCHAR(255) NULL,
    `descricao` VARCHAR(2000) NULL,
    `backstory` VARCHAR(2000) NULL,
    `especie` VARCHAR(255) NULL,
    `imagem` VARCHAR(255) NULL,

    PRIMARY KEY (`id_elem_narr`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `relacao` (
    `id_elem_narr1` INTEGER NOT NULL,
    `id_elem_narr2` INTEGER NOT NULL,
    `nome_relacao` VARCHAR(255) NULL,
    `descricao` VARCHAR(1000) NULL,

    INDEX `fk_Elemento_narrativo_has_Elemento_narrativo_Elemento_narrati2`(`id_elem_narr2`),
    PRIMARY KEY (`id_elem_narr1`, `id_elem_narr2`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `elemento_narrativo` ADD CONSTRAINT `fk_Elemento_narrativo_Historia1` FOREIGN KEY (`Historia_id_historia`) REFERENCES `historia`(`id_historia`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `historia` ADD CONSTRAINT `fk_Historia_Conta` FOREIGN KEY (`email_escritor`) REFERENCES `conta`(`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `lugar` ADD CONSTRAINT `fk_Lugar_Elemento_narrativo1` FOREIGN KEY (`id_elem_narr`) REFERENCES `elemento_narrativo`(`id_elem_narr`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `outro` ADD CONSTRAINT `fk_Outro_Elemento_narrativo1` FOREIGN KEY (`Elemento_narrativo_id_elem_narr`) REFERENCES `elemento_narrativo`(`id_elem_narr`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `personagem` ADD CONSTRAINT `fk_Personagem_Elemento_narrativo1` FOREIGN KEY (`id_elem_narr`) REFERENCES `elemento_narrativo`(`id_elem_narr`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `relacao` ADD CONSTRAINT `fk_Elemento_narrativo_has_Elemento_narrativo_Elemento_narrati1` FOREIGN KEY (`id_elem_narr1`) REFERENCES `elemento_narrativo`(`id_elem_narr`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `relacao` ADD CONSTRAINT `fk_Elemento_narrativo_has_Elemento_narrativo_Elemento_narrati2` FOREIGN KEY (`id_elem_narr2`) REFERENCES `elemento_narrativo`(`id_elem_narr`) ON DELETE NO ACTION ON UPDATE NO ACTION;
