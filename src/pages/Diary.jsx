import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import Diary from '../components/tabs/Diary';

function Upload() {
  const { fullName, _id } = useSelector((state) => state.user.auth);

  return (
    <Layout>
      <div className='w-full bg-white shadow-lg p-4'>
        <h3 className='h3'>Nhật ký công việc - {fullName}</h3>
        <hr className='mb-6' />

        {_id && <Diary userId={_id} />}
      </div>
    </Layout>
  );
}

export default Upload;
