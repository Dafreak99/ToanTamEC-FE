import { Box, Icon, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BiNotepad } from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const { role } = useSelector((state) => state.user.auth);

  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden='true'
      />

      {/* Sidebar */}
      <div
        id='sidebar'
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className='flex justify-between mb-10 pr-3 sm:px-2'>
          {/* Close button */}
          <button
            ref={trigger}
            className='lg:hidden text-slate-500 hover:text-slate-400'
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls='sidebar'
            aria-expanded={sidebarOpen}
          >
            <span className='sr-only'>Close sidebar</span>
            <svg
              className='w-6 h-6 fill-current'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z' />
            </svg>
          </button>
        </div>

        <div className='space-y-8'>
          <div>
            <h3 className='text-xs uppercase text-slate-500 font-semibold pl-3'>
              <span className='md:hidden lg:sidebar-expanded:block 2xl:block'>
                TOAN TAM EC
              </span>
            </h3>
            <ul className='mt-3'>
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes('du-an') && 'bg-slate-900'
                }`}
              >
                <NavLink
                  end
                  to='/du-an'
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes('du-an') && 'hover:text-slate-200'
                  }`}
                >
                  <div className='flex items-center'>
                    {!sidebarExpanded ? (
                      <Tooltip label='Dự án'>
                        <Box as='span'>
                          <Icon as={AiOutlineUnorderedList} />
                        </Box>
                      </Tooltip>
                    ) : (
                      <>
                        <AiOutlineUnorderedList />
                        <span className='text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                          Dự án
                        </span>
                      </>
                    )}
                  </div>
                </NavLink>
              </li>

              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes('nhat-ky') && 'bg-slate-900'
                }`}
              >
                <NavLink
                  end
                  to='/nhat-ky'
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes('nhat-ky') && 'hover:text-slate-200'
                  }`}
                >
                  <div className='flex items-center'>
                    {!sidebarExpanded ? (
                      <Tooltip label='Nhật ký'>
                        <Box as='span'>
                          <Icon as={BiNotepad} />
                        </Box>
                      </Tooltip>
                    ) : (
                      <>
                        <BiNotepad />
                        <span className='text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                          Nhật ký
                        </span>
                      </>
                    )}
                  </div>
                </NavLink>
              </li>

              {role !== 3 && (
                <li
                  className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                    pathname.includes('nguoi-dung') && 'bg-slate-900'
                  }`}
                >
                  <NavLink
                    end
                    to='/nguoi-dung'
                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                      pathname.includes('nguoi-dung') && 'hover:text-slate-200'
                    }`}
                  >
                    <div className='flex items-center'>
                      {!sidebarExpanded ? (
                        <Tooltip label='Người dùng'>
                          <Box as='span'>
                            <Icon as={FaUsers} />
                          </Box>
                        </Tooltip>
                      ) : (
                        <>
                          <FaUsers />
                          <span className='text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                            Người dùng
                          </span>
                        </>
                      )}
                    </div>
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className='pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto'>
          <div className='px-3 py-2'>
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className='sr-only'>Expand / collapse sidebar</span>
              <svg
                className='w-6 h-6 fill-current sidebar-expanded:rotate-180'
                viewBox='0 0 24 24'
              >
                <path
                  className='text-slate-400'
                  d='M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z'
                />
                <path className='text-slate-600' d='M3 23H1V1h2z' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
