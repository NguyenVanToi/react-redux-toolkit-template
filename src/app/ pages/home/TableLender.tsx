import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon, PlusIcon } from '@heroicons/react/outline';
import { Fragment, useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useNavigate } from 'react-router-dom';
import { Lender } from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchLendersAsync,
  LenderWithTrans,
} from '../../redux/slices/lenderSlice';
import CreateLender from './CreateLender';
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

enum ActionLender {
  EDIT = 'EDIT',
  CREATE = 'CREATE',
  DELETE = 'DELETE',
}

const TableLender = (props: any) => {
  const lenderState = useAppSelector((state) => state.lender);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [lendersWithTrans, setLenderWithTrans] = useState<LenderWithTrans[]>(
    []
  );
  const [isShow, setIsShow] = useState(false);
  const [lenderSelected, setLenderSelected] = useState<Lender>();

  useEffect(() => {
    dispatch(fetchLendersAsync([]));
    console.log('lender', lenderState.data);
  }, []);

  useEffect(() => {
    if (lenderState.data && lenderState.data.length > 0) {
      setLenderWithTrans(lenderState.data);
    }
  }, [lenderState.data]);

  const handleChangeFilter = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    let _lenders: LenderWithTrans[] = [...props.lenders];
    switch (name) {
      case 'name':
        _lenders = _lenders.filter(
          (lender) =>
            lender.name &&
            lender.name.toLowerCase().includes(value.toLowerCase())
        );
        break;
      case 'money':
        _lenders = _lenders.filter((lender) => lender.money >= value);
        break;
      default:
        break;
    }
    setLenderWithTrans(_lenders);
  };

  const handleLender = (lender: LenderWithTrans, action: ActionLender) => {
    switch (action) {
      case ActionLender.EDIT:
        setLenderSelected(lender);
        setIsShow(true);
        break;
      case ActionLender.DELETE:
        break;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="bg-white shadow dark:bg-slate-600">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-200 text-center">
            Danh sách
          </h1>
        </div>
      </div>
      <form className="flex px-6 py-2">
        <label htmlFor="name" className="block mr-2">
          <span className="dark:text-slate-200">Tên</span>
          <input
            id="name"
            type="text"
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Nhập tên để tìm kiếm"
            onChange={handleChangeFilter}
            name="name"
          />
        </label>
        <label htmlFor="money" className="block dark:text-slate-200">
          <span className="dark:text-slate-200">Số tiền {'(>=)'}</span>
          <div className="flex items-center">
            <CurrencyFormat
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mr-1"
              thousandSeparator={true}
              displayType={'input'}
              onChange={handleChangeFilter}
              name="money"
              placeholder="100,000"
            />
            đ
          </div>
        </label>
      </form>
      <div className="w-full mx-auto py- sm:px-6 lg:px-8">
        <div className="flex w-100 mb-2">
          <button
            className="rounded-full w-8 h-8 ml-auto border border-slate-800 p-1"
            onClick={() => setIsShow(true)}
          >
            <PlusIcon />
          </button>
        </div>
        <table className="table-auto border-collapse w-full">
          <thead className="bg-white dark:bg-slate-900">
            <tr>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 dark:text-slate-200 text-left">
                Tên
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 dark:text-slate-200 text-left">
                Số tiền
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 dark:text-slate-200 text-left">
                Đã trả
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 dark:text-slate-200 text-left"></th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800">
            {lendersWithTrans?.map(
              (lender: LenderWithTrans, keyIndex: number) => (
                <tr key={keyIndex}>
                  <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-left">
                    {lender?.name}
                  </td>
                  <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-left">
                    <div className="flex">
                      <CurrencyFormat
                        className="text-color-black mr-1"
                        value={lender.money}
                        thousandSeparator={true}
                        displayType={'text'}
                      />
                      đ
                    </div>
                  </td>
                  <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-left">
                    {lender?.totalTrans ? (
                      <div className="flex">
                        <CurrencyFormat
                          className="text-color-black mr-1"
                          value={lender.totalTrans}
                          thousandSeparator={true}
                          displayType={'text'}
                        />
                        đ
                      </div>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-left">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex justify-center bg-transparent text-sm font-medium text-gray-700">
                          <DotsVerticalIcon
                            className="-mr-1 ml-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 dark:bg-slate-700">
                          <div
                            className="py-1"
                            onClick={() =>
                              handleLender(lender, ActionLender.EDIT)
                            }
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  className={classNames(
                                    active ? 'bg-gray-800 ' : '',
                                    'block px-4 py-2 text-sm cursor-pointer'
                                  )}
                                >
                                  Sửa
                                </span>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  className={classNames(
                                    active
                                      ? 'bg-gray-800 text-red-900'
                                      : 'text-red-700',
                                    'block px-4 py-2 text-sm cursor-pointer'
                                  )}
                                >
                                  Xoá
                                </span>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <CreateLender
          isShow={isShow}
          setIsShow={setIsShow}
          lender={lenderSelected}
        />
      </div>
    </div>
  );
};

export default TableLender;
