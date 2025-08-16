import { CgSpinnerTwo } from "react-icons/cg";

const Loader = () => {
  return (
    // <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
    //   <CgSpinnerTwo size={80} className="animate-spin" />
    // </div>

    <div className="h-full w-full flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
      <CgSpinnerTwo size={80} className="animate-spin" />
    </div>
  );
};

export default Loader;
