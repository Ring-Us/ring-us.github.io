import { Outlet } from 'react-router-dom';
import { Fragment } from 'react';

export const MentorshipLayout = () => {
  return (
    <Fragment>
      <div className="w-full min-h-screen flex justify-center bg-bgCanvasWhite overflow-y-auto overflow-x-hidden">
        <div className="w-full max-w-[600px] shadow-lg bg-bgPrimaryWhite flex-grow">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};
