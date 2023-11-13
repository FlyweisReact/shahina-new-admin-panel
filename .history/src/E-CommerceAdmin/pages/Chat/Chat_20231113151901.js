/** @format */

import HOC from "../../layout/HOC";


const Chat = () => {




  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    </>
  );
};

export default HOC(Chat);
