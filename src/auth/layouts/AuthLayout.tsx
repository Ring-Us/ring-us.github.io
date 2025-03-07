import { Outlet } from 'react-router-dom';
import { Fragment } from 'react'; // 수정된 부분

export const AuthLayout = () => {
  return (
    <Fragment>
      <div className="w-full h-full flex justify-center bg-bgCanvasWhite overflow-x-hidden">
        <div className="w-full max-w-[600px] shadow-lg bg-bgPrimaryWhite">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};
