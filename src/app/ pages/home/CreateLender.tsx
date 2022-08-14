import { Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Lender } from '../../api/api';

interface IPropsCreateLender {
  isShow?: boolean;
  setIsShow?: any;
  lender?: Lender;
}
const CreateLender = (props: IPropsCreateLender) => {
  const { isShow, setIsShow, lender } = props;

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<any>();

  const onClose = () => {
    setIsShow(false);
  };

  useEffect(() => {
    if (lender) {
      reset({ name: lender.name, money: lender.money });
    }
  }, [lender]);

  const onSubmit = () => {
    const valueForm = getValues();
    console.log('value', valueForm);
  };
  return (
    <Modal show={isShow} onClose={onClose}>
      <Modal.Header>Tạo người cho vay</Modal.Header>
      <Modal.Body>
        {/* <div className="flex flex-col">
          <div className="bg-white shadow dark:bg-slate-600">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-200 text-center">
                
              </h1>
            </div> */}
        {/* </div> */}
        <form className="border rounded-md p-4 border-slate-200">
          <label htmlFor="name" className="block mr-2">
            <span className="dark:text-slate-300">Tên</span>
            <input
              id="name"
              type="text"
              className="appearance-none relative block w-full px-3 py-2 border border-slate-200 placeholder-gray-500 dark:text-slate-400 rounded-md focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 sm:text-sm dark:bg-slate-500"
              placeholder="Nhập tên"
              {...register('name')}
            />
          </label>
          <label htmlFor="name" className="block mr-2">
            <span className="dark:text-slate-300">Số tiền</span>
            <input
              id="money"
              type="number"
              className="appearance-none relative block w-full px-3 py-2 border border-slate-200 placeholder-slate-400 dark:text-slate-400 rounded-md focus:outline-none focus:ring-slate-400 focus:border-slate-200 focus:z-10 sm:text-sm dark:bg-slate-500"
              placeholder="100,000"
              {...register('money')}
            />
          </label>
          <label htmlFor="name" className="block mr-2">
            <span className="dark:text-slate-300">Ngày</span>
            <input
              id="date"
              type="date"
              className="appearance-none relative block w-full px-3 py-2 border border-slate-200 placeholder-slate-400 dark:text-slate-400 rounded-md focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 sm:text-sm dark:bg-slate-500"
              placeholder="Nhập tên để tìm kiếm"
              {...register('date')}
            />
          </label>
        </form>
        {/* </div> */}
      </Modal.Body>
      <Modal.Footer>
        <button
          type="submit"
          className="group relative mx-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => onSubmit()}
        >
          {/* {authState.status === StatusLoading.LOADING && (
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )} */}
          Submit
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateLender;
