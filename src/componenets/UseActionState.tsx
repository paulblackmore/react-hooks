import { useActionState } from 'react';
import { z } from 'zod';

type Inputs = {
  firstName: string;
  secondName: string;
};

type ApiResponse = {
  status: 'idle' | 'pending' | 'success' | 'error';
  error: string | undefined;
  data: Inputs | undefined;
};

const schema = z.object({
  firstName: z.string().nonempty('Field is required'),
  secondName: z.string().nonempty('Field is required'),
});

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

const saveUser = async (
  _prevState: ApiResponse,
  formData: FormData
): Promise<ApiResponse> => {
  const firstName = formData.get('firstName') as string;
  const secondName = formData.get('secondName') as string;

  await wait(1000);

  const { success, error } = schema.safeParse({ firstName, secondName });
  if (!success) {
    return {
      status: 'error',
      error: error.message,
      data: undefined,
    };
  }
  return {
    status: 'success',
    error: undefined,
    data: { firstName, secondName },
  };
};

const SuccessBanner = () => (
  <div className='absolute top-0 right-0 w-full p-4 bg-green-500'>
    <span className='block sm:inline'>User saved successfully</span>
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <span className='block sm:inline text-red-400'>{message}</span>
);

const initialState: ApiResponse = {
  status: 'idle',
  error: undefined,
  data: { firstName: '', secondName: '' },
};

export const UseActionState = () => {
  const [formState, formAction, isPending] = useActionState(
    saveUser,
    initialState
  );

  const findInputError = (name: string) => {
    if (formState.error) {
      const parsedError = JSON.parse(formState.error);
      const error = parsedError?.find((error: any) => error.path[0] === name);
      return error?.message;
    }
    return undefined;
  };

  return (
    <div>
      <h1 className='mb-10'>Practice: useActionState</h1>
      <form
        action={formAction}
        className='flex flex-col justify-center items-start gap-5'
      >
        {formState?.status === 'success' ? <SuccessBanner /> : null}
        <label
          htmlFor='firstName'
          className='block text-sm font-medium text-gray-900 dark:text-white'
        >
          First name
        </label>
        <input
          type='text'
          id='firstName'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Eg. John'
          name='firstName'
        />
        {findInputError('firstName') ? (
          <ErrorMessage message='Field is required' />
        ) : null}
        <label
          htmlFor='secondName'
          className='block text-sm font-medium text-gray-900 dark:text-white'
        >
          Second name
        </label>
        <input
          type='text'
          id='secondName'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Eg. Murphy'
          name='secondName'
        />
        {findInputError('secondName') ? (
          <ErrorMessage message='Field is required' />
        ) : null}
        <button
          type='submit'
          disabled={isPending}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Submit
        </button>
      </form>
    </div>
  );
};
