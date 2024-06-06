import React from "react";
import HomeNavbar from "./(components)/HomeNavbar";

const HomeLayout = ({ children }) => {
  return (
    <section className="w-full relative min-h-screen bg-[url('/assets/images/bckgr3.png')] bg-cover bg-center">
    {/* Include shared UI here e.g. a header or sidebar */}
    <div className="absolute inset-0 bg-white bg-opacity-50 z-10"></div>

      <div className="max-w-[800px]  h-full w-full mx-auto z-20 relative">
      <HomeNavbar />
     

      <main className="  flex-1 h-full overflow-y-auto p-3 ">
        {children}
      </main>

      
      </div>
    </section>
  );
};

export default HomeLayout;