import React from 'react';

const CreateLender = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-white shadow dark:bg-slate-600">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-200 text-center">
            Tạo người cho vay
          </h1>
        </div>
      </div>
      <form className="border rounded-md p-4 border-slate-200">
        <label htmlFor="name" className="block mr-2">
          <span className="dark:text-slate-300">Tên</span>
          <input
            id="name"
            type="text"
            className="appearance-none relative block w-full px-3 py-2 border border-slate-400 placeholder-gray-500 text-slate-200 rounded-md focus:outline-none focus:ring-slate-200 focus:border-slate-200 focus:z-10 sm:text-sm bg-slate-500"
            placeholder="Nhập tên để tìm kiếm"
            name="name"
          />
        </label>
        <label htmlFor="name" className="block mr-2">
          <span className="dark:text-slate-300">Số tiền</span>
          <input
            id="money"
            type="number"
            className="appearance-none relative block w-full px-3 py-2 border border-slate-400 placeholder-slate-400 text-slate-200 rounded-md focus:outline-none focus:ring-slate-200 focus:border-slate-200 focus:z-10 sm:text-sm bg-slate-500"
            placeholder="100,000"
            name="money"
          />
        </label>
        <label htmlFor="name" className="block mr-2">
          <span className="dark:text-slate-300">Ngày</span>
          <input
            id="date"
            type="text"
            className="appearance-none relative block w-full px-3 py-2 border border-slate-400 placeholder-slate-400 text-slate-200 rounded-md focus:outline-none focus:ring-slate-200 focus:border-slate-200 focus:z-10 sm:text-sm bg-slate-500"
            placeholder="Nhập tên để tìm kiếm"
            name="date"
          />
        </label>
      </form>
    </div>
  );
};

export default CreateLender;
