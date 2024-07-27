import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  Text,
  useToast,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import DatePicker from 'react-datepicker';
import { InferType, ObjectSchema, date, object, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';

import { Priority, Todo } from '../services/todo';
import { dateObjectToTimestamp, timestampToDateObject } from '@/helper';
import useViewport from '@/hooks/useViewport';
import { useCreateSectionTodo } from '@/hooks/api/todo/useCreateSectionTodo';
import { useGetAllSection } from '@/hooks/api/section/useGetAllSection';
import { useUpdateSectionTodo } from '@/hooks/api/todo/useUpdateSectionTodo';
import 'react-datepicker/dist/react-datepicker.css';

type TodoDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  todo?: Todo;
  isEdit: boolean;
  sectionId: string;
};

type FormType = {
  name: string;
  priority: Priority;
  description: string;
  deadline: Date | null;
};

const schema: ObjectSchema<FormType> = object({
  name: string().required(),
  priority: string().oneOf(['High', 'Medium', 'Low']).required(),
  description: string().required().min(4).max(58),
  deadline: date()
    .typeError('Invalid date format')
    .nullable()
    .default(null)
    .required(),
});

type FormValues = InferType<typeof schema>;

const arrayPriority = ['High', 'Medium', 'Low'];

const getDeadLine = (deadline: number | undefined) => {
  if (!deadline) {
    return null;
  }
  return timestampToDateObject(deadline);
};

const TodoDrawer: FC<TodoDrawerProps> = ({
  isOpen,
  onClose,
  todo,
  isEdit,
  sectionId,
}) => {
  const toast = useToast();
  const [dateValue, setDateValue] = useState<Date | null>(
    getDeadLine(todo?.deadline)
  );
  const { refetch } = useGetAllSection({});

  const { isMobile } = useViewport();

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: todo?.name ?? '',
      priority: todo?.priority.value ?? 'Low',
      description: todo?.description ?? '',
      deadline: getDeadLine(todo?.deadline),
    },
  });

  const { mutate: updateTodo } = useUpdateSectionTodo({
    onSuccess: () => {
      reset();
      onClose();
      toast({
        title: `Success update todo`,
        status: 'success',
        duration: 9000,
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

  const { mutate: addTodo } = useCreateSectionTodo({
    onSuccess: () => {
      reset();
      onClose();
      toast({
        title: `Success create todo`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      refetch();
    },
    onError: () => {
      toast({
        title: `Error create todo`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const onSubmit: SubmitHandler<FormValues> = ({
    deadline,
    description,
    name,
    priority,
  }) => {
    if (isEdit) {
      updateTodo({
        deadline: dateObjectToTimestamp(deadline ?? new Date()),
        description,
        name,
        priority: {
          id: 1,
          value: priority,
        },
        isDone: false,
        sectionId: sectionId,
        id: todo?.id ?? '',
      });
      return;
    }

    addTodo({
      deadline: dateObjectToTimestamp(deadline ?? new Date()),
      description,
      name,
      priority: {
        id: 1,
        value: priority,
      },
      isDone: false,
      sectionId: sectionId,
    });
  };

  const watchRadio = watch('priority');

  return (
    <Drawer
      isOpen={isOpen}
      placement={isMobile ? 'bottom' : 'right'}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            {isEdit ? 'Update todo' : 'Create a new todo'}
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  placeholder="Please enter user name"
                  {...register('name')}
                />
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => (
                    <Text fontSize="12px" mt={2} textAlign="left" color="red">
                      {message}
                    </Text>
                  )}
                />
              </Box>

              <Box>
                <RadioGroup value={watchRadio}>
                  <Stack direction="row">
                    {arrayPriority.map((item, index) => (
                      <Radio value={item} key={index} {...register('priority')}>
                        {item}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
                <ErrorMessage
                  errors={errors}
                  name="priority"
                  render={({ message }) => (
                    <Text fontSize="12px" mt={2} textAlign="left" color="red">
                      {message}
                    </Text>
                  )}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="desc">Deadline</FormLabel>
                <DatePicker
                  placeholderText="dd.mm.yyyy"
                  showYearDropdown
                  dateFormat="dd.MM.yyyy"
                  minDate={new Date()}
                  showMonthDropdown
                  yearDropdownItemNumber={100}
                  scrollableYearDropdown
                  selected={dateValue}
                  onChange={(date) => {
                    clearErrors('deadline');
                    if (date instanceof Date) {
                      setDateValue(date);
                      setValue('deadline', date);
                    }
                  }}
                  customInput={
                    <Input
                      className="datePickerInput"
                      {...register('deadline')}
                      type="text"
                      required
                      data-test="offerDetail.contactIN.date"
                    />
                  }
                />
                <ErrorMessage
                  errors={errors}
                  name="deadline"
                  render={({ message }) => (
                    <Text fontSize="12px" mt={2} textAlign="left" color="red">
                      {message}
                    </Text>
                  )}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="desc">Description</FormLabel>
                <Textarea id="desc" {...register('description')} />
                <ErrorMessage
                  errors={errors}
                  name="description"
                  render={({ message }) => (
                    <Text fontSize="12px" mt={2} textAlign="left" color="red">
                      {message}
                    </Text>
                  )}
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={() => onClose()}>
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit">
              Submit
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
export default TodoDrawer;
