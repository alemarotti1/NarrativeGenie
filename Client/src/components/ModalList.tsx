import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Image,
  GridItem,
  Grid,
  Text,
  Textarea,
  Tag,
  Input,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { HiPencilAlt, HiOutlineChevronDown } from "react-icons/hi";
import { useParams } from "react-router-dom";

import api from "../config/api";
import environment from "../config/environment";
import Header from "../layout/Header";

interface ModalListProps {
  type: string;
  title: string;
  index: number | null;
  value: string;
  isOpen: boolean;
  onClose: (saved: boolean, value?: string) => void;
};

const ModalList: React.FC<ModalListProps> = ({ isOpen, onClose, ...params }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(params.value || "");

  return (
    <Modal isCentered isOpen={isOpen} onClose={() => onClose(false)} size="xl">
      <ModalOverlay
        bg="rgba(0,0,0,0.5)"
        backdropFilter="auto"
        backdropBlur="2px"
      />
      <ModalContent>
        <ModalHeader>
          {params.title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justify="center" flexWrap="nowrap">
            <Input
              bg="white"
              border="1px solid black"
              color="black"
              placeholder="Digite o nome do item"
              ml="2"
              w="full"
              borderRadius="xl"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Flex>
          <Flex w="full" my="16px">
            <Spacer />
            <Button
              borderRadius="xl"
              bg="#3C6C66"
              color="white"
              mr="2"
              onClick={() => onClose(true, value)}
            >
              {params.index ? "Atualizar" : "Criar"}
            </Button>
            <Button borderRadius="xl" bg="red.700" color="white" onClick={() => onClose(false)}>
              Cancelar
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalList;
