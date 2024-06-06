import React from "react";

const HomeLayout = ({ children }) => {
  return (
    <section className="relative w-full min-h-screen bg-[url('/assets/images/bckgr3.png')] bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-50 z-10"></div>

      {/* Content */}
      <div className="relative z-10 max-w-[800px]  h-full w-full mx-auto border">
        <main className="flex-1 h-full overflow-y-auto">
          {children}
        </main>
      </div>
    </section>
  );
};

export default HomeLayout;
