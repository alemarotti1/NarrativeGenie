/*
  Warnings:

  - Added the required column `categoria` to the `personagem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `personagem` ADD COLUMN `backstory` VARCHAR(2000) NULL,
    ADD COLUMN `categoria` VARCHAR(255) NOT NULL,
    ADD COLUMN `descricao` VARCHAR(2000) NULL,
    ADD COLUMN `especie` VARCHAR(255) NULL,
    ADD COLUMN `imagem` VARCHAR(255) NULL,
    ADD COLUMN `nome` VARCHAR(255) NULL;
