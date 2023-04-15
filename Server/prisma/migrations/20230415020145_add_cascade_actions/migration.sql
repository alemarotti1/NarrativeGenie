-- DropForeignKey
ALTER TABLE `historia` DROP FOREIGN KEY `fk_Historia_Conta`;

-- DropForeignKey
ALTER TABLE `lugar` DROP FOREIGN KEY `fk_Lugar_Elemento_narrativo1`;

-- DropForeignKey
ALTER TABLE `outro` DROP FOREIGN KEY `fk_Outro_Elemento_narrativo1`;

-- DropForeignKey
ALTER TABLE `personagem` DROP FOREIGN KEY `fk_Personagem_Elemento_narrativo1`;

-- AddForeignKey
ALTER TABLE `historia` ADD CONSTRAINT `fk_Historia_Conta` FOREIGN KEY (`email_escritor`) REFERENCES `conta`(`email`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `lugar` ADD CONSTRAINT `fk_Lugar_Elemento_narrativo1` FOREIGN KEY (`id_elem_narr`) REFERENCES `elemento_narrativo`(`id_elem_narr`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `outro` ADD CONSTRAINT `fk_Outro_Elemento_narrativo1` FOREIGN KEY (`id_elem_narr`) REFERENCES `elemento_narrativo`(`id_elem_narr`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `personagem` ADD CONSTRAINT `fk_Personagem_Elemento_narrativo1` FOREIGN KEY (`id_elem_narr`) REFERENCES `elemento_narrativo`(`id_elem_narr`) ON DELETE CASCADE ON UPDATE NO ACTION;
