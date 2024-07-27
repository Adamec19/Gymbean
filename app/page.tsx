'use client';

import {
  Button,
  Heading,
  Spinner,
  Stack,
  useColorMode,
} from '@chakra-ui/react';

import AddInputSectionTodo from '@/components/AddInputSectionTodo';
import TodoSectionCard from '@/components/TodoSectionCard';
import { useGetAllSection } from '@/hooks/api/section/useGetAllSection';

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { data, isLoading } = useGetAllSection({});

  return (
    <Stack p={3} h="100vh">
      <Stack as="nav" align="flex-end">
        <Button
          onClick={toggleColorMode}
          borderRadius="50%"
          h="40px"
          w="40px"
          position="fixed"
          bottom="24px"
          right="24px"
        >
          {colorMode == 'dark' ? '☀️' : '☾'}
        </Button>
      </Stack>
      <Stack as="main" textAlign="center" fontSize="xl" flex={1}>
        <Heading as="h1">TODO LIST</Heading>
        <AddInputSectionTodo />
        <Stack
          direction={{ base: 'column', md: 'row' }}
          w="100%"
          overflowX={{ md: 'auto' }}
          py={5}
          flex={1}
        >
          {isLoading ? (
            <Spinner margin="0 auto" />
          ) : (
            <>
              {data?.map((item) => (
                <TodoSectionCard {...item} key={item.id} />
              ))}
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
