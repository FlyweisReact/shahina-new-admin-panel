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
      <button onClick={handleGoogleLogin}> Login with Google </button>
    </>
  );
};

export default HOC(Chat);
