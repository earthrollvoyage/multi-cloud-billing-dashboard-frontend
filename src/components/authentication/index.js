// import React, { useState, useEffect } from "react";
// import { Amplify, Auth, Hub } from "aws-amplify";
// import config from '../../aws-exports';

// export const AuthenticationContext = React.createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isLoadingUser, setIsLoadingUser] = useState(true);

//   useEffect(() => {

//     Amplify.configure(config);

//     Hub.listen('auth', ({ payload: { event, data } }) => {
//       console.log('DATA', data);
//       console.log('EVENT', event);
//       switch (event) {
//         case 'signIn':
//             console.log('user signed in', event, data);
//             setCurrentUser(data);
//             break;
//         case 'signUp':
//             console.log('user signed up', event, data);
//             setCurrentUser(data);
//             break;
//         case 'signOut':
//             console.log('user signed out', event, data);
//             setCurrentUser(null);
//             break;
//         case 'signIn_failure':
//             console.log('user sign in failed', event, data);
//             setCurrentUser(data);
//             break;
//         case 'configured':
//             console.log('the Auth module is configured');
//             break;
//         default:
//             break;
//       }
//     });

//     Auth.currentAuthenticatedUser()
//     .then((user) => {
//       setCurrentUser(user);
//       setIsLoadingUser(false);
//     })
//     .catch((error) => {
//       if (error === 'The user is not authenticated') {
//         setCurrentUser(null);
//         setIsLoadingUser(false);
//       } else {
//         console.log('Current Authenticated User Error :', error);
//         setIsLoadingUser(false);
//       }

//     });

//   }, []);

//   if (isLoadingUser) {
//     return <p>Loading...</p>;
//   }

//   const onSubmitAuthCode = async (status) => {
//     console.log('onSubmitAuthCode user :', status);
//     try {
//       if (status === 'SUCCESS') {
//         const user = await Auth.currentAuthenticatedUser();
  
//         if (user) {
//           setCurrentUser(user);
//         }
//       }
//     } catch (error) {
//       if (error === 'The user is not authenticated') {
//         setCurrentUser(error);
//       } else {
//         console.log('onSubmitAuthCode Error :', error);
//         setCurrentUser(null);
//       }
//     }
//   }

//   const onResetUserDataWithOutSignin = async (userData) => {
//     console.log('onChangeAction userData :', userData);
//       if (userData) {
//         if (typeof userData === 'object') {
//           if ('userConfirmed' in userData && !userData.userConfirmed) {
//             setCurrentUser(null);
//           }
//         }
         
//         if (userData === 'The user is not authenticated') {
//             setCurrentUser(null);
//         }
//       }
//   }

//   return (
//     <AuthenticationContext.Provider value={{ currentUser, onSubmitAuthCode, onResetUserDataWithOutSignin }}>
//       { children }
//     </AuthenticationContext.Provider>
//   );
// };
