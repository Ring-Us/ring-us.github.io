import { Outlet } from 'react-router-dom';
import { Fragment } from 'react';

export const MentorshipLayout = () => {
  return (
    <Fragment>
      <div className="w-full h-dvh flex justify-center bg-bgCanvasWhite overflow-y-auto overflow-x-hidden">
        <div className="w-full max-w-[600px] shadow-lg bg-bgPrimaryWhite">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};
