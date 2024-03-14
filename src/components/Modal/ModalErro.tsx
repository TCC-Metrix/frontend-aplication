// import React, { FC, ReactNode } from "react"
// import "./ModalErro.css"
// import Buttons from "../Buttons/Buttons"

// interface ModalProps {
//   isOpen: boolean
//   setModalErrorOpen: () => void
//   children?: ReactNode
// }

// const ModalErro: FC<ModalProps> = ({ isOpen, setModalErrorOpen, children }) => {
//   if (isOpen) {
//     return (
//       <div className="background">
//         <div className="modal">
//           <div>{children}</div>
//           <div className="flex-align-center-icon">
//             <Buttons
//               name="close"
//               className="closeButtonWithoutBack"
//               onClickFunction={setModalErrorOpen}
//             />
//           </div>
//         </div>
//       </div>
//     )
//   }
//   return null
// }

// export default ModalErro