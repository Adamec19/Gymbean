import {
  Checkbox,
  Heading,
  IconButton,
  ListItem,
  Stack,
  Tag,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { EditIcon } from '@chakra-ui/icons';

import TodoDrawer from './TodoDrawer';
import { timestampToDateAndMonth } from '../helper';
import { Todo } from '../services/todo';
import { useUpdateSectionTodo } from '@/hooks/api/todo/useUpdateSectionTodo';
import { useGetAllSection } from '@/hooks/api/section/useGetAllSection';

type TodoItemProps = {
  sectionId: string;
  todo: Todo;
};

const TodoItem: FC<TodoItemProps> = ({ sectionId, todo }) => {
  const toast = useToast();
  const [isCheck, setIsCheck] = useState(todo.isDone);
  const { refetch } = useGetAllSection({});
  const { mutate: updateSectionTodo } = useUpdateSectionTodo({
    onSuccess: () => {
      toast({
        title: `Success update todo`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      refetch();
    },
    onError: () => {
      toast({
        title: `Error update todo`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getBgColor = () => {
    switch (todo.priority.value) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'blue';
      case 'Low':
        return 'green';
    }
  };

  const handleOpenDrawer = () => {
    onOpen();
  };

  return (
    <ListItem
      display="flex"
      p={2}
      boxShadow="rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset"
      borderRadius="6px"
      position="relative"
      backgroundColor={'transparent'}
      opacity={isCheck ? 0.5 : 1}
    >
      <Checkbox
        isChecked={isCheck}
        onChange={() => {
          setIsCheck(!isCheck);
          updateSectionTodo({
            ...todo,
            isDone: !isCheck,
          });
        }}
      />
      <Stack textAlign="left" flex={1} ml={2} spacing={0} pt={2}>
        <Heading as="h3" fontSize="22px">
          {todo.name}
        </Heading>
        <Text pt="6px" pb="12px">
          {todo.description}
        </Text>
        <Text fontSize="12px">
          Deadline: {timestampToDateAndMonth(todo.deadline)}
        </Text>
      </Stack>
      {todo.priority.value && (
        <Tag
          position="absolute"
          w="fit-content"
          top="-10px"
          backgroundColor={getBgColor()}
        >
          {todo.priority.value}
        </Tag>
      )}

      <IconButton
        aria-label="Search database"
        icon={<EditIcon />}
        cursor={isCheck ? 'not-allowed' : 'pointer'}
        onClick={() => !isCheck && handleOpenDrawer()}
      />
      <TodoDrawer
        isOpen={isOpen}
        onClose={onClose}
        todo={todo}
        isEdit={true}
        sectionId={sectionId}
      />
    </ListItem>
  );
};
export default TodoItem;
