import LanguageBtn from "components/LanguageBtn";
import { Outlet } from "react-router";

const index = () => {
  return (
    <div className="bg-background flex items-center min-h-screen flex-col">
      <div className="flex-1 items-center flex">
        <div className=":uno: bg-white w-[calc(100vw-1rem)] md:w-[500px] max-w-md rounded-2xl p-8 space-y-6">
          <Outlet />
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <LanguageBtn />
        </div>
      </div>
    </div>
  );
};

export default index;
