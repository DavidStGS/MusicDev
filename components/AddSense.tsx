// "use client";

// import { useEffect } from "react";

// declare global {
//   interface Window {
//     adsbygoogle: any[];
//   }
// }

// const AdSense = ({ adSlot }) => {
//   useEffect(() => {
//     try {
//       (window.adsbygoogle = window.adsbygoogle || []).push({});
//     } catch (err) {
//       console.error(err);
//     }
//   }, []);

//   return (
//     <ins
//       className="adsbygoogle"
//       style={{ display: "block" }}
//       data-ad-client="ca-pub-8563047377957074" // Replace with your publisher ID
//       data-ad-slot={adSlot}
//       data-ad-format="auto"
//       data-full-width-responsive="true"
//     ></ins>
//   );
// };

// export default AdSense;
