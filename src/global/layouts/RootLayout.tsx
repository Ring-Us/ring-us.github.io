import { Outlet } from 'react-router-dom';
import { Fragment } from 'react'; // 수정된 부분

export const RootLayout = () => {
  return (
    <Fragment>
      <div className="w-full h-auto flex justify-center bg-bgCanvasWhite overflow-x-hidden">
        <div className="w-full max-w-[600px] shadow-lg">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};
