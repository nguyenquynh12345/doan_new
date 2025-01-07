// import TheAside from '@components/containers/TheAside';
// import TheContent from '@components/containers/TheContent';
// import TheFooter from '@components/containers/TheFooter';
// import TheHeader from '@components/containers/TheHeader';
// import TheSidebar from '@components/containers/TheSidebar';

// const TheLayout = () => {
//   return (
//     <div>
//       <TheSidebar />
//       <TheAside />

//       <div className="wrapper d-flex flex-column min-vh-100 bg-light">
//         <TheHeader />
//         <div className="body flex-grow-1 px-3">
//           <TheContent />
//         </div>
//         <TheFooter />
//       </div>
//     </div>
//   );
// };
// export default TheLayout;

import TheContent from '@components/containers/TheContent';
import TheHeader from '@components/containers/TheHeader';
import TheSidebar from '@components/containers/TheSidebar';

const TheLayout = () => {
  return (
    <div>
      {/* <TheAside /> */}

      <div className=" d-flex flex-column min-vh-100 bg-light">
        <TheHeader />
        <div className="flex-grow-1 d-flex">
          <TheSidebar />
          <div className="wrapper">
            <div className="responsive-container">
              <TheContent />
            </div>
          </div>
        </div>

        {/* <TheFooter /> */}
      </div>
    </div>
  );
};
export default TheLayout;
