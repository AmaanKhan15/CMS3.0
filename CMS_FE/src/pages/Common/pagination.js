// import * as React from 'react';
// function Pagination({ data, RenderComponent, title, pageLimit, dataLimit }) {
//     const [pages] = useState(Math.round(data.length / dataLimit));
//     const [currentPage, setCurrentPage] = useState(1);
  
//     function goToNextPage() {
//        // not yet implemented
//     }
  
//     function goToPreviousPage() {
//        // not yet implemented
//     }
  
//     function changePage(event) {
//        // not yet implemented
//     }
  
//     const getPaginatedData = () => {
//        // not yet implemented
//     };
  
//     const getPaginationGroup = () => {
//        // not yet implemented
//     };
  
//     return (
//         <h1>{title}</h1>

//         <div className="dataContainer">
//           {getPaginatedData().map((d, idx) => (
//             <RenderComponent key={idx} data={d} />
//           ))}
//         </div>
    
       
//         <div className="pagination">
//           <button
//             onClick={goToPreviousPage}
//             className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
//           >
//             prev
//           </button>
    
//           {/* show page numbers */}
//           {getPaginationGroup().map((item, index) => (
//             <button
//               key={index}
//               onClick={changePage}
//               className={`paginationItem ${currentPage === item ? 'active' : null}`}
//             >
//               <span>{item}</span>
//             </button>
//           ))}
    
//           {/* next button */}
//           <button
//             onClick={goToNextPage}
//             className={`next ${currentPage === pages ? 'disabled' : ''}`}
//           >
//             next
//           </button>
//         </div>
//       </div>
//     );
//   }
  