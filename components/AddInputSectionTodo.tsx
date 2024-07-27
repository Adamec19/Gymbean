import { AddIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { object, string, InferType, ObjectSchema } from 'yup';

import { useGetAllSection } from '@/hooks/api/section/useGetAllSection';
import { useCreateSection } from '@/hooks/api/section/useCreateSection';

type FormType = {
  title: string;
};

const schema: ObjectSchema<FormType> = object({
  title: string().required().min(2).max(30),
});

type FormValues = InferType<typeof schema>;

const AddInputSectionTodo: FC = () => {
  const toast = useToast();
  const { refetchQueries, setQueryData } = useQueryClient();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
    },
  });
  const { refetch } = useGetAllSection({});
  const { mutate: createSectionTodo } = useCreateSection({
    onSuccess: () => {
      toast({
        title: `Success create section`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      reset();
      refetch();
    },
  });

  const onSubmit = ({ title }: FormValues) => {
    createSectionTodo({
      title: title,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup size="md" maxW={{ base: '100%', md: '400px' }}>
        <Input
          pr={4.5}
          placeholder="Add title section"
          {...register('title')}
        />
        <InputRightElement>
          <IconButton
            type="submit"
            icon={<AddIcon />}
            aria-label="add title TodoSection"
          />
        </InputRightElement>
      </InputGroup>
      <ErrorMessage
        errors={errors}
        name="title"
        render={({ message }) => (
          <Text fontSize="12px" mt={2} textAlign="left" color="red">
            {message}
          </Text>
        )}
      />
    </form>
  );
};

export default AddInputSectionTodo;
