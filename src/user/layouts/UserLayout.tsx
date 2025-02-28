import { Outlet } from 'react-router-dom';
import { Fragment } from 'react';

export const UserLayout = () => {
  return (
    <Fragment>
      <div className="w-full h-auto flex justify-center bg-bgCanvasWhite overflow-y-auto overflow-x-hidden">
        <div className="w-full max-w-[600px] shadow-lg">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};