import {
  AddIcon,
  DeleteIcon,
  HamburgerIcon,
  SettingsIcon,
} from '@chakra-ui/icons';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FC } from 'react';

import TodoDrawer from './TodoDrawer';
import { useDeleteSection } from '@/hooks/api/section/useDeleteSection';
import { useGetAllSection } from '@/hooks/api/section/useGetAllSection';
import { Section } from '@/services/section';

type CardMenuProps = {
  triggerFiltersButton: () => void;
  todo: Section;
  isViewFilters: boolean;
};

const CardMenu: FC<CardMenuProps> = ({
  triggerFiltersButton,
  todo,
  isViewFilters,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { refetch } = useGetAllSection({});

  const { mutate: deleteAddress } = useDeleteSection({
    onSuccess: () => {
      toast({
        title: `Success delete section`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      refetch();
    },
    onError: () => {
      toast({
        title: `Error delete section`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
  });

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<AddIcon />} onClick={onOpen}>
          Add todo
        </MenuItem>
        <MenuItem icon={<DeleteIcon />} onClick={() => deleteAddress(todo.id)}>
          Delete section
        </MenuItem>
        <MenuItem
          icon={<SettingsIcon />}
          onClick={() => triggerFiltersButton()}
        >
          {isViewFilters ? 'Hide filters' : 'Use filters'}
        </MenuItem>
      </MenuList>
      <TodoDrawer
        isOpen={isOpen}
        onClose={onClose}
        isEdit={false}
        sectionId={todo.id}
      />
    </Menu>
  );
};
export default CardMenu;
