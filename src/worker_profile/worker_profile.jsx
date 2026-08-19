

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
// components
import Chat from "../chat/chat"
import Wp_sectionOne from "./component/wp_sectionOne"
import Wp_sectionThree from "./component/wp_sectionThree"
import Wp_sectionTwo from "./component/wp_sectionTwo"


// api
import { getUser } from "../api/user"

function Worker_profile() {

const {id}=useParams()

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getUser(id);
         console.log(response.user);
        if (response.success) {
         
          setUser(response.user);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

   if (loading) return <div className="p-20 text-center">Loading Profile...</div>;
  if (error) return <div className="p-20 text-center text-red-500">Error: {error}</div>;
  if (!user) return <div className="p-20 text-center">User not found</div>;

  return (
    <>
    <Wp_sectionOne user={user} />
    <Wp_sectionTwo user={user} />
    <Wp_sectionThree />
    <Chat />
    </>
  )
}

export default Worker_profile
